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

export default async function onIntent(nlp: any, input: Reply) {
  const output = input;
  const time = dayjs().format("h:mm A");

  switch (input.intent) {
    // ================================ youtube.quranreciatation ================================
    case "youtube.quranreciatation":
      console.log(input);

      return input;
      break;

    // ================================ youtube.islamicruling ================================
    case "youtube.islamicruling":
      console.log(input.entities);

      if (input.entities.length >= 0 && !Boolean(input.entities[0]))
        return (output.answer = "Please enter a valid topic to search for.");

      const variableRegex = RegExp(`<%[${input.entities[0].entity}\\s]+%>`);
      const searchQuery = (input.answer as string).replace(
        variableRegex,
        input.entities[0].option
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
      break;

    // ================================ whatTimeIsIt ================================
    case "whatTimeIsIt":
      output.answer = `It is ${time} o'clock.`;
      break;

    // ================================ prayer.getprayertimes ================================
    case "prayer.getprayertimes":
      let prayerTimes: PrayerTimeType["timings"] | undefined;
      let currentLocation: Position | undefined;

      if (Capacitor.isNativePlatform()) {
        const reqForLocation = await NativeGeolocation.requestPermissions();

        if (reqForLocation.coarseLocation === "granted") {
          currentLocation = await NativeGeolocation.getCurrentPosition();
        }
      } else {
        currentLocation = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
      }

      if (currentLocation) {
        try {
          const response = await axios.get(
            getPrayerTimeApiUrl({
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              method: 4,
              day: new Date().getDate(),
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
              isIso8601: true,
            })
          );

          if (response.data.status === "OK") {
            const { data }: { data: PrayerTimeType } = response.data;
            prayerTimes = data.timings;
            const prayerNames = Object.keys(prayerTimes!);

            Object.values(prayerTimes).map((time, indx) => {
              prayerTimes![
                prayerNames[indx] as keyof PrayerTimeType["timings"]
              ] = dayjs(time.substring(0, 25)).toISOString();
            });

            const upcomingPrayers = Object.values(prayerTimes).filter(
              (time, indx) => {
                return (
                  ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(
                    Object.keys(prayerTimes!)[indx]
                  ) && dayjs(time).isAfter(dayjs())
                );
              }
            );

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
          } else {
            output.answer = "Something went wrong. Please try again.";
          }
        } catch (err: any) {
          console.error(err);

          output.answer = `Something went wrong due to ${err.message}. Please try again.`;
        }
      } else {
        output.answer =
          "We need your location to show you prayer times. Please allow location permission in your app settings, and try again.";
      }
      break;

    default:
      break;
  }

  return input;
}
