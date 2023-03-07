import { Capacitor } from "@capacitor/core";
import dayjs from "dayjs";
import { Reply } from "../types/Reply";
import {
  Geolocation as NativeGeolocation,
  Position,
} from "@capacitor/geolocation";
import { PrayerTimeType } from "../types/PrayerTimeType";
import axios from "axios";
import { getPrayerTimeApiUrl } from "../constants/api";

export default async function onIntent(nlp: any, input: Reply) {
  const output = input;
  const time = dayjs().format("h:mm A");

  switch (input.intent) {
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
