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
      let prayerTimes: PrayerTimeType[] | undefined;
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
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
              isIso8601: false,
            })
          );

          if (response.data.status === "OK") {
            const { data }: { data: PrayerTimeType[] } = response.data;
            prayerTimes = data;

            let ans: string[] = Object.keys(prayerTimes[0].timings).map(
              (prayerName) => {
                return `| ${prayerName} | ${
                  prayerTimes![0].timings[
                    prayerName as keyof PrayerTimeType["timings"]
                  ]
                } |`;
              }
            );
            ans.unshift("| --- | --- |");
            ans.unshift("| Prayer | Time |");

            output.answer = ans.join("\n");
          } else {
            output.answer = "Something went wrong. Please try again.";
          }
        } catch (err: any) {
          output.answer = `Something went wrong. Please try again. (<small>${err.message}</small>)`;
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
