const greetingsCorpus = {
  name: "Greetings",
  locale: "en-US",
  data: [
    {
      intent: "greetings.peacebyuponyou",
      utterances: [
        "salam",
        "assalamu alaikum",
        "assalamualaikum",
        "assalaam",
        "assalam",
        "peace be upon you",
      ],
      answers: [
        "Peace!",
        "And peace be upon you too!",
        "Peace be upon you too.",
        "And peace from Allah be upon you too",
        "Peace be upon you and the mercy of Allah",
        "May the peace, blessings, and mercy of Allah be upon you",
        "May the blessings of Allah be upon you",
      ],
    },
    {
      intent: "greetings.hello",
      utterances: [
        "hello",
        "hi",
        "howdy",
        "helo",
        "hey",
        "hey there",
        "hi there",
        "hello there",
      ],
      answers: [
        "Hey there!",
        "Hello!",
        "Hi",
        "Hi there",
        "Hello there",
        "Hey",
        "Howdy",
      ],
    },
    {
      intent: "greetings.howareyou",
      utterances: [
        "how is your day",
        "how is your day going",
        "how are you",
        "how are you doing",
        "what about your day",
        "are you alright",
      ],
      answers: [
        "Feeling wonderful! Praise be to Allah!",
        "Thank God, I'm doing great!",
        "All praise be to Allah, I'm doing great!",
        "I am doing great because of Allah's blessings",
        "Another beautiful day, Praise be to Allah",
      ],
    },
    {
      intent: "greetings.nicetomeetyou",
      utterances: [
        "nice to meet you",
        "pleased to meet you",
        "it was very nice to meet you",
        "glad to meet you",
        "nice meeting you",
      ],
      answers: [
        "It's nice meeting you, too",
        "Likewise. I'm looking forward to helping you out",
        "Nice meeting you, as well",
        "May Allah give you blessings and peace",
        "May Allah give you blessings",
        "May Allah give you peace",
      ],
    },
    {
      intent: "greetings.nicetoseeyou",
      utterances: [
        "nice to see you",
        "good to see you",
        "great to see you",
        "lovely to see you",
      ],
      answers: [
        "Same here. I was starting to miss you",
        "So glad we meet again",
      ],
    },
    {
      intent: "greetings.nicetotalktoyou",
      utterances: [
        "nice to talk to you",
        "it's nice to talk to you",
        "nice talking to you",
        "it's been nice talking to you",
      ],
      answers: [
        "It sure was. We can chat again anytime, if Allah wills it",
        "I enjoy talking to you, too. What Allah has willed has happened.",
      ],
    },
    {
      intent: "greetings.bye",
      utterances: [
        "goodbye for now",
        "bye bye take care",
        "okay see you later",
        "bye for now",
        "I must go",
      ],
      answers: [
        "May Allah bless you, bye.",
        "See you soon, if Allah wills it!",
        "Bye",
        "Bye, take care",
        "Let's meet again soon, if Allah wills it",
      ],
    },
  ],
};

export default greetingsCorpus;
