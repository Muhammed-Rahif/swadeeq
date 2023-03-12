import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "tech.rahif.swadeeq",
  appName: "Swadeeq",
  webDir: "build",
  bundledWebRuntime: false,
  backgroundColor: "#00000000",
  android: {
    backgroundColor: "#00000000",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 1000,
      backgroundColor: "#00000000",
    },
  },
};

export default config;
