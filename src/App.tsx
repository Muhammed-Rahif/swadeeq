import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterLink,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
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
import { useAtomValue } from "jotai";
import { themeAtom } from "./atoms/theme";
import Donate from "./pages/Donate";
import Settings from "./pages/Settings";
import { LocalNotifications } from "@capacitor/local-notifications";
import { getPrayerTimes } from "./helpers/prayer";
import dayjs from "dayjs";
import { Timings } from "./types/PrayerTimeType";
import relativeTime from "dayjs/plugin/relativeTime";
import { brainAtom } from "./atoms/brain";
import { getBrainReply, trainBrain } from "./brain";

import { home, cog, heart } from "ionicons/icons";

dayjs.extend(relativeTime);

setupIonicReact({
  mode: "ios",
});

const tabRoutes = [
  {
    path: "/chat-bot",
    icon: home,
    name: "Home",
  },
  {
    path: "/donate",
    icon: heart,
    name: "Donate",
  },
  {
    path: "/settings",
    icon: cog,
    name: "Settings",
  },
];

const App: React.FC = () => {
  const brain = useAtomValue(brainAtom);
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    async function startUp() {
      // hide splash screen manually
      await SplashScreen.hide();

      // traning the nlp brain
      await trainBrain();
    }
    if (!brain) startUp();
  }, []);

  useEffect(() => {
    (async () => {
      if (!brain) return;

      await getBrainReply("get prayer times");
    })();
  }, [brain]);

  useEffect(() => {
    if (!theme) return;
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/">
              <Redirect to="/chat-bot" />
            </Route>
            <Route path="/chat-bot" component={ChatBot} />
            <Route path="/donate" component={Donate} />
            <Route path="/settings" component={Settings} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            {tabRoutes.map(({ name, path, icon }, index) => (
              <IonTabButton tab={path} href={path} key={index}>
                <IonIcon aria-hidden="true" icon={icon} />
                <IonLabel>{name}</IonLabel>
              </IonTabButton>
            ))}
          </IonTabBar>
          <BottomNav />
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
