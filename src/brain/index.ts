import { containerBootstrap } from "@nlpjs/core";
import { Nlp } from "@nlpjs/nlp";
import { LangEn } from "@nlpjs/lang-en-min";
import { removeEmojis } from "@nlpjs/emoji";
import { Reply } from "../types/nlp";
import dynamicReplies from "./dynamic";
import { ReactNode } from "react";

async function trainBrain(): Promise<any> {
  const container = await containerBootstrap();
  container.use(Nlp);
  container.use(LangEn);
  const nlp = container.get("nlp");
  nlp.settings.autoSave = false;

  nlp.addCorpus(require("./en/main.json"));
  nlp.addCorpus(require("./en/greetings.json"));
  nlp.addCorpus(require("./en/prayer-times.json"));
  await nlp.train();

  return nlp;
}

async function getReply(
  brain: any,
  q: string
): Promise<{
  dynamic?: () => JSX.Element;
  output: Reply;
}> {
  const brainResponse: Reply = await brain.process("en", removeEmojis(q));

  const dynamics = Object.keys(dynamicReplies);
  if (
    dynamics.includes(brainResponse.answer) &&
    brainResponse.answers.length === 1
  ) {
    return {
      output: brainResponse,
      dynamic:
        dynamicReplies[brainResponse.answer as keyof typeof dynamicReplies],
    };
  }

  return { output: brainResponse, dynamic: undefined };
}

export { trainBrain, getReply };
