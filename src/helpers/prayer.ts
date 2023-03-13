/* eslint-disable jsx-a11y/anchor-is-valid */
import { Capacitor } from "@capacitor/core";
import {
  Geolocation as NativeGeolocation,
  Position,
} from "@capacitor/geolocation";
import { PrayerTimeType, Timings } from "../types/PrayerTimeType";
import axios from "axios";
import { getPrayerTimeApiUrl } from "../constants/api";
import dayjs from "dayjs";

/**
 *
 * Getting prayer times from api
 * @returns "{ Fajr: string, Sunrise: string, Dhuhr: string, ...}"
 */
export async function getPrayerTimes({
  mandatoryPrayersOnly = false,
}: {
  mandatoryPrayersOnly?: boolean;
}): Promise<Timings | undefined> {
  let prayerTimes: Timings;
  let currentLocation: Position | undefined;

  if (Capacitor.isNativePlatform()) {
    // for android
    const reqForLocation = await NativeGeolocation.requestPermissions();

    if (reqForLocation.coarseLocation === "granted") {
      currentLocation = await NativeGeolocation.getCurrentPosition();
    }
  } else {
    // for web
    currentLocation = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  }

  if (currentLocation) {
    try {
      const response = await axios.get(
        // the api url string
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

        // convert prayer times to ISO 8601 format
        Object.values(prayerTimes).map((time, indx) => {
          prayerTimes![prayerNames[indx] as keyof Timings] = dayjs(
            time.substring(0, 25)
          ).toISOString();
        });

        // return only mandatory prayers
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

        // return all prayer times such as Imsak, Sunrise, Fajr, Dhuhr, Asr, Maghrib, Isha, Imsak, Midnight
        return prayerTimes;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
