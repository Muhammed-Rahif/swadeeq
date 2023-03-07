import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  ScrollDetail,
} from "@ionic/react";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

function Card({ index }: { index: number }): JSX.Element {
  const [checked, setChecked] = useState(false);

  return (
    <div className="card bg-base-100 shadow-xl my-2 border">
      <div className="card-body p-6 flex flex-row">
        <div>
          <h6 className="card-title">To get whatever you desire {index} </h6>
          <p className="my-2">Morning and Evening Dhikr</p>
          <p className="my-1 leading-4 opacity-50">
            <small className="text-xs">
              Ḥasbiyallāhu lā ilāha illā huwa `alayhi tawakkalt, wa huwa Rabbu
              ‘l-`Arshi ‘l-'Aẓīm.
            </small>
          </p>
        </div>
        <div className="card-actions items-center justify-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="checkbox checkbox-lg"
          />
        </div>
      </div>
    </div>
  );
}

const Dhikrs: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback((ev: CustomEvent<ScrollDetail>) => {
    if (ev.detail.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  return (
    <IonPage>
      <IonContent
        scrollEvents
        onIonScroll={handleScroll}
        style={{ "--background": "hsla(var(--b1) / var(--tw-bg-opacity, 1))" }}
        className="ion-padding ![background:transparent]"
      >
        <div className="prose lg:prose-lg h-full">
          <div className="hero py-12 rounded-xl border bg-red-200">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Hello there</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>

          {new Array(10).fill(0).map((_, index) => (
            <Card key={index} index={index} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dhikrs;
