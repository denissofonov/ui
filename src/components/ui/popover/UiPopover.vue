<template>
  <div
    ref="element"
    class="ui-popover"
    @mouseenter="togglePopoverVisibility(true)"
    @mouseleave="togglePopoverVisibility(false)"
  >
    <teleport to="body">
      <transition name="fade">
        <div
          v-show="isShowPopover"
          ref="popover"
          class="ui-popover_wrapper"
          :style="insetProperty"
        >
          <div
            class="ui-popover_wrapper_arrow"
            :class="{ [`ui-popover_wrapper_arrow--${placement}`]: true }"
          />
          <div class="ui-popover_wrapper_content-box">
            <div
              v-if="title"
              class="ui-popover_wrapper_content-box_title"
            >
              {{ title }}
            </div>
            <div class="ui-popover_wrapper_content-box_content">
              {{ content }}
            </div>
          </div>
        </div>
      </transition>
    </teleport>
    <slot />
  </div>
</template>

<script setup lang="ts">
import {computed, ref } from 'vue';
import type { StyleValue } from 'vue'
import type { PopoverPlacement, PopoverTrigger } from '@/components/ui/popover/types';
import { PopoverPlacementEnum, PopoverTriggerEnum } from '@/components/ui/popover/types';

const props = withDefaults(
  defineProps<{
    title?: string;
    content: string;
    trigger?: PopoverTrigger;
    placement?: PopoverPlacement;
  }>(),
  {
    trigger: PopoverTriggerEnum.hover,
    placement: PopoverPlacementEnum.top,
  },
);

const isShowPopover = ref(false);
const element = ref<HTMLDivElement | null>(null);
const popover = ref<HTMLDivElement | null>(null);

const insetProperty = computed<StyleValue | undefined>(() => {
  if (popover.value && element.value) {
    const elementRect = element.value.getBoundingClientRect();
    const popoverRect = popover.value.getBoundingClientRect();
    let top, left;

    switch (props.placement) {
      case PopoverPlacementEnum.top:
        top = elementRect.top - popoverRect.height - 12;
        left = elementRect.left + elementRect.width / 2 - popoverRect.width / 2;
        break;
      case PopoverPlacementEnum.bottom:
        top = elementRect.top + elementRect.height + 12;
        left = elementRect.left - elementRect.width - popoverRect.width / 2;
        break;
      case PopoverPlacementEnum.left:
        top = elementRect.top - popoverRect.height / 2 + elementRect.height / 2;
        left = elementRect.left - popoverRect.width - 12;
        break;
      case PopoverPlacementEnum.right:
        top = elementRect.top - popoverRect.height / 2 + elementRect.height / 2;
        left = elementRect.left + elementRect.width + 12;
        break;
      default:
        return "";
    }
    return {
      top: `${top}px`,
      left: `${left}px`,
      position: "fixed",
    };
  }
  else {
    return;
  }
});

const togglePopoverVisibility = (value: boolean) => {
  if (props.trigger === PopoverTriggerEnum.hover) {
    isShowPopover.value = value;
  }
};
</script>

<style lang="sass">
.ui-popover
  position: relative
  width: fit-content

  &_wrapper
    position: absolute
    background-color: var(--overlayBackground)
    border: 1px solid var(--lighterBorder)
    border-radius: 4px
    min-width: 80px
    max-width: 200px
    padding: 10px
    z-index: 1000

    &_content-box
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      color: var(--primaryText)
      gap: 8px
      word-break: break-word

      &_title
        font-weight: 500

      &_content
        font-size: $baseFontSize

    &_arrow
      width: 10px
      height: 10px
      background-color: var(--overlayBackground)
      position: absolute

      &--bottom
        bottom: calc(100% - 5px)
        left: 50%
        transform: translateX(-50%) rotate(45deg)
        border-left: 1px solid var(--lighterBorder)
        border-top: 1px solid var(--lighterBorder)
        border-radius: 2px

      &--top
        top: calc(100% - 5px)
        left: 50%
        transform: translateX(-50%) rotate(45deg)
        border-bottom: 1px solid var(--lighterBorder)
        border-right: 1px solid var(--lighterBorder)
        border-radius: 2px

      &--left
        top: calc(50% - 5px)
        right: 0
        transform: translateX(50%) rotate(45deg)
        border-right: 1px solid var(--lighterBorder)
        border-top: 1px solid var(--lighterBorder)
        border-radius: 2px

      &--right
        top: calc(50% - 5px)
        transform: translateX(-150%) rotate(45deg)
        border-left: 1px solid var(--lighterBorder)
        border-bottom: 1px solid var(--lighterBorder)
        border-radius: 2px

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
