import {
  IonIcon,
  IonLabel,
  IonRouterLink,
  IonTabBar,
  IonTabButton,
  useIonRouter,
} from "@ionic/react";
import { IoSettingsSharp, IoHome, IoHeart } from "react-icons/io5";

interface BottomNavProps {}

const navs = [
  {
    path: "/chat-bot",
    icon: "home-outline",
    name: "Home",
  },
  {
    path: "/donate",
    icon: "heart-outline",
    name: "Donate",
  },
  {
    path: "/settings",
    icon: "cog-outline",
    name: "Settings",
  },
];

const BottomNav: React.FC<BottomNavProps> = () => {
  return (
    <IonTabBar slot="bottom">
      <div className="btm-nav duration-300">
        {navs.map(({ name, path, icon }, index) => (
          <IonTabButton tab="tab1" href={path}>
            <IonIcon aria-hidden="true" icon={icon} />
            <IonLabel>{name}</IonLabel>
          </IonTabButton>
          // <IonRouterLink
          //   className={`text-current ${
          //     router.routeInfo.pathname === nav.path ? "active" : ""
          //   }`}
          //   routerLink={nav.path}
          //   key={index}
          // >
          //   {nav.icon}
          // </IonRouterLink>
        ))}
      </div>
    </IonTabBar>
  );
};

export default BottomNav;
