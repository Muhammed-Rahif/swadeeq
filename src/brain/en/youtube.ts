const youtubeCorpus = {
  name: "Corpus with entities",
  locale: "en-US",
  data: [
    {
      intent: "youtube.islamicRuling",
      utterances: [
        "get islamic ruling for @subject",
        "what is the islamic ruling on @subject",
        "islamic ruling on @subject",
        "ruling on @subject in islam",
        "ruling on @subject",
        "what did islam say about @subject",
        "what is the view of islam about @subject",
        "let's discuss about @subject",
        "can we do @subject in islam",
        "is @subject haram",
        "is @subject halal",
        "is it permissible to do @subject",
      ],
      answers: [
        "islamic ruling in <%subject%>",
        "islam on topic <%subject%>",
        "islamic ruling on <%subject%>",
        "islam on <%subject%>",
        "<%subject%> in islam",
      ],
    },
    {
      intent: "youtube.quranReciatation",
      utterances: [
        "reciation of surah @quran",
        "quran reciation @quran",
        "@quran reciation",
        "reciation of surah @quran heart touching",
        "@quran reciation heart smoothing",
        "recitation of quran",
      ],
      answers: [
        "reciation of <%surah%>",
        "quran reciation <%surah%>",
        "<%surah%> reciation",
        "reciation of <%surah%> heart touching",
        "<%surah%> reciation heart smoothing",
      ],
    },
  ],
  entities: {
    quran: {
      options: {
        surah: [
          "surah al baqarah",
          "surah al imran",
          "surah al nisa",
          "surah al maidah",
          "surah al anam",
          "surah al a'raf",
          "surah al anfal",
          "surah al tawbah",
          "surah yunus",
          "surah hud",
          "surah yusuf",
          "surah ar rahman",
          "surah al waqiah",
          "surah al hadid",
          "surah al mujadilah",
          "surah al hashr",
          "surah al mumtahanah",
          "surah as saff",
          "surah al jumu'ah",
          "surah al munafiqun",
          "surah at taghabun",
          "surah at talak",
          "surah at tahrim",
          "surah al mulk",
          "surah al qalam",
          "surah al haqqah",
          "surah al ma'arij",
          "surah nooh",
          "surah al jinn",
          "surah al muzzammil",
          "surah al muddaththir",
          "surah al qiyamah",
          "surah al insan",
          "surah al mursalat",
          "surah an naba",
          "surah an naziat",
          "surah abasa",
          "surah at takwir",
          "surah al infithar",
          "surah al mutaffifin",
          "surah al insyiqaq",
          "surah al buruj",
          "surah at tariq",
          "surah al ala",
          "surah al ghashiyah",
          "surah al fajr",
          "surah al balad",
          "surah ash shams",
          "surah al lail",
          "surah ad duha",
          "surah ash sharh",
          "surah at tin",
          "surah al alaq",
          "surah al qadr",
          "surah al bayyinah",
          "surah az zalzalah",
          "surah al adiyat",
          "surah al qariah",
          "surah at takasur",
          "surah al asr",
          "surah al humazah",
          "surah al fil",
          "surah quraisy",
          "surah al ma'un",
          "surah al kausar",
          "surah al kafirun",
          "surah an nasr",
          "surah al masad",
          "surah al ikhlas",
          "surah al falaq",
          "surah an nas",
          "Al-Fatihah",
          "Al-Baqarah",
          "Aale-Imran",
          "An-Nisa",
          "Al-Maidah",
          "Al-Anam",
          "Al-Araf",
          "Al-Anfal",
          "At-Tawbah",
          "Yunus",
          "Hud",
          "Yusuf",
          "Ar-Rad",
          "Ibrahim",
          "Al-Hijr",
          "An-Nahl",
          "Al-Isra",
          "Al-Kahf",
          "Maryam",
          "Taha	طه",
          "Al-Anbiya",
          "Al-Hajj",
          "Al-Muminun",
          "An-Nur",
          "Al-Furqan",
          "Ash-Shuara",
          "An-Naml",
          "Al-Qasas",
          "Al-Ankabut",
          "Ar-Rum",
          "Luqman",
          "As-Sajdah",
          "Al-Ahzab",
          "Saba",
          "Fatir",
          "Yaseen",
          "As-Saffat",
          "Saad",
          "Az-Zumar",
          "Al-Ghafir",
          "Fussilat",
          "Ash-Shura",
          "Az-Zukhruf",
          "Ad-Dukhan",
          "Al-Jathiyah",
          "Al-Ahqaf",
          "Al-Muhammad",
          "Al-Fath",
          "Al-Hujurat",
          "Qaf",
          "Adh-Dhariyat",
          "At-Tur",
          "An-Najm",
          "Al-Qamar",
          "Ar-Rahman",
          "Al-Waqiah",
          "Al-Hadid",
          "Al-Mujadilah",
          "Al-Hashr",
          "Al-Mumtahinah",
          "As-Saf",
          "Al-Jumuah",
          "Al-Munafiqun",
          "At-Taghabun",
          "Al-Talaq",
          "Al-Tahrim",
          "Al-Mulk",
          "Al-Qalam",
          "Al-Haqqah",
          "Al-Maarij",
          "Nuh",
          "Al-Jinn",
          "Al-Muzzammil",
          "Al-Muddaththir",
          "Al-Qiyamah",
          "Al-Dahr",
          "Al-Mursalat",
          "Al-Naba",
          "Al-Naziat",
          "Al-Abasa",
          "Al-Takwir",
          "Al-Infitar",
          "Al-Mutaffifin",
          "Al-Inshiqaq",
          "Al-Buruj",
          "Al-Tariq",
          "Al-Aala",
          "Al-Ghashiyah",
          "Al-Fajr",
          "Al-Balad",
          "Al-Shams",
          "Al-Layl",
          "Al-Duha",
          "Al-Inshirah",
          "Al-Tin",
          "Al-Alaq",
          "Al-Qadr",
          "Al-Bayyinah",
          "Al-Zalzalah",
          "Al-Adiyat",
          "Al-Qariah",
          "Al-Takathur",
          "Al-Asr",
          "Al-Humazah",
          "Al-Fil",
          "Al-Quraysh",
          "Al-Maun",
          "Al-Kawthar",
          "Al-Kafirun",
          "Al-Nasr",
          "Al-Masad",
          "Al-Ikhlas",
          "Al-Falaq",
          "Al-Nas",
        ],
      },
    },
    subject: {
      options: {
        topics: [
          "pranking",
          "prank",
          "pranks",
          "pranked",
          "prankster",
          "fooling",
          "gaming",
          "games",
          "game",
          "gamer",
          "gamers",
          "playing",
          "playing game",
          "gta 5",
          "forza horizon",
          "music",
          "musics",
          "musical",
          "musicals",
          "nasheeds",
          "humming musics",
          "lofi",
          "slowed reverb",
          "movies",
          "movie",
          "film",
          "films",
          "series",
          "netflix movies",
          "tv",
          "tvs",
          "television",
          "televisions",
          "books",
          "book",
          "novel",
          "novels",
          "news",
          "newspaper",
          "newspapers",
          "sports",
          "sport",
          "sporting",
          "sportings",
          "politics",
          "political",
          "politician",
          "politicians",
          "religion",
          "religious",
          "religions",
          "science",
          "scientific",
          "scientist",
          "scientists",
          "technology",
          "technological",
          "technologies",
          "fashion",
          "fashions",
          "fashionable",
          "fashionably",
          "travel",
          "travels",
          "traveller",
          "travellers",
          "food",
          "foods",
          "eat",
          "eats",
          "eating",
          "health",
          "healthy",
          "healths",
          "education",
          "educational",
          "educations",
          "business",
          "businesses",
          "businessman",
          "businessmen",
          "finance",
          "finances",
          "financial",
          "financially",
          "law",
          "laws",
          "legal",
          "legally",
          "entertainment",
          "entertainments",
          "art",
          "arts",
          "artist",
          "artists",
          "love",
          "loving",
          "fall in love",
          "loving so much",
          "culture",
          "cultures",
          "cultural",
          "culturally",
          "history",
          "historical",
          "historically",
          "society",
          "societies",
          "social",
          "socially",
          "nature",
          "natures",
          "natural",
          "naturally",
          "environment",
          "environments",
          "environmental",
          "animals",
          "animal",
          "animalistic",
          "animalistically",
          "plants",
          "plant",
          "planting",
          "planted",
          "weather",
          "weathers",
          "weathering",
          "weathered",
          "hair",
          "hairs",
          "haircut",
          "haircuts",
          "makeup",
          "makeups",
          "makeuped",
          "makeuping",
          "beauty",
          "beauties",
          "beautiful",
          "beautifully",
          "style",
          "styles",
          "stylish",
          "stylishly",
          "prayer",
          "prayers",
          "pray",
          "prays",
          "praying",
          "salah",
          "salat",
          "salats",
          "salahs",
          "fasting",
          "fastings",
          "fast",
          "fasts",
          "fasted",
          "fasting",
          "marriage",
          "marriages",
          "married",
          "marrying",
          "divorce",
          "divorces",
          "divorced",
          "divorcing",
          "minor-sins",
          "minor-sin",
          "minor-sinning",
          "minor-sinned",
          "major-sins",
          "major-sin",
          "major-sinning",
          "major-sinned",
          "haram-food",
          "haram-foods",
          "haram-eating",
          "haram-eat",
          "halal-food",
          "halal-foods",
          "halal-eating",
          "halal-eat",
          "haram-drinks",
          "haram-drink",
          "haram-drinking",
          "haram-drank",
          "halal-drinks",
          "halal-drink",
          "halal-drinking",
          "halal-drank",
          "haram-music",
          "haram-musics",
          "haram-musical",
          "haram-musicals",
          "halal-music",
          "halal-musics",
          "halal-musical",
          "halal-musicals",
          "quran",
          "qurans",
          "quranic",
          "quranically",
          "hadith",
          "hadiths",
          "hadithic",
          "hadithically",
          "sunnah-prayer",
          "sunnah-prayers",
          "sunnah-praying",
          "sunnah-prayed",
          "sunnah-fasting",
          "sunnah-fastings",
          "sunnah-fasting",
          "sunnah-fastings",
          "sunnah-marriage",
          "sunnah-marriages",
          "sunnah-married",
          "sunnah-marrying",
          "good-deeds",
          "good-deed",
          "good-deeding",
          "good-deeded",
          "bad-deeds",
          "bad-deed",
          "bad-deeding",
          "bad-deeded",
          "good-words",
          "good-word",
          "good-speaking",
          "good-spoke",
          "bad-words",
          "bad-word",
          "bad-speaking",
          "bad-spoke",
          "good-actions",
          "good-action",
          "good-acting",
          "good-acted",
          "bad-actions",
          "bad-action",
          "bad-acting",
          "bad-acted",
          "good-thoughts",
          "good-thought",
          "good-thinking",
          "good-thought",
          "bad-thoughts",
          "bad-thought",
          "bad-thinking",
          "bad-thought",
        ],
      },
    },
  },
};

export default youtubeCorpus;
