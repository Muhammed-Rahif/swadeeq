const youtubeCorpus = {
  name: "Corpus with entities",
  locale: "en-US",
  data: [
    {
      intent: "whatTimeIsIt",
      utterances: ["What time is it?"],
      answers: ["It is {{ time }} o'clock."],
      actions: [
        {
          name: "handleWhatsTimeIntent",
          parameters: ["en-US", "parameter 2"],
        },
      ],
    },
  ],
};

export default youtubeCorpus;
