import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowBendLeftUp,
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
  "/": ["Kunal Kabra — A working notebook", "Kunal Kabra's working notebook on strategy, technology, India's industrial future, and durable execution."],
  "/writing": ["Writing — Kunal Kabra", "Essays on business, technology, manufacturing, strategy, and philosophy."],
  "/problems": ["Problems — Kunal Kabra", "Open questions, constraints, and working hypotheses on rural productivity and energy independence."],
  "/notes": ["Learning notes — Kunal Kabra", "Working notes from what Kunal Kabra is studying and trying to understand."],
  "/reading": ["Reading — Kunal Kabra", "Books and resources that shaped how Kunal Kabra thinks."],
  "/about": ["About — Kunal Kabra", "Kunal Kabra's background, path, working beliefs, and contact details."],
};

function getRouteMetadata(path) {
  const essay = path.startsWith("/writing/") ? essays.find((item) => path.endsWith(item.slug)) : null;
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
    window.localStorage.setItem("theme", theme);
    window.localStorage.setItem("kk-notebook-theme", theme);
  }, [theme]);

  return [theme, () => setTheme((current) => (current === "light" ? "dark" : "light"))];
}

function Header({ path, navigate, theme, toggleTheme, onSearch }) {
  const navItems = [
    { label: "Writing", href: "/writing", active: path.startsWith("/writing") },
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
  const currentIndex = Math.max(
    0,
    chapters.findIndex((chapter) => chapter.id === activeId),
  );

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
          <strong>{String(currentIndex + 1).padStart(2, "0")} / 05</strong>
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
  const [active, setActive] = useState("essays");

  useEffect(() => {
    const sections = HOME_CHAPTERS.map((chapter) => document.getElementById(chapter.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
          A working notebook on <span className="accent-underline">strategy, systems, and durable growth.</span>
        </h1>
        <p>
          I use this site to think in public about technology, India’s industrial future, and how ideas become
          execution.
        </p>
        <div className="path-line" aria-label="Personal path">
          <span>Mechanical engineering</span><i>→</i><span>Energy systems</span><i>→</i><span>Strategy &amp; operations</span>
        </div>
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
        <figcaption>
          <ArrowBendLeftUp size={34} weight="light" aria-hidden="true" />
          <span>Thinker,<br />builder,<br />perpetual student.</span>
        </figcaption>
      </figure>
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
            {essay.slug === "agency-and-leverage" && (
              <aside className="margin-note" aria-label="Connection note">
                <span>Margin note</span>
                Connects to the open question on rural productivity — where does design leverage sit when the core
                problem is physical work?
                <button type="button" onClick={() => document.getElementById("rural-productivity")?.scrollIntoView()}>
                  → See Question 01
                </button>
              </aside>
            )}
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
        <figure className="system-loop-figure">
          <img src="/assets/system-loop.png" alt="A reinforcing loop between resources, demand and capability, and manufacturing and scale" loading="lazy" decoding="async" />
        </figure>
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
              <img
                src={index === 0 ? "/assets/book-spine-green.png" : "/assets/book-spine-rust.png"}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
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

function ClosingSection({ navigate, onSearch, onHelp, theme, toggleTheme }) {
  return (
    <>
      <section id="beliefs" className="closing-section" aria-labelledby="beliefs-heading">
        <div className="belief-block">
          <h2 id="beliefs-heading" className="section-label">Working beliefs</h2>
          <blockquote>{beliefs[0]}</blockquote>
        </div>
        <div className="monthly-block">
          <h2 className="section-label">Monthly notes</h2>
          <p>One email a month on what I’m learning and building. No spam, unsubscribe anytime.</p>
          <NewsletterForm />
        </div>
        <div className="contact-block">
          <h2 className="section-label">Let’s connect</h2>
          <div className="social-list">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target={link.type === "email" ? undefined : "_blank"} rel="noreferrer">
                <SocialIcon type={link.type} /> {link.label}
              </a>
            ))}
          </div>
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
      <small>{views ? <><Eye size={13} aria-hidden="true" /> {views} views</> : "Built as a working notebook."}</small>
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
          <EssaysSection navigate={navigate} />
        </div>
        <QuestionsSection navigate={navigate} />
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
          <span className="section-label">Shorter notes</span>
          <h2>Ideas can stay unfinished while they become useful.</h2>
          <p>
            Learning notes have their own archive, where working fragments stay visible while they gather enough
            evidence to become essays.
          </p>
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
            {essay.sources?.length > 0 && <a href="#source-notes">Sources</a>}
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
            {essay.sources?.length > 0 && (
              <section id="source-notes" className="article-sources" aria-labelledby="source-notes-heading">
                <span className="section-label">Research ledger</span>
                <h2 id="source-notes-heading">Source notes</h2>
                <p className="article-sources-intro">
                  Sources anchor the factual claims; interpretation and conclusions are my own. Company and
                  practitioner figures are identified in the essay rather than treated as universal benchmarks.
                </p>
                <ol>
                  {essay.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${source.title} — ${source.publisher} (opens in a new tab)`}
                      >
                        <span>{source.title}</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                      <small>{source.publisher}</small>
                      <p>{source.note}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
            <div className="article-end-mark">End note · Keep the argument, challenge the assumptions.</div>
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
  const [openProblem, setOpenProblem] = useState(problems[0].slug);
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
            return (
              <article id={problem.slug} className={open ? "is-open" : undefined} key={problem.slug}>
                <button type="button" aria-expanded={open} onClick={() => setOpenProblem(open ? "" : problem.slug)}>
                  <span>{problem.id}</span>
                  <span>
                    <small>{problem.status} · {problem.angle}</small>
                    <strong>{problem.title}</strong>
                    <em>{problem.question}</em>
                  </span>
                  <CaretDown size={20} aria-hidden="true" />
                </button>
                {open && (
                  <div className="problem-ledger-body">
                    <div><span className="detail-label">Why it matters</span><p>{problem.why}</p></div>
                    <div><span className="detail-label">Working hypothesis</span><p>{problem.hypothesis}</p></div>
                    <div><span className="detail-label">What I’m testing</span><p>{problem.testing}</p></div>
                    <div className="constraints-block">
                      <span className="detail-label">Constraints that shape the answer</span>
                      <ul>{problem.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>
        <section className="problem-method">
          <span className="section-label">How these pages evolve</span>
          <div>
            <h2>State the belief. Name the test. Keep the revision visible.</h2>
            <p>
              A problem page is useful when it makes uncertainty legible. Each question keeps a working hypothesis
              beside the evidence that could change it.
            </p>
          </div>
        </section>
        <PageFooter navigate={navigate} onSearch={onSearch} onHelp={onHelp} theme={theme} toggleTheme={toggleTheme} />
      </main>
    </NotebookShell>
  );
}

function ReadingPage({ path, navigate, onSearch, onHelp, theme, toggleTheme }) {
  const [openBook, setOpenBook] = useState(books[0].id);
  const groups = ["Top pick", "Current read"];
  return (
    <NotebookShell path={path} navigate={navigate} theme={theme} toggleTheme={toggleTheme} onSearch={onSearch} activeId="reading">
      <main id="main-content" className="subpage-main" tabIndex="-1">
        <PageIntro
          eyebrow="Reading / 05"
          title="A shelf with the pencil marks left in."
          copy="Not everything I have read — just the books that changed how I think, and the sources I am actively learning from."
        />
        <img className="reading-page-art" src="/assets/book-spines.png" alt="Abstract green and rust book-spine studies" loading="lazy" decoding="async" />
        {groups.map((group) => (
          <section className="reading-ledger" key={group}>
            <SectionLabel>{group === "Top pick" ? "Top picks" : "Current reads"}</SectionLabel>
            {books.filter((book) => book.group === group).map((book) => {
              const open = openBook === book.id;
              return (
                <article className={open ? "is-open" : undefined} key={book.id}>
                  <button
                    type="button"
                    aria-expanded={open}
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
                  {open && <p>{book.detail}</p>}
                </article>
              );
            })}
          </section>
        ))}
        <section className="future-shelf">
          <span className="section-label">Later on this page</span>
          <p>
            This shelf is where I will add the blogs, newsletters, writers, and people I keep returning to when I
            want signal over noise.
          </p>
        </section>
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
        <section className="notes-method">
          <span className="section-label">How this archive grows</span>
          <p>
            A note stays here while the claim is still being tested. When it can carry evidence, objections, and a
            useful conclusion, it moves into Writing.
          </p>
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
        <PageIntro eyebrow="About / 01" title="The model and the machine." />
        <section className="about-opening">
          <img src="/assets/portrait.jpg" alt="Kunal Kabra" loading="lazy" decoding="async" />
          <div>
            <p className="about-lede">
              I care about how things actually get built — not just the deck, but the system underneath it.
            </p>
            <p>
              I studied mechanical engineering at IIT Bombay, did research in energy systems, and now advise companies
              at Bain on growth and operations — mostly in complex, capital-intensive environments where the real
              problem is execution, not ideas.
            </p>
            <p>
              This site is where I think out loud about strategy, technology, India’s industrial future, and the craft
              of building durable things.
            </p>
          </div>
        </section>
        <section className="path-timeline">
          <SectionLabel>Path</SectionLabel>
          {[
            ["01", "Mechanical engineering", "A first language for understanding physical systems and constraints."],
            ["02", "Energy-systems research", "A closer look at infrastructure, dependency, and long time horizons."],
            ["03", "Strategy & operations", "Working where the model meets the machinery of execution."],
            ["04", "Thinking in public", "Essays, problems, and reading notes that make the working model visible."],
          ].map(([number, title, copy]) => (
            <article key={number}><span>{number}</span><strong>{title}</strong><p>{copy}</p></article>
          ))}
        </section>
        <section id="beliefs" className="about-beliefs">
          <SectionLabel>What I believe</SectionLabel>
          <blockquote>{beliefs[0]}</blockquote>
          <div>{beliefs.slice(1).map((belief) => <p key={belief}>{belief}</p>)}</div>
        </section>
        <section className="about-contact">
          <div>
            <span className="section-label">Get in touch</span>
            <h2>If something here is worth discussing, I’d like to hear from you.</h2>
          </div>
          <div className="social-list">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target={link.type === "email" ? undefined : "_blank"} rel="noreferrer">
                <SocialIcon type={link.type} /> {link.label}<ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
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
        <div className="search-results">
          {results.length ? results.map((item, index) => (
            <button
              type="button"
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
  else if (path.startsWith("/writing/")) {
    const slug = path.split("/").filter(Boolean)[1];
    const essay = essays.find((item) => item.slug === slug);
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
