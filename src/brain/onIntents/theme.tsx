// 'theme' related onintents
import { atomStore } from "../../atoms/store";
import { allThemes, setThemeAtom, themeAtom } from "../../atoms/theme";
import { BrainReply } from "../../types/BrainReply";

/**
 * To get the current theme.
 * when intent === "theme.whichTheme"
 */
export const whichTheme = async (input: BrainReply): Promise<BrainReply> => {
  const variableRegex = RegExp(`<%[theme\\s]+%>`);
  input.answer = input.answer
    ? (input.answer as string).replace(
        variableRegex,
        `'**${atomStore.get(themeAtom)}**'`
      )
    : "";

  return input;
};

/**
 * To change current theme.
 * when intent === "theme.changeTheme"
 */
export const changeTheme = async (input: BrainReply): Promise<BrainReply> => {
  const theme = input.entities[0]?.option;

  // component dropdown to select theme
  const changeThemeSelector = (
    <div className="dropdown dropdown-top">
      <label
        tabIndex={0}
        className="btn btn-sm outline-neutral-content outline outline-1 active:outline-neutral-content focus:outline-neutral-content"
      >
        Change theme
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-100 capitalize menu p-2 shadow-lg flex-nowrap rounded-box w-52 max-h-72 overflow-y-scroll flex-col overflow-x-hidden"
      >
        {allThemes.map((theme) => (
          <li key={theme} className="prose max-w-none">
            <a onClick={() => setThemeAtom(theme)} className="no-underline">
              {theme}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  // check if user inputted theme name is valid
  if (theme && allThemes.includes(theme)) setThemeAtom(theme);
  else
    input.answer = [
      theme && !allThemes.includes(theme)
        ? "This theme is not available, you can select a theme from available themes below."
        : "Of course, select a theme from your preferences.",
      changeThemeSelector,
    ];

  input.answer = `Changed theme to ${theme}`;
  return input;
};
