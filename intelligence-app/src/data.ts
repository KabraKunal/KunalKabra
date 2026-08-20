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
  dateLabel: "Thursday · 20 August 2026",
  sourceLabel: "FT + WSJ + Business Standard + Mint + Last 24h Web",
  snapshotLabel: "Evidence cutoff · 11:15 IST",
  webWindowLabel: "After 09:56:58 IST on 19 August → 11:15:00 IST on 20 August 2026",
  bottomLine:
    "Hormuz is spreading from crude into trade and diesel, both the Fed and RBI have put conditional tightening back into view, and AI spending is becoming contractually measurable—but still contingent.",
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
    headline: "The Hormuz shock is no longer just an oil-price story",
    summary:
      "The UAE suspended trade and financial transactions with Iran while vessel attacks, crew risk and abnormal transit persisted. European diesel traded near $167 a barrel; fresh U.S. data then showed distillate stocks 13% below their five-year average even as commercial crude inventories rose.",
    why:
      "India now faces several transmission channels at once: crude and product costs, war-risk freight, Gulf trade disruption, seafarer safety, INR pressure and margin compression for airlines and industrial users.",
    secondOrder:
      "A crude-stock cushion can coexist with a product shortage. That makes the inflation impulse less dependent on one Brent quote and more sensitive to refining, diesel inventories and physical shipping conditions.",
    winners: "Non-Gulf producers, alternative logistics routes, refiners with product availability and suppliers localising Gulf infrastructure.",
    losers: "Import-dependent consumers, airlines, chemical users, truckers and governments cushioning retail fuel prices.",
    watch: "Verified commercial crossings, UAE enforcement, attack attribution, distillate flows, SPR use, insurance, freight, Brent and India’s INR/reserve response.",
    importance: "High",
    confidence: "High",
    maturity: "Trade action, inventory and price data are observed; attack attribution, duration and transit normalisation remain contested",
    sources: [
      { source: "BS", detail: "20 Aug printed pp1, 6, 8 · UAE action, seafarers and India transmission" },
      { source: "Mint", detail: "20 Aug printed p9 · AP/Bloomberg partner reporting; one source chain" },
      { source: "WSJ", detail: "19 Aug print pp1, 6, 24 · attacks, traffic and diesel; prior-day context" },
      { source: "FT", detail: "19 Aug print pp1–2 · oil, shipping and market context; prior-day evidence" },
      {
        source: "Web",
        detail: "EIA · weekly petroleum balance, released 19 Aug 20:00 IST",
        url: "https://ir.eia.gov/wpsr/wpsrsummary.pdf",
      },
      {
        source: "Web",
        detail: "AP · UAE action, depressed traffic and Iran denial",
        url: "https://apnews.com/article/iran-united-arab-emirates-trade-august-19-2026-47c95fe382c49289ab0419310b6d8057",
      },
    ],
    evidence: [
      { kind: "PRINT FACT", text: "The UAE action, vessel/crew reporting and diesel pricing belong to one conflict system, not three independent geopolitical votes." },
      { kind: "WEB UPDATE", text: "Commercial crude rose 4.4m barrels, but distillates fell 1.5m, the SPR fell 5.268m and product-demand proxies softened. The evidence is product tightness—not a universal petroleum shortage." },
      { kind: "DISAGREEMENT", text: "Iran denies responsibility for the reported attacks. Partial passage is adaptation, not proof of safe or normal throughput." },
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
    sections: ["MARKETS & MACRO", "COMPANIES", "ENERGY & GEOPOLITICS"],
    eyebrow: "U.S.–Canada · tariffs · USMCA",
    headline: "Canada’s three-day tariff reprieve is producing terms—but still no deal text",
    summary:
      "Threatened 50% U.S. tariffs on roughly $20bn of Canadian goods remain postponed only to 12:01 a.m. Saturday. A Canadian official called emerging terms very good and said dairy and jobs would be protected, while also saying negotiations were incomplete.",
    why:
      "Auto, lumber, agriculture and provincial retaliation remain exposed until signed terms show the products, legal authorities and effective dates.",
    secondOrder:
      "Even a narrow truce may only move uncertainty into the wider USMCA negotiation rather than restore durable North American investment certainty.",
    winners: "Cross-border manufacturers and Canadian exporters if the pause becomes enforceable relief.",
    losers: "Firms making capex or inventory decisions against an unsigned weekend deadline.",
    watch: "Signed text, tariff schedule, Saturday deadline, provincial alcohol policy, auto/lumber treatment and USMCA sequencing.",
    importance: "High",
    confidence: "High",
    maturity: "The pause and attributed direction are real; negotiations remain incomplete and no full text was public by cutoff",
    sources: [
      { source: "BS", detail: "20 Aug printed p8 · Bloomberg account of the three-day pause" },
      { source: "Mint", detail: "20 Aug Quick Edit · one evolving trade event" },
      { source: "FT", detail: "19 Aug print p4 · pre-deadline context; prior-day evidence" },
      { source: "WSJ", detail: "19 Aug print p2 · pre-pause negotiations; prior-day evidence" },
      {
        source: "Web",
        detail: "AP · emerging terms and incomplete negotiations, 20 Aug 01:18 IST",
        url: "https://apnews.com/article/trump-canada-tariffs-usmca-be3fb41e167108aed07059bb58de7b28",
      },
    ],
    evidence: [
      { kind: "WEB UPDATE", text: "Talks moved toward terms, but no signed legal text or complete U.S. relief schedule was public." },
      { kind: "DISAGREEMENT", text: "Trump says a deal exists; Canada describes substantial progress and unfinished negotiations. The dashboard does not call the tariff withdrawn." },
    ],
  },
  {
    id: "sugar-import-buffer",
    sections: ["MARKETS & MACRO", "INDIA", "COMPANIES"],
    eyebrow: "Sugar · food inflation · trade policy",
    headline: "India is considering a 1mn-tonne sugar buffer—but has not authorised it",
    summary:
      "Business Standard reports that India may permit up to 1mn tonnes of raw sugar at nil duty as production and stocks tighten. No matching DGFT, CBIC, food-ministry or Gazette notification was located by the web cutoff.",
    why:
      "The plan would cushion domestic prices and inventories, but the market impact depends on a notified quota, timing and landed economics.",
    secondOrder:
      "A late import window can support consumers while compressing mill margins and changing export/ethanol allocation decisions.",
    winners: "Consumers, confectionery and beverage users if imports are timely and duty-free.",
    losers: "Domestic producers if imports arrive before the crop outlook is clearer.",
    watch: "Official notification, quota allocation, duty, import window, crop estimate, stocks and ethanol diversion.",
    importance: "Medium",
    confidence: "Provisional",
    maturity: "Anonymous-source proposal; no authorisation, duty change, allocation or cargo is confirmed",
    sources: [{ source: "BS", detail: "20 Aug printed p1, continued p7 · source-based 1mn-tonne proposal" }],
    evidence: [
      { kind: "PRINT FACT", text: "Production, consumption and stock arithmetic support the policy question; they do not prove a notified import decision." },
      { kind: "WEB CHECK", text: "No qualifying DGFT, CBIC, DFPD or Gazette action was located through 11:15 IST." },
    ],
  },
  {
    id: "india-export-buffer",
    sections: ["MARKETS & MACRO", "INDIA", "COMPANIES", "ENERGY & GEOPOLITICS"],
    eyebrow: "Exports · West Asia · diversification",
    headline: "India’s export diversification offset a 21.7% West Asia fall—for now",
    summary:
      "Merchandise exports rose 9.73% from March through June even as shipments to West Asia fell 21.74%. The historical buffer is real, but the subsequent UAE suspension and shipping risks test whether it can persist.",
    why:
      "The data separate resilience from immunity: market diversification softened one regional shock but cannot neutralise Gulf energy, logistics and payments exposure.",
    secondOrder:
      "Firms with multiple end markets and flexible routing can gain share while concentrated exporters face working-capital and insurance stress.",
    winners: "Exporters with diversified demand, routes and currencies.",
    losers: "Gulf-concentrated sellers and businesses dependent on time-sensitive shipping or finance.",
    watch: "July–August destination data, order cancellations, freight, receivables, currency mix and UAE enforcement scope.",
    importance: "High",
    confidence: "High",
    maturity: "Historical customs data are realised; durability under the latest Gulf escalation is unproved",
    sources: [{ source: "BS", detail: "20 Aug printed p6 · destination-level export analysis" }],
    evidence: [
      { kind: "PRINT FACT", text: "+9.73% is aggregate March–June growth; −21.74% is the West Asia destination subset. They are not comparable totals to add." },
      { kind: "INFERENCE", text: "Calling diversification a buffer is synthesis; later UAE and shipping effects are not yet in the period’s trade data." },
    ],
  },
  {
    id: "cabinet-transport-approvals",
    sections: ["INDIA", "COMPANIES"],
    eyebrow: "Rail · highways · execution",
    headline: "Cabinet approved ₹13,041 crore of transport projects; delivery is the next test",
    summary:
      "CCEA approved four rail multitracking projects worth about ₹9,450 crore and an 82.6km Bihar highway worth ₹3,590.73 crore, covering roughly 410km of rail expansion. Approval is realised; traffic, capacity and completion benefits remain projected.",
    why:
      "The package extends India’s infrastructure pipeline into freight corridors and regional connectivity, but value depends on land, procurement and schedule discipline.",
    secondOrder:
      "A credible project pipeline supports contractors and materials while delayed execution can concentrate working-capital risk.",
    winners: "Qualified EPC, rail systems, cement, steel and logistics suppliers.",
    losers: "Bidders whose balance sheets cannot absorb long execution cycles or delayed payments.",
    watch: "Tendering, land acquisition, financing, awards, construction milestones, cost revisions and commissioning.",
    importance: "Medium",
    confidence: "High",
    maturity: "Cabinet approvals are complete; procurement, construction and capacity outcomes are prospective",
    sources: [
      { source: "BS", detail: "20 Aug printed p7 · Cabinet package" },
      { source: "Mint", detail: "20 Aug printed p2 · same official action, counted once" },
      { source: "Web", detail: "PIB · four rail multitracking approvals", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2301142" },
      { source: "Web", detail: "PIB · Muzaffarpur–Sitamarhi–Sonbarsa highway", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2301144" },
    ],
    evidence: [{ kind: "WEB CHECK", text: "Official releases verify print. They do not create two additional Since Print events or convert projected benefits into realised capacity." }],
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
    headline: "The Fed turned more hawkish as Treasury treated the long end as a liquidity problem",
    summary:
      "July FOMC minutes show a 9–3 hold, with three members preferring a 25bp hike and many seeing tightening as likely if inflation stalled. Separately, Treasury doubled long-end buyback caps to at least $4bn per operation; the subsequent 20-year auction still cleared at 5.204% with a 2.53 cover.",
    why:
      "The institutions are addressing different risks: the Fed is guarding inflation, while Treasury is supporting market liquidity. Neither action removes the fiscal, oil or supply forces lifting term premium.",
    secondOrder:
      "Financial conditions can tighten at both ends of the curve, raising discount rates for housing, infrastructure, private credit and AI capex even before another policy move.",
    winners: "Short-duration savers, well-capitalised lenders and issuers that already locked funding.",
    losers: "Long-duration equities, leveraged real estate, weak sovereigns and projects with distant cash flows.",
    watch: "Current inflation and labour data, Fed communication, subsequent auctions, bid-to-cover, curve liquidity and actual September buybacks.",
    importance: "High",
    confidence: "High",
    maturity: "Minutes and auction are realised; buybacks begin in September and policy implications remain conditional",
    sources: [
      { source: "BS", detail: "20 Aug printed p8 · Treasury buyback follow-on and yield response" },
      { source: "FT", detail: "19 Aug print pp1, 9 · global duration reset; prior-day evidence" },
      { source: "WSJ", detail: "19 Aug print p1 · same global yield event; prior-day evidence" },
      { source: "Mint", detail: "20 Aug printed partner copy · WSJ/Dow Jones chain, not a separate vote" },
      {
        source: "Web",
        detail: "Federal Reserve · minutes of 28–29 July FOMC",
        url: "https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20260729.pdf",
      },
      {
        source: "Web",
        detail: "U.S. Treasury · long-end buyback terms",
        url: "https://home.treasury.gov/news/press-releases/sb0607",
      },
      {
        source: "Web",
        detail: "TreasuryDirect · 20-year auction result",
        url: "https://www.treasurydirect.gov/instit/annceresult/press/preanre/2026/R_20260819_2.pdf",
      },
    ],
    evidence: [
      { kind: "WEB UPDATE", text: "The minutes are new information about a July meeting, not a current August decision. Three votes preferred a hike; no hike occurred." },
      { kind: "WEB UPDATE", text: "The auction’s higher yield and lower cover versus July qualify the buyback relief. ‘Soft demand’ is interpretation, not Treasury’s label." },
      { kind: "DISAGREEMENT", text: "Treasury buybacks are debt-management liquidity support—not Fed QE, yield-curve control or a policy-rate cut." },
    ],
  },
  {
    id: "rbi-conditional-hike",
    rank: 3,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA"],
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
    rank: 4,
    sections: ["TODAY", "MARKETS & MACRO", "COMPANIES", "AI & TECHNOLOGY"],
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
    rank: 5,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA", "COMPANIES"],
    eyebrow: "Banks · offshore funding · external buffer",
    headline: "Indian banks have crossed $10bn of dollar issuance as support windows expire",
    summary:
      "Indian banks raised more than $3bn in ten days, taking 2026 dollar issuance above $10bn after completed IDFC First, Kotak and ICICI deals. The burst sits alongside FCNR, ECB and OFCB support, but these are different funding pools and must not be added as one number.",
    why:
      "The transactions show banks defending liability capacity and foreign-currency buffers before temporary incentives close, while global yields and hedging costs remain high.",
    secondOrder:
      "Prefunding reduces near-term rollover risk but can pressure spreads and margins if expensive offshore liabilities outlive the shock they were raised to absorb.",
    winners: "Banks with diversified funding, strong credit and an ability to swap dollars efficiently.",
    losers: "Deposit-dependent lenders and issuers arriving after global spreads or hedging costs widen.",
    watch: "Final issuance, all-in swapped cost, FCNR retention after closure, maturities, NIMs, deposit growth and RBI window expiries.",
    importance: "High",
    confidence: "High",
    maturity: "Named bond deals are completed; final window mobilisation and retention are not yet known",
    sources: [
      { source: "BS", detail: "20 Aug printed p4 · completed issuance and >$10bn denominator" },
      {
        source: "Web",
        detail: "IDFC First · exchange-filed upsizing to $600m total",
        url: "https://nsearchives.nseindia.com/corporate/IDFCFIRSTB_19082026202521_Reg_30_Pricing_of_Notes_August_19.pdf",
      },
    ],
    evidence: [
      { kind: "PRINT FACT", text: ">$10bn is 2026 bank dollar-bond issuance. It is not FCNR deposits, the ECB/OFCB pipeline or the wider RBI mobilisation total." },
      { kind: "WEB CHECK", text: "IDFC First’s filing confirms $500m plus a $100m upsizing at the same terms; the $600m was already inside print and is not added twice." },
      { kind: "INFERENCE", text: "Calling this defensive prefunding is synthesis from timing, costs and expiring policy windows." },
    ],
  },
  {
    id: "renewable-execution-gap",
    rank: 6,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA", "COMPANIES", "ENERGY & GEOPOLITICS"],
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
    rank: 7,
    sections: ["TODAY", "MARKETS & MACRO", "INDIA", "COMPANIES", "AI & TECHNOLOGY"],
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
    callout: "Rates are separating by institution: the Fed’s minutes restore tightening risk, Treasury is treating long-duration liquidity, and RBI is waiting to see whether supply shocks broaden.",
  },
  INDIA: {
    title: "India",
    dek: "Observed programme, funding and operating outcomes outrank speeches, targets and proposal pipelines.",
    callout: "India’s defensive response is visible in bank funding and liquidity, while the harder long-run tests are renewable execution, fresher pathways and transparent innovation finance.",
  },
  COMPANIES: {
    title: "Companies",
    dek: "Only material earnings, governance, capital allocation, regulation and strategy shifts survive the cut.",
    callout: "Filed contracts and permissions lead: Marvell’s Google warrant, L&T’s airport award and LIC’s HDFC Bank headroom are real actions with sharply different maturity.",
  },
  "AI & TECHNOLOGY": {
    title: "AI & Technology",
    dek: "The focus is economics, control, infrastructure and adoption—not model-release volume.",
    callout: "AI economics are becoming measurable through supplier contracts, IPO intent, power obligations and entry-level hiring—but realised revenue and returns remain far behind headline commitments.",
  },
  "ENERGY & GEOPOLITICS": {
    title: "Energy & Geopolitics",
    dek: "Political news appears only when it changes oil, gas, shipping, sanctions, defence, commodities or corporate strategy.",
    callout: "Hormuz is the organising risk, with diesel inventories, trade restrictions and seafarer exposure now more informative than a single crude quote.",
  },
};

export const macroPulse = [
  {
    region: "United States",
    signal: "A hawkish Fed and a liquidity-focused Treasury are pulling in different directions",
    driver: "July minutes show a 9–3 hold with three hike votes; Treasury doubled long-end buyback caps, yet the 20-year auction cleared at 5.204% with a 2.53 cover.",
    implication: "Inference: do not confuse debt-market liquidity support with monetary easing; policy and term-premium risk both remain live. Evidence: Federal Reserve, U.S. Treasury and TreasuryDirect, 19 Aug Web.",
  },
  {
    region: "Europe",
    signal: "Refined-product and climate constraints remain the pressure points",
    driver: "European diesel was near $167 a barrel while prior print showed drought impairing nuclear output, river freight and labour productivity.",
    implication: "Inference: industrial margins depend on product availability and physical infrastructure even if commercial crude inventories look comfortable. Evidence: FT and WSJ, 19 Aug prior-day print; EIA, 19 Aug Web.",
  },
  {
    region: "China",
    signal: "Policy rates stayed still as strategic-tech spending diverged from broad demand",
    driver: "The one- and five-year LPRs remained 3.00% and 3.50% for a 15th month, exactly as expected; no fresh property or fiscal action arrived.",
    implication: "Inference: technology investment and listings do not establish a household or property recovery. Evidence: Reuters syndication, 20 Aug Web; BS and Mint, 20 Aug print.",
  },
  {
    region: "India",
    signal: "The reaction function is hawkish, but liquidity is still abundant",
    driver: "RBI held at 5.25% and conditioned tightening on broader inflation; its first 20 August VRRR absorbed ₹1,00,032 crore overnight at 5.24%.",
    implication: "Inference: separate policy-rate risk from daily surplus-liquidity management and from structural bank funding needs. Evidence: RBI minutes and 20 Aug VRRR result (Web); BS and Mint, 20 Aug print.",
  },
  {
    region: "Japan",
    signal: "Oil and yen weakness are passing into the trade account",
    driver: "July imports rose 27.8% and exports 23.2%, leaving a ¥634.5bn deficit as the yen hovered near ¥158 per dollar.",
    implication: "Inference: strong exports can coexist with a worsening nominal import bill; the data do not by themselves signal recession. Evidence: Japan customs/AP, 20 Aug Web; WSJ, 19 Aug prior-day market context.",
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
    time: "19 Aug · 23:30 IST",
    headline: "Fed minutes put renewed tightening—not easing—inside the decision set",
    happened: "The July hold passed 9–3; three participants preferred a 25bp hike and many saw tightening as likely if inflation failed to resume declining.",
    why: "This is the strongest strict-window global policy increment and changes the Fed Watchlist from neutral continuity to a hawkish hold/tightening bias.",
    changed: "Print had no fresh Fed communication. Treasury buybacks addressed liquidity; the minutes separately add monetary-policy risk.",
    confidence: "High",
    sources: [{ source: "Web", detail: "Federal Reserve · official July minutes", url: "https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20260729.pdf" }],
    tags: ["Fed", "Rates", "Since Print"],
  },
  {
    id: "marvell-google",
    time: "19 Aug · 20:04 IST",
    headline: "Marvell filed a Google warrant tied mostly to performance revenue",
    happened: "Almost all of 58.97mn warrant shares vest through 240 separate $500mn revenue tranches; all-tranche vesting implies $120bn of qualifying custom-products revenue.",
    why: "It is primary evidence of a broader Google custom-silicon stack and a rare contractual denominator for AI demand.",
    changed: "The four papers had no Marvell–Google event. The $12.182bn maximum exercise cost is not Google investment or committed spend.",
    confidence: "High",
    sources: [{ source: "Web", detail: "Marvell · filed 8-K", url: "https://investor.marvell.com/sec-filings/all-sec-filings/content/0001193125-26-356217/d412696d8k.htm" }],
    tags: ["AI", "Semiconductors", "Companies"],
  },
  {
    id: "eia-distillates",
    time: "19 Aug · 20:00 IST",
    headline: "U.S. product stress persisted beneath a commercial-crude build",
    happened: "Commercial crude rose 4.4m barrels, but distillate stocks fell 1.5m to 13% below the five-year average and the SPR fell another 5.268m barrels.",
    why: "The split strengthens the diesel/refined-products channel inside the Hormuz shock while preventing a simplistic claim that every petroleum balance is scarce.",
    changed: "Print showed expensive European diesel. The web adds a completed-week U.S. inventory check plus weaker product-demand proxies.",
    confidence: "High",
    sources: [{ source: "Web", detail: "EIA · Weekly Petroleum Status Report", url: "https://ir.eia.gov/wpsr/wpsrsummary.pdf" }],
    tags: ["Oil", "Diesel", "Inventories"],
  },
  {
    id: "openai-ipo",
    time: "20 Aug · 00:53 IST",
    headline: "OpenAI reportedly targets a 2027 IPO as enterprise run-rate accelerates",
    happened: "CNBC reports 2027-or-earlier IPO intent, 35% quarter-to-date revenue run-rate growth, 50% enterprise growth and 20mn weekly users for a coding/work product.",
    why: "A prospective listing creates a public disclosure checkpoint for a capital-intensive private model with widening reported losses.",
    changed: "Print already had Q2 economics. The fresh information is financing timing and private, company-defined operating metrics—not a filed IPO.",
    confidence: "Medium",
    sources: [{ source: "Web", detail: "CNBC · internal all-hands report", url: "https://www.cnbc.com/2026/08/19/open-ai-ipo-timing-2027-friar.html" }],
    tags: ["AI", "IPO", "Private markets"],
  },
  {
    id: "hdfc-lic",
    time: "19 Aug · 22:52 IST",
    headline: "RBI permitted LIC to hold up to 9.99% of HDFC Bank",
    happened: "LIC held 4.11% on 14 August; the new RBI approval creates headroom up to 9.99% of capital or voting rights.",
    why: "The permission is relevant to domestic institutional ownership, free float and possible flow support in India’s largest private bank.",
    changed: "The four papers did not carry the filing. Permission is not purchase, timing or price—and should not be counted as realised DII flow.",
    confidence: "High",
    sources: [{ source: "Web", detail: "HDFC Bank · BSE filing", url: "https://www.bseindia.com/xml-data/corpfiling/AttachLive/35365c1b-d016-4b65-8fee-a9c6e6818e55.pdf" }],
    tags: ["India", "Banks", "Ownership"],
  },
  {
    id: "lt-airport-award",
    time: "20 Aug · 10:03 IST",
    headline: "L&T won Dubai airport’s first automated-people-mover package",
    happened: "An L&T–Mitsubishi consortium won the design-and-build award; L&T classifies its order as Large, ₹2,500–₹5,000 crore.",
    why: "It is a tangible post-print Gulf infrastructure win with systems content beyond civil construction.",
    changed: "The four papers did not carry the award. Exact value, L&T share, schedule and margin remain undisclosed.",
    confidence: "High",
    sources: [{ source: "Web", detail: "L&T · BSE-filed award", url: "https://www.bseindia.com/xml-data/corpfiling/AttachLive/dd1be844-e6e6-449c-9fd4-9de1fae93ff9.pdf" }],
    tags: ["India", "Infrastructure", "Companies"],
  },
  {
    id: "rdi-disbursal",
    time: "19 Aug · 19:18 IST",
    headline: "RDI implementation advanced; its governance answer did not",
    happened: "The ministry says some selected-firm disbursals are complete and expects second-level fund-manager appointments in about two weeks.",
    why: "It moves the ₹1tn programme from pipeline toward implementation, while keeping manager quality and conflict controls central.",
    changed: "Print reported imminent manager selection and committee links. The web adds partial disbursal and timing, but no names, amounts, scorecards or published safeguards.",
    confidence: "High",
    sources: [{ source: "Web", detail: "PIB / Science & Technology · implementation response", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2301317" }],
    tags: ["India", "Deep tech", "Policy"],
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
    thesis: "The shock now transmits through trade, attacks, crew risk and refined products—not only crude prices.",
    evidence: "UAE trade/financial suspension and print attack/traffic evidence are joined by U.S. distillates 13% below the five-year average and another 5.268m-barrel SPR draw; commercial crude nevertheless rose 4.4m. FT/WSJ inputs are 19 Aug prior-day print.",
    trigger: "Verified crossings, new incidents/attribution, UAE scope, distillate flows, insurance, India landed cost and formal diplomacy.",
    sources: ["FT", "WSJ", "BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "Fed path",
    status: "STRENGTHENED",
    thesis: "The July hold now reads as hawkish optionality rather than a clean path to easing.",
    evidence: "Official minutes show a 9–3 hold, three preferred hikes and many saw tightening as likely if disinflation stalled.",
    trigger: "Current CPI/PCE, labour data, post-minutes Fed communication and the next FOMC decision.",
    sources: ["Web"],
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
    thesis: "Food, fuel and input shocks have not generalised, but RBI has explicitly defined the conditions for tightening.",
    evidence: "FY27 CPI is forecast at 5.0% with a 5.9% Q3 peak; core ex-precious-metals remains benign, while oil/diesel and uneven rain keep the upside tail live.",
    trigger: "Food/fuel pass-through, core breadth, expectations, crops, retail fuel policy and October MPC language.",
    sources: ["BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "INR / external buffer",
    status: "STRENGTHENED",
    thesis: "Offshore issuance and temporary support windows add resilience, but oil and global duration keep the external channel exposed.",
    evidence: "Bank dollar issuance crossed $10bn in 2026; final FCNR retention and the all-in swapped cost remain unknown.",
    trigger: "Reserves/forwards, INR, oil, hedge cost, window expiry, deposit retention and corporate funding spreads.",
    sources: ["BS", "Mint"],
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
    thesis: "Strategic-tech investment and listings still do not establish household or property recovery.",
    evidence: "The one- and five-year LPRs stayed at 3.00% and 3.50% for a 15th month, exactly as expected; no new fiscal/property action landed. FT/WSJ inputs are 19 Aug prior-day print.",
    trigger: "Credit, property sales/prices, fiscal support, imports, August activity and household demand.",
    sources: ["FT", "WSJ", "Web"],
  },
  {
    theme: "AI capex",
    status: "STRENGTHENED",
    thesis: "Demand is becoming contractual, but financing, power, utilisation and customer concentration still determine returns.",
    evidence: "Marvell’s warrant links vesting to qualifying Google revenue; OpenAI discusses a 2027 IPO; Ohio support remains contingent and Pennsylvania prices grid/community costs. FT/WSJ inputs are 19 Aug prior-day print.",
    trigger: "Programme revenue, tape-outs, financing closes, energised capacity, utilisation, IPO filing and customer concentration.",
    sources: ["FT", "WSJ", "BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "Semiconductor / memory constraints",
    status: "STRENGTHENED",
    thesis: "Custom-design demand is broadening, while qualification, foundry capacity and memory supply remain binding.",
    evidence: "Marvell’s scope spans inference, networking, storage and memory interfaces; India’s Pixel base remains 3% and no new H200 or Samsung supply confirmation appeared. FT input is 19 Aug prior-day print.",
    trigger: "Tape-outs, foundry allocation, memory prices, H200 licences/deliveries, India qualification and product yields.",
    sources: ["BS", "FT", "Web"],
    risk: true,
  },
  {
    theme: "U.S. trade policy",
    status: "STRENGTHENED",
    thesis: "Canada talks are moving toward terms, but unsigned relief and a Saturday cliff keep supply-chain risk unresolved.",
    evidence: "A Canadian official called emerging terms very good while saying negotiations were incomplete; no full legal text or relief schedule was public. FT/WSJ inputs are 19 Aug prior-day print.",
    trigger: "Signed text, Saturday effective time, product coverage, provincial measures and USMCA sequencing.",
    sources: ["FT", "WSJ", "BS", "Mint", "Web"],
    risk: true,
  },
  {
    theme: "Bank liability competition",
    status: "STRENGTHENED",
    thesis: "Deposit competition now extends into FCNR pricing and offshore bonds as banks defend liability capacity.",
    evidence: "2026 dollar issuance crossed $10bn; final FCNR mobilisation and retention, plus the all-in swapped cost, remain unknown.",
    trigger: "Deposit mix, NIMs, final FCNR retention, offshore spreads and swaps.",
    sources: ["BS", "Mint", "Web"],
  },
  {
    theme: "Tata succession / governance",
    status: "NO MATERIAL CHANGE",
    thesis: "The adjourned AGM and succession/funding problem remain unresolved, with no fresh corporate milestone today.",
    evidence: "Mint and BS add analysis, but no new Trust nominee, reconvened AGM, board action, successor or capital-allocation decision appeared.",
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
    title: "How liberalisation pushed India’s power sector from outages to surplus",
    sourceLabel: "Business Standard",
    sources: ["BS"],
    detail: "20 Aug printed p20 · generation reform, discoms, storage and grid flexibility",
    reason: "The strongest system-level explanation of why 500GW of capacity and near-zero peak shortage do not remove the next constraint: distribution losses, cost recovery, storage and flexible grids.",
    question: "Which reform—discom economics, storage, transmission or market design—now has the highest marginal value for reliable renewable integration?",
  },
  {
    title: "The economics of India’s toll roads",
    sourceLabel: "Mint",
    sources: ["Mint"],
    detail: "20 Aug PDF p4 · NETC traffic, plaza concentration and concession cash flow",
    reason: "A rare data-rich view of concentrated infrastructure cash generation: private concessionaires operate 27% of plazas but collect half of revenue.",
    question: "Do the highest-revenue corridors offer durable operating leverage, or do concession valuation and traffic concentration already capture it?",
  },
  {
    title: "US brands lose their magic",
    sourceLabel: "Financial Times",
    sources: ["FT"],
    detail: "19 Aug print p13 · private label, retailer power and insurgent brands",
    reason: "A durable strategy map of why retailer consolidation, excess contract manufacturing and fragmented digital distribution are eroding incumbent consumer-brand moats.",
    question: "Which moat still compounds—distribution, data, formulation, shelf economics or cultural relevance—when private label is good enough?",
  },
  {
    title: "Inside the hidden deals that snared the Dodgers owner",
    sourceLabel: "Wall Street Journal",
    sources: ["WSJ"],
    detail: "19 Aug print pp1, 8 · insurer-funded affiliate loans and federal scrutiny",
    reason: "The best governance read on how insurer balance sheets, affiliated private credit and disclosure controls can transmit risk across an opaque corporate network.",
    question: "Which control should have constrained the structure first: related-party governance, insurer capital, disclosure, valuation or liquidity?",
  },
];

export const methodology = {
  pages: 90,
  clusters: 56,
  retained: stories.length,
  homepage: 7,
  overlaps: "267 within-file editorial units were reduced to 56 canonical material print clusters. Continuations, common-source releases, agency pickups and explicit partner copy count once; three appended piracy pages were visually reviewed and excluded. FT and WSJ are dated 19 August and receive zero fresh 20 August vote.",
  scoring: "Economic significance 20% · market impact 20% · strategic importance 20% · novelty 15% · India relevance 15% · durability 10%, then discounted for confidence, maturity, duplication and prior-day familiarity.",
  cutoff: "Print corpus: 16-page FT and 25-page WSJ dated 19 August, plus 22 publisher pages of Mint and 24 publisher pages of Business Standard dated 20 August—87 publisher pages plus three excluded piracy inserts. Web sweep: strictly after 09:56:58 IST on 19 August through 11:15:00 IST on 20 August 2026. Published snapshot of evidence; not a live feed.",
};
