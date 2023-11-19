<template>
  <div class="components_wrapper">
    <notification />
    <custom-input />
    <custom-select-input />
  </div>
</template>

<script setup lang="ts">
import CustomSelectInput from '@/components/pages/components/CustomSelectInput.vue';
import Notification from "@/components/pages/components/Notification.vue";
import CustomInput from '@/components/pages/components/CustomInput.vue';
</script>

<style scoped lang="sass">
.components_wrapper
  max-width: 1200px
  width: 100%
  margin: 0 auto
  display: flex
  flex-direction: column
  row-gap: 40px
  padding-bottom: 200px
</style>
