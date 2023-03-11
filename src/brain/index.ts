import { containerBootstrap } from "@nlpjs/core";
import { Nlp } from "@nlpjs/nlp";
import { LangEn } from "@nlpjs/lang-en-min";
import { removeEmojis } from "@nlpjs/emoji";
import { Reply } from "../types/Reply";
import prayerCorpus from "./en/prayer";
import mainCorpus from "./en/main";
import greetingsCorpus from "./en/greetings";
import youtubeCorpus from "./en/youtube";
import onIntent from "./onIntent";
import themeCorpus from "./en/theme";

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
  return nlp;
}

async function getReply(brain: any, q: string): Promise<Reply> {
  const brainResponse = await brain.process("en", removeEmojis(q));

  return brainResponse;
}

export { trainBrain, getReply };
