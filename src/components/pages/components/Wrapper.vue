<template>
  <div class="wrapper">
    <span class="wrapper_title">
      <slot name="title" />
    </span>
    <span class="wrapper_description">
      <slot name="description" />
    </span>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="sass">
.wrapper
  width: 100%
  border-radius: 8px
  padding: 32px 44px
  display: flex
  flex-direction: column
  row-gap: 24px
  border: 1px solid var(--lightBorder)

  &_title
    font-size: $extraLargeFontSize
    font-weight: 500
</style>
