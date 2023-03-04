import React, { useEffect, useState } from "react";
import { getPrayerTimeApiUrl } from "../constants/api";
import axios from "axios";
import { PrayerTimeType } from "../types/PrayerTimeType";
import { Geolocation } from "@capacitor/geolocation";

export default function PrayerTimesTable() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeType[]>([]);
  const [isPermissionAllowed, setIsPermissionAllowed] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    async function init() {
      const reqForLocation = await Geolocation.requestPermissions();

      if (reqForLocation.coarseLocation === "denied")
        return setIsPermissionAllowed(false);

      if (reqForLocation.coarseLocation === "granted")
        setIsPermissionAllowed(true);
    }
    init();
  }, []);

  useEffect(() => {
    async function init() {
      if (!isPermissionAllowed) return;
      const coordinates = await Geolocation.getCurrentPosition();

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
                  <tr>
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
