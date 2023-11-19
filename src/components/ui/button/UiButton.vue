<template>
  <button class="button">
    <slot />
  </button>
</template>

<style lang="sass" scoped>
.button
  padding: 8px 15px
  width: fit-content
  white-space: nowrap
  text-align: center
  box-sizing: border-box
  outline: none
  background-color: var(--overlayBackground)
  border: var(--borderWitdh) solid var(--lighterBorder)
  color: var(--primaryText)
  border-radius: 8px
</style>
