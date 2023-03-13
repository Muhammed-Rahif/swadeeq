import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { SplashScreen } from "@capacitor/splash-screen";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Tailwind styles */
import "./theme/tailwind.css";
import ChatBot from "./pages/ChatBot";
/* Theme variables */
import "./theme/variables.css";
import "./theme/styles.css";
import { useCallback, useEffect } from "react";
import BottomNav from "./components/BottomNav";
import { useAtom, useAtomValue } from "jotai";
import { themeAtom } from "./atoms/theme";
import Donate from "./pages/Donate";
import Settings from "./pages/Settings";
import { LocalNotifications } from "@capacitor/local-notifications";
import { getPrayerTimes } from "./helpers/prayer";
import dayjs from "dayjs";
import { PrayerTimeType } from "./types/PrayerTimeType";
import relativeTime from "dayjs/plugin/relativeTime";
import { brainAtom } from "./atoms/brain";
import { getReply, trainBrain } from "./brain";

dayjs.extend(relativeTime);

setupIonicReact();

const App: React.FC = () => {
  const theme = useAtomValue(themeAtom);
  const [brain, setBrain] = useAtom(brainAtom);

  useEffect(() => {
    async function startUp() {
      // hide splash screen manually
      await SplashScreen.hide();

      // traning the nlp brain
      const brain = await trainBrain();
      setBrain(brain);
    }
    if (!brain) startUp();
  }, []);

  const setupPrayerNotifications = useCallback(async () => {
    const prayerTimes = await getPrayerTimes({ mandatoryPrayersOnly: true });
    console.log({ prayerTimes });

    const prayerNames = Object.keys(prayerTimes!);
    prayerNames.map(async (prayerName, indx) => {
      const prayerQuote = (await getReply(`its time to pray ${prayerName}`))
        .answers;

      LocalNotifications.schedule({
        notifications: [
          {
            body: prayerQuote[0].answer,
            id: new Date(prayerTimes[indx]).getTime(),
            schedule: {
              at: dayjs(
                prayerTimes![prayerName as keyof PrayerTimeType["timings"]]
              ).toDate(),
            },
            title: prayerQuote[1].answer,
            summaryText: `${prayerName} prayer, nothing else matters.`,
            iconColor: "#FF0000",
            smallIcon: "splash",
            largeIcon: "prayer",
            largeBody:
              '"who believe in the unseen, establish prayer, and donate from what We have provided for them, " - Quran 2:3',
            attachments: [
              {
                id: "splash",
                url: "prayer",
              },
            ],
          },
        ],
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (!brain) return;

      await setupPrayerNotifications();
    })();
  }, [brain, setupPrayerNotifications]);

  return (
    <IonApp>
      <IonReactRouter>
        <div data-theme={theme}>
          <IonRouterOutlet className="mb-16">
            <Route exact path="/">
              <Redirect to="/chat-bot" />
            </Route>
            <Route path="/chat-bot" component={ChatBot} />
            <Route path="/donate" component={Donate} />
            <Route path="/settings" component={Settings} />
          </IonRouterOutlet>

          <BottomNav />
        </div>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
