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
  dateLabel: "Friday · 21 August 2026",
  sourceLabel: "FT + WSJ + Business Standard + Mint + Last 24h Web",
  snapshotLabel: "Evidence cutoff · 10:05 IST",
  webWindowLabel: "After 11:15:00 IST on 20 August → 10:05:00 IST on 21 August 2026",
  bottomLine:
    "Secondary-sanctions risk has pulled India directly into the Hormuz shock, U.S. long-end relief lasted less than a day, and India is using sugar imports and offshore funding to absorb inflation and balance-sheet pressure.",
};

export type Tab = (typeof tabs)[number];
export type SourceName = "FT" | "WSJ" | "BS" | "Mint" | "Web";
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
    id: "hormuz-operating-system",
    rank: 1,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA", "ENERGY & GEOPOLITICS"],
    eyebrow: "Hormuz · trade · refined products",
    headline: "The Iran shock now reaches India through sanctions as well as supply",
    summary:
      "Hormuz disruption is already lifting oil, diesel, LNG and freight risk. Washington has now explicitly threatened secondary sanctions on countries and companies doing business with Iran; Brent rose 2.1% to $93.56, putting India and China directly inside the compliance and supply question.",
    why:
      "India now faces physical supply, payment, insurance and sanctions channels at once—not merely a higher spot crude quote.",
    secondOrder:
      "A crude-stock cushion can coexist with a product shortage. That makes the inflation impulse less dependent on one Brent quote and more sensitive to refining, diesel inventories and physical shipping conditions.",
    winners: "Non-Gulf producers, alternative logistics routes, refiners with product availability and suppliers localising Gulf infrastructure.",
    losers: "Import-dependent consumers, airlines, chemical users, truckers and governments cushioning retail fuel prices.",
    watch: "Sanctions text/exemptions, Indian refinery feedstock, payments, verified crossings, LNG/diesel flows, insurance, freight, Brent and INR.",
    importance: "High",
    confidence: "High",
    maturity: "Trade action, inventory and price data are observed; attack attribution, duration and transit normalisation remain contested",
    sources: [
      { source: "BS", detail: "21 Aug printed p8 · Reuters sanctions-threat context" },
      { source: "Mint", detail: "21 Aug printed p9 · WSJ partner copy; not an independent vote" },
      { source: "WSJ", detail: "20 Aug prior-day print A6/B11 · LNG and economic pressure" },
      { source: "FT", detail: "20 Aug prior-day print pp1–4, 7, 13 · conditional Europe targets, diesel and shipping" },
      {
        source: "Web",
        detail: "AP · explicit secondary-sanctions threat, 21 Aug 09:31 IST",
        url: "https://apnews.com/article/iran-war-trump-sanctions-economic-fury-oil-d28206ea288a3d4a9b82260ab44ce460",
      },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "FT/WSJ are 20 August prior-day editions; Mint’s Iran page is WSJ partner copy and BS uses Reuters, so this is one event cluster." },
      { kind: "WEB UPDATE", text: "The new delta is an explicit threat toward third-country trade plus a renewed oil premium—not an enacted sanctions package." },
      { kind: "DISAGREEMENT", text: "FT’s Europe-target story is conditional and source-reported; the dashboard does not state that attacks are decided or imminent." },
      { kind: "INFERENCE", text: "The wider India inflation, INR and corporate-margin transmission is synthesis from separate physical and financial channels." },
    ],
  },
  {
    id: "openai-ipo-economics",
    sections: ["MARKETS & MACRO", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "OpenAI · IPO · private economics",
    headline: "OpenAI has put a 2027 public-market checkpoint around its capital needs",
    summary:
      "CNBC reports that CFO Sarah Friar told staff OpenAI expects to be public in 2027, potentially sooner if growth accelerates. Internal slides reportedly showed revenue run-rate up 35% quarter to date, enterprise run-rate up 50% and a coding/work product at 20mn weekly users.",
    why:
      "A listing would force more comparable disclosure on a company whose reported Q2 revenue rose while operating losses widened and whose infrastructure needs remain immense.",
    secondOrder:
      "The closer public scrutiny gets, the more model capability must translate into retained enterprise revenue, cash generation and controllable infrastructure commitments.",
    winners: "AI platforms that can show retention, margins and capital efficiency with auditable definitions.",
    losers: "Private-company narratives that rely on run-rate growth without cash-flow or cost comparability.",
    watch: "Registration filing, audited accounts, cash burn, enterprise retention, product monetisation and capital required before listing.",
    importance: "High",
    confidence: "Medium",
    maturity: "Source-reported management intent and private run-rate metrics; no registration statement or audited figures",
    sources: [
      { source: "WSJ", detail: "19 Aug print B1–B2 · prior-day Q2 OpenAI/Anthropic comparison" },
      {
        source: "Web",
        detail: "CNBC · internal all-hands and QTD metrics, 20 Aug 00:53 IST",
        url: "https://www.cnbc.com/2026/08/19/open-ai-ipo-timing-2027-friar.html",
      },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "Prior WSJ reporting put OpenAI Q2 revenue at $6.7bn and operating loss including stock compensation at $12.3bn; private definitions are not comparable with Anthropic’s." },
      { kind: "WEB UPDATE", text: "The fresh delta is IPO intent and company-defined QTD operating metrics—not a filed offering or audited revenue." },
      { kind: "INFERENCE", text: "A public-market checkpoint may improve comparability, but timing and market access remain management intent." },
    ],
  },
  {
    id: "canada-tariff-cliff",
    rank: 7,
    sections: ["TODAY", "INDIA", "COMPANIES"],
    eyebrow: "Tata · succession · capital allocation",
    headline: "Tata’s succession problem has become an operating-governance event",
    summary:
      "WSJ reports N. Chandrasekaran plans to leave in February after failing to secure one director’s backing. Tata Trusts controls roughly two-thirds of Tata Sons, making the choice of successor consequential across listed companies, electronics, autos, capital goods and funding decisions.",
    why:
      "The issue is no longer only an adjourned meeting or personality dispute: leadership continuity and group-level capital allocation now have a visible deadline.",
    secondOrder:
      "A prolonged transition can slow portfolio choices and raise the governance discount across companies that depend on group coordination or Tata Sons funding.",
    winners: "Listed companies with autonomous boards, strong cash flow and clear succession depth.",
    losers: "Projects and entities dependent on group guarantees, cross-holdings or rapid parent-level decisions.",
    watch: "Named successor, Tata Trusts nominee, reconvened AGM, board votes and entity-level funding decisions.",
    importance: "High",
    confidence: "High",
    maturity: "Reported departure intention and ownership structure are current; successor and transition terms remain unresolved",
    sources: [
      { source: "WSJ", detail: "20 Aug prior-day print B6 · departure plan and Trusts control" },
      { source: "BS", detail: "21 Aug print · inherited Tata governance context" },
      { source: "Mint", detail: "21 Aug print · inherited Tata governance context" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "The departure plan is reported by WSJ; no successor, board resolution or transition filing was public by cutoff." },
      { kind: "INFERENCE", text: "The group-wide capital-allocation impact is synthesis from ownership and operating dependencies, not a measured earnings loss." },
    ],
  },
  {
    id: "sugar-import-buffer",
    rank: 3,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA", "COMPANIES", "ENERGY & GEOPOLITICS"],
    eyebrow: "Sugar · ethanol · consumer response",
    headline: "India has opened a 1mn-tonne sugar buffer as E20 reshapes demand",
    summary:
      "India opened a one-time duty-free window for up to 1mn tonnes of raw sugar through 31 October after prices reached a 16-year high. At the same time, Mint reports premium-petrol share rising to 12–15% from about 4% in March as motorists pay to avoid perceived E20 trade-offs.",
    why:
      "The two developments expose the same policy constraint: diverting more cane to ethanol can tighten food supply while consumers still question the fuel proposition.",
    secondOrder:
      "Imports can cool festive food inflation, but recurring relief would weaken mill economics and force a clearer choice among ethanol targets, sugar availability and consumer fuel choice.",
    winners: "Food users and consumers if imports arrive on time; premium-fuel suppliers while motorists seek choice.",
    losers: "Domestic mills if landed supply compresses prices and motorists paying a premium to manage uncertainty.",
    watch: "Cargo arrivals, quota allocation, sugar prices/stocks, cane diversion, premium-petrol mix and any lower-blend option.",
    importance: "High",
    confidence: "High",
    maturity: "Import window is reported as effective; physical arrivals and durability of fuel switching remain unproved",
    sources: [
      { source: "BS", detail: "21 Aug printed p2 · one-time duty-free import window" },
      { source: "Mint", detail: "21 Aug printed pp1, 6 · sugar terms and E20 demand response" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "The 1mn tonnes is a maximum quota, not completed imports. The premium-petrol share is dealer/industry evidence, not proof E20 damages engines." },
      { kind: "WEB CHECK", text: "No post-print primary action changed the printed quota or fuel-policy position before cutoff." },
      { kind: "INFERENCE", text: "The sugar–ethanol linkage is synthesis supported by the two papers’ separate supply and consumer evidence." },
    ],
  },
  {
    id: "india-export-buffer",
    rank: 5,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA", "COMPANIES"],
    eyebrow: "Core sector · earnings breadth",
    headline: "India’s headline growth is stronger than its underlying breadth",
    summary:
      "July core-sector growth slowed to 5.4% from a revised 6.0%, with crude, gas and fertilisers contracting. Q1 index profits beat expectations, but gains were concentrated: smaller companies’ profit grew only 5% while large commodity and upstream names carried the headline.",
    why:
      "Power output and index-level profits can look robust while industrial inputs and company breadth weaken—an important distinction for earnings extrapolation and capex expectations.",
    secondOrder:
      "A narrow profit recovery raises the odds of more selective equity performance and may delay broad-based hiring, supplier orders and private capex.",
    winners: "Scale leaders, exporters and commodity producers with pricing power.",
    losers: "Small companies, OMCs exposed to expensive crude and cyclicals relying on broad demand.",
    watch: "August core output, real revenue, small-company margins, OMC under-recoveries, credit and order books.",
    importance: "High",
    confidence: "High",
    maturity: "Official July output and reported Q1 results are realised; forward breadth remains uncertain",
    sources: [
      { source: "BS", detail: "21 Aug printed p2 · official core-sector data" },
      { source: "Mint", detail: "21 Aug printed p5 · 2,774-company Q1 analysis" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "Core-sector growth is year on year; Q1 company groups use revenue-size bands. These denominators cannot be pooled into one GDP estimate." },
      { kind: "INFERENCE", text: "Calling the recovery narrow is synthesis from sector and company dispersion, not a claim that aggregate growth has reversed." },
    ],
  },
  {
    id: "cabinet-transport-approvals",
    rank: 6,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "AI memory · structured credit · device prices",
    headline: "AI’s memory windfall is shifting risk into consumers and credit markets",
    summary:
      "SK Hynix announced a $28.3bn cancellation buyback after AI-memory cash generation, while higher memory prices helped shrink India’s sub-₹10,000 smartphone share from 18% to 4%. Since print, Broadcom-linked talks surfaced for more than $60bn—and potentially $100bn—of AI-chip financing.",
    why:
      "AI demand is generating real supplier cash, but the same cycle is raising device costs and moving customer/concentration risk into very large structured-credit packages.",
    secondOrder:
      "If utilisation or collateral values disappoint, lenders and guarantors—not only chip buyers—become part of the AI-capex transmission chain.",
    winners: "HBM suppliers and credit providers with strong covenants and diversified collateral.",
    losers: "Entry-device buyers, low-end handset brands and lenders exposed to concentrated compute demand.",
    watch: "Memory prices, smartphone mix, SK Hynix capex/returns, financing terms, guarantees, utilisation and credit spreads.",
    importance: "High",
    confidence: "Medium",
    maturity: "Buyback and device mix are observed; financing terms are sourced talks, not a closed debt package",
    sources: [
      { source: "WSJ", detail: "20 Aug prior-day print B4 · SK Hynix buyback and cash-return terms" },
      { source: "BS", detail: "21 Aug printed p2 · India entry-smartphone memory-cost transmission" },
      { source: "Web", detail: "Reuters · Broadcom-linked financing talks, 21 Aug 02:09 IST", url: "https://jackfmfargo.com/2026/08/20/broadcom-seeks-more-than-60-billion-in-latest-ai-debt-deal-bloomberg-news-reports/" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "$28.3bn is a buyback/cancellation programme; the handset-share shift is an India price-mix observation, not proof of stronger unit demand." },
      { kind: "WEB UPDATE", text: "The >$60bn and potential $100bn financing figures are reported discussions. No package is signed or funded." },
      { kind: "INFERENCE", text: "Credit transmission is synthesis from proposed leverage, guarantees and customer concentration." },
    ],
  },
  {
    id: "sebi-closing-auction",
    sections: ["MARKETS & MACRO", "INDIA"],
    eyebrow: "Sebi · closing auction · market structure",
    headline: "Sebi’s first closing-auction case is a control test—not a final finding",
    summary:
      "Sebi issued an ex-parte interim order over alleged manipulative trades during the 13 August Sensex-expiry closing auction, directing market bars and deposit measures. The directions are effective; the alleged manipulation and gains remain unadjudicated.",
    why:
      "Closing auctions determine index and fund marks. The first enforcement case will shape surveillance, broker controls and confidence in the new mechanism.",
    secondOrder:
      "Stronger controls can improve closing-price quality but may also reduce participation if liability standards remain unclear.",
    winners: "Long-horizon investors if surveillance reduces closing-price distortion.",
    losers: "Participants with weak auction controls and strategies dependent on thin closing liquidity.",
    watch: "Replies, confirmatory order, final liability, auction spreads, price variance and changes to broker or exchange controls.",
    importance: "Medium",
    confidence: "High",
    maturity: "Interim directions are real; allegations are not a final adjudication",
    sources: [
      { source: "BS", detail: "20 Aug front page · first CAS enforcement treatment" },
      { source: "Mint", detail: "20 Aug printed p6 · same order, counted once" },
      { source: "Web", detail: "Sebi · ex-parte interim order", url: "https://www.sebi.gov.in/enforcement/orders/aug-2026/ex-parte-interim-order-in-the-matter-of-manipulative-trades-during-cas-on-sensex-expiry-at-bse-august-13-2026_103778.html" },
    ],
    evidence: [{ kind: "PRINT FACT", text: "Market bars and deposit directions are operative. Manipulation, gains and liability remain allegations pending process." }],
  },
  {
    id: "satcom-security-gate",
    sections: ["INDIA", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "Satellite internet · sovereignty · gateways",
    headline: "India’s satellite-internet bottleneck is sovereign routing, not licensing alone",
    summary:
      "Licensed operators still lack commercial permissions and spectrum while agencies resolve gateway, routing and security requirements. The strategic question is how to keep traffic and lawful access inside India without making the network uneconomic.",
    why:
      "Satellite broadband can expand resilience and rural reach, but licences without spectrum and approved architecture do not create service revenue.",
    secondOrder:
      "A sovereign-routing design may reshape capex, latency and partnerships—and favour operators already invested in Indian gateways.",
    winners: "Operators and infrastructure providers that can meet security rules with acceptable economics.",
    losers: "Licensees whose global architecture cannot accommodate local routing or gateway obligations.",
    watch: "DoT/WPC spectrum assignment, IN-SPACe permissions, gateway rules, security testing, tariffs and commercial launch.",
    importance: "High",
    confidence: "Medium",
    maturity: "Licences exist; spectrum, commercial permission and final sovereign architecture do not",
    sources: [{ source: "Mint", detail: "20 Aug printed p1, continued p11 · attributed security and routing constraints" }],
    evidence: [
      { kind: "PRINT FACT", text: "A licence is not a launch. Operators still need spectrum, gateways, security clearance and commercial permission." },
      { kind: "WEB CHECK", text: "No new DoT, WPC or IN-SPACe approval appeared before cutoff." },
    ],
  },
  {
    id: "ai-infrastructure-constraints",
    sections: ["MARKETS & MACRO", "COMPANIES", "AI & TECHNOLOGY", "ENERGY & GEOPOLITICS"],
    eyebrow: "AI capex · power · contingent finance",
    headline: "AI infrastructure demand is real; finance, power and utilisation still decide returns",
    summary:
      "Nvidia’s Ohio support could reach $105bn, but it is contingent credit support for land, power and shells—not cash already spent—and a separate $1.5bn equity investment. CtrlS raised capital, U.S. states are pricing grid costs and Marvell’s new warrant makes supplier revenue conditional.",
    why:
      "The binding question has moved from announced gigawatts to financing close, energised capacity, customer commitments, utilisation and cost allocation.",
    secondOrder:
      "Projects that socialise grid costs or rely on distant utilisation can reprice sharply even if AI demand remains strategically strong.",
    winners: "Developers with secured power, contracted demand and transparent financing; grid, cooling and interconnect suppliers.",
    losers: "Speculative campuses, overlevered sponsors and communities asked to absorb unpriced infrastructure costs.",
    watch: "Financing closes, interconnection awards, construction, energised megawatts, utilisation, GRID commitments and customer concentration.",
    importance: "High",
    confidence: "Medium",
    maturity: "Capital and rules are real; headline support is contingent and commissioned capacity/utilisation remain unshown",
    sources: [
      { source: "FT", detail: "19 Aug print p6 · Ohio finance structure; prior-day evidence" },
      { source: "WSJ", detail: "19 Aug print p4 · Pennsylvania guardrails; prior-day evidence" },
      { source: "BS", detail: "20 Aug printed p3 · CtrlS capital" },
      { source: "Mint", detail: "20 Aug printed partner analysis · power, water and asset-life constraints" },
      { source: "Web", detail: "Pennsylvania · Executive Order 2026-05, inherited policy context", url: "https://www.pa.gov/governor/newsroom/2026-press-releases/governor-shapiro-signs-executive-order-on-data-center-developmen" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "Up to $105bn is contingent credit support; $1.5bn is separate equity. Neither equals realised capex." },
      { kind: "INFERENCE", text: "The common decision problem is conversion from financing and permits to energised, utilised capacity—not a claim that all projects share one structure." },
    ],
  },
  {
    id: "nuclear-smr-economics",
    sections: ["MARKETS & MACRO", "COMPANIES", "AI & TECHNOLOGY", "ENERGY & GEOPOLITICS"],
    eyebrow: "Nuclear · SMRs · AI power",
    headline: "AI is pulling nuclear demand forward faster than project economics can mature",
    summary:
      "WSJ counts 22 U.S. reactor projects and $2.9bn of fission venture capital, while FT records a $30.3bn drawdown in SMR equities. India’s rules and standard procedures still have a 6–18 month runway.",
    why:
      "Power demand and offtake interest are credible; licensing, construction cost, fuel, financing and operating cash flow remain the real bottlenecks.",
    secondOrder:
      "Long-duration power contracts can transfer technology and construction risk to buyers or governments long before reactors produce electricity.",
    winners: "Proven reactor vendors, fuel suppliers and projects with credible offtakers and cost-sharing.",
    losers: "Pre-revenue developers valued as if licensing and construction risk were already solved.",
    watch: "India rules, licences, FIDs, offtakes, cost sharing, construction milestones, fuel and first power.",
    importance: "High",
    confidence: "High",
    maturity: "Demand, funding and equity moves are observed; project revenue and delivery remain years away",
    sources: [
      { source: "Mint", detail: "20 Aug printed p4 · India rule and SOP runway" },
      { source: "WSJ", detail: "19 Aug print B1–B2 · U.S. demand and funding; prior-day evidence" },
      { source: "FT", detail: "19 Aug print p8 · SMR-equity drawdown; prior-day evidence" },
    ],
    evidence: [{ kind: "DISAGREEMENT", text: "Capital, offtakes and project count support demand; they do not establish near-term earnings, cost or commissioning." }],
  },
  {
    id: "pixel-india-denominator",
    sections: ["INDIA", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "Google Pixel · supply chain · India",
    headline: "Google’s China-exit ambition starts from only a 3% India production base",
    summary:
      "A source-reported plan says Google wants Pixel phones, watches and earbuds produced outside China from 2027. Counterpoint puts India at only 3% of 2025 Pixel output, versus Vietnam at 63% and China at 34%.",
    why:
      "The direction could deepen India’s electronics role, but the starting denominator shows that qualification, components and export scale—not the destination headline—determine value captured.",
    secondOrder:
      "Vietnam may remain the primary beneficiary unless India converts assembly into reliable component depth and yields.",
    winners: "Indian suppliers that meet yield, component and export requirements.",
    losers: "Assembly-only firms and forecasts that assume all China displacement automatically moves to India.",
    watch: "Google or supplier confirmation, India capex, component sourcing, qualification, yields and 2027 shipment mix.",
    importance: "Medium",
    confidence: "Medium",
    maturity: "Current production shares are observed; the 2027 relocation is source-reported and unconfirmed",
    sources: [{ source: "BS", detail: "20 Aug printed p3 · Counterpoint denominator plus Nikkei-origin plan" }],
    evidence: [
      { kind: "PRINT FACT", text: "This is one Nikkei-origin source chain; agency rewrites do not add independent confirmation." },
      { kind: "WEB CHECK", text: "No Google or supplier confirmation appeared before cutoff." },
    ],
  },
  {
    id: "moderna-merck-melanoma",
    sections: ["COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "Biotech · mRNA · oncology",
    headline: "Moderna and Merck cleared a phase-three endpoint; approval still has several gates",
    summary:
      "Their personalised mRNA melanoma therapy met the primary endpoint in a study of more than 1,100 patients when used with Keytruda. Safety was consistent with known profiles, but effect size, overall survival, filing and approval remain undisclosed.",
    why:
      "A successful late-stage personalised-cancer endpoint creates a credible regulatory and commercial path for mRNA beyond infectious disease.",
    secondOrder:
      "If approved, manufacturing, turnaround time, reimbursement and patient selection become as important as clinical efficacy.",
    winners: "Moderna, Merck and personalised-medicine platforms if full data and regulatory review hold.",
    losers: "Competing regimens if the combination proves durable and economically scalable.",
    watch: "Full effect size, overall survival, filing, FDA review, manufacturing turnaround, pricing and reimbursement.",
    importance: "High",
    confidence: "High",
    maturity: "Primary endpoint is achieved; full data, approval and commercial launch remain pending",
    sources: [
      { source: "BS", detail: "20 Aug printed p8 · company milestone" },
      { source: "Mint", detail: "20 Aug printed p10 · same company event, counted once" },
      { source: "Web", detail: "AP · cohort and safety context, 19 Aug 21:11 IST", url: "https://apnews.com/article/moderna-mrna-merck-cancer-melanoma-intismeran-keytruda-2330dce708b0af215b68570b19d025df" },
    ],
    evidence: [{ kind: "WEB CHECK", text: "The web adds cohort and safety context; it does not supply effect size, overall survival or approval." }],
  },
  {
    id: "unitree-ipo-repricing",
    sections: ["MARKETS & MACRO", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "Robotics · IPO · valuation",
    headline: "Unitree’s 460% debut prices robotics far ahead of proven adoption",
    summary:
      "Unitree closed at RMB845 after pricing at RMB150.8, implying roughly a $50bn valuation after raising about $904mn. AP reports more than 5,000 Unitree humanoid shipments last year and a 13% U.S. revenue share, but the debut does not establish customer economics or retention.",
    why:
      "The listing creates a public valuation benchmark for humanoid robotics while exposing how little commercial data underpins the repricing.",
    secondOrder:
      "A high market currency can fund scale and acquisitions, but it raises the penalty for delivery, safety or export-control setbacks.",
    winners: "Unitree, suppliers and peers able to use the valuation window for capital.",
    losers: "Late buyers if shipments do not convert into durable margins and use cases.",
    watch: "Customer mix, unit economics, repeat orders, exports, safety, production yield and post-lockup trading.",
    importance: "Medium",
    confidence: "High",
    maturity: "IPO price, close and capital raised are realised; adoption quality and valuation durability are not",
    sources: [
      { source: "BS", detail: "20 Aug printed p8 · realised first-day close" },
      { source: "WSJ", detail: "19 Aug print p19 · pre-trading context; superseded for price" },
      { source: "Web", detail: "AP · capital raised and shipment/customer context", url: "https://apnews.com/article/f33facc61122faf0c0b08af5020bd170" },
    ],
    evidence: [{ kind: "DISAGREEMENT", text: "WSJ’s pre-trading $9.1bn frame is superseded by BS’s realised close; neither establishes operating adoption." }],
  },
  {
    id: "lt-dubai-airport",
    sections: ["INDIA", "COMPANIES"],
    eyebrow: "L&T · Gulf infrastructure · airports",
    headline: "L&T has won a Dubai airport automation package; its economic share is undisclosed",
    summary:
      "An L&T–Mitsubishi Heavy consortium won Phase 1 of the automated people mover at Al Maktoum International Airport. L&T classifies its order as Large, or ₹2,500–₹5,000 crore, but the exact value, consortium split, timetable and margin are absent.",
    why:
      "The award extends L&T’s Gulf exposure into airport systems integration and provides a tangible India-company route into Dubai’s long-duration aviation build-out.",
    secondOrder:
      "Systems content can deepen margin and capability, but consortium economics and execution working capital matter more than the airport’s distant headline capacity.",
    winners: "L&T and transport-systems suppliers if scope and execution convert into profitable backlog.",
    losers: "Investors who treat the full airport master plan as L&T’s contracted revenue.",
    watch: "Exact value, consortium share, notice to proceed, execution schedule, working capital, margin and later phases.",
    importance: "High",
    confidence: "High",
    maturity: "Award is filed; exact value allocation, margin and commissioning remain prospective",
    sources: [{ source: "Web", detail: "L&T · BSE-filed award, 20 Aug 10:03 IST", url: "https://www.bseindia.com/xml-data/corpfiling/AttachLive/dd1be844-e6e6-449c-9fd4-9de1fae93ff9.pdf" }],
    evidence: [
      { kind: "WEB UPDATE", text: "‘Large’ is L&T’s ₹2,500–₹5,000 crore disclosure band. The filing gives neither exact value nor L&T’s consortium share." },
      { kind: "INFERENCE", text: "The airport’s eventual 260mn-passenger target is not current throughput and not this contract’s value." },
    ],
  },
  {
    id: "rdi-fund-implementation",
    sections: ["INDIA", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "RDI fund · deep tech · governance",
    headline: "India’s ₹1tn RDI fund has begun disbursing—but governance remains opaque",
    summary:
      "The ministry says some selected-firm disbursals are complete and expects second-level fund-manager appointments in about two weeks. It still has not published recipient counts, rupee amounts, scorecards or safeguards needed to test Mint’s conflict-of-interest analysis.",
    why:
      "Manager selection, private-capital matching and enforceable conflict controls determine whether the fund becomes credible deep-tech finance or carries a governance discount.",
    secondOrder:
      "Early disbursal can accelerate innovation, but opaque allocation can crowd out stronger projects and weaken private co-investment.",
    winners: "Deep-tech firms and managers selected under transparent, enforceable rules.",
    losers: "The programme’s credibility if selection links and recusal rules remain undisclosed.",
    watch: "Manager names, disbursed amount, recipient count, mandate, private matching, conflict policy and recusal disclosures.",
    importance: "High",
    confidence: "Medium",
    maturity: "Partial disbursal is an official claim; allocation denominator and governance documents remain absent",
    sources: [
      { source: "Mint", detail: "20 Aug printed p2 · programme and conflict-link analysis" },
      { source: "Web", detail: "PIB / Science & Technology · implementation response, 19 Aug 19:18 IST", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2301317" },
    ],
    evidence: [
      { kind: "WEB UPDATE", text: "Some selected-firm disbursals are claimed complete and manager announcements are expected in about two weeks; neither denominator is disclosed." },
      { kind: "DISAGREEMENT", text: "The ministry says safeguards exist but does not publish them; Mint’s specific committee-link concern remains unresolved." },
    ],
  },
  {
    id: "bhp-copper-crossover",
    sections: ["MARKETS & MACRO", "COMPANIES", "ENERGY & GEOPOLITICS"],
    eyebrow: "BHP · copper · portfolio transition",
    headline: "Copper has overtaken iron ore in BHP’s earnings mix",
    summary:
      "BHP’s copper earnings exceeded iron ore for the first time, marking a realised portfolio crossover as electrification and supply constraints reshape mining economics. The result is prior-day evidence, not a fresh 20 August vote.",
    why:
      "The crossover changes capital-allocation priorities for the world’s largest miners and strengthens copper’s strategic scarcity case.",
    secondOrder:
      "Higher copper exposure can support growth but increases sensitivity to project execution, resource nationalism and China demand.",
    winners: "Scaled copper producers and equipment suppliers with credible expansion pipelines.",
    losers: "Iron-ore-heavy portfolios if China steel demand weakens faster than copper projects mature.",
    watch: "Copper volumes, unit costs, project approvals, M&A discipline, China demand and iron-ore pricing.",
    importance: "Medium",
    confidence: "High",
    maturity: "FY result is realised; commodity-cycle durability and project delivery remain open",
    sources: [
      { source: "FT", detail: "19 Aug print p8 and Lex · primary results analysis; prior-day evidence" },
      { source: "WSJ", detail: "19 Aug print p25 · short recap of same result, not a second event" },
    ],
    evidence: [{ kind: "PRINT FACT", text: "FT is the primary detailed treatment; WSJ’s brief is the same released result and does not add an independent vote." }],
  },
  {
    id: "hdfc-lic-permission",
    sections: ["MARKETS & MACRO", "INDIA", "COMPANIES"],
    eyebrow: "HDFC Bank · LIC · ownership",
    headline: "LIC can raise its HDFC Bank stake to 9.99%; it has not yet done so",
    summary:
      "RBI allowed LIC to hold up to 9.99% of HDFC Bank’s capital or voting rights, versus 4.11% held on 14 August. The approval creates substantial headroom but is permission, not an executed purchase or flow forecast.",
    why:
      "Potential domestic-institutional demand matters for ownership, free float and market support in India’s largest private bank.",
    secondOrder:
      "Regulatory headroom may preserve flexibility without producing immediate buying, so price and flow effects should follow disclosures—not the limit alone.",
    winners: "HDFC Bank holders if LIC uses the headroom on attractive terms.",
    losers: "Investors who front-run a purchase that may be partial, delayed or absent.",
    watch: "LIC beneficial-ownership filings, purchase timing and price, RBI conditions, free float and actual flow data.",
    importance: "Medium",
    confidence: "High",
    maturity: "RBI permission is realised; acquisition is optional and prospective",
    sources: [{ source: "Web", detail: "HDFC Bank · BSE filing, 19 Aug 22:52 IST", url: "https://www.bseindia.com/xml-data/corpfiling/AttachLive/35365c1b-d016-4b65-8fee-a9c6e6818e55.pdf" }],
    evidence: [{ kind: "WEB UPDATE", text: "9.99% is the approved ceiling. LIC held 4.11% on 14 August; no purchase to the ceiling is established." }],
  },
  {
    id: "us-rates-policy-split",
    rank: 2,
    sections: ["TODAY", "MARKETS & MACRO"],
    eyebrow: "Fed · Treasury · duration",
    headline: "Treasury’s long-end relief lasted less than a day",
    summary:
      "Treasury doubled long-bond buybacks to $4bn per operation, but the 10-year yield rebounded to 4.69% and the 30-year to 5.23% by Thursday close. Fed officials still described hikes as live if inflation fails to improve.",
    why:
      "The reversal shows debt-management liquidity support cannot sustainably cap term premium while fiscal supply and inflation risk remain unresolved.",
    secondOrder:
      "Financial conditions can tighten at both ends of the curve, raising discount rates for housing, infrastructure, private credit and AI capex even before another policy move.",
    winners: "Short-duration savers, well-capitalised lenders and issuers that already locked funding.",
    losers: "Long-duration equities, leveraged real estate, weak sovereigns and projects with distant cash flows.",
    watch: "Current inflation and labour data, Fed communication, subsequent auctions, bid-to-cover, curve liquidity and actual September buybacks.",
    importance: "High",
    confidence: "High",
    maturity: "Market reversal and minutes are observed; additional buybacks and any Fed hike remain prospective",
    sources: [
      { source: "FT", detail: "20 Aug prior-day print pp1, 9 · buyback announcement and initial 30-year move" },
      { source: "WSJ", detail: "20 Aug prior-day print A1–A2/B12 · Fed minutes and structural debt analysis" },
      { source: "Mint", detail: "21 Aug printed p14 · opinion context, not a new fact vote" },
      {
        source: "Web",
        detail: "AP · bond-market reversal, 21 Aug 01:07 IST",
        url: "https://apnews.com/article/rates-bond-market-bessent-inflation-c6e148f8235a98245adf04b2d4bdd8d1",
      },
    ],
    evidence: [
      { kind: "WEB UPDATE", text: "The 10- and 30-year rebound materially changes print’s immediate-relief narrative; it does not prove future yields must rise." },
      { kind: "DISAGREEMENT", text: "Treasury buybacks are debt-management liquidity support—not Fed QE, yield-curve control or a policy-rate cut." },
    ],
  },
  {
    id: "rbi-conditional-hike",
    sections: ["MARKETS & MACRO", "INDIA"],
    eyebrow: "RBI · inflation · reaction function",
    headline: "RBI has opened the door to a hike—without scheduling one",
    summary:
      "The MPC unanimously held the repo rate at 5.25%, but its August minutes show a more hawkish reaction function. Deputy Governor Poonam Gupta said a hike case may emerge during FY27; the governor requires evidence that food and fuel shocks are becoming broad, persistent or de-anchoring expectations.",
    why:
      "India’s rate path is now explicitly two-sided. A projected 5.9% Q3 inflation peak matters less than whether pass-through reaches core prices, wages and expectations.",
    secondOrder:
      "Even without a hike, higher odds can lift government yields, offshore funding costs and deposit competition while slowing rate-sensitive investment.",
    winners: "Cash savers, floating-rate lenders and firms with pre-funded balance sheets.",
    losers: "Long-duration assets, leveraged borrowers and businesses reliant on rapid rate relief.",
    watch: "Food/fuel pass-through, core inflation excluding precious metals, expectations, October MPC language, INR and the shape of the domestic curve.",
    importance: "High",
    confidence: "High",
    maturity: "Official minutes reveal the reaction function; every member voted to hold and no future hike is decided",
    sources: [
      { source: "BS", detail: "20 Aug front page · minutes and market transmission" },
      { source: "Mint", detail: "20 Aug printed p1, continued p6 · minutes, forecasts and member views" },
      {
        source: "Web",
        detail: "RBI · official minutes of 3–5 August meeting",
        url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63403",
      },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "Repo 5.25%; FY27 CPI 5.0%; Q3 peak 5.9%; core 4.3%. These are forecasts, not realised inflation or a rate path." },
      { kind: "WEB CHECK", text: "The official minutes validate a conditional hike case. Only one member says a case may emerge; the governor requires generalisation, persistence or de-anchoring first." },
      { kind: "DISAGREEMENT", text: "Business Standard’s ‘hike is coming’ framing is stronger than the committee record. The dashboard uses conditional language." },
    ],
  },
  {
    id: "marvell-google-warrant",
    sections: ["MARKETS & MACRO", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "Custom silicon · Google · AI economics",
    headline: "Google tied Marvell’s upside to a potential $120bn custom-silicon revenue hurdle",
    summary:
      "Marvell filed a Google commercial agreement and warrant for up to 58.97mn shares at $206.58. Only 1.36mn shares time-vest; the rest vest across 240 tranches, each requiring $500mn of Google-linked custom-products revenue through FY2033.",
    why:
      "The contract is primary evidence of Google broadening its TPU-adjacent supplier stack across inference, networking, storage and memory interfaces. It also makes the distance between strategic alignment and realised revenue unusually visible.",
    secondOrder:
      "Equity-linked supplier incentives can accelerate custom design while concentrating customer exposure and shifting AI competition from general-purpose accelerators toward full-system silicon.",
    winners: "Marvell if programmes convert, Google if supplier diversity improves cost and execution, and foundry/memory partners that win qualified volume.",
    losers: "Incumbent suppliers if scope is displaced and investors who mistake maximum warrant value for committed demand.",
    watch: "Tape-outs, programme revenue, gross margin, vesting, Google concentration, foundry capacity and whether incumbent scope is displaced or supplemented.",
    importance: "High",
    confidence: "High",
    maturity: "Agreement and warrant are filed; purchases are discretionary and revenue, vesting and production remain prospective",
    sources: [
      {
        source: "Web",
        detail: "Marvell · filed Form 8-K and warrant terms",
        url: "https://investor.marvell.com/sec-filings/all-sec-filings/content/0001193125-26-356217/d412696d8k.htm",
      },
      {
        source: "Web",
        detail: "CNBC · exact in-window publication anchor and market context",
        url: "https://www.cnbc.com/2026/08/19/marvell-google-ai-chips.html",
      },
    ],
    evidence: [
      { kind: "WEB UPDATE", text: "The 240 performance tranches imply $120bn of cumulative qualifying revenue if all vest. Purchases are discretionary; this is not a minimum order." },
      { kind: "DISAGREEMENT", text: "$12.182bn is the maximum exercise cost if eligible shares vest and are exercised—not Google cash invested or committed chip spend." },
      { kind: "INFERENCE", text: "Supplier diversification and incumbent displacement are strategic possibilities; the filing does not disclose programme allocation." },
    ],
  },
  {
    id: "india-bank-dollar-funding",
    rank: 4,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA", "COMPANIES"],
    eyebrow: "Banks · offshore funding · external buffer",
    headline: "India’s offshore-funding rush is creating a deployment problem",
    summary:
      "Banks face a compressed window to deploy and hedge FCNR inflows before support facilities close. HDFC Bank is marketing at least $1bn of GIFT City bonds; $1.75bn would be cumulative proceeds only if the new deal completes.",
    why:
      "The rush supports external buffers but creates negative-carry, maturity-mismatch and margin risk if expensive foreign-currency liabilities cannot be deployed efficiently.",
    secondOrder:
      "Prefunding reduces near-term rollover risk but can pressure spreads and margins if expensive offshore liabilities outlive the shock they were raised to absorb.",
    winners: "Banks with diversified funding, strong credit and an ability to swap dollars efficiently.",
    losers: "Deposit-dependent lenders and issuers arriving after global spreads or hedging costs widen.",
    watch: "Final issuance, all-in swapped cost, FCNR retention after closure, maturities, NIMs, deposit growth and RBI window expiries.",
    importance: "High",
    confidence: "High",
    maturity: "Prior deals are completed; HDFC’s new raise is marketed, not completed, and final FCNR retention is unknown",
    sources: [
      { source: "Mint", detail: "21 Aug printed pp1, 7 · FCNR deployment and negative-carry risk" },
      { source: "BS", detail: "21 Aug printed p4 · HDFC/Citi funding; headline corrected by web" },
      {
        source: "Web",
        detail: "Reuters · HDFC intended raise, 20 Aug 20:12 IST",
        url: "https://www.brecorder.com/news/40435782/indias-largest-private-lender-eyes-1-billion-overseas-debt-raise-bankers-say",
      },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "FCNR deposits, bond proceeds and RBI support-window totals are different funding pools and are not added together." },
      { kind: "DISAGREEMENT", text: "BS’s completed $1.75bn wording overstates maturity. Reuters says the new deal is intended; cumulative proceeds reach $1.75bn only if completed." },
      { kind: "INFERENCE", text: "Calling this defensive prefunding is synthesis from timing, costs and expiring policy windows." },
    ],
  },
  {
    id: "renewable-execution-gap",
    sections: ["MARKETS & MACRO", "INDIA", "COMPANIES", "ENERGY & GEOPOLITICS"],
    eyebrow: "Renewables · grid · PPAs",
    headline: "India’s renewable bottleneck has moved from targets to contracted execution",
    summary:
      "Renewable awards fell from 40.6GW in FY25 to 14.7GW in FY26, with only 4.7GW awarded through 10 August this year. At affected substations, solar-hour curtailment reportedly reached 30%–50%, exposing PPA, transmission and storage constraints.",
    why:
      "Installed-capacity ambition does not produce bankable cash flow. Developers need signed offtake, available transmission, dispatch certainty and storage economics.",
    secondOrder:
      "If curtailment and unsigned PPAs persist, capital costs rise, equipment orders slow and India can miss transition goals even while headline capacity keeps growing.",
    winners: "Storage, transmission, flexible generation and developers with bankable offtake and grid access.",
    losers: "Merchant-heavy projects, equipment suppliers reliant on award volume and discoms delaying viable contracts.",
    watch: "Signed PPAs, award volume, curtailment by substation, transmission commissioning, storage tenders and realised tariffs.",
    importance: "High",
    confidence: "High",
    maturity: "Award data are current; curtailment applies to affected locations and FY30 outcomes remain prospective",
    sources: [
      { source: "BS", detail: "20 Aug printed pp4, 20 · Icra evidence and power-system analysis" },
      { source: "Mint", detail: "20 Aug printed p2 · PTI/Icra chain; not a second independent study" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "40.6GW, 14.7GW and 4.7GW are award vintages. The 30%–50% curtailment range is for affected substations, not India-wide generation." },
      { kind: "WEB CHECK", text: "No post-print PPA, award or grid action resolved the bottleneck before cutoff." },
      { kind: "INFERENCE", text: "The financing and equipment-order effects are second-order consequences, not yet measured outcomes." },
    ],
  },
  {
    id: "india-fresher-bottleneck",
    sections: ["MARKETS & MACRO", "INDIA", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "India jobs · AI · onboarding",
    headline: "AI hiring is strengthening while India’s entry-level pathway weakens",
    summary:
      "The fresher share of GCC hiring fell from 28% to 15%, and named graduates reported onboarding waits longer than a year. Employers are still hiring for GenAI and experienced roles, so the signal is a task-and-experience shift—not a common national net-jobs estimate.",
    why:
      "The apprenticeship layer that creates future experienced workers is shrinking before enterprise AI returns are broadly demonstrated.",
    secondOrder:
      "Firms may create a future talent bottleneck: senior productivity improves today, but fewer juniors accumulate the domain experience needed tomorrow.",
    winners: "Workers combining domain expertise with AI fluency and employers that redesign work around measurable training outcomes.",
    losers: "Entry-level applicants, undifferentiated IT services and programmes measured by enrolment rather than placement.",
    watch: "Campus offers converted to starts, onboarding lags, entry hiring, wage distribution, internal mobility, task mix and verified enterprise ROI.",
    importance: "High",
    confidence: "High",
    maturity: "Hiring shares and reported delays are observed; datasets use different periods and cannot be netted",
    sources: [
      { source: "BS", detail: "20 Aug printed p4 · fresher-share and AI-work analysis" },
      { source: "Mint", detail: "20 Aug printed p6, with survey context p11 · campus and workforce evidence" },
      { source: "WSJ", detail: "19 Aug print p9 · AI-era recruiting context; prior-day evidence" },
    ],
    evidence: [
      { kind: "DISAGREEMENT", text: "Experienced AI demand, fresher hiring shares and individual onboarding delays use different denominators. They cannot be turned into one net job-loss number." },
      { kind: "WEB CHECK", text: "No authoritative company update before cutoff materially changed the print evidence." },
      { kind: "INFERENCE", text: "The future experience bottleneck is a durable risk, not yet a measured labour-market outcome." },
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
    callout: "Treasury’s long-end relief reversed within a day, while India’s inflation response is showing up in sugar imports, fuel choice and bank funding rather than a new policy-rate decision.",
  },
  INDIA: {
    title: "India",
    dek: "Observed programme, funding and operating outcomes outrank speeches, targets and proposal pipelines.",
    callout: "India is absorbing shocks through a sugar-import buffer, offshore bank funding and rupee-settlement plumbing, even as core-sector and earnings breadth soften.",
  },
  COMPANIES: {
    title: "Companies",
    dek: "Only material earnings, governance, capital allocation, regulation and strategy shifts survive the cut.",
    callout: "Tata succession, bank deployment risk, SK Hynix cash returns and uneven Q1 breadth matter more than routine company announcements.",
  },
  "AI & TECHNOLOGY": {
    title: "AI & Technology",
    dek: "The focus is economics, control, infrastructure and adoption—not model-release volume.",
    callout: "AI-memory profits are real, but device-price inflation and a reported $60bn-plus credit structure show how costs and risk are spreading through the stack.",
  },
  "ENERGY & GEOPOLITICS": {
    title: "Energy & Geopolitics",
    dek: "Political news appears only when it changes oil, gas, shipping, sanctions, defence, commodities or corporate strategy.",
    callout: "Hormuz remains the organising risk; explicit secondary-sanctions threats now put Indian refinery, payment and insurance decisions alongside physical supply.",
  },
};

export const macroPulse = [
  {
    region: "United States",
    signal: "Treasury’s tactical relief did not reset the long end",
    driver: "The 10-year returned to 4.69% and the 30-year to 5.23% by Thursday close after Treasury doubled long-bond buybacks.",
    implication: "Inference: liquidity support is not a rate cap; fiscal supply and inflation still dominate duration. Evidence: FT/WSJ, 20 Aug prior-day print; AP, 21 Aug Web.",
  },
  {
    region: "Europe",
    signal: "Hormuz is becoming a winter-LNG and industrial-cost problem",
    driver: "WSJ reports few LNG cargoes crossing this month and European gas near early-2023 highs; FT adds diesel and freight stress.",
    implication: "Inference: winter competition with Asia can pressure industrial margins even before physical gas shortages emerge. Evidence: FT/WSJ, 20 Aug prior-day print.",
  },
  {
    region: "China",
    signal: "Selective H200 access does not reverse semiconductor substitution",
    driver: "China reportedly allowed limited H200 shipments—possibly up to 10,000 units—while policy still favours domestic chips.",
    implication: "Inference: near-term frontier capacity improves for selected firms without establishing a broad Nvidia reopening. Evidence: FT, 20 Aug prior-day print.",
  },
  {
    region: "India",
    signal: "Industrial breadth slowed while food and funding buffers expanded",
    driver: "Core-sector growth eased to 5.4%; India opened a 1mt sugar-import window and banks accelerated FCNR/offshore funding before support windows close.",
    implication: "Inference: policy is cushioning specific supply and balance-sheet channels, not signalling broad demand acceleration. Evidence: BS and Mint, 21 Aug print.",
  },
  {
    region: "Japan",
    signal: "Higher oil and global yields remain the external constraint",
    driver: "No new Japan release inside today’s window displaced the prior trade and yen evidence.",
    implication: "Inference: keep the imported-inflation channel on watch, but do not manufacture a fresh Japan signal. Evidence: prior dashboard continuity; no material web delta.",
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
    id: "fomc-minutes",
    time: "21 Aug · 01:07 IST",
    headline: "Treasury’s long-end relief reversed before the next morning",
    happened: "The U.S. 10-year yield rebounded to 4.69% and the 30-year to 5.23%, close to pre-buyback levels, as Fed officials kept hike risk live.",
    why: "The reversal shows that larger buybacks can improve liquidity without removing fiscal supply, inflation or term-premium pressure.",
    changed: "FT print captured an immediate 8bp 30-year rally. The close invalidated any reading of that move as durable relief.",
    confidence: "High",
    sources: [{ source: "Web", detail: "AP · Treasury relief reversal", url: "https://apnews.com/article/rates-bond-market-bessent-inflation-c6e148f8235a98245adf04b2d4bdd8d1" }],
    tags: ["Fed", "Rates", "Since Print"],
  },
  {
    id: "marvell-google",
    time: "21 Aug · 09:31 IST",
    headline: "Washington explicitly threatened Iran’s third-country counterparties",
    happened: "The U.S. Treasury secretary threatened secondary sanctions on countries and companies continuing business with Iran; India and China are major buyers potentially exposed.",
    why: "The conflict now has a compliance, payments and refinery-feedstock channel beyond shipping and physical supply.",
    changed: "Print covered Iran’s military and economic threats. The new element is explicit third-country exposure; no sanctions package or exemptions are yet published.",
    confidence: "High",
    sources: [{ source: "Web", detail: "AP · secondary-sanctions threat", url: "https://apnews.com/article/iran-war-trump-sanctions-economic-fury-oil-d28206ea288a3d4a9b82260ab44ce460" }],
    tags: ["Iran", "India", "Sanctions"],
  },
  {
    id: "eia-distillates",
    time: "21 Aug · 02:09 IST",
    headline: "Broadcom-linked AI financing talks crossed $60bn",
    happened: "Reuters reports discussions for more than $60bn of AI-chip financing, potentially reaching $100bn, with senior and junior debt and possible partial supplier guarantees.",
    why: "AI infrastructure risk is moving from hyperscaler capex into structured credit, collateral values and lender concentration.",
    changed: "Print showed supplier cash returns and chip demand. The web adds a leverage and contingent-liability channel; terms remain under discussion.",
    confidence: "Medium",
    sources: [{ source: "Web", detail: "Reuters · Broadcom-linked financing talks", url: "https://jackfmfargo.com/2026/08/20/broadcom-seeks-more-than-60-billion-in-latest-ai-debt-deal-bloomberg-news-reports/" }],
    tags: ["AI", "Credit", "Semiconductors"],
  },
  {
    id: "openai-ipo",
    time: "21 Aug · 03:21 IST",
    headline: "Anthropic plans customer-controlled storage—but keeps 30-day retention",
    happened: "Anthropic reportedly plans to let enterprise customers hold required safety-retention data in their own cloud systems later this year; the 30-day retention rule remains.",
    why: "Data custody is becoming a frontier-model buying criterion for regulated enterprises.",
    changed: "WSJ print framed OpenAI’s no-retention pledge as a competitive advantage. Anthropic’s response narrows the gap but does not create policy parity.",
    confidence: "Medium",
    sources: [{ source: "Web", detail: "Reuters · planned retention-policy change", url: "https://www.reuters.com/business/anthropic-plans-change-enterprise-data-retention-policy-source-says-2026-08-20/" }],
    tags: ["AI", "Enterprise", "Data governance"],
  },
  {
    id: "hdfc-lic",
    time: "20 Aug · 20:12 IST",
    headline: "HDFC’s $1.75bn bond headline needed a maturity correction",
    happened: "HDFC Bank is marketing at least $500m each of three- and five-year GIFT City bonds; the final quantum could exceed $1bn.",
    why: "The deal illustrates the late-window offshore funding rush but has not yet produced completed proceeds.",
    changed: "BS print described a $1.75bn sale as completed. Reuters says cumulative proceeds reach $1.75bn only if the intended new transaction closes.",
    confidence: "High",
    sources: [{ source: "Web", detail: "Reuters · intended GIFT City raise", url: "https://www.brecorder.com/news/40435782/indias-largest-private-lender-eyes-1-billion-overseas-debt-raise-bankers-say" }],
    tags: ["India", "Banks", "Funding"],
  },
  {
    id: "lt-airport-award",
    time: "20 Aug · 17:11 IST",
    headline: "Canada’s claimed trade deal remains incomplete",
    happened: "Full terms were still unavailable, tariffs were deferred only to early Saturday and requested alcohol concessions depend on provincial governments; Quebec withheld endorsement.",
    why: "Auto, dairy, forestry and provincial retaliation remain exposed to a binary weekend deadline.",
    changed: "FT print described a deal and three-day reprieve. The update shows unfinished negotiations and implementation outside Ottawa’s full control.",
    confidence: "High",
    sources: [{ source: "Web", detail: "AP · incomplete Canada negotiations", url: "https://apnews.com/article/canada-quebec-trump-tariffs-75d3f24bb11178d8c9bb28b144e1dcf0" }],
    tags: ["Trade", "Canada", "Tariffs"],
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
    thesis: "The shock now transmits through sanctions, payments, LNG, diesel and freight—not only crude prices.",
    evidence: "Washington explicitly threatened third-country counterparties; Brent rose to $93.56. FT/WSJ are 20 Aug prior-day print and Mint’s Iran page is WSJ partner copy.",
    trigger: "Sanctions text/exemptions, Indian crude/payment routes, crossings, LNG/diesel, insurance, freight and diplomacy.",
    sources: ["FT", "WSJ", "BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "Fed path",
    status: "STRENGTHENED",
    thesis: "Hike optionality remains live even after Treasury intervened in the long end.",
    evidence: "The yield relief reversed; Musalem leaned toward a September hike while Daly cautioned against overreading long yields.",
    trigger: "CPI/PCE, labour data, Fed communication and the next FOMC decision.",
    sources: ["FT", "WSJ", "Web"],
    risk: true,
  },
  {
    theme: "U.S. growth",
    status: "NO MATERIAL CHANGE",
    thesis: "Growth remains mixed: inflation and financing risks rose, but no broad new activity release settled the cycle.",
    evidence: "FOMC participants still saw two-sided growth/employment and inflation risks; EIA product supplied softened without providing an economy-wide signal. WSJ input is 19 Aug prior-day print.",
    trigger: "Claims, payrolls, retail, housing, production and credit releases with current-period comparability.",
    sources: ["WSJ", "Web"],
    risk: true,
  },
  {
    theme: "India inflation",
    status: "STRENGTHENED",
    thesis: "Supply pressure is now visible in sugar relief and fuel-choice behaviour before it becomes broad inflation.",
    evidence: "India opened a 1mt duty-free raw-sugar window while premium petrol gained share as motorists reacted to E20; core-sector input categories also weakened.",
    trigger: "Sugar arrivals/prices, cane diversion, fuel pass-through, core breadth, crops and October MPC language.",
    sources: ["BS", "Mint"],
    risk: true,
  },
  {
    theme: "INR / external buffer",
    status: "STRENGTHENED",
    thesis: "Intervention and offshore funding add resilience, but oil, sanctions and deployment costs preserve depreciation pressure.",
    evidence: "INR closed 95.705 with RBI support; HDFC markets a $1bn-plus raise and FCNR inflows face negative-carry/maturity risk.",
    trigger: "Reserves/forwards, intervention, oil, sanctions, hedge cost, window expiry and deposit retention.",
    sources: ["BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "India FPI flows",
    status: "NO MATERIAL CHANGE",
    thesis: "One positive session and new LIC headroom do not establish a durable foreign or domestic flow turn.",
    evidence: "19 August provisional FII/FPI buying was ₹407.99 crore and DII buying ₹3,973.72 crore; LIC’s 9.99% HDFC Bank ceiling is permission, not purchase.",
    trigger: "Multi-day depository flows, LIC disclosures, oil, INR, global real yields and earnings revisions.",
    sources: ["BS", "Web"],
  },
  {
    theme: "China demand",
    status: "NO MATERIAL CHANGE",
    thesis: "Strategic-tech investment and selective chip access still do not establish household or property recovery.",
    evidence: "Limited H200 exemptions and Unitree’s valuation are supply-side tech signals; no fresh demand stimulus or household data changed the thesis. FT/WSJ are 20 Aug prior-day print.",
    trigger: "Credit, property sales/prices, fiscal support, imports, August activity and household demand.",
    sources: ["FT", "WSJ", "Web"],
  },
  {
    theme: "AI capex",
    status: "STRENGTHENED",
    thesis: "AI buildout is becoming a structured-credit event as well as a chip-demand cycle.",
    evidence: "Broadcom-linked talks exceed $60bn and could reach $100bn; terms and guarantees are still under discussion. FT/WSJ are 20 Aug prior-day print.",
    trigger: "Financing close, covenants, guarantees, utilisation, collateral values, programme revenue and customer concentration.",
    sources: ["FT", "WSJ", "BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "Semiconductor / memory constraints",
    status: "STRENGTHENED",
    thesis: "AI-memory scarcity is generating supplier cash returns while pushing device markets up-price.",
    evidence: "SK Hynix announced a $28.3bn cancellation buyback; India’s sub-₹10k smartphone share fell from 18% to 4% as memory costs more than doubled.",
    trigger: "HBM/memory prices, buyback execution, smartphone mix, H200 deliveries, foundry allocation and yields.",
    sources: ["BS", "FT", "WSJ", "Web"],
    risk: true,
  },
  {
    theme: "U.S. trade policy",
    status: "STRENGTHENED",
    thesis: "Canada’s reprieve remains an unsigned weekend cliff with provincial execution risk.",
    evidence: "Quebec withheld endorsement and controls its own alcohol concession; no full legal text or relief schedule was public. FT/WSJ are 20 Aug prior-day print.",
    trigger: "Signed text, Saturday effective time, product coverage, provincial measures and USMCA sequencing.",
    sources: ["FT", "WSJ", "BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "Bank liability competition",
    status: "STRENGTHENED",
    thesis: "FCNR pricing and offshore bonds now create deployment and maturity risk as well as funding capacity.",
    evidence: "HDFC’s new raise is marketed, not closed; Mint reports negative-carry and mismatch concerns after early FCNR closure.",
    trigger: "Deal completion, deposit mix, NIMs, FCNR retention, offshore spreads, deployment and swaps.",
    sources: ["BS", "Mint", "Web"],
  },
  {
    theme: "Tata succession / governance",
    status: "STRENGTHENED",
    thesis: "The governance dispute now has a reported February leadership deadline.",
    evidence: "WSJ reports Chandrasekaran plans to leave after failing to secure one director’s backing; no successor or transition resolution is public.",
    trigger: "Reconvened AGM, Charity Commissioner order, Trust nominee, board action, named successor and entity-level funding choices.",
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
    title: "The steel box that built globalisation",
    sourceLabel: "Financial Times",
    sources: ["FT"],
    detail: "20 Aug prior-day print p13 · containers, ports and inland chokepoints",
    reason: "The most durable explanation of why a shipping shock is rarely one strait: port concentration, water levels, inland links and equipment cycles all determine resilience.",
    question: "Which bottleneck now has the highest marginal value—sea route, port capacity, inland freight, insurance or container availability?",
  },
  {
    title: "Can America take on its Treasury bond market?",
    sourceLabel: "Wall Street Journal",
    sources: ["WSJ"],
    detail: "20 Aug prior-day print A1–A2, B12 · debt supply and buyback limits",
    reason: "The best structural counterpart to today’s one-day yield reversal: it separates market-function tools from the fiscal arithmetic driving term premium.",
    question: "What would actually lower long-duration risk—liquidity operations, issuance changes, fiscal consolidation or a different inflation path?",
  },
  {
    title: "Indian firms’ Q1 scorecard conceals a widening divide",
    sourceLabel: "Mint",
    sources: ["Mint"],
    detail: "21 Aug printed p5 · 2,774-company revenue and profit breadth",
    reason: "It prevents an 18% index-profit beat from becoming a false economy-wide signal by separating size bands, real revenue and commodity effects.",
    question: "Which sectors can convert headline profit momentum into broad hiring, supplier orders and private capex?",
  },
  {
    title: "India has the world’s costliest orbital launches",
    sourceLabel: "Mint",
    sources: ["Mint"],
    detail: "21 Aug printed p3 · peer launch-cost comparison and private-space economics",
    reason: "A useful corrective to launch-count optimism: private-space scale needs lower cost, anchor demand and repeatable reliability, not only successful missions.",
    question: "Which lever closes the gap fastest—vehicle reuse, launch cadence, procurement, payload scale or private anchor customers?",
  },
];

export const methodology = {
  pages: 97,
  clusters: 43,
  retained: stories.length,
  homepage: 7,
  overlaps: "All 97 physical pages were visually accounted for. Continuations, Reuters/AP pickups and Mint’s WSJ partner copy count once; three appended piracy pages were reviewed and excluded. FT and WSJ are dated 20 August and receive zero fresh 21 August vote.",
  scoring: "Economic significance 20% · market impact 20% · strategic importance 20% · novelty 15% · India relevance 15% · durability 10%, then discounted for confidence, maturity, duplication and prior-day familiarity.",
  cutoff: "Print corpus: 16-page FT and 28-page WSJ dated 20 August, plus 24 physical pages of Mint and 29 of Business Standard dated 21 August. Web sweep: strictly after 11:15:00 IST on 20 August through 10:05:00 IST on 21 August 2026. Published snapshot of evidence; not a live feed.",
};
