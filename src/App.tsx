import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Home from "./pages/Home";
import { BiHomeAlt } from "react-icons/bi";

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
/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <div data-theme="cofee">
        <IonRouterOutlet>
          <Route exact path="/">
            <Home />
          </Route>
        </IonRouterOutlet>

        <div className="btm-nav">
          <button>
            <BiHomeAlt />
          </button>
          <button className="active">
            <BiHomeAlt />
          </button>
          <button>
            <BiHomeAlt />
          </button>
        </div>
      </div>
    </IonReactRouter>
  </IonApp>
);

export default App;
