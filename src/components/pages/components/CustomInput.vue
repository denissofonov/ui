<template>
  <wrapper>
    <template #title>
      Инпут
    </template>
    <template #description>
      Обычный инпут
    </template>
    <div class="inputs">
      <ui-input
        v-model="inputValue"
        :placeholder="placeholder || undefined"
        :label="label || undefined"
      />
      <ui-input
        v-model="label"
        label="Label"
        placeholder="Label"
      />
      <ui-input
        v-model="placeholder"
        label="Placeholder"
        placeholder="Placeholder"
      />
    </div>
  </wrapper>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Wrapper from '@/components/pages/components/Wrapper.vue';
import UiInput from '@/components/ui/input/UiInput.vue';

const inputValue = ref<string | null>(null);
const placeholder = ref<string | null>(null);
const label = ref<null | string>(null);
</script>

<style lang="sass" scoped>

.inputs
  display: flex
  flex-direction: column
  row-gap: 16px
  width: 300px
</style>
