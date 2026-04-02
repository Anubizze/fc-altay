/** Категории новостей по ТЗ (п.2). */
export type NewsCategory =
  | "Все"
  | "Основная команда"
  | "Дубль"
  | "Женская команда"
  | "QJ League"
  | "Футбольный центр";

export type MatchStatus = "upcoming" | "result";
export type MediaType = "photo" | "video";

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
    value: "0-2-1",
    sub: "Победы · Ничьи · Поражения",
    accent: false as const
  },
  {
    label: "Голы",
    value: "1-2",
    sub: "Забито · Пропущено",
    accent: false as const
  },
  {
    label: "Место в таблице",
    value: "11",
    sub: "Первая лига Казахстана",
    accent: true as const
  },
  {
    label: "Серия",
    value: "3",
    sub: "Матча подряд без поражений",
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
};

export const leagueStandings: StandingRow[] = [
  { pos: 1, team: "FC Kairat", short: "KRT", played: 5, wins: 4, draws: 1, losses: 0, goalsFor: 12, goalsAgainst: 4, points: 13, form: ["W", "W", "D", "W", "W"] },
  { pos: 2, team: "Ordabasy", short: "ORD", played: 5, wins: 4, draws: 0, losses: 1, goalsFor: 9, goalsAgainst: 5, points: 12, form: ["W", "L", "W", "W", "W"] },
  { pos: 3, team: "Tobol", short: "TOB", played: 5, wins: 3, draws: 2, losses: 0, goalsFor: 8, goalsAgainst: 3, points: 11, form: ["D", "W", "W", "D", "W"] },
  { pos: 4, team: "Aktobe", short: "AKT", played: 5, wins: 3, draws: 1, losses: 1, goalsFor: 7, goalsAgainst: 5, points: 10, form: ["W", "W", "L", "D", "W"] },
  { pos: 5, team: "Atyrau", short: "ATY", played: 5, wins: 2, draws: 3, losses: 0, goalsFor: 6, goalsAgainst: 4, points: 9, form: ["D", "D", "W", "W", "D"] },
  {
    pos: 11,
    team: "FC Altai",
    short: "ALT",
    played: 3,
    wins: 0,
    draws: 2,
    losses: 1,
    goalsFor: 3,
    goalsAgainst: 4,
    points: 2,
    form: ["D", "L", "D"],
    isClub: true
  }
];

export const newsCategories: NewsCategory[] = [
  "Все",
  "Основная команда",
  "Дубль",
  "Женская команда",
  "QJ League",
  "Футбольный центр"
];

export const newsItems = [
  {
    title: "FC Altai открывает новую игровую эпоху",
    excerpt:
      "Большой анонс сезона, обновленный визуальный стиль и курс на быструю, смелую игру в атаке.",
    category: "Основная команда" as const,
    date: "30 марта 2026",
    dateShort: "30 марта, 2026",
    tag: "Главное",
    imageGradient: "linear-gradient(160deg, #2a0a14 0%, #e61e2b33 45%, #050a18 100%)"
  },
  {
    title: "Молодежь Altai выходит на новый цикл подготовки",
    excerpt:
      "Дубль и академические группы начинают серию интенсивных сборов и контрольных матчей.",
    category: "Футбольный центр" as const,
    date: "27 марта 2026",
    dateShort: "27 марта, 2026",
    tag: "Центр",
    imageGradient: "linear-gradient(145deg, #0a1a2e 0%, #183050 50%, #050a18 100%)"
  },
  {
    title: "QJ League: фокус на вертикальный прессинг",
    excerpt:
      "Юные игроки клуба разбирают современные игровые модели и готовятся к старту тура.",
    category: "QJ League" as const,
    date: "24 марта 2026",
    dateShort: "24 марта, 2026",
    tag: "QJ League",
    imageGradient: "linear-gradient(200deg, #1a2040 0%, #3d2060 55%, #050a18 100%)"
  },
  {
    title: "Женская команда «Алтай Өскемен» — старт весеннего цикла",
    excerpt:
      "Подготовка к турнирам сезона, контрольные игры и работа с молодыми игроками региона.",
    category: "Женская команда" as const,
    date: "25 марта 2026",
    dateShort: "25 марта, 2026",
    tag: "ЖК",
    imageGradient: "linear-gradient(165deg, #1a1028 0%, #4a1530 50%, #050a18 100%)"
  },
  {
    title: "Дубль усиливает обойму перед серией выездов",
    excerpt:
      "Тренерский штаб тестирует гибридную схему 4-3-3 и расширяет ротацию состава.",
    category: "Дубль" as const,
    date: "21 марта 2026",
    dateShort: "21 марта, 2026",
    tag: "Резерв",
    imageGradient: "linear-gradient(135deg, #0d1528 0%, #1e3a5f 60%, #050a18 100%)"
  },
  {
    title: "Команда провела открытую встречу с болельщиками",
    excerpt:
      "На клубной площадке обсудили сезонные задачи, работу академии и планы по инфраструктуре.",
    category: "Основная команда" as const,
    date: "18 марта 2026",
    dateShort: "18 марта, 2026",
    tag: "Сообщество",
    imageGradient: "linear-gradient(180deg, #251010 0%, #5c1518 40%, #050a18 100%)"
  },
  {
    title: "Altai запускает digital-направление для медиаконтента",
    excerpt:
      "Новый продакшн-подход объединяет быстрые репортажи, интервью и премиальные фотосессии.",
    category: "Футбольный центр" as const,
    date: "15 марта 2026",
    dateShort: "15 марта, 2026",
    tag: "Медиа",
    imageGradient: "linear-gradient(120deg, #0f1c35 0%, #2a4a6a 50%, #050a18 100%)"
  }
];

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
    title: "ФК «Алтай Өскемен»: лицензия, Первая лига и инфраструктура",
    paragraphs: [
      "В 2024 году, после смены руководства клуба и при поддержке Управления физической культуры и спорта Восточно-Казахстанской области, был создан футбольный клуб «Алтай Өскемен». Организация успешно прошла лицензирование; основная команда допущена к розыгрышу Первой лиги чемпионата Казахстана — второго по силе дивизиона страны.",
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

/** Общий телефон линии набора в ФЦ (в дополнение к прямым номерам тренеров). */
export const fcEnrollmentHotline = {
  phoneDisplay: "+7 (705) 522-76-66",
  phoneTel: "tel:+77055227666"
} as const;

export const achievements = [
  { label: "Воспитанников в ФЦ", value: "611" },
  { label: "Детей в экипировке (2024)", value: "~500" },
  { label: "Рост контингента с 2024 г.", value: "+300" },
  { label: "Дивизион основы", value: "Первая лига" }
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
      { name: "Айдос Куат", role: "Вратарь", number: "1", age: "26" },
      { name: "Руслан Сатпаев", role: "Центральный защитник", number: "4", age: "24" },
      { name: "Нуржан Тлеуов", role: "Опорный полузащитник", number: "6", age: "23" },
      { name: "Марат Бекетаев", role: "Инсайд", number: "10", age: "22" },
      { name: "Данияр Олжас", role: "Нападающий", number: "9", age: "21" }
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
  { name: "Илья Евгеньевич Байтеряков", role: "Тренер по подготовке вратарей" }
];

/** Результаты дубля (ТЗ п.4). */
export const reserveResults = [
  {
    date: "29 марта 2026",
    tournament: "Резерв · Первая лига",
    home: "FC Altai II",
    away: "FK Turan II",
    score: "2:2",
    venue: "Өскемен",
    protocolPdf: DEMO_PDF_URL
  },
  {
    date: "22 марта 2026",
    tournament: "Товарищеский матч",
    home: "FC Altai II",
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
    team: "FC Altai Women",
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
  { pos: 2, team: "FC Altai U17", played: 8, points: 17, isClub: true },
  { pos: 3, team: "Youth South", played: 8, points: 15, isClub: false },
  { pos: 4, team: "Regional Select", played: 8, points: 12, isClub: false }
];

export const matchItems = [
  {
    status: "upcoming" as MatchStatus,
    date: "05 апреля",
    tournament: "Первая лига",
    home: "FC Altai",
    away: "FK Aksu",
    score: "19:00",
    venue: "Оскемен"
  },
  {
    status: "upcoming" as MatchStatus,
    date: "11 апреля",
    tournament: "Кубок Казахстана",
    home: "FC Altai",
    away: "Taraz",
    score: "18:30",
    venue: "Оскемен"
  },
  {
    status: "result" as MatchStatus,
    date: "28 марта",
    tournament: "Товарищеский матч",
    home: "FC Altai",
    away: "Ekibastuz",
    score: "2:1",
    venue: "Алматы",
    outcome: "win" as const,
    resultHighlight: true,
    protocolPdf: DEMO_PDF_URL
  },
  {
    status: "result" as MatchStatus,
    date: "22 марта",
    tournament: "Товарищеский матч",
    home: "FC Altai",
    away: "Zhenis",
    score: "1:1",
    venue: "Шымкент",
    outcome: "draw" as const,
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

export const documents = [
  {
    title: "Учредительные документы",
    description: "Устав, свидетельство о регистрации и базовый комплект юридических файлов.",
    format: "PDF",
    pdfUrl: DEMO_PDF_URL
  },
  {
    title: "Лицензионные документы",
    description:
      "Лицензирование и документы в соответствии с требованиями федераций и профильных регламентов.",
    format: "PDF",
    pdfUrl: DEMO_PDF_URL
  },
  {
    title: "Финансовая отчетность",
    description: "Набор публичных отчетов по установленным стандартам прозрачности.",
    format: "PDF",
    pdfUrl: DEMO_PDF_URL
  },
  {
    title: "Регламентирующие документы",
    description: "Кодексы поведения, политика клуба и организационные положения.",
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
    "Запись в возрастные группы — по телефонам тренеров в таблице ниже. Общий номер для вопросов о наборе в футбольный центр: +7 (705) 522-76-66. Административные вопросы: f.c.altai@mail.ru, офис клуба +7 (776) 412-04-01."
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
      { name: "Виктор Поляков", role: "Главный тренер дубля" },
      { name: "Арман Сериков", role: "Тренер вратарей" }
    ]
  },
  {
    team: "Женская команда",
    staff: womenSquad.coaches
  },
  {
    team: "QJ League",
    staff: [{ name: "Санжар Мелис", role: "Ответственный за развитие QJ" }]
  },
  {
    team: "Футбольный центр",
    staff: footballCenter.coaches
  }
];

export type ContactItem = {
  title: string;
  value: string;
  hint: string;
  valueHref?: string;
};

export const contacts: ContactItem[] = [
  {
    title: "Эл. адрес",
    value: "f.c.altai@mail.ru",
    hint: "Официальная почта клуба и футбольного центра",
    valueHref: "mailto:f.c.altai@mail.ru"
  },
  {
    title: "Номер офиса",
    value: "+7 (776) 412-04-01",
    hint: "Клубный офис, общие организационные вопросы",
    valueHref: "tel:+77764120401"
  },
  {
    title: "Клубный офис",
    value: "г. Өскемен (Усть-Каменогорск), пр. Абая, 118",
    hint: "Приём болельщиков и направление обращений"
  },
  {
    title: "Набор в футбольный центр",
    value: "+7 (705) 522-76-66",
    hint: "Единая линия по вопросам зачисления. Прямые контакты тренеров по году рождения — в конце страницы «Футбольный центр»",
    valueHref: "tel:+77055227666"
  }
];

/** Социальные сети (ТЗ п.11 — ссылки; подставьте боевые URL). */
export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" }
];
