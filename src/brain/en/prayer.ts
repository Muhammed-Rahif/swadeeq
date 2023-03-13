const prayerCorpus = {
  name: "Prayer",
  locale: "en-US",
  data: [
    {
      intent: "prayer.getquranicverseofprayer",
      utterances: [
        "quranic verse about prayer",
        "quran about prayer",
        "verses in quran about islamic prayers",
        "quranic verse about salah",
        "show me a quranic verse about prayer",
        "what quran says about prayer",
        "what quran says about salah",
        "quran about establishing prayer",
        "quran about five daily prayers",
        "quran about five daily salah",
      ],
      answers: [
        '"who believe in the unseen, establish prayer, and donate from what We have provided for them," - Quran 2:3',
        '"Establish prayer, pay alms-tax, and bow down with those who bow down." - Quran 2:43',
        '"And seek help through patience and prayer. Indeed, it is a burden except for the humble—" - Quran 2:45',
        '"Establish prayer, and pay alms-tax. Whatever good you send forth for yourselves, you will ˹certainly˺ find ˹its reward˺ with Allah. Surely Allah is All-Seeing of what you do." - Quran 2:110',
        '"O believers! Seek comfort in patience and prayer. Allah is truly with those who are patient." - Quran 2:153',
        '"Observe the ˹five obligatory˺ prayers—especially the middle prayer—and stand in true devotion to Allah." - Quran 2:238',
        '"If you are in danger, pray on foot or while riding. But when you are safe, ˹take time to˺ remember Allah for teaching you what you did not know." - Quran 2:239',
        '"Indeed, those who believe, do good, establish prayer, and pay alms-tax will receive their reward from their Lord, and there will be no fear for them, nor will they grieve." - Quran 2:277',
        '"Your only guardians are Allah, His Messenger, and fellow believers—who establish prayer and pay alms-tax with humility." - Quran 5:55',
        '"Satan’s plan is to stir up hostility and hatred between you with intoxicants and gambling and to prevent you from remembering Allah and praying. Will you not then abstain?" - Quran 5:91',
        '"establish prayer, and be mindful of Him. To Him you will all be gathered together." - Quran 6:72',
        '"Say, “Surely my prayer, my worship, my life, and my death are all for Allah—Lord of all worlds." - Quran 6:162',
        '"As for those who firmly abide by the Scripture and establish prayer—surely We never discount the reward of those acting righteously." - Quran 7:170',
        '"˹They are˺ those who establish prayer and donate from what We have provided for them." - Quran 8:3',
        '"Establish prayer ˹O Prophet˺ at both ends of the day and in the early part of the night. Surely good deeds wipe out evil deeds. That is a reminder for the mindful." - Quran 11:114',
        '"And ˹they are˺ those who endure patiently, seeking their Lord’s pleasure, establish prayer, donate from what We have provided for them—secretly and openly—and respond to evil with good. It is they who will have the ultimate abode:" - Quran 13:22',
        '"Tell My believing servants to establish prayer and donate from what We have provided for them—openly and secretly—before the arrival of a Day in which there will be no ransom or friendly connections." - Quran 14:31',
        '"Observe the prayer from the decline of the sun until the darkness of the night and the dawn prayer, for certainly the dawn prayer is witnessed ˹by angels˺." - Quran 17:78',
        '"And rise at ˹the last˺ part of the night, offering additional prayers, so your Lord may raise you to a station of praise." - Quran 17:79',
        '"He used to urge his people to pray and give alms-tax. And his Lord was well pleased with him." - Quran 19:55',
        '"But they were succeeded by generations who neglected prayer and followed their lusts and so will soon face the evil consequences." - Quran 19:59',
        '"‘It is truly I. I am Allah! There is no god ˹worthy of worship˺ except Me. So worship Me ˹alone˺, and establish prayer for My remembrance." - Quran 20:14',
        '"Successful indeed are the believers: those who humble themselves in prayer; those who avoid idle talk; those who pay alms-tax; those who guard their chastity" - Quran 23:1-5',
        '"by men who are not distracted—either by buying or selling—from Allah’s remembrance, or performing prayer, or paying alms-tax. They fear a Day when hearts and eyes will tremble," - Quran 24:37',
        '"Moreover, establish prayer, pay alms-tax, and obey the Messenger, so you may be shown mercy." - Quran 24:56',
        '"˹those˺ who establish prayer, pay alms-tax, and have sure faith in the Hereafter." - Quran 27:3',
        '"Recite what has been revealed to you of the Book and establish prayer. Indeed, ˹genuine˺ prayer should deter ˹one˺ from indecency and wickedness. The remembrance of Allah is ˹an˺ even greater ˹deterrent˺. And Allah ˹fully˺ knows what you ˹all˺ do." - Quran 29:45',
        '"˹O believers!˺ Always turn to Him ˹in repentance˺, be mindful of Him, and establish prayers. And do not be polytheists—" - Quran 30:31',
        '"those who establish prayer, pay alms-tax, and have sure faith in the Hereafter." - Quran 31:4',
        '"“O my dear son! Establish prayer, encourage what is good and forbid what is evil, and endure patiently whatever befalls you. Surely this is a resolve to aspire to." - Quran 31:17',
        '"Indeed, humankind was created impatient: distressed when touched with evil, and withholding when touched with good— except those who pray, consistently performing their prayers;" - Quran 70:19-23',
        '"and who are ˹properly˺ observant of their prayers. These will be in Gardens, held in honour." - Quran 70:34-35',
        '"who will be in Gardens, asking one another about the wicked ˹who will then be asked˺: “What has landed you in Hell?” They will reply, “We were not of those who prayed, nor did we feed the poor. We used to indulge ˹in falsehood˺ along with others," - Quran 74:40-45',
        '"even though they were only commanded to worship Allah ˹alone˺ with sincere devotion to Him in all uprightness, establish prayer, and pay alms-tax. That is the upright Way." - Quran 98:5',
      ],
    },
    {
      intent: "prayer.whenitsprayertime",
      utterances: [
        "when @prayer prayer time comes",
        "its time to pray @prayer",
        "@prayer pray now",
        "this is @prayer prayer time",
        "when @prayer salah time comes",
        "this is @prayer salah time",
      ],
      answers: [
        "It's time to pray <%prayerName%>",
        "<%prayerName%> prayer, nothing else matters.",
        "No excuses, pray <%prayerName%>.",
        "<%prayerName%> is mandatory upon you.",
        "Nothing else matters, go and pray <%prayerName%>.",
        "Run to Allah, it's <%prayerName%> time.",
        "Worries end when you pray <%prayerName%>.",
        "Go, pray <%prayerName%>. Everything else after that.",
        "Friend, it's <%prayerName%> prayer time!",
      ],
    },
    {
      intent: "prayer.getprayertimes",
      utterances: [
        "prayer times",
        "get prayer times",
        "what is prayer times",
        "when is prayer times",
        "prayer times",
        "is it time for prayer",
        "when is salah time",
        "when is salah time",
        "salah times",
      ],
    },
    {
      intent: "prayer.importance",
      utterances: [
        "motivate me to pray",
        "motivate me to pray on time",
        "importance of prayer",
        "why should we pray",
        "is prayer is that important",
        "i skip prayer sometimes",
        "i don't like to pray",
        "why is prayer is so important",
        "why is prayer is mandatory in islam",
        "is salah is that important",
        "can we skip prayer",
      ],
      answers: [
        `Prayer, or Salat, was made obligatory for all Muslims, **whether they be rich or poor,
strong or weak, black or white, male or female**. Prayer allows the believer to
**enrich their spirituality and cultivate the soul's right to love and worship the Creator, Allah**.

> "When the prayers are over, remember Allah—whether you are standing, sitting, or lying
down. But when you are secure, establish regular prayers. Indeed, performing prayers is
a duty on the believers at the appointed times." — Holy Quran 4:103`,
        //====================================================================================================
        `The importance of the prayer in Islam cannot be **understated**. It is the first pillar
of Islam that the Prophet (peace and blessings be upon him) mentioned after mentioning
the testimony of faith, by which one becomes a Muslim. It was made **obligatory upon all the
prophets and for all peoples**. Allah has declared its obligatory status under majestic
circumstances. 
For example, when Allah spoke directly to Moses, He said,

>"And I have chosen you, so listen to that which is inspired to you. Verily, I am Allah!
There is none worthy of worship but I, so worship Me and offer prayer perfectly for My
remembrance." — Holy Quran, Surah Taha, 13-14`,
        //====================================================================================================
        `A human being is created weak and **can be deviated from righteousness very easily without seeking 
from Allah.**

> Recite what has been revealed to you of the Book and establish prayer. Indeed, ˹genuine˺ prayer should
deter ˹one˺ from indecency and wickedness. The remembrance of Allah is ˹an˺ even greater ˹deterrent˺. 
And Allah ˹fully˺ knows what you ˹all˺ do. — Surah Al Ankabut:45
`,
        //====================================================================================================
        `If the prayer is performed properly – with true remembrance of Allah and turning 
to Him for forgiveness – **it will have a lasting effect on the person**. After he 
finishes the prayer, his heart will be filled with the remembrance of Allah. He 
will be fearful as well as hopeful of Allah. After that experience, he will not 
want to move from that lofty position to one wherein he disobeys Allah. Allah has 
mentioned this aspect of the prayer when He has said, 
                
> "Verily, the prayer keeps one from the great sins and evil deeds" (Surah Al-Ankabut 45).

Never leave your prayer!`,
        //====================================================================================================
        `The prayers are a type of purification for a human being. He turns and meets with
his Lord five times a day. As alluded to above, this repeated standing before 
Allah should keep the person from performing sins during the day. Furthermore, 
it should also be a time of remorse and repentance, such that he earnestly asks
Allah for forgiveness for those sins that he committed. In addition, the prayer
in itself is a good deed that wipes away some of the evil deeds that he performed.
These points can be noted in the following hadith of the Prophet (peace be upon 
him):

> "If a person had a stream outside his door and he bathed in it five times a day,
do you think he would have any filth left on him?" The people said, "No filth would
remain on him whatsoever." The Prophet (peace and blessings be upon him) then said,
"That is like the five daily prayers: Allah wipes away the sins by them."
(Recorded by al-Bukhari and Muslim.)`,
      ],
    },
  ],
  entities: {
    prayer: {
      options: {
        prayerName: [
          "fajr",
          "dhuhr",
          "asr",
          "maghrib",
          "ishah",
          "isha",
          "magrib",
          "fajr prayer",
          "dhuhr prayer",
          "asr prayer",
          "maghrib prayer",
          "magrib prayer",
          "ishah prayer",
          "isha prayer",
          "fajr salah",
          "dhuhr salah",
          "asr salah",
          "maghrib salah",
          "magrib salah",
          "ishah salah",
          "isha salah",
        ],
      },
    },
  },
};

export default prayerCorpus;
