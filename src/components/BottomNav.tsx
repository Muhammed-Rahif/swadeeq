import { IonRouterLink, useIonRouter } from "@ionic/react";
import { BiHomeAlt } from "react-icons/bi";

interface BottomNavProps {}

const navs = [
  {
    path: "/dhikrs",
    icon: <BiHomeAlt />,
  },
  {
    path: "/some",
    icon: <BiHomeAlt />,
  },
  {
    path: "/another",
    icon: <BiHomeAlt />,
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
