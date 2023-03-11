import { atom, SetStateAction } from "jotai";
import { THEME_STORE_KEY } from "../constants/store";
import { atomStore } from "./store";

type ThemeAtomType =
  | "dark"
  | "light"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "retro"
  | "cyberpunk"
  | "valentine"
  | "halloween"
  | "garden"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "wireframe"
  | "black"
  | "luxury"
  | "dracula"
  | "cmyk"
  | "autumn"
  | "business"
  | "acid"
  | "lemonade"
  | "night"
  | "coffee"
  | "winter";

export const allThemes = [
  "dark",
  "light",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

const localTheme = localStorage.getItem(THEME_STORE_KEY) ?? "black";

console.log(localTheme, allThemes.includes(localTheme));

const themeAtomInit = atom<ThemeAtomType>(
  allThemes.includes(localTheme) ? (localTheme as ThemeAtomType) : "black"
);

export const themeAtom = atom(
  (get) => get(themeAtomInit),
  (get, set, newStr: SetStateAction<ThemeAtomType>) => {
    console.log(`Set: ${newStr}`);

    set(themeAtomInit, newStr);
    localStorage.setItem(THEME_STORE_KEY, newStr.toString());
  }
);

export function setThemeAtom(theme: ThemeAtomType | string) {
  if (!allThemes.includes(theme)) console.log(`Set: Invalid theme ${theme}}`);

  atomStore.set(themeAtom as any, theme as ThemeAtomType);
}
