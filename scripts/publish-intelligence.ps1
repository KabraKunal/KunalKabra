[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$SourcePath,

    [switch]$Push
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$script:ExpectedRepository = "kabrakunal/kunalkabra"
$script:ExpectedBranch = "main"
$script:RepoRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$script:AllowedPublishPaths = @(
    "intelligence-app/src/data.ts",
    "intelligence-app/public/og.png",
    "intelligence"
)
$script:MutationStarted = $false
$script:Committed = $false

function Invoke-Git {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$Arguments
    )

    $previousErrorActionPreference = $ErrorActionPreference
    try {
        # Windows PowerShell turns native stderr into error records. Git can emit
        # harmless warnings there even on success, so rely on its exit code.
        $ErrorActionPreference = "Continue"
        $rawOutput = @(& git -c "safe.directory=$script:RepoRoot" -c "core.quotepath=false" -C $script:RepoRoot @Arguments 2>&1)
        $exitCode = $LASTEXITCODE
    }
    finally {
        $ErrorActionPreference = $previousErrorActionPreference
    }

    $standardOutput = @(
        $rawOutput |
            Where-Object { $_ -isnot [System.Management.Automation.ErrorRecord] } |
            ForEach-Object { $_.ToString() }
    )

    if ($exitCode -ne 0) {
        $detail = ($rawOutput | ForEach-Object { $_.ToString() }) -join [Environment]::NewLine
        throw "git $($Arguments -join ' ') failed with exit code $exitCode.$([Environment]::NewLine)$detail"
    }

    return $standardOutput
}

function Invoke-Npm {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$Arguments
    )

    $previousErrorActionPreference = $ErrorActionPreference
    try {
        $ErrorActionPreference = "Continue"
        & $script:NpmCommand @Arguments
        $exitCode = $LASTEXITCODE
    }
    finally {
        $ErrorActionPreference = $previousErrorActionPreference
    }

    if ($exitCode -ne 0) {
        throw "npm $($Arguments -join ' ') failed with exit code $exitCode."
    }
}

function Get-NormalizedPath {
    param([Parameter(Mandatory = $true)][string]$Path)

    return [System.IO.Path]::GetFullPath($Path).TrimEnd(
        [System.IO.Path]::DirectorySeparatorChar,
        [System.IO.Path]::AltDirectorySeparatorChar
    )
}

function Test-PathIsWithin {
    param(
        [Parameter(Mandatory = $true)][string]$Candidate,
        [Parameter(Mandatory = $true)][string]$Parent
    )

    $candidatePath = Get-NormalizedPath -Path $Candidate
    $parentPath = Get-NormalizedPath -Path $Parent
    $prefix = $parentPath + [System.IO.Path]::DirectorySeparatorChar
    return $candidatePath.StartsWith($prefix, [System.StringComparison]::OrdinalIgnoreCase)
}

function Get-GitHubRepositorySlug {
    param([Parameter(Mandatory = $true)][string]$RemoteUrl)

    $trimmed = $RemoteUrl.Trim()
    $patterns = @(
        '^https://github\.com/(?<slug>[^/]+/[^/]+?)(?:\.git)?/?$',
        '^git@github\.com:(?<slug>[^/]+/[^/]+?)(?:\.git)?/?$',
        '^ssh://git@github\.com/(?<slug>[^/]+/[^/]+?)(?:\.git)?/?$'
    )

    foreach ($pattern in $patterns) {
        $match = [regex]::Match($trimmed, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
        if ($match.Success) {
            return $match.Groups["slug"].Value.ToLowerInvariant()
        }
    }

    return $null
}

function Assert-CleanSynchronizedRepository {
    Get-Command git -ErrorAction Stop | Out-Null

    if (-not (Test-Path -LiteralPath (Join-Path $script:RepoRoot ".git"))) {
        throw "Publisher must run from the KunalKabra Git repository. Missing .git at $script:RepoRoot."
    }

    $reportedRoot = (Invoke-Git -Arguments @("rev-parse", "--show-toplevel") | Select-Object -First 1).ToString().Trim()
    if ((Get-NormalizedPath -Path $reportedRoot) -ne (Get-NormalizedPath -Path $script:RepoRoot)) {
        throw "Repository root mismatch. Expected $script:RepoRoot but Git reported $reportedRoot."
    }

    $remoteUrl = (Invoke-Git -Arguments @("remote", "get-url", "origin") | Select-Object -First 1).ToString().Trim()
    $repositorySlug = Get-GitHubRepositorySlug -RemoteUrl $remoteUrl
    if ($repositorySlug -ne $script:ExpectedRepository) {
        throw "Refusing to publish to unexpected origin '$remoteUrl'. Expected KabraKunal/KunalKabra on GitHub."
    }

    $branch = (Invoke-Git -Arguments @("branch", "--show-current") | Select-Object -First 1).ToString().Trim()
    if ($branch -ne $script:ExpectedBranch) {
        throw "Refusing to publish from branch '$branch'. Check out '$script:ExpectedBranch' first."
    }

    $upstream = (Invoke-Git -Arguments @("rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}") | Select-Object -First 1).ToString().Trim()
    if ($upstream -ne "origin/$script:ExpectedBranch") {
        throw "Branch '$branch' must track origin/$script:ExpectedBranch; it currently tracks '$upstream'."
    }

    $status = @(Invoke-Git -Arguments @("status", "--porcelain=v1", "--untracked-files=all"))
    if ($status.Count -gt 0) {
        $detail = ($status | ForEach-Object { $_.ToString() }) -join [Environment]::NewLine
        throw "The website repository must be completely clean before publishing.$([Environment]::NewLine)$detail"
    }

    Invoke-Git -Arguments @("fetch", "--prune", "origin", $script:ExpectedBranch) | Out-Null

    $countsLine = (Invoke-Git -Arguments @("rev-list", "--left-right", "--count", "HEAD...origin/$script:ExpectedBranch") | Select-Object -First 1).ToString().Trim()
    $counts = @($countsLine -split '\s+')
    if ($counts.Count -ne 2 -or $counts[0] -ne "0" -or $counts[1] -ne "0") {
        throw "Local $script:ExpectedBranch is not synchronized with origin/$script:ExpectedBranch (ahead/behind: $countsLine). Pull or push intentionally before publishing."
    }
}

function Assert-PngFile {
    param([Parameter(Mandatory = $true)][string]$Path)

    $file = Get-Item -LiteralPath $Path
    if ($file.Length -lt 1024 -or $file.Length -gt 15MB) {
        throw "OG image must be between 1 KB and 15 MB; got $($file.Length) bytes at $Path."
    }

    $expectedSignature = [byte[]](137, 80, 78, 71, 13, 10, 26, 10)
    $actualSignature = New-Object byte[] 8
    $stream = [System.IO.File]::OpenRead($Path)
    try {
        if ($stream.Read($actualSignature, 0, 8) -ne 8) {
            throw "OG image is too short to be a valid PNG: $Path."
        }
    }
    finally {
        $stream.Dispose()
    }

    for ($index = 0; $index -lt $expectedSignature.Length; $index++) {
        if ($actualSignature[$index] -ne $expectedSignature[$index]) {
            throw "OG image does not have a valid PNG signature: $Path."
        }
    }
}

function Assert-NoSecretText {
    param(
        [Parameter(Mandatory = $true)][string]$Text,
        [Parameter(Mandatory = $true)][string]$Label
    )

    $secretPatterns = @(
        '-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',
        '\bgithub_pat_[A-Za-z0-9_]{20,}\b',
        '\bgh[opsu]_[A-Za-z0-9]{30,}\b',
        '\bAKIA[A-Z0-9]{16}\b',
        '\bsk-[A-Za-z0-9_-]{20,}\b'
    )

    foreach ($pattern in $secretPatterns) {
        if ([regex]::IsMatch($Text, $pattern)) {
            throw "Possible credential material detected in $Label. Publishing stopped."
        }
    }
}

function Get-ValidatedEditionDate {
    param([Parameter(Mandatory = $true)][string]$DataPath)

    $dataFile = Get-Item -LiteralPath $DataPath
    if ($dataFile.Length -lt 2000 -or $dataFile.Length -gt 5MB) {
        throw "app/data.ts must be between 2 KB and 5 MB; got $($dataFile.Length) bytes."
    }

    $dataText = [System.IO.File]::ReadAllText($DataPath, [System.Text.Encoding]::UTF8)
    if ($dataText.IndexOf([char]0) -ge 0) {
        throw "app/data.ts contains a NUL byte and is not valid source text."
    }

    $placeholderPattern = '(?im)\b(?:TODO|TBD|FIXME|PLACEHOLDER|LOREM IPSUM|COMING SOON|REPLACE[-_ ]?ME)\b|example\.com|YYYY-MM-DD|1970-01-01'
    if ([regex]::IsMatch($dataText, $placeholderPattern)) {
        throw "app/data.ts contains placeholder content. Replace it before publishing."
    }

    Assert-NoSecretText -Text $dataText -Label "app/data.ts"

    $requiredExports = @(
        "tabs",
        "edition",
        "stories",
        "sectionGuides",
        "macroPulse",
        "sincePrint",
        "watchlist",
        "deepReads",
        "methodology"
    )

    foreach ($exportName in $requiredExports) {
        $pattern = 'export\s+const\s+' + [regex]::Escape($exportName) + '\b'
        if (-not [regex]::IsMatch($dataText, $pattern)) {
            throw "app/data.ts is missing required export '$exportName'."
        }
    }

    foreach ($arrayName in @("tabs", "stories", "macroPulse", "sincePrint", "watchlist", "deepReads")) {
        $emptyArrayPattern = 'export\s+const\s+' + [regex]::Escape($arrayName) + '(?:\s*:[^=]+)?\s*=\s*\[\s*\]'
        if ([regex]::IsMatch($dataText, $emptyArrayPattern)) {
            throw "Required data collection '$arrayName' is empty."
        }
    }

    foreach ($propertyName in @("dateLabel", "sourceLabel", "snapshotLabel", "bottomLine")) {
        $propertyPattern = [regex]::Escape($propertyName) + '\s*:\s*["''](?<value>[^"'']+)["'']'
        $propertyMatch = [regex]::Match($dataText, $propertyPattern)
        if (-not $propertyMatch.Success -or $propertyMatch.Groups["value"].Value.Trim().Length -lt 8) {
            throw "Edition property '$propertyName' is missing or too short."
        }
    }

    $headlineCount = [regex]::Matches($dataText, '(?m)^\s+headline\s*:').Count
    if ($headlineCount -lt 5) {
        throw "app/data.ts has only $headlineCount headline entries; expected a complete edition."
    }

    foreach ($requiredTab in @("TODAY", "MARKETS & MACRO", "INDIA", "COMPANIES", "AI & TECHNOLOGY", "ENERGY & GEOPOLITICS", "SINCE PRINT", "WATCHLIST", "DEEP READS")) {
        if ($dataText.IndexOf('"' + $requiredTab + '"', [System.StringComparison]::Ordinal) -lt 0) {
            throw "app/data.ts is missing required tab '$requiredTab'."
        }
    }

    $dateLabelMatch = [regex]::Match($dataText, 'dateLabel\s*:\s*["''](?<label>[^"'']+)["'']')
    if (-not $dateLabelMatch.Success) {
        throw "Could not find edition.dateLabel in app/data.ts."
    }

    $dateMatch = [regex]::Match(
        $dateLabelMatch.Groups["label"].Value,
        '\b(?<day>[0-3]?\d)\s+(?<month>January|February|March|April|May|June|July|August|September|October|November|December)\s+(?<year>20\d{2})\b',
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )
    if (-not $dateMatch.Success) {
        throw "edition.dateLabel must include a date such as '18 August 2026'."
    }

    $dateText = "$($dateMatch.Groups['day'].Value) $($dateMatch.Groups['month'].Value) $($dateMatch.Groups['year'].Value)"
    try {
        $editionDate = [datetime]::ParseExact(
            $dateText,
            "d MMMM yyyy",
            [System.Globalization.CultureInfo]::InvariantCulture,
            [System.Globalization.DateTimeStyles]::None
        )
    }
    catch {
        throw "edition.dateLabel contains an invalid calendar date: '$dateText'."
    }

    return $editionDate
}

function Test-IsAllowedPublishPath {
    param([Parameter(Mandatory = $true)][string]$Path)

    $normalized = ($Path -replace '\\', '/') -replace '^\./', ''
    return (
        $normalized -eq "intelligence-app/src/data.ts" -or
        $normalized -eq "intelligence-app/public/og.png" -or
        $normalized -eq "intelligence" -or
        $normalized.StartsWith("intelligence/", [System.StringComparison]::Ordinal)
    )
}

function Get-RepositoryChanges {
    $paths = @()
    $paths += @(Invoke-Git -Arguments @("diff", "--name-only"))
    $paths += @(Invoke-Git -Arguments @("diff", "--cached", "--name-only"))
    $paths += @(Invoke-Git -Arguments @("ls-files", "--others", "--exclude-standard"))

    return @(
        $paths |
            ForEach-Object { $_.ToString().Trim() } |
            Where-Object { $_.Length -gt 0 } |
            Sort-Object -Unique
    )
}

function Assert-OnlyAllowedChanges {
    $changedPaths = @(Get-RepositoryChanges)
    $unexpected = @($changedPaths | Where-Object { -not (Test-IsAllowedPublishPath -Path $_) })
    if ($unexpected.Count -gt 0) {
        throw "Build changed files outside the publishing allowlist:$([Environment]::NewLine)$($unexpected -join [Environment]::NewLine)"
    }

    return $changedPaths
}

function Assert-SafePublicBundle {
    param([Parameter(Mandatory = $true)][string]$OutputPath)

    $indexPath = Join-Path $OutputPath "index.html"
    if (-not (Test-Path -LiteralPath $indexPath -PathType Leaf)) {
        throw "Build did not create intelligence/index.html."
    }

    $files = @(Get-ChildItem -LiteralPath $OutputPath -Recurse -File -Force)
    if ($files.Count -lt 2 -or $files.Count -gt 1000) {
        throw "Unexpected public bundle file count: $($files.Count)."
    }

    $forbiddenExtensions = @(
        ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx",
        ".eml", ".msg", ".zip", ".7z", ".rar", ".pem", ".key", ".p12",
        ".pfx", ".sqlite", ".sqlite3", ".db", ".log", ".map"
    )
    $forbiddenSegments = @("research", "newspapers", "newspaper", "cache", "credentials", "secrets")

    foreach ($file in $files) {
        $relative = $file.FullName.Substring((Get-NormalizedPath -Path $OutputPath).Length).TrimStart('\', '/') -replace '\\', '/'
        $segments = @($relative.ToLowerInvariant() -split '/')

        if ($file.Length -gt 15MB) {
            throw "Public bundle file exceeds 15 MB: intelligence/$relative."
        }
        if ($forbiddenExtensions -contains $file.Extension.ToLowerInvariant()) {
            throw "Forbidden artifact type in public bundle: intelligence/$relative."
        }
        if ($file.Name -match '^\.env(?:\.|$)' -or @($segments | Where-Object { $forbiddenSegments -contains $_ }).Count -gt 0) {
            throw "Forbidden research, cache, or secret path in public bundle: intelligence/$relative."
        }

        if ($file.Length -le 2MB -and $file.Extension.ToLowerInvariant() -in @(".html", ".js", ".mjs", ".css", ".json", ".txt", ".xml")) {
            $text = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
            Assert-NoSecretText -Text $text -Label "intelligence/$relative"
        }
    }
}

function Restore-PublishPaths {
    foreach ($publishPath in $script:AllowedPublishPaths) {
        try {
            Invoke-Git -Arguments @(
                "restore", "--staged", "--worktree", "--source=HEAD", "--", $publishPath
            ) | Out-Null
        }
        catch {
            # The path may be newly generated and therefore absent from HEAD;
            # the narrowly scoped git clean below handles that case.
        }
    }

    try {
        Invoke-Git -Arguments @(
            "clean", "-fd", "--",
            "intelligence-app/src/data.ts",
            "intelligence-app/public/og.png",
            "intelligence"
        ) | Out-Null
    }
    catch {
        Write-Warning "Could not remove untracked generated publish files automatically: $($_.Exception.Message)"
    }
}

try {
    Assert-CleanSynchronizedRepository

    $resolvedSource = (Resolve-Path -LiteralPath $SourcePath).Path
    if (-not (Test-Path -LiteralPath $resolvedSource -PathType Container)) {
        throw "SourcePath must be a directory: $SourcePath."
    }
    if ((Get-NormalizedPath -Path $resolvedSource) -eq (Get-NormalizedPath -Path $script:RepoRoot) -or
        (Test-PathIsWithin -Candidate $resolvedSource -Parent $script:RepoRoot)) {
        throw "SourcePath must point to the separate Daily Brief project, not inside the public website repository."
    }

    $sourceData = Join-Path $resolvedSource "app/data.ts"
    $sourceOg = Join-Path $resolvedSource "public/og.png"
    if (-not (Test-Path -LiteralPath $sourceData -PathType Leaf)) {
        throw "Required source file is missing: $sourceData."
    }
    if (-not (Test-Path -LiteralPath $sourceOg -PathType Leaf)) {
        throw "Required source file is missing: $sourceOg."
    }

    $editionDate = Get-ValidatedEditionDate -DataPath $sourceData
    $editionIso = $editionDate.ToString("yyyy-MM-dd", [System.Globalization.CultureInfo]::InvariantCulture)
    Assert-PngFile -Path $sourceOg

    $appRoot = Join-Path $script:RepoRoot "intelligence-app"
    $destinationData = Join-Path $appRoot "src/data.ts"
    $destinationOg = Join-Path $appRoot "public/og.png"
    $outputRoot = Join-Path $script:RepoRoot "intelligence"

    foreach ($requiredPath in @(
        (Join-Path $appRoot "package.json"),
        (Split-Path -Parent $destinationData),
        (Split-Path -Parent $destinationOg)
    )) {
        if (-not (Test-Path -LiteralPath $requiredPath)) {
            throw "Intelligence app is incomplete; missing $requiredPath."
        }
    }

    $npm = Get-Command npm.cmd -ErrorAction SilentlyContinue
    if ($null -eq $npm) {
        $npm = Get-Command npm -ErrorAction Stop
    }
    $script:NpmCommand = $npm.Source

    $script:MutationStarted = $true
    Copy-Item -LiteralPath $sourceData -Destination $destinationData -Force
    Copy-Item -LiteralPath $sourceOg -Destination $destinationOg -Force

    Push-Location $appRoot
    try {
        Invoke-Npm -Arguments @("ci", "--no-audit", "--no-fund")
        Invoke-Npm -Arguments @("test")
        Invoke-Npm -Arguments @("run", "build")
    }
    finally {
        Pop-Location
    }

    if ((Get-FileHash -LiteralPath $sourceData -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $destinationData -Algorithm SHA256).Hash) {
        throw "Destination data.ts no longer matches the validated source after the build."
    }
    if ((Get-FileHash -LiteralPath $sourceOg -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $destinationOg -Algorithm SHA256).Hash) {
        throw "Destination og.png no longer matches the validated source after the build."
    }

    Assert-SafePublicBundle -OutputPath $outputRoot
    $changedPaths = @(Assert-OnlyAllowedChanges)
    if ($changedPaths.Count -eq 0) {
        Write-Host "Morning Intelligence $editionIso is already current; no commit or push was needed."
        exit 0
    }

    Invoke-Git -Arguments @(
        "add", "--all", "--",
        "intelligence-app/src/data.ts",
        "intelligence-app/public/og.png",
        "intelligence"
    ) | Out-Null

    $stagedPaths = @(
        Invoke-Git -Arguments @("diff", "--cached", "--name-only") |
            ForEach-Object { $_.ToString().Trim() } |
            Where-Object { $_.Length -gt 0 }
    )
    if ($stagedPaths.Count -eq 0) {
        Write-Host "Morning Intelligence $editionIso is already current; no commit or push was needed."
        exit 0
    }

    $unexpectedStaged = @($stagedPaths | Where-Object { -not (Test-IsAllowedPublishPath -Path $_) })
    if ($unexpectedStaged.Count -gt 0) {
        throw "Unexpected staged paths detected:$([Environment]::NewLine)$($unexpectedStaged -join [Environment]::NewLine)"
    }

    $commitMessage = "Publish Morning Intelligence: $editionIso"
    Invoke-Git -Arguments @("commit", "--message", $commitMessage) | ForEach-Object { Write-Host $_ }
    $script:Committed = $true

    $remainingStatus = @(Invoke-Git -Arguments @("status", "--porcelain=v1", "--untracked-files=all"))
    if ($remainingStatus.Count -gt 0) {
        throw "Commit succeeded, but the repository is not clean. Inspect it before pushing."
    }

    $commitSha = (Invoke-Git -Arguments @("rev-parse", "--short=12", "HEAD") | Select-Object -First 1).ToString().Trim()
    if ($Push) {
        Invoke-Git -Arguments @("push", "--porcelain", "origin", "HEAD:refs/heads/main") | ForEach-Object { Write-Host $_ }
        Write-Host "Published Morning Intelligence $editionIso in commit $commitSha and pushed origin/main."
    }
    else {
        Write-Host "Created Morning Intelligence commit $commitSha for $editionIso. Push was not requested."
    }
}
catch {
    $message = $_.Exception.Message
    if ($script:MutationStarted -and -not $script:Committed) {
        Restore-PublishPaths
    }
    throw $message
}
