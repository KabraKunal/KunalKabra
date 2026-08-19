"use client";

import { useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  deepReads,
  edition,
  macroPulse,
  methodology,
  sectionGuides,
  sincePrint,
  stories,
  tabs,
  watchlist,
  type SourceRef,
  type Story,
  type Tab,
} from "./data";
import {
  deepReadSearchDocument,
  matchesQuery,
  matchesSource,
  sincePrintSearchDocument,
  storySearchDocument,
  watchSearchDocument,
} from "./search.mjs";

const sourceOptions = ["All", "FT", "WSJ", "BS", "Mint", "Web"] as const;
type SourceFilter = (typeof sourceOptions)[number];

const tabIds: Record<Tab, string> = {
  TODAY: "today",
  "MARKETS & MACRO": "markets-macro",
  INDIA: "india",
  COMPANIES: "companies",
  "AI & TECHNOLOGY": "ai-technology",
  "ENERGY & GEOPOLITICS": "energy-geopolitics",
  "SINCE PRINT": "since-print",
  WATCHLIST: "watchlist",
  "DEEP READS": "deep-reads",
};

function SourceTag({ item }: { item: SourceRef }) {
  const content = (
    <>
      <span className="source-name">{item.source}</span>
      <span className="source-detail">{item.detail}</span>
    </>
  );

  if (item.url) {
    return (
      <a
        className={`source-tag source-${item.source.toLocaleLowerCase()}`}
        href={item.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${item.source}: ${item.detail} (opens in a new tab)`}
      >
        {content}
        <span aria-hidden="true" className="external-mark">↗</span>
      </a>
    );
  }

  return (
    <span
      className={`source-tag source-${item.source.toLocaleLowerCase()}`}
      title={`${item.source}: ${item.detail}`}
    >
      {content}
    </span>
  );
}

function StoryCard({ story, lead = false }: { story: Story; lead?: boolean }) {
  return (
    <details className={`brief-card${lead ? " brief-card-lead" : ""}`}>
      <summary>
        <div className="brief-number" aria-hidden="true">
          {story.rank ? String(story.rank).padStart(2, "0") : "•"}
        </div>
        <div className="brief-main">
          <div className="brief-topline">
            <span className="eyebrow">{story.eyebrow}</span>
            <span className={`importance importance-${story.importance.toLocaleLowerCase()}`}>
              {story.importance}
            </span>
          </div>
          <h3>{story.headline}</h3>
          <p className="brief-summary">{story.summary}</p>
          <div className="source-row">
            {story.sources.map((item, index) => (
              <SourceTag item={item} key={`${item.source}-${item.detail}-${index}`} />
            ))}
          </div>
        </div>
        <span className="expand-control" aria-hidden="true">
          <span className="expand-label">Context</span>
          <span className="expand-icon">＋</span>
        </span>
      </summary>
      <div className="brief-detail">
        <div className="detail-grid">
          <section>
            <span className="detail-label">Why it matters</span>
            <p>{story.why}</p>
          </section>
          <section>
            <span className="detail-label">Second-order implication</span>
            <p>{story.secondOrder}</p>
          </section>
          {(story.winners || story.losers) && (
            <section className="winners-losers">
              {story.winners && (
                <div>
                  <span className="detail-label">Potential winners</span>
                  <p>{story.winners}</p>
                </div>
              )}
              {story.losers && (
                <div>
                  <span className="detail-label">Potential losers</span>
                  <p>{story.losers}</p>
                </div>
              )}
            </section>
          )}
          <section className="watch-next">
            <span className="detail-label">What to watch next</span>
            <p>{story.watch}</p>
          </section>
        </div>
        <div className="evidence-panel">
          <div className="evidence-heading">
            <span>Evidence discipline</span>
            <span>
              {story.confidence} confidence · {story.maturity}
            </span>
          </div>
          {story.evidence.map((item, index) => (
            <div className="evidence-line" key={`${story.id}-evidence-${index}`}>
              <span className={`evidence-kind kind-${item.kind.toLocaleLowerCase().replace(" ", "-")}`}>
                {item.kind}
              </span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <span className="eyebrow">No matching signal</span>
      <h3>The filter is stricter than today’s retained evidence.</h3>
      <p>Clear search or select another source. Suppressed stories are not restored by filtering.</p>
    </div>
  );
}

function TodayView({ items }: { items: Story[] }) {
  const heading = items.length === 7 ? "7 Things That Matter Today" : `${items.length} of 7 Things That Matter Today`;

  return (
    <section className="view today-view" aria-labelledby="today-title">
      <div className="section-heading today-heading">
        <div>
          <span className="section-kicker">The three-minute brief</span>
          <h2 id="today-title">{heading}</h2>
        </div>
        <p>
          Ranked after duplicate clustering, confidence checks and a post-print materiality sweep.
        </p>
      </div>
      {items.length ? (
        <div className="today-list">
          {items.map((story, index) => (
            <StoryCard key={story.id} story={story} lead={index === 0 && story.rank === 1} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}

function PulseTable() {
  return (
    <div className="pulse-table" role="table" aria-label="Regional macro pulse">
      <div className="pulse-row pulse-head" role="row">
        <span role="columnheader">Region</span>
        <span role="columnheader">Signal</span>
        <span role="columnheader">Driver → implication</span>
      </div>
      {macroPulse.map((item) => (
        <div className="pulse-row" role="row" key={item.region}>
          <strong role="cell">{item.region}</strong>
          <span role="cell">{item.signal}</span>
          <p role="cell">
            {item.driver} <em>{item.implication}</em>
          </p>
        </div>
      ))}
    </div>
  );
}

function SectionView({ tab, items }: { tab: keyof typeof sectionGuides; items: Story[] }) {
  const guide = sectionGuides[tab];
  return (
    <section className="view section-view" aria-labelledby={`${tabIds[tab]}-title`}>
      <div className="section-heading">
        <div>
          <span className="section-kicker">Decision map</span>
          <h2 id={`${tabIds[tab]}-title`}>{guide.title}</h2>
        </div>
        <p>{guide.dek}</p>
      </div>
      <div className="section-callout">
        <span className="detail-label">Read this first</span>
        <p>{guide.callout}</p>
      </div>
      {tab === "MARKETS & MACRO" && <PulseTable />}
      <div className="section-body">
        <aside className="context-rail">
          <span className="eyebrow">Editorial lens</span>
          <p>Facts describe the event. Inference explains transmission. Proposals stay provisional until a binding action exists.</p>
          <div className="rail-rule" />
          <span className="rail-stat">{items.length}</span>
          <span className="rail-caption">retained signals in this view</span>
        </aside>
        <div className="story-stack">
          {items.length ? items.map((story) => <StoryCard story={story} key={story.id} />) : <EmptyState />}
        </div>
      </div>
    </section>
  );
}

function SincePrintView({ query, source }: { query: string; source: SourceFilter }) {
  const items = sincePrint.filter(
    (item) =>
      matchesSource(source, item.sources.map((itemSource) => itemSource.source)) &&
      matchesQuery(sincePrintSearchDocument(item), query),
  );

  return (
    <section className="view since-print-view" aria-labelledby="since-print-title">
      <div className="section-heading">
        <div>
          <span className="section-kicker">Last 24 hours</span>
          <h2 id="since-print-title">Since Print</h2>
        </div>
        <p>Only developments that alter, sharpen or challenge the newspaper narrative.</p>
      </div>
      <div className="since-window">
        <span className="live-dot" aria-hidden="true" />
        Web window checked: {edition.webWindowLabel} · published snapshot, not a live feed
      </div>
      <div className="since-grid">
        {items.length ? (
          items.map((item, index) => (
            <article className="since-card" key={item.id}>
              <div className="since-index">0{index + 1}</div>
              <div className="since-content">
                <div className="brief-topline">
                  <span className="eyebrow">{item.time}</span>
                  <span className="confidence-label">{item.confidence} confidence</span>
                </div>
                <h3>{item.headline}</h3>
                <div className="since-field">
                  <span>What happened</span>
                  <p>{item.happened}</p>
                </div>
                <div className="since-field">
                  <span>Why it matters</span>
                  <p>{item.why}</p>
                </div>
                <div className="since-field changed-field">
                  <span>Changed versus print</span>
                  <p>{item.changed}</p>
                </div>
                <div className="tag-line" aria-label="Topics">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="source-row">
                  {item.sources.map((source, sourceIndex) => (
                    <SourceTag item={source} key={`${item.id}-${sourceIndex}`} />
                  ))}
                </div>
              </div>
            </article>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

function WatchlistView({ query, source }: { query: string; source: SourceFilter }) {
  const items = watchlist.filter(
    (item) =>
      matchesSource(source, item.sources) &&
      matchesQuery(watchSearchDocument(item), query),
  );

  return (
    <section className="view watchlist-view" aria-labelledby="watchlist-title">
      <div className="section-heading">
        <div>
          <span className="section-kicker">Theme tracker · day over day</span>
          <h2 id="watchlist-title">Watchlist</h2>
        </div>
        <p>Status compares today’s evidence with the previous dashboard; existing themes are never reset to NEW.</p>
      </div>
      <div className="watch-list">
        {items.length ? (
          items.map((item) => (
            <article className={`watch-card${item.risk ? " watch-risk" : ""}`} key={item.theme}>
              <div className="watch-title-row">
                <h3>{item.theme}</h3>
                <span className={`watch-status status-${item.status.toLocaleLowerCase().replaceAll(" ", "-")}`}>
                  {item.status}
                </span>
              </div>
              <div className="watch-columns">
                <div>
                  <span>Current thesis</span>
                  <p>{item.thesis}</p>
                </div>
                <div>
                  <span>Evidence today</span>
                  <p>{item.evidence}</p>
                </div>
                <div>
                  <span>Key trigger</span>
                  <p>{item.trigger}</p>
                </div>
              </div>
              <div className="watch-sources">
                {item.sources.map((itemSource) => (
                  <span key={itemSource}>{itemSource}</span>
                ))}
              </div>
            </article>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

function DeepReadsView({ query, source }: { query: string; source: SourceFilter }) {
  const items = deepReads.filter(
    (item) =>
      matchesSource(source, item.sources) &&
      matchesQuery(deepReadSearchDocument(item), query),
  );

  return (
    <section className="view deep-reads-view" aria-labelledby="deep-reads-title">
      <div className="section-heading">
        <div>
          <span className="section-kicker">Four, not forty</span>
          <h2 id="deep-reads-title">Deep Reads</h2>
        </div>
        <p>The articles whose evidence or analytical frame is genuinely worth another ten minutes.</p>
      </div>
      <div className="deep-list">
        {items.length ? (
          items.map((item, index) => (
            <article className="deep-card" key={item.title}>
              <span className="deep-number">0{index + 1}</span>
              <div>
                <div className="deep-source">
                  <span>{item.sourceLabel}</span>
                  <span>{item.detail}</span>
                </div>
                <h3>
                  {item.url ? (
                    <a className="deep-read-link" href={item.url} target="_blank" rel="noreferrer">
                      {item.title}<span className="external-mark" aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                <p>{item.reason}</p>
                <div className="reading-question">
                  <span>Question to carry into the article</span>
                  <p>{item.question}</p>
                </div>
              </div>
            </article>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("TODAY");
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<SourceFilter>("All");
  const tabButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useLayoutEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.slice(1);
      const match = tabs.find((tab) => tabIds[tab] === hash);
      if (match) setActiveTab(match);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const selectTab = (tab: Tab) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tabIds[tab]}`);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex === null) return;
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    selectTab(nextTab);
    requestAnimationFrame(() => tabButtonRefs.current[nextIndex]?.focus());
  };

  const filteredStories = useMemo(() => {
    return stories
      .filter((story) => story.sections.includes(activeTab))
      .filter((story) => matchesSource(source, story.sources.map((item) => item.source)))
      .filter((story) => matchesQuery(storySearchDocument(story), query))
      .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
  }, [activeTab, query, source]);

  const visibleResultCount = useMemo(() => {
    if (activeTab === "SINCE PRINT") {
      return sincePrint.filter(
        (item) =>
          matchesSource(source, item.sources.map((itemSource) => itemSource.source)) &&
          matchesQuery(sincePrintSearchDocument(item), query),
      ).length;
    }

    if (activeTab === "WATCHLIST") {
      return watchlist.filter(
        (item) =>
          matchesSource(source, item.sources) &&
          matchesQuery(watchSearchDocument(item), query),
      ).length;
    }

    if (activeTab === "DEEP READS") {
      return deepReads.filter(
        (item) =>
          matchesSource(source, item.sources) &&
          matchesQuery(deepReadSearchDocument(item), query),
      ).length;
    }

    return filteredStories.length;
  }, [activeTab, filteredStories.length, query, source]);

  return (
    <main>
      <a className="skip-link" href="#brief-content">Skip to today’s intelligence</a>
      <header className="masthead">
        <div className="masthead-inner">
          <div className="brand-block">
            <span className="brand-rule" aria-hidden="true" />
            <div>
              <h1 className="brand-name">Morning Intelligence</h1>
              <p className="edition-date">{edition.dateLabel}</p>
            </div>
          </div>
          <div className="edition-block">
            <span>{edition.sourceLabel}</span>
            <span>{edition.snapshotLabel}</span>
          </div>
        </div>
        <div className="bottom-line">
          <span>Bottom line this morning</span>
          <p>{edition.bottomLine}</p>
        </div>
        <div className="metric-strip" aria-label="Research scope">
          <div>
            <strong>{methodology.pages}</strong>
            <span>source pages reviewed</span>
          </div>
          <div>
            <strong>{methodology.clusters}</strong>
            <span>material clusters</span>
          </div>
          <div>
            <strong>{methodology.retained}</strong>
            <span>retained signals</span>
          </div>
          <div>
            <strong>{sincePrint.length}</strong>
            <span>since-print changes</span>
          </div>
        </div>
      </header>

      <div className="sticky-shell">
        <nav className="tab-nav" aria-label="Morning Intelligence sections">
          <div className="tab-list" role="tablist" aria-label="Dashboard views">
            {tabs.map((tab, index) => (
              <button
                type="button"
                id={`${tabIds[tab]}-tab`}
                role="tab"
                className={activeTab === tab ? "active" : ""}
                aria-selected={activeTab === tab}
                aria-controls={`${tabIds[tab]}-panel`}
                tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => selectTab(tab)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                ref={(node) => { tabButtonRefs.current[index] = node; }}
                key={tab}
              >
                {tab}
                {tab === "SINCE PRINT" && <span className="nav-count">{sincePrint.length}</span>}
              </button>
            ))}
          </div>
        </nav>
        <div className="research-toolbar">
          <div className="search-field">
            <label className="sr-only" htmlFor="intelligence-search">Search retained intelligence</label>
            <span aria-hidden="true">⌕</span>
            <input
              id="intelligence-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search themes, companies, implications…"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                ×
              </button>
            )}
          </div>
          <div className="source-filter" role="group" aria-label="Filter by source">
            {sourceOptions.map((item) => (
              <button
                type="button"
                key={item}
                className={source === item ? "active" : ""}
                aria-pressed={source === item}
                onClick={() => setSource(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="content-shell" id="brief-content" tabIndex={-1}>
        <div
          id={`${tabIds[activeTab]}-panel`}
          role="tabpanel"
          aria-labelledby={`${tabIds[activeTab]}-tab`}
        >
          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {activeTab}: {visibleResultCount} retained {visibleResultCount === 1 ? "signal" : "signals"} shown.
          </p>
          {activeTab === "TODAY" && <TodayView items={filteredStories} />}
          {activeTab in sectionGuides && (
            <SectionView tab={activeTab as keyof typeof sectionGuides} items={filteredStories} />
          )}
          {activeTab === "SINCE PRINT" && <SincePrintView query={query} source={source} />}
          {activeTab === "WATCHLIST" && <WatchlistView query={query} source={source} />}
          {activeTab === "DEEP READS" && <DeepReadsView query={query} source={source} />}
        </div>
      </div>

      <footer>
        <div className="footer-main">
          <div>
            <span className="eyebrow">Method</span>
            <p>{methodology.scoring}</p>
          </div>
          <div>
            <span className="eyebrow">Duplicate control</span>
            <p>{methodology.overlaps}</p>
          </div>
          <div>
            <span className="eyebrow">Coverage</span>
            <p>{methodology.cutoff}</p>
          </div>
        </div>
        <div className="footer-note">
          <span>MORNING INTELLIGENCE</span>
          <span>Facts, web updates and inference are labeled separately. No live market data.</span>
        </div>
      </footer>
    </main>
  );
}
