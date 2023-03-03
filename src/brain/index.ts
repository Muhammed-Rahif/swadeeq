import { containerBootstrap } from "@nlpjs/core";
import { Nlp } from "@nlpjs/nlp";
import { LangEn } from "@nlpjs/lang-en-min";

async function trainBrain(): Promise<any> {
  const container = await containerBootstrap();
  container.use(Nlp);
  container.use(LangEn);
  const nlp = container.get("nlp");
  nlp.settings.autoSave = false;

  nlp.addCorpus(require("./en/main.json"));
  nlp.addCorpus(require("./en/greetings.json"));
  await nlp.train();

  return nlp;
}

export { trainBrain };
