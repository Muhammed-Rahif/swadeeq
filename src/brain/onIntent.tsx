import dayjs from "dayjs";
import PrayerTimesTable from "../components/PrayerTimesTable";
import { Reply } from "../types/Reply";

export default function onIntent(nlp: any, input: Reply) {
  const output = input;
  const time = dayjs().format("h:mm A");

  switch (input.intent) {
    case "whatTimeIsIt":
      output.answer = `It is ${time} o'clock.`;
      break;

    case "prayer.getprayertimes":
      output.answer = <PrayerTimesTable />;
      break;

    default:
      break;
  }

  return input;
}
