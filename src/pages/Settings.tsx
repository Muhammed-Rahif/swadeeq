/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAtomValue } from "jotai";
import { allThemes, setThemeAtom, themeAtom } from "../atoms/theme";
import { capitalize } from "../helpers/string";

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
        <div className="max-w-none">
          <IonText>
            <h2 className="mb-0">Theme</h2>
          </IonText>
          <div className="divider mb-0" />

          <div className="flex justify-between items-center">
            <IonText>
              <p className="my-2 text-base">Change theme</p>
            </IonText>

            <IonList>
              <IonItem>
                <IonSelect
                  onIonChange={(ev) => setThemeAtom(ev.detail.value)}
                  placeholder="Theme"
                  value={theme}
                >
                  {allThemes.map((theme) => (
                    <IonSelectOption key={theme} value={theme}>
                      {capitalize(theme)}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
