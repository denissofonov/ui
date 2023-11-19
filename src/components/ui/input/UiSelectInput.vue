<template>
  <div
    class="select-input"
    @mouseenter="isShowSelect = true"
  >
    <div ref="input">
      <ui-input :model-value="inputValue" />
    </div>
    <teleport to="body">
      <div
        v-if="isShowSelect"
        ref="select"
        :style="selectStyle"
        class="select-input_select"
      >
        <div
          v-for="item in items"
          :key="item.value"
          class="select-input_select_item"
          @click="setCurrentInputValue(item)"
        >
          {{ item.label || item.value }}
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import UiInput from "./UiInput.vue";
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import type { InputSelectItem } from '@/components/ui/input/types';

defineProps<{
  modelValue?: string | null;
  number?: number;
  placeholder?: string;
  label?: string;
  type?: string;
  maxLength?: number;
  max?: number;
  items: InputSelectItem[];
  multiple?: boolean;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const input = ref<HTMLDivElement | null>(null);
const select = ref<HTMLDivElement | null>(null);
const inputPosition = reactive({ left: 0, top: 0 });
const inputSize = reactive({ width: 0, height: 0 });
const scrollY = ref(0);
const isShowSelect = ref(false);
const inputValue = ref<string | null>(null);

const selectStyle = computed(() => {
  return {
    left: inputPosition.left + "px",
    top: inputPosition.top - scrollY.value + inputSize.height + 8 + "px",
    width: inputSize.width + "px",
  };
});

const setCurrentInputValue = (item: InputSelectItem) => {
  inputValue.value = item?.label || String(item.value);
  emit("update:modelValue", String(item.value));
};

const handleScroll = () => (scrollY.value = window.scrollY);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
  const inputRect = input.value!.getBoundingClientRect();
  inputPosition.top = inputRect.top + window.scrollY;
  inputPosition.left = inputRect.left;
  inputSize.width = inputRect.width;
  inputSize.height = inputRect.height;
});

onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));
</script>

<style scoped lang="sass">
.select-input
  display: flex
  flex-direction: column
  row-gap: 4px

  &_select
    position: fixed
    border: 1px solid var(--lightBorder)
    border-radius: 4px
    background-color: var(--overlayBackground)
    box-sizing: border-box
    padding: 8px
    color: var(--primaryText)
    display: flex
    flex-direction: column
    row-gap: 8px

    &_item
      cursor: pointer
</style>
