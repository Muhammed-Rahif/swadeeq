import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "tech.rahif.swadeeq",
  appName: "Swadeeq",
  webDir: "build",
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: false,
      launchFadeOutDuration: 1000,
      backgroundColor: "#00000000",
    },
  },
};

export default config;
