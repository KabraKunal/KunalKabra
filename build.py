#!/usr/bin/env python3
"""Static site generator for kunalkabra.com — shared chrome + per-page content."""
import os

OUT = os.path.dirname(os.path.abspath(__file__))
EMAIL = "kunal.kabra.iitb@gmail.com"
LINKEDIN = "https://www.linkedin.com/in/kunal-kabra"
WHATSAPP = "https://wa.me/919322140825"
INSTAGRAM = "https://www.instagram.com/_kkunal._"
SUBSTACK = "https://kunalkabra.substack.com"
SUBSTACK_SUB = "https://kunalkabra.substack.com/subscribe"
UPDATED = "17 May 2026"

# ---- theme toggle markup (shared) ----
THEME_TOGGLE = '''<button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme" title="Toggle theme">
        <span class="toggle-track">
          <svg class="track-icon track-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          <svg class="track-icon track-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </span>
        <span class="toggle-thumb">
          <svg class="toggle-icon icon-sun" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line></svg>
          <svg class="toggle-icon icon-moon" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </span>
      </button>'''

SEARCH_BTN = '''<button class="icon-btn search-btn" data-search-trigger aria-label="Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <span class="search-label">Search</span><kbd>/</kbd>
      </button>'''


def header():
    return f'''    <header class="site-header">
      <a class="brand" href="/" aria-label="Home">
        <img class="logo-light" src="/assets/logo-light.svg" alt="" />
        <img class="logo-dark" src="/assets/logo-dark.svg" alt="" />
        <span class="brand-name">Kunal Kabra</span>
      </a>
      <div class="header-right">
        <nav class="site-nav" aria-label="Primary">
          <a href="/essays/">Essays</a>
          <a href="/projects/">Problems</a>
          <a href="/reading/">Reading</a>
        </nav>
        {SEARCH_BTN}
        {THEME_TOGGLE}
      </div>
    </header>'''


def contact_footer():
    return f'''    <footer class="site-footer">
      <div class="contact-links">
        <a href="mailto:{EMAIL}">Email</a>
        <a href="{LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a>
        <a href="{WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
        <a href="{INSTAGRAM}" target="_blank" rel="noopener">Instagram</a>
      </div>
      <div class="updated"><code>Last updated</code> {UPDATED}</div>
    </footer>'''


def back_footer(label, href):
    return f'''    <footer class="page-footer">
      <a href="{href}">&larr; {label}</a> &middot; <a href="mailto:{EMAIL}">{EMAIL}</a>
    </footer>'''


def newsletter(title, blurb, compact=False):
    cls = "newsletter compact" if compact else "newsletter"
    return f'''<section class="{cls}">
        <div class="newsletter-title">{title}</div>
        <p>{blurb}</p>
        <form class="subscribe-form" action="{SUBSTACK_SUB}" method="get" target="_blank">
          <input type="email" name="email" placeholder="your@email.com" aria-label="Email address" required />
          <button type="submit" class="subscribe-btn">Subscribe &rarr;</button>
        </form>
        <div class="substack-link">Powered by <a href="{SUBSTACK}" target="_blank" rel="noopener">Substack</a></div>
      </section>'''


VIEW_COUNTER = '''  <div class="view-counter" aria-label="Total site views">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    <span id="view-count">---</span>&nbsp;views
  </div>'''

SCRIPTS = '''  <script src="/assets/script.js"></script>
  <script data-goatcounter="https://kunalkabra.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>'''


def page(path, title, description, body, footer_html, canonical=None):
    """Write a full HTML page to OUT/path."""
    canon = f'\n  <link rel="canonical" href="https://kunalkabra.com{canonical}" />' if canonical else ""
    html = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content="{description}" />
  <link rel="icon" href="/assets/logo.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="/assets/style.css" />{canon}
  <script>
    (function () {{
      var t = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', t);
    }})();
  </script>
</head>
<body>
  <div class="wrap">
{header()}

{body}

{footer_html}
  </div>

{VIEW_COUNTER}
{SCRIPTS}
</body>
</html>
'''
    full = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", path)


# =====================================================================
# HOME
# =====================================================================
home_body = f'''    <main>
      <section class="hero">
        <div class="hero-grid">
          <div>
            <span class="kicker">IIT Bombay &rarr; Bain &amp; Co</span>
            <h1>I build the <span class="accent">system</span> underneath the deck.</h1>
            <p class="lede emph">I care about how things actually get built &mdash; not just the deck, but the system underneath it.</p>
            <p class="lede">I studied mechanical engineering at IIT Bombay, did research in energy systems, and now advise companies at Bain on growth and operations &mdash; mostly in complex, capital-intensive environments where the real problem is execution, not ideas.</p>
            <p class="lede">This site is where I think out loud about strategy, technology, India&rsquo;s industrial future, and the craft of building durable things.</p>
          </div>
          <div class="hero-portrait">
            <img src="/assets/portrait.jpg" alt="Portrait of Kunal Kabra" loading="eager" width="380" height="475" />
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2>What I believe</h2><div class="rule"></div></div>
        <div class="thesis-grid">
          <p class="lead-stmt">Enduring companies are built by people who understand both the model and the machine &mdash; how value is created, and how it gets executed.</p>
          <div class="punch-list">
            <p><strong>Strategy</strong> without engineering is hand-waving.</p>
            <p><strong>Engineering</strong> without strategy is local optimization.</p>
            <p>The edge is combining both, patiently, over long time horizons.</p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2>What I&rsquo;m working on</h2><div class="rule"></div></div>
        <div class="work-grid">
          <div class="work-card"><span class="work-num">01</span><p>How AI changes the leverage available to one person, especially through custom tools and workflows.</p></div>
          <div class="work-card"><span class="work-num">02</span><p>What automation really means for Indian manufacturing at the unit economics level.</p></div>
          <div class="work-card"><span class="work-num">03</span><p>Why some Indian companies compound while most do not.</p></div>
          <div class="work-card"><span class="work-num">04</span><p>What it would take to build something durable in India&rsquo;s industrial economy.</p></div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2>Start here</h2><div class="rule"></div></div>
        <div class="nav-cards">
          <a class="nav-card nav-card-featured" href="/intelligence/#today"><div><div class="nav-card-heading"><div class="nav-card-title">Morning Intelligence</div><span class="nav-card-label">Daily dashboard</span></div><div class="nav-card-sub">Seven things that matter, plus markets, India, companies, AI, geopolitics, since-print updates, the watchlist and deep reads</div></div><span class="nav-card-arrow">&rarr;</span></a>
          <a class="nav-card" href="/essays/"><div><div class="nav-card-title">Essays / Articles</div><div class="nav-card-sub">Business &amp; strategy &middot; Technology &middot; India &amp; manufacturing &middot; Philosophy</div></div><span class="nav-card-arrow">&rarr;</span></a>
          <a class="nav-card" href="/projects/"><div><div class="nav-card-title">Problems I&rsquo;m exploring</div><div class="nav-card-sub">Real questions with constraints and economics attached</div></div><span class="nav-card-arrow">&rarr;</span></a>
          <a class="nav-card" href="/reading/"><div><div class="nav-card-title">Reading &amp; resources</div><div class="nav-card-sub">Books, papers, links, and notes that shaped how I think</div></div><span class="nav-card-arrow">&rarr;</span></a>
          <a class="nav-card" href="/essays/learning-notes/"><div><div class="nav-card-title">Learning notes</div><div class="nav-card-sub">Working notes from what I&rsquo;m studying right now</div></div><span class="nav-card-arrow">&rarr;</span></a>
        </div>
      </section>

      <section class="section">
        {newsletter("Monthly notes", "One email a month on what I&rsquo;m learning and building. No spam, unsubscribe anytime.")}
      </section>

      <section class="section">
        <div class="section-head"><h2>Get in touch</h2><div class="rule"></div></div>
        <p class="lede">If you&rsquo;re building in industrials, manufacturing, deep tech, or found something here worth discussing, I&rsquo;d like to hear from you.</p>
      </section>
    </main>'''

page("index.html", "Kunal Kabra — Strategy, technology &amp; India's industrial future",
     "Kunal Kabra on strategy, technology, India's industrial future, and notes on building durable things.",
     home_body, contact_footer(), canonical="/")

print("home done")

# =====================================================================
# ESSAYS LIST
# =====================================================================
essays_body = f'''    <div class="page-head">
      <h1 class="page-title">Essays</h1>
      <p class="page-intro">Thoughts on business, technology, manufacturing, and ideas.</p>
    </div>

    <main>
      <div class="essay-filters" role="group" aria-label="Filter essays by topic">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="business">Business &amp; Strategy</button>
        <button class="filter-btn" data-filter="technology">Technology</button>
        <button class="filter-btn" data-filter="manufacturing">India &amp; Manufacturing</button>
        <button class="filter-btn" data-filter="philosophy">Philosophy</button>
      </div>

      <ul class="essay-list">
        <li class="essay-item" data-tags="business technology">
          <div class="essay-date">2024-12-28
            <span class="essay-tags"><span class="essay-tag business">business</span><span class="essay-tag technology">technology</span></span>
          </div>
          <h3 class="essay-title"><a href="/essays/why-moats-matter/">Why Moats Matter More Than Innovation</a></h3>
          <p class="essay-desc">Innovation gets you in the game; moats keep you there. A framework for thinking about sustainable competitive advantage in tech.</p>
        </li>
        <li class="essay-item" data-tags="manufacturing">
          <div class="essay-date">2024-12-15
            <span class="essay-tags"><span class="essay-tag manufacturing">manufacturing</span></span>
          </div>
          <h3 class="essay-title"><a href="/essays/last-mile-manufacturing/">The Last-Mile Problem in Indian Manufacturing</a></h3>
          <p class="essay-desc">Why factories struggle with the final 20% of execution, and what it would take to close the gap.</p>
        </li>
        <li class="essay-item" data-tags="philosophy">
          <div class="essay-date">2024-12-01
            <span class="essay-tags"><span class="essay-tag philosophy">philosophy</span></span>
          </div>
          <h3 class="essay-title"><a href="/essays/agency-and-leverage/">Agency and Leverage: Building Compounding Systems</a></h3>
          <p class="essay-desc">On building systems that compound over time, and why agency is the foundation of everything else.</p>
        </li>
      </ul>

      <section class="section" style="border-bottom:none;padding-bottom:0;">
        {newsletter("Stay updated", "Get new essays delivered to your inbox. No spam, unsubscribe anytime.", compact=True)}
      </section>
    </main>'''

page("essays/index.html", "Kunal Kabra — Essays",
     "Essays on business, technology, manufacturing, and philosophy.",
     essays_body, back_footer("Back home", "/"), canonical="/essays/")


# =====================================================================
# ESSAY TEMPLATE
# =====================================================================
def essay_page(slug, title, date, tags, paragraphs, desc):
    tag_html = "".join(f'<span class="essay-tag {t}">{t}</span>' for t in tags)
    body = f'''    <main class="essay-article">
      <h1>{title}</h1>
      <div class="essay-meta">
        <span class="essay-date">{date}</span>
        <span class="essay-tags">{tag_html}</span>
      </div>
{paragraphs}
      {newsletter("Enjoyed this essay?", "Get new essays delivered to your inbox. No spam, unsubscribe anytime.", compact=True)}
    </main>'''
    page(f"essays/{slug}/index.html", f"{title} — Kunal Kabra", desc, body,
         back_footer("All essays", "/essays/"), canonical=f"/essays/{slug}/")


moats = '''      <p>There&rsquo;s a persistent myth in tech that the best product wins. Build something 10x better, and customers will come. Ship faster, iterate more, and you&rsquo;ll dominate your market.</p>
      <p>This is mostly wrong.</p>
      <p>Innovation gets you in the game. It&rsquo;s table stakes. But it doesn&rsquo;t keep you there. What keeps you there is a moat &mdash; something that makes it hard for competitors to catch up, even when they know exactly what you&rsquo;re doing.</p>
      <h2>The Innovation Trap</h2>
      <p>Consider the last decade of startups. How many companies built genuinely innovative products, only to get crushed by a larger competitor who copied their best ideas? The list is long: Snap&rsquo;s Stories became Instagram Stories. Clubhouse&rsquo;s audio rooms became Twitter Spaces. Every successful feature gets copied within months.</p>
      <p>Innovation without a moat is a demo. It shows what&rsquo;s possible. But it doesn&rsquo;t build a lasting business.</p>
      <h2>What Actually Works as a Moat</h2>
      <p>There are only a handful of things that genuinely work as moats:</p>
      <ul>
        <li><strong>Network effects:</strong> When each new user makes the product more valuable for everyone else. Think social networks, marketplaces, communication tools.</li>
        <li><strong>Switching costs:</strong> When it&rsquo;s painful to move to a competitor. Enterprise software, developer tools with deep integrations, anything with significant data lock-in.</li>
        <li><strong>Scale economies:</strong> When size brings cost advantages that smaller players can&rsquo;t match. Cloud infrastructure, manufacturing, logistics.</li>
        <li><strong>Brand:</strong> When customers choose you based on reputation and trust, not just features. Luxury goods, professional services, B2B where reputation matters.</li>
      </ul>
      <p>Notice what&rsquo;s not on this list: being first to market, having better technology, or having a more innovative product. These things help, but they&rsquo;re not moats.</p>
      <h2>Building Moats From Day One</h2>
      <p>The best companies think about moats from the beginning. They don&rsquo;t just ask &ldquo;what can we build?&rdquo; They ask &ldquo;what can we build that gets stronger over time?&rdquo;</p>
      <p>This changes everything about how you approach product development:</p>
      <ul>
        <li>Instead of optimizing for immediate growth, you optimize for defensibility</li>
        <li>Instead of building standalone features, you build integrations and ecosystems</li>
        <li>Instead of racing to be first, you focus on being the last &mdash; the one who wins because you can&rsquo;t be displaced</li>
      </ul>
      <blockquote><p>The goal isn&rsquo;t to be 10x better. The goal is to be impossible to replace.</p></blockquote>
      <h2>The Implication</h2>
      <p>This has profound implications for how we think about competition. Most of the energy spent on &ldquo;innovation&rdquo; would be better spent on moat-building. The companies that win aren&rsquo;t necessarily the most innovative &mdash; they&rsquo;re the ones who figure out how to make their position unassailable.</p>
      <p>Innovation is necessary but not sufficient. Build something new, but build it in a way that compounds. That&rsquo;s the real game.</p>'''

lastmile = '''      <p>India has factories. Good ones, even. We have skilled labor, competitive wages, and an increasingly sophisticated supply chain. On paper, we should be a manufacturing powerhouse.</p>
      <p>And yet.</p>
      <p>Walk into most Indian factories and you&rsquo;ll see the same pattern: the first 80% of the process works well. Raw materials come in, machines run, products get made. But somewhere in that final 20% &mdash; quality control, packaging, logistics, documentation &mdash; things fall apart.</p>
      <h2>Where Things Break Down</h2>
      <p>The last-mile problem in manufacturing isn&rsquo;t about capability. It&rsquo;s about consistency. The same factory that produces perfect output on Monday might ship defective products on Friday. The same line that hits 98% yield in the morning might drop to 85% by evening.</p>
      <p>The root causes are mundane but persistent:</p>
      <ul>
        <li><strong>Information gaps:</strong> Shop floor workers don&rsquo;t have visibility into downstream requirements. Quality specs exist on paper but don&rsquo;t translate into actionable checks.</li>
        <li><strong>Incentive misalignment:</strong> Production teams are measured on output volume, not output quality. Speed trumps precision.</li>
        <li><strong>Skill variation:</strong> Tribal knowledge isn&rsquo;t documented. When experienced workers leave, institutional memory goes with them.</li>
        <li><strong>Technology mismatch:</strong> Enterprise software designed for German factories doesn&rsquo;t fit Indian workflows. Local solutions are fragmented.</li>
      </ul>
      <h2>The Cost of 80% Excellence</h2>
      <p>This isn&rsquo;t just an operational problem &mdash; it&rsquo;s an economic one. The gap between 80% and 100% execution is where margins live.</p>
      <p>Consider what happens when a shipment gets rejected:</p>
      <ul>
        <li>Rework costs eat into already-thin margins</li>
        <li>Delayed deliveries damage customer relationships</li>
        <li>Reputation effects make it harder to win future orders</li>
        <li>The factory gets stuck in a low-trust, low-margin equilibrium</li>
      </ul>
      <p>Meanwhile, competitors in China and Vietnam are executing at 95%+. They&rsquo;re not more innovative. They&rsquo;re just more consistent.</p>
      <h2>What Would It Take?</h2>
      <p>Closing the last-mile gap requires a different approach than scaling the first 80%. It&rsquo;s not about buying more machines or hiring more workers. It&rsquo;s about:</p>
      <ul>
        <li><strong>Real-time visibility:</strong> Every step of the process needs to be tracked and visible. Not in an ERP system that managers check weekly, but on the shop floor in real-time.</li>
        <li><strong>Tight feedback loops:</strong> When something goes wrong, the person who can fix it needs to know immediately &mdash; not at the end of the shift, not in a weekly review.</li>
        <li><strong>Standardized workflows:</strong> Best practices need to be documented, trained, and enforced. Consistency requires systems, not just skilled individuals.</li>
        <li><strong>Aligned incentives:</strong> Quality metrics need to matter as much as quantity metrics. This is a management problem, not a technology problem.</li>
      </ul>
      <blockquote><p>The last mile isn&rsquo;t about capability. It&rsquo;s about discipline. And discipline is built through systems.</p></blockquote>
      <h2>The Opportunity</h2>
      <p>This is where India&rsquo;s manufacturing story will be written. Not in building more factories, but in making existing factories execute at world-class levels.</p>
      <p>The companies that figure this out &mdash; whether they&rsquo;re building software, providing services, or running factories &mdash; will capture enormous value. Because the gap between 80% and 95% execution isn&rsquo;t 15 percentage points. It&rsquo;s the difference between being a low-margin supplier and being a strategic partner.</p>
      <p>India has the talent. We have the scale. What we need is the last-mile infrastructure &mdash; both technological and organizational &mdash; to turn potential into performance.</p>'''

agency = '''      <p>There are two kinds of work in the world: work that compounds and work that doesn&rsquo;t.</p>
      <p>Most work doesn&rsquo;t compound. You do it, you get paid, you do it again tomorrow. There&rsquo;s nothing wrong with this &mdash; it&rsquo;s honest and necessary. But it has a ceiling. Your output is limited by your time, and time is finite.</p>
      <p>Compounding work is different. When you build something that keeps working after you stop, when you create systems that improve themselves, when you invest effort that pays dividends forever &mdash; that&rsquo;s leverage. And leverage is how you escape the linear trap.</p>
      <h2>Agency as Foundation</h2>
      <p>But here&rsquo;s the thing about leverage: you can&rsquo;t use it if you don&rsquo;t have agency.</p>
      <p>Agency is the belief that your actions matter. That you can change things. That the future is not predetermined but malleable. It sounds obvious, but it&rsquo;s surprisingly rare. Most people, most of the time, operate as if the world is fixed and they&rsquo;re just responding to it.</p>
      <p>Without agency, you can&rsquo;t build leverage. You&rsquo;re too busy reacting to circumstances to create systems that transcend them. You optimize locally instead of thinking about what compounds.</p>
      <p>The first step, always, is to recognize that you have more control than you think.</p>
      <h2>Forms of Leverage</h2>
      <p>Once you have agency, you can start building leverage. The main forms:</p>
      <ul>
        <li><strong>Capital:</strong> Money that works while you sleep. The oldest form of leverage, still powerful.</li>
        <li><strong>Labor:</strong> Other people&rsquo;s time and effort. Powerful but expensive and coordination-heavy.</li>
        <li><strong>Code:</strong> Software that runs infinitely at near-zero marginal cost. The most accessible form of leverage in the modern era.</li>
        <li><strong>Media:</strong> Content that reaches millions while you do other things. Writing, video, podcasts &mdash; all forms of leverage.</li>
        <li><strong>Reputation:</strong> Trust that compounds. When people know you deliver, opportunities come to you.</li>
      </ul>
      <p>The best careers combine multiple forms of leverage. An entrepreneur with capital, a team, software, and a strong reputation has more leverage than someone with just one of these.</p>
      <h2>The Compounding Mindset</h2>
      <p>Building compounding systems requires a different way of thinking:</p>
      <ul>
        <li><strong>Think in decades, not days.</strong> What will matter in 10 years? Most of what feels urgent today won&rsquo;t.</li>
        <li><strong>Invest in skills that compound.</strong> Writing, coding, selling, leading &mdash; these get better with practice and remain valuable as technology changes.</li>
        <li><strong>Build assets, not just income.</strong> A business, a body of work, a network, a reputation &mdash; these are assets that keep paying.</li>
        <li><strong>Document and systematize.</strong> Every time you solve a problem, ask: can this solution be reused? Can it help others?</li>
      </ul>
      <blockquote><p>The goal is not to work harder. The goal is to build systems that work for you.</p></blockquote>
      <h2>The Agency-Leverage Loop</h2>
      <p>Agency and leverage create a virtuous cycle. When you have agency, you build leverage. When you have leverage, you have more capacity for agency &mdash; more options, more resources, more freedom to act on your beliefs.</p>
      <p>This is why the rich get richer and the powerful get more powerful. Not because of conspiracy, but because of compounding. The same dynamic works for individuals who consciously cultivate agency and leverage.</p>
      <p>Start small. Build agency by taking ownership of something &mdash; anything. Use that agency to create something that compounds. Reinvest the returns. Repeat.</p>
      <p>The math of compounding is unforgiving in both directions. Start late and you lose decades of growth. Start early &mdash; even with tiny amounts &mdash; and time works in your favor.</p>
      <p>The best time to start was ten years ago. The second best time is now.</p>'''

essay_page("why-moats-matter", "Why Moats Matter More Than Innovation", "2024-12-28",
           ["business", "technology"], moats,
           "Innovation gets you in the game; moats keep you there. A framework for durable competitive advantage.")
essay_page("last-mile-manufacturing", "The Last-Mile Problem in Indian Manufacturing", "2024-12-15",
           ["manufacturing"], lastmile,
           "Why Indian factories struggle with the final 20% of execution, and what it would take to close the gap.")
essay_page("agency-and-leverage", "Agency and Leverage: Building Compounding Systems", "2024-12-01",
           ["philosophy"], agency,
           "On building systems that compound over time, and why agency is the foundation of everything else.")


# =====================================================================
# LEARNING NOTES
# =====================================================================
learning_body = '''    <div class="page-head">
      <h1 class="page-title">Learning notes</h1>
      <p class="page-intro">Book notes and distilled lessons.</p>
    </div>
    <main>
      <div class="note-block">Coming soon. Notes from books on strategy, systems, and execution will appear here.</div>
    </main>'''
page("essays/learning-notes/index.html", "Learning Notes — Kunal Kabra",
     "Working notes from what Kunal Kabra is studying and trying to understand.",
     learning_body, back_footer("All essays", "/essays/"), canonical="/essays/learning-notes/")


# =====================================================================
# PROJECTS / PROBLEMS
# =====================================================================
projects_body = '''    <div class="page-head">
      <h1 class="page-title">Problems I&rsquo;m exploring</h1>
      <p class="page-intro">Crisp problem statements, constraints, and possible paths toward durable solutions.</p>
    </div>

    <main>
      <div class="problem-card">
        <h3>Rural productivity: the physical work problem</h3>
        <p class="question">Can you build robotics at unit economics that actually increase rural incomes?</p>
        <div class="gap"><strong>The gap:</strong> Rural India has 65% of the population but less than 40% of consumption. This isn&rsquo;t just an infrastructure problem or a distribution problem. It&rsquo;s an income problem. And income, for most rural households, is tied to physical labor: agriculture, construction, local services. The unlock isn&rsquo;t more software. It&rsquo;s physical automation that actually makes economic sense at the household level.</div>
        <div class="subsection">
          <h4>What&rsquo;s broken</h4>
          <ul>
            <li>Software doesn&rsquo;t help if the bottleneck is physical labor</li>
            <li>Most &ldquo;rural tech&rdquo; is theater &mdash; apps that assume smartphone penetration, fintech that doesn&rsquo;t change the income equation</li>
            <li>Hardware startups in India are rare, and the ones that exist tend to target export or urban markets</li>
          </ul>
        </div>
        <div class="subsection">
          <h4>The unlock</h4>
          <p>Robotics at unit economics that make sense for a household earning about Rs. 2,00,000/month. Not fancy. Not smart. Just durable, repairable, and cheap enough to pay back in 6 months.</p>
        </div>
        <div class="badges">
          <span class="badge">Status: <code>early research</code></span>
          <span class="badge">Angle: <code>robotics + unit economics</code></span>
        </div>
      </div>

      <div class="problem-card">
        <h3>Energy independence: the mineral dependency trap</h3>
        <p class="question">How does India reduce structural energy reliance when critical inputs are geopolitically concentrated?</p>
        <div class="gap"><strong>The gap:</strong> India imports 75-80% of its crude oil and nearly all its lithium, cobalt, and rare earths. The clean energy transition doesn&rsquo;t reduce this exposure, it just shifts it. We&rsquo;re swapping dependence on OPEC for dependence on a handful of mining jurisdictions, most dominated by China. The state is aware, the policy documents are dense with strategy. But the procurement-based playbook isn&rsquo;t scaling.</div>
        <div class="subsection">
          <h4>What&rsquo;s broken</h4>
          <ul>
            <li>Domestic mining is slow: permitting, litigation, land acquisition</li>
            <li>Recycling infra is nascent; battery volumes aren&rsquo;t there yet</li>
            <li>Strategic partnerships are diplomatic theater and joint ventures with no material output</li>
          </ul>
        </div>
        <div class="subsection">
          <h4>The unlock</h4>
          <p>Technology solutions that break the dependency loop, whether it&rsquo;s sodium-ion batteries that skip lithium, synthesis routes that reduce rare earth content, or recycling tech that catches up before it&rsquo;s too late.</p>
        </div>
        <div class="badges">
          <span class="badge">Status: <code>nascent</code></span>
          <span class="badge">Angle: <code>tech substitution over procurement</code></span>
        </div>
      </div>
    </main>'''
page("projects/index.html", "Problems I'm exploring — Kunal Kabra",
     "Crisp problem statements, constraints, and possible paths toward durable solutions.",
     projects_body, back_footer("Back home", "/"), canonical="/projects/")


# =====================================================================
# READING
# =====================================================================
def rcard(meta, title, source, preview, note, open_default=False):
    ao = "true" if open_default else "false"
    is_open = " is-open" if open_default else ""
    hidden = "" if open_default else " hidden"
    hint = "Hide note" if open_default else "Read note"
    return f'''        <article class="resource-entry{is_open}">
          <button class="resource-toggle" type="button" aria-expanded="{ao}">
            <div class="resource-meta">{meta}</div>
            <h3 class="resource-title">{title}</h3>
            <div class="resource-source">{source}</div>
            <p class="resource-preview">{preview}</p>
            <span class="resource-toggle-hint">{hint}</span>
          </button>
          <div class="resource-body"{hidden}>
            <p class="resource-note">{note}</p>
          </div>
        </article>'''

reading_body = f'''    <div class="page-head">
      <h1 class="page-title">Reading &amp; resources</h1>
      <p class="page-intro">A short, opinionated list. Not everything I have read, just the things that changed how I think and the sources I am actively learning from. Updated as I go.</p>
    </div>

    <main>
      <section class="section resource-block">
        <div class="block-head"><h2>Top picks</h2><p>The few books that actually moved my thinking, and what I took from each.</p></div>
        <div class="resource-list" aria-label="Top picks">
{rcard("Book", "The War Below", "Ernest Scheyder", "Supply is slow by default. The deeper lever is engineering the dependency out.", "Mineral security is not a procurement problem you can buy your way out of. Permits, litigation, and decade-long lead times make supply slow by default. The real lever is engineering the dependency out. This directly feeds the mineral-dependency problem on my Problems page.", open_default=True)}
{rcard("Book", "The Technological Republic", "Alexander C. Karp &amp; Nicholas W. Zamiska", "You cannot borrow a serious hard-tech ecosystem. You build your own and keep backups ready.", "The most controversial thing I have read recently, and I think largely right. The first half, that the West lost the will to build hard things with the state, is sharp. But the real argument is the prescription: rebuild that engineering-plus-state partnership, aimed at hard technological and defense power, to put the US back on top. You can already see that playbook running in the real world. The mirror image for the East is clear too: you cannot borrow that ecosystem. You build your own and keep backups ready.")}
        </div>
      </section>

      <section class="section resource-block">
        <div class="block-head"><h2>Current reads</h2><p>What is open on my desk right now.</p></div>
        <div class="resource-list" aria-label="Current reads">
{rcard("Reading now", "Principles", "Ray Dalio", "A curious read on one person&rsquo;s way of living and working.", "A curious read. One person&rsquo;s take on a way of living and working.")}
{rcard("Reading now", "No Rules Rules", "Reed Hastings &amp; Erin Meyer", "A useful lens on what output-driven cultures gain, and what they quietly give up.", "I am reading this while thinking about output-driven versus craft-driven cultures. What an organization gains, and what it quietly loses, when it optimizes for results over the problem-solving itself. Netflix is the extreme case study.")}
{rcard("Reading now", "Originals", "Adam Grant", "A reminder that publishing ideas matters less if they do not move into action.", "I built this site to think in public and keep an honest record of what I am working on. Originals is the nudge for the harder half: actually moving from ideas to action.")}
        </div>
      </section>

      <section class="section resource-block future-shelf">
        <div class="block-head"><h2>Later on this page</h2><p>This shelf is where I will add the blogs, newsletters, writers, and people I keep returning to when I want signal over noise.</p></div>
      </section>
    </main>'''
page("reading/index.html", "Reading & resources — Kunal Kabra",
     "Books and resources that shaped how Kunal Kabra thinks.",
     reading_body, back_footer("Back home", "/"), canonical="/reading/")


# =====================================================================
# 404
# =====================================================================
notfound_body = '''    <main class="error-page">
      <div class="code">4<span class="accent">0</span>4</div>
      <p>That page doesn&rsquo;t exist.</p>
      <p><a href="/">Go home &rarr;</a></p>
    </main>'''
page("404.html", "Not found — Kunal Kabra", "Page not found.", notfound_body, "")

print("all pages done")
