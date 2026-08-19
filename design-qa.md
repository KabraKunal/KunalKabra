# System loop design QA

## Comparison target

- Source visual truth: user attachment `codex-clipboard-b2de469b-1833-41ec-bc7a-edf09959ab24.png` (497 × 439 px).
- Rendered implementation: Home → Open questions → `.system-loop-figure` at the local production preview.
- Primary viewport: 1440 × 1000 CSS px, device scale factor 1, light theme.
- Full-view evidence: `qa-evidence/system-loop/desktop-light-viewport.png` (1440 × 1000 px).
- Focused evidence: `qa-evidence/system-loop/desktop-light-figure.png` (360 × 300 px; 360 × 298.656 CSS px before pixel rounding).
- Additional states: 1440 px dark; 1121 px side-by-side; 1120 px stacked; 390 px light; 320 px dark; and 390 px with reduced motion.
- Normalization: source and implementation were viewed together and fit to their natural widths. Pixel-perfect texture and handwriting were intentionally not matched: the requested result is responsive frontend geometry using the website’s established visual language.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Composition: the implementation preserves the three-node circular order, central reinforcing-loop label, and visible direction on every connection.
- Fonts and typography: node labels use the site’s existing Newsreader family and remain inside their shapes at every tested width. The center label uses the existing interface family for a technical annotation feel.
- Spacing and layout rhythm: the diagram has stable internal coordinates, non-scaling strokes, proportional padding, and a content-driven stack breakpoint before the desktop column becomes cramped.
- Colors and tokens: outlines use the site’s blue primary token, moving indicators use the copper secondary token, and all fills/text adapt to light and dark themes without image blending.
- Image quality and asset fidelity: the bitmap dependency is removed from runtime. Native vector geometry stays sharp at every pixel density and does not crop or stretch.
- Copy and content: Resources → Demand & capability → Manufacturing & scale → Resources matches the source concept. The accessible description states the full causal loop in reading order.
- Motion: three small arrow travelers move along the same paths as the static connectors. Static arrowheads preserve meaning when animation is unsupported or reduced motion is requested.

## Verification

- All six tested viewport/theme cases had document width exactly equal to viewport width.
- Every visible SVG text bounding box remained inside the 420 × 340 view box.
- All three animated arrow transforms changed during a 420 ms sample.
- Reduced-motion mode hid the moving travelers while retaining all three static arrowheads.
- No browser console or runtime errors were recorded.

## Comparison history

- Final comparison: no P0/P1/P2 findings. No visual correction cycle was required after the first valid, rebuilt implementation capture.

final result: passed
