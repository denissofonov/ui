import { themeEnum } from "../types/stores/theme";
import { darkColors } from "../helpers/darkColors";
import { lightColors } from "../helpers/lightColors";
import { useThemeStore } from "../stores/theme";

export const changeTheme = () => {
  const theme = useThemeStore().theme;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(
    theme === themeEnum.dark ? darkColors : lightColors,
  )) {
    root.style.setProperty(key, value);
  }
};
