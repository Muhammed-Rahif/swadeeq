import { atom, SetStateAction } from "jotai";
import { THEME_STORE_KEY } from "../constants/store";
import { atomStore } from "./store";

type ThemeAtomType = "dark" | "light";

export const allThemes = ["dark", "light"];

const localTheme = localStorage.getItem(THEME_STORE_KEY) ?? "dark";

const themeAtomInit = atom<ThemeAtomType>(
  allThemes.includes(localTheme) ? (localTheme as ThemeAtomType) : "dark"
);

export const themeAtom = atom(
  (get) => get(themeAtomInit),
  (get, set, newStr: SetStateAction<ThemeAtomType>) => {
    set(themeAtomInit, newStr);
    localStorage.setItem(THEME_STORE_KEY, newStr.toString());
  }
);

export function setThemeAtom(theme: ThemeAtomType | string) {
  if (!allThemes.includes(theme)) console.log(`Set: Invalid theme ${theme}}`);

  atomStore.set(themeAtom as any, theme as ThemeAtomType);
}
