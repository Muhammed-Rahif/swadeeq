/* eslint-disable jsx-a11y/anchor-is-valid */
import { Capacitor } from "@capacitor/core";
import {
  Geolocation as NativeGeolocation,
  Position,
} from "@capacitor/geolocation";
import { PrayerTimeType } from "../types/PrayerTimeType";
import axios from "axios";
import { getPrayerTimeApiUrl } from "../constants/api";
import dayjs from "dayjs";

export async function getPrayerTimes({
  mandatoryPrayersOnly = false,
}: {
  mandatoryPrayersOnly?: boolean;
}) {
  let prayerTimes: PrayerTimeType["timings"];
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
          prayerTimes![prayerNames[indx] as keyof PrayerTimeType["timings"]] =
            dayjs(time.substring(0, 25)).toISOString();
        });

        if (mandatoryPrayersOnly) {
          let mandatoryPrayers: any = {};

          Object.values(prayerTimes).map((time, indx) => {
            console.log(Object.keys(prayerTimes!)[indx]);

            if (
              ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(
                Object.keys(prayerTimes!)[indx]
              )
            ) {
              mandatoryPrayers[Object.keys(prayerTimes!)[indx]] = time;
            }
          });
          return mandatoryPrayers;
        }

        return prayerTimes;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
