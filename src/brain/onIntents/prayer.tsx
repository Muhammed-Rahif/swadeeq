import { LocalNotifications } from "@capacitor/local-notifications";
import dayjs from "dayjs";
import { getBrainReply } from "..";
import { getPrayerTimes } from "../../helpers/prayer";
import { BrainReply } from "../../types/BrainReply";
import { PrayerTimeType, Timings } from "../../types/PrayerTimeType";

/**
 * Get reply for "whenItsPrayerTime".
 * when intent === "prayer.whenItsPrayerTime"
 */
export const whenItsPrayerTime = async (
  input: BrainReply
): Promise<BrainReply> => {
  // taking 'prayer' entities only from the input
  input.entities = (input.entities as []).filter(
    ({ entity }) => entity === "prayer"
  );
  const variableRegex = RegExp(`<%[${input.entities[0].option}\\s]+%>`);
  const answer = (input.answer as string).replace(
    variableRegex,
    input.entities[0].utteranceText
  );
  input.answer = answer;

  return input;
};

/**
 * Get all prayer times.
 * when intent === "prayer.prayerTimes"
 */
export const prayerTimes = async (input: BrainReply): Promise<BrainReply> => {
  let prayerTimes: Timings | undefined;

  try {
    prayerTimes = await getPrayerTimes({});
  } catch (err) {
    input.answer = "Something went wrong. Please try again.";
  }

  if (!prayerTimes) {
    input.answer = "Something went wrong. Please try again.";
    return input;
  }

  const prayerNames = Object.keys(prayerTimes!);

  prayerNames.map(async (prayerName, indx) => {
    const prayerQuote = (await getBrainReply(`its time to pray ${prayerName}`))
      .answers;
    const quranPrayerQuote = (
      await getBrainReply(`quranic verse about prayer`)
    ).answer?.toString();
    const time = dayjs(prayerTimes![prayerName as keyof Timings]).toDate();

    // scheduling local notifications for each prayer time
    LocalNotifications.schedule({
      notifications: [
        {
          body: prayerQuote[0].answer,
          id: new Date(prayerTimes![prayerName as keyof Timings]).getTime(),
          schedule: {
            at: time,
            allowWhileIdle: true,
          },
          title: prayerQuote[1].answer,
          summaryText: `${prayerName} prayer, nothing else matters.`,
          smallIcon: "splash",
          largeBody: quranPrayerQuote,
        },
      ],
    });
  });

  // returning the markdown table of prayer times
  let ans: string[] = prayerNames.map((prayerName) => {
    return `| ${prayerName} | ${dayjs(
      prayerTimes![prayerName as keyof Timings]
    ).format("h:mm A")} |`;
  });
  //   adding markdown table headers
  ans.unshift("| --- | --- |");
  ans.unshift("| Prayer | Time |");

  input.answer = [
    "Here are the prayer times for today:",
    ans.join("\n"),
    "Remember always to pray on time and renew the remembrance of Allah each time!",
  ];

  return input;
};
