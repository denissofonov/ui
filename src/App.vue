<template>
  <div
    class="app"
    :class="theme"
  >
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from "vue";
import { changeTheme } from "./composables/changeTheme";
import { useThemeStore } from "./stores/theme";
import { darkColors } from "./helpers/darkColors";
import Header from "./components/pages/header/Header.vue";

const themeStore = useThemeStore();
const theme = computed(() => themeStore.theme);

const setRootVariables = () => {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(darkColors)) {
    root.style.setProperty(key, value);
  }
};

watch(theme, changeTheme);

onMounted(setRootVariables);
</script>

<style lang="sass">
@import "assets/fonts/stylesheet.css"
.app
  font-family: 'HelveticaNeueCyr'
  min-height: 100vh
  background-color: var(--pageBackground)
  display: flex
  flex-direction: column
  color: var(--primaryText)
  row-gap: 70px
</style>
