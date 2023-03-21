type DhikrType = {
  hadithEng: string;
  period: {
    start: string;
    end: string;
  }[];
  title: string;
  subtitle: string;
  description: string;
  hadithRef: string;
  hadithRefUrl: string;
  hadithGrade: string;
  pronounciation: string;
  pronounciationArabic: string;
};

const dhikrs: DhikrType[] = [
  {
    hadithEng: `
    Ḥasbiyallāhu lā ilāha illā huwa \`alayhi tawakkalt, wa huwa Rabbu ‘l-\`Arshi ‘l-'Aẓīm.
    
    Allah is sufficient for me. There is none worthy of worship but Him.
    I have placed my trust in Him, He is Lord of the Majestic Throne.
    (Recite seven times in Arabic.)

    Allah will grant whoever recites this seven 
    times in the morning or evening whatever he desires from 
    this world or the next, Ibn As-Sunni (no. 71), 
    Abu Dawud 4/321. Both reports are attributed directly 
    to the Prophet j§ (Marfu1). The chain of transmission 
    is sound (Sahih). Ibn As-Sunni.`,
    period: [
      {
        start: "6:30 AM",
        end: "7:30 AM",
      },
      {
        start: "6:30 PM",
        end: "7:30 PM",
      },
    ],
    title: "To get whatever we desires",
    subtitle: `Allah will grant whoever recites this seven 
    times in the morning or evening whatever he desires from 
    this world or the next`,
    description: `
    Ḥasbiyallāhu lā ilāha illā huwa \`alayhi tawakkalt,
    wa huwa Rabbu ‘l-\`Arshi ‘l-'Aẓīm.

    Allah is sufficient for me. There is none worthy of worship but Him.
    I have placed my trust in Him, He is Lord of the Majestic Throne.
    (Recite seven times in Arabic.)

    Reference:
    Allah will grant whoever recites this seven times in the morning 
    or evening whatever he desires from this world or the next, Ibn 
    As-Sunni (no. 71), Abu Dawud 4/321. Both reports are attributed 
    directly to the Prophet j§ (Marfu1). The chain of transmission 
    is sound (Sahih). Ibn As-Sunni.

    حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم. (سبع مرات)

    Reference	 : Hisn al-Muslim 83`,
    hadithRef: "Hisn al-Muslim 83",
    hadithRefUrl: "https://sunnah.com/hisn/84",
    hadithGrade: "Sahih",
    pronounciation:
      "Ḥasbiyallāhu lā ilāha illā huwa `alayhi tawakkalt, wa huwa Rabbu ‘l-`Arshi ‘l-'Aẓīm.",
    pronounciationArabic:
      "حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم.",
  },
];
export default dhikrs;
