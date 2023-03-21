import { containerBootstrap } from "@nlpjs/core";
import { Nlp } from "@nlpjs/nlp";
import { LangEn } from "@nlpjs/lang-en-min";
import { removeEmojis } from "@nlpjs/emoji";
import { BrainReply } from "../types/BrainReply";
import prayerCorpus from "./en/prayer";
import mainCorpus from "./en/main";
import greetingsCorpus from "./en/greetings";
import youtubeCorpus from "./en/youtube";
import onIntent from "./onIntent";
import themeCorpus from "./en/theme";
import { atomStore } from "../atoms/store";
import { brainAtom } from "../atoms/brain";

const corpuses = [
  mainCorpus,
  greetingsCorpus,
  prayerCorpus,
  youtubeCorpus,
  themeCorpus,
];

async function trainBrain(): Promise<any> {
  const container = await containerBootstrap();
  container.use(Nlp);
  container.use(LangEn);

  const nlp = container.get("nlp");
  nlp.settings.autoSave = false;
  corpuses.map((corpus) => nlp.addCorpora(corpus));
  nlp.onIntent = onIntent;

  await nlp.train();

  atomStore.set(brainAtom, nlp);
  return nlp;
}

async function getBrainReply(q: string): Promise<BrainReply> {
  const brain = atomStore.get(brainAtom);

  if (!brain)
    throw new Error("You should train your brain first to get a reply.");

  const brainReply = await brain.process("en", removeEmojis(q));
  console.log(brainReply);

  return brainReply;
}

export { trainBrain, getBrainReply };
