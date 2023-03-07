import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <div data-theme="black" className="">
        <IonRouterOutlet>
          <Route exact path="/">
            <Redirect to="/chat-bot" />
          </Route>
          <Route path="/chat-bot" component={ChatBot} />
        </IonRouterOutlet>

        {/* <BottomNav /> */}
      </div>
    </IonReactRouter>
  </IonApp>
);

export default App;
