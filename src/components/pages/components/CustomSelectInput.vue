<template>
  <wrapper>
    <template #title>
      Селект инпут
    </template>
    <template #description>
      Обычный селект инпут
    </template>
    <div class="test">
      <div class="select-inputs">
        <ui-select-input
          v-model="inputValue"
          placeholder="placeholder"
          label="Селект инпут"
          :items="items"
          :multiple="true"
        />
        <br>
        <br>
        <br>
        <br>
        {{ inputValue }}
      </div>
    </div>
  </wrapper>
</template>
<script setup lang="ts">
import { ref } from "vue";
import UiSelectInput from '@/components/ui/input/UiSelectInput.vue';
import Wrapper from '@/components/pages/components/Wrapper.vue';

const inputValue = ref<string | null>(null);
const items = ref([
  { label: "text", value: "text" },
  { label: "text2", value: "text2" },
]);
</script>

<style lang="sass" scoped>
.select-inputs
  display: flex
  flex-direction: column
  row-gap: 16px
  width: 300px
</style>
