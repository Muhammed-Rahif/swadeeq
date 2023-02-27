import { IonContent, IonPage } from "@ionic/react";
import React, { useState, useEffect, useMemo } from "react";

const Home: React.FC = () => {
  const [min, setMin] = useState(15);
  const [sec, setSec] = useState(60);

  // set time to 15 min later frmo now
  const prayerTimes = useMemo(
    () => new Date(new Date().getTime() + 15 * 60 * 1000),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMin(
        Math.floor((prayerTimes.getTime() - new Date().getTime()) / 60000)
      );
      setSec(
        Math.floor(
          ((prayerTimes.getTime() - new Date().getTime()) % 60000) / 1000
        )
      );

      if (min === 0 && sec === 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [min, sec]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <article data-theme="luxury" className="p-3 prose lg:prose-lg h-full">
          <div className="flex justify-center h-full flex-col items-center">
            <h3 className="mb-0">Dear</h3>
            <h1>
              <strong>Servent of Allah,</strong>
            </h1>
            <p className="text-center">For your next prayer you have</p>

            <div className="flex justify-center items-center">
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
            </div>

            <div className="divider">Thank you!</div>
          </div>
        </article>
      </IonContent>
    </IonPage>
  );
};

export default Home;
