import { LocalNotifications } from "@capacitor/local-notifications";
import dayjs from "dayjs";
import { getBrainReply } from "..";
import { getPrayerTimes } from "../../helpers/prayer";
import { BrainReply } from "../../types/BrainReply";
import { Timings } from "../../types/PrayerTimeType";

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
  input.answers = input.answers
    .map(({ answer }) => ({
      answer: answer.replace(variableRegex, input.entities[0].utteranceText),
    }))
    // shuffle the answers
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

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

  let prayerNames = Object.keys(prayerTimes!);

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

  // setting only madatory prayers to send notifications
  prayerTimes = await getPrayerTimes({ mandatoryPrayersOnly: true });

  // canceling prev prayer notifications
  LocalNotifications.getPending().then((pendings) => {
    pendings.notifications.map((pending) => {
      if (pending.extra === "prayer-notification")
        LocalNotifications.cancel({ notifications: [pending] });
    });
  });
  prayerNames = Object.keys(prayerTimes!);

  prayerNames.map(async (prayerName, indx) => {
    const prayerQuotes = (await getBrainReply(`its time to pray ${prayerName}`))
      .answers;
    const quranQuote = (
      await getBrainReply(`quranic verse about prayer`)
    ).answer?.toString();
    const time = dayjs(prayerTimes![prayerName as keyof Timings]);
    // if time not past
    if (time.isBefore(dayjs())) return;

    // scheduling local notifications for each pcoming prayer time
    LocalNotifications.schedule({
      notifications: [
        {
          body: prayerQuotes[0].answer,
          id: time.get("seconds") + indx + time.get("minutes"),
          schedule: {
            at: time.toDate(),
            every: "day",
            allowWhileIdle: true,
          },
          title: prayerQuotes[1].answer,
          summaryText: `${prayerName} prayer, nothing else matters.`,
          smallIcon: "splash",
          largeBody: quranQuote,
          extra: "prayer-notification",
        },
      ],
    });
  });

  return input;
};
