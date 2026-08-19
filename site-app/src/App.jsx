import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  CaretDown,
  EnvelopeSimple,
  Eye,
  InstagramLogo,
  Keyboard as KeyboardIcon,
  LinkedinLogo,
  MagnifyingGlass,
  Moon,
  Sun,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { beliefs, books, essays, notes, problems, searchItems, socialLinks } from "./content.js";

const HOME_CHAPTERS = [
  { id: "beliefs", number: "01", label: "Beliefs" },
  { id: "questions", number: "02", label: "Questions" },
  { id: "essays", number: "03", label: "Essays" },
  { id: "notes", number: "04", label: "Notes" },
  { id: "reading", number: "05", label: "Reading" },
];

const PAGE_CHAPTERS = [
  { id: "beliefs", number: "01", label: "Beliefs", href: "/#beliefs" },
  { id: "questions", number: "02", label: "Problems", href: "/problems" },
  { id: "essays", number: "03", label: "Writing", href: "/writing" },
  { id: "notes", number: "04", label: "Notes", href: "/notes" },
  { id: "reading", number: "05", label: "Reading", href: "/reading" },
];

const LEGACY_ROUTES = {
  "/essays": "/writing",
  "/projects": "/problems",
  "/essays/why-moats-matter": "/writing/why-moats-matter",
  "/essays/last-mile-manufacturing": "/writing/last-mile-manufacturing",
  "/essays/agency-and-leverage": "/writing/agency-and-leverage",
  "/essays/learning-notes": "/notes",
};

const ROUTE_METADATA = {
  "/": ["Kunal Kabra — A working notebook", "A working notebook on technology, strategy, industrial systems, and turning ideas into execution."],
  "/writing": ["Writing — Kunal Kabra", "Essays on business, technology, manufacturing, strategy, and philosophy."],
  "/problems": ["Problems — Kunal Kabra", "Open questions, constraints, and working hypotheses on rural productivity and energy independence."],
  "/notes": ["Learning notes — Kunal Kabra", "Working notes from what Kunal Kabra is studying and trying to understand."],
  "/reading": ["Reading — Kunal Kabra", "Books and resources that shaped how Kunal Kabra thinks."],
  "/about": ["About — Kunal Kabra", "Kunal Kabra's background, working beliefs, and contact details."],
};

function getRouteMetadata(path) {
  const essay = essays.find((item) => path === `/writing/${item.slug}`);
  return essay
    ? [`${essay.title} — Kunal Kabra`, essay.excerpt]
    : ROUTE_METADATA[path] ?? ["Not found — Kunal Kabra", "The requested notebook page could not be found."];
}

function normalizePath(pathname) {
  if (!pathname || pathname === "/index.html") return "/";
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return LEGACY_ROUTES[normalized] ?? normalized;
}

function isExternal(href) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

function useRoute() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const syncPath = () => {
      const nextPath = normalizePath(window.location.pathname);
      const visiblePath = window.location.pathname.length > 1
        ? window.location.pathname.replace(/\/$/, "")
        : window.location.pathname;
      if (nextPath !== visiblePath) {
        window.history.replaceState({}, "", `${nextPath}${window.location.hash}`);
      }
      setPath(nextPath);
    };
    syncPath();
    const onPopState = () => syncPath();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (href) => {
    if (isExternal(href)) {
      window.location.href = href;
      return;
    }
    const target = new URL(href, window.location.origin);
    const nextPath = normalizePath(target.pathname);
    window.history.pushState({}, "", `${nextPath}${target.hash}`);
    setPath(nextPath);
    window.dispatchEvent(new Event("hashchange"));
    requestAnimationFrame(() => {
      if (target.hash) {
        document.querySelector(target.hash)?.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo({ top: 0, left: 0 });
      }
    });
  };

  return { path, navigate };
}

function AppLink({ href, navigate, children, className, onClick, ...props }) {
  const external = isExternal(href);
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          external ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        navigate(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem("theme") || window.localStorage.getItem("kk-notebook-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#111722" : "#f7f7f5");
    window.localStorage.setItem("theme", theme);
    window.localStorage.setItem("kk-notebook-theme", theme);
  }, [theme]);

  return [theme, () => setTheme((current) => (current === "light" ? "dark" : "light"))];
}

function Header({ path, navigate, theme, toggleTheme, onSearch }) {
  const navItems = [
    { label: "Writing", href: "/writing", active: path === "/writing" || essays.some((essay) => path === `/writing/${essay.slug}`) },
    { label: "Problems", href: "/problems", active: path === "/problems" },
    { label: "Reading", href: "/reading", active: path === "/reading" },
    { label: "About", href: "/about", active: path === "/about" },
  ];

  return (
    <header className="site-header">
      <AppLink href="/" navigate={navigate} className="brand-link" aria-label="Kunal Kabra home">
        Kunal Kabra
      </AppLink>
      <nav className="primary-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <AppLink
            key={item.href}
            href={item.href}
            navigate={navigate}
            className={item.active ? "is-active" : undefined}
            aria-current={item.active ? "page" : undefined}
          >
            {item.label}
          </AppLink>
        ))}
      </nav>
      <div className="header-actions">
        <button className="icon-button" type="button" onClick={onSearch} aria-label="Search the notebook">
          <MagnifyingGlass size={20} weight="regular" aria-hidden="true" />
        </button>
        <button
          className="icon-button theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          {theme === "light" ? (
            <Sun size={20} weight="regular" aria-hidden="true" />
          ) : (
            <Moon size={20} weight="regular" aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}

function ChapterRail({ chapters, activeId, navigate, isHome }) {
  const currentIndex = chapters.findIndex((chapter) => chapter.id === activeId);

  const handleChapter = (chapter) => {
    if (isHome) {
      document.getElementById(chapter.id)?.scrollIntoView({ block: "start" });
      window.history.replaceState({}, "", `/#${chapter.id}`);
    } else {
      navigate(chapter.href);
    }
  };

  return (
      <aside className="chapter-rail" aria-label="Notebook chapters">
        <span className="rail-eyebrow">Chapters</span>
        <ol className="rail-list">
          {chapters.map((chapter) => (
            <li key={chapter.id} className={chapter.id === activeId ? "is-active" : undefined}>
              <button type="button" onClick={() => handleChapter(chapter)}>
                <span className="rail-number">{chapter.number}</span>
                <span>{chapter.label}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="rail-progress" aria-hidden="true">
          <span>You are here</span>
          <strong>{currentIndex < 0 ? "— / 05" : `${String(currentIndex + 1).padStart(2, "0")} / 05`}</strong>
          <div>
            {chapters.map((chapter, index) => (
              <i key={chapter.id} className={index <= currentIndex ? "is-filled" : undefined} />
            ))}
          </div>
        </div>
      </aside>
  );
}

function MobileChapterStrip({ chapters, activeId, navigate, isHome }) {
  const handleChapter = (chapter) => {
    if (isHome) {
      document.getElementById(chapter.id)?.scrollIntoView({ block: "start" });
      window.history.replaceState({}, "", `/#${chapter.id}`);
    } else {
      navigate(chapter.href);
    }
  };

  return (
      <nav className="mobile-chapter-strip" aria-label="Notebook chapters">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            type="button"
            className={chapter.id === activeId ? "is-active" : undefined}
            onClick={() => handleChapter(chapter)}
          >
            <span>{chapter.number}</span> {chapter.label}
          </button>
        ))}
      </nav>
  );
}

function NotebookShell({ children, path, navigate, theme, toggleTheme, onSearch, activeId, isHome = false }) {
  return (
    <div className="notebook-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ChapterRail
        chapters={isHome ? HOME_CHAPTERS : PAGE_CHAPTERS}
        activeId={activeId}
        navigate={navigate}
        isHome={isHome}
      />
      <div className="notebook-canvas">
        <Header
          path={path}
          navigate={navigate}
          theme={theme}
          toggleTheme={toggleTheme}
          onSearch={onSearch}
        />
        <MobileChapterStrip
          chapters={isHome ? HOME_CHAPTERS : PAGE_CHAPTERS}
          activeId={activeId}
          navigate={navigate}
          isHome={isHome}
        />
        {children}
      </div>
    </div>
  );
}

function useHomeScrollSpy() {
  const [active, setActive] = useState("beliefs");

  useEffect(() => {
    const sections = HOME_CHAPTERS.map((chapter) => document.getElementById(chapter.id)).filter(Boolean);
    let frame = null;

    const updateActive = () => {
      frame = null;
      const activationLine = Math.min(window.innerHeight * 0.28, 240);
      let current = sections[0];
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= activationLine) current = section;
      });
      if (current) setActive(current.id);
    };

    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}

function SectionLabel({ children, action, href, navigate, id }) {
  return (
    <div className="section-label-row">
      <h2 className="section-label" id={id}>{children}</h2>
      {action && (
        <AppLink href={href} navigate={navigate} className="section-action">
          {action} <ArrowRight size={15} aria-hidden="true" />
        </AppLink>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="hero-copy">
        <h1 id="home-title">
          A working notebook on <span className="accent-underline">what I’m learning and thinking through.</span>
        </h1>
        <p>
          I write about technology, strategy, and industrial systems—how they work, where they break, and what it
          takes to turn an idea into execution.
        </p>
      </div>
      <figure className="portrait-note">
        <img
          src="/assets/portrait.jpg"
          srcSet="/assets/portrait-640.jpg 640w, /assets/portrait-1200.jpg 1200w, /assets/portrait.jpg 2267w"
          alt="Kunal Kabra"
          width="2267"
          height="2267"
          sizes="(max-width: 760px) 76vw, 330px"
          fetchPriority="high"
          decoding="async"
        />
      </figure>
    </section>
  );
}

function BeliefsSection() {
  return (
    <section id="beliefs" className="closing-section home-beliefs" aria-labelledby="beliefs-heading">
      <h2 id="beliefs-heading" className="section-label">Working beliefs</h2>
      <div className="belief-block">
        <p className="belief-lead">{beliefs[0]}</p>
      </div>
      <div className="belief-list">
        {beliefs.slice(1).map((belief) => <p key={belief}>{belief}</p>)}
      </div>
    </section>
  );
}

function EssaysSection({ navigate }) {
  const selectedEssays = essays.filter((essay) => essay.featured).slice(0, 3);

  return (
    <section id="essays" className="notebook-section essays-section" aria-labelledby="essays-heading">
      <SectionLabel id="essays-heading" action="All writing" href="/writing" navigate={navigate}>
        Selected essays
      </SectionLabel>
      <div className="essay-manuscript-list">
        {selectedEssays.map((essay, index) => (
          <div className="essay-row-wrap" key={essay.slug}>
            <AppLink href={`/writing/${essay.slug}`} navigate={navigate} className="essay-row">
              <span className="essay-number">0{index + 1}</span>
              <span className="essay-row-body">
                <strong>{essay.title}</strong>
                <span className="essay-thesis">{essay.thesis}</span>
                <span className="essay-meta-line">
                  {essay.tags.join(" · ")} <i /> {essay.readTime}
                </span>
              </span>
              <ArrowRight size={18} weight="regular" className="row-arrow" aria-hidden="true" />
            </AppLink>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProblemDisclosure({ problem, defaultOpen = false, compact = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const compactCopy = {
    "rural-productivity": {
      hypothesis: "Much of rural output is constrained by drudgery and low capital intensity.",
      testing: "Which work categories have the highest leverage per unit of capital and training?",
    },
    "energy-independence": {
      hypothesis: "Energy security without mineral security is a strategic illusion.",
      testing: "Where are the most brittle points in the supply chain?",
    },
  }[problem.slug];
  const hypothesis = compact ? compactCopy.hypothesis : problem.hypothesis;
  const testing = compact ? compactCopy.testing : problem.testing;
  return (
    <article id={problem.slug} className={`problem-disclosure ${open ? "is-open" : ""}`}>
      <span className="problem-number">{problem.id}</span>
      <h3>{problem.title}</h3>
      <div id={`${problem.slug}-details`} className="problem-content" hidden={!open}>
        <div>
          <span className="detail-label">Working hypothesis</span>
          <p>{hypothesis}</p>
        </div>
        <div>
          <span className="detail-label">What I’m testing</span>
          <p>{testing}</p>
        </div>
      </div>
      <button
        className="disclosure-button"
        type="button"
        aria-expanded={open}
        aria-controls={`${problem.slug}-details`}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "Close" : "Expand"}
        <CaretDown size={15} weight="regular" aria-hidden="true" />
      </button>
    </article>
  );
}

function SystemLoopDiagram() {
  return (
    <figure className="system-loop-figure">
      <svg
        className="system-loop-diagram"
        viewBox="0 0 420 340"
        role="img"
        aria-labelledby="system-loop-title system-loop-description"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
      >
        <title id="system-loop-title">A reinforcing systems loop</title>
        <desc id="system-loop-description">
          Resources strengthen demand and capability, which strengthens manufacturing and scale, which creates more resources.
        </desc>

        <defs>
          <marker
            id="system-loop-arrowhead"
            viewBox="0 0 12 12"
            refX="10"
            refY="6"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path className="loop-arrowhead" d="M 1 1 L 11 6 L 1 11" />
          </marker>
        </defs>

        <g className="loop-connectors" aria-hidden="true">
          <path
            className="loop-connector"
            d="M 274 75 C 339 104 366 166 346 212"
            markerEnd="url(#system-loop-arrowhead)"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="loop-connector"
            d="M 292 294 C 241 326 176 326 129 294"
            markerEnd="url(#system-loop-arrowhead)"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="loop-connector"
            d="M 70 212 C 51 158 83 99 144 75"
            markerEnd="url(#system-loop-arrowhead)"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        <g className="loop-motion" aria-hidden="true">
          <g className="loop-moving-arrow">
            <path d="M -9 -5 L 1 0 L -9 5" vectorEffect="non-scaling-stroke" />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.12;0.88;1"
              dur="3.6s"
              begin="-0.2s"
              repeatCount="indefinite"
            />
            <animateMotion
              path="M 274 75 C 339 104 366 166 346 212"
              dur="3.6s"
              begin="-0.2s"
              repeatCount="indefinite"
              rotate="auto"
            />
          </g>
          <g className="loop-moving-arrow">
            <path d="M -9 -5 L 1 0 L -9 5" vectorEffect="non-scaling-stroke" />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.12;0.88;1"
              dur="3.6s"
              begin="-1.4s"
              repeatCount="indefinite"
            />
            <animateMotion
              path="M 292 294 C 241 326 176 326 129 294"
              dur="3.6s"
              begin="-1.4s"
              repeatCount="indefinite"
              rotate="auto"
            />
          </g>
          <g className="loop-moving-arrow">
            <path d="M -9 -5 L 1 0 L -9 5" vectorEffect="non-scaling-stroke" />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.12;0.88;1"
              dur="3.6s"
              begin="-2.6s"
              repeatCount="indefinite"
            />
            <animateMotion
              path="M 70 212 C 51 158 83 99 144 75"
              dur="3.6s"
              begin="-2.6s"
              repeatCount="indefinite"
              rotate="auto"
            />
          </g>
        </g>

        <g className="loop-node loop-node-resources">
          <ellipse cx="210" cy="55" rx="76" ry="38" vectorEffect="non-scaling-stroke" />
          <text x="210" y="61" textAnchor="middle">Resources</text>
        </g>

        <g className="loop-node loop-node-manufacturing">
          <ellipse cx="95" cy="258" rx="82" ry="49" vectorEffect="non-scaling-stroke" />
          <text x="95" y="252" textAnchor="middle">
            <tspan x="95">Manufacturing</tspan>
            <tspan x="95" dy="20">&amp; scale</tspan>
          </text>
        </g>

        <g className="loop-node loop-node-demand">
          <ellipse cx="325" cy="258" rx="84" ry="49" vectorEffect="non-scaling-stroke" />
          <text x="325" y="252" textAnchor="middle">
            <tspan x="325">Demand &amp;</tspan>
            <tspan x="325" dy="20">capability</tspan>
          </text>
        </g>

        <g className="loop-center-label" aria-hidden="true">
          <circle cx="210" cy="169" r="42" vectorEffect="non-scaling-stroke" />
          <text x="210" y="165" textAnchor="middle">
            <tspan x="210">Reinforcing</tspan>
            <tspan x="210" dy="18">loop</tspan>
          </text>
        </g>
      </svg>
    </figure>
  );
}

function QuestionsSection({ navigate }) {
  return (
    <section id="questions" className="notebook-section questions-section" aria-labelledby="questions-heading">
      <SectionLabel id="questions-heading" action="Explore both problems" href="/problems" navigate={navigate}>
        Open questions
      </SectionLabel>
      <div className="questions-layout">
        <div className="questions-grid">
          {problems.map((problem, index) => (
            <ProblemDisclosure problem={problem} defaultOpen={index === 0} compact key={problem.slug} />
          ))}
        </div>
        <SystemLoopDiagram />
      </div>
    </section>
  );
}

function NotesSection({ navigate }) {
  return (
    <section id="notes" className="notebook-section notes-section" aria-labelledby="notes-heading">
      <SectionLabel id="notes-heading" action="Open learning notes" href="/notes" navigate={navigate}>
        Notes in progress
      </SectionLabel>
      <div className="note-fragments">
        {notes.map((note) => (
          <article key={note.id}>
            <span>{note.id}</span>
            <strong>{note.title}</strong>
            <p>{note.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReadingSection({ navigate }) {
  const featuredBooks = books.slice(0, 2);
  return (
    <section id="reading" className="notebook-section reading-section" aria-labelledby="reading-heading">
      <SectionLabel id="reading-heading" action="Full reading shelf" href="/reading" navigate={navigate}>
        Reading with a pencil
      </SectionLabel>
      <div className="reading-spread">
        <div className="book-row-list">
          {featuredBooks.map((book, index) => (
            <AppLink href="/reading" navigate={navigate} className="book-row" key={book.id}>
              <span className="book-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className="book-meta">
                <strong>{book.title}</strong>
                <small>{book.author}</small>
              </span>
              <span className="book-takeaway">
                <small>Takeaway</small>
                {book.takeaway}
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterForm({ inputId = "newsletter-email" }) {
  return (
    <form
      className="newsletter-form"
      action="https://kunalkabra.substack.com/subscribe"
      method="get"
      target="_blank"
      rel="noopener noreferrer"
    >
      <label htmlFor={inputId} className="sr-only">Email address</label>
      <input
        id={inputId}
        name="email"
        type="email"
        required
        inputMode="email"
        autoComplete="email"
        placeholder="you@email.com"
      />
      <button type="submit">
        Subscribe <ArrowRight size={15} aria-hidden="true" />
      </button>
      <a className="substack-credit" href="https://kunalkabra.substack.com" target="_blank" rel="noreferrer">
        Powered by Substack
      </a>
    </form>
  );
}

function NewsletterCallout({ idPrefix = "page" }) {
  const titleId = `${idPrefix}-newsletter-title`;
  return (
    <section className="newsletter-callout" aria-labelledby={titleId}>
      <div>
        <span className="section-label">Monthly notes</span>
        <h2 id={titleId}>Continue the conversation by email.</h2>
        <p>One thoughtful note a month on what I am learning and building. No spam.</p>
      </div>
      <NewsletterForm inputId={`${idPrefix}-newsletter-email`} />
    </section>
  );
}

function SocialIcon({ type }) {
  if (type === "email") return <EnvelopeSimple size={18} weight="regular" aria-hidden="true" />;
  if (type === "linkedin") return <LinkedinLogo size={18} weight="regular" aria-hidden="true" />;
  if (type === "whatsapp") return <WhatsappLogo size={18} weight="regular" aria-hidden="true" />;
  return <InstagramLogo size={18} weight="regular" aria-hidden="true" />;
}

function SocialLinks({ showArrow = false }) {
  return (
    <div className="social-list">
      {socialLinks.map((link) => (
        <a key={link.label} href={link.href} target={link.type === "email" ? undefined : "_blank"} rel="noreferrer">
          <SocialIcon type={link.type} />
          <span>{link.label}</span>
          {showArrow && <ArrowUpRight className="social-arrow" size={14} aria-hidden="true" />}
        </a>
      ))}
    </div>
  );
}

function ClosingSection({ navigate, onSearch, onHelp, theme, toggleTheme }) {
  return (
    <>
      <section className="closing-section home-closing" aria-label="Stay connected">
        <div className="monthly-block">
          <h2 className="section-label">Monthly notes</h2>
          <p>One email a month on what I’m learning and building. No spam, unsubscribe anytime.</p>
          <NewsletterForm />
        </div>
        <div className="contact-block">
          <h2 className="section-label">Let’s connect</h2>
          <SocialLinks />
        </div>
      </section>
      <UtilitiesFooter navigate={navigate} onSearch={onSearch} onHelp={onHelp} theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}

function SiteCopyright() {
  const [views, setViews] = useState(null);

  useEffect(() => {
    if (!/(^|\.)kunalkabra\.com$/i.test(window.location.hostname)) return undefined;
    const controller = new AbortController();
    fetch("https://kunalkabra.goatcounter.com/counter/TOTAL.json", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.count) setViews(Number.parseInt(data.count, 10).toLocaleString());
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <span className="copyright">
      © Kunal Kabra
      {views && <small><Eye size={13} aria-hidden="true" /> {views} views</small>}
    </span>
  );
}

function UtilitiesFooter({ navigate, onSearch, onHelp, theme, toggleTheme }) {
  return (
    <footer className="utilities-footer">
      <span className="section-label">Utilities</span>
      <a href="/intelligence/#today" className="utility-item">
        <span>Morning Intelligence</span>
        <small>Daily briefing across markets, India, companies, AI, and geopolitics.</small>
      </a>
      <button type="button" className="utility-item" onClick={onSearch}>
        <span><MagnifyingGlass size={16} aria-hidden="true" /> Search</span>
        <small>Press / to search across the notebook.</small>
      </button>
      <button type="button" className="utility-item theme-toggle" onClick={toggleTheme}>
        <span>{theme === "light" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />} Theme</span>
        <small>Switch between light and dark.</small>
      </button>
      <button type="button" className="utility-item" onClick={onHelp}>
        <span><KeyboardIcon size={16} aria-hidden="true" /> Shortcuts</span>
        <small>Press ? to see every keyboard command.</small>
      </button>
      <SiteCopyright />
    </footer>
  );
}

function HomePage({ navigate, onSearch, onHelp, theme, toggleTheme }) {
  const activeId = useHomeScrollSpy();
  return (
    <NotebookShell
      path="/"
      navigate={navigate}
      theme={theme}
      toggleTheme={toggleTheme}
      onSearch={onSearch}
      activeId={activeId}
      isHome
    >
      <main id="main-content" tabIndex="-1">
        <div className="home-primary">
          <Hero />
        </div>
        <BeliefsSection />
        <QuestionsSection navigate={navigate} />
        <div className="home-primary">
          <EssaysSection navigate={navigate} />
        </div>
        <NotesSection navigate={navigate} />
        <ReadingSection navigate={navigate} />
        <ClosingSection navigate={navigate} onSearch={onSearch} onHelp={onHelp} theme={theme} toggleTheme={toggleTheme} />
      </main>
    </NotebookShell>
  );
}

function PageIntro({ eyebrow, title, copy, children }) {
  return (
    <header className="page-intro">
      <span className="section-label">{eyebrow}</span>
      <h1>{title}</h1>
      {copy && <p>{copy}</p>}
      {children}
    </header>
  );
}

function PageFooter({ navigate, onSearch, onHelp, theme, toggleTheme }) {
  return <UtilitiesFooter navigate={navigate} onSearch={onSearch} onHelp={onHelp} theme={theme} toggleTheme={toggleTheme} />;
}

function WritingPage({ path, navigate, onSearch, onHelp, theme, toggleTheme }) {
  const [filter, setFilter] = useState("all");
  const filters = [
    { id: "all", label: "All writing" },
    { id: "strategy", label: "Strategy" },
    { id: "operations", label: "Operations" },
    { id: "technology", label: "Technology" },
    { id: "manufacturing", label: "Manufacturing" },
    { id: "philosophy", label: "Philosophy" },
  ];
  const visible = filter === "all" ? essays : essays.filter((essay) => essay.category === filter);

  return (
    <NotebookShell path={path} navigate={navigate} theme={theme} toggleTheme={toggleTheme} onSearch={onSearch} activeId="essays">
      <main id="main-content" className="subpage-main" tabIndex="-1">
        <PageIntro
          eyebrow="Writing / 03"
          title="Essays for ideas that need more room."
          copy="Long-form notes on business, technology, manufacturing, and the systems that turn intent into execution."
        >
          <div className="filter-row" aria-label="Filter writing">
            {filters.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={filter === item.id ? "is-active" : undefined}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
                onKeyDown={(event) => {
                  if (!["ArrowLeft", "ArrowRight", "Home", "End", "ArrowDown"].includes(event.key)) return;
                  event.preventDefault();
                  if (event.key === "ArrowDown") {
                    document.querySelector(".archive-entry")?.focus();
                    return;
                  }
                  const buttons = Array.from(event.currentTarget.parentElement.querySelectorAll("button"));
                  const nextIndex = event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? buttons.length - 1
                      : (index + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length;
                  buttons[nextIndex]?.focus();
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </PageIntro>
        <section className="archive-list" aria-live="polite">
          <div key={filter} className="archive-list-items">
          {visible.map((essay, index) => (
            <AppLink
              href={`/writing/${essay.slug}`}
              navigate={navigate}
              className="archive-entry"
              key={essay.slug}
              onKeyDown={(event) => {
                if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const entries = Array.from(document.querySelectorAll(".archive-entry"));
                if (event.key === "ArrowUp" && index === 0) {
                  document.querySelector(`.filter-row button[aria-pressed="true"]`)?.focus();
                  return;
                }
                const nextIndex = event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? entries.length - 1
                    : (index + (event.key === "ArrowDown" ? 1 : -1) + entries.length) % entries.length;
                entries[nextIndex]?.focus();
              }}
            >
              <span className="archive-date">{essay.date}</span>
              <span>
                <small>{essay.tags.join(" · ")}</small>
                <strong>{essay.title}</strong>
                <p>{essay.excerpt}</p>
              </span>
              <span className="archive-read">{essay.readTime}<ArrowRight size={17} aria-hidden="true" /></span>
            </AppLink>
          ))}
          </div>
        </section>
        <section className="writing-note">
          <span className="section-label">Learning notes</span>
          <h2>Read shorter working notes.</h2>
          <p>Early observations from books, projects, and open questions live in the Notes archive.</p>
        </section>
        <NewsletterCallout idPrefix="writing" />
        <PageFooter navigate={navigate} onSearch={onSearch} onHelp={onHelp} theme={theme} toggleTheme={toggleTheme} />
      </main>
    </NotebookShell>
  );
}

function EssayArticlePage({ essay, path, navigate, onSearch, onHelp, theme, toggleTheme }) {
  useEffect(() => {
    document.title = `${essay.title} — Kunal Kabra`;
  }, [essay]);

  return (
    <NotebookShell path={path} navigate={navigate} theme={theme} toggleTheme={toggleTheme} onSearch={onSearch} activeId="essays">
      <main id="main-content" className="article-page" tabIndex="-1">
        <AppLink href="/writing" navigate={navigate} className="back-link">
          <ArrowLeft size={16} aria-hidden="true" /> All writing
        </AppLink>
        <header className="article-header">
          <span className="section-label">Essay / {essay.tags[0]}</span>
          <h1>{essay.title}</h1>
          <p>{essay.excerpt}</p>
          <div>{essay.date}<i />{essay.readTime}<i />{essay.tags.join(" · ")}</div>
        </header>
        <div className="article-layout">
          <aside className="article-toc" aria-label="Article sections">
            <span className="section-label">In this essay</span>
            {essay.sections.filter((section) => section.title !== "Opening").map((section, index) => (
              <a key={section.title} href={`#section-${index + 1}`}>{String(index + 1).padStart(2, "0")} {section.title}</a>
            ))}
          </aside>
          <article className="article-body">
            {essay.sections.map((section, index) => (
              <section id={`section-${index}`} key={section.title}>
                {section.title !== "Opening" && <h2>{section.title}</h2>}
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                )}
                {section.closingParagraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.quote && <blockquote>{section.quote}</blockquote>}
              </section>
            ))}
          </article>
        </div>
        <section className="article-next">
          <span className="section-label">Continue reading</span>
          {essays.filter((item) => item.slug !== essay.slug).slice(0, 2).map((item) => (
            <AppLink key={item.slug} href={`/writing/${item.slug}`} navigate={navigate}>
              <strong>{item.title}</strong><ArrowRight size={17} aria-hidden="true" />
            </AppLink>
          ))}
        </section>
        <NewsletterCallout idPrefix={`essay-${essay.slug}`} />
        <PageFooter navigate={navigate} onSearch={onSearch} onHelp={onHelp} theme={theme} toggleTheme={toggleTheme} />
      </main>
    </NotebookShell>
  );
}

function ProblemsPage({ path, navigate, onSearch, onHelp, theme, toggleTheme }) {
  const initialProblem = problems.find((problem) => problem.slug === window.location.hash.slice(1));
  const [openProblem, setOpenProblem] = useState(initialProblem?.slug ?? problems[0].slug);

  useEffect(() => {
    const syncHash = () => {
      const target = problems.find((problem) => problem.slug === window.location.hash.slice(1));
      if (!target) return;
      setOpenProblem(target.slug);
      requestAnimationFrame(() => document.getElementById(target.slug)?.scrollIntoView({ block: "start" }));
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  return (
    <NotebookShell path={path} navigate={navigate} theme={theme} toggleTheme={toggleTheme} onSearch={onSearch} activeId="questions">
      <main id="main-content" className="subpage-main" tabIndex="-1">
        <PageIntro
          eyebrow="Problems / 02"
          title="Questions worth staying with."
          copy="Crisp problem statements, real constraints, and working hypotheses that should change as the evidence changes."
        />
        <section className="problem-ledger">
          {problems.map((problem) => {
            const open = openProblem === problem.slug;
            const panelId = `${problem.slug}-panel`;
            return (
              <article id={problem.slug} className={open ? "is-open" : undefined} key={problem.slug}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenProblem(open ? "" : problem.slug)}
                >
                  <span>{problem.id}</span>
                  <span>
                    <small>{problem.status} · {problem.angle}</small>
                    <strong>{problem.title}</strong>
                    <em>{problem.question}</em>
                  </span>
                  <CaretDown size={20} aria-hidden="true" />
                </button>
                <div id={panelId} className="problem-ledger-body" hidden={!open}>
                    <div><span className="detail-label">Why it matters</span><p>{problem.why}</p></div>
                    <div><span className="detail-label">Working hypothesis</span><p>{problem.hypothesis}</p></div>
                    <div><span className="detail-label">What I’m testing</span><p>{problem.testing}</p></div>
                    <div className="constraints-block">
                      <span className="detail-label">Constraints that shape the answer</span>
                      <ul>{problem.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul>
                    </div>
                </div>
              </article>
            );
          })}
        </section>
        <PageFooter navigate={navigate} onSearch={onSearch} onHelp={onHelp} theme={theme} toggleTheme={toggleTheme} />
      </main>
    </NotebookShell>
  );
}

function ReadingPage({ path, navigate, onSearch, onHelp, theme, toggleTheme }) {
  const initialBook = books.find((book) => book.id === window.location.hash.slice(1));
  const [openBook, setOpenBook] = useState(initialBook?.id ?? books[0].id);
  const groups = ["Top pick", "Current read"];

  useEffect(() => {
    const syncHash = () => {
      const target = books.find((book) => book.id === window.location.hash.slice(1));
      if (!target) return;
      setOpenBook(target.id);
      requestAnimationFrame(() => document.getElementById(target.id)?.scrollIntoView({ block: "start" }));
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  return (
    <NotebookShell path={path} navigate={navigate} theme={theme} toggleTheme={toggleTheme} onSearch={onSearch} activeId="reading">
      <main id="main-content" className="subpage-main" tabIndex="-1">
        <PageIntro
          eyebrow="Reading / 05"
          title="A shelf with the pencil marks left in."
          copy="Not everything I have read — just the books that changed how I think, and the sources I am actively learning from."
        />
        {groups.map((group) => (
          <section className="reading-ledger" key={group}>
            <SectionLabel>{group === "Top pick" ? "Top picks" : "Current reads"}</SectionLabel>
            {books.filter((book) => book.group === group).map((book) => {
              const open = openBook === book.id;
              const panelId = `${book.id}-detail`;
              return (
                <article id={book.id} className={open ? "is-open" : undefined} key={book.id}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenBook(open ? "" : book.id)}
                    onKeyDown={(event) => {
                      if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
                      event.preventDefault();
                      const toggles = Array.from(document.querySelectorAll(".reading-ledger article > button"));
                      const currentIndex = toggles.indexOf(event.currentTarget);
                      const nextIndex = event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? toggles.length - 1
                          : (currentIndex + (event.key === "ArrowDown" ? 1 : -1) + toggles.length) % toggles.length;
                      toggles[nextIndex]?.focus();
                    }}
                  >
                    <BookOpenText size={22} weight="light" aria-hidden="true" />
                    <span><strong>{book.title}</strong><small>{book.author}</small></span>
                    <span className="reading-preview">{book.takeaway}</span>
                    <CaretDown size={18} aria-hidden="true" />
                  </button>
                  <p id={panelId} hidden={!open}>{book.detail}</p>
                </article>
              );
            })}
          </section>
        ))}
        <PageFooter navigate={navigate} onSearch={onSearch} onHelp={onHelp} theme={theme} toggleTheme={toggleTheme} />
      </main>
    </NotebookShell>
  );
}

function NotesPage({ path, navigate, onSearch, onHelp, theme, toggleTheme }) {
  return (
    <NotebookShell path={path} navigate={navigate} theme={theme} toggleTheme={toggleTheme} onSearch={onSearch} activeId="notes">
      <main id="main-content" className="subpage-main" tabIndex="-1">
        <PageIntro
          eyebrow="Learning notes / 04"
          title="Fragments before they become arguments."
          copy="Short notes from books, projects, and questions I am still working through. These are intentionally provisional."
        />
        <section className="notes-ledger" aria-label="Learning notes">
          {notes.map((note, index) => (
            <article id={`note-${index + 1}`} key={note.id}>
              <span>{note.id}</span>
              <div>
                <h2>{note.title}</h2>
                <p>{note.body}</p>
              </div>
              <small>Working fragment</small>
            </article>
          ))}
        </section>
        <PageFooter navigate={navigate} onSearch={onSearch} onHelp={onHelp} theme={theme} toggleTheme={toggleTheme} />
      </main>
    </NotebookShell>
  );
}

function AboutPage({ path, navigate, onSearch, onHelp, theme, toggleTheme }) {
  return (
    <NotebookShell path={path} navigate={navigate} theme={theme} toggleTheme={toggleTheme} onSearch={onSearch} activeId="beliefs">
      <main id="main-content" className="subpage-main" tabIndex="-1">
        <PageIntro eyebrow="About" title="Kunal Kabra." />
        <section className="about-opening">
          <img
            src="/assets/portrait.jpg"
            srcSet="/assets/portrait-640.jpg 640w, /assets/portrait-1200.jpg 1200w, /assets/portrait.jpg 2267w"
            alt="Kunal Kabra"
            width="2267"
            height="2267"
            sizes="(max-width: 760px) 76vw, 360px"
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="about-lede">
              I am interested in how complex systems work—and what it takes to build them well.
            </p>
            <p>I studied mechanical engineering at IIT Bombay, researched energy systems, and now advise companies at Bain on growth and operations.</p>
            <p>I write here about semiconductors, energy, manufacturing, AI, and India’s industrial future.</p>
          </div>
        </section>
        <section id="beliefs" className="about-beliefs" aria-labelledby="about-beliefs-heading">
          <SectionLabel id="about-beliefs-heading">What I believe</SectionLabel>
          <blockquote>{beliefs[0]}</blockquote>
          <div>{beliefs.slice(1).map((belief) => <p key={belief}>{belief}</p>)}</div>
        </section>
        <section className="about-contact about-contact-compact" aria-labelledby="about-contact-heading">
          <div className="about-contact-copy">
            <h2 id="about-contact-heading" className="section-label">Get in touch</h2>
            <p>If something here is worth discussing, I’d like to hear from you.</p>
          </div>
          <SocialLinks showArrow />
        </section>
        <PageFooter navigate={navigate} onSearch={onSearch} onHelp={onHelp} theme={theme} toggleTheme={toggleTheme} />
      </main>
    </NotebookShell>
  );
}

function SearchPalette({ open, onClose, navigate }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return searchItems.slice(0, 6);
    return searchItems.filter((item) => `${item.title} ${item.description} ${item.type}`.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement;
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (returnFocusRef.current?.isConnected) {
      returnFocusRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) return null;
  return (
    <div className="search-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={dialogRef}
        className="search-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Search the notebook"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            onClose();
            return;
          }
          if (event.key !== "Tab") return;
          const focusable = Array.from(
            dialogRef.current?.querySelectorAll('button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])') ?? [],
          ).filter((element) => element.getClientRects().length > 0);
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
      >
        <div className="search-input-row">
          <MagnifyingGlass size={20} aria-hidden="true" />
          <label htmlFor="notebook-search" className="sr-only">Search pages, essays, notes, books, and links</label>
          <input
            ref={inputRef}
            id="notebook-search"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls="notebook-search-results"
            aria-activedescendant={results[activeIndex] ? `notebook-search-result-${activeIndex}` : undefined}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (!results.length) return;
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActiveIndex((current) => (current + 1) % results.length);
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActiveIndex((current) => (current - 1 + results.length) % results.length);
              }
              if (event.key === "Enter") {
                event.preventDefault();
                const target = results[activeIndex];
                if (target) {
                  onClose();
                  if (target.newTab) window.open(target.href, "_blank", "noopener,noreferrer");
                  else if (target.hardNavigation) window.location.href = target.href;
                  else navigate(target.href);
                }
              }
            }}
            placeholder="Search pages, essays, notes, books, and links…"
          />
          <button type="button" onClick={onClose} aria-label="Close search"><X size={19} aria-hidden="true" /></button>
        </div>
        <div id="notebook-search-results" className="search-results" role="listbox" aria-label="Search results">
          {results.length ? results.map((item, index) => (
            <button
              type="button"
              id={`notebook-search-result-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              tabIndex={-1}
              key={`${item.type}-${item.title}`}
              className={index === activeIndex ? "is-active" : undefined}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                onClose();
                if (item.newTab) window.open(item.href, "_blank", "noopener,noreferrer");
                else if (item.hardNavigation) window.location.href = item.href;
                else navigate(item.href);
              }}
            >
              <span>{item.type}</span>
              <strong>{item.title}</strong>
              <small>{item.description}</small>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          )) : <p className="empty-search">No note matches that phrase yet.</p>}
        </div>
        <footer><span>↑↓ to browse</span><span>Enter to open</span><span>Esc to close</span></footer>
      </section>
    </div>
  );
}

function KeyboardHelp({ open, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const shortcuts = [
    ["/", "Open search"],
    ["?", "Show or hide this guide"],
    ["t", "Toggle light and dark theme"],
    ["n", "Focus the primary navigation"],
    ["↑ ↓", "Move through search, reading entries, or writing"],
    ["← →", "Move through writing filters or navigation"],
    ["Home End", "Jump to the first or last item"],
    ["g h", "Go home"],
    ["g e", "Go to Writing"],
    ["g p", "Go to Problems"],
    ["g l", "Go to Learning notes"],
    ["g r", "Go to Reading"],
    ["g i", "Go to Morning Intelligence"],
    ["Esc", "Close an overlay"],
  ];

  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement;
      requestAnimationFrame(() => closeRef.current?.focus());
    } else if (returnFocusRef.current?.isConnected) {
      returnFocusRef.current.focus();
    }
  }, [open]);

  if (!open) return null;
  return (
    <div className="keyboard-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={dialogRef}
        className="keyboard-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="keyboard-title"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            onClose();
            return;
          }
          if (event.key !== "Tab") return;
          const focusable = Array.from(dialogRef.current?.querySelectorAll("button, [href], [tabindex]:not([tabindex='-1'])") ?? [])
            .filter((element) => element.getClientRects().length > 0);
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
      >
        <header>
          <span><KeyboardIcon size={20} aria-hidden="true" /> Keyboard map</span>
          <h2 id="keyboard-title">Move through the notebook without reaching for the mouse.</h2>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close keyboard shortcuts">
            <X size={19} aria-hidden="true" />
          </button>
        </header>
        <dl>
          {shortcuts.map(([keys, description]) => (
            <div key={keys}>
              <dt>{keys.split(" ").map((key) => <kbd key={key}>{key}</kbd>)}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
        <footer>Shortcuts pause while you are typing in an input.</footer>
      </section>
    </div>
  );
}

function ResumeRedirect() {
  useEffect(() => {
    window.location.replace("/assets/resume.pdf");
  }, []);

  return (
    <main id="main-content" className="not-found" tabIndex="-1">
      <span className="section-label">Resume</span>
      <h1>Opening the PDF reader…</h1>
      <p>If it does not open automatically, use the direct link below.</p>
      <a href="/assets/resume.pdf">Open Kunal Kabra's résumé <ArrowRight size={16} aria-hidden="true" /></a>
    </main>
  );
}

function NotFoundPage({ path, navigate, onSearch, onHelp, theme, toggleTheme }) {
  return (
    <NotebookShell path={path} navigate={navigate} theme={theme} toggleTheme={toggleTheme} onSearch={onSearch} activeId="">
      <main id="main-content" className="not-found-page" tabIndex="-1">
        <section className="not-found-card">
          <span className="section-label">Loose page / 404</span>
          <h1>This note has wandered off.</h1>
          <p>The rest of the notebook is still intact.</p>
          <AppLink href="/" navigate={navigate}>Return home <ArrowRight size={16} aria-hidden="true" /></AppLink>
        </section>
        <PageFooter navigate={navigate} onSearch={onSearch} onHelp={onHelp} theme={theme} toggleTheme={toggleTheme} />
      </main>
    </NotebookShell>
  );
}

export function App() {
  const { path, navigate } = useRoute();
  const [theme, toggleTheme] = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const goPrefixRef = useRef(false);
  const goTimerRef = useRef(null);
  const previousPathRef = useRef(path);
  const [routeAnnouncement, setRouteAnnouncement] = useState("");

  useEffect(() => {
    const onKeyDown = (event) => {
      const activeElement = document.activeElement;
      const tag = activeElement?.tagName;
      const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(tag) || activeElement?.isContentEditable;
      const hasModifier = event.metaKey || event.ctrlKey || event.altKey;

      if (event.key === "Escape") {
        goPrefixRef.current = false;
        window.clearTimeout(goTimerRef.current);
        setSearchOpen(false);
        setHelpOpen(false);
        return;
      }
      if (isTyping) return;

      if (event.key === "/" && !hasModifier) {
        event.preventDefault();
        setHelpOpen(false);
        setSearchOpen(true);
        return;
      }
      if (event.key === "?" && !hasModifier) {
        event.preventDefault();
        setSearchOpen(false);
        setHelpOpen((current) => !current);
        return;
      }
      if (searchOpen || helpOpen) return;

      if (goPrefixRef.current) {
        goPrefixRef.current = false;
        window.clearTimeout(goTimerRef.current);
        const routes = { h: "/", e: "/writing", p: "/problems", l: "/notes", r: "/reading" };
        const target = routes[event.key.toLowerCase()];
        if (event.key.toLowerCase() === "i") {
          event.preventDefault();
          window.location.href = "/intelligence/#today";
        } else if (target) {
          event.preventDefault();
          navigate(target);
        }
        return;
      }
      if (event.key.toLowerCase() === "g" && !hasModifier) {
        event.preventDefault();
        goPrefixRef.current = true;
        window.clearTimeout(goTimerRef.current);
        goTimerRef.current = window.setTimeout(() => {
          goPrefixRef.current = false;
        }, 1400);
        return;
      }
      if (event.key.toLowerCase() === "t" && !hasModifier) {
        event.preventDefault();
        toggleTheme();
        return;
      }
      if (event.key.toLowerCase() === "n" && !hasModifier) {
        event.preventDefault();
        document.querySelector(".primary-nav a")?.focus();
        return;
      }

      const nav = activeElement?.closest?.(".primary-nav");
      if (nav && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        const links = Array.from(nav.querySelectorAll("a"));
        const currentIndex = links.indexOf(activeElement);
        const nextIndex = event.key === "Home"
          ? 0
          : event.key === "End"
            ? links.length - 1
            : (currentIndex + (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1) + links.length) % links.length;
        links[nextIndex]?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(goTimerRef.current);
    };
  }, [helpOpen, navigate, searchOpen, toggleTheme]);

  useEffect(() => {
    const [title, description] = getRouteMetadata(path);
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
    const canonical = `https://kunalkabra.com${path === "/" ? "/" : `${path}/`}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonical);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonical);

    if (previousPathRef.current === path) return;
    previousPathRef.current = path;

    setRouteAnnouncement("");
    requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
      setRouteAnnouncement(`Navigated to ${title.replace(" — Kunal Kabra", "")}.`);
    });
  }, [path]);

  useEffect(() => {
    if (!/(^|\.)kunalkabra\.com$/i.test(window.location.hostname)) return;
    if (document.querySelector('script[data-goatcounter="https://kunalkabra.goatcounter.com/count"]')) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://gc.zgo.at/count.js";
    script.dataset.goatcounter = "https://kunalkabra.goatcounter.com/count";
    document.body.appendChild(script);
  }, []);

  const shared = {
    path,
    navigate,
    onSearch: () => {
      setHelpOpen(false);
      setSearchOpen(true);
    },
    onHelp: () => {
      setSearchOpen(false);
      setHelpOpen(true);
    },
    theme,
    toggleTheme,
  };

  let page;
  if (path === "/") page = <HomePage {...shared} />;
  else if (path === "/writing") page = <WritingPage {...shared} />;
  else if (path === "/problems") page = <ProblemsPage {...shared} />;
  else if (path === "/notes") page = <NotesPage {...shared} />;
  else if (path === "/reading") page = <ReadingPage {...shared} />;
  else if (path === "/about") page = <AboutPage {...shared} />;
  else if (path === "/resume") page = <ResumeRedirect />;
  else if (/^\/writing\/[^/]+$/.test(path)) {
    const essay = essays.find((item) => path === `/writing/${item.slug}`);
    page = essay ? <EssayArticlePage {...shared} essay={essay} /> : <NotFoundPage {...shared} />;
  } else page = <NotFoundPage {...shared} />;

  return (
    <>
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{routeAnnouncement}</div>
      {page}
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} navigate={navigate} />
      <KeyboardHelp open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
