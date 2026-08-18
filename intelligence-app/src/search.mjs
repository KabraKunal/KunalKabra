function compact(values) {
  return values
    .flat(Infinity)
    .filter((value) => typeof value === "string" && value.trim())
    .join(" ");
}

export function matchesQuery(document, query) {
  return document.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
}

export function matchesSource(source, availableSources) {
  return source === "All" || availableSources.includes(source);
}

/** @param {import("./data").Story} story */
export function storySearchDocument(story) {
  return compact([
    story.id,
    story.sections,
    story.eyebrow,
    story.headline,
    story.summary,
    story.why,
    story.secondOrder,
    story.winners,
    story.losers,
    story.watch,
    story.importance,
    story.confidence,
    story.maturity,
    story.sources.flatMap((source) => [source.source, source.detail]),
    story.evidence.flatMap((item) => [item.kind, item.text]),
  ]);
}

/** @param {import("./data").SincePrintItem} item */
export function sincePrintSearchDocument(item) {
  return compact([
    item.id,
    item.time,
    item.headline,
    item.happened,
    item.why,
    item.changed,
    item.confidence,
    item.tags,
    item.sources.flatMap((source) => [source.source, source.detail]),
  ]);
}

/** @param {import("./data").WatchItem} item */
export function watchSearchDocument(item) {
  return compact([
    item.theme,
    item.status,
    item.thesis,
    item.evidence,
    item.trigger,
    item.sources,
    item.risk ? "risk deterioration" : "",
  ]);
}

/** @param {import("./data").DeepRead} item */
export function deepReadSearchDocument(item) {
  return compact([
    item.title,
    item.sourceLabel,
    item.sources,
    item.detail,
    item.reason,
    item.question,
  ]);
}
