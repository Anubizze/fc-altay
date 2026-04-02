import type { AppLocale } from "@/shared/lib/locale-path";

export type PageIntro = {
  eyebrow: string;
  title: string;
  description: string;
};

export type Dictionary = {
  location: string;
  brandSubtitle: string;
  nav: {
    home: string;
    /** Пункт ведёт на портал «Клуб» по брифу (ТЗ: раздел Клуб). */
    club: string;
    aboutClub: string;
    clubSports: string;
    news: string;
    schedule: string;
    results: string;
    table: string;
    squad: string;
    contacts: string;
    media: string;
    partners: string;
    documents: string;
    admin: string;
    extrasAria: string;
  };
  clubAbout: {
    history: string;
    achievements: string;
    infrastructure: string;
    contacts: string;
  };
  clubTeams: {
    main: string;
    reserve: string;
    women: string;
    qj: string;
    center: string;
  };
  teamSection: {
    roster: string;
    administration: string;
    coaching: string;
  };
  news: {
    all: string;
    main: string;
    reserve: string;
    women: string;
    qj: string;
    center: string;
  };
  langAria: string;
  home: {
    newsSlider: string;
    nextMatch: string;
    latestNews: string;
    tableBlock: string;
    partners: string;
    allNews: string;
    fullTable: string;
    statsSeason: string;
    aboutClub: string;
  };
  footer: {
    navTitle: string;
    contactsTitle: string;
    lead: string;
    brandTagline: string;
  };
  documents: {
    downloadPdf: string;
  };
  mediaSections: {
    photos: string;
    video: string;
  };
  contactsPage: {
    mapEyebrow: string;
    mapTitle: string;
    mapHint: string;
    socialTitle: string;
  };
  intros: {
    news: PageIntro;
    newsFeed: PageIntro;
    matches: PageIntro;
    team: PageIntro;
    teamAdministration: PageIntro;
    teamCoaching: PageIntro;
    club: PageIntro;
    clubHistory: PageIntro;
    clubAchievements: PageIntro;
    clubInfrastructure: PageIntro;
    clubContacts: PageIntro;
    clubMain: PageIntro;
    clubReserve: PageIntro;
    clubWomen: PageIntro;
    clubQj: PageIntro;
    clubCenter: PageIntro;
    table: PageIntro;
    media: PageIntro;
    documents: PageIntro;
    partners: PageIntro;
    admin: PageIntro;
  };
  clubUnit: {
    roster: string;
    coaches: string;
    calendar: string;
    standings: string;
    results: string;
    groups: string;
    recruitment: string;
    protocolPdf: string;
    fcAbout: string;
    fcContingent: string;
    fcBranch: string;
    fcMethodNote: string;
    fcEnrollmentTable: string;
    fcCategory: string;
    fcCoach: string;
    fcPhone: string;
    /** Общий телефон линии набора в футбольный центр (в дополнение к номерам тренеров). */
    fcEnrollmentHotline: string;
    fcEnrollmentHotlineLead: string;
  };
  adminCms: {
    title: string;
    lead: string;
    newsBlock: string;
    matchesBlock: string;
    documentsBlock: string;
    hint: string;
  };
  matchesBoard: {
    /** Заголовок якоря #schedule: предстоящие и прошедшие (ТЗ). */
    schedule: string;
    next: string;
    upcoming: string;
    pastInSchedule: string;
    results: string;
    resultsLead: string;
  };
  /** Тексты портала /club — со structure брифа (Клуб + О клубе). */
  clubPortal: {
    sportsTitle: string;
    sportsLead: string;
    aboutTitle: string;
    aboutLead: string;
    blurb: {
      main: string;
      reserve: string;
      women: string;
      qj: string;
      center: string;
      history: string;
      achievements: string;
      infrastructure: string;
      contacts: string;
    };
  };
  partnersPage: {
    logoGridTitle: string;
    tiersTitle: string;
  };
};

const ru: Dictionary = {
  location: "Өскемен, Қазақстан",
  brandSubtitle: "Сайт клуба · FC Altai Oskemen",
  nav: {
    home: "Главная",
    club: "Клуб",
    aboutClub: "О клубе",
    clubSports: "Команды клуба",
    news: "Новости",
    schedule: "Расписание",
    results: "Результаты",
    table: "Таблица",
    squad: "Команда",
    contacts: "Контакты",
    media: "Медиа",
    partners: "Партнёры",
    documents: "Документы",
    admin: "CMS",
    extrasAria: "Дополнительные разделы"
  },
  clubAbout: {
    history: "История",
    achievements: "Достижения",
    infrastructure: "Инфраструктура",
    contacts: "Контакты"
  },
  clubTeams: {
    main: "Основная",
    reserve: "Дубль",
    women: "Женская команда",
    qj: "QJ League",
    center: "Футбольный центр"
  },
  teamSection: {
    roster: "Состав основы",
    administration: "Администрация",
    coaching: "Тренерский штаб"
  },
  news: {
    all: "Все",
    main: "Основная команда",
    reserve: "Дубль",
    women: "Женская команда",
    qj: "QJ League",
    center: "Футбольный центр"
  },
  langAria: "Язык интерфейса",
  home: {
    newsSlider: "Новости — слайдер",
    nextMatch: "Ближайший матч",
    latestNews: "Последние новости",
    tableBlock: "Турнирная таблица",
    partners: "Партнёры клуба",
    allNews: "Все новости",
    fullTable: "Полная таблица",
    statsSeason: "Статистика сезона",
    aboutClub: "О клубе"
  },
  footer: {
    navTitle: "Навигация",
    contactsTitle: "Контакты",
    lead:
      "Официальный сайт ФК «Алтай»: новости, матчи, таблица, состав, медиа и документы по регламенту.",
    brandTagline: "Өскемен · Қазақстан"
  },
  documents: {
    downloadPdf: "Скачать PDF"
  },
  mediaSections: {
    photos: "Фотогалерея",
    video: "Видео"
  },
  contactsPage: {
    mapEyebrow: "Карта",
    mapTitle: "Офис клуба и матчдей-центр",
    mapHint:
      "Интерактивная карта, схема стадиона или навигация по базе — встраивается по готовности.",
    socialTitle: "Социальные сети"
  },
  intros: {
    news: {
      eyebrow: "Новости",
      title: "Редакционный центр клуба",
      description:
        "Все категории по техническому заданию: основная, дубль, женская, QJ League и футбольный центр — с фильтром."
    },
    newsFeed: {
      eyebrow: "Сейчас",
      title: "Главный материал",
      description: "Текущий акцент редакции — крупный анонс или репортаж."
    },
    matches: {
      eyebrow: "Матчи",
      title: "Расписание и результаты",
      description:
        "Предстоящие туры и протоколы завершённых матчей в формате, удобном для болельщика и медиа."
    },
    team: {
      eyebrow: "Команда",
      title: "Состав основной команды",
      description:
        "Заявка основы по линиям; дубль, академия и QJ League — в разделах «Команды клуба»."
    },
    teamAdministration: {
      eyebrow: "Команда",
      title: "Администрация клуба",
      description: "Руководство: должности и визуальные профили (фото — по мере загрузки в CMS)."
    },
    teamCoaching: {
      eyebrow: "Команда",
      title: "Тренерский штаб всех направлений",
      description:
        "Тренеры и специалисты основной команды, дубля, женского состава, QJ League и футбольного центра."
    },
    club: {
      eyebrow: "Клуб",
      title: "FC Altai: команды и о клубе",
      description:
        "Основная команда, дубль, женский состав, QJ League и футбольный центр — единая спортивная вертикаль клуба.\n\nВ блоке «О клубе» собраны история, достижения, инфраструктура и контактная информация."
    },
    clubHistory: {
      eyebrow: "История",
      title: "Развитие клуба и региона",
      description:
        "Ключевые шаги после создания ФК «Алтай Өскемен» в 2024 году: лицензия, участие в Первой лиге, инфраструктура, работа с детьми и сообществом.\n\nОтдельно — открытие филиала футбольного центра в городе Алтай в 2025 году."
    },
    clubAchievements: {
      eyebrow: "Достижения",
      title: "Титулы и рекорды",
      description: "Цифры и формулировки можно расширять по мере наполнения контентом."
    },
    clubInfrastructure: {
      eyebrow: "Инфраструктура",
      title: "Стадион, база, VAR",
      description:
        "Среда для спорта и медиа: арена, тренировочный комплекс, студия и регламентная VAR-комната."
    },
    clubContacts: {
      eyebrow: "Контакты",
      title: "Связаться с клубом",
      description:
        "Электронная почта, телефон офиса и адрес приёма в Усть-Каменогорске.\n\nОтдельная линия — для вопросов о наборе в футбольный центр; прямые номера тренеров указаны на странице центра."
    },
    clubMain: {
      eyebrow: "Основная",
      title: "Основная команда",
      description:
        "Состав, штаб, календарь ближайших матчей и фрагмент турнирной таблицы (ТЗ п.3)."
    },
    clubReserve: {
      eyebrow: "Дубль",
      title: "Резервная команда",
      description: "Состав дубля и отчётные результаты выступлений (ТЗ п.4)."
    },
    clubWomen: {
      eyebrow: "Женская",
      title: "Женская команда «Алтай Өскемен»",
      description: "Календарь, турнир и состав (ТЗ п.5)."
    },
    clubQj: {
      eyebrow: "QJ League",
      title: "QJ League",
      description: "Состав и турнирная таблица (ТЗ п.6)."
    },
    clubCenter: {
      eyebrow: "Центр",
      title: "Футбольный центр «Алтай Өскемен»",
      description:
        "Более 600 воспитанников, методическая поддержка тренеров и прозрачная схема набора в группы по году рождения.\n\nВнизу страницы — таблица прямых телефонов тренеров и общий номер линии набора."
    },
    table: {
      eyebrow: "Турнир",
      title: "Турнирная таблица",
      description: "Положение команд; строка клуба выделена для ориентира."
    },
    media: {
      eyebrow: "Медиа",
      title: "Фото и видео",
      description: "Галереи матчей, фотосеты событий, обзоры и интервью (ТЗ п.16–17)."
    },
    documents: {
      eyebrow: "Документы",
      title: "Официальные документы",
      description: "Учредительные, лицензионные, финансовые и регламентирующие файлы в PDF."
    },
    partners: {
      eyebrow: "Партнёры",
      title: "Сотрудничество и бренд",
      description:
        "Логотипы партнёров и описание форматов интеграции (бриф п.18); ниже — пакеты присутствия бренда."
    },
    admin: {
      eyebrow: "CMS",
      title: "Панель управления контентом",
      description: "Добавление новостей, матчей и документов — интерфейс-заглушка под интеграцию (ТЗ п.23)."
    }
  },
  clubUnit: {
    roster: "Состав",
    coaches: "Тренерский штаб",
    calendar: "Календарь",
    standings: "Турнирная таблица",
    results: "Результаты",
    groups: "Возрастные группы",
    recruitment: "Набор в футбольный центр",
    protocolPdf: "Протокол (PDF)",
    fcAbout: "О футбольном центре",
    fcContingent: "Контингент воспитанников",
    fcBranch: "Филиал в городе Алтай (2025)",
    fcMethodNote: "Методический штаб и развитие тренеров",
    fcEnrollmentTable: "Номера для набора в ФЦ «Алтай Өскемен»",
    fcCategory: "Категория (г.р.)",
    fcCoach: "Тренер",
    fcPhone: "Телефон",
    fcEnrollmentHotline: "Номер для набора в футбольный центр",
    fcEnrollmentHotlineLead:
      "Единая линия для вопросов о зачислении. Подробная сетка контактов по году рождения — на странице «Футбольный центр»."
  },
  adminCms: {
    title: "Панель CMS",
    lead: "Формы ниже — макет рабочего процесса; подключите API и авторизацию по проекту.",
    newsBlock: "Новая новость",
    matchesBlock: "Матч / результат",
    documentsBlock: "Документ (PDF)",
    hint: "Сохранение отключено в демо. Разместите обработчики на стороне бэкенда."
  },
  matchesBoard: {
    schedule: "Расписание",
    next: "Ближайший матч",
    upcoming: "Предстоящие матчи",
    pastInSchedule: "Прошедшие матчи",
    results: "Результаты",
    resultsLead:
      "Официальные протоколы матчей, итоговый счёт и детали игр по регламенту федераций (бриф п.15)."
  },
  clubPortal: {
    sportsTitle: "Команды клуба",
    sportsLead:
      "Спортивные направления по брифу: основная команда, дубль, женский состав, QJ League, футбольный центр.",
    aboutTitle: "О клубе",
    aboutLead: "История, достижения, инфраструктура (стадион, база, VAR) и контакты с картой и соцсетями.",
    blurb: {
      main: "Состав, тренеры, календарь и турнирная таблица.",
      reserve: "Состав дубля и результаты матчей.",
      women: "Состав, календарь и турнир женской команды.",
      qj: "Состав и турнирная таблица QJ League.",
      center: "Группы, тренеры, информация о наборе в футбольный центр.",
      history: "Этапы развития клуба.",
      achievements: "Титулы и награды.",
      infrastructure: "Стадион, база, VAR-комната.",
      contacts: "Адрес, карта, социальные сети."
    }
  },
  partnersPage: {
    logoGridTitle: "Логотипы партнёров и описание сотрудничества",
    tiersTitle: "Уровни интеграции бренда"
  }
};

const kk: Dictionary = {
  location: "Өскемен, Қазақстан",
  brandSubtitle: "Клуб сайты · FC Altai Oskemen",
  nav: {
    home: "Басты бет",
    club: "Клуб",
    aboutClub: "Клуб жайлы",
    clubSports: "Клуб командалары",
    news: "Жаңалықтар",
    schedule: "Кесте",
    results: "Нәтижелер",
    table: "Кесте (турнир)",
    squad: "Команда",
    contacts: "Байланыс",
    media: "Медиа",
    partners: "Серіктестер",
    documents: "Құжаттар",
    admin: "CMS бақылау",
    extrasAria: "Қосымша бөлімдер"
  },
  clubAbout: {
    history: "Тарих",
    achievements: "Жетістіктер",
    infrastructure: "Инфрақұрылым",
    contacts: "Байланыс"
  },
  clubTeams: {
    main: "Негізгі құрам",
    reserve: "Дубль",
    women: "Әйелдер командасы",
    qj: "QJ League",
    center: "Футбол орталығы"
  },
  teamSection: {
    roster: "Негізгі құрам",
    administration: "Әкімшілік",
    coaching: "Бапкерлер штабы"
  },
  news: {
    all: "Барлығы",
    main: "Негізгі команда",
    reserve: "Дубль",
    women: "Әйелдер командасы",
    qj: "QJ League",
    center: "Футбол орталығы"
  },
  langAria: "Интерфейс тілі",
  home: {
    newsSlider: "Жаңалықтар — слайдер",
    nextMatch: "Келесі ойын",
    latestNews: "Соңғы жаңалықтар",
    tableBlock: "Турнир кестесі",
    partners: "Клуб серіктестері",
    allNews: "Барлық жаңалықтар",
    fullTable: "Толық кесте",
    statsSeason: "Маусым статистикасы",
    aboutClub: "Клуб жайлы"
  },
  footer: {
    navTitle: "Бағыттар",
    contactsTitle: "Байланыс",
    lead:
      "«Алтай» ФК ресми сайты: жаңалықтар, ойындар, кесте, құрам, медиа және құжаттар.",
    brandTagline: "Өскемен · Қазақстан"
  },
  documents: {
    downloadPdf: "PDF жүктеу"
  },
  mediaSections: {
    photos: "Фотогалерея",
    video: "Бейне"
  },
  contactsPage: {
    mapEyebrow: "Карта",
    mapTitle: "Клуб кеңсесі және матч орталығы",
    mapHint: "Интерактивті карта немесе база сұлбасы дайын болғанда орнатылады.",
    socialTitle: "Әлеуметтік желілер"
  },
  intros: {
    news: {
      eyebrow: "Жаңалықтар",
      title: "Клуб редакциясы",
      description:
        "Техникалық тапсырма бойынша барлық санаттар: негізгі құрам, дубль, әйелдер командасы, QJ League және футбол орталығы — сүзгімен."
    },
    newsFeed: {
      eyebrow: "Қазір",
      title: "Басты материал",
      description: "Редакциядын ағымдағы акценті — ірі анонс немесе репортаж."
    },
    matches: {
      eyebrow: "Ойындар",
      title: "Кесте және нәтижелер",
      description:
        "Алдағы турлар мен аяқталған ойындардың хаттамалары — жанкүйер мен медиа үшін ыңғайлы форматта."
    },
    team: {
      eyebrow: "Команда",
      title: "Негізгі құрам",
      description:
        "Негізгі құрам құрамы линиялар бойынша; дубль, академия және QJ League — «Клуб командалары» бөлімінде."
    },
    teamAdministration: {
      eyebrow: "Команда",
      title: "Клуб әкімшілігі",
      description: "Басқару органдары: лауазымдар және визуалды профильдер (фото — CMS арқылы)."
    },
    teamCoaching: {
      eyebrow: "Команда",
      title: "Барлық бағыттардың бапкерлер штабы",
      description:
        "Негізгі құрам, дубль, әйелдер, QJ League және футбол орталығының бапкерлері мен мамандары."
    },
    club: {
      eyebrow: "Клуб",
      title: "FC Altai: командалар мен клуб жайлы",
      description:
        "Негізгі құрам, дубль, әйелдер командасы, QJ League және футбол орталығы — клубтың бірыңғай спорттық жүйесі.\n\n«Клуб жайлы» бөлімінде тарих, жетістіктер, инфрақұрылым және байланыс мәліметтері жинақталған."
    },
    clubHistory: {
      eyebrow: "Тарих",
      title: "Клуб пен өңірдің дамуы",
      description:
        "2024 жылы «Алтай Өскемен» ФК құрылғаннан кейінгі негізгі қадамдар: лицензия, Қазақстан Чемпионатының Бірінші лигасындағы қатысу, инфрақұрылым, балалар және қоғаммен жұмыс.\n\n2025 жылы Алтай қаласында футбол орталығының филиалы ашылды."
    },
    clubAchievements: {
      eyebrow: "Жетістіктер",
      title: "Титулдар мен рекордтар",
      description: "Сандар мен мәтіндер контент кеңейген сайын толықтырылады."
    },
    clubInfrastructure: {
      eyebrow: "Инфрақұрылым",
      title: "Стадион, база, VAR",
      description:
        "Спорт пен медиа ортасы: арена, жаттығу кешені, студия және VAR бөлмесі."
    },
    clubContacts: {
      eyebrow: "Байланыс",
      title: "Клубпен хабарласу",
      description:
        "Электрондық пошта, кеңсе телефоны және Өскемендегі қабылдау мекенжайы.\n\nФутбол орталығына іріктеу мәселелері бойынша жеке желі; бапкерлердің тікелей нөмірлері орталық бетінде көрсетілген."
    },
    clubMain: {
      eyebrow: "Негізгі",
      title: "Негізгі команда",
      description:
        "Құрам, штаб, алдағы ойындар кестесі және турнир кестесінің фрагменті (ТЗ 3-тармақ)."
    },
    clubReserve: {
      eyebrow: "Дубль",
      title: "Резервтік команда",
      description: "Дубль құрамы және өткізілген ойындар нәтижелері (ТЗ 4-тармақ)."
    },
    clubWomen: {
      eyebrow: "Әйелдер",
      title: "«Алтай Өскемен» әйелдер командасы",
      description: "Кесте, турнир және құрам (ТЗ 5-тармақ)."
    },
    clubQj: {
      eyebrow: "QJ League",
      title: "QJ League",
      description: "Құрам және турнир кестесі (ТЗ 6-тармақ)."
    },
    clubCenter: {
      eyebrow: "Орталық",
      title: "«Алтай Өскемен» футбол орталығы",
      description:
        "600-ден астам тарбиеленуші, бапкерлердің әдістемелік сүйемелдігі және жыл сайы бойынша топтарға іріктеу сұлбасы.\n\nТөменде бапкерлердің тікелей телефондары кестесі және іріктеу желісінің ортақ нөмірі берілген."
    },
    table: {
      eyebrow: "Турнир",
      title: "Турнир кестесі",
      description: "Командалардың орны; клуб белгісі ерекшеленеді."
    },
    media: {
      eyebrow: "Медиа",
      title: "Фото және бейне",
      description: "Ойын галереялары, шаралар, шолулар мен сұхбаттар (ТЗ 16–17)."
    },

    documents: {
      eyebrow: "Құжаттар",
      title: "Ресми құжаттар",
      description: "Құрылтайшылық, лицензиялық, қаржылық және регламент PDF файлдары."
    },
    partners: {
      eyebrow: "Серіктестер",
      title: "Серіктестік және бренд",
      description:
        "Серіктестер логотиптері мен әріптестік форматтарының сипаттамасы (бриф 18-п.); төменде брендтің болу деңгейлері."
    },
    admin: {
      eyebrow: "CMS",
      title: "Мазмұнды басқару панелі",
      description: "Жаңалық, ойын және құжат қосу — интеграцияға арналған интерфейс (ТЗ 23)."
    }
  },
  clubUnit: {
    roster: "Құрам",
    coaches: "Бапкерлер штабы",
    calendar: "Кесте",
    standings: "Турнир кестесі",
    results: "Нәтижелер",
    groups: "Жас топтары",
    recruitment: "Футбол орталығына іріктеу",
    protocolPdf: "Хаттама (PDF)",
    fcAbout: "Футбол орталығы жайлы",
    fcContingent: "Тарбиеленушілер контингенті",
    fcBranch: "Алтай қаласындағы филиал (2025)",
    fcMethodNote: "Әдістемелік штаб және бапкерлерді дамыту",
    fcEnrollmentTable: "«Алтай Өскемен» ФО-на іріктеу телефондары",
    fcCategory: "Санат (ж.т.)",
    fcCoach: "Бапкер",
    fcPhone: "Телефон",
    fcEnrollmentHotline: "Футбол орталығына іріктеу нөмірі",
    fcEnrollmentHotlineLead:
      "Қабылдау мәселелері бойынша бірыңғай желі. Жыл сайынша бапкерлердің тікелей нөмірлері — «Футбол орталығы» бетінің соңында."
  },
  adminCms: {
    title: "CMS панелі",
    lead: "Төмендегі формалар — жұмыс процесінің макеті; API мен авторизацияны жоба бойынша қосыңыз.",
    newsBlock: "Жаңа жаңалық",
    matchesBlock: "Ойын / нәтиже",
    documentsBlock: "Құжат (PDF)",
    hint: "Демода сақтау өшірілген. Өңдеуші тарапта хендлерлер орналастырыңыз."
  },
  matchesBoard: {
    schedule: "Кесте",
    next: "Келесі ойын",
    upcoming: "Алдағы ойындар",
    pastInSchedule: "Өткен ойындар",
    results: "Нәтижелер",
    resultsLead:
      "Ресми хаттамалар, есеп пен ойын мәліметтері федерациялар регламентіне сәйкес (бриф 15-п.)."
  },
  clubPortal: {
    sportsTitle: "Клуб командалары",
    sportsLead:
      "Негізгі құрам, дубль, әйелдер командасы, QJ League және футбол орталығы — бриф структурасы.",
    aboutTitle: "Клуб жайлы",
    aboutLead: "Тарих, жетістіктер, инфрақұрылым (стадион, база, VAR) және карта, әлеуметтік желілер.",
    blurb: {
      main: "Құрам, бапкерлер, кесте және турнир кестесі.",
      reserve: "Дубль құрамы мен ойын нәтижелері.",
      women: "Құрам, кесте және әйелдер турнирі.",
      qj: "Құрам және QJ League кестесі.",
      center: "Топтар, бапкерлер, іріктеу туралы ақпарат.",
      history: "Клуб даму кезеңдері.",
      achievements: "Титулдар мен марапаттар.",
      infrastructure: "Стадион, база, VAR бөлмесі.",
      contacts: "Мекенжай, карта, әлеуметтік желілер."
    }
  },
  partnersPage: {
    logoGridTitle: "Серіктестер логотиптері мен серіктестіктің сипаттамасы",
    tiersTitle: "Корпоративтік серіктестік деңгейлері"
  }
};

const map: Record<AppLocale, Dictionary> = { ru, kk };

export function getDictionary(locale: string): Dictionary {
  return locale === "kk" ? map.kk : map.ru;
}
