import { LocalNotifications } from "@capacitor/local-notifications";
import dayjs from "dayjs";
import { getPrayerTimes } from "../../helpers/prayer";
import { BrainReply } from "../../types/BrainReply";
import { PrayerTimeType } from "../../types/PrayerTimeType";

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
  let prayerTimes: PrayerTimeType["timings"] | undefined;

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

  prayerNames.map((prayerName) => {
    // scheduling local notifications for each prayer time
    LocalNotifications.schedule({
      notifications: [
        {
          body: '"who believe in the unseen, establish prayer, and donate from what We have provided for them, " - Quran 2:3',
          id: 1,
          schedule: {
            at: dayjs(
              prayerTimes![prayerName as keyof PrayerTimeType["timings"]]
            ).toDate(),
          },
          title: `Friend, it's ${prayerName} prayer time!`,
          summaryText: `${prayerName} Prayer, nothing else matters.`,
          iconColor: "#FF0000",
          smallIcon: "splash",
          largeIcon: "prayer",
          largeBody:
            '"who believe in the unseen, establish prayer, and donate from what We have provided for them, " - Quran 2:3',
          attachments: [
            {
              id: "splash",
              url: "prayer",
            },
          ],
        },
      ],
    });
  });

  // returning the markdown table of prayer times
  let ans: string[] = prayerNames.map((prayerName) => {
    return `| ${prayerName} | ${dayjs(
      prayerTimes![prayerName as keyof PrayerTimeType["timings"]]
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
