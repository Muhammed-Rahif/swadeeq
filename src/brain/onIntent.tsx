/* eslint-disable jsx-a11y/anchor-is-valid */
import dayjs from "dayjs";
import { BrainReply } from "../types/BrainReply";
import { PrayerTimeType } from "../types/PrayerTimeType";
import { setThemeAtom } from "../atoms/theme";
import { getPrayerTimes } from "../helpers/prayer";
import { LocalNotifications } from "@capacitor/local-notifications";
import { changeTheme, whichTheme } from "./onIntents/theme";
import { islamicRuling, quranReciatation } from "./onIntents/youtube";
import { prayerTimes, whenItsPrayerTime } from "./onIntents/prayer";

export default async function onIntent(nlp: any, input: BrainReply) {
  let output = input;
  const time = dayjs().format("h:mm A");

  // ========== theme.whichTheme ==========
  if (input.intent === "theme.whichTheme") {
    output = await whichTheme(input);
  }

  // ========== theme.reset ==========
  else if (input.intent === "theme.reset") {
    // changing the theme state
    setThemeAtom("black");
  }

  // ========== theme.changeTheme ==========
  if (input.intent === "theme.changeTheme") {
    output = await changeTheme(input);
  }

  // ========== youtube.quranReciatation ==========
  else if (input.intent === "youtube.quranReciatation") {
    output = await quranReciatation(input);
  }

  // ========== youtube.islamicRuling ==========
  else if (input.intent === "youtube.islamicRuling") {
    output = await islamicRuling(input);
  }

  // ========== whatTimeIsIt ==========
  else if (input.intent === "whatTimeIsIt") {
    output.answer = `It is ${time} o'clock.`;
  }

  // ========== prayer.whenItsPrayerTime ==========
  else if (input.intent === "prayer.whenItsPrayerTime") {
    output = await whenItsPrayerTime(input);
  }

  // ========== prayer.prayerTimes ==========
  else if (input.intent === "prayer.prayerTimes") {
    output = await prayerTimes(input);
  }

  return output;
}
