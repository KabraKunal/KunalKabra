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
  dateLabel: "Wednesday · 19 August 2026",
  sourceLabel: "FT + WSJ + Business Standard + Mint + Last 24h Web",
  snapshotLabel: "Published snapshot · 09:56 IST",
  webWindowLabel: "After 12:10 IST on 18 August → 09:56:58 IST on 19 August 2026",
  bottomLine:
    "India’s global risks are becoming measurable at home: the Hormuz shock has reached the crude bill, uneven rain is forcing an early farm response, and AI’s costs are surfacing in leverage, hiring and hardware prices.",
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
    id: "hormuz-india-bill",
    rank: 1,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA", "ENERGY & GEOPOLITICS"],
    eyebrow: "Hormuz · oil · India external account",
    headline: "Hormuz has moved from geopolitical risk into India’s import bill",
    summary:
      "India’s July crude-import bill reached $13.7bn, up 41% year on year, as volumes rose 13% to 21.4mn tonnes and the Indian basket averaged $82.04 a barrel. Aramco loaded three VLCCs from inside the strait, each capable of carrying roughly 2mn barrels, but that workaround does not establish normal commercial transit.",
    why:
      "The shock now has a hard India denominator: external-balance pressure, INR sensitivity, fuel and subsidy risk, and a wider margin squeeze for airlines and input-intensive manufacturers.",
    secondOrder:
      "Partial cargo workarounds can soften spot scarcity while keeping insurance, freight and inventory costs elevated—making the inflation impulse more persistent than a simple oil-price snapshot suggests.",
    winners: "Producers outside the strait, alternative logistics routes and suppliers localising Gulf infrastructure.",
    losers: "Import-dependent consumers, airlines, chemical users and governments cushioning pump prices.",
    watch: "Verified commercial crossings, Omani-route use, war-risk insurance, loadings, formal diplomacy, Brent and India’s reserve/INR response.",
    importance: "High",
    confidence: "High",
    maturity: "The import bill, cargoes and prices are observed; route normalisation and diplomacy remain contested",
    sources: [
      { source: "WSJ", detail: "18 Aug PDF pp1, 7–8 · Oman chronology, Iran posture and Red Sea spillover" },
      { source: "BS", detail: "19 Aug printed pp6, 8, 19 · crude bill, Reuters cargoes and market transmission" },
      { source: "Mint", detail: "19 Aug printed pp2, 9–10 · oil, Iran and market transmission" },
      { source: "FT", detail: "18 Aug duplicate PDF pp2, 11, 16 · prior-day context; zero fresh vote" },
      {
        source: "Web",
        detail: "AP · Kpler traffic and disputed route-management mechanics, 18 Aug 13:50 IST",
        url: "https://apnews.com/article/iran-us-israel-lebanon-gaza-hormuz-august-18-2026-9c48af23b713709e8e170191fbc78c2a",
      },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "The $13.7bn bill, 21.4mn tonnes, $82.04 basket and three Aramco cargoes are separate observed denominators inside one risk system. Reuters or partner repetition counts once." },
      { kind: "DISAGREEMENT", text: "Public claims that the route is open conflict with Iranian conditions, casualty reporting and abnormal traffic. A few loadings are evidence of adaptation, not normal throughput." },
      { kind: "WEB UPDATE", text: "Kpler data cited by AP put weekly crossings at 95, down 19.5%, with only three Sunday crossings and none on the Omani route. Negotiated management and fee terms remain source-reported, not agreed." },
      { kind: "INFERENCE", text: "The wider INR, subsidy and corporate-margin transmission is synthesis from import, price, freight and input-cost evidence." },
    ],
  },
  {
    id: "monsoon-farm-response",
    rank: 2,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA"],
    eyebrow: "Monsoon · food inflation · rural demand",
    headline: "The national monsoon recovery is hiding a sharp geographic tail",
    summary:
      "The national rain deficit narrowed from nearly 40% to 13% by 16 August, yet 35% of states remained in deficit: Bihar was 41% below normal and Jharkhand 21% below. The Centre front-loaded Q1 farm spending to ₹29,593 crore, or 21% of the annual allocation, versus ₹12,297 crore and 9% a year earlier.",
    why:
      "National averages can misprice food, rural-income and state-fiscal risk. The policy response is real, but it is mitigation—not proof that sowing, yields or household demand are secure.",
    secondOrder:
      "A patchy crop outcome can lift food volatility even if aggregate rainfall normalises, widening the gap between headline growth and rural purchasing power across states.",
    winners: "Irrigation, crop-input and rural-infrastructure suppliers in states receiving accelerated spending.",
    losers: "Rain-dependent farmers, food processors and consumers exposed to local crop failures.",
    watch: "District rainfall, reservoir storage, crop-wise sowing, yield estimates, procurement and food-CPI pass-through.",
    importance: "High",
    confidence: "High",
    maturity: "Rainfall and expenditure are observed; yield, output and inflation effects are not",
    sources: [
      { source: "Mint", detail: "19 Aug printed p9 (rainfall) and p2 (farm spending)" },
      { source: "BS", detail: "19 Aug printed pp6, 21 · food-policy and inflation context" },
      {
        source: "Web",
        detail: "IMD · extreme-rain, drainage and resowing advice, 18 Aug 13:15 IST",
        url: "https://mausam.imd.gov.in/Forecast/marquee_data/Press%20Release%2018-08-2026.pdf",
      },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "National deficit, state deviations and Q1 spending are different measures. None is a crop-output forecast." },
      { kind: "WEB UPDATE", text: "IMD adds a second tail: extreme rain, waterlogging and possible resowing across parts of the east and centre. It does not yet establish crop loss, yield or CPI impact." },
      { kind: "INFERENCE", text: "Calling this a geographically concentrated inflation and rural-demand tail is synthesis; the final yield and CPI channel remain open." },
    ],
  },
  {
    id: "ai-leverage-unwind",
    rank: 3,
    sections: ["TODAY", "MARKETS & MACRO", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "AI concentration · leverage · counterparties",
    headline: "A reported AI-fund unwind exposes a leverage transmission channel",
    summary:
      "WSJ reports that Situational Awareness’s concentrated AI portfolio lost roughly two-thirds of its equity—about $30bn—in July after assets had surged from about $1.5bn to more than $45bn and gross exposure approached $100bn. Jane Street reportedly lost about $15bn as a counterparty.",
    why:
      "The reported episode shows how AI concentration can move beyond equity volatility into financing, prime-broker and market-liquidity channels.",
    secondOrder:
      "A crowded theme can remain strategically right while destroying levered capital. Counterparties may tighten haircuts and force deleveraging before underlying AI demand weakens.",
    winners: "Diversified capital providers and investors with unlevered exposure or dry powder after forced selling.",
    losers: "Concentrated funds, short-volatility counterparties and borrowers dependent on generous AI-linked collateral values.",
    watch: "Fund or counterparty confirmation, realised versus marked loss, current AUM, redemptions, financing terms and contagion outside AI trades.",
    importance: "High",
    confidence: "Medium",
    maturity: "A realised unwind is source-reported; private marks, leverage and counterparty allocation are not public audited data",
    sources: [
      { source: "WSJ", detail: "18 Aug PDF pp1, 4 · original staff investigation of the six-day unwind" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "Use ‘reportedly’ and ‘about’: $30bn is fund-equity loss, while near-$100bn is gross exposure. Neither is an audited public filing." },
      { kind: "INFERENCE", text: "Tighter prime-broker capacity and broader liquidity effects are plausible transmission channels, not outcomes established by the article." },
    ],
  },
  {
    id: "tata-governance-funding",
    rank: 4,
    sections: ["TODAY", "INDIA", "COMPANIES"],
    eyebrow: "Tata · governance · capital allocation",
    headline: "Tata’s adjourned AGM turns a funding cycle into a governance test",
    summary:
      "Tata Sons’ AGM was adjourned for lack of quorum after Trust representation could not be constituted; N. Chandrasekaran’s term runs to 20 February 2027 after he declined another term. Listed companies face distinct funding tests—from JLR’s £2.23bn FY26 free-cash outflow and Tata Steel’s ₹84,173 crore net debt to an up-to-₹18,000 crore TCS/TPG HyperVault equity commitment.",
    why:
      "The group is not short of assets or options. The decision problem is allocating capital and accountability across several large programmes while Trust, board and succession mechanics remain unresolved.",
    secondOrder:
      "Governance friction can delay funding structures, partner choices and project milestones even when operating companies can self-finance much of their expansion.",
    winners: "Businesses with transparent returns, internal cash generation and credible external financing partners.",
    losers: "Capital-intensive projects with slow ramps, unclear ownership of risk or repeated dependence on holding-company support.",
    watch: "Reconvened AGM, Charity Commissioner order, Trust nominee, successor process, project finance and entity-level cash flow.",
    importance: "High",
    confidence: "High",
    maturity: "The adjournment and reported balances are realised; succession and future funding choices are unresolved",
    sources: [
      { source: "BS", detail: "19 Aug printed pp1, 6, 18 · adjournment, succession and listed-company funding" },
      { source: "Mint", detail: "19 Aug printed p6 · PTI account of the realised AGM adjournment" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "Adjournment is a maturity upgrade from yesterday’s expectation. Capex, debt and cash-flow figures span entities, currencies and years and must not be mechanically added." },
      { kind: "INFERENCE", text: "Calling capital allocation a governance test is synthesis. The evidence does not establish group distress, control change or a chosen successor." },
    ],
  },
  {
    id: "india-ai-jobs",
    rank: 5,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA", "AI & TECHNOLOGY"],
    eyebrow: "India jobs · AI adoption · skills",
    headline: "India’s AI transition is cutting entry-level pathways before ROI is settled",
    summary:
      "The top five IT firms shed a net 6,981 employees in FY26, 55% of one employer survey saw fewer entry-level jobs and only 12% of 300-plus enterprises reported significant AI returns; 57% reported none or did not know. Counterevidence matters: another dataset counted 83,100 AI jobs added versus 32,921 roles lost from 2023 to August 2026.",
    why:
      "The near-term problem is not a single net job-loss forecast. It is a mismatch between shrinking apprenticeship tasks, uneven enterprise payback and the speed at which workers can move into higher-value roles.",
    secondOrder:
      "If junior work disappears faster than training models adapt, firms may create a future experience bottleneck even while productivity rises for today’s senior workers.",
    winners: "Employers that redesign work and fund measurable reskilling; workers with domain expertise plus AI fluency.",
    losers: "Entry-level applicants, undifferentiated IT services and training programmes measured by enrolment rather than job outcomes.",
    watch: "Entry hiring, revenue per employee, task redesign, internal mobility, wage distribution and verified enterprise ROI.",
    importance: "High",
    confidence: "High",
    maturity: "Headcount and surveys are observed; scenario ranges and cross-dataset netting are not comparable outcomes",
    sources: [
      { source: "BS", detail: "19 Aug printed p17 · Take Two synthesis across NITI, enterprise and labour datasets" },
      { source: "Mint", detail: "19 Aug printed pp5, 9 · campus allocation and workforce evidence" },
      { source: "WSJ", detail: "18 Aug PDF p9 · AI-era internship and recruiting evidence" },
    ],
    evidence: [
      { kind: "DISAGREEMENT", text: "Loss scenarios, headcount, survey answers and AI-job additions use different periods and definitions. They cannot be added into one national net-jobs number." },
      { kind: "INFERENCE", text: "The future experience bottleneck is a second-order risk, not yet a measured labour-market outcome." },
    ],
  },
  {
    id: "global-long-bonds",
    rank: 6,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA"],
    eyebrow: "Rates · duration · fiscal risk",
    headline: "The global long end is repricing even without a fresh central-bank move",
    summary:
      "The U.S. 30-year yield reached roughly 5.32%, its highest since 2007, while France traded near its highest since 2008 and Japan’s 10-year yield remained close to 3%. Oil, fiscal supply and AI-related borrowing are lifting term-premium risk even as short-rate policy signals remain mixed.",
    why:
      "Long yields set the discount rate for equities, housing, infrastructure and sovereign refinancing. They can tighten financial conditions without a policy-rate hike.",
    secondOrder:
      "India can receive the shock through FPI duration appetite, corporate offshore funding and INR hedging even when domestic liquidity is comfortable.",
    winners: "Cash-rich savers, short-duration lenders and issuers that pre-funded at lower rates.",
    losers: "Long-duration equities, leveraged real estate, weak sovereigns and projects with distant cash flows.",
    watch: "Treasury/JGB auctions, inflation expectations, fiscal supply, Fed communication, oil and cross-market term-premium correlation.",
    importance: "High",
    confidence: "High",
    maturity: "Yields are observed; attribution among oil, fiscal supply and AI borrowing is analytical",
    sources: [
      { source: "Mint", detail: "19 Aug printed p10 · Bloomberg global duration analysis" },
      { source: "BS", detail: "19 Aug printed p19 · India equity and U.S. long-yield transmission" },
      { source: "FT", detail: "18 Aug duplicate PDF p11 · Japan context; zero fresh vote" },
      { source: "WSJ", detail: "18 Aug PDF p25 · market tables and yield context" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "The yield levels are market observations. No fresh Fed decision or common global policy shock occurred in the print set." },
      { kind: "INFERENCE", text: "The term-premium mix and India transmission are synthesis; policy-rate expectations and long-end supply should not be conflated." },
    ],
  },
  {
    id: "industrial-policy-execution",
    rank: 7,
    sections: ["TODAY", "INDIA", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "Electronics · memory · industrial policy",
    headline: "India’s electronics test has shifted from approvals to qualification and input economics",
    summary:
      "Only 18 of 82 shortlisted auto-PLI firms had qualified, with roughly ₹800 crore paid so far and ₹4,700 crore estimated for FY27 against a ₹5,922 crore outcome target. OnePlus raised eight handset prices by 5%–26% as memory costs reportedly surged; a proposed government anchor-customer role for chips remains unnotified and source-based.",
    why:
      "The bottleneck is no longer announcing capacity. It is qualifying products, securing customers and absorbing component costs before subsidies and factories translate into durable value.",
    secondOrder:
      "Rising memory prices can transfer policy and supply-chain constraints directly to consumers, while weak qualification delays the local supplier learning curve.",
    winners: "Qualified suppliers with anchor demand, scale purchasing and domestic component depth.",
    losers: "Assembly-heavy firms, delayed PLI applicants and consumers exposed to input-cost pass-through.",
    watch: "Qualified models/firms, realised PLI payouts, memory contract prices, OEM price lists, chip tape-outs and signed anchor orders.",
    importance: "High",
    confidence: "Medium",
    maturity: "Prices and paid incentives are observed; future payouts and the chip anchor-customer plan are provisional",
    sources: [
      { source: "Mint", detail: "19 Aug printed pp3, 8 · auto-PLI delivery, OnePlus prices and proposed chip anchor plan" },
      { source: "BS", detail: "19 Aug printed p10 · Google Pixel supply-chain context" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "₹800 crore is paid-to-date, ₹4,700 crore is an estimate and ₹5,922 crore is a target. OnePlus’s observed range is 5%–26%." },
      { kind: "INFERENCE", text: "PLI qualification, memory pass-through and proposed public procurement belong to one execution problem but are not evidence of one causal programme." },
    ],
  },
  {
    id: "png-incentive",
    sections: ["INDIA", "COMPANIES", "ENERGY & GEOPOLITICS"],
    eyebrow: "City gas · connections · LNG substitution",
    headline: "Domestic-gas allocation now rewards actual household connections",
    summary:
      "From 1 September, city-gas distributors can receive 200 standard cubic metres of domestic gas for each qualifying incremental billed household connection, released in two tranches over six months. India has 17.4mn installed connections but only 11.5mn receiving gas.",
    why: "The design shifts support from pipeline buildout toward utilisation and could reduce dependence on costlier LNG.",
    secondOrder: "Better connection economics can accelerate network density, but only if households are actually gasified and retained.",
    winners: "Distributors with ready networks and a credible conversion pipeline.",
    losers: "Underused networks that cannot turn installed pipes into billed customers.",
    watch: "Connections billed, domestic-gas allocation, retention, LNG substitution, margins and CNG crowd-out.",
    importance: "Medium",
    confidence: "High",
    maturity: "The mechanism is approved; connection and margin outcomes are not realised",
    sources: [
      { source: "BS", detail: "19 Aug printed p6 · approved allocation mechanism" },
      { source: "Mint", detail: "19 Aug printed p2 · installed-versus-supplied denominator and targets" },
    ],
    evidence: [{ kind: "PRINT FACT", text: "The 200-scm benefit is conditional, time-limited and incremental. Installed and gas-supplied connections are different denominators." }],
  },
  {
    id: "vizhinjam-exim",
    sections: ["INDIA", "COMPANIES", "ENERGY & GEOPOLITICS"],
    eyebrow: "Ports · logistics · infrastructure",
    headline: "Vizhinjam has crossed from commissioning into export-import operations",
    summary:
      "The port handled its first export-import cargo, creating a realised operating milestone for India’s transshipment strategy. The ₹16,000 crore Phase II, 5.7mn-TEU capacity and December 2028 timetable remain targets rather than delivered scale.",
    why: "Direct mainline access can shorten transit times and reduce India’s dependence on foreign transshipment hubs.",
    secondOrder: "The competitive test now shifts from infrastructure completion to recurring services, customs flow and hinterland connectivity.",
    winners: "Exporters, shipping lines and logistics providers that can use regular direct calls.",
    losers: "Competing regional hubs if service frequency and economics prove durable.",
    watch: "Scheduled services, monthly TEU, dwell time, Phase II contracts, rail/road links and customer concentration.",
    importance: "Medium",
    confidence: "High",
    maturity: "First cargo is realised; future capacity, capex and jobs are targets",
    sources: [{ source: "BS", detail: "19 Aug printed p5 · first exim operation and Phase II plan" }],
    evidence: [{ kind: "PRINT FACT", text: "Do not describe 5.7mn TEU, ₹16,000 crore completion or 5,000 jobs as realised outcomes." }],
  },
  {
    id: "cash-digital-coexistence",
    sections: ["MARKETS & MACRO", "INDIA"],
    eyebrow: "Currency · payments · RBI operations",
    headline: "Digital payments are not eliminating India’s cash-management burden",
    summary:
      "Currency in circulation reached ₹42.76tn on 31 July, up 12.5% year on year, even as cash-to-GDP fell to about 11% from 14.4% in FY21. RBI still produces 28–30bn notes annually and destroys roughly 21bn.",
    why: "The operating cost and resilience problem is coexistence, not a simple cash-to-digital substitution.",
    secondOrder: "Faster payments can reduce transaction cash intensity while economic scale and precautionary demand keep the physical-note stock growing.",
    winners: "Payment systems and currency-technology vendors that improve resilience across both rails.",
    losers: "Policy models assuming digital adoption automatically shrinks note logistics.",
    watch: "Cash/GDP, note production/destruction, denomination mix, polymer pilot and UPI cash-substitution evidence.",
    importance: "Medium",
    confidence: "High",
    maturity: "Currency stock and operating data are realised; the polymer trial is prospective",
    sources: [{ source: "BS", detail: "19 Aug printed pp1, 6 · RBI currency-management data and continuation" }],
    evidence: [{ kind: "PRINT FACT", text: "12.5% stock growth and the lower cash/GDP ratio answer different questions and can both be true." }],
  },
  {
    id: "jio-prime",
    sections: ["INDIA", "COMPANIES"],
    eyebrow: "Telecom · pricing · ARPU",
    headline: "Jio has changed pricing architecture; the next tariff hike is still an inference",
    summary:
      "Jio retained its ₹299 unlimited-data entry plan but reintroduced a one-time ₹300 Prime fee and locked eligible pricing to 5 September 2027. The fee adds roughly ₹25 a month over a year; the reported ₹50-per-28-day future hike is brokerage modelling, not an announced tariff.",
    why: "A live fee structure can lift effective yield and create room for industry-wide repricing without changing the headline plan price.",
    secondOrder: "If rivals copy the architecture, Vodafone Idea gains operating leverage—but only if churn remains contained.",
    winners: "Operators with strong networks and low churn; Vodafone Idea if sector pricing follows.",
    losers: "Price-sensitive subscribers and rivals forced to follow before service quality improves.",
    watch: "Official plan circulars, take-up, churn, ARPU and Airtel/Vi response.",
    importance: "Medium",
    confidence: "High",
    maturity: "Prime terms are live; future tariff timing and magnitude are analyst estimates",
    sources: [{ source: "BS", detail: "19 Aug printed p2 · live plan mechanics plus brokerage scenarios" }],
    evidence: [{ kind: "INFERENCE", text: "A sector-wide tariff cycle and ₹50 hike are scenarios, not company announcements." }],
  },
  {
    id: "fcnr-aftershock",
    sections: ["MARKETS & MACRO", "INDIA", "COMPANIES"],
    eyebrow: "FCNR · INR · bank funding",
    headline: "The FCNR buffer is large, but its bond and hedging costs are surfacing",
    summary:
      "FCNR(B) deposits exceeded $52.3bn within a wider $56.8bn mobilisation pool, yet INR improved only about 0.1%. Five-year government yields rose roughly 10bp in two sessions as positioning unwound; a reported five-year RBI hedge-cost estimate near $10.5bn is modelled, not realised.",
    why: "Reserve support, bank liability competition and fiscal/market cost can coexist inside the same successful mobilisation.",
    secondOrder: "Post-window retention and swap unwinds may matter more than the headline inflow for bank margins and the curve.",
    winners: "Banks that lock durable foreign-currency funding without overpaying.",
    losers: "Crowded bond positions and institutions exposed to expensive hedging or rapid deposit runoff.",
    watch: "Final RBI totals, post-close runoff, reserves/forwards, deposit pricing, swaps, VRRRs and five-year yields.",
    importance: "High",
    confidence: "High",
    maturity: "Deposits and prices are observed; final retention, hedge cost and forecasts are unresolved",
    sources: [
      { source: "BS", detail: "19 Aug printed p4 · three-part FCNR/rupee/bond analysis" },
      { source: "Mint", detail: "19 Aug printed pp1, 6 · continuation and wider mobilisation context" },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "$52.3bn is FCNR(B); $56.8bn is the wider pool. They must not be used interchangeably." },
      { kind: "INFERENCE", text: "The $10.5bn hedge-cost estimate and INR forecasts are model outputs, not booked outcomes." },
    ],
  },
  {
    id: "red-sea-attacks",
    sections: ["MARKETS & MACRO", "ENERGY & GEOPOLITICS"],
    eyebrow: "Red Sea · shipping · supply chains",
    headline: "Red Sea attacks are intensifying without producing a total route shutdown",
    summary:
      "Houthi attacks forced Mokha port to close, killed 16 and wounded 22, and affected more than 1,500 workers. Yet Bab al-Mandeb transits rose to 254 in 10–16 August from 238 the week before.",
    why: "The operational signal is higher casualty, insurance and schedule risk—not zero traffic.",
    secondOrder: "Shipping can keep moving while disruption becomes embedded in freight rates, inventory planning and port economics.",
    winners: "Diversified carriers, alternative routes and ports able to absorb rerouted cargo.",
    losers: "Crew, coastal workers and just-in-time supply chains exposed to repeated attacks.",
    watch: "Attacks, casualties, port reopening, weekly transits, insurance and carrier routing.",
    importance: "High",
    confidence: "High",
    maturity: "Casualties, closure and transit counts are observed; future campaign intensity is uncertain",
    sources: [{ source: "WSJ", detail: "18 Aug PDF p7 · staff/local reporting and transit data" }],
    evidence: [{ kind: "PRINT FACT", text: "Higher weekly transits do not negate the attacks; they show a dangerous but functioning route." }],
  },
  {
    id: "air-india-hydraulics",
    sections: ["INDIA", "COMPANIES"],
    eyebrow: "Aviation · safety · operations",
    headline: "Air India’s hydraulic event warrants engineering scrutiny, not causal shortcuts",
    summary:
      "On 4 August, all three hydraulic systems on an Air India flight were briefly affected and control-surface availability was lost for about four seconds; 20 passengers and four crew were injured. The cause remains unresolved and this event is distinct from AI171 and separate drug-testing debates.",
    why: "A short common-mode systems loss is operationally material in a rapidly scaling aviation market.",
    secondOrder: "Safety credibility depends on isolating engineering evidence from unrelated labour or toxicology narratives.",
    winners: "Operators and regulators that publish technically precise findings and corrective action.",
    losers: "Airlines if unresolved incidents compound confidence and insurance costs.",
    watch: "AAIB/DGCA findings, maintenance records, fleet inspection, corrective directives and recurrence.",
    importance: "Medium",
    confidence: "High",
    maturity: "The event and injuries are reported; cause and corrective action are unresolved",
    sources: [{ source: "Mint", detail: "19 Aug PDF p3 · 4 August hydraulic event and control-surface detail" }],
    evidence: [{ kind: "DISAGREEMENT", text: "Do not connect this event to AI171 or initial-only drug screens without causal evidence." }],
  },
  {
    id: "remittance-fastds",
    sections: ["INDIA"],
    eyebrow: "Tax · remittances · compliance",
    headline: "India is pairing foreign-remittance verification with a time-limited disclosure route",
    summary:
      "CBDT is verifying 394 entities and 36 professionals over suspicious remittance patterns. Separately, FAST-DS runs from 16 August to 31 December, with distinct categories for unexplained foreign assets or income and previously taxed or NRI assets.",
    why: "The combination raises near-term compliance demand while drawing a line between verification and adjudicated wrongdoing.",
    secondOrder: "A credible disclosure route can improve information quality, but aggressive inference risks chilling legitimate cross-border activity.",
    winners: "Compliant taxpayers and advisers able to reconcile documentation early.",
    losers: "Opaque remittance structures and entities unable to evidence commercial substance.",
    watch: "CBDT guidance, disclosure take-up, assessments, litigation and treatment of bona fide errors.",
    importance: "Medium",
    confidence: "High",
    maturity: "The verification drive and scheme terms are real; guilt, liability and take-up are not established",
    sources: [
      { source: "BS", detail: "19 Aug printed p4 · CBDT verification drive" },
      { source: "Mint", detail: "19 Aug printed p9 · FAST-DS terms and thresholds" },
    ],
    evidence: [{ kind: "PRINT FACT", text: "Verification is not a finding of evasion, and the FAST-DS categories have different bases and limits." }],
  },
  {
    id: "warehouse-robotics",
    sections: ["COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "Automation · logistics · labour",
    headline: "Warehouse automation is moving from pilot budgets into equipment orders",
    summary:
      "North American companies ordered almost 18,000 robots worth $1.2bn in the first half, up 2% in units and 7% in value. Warehouse wages reached $26.85 an hour, up 5% year on year, while 92% of surveyed companies planned more automation.",
    why: "This is realised capital allocation at the intersection of labour scarcity, service speed and AI-enabled operations.",
    secondOrder: "Automation may raise throughput without reducing total employment if e-commerce volume and service expectations grow faster.",
    winners: "Robotics vendors, integrators and scaled operators with repeatable deployment economics.",
    losers: "Manual-only operators and workers whose tasks are automated without mobility pathways.",
    watch: "Orders, installation time, utilisation, productivity, safety, wages and headcount by task.",
    importance: "Medium",
    confidence: "High",
    maturity: "Orders and wages are observed; survey intent and productivity outcomes are developing",
    sources: [{ source: "WSJ", detail: "18 Aug PDF p20 · orders, wages and operator investment plans" }],
    evidence: [{ kind: "PRINT FACT", text: "The 92% figure is survey intent, not realised deployment; order value and unit growth differ." }],
  },
  {
    id: "openai-economics-control",
    sections: ["MARKETS & MACRO", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "OpenAI · economics · model pacing",
    headline: "OpenAI’s growth, losses and capability controls are diverging",
    summary:
      "WSJ reports Q2 sales of $6.7bn, up 18% sequentially, while loss including stock compensation widened to $12.3bn from $9.3bn. OpenAI separately says preliminary Astra cyber evidence caused a two-week deployment-focused RL pause; its largest planned frontier run remains on hold.",
    why: "Commercial growth and capability control are becoming simultaneous operating constraints, not separate policy conversations.",
    secondOrder: "Monitoring and safety pauses can consume compute and delay learning loops just as investors demand evidence that revenue catches up with infrastructure commitments.",
    winners: "Labs that make control costs measurable and convert model capability into durable, comparable revenue.",
    losers: "Platforms whose loss growth, training expense and control overhead outrun monetisation.",
    watch: "Audited financials, cash burn, partner-accounting reconciliation, Astra’s technical report, run resumption and monitoring cost at scale.",
    importance: "High",
    confidence: "Medium",
    maturity: "Private financials are source-reported; disclosed pauses are real, while capability evidence remains preliminary",
    sources: [
      {
        source: "Web",
        detail: "Wall Street Journal · investor-reported Q2 figures",
        url: "https://www.wsj.com/tech/ai/openais-second-quarter-sales-show-tepid-growth-compared-with-anthropic-5cb42998",
      },
      {
        source: "Web",
        detail: "OpenAI · development pacing and cyber controls",
        url: "https://openai.com/index/pacing-model-development-cyber-capabilities/",
      },
    ],
    evidence: [
      { kind: "WEB UPDATE", text: "The Q2 figures are private, unaudited and not directly comparable with Anthropic because cloud-partner and cost accounting differ." },
      { kind: "WEB UPDATE", text: "The pause applies to deployment-focused RL and the largest planned run; it does not mean all Astra work stopped or that a breach occurred." },
    ],
  },
  {
    id: "l3harris-governance",
    sections: ["COMPANIES", "ENERGY & GEOPOLITICS"],
    eyebrow: "Defence · governance · management",
    headline: "L3Harris removed its CEO—but explicitly separated conduct from operations",
    summary:
      "L3Harris removed chairman and CEO Christopher Kubasik for a code violation, awarded no severance and appointed Sam Mehta. The company said the matter did not concern finances or operations; shares fell 4.6%.",
    why: "A completed leadership change at a strategic defence supplier matters, but the undisclosed conduct should not be recast as fraud or operating failure.",
    secondOrder: "Governance credibility now depends on succession stability and delivery against reaffirmed programme targets.",
    winners: "Stakeholders if the board’s rapid action contains disruption.",
    losers: "The company if uncertainty affects customer confidence, talent or strategic transactions.",
    watch: "Board disclosures, contract delivery, leadership permanence, investigations and the postponed spinoff.",
    importance: "Medium",
    confidence: "High",
    maturity: "Removal and succession are completed; conduct details remain undisclosed",
    sources: [{ source: "WSJ", detail: "18 Aug PDF pp17–18 · company action and interviews" }],
    evidence: [{ kind: "PRINT FACT", text: "The company expressly said the issue was not financial or operational; the evidence does not support alleging fraud." }],
  },
  {
    id: "nse-valuation-conflict",
    sections: ["MARKETS & MACRO", "INDIA", "COMPANIES"],
    eyebrow: "NSE · IPO · valuation",
    headline: "NSE’s IPO interest is real; its valuation narrative is not reconciled",
    summary:
      "BS/Bloomberg describes ₹2,000–2,100 indications implying up to ₹5.26tn or $55bn, while Mint reports ₹2,500–2,800 and $29–32bn with roughly $1bn of indicative QIB interest. No primary RHP, price band or final timetable reconciles the incompatible frames.",
    why: "A record exchange listing would reset India-market benchmarks, but anonymous soundings are not offer terms.",
    secondOrder: "Unresolved valuation and regulatory sequencing can affect exchange multiples and capital-market expectations well before final offer terms.",
    winners: "Existing holders if demand survives primary-document scrutiny.",
    losers: "Investors anchoring to an unverified headline valuation.",
    watch: "RHP, OFS size, price band, selling holders, approval and timetable.",
    importance: "Medium",
    confidence: "Provisional",
    maturity: "Two source-based roadshow accounts conflict; no official offer terms are available",
    sources: [
      { source: "BS", detail: "19 Aug printed p19 · Bloomberg source-based roadshow account" },
      { source: "Mint", detail: "19 Aug printed pp1, 4 · staff source-based account" },
    ],
    evidence: [{ kind: "DISAGREEMENT", text: "Do not average $55bn and $29–32bn or present either as NSE guidance; the share and valuation denominators are not reconciled." }],
  },
  {
    id: "godrej-private-credit",
    sections: ["MARKETS & MACRO", "INDIA", "COMPANIES"],
    eyebrow: "Private credit · India · fundraising",
    headline: "Godrej Capital is opening a new private-credit supply channel",
    summary:
      "Godrej Capital launched a Category II AIF targeting ₹2,000 crore plus a ₹1,000 crore greenshoe for performing mid-market companies. The launch is real; the corpus has not yet been fully raised or deployed.",
    why: "India’s credit supply is broadening just as global private-credit stress makes underwriting and liquidity design more important.",
    secondOrder: "A performing-credit focus can fill bank gaps, but fundraising success and covenant discipline will determine whether it adds resilience or only leverage.",
    winners: "Mid-market borrowers with strong cash flow and investors seeking structured yield.",
    losers: "Weak borrowers if private pricing and covenants tighten faster than bank credit.",
    watch: "First close, investor mix, deployment, spreads, collateral, covenants and realised losses.",
    importance: "Medium",
    confidence: "High",
    maturity: "Fund launch is completed; target corpus and portfolio are prospective",
    sources: [{ source: "Mint", detail: "19 Aug printed p6 · company release/interview" }],
    evidence: [{ kind: "PRINT FACT", text: "₹3,000 crore includes the greenshoe and is a target, not money already raised or lent." }],
  },
  {
    id: "pixel-supply-chain",
    sections: ["INDIA", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "Google · supply chain · India manufacturing",
    headline: "Google suppliers are reportedly preparing a broader Pixel shift out of China",
    summary:
      "A Nikkei-origin report says Google wants Pixel phones, watches and earbuds produced outside China—mainly in Vietnam and India—from 2027. Supplier direction is strategically relevant, but final allocation, capex and qualification are not verified.",
    why: "A full-device ecosystem shift would deepen India’s electronics role beyond final assembly.",
    secondOrder: "The value captured locally will depend on component depth, yields and export scale rather than announced destination alone.",
    winners: "Qualified Indian electronics suppliers and logistics ecosystems.",
    losers: "China-centred suppliers unable to follow customers or retain component share.",
    watch: "Google/supplier confirmation, India capacity, component sourcing, qualification and 2027 shipment mix.",
    importance: "Medium",
    confidence: "Medium",
    maturity: "Supplier-source plan; production shift and scale are not completed",
    sources: [{ source: "BS", detail: "19 Aug printed p10 · Nikkei → agency report" }],
    evidence: [{ kind: "PRINT FACT", text: "This is one Nikkei-origin source chain, not independent agency confirmation or completed relocation." }],
  },
  {
    id: "wipro-dermatouch",
    sections: ["INDIA", "COMPANIES"],
    eyebrow: "Consumer · M&A · omnichannel",
    headline: "Wipro Consumer is using Dermatouch to buy digital-native growth",
    summary:
      "Wipro Consumer Care will acquire 60% of Dermatouch first and the remaining 40% over three years at an enterprise value of roughly ₹387 crore. It is Wipro’s first digital-brand acquisition, with an explicit offline-expansion thesis.",
    why: "The deal tests whether a scaled consumer platform can convert online brand discovery into profitable distribution breadth.",
    secondOrder: "Earn-out sequencing can preserve founder incentives while reducing integration risk.",
    winners: "Dermatouch if Wipro’s distribution and procurement accelerate scale.",
    losers: "Standalone digital brands without a credible offline or capital partner.",
    watch: "Closing, acquired growth/margins, offline doors, marketing efficiency and the remaining 40% terms.",
    importance: "Medium",
    confidence: "High",
    maturity: "Transaction announced; closing, integration and contingent consideration remain ahead",
    sources: [
      { source: "BS", detail: "19 Aug printed p2 · company announcement" },
      { source: "Mint", detail: "19 Aug printed p3 · company disclosure" },
    ],
    evidence: [{ kind: "PRINT FACT", text: "The two papers cover one company announcement; they are not independent confirmation votes." }],
  },
  {
    id: "ai-grid-permitting",
    sections: ["MARKETS & MACRO", "COMPANIES", "AI & TECHNOLOGY"],
    eyebrow: "AI infrastructure · power grid · permitting",
    headline: "Pennsylvania is making AI developers internalise grid and community costs",
    summary:
      "Executive Order 2026-05 removes AI data centres from Fast Track and ties accelerated review and tax treatment to binding GRID commitments, local approval and payment of incremental power and infrastructure costs. More than 100 projects were known, but only five were fully permitted for a first phase.",
    why: "The rule converts AI’s physical externalities into a developer obligation and a permitting variable, rather than treating grid access as an unlimited public input.",
    secondOrder: "Developers may redesign, delay or relocate projects; states can compete on speed while still demanding a clearer allocation of infrastructure costs.",
    winners: "Projects with secured power, community support and economics that survive full incremental costs.",
    losers: "Speculative campuses whose returns depend on socialised grid upgrades or opaque local agreements.",
    watch: "First GRID commitments, permit-cycle data, tax guidance, interconnection awards, litigation and relocations or cancellations.",
    importance: "High",
    confidence: "High",
    maturity: "Immediate policy action; project response, enforcement and economics remain unobserved",
    sources: [
      { source: "WSJ", detail: "18 Aug PDF pp17–18 · prior AI commitment and data-centre demand context" },
      {
        source: "Web",
        detail: "Pennsylvania Governor · Executive Order 2026-05",
        url: "https://www.pa.gov/governor/newsroom/2026-press-releases/governor-shapiro-signs-executive-order-on-data-center-developmen",
      },
    ],
    evidence: [
      { kind: "WEB UPDATE", text: "The order is effective immediately but is not a blanket ban. Developers can use the normal sequence if they decline the accelerated GRID pathway." },
      { kind: "INFERENCE", text: "Cancellation, migration and power-price effects are scenarios until project-level decisions appear." },
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
      "The common thread is duration and transmission: oil has reached India’s import account, the global long end is repricing, and a leveraged AI unwind shows how thematic concentration can reach financing channels.",
  },
  INDIA: {
    title: "India",
    dek: "Observed programme data and operating constraints outrank speeches, targets and proposal pipelines.",
    callout:
      "Execution is the morning’s India test: uneven rain must be separated from national averages, Tata must resolve governance while funding growth, and electronics incentives must convert into qualified production.",
  },
  COMPANIES: {
    title: "Companies",
    dek: "Only material earnings, governance, capital allocation, regulation and strategy shifts survive the cut.",
    callout:
      "Governance and operating maturity dominate: Tata’s AGM is adjourned, Vizhinjam has begun exim operations, Wipro has announced a staged acquisition and several large plans still lack primary terms.",
  },
  "AI & TECHNOLOGY": {
    title: "AI & Technology",
    dek: "The focus is economics, control, infrastructure and adoption—not model-release volume.",
    callout:
      "AI risk is splitting into distinct channels: leverage and counterparties, enterprise ROI and entry-level work, and hardware costs that are already passing into handset prices.",
  },
  "ENERGY & GEOPOLITICS": {
    title: "Energy & Geopolitics",
    dek: "Political news appears only when it changes oil, gas, shipping, sanctions, defence, commodities or corporate strategy.",
    callout:
      "Hormuz remains the organising risk, but Red Sea attacks are a separate shipping channel. Partial cargoes and continued traffic show adaptation—not normalisation or safety.",
  },
};

export const macroPulse = [
  {
    region: "United States",
    signal: "Long rates and housing are tightening together",
    driver: "The 30-year yield reached roughly 5.32%; post-print, July housing starts fell 12.4% month on month even as permits rose 5%.",
    implication: "Separate current construction weakness from the forward pipeline; no fresh Fed decision entered the cutoff window.",
  },
  {
    region: "Europe",
    signal: "Long-duration fiscal risk remains elevated",
    driver: "French long yields traded near their highest since 2008 as oil, fiscal supply and global term premium rose.",
    implication: "Sovereign refinancing and long-duration equities remain sensitive even without a common policy-rate shock.",
  },
  {
    region: "Japan",
    signal: "The 10-year yield remains close to 3%",
    driver: "The prior FT snapshot put the JGB near 2.93%; the supplied FT file is byte-identical and adds no fresh vote.",
    implication: "Fiscal arithmetic and global carry remain sensitive, but today’s update is continuity rather than a new Japan event.",
  },
  {
    region: "China",
    signal: "Weak July activity remains the baseline",
    driver: "The papers repeat the same NBS release; no new stimulus or comparable data landed before the web cutoff.",
    implication: "Do not award repetition a novelty premium or read technology allocation as broad household recovery.",
  },
  {
    region: "India",
    signal: "Oil and rainfall risks now have hard domestic denominators",
    driver: "July’s crude bill was $13.7bn while 35% of states remained rain-deficient despite national improvement.",
    implication: "External-balance, food-price and rural-demand pressure must be tracked separately rather than collapsed into one inflation call.",
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
    id: "hormuz-throughput",
    time: "18 Aug · 13:50:03 IST",
    headline: "Hormuz weekly crossings fell to 95—and the Omani route recorded zero",
    happened:
      "AP, citing Kpler, reported 95 confirmed crossings in the latest week, down 19.5% week on week. Only three ships crossed on Sunday, all on the Iranian-designated route; officials also identified joint route management and voluntary fees as points of dispute.",
    why:
      "It turns the ‘open versus closed’ argument into an operating denominator and shows why a few Aramco cargoes do not equal normal commercial throughput.",
    changed:
      "Print had the contested diplomacy, casualty, oil price and three loadings. The web adds a weekly count, route split and concrete negotiating friction—not a reopening agreement.",
    confidence: "High",
    sources: [
      {
        source: "Web",
        detail: "Associated Press · Kpler traffic and deal mechanics",
        url: "https://apnews.com/article/iran-us-israel-lebanon-gaza-hormuz-august-18-2026-9c48af23b713709e8e170191fbc78c2a",
      },
    ],
    tags: ["Hormuz", "Oil", "Shipping", "India external account"],
  },
  {
    id: "imd-waterlogging",
    time: "18 Aug · 13:15 IST bulletin",
    headline: "IMD adds acute waterlogging and resowing risk to the monsoon map",
    happened:
      "IMD reported a depression over Jharkhand and adjoining Gangetic West Bengal, with extremely heavy rain and agrometeorological advice to drain fields, postpone operations and resow where waterlogging damaged crops.",
    why:
      "Seasonal deficit and short-duration excess can coexist in the same broad geography, complicating crop, food-price and rural-income inference.",
    changed:
      "Mint showed the national deficit narrowing while Bihar and Jharkhand remained deeply deficient. The web adds a second tail: acute disruption from extreme rain, without yet proving crop loss or CPI impact.",
    confidence: "High",
    sources: [
      {
        source: "Web",
        detail: "India Meteorological Department · 18 August press release",
        url: "https://mausam.imd.gov.in/Forecast/marquee_data/Press%20Release%2018-08-2026.pdf",
      },
    ],
    tags: ["Monsoon", "Agriculture", "Food inflation", "India"],
  },
  {
    id: "us-housing",
    time: "18 Aug · 18:00 IST release",
    headline: "U.S. housing starts fell 12.4%, but permits rose 5%",
    happened:
      "July starts ran at a 1.239mn seasonally adjusted annual rate, down 12.4% month on month and 13.5% year on year. Permits rose to 1.443mn, up 5%, while completions fell 9.1%.",
    why:
      "The release adds realised construction weakness to high-mortgage-rate pressure, while the permit rebound prevents a uniformly recessionary reading.",
    changed:
      "WSJ print had weak builder confidence and home-improvement demand, but not the official July construction release. One month remains preliminary and several subseries have wide confidence intervals.",
    confidence: "High",
    sources: [
      {
        source: "Web",
        detail: "U.S. Census Bureau / HUD · New Residential Construction",
        url: "https://www.census.gov/construction/nrc/current/index.html",
      },
    ],
    tags: ["U.S. housing", "Growth", "Rates", "Fed path"],
  },
  {
    id: "korea-drill-cut",
    time: "19 Aug · 06:23:40 IST",
    headline: "South Korea implemented a shorter, smaller joint-drill schedule",
    happened:
      "Ulchi Freedom Shield will end Friday, 21 August, instead of 27 August, and some field-training exercises were downsized. The originally planned 11-day run is being cut roughly in half.",
    why:
      "The military statement converts Trump’s reduction order from political intent into an operational schedule change.",
    changed:
      "FT and WSJ print established the order but left scope and implementation unsettled. The update does not prove troop withdrawal, reduced deterrence or renewed talks with North Korea.",
    confidence: "High",
    sources: [
      {
        source: "Web",
        detail: "Associated Press · South Korean military statement",
        url: "https://apnews.com/article/korea-us-military-drills-313e01e4ee305b4c9b1b8bf12643fb17",
      },
    ],
    tags: ["South Korea", "United States", "Defence", "Asia security"],
  },
  {
    id: "rbi-vrrr-second",
    time: "18 Aug · after 12:30 IST close",
    headline: "RBI’s second overnight VRRR took two-auction absorption to ₹1,19,383 crore",
    happened:
      "The second ₹75,000-crore auction accepted ₹36,595 crore at 5.24%; with the earlier ₹82,788 crore result, the day’s two operations absorbed ₹1,19,383 crore.",
    why:
      "It confirms active management of an abundant but partly transient surplus while the FCNR window and external buffer remain in focus.",
    changed:
      "Print covered liquidity and FCNR effects. This is a realised operating action after cutoff—not a policy-rate signal or durable withdrawal of system liquidity.",
    confidence: "High",
    sources: [
      {
        source: "Web",
        detail: "Reserve Bank of India · second VRRR notice and money-market operations",
        url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63399",
      },
    ],
    tags: ["RBI", "Liquidity", "FCNR", "Money markets"],
  },
  {
    id: "openai-economics-pacing",
    time: "19 Aug · public by 04:20 IST",
    headline: "OpenAI’s reported loss widened as frontier-model controls slowed development",
    happened:
      "WSJ reports OpenAI told investors Q2 sales were $6.7bn, up 18% sequentially from $5.7bn, while its loss including stock compensation widened from $9.3bn to $12.3bn. Separately, OpenAI said preliminary Astra cyber evidence caused a two-week deployment-focused RL pause and its largest planned frontier run remains on hold.",
    why:
      "Economics and capability controls are becoming simultaneous constraints: category growth remains large while losses widen and safety monitoring consumes additional compute.",
    changed:
      "Print had AI commitments, a leveraged-fund unwind and preliminary Anthropic numbers. The web adds OpenAI-specific quarter economics and an operating pause; the financials are private, unaudited and not directly comparable with Anthropic’s accounting.",
    confidence: "Medium",
    sources: [
      {
        source: "Web",
        detail: "Wall Street Journal · private-company Q2 figures; visible by 04:20 IST",
        url: "https://www.wsj.com/tech/ai/openais-second-quarter-sales-show-tepid-growth-compared-with-anthropic-5cb42998",
      },
      {
        source: "Web",
        detail: "OpenAI · model-development pacing and cyber controls",
        url: "https://openai.com/index/pacing-model-development-cyber-capabilities/",
      },
    ],
    tags: ["OpenAI", "AI economics", "Cyber safety", "Frontier models"],
  },
  {
    id: "pennsylvania-grid",
    time: "19 Aug · public by 03:10 IST",
    headline: "Pennsylvania made grid-cost and local-consent commitments part of AI permitting",
    happened:
      "An immediately effective order removes AI data centres from Fast Track and conditions accelerated review and tax treatment on legally binding GRID commitments, local approvals and payment of incremental power/infrastructure costs. Of more than 100 known projects, 58 had engaged the regulator, 15 had applied for any permit and five were fully permitted for a first phase.",
    why:
      "It is a real policy action that moves part of AI infrastructure’s grid and community burden back to developers rather than another proposal about data-centre demand.",
    changed:
      "Print established huge commitments, power-equipment demand and project-risk transfer. The order adds an enacted permitting bargain; it is not a blanket moratorium and implementation economics are untested.",
    confidence: "High",
    sources: [
      {
        source: "Web",
        detail: "Pennsylvania Governor · Executive Order 2026-05",
        url: "https://www.pa.gov/governor/newsroom/2026-press-releases/governor-shapiro-signs-executive-order-on-data-center-developmen",
      },
    ],
    tags: ["AI infrastructure", "Power grid", "Permitting", "Data centres"],
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
    thesis: "Physical transit and escalation remain the dominant external risk, now with a measurable Indian external-account channel.",
    evidence: "India’s July crude bill reached $13.7bn; post-print data put weekly crossings at 95, down 19.5%, with only three Sunday crossings and none on the Omani route. Three Aramco cargoes are adaptation, not normalisation.",
    trigger: "Published route terms, sustained Omani-route traffic, war-risk insurance, verified damage, loadings, Brent and India’s reserve/INR response.",
    sources: ["WSJ", "BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "Fed path",
    status: "STRENGTHENED",
    thesis: "Weakening activity does not guarantee easier long-end conditions while oil, fiscal supply and financing demand lift term premium.",
    evidence: "The U.S. 30-year yield reached about 5.32%; July housing starts fell 12.4% month on month while permits rose 5%. No fresh Fed decision entered the cutoff window.",
    trigger: "Fed communication, CPI/PCE, payrolls, housing revisions, auction demand and separation of policy-rate versus term-premium moves.",
    sources: ["BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "U.S. growth",
    status: "STRENGTHENED",
    thesis: "Housing weakness has joined tariff, oil and non-bank financing pressure, though forward permits keep the signal mixed.",
    evidence: "Official July starts fell to a 1.239m SAAR, down 12.4% month on month and 13.5% year on year; permits rose to 1.443m, up 5%.",
    trigger: "Revisions, August starts/permits, mortgage rates, home sales, national production/retail data and BDC Q3 disclosures.",
    sources: ["WSJ", "Web"],
    risk: true,
  },
  {
    theme: "India inflation",
    status: "STRENGTHENED",
    thesis: "Oil and geographically uneven rain broaden the risk beyond benign aggregate inflation readings.",
    evidence: "July’s crude bill rose 41% year on year; 35% of states remained rain-deficient even as the national deficit narrowed. OnePlus price increases show a separate imported-input channel.",
    trigger: "Fuel pass-through, district rain, reservoirs, sowing/yields, food CPI/WPI and memory-price persistence.",
    sources: ["BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "INR / external buffer",
    status: "STRENGTHENED",
    thesis: "FCNR adds a material reserve buffer, but oil, hedging cost, bond positioning and post-window retention keep the external channel live.",
    evidence: "$52.3bn of FCNR(B) sat inside a wider $56.8bn mobilisation; INR improved only about 0.1% while five-year government yields unwound roughly 10bp.",
    trigger: "Final deposits, post-close runoff, reserves/forwards, RBI liquidity operations, oil, hedging cost and INR.",
    sources: ["BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "India FPI flows",
    status: "NO MATERIAL CHANGE",
    thesis: "Flow durability still depends on oil, INR, global real yields and earnings breadth.",
    evidence: "The papers add sector and market context but no new comparable aggregate equity/debt series that changes the prior thesis.",
    trigger: "Depository flows split by equity/debt, INR–oil correlation, earnings revisions and global duration.",
    sources: ["BS", "Mint"],
  },
  {
    theme: "China demand",
    status: "NO MATERIAL CHANGE",
    thesis: "Strategic-tech strength does not establish household or property recovery.",
    evidence: "FT and WSJ repeat the same July NBS weakness already in the baseline; no new policy or comparable activity release landed before cutoff.",
    trigger: "Fiscal/property support, credit, August activity, imports and household-demand indicators.",
    sources: ["FT", "WSJ"],
  },
  {
    theme: "AI capex",
    status: "STRENGTHENED",
    thesis: "Demand is real, but leverage, commitments, finance, insurance, power, utilisation and control determine returns.",
    evidence: "A reported leveraged-fund loss adds a counterparty channel; OpenAI’s reported Q2 loss widened, model controls paused work and Pennsylvania shifted grid/community costs into permitting. None establishes utilisation or return.",
    trigger: "Fund/counterparty confirmation, OpenAI technical and financial disclosure, signed GRID commitments, financing closes, energised capacity and utilisation.",
    sources: ["FT", "WSJ", "BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "Semiconductor / memory constraints",
    status: "STRENGTHENED",
    thesis: "Qualification, scale funding and memory supply remain binding; policy intent alone does not resolve them.",
    evidence: "OnePlus raised eight models by 5%–26%, and Xiaomi’s quarter adds listed-company evidence of memory/handset pressure. Limited H200 access and Cerebras’s launch do not resolve memory or domestic qualification.",
    trigger: "Memory contract/spot prices, OEM bills of material, H200 confirmation, independent CS-4 tests, qualified models, factory starts, tape-outs and yield.",
    sources: ["BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "U.S. trade policy",
    status: "NO MATERIAL CHANGE",
    thesis: "Trade-policy uncertainty remains a supply-chain and cost risk, but no binding rule changed today.",
    evidence: "WSJ reports Ford and GM splitting over tariff preferences, while India sought WTO consultations on quartz duties. These add context; no binding relief or new restriction arrived.",
    trigger: "WTO response, tariff/origin changes, exemptions, customs enforcement and verified sourcing or capex relocation.",
    sources: ["WSJ", "Mint"],
    risk: true,
  },
  {
    theme: "Bank liability competition",
    status: "STRENGTHENED",
    thesis: "Deposit growth and mix remain binding, now extending into FCNR pricing, offshore issuance and surplus-liquidity management.",
    evidence: "Banks offered up to 6.4% on FCNR(B), ICICI raised $750m, bond positions unwound after early closure and RBI conducted another liquidity-absorption operation.",
    trigger: "Deposit growth/mix, NIMs, final FCNR retention, offshore pricing, swaps and RBI liquidity operations.",
    sources: ["BS", "Mint", "Web"],
  },
  {
    theme: "Tata succession / governance",
    status: "STRENGTHENED",
    thesis: "Capital allocation across listed companies now intersects directly with unresolved Trust, board, AGM and CEO mechanics.",
    evidence: "The AGM was actually adjourned for lack of quorum, Chandrasekaran declined another term and the group’s entity-level funding needs remain large but differentiated.",
    trigger: "Reconvened AGM, Charity Commissioner order, Trust nominee, Tata Sons board action, named successor and funding-route decisions.",
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
    title: "Six crucial days on Wall Street brought a hedge fund to the brink",
    sourceLabel: "Wall Street Journal",
    sources: ["WSJ"],
    detail: "18 Aug PDF pp1, 4 · leverage, concentration and counterparty transmission",
    reason:
      "The best account of how a strategically compelling AI thesis became a financing event through leverage, crowded exposure and fast-moving private marks.",
    question:
      "Which risk control should have constrained the position first: gross exposure, concentration, liquidity, collateral or counterparty limits?",
  },
  {
    title: "How to embrace AI",
    sourceLabel: "Business Standard",
    sources: ["BS"],
    detail: "19 Aug printed p17 · India jobs, adoption, ROI and reskilling",
    reason:
      "It is unusually disciplined about incompatible datasets: realised headcount, employer surveys, enterprise ROI and modelled job scenarios are presented without forcing a false net number.",
    question:
      "Which leading indicator—entry hiring, task mix, revenue per employee or reskilling mobility—would falsify the ‘temporary transition’ thesis first?",
  },
  {
    title: "Listed giants find their own growth fuel",
    sourceLabel: "Business Standard",
    sources: ["BS"],
    detail: "19 Aug printed p18 · Tata capital call, Part II",
    reason:
      "It replaces a vague group-capex headline with entity-level cash flow, leverage, external equity and project-finance routes across autos, steel, power, AI infrastructure and hotels.",
    question:
      "Which Tata business has the narrowest margin for error once cash generation, depreciation and leverage—not headline capex—are compared?",
  },
  {
    title: "The foreign direct investment India needs",
    sourceLabel: "Mint",
    sources: ["Mint"],
    detail: "19 Aug printed p13 · gross flows, retention and anchor value chains",
    reason:
      "The strongest strategic argument for separating financial flow volume from durable manufacturing, export capability and supplier learning.",
    question:
      "What institutional change would make an anchor investor choose India for export production rather than only domestic-market access?",
  },
];

export const methodology = {
  pages: 93,
  clusters: 72,
  retained: stories.length,
  homepage: 7,
  overlaps:
    "255 within-file editorial units were reduced to 72 canonical material clusters. Continuations, common-source releases, agency pickups and explicit partner copy count once; three appended piracy pages were reviewed and excluded. The supplied FT file is byte-identical to the prior edition and receives zero fresh vote.",
  scoring:
    "Economic significance 20% · market impact 20% · strategic importance 20% · novelty 15% · India relevance 15% · durability 10%, then discounted for confidence, maturity, duplication and prior-day familiarity.",
  cutoff:
    "Print corpus: supplied 18 August FT and WSJ plus 19 August Business Standard and Mint—90 publisher pages plus three excluded piracy inserts. Web sweep: after 12:10 IST on 18 August through 09:56:58 IST on 19 August 2026. Published snapshot; not a live feed.",
};
