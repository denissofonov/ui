import { defineStore } from "pinia";
import type {themeStoreStateType} from '@/types/stores/theme';
import { themeEnum } from '@/types/stores/theme';


export const useThemeStore = defineStore({
  id: "themeStore",
  state: (): themeStoreStateType => ({
    theme: themeEnum.dark,
  }),
  actions: {
    switchTheme(): void {
      this.theme =
          this.theme === themeEnum.dark ? themeEnum.light : themeEnum.dark;
    },
  },
});