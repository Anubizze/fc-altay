import type { StandingForm, StandingRow } from "@/shared/content/site-content";
import { leagueStandings, SITE_LOGO_SRC } from "@/shared/content/site-content";
import type { AppLocale } from "@/shared/lib/locale-path";

/** Next.js: опции fetch с кэшем (тип DOM RequestInit их не знает). */
type NextFetchInit = RequestInit & {
  next?: { revalidate?: number; tags?: string[] };
};

const KFF_ORIGIN = "https://kffleague.kz";
const REVALIDATE_SEC = 1800;

function num(v: unknown, fallback = 0): number {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isNaN(n) ? fallback : n;
  }
  return fallback;
}

function logoFromUnknown(v: unknown): string | undefined {
  if (typeof v !== "string" || !v) return undefined;
  const s = v.trim();
  if (!s || s.length > 2000) return undefined;
  if (s.startsWith("data:image")) return s;
  if (s.startsWith("http")) return s;
  if (s.startsWith("//")) return `https:${s}`;
  if (s.startsWith("/")) return `${KFF_ORIGIN}${s}`;
  if (
    /^[\w%-./]+\.(png|jpe?g|webp|svg|gif)(\?[^#]*)?$/i.test(s) ||
    /^[\w%-]+\/[\w%-./]+\.(png|jpe?g|webp|svg|gif)(\?[^#]*)?$/i.test(s)
  ) {
    return `${KFF_ORIGIN}/${s.replace(/^\//, "")}`;
  }
  return undefined;
}

/** Раскрывает внутренний url из прокси Next.js `/_next/image?url=...`. */
function expandPossibleLogoString(s: string): string | undefined {
  const t = s.trim();
  if (!t) return undefined;
  if (t.includes("_next/image")) {
    try {
      const base = t.startsWith("http") ? t : `${KFF_ORIGIN}${t.startsWith("/") ? t : `/${t}`}`;
      const u = new URL(base);
      const inner = u.searchParams.get("url");
      if (inner) {
        let path = inner;
        try {
          path = decodeURIComponent(inner);
        } catch {
          path = inner;
        }
        return logoFromUnknown(path) ?? logoFromUnknown(`/${path.replace(/^\//, "")}`);
      }
    } catch {
      /* ignore */
    }
  }
  return logoFromUnknown(t);
}

function pickLogo(t: Record<string, unknown>): string | undefined {
  const direct = [
    t.logo,
    t.emblem,
    t.emblemUrl,
    t.crest,
    t.crestUrl,
    t.badge,
    t.shield,
    t.icon,
    t.image,
    t.avatar,
    t.teamLogo,
    t.logoUrl,
    t.imageUrl,
    t.photo,
    t.picture,
    t.mainImage,
    t.preview,
    t.thumbnail,
    t.avatarUrl,
    t.logo_light,
    t.logoLight,
    t.logo_dark,
    t.logoDark,
    t.clubLogo,
    t.urlLogo,
    t.logoSvg,
    t.svgLogo,
    t.file,
    t.href
  ];
  for (const c of direct) {
    if (typeof c === "string") {
      const u = expandPossibleLogoString(c);
      if (u) return u;
    }
    if (c && typeof c === "object") {
      const o = c as Record<string, unknown>;
      const nested =
        expandPossibleLogoString(String(o.url ?? o.src ?? o.path ?? o.href ?? o.default ?? "")) ??
        logoFromUnknown(o.url) ??
        logoFromUnknown(o.src) ??
        logoFromUnknown(o.path);
      if (nested) return nested;
    }
  }
  const files = t.files;
  if (files && typeof files === "object") {
    const f = files as Record<string, unknown>;
    const u =
      pickLogo(f as Record<string, unknown>) ??
      expandPossibleLogoString(String(f.logo ?? f.emblem ?? f.crest ?? ""));
    if (u) return u;
  }
  const media = t.media;
  if (Array.isArray(media)) {
    for (const m of media) {
      if (m && typeof m === "object") {
        const u = pickLogo(m as Record<string, unknown>);
        if (u) return u;
      }
    }
  }
  return undefined;
}

const SKIP_LOGO_KEY = /og|opengraph|banner|hero|stadium|cover|background|share|twitter|facebook|social/i;

/** Ищет первую строку похожую на картинку эмблемы (KFF кладёт её под разными ключами). */
function deepFindTeamLogoUrl(
  obj: unknown,
  depth = 0,
  seen: WeakSet<object> = new WeakSet()
): string | undefined {
  if (depth > 14 || obj == null) return undefined;
  if (typeof obj === "string") {
    const t = obj.trim();
    if (t.length > 2 && t.length < 2000) {
      if (/\.(png|jpe?g|webp|svg|gif)(\?|$)/i.test(t) || t.includes("_next/image") || t.includes("/logo")) {
        return expandPossibleLogoString(t);
      }
    }
    return undefined;
  }
  if (typeof obj !== "object") return undefined;
  if (seen.has(obj as object)) return undefined;
  seen.add(obj as object);
  if (Array.isArray(obj)) {
    for (const el of obj) {
      const u = deepFindTeamLogoUrl(el, depth + 1, seen);
      if (u) return u;
    }
    return undefined;
  }
  const o = obj as Record<string, unknown>;
  const keys = Object.keys(o).sort((a, b) => {
    const rank = (k: string) =>
      /logo|emblem|crest|badge|icon|avatar|photo|picture|image|shield|svg|club|team/i.test(k) ? 0 : 1;
    return rank(a) - rank(b);
  });
  for (const k of keys) {
    if (SKIP_LOGO_KEY.test(k)) continue;
    const u = deepFindTeamLogoUrl(o[k], depth + 1, seen);
    if (u) return u;
  }
  return undefined;
}

function abbreviate(name: string): string {
  if (!name) return "—";
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    let s = "";
    for (const p of parts.slice(0, 3)) {
      s += p[0] ?? "";
    }
    return s.toUpperCase().slice(0, 3);
  }
  return name.slice(0, 3).toUpperCase();
}

function extractTeam(raw: Record<string, unknown>): { name: string; short: string; logoUrl?: string } {
  const team = raw.team ?? raw.club ?? raw.participant ?? raw.command;
  if (typeof team === "string") {
    return { name: team, short: abbreviate(team) };
  }
  if (team && typeof team === "object") {
    const t = team as Record<string, unknown>;
    const name = String(
      t.name ?? t.title ?? t.titleRu ?? t.titleKz ?? t.fullName ?? t.shortName ?? ""
    ).trim();
    const short = String(t.shortName ?? t.code ?? abbreviate(name)).trim() || abbreviate(name);
    const logoUrl = pickLogo(t) ?? deepFindTeamLogoUrl(t);
    return { name, short, logoUrl };
  }
  const name = String(raw.teamName ?? raw.name ?? raw.title ?? "").trim();
  return { name, short: abbreviate(name) };
}

function extractStats(raw: Record<string, unknown>) {
  const nested =
    (raw.statistics as Record<string, unknown> | undefined) ??
    (raw.stats as Record<string, unknown> | undefined);
  const games = (raw.games as Record<string, unknown> | undefined) ?? undefined;
  const all = games?.all as Record<string, unknown> | undefined;
  const goal = all?.goal as Record<string, unknown> | undefined;

  const s = nested ?? raw;
  let played = num(s.played ?? s.games ?? s.matches ?? s.game, 0);
  let wins = num(s.wins ?? s.win, 0);
  let draws = num(s.draws ?? s.draw, 0);
  let losses = num(s.losses ?? s.loss, 0);
  let goalsFor = num(s.goalsFor ?? s.goals_for ?? s.scored ?? s.goalsScored, 0);
  let goalsAgainst = num(s.goalsAgainst ?? s.goals_against ?? s.missed ?? s.goalsMissed, 0);
  let points = num(s.points ?? s.point ?? s.pts, 0);

  if (all && typeof all === "object") {
    played = played || num(all.count ?? all.played ?? all.games, 0);
    wins = wins || num(all.win ?? all.wins, 0);
    draws = draws || num(all.draw ?? all.draws, 0);
    losses = losses || num(all.lose ?? all.loss ?? all.losses, 0);
    if (goal && typeof goal === "object") {
      goalsFor = goalsFor || num(goal.scored ?? goal.for ?? goal.goalsFor, 0);
      goalsAgainst = goalsAgainst || num(goal.conceded ?? goal.against ?? goal.goalsAgainst, 0);
    }
  }

  points = points || num(raw.points ?? raw.point ?? raw.pts, 0);

  return { played, wins, draws, losses, goalsFor, goalsAgainst, points };
}

function parseForm(v: unknown): StandingForm[] {
  if (!v) return [];
  if (Array.isArray(v)) {
    const out: StandingForm[] = [];
    for (const item of v) {
      const f = parseFormToken(item);
      if (f) out.push(f);
    }
    return out;
  }
  if (typeof v === "string") {
    const out: StandingForm[] = [];
    for (const ch of v) {
      const f = parseFormToken(ch);
      if (f) out.push(f);
    }
    return out;
  }
  return [];
}

function parseFormToken(c: unknown): StandingForm | null {
  const s = String(c).trim().toUpperCase();
  if (s === "W" || s === "В" || s === "Ж") return "W";
  if (s === "D" || s === "Н" || s === "Т") return "D";
  if (s === "L" || s === "П") return "L";
  return null;
}

function scoreStandingsArray(arr: unknown[]): number {
  if (!Array.isArray(arr) || arr.length < 10 || arr.length > 24) return 0;
  let total = 0;
  let okRows = 0;
  for (const item of arr) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    let row = 0;
    if ("team" in o || "club" in o || "participant" in o || "command" in o) row += 4;
    else if (typeof o.teamName === "string") row += 3;
    if (typeof o.points === "number" || typeof o.point === "number" || typeof o.pts === "number")
      row += 4;
    if (
      typeof o.played === "number" ||
      typeof o.games === "number" ||
      typeof o.matches === "number"
    )
      row += 2;
    if (
      typeof o.position === "number" ||
      typeof o.place === "number" ||
      typeof o.serialNumber === "number"
    )
      row += 2;
    if (row >= 8) {
      total += row;
      okRows++;
    }
  }
  if (okRows < Math.min(10, arr.length - 2)) return 0;
  return total;
}

function tryDirectStandingsFromPageProps(data: unknown): unknown[] | null {
  if (!data || typeof data !== "object") return null;
  const root = data as Record<string, unknown>;
  const props = root.props as Record<string, unknown> | undefined;
  const pageProps = props?.pageProps as Record<string, unknown> | undefined;
  if (!pageProps) return null;
  for (const key of ["standings", "table", "rows", "leaderboard", "tournamentTable"]) {
    const v = pageProps[key];
    if (Array.isArray(v) && scoreStandingsArray(v) > 0) return v;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const o = v as Record<string, unknown>;
      for (const inner of ["rows", "data", "items", "teams"]) {
        const a = o[inner];
        if (Array.isArray(a) && scoreStandingsArray(a) > 0) return a;
      }
    }
  }
  return null;
}

function findBestStandingsArray(root: unknown): unknown[] | null {
  const candidates: { arr: unknown[]; score: number }[] = [];

  const visit = (obj: unknown, depth: number) => {
    if (depth > 28) return;
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) {
      const sc = scoreStandingsArray(obj);
      if (sc > 0) candidates.push({ arr: obj, score: sc });
      for (const item of obj) visit(item, depth + 1);
      return;
    }
    for (const v of Object.values(obj as Record<string, unknown>)) {
      visit(v, depth + 1);
    }
  };

  visit(root, 0);
  if (!candidates.length) return null;

  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const dist = (n: number) => Math.abs(n - 16);
    return dist(a.arr.length) - dist(b.arr.length);
  });

  return candidates[0]?.arr ?? null;
}

function mapRawRow(raw: unknown, index: number): StandingRow | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const pos = num(
    o.position ?? o.place ?? o.serialNumber ?? o.pos ?? o.rank,
    index + 1
  );
  const { name, short, logoUrl: teamLogo } = extractTeam(o);
  if (!name) return null;
  const st = extractStats(o);
  const form = parseForm(o.form ?? o.lastGames ?? o.formSeries ?? o.recentForm);
  const teamNode = o.team ?? o.club ?? o.participant ?? o.command;
  const logoUrl =
    teamLogo ??
    pickLogo(o) ??
    (teamNode && typeof teamNode === "object" ? deepFindTeamLogoUrl(teamNode) : undefined);

  const row: StandingRow = {
    pos,
    team: name,
    short,
    played: st.played,
    wins: st.wins,
    draws: st.draws,
    losses: st.losses,
    goalsFor: st.goalsFor,
    goalsAgainst: st.goalsAgainst,
    points: st.points,
    form: form.length ? form : [],
    logoUrl
  };

  if (/алтай/i.test(name) || /altai/i.test(name)) {
    row.isClub = true;
  }

  return row;
}

function extractNextDataJson(html: string): unknown | null {
  const m = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
  );
  if (!m?.[1]) return null;
  try {
    return JSON.parse(m[1]) as unknown;
  } catch {
    return null;
  }
}


export function toProxiedLogoSrc(logoUrl: string | undefined): string | undefined {
  if (!logoUrl) return undefined;
  if (logoUrl.startsWith("/") || logoUrl.startsWith("data:")) return logoUrl;
  if (!/^https?:\/\//i.test(logoUrl)) return logoUrl;
  return `/api/kff-media?src=${encodeURIComponent(logoUrl)}`;
}

function tsdbNeedlesForKffName(kffTeam: string): string[] {
  const n = kffTeam.toLowerCase();
  const needles: string[] = [];
  /** KFF пишет «Қайрат» (қ U+049B), не русское «кайрат». */
  if (/[қк]айрат|kairat/i.test(n)) needles.push("kairat");
  if (/астана/.test(n) || /^astana/i.test(kffTeam)) needles.push("astana");
  if (/ордабасы|ordabasy/.test(n)) needles.push("ordabasy");
  if (/тобыл|tobol/.test(n)) needles.push("tobol");
  if (/елімай|elimai/.test(n)) needles.push("elimai");
  /** KFF иногда пишет «Каспий» (к), иногда «Қаспий» (қ). */
  if (/[қк]аспий|caspiy/i.test(n)) needles.push("caspiy");
  if (/ерт[іи]с|irtysh/i.test(n)) needles.push("irtysh", "pavlodar");
  if (/атырау|atyrau/.test(n)) needles.push("atyrau");
  if (/ақтөбе|aktobe/.test(n)) needles.push("aktobe");
  if (/жетісу|zhetysu|jetysu/i.test(n)) needles.push("zhetysu", "jetysu", "taldykorgan");
  if (/тараз|taraz/.test(n)) needles.push("taraz");
  if (/шахт[её]р|shakhter|shakter/i.test(n)) needles.push("shakhter", "shakter", "karagandy");
  if (/қызылжар|kyzylzhar/.test(n)) needles.push("kyzylzhar");
  if (/окжетпес|okzhetpes/.test(n)) needles.push("okzhetpes");
  if (/алтай|altai|өскемен|oskemen|ust-kamenogorsk/.test(n)) {
    needles.push("altai", "oskemen");
  }
  /** «Туран» / «Тұран» и латиница. */
  if (/туран|тұран|turan/i.test(n)) needles.push("turan");
  if (/ақсу|aksu/.test(n)) needles.push("aksu");
  return needles;
}

function kffTeamMatchesTsdb(kffName: string, strTeam: string): boolean {
  const t = strTeam.toLowerCase();
  const needles = tsdbNeedlesForKffName(kffName);
  return needles.some((needle) => t.includes(needle));
}

function normalizeTsdBadgeUrl(raw: string): string {
  return raw.replace(/\/(tiny|small)$/i, "/medium");
}

type TsdbTeamHit = { strTeam?: string; strBadge?: string; strCountry?: string };

function pickBadgeFromSearchResults(teams: TsdbTeamHit[] | null | undefined): string | undefined {
  if (!teams?.length) return undefined;
  const kz = teams.filter((t) => /kazakhstan/i.test(t.strCountry ?? ""));
  const pool = kz.length ? kz : teams;
  const withBadge = pool.find((t) => t.strBadge);
  return withBadge?.strBadge;
}

/** Запрос searchteams (один раз на строку запроса), кэш на время сборки ответа. */
async function fetchTsdSearchBadgeMap(queries: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  const unique = [...new Set(queries.map((q) => q.trim()).filter(Boolean))];
  const batchSize = 4;
  for (let i = 0; i < unique.length; i += batchSize) {
    const batch = unique.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (q) => {
        try {
          const res = await fetch(
            `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(q)}`,
            { next: { revalidate: 86_400 } } satisfies NextFetchInit
          );
          if (!res.ok) return;
          const data = (await res.json()) as { teams?: TsdbTeamHit[] | null };
          const badge = pickBadgeFromSearchResults(data.teams ?? undefined);
          if (badge) out.set(q, normalizeTsdBadgeUrl(badge));
        } catch {
          /* ignore */
        }
      })
    );
  }
  return out;
}

/** Поисковые строки TheSportsDB под названия из KFF (если lookuptable неполный). */
function tsdbSearchQueryForKffRow(teamName: string): string | undefined {
  const rules: { re: RegExp; q: string }[] = [
    { re: /[ҚқКк]айрат|kairat/i, q: "Kairat Almaty" },
    { re: /астана/i, q: "Astana" },
    { re: /ордабасы/i, q: "Ordabasy" },
    { re: /тобыл/i, q: "Tobol" },
    { re: /елімай/i, q: "Elimai" },
    /** «Caspiy» в TSDB — полное имя даёт однозначное попадание. */
    { re: /[қк]аспий|caspiy/i, q: "Caspiy Aktau" },
    { re: /ерт[іи]с|irtysh/i, q: "Irtysh Pavlodar" },
    { re: /атырау/i, q: "Atyrau" },
    { re: /ақтөбе/i, q: "Aktobe" },
    /** В базе — Jetysu Taldykorgan, не «Zhetysu». */
    { re: /жетісу|zhetysu|jetysu/i, q: "Jetysu Taldykorgan" },
    { re: /тараз/i, q: "Taraz" },
    { re: /шахт[её]р|shakhter/i, q: "Shakhter Karagandy" },
    { re: /қызылжар/i, q: "Kyzylzhar" },
    { re: /окжетпес/i, q: "Okzhetpes" },
    { re: /алтай|өскемен/i, q: "Altai" },
    { re: /туран|тұран/i, q: "Turan" },
    { re: /ақсу/i, q: "Aksu" }
  ];
  for (const { re, q } of rules) {
    if (re.test(teamName)) return q;
  }
  return undefined;
}

/**
 * Жёсткие URL эмблем TheSportsDB (без /tiny), если поиск и таблица не сработали.
 * idTeam проверены по API /searchteams.
 */
const TSDB_BADGE_FALLBACK: { re: RegExp; url: string }[] = [
  {
    re: /[ҚқКк]айрат|kairat/i,
    url: "https://r2.thesportsdb.com/images/media/team/badge/sz5y1m1579285078.png"
  },
  {
    re: /[қк]аспий|caspiy/i,
    url: "https://r2.thesportsdb.com/images/media/team/badge/hzxzgi1691820933.png"
  },
  {
    re: /ерт[іи]с|irtysh/i,
    url: "https://r2.thesportsdb.com/images/media/team/badge/8nddzg1579285068.png"
  },
  {
    re: /жетісу|zhetysu|jetysu/i,
    url: "https://r2.thesportsdb.com/images/media/team/badge/m5fq7w1614971939.png"
  },
  {
    re: /шахт[её]р|shakhter|shakter/i,
    url: "https://r2.thesportsdb.com/images/media/team/badge/k5kej81751478979.png"
  }
];

function applyTsdbBadgeUrlFallbacks(rows: StandingRow[]): void {
  for (const row of rows) {
    if (row.logoUrl) continue;
    for (const { re, url } of TSDB_BADGE_FALLBACK) {
      if (re.test(row.team)) {
        row.logoUrl = url;
        break;
      }
    }
  }
}

/** Дополняет строки эмблемами из TheSportsDB (lookuptable + поиск по командам). */
async function mergeTheSportsDbBadges(rows: StandingRow[]): Promise<void> {
  try {
    const res = await fetch(
      "https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4649",
      { next: { revalidate: 3600 } } satisfies NextFetchInit
    );
    if (res.ok) {
      const data = (await res.json()) as {
        table?: Array<{ strTeam?: string; strBadge?: string }>;
      };
      const table = data.table;
      if (Array.isArray(table) && table.length) {
        for (const row of rows) {
          if (row.logoUrl) continue;
          for (const t of table) {
            const name = t.strTeam;
            const badge = t.strBadge;
            if (!name || !badge) continue;
            if (kffTeamMatchesTsdb(row.team, name)) {
              row.logoUrl = normalizeTsdBadgeUrl(badge);
              break;
            }
          }
        }
      }
    }
  } catch {
    /* ignore */
  }

  const searchQueries: string[] = [];
  for (const row of rows) {
    if (row.logoUrl) continue;
    const q = tsdbSearchQueryForKffRow(row.team);
    if (q) searchQueries.push(q);
  }
  if (!searchQueries.length) return;

  const badgeByQuery = await fetchTsdSearchBadgeMap(searchQueries);
  for (const row of rows) {
    if (row.logoUrl) continue;
    const q = tsdbSearchQueryForKffRow(row.team);
    if (!q) continue;
    const b = badgeByQuery.get(q);
    if (b) row.logoUrl = b;
  }

  applyTsdbBadgeUrlFallbacks(rows);
}

/**
 * Таблица для сайта: данные KFF (или запасной статический список) + эмблемы (KFF / TheSportsDB / логотип клуба) + прокси URL.
 */
export async function getPremierStandingsWithLogos(locale: AppLocale): Promise<StandingRow[]> {
  const live = await getKffPremierStandings(locale);
  const rows = (live ?? leagueStandings).map((r) => ({ ...r }));

  await mergeTheSportsDbBadges(rows);

  for (const r of rows) {
    if (!r.logoUrl && r.isClub) {
      r.logoUrl = SITE_LOGO_SRC;
    }
    r.logoUrl = toProxiedLogoSrc(r.logoUrl);
  }

  return rows;
}

export async function getKffPremierStandings(locale: AppLocale): Promise<StandingRow[] | null> {
  const path = locale === "kk" ? "/kz/table" : "/ru/table";
  try {
    const res = await fetch(`${KFF_ORIGIN}${path}`, {
      next: { revalidate: REVALIDATE_SEC },
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "Mozilla/5.0 (compatible; FCAltaiOskemen/1.0; +https://fcaltay.kz)"
      }
    } satisfies NextFetchInit);
    if (!res.ok) return null;
    const html = await res.text();
    const data = extractNextDataJson(html);
    if (!data) return null;
    const arr = tryDirectStandingsFromPageProps(data) ?? findBestStandingsArray(data);
    if (!arr) return null;
    const rows = arr
      .map((item, i) => mapRawRow(item, i))
      .filter((r): r is StandingRow => r !== null);
    if (rows.length < 10) return null;
    rows.sort((a, b) => a.pos - b.pos);
    return rows;
  } catch {
    return null;
  }
}

export function kffTablePublicUrl(locale: AppLocale): string {
  return `${KFF_ORIGIN}${locale === "kk" ? "/kz/table" : "/ru/table"}`;
}
