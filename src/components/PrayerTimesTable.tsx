import React, { useEffect, useState } from "react";
import { getPrayerTimeApiUrl } from "../constants/api";
import axios from "axios";
import { PrayerTimeType } from "../types/PrayerTimeType";
import {
  Geolocation as NativeGeolocation,
  Position,
} from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";
export default function PrayerTimesTable() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeType[]>([]);
  const [isPermissionAllowed, setIsPermissionAllowed] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    async function init() {
      if (Capacitor.isNativePlatform()) {
        const reqForLocation = await NativeGeolocation.requestPermissions();

        if (reqForLocation.coarseLocation === "denied")
          return setIsPermissionAllowed(false);

        if (reqForLocation.coarseLocation === "granted")
          setIsPermissionAllowed(true);
      }
    }
    init();
  }, []);

  useEffect(() => {
    async function init() {
      let coordinates: Position | undefined;
      if (Capacitor.isNativePlatform() && isPermissionAllowed) {
        coordinates = await NativeGeolocation.getCurrentPosition();
      } else {
        navigator.geolocation.getCurrentPosition((crds) => {
          setIsPermissionAllowed(true);
          coordinates = crds;
          axios
            .get(
              getPrayerTimeApiUrl({
                latitude: coordinates.coords.latitude,
                longitude: coordinates.coords.longitude,
                method: 4,
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                isIso8601: false,
              })
            )
            .then((res) => {
              if (res.data.status === "OK") {
                const { data }: { data: PrayerTimeType[] } = res.data;
                setPrayerTimes(data);
              }
            });
        });
      }

      if (!coordinates) return;

      axios
        .get(
          getPrayerTimeApiUrl({
            latitude: coordinates.coords.latitude,
            longitude: coordinates.coords.longitude,
            method: 4,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            isIso8601: false,
          })
        )
        .then((res) => {
          if (res.data.status === "OK") {
            const { data }: { data: PrayerTimeType[] } = res.data;
            setPrayerTimes(data);
          }
        });
    }
    init();
  }, [isPermissionAllowed]);

  return (
    <>
      {isPermissionAllowed ? (
        <div className="overflow-x-auto">
          {prayerTimes[0]?.timings && (
            <table className="table loading w-full">
              <thead>
                <tr>
                  <th>Prayer </th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(prayerTimes[0]?.timings).map((name, indx) => (
                  <tr key={indx}>
                    <th>{name}</th>
                    <td>{Object.values(prayerTimes[0]?.timings)[indx]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <>
          We need your location to show you prayer times. Please allow location
          permission in your app settings.
        </>
      )}
    </>
  );
}
