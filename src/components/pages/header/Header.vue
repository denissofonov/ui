<template>
  <div class="header">
    <div class="header_links">
      <router-link
        class="header_links_link"
        to="/components"
      >
        Компоненты
      </router-link>
      <span
        @click="themeStore.switchTheme"
        class="header_links_link"
      >
        Сменить темы
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
</script>

<style lang="sass" scoped>
.header
  height: 55px
  border-bottom: var(--borderWitdh) solid var(--baseBorder)
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 390px

  &_title
    color: var(--primaryText)
    text-decoration: none
    font-size: $extraLargeFontSize


  &_links
    display: flex
    justify-content: flex-end
    column-gap: 20px

    &_link
      color: var(--primaryText)
      text-decoration: none
</style>
