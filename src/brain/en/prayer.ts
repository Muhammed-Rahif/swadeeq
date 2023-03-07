const prayerCorpus = {
  name: "Prayer",
  locale: "en-US",
  data: [
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
};

export default prayerCorpus;
