import { IonContent, IonPage } from "@ionic/react";
import React, { useState, useEffect } from "react";

function Card(): JSX.Element {
  const [checked, setChecked] = useState(false);

  return (
    <div className="card bg-base-100 shadow-xl my-2">
      <div className="card-body p-6 flex flex-row">
        <div>
          <h6 className="card-title">To get whatever you desire</h6>
          <p className="my-2">Morning and Evening Dhikr</p>
        </div>
        <div className="card-actions items-center justify-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="checkbox"
          />
        </div>
      </div>
    </div>
  );
}

const Dhikrs: React.FC = () => {
  return (
    <IonPage>
      <IonContent
        style={{ "--background": "trasparent" }}
        className="ion-padding ![background:transparent]"
      >
        <div className="prose lg:prose-lg h-full">
          <div>
            <h4 className="mb-0">Dear</h4>
            <h2 className="text-3xl">
              <strong>Servent of Allah,</strong>
            </h2>
          </div>

          {new Array(10).fill(0).map((_, index) => (
            <Card />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dhikrs;
