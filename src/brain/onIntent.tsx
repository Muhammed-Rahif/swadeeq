/* eslint-disable jsx-a11y/anchor-is-valid */
import { Capacitor } from "@capacitor/core";
import dayjs from "dayjs";
import { Reply } from "../types/Reply";
import {
  Geolocation as NativeGeolocation,
  Position,
} from "@capacitor/geolocation";
import { PrayerTimeType } from "../types/PrayerTimeType";
import axios from "axios";
import { getPrayerTimeApiUrl, getYouTubeSearchApiUrl } from "../constants/api";
import { YouTubeSearchResults } from "../types/YouTubeSearchResults";
import { htmlDecode } from "../herlpers/string";
import { allThemes, setThemeAtom, themeAtom } from "../atoms/theme";
import { atomStore } from "../atoms/store";
import { getPrayerTimes } from "../herlpers/prayer";
import { LocalNotifications } from "@capacitor/local-notifications";

export default async function onIntent(nlp: any, input: Reply) {
  const output = input;
  const time = dayjs().format("h:mm A");

  // ================================ theme.reset ================================
  if (input.intent === "theme.whichtheme") {
    const variableRegex = RegExp(`<%[theme\\s]+%>`);
    output.answer = input.answer
      ? (input.answer as string).replace(
          variableRegex,
          `'**${atomStore.get(themeAtom)}**'`
        )
      : "";
  }

  // ================================ theme.reset ================================
  else if (input.intent === "theme.reset") {
    setThemeAtom("black");
  }

  // ================================ theme.change ================================
  if (input.intent === "theme.change") {
    const theme = input.entities[0]?.option;

    if (theme && allThemes.includes(theme)) setThemeAtom(theme);
    else
      return (output.answer = [
        theme && !allThemes.includes(theme)
          ? "This theme is not available, you can select a theme from available themes below."
          : "Of course, select a theme from your preferences.",
        <div className="dropdown dropdown-top">
          <label
            tabIndex={0}
            className="btn btn-sm outline-neutral-content outline outline-1 active:outline-neutral-content focus:outline-neutral-content"
          >
            Change theme
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-100 capitalize menu p-2 shadow-lg flex-nowrap rounded-box w-52 max-h-72 overflow-y-scroll flex-col overflow-x-hidden"
          >
            {allThemes.map((theme) => (
              <li key={theme} className="prose max-w-none">
                <a onClick={() => setThemeAtom(theme)} className="no-underline">
                  {theme}
                </a>
              </li>
            ))}
          </ul>
        </div>,
      ]);

    return (output.answer = `Changed theme to ${theme}`);
  }

  // ================================ youtube.quranreciatation ================================
  else if (input.intent === "youtube.quranreciatation") {
    const isHaveEntity =
      input.entities.length >= 0 && !Boolean(input.entities[0]);

    const variableRegex = RegExp(`<%[${input.entities[0].option}\\s]+%>`);
    const searchQuery = isHaveEntity
      ? (input.answer as string).replace(
          variableRegex,
          input.entities[0].utteranceText
        )
      : input.utterance;
    const { data: ytSearchResults }: { data: YouTubeSearchResults } =
      await axios.get(
        getYouTubeSearchApiUrl({
          query: searchQuery,
        })
      );

    return (output.answer = [
      ...ytSearchResults.items.map((item, indx) => {
        const videoData = ytSearchResults.items[indx];
        const videoWidth = videoData.snippet.thumbnails.medium.width;
        const videoHeight = videoData.snippet.thumbnails.medium.height;
        const iframUrl = `https://www.youtube.com/embed/${videoData.id.videoId}`;
        return (
          <>
            <iframe
              className="rounded-lg border max-w-full"
              title={input.entities[0].option}
              width={videoWidth}
              height={videoHeight}
              src={iframUrl}
            ></iframe>
            <p
              className="mt-2"
              style={{ maxWidth: videoData.snippet.thumbnails.medium.width }}
            >
              {htmlDecode(videoData.snippet.title)}
            </p>
          </>
        );
      }),
    ]);
  }

  // ================================ youtube.islamicruling ================================
  else if (input.intent === "youtube.islamicruling") {
    input.entities = (input.entities as []).filter(
      ({ entity }) => entity === "subject"
    );
    if (input.entities.length >= 0 && !Boolean(input.entities[0]))
      return (output.answer = "Please enter a valid topic to search for.");

    const variableRegex = RegExp(`<%[${input.entities[0].entity}\\s]+%>`);
    const searchQuery = (input.answer as string).replace(
      variableRegex,
      input.entities[0].utteranceText
    );
    const { data: ytSearchResults }: { data: YouTubeSearchResults } =
      await axios.get(
        getYouTubeSearchApiUrl({
          query: searchQuery,
          channel: "assimalhakeem",
        })
      );

    output.answer = [
      searchQuery,
      ...ytSearchResults.items.map((item, indx) => {
        const videoData = ytSearchResults.items[indx];
        const videoWidth = videoData.snippet.thumbnails.medium.width;
        const videoHeight = videoData.snippet.thumbnails.medium.height;
        const iframUrl = `https://www.youtube.com/embed/${videoData.id.videoId}`;
        return (
          <>
            <iframe
              className="rounded-lg border max-w-full"
              title={input.entities[0].option}
              width={videoWidth}
              height={videoHeight}
              src={iframUrl}
            ></iframe>
            <p
              className="mt-2"
              style={{ maxWidth: videoData.snippet.thumbnails.medium.width }}
            >
              {htmlDecode(videoData.snippet.title)}
            </p>
          </>
        );
      }),
    ];
  }

  // ================================ whatTimeIsIt ================================
  else if (input.intent === "whatTimeIsIt") {
    output.answer = `It is ${time} o'clock.`;
  }

  // ================================ prayer.whenitsprayertime ================================
  else if (input.intent === "prayer.whenitsprayertime") {
    input.entities = (input.entities as []).filter(
      ({ entity }) => entity === "prayer"
    );
    const variableRegex = RegExp(`<%[${input.entities[0].option}\\s]+%>`);
    const answer = (input.answer as string).replace(
      variableRegex,
      input.entities[0].utteranceText
    );
    output.answer = answer;
  }

  // ================================ prayer.getprayertimes ================================
  else if (input.intent === "prayer.getprayertimes") {
    let prayerTimes: PrayerTimeType["timings"] | undefined;

    try {
      prayerTimes = await getPrayerTimes({});
    } catch (err) {
      output.answer = "Something went wrong. Please try again.";
    }

    if (!prayerTimes)
      return (output.answer = "Something went wrong. Please try again.");

    const prayerNames = Object.keys(prayerTimes!);

    prayerNames.map((prayerName) => {
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

    let ans: string[] = prayerNames.map((prayerName) => {
      return `| ${prayerName} | ${dayjs(
        prayerTimes![prayerName as keyof PrayerTimeType["timings"]]
      ).format("h:mm A")} |`;
    });
    ans.unshift("| --- | --- |");
    ans.unshift("| Prayer | Time |");

    output.answer = [
      "Here are the prayer times for today:",
      ans.join("\n"),
      "Remember always to pray on time and renew the remembrance of Allah each time!",
    ];
  }
}
