<template>
  <div class="input">
    <span
      v-if="label"
      class="input_label"
    >
      {{ label }}
    </span>
    <input
      :value="value"
      :placeholder="placeholder"
      :max="maxNumber"
      :maxlength="maxLength"
      :type="type"
      @input="onInput"
      class="input_default-input"
    >
  </div>
</template>

<script setup lang="ts">
//#region Props/Emits
import { computed } from "vue";

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "update:number", value: number): void;
}>();
const props = defineProps<{
  modelValue?: string | null;
  number?: number | null;
  placeholder?: string;
  label?: string;
  type?: string;
  maxLength?: number;
  max?: number;
}>();
//#endregion

//#region Computeds
const maxNumber = computed(() => props.type === "number" ? props.max : undefined);
const value = computed(() => props.number || props.modelValue);
//#endregion

//#region Handlers
const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  if (props.type === "string") {
    emit("update:modelValue", value);
  } else {
    emit("update:number", Number(value));
  }
};
//endregion
</script>

<style scoped lang="sass">
.input
  display: flex
  flex-direction: column
  align-items: flex-start
  gap: 4px

  &_label
    font-size: 12px
    margin-left: 4px

  &_default-input
    border: 1px solid var(--lightBorder)
    border-radius: 4px
    padding: 1px 11px
    background: none
    outline: none
    width: 100%
    height: 32px
    color: var(--regularText)
    box-sizing: border-box
    font-size: 14px

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button
      -webkit-appearance: none
      margin: 0
</style>
