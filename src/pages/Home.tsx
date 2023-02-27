import { IonContent, IonPage } from "@ionic/react";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { getPrayerTimeApiUrl } from "../constants/api";
import { PrayerTimeType, Timings } from "../types/PrayerTimeType";
import { useGeolocated } from "react-geolocated";
import { Geolocation } from "@capacitor/geolocation";

const Home: React.FC = () => {
  const [min, setMin] = useState(1);
  const [sec, setSec] = useState(60);

  const [nextPrayerTime, setNextPrayerTime] = useState<Date | false>(
    new Date(new Date().getTime() + 1 * 60000)
  );

  useEffect(() => {
    if (!nextPrayerTime) return;
    const interval = setInterval(() => {
      setMin(
        Math.floor((nextPrayerTime.getTime() - new Date().getTime()) / 60000)
      );
      setSec(
        Math.floor(
          ((nextPrayerTime.getTime() - new Date().getTime()) % 60000) / 1000
        )
      );

      if (min === 0 && sec === 0) {
        setMin(0);
        setSec(0);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [min, nextPrayerTime, sec]);

  useEffect(() => {
    (async () => {
      const coordinates = await Geolocation.getCurrentPosition();

      axios
        .get(
          getPrayerTimeApiUrl({
            latitude: coordinates.coords.latitude,
            longitude: coordinates.coords.latitude,
            method: 4,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
          })
        )
        .then((res) => {
          if (res.data.status === "OK") {
            const { data }: { data: PrayerTimeType[] } = res.data;

            const prayerNames = Object.keys(data[0].timings).filter((name) => {
              if (
                ![
                  "Imsak",
                  "Midnight",
                  "Firstthird",
                  "Lastthird",
                  "Sunset",
                  "Sunrise",
                ].includes(name)
              )
                return true;
            });
            const prayerTimes: Date[] = prayerNames.map((prayerName) => {
              return new Date(
                data[0].timings[prayerName as keyof Timings].replace(
                  " (IST)",
                  ""
                )
              );
            });

            console.log(prayerNames);

            prayerTimes.sort(function (a: any, b: any) {
              var distancea = Math.abs((new Date(Date.now()) as any) - a);
              var distanceb = Math.abs((new Date(Date.now()) as any) - b);
              return distancea - distanceb; // sort a before b when the distance is smaller
            });

            if (prayerTimes[0] < new Date(Date.now())) {
              const nextDayFajrTime = new Date(
                new Date(data[1].timings.Fajr.replace(" (IST)", "")).setDate(
                  new Date().getDate() + 1
                )
              );
              console.log(nextDayFajrTime);

              setNextPrayerTime(false);
            } else setNextPrayerTime(prayerTimes[0]);
          } else {
            console.log(res.data);
          }
        })
        .catch(console.error);
    })();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <article className="p-3 prose lg:prose-lg h-full">
          <div className="flex justify-center h-full flex-col items-center">
            <h3 className="mb-0">Dear</h3>
            <h1>
              <strong>Servent of Allah,</strong>
            </h1>
            <p className="text-center">For your next prayer you have</p>

            <div className="flex justify-center items-center">
              {nextPrayerTime ? (
                <>
                  <div>
                    <h1 className="countdown text-8xl mb-4">
                      <span
                        style={{ "--value": min } as React.CSSProperties}
                      ></span>
                    </h1>
                    min
                  </div>
                  <div>
                    <h1 className="countdown text-8xl mb-4">
                      <span
                        style={{ "--value": sec } as React.CSSProperties}
                      ></span>
                    </h1>
                    sec
                  </div>
                </>
              ) : (
                <div></div>
              )}
            </div>

            <div className="divider">Thank you!</div>
          </div>
        </article>
      </IonContent>
    </IonPage>
  );
};

export default Home;
