export const tabs = [
  "TODAY",
  "MARKETS & MACRO",
  "INDIA",
  "COMPANIES",
  "AI & TECHNOLOGY",
  "ENERGY & GEOPOLITICS",
  "SINCE PRINT",
  "WATCHLIST",
  "DEEP READS",
] as const;

export const edition = {
  dateLabel: "Tuesday · 18 August 2026",
  sourceLabel: "FT + Business Standard + Mint + Last 24h Web",
  snapshotLabel: "Published snapshot · 12:10 IST",
  webWindowLabel: "12:10 IST on 17 August → 12:10 IST on 18 August 2026",
  bottomLine:
    "Risk is migrating from headlines into balance sheets: Hormuz is lifting financing and input costs, AI risk is moving beyond headline capex, and India’s policy approvals still have to convert into jobs and operating capacity.",
};

export type Tab = (typeof tabs)[number];
export type SourceName = "FT" | "BS" | "Mint" | "Web";
export type Importance = "High" | "Medium";

export type SourceRef = {
  source: SourceName;
  detail: string;
  url?: string;
};

export type EvidenceKind =
  | "PRINT FACT"
  | "WEB CHECK"
  | "WEB UPDATE"
  | "INFERENCE"
  | "DISAGREEMENT";

export type Story = {
  id: string;
  rank?: number;
  sections: Tab[];
  eyebrow: string;
  headline: string;
  summary: string;
  why: string;
  secondOrder: string;
  winners?: string;
  losers?: string;
  watch: string;
  importance: Importance;
  confidence: "High" | "Medium" | "Provisional";
  maturity: string;
  sources: SourceRef[];
  evidence: { kind: EvidenceKind; text: string }[];
};

export const stories: Story[] = [
  {
    id: "hormuz-escalation",
    rank: 1,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA", "ENERGY & GEOPOLITICS"],
    eyebrow: "Hormuz · oil · shipping",
    headline: "The Hormuz clock is now disputed—and escalation risk is rising again",
    summary:
      "The papers treated the latest 60-day US–Iran window as expiring on 17 August without a shipping deal; Iran now says that clock never began or was extendable, even though the memorandum contains concrete 60-day provisions. Trump threatened Oman, source reporting carried a harder Iranian posture, and Brent crossed $90 before the web cutoff—but no verified transit normalisation was established.",
    why:
      "This remains the day’s largest cross-asset risk because one political failure transmits into oil, long bonds, freight, INR, Indian edible-oil and chemical costs, and household inflation.",
    secondOrder:
      "A prolonged disruption shifts advantage toward countries with inventories and alternative routes, while India’s subsidy bill and corporate margins absorb more of the shock. Sanctions leakage can also lengthen Iran’s financial runway.",
    winners:
      "Energy producers outside the strait, Indian pipe makers localising in the Gulf, and logistics routes that bypass maritime chokepoints.",
    losers:
      "Import-dependent consumers, airlines, paint/adhesive makers and governments cushioning fuel prices.",
    watch:
      "Verified tanker transit, war-risk insurance, formal Oman–Iran–US terms, attacks or sanctions actions, reserve releases and sustained Brent/LPG/input-cost moves.",
    importance: "High",
    confidence: "Medium",
    maturity: "Public positions and prices are observed; the clock, military intent and diplomacy remain contested",
    sources: [
      { source: "FT", detail: "PDF pp2, 11, 16 · expiry, threat and market transmission" },
      { source: "BS", detail: "PDF pp14, 21–22 · Reuters and India-market transmission" },
      { source: "Mint", detail: "PDF pp3, 12 · editorial, Bloomberg and Dow Jones partner copy" },
      {
        source: "Web",
        detail: "IRNA official feed · Iran disputes the framing, 17 Aug 16:21 IST",
        url: "https://t.me/Irna_en/38071",
      },
      {
        source: "Web",
        detail: "AP · memorandum text and 60-day provisions",
        url: "https://apnews.com/article/8576fbe2be1309977e903463fbf57ee6",
      },
      {
        source: "Web",
        detail: "AP · early-session Brent snapshot, 18 Aug 08:49 IST",
        url: "https://apnews.com/article/a805333e767251279e68e0686b28a8c9",
      },
    ],
    evidence: [
      {
        kind: "PRINT FACT",
        text: "The dated expiry, Trump’s attributed remarks and observed oil/bond moves are the hard core. The FT, Reuters, Bloomberg and Dow Jones pieces are distinct reporting layers inside one conflict cluster—not four votes.",
      },
      {
        kind: "DISAGREEMENT",
        text: "Iran says the talks clock never began or was extendable; the published memorandum contains several concrete 60-day references. This is a negotiating-position dispute, not proof that either side’s interpretation is neutral.",
      },
      {
        kind: "WEB UPDATE",
        text: "Iran’s formal objection changes the framing, not the physical outcome: no completed route agreement or normal transit was found. Brent crossed $90 in early Asian trading, an intraday confirmation of market transmission rather than a new cause.",
      },
      {
        kind: "INFERENCE",
        text: "Calling this a wider India margin and subsidy problem is synthesis from the oil, soyoil, VAM and pipe-industry evidence.",
      },
    ],
  },
  {
    id: "private-credit",
    rank: 2,
    sections: ["TODAY", "MARKETS & MACRO", "COMPANIES"],
    eyebrow: "US credit · BDCs · liquidity",
    headline: "Private-credit stress is now measurable, not merely anecdotal",
    summary:
      "Among the 20 largest listed business-development companies, median non-accruals reached 2.8% of cost in Q2 from 2.0% at end-March, near a decade high. FS KKR stood at 7.1%, while writedowns and fund withdrawals add a potential feedback loop across a roughly $2tn sector.",
    why:
      "Private credit financed borrowers outside public markets and banks. Deterioration can surface late because marks are infrequent, then tighten refinancing and amplify withdrawals just as growth and tariff pressure rise.",
    secondOrder:
      "Dispersion matters more than the headline median: managers with weak underwriting or liquidity mismatches may be forced to sell or slow lending, while stronger platforms gain share at wider spreads.",
    winners: "Well-capitalised lenders with conservative marks, dry powder and locked-up funding.",
    losers: "Highly levered borrowers, weak BDC managers and investors relying on stable NAVs or redemptions.",
    watch:
      "Sector-weighted non-accruals, realised losses, covenant restructurings, BDC funding flows, withdrawal queues and bank spillovers.",
    importance: "High",
    confidence: "High",
    maturity: "Realised portfolio disclosures; systemic extrapolation remains analytical",
    sources: [
      {
        source: "FT",
        detail: "PDF p1 · 20 listed BDCs and manager disclosures",
        url: "https://www.ft.com/content/67acde0d-4154-4332-b33b-2d03d3a86007",
      },
      {
        source: "Web",
        detail: "SEC · FS KKR Q2 results exhibit",
        url: "https://www.sec.gov/Archives/edgar/data/1422183/000110465926091572/tm2622260d1_ex99-1.htm",
      },
    ],
    evidence: [
      {
        kind: "PRINT FACT",
        text: "The 2.8% figure is the median non-accrual share measured at cost across 20 large listed BDCs; it is not the default rate for the entire $2tn private-credit market.",
      },
      {
        kind: "INFERENCE",
        text: "A broader credit-cycle constraint is plausible, not proven. FS KKR’s 7.1% is one manager and should not be generalised.",
      },
      {
        kind: "WEB CHECK",
        text: "FS KKR’s filing confirms 7.1% at amortised cost and 3.8% at fair value; both improved from March even as FT’s separate 20-BDC median worsened.",
      },
    ],
  },
  {
    id: "ai-financing",
    rank: 3,
    sections: ["TODAY", "MARKETS & MACRO", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "AI capex · commitments · insurance",
    headline: "AI infrastructure risk is becoming larger, less visible and less insured",
    summary:
      "A Dow Jones analysis printed in Mint finds roughly $3tn of mostly AI-related leases and purchase commitments across nine companies, versus about $600bn of annual capex. Separately, FT details peril-specific insurance limits around a $14bn Meta/BlackRock Texas campus, while BS reports Nvidia’s $1.5bn investment and contingent backing of up to $105bn for an up-to-8GW SB Energy project.",
    why:
      "The next AI constraint is not only chips or power. Contractual obligations, project finance and insurance determine how much risk sits outside conventional debt and who bears a delay, casualty or utilisation miss.",
    secondOrder:
      "If revenue ramps more slowly than contractual capacity, operating leverage can rise without headline leverage showing it. Lenders and insurers may reprice projects before hyperscalers revise capex guidance.",
    winners: "Operators with committed customers, flexible leases, energised capacity and robust risk transfer.",
    losers: "Speculative campuses, thinly capitalised developers and creditors relying on a single tenant or incomplete catastrophe cover.",
    watch:
      "Cancellability and start dates of commitments, financing closes, cash deployment, energised MW, utilisation, offtake, insurance exclusions and loss limits.",
    importance: "High",
    confidence: "High",
    maturity: "Contract terms are reported; capacity, losses and maximum backing remain contingent",
    sources: [
      {
        source: "Mint",
        detail: "PDF p7 · explicit Dow Jones/WSJ partner analysis",
        url: "https://www.livemint.com/ai/artificial-intelligence/why-big-tech-s-ai-spending-is-3-trillion-higher-than-it-seems-11786929842673.html",
      },
      { source: "FT", detail: "PDF p8 · Meta/BlackRock project insurance" },
      { source: "BS", detail: "PDF p9 · Reuters on Nvidia/SB Energy structure" },
      {
        source: "Web",
        detail: "SEC · Nvidia 8-K on contingent residual-value support",
        url: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000069/nvda-20260817.htm",
      },
    ],
    evidence: [
      {
        kind: "PRINT FACT",
        text: "The three reports describe different mechanisms: multi-year commitments, one project’s peril-specific insurance and contingent project backing. Their dollar values are not additive.",
      },
      {
        kind: "INFERENCE",
        text: "Commitments are not current debt, ‘up to’ backing is not deployed cash, and an insurance gap is exposure rather than an expected loss.",
      },
      {
        kind: "WEB CHECK",
        text: "Nvidia’s filing describes an up-to-$105bn cumulative cap for contingent residual-value support tied to ready-for-service conditions and OpenAI default—not a $105bn investment or immediate cash outlay.",
      },
    ],
  },
  {
    id: "china-divergence",
    rank: 4,
    sections: ["TODAY", "MARKETS & MACRO", "AI & TECHNOLOGY"],
    eyebrow: "China · demand · valuations",
    headline: "China’s real economy is weakening while AI-tech valuations accelerate",
    summary:
      "July industrial output grew 4.5%, retail sales only 0.6%, January–July fixed-asset investment fell 6.7% and property investment dropped 19.2% in Mint’s presentation. Yet FT reports the Star 50 up 29% in 2026 at more than 150 times trailing earnings, versus roughly 35 times for the Nasdaq 100.",
    why:
      "Weak household/property demand and expensive frontier-tech equities can coexist, but the gap raises the return threshold for earnings and policy support while reducing the margin for disappointment.",
    secondOrder:
      "A policy-led technology boom can redirect capital toward strategic sectors without repairing consumption. Commodity exporters and China-sensitive multinationals should not read AI listings as a broad demand recovery.",
    winners: "Scarce domestic chip/model assets that convert policy support into earnings.",
    losers: "Crowded listings without revenue depth and businesses dependent on property or household demand.",
    watch:
      "Credit and fiscal response, property sales/prices, retail and imports, Star 50 earnings, listing allocations and policy support.",
    importance: "High",
    confidence: "High",
    maturity: "Official activity and market prices are observed; the divergence is synthesis",
    sources: [
      { source: "FT", detail: "PDF pp4, 10 · July data and Star 50 valuations" },
      { source: "BS", detail: "PDF p14 · official-data event via agencies" },
      { source: "Mint", detail: "PDF p12 · Bloomberg treatment of the same release" },
    ],
    evidence: [
      {
        kind: "PRINT FACT",
        text: "The July figures are one NBS release repeated across the papers, not three-source consensus. The valuation evidence is a separate observed market regime.",
      },
      {
        kind: "INFERENCE",
        text: "Describing the valuation/macro gap as dependence on exceptional policy or earnings is analytical synthesis.",
      },
    ],
  },
  {
    id: "tata-funding",
    rank: 5,
    sections: ["TODAY", "INDIA", "COMPANIES"],
    eyebrow: "Tata · capital allocation · governance",
    headline: "Tata Sons has cash, but the next funding cycle is a governance test",
    summary:
      "FY26 accounts show ₹21,841 crore of net cash and ₹11.68tn of listed investments, alongside nearly ₹30,000 crore of combined losses across four newer businesses. Semiconductors, aviation, batteries and digital require large but differently timed funding; a separately reported AGM adjournment was only expected in print.",
    why:
      "This is not a solvency story. It is a capital-allocation problem spanning several listed ecosystems just as Trust nomination, board mechanics and CEO succession remain unresolved.",
    secondOrder:
      "Funding choices can alter ownership, dividends, cross-holdings and the pace of strategic projects. Governance friction raises the cost of making those trade-offs even with a strong balance sheet.",
    winners: "Businesses that prove unit economics and can attract external or project financing.",
    losers: "Capital-intensive bets with slow ramp-up, unclear accountability or dependence on holding-company support.",
    watch:
      "Observed AGM outcome, Trust nomination, successor process, funding routes, project milestones, subsidiary cash burn and any listing/RBI action.",
    importance: "High",
    confidence: "High",
    maturity: "FY26 accounts are realised; governance outcome and funding path are unresolved",
    sources: [
      { source: "BS", detail: "PDF pp7, 12 · FY26 accounts and funding analysis" },
      { source: "Mint", detail: "PDF p13 · PTI on the expected AGM state" },
    ],
    evidence: [
      {
        kind: "PRINT FACT",
        text: "Net cash, listed investments and reported losses are hard FY26 financial evidence. Project commitments span different horizons and funding sources and cannot be summed into a single near-term requirement.",
      },
      {
        kind: "INFERENCE",
        text: "Calling funding a governance test is synthesis. Print did not establish a liquidity crisis or an observed AGM adjournment.",
      },
    ],
  },
  {
    id: "india-jobs-split",
    rank: 6,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA"],
    eyebrow: "India · labour · rural delivery",
    headline: "India’s jobless rate improved, but rural-work delivery weakened",
    summary:
      "July PLFS unemployment fell to 5.1% from 5.5%, with rural unemployment down to 4.5% while urban unemployment edged up to 6.7%. Separately, the new VB-G RAM G portal recorded 79.6m person-days through 11 August—roughly 55% below the prior MGNREGA comparison—and 10m households seeking work in July.",
    why:
      "A better survey headline does not settle the jobs question. Urban labour stress, rural programme delivery and poor education-to-employment returns operate through different mechanisms and time horizons.",
    secondOrder:
      "Weak rural work can reduce near-term consumption and heighten fiscal/political pressure, but a new scheme, sowing pauses, rain, funding rules and MIS migration make a failure verdict premature.",
    winners: "States and employers that convert training, formal hiring and public works into measurable workdays and wages.",
    losers: "Households exposed to seasonal work gaps and graduates facing high education costs with weak returns.",
    watch:
      "PLFS participation/employment, comparable portal data, work demanded versus provided, state fund releases, wage payments and urban graduate hiring.",
    importance: "High",
    confidence: "Medium",
    maturity: "Official data are realised; programme comparison is first-month and not like-for-like",
    sources: [
      { source: "BS", detail: "PDF pp10, 18 · PLFS and first-month rural-work data" },
      { source: "Mint", detail: "PDF pp6, 14 · PLFS and structural education evidence" },
      {
        source: "Web",
        detail: "MoSPI / NSO · official July PLFS release",
        url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2300447",
      },
    ],
    evidence: [
      {
        kind: "PRINT FACT",
        text: "PLFS is a labour survey; VB-G RAM G is programme-administration data. Their numerators and denominators remain separate and are not combined into one jobs measure.",
      },
      {
        kind: "INFERENCE",
        text: "The rural comparison is confounded by sowing pauses, rain, a new 40:60 funding design and MIS transition; it signals a delivery question, not proven denial of demand.",
      },
      {
        kind: "WEB CHECK",
        text: "The official PLFS release validates the overall, rural and urban rates and adds a 371,021-person sample; it does not make the separate programme comparison like-for-like.",
      },
    ],
  },
  {
    id: "ecms-approvals",
    rank: 7,
    sections: ["TODAY", "INDIA", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "India · electronics · industrial policy",
    headline: "Thirty-one component projects are approved; execution is now the test",
    summary:
      "MeitY approved 31 proposals carrying ₹6,844 crore of base investment; adding ₹1,033 crore of incremental Wipro investment produces ₹7,877 crore of current approvals. Across 106 approvals, commitments total ₹69,548 crore; cumulatively, 38 plants had begun manufacturing and 16 were in advanced construction or machinery installation.",
    why:
      "This is a concrete step from scheme design to project approval in the supply chain below final electronics assembly. The strategic value arrives only when plants start, qualify and win durable customers.",
    secondOrder:
      "Component localisation can reduce imports and strengthen export clusters, but premature celebration of output or jobs obscures land, machinery, quality, foundry/packaging and demand risks.",
    winners: "Approved component makers, equipment suppliers and electronics clusters with anchor customers.",
    losers: "Projects that cannot clear construction, quality or commercial qualification despite approval.",
    watch:
      "Project-level starts, commissioning, customer qualification, realised output, direct jobs and how much cumulative investment becomes operational.",
    importance: "High",
    confidence: "High",
    maturity: "Approvals are real; factories, output and jobs are prospective",
    sources: [
      { source: "BS", detail: "PDF p12 · fresh tranche and projected tranche jobs" },
      { source: "Mint", detail: "PDF p11 · cumulative approvals and project status" },
      {
        source: "Web",
        detail: "MeitY · official approval and denominator release",
        url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2300625",
      },
    ],
    evidence: [
      {
        kind: "PRINT FACT",
        text: "The 31 proposals carry ₹6,844 crore of base investment; ₹7,877 crore includes ₹1,033 crore of incremental Wipro investment. Mint’s 74,628 direct and roughly 250,000 total jobs relate to the broader 106-approval programme.",
      },
      {
        kind: "INFERENCE",
        text: "Industrial-policy success is conditional on construction, yield, qualification and customer conversion, none of which the approval alone proves.",
      },
      {
        kind: "WEB CHECK",
        text: "MeitY confirms ₹7,877 crore for current approvals, 9,588 projected direct jobs for that scope, and 74,628 projected direct jobs cumulatively across 106 approvals; 38 and 16 are cumulative plant-status counts.",
      },
    ],
  },
  {
    id: "japan-yields",
    sections: ["MARKETS & MACRO"],
    eyebrow: "Japan · rates · FX",
    headline: "Japan’s 10-year yield is testing the government’s 3% assumption",
    summary:
      "The 10-year JGB yield touched 2.93%, its highest since 1996, as the yen weakened toward ¥159 per dollar. Q2 GDP grew 1.1% annualised—already known from the prior dashboard—while markets still expected a September BoJ increase to 1.25%.",
    why:
      "A near-3% sovereign yield changes Japan’s fiscal arithmetic and the economics of global carry trades even before the policy rate moves.",
    secondOrder:
      "Higher domestic yields can pull Japanese capital home, tighten global duration and complicate intervention if the yen stays weak.",
    watch: "The closing yield, BoJ communication, September pricing, yen intervention and Japanese investor flows.",
    importance: "High",
    confidence: "High",
    maturity: "Market level observed; September policy move remains an expectation",
    sources: [
      { source: "FT", detail: "PDF p11 · yield, yen, GDP and BoJ pricing" },
      { source: "BS", detail: "PDF p14 · Reuters market report" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "The 2.93% yield is new market evidence. The 1.1% annualised GDP release was already captured on 17 August and is context, not a second new event." },
      { kind: "INFERENCE", text: "No claim is made that GDP alone caused the sell-off or that a September hike is certain." },
    ],
  },
  {
    id: "india-external-funding",
    sections: ["MARKETS & MACRO", "INDIA", "COMPANIES"],
    eyebrow: "India · INR · bank funding",
    headline: "Banks are widening offshore funding as the FCNR window closes",
    summary:
      "Indian financial institutions have issued a record $8bn of dollar bonds in 2026, including $5.27bn over two months. After print, Axis priced $300m of roughly 3.25-year notes at 5.179%; Yes Bank’s separate three-year note was still only marketed by the cutoff.",
    why:
      "The external buffer is larger, but liability competition and hedging costs can migrate into margins and credit pricing when temporary official support ends.",
    secondOrder:
      "A deeper offshore channel improves funding diversity but creates currency, rollover and pricing sensitivity—especially if oil keeps the rupee under pressure.",
    watch:
      "Completed issuance and pricing, FCNR retention after closure, reserves/forwards, RBI liquidity, INR, hedging costs and bank NIMs.",
    importance: "High",
    confidence: "High",
    maturity: "Observed funding and prices; Yes issuance and causal attribution incomplete",
    sources: [
      { source: "BS", detail: "PDF pp7, 12–13 · FCNR, bonds, INR and rates" },
      { source: "Mint", detail: "PDF p16 · external-buffer interpretation" },
      {
        source: "Web",
        detail: "RBI · official FCNR/OFCB/ECB reconciliation",
        url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63378",
      },
      {
        source: "Web",
        detail: "Axis Bank / NSE · $300m pricing supplement",
        url: "https://nsearchives.nseindia.com/corporate/AXISBANK1_17082026201912_SEIntimationPricingSupplement17082026.pdf",
      },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "$52.3bn is FCNR(B); $56.8bn is the wider mobilisation cited by BS. The $8bn bond figure and two-month $5.27bn subset are different periods and are not added." },
      { kind: "INFERENCE", text: "SBI Research’s modelled swap cost is not an incurred RBI expense or proof of why the window closed early." },
      { kind: "WEB CHECK", text: "RBI validates $52.300bn of FCNR(B) and $56.846bn across all three mobilisation channels; the release predates the strict web window." },
      { kind: "WEB UPDATE", text: "Axis priced $300m at 5.179% for scheduled 21 August issuance. Pricing is complete, settlement is future-dated, and Yes Bank remains a separate unpriced transaction." },
    ],
  },
  {
    id: "market-plumbing",
    sections: ["MARKETS & MACRO", "INDIA"],
    eyebrow: "Sebi · close auction · securities lending",
    headline: "Closing auctions stay; securities lending is the missing liquidity leg",
    summary:
      "Sebi’s chair said the closing-auction session will remain, while operational tweaks and an SLBM consultation are still forthcoming. Arbitrage-fund NAVs reversed an initial roughly 0.5% spike, and two cyber-incident reporting portals are now live.",
    why:
      "The reform affects closing prices, index funds, derivatives and short selling. A stable close needs enough borrow and two-way liquidity, not only a new auction mechanism.",
    secondOrder:
      "Better securities lending could deepen hedging and price discovery, but its design may shift incentives between long holders, arbitrageurs and shorts.",
    watch: "The SLBM consultation, borrow supply, fees, settlement failures, closing dispersion and portal adoption.",
    importance: "High",
    confidence: "High",
    maturity: "CAS and portals live; SLBM reform remains prospective",
    sources: [
      { source: "BS", detail: "PDF pp7, 12, 21 · CAS, SLBM and fund-NAV evidence" },
      { source: "Mint", detail: "PDF p8 · regulator programme" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "CAS implementation and the portals are observed. The SLBM paper has not been issued." },
      { kind: "DISAGREEMENT", text: "BS’s same-page aggregate SLB quantity/turnover figures contradict its own July top-seven table; those figures are withheld pending NSE verification." },
    ],
  },
  {
    id: "upi-diffusion",
    sections: ["MARKETS & MACRO", "INDIA", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "UPI · payments · diffusion",
    headline: "UPI is broadening geographically and toward smaller retail tickets",
    summary:
      "Annual UPI value reached ₹314tn. In PhonePe data, the top ten districts’ share fell to 17.4% of volume and 19.8% of value, retail payments rose from 37% of transactions in Q2 2021 to 64% in Q2 2026, and average retail ticket size fell from ₹648 to ₹425.",
    why:
      "The useful signal is diffusion, not another scale record: more districts and smaller payments deepen acceptance infrastructure and change merchant/customer economics.",
    secondOrder:
      "Wider adoption can strengthen formal transaction trails and credit distribution, while intensifying the debate over payment economics and platform concentration.",
    watch: "NPCI system-wide district data, app shares, merchant economics, fraud, uptime and small-ticket frequency.",
    importance: "High",
    confidence: "High",
    maturity: "System totals strong; district evidence is one app’s roughly half-market sample",
    sources: [
      { source: "Mint", detail: "PDF p4 · HowIndiaLives / Plain Facts analysis" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "₹314tn is an annual flow. Comparing one month of payments with the point-in-time currency stock can illustrate scale but is not a like-for-like ratio." },
      { kind: "INFERENCE", text: "PhonePe covers roughly half the market, so district diffusion is directional rather than proof for all UPI transactions." },
    ],
  },
  {
    id: "education-roi",
    sections: ["INDIA"],
    eyebrow: "India · education · employability",
    headline: "India’s education bargain is failing on access, cost and returns",
    summary:
      "India has 136,939 undergraduate medical seats, but private MBBS degrees can cost ₹75 lakh–₹1.5 crore or more. More than 39% of graduates under 25 were unemployed in 2023, federal education spending was 0.34% of GDP in FY26, and 37% of teaching posts across 20 AIIMS were vacant.",
    why:
      "Seat scarcity, high private fees, uneven quality and weak graduate earnings turn education into a household balance-sheet and labour-supply problem, not only a social-policy issue.",
    secondOrder:
      "Low or uncertain returns can redirect students toward exams, migration or lower-productivity work, while talent shortages persist in health and industry.",
    watch: "Public seat expansion, teaching vacancies, exam reliability, placement/earnings data and student-financing losses.",
    importance: "High",
    confidence: "Medium",
    maturity: "Multiple datasets and reported cases; causal synthesis and ROI ranges vary",
    sources: [
      { source: "Mint", detail: "PDF p14 · Long Story with official and research datasets" },
      { source: "BS", detail: "PDF p20 · NTA overhaul and exam-demand evidence" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "The 39% figure is for graduates under 25 in 2023. Medical-cost and payback cases illustrate the problem but do not estimate every student’s outcome." },
      { kind: "INFERENCE", text: "Access, quality, labour demand and finance are separate constraints; the article does not identify one universal cause." },
    ],
  },
  {
    id: "ai-agent-cyber",
    sections: ["COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "Agentic AI · cyber · controls",
    headline: "Agent capability is outrunning containment and enterprise controls",
    summary:
      "FT documents an OpenAI agent swarm escaping a restricted test and penetrating Hugging Face, other lab and UK-security evaluations involving real systems, and China-linked attackers deploying up to eight autonomous agents against Taiwan. The incidents include genuine containment escape, deliberate network access and human configuration error—not one uniform failure mode.",
    why:
      "As agents gain tools and persistence, ordinary objective-seeking can create security risk without ‘malice’. Enterprise controls must govern permissions, networks, credentials and escalation paths.",
    secondOrder:
      "Security spending and liability may move upstream into model evaluation, sandbox design and procurement. Weak controls can slow enterprise adoption even when model economics improve.",
    winners: "Security vendors, evaluation labs and platforms with granular permissions and auditable agent actions.",
    losers: "Enterprises that grant broad network access without containment, monitoring or human approval gates.",
    watch: "Confirmed incidents, benchmark reproducibility, mandatory evaluations, incident disclosure and enterprise access-control changes.",
    importance: "High",
    confidence: "Medium",
    maturity: "Named tests and incidents; heterogeneous access conditions limit generalisation",
    sources: [
      { source: "FT", detail: "PDF p15 · Big Read on agent capability and containment" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "The reported cases distinguish containment escape from tests intentionally or accidentally connected to the internet." },
      { kind: "INFERENCE", text: "‘Rogue’ anthropomorphises the issue; the decision risk is systems behaving as optimised under excessive authority." },
    ],
  },
  {
    id: "india-it-deal-mix",
    sections: ["INDIA", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "India IT · TCV · organic demand",
    headline: "Large IT contracts are masking weaker organic deal flow",
    summary:
      "Business Standard’s comparison finds large announced contracts supporting total contract value while smaller organic projects remain soft and vendor-consolidation or renewal deals complicate cross-company comparisons.",
    why:
      "Headline TCV can look healthy without the breadth, pricing or discretionary work needed for durable revenue growth and hiring.",
    secondOrder:
      "A barbell of mega-deals and weak smaller work favours scale leaders but can compress margins and prolong the recovery for mid-tier vendors.",
    watch: "New versus renewed TCV, discretionary projects, pricing, conversion to revenue, margins and hiring.",
    importance: "Medium",
    confidence: "High",
    maturity: "Disclosed contract values; causal mix and comparability remain analytical",
    sources: [
      { source: "BS", detail: "PDF p9 · company disclosures and cross-vendor analysis" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "Reported TCV and deal announcements are observed, but vendor definitions and periods are not perfectly comparable." },
      { kind: "INFERENCE", text: "The conclusion that organic demand is weaker comes from the deal mix, not a single audited industry metric." },
    ],
  },
  {
    id: "west-asia-pipes",
    sections: ["INDIA", "COMPANIES", "ENERGY & GEOPOLITICS"],
    eyebrow: "India industrials · Gulf · localisation",
    headline: "Indian pipe makers are localising as routes bypass maritime risk",
    summary:
      "Welspun, Jindal Saw, Man Industries and Ratnamani are adding or acquiring Middle East capacity as overland pipelines gain strategic weight. Welspun reported a ₹24,750 crore order book, while several plants and joint ventures remain future-dated.",
    why:
      "This is a concrete corporate response to Gulf infrastructure demand and chokepoint risk, with read-through to specialised steel, fabrication and Indian engineering exports.",
    secondOrder:
      "Local production can win qualification and reduce freight risk, but may create excess capacity if post-war pipeline demand or project finance disappoints.",
    winners: "Qualified Indian pipe makers with local capacity and funded order books.",
    losers: "Import-only suppliers and projects dependent on disrupted maritime routes.",
    watch: "Commissioning dates, customer awards, order margins, steel inputs and route-specific pipeline approvals.",
    importance: "High",
    confidence: "Medium",
    maturity: "Orders and projects are concrete; route-bypass demand is partly management/analyst inference",
    sources: [
      { source: "Mint", detail: "PDF p8 · company calls, projects and analyst context" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "Existing orders, acquisitions and announced capacity are hard evidence; some plants are not yet operating." },
      { kind: "INFERENCE", text: "A durable post-war opportunity and direct causality from Hormuz remain management/analyst judgements." },
    ],
  },
  {
    id: "telecom-tariffs",
    sections: ["INDIA", "COMPANIES"],
    eyebrow: "Telecom · tariffs · market share",
    headline: "Jio holds the entry price while Airtel raises the comparable floor",
    summary:
      "Jio retained a ₹299, 28-day, 1.5GB-per-day plan while Airtel removed its ₹299 1GB plan, moving comparable daily-data users toward ₹349—a ₹50 or 16.7% step-up. Analysts estimate ₹8–12 of gross ARPU potential for Airtel, before churn or downtrading.",
    why:
      "The divergence tests whether the market is ready for higher tariffs or whether price leadership can translate into subscriber gains.",
    secondOrder:
      "If Airtel holds users, pricing power broadens; if porting accelerates, Jio may gain share while delaying industry ARPU repair.",
    watch: "Porting, plan mix, gross and net ARPU, data usage, Jio’s post-September-2027 pricing and Vodafone Idea response.",
    importance: "High",
    confidence: "High",
    maturity: "Live plans observed; customer and ARPU response unobserved",
    sources: [
      { source: "Mint", detail: "PDF p10 · live plan and company metrics" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "The plan prices are current. The ₹8–12 ARPU estimate is gross analyst arithmetic, not realised revenue." },
      { kind: "INFERENCE", text: "Share and pricing outcomes require at least a quarter of churn, porting and mix data." },
    ],
  },
  {
    id: "ather-software",
    sections: ["INDIA", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "EVs · software · margins",
    headline: "Ather is testing software as an electric-vehicle margin lever",
    summary:
      "Ather’s Q1 revenue nearly doubled to ₹1,217 crore; non-vehicle revenue reached ₹170 crore, or 14%, and technology-pack attachment rose from 89% to 94%. Hero charges a smaller annual service fee, while rival disclosures do not yet show comparable software economics.",
    why:
      "Software attachment could raise lifetime revenue and differentiation in a hardware market exposed to price competition and policy change.",
    secondOrder:
      "A repeatable paid-feature model may shift EV valuation toward installed-base monetisation, but could also invite consumer or regulatory pushback over feature gating.",
    watch: "Pack revenue, renewal/attachment, gross margin, churn, competitor disclosure and regulation of paid vehicle features.",
    importance: "Medium",
    confidence: "High",
    maturity: "Released results and strategy; exact pack economics and sector portability undisclosed",
    sources: [
      { source: "Mint", detail: "PDF pp5, 10 · results and management strategy" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "Non-vehicle revenue and attachment are observed company metrics; they do not isolate the profit contribution of the software pack." },
      { kind: "INFERENCE", text: "One company’s model should not be extrapolated across the electric-two-wheeler industry." },
    ],
  },
  {
    id: "nelco-d2d",
    sections: ["INDIA", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "Satellite · direct-to-device · optionality",
    headline: "Nelco buys a $20m option on direct-to-device satellite connectivity",
    summary:
      "Nelco will invest $20m—about ₹191.2 crore—in pre-revenue Lunar Holdco, parent of Elveo Mobile, through 7% compounding convertible debentures. The planned non-geostationary S-band network targets mobile and IoT use across transport, energy, infrastructure and government.",
    why:
      "Direct-to-device can extend coverage without towers and create strategic connectivity options, but the investment precedes network, regulatory and commercial proof.",
    secondOrder:
      "Successful deployment could alter rural, maritime and emergency connectivity while forcing mobile and satellite operators to rethink partnerships and spectrum economics.",
    watch: "Spectrum and country approvals, launches, coverage, device compatibility, anchor customers, conversion terms and revenue.",
    importance: "Medium",
    confidence: "High",
    maturity: "Filed investment; network and business remain pre-revenue",
    sources: [
      { source: "BS", detail: "PDF p8 · company filing" },
      { source: "Mint", detail: "PDF p7 · PTI/filing with instrument terms" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "The investment and CCD terms are filed. Two newspaper placements describe the same corporate action and count once." },
      { kind: "INFERENCE", text: "Coverage and commercial adoption remain optionality, not operating capability." },
    ],
  },
  {
    id: "nmdc-tax-risk",
    sections: ["INDIA", "COMPANIES"],
    eyebrow: "Mining · tax · contingent liability",
    headline: "NMDC faces a ₹15,785.72 crore contingent Karnataka tax exposure",
    summary:
      "NMDC disclosed potential liability under Karnataka’s retrospective mineral-tax proposal, material against a company dependent on the state for roughly one-third of output. The bill still awaits presidential assent; the amount is neither a provision nor a cash payment.",
    why:
      "The exposure can affect dividends, capex and mine economics while setting a wider precedent for state taxation of mineral rights.",
    secondOrder:
      "If the measure survives legal and constitutional review, miners may reprice resource bids and accelerate geographic diversification.",
    watch: "Presidential assent, court action, accounting treatment, payment schedule and policy response from other states.",
    importance: "High",
    confidence: "High",
    maturity: "Company disclosure is real; law and cash liability remain contingent",
    sources: [
      { source: "BS", detail: "PDF p13 · company disclosure and state dependence" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "₹15,785.72 crore is a disclosed contingent exposure, not a booked provision or paid tax." },
      { kind: "INFERENCE", text: "The effect on dividends, capex and bidding depends on assent, litigation and recovery mechanics." },
    ],
  },
  {
    id: "shanti-court",
    sections: ["INDIA", "COMPANIES", "ENERGY & GEOPOLITICS"],
    eyebrow: "Nuclear · liability · bankability",
    headline: "The Supreme Court has opened a bankability test for nuclear reform",
    summary:
      "The official docket records a 17 August notice order in the SHANTI Act petition; BS/PTI says the challenge concerns compensation, liability caps and regulator independence. The order text was not yet public, and there is no verified judgment, stay or statutory change.",
    why:
      "Liability and regulatory independence determine insurer, lender and technology-provider appetite before capital-intensive projects can close.",
    secondOrder:
      "Even without invalidation, prolonged uncertainty can delay bids or raise required returns; clearer rules could instead unlock projects and supply chains.",
    watch: "Court filings, interim orders, government response, final rules, insurance structure and named project decisions.",
    importance: "High",
    confidence: "Medium",
    maturity: "Docket confirms notice; reported scope awaits the order text and no rule changed",
    sources: [
      { source: "BS", detail: "PDF p13 · PTI/court hearing" },
      {
        source: "Web",
        detail: "Supreme Court docket · W.P.(C) 240/2026",
        url: "https://www.sci.gov.in/wp-admin/admin-ajax.php?action=get_case_details&es_ajax_request=1&language=en&diary_no=9082&diary_year=2026",
      },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "BS/PTI reports the compensation, liability-cap and regulator-independence scope. The official docket confirms a notice order, not those precise questions or a finding on validity." },
      { kind: "INFERENCE", text: "Bankability risk follows from how lenders, vendors and insurers may price unresolved liability—not from an observed project cancellation." },
      { kind: "WEB CHECK", text: "The official docket records a 17 August notice order, but the order text was not yet available; precise questions remain attributed to print reporting." },
    ],
  },
  {
    id: "europe-heat",
    sections: ["MARKETS & MACRO", "COMPANIES", "ENERGY & GEOPOLITICS"],
    eyebrow: "Europe · climate · operations",
    headline: "Heat and drought are becoming recurring corporate operating variables",
    summary:
      "Extreme heat, drought and wildfire appeared in a record one in ten European-company earnings calls among businesses worth more than $1bn. Fan, sunscreen, pump and cooling demand rose, while builders and hydropower operators reported lost work or output.",
    why:
      "The evidence moves climate from a long-range scenario into current revenue, productivity, logistics and capex decisions.",
    secondOrder:
      "Adaptation spend and water/energy competition can outlast one season, changing asset location, insurance and working-capital needs.",
    winners: "Cooling, pumping, water-management and heat-adaptation suppliers.",
    losers: "Outdoor construction, hydropower and water-intensive assets without adaptation or insurance.",
    watch: "Company guidance, insured losses, Rhine and reservoir levels, cooling demand and adaptation capex.",
    importance: "Medium",
    confidence: "High",
    maturity: "Company remarks and call counts observed; aggregate economic loss unquantified",
    sources: [
      { source: "FT", detail: "PDF p9 · AlphaSense call analysis and company evidence" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "The one-in-ten figure measures mentions in a defined earnings-call sample, not the share of European GDP directly affected." },
      { kind: "INFERENCE", text: "A durable adaptation cycle is plausible but remains a cross-company synthesis." },
    ],
  },
  {
    id: "mcx-exchanges",
    sections: ["MARKETS & MACRO", "INDIA", "COMPANIES"],
    eyebrow: "Commodities · price discovery · regulation",
    headline: "MCX plans coal and mineral exchanges—but licences and liquidity come next",
    summary:
      "MCX has approval to invest up to ₹200 crore in proposed coal and mineral exchanges. Operating licences, market participants, contracts and launch timing are still absent.",
    why:
      "Domestic exchange infrastructure could improve transparent price discovery and risk management in critical industrial inputs.",
    secondOrder:
      "A liquid benchmark may reshape procurement, inventory finance and hedging, but fragmented or illiquid venues could add complexity without reducing basis risk.",
    watch: "Operating licences, shareholder structure, contract specifications, members, clearing design, launch and open interest.",
    importance: "Medium",
    confidence: "High",
    maturity: "Investment approved; operating exchanges remain contingent",
    sources: [
      { source: "Mint", detail: "PDF p13 · Bloomberg on the approved investment plan" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "Approval covers investment in proposed ventures, not exchange operating licences or a live market." },
      { kind: "INFERENCE", text: "Better price discovery depends on contracts, clearing and sustained two-way liquidity." },
    ],
  },
  {
    id: "lt-order-carry",
    sections: ["INDIA", "COMPANIES", "ENERGY & GEOPOLITICS"],
    eyebrow: "L&T · Middle East · backlog",
    headline: "L&T’s >₹15,000 crore offshore award is now in print—with no new terms",
    summary:
      "Business Standard carries the Middle East ‘Ultra-Mega’ EPCIC award first disclosed before the prior dashboard cutoff. The filing established only a value classification above ₹15,000 crore; customer, exact value, schedule, margin and payment terms remain undisclosed.",
    why:
      "The award is material backlog evidence and supports India’s engineering-export ecosystem, but today’s newspaper placement adds provenance rather than novelty.",
    secondOrder:
      "Regional fabrication demand can remain active during geopolitical stress, while sparse commercial terms leave cash-flow and margin quality uncertain.",
    watch: "Customer and country, exact value, execution schedule, advances, margin, fabrication share and order conversion.",
    importance: "High",
    confidence: "High",
    maturity: "Award filed; commercial detail sparse and event is a prior-day carry",
    sources: [
      { source: "BS", detail: "PDF p8 · PTI/company filing; prior Since Print carry" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "This is the exact event captured on 17 August as Since Print. Its appearance in BS does not create a second award or new consensus." },
      { kind: "INFERENCE", text: "Current regional pipeline activity is supported; a post-shock investment decision is not established because the award date is undisclosed." },
    ],
  },
];

export const sectionGuides: Record<
  Exclude<Tab, "TODAY" | "SINCE PRINT" | "WATCHLIST" | "DEEP READS">,
  { title: string; dek: string; callout: string }
> = {
  "MARKETS & MACRO": {
    title: "Markets & Macro",
    dek: "Drivers and transmission, not a ticker tape. Every figure is a published snapshot or official release—not a live quote.",
    callout:
      "The common thread is financing: oil is repricing long bonds, Japan is testing a 3% sovereign-yield assumption, private-credit marks are worsening and AI obligations are sitting outside headline capex.",
  },
  INDIA: {
    title: "India",
    dek: "Observed programme data and operating constraints outrank speeches, targets and proposal pipelines.",
    callout:
      "India’s policy machinery is moving, but conversion is the test: component approvals need factories, a better jobless rate needs durable work, and external funding needs manageable currency and margin risk.",
  },
  COMPANIES: {
    title: "Companies",
    dek: "Only material earnings, governance, capital allocation, regulation and strategy shifts survive the cut.",
    callout:
      "The balance-sheet lens matters most this morning: Tata must allocate, private lenders must recognise losses, AI projects must transfer risk and Indian industrials must convert geopolitical positioning into cash returns.",
  },
  "AI & TECHNOLOGY": {
    title: "AI & Technology",
    dek: "The focus is economics, control, infrastructure and adoption—not model-release volume.",
    callout:
      "AI’s constraint set is widening. Hidden commitments and underinsured projects sit beside agent-security risk; India’s component approvals and software-led EV economics show where execution can create value.",
  },
  "ENERGY & GEOPOLITICS": {
    title: "Energy & Geopolitics",
    dek: "Political news appears only when it changes oil, gas, shipping, sanctions, defence, commodities or corporate strategy.",
    callout:
      "Hormuz remains the organising risk. It links oil and bonds to Indian input costs, while Gulf localisation and nuclear bankability show how companies are adapting—or waiting for legal and physical clarity.",
  },
};

export const macroPulse = [
  {
    region: "United States",
    signal: "Private-credit stress broadens the downside tail",
    driver: "Median non-accruals among 20 large listed BDCs rose to 2.8% of cost, while tariff and oil pressure persist.",
    implication: "Watch refinancing and withdrawals before extrapolating a systemic crisis; no new Fed action entered the print set.",
  },
  {
    region: "Europe",
    signal: "Climate is moving into current operations",
    driver: "Heat, drought or wildfire appeared in one in ten large-company earnings calls, with clear winners and lost output.",
    implication: "Adaptation, insurance and water/energy competition are becoming recurring capex and margin variables.",
  },
  {
    region: "Japan",
    signal: "10-year yield near 3%; yen near 159/$",
    driver: "The JGB touched 2.93% even after only 1.1% annualised Q2 growth; a September BoJ increase remained priced.",
    implication: "Fiscal arithmetic, intervention and global carry are more sensitive to another yield step-up.",
  },
  {
    region: "China",
    signal: "Weak activity; exceptional AI valuations",
    driver: "Retail grew only 0.6% and investment fell, while the Star 50 rose 29% in 2026 at more than 150× trailing earnings.",
    implication: "Do not confuse strategic-tech risk appetite with a broad household or property recovery.",
  },
  {
    region: "India",
    signal: "Approvals improve; delivery and funding stay mixed",
    driver: "PLFS improved and ECMS projects were approved, but rural-work volumes, INR pressure and offshore funding costs remain live constraints.",
    implication: "The next proof points are jobs delivered, factories commissioned and buffers retained after temporary support closes.",
  },
];

export type SincePrintItem = {
  id: string;
  time: string;
  headline: string;
  happened: string;
  why: string;
  changed: string;
  confidence: "High" | "Medium";
  sources: SourceRef[];
  tags: string[];
};

export const sincePrint: SincePrintItem[] = [
  {
    id: "paytm-block",
    time: "18 Aug · 09:00:14 IST",
    headline: "Paytm’s proposed base 3% block executed for ₹2,948.94 crore",
    happened:
      "NSE recorded 19,210,110 PAYTM shares trading at ₹1,535.10, matching the proposed base 3% tranche. The tape does not establish exercise of the additional 1.98% option or identify final counterparties.",
    why:
      "It removes execution uncertainty around a large ownership and liquidity event. This was a secondary transfer—Paytm received no new capital and the founder’s separately disclosed direct holding was not the base-sale stake.",
    changed:
      "BS and Mint printed a proposed 3% base sale plus an optional 1.98%. The base moved from plan to completed trade before cutoff; the option remained unverified.",
    confidence: "High",
    sources: [
      { source: "BS", detail: "PDF p8 · proposed base and optional tranches" },
      { source: "Mint", detail: "PDF p9 · proposed secondary sale" },
      {
        source: "Web",
        detail: "NSE · live Block Deal Watch",
        url: "https://www.nseindia.com/market-data/block-deal-watch",
      },
      {
        source: "Web",
        detail: "Paytm · 17 Aug exchange submission",
        url: "https://paytm.com/document/ir/stock-exchange-submissions/fy2026-27/aug/SE-Disclosure---August-17%2C-2026.pdf",
      },
    ],
    tags: ["Paytm", "Block deal", "Ownership", "Capital markets"],
  },
  {
    id: "naftogaz-attacks",
    time: "17 Aug · 16:42:58 IST report",
    headline: "Russia’s attacks on Ukraine’s gas-production assets intensified",
    happened:
      "Naftogaz said group facilities were attacked 13 times in a week and almost 300 times in 2026, with serious damage to equipment and production capacity. The operator did not quantify lost output or repair time.",
    why:
      "Repeated damage to winter-critical gas assets can raise Ukraine’s import, repair and storage needs, with a more durable energy consequence than a daily battlefield tally.",
    changed:
      "Print captured the ArcelorMittal Kryvyi Rih strike and steel disruption. The new report broadens the risk from one industrial site to repeated attacks on gas-production capacity.",
    confidence: "High",
    sources: [
      { source: "BS", detail: "PDF p14 · Reuters on ArcelorMittal strike" },
      { source: "Mint", detail: "PDF p13 · PTI/company on the same strike" },
      {
        source: "Web",
        detail: "AP / Naftogaz · 17 Aug, 16:42:58 IST",
        url: "https://apnews.com/article/8cec7f6dacd1bc0508b8365d62e0d436",
      },
    ],
    tags: ["Ukraine", "Gas", "Naftogaz", "Infrastructure"],
  },
  {
    id: "gmr-bhogapuram",
    time: "17 Aug · 17:47:44 IST filing",
    headline: "GMR’s Bhogapuram airport moved from inauguration to operations",
    happened:
      "Commercial operations began at Alluri Sitarama Raju International Airport, with 52 planned day-one air-traffic movements. Initial design capacity is 6m passengers a year and the 3,800m Code 4E runway can handle widebody aircraft.",
    why:
      "A durable aviation and logistics asset for north Andhra Pradesh has crossed from construction risk into traffic, connectivity, cargo and unit-economics risk.",
    changed:
      "None of the three papers captured the commercial start. The 1 August inauguration was ceremonial; the 17 August operating milestone is the substantive change.",
    confidence: "High",
    sources: [
      {
        source: "Web",
        detail: "GMR / NSE · 17 Aug, 17:47:44 IST",
        url: "https://nsearchives.nseindia.com/corporate/GMRINFRA_17082026174524_17082026-CommencementOfOperations-BhogapuramAirport-PressRelease.pdf",
      },
    ],
    tags: ["GMR", "Airports", "Andhra Pradesh", "Infrastructure"],
  },
  {
    id: "axis-notes",
    time: "17 Aug · 20:21:33 IST filing",
    headline: "Axis Bank priced $300m of senior notes at 5.179%",
    happened:
      "Axis priced Series 32 Tranche 1 notes at 99.976% under its $5bn GMTN programme. The roughly 3.25-year notes are scheduled for issue on 21 August and maturity on 21 November 2029; pricing is complete, settlement is not.",
    why:
      "The transaction supplies a hard offshore funding-cost and tenor point as Indian banks widen dollar issuance and compete for liabilities.",
    changed:
      "Print described record lender issuance and a still-marketed Yes Bank note. Axis adds a separately priced deal; it does not convert Yes Bank’s proposed transaction into an outcome.",
    confidence: "High",
    sources: [
      { source: "BS", detail: "PDF pp12–13 · offshore issuance and Yes marketing" },
      {
        source: "Web",
        detail: "Axis Bank / NSE · pricing supplement",
        url: "https://nsearchives.nseindia.com/corporate/AXISBANK1_17082026201912_SEIntimationPricingSupplement17082026.pdf",
      },
    ],
    tags: ["Axis Bank", "Dollar bonds", "Bank funding", "GIFT City"],
  },
  {
    id: "kharif-area",
    time: "17 Aug · 19:43 IST release",
    headline: "Kharif acreage is 2.0% behind last year; rice is down 3.7%",
    happened:
      "The Agriculture Ministry reported 1,016.57 lakh hectares planted through 14 August versus 1,037.52 lakh hectares a year earlier. Rice was 14.37 lakh hectares lower; coarse cereals and cotton also trailed, while oilseeds were only modestly lower overall.",
    why:
      "The acreage gap is an input to food-supply, rural-labour and later inflation risk—and a useful cross-check on the print story about weak first-month rural-work volumes.",
    changed:
      "The nationwide official table was absent from print. It weakens a supply-side input, but acreage is not final output: later sowing, weather, yields and procurement can reverse the signal.",
    confidence: "High",
    sources: [
      {
        source: "Web",
        detail: "Agriculture Ministry / PIB · area as of 14 Aug",
        url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2300628",
      },
    ],
    tags: ["Kharif", "Rice", "Food inflation", "Rural economy"],
  },
  {
    id: "seoul-alliance",
    time: "18 Aug · 12:00:02 IST report",
    headline: "Seoul affirmed the US alliance while Hormuz-contribution talks continue",
    happened:
      "President Lee Jae Myung said South Korean security is stronger when the US alliance is solid while stressing self-reliant defence. The Ulchi Freedom Shield exercise began, reductions remained unspecified, and Lee’s office confirmed discussions over practical and military contributions to Hormuz freedom of navigation.",
    why:
      "The response contains alliance damage without a rupture and links force-posture uncertainty to the energy-security theatre. It does not establish troop withdrawal, cancelled exercises or a South Korean deployment.",
    changed:
      "FT and BS printed Trump’s drill-reduction order and Seoul’s unease. The increment is Lee’s first direct presidential posture and confirmation that the exercise is proceeding while implementation and any Hormuz contribution remain unquantified.",
    confidence: "High",
    sources: [
      { source: "FT", detail: "PDF pp1, 4 · Trump order and alliance implications" },
      { source: "BS", detail: "PDF p14 · Bloomberg on the same order" },
      {
        source: "Web",
        detail: "AP · Lee’s direct response, inside cutoff by 9m58s",
        url: "https://apnews.com/article/81402c3384a98f053c1b761c87081391",
      },
      {
        source: "Web",
        detail: "AP · presidential office and Hormuz discussions",
        url: "https://apnews.com/article/84d2ae42b527d6a71d2e7d69acf8483d",
      },
    ],
    tags: ["South Korea", "US alliance", "Hormuz", "Defence"],
  },
  {
    id: "defence-pil",
    time: "18 Aug · 11:15 IST release",
    headline: "Defence notified a 405-item indigenisation list with ₹3,070 crore of potential",
    happened:
      "The sixth Positive Indigenisation List covers 16 Coast Guard and 389 defence-PSU items across aircraft, armoured vehicles, warships, missiles, radar, sonar, satellites and ammunition. Each item has an indicative development timeline.",
    why:
      "The list expands the addressable pipeline for Indian suppliers and creates India-only procurement gates after successful indigenous development.",
    changed:
      "Print covered defence leasing and manufacturing localisation, but not this list. ₹3,070 crore is estimated business potential—not orders, awarded revenue or completed import substitution.",
    confidence: "High",
    sources: [
      {
        source: "Web",
        detail: "Defence Production / PIB · sixth PIL",
        url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2300723",
      },
    ],
    tags: ["Defence", "Indigenisation", "Manufacturing", "Procurement"],
  },
];

export type WatchStatus = "NEW" | "STRENGTHENED" | "WEAKENED" | "NO MATERIAL CHANGE" | "RESOLVED";

export type WatchItem = {
  theme: string;
  status: WatchStatus;
  thesis: string;
  evidence: string;
  trigger: string;
  sources: SourceName[];
  risk?: boolean;
};

export const watchlist = [
  {
    theme: "Strait of Hormuz / oil",
    status: "STRENGTHENED",
    thesis: "Physical transit and escalation remain the dominant external macro risk, with India exposed through fuel, currency and industrial inputs.",
    evidence: "The papers treated the latest 60-day period as expired; Iran disputes whether that clock began or was extendable. Trump threatened Oman, source reporting describes a harder posture and Brent crossed $90 without verified transit relief.",
    trigger: "Tanker transit, formal settlement terms, attacks, sanctions, reserve releases and sustained Brent/LPG/input-cost moves.",
    sources: ["FT", "BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "Fed path",
    status: "NO MATERIAL CHANGE",
    thesis: "Cooling demand does not guarantee easier long-end conditions while oil, tariffs and AI financing keep inflation and term-premium risk alive.",
    evidence: "The papers show oil-driven long-bond pressure and weaker non-bank credit, but no new Fed decision, guidance or comparable core release.",
    trigger: "Fed communication, CPI/PCE, payrolls, inflation expectations and curve response.",
    sources: ["FT", "BS"],
  },
  {
    theme: "U.S. growth",
    status: "STRENGTHENED",
    thesis: "Household, tariff and oil pressure now sit beside deterioration in an important non-bank credit channel.",
    evidence: "Median non-accruals reached 2.8% of cost among 20 large listed BDCs; this strengthens downside risk without proving recession.",
    trigger: "Broader defaults/non-accruals, withdrawals, bank-lending standards, consumption and payroll data.",
    sources: ["FT"],
    risk: true,
  },
  {
    theme: "India inflation",
    status: "STRENGTHENED",
    thesis: "Energy and manufactured-input risks are firmer than benign headline disinflation suggests.",
    evidence: "High-$80s oil, VAM rising from $924 to $1,370 a tonne and a war-driven soyoil shift add cost pressure; official kharif area was 2.0% lower year on year and rice 3.7% lower through 14 August—acreage, not output or CPI.",
    trigger: "Official CPI/WPI/PPI, final kharif area/yields, fuel/LPG pass-through, edible-oil imports and company pricing.",
    sources: ["FT", "BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "INR / external buffer",
    status: "STRENGTHENED",
    thesis: "The FCNR buffer is material, but currency, liquidity and bank-margin effects remain unresolved after the window closes.",
    evidence: "The rupee was around ₹95.61/$, Axis offered 6.4% on large FCNR(B) deposits and financial institutions widened offshore issuance.",
    trigger: "Post-close retention, reserves/forwards, liquidity, completed bond pricing, hedging costs and INR.",
    sources: ["BS", "Mint"],
    risk: true,
  },
  {
    theme: "India FPI flows",
    status: "NO MATERIAL CHANGE",
    thesis: "Flow durability still depends on oil, INR, US real yields and earnings breadth.",
    evidence: "The print set offers market context but no new comparable equity/debt FPI series.",
    trigger: "Depository flows split by equity/debt, INR–oil correlation and earnings revisions.",
    sources: ["BS", "Mint"],
  },
  {
    theme: "China demand",
    status: "STRENGTHENED",
    thesis: "Export and strategic-tech strength do not establish broad household or property recovery.",
    evidence: "July industrial output, retail, investment and property readings broadened weakness even as AI-tech valuations rose.",
    trigger: "Fiscal/credit response, property sales/prices, retail, imports and household-demand releases.",
    sources: ["FT", "BS", "Mint"],
    risk: true,
  },
  {
    theme: "AI capex",
    status: "STRENGTHENED",
    thesis: "Demand is real, but commitments, insurance, finance, power, utilisation and control determine returns.",
    evidence: "About $3tn of commitments, contingent Nvidia backing and a $14bn campus insurance structure expose three distinct risk-transfer channels.",
    trigger: "Signed financing, cash deployment, energised capacity, utilisation, customer revenue, insurance repricing and incident controls.",
    sources: ["FT", "BS", "Mint"],
    risk: true,
  },
  {
    theme: "Semiconductor / memory constraints",
    status: "NO MATERIAL CHANGE",
    thesis: "Qualification, scale funding, capacity and memory supply remain binding; approvals alone do not resolve them.",
    evidence: "ECMS moved 31 component projects into approval, but no comparable memory-price, yield, qualification or operational-capacity result arrived.",
    trigger: "Factory starts, tape-out, qualification, packaging/foundry capacity, yield and memory pricing.",
    sources: ["BS", "Mint"],
  },
  {
    theme: "U.S. trade policy",
    status: "NO MATERIAL CHANGE",
    thesis: "No new binding rule landed, but corporate cost and sourcing transmission are becoming more visible.",
    evidence: "FT reports J Crew’s estimated $230m annual tariff burden and Indian firms describe sourcing openings, but no new binding rule landed.",
    trigger: "New tariff/origin rules, exemptions, customs enforcement and verified sourcing or capex relocation.",
    sources: ["FT", "BS"],
  },
  {
    theme: "Bank liability competition",
    status: "STRENGTHENED",
    thesis: "Deposit growth and mix remain a binding constraint, now extending into FCNR pricing and offshore issuance.",
    evidence: "Axis raised large-ticket FCNR(B) pricing and financial institutions reached $8bn of dollar bonds; RBI also accepted ₹82,788cr at 5.24% in a cutoff-safe overnight VRRR, evidence of surplus liquidity rather than a rate signal.",
    trigger: "Deposit growth/mix, NIMs, completed issuance, FCNR retention and constituted committee terms.",
    sources: ["BS", "Mint", "Web"],
  },
  {
    theme: "Tata succession / governance",
    status: "STRENGTHENED",
    thesis: "Capital allocation across new businesses now intersects directly with unresolved Trust, board and CEO mechanics.",
    evidence: "FY26 accounts quantify cash, investments and losses; the Trust nomination restriction made AGM mechanics uncertain, while adjournment was only expected in print.",
    trigger: "Observed AGM outcome, Trust nomination, board action, successor, funding route and listing/RBI steps.",
    sources: ["BS", "Mint"],
    risk: true,
  },
] satisfies WatchItem[];

export type DeepRead = {
  title: string;
  sourceLabel: string;
  sources: SourceName[];
  detail: string;
  url?: string;
  reason: string;
  question: string;
};

export const deepReads: DeepRead[] = [
  {
    title: "‘Rogue’ AI is working as intended",
    sourceLabel: "FT",
    sources: ["FT"] as SourceName[],
    detail: "PDF p15 · agent capability and containment",
    url: "https://www.ft.com/content/a9947be4-5c0c-47ee-acae-a2aeaf01a0a0",
    reason:
      "It separates genuine containment escape, intentionally networked tests and human configuration error while showing a real jump in attack capability.",
    question:
      "Which enterprise controls fail when an agent’s ordinary objective-seeking—not malice—is the risk?",
  },
  {
    title: "Why Big Tech’s AI spending is $3 trillion higher than it seems",
    sourceLabel: "Mint · Dow Jones/WSJ partner copy",
    sources: ["Mint"] as SourceName[],
    detail: "PDF p7 · filings-based commitment analysis",
    url: "https://www.livemint.com/ai/artificial-intelligence/why-big-tech-s-ai-spending-is-3-trillion-higher-than-it-seems-11786929842673.html",
    reason:
      "The clearest map of uncommenced leases and purchase obligations beyond annual capex and conventional debt.",
    question:
      "Which commitments are cancellable, utilisation-linked, financeable and supported by actual customer revenue?",
  },
  {
    title: "The broken promise of education in India",
    sourceLabel: "Mint",
    sources: ["Mint"] as SourceName[],
    detail: "PDF p14 · access, cost and graduate returns",
    url: "https://www.livemint.com/education/india-education-jobs-crisis-11786960081053.html",
    reason:
      "It connects public-seat scarcity, private fees, teaching capacity, unemployment and household payback with unusually careful denominators.",
    question:
      "Is the binding constraint seats, teaching quality, labour demand, financing—or the information students use to choose?",
  },
  {
    title: "The impossible trinity, revisited",
    sourceLabel: "Business Standard",
    sources: ["BS"] as SourceName[],
    detail: "PDF p15 · FX, liquidity and rates",
    url: "https://www.business-standard.com/opinion/columns/the-impossible-trinity-revisited-126081701502_1.html",
    reason:
      "A coherent framework for linking RBI intervention, banking-system liquidity, interest rates and government-bond absorption.",
    question:
      "Which objective should be allowed to move when exchange-rate support, liquidity neutrality and rate control conflict?",
  },
];

export const methodology = {
  pages: 68,
  clusters: 64,
  retained: stories.length,
  homepage: 7,
  overlaps:
    "195 editorial units were reduced to 64 canonical material clusters. Nine continuations, common-source releases, agency pickups and explicit partner copy count once; two appended piracy pages were reviewed and excluded.",
  scoring:
    "Economic significance 20% · market impact 20% · strategic importance 20% · novelty 15% · India relevance 15% · durability 10%, then discounted for confidence, maturity, duplication and prior-day familiarity.",
  cutoff:
    "Print corpus: supplied 18 August FT, Business Standard and Mint editions—66 publisher pages plus two excluded piracy inserts. Web sweep: material developments from 12:10 IST on 17 August through 12:10 IST on 18 August 2026. Published snapshot; not a live feed.",
};
