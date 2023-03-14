/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAtomValue } from "jotai";
import { allThemes, setThemeAtom, themeAtom } from "../atoms/theme";

const Settings: React.FC = () => {
  const theme = useAtomValue(themeAtom);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="prose max-w-none">
          <h2 className="mb-0">Theme</h2>
          <div className="divider mb-0" />

          <div className="flex justify-between items-center">
            <p className="my-2 text-base">Change theme</p>

            <div className="dropdown dropdown-left dropdown-down">
              <label
                tabIndex={0}
                className="btn btn-sm capitalize outline-neutral-content outline outline-1 active:outline-neutral-content focus:outline-neutral-content"
              >
                {theme}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content bg-base-100 capitalize menu p-2 shadow-lg flex-nowrap rounded-box w-52 max-h-72 overflow-y-scroll flex-col overflow-x-hidden"
              >
                {allThemes.map((theme) => (
                  <li key={theme} className="my-2">
                    <a
                      onClick={() => setThemeAtom(theme)}
                      className="no-underline py-1"
                    >
                      {theme}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
