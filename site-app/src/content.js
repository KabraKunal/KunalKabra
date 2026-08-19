export const essays = [
  {
    slug: "costs-that-build-the-company",
    title: "The Costs That Build the Company",
    date: "19 Aug 2026",
    readTime: "8 min read",
    tags: ["Procurement", "Operations", "Cost"],
    category: "operations",
    featured: true,
    excerpt:
      "A founder's lens on indirect procurement: why the highest-leverage question is not ‘Can we pay less?’ but ‘What outcome are we buying—and why this way?’",
    thesis: "Indirect spend is more than overhead to negotiate. It is organisational design expressed through external cost.",
    sections: [
      {
        title: "Opening",
        paragraphs: [
          "The invoice is the last artefact of a decision.",
          "By the time it arrives, the business has already decided it needs the work, written the specification, chosen the architecture and often become attached to a supplier. Procurement is then asked to negotiate over the narrow slice of value that remains.",
          "The more time I spend around indirect categories, the less useful the word ‘indirect’ feels. Software determines how teams work. Agencies shape demand. Consultants influence decisions. Facilities shape productivity. Logistics shapes the customer promise. None of them may sit in a bill of materials, but each can become an operating constraint.",
          "My current view is simple: indirect procurement is not merely a buying function. It is the operating system through which a company turns external spend into capability.",
        ],
      },
      {
        title: "Indirect is an accounting label",
        paragraphs: [
          "Management accounting labels costs direct or indirect because the business needs a taxonomy. Strategy should not inherit that taxonomy blindly.",
          "The strategic importance of a category depends on the business model, the cost of failure and the difficulty of reversal. Cloud infrastructure may be a direct unit cost for a software company. Logistics may be the product for a commerce company. Marketing may be the growth engine of a consumer brand. A small SaaS contract with customer-data access can create more risk and lock-in than a much larger, reversible purchase.",
          "Indirect spend is also easy to underestimate because it is scattered. Each team buys a few tools. Each office adds a few vendors. Each statement of work looks reasonable in isolation. The individual decisions appear small while the architecture they create becomes large: duplicated capability, fragmented data, accidental dependencies and renewals that nobody truly owns.",
          "The category, then, is not the strategy. The management model should follow the economics of the need—not the line of the P&L where the invoice lands.",
        ],
      },
      {
        title: "The invoice arrives too late",
        paragraphs: [
          "What has surprised me in category work is how often the rate is debated only after the scope, service level and commitment have already made the outcome expensive.",
          "First, someone decides that demand exists. Then the team defines what ‘good’ looks like. It chooses whether the need should be built, hired, automated or bought. It decides how many suppliers to use, what risk to transfer, which service level matters and how much optionality to preserve. Only after those choices does a quote appear.",
          "Commercial negotiation still matters. It is simply a lagging intervention. The bigger gains usually sit upstream: challenge the demand, simplify the specification, reduce fragmentation, and only then negotiate the rate. By the time price is discussed, most of the economics may already be fixed.",
          "A better value equation is: demand avoided, plus specification simplified, plus supplier economics improved, plus leakage prevented—minus the friction and risk introduced by the change.",
        ],
        quote: "Every invoice is the delayed record of an operating decision.",
      },
      {
        title: "Different spend buys different things",
        paragraphs: [
          "‘Indirect’ is not one problem. The useful unit of demand changes by category, and the sourcing method should change with it.",
        ],
        bullets: [
          "Software and cloud: buy an active user, workload or product event—not a seat or a headline discount. The leaks are unused licences, overlapping tools, the wrong service tier, over-committed capacity and auto-renewal. Product, engineering, finance and procurement need the same usage telemetry.",
          "Professional services: start by defining the completed decision or capability; treat the day rate as one cost input. Time-and-materials can still fit uncertain discovery or temporary capacity. Define the output, acceptance criteria, role mix, knowledge transfer and the moment external capacity should end.",
          "Marketing and agencies: buy clearly defined outputs, learning, quality and commercial outcomes where attribution is credible—not raw activity. Standardise the asset taxonomy, third-party costs, usage rights and measurement. Do not force creative work into a savings metric that rewards cheaper output nobody remembers.",
          "Facilities and maintenance: buy asset availability and employee experience—not visits or hours. Service frequency should follow occupancy and criticality; total cost should include energy, downtime and lifecycle maintenance.",
          "Logistics: buy a customer promise at a total landed cost—not a rate card. Network design, forecast quality, shipment consolidation, packaging and mode often matter more than another round of carrier negotiation.",
          "Tail and catalogue spend: buy availability with low transaction cost. This is usually a channel-design problem—catalogues, aggregators, controlled cards, auto-replenishment and touchless payment—not a place for heroic sourcing on every small order.",
          "Critical MRO: separate routine consumables from critical spares. An inexpensive component can carry enormous downtime risk, so the consequence of a stockout matters more than the purchase value.",
        ],
        closingParagraphs: [
          "Cloud makes the pattern easy to see. A strong discount on unused capacity is still waste. The useful question is not only what a unit costs, but whether the company needs the unit, uses it, and can change course when demand moves.",
        ],
      },
      {
        title: "Tail spend is a product problem",
        paragraphs: [
          "A relatively small share of indirect spend often sits across most of the vendor list. The exact ratio changes by company, but the operating pattern is familiar: thousands of low-value transactions create disproportionate work, risk and noise.",
          "A common answer is to tighten approval. That can reduce leakage while making the company miserable to operate. A manager should not need finance approval for a keyboard while a team can quietly connect an inexpensive application to customer data.",
          "The better answer is to design buying channels around risk and reversibility. Low-risk, reversible purchases should be fast and visible. Repeated common needs should flow through guided catalogues or preferred suppliers. Material, cross-functional commitments need category sourcing and total-cost analysis. Purchases that create lock-in, touch sensitive data or affect business continuity need an explicit exit plan—even when the initial price is small.",
          "Good procurement feels less like a gate and more like a well-designed product. The safe path is also the easy path. Exceptions are visible. Judgment is concentrated where judgment changes the outcome.",
        ],
      },
      {
        title: "A signed contract is not a realised outcome",
        paragraphs: [
          "Negotiated savings are an intention. Value becomes real only when demand stays down, users buy through the agreed channel, service levels hold and finance can see the effect in the operating baseline.",
          "This is where many programmes lose credibility. A sourcing team records the difference between an opening quote and a contracted price. The budget still grows because volume changed, adoption did not move, implementation slipped or a parallel supplier remained. Both statements can be technically true; only one matters to the company.",
          "The operating owner should own usage and performance. Procurement should own the commercial architecture and market intelligence. Finance should validate the baseline and realised effect. Security, legal and technology teams should enter according to risk. A centre can set the data, standards and decision rules without centralising every decision.",
          "Standardisation is not the same as centralisation. Shared specifications and clean data create comparability and switching power. Decision rights can still stay close to the person who understands the need.",
        ],
      },
      {
        title: "AI scales the operating model it finds",
        paragraphs: [
          "AI will make procurement faster. It will not automatically make it better.",
          "The near-term uses are practical: resolve duplicate supplier names, classify spend, extract obligations from contracts, flag renewals, normalise quotes, detect anomalies and guide an employee to the right buying channel. Agentic systems may eventually negotiate parts of the tail or monitor compliance continuously.",
          "Any system acting on supplier data or contracts needs permission boundaries, source provenance, an audit trail and human approval before supplier selection, negotiation or contractual change.",
          "But an agent cannot rescue a bad definition of value. If the business has not decided what outcome it needs, which trade-offs are acceptable and who owns adoption, automation will make the wrong process run faster.",
          "The prerequisite is a shared operating record: vendor master, invoices, purchase orders, contracts, usage telemetry and business outcomes connected at the level where a decision can be made. Spend without usage tells you price. Usage without contracts tells you waste. Both without outcomes still cannot tell you value.",
          "The scarce human work is no longer moving the request. It is deciding what should be bought and which trade-offs the company is willing to own.",
        ],
      },
      {
        title: "A founder's operating system",
        paragraphs: [
          "A young company does not need a procurement bureaucracy. It needs a few habits before accidental complexity becomes structural.",
        ],
        bullets: [
          "Keep one vendor register with an owner, purpose, annualised spend, data access, renewal date and exit constraint.",
          "Map spend by economic archetype and demand driver, not only by accounting code or department.",
          "Add a risk-and-reversibility gate beside the spend threshold. Price alone is a poor proxy for consequence.",
          "Write a one-page category view for the two or three external capabilities that matter most: demand, market structure, specification, commercial model, risks and the next decision date.",
          "Run a quarterly keep, kill, consolidate or renegotiate review. Start with usage before opening the rate card.",
          "Measure external-spend productivity—output, revenue or cycle-time improvement per rupee—alongside cost and risk.",
        ],
        closingParagraphs: [
          "For a founder, lifecycle cost also includes implementation time, minimum commitments, payment timing, currency exposure, management attention and the cost of exit.",
          "Before a material commitment, I would ask seven questions: What outcome are we buying? What unit drives demand? Which part of the specification is necessary? What is the full lifecycle cost? What creates lock-in? Who owns usage and renewal? How will finance know the value arrived?",
        ],
      },
      {
        title: "The company inside the cost base",
        paragraphs: [
          "The best procurement decision may increase a line item. A more reliable logistics partner can reduce lost orders. Better equipment can lower energy and downtime. A more extensible platform can prevent years of integration work. The objective is not a smaller invoice in every cell; it is a more productive, resilient company.",
          "A company's cost structure is strategy written in invoices. Read carefully, it shows which capabilities the company owns, which ones it rents, where decisions are fragmented and which dependencies have become difficult to reverse.",
          "The companies that understand indirect spend early do not merely become cheaper. They become easier to operate: fewer accidental dependencies, clearer decisions, faster buying and more capacity for the work that matters.",
        ],
        quote: "Procurement earns its place when it stops asking only what something costs and starts asking what kind of company the purchase is helping to build.",
      },
    ],
    sources: [
      {
        title: "How B2B marketplaces could transform indirect procurement",
        publisher: "McKinsey & Company",
        url: "https://www.mckinsey.com/capabilities/operations/our-insights/how-b2b-online-marketplaces-could-transform-indirect-procurement",
        note: "Practitioner analysis on fragmented tail spend and marketplace-based buying channels.",
      },
      {
        title: "Indirect procurement: Insource, outsource, or both?",
        publisher: "McKinsey & Company",
        url: "https://www.mckinsey.com/capabilities/operations/our-insights/indirect-procurement-insource-outsource-or-both",
        note: "Transformation cases covering demand management, sourcing, value preservation, and operating-model choices.",
      },
      {
        title: "Government Functional Standard GovS 008: Commercial",
        publisher: "UK Government",
        url: "https://www.gov.uk/government/publications/government-functional-standard-govs-008-commercial-and-commercial-continuous-improvement-assessment-framework/government-functional-standard-govs-008-commercial-html",
        note: "Primary operating standard for category strategy, demand aggregation, market expertise, and supplier management.",
      },
      {
        title: "Global Chief Procurement Officer Survey 2025",
        publisher: "Deloitte",
        url: "https://www.deloitte.com/ch/en/services/consulting/research/procurement-strategy.html",
        note: "Survey evidence on digital maturity, GenAI, skills, and procurement operating models; findings are respondent-based.",
      },
      {
        title: "State of the Cloud Report 2026",
        publisher: "Flexera",
        url: "https://info.flexera.com/CM-REPORT-State-of-the-Cloud",
        note: "Vendor survey on cloud waste and unit-cost practices; useful directionally, not a universal company benchmark.",
      },
      {
        title: "The hidden costs of not-so-friendly ghost lanes",
        publisher: "MIT Center for Transportation & Logistics",
        url: "https://ctl.mit.edu/publications/hidden-costs-not-so-friendly-ghost-lanes",
        note: "Research on contracted freight lanes where expected shipment demand does not materialise.",
      },
      {
        title: "FinOps Framework terminology",
        publisher: "FinOps Foundation",
        url: "https://framework.finops.org/assets/terminology/",
        note: "Definitions for usage optimisation, allocation, and technology unit economics.",
      },
    ],
  },
  {
    slug: "ai-stack-moving-bottleneck",
    title: "The AI Stack Is a Moving Bottleneck",
    date: "19 Aug 2026",
    readTime: "11 min read",
    tags: ["Semiconductors", "AI Systems", "Open Weights"],
    category: "technology",
    featured: true,
    excerpt:
      "Semiconductors set the physical frontier. Durable product advantage comes from following the constraint—from power and memory to models, evaluations, and workflow.",
    thesis: "The winning AI company will not bet on one chip or model. It will own the system that turns scarce compute into reliable outcomes.",
    sections: [
      {
        title: "Opening",
        paragraphs: [
          "AI is still discussed as two horse races: which chip will win, and which model will be smartest.",
          "Both frames are too narrow.",
          "A chip cannot train a model by itself. It cannot secure a grid connection, feed data from high-bandwidth memory, move activations across thousands of accelerators or keep a dense rack cool. A model cannot become a product by itself. It still needs context, tools, permissions, evaluation, distribution and human judgment.",
          "The real product is a system that converts electricity into useful intelligence. Every system is governed by its tightest constraint—and the constraint keeps moving.",
          "The strategic question is not ‘Which chip or model wins?’ It is ‘What breaks next, and which layer will be ready when it does?’",
        ],
      },
      {
        title: "Semiconductors are not one market",
        paragraphs: [
          "The word ‘semiconductor’ hides at least two broad demand regimes. One is an AI-led leading-edge market built around advanced logic, high-bandwidth memory, packaging and networking. The other contains the broad industrial, automotive and consumer categories where cycles, nodes and demand look different.",
          "Aggregate market forecasts blur this composition. The useful questions are narrower: Which process node? How memory-intensive is the workload? Does performance come from transistor density, packaging, architecture or software? Where is capacity difficult to add?",
          "The recent mix of leading-edge foundry revenue offers a useful signal: progress is no longer only a smaller transistor. It is a joint product of process yield, chiplets, memory proximity, advanced packaging and software. A faster accelerator stranded behind weak memory or packaging is not a faster system.",
          "This is why a headline about chip volumes tells us less than it used to. The AI economy is shaped by a chain of scarce, specialised capabilities, not one interchangeable unit called a chip.",
        ],
      },
      {
        title: "Follow the bottleneck",
        paragraphs: [
          "The stack begins below the accelerator: equipment and materials, foundry yield, advanced packaging, HBM, storage, networking, racks, cooling and power delivery. Above it sit compilers, schedulers, runtimes, models, data, evaluations, distribution and applications.",
          "Scarcity attracts spending, but it does not automatically create a durable profit pool. Value accrues when the constraint is both binding and defensible—hard to replicate, substitute or regulate away.",
          "Accelerator scarcity made GPUs the visible prize. As accelerator availability improved, HBM and advanced packaging also emerged as binding constraints on how much useful compute could be assembled. Networking became more visible as cluster scale rose: an idle accelerator is expensive inventory. Grid connections, transformers, cooling and time-to-power are now entering the critical path for many new data centres.",
          "Power is already entering the critical path. Grid connections, transformers, cooling, rack density and time-to-power increasingly decide where capacity can be built and how quickly it becomes useful. Electricity is no longer an input purchased after the architecture is chosen; it is part of the architecture.",
          "A company with chips but no power does not have compute capacity. It has depreciating equipment.",
          "The durable opportunity is not simply owning today's scarce input. It is seeing which scarcity appears after capacity catches up. When packaging expands, is memory still tight? When memory improves, does the network dominate? When hardware is available, can the software keep utilisation high? When tokens become cheap, can the product turn them into a reliable decision?",
        ],
        quote: "AI is not a chip market. It is a constraint market.",
      },
      {
        title: "Training sets the frontier; inference tests the unit economics",
        paragraphs: [
          "Training and inference reward different systems.",
          "Training values time-to-train, researcher iteration, large synchronised clusters and flexibility as architectures change. Frontier labs will pay heavily for capability that moves the boundary.",
          "Inference values cost per accepted outcome, latency, throughput, memory movement, power, batching, quantisation, routing and reliability under continuous demand. Training creates capability. Inference determines whether that capability can support a product with margins.",
          "This distinction explains the rise of custom silicon without requiring a story in which custom chips kill GPUs. GPUs remain powerful where workloads are uncertain and programmability matters. Custom accelerators become attractive when a company has enormous recurring volume, a sufficiently legible workload, guaranteed distribution and the engineering depth to co-design hardware and software. The likely equilibrium is hybrid.",
          "Falling token prices do not imply falling infrastructure demand. Cheaper intelligence can expand usage and make reasoning loops and agents economical; aggregate demand rises when new use grows faster than efficiency improves.",
          "The more important shift is that serving cost is becoming a systems problem. Model optimisation, batching, caching, scheduling, hardware choice and utilisation all compound. Competitive advantage can come from the entire serving system, not only the underlying model.",
          "As serving becomes cheaper, the constraint moves up the stack. The problem is no longer only whether a model can produce an answer, but whether a team can tell which answer is dependable at the right cost. Evaluation is therefore part of the production infrastructure.",
        ],
      },
      {
        title: "Benchmarks are scouting reports",
        paragraphs: [
          "Every few weeks, a model reaches the top of a leaderboard. Teams consider changing providers. The winner is declared.",
          "Declaring a durable winner from that snapshot is mostly noise.",
          "Public benchmarks are useful for discovering candidates. They are weak buying guides. Static test sets can saturate or become exposed to training data. Average scores hide jagged capability. Prompting, tools and evaluation harnesses change results. Model judges can prefer position, verbosity or outputs from their own model family.",
          "Public benchmarks can saturate, leak into training data, reward the wrong behaviour or contain flawed questions. The lesson is not that evaluation is useless. It is that an evaluation must evolve with the system it measures—and that a leaderboard is a weak substitute for observing real work.",
          "A founder needs a private test set made from real work: common tasks, expensive failures, edge cases, local language, adversarial inputs and the ugly tail users actually produce. The metric is not points on an abstract leaderboard. It is cost per accepted outcome, including retries, latency, human review and failure severity.",
        ],
      },
      {
        title: "Treat models as a portfolio",
        paragraphs: [
          "A model is one component inside a system of context, tools, permissions and verification. The strongest model can still be the wrong model for the job. The right model today may be deprecated before the workflow around it has settled.",
          "The useful architecture routes work by difficulty and consequence. Deterministic software handles exact arithmetic, permissions and policy rules. A small or local model handles narrow, frequent tasks. A specialist or regional model handles domain and language fit. A frontier model takes the ambiguous cases. A verifier or human enters where failure is costly.",
          "RouteLLM and FrugalGPT show that routing and cascades can reduce use of expensive models in studied settings. RouteLLM also shows the trap: routers trained on Arena-style preference data performed poorly on out-of-distribution MMLU and GSM8K. Routing is not free intelligence. It creates its own latency, monitoring, privacy and fallback problems.",
          "The durable asset is therefore not the routing rule alone. It is the loop that collects outcomes, updates evaluations, identifies the cheapest adequate model and detects when a dependency has degraded.",
          "Use the best model available today. Build the system that lets you leave it tomorrow.",
        ],
      },
      {
        title: "Open weights create option value",
        paragraphs: [
          "A routing strategy matters only if switching is technically and commercially possible. That is where open weights create option value.",
          "Open-weight models matter because they widen the design space. They can provide data control, customisation, offline or edge deployment, bargaining power with API providers and a fallback when a commercial service changes terms.",
          "They are not automatically cheaper. A downloadable model still needs GPUs, memory, quantisation, serving software, observability, safety work, upgrades and people who understand the stack. At low volume, an API may be decisively cheaper. At high utilisation—or under privacy, sovereignty and latency constraints—self-hosting can become strategic.",
          "Language also matters. ‘Open source’ should not be a loose synonym for downloadable weights. The Open Source Initiative's definition asks for the freedom and information needed to use, study, modify and share an AI system, including relevant code, parameters and data information. Many releases are better described as open-weight.",
          "The founder's lens is optionality. Can the company run the capability under its own constraints? Can it inspect failure, fine-tune where the economics justify it and move providers without rewriting the product? Open weights are valuable when they improve those answers—not because openness is a substitute for product-market fit.",
        ],
      },
      {
        title: "Sarvam is a useful test",
        paragraphs: [
          "Sarvam is useful because it forces a question generic leaderboards avoid: what does ‘good’ look like for India? It is not a patriotic exception to global model competition; it is a test of domain fit.",
          "The relevant evaluation is not only English MMLU. It is quality across native scripts, romanised language and code-mixed text; token efficiency; data locality; deployability; and cost per successful transaction. For voice products, the evaluation must cover the complete speech pipeline—the text model alone does not determine latency or accuracy. A model that ranks lower on a generic leaderboard can still be more useful inside an Indian call centre, government workflow or field application if it understands the actual language and operating environment.",
          "Sarvam's open-weight mixture-of-experts models are useful because they make deployment economics part of the comparison. Active parameters can reduce compute per token, but they do not describe the memory footprint of the full model. Architecture, language fit and serving constraints matter alongside benchmark quality.",
          "Its published benchmark results are company-run and should be treated as a reason to test, not as independent truth. Public India-first suites such as MILU and IndicGenBench are useful starting points, but production evaluation must reflect the language mix, audio quality, domain vocabulary and consequences of the actual workflow.",
          "Sarvam has already moved its hosted stack from earlier models toward Sarvam-105B while keeping downloadable weights available. That is normal in a fast-moving market. Every model dependency should be assumed temporary, even when the underlying weights remain accessible.",
        ],
      },
      {
        title: "Where the founder's moat can sit",
        paragraphs: [
          "Most startups should not try to own the whole stack. They should know which layer they depend on and choose one place where learning compounds.",
          "Below the model, opportunities sit in power, cooling, packaging, networking, inference optimisation, compiler portability and utilisation. These businesses need a real physical or systems bottleneck, not merely an input whose price is temporarily high.",
          "Above the model, moats sit in proprietary workflow, distribution, feedback, permissions, integrations and outcome data. The question is whether every customer interaction makes the system better at completing a valuable job—or merely sends more undifferentiated tokens to a provider.",
          "For India, strategic resilience does not require recreating every semiconductor layer domestically. It requires credible alternatives, engineering depth and a few wedges where learning compounds: packaging and testing, power electronics, cooling and grid equipment, fabless design, heterogeneous orchestration, and efficient language and voice inference for local conditions.",
          "As of July 2026, India had 12 approved semiconductor manufacturing projects, including nine packaging units; 24 design projects were receiving support and 105 startups or MSMEs had access to EDA tools. By March 2026, IndiaAI had also onboarded more than 38,000 GPUs for shared compute. That is a real platform, but not yet a frontier-accelerator supply chain—making design, packaging, power electronics and deployment the more credible near-term wedges.",
          "Shared compute can lower the entry barrier. It becomes strategic only when it produces lasting capability: models, system knowledge and products customers will pay for—not subsidised consumption of imported compute.",
        ],
      },
      {
        title: "A founder's test for the stack",
        paragraphs: [
          "Before building on any layer of the AI stack, I would ask:",
        ],
        bullets: [
          "Is this a durable constraint or a temporarily expensive input?",
          "Does solving it improve cost per accepted outcome, tokens per watt or time-to-deployment?",
          "Is utilisation committed, or are we financing depreciating hardware speculatively?",
          "What are the hard gates—privacy, licence, data residency, latency and failure severity—before a model is even scored?",
          "Do we have a living private evaluation set drawn from real user work, large enough to cover common tasks and the costly tail?",
          "Can we shadow-test challengers and replace a model without rewriting the workflow?",
          "Is our moat in physics, manufacturing learning, software integration, proprietary data or distribution—and does use make it stronger?",
        ],
        closingParagraphs: [
          "The model will change. The scarce component will change. The benchmark will change. A company built around one snapshot of the stack will keep discovering that its strategy has expired.",
          "The better company owns the ability to observe the constraint, route around it and turn the new economics into a better product before the market catches up.",
        ],
        quote: "The model is a component. The system is the company.",
      },
    ],
    sources: [
      {
        title: "TSMC 2025 Annual Report",
        publisher: "TSMC",
        url: "https://investor.tsmc.com/static/annualReports/2025/english/index.html",
        note: "Primary company reporting on advanced-node revenue, manufacturing, and advanced packaging investment.",
      },
      {
        title: "Key questions on energy and AI — Executive summary",
        publisher: "International Energy Agency",
        url: "https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary",
        note: "The IEA's 2026 update on data-centre and AI-focused electricity demand, grid constraints, and supply chains.",
      },
      {
        title: "2025 Q4 Earnings Call",
        publisher: "Alphabet",
        url: "https://abc.xyz/investor/events/event-details/2026/2025-Q4-Earnings-Call-2026-Dr_C033hS6/default.aspx",
        note: "Company-reported capital expenditure and Gemini serving-cost improvements.",
      },
      {
        title: "AI Index 2025: State of AI in 10 charts",
        publisher: "Stanford HAI",
        url: "https://hai.stanford.edu/news/ai-index-2025-state-of-ai-in-10-charts",
        note: "Evidence on the rapid decline in inference cost at a fixed benchmark capability level.",
      },
      {
        title: "AI Index 2026 — Technical Performance",
        publisher: "Stanford HAI",
        url: "https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance",
        note: "Current evidence on frontier convergence, benchmark saturation, and evaluation quality.",
      },
      {
        title: "Why we no longer evaluate SWE-bench Verified",
        publisher: "OpenAI",
        url: "https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/",
        note: "A primary audit of flawed tests, underspecified tasks, and contamination risk in a widely used benchmark.",
      },
      {
        title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena",
        publisher: "LMSYS / arXiv",
        url: "https://arxiv.org/abs/2306.05685",
        note: "Research on model-evaluator biases including position, verbosity, and self-enhancement.",
      },
      {
        title: "RouteLLM: Learning to Route LLMs with Preference Data",
        publisher: "LMSYS / arXiv",
        url: "https://arxiv.org/abs/2406.18665",
        note: "Routing research showing savings potential alongside out-of-distribution limitations.",
      },
      {
        title: "FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance",
        publisher: "Stanford / arXiv",
        url: "https://arxiv.org/abs/2305.05176",
        note: "Early evidence on model cascades, with important limits on how studied-task savings generalise to production.",
      },
      {
        title: "The Open Source AI Definition 1.0",
        publisher: "Open Source Initiative",
        url: "https://opensource.org/ai/open-source-ai-definition",
        note: "A precise standard for distinguishing open-source AI systems from releases that provide weights alone.",
      },
      {
        title: "Sarvam 30B and 105B",
        publisher: "Sarvam AI",
        url: "https://www.sarvam.ai/blogs/sarvam-30b-105b",
        note: "Primary release details and self-reported benchmarks for the India-trained, Apache-licensed open-weight models.",
      },
      {
        title: "Sarvam 30B model card",
        publisher: "Sarvam AI / Hugging Face",
        url: "https://huggingface.co/sarvamai/sarvam-30b",
        note: "Architecture, licence, supported-language, and deployment details for the 30B mixture-of-experts model.",
      },
      {
        title: "Sarvam 105B model card",
        publisher: "Sarvam AI / Hugging Face",
        url: "https://huggingface.co/sarvamai/sarvam-105b",
        note: "Architecture, active-parameter, licence, and serving details for the 105B mixture-of-experts model.",
      },
      {
        title: "MILU: Multi-task Indic Language Understanding Benchmark",
        publisher: "AI4Bharat",
        url: "https://github.com/AI4Bharat/MILU",
        note: "A public India-first starting point for evaluating knowledge and reasoning across Indian languages.",
      },
      {
        title: "IndicGenBench: A Multilingual Benchmark to Evaluate Generation Capabilities of LLMs on Indic Languages",
        publisher: "AI4Bharat / arXiv",
        url: "https://arxiv.org/abs/2404.16816",
        note: "A generation benchmark spanning 29 Indian languages, 13 scripts, and multiple language families.",
      },
      {
        title: "Available Sarvam models",
        publisher: "Sarvam AI",
        url: "https://docs.sarvam.ai/api/getting-started/models",
        note: "Current hosted-model availability and deprecation status; the open weights may remain usable after API retirement.",
      },
      {
        title: "Cabinet approves Semicon India Programme 2.0",
        publisher: "Press Information Bureau, Government of India",
        url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2284784&lang=1&reg=48",
        note: "Official July 2026 status for approved manufacturing, packaging, design-support, and EDA-access initiatives.",
      },
      {
        title: "IndiaAI compute and semiconductor ecosystem update",
        publisher: "Press Information Bureau, Government of India",
        url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2245069&lang=1&reg=1",
        note: "Official reporting on shared AI-compute capacity and related ecosystem initiatives.",
      },
    ],
  },
  {
    slug: "why-moats-matter",
    title: "Why Moats Matter More Than Innovation",
    date: "28 Dec 2024",
    readTime: "2 min read",
    tags: ["Strategy", "Systems", "Competition"],
    category: "strategy",
    excerpt:
      "Innovation gets you in the game; moats keep you there. A framework for thinking about sustainable competitive advantage in tech.",
    thesis: "Sustainable advantage is not a feature. It is a system that competitors cannot easily replicate.",
    sections: [
      {
        title: "Opening",
        paragraphs: [
          "There’s a persistent myth in tech that the best product wins. Build something 10x better, and customers will come. Ship faster, iterate more, and you’ll dominate your market.",
          "This is mostly wrong.",
          "Innovation gets you in the game. It’s table stakes. But it doesn’t keep you there. What keeps you there is a moat — something that makes it hard for competitors to catch up, even when they know exactly what you’re doing.",
        ],
      },
      {
        title: "The Innovation Trap",
        paragraphs: [
          "Consider the last decade of startups. How many companies built genuinely innovative products, only to get crushed by a larger competitor who copied their best ideas? Every successful feature gets copied within months.",
          "Innovation without a moat is a demo. It shows what’s possible. But it doesn’t build a lasting business.",
        ],
      },
      {
        title: "What Actually Works as a Moat",
        paragraphs: ["There are only a handful of things that genuinely work as moats:"],
        bullets: [
          "Network effects — each new user makes the product more valuable for everyone else.",
          "Switching costs — moving to a competitor is meaningfully painful.",
          "Scale economies — size brings cost advantages that smaller players cannot match.",
          "Brand — customers choose based on reputation and trust, not just features.",
        ],
      },
      {
        title: "Building Moats From Day One",
        paragraphs: [
          "The best companies think about moats from the beginning. They don’t just ask ‘what can we build?’ They ask ‘what can we build that gets stronger over time?’",
        ],
        bullets: [
          "Optimize for defensibility, not only immediate growth.",
          "Build integrations and ecosystems, not isolated features.",
          "Focus on becoming difficult to displace, not merely first.",
        ],
        quote: "The goal isn’t to be 10x better. The goal is to be impossible to replace.",
      },
      {
        title: "The Implication",
        paragraphs: [
          "Most of the energy spent on innovation would be better spent on moat-building. The companies that win are not necessarily the most innovative — they are the ones who make their position unassailable.",
          "Innovation is necessary but not sufficient. Build something new, but build it in a way that compounds. That’s the real game.",
        ],
      },
    ],
  },
  {
    slug: "last-mile-manufacturing",
    title: "The Last-Mile Problem in Indian Manufacturing",
    date: "15 Dec 2024",
    readTime: "2 min read",
    tags: ["Manufacturing", "Operations", "Policy"],
    category: "manufacturing",
    excerpt:
      "Why factories struggle with the final 20% of execution, and what it would take to close the gap.",
    thesis: "Execution stalls where physical, organizational, and policy constraints collide.",
    sections: [
      {
        title: "Opening",
        paragraphs: [
          "India has factories. Good ones, even. We have skilled labor, competitive wages, and an increasingly sophisticated supply chain. On paper, we should be a manufacturing powerhouse.",
          "And yet.",
          "Walk into most Indian factories and you’ll see the same pattern: the first 80% of the process works well. But somewhere in that final 20% — quality control, packaging, logistics, documentation — things fall apart.",
        ],
      },
      {
        title: "Where Things Break Down",
        paragraphs: [
          "The last-mile problem in manufacturing isn’t about capability. It’s about consistency. The same factory that produces perfect output on Monday might ship defective products on Friday.",
          "The root causes are mundane but persistent:",
        ],
        bullets: [
          "Information gaps between shop-floor work and downstream requirements.",
          "Incentives that reward output volume more than output quality.",
          "Skill variation and undocumented tribal knowledge.",
          "Technology designed for workflows that do not match local reality.",
        ],
      },
      {
        title: "The Cost of 80% Excellence",
        paragraphs: [
          "This isn’t just an operational problem — it’s an economic one. The gap between 80% and 100% execution is where margins live.",
        ],
        bullets: [
          "Rework costs eat into already-thin margins.",
          "Delayed deliveries damage customer relationships.",
          "Reputation effects make future orders harder to win.",
          "The factory gets stuck in a low-trust, low-margin equilibrium.",
        ],
      },
      {
        title: "What Would It Take?",
        paragraphs: [
          "Closing the last-mile gap is not about buying more machines or hiring more workers. It is about visibility, feedback loops, standardized workflows, and aligned incentives.",
        ],
        quote: "The last mile isn’t about capability. It’s about discipline. And discipline is built through systems.",
      },
      {
        title: "The Opportunity",
        paragraphs: [
          "India’s manufacturing story will be written not only by building more factories, but by making existing factories execute at world-class levels.",
          "India has the talent. We have the scale. What we need is last-mile infrastructure — technological and organizational — to turn potential into performance.",
        ],
      },
    ],
  },
  {
    slug: "agency-and-leverage",
    title: "Agency and Leverage: Building Compounding Systems",
    date: "1 Dec 2024",
    readTime: "2 min read",
    tags: ["Organizations", "Incentives", "Compounding"],
    category: "philosophy",
    featured: true,
    excerpt:
      "On building systems that compound over time, and why agency is the foundation of everything else.",
    thesis: "Design organizations and tools that multiply human judgment over time.",
    sections: [
      {
        title: "Opening",
        paragraphs: [
          "There are two kinds of work in the world: work that compounds and work that doesn’t.",
          "Most work doesn’t compound. You do it, you get paid, you do it again tomorrow. Compounding work is different: you build something that keeps working after you stop.",
        ],
      },
      {
        title: "Agency as Foundation",
        paragraphs: [
          "Agency is the belief that your actions matter. That you can change things. That the future is not predetermined but malleable.",
          "Without agency, you cannot build leverage. You are too busy reacting to circumstances to create systems that transcend them.",
        ],
      },
      {
        title: "Forms of Leverage",
        paragraphs: ["Once you have agency, you can start building leverage."],
        bullets: [
          "Capital — money that works while you sleep.",
          "Labor — other people’s time and effort.",
          "Code — software that runs at near-zero marginal cost.",
          "Media — content that continues to reach people.",
          "Reputation — trust that compounds.",
        ],
      },
      {
        title: "The Compounding Mindset",
        bullets: [
          "Think in decades, not days.",
          "Invest in skills that compound.",
          "Build assets, not just income.",
          "Document and systematize what you learn.",
        ],
        quote: "The goal is not to work harder. The goal is to build systems that work for you.",
      },
      {
        title: "The Agency-Leverage Loop",
        paragraphs: [
          "Agency and leverage create a virtuous cycle. When you have agency, you build leverage. When you have leverage, you have more capacity for agency — more options, resources, and freedom to act on your beliefs.",
          "Start small. Take ownership of something. Use that agency to create something that compounds. Reinvest the returns. Repeat.",
          "The best time to start was ten years ago. The second best time is now.",
        ],
      },
    ],
  },
];

export const problems = [
  {
    id: "01",
    slug: "rural-productivity",
    title: "Rural productivity: the physical work problem",
    question: "Can you build robotics at unit economics that actually increase rural incomes?",
    hypothesis:
      "Physical work remains the binding constraint in many rural economies. Tools and energy are leverage points that can shift productivity without assuming software is the bottleneck.",
    testing:
      "Which categories of physical work have the highest leverage per unit of capital, training, maintenance, and local repair capacity?",
    why:
      "The opportunity is not another interface layered over the same income equation. It is durable automation that makes economic sense at household and small-enterprise scale.",
    constraints: [
      "The bottleneck is physical labor, not access to another app.",
      "Hardware must survive real operating conditions and local maintenance realities.",
      "Unit economics and payback matter more than a technically impressive demo.",
    ],
    status: "Early research",
    angle: "Robotics + unit economics",
  },
  {
    id: "02",
    slug: "energy-independence",
    title: "Energy independence: the mineral dependency trap",
    question: "How does India reduce structural energy reliance when critical inputs are geopolitically concentrated?",
    hypothesis:
      "Energy security without mineral security is a strategic illusion. Technology substitution and recycling can matter as much as procurement and domestic extraction.",
    testing:
      "Where are the most brittle points in the supply chain, and which materials or processes have credible substitution pathways?",
    why:
      "The clean-energy transition can shift dependency rather than remove it. The durable response needs technical alternatives, redundancy, and better recovery loops.",
    constraints: [
      "Domestic mining is slowed by permitting, litigation, and land acquisition.",
      "Recycling infrastructure remains early.",
      "Strategic partnerships matter only when they create material output.",
    ],
    status: "Nascent",
    angle: "Technology substitution",
  },
];

export const notes = [
  {
    id: "N.01",
    title: "Leverage is a property of a system, not an individual.",
    body: "Design the system, not the hero.",
  },
  {
    id: "N.02",
    title: "Constraints are not obstacles.",
    body: "They are the shape of the solution space.",
  },
  {
    id: "N.03",
    title: "Durability comes from simple rules.",
    body: "Clear feedback, patient iteration, and few moving parts.",
  },
];

export const books = [
  {
    id: "war-below",
    title: "The War Below",
    author: "Ernest Scheyder",
    group: "Top pick",
    takeaway: "Supply is slow by default. The deeper lever is engineering the dependency out.",
    detail:
      "A useful view of the physical, political, and temporal constraints hidden beneath the energy transition.",
    tone: "forest",
  },
  {
    id: "technological-republic",
    title: "The Technological Republic",
    author: "Alexander C. Karp & Nicholas W. Zamiska",
    group: "Top pick",
    takeaway: "You cannot borrow a serious hard-tech ecosystem. You build your own and keep backups ready.",
    detail:
      "A prompt to think about technical capability as institutional capacity, not only private-sector product development.",
    tone: "rust",
  },
  {
    id: "principles",
    title: "Principles",
    author: "Ray Dalio",
    group: "Current read",
    takeaway: "A curious read on one person’s way of living and working.",
    detail: "The interesting question is which principles survive outside the context that created them.",
    tone: "forest",
  },
  {
    id: "no-rules-rules",
    title: "No Rules Rules",
    author: "Reed Hastings & Erin Meyer",
    group: "Current read",
    takeaway: "A useful lens on what output-driven cultures gain, and what they quietly give up.",
    detail: "Culture is an operating system; every optimization creates a trade-off somewhere else.",
    tone: "rust",
  },
  {
    id: "originals",
    title: "Originals",
    author: "Adam Grant",
    group: "Current read",
    takeaway: "Publishing ideas matters less if they do not move into action.",
    detail: "Originality becomes meaningful when it changes a decision, behavior, or institution.",
    tone: "forest",
  },
];

export const beliefs = [
  "Enduring companies are built by people who understand both the model and the machine — how value is created, and how it gets executed.",
  "Strategy without engineering is hand-waving.",
  "Engineering without strategy is local optimization.",
  "The edge is combining both, patiently, over long time horizons.",
];

export const socialLinks = [
  { label: "Email", href: "mailto:kunal.kabra.iitb@gmail.com", type: "email" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kunal-kabra", type: "linkedin" },
  { label: "WhatsApp", href: "https://wa.me/919322140825", type: "whatsapp" },
  { label: "Instagram", href: "https://www.instagram.com/_kkunal._", type: "instagram" },
];

export const searchItems = [
  {
    type: "Page",
    title: "Home",
    description: "A working notebook on technology, strategy, industrial systems, and turning ideas into execution.",
    href: "/",
  },
  {
    type: "Page",
    title: "Writing",
    description: "Essays and long-form notes on strategy, technology, manufacturing, and execution.",
    href: "/writing",
  },
  {
    type: "Page",
    title: "Problems",
    description: "Open questions, constraints, and working hypotheses.",
    href: "/problems",
  },
  {
    type: "Page",
    title: "Learning notes",
    description: "Short working fragments from what I am studying and trying to understand.",
    href: "/notes",
  },
  {
    type: "Page",
    title: "Reading",
    description: "Books and resources that changed how I think.",
    href: "/reading",
  },
  {
    type: "Page",
    title: "About",
    description: "Background, working beliefs, and ways to get in touch.",
    href: "/about",
  },
  ...essays.map((essay) => ({
    type: "Essay",
    title: essay.title,
    description: essay.excerpt,
    href: `/writing/${essay.slug}`,
  })),
  ...problems.map((problem) => ({
    type: "Problem",
    title: problem.title,
    description: problem.question,
    href: `/problems#${problem.slug}`,
  })),
  ...books.map((book) => ({
    type: "Book",
    title: book.title,
    description: `${book.author} — ${book.takeaway}`,
    href: `/reading#${book.id}`,
  })),
  ...notes.map((note, index) => ({
    type: "Note",
    title: note.title,
    description: note.body,
    href: `/notes#note-${index + 1}`,
  })),
  ...beliefs.map((belief, index) => ({
    type: "Belief",
    title: index === 0 ? "The model and the machine" : belief,
    description: belief,
    href: "/#beliefs",
  })),
  {
    type: "Automation",
    title: "Morning Intelligence",
    description: "Automated daily briefing across markets, India, companies, AI, energy, and geopolitics.",
    href: "/intelligence/#today",
    hardNavigation: true,
  },
  {
    type: "Contact",
    title: "Send email",
    description: "kunal.kabra.iitb@gmail.com",
    href: "mailto:kunal.kabra.iitb@gmail.com",
    hardNavigation: true,
  },
  {
    type: "Contact",
    title: "LinkedIn",
    description: "linkedin.com/in/kunal-kabra",
    href: "https://www.linkedin.com/in/kunal-kabra",
    hardNavigation: true,
    newTab: true,
  },
];
