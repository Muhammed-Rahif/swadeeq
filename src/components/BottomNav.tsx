import {
  IonFooter,
  IonRouterLink,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { IoSettingsSharp, IoHome, IoHeart } from "react-icons/io5";

interface BottomNavProps {}

const navs = [
  {
    path: "/chat-bot",
    icon: <IoHome />,
  },
  {
    path: "/donate",
    icon: <IoHeart />,
  },
  {
    path: "/settings",
    icon: <IoSettingsSharp />,
  },
];

const BottomNav: React.FC<BottomNavProps> = () => {
  const router = useIonRouter();

  return (
    <div className="btm-nav">
      {navs.map((nav, index) => (
        <IonRouterLink
          className={`text-current ${
            router.routeInfo.pathname === nav.path ? "active" : ""
          }`}
          routerLink={nav.path}
          key={index}
        >
          {nav.icon}
        </IonRouterLink>
      ))}
    </div>
  );
};

export default BottomNav;
