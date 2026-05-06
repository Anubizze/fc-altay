import type { ContactItem } from "./contact-types";

export type { ContactItem } from "./contact-types";

/** Категории новостей по ТЗ (п.2). */
export type NewsCategory =
  | "Все"
  | "Основная команда"
  | "Дубль"
  | "Женская команда"
  | "QJ League"
  | "Футбольный центр"
  | "Instagram";

/** Элемент ленты новостей (сайт + необязательная ссылка на пост Instagram). */
export type NewsItem = {
  /** Уникальный фрагмент URL: /{locale}/news/{slug} */
  slug: string;
  title: string;
  /** Короткий анонс в карточках и слайдере. */
  excerpt: string;
  /** Полный текст на странице новости; если нет — показывается excerpt. */
  body?: string;
  category: Exclude<NewsCategory, "Все">;
  /** Полная дата для подписи (например «19 апреля 2026»). */
  date: string;
  /** Короткая дата в шапке карточки (например «19 апреля, 2026»). */
  dateShort?: string;
  tag: string;
  imageGradient?: string;
  /** Обложка карточки; если не задано у Instagram — подгружается превью через API. */
  coverImageSrc?: string;
  coverImageAlt?: string;
  /** Публичная ссылка на пост; на странице новости — кнопка открытия embed. */
  instagramPermalink?: string;
};

export type MatchStatus = "upcoming" | "result";
export type MediaType = "photo" | "video";

/** Строка расписания / результата (главная, страница матчей). */
export type MatchItem = {
  status: MatchStatus;
  /** Короткая дата для карточек. */
  date: string;
  tournament: string;
  home: string;
  away: string;
  /** Для предстоящих — время (например «19:00»); для сыгранных — счёт «1:0». */
  score: string;
  venue: string;
  outcome?: "win" | "loss" | "draw";
  resultHighlight?: boolean;
  protocolPdf?: string;
  /** Номер тура (ПЛ). */
  tour?: number;
  /** Длинная строка даты в шапке «как на KFF» (локализованная). */
  dateLong?: string | { ru: string; kk: string };
  /** Ссылка на карточку матча на kffleague.kz. */
  kffMatchUrl?: string;
  /** YouTube KFF (опционально). */
  kffYoutubeUrl?: string;
  /** Погода, строкой как на KFF. */
  weather?: string;
  /** Абсолютный или относительный URL эмблемы (гость/хозяин). */
  homeLogoUrl?: string;
  awayLogoUrl?: string;
};

/** Стабильный публичный dummy-PDF для демо скачивания (ТЗ: PDF). */
export const DEMO_PDF_URL =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

export const heroStats = [
  { value: "1997", label: "год основания клуба" },
  { value: "4", label: "игровых направления" },
  { value: "12K+", label: "болельщиков онлайн" }
];

/** Карточки «Статистика сезона» на главной (как на референсе). */
export const seasonStatsCards = [
  {
    label: "Результаты",
    value: "0-3-1",
    sub: "Победы · Ничьи · Поражения",
    accent: false as const
  },
  {
    label: "Голы",
    value: "1-3",
    sub: "Забито · Пропущено",
    accent: false as const
  },
  {
    label: "Место в таблице",
    value: "14 / 16",
    sub: "Премьер-лига Казахстана",
    accent: true as const
  },
  {
    label: "Очки",
    value: "3",
    sub: "После 4 туров",
    accent: false as const
  }
];

export type StandingForm = "W" | "D" | "L";

export type StandingRow = {
  pos: number;
  team: string;
  short: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: StandingForm[];
  isClub?: boolean;
  /** Абсолютный URL эмблемы (например с kffleague.kz). */
  logoUrl?: string;
};

/** Премьер-лига · 16 команд; «Алтай Өскемен» — 14-е место (после 4 туров). */
export const leagueStandings: StandingRow[] = [
  { pos: 1, team: "Қайрат", short: "ҚАЙ", played: 4, wins: 4, draws: 0, losses: 0, goalsFor: 9, goalsAgainst: 1, points: 12, form: ["W", "W", "W", "W"] },
  { pos: 2, team: "Астана", short: "АСТ", played: 4, wins: 3, draws: 1, losses: 0, goalsFor: 7, goalsAgainst: 2, points: 10, form: ["W", "D", "W", "W"] },
  { pos: 3, team: "Ордабасы", short: "ОРД", played: 4, wins: 3, draws: 0, losses: 1, goalsFor: 8, goalsAgainst: 4, points: 9, form: ["W", "W", "L", "W"] },
  { pos: 4, team: "Тобыл", short: "ТОБ", played: 4, wins: 2, draws: 2, losses: 0, goalsFor: 6, goalsAgainst: 3, points: 8, form: ["D", "W", "W", "D"] },
  { pos: 5, team: "Елімай", short: "ЕЛІ", played: 4, wins: 2, draws: 1, losses: 1, goalsFor: 5, goalsAgainst: 4, points: 7, form: ["D", "W", "L", "W"] },
  { pos: 6, team: "Қаспий", short: "ҚАС", played: 4, wins: 2, draws: 1, losses: 1, goalsFor: 5, goalsAgainst: 5, points: 7, form: ["L", "D", "W", "W"] },
  { pos: 7, team: "Ертіс", short: "ЕРТ", played: 4, wins: 2, draws: 0, losses: 2, goalsFor: 5, goalsAgainst: 4, points: 6, form: ["W", "L", "W", "L"] },
  { pos: 8, team: "Атырау", short: "АТЫ", played: 4, wins: 1, draws: 3, losses: 0, goalsFor: 4, goalsAgainst: 3, points: 6, form: ["D", "D", "W", "D"] },
  { pos: 9, team: "Ақтөбе", short: "АҚТ", played: 4, wins: 1, draws: 2, losses: 1, goalsFor: 5, goalsAgainst: 5, points: 5, form: ["D", "L", "W", "D"] },
  { pos: 10, team: "Жетісу", short: "ЖЕТ", played: 4, wins: 1, draws: 2, losses: 1, goalsFor: 4, goalsAgainst: 5, points: 5, form: ["L", "D", "D", "W"] },
  { pos: 11, team: "Тараз", short: "ТАР", played: 4, wins: 1, draws: 1, losses: 2, goalsFor: 4, goalsAgainst: 6, points: 4, form: ["L", "W", "D", "L"] },
  { pos: 12, team: "Шахтер", short: "ШАХ", played: 4, wins: 1, draws: 1, losses: 2, goalsFor: 3, goalsAgainst: 6, points: 4, form: ["W", "L", "L", "D"] },
  { pos: 13, team: "Қызылжар", short: "ҚЫЗ", played: 4, wins: 0, draws: 3, losses: 1, goalsFor: 2, goalsAgainst: 4, points: 3, form: ["D", "D", "L", "D"] },
  {
    pos: 14,
    team: "Алтай Өскемен",
    short: "АЛТ",
    played: 4,
    wins: 0,
    draws: 3,
    losses: 1,
    goalsFor: 1,
    goalsAgainst: 3,
    points: 3,
    form: ["L", "D", "D", "L"],
    isClub: true
  },
  { pos: 15, team: "Туран", short: "ТУР", played: 4, wins: 0, draws: 2, losses: 2, goalsFor: 2, goalsAgainst: 6, points: 2, form: ["L", "D", "L", "D"] },
  { pos: 16, team: "Ақсу", short: "АҚС", played: 4, wins: 0, draws: 1, losses: 3, goalsFor: 1, goalsAgainst: 7, points: 1, form: ["L", "L", "D", "L"] }
];

export const newsCategories: NewsCategory[] = [
  "Все",
  "Основная команда",
  "Дубль",
  "Женская команда",
  "QJ League",
  "Футбольный центр",
  "Instagram"
];

/**
 * Посты Instagram в ленте новостей. Добавляйте permalink постов (@f.c.altai и др.).
 * Автоподгрузка всей ленты без Instagram Graph API недоступна — список вручную/из CMS.
 *
 * Важно: новые посты добавляйте в КОНЕЦ массива — в сетке они окажутся справа от уже существующих.
 */
export const instagramNewsItems: NewsItem[] = [
  {
    slug: "ig-kaysar-tour-6",
    title: "Новости клуба в Instagram",
    excerpt:
      "6-тур Премьер-лиги: выезд к «Қайсар» — 19 апреля, 19:00, Қызылорда. Краткий анонс в официальном аккаунте @f.c.altai.",
    body:
      "6-тур Премьер-лиги Казахстана: выездной матч в Қызылорда на «Қайсар Арене» — 19 апреля 2026, 19:00. Следите за новостями клуба и полной подписью к посту в Instagram.",
    category: "Instagram",
    date: "19 апреля 2026",
    dateShort: "19 апреля, 2026",
    tag: "@f.c.altai",
    imageGradient: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 45%, #fcb045 100%)",
    coverImageSrc: "/api/instagram-thumb?code=DXJ30TWjA_d",
    coverImageAlt: "Пост ФК «Алтай Өскемен» в Instagram — анонс матча с Қайсар",
    instagramPermalink: "https://www.instagram.com/p/DXJ30TWjA_d/"
  },
  {
    slug: "ig-vpr-astana-2-1",
    title: "🔥 ЖЕҢІІІІС!",
    excerpt:
      "Матч 2-го тура Северо-Восточной конференции Второй лиги Казахстана против «VPR Астана» завершился победой наших ребят. «Алтай Өскемен» Жас 2:1 — голы Тетерина и Брагина.",
    body: `👏🏻 Қазақстан Екінші лигасы Солтүстік-Шығыс конференциясының «VPR Астана» командасына қарсы 2-тур ойыны біздің жігіттердің жеңісімен аяқталды!

«Алтай Өскемен» Жас 2:1 «VPR Астана»
⚽️53' Тетерин
⚽️61' Брагин

#BizdiñJastar`,
    category: "Instagram",
    date: "16 сәуір 2026",
    dateShort: "16 сәуір, 2026",
    tag: "@fcaltai.jastar",
    imageGradient: "linear-gradient(145deg, #1a2040 0%, #4a2860 50%, #1a0a28 100%)",
    coverImageSrc: "/api/instagram-thumb?code=DXJqTmmjIp2",
    coverImageAlt:
      "Жеңіс: «Алтай Өскемен» Жас 2:1 «VPR Астана» — екінші лига, матч посты Instagram",
    instagramPermalink: "https://www.instagram.com/p/DXJqTmmjIp2/"
  },
  {
    slug: "ig-birthday-andrey-pavlovich",
    title: "🥳 Құттықтаймыз, Андрей Павлович!",
    excerpt:
      "От имени ФК «Алтай Өскемен» поздравляем Андрея Павловича с днём рождения и благодарим за поддержку развития детско-юношеского футбола.",
    body: `Құрметті Андрей Павлович! 🙌🏻

Сізді «Алтай Өскемен» футбол клубының атынан туған күніңізбен шын жүректен құттықтаймыз! 🥳

Сіздің қолдауыңыздың арқасында балалар мен жасөспірімдер футболын дамыту жолында көптеген игі жұмыстар атқарылды. Көшбасшылық қасиетіңіз бен адамдарды біріктіре білуіңіз зор құрметке лайық.

Сеніміңіз бен әріптестігіңіз үшін алғыс білдіреміз.

Сізге мықты денсаулық, бақ-береке, сарқылмас қуат және ұзақ ғұмыр тілейміз! 🫂

______

Уважаемый Андрей Павлович! 🙌🏻

От имени футбольного клуба «Алтай Өскемен» искренне поздравляем Вас с днем рождения! 🥳

Благодаря Вашей поддержке и активной позиции реализовано немало полезных инициатив во благо развития детско-юношеского футбола. Ваш профессионализм, лидерские качества и умение объединять людей вызывают большое уважение.

Благодарим Вас за доверие и сотрудничество.

Желаем Вам крепкого здоровья, благополучия, неиссякаемой энергии и долгих счастливых лет жизни! 🫂`,
    category: "Instagram",
    date: "17 сәуір 2026",
    dateShort: "17 сәуір, 2026",
    tag: "@f.c.altai",
    imageGradient: "linear-gradient(135deg, #2a1530 0%, #c41e3a 40%, #1a1020 100%)",
    coverImageSrc: "/api/instagram-thumb?code=DXL_8zdjIMb",
    coverImageAlt:
      "Поздравление с днём рождения Андрею Павловичу — пост ФК «Алтай Өскемен» в Instagram",
    instagramPermalink: "https://www.instagram.com/p/DXL_8zdjIMb/"
  },
  {
    slug: "ig-kaysar-away-prep-snow",
    title: "Қайсарға дайындық 🫡🔥",
    excerpt:
      "Несмотря на апрельский снег, команда продолжает подготовку к «Қайсар». Завтра выезд в Қызылорда; матч 19 апреля, 19:00, «Қайсар Арена».",
    body: `Сәуірде жауған қарға қарамастан «Қайсарға» дайындығымызды жалғастырып жатырмыз 🫡🔥

Ертең команда Қызылордаға аттанады. «Қайсар» – «Алтай Өскемен» ойыны 19 сәуір күні 19:00-де «Қайсар Аренада» өтеді.

#BizdiñAltai`,
    category: "Instagram",
    date: "18 сәуір 2026",
    dateShort: "18 сәуір, 2026",
    tag: "@f.c.altai",
    imageGradient: "linear-gradient(155deg, #0f2840 0%, #1e5090 42%, #0a1628 100%)",
    coverImageSrc: "/api/instagram-thumb?code=DXMR3J6DOOo",
    coverImageAlt:
      "ФК «Алтай Өскемен» — подготовка к выездному матчу с «Қайсар», пост в Instagram",
    instagramPermalink: "https://www.instagram.com/p/DXMR3J6DOOo/"
  },
  {
    slug: "ig-qozy-korpesh-lovers-day",
    title: "Қозы-Көрпеш & Баян Сұлу 💕",
    excerpt:
      "Поздравление с днём влюблённых от ФК «Алтай Өскемен»: Қозы-Көрпеш пен Баян Сұлу — ғашықтар күнімен!",
    body: `Қозы-Көрпеш & Баян Сұлу — ғашықтар күнімен! ❤️👩🏼‍❤️‍👨🏻

#BizdiñAltai #BizdiñGashyqtar`,
    category: "Instagram",
    date: "20 сәуір 2026",
    dateShort: "20 сәуір, 2026",
    tag: "@f.c.altai",
    imageGradient: "linear-gradient(145deg, #3a1020 0%, #c02048 50%, #1a0a18 100%)",
    coverImageSrc: "/api/instagram-thumb?code=DXJFW5KjGvd",
    coverImageAlt: "ФК «Алтай Өскемен» — поздравление с днём влюблённых, Instagram",
    instagramPermalink: "https://www.instagram.com/p/DXJFW5KjGvd/"
  },
  {
    slug: "ig-dragan-debut-goal-ulytau",
    title: "Debut goal — Драган Стойсавлевич 🔥",
    excerpt:
      "Дебютный гол нападающего Драгана Стойсавлевича в ворота «Ұлытау» в матче Премьер-лиги.",
    body: `𝑫𝒆𝒃𝒖𝒕 𝑮𝒐𝒂𝒍 🔥🏹

Шабуылшымыз Драган Стойсавлевичтің «Ұлытау» қақпасына соққан голы ⚽️

#BizdiñAltai`,
    category: "Instagram",
    date: "21 сәуір 2026",
    dateShort: "21 сәуір, 2026",
    tag: "@f.c.altai",
    imageGradient: "linear-gradient(160deg, #0a2040 0%, #e04020 45%, #050a14 100%)",
    coverImageSrc: "/api/instagram-thumb?code=DXFJg3LjG7d",
    coverImageAlt: "Дебютный гол Драгана Стойсавлевича — ФК «Алтай Өскемен», Instagram",
    instagramPermalink: "https://www.instagram.com/p/DXFJg3LjG7d/"
  },
  {
    slug: "ig-kpl-tour5-stats-ulytau",
    title: "Статистика 5-тура: «Алтай» — «Ұлытау»",
    excerpt:
      "КПЛ, 5-тур: ключевые статистические показатели матча «Алтай Өскемен» — «Ұлытау» (1:2) в Алматы.",
    body: `📊 ҚПЛ 5-тур матчының басты статистикалық деректері

______

Основные статистические данные игры 5-тура КПЛ

Қазақстан Премьер-лигасы | 5-тур: «Алтай» – «Ұлытау» (1:2)

#BizdiñAltai`,
    category: "Instagram",
    date: "22 сәуір 2026",
    dateShort: "22 сәуір, 2026",
    tag: "@f.c.altai",
    imageGradient: "linear-gradient(135deg, #102040 0%, #3060a0 50%, #0a1428 100%)",
    coverImageSrc: "/api/instagram-thumb?code=DXE4UQMDFZU",
    coverImageAlt: "Статистика матча «Алтай» — «Ұлытау», 5-тур КПЛ, Instagram",
    instagramPermalink: "https://www.instagram.com/p/DXE4UQMDFZU/"
  },
  {
    slug: "ig-motm-kokayev-ulytau",
    title: "MOTM — Жаннұр Көкеев 🌟",
    excerpt:
      "Игрок матча 5-тура против «Ұлытау» — Жаннұр Көкеев. Пост @f.c.altai и Kazzinc.",
    body: `𝑴𝑶𝑻𝑴 🌟

«Ұлытауға» қарсы 5-тур ойынының үздік ойыншысы – Жаннұр Көкеев

@kazzinc_official | #BizdiñAltai`,
    category: "Instagram",
    date: "23 сәуір 2026",
    dateShort: "23 сәуір, 2026",
    tag: "@f.c.altai",
    imageGradient: "linear-gradient(125deg, #1a2048 0%, #f0a818 35%, #0d1020 100%)",
    coverImageSrc: "/api/instagram-thumb?code=DXCLqZdjPV4",
    coverImageAlt: "Жаннұр Көкеев — игрок матча против «Ұлытау», Instagram",
    instagramPermalink: "https://www.instagram.com/p/DXCLqZdjPV4/"
  },
  {
    slug: "ig-tarasov-cup-win-ulytau-next",
    title: "Евгений Тарасов — о победе в Кубке и матче с «Ұлытау»",
    excerpt:
      "Тренер-аналитик Евгений Тарасов поздравил болельщиков с победой и выходом в следующий этап Кубка РК; через два дня — подготовка к «Ұлытау».",
    body: `🎙️ «Жанкүйерлерімізді жеңіспен және келесі кезеңге өтуімізбен құттықтаймын! Ендігі кезекте ойыншыларымызды 2 күннен кейінгі «Ұлытауға» қарсы матчқа дайындаймыз»

Командамыздың сарапшы-бапкері Тарасов Евгений Александрович ойын жайлы өз пікірімен бөлісті

______

🎙️ «Поздравляю наших болельщиков с победой и выходом в следующий этап! Теперь будем готовить команду к матчу против «Ұлытау», который состоится через 2 дня».

Тренер-аналитик нашей команды Евгений Александрович Тарасов поделился своим мнением об игре.

#BizdiñAltai`,
    category: "Instagram",
    date: "24 сәуір 2026",
    dateShort: "24 сәуір, 2026",
    tag: "@f.c.altai",
    imageGradient: "linear-gradient(140deg, #1a1830 0%, #402060 50%, #0c0818 100%)",
    coverImageSrc: "/api/instagram-thumb?code=DW6L1sEjOwz",
    coverImageAlt: "Евгений Тарасов — комментарий после кубковой победы, Instagram",
    instagramPermalink: "https://www.instagram.com/reel/DW6L1sEjOwz/"
  },
  {
    slug: "ig-cup-oral-zhelaev-nan-0-2",
    title: "Кубок РК: «Желаев Нан» 0:2 «Алтай Өскемен»",
    excerpt:
      "Победа в Орал и выход в следующий раунд Кубка Казахстана. Голы на 15-й и 54-й минутах — Мичевич и Шмидт.",
    body: `Оралда жеңіске жетіп, ҚР Кубогының келесі кезеңіне өттік 🏆

«Желаев Нан» 0:2 «Алтай Өскемен»

⚽️ 15' Мичевич
⚽️ 54' Шмидт

#BizdiñAltai`,
    category: "Instagram",
    date: "25 сәуір 2026",
    dateShort: "25 сәуір, 2026",
    tag: "@f.c.altai",
    imageGradient: "linear-gradient(150deg, #0a2840 0%, #c81e28 48%, #050a12 100%)",
    coverImageSrc: "/api/instagram-thumb?code=DW6JmG0jNDD",
    coverImageAlt: "Кубок Казахстана: «Желаев Нан» — «Алтай Өскемен» 0:2, Instagram",
    instagramPermalink: "https://www.instagram.com/p/DW6JmG0jNDD/"
  },
  {
    slug: "ig-cup-stats-zhelaev-nan-altai",
    title: "Статистика кубка: «Желаев Нан» — «Алтай» (0:2)",
    excerpt:
      "1/16 финала Olimpbet Кубка Казахстана: основные статистические показатели матча в Орал.",
    body: `📊 Кубоктық ойындағы басты статистикалық деректер

______

Основные статистические данные Кубковой встречи

Olimpbet Қазақстан Кубогы | 1/16 финал: «Желаев Нан» – «Алтай» (0:2)

#BizdiñAltai`,
    category: "Instagram",
    date: "26 сәуір 2026",
    dateShort: "26 сәуір, 2026",
    tag: "@f.c.altai",
    imageGradient: "linear-gradient(135deg, #102038 0%, #284878 45%, #060a14 100%)",
    coverImageSrc: "/api/instagram-thumb?code=DW6LWDQDN8J",
    coverImageAlt: "Статистика кубкового матча «Желаев Нан» — «Алтай», Instagram",
    instagramPermalink: "https://www.instagram.com/p/DW6LWDQDN8J/"
  },
  {
    slug: "ig-team-oral",
    title: "TEAM 👊🏻",
    excerpt:
      "Пост «команда» из Орал — материал @f.c.altai после кубкового тура.",
    body: `𝑻 𝑬 𝑨 𝑴 👊🏻`,
    category: "Instagram",
    date: "27 сәуір 2026",
    dateShort: "27 сәуір, 2026",
    tag: "@f.c.altai",
    imageGradient: "linear-gradient(160deg, #181028 0%, #3a2048 55%, #080510 100%)",
    coverImageSrc: "/api/instagram-thumb?code=DW6ERQXjC7A",
    coverImageAlt: "Команда ФК «Алтай Өскемен» — Орал, Instagram",
    instagramPermalink: "https://www.instagram.com/p/DW6ERQXjC7A/"
  }
];

/** Редакционные материалы. Новые — в конец массива (правее в общей ленте после блока Instagram). */
export const newsItems: NewsItem[] = [];

/**
 * Общая лента: все Instagram (слева направо — по мере добавления в массив), затем все редакционные.
 * Новый Instagram-пост — в конец `instagramNewsItems`; новая статья — в конец `newsItems`.
 */
export const allNewsItems: NewsItem[] = [...instagramNewsItems, ...newsItems];

export function getNewsItemBySlug(slug: string): NewsItem | undefined {
  return allNewsItems.find((item) => item.slug === slug);
}

export const clubHighlights = [
  {
    title: "Современная идентичность",
    description:
      "Клуб строит образ вокруг силы региона, горного характера и чистой, узнаваемой эстетики."
  },
  {
    title: "Игровая философия",
    description:
      "Акцент на смелом первом пасе, интенсивности без мяча и быстром продвижении через фланги."
  },
  {
    title: "Система роста",
    description:
      "Основа, дубль, академия и QJ League связаны единым методическим контуром."
  }
];

/** История клуба — тексты для страницы /club/history. */
export const clubHistoryTimeline = [
  {
    year: "2024",
    title: "ФК «Алтай Өскемен»: лицензия, Премьер-лига и инфраструктура",
    paragraphs: [
      "В 2024 году, после смены руководства клуба и при поддержке Управления физической культуры и спорта Восточно-Казахстанской области, был создан футбольный клуб «Алтай Өскемен». Организация успешно прошла лицензирование; основная команда закрепилась в национальном чемпионате и выступает в Премьер-лиге Казахстана.",
      "Клуб стал точкой притяжения для любителей футбола: проходили матчи, встречи с болельщиками и другие мероприятия, что поддержало рост интереса к спорту в регионе.",
      "Приоритетом стало развитие детско-юношеского направления. Для юных игроков созданы условия для обучения и роста. Около 500 детей были обеспечены спортивной экипировкой — это укрепило мотивацию и качество тренировочного процесса.",
      "На стадионе установлено новое табло. Запасное поле приведено в порядок: обновлены места для зрителей, смонтированы защитные сетки — повышена безопасность на тренировках и играх.",
      "В рамках проекта «Алан» состоялась замена покрытия поля на новое итальянского качества — это заметно улучшило условия для занятий и соревнований.",
      "Воспитанники футбольного центра и игроки основных команд участвуют в жизни города: поддерживают социальные и благотворительные инициативы, укрепляя связь клуба с местным сообществом.",
      "ФК «Алтай Өскемен» последовательно развивает футбольную культуру в регионе и создаёт условия для новых спортивных достижений."
    ]
  },
  {
    year: "2025",
    title: "Филиал футбольного центра в городе Алтай",
    paragraphs: [
      "В 2025 году футбольный клуб «Алтай Өскемен» открыл официальный филиал футбольного центра в городе Алтай. Это укрепило позицию клуба как регионального лидера и ключевого участника развития массового футбола.",
      "Филиал расширяет географию присутствия бренда и повышает его узнаваемость среди молодёжи и спортивного сообщества. Выстраивается единая система подготовки игроков; больше детей и подростков из отдалённых районов области могут системно заниматься футболом."
    ]
  }
];

/** Страница /club/region-football-history — тексты RU/KK. */
export type RegionFootballHistorySection = {
  id: string;
  title: { ru: string; kk: string };
  paragraphs: { ru: string[]; kk: string[] };
  bulletTitle?: { ru: string; kk: string };
  bullets?: { ru: string[]; kk: string[] };
};

export const regionFootballHistorySections: RegionFootballHistorySection[] = [
  {
    id: "origins",
    title: {
      ru: "Зарождение футбола в Усть-Каменогорске",
      kk: "Өскеменде футболдың қалыптасуы"
    },
    paragraphs: {
      ru: [
        "Футбол в Усть-Каменогорске (ныне — Өскемен) начал развиваться ещё в советский период — примерно в 1930–1940-х годах. Игра носила любительский характер: команды создавались при заводах, шахтах и учебных заведениях. Особую роль сыграли крупные предприятия города, в том числе металлургические комбинаты, где формировались первые коллективы."
      ],
      kk: [
        "Усть-Каменогорскте (қазіргі Өскемен) футбол Кеңес кезеңінде, шамамен 1930–1940-жылдары дамыған. Ойын әуесқой сипатта болды: командалар зауыттарда, кен орындарында және оқу орындарында құрылды. Қаладағы ірі кәсіпорындар, соның ішінде металлургия комбинаттары алғашқы ұжымдардың негізін қалауда ерекше рөл атқарды."
      ]
    }
  },
  {
    id: "soviet",
    title: {
      ru: "Советский период",
      kk: "Кеңес кезеңі"
    },
    paragraphs: {
      ru: [
        "В 1960–1980-х годах футбол стал более организованным. Главной командой региона стал клуб «Восток»: он представлял город на уровне союзных соревнований (низшие лиги СССР). В это время активно развивалась детско-юношеская школа, что позволило готовить местных игроков."
      ],
      kk: [
        "1960–1980-жылдары футбол ұйымдасқан сипат алды. Өңірдің басты командасы — «Шығыс» (Восток) клубы болды: ол қалады Одақтық жарыстардың төменгі лигаларында өкіл етті. Сол кезеңде балалар мен жастар мектебі белсенді дамыды, ол жергілікті ойыншыларды даярлауға мүмкіндік берді."
      ]
    }
  },
  {
    id: "independence",
    title: {
      ru: "После распада СССР (1991–2000-е)",
      kk: "КСРО ыдырағаннан кейін (1991–2000-жылдар)"
    },
    paragraphs: {
      ru: [
        "После обретения независимости Казахстаном в 1991 году началась новая эпоха. Клуб «Восток» стал участником чемпионата Казахстана. Команду считали крепким середняком и регулярно конкурировавшим с ведущими клубами страны."
      ],
      kk: [
        "1991 жылы Қазақстан тәуелсіздік алғаннан кейін жаңа дәуір басталды. «Шығыс» клубы Қазақстан чемпионатының қатысушысы болды. Команда мықты ортақ командалардың бірі болып есептеліп, елдің жетекші клубтарымен тұрақты бәсекелестік жүргізді."
      ]
    },
    bulletTitle: {
      ru: "Главные достижения",
      kk: "Негізгі жетістіктер"
    },
    bullets: {
      ru: [
        "Бронза чемпионата Казахстана (1997) — лучший результат в истории клуба",
        "Участие в еврокубках (в том числе Кубок УЕФА)"
      ],
      kk: [
        "Қазақстан чемпионатының қола жүлдесі (1997) — клуб тарихындағы ең жақсы нәтиже",
        "Еуропа кубоктарындағы қатысу (соның ішінде УЕФА Кубогы)"
      ]
    }
  },
  {
    id: "today",
    title: {
      ru: "Сегодня",
      kk: "Бүгін"
    },
    paragraphs: {
      ru: [
        "Сейчас «Алтай Өскемен» — главный футбольный бренд города и ключевой представитель региона в Премьер-лиге Казахстана."
      ],
      kk: [
        "Бүгінде «Алтай Өскемен» — қаланың басты футбол бренді және Қазақстан Премьер-лигасында өңірдің негізгі өкілі."
      ]
    },
    bulletTitle: {
      ru: "Основные задачи клуба",
      kk: "Клубтың негізгі міндеттері"
    },
    bullets: {
      ru: [
        "Закрепление в главной лиге страны",
        "Развитие академии",
        "Привлечение болельщиков"
      ],
      kk: [
        "Елдің бас лигасында орнықты болу",
        "Академияны дамыту",
        "Жанкүйерлерді тарту"
      ]
    }
  }
];

/** Общий телефон линии набора в ФЦ (в дополнение к прямым номерам тренеров). */
export const fcEnrollmentHotline = {
  phoneDisplay: "+7 (777) 639-96-26",
  phoneTel: "tel:+77776399626"
} as const;

export const achievements = [
  { label: "Воспитанников в ФЦ", value: "611" },
  { label: "Детей в экипировке (2024)", value: "~500" },
  { label: "Рост контингента с 2024 г.", value: "+300" },
  { label: "Дивизион основы", value: "Премьер-лига" }
];

export const infrastructure = [
  {
    title: "Стадион",
    description: "Домашняя арена для матчдей-атмосферы, контента и клубных событий."
  },
  {
    title: "Тренировочная база",
    description: "Поля, recovery-зона, аналитический штаб и видеокомната для разбора."
  },
  {
    title: "Медиа-студия",
    description: "Съемка интервью, предматчевых выпусков, репортажей и клубных форматов."
  },
  {
    title: "VAR-комната",
    description:
      "Техническое помещение для системы видеопомощи арбитрам в соответствии с регламентами проведения официальных матчей."
  }
];

export const squadGroups = [
  {
    title: "Основная команда",
    badge: "Флагман",
    description: "Главная витрина клуба и точка синхронизации всей спортивной системы.",
    players: [
      { name: "Әбілқайыр Әлиақбар", role: "Вратарь", number: "35", age: "—" },
      { name: "Сапарғалиев Ануар", role: "Вратарь", number: "1", age: "—" },
      { name: "Коновалов Иван", role: "Вратарь", number: "13", age: "—" },
      { name: "Иванов Сергей", role: "Защитник", number: "88", age: "—" },
      { name: "Кан Гаврил", role: "Защитник", number: "7", age: "—" },
      { name: "Кенжеғұлов Досжан", role: "Защитник", number: "23", age: "—" },
      { name: "Шмидт Дмитрий", role: "Защитник", number: "15", age: "—" },
      { name: "Реджепов Тимур", role: "Защитник", number: "6", age: "—" },
      { name: "Одеоибо Самуэль", role: "Защитник", number: "32", age: "—" },
      { name: "Мичевич Неманья", role: "Защитник", number: "4", age: "—" },
      { name: "Көкеев Жаннұр", role: "Полузащитник", number: "17", age: "—" },
      { name: "Тетерин Артем", role: "Полузащитник", number: "46", age: "—" },
      { name: "Гультяев Захар", role: "Полузащитник", number: "19", age: "—" },
      { name: "Дадаев Ибрагим", role: "Полузащитник", number: "11", age: "—" },
      { name: "Жанұзақов Аслан", role: "Полузащитник", number: "22", age: "—" },
      { name: "Сапарғалиев Алмас", role: "Полузащитник", number: "8", age: "—" },
      { name: "Ямбор Никола", role: "Полузащитник", number: "30", age: "—" },
      { name: "Назымханов Абылайхан", role: "Полузащитник", number: "18", age: "—" },
      { name: "Сайлыбаев Ораз", role: "Полузащитник", number: "5", age: "—" },
      { name: "Горшунов Елисей", role: "Полузащитник", number: "9", age: "—" },
      { name: "Омарбек Әділет", role: "Нападающий", number: "10", age: "—" },
      { name: "Попов Сэйф", role: "Нападающий", number: "77", age: "—" },
      { name: "Хижниченко Сергей", role: "Нападающий", number: "91", age: "—" },
      { name: "Стоисавлевич Драган", role: "Нападающий", number: "99", age: "—" },
      { name: "Масудов Юнус", role: "Нападающий", number: "16", age: "—" },
      { name: "Митрофанов Денис", role: "Нападающий", number: "70", age: "—" }
    ]
  },
  {
    title: "Дубль",
    badge: "Резерв",
    description: "Платформа для адаптации молодых игроков к взрослому интенсивному футболу.",
    players: [
      { name: "Санжар Ораз", role: "Вратарь", number: "30", age: "20" },
      { name: "Ержан Калиев", role: "Левый защитник", number: "17", age: "21" },
      { name: "Данияр Сапар", role: "Центральный хавбек", number: "8", age: "19" },
      { name: "Арсен Ермек", role: "Форвард", number: "19", age: "20" }
    ]
  },
  {
    title: "Жас Канат",
    badge: "Academy",
    description: "Молодежный блок с акцентом на технику, тактическую гибкость и характер.",
    players: [
      { name: "Адильхан Муса", role: "Фланговый защитник", number: "22", age: "18" },
      { name: "Рамиль Азамат", role: "Центральный защитник", number: "15", age: "17" },
      { name: "Тимур Абиль", role: "Плеймейкер", number: "11", age: "18" },
      { name: "Елиман Кенес", role: "Нападающий", number: "9", age: "17" }
    ]
  },
  {
    title: "QJ League",
    badge: "Future",
    description: "Соревновательная среда для самых перспективных воспитанников системы.",
    players: [
      { name: "Мирас Бек", role: "Вратарь", number: "41", age: "16" },
      { name: "Алан Серик", role: "Правый защитник", number: "27", age: "16" },
      { name: "Диас Молдахмет", role: "Центральный полузащитник", number: "14", age: "16" },
      { name: "Ерасыл Айтжан", role: "Вингер", number: "7", age: "16" }
    ]
  }
];

function rosterSectionTitle(role: string): string | null {
  const r = role.toLowerCase();
  if (r.includes("вратарь")) return "Вратари";
  if (r.includes("защит")) return "Защитники";
  if (r.includes("нападающ") || r.includes("форвард") || r.includes("вингер")) return "Нападающие";
  if (r.includes("полузащит") || r.includes("инсайд") || r.includes("хавбек") || r.includes("плеймейкер"))
    return "Полузащитники";
  return null;
}

export type RosterSection = {
  title: string;
  players: { name: string; number: string; age: string }[];
};

/** Состав основы, сгруппированный по линиям (для страницы «Состав»). */
export const mainTeamRosterSections: RosterSection[] = (() => {
  const main = squadGroups[0]?.players;
  if (!main) return [];
  const buckets = new Map<string, { name: string; number: string; age: string }[]>();
  for (const p of main) {
    const title = rosterSectionTitle(p.role);
    if (!title) continue;
    const list = buckets.get(title) ?? [];
    list.push({ name: p.name, number: p.number, age: p.age ?? "—" });
    buckets.set(title, list);
  }
  const order = ["Вратари", "Защитники", "Полузащитники", "Нападающие"];
  return order
    .filter((t) => buckets.has(t))
    .map((title) => ({ title: title.toUpperCase(), players: buckets.get(title)! }));
})();

/** Тренерский штаб основной команды (актуальные данные клуба). */
export const coachStaff = [
  { name: "Вахид Юнусович Масудов", role: "Главный тренер" },
  { name: "Павел Витальевич Удалов", role: "Ассистент тренера" },
  { name: "Вячеслав Александрович Зинюков", role: "Ассистент тренера" },
  { name: "Егор Сергеевич Скулкин", role: "Тренер по физической подготовке" },
  { name: "Илья Евгеньевич Байтеряков", role: "Тренер по подготовке вратарей" },
  { name: "Тарасов Евгений Александрович", role: "Тренер-аналитик" }
];

/** Капитаны основной команды (порядок приоритета). */
export const mainTeamCaptains = [
  { order: 1, name: "Сергей Хижниченко" },
  { order: 2, name: "Дмитрий Шмидт" },
  { order: 3, name: "Алмас Сапарғалиев" }
];

/** Результаты дубля (ТЗ п.4). */
export const reserveResults = [
  {
    date: "29 марта 2026",
    tournament: "Резерв · Премьер-лига",
    home: "Алтай Өскемен II",
    away: "FK Turan II",
    score: "2:2",
    venue: "Өскемен",
    protocolPdf: DEMO_PDF_URL
  },
  {
    date: "22 марта 2026",
    tournament: "Товарищеский матч",
    home: "Алтай Өскемен II",
    away: "Academy Select",
    score: "1:0",
    venue: "Тренировочная база",
    protocolPdf: DEMO_PDF_URL
  }
];

/** Турнир женской команды (ТЗ п.5). */
export const womenStandings = [
  {
    pos: 1,
    team: "FC Pavlodar W",
    played: 6,
    wins: 5,
    draws: 0,
    losses: 1,
    goalsFor: 14,
    goalsAgainst: 5,
    points: 15,
    isClub: false
  },
  {
    pos: 2,
    team: "Алтай Өскемен (әйелдер)",
    played: 5,
    wins: 4,
    draws: 1,
    losses: 0,
    goalsFor: 12,
    goalsAgainst: 3,
    points: 13,
    isClub: true
  },
  {
    pos: 3,
    team: "FC Semey W",
    played: 6,
    wins: 3,
    draws: 2,
    losses: 1,
    goalsFor: 9,
    goalsAgainst: 6,
    points: 11,
    isClub: false
  }
];

/** Турнирная таблица QJ League (ТЗ п.6). */
export const qjStandings = [
  { pos: 1, team: "Academy East", played: 8, points: 19, isClub: false },
  { pos: 2, team: "Алтай Өскемен U17", played: 8, points: 17, isClub: true },
  { pos: 3, team: "Youth South", played: 8, points: 15, isClub: false },
  { pos: 4, team: "Regional Select", played: 8, points: 12, isClub: false }
];

export const matchItems: MatchItem[] = [
  {
    status: "upcoming",
    date: "9 мая",
    tournament: "Премьер-лига",
    tour: 9,
    dateLong: {
      ru: "сб, 9 мая 2026 г.",
      kk: "сенбі, 2026 ж. 9 мам."
    },
    home: "Алтай Өскемен",
    away: "Ордабасы",
    score: "18:00",
    venue: "Стадион «Восток», Өскемен",
    weather: "+18°C, Ясно",
    kffMatchUrl: "https://kffleague.kz/ru/matches/950",
    kffYoutubeUrl: "https://www.youtube.com/@KFFKazakhstan",
    homeLogoUrl: "/logo.png",
    awayLogoUrl: "/teams/ordabasy.webp"
  },
  {
    status: "result" as MatchStatus,
    date: "05 апреля",
    tournament: "Премьер-лига · 4 тур",
    home: "Ертіс",
    away: "Алтай Өскемен",
    score: "1:0",
    venue: "Павлодар",
    outcome: "loss" as const,
    resultHighlight: true,
    protocolPdf: DEMO_PDF_URL
  },
  {
    status: "result" as MatchStatus,
    date: "29 марта",
    tournament: "Премьер-лига · 3 тур",
    home: "Алтай Өскемен",
    away: "Каспий",
    score: "0:0",
    venue: "Өскемен",
    outcome: "draw" as const,
    protocolPdf: DEMO_PDF_URL
  },
  {
    status: "result" as MatchStatus,
    date: "22 марта",
    tournament: "Премьер-лига · 2 тур",
    home: "Елімай",
    away: "Алтай Өскемен",
    score: "1:1",
    venue: "Семей",
    outcome: "draw" as const,
    protocolPdf: DEMO_PDF_URL
  },
  {
    status: "result" as MatchStatus,
    date: "15 марта",
    tournament: "Премьер-лига · 1 тур",
    home: "Алтай Өскемен",
    away: "Қайрат",
    score: "0:1",
    venue: "Өскемен",
    outcome: "loss" as const,
    protocolPdf: DEMO_PDF_URL
  }
];

export const mediaItems = [
  {
    type: "photo" as MediaType,
    title: "Matchday gallery: ночной свет и полный сектор",
    description: "Лучшие кадры с домашнего вечера и прематч-перформанса.",
    accent: "Лента кадров"
  },
  {
    type: "video" as MediaType,
    title: "Inside Altai: раздевалка перед стартовым свистком",
    description: "Короткий документальный выпуск о ритуалах и настрое команды.",
    accent: "Видео"
  },
  {
    type: "photo" as MediaType,
    title: "Тренировка недели",
    description: "Интенсив, завершения атак и детали работы штаба на базе.",
    accent: "Фотосет"
  },
  {
    type: "video" as MediaType,
    title: "Интервью с главным тренером",
    description: "Про стиль игры, структуру сезона и развитие молодых игроков.",
    accent: "Интервью"
  }
];

export const partnerTiers = [
  {
    title: "Титульный партнер",
    description: "Максимальная интеграция в матчдей, digital и ключевые клубные форматы."
  },
  {
    title: "Официальный партнер",
    description: "Сильная медиа-видимость, спецпроекты и присутствие на страницах команды."
  },
  {
    title: "Технический партнер",
    description: "Совместные активации вокруг экипировки, аналитики, recovery и контента."
  }
];

/** Карточка в разделе «Документы»: подписи на русском и казахском. */
export type DocumentCardItem = {
  title: { ru: string; kk: string };
  description: { ru: string; kk: string };
  format: string;
  pdfUrl: string;
};

export const documents: DocumentCardItem[] = [
  {
    title: { ru: "Финансовая отчётность 2025", kk: "Қаржылық есептілік 2025" },
    description: {
      ru: "Документ финансовой отчётности за 2025 год.",
      kk: "2025 жылғы қаржылық есептілік құжаты."
    },
    format: "PDF",
    pdfUrl: "/api/docs/karzhylyq-esepilik-2025"
  },
  {
    title: { ru: "Учредительные документы", kk: "Құрылу құжаттары" },
    description: {
      ru: "Устав, свидетельство о регистрации и базовый комплект юридических файлов.",
      kk: "Жарғы, тіркеу куәлігі және заңды құжаттардың негізгі жиынтығы."
    },
    format: "PDF",
    pdfUrl: DEMO_PDF_URL
  },
  {
    title: { ru: "Лицензионные документы", kk: "Лицензиялық құжаттар" },
    description: {
      ru: "Лицензирование и документы в соответствии с требованиями федераций и профильных регламентов.",
      kk: "Федерациялар мен салалық регламенттер талаптарына сәйкес лицензиялау және құжаттар."
    },
    format: "PDF",
    pdfUrl: DEMO_PDF_URL
  },
  {
    title: { ru: "Финансовая отчетность", kk: "Қаржылық есептілік" },
    description: {
      ru: "Набор публичных отчетов по установленным стандартам прозрачности.",
      kk: "Ашықтық стандарттары бойынша жария есептер жинағы."
    },
    format: "PDF",
    pdfUrl: DEMO_PDF_URL
  },
  {
    title: { ru: "Регламентирующие документы", kk: "Регламенттік құжаттар" },
    description: {
      ru: "Кодексы поведения, политика клуба и организационные положения.",
      kk: "Мінез-құлық кодексі, клуб саясатасы және ұйымдастыру ережелері."
    },
    format: "PDF",
    pdfUrl: DEMO_PDF_URL
  }
];

/** Эмблема клуба: `public/logo.png`. */
export const SITE_LOGO_SRC = "/logo.png";

/** Баннер с логотипами партнёров: положите файл в `public/partners.png`. */
export const PARTNERS_BANNER_SRC = "/partners.png";

/** Логотипы партнёров + описание сотрудничества (ТЗ п.18: логотипы и описание). */
export const partnerLogos = [
  {
    name: "Title Partner",
    initials: "TP",
    gradient: "linear-gradient(135deg, #2a1018, #e61e2b55)",
    description:
      "Титульная интеграция: матчдей, digital-наружка и ключевые клубные форматы на весь сезон."
  },
  {
    name: "Regional Bank",
    initials: "RB",
    gradient: "linear-gradient(135deg, #0e1a30, #3d5a90)",
    description: "Финансовый и социальный партнёр региона: совместные проекты с болельщиками и академией."
  },
  {
    name: "Energy+",
    initials: "E+",
    gradient: "linear-gradient(135deg, #1a2e1a, #4a8a4a)",
    description: "Инфраструктурная и медиа-поддержка, бренд присутствует на базе и в матч-трансляциях."
  },
  {
    name: "Sport Pro",
    initials: "SP",
    gradient: "linear-gradient(135deg, #201040, #8060c0)",
    description: "Экипировка и сервис для основного состава и молодёжных команд клуба."
  },
  {
    name: "Auto Drive",
    initials: "AD",
    gradient: "linear-gradient(135deg, #301808, #c05030)",
    description: "Транспортный партнёр: логистика делегаций и видимость бренда на выездных турах."
  },
  {
    name: "Media Net",
    initials: "MN",
    gradient: "linear-gradient(135deg, #081828, #2080b0)",
    description: "Телеком и контент: интервью, обзоры и спецпроекты на платформах партнёра."
  }
];

/** Женская команда (ТЗ п.5). */
export const womenSquad = {
  title: "Женская команда «Алтай Өскемен»",
  tournament:
    "Региональный чемпионат · весенняя фаза 2026. Позиция и календарь обновляются по мере публикации официальных регламентов.",
  calendar: [
    { date: "02 апреля 2026", label: "Домашний матч · тур 3", vs: "vs FC Semey" },
    { date: "09 апреля 2026", label: "Выезд · тур 4", vs: "vs FC Pavlodar" },
    { date: "16 апреля 2026", label: "Домашний матч · тур 5", vs: "vs FC Kokshetau" }
  ],
  players: [
    { name: "Айгерим Сатым", role: "Вратарь", number: "1", age: "24" },
    { name: "Дана Ораз", role: "Центральный защитник", number: "4", age: "22" },
    { name: "Сауле Нурлан", role: "Центральный полузащитник", number: "8", age: "23" },
    { name: "Меруерт Али", role: "Нападающий", number: "10", age: "21" }
  ],
  coaches: [{ name: "Мария Ким", role: "Главный тренер" }]
};

/** Футбольный центр «Алтай Өскемен» — контент с официальных материалов клуба. */
export const footballCenter = {
  introParagraphs: [
    "Футбольный центр «Алтай Өскемен» — опорная структура для развития клуба и регионального футбола. Сегодня здесь системно занимаются более 600 детей; с начала 2024 года контингент вырос более чем на 300 воспитанников.",
    "Для юных игроков важный ориентир — команда «Алтай Өскемен Жастар», укомплектованная местными воспитанниками, с перспективой перехода в основной состав клуба.",
    "В 2024 году около 500 детей получили спортивную экипировку: это поддержало интерес к тренировкам и качество учебно-тренировочного процесса."
  ],
  methodNote:
    "Методический штаб центра усилен: к работе присоединился опытный специалист, лицензированный тренер категории UEFA A-elite — Ефим Николаевич. Под его руководством действует программа повышения квалификации для тренеров, ориентированная на современные подходы в подготовке юных футболистов.",
  groups: [
    {
      title: "Младшие возрастные группы",
      description: "Старт в футболе, координация и игровые форматы малых составов — база для дальнейшего роста в системе центра."
    },
    {
      title: "Средние группы",
      description: "Техника, тактическая грамотность и участие в региональных и республиканских первенствах (ЧРК и др.)."
    },
    {
      title: "Старшие группы и QJ League",
      description: "Подготовка к взрослому ритму, переход в «Алтай Өскемен Жастар» и основной состав клуба."
    }
  ],
  contingentIntro:
    "Общее количество воспитанников футбольного центра составляет 611 спортсменов, разделённых по возрастным категориям:",
  contingentLines: [
    "2008 г.р. — 18 спортсменов (QJ League Liiga B — 5 место из 8 команд).",
    "2009 г.р. — 38 спортсменов (ЧРК — 4 место среди 19 команд).",
    "2010 г.р. — 49 спортсменов (ЧРК — 4 место среди 21 команды).",
    "2011 г.р. — 72 спортсмена (ЧРК — 16 место из 16 команд).",
    "2012 г.р. — 66 спортсменов (ЧРК — 17 место из 22 команд).",
    "2013 г.р. — 73 спортсмена (ЧРК — 9 место из 22 команд).",
    "2014 г.р. — 53 спортсмена.",
    "2015 г.р. — 46 спортсменов.",
    "2016–2017 г.р. — 64 спортсмена.",
    "2007–2016 г.р. (девочки) — 67 спортсменок.",
    "2007–2008 г.р. (девочки) — ЧРК, 6 место из 20 команд.",
    "2009–2010 г.р. (девочки) — ЧРК, 6 место из 20 команд.",
    "2011–2012 г.р. (девочки) — ЧРК, 17 место из 22 команд."
  ],
  branch2025:
    "В 2025 году открыт официальный филиал футбольного центра в городе Алтай — логичное продолжение региональной стратегии клуба; подробности приведены в разделе «История».",
  coaches: [
    {
      name: "Ефим Николаевич",
      role: "Методический штаб, тренер категории UEFA A-elite; программа повышения квалификации тренеров центра"
    }
  ],
  recruitment:
    "Запись в возрастные группы — по телефонам тренеров в таблице ниже. Общий номер для вопросов о наборе в футбольный центр Алтай Өскемен Жастар: +7 (777) 639-96-26. Административные вопросы: f.c.altai@mail.ru; офис: г. Өскемен (Усть-Каменогорск), ул. Добролюбова, 34/2, тел. +7 (777) 246-28-17."
};

/** Телефоны для набора в ФЦ «Алтай Өскемен» (категория — тренер — контакт). */
export const footballCenterEnrollment = [
  { category: "2008 г.р.", coach: "Евтеев П.", phone: "+7 701 314 0098" },
  { category: "2009 г.р.", coach: "Троеглазов И.", phone: "+7 776 426 0000" },
  { category: "2010 г.р.", coach: "Соловьёв С.", phone: "+7 777 907 5775" },
  { category: "2011 г.р.", coach: "Муратов Д.", phone: "+7 775 882 2744" },
  { category: "2012 г.р.", coach: "Аканов Р.", phone: "+7 777 146 9000" },
  { category: "2013 г.р.", coach: "Пустовалов А.", phone: "+7 777 477 8283" },
  { category: "2014 г.р.", coach: "Чесноков И.", phone: "+7 701 900 6506" },
  { category: "2015–2016 г.р.", coach: "Барабанов В.", phone: "+7 777 338 8343" },
  { category: "2017–2018 г.р.", coach: "Мусин Р.", phone: "+7 705 101 3834" },
  { category: "Қыздар 2007–2008 г.р.", coach: "Салкина И.", phone: "+7 705 460 0417" },
  { category: "Қыздар 2009–2010 г.р.", coach: "Эрбес Е.", phone: "+7 705 216 1454" },
  { category: "Қыздар 2011–2012 г.р.", coach: "Несипбаева А.", phone: "+7 705 540 1839" }
];

/** Администрация клуба с фото-заглушками (ТЗ п.12 — фото и должности). */
export const administrationStaff = [
  {
    name: "Ерлан Касымов",
    role: "Президент клуба",
    photoGradient: "linear-gradient(135deg, #1a2838, #4a5060)"
  },
  {
    name: "Асылбек Нуртаз",
    role: "Исполнительный директор",
    photoGradient: "linear-gradient(135deg, #28182050, #e61e2b22)"
  },
  {
    name: "Дина Сарсен",
    role: "Финансовый директор",
    photoGradient: "linear-gradient(135deg, #102030, #205878)"
  }
];

/** Тренерский штаб по командам (ТЗ п.13). */
export const coachesByTeam = [
  { team: "Основная команда", staff: coachStaff },
  {
    team: "Дубль",
    staff: [
      { name: "Быков Антон Евгеньевич", role: "Главный тренер" },
      { name: "Шмидт Евгений Сергеевич", role: "Ассистент главного тренера" },
      { name: "Ярославцев Андрей Александрович", role: "Тренер по подготовке вратарей" }
    ]
  },
  {
    team: "Женская команда",
    staff: womenSquad.coaches
  },
  {
    team: "QJ League",
    staff: [
      { name: "Ефтеев Павел Валерьевич", role: "Главный тренер" },
      { name: "Муратов Дидар Кайратович", role: "Ассистент главного тренера" },
      { name: "Азамат Қайсар", role: "Тренер по физической подготовке" },
      { name: "Павлов Стас", role: "Тренер по подготовке вратарей" }
    ]
  },
  {
    team: "Футбольный центр",
    staff: footballCenter.coaches
  }
];

export const contacts: ContactItem[] = [
  {
    title: "Эл. адрес",
    value: "f.c.altai@mail.ru",
    hint: "Официальная почта клуба и футбольного центра",
    valueHref: "mailto:f.c.altai@mail.ru"
  },
  {
    title: "Контакты офиса",
    value: "+7 (777) 246-28-17",
    hint: "Клубный офис, общие организационные вопросы",
    valueHref: "tel:+77772462817"
  },
  {
    title: "Офис",
    value: "г. Өскемен (Усть-Каменогорск)",
    valueLine2: "ул. Добролюбова, 34/2",
    hint: "Приём болельщиков и направление обращений"
  },
  {
    title: "Набор в футбольный центр Алтай Өскемен Жастар",
    value: "+7 (777) 639-96-26",
    hint: "Единая линия по вопросам зачисления. Прямые контакты тренеров по году рождения — в конце страницы «Футбольный центр»",
    valueHref: "tel:+77776399626"
  }
];

/** Социальные сети клуба. */
export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/f.c.altai?igsh=MTh0Y216NWducjEzMw=="
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@fcaltaioskemen?si=K5MUdWJt8ngj6456"
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@f.c.altai?_r=1&_t=ZS-95JKJKDM8ZM"
  }
];
