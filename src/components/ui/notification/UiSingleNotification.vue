<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="isShowNotification"
        @click="onClick"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        :style="notificationStyle"
        class="ui-notification"
      >
        <div class="ui-notification_content">
          <span class="ui-notification_content_title">
            {{ notification.title }}
          </span>
          <span class="ui-notification_content_description">
            {{ notification.description }}
          </span>
        </div>
        <ui-notification-close-svg
          v-if="!notification.duration"
          class="ui-notification_close-button"
          @click="removeNotification"
        />
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { useNotificationStore } from "./store";
import { computed, onMounted, ref } from "vue";
import type { INotificationWithId } from "./types";
import UiNotificationCloseSvg from "./UiNotificationCloseSvg.vue";

//#region Props/Emits
const props = defineProps<{
  notification: INotificationWithId;
  index: number;
  horizontalPosition: string;
  verticalPosition: string;
  duration: number;
  handlers: boolean;
  horizontalIndent: number;
  verticalIndent: number;
}>();
const emit = defineEmits<{
  (e: "mouseLeave", notification: INotificationWithId): void;
  (e: "mouseEnter", notification: INotificationWithId): void;
  (e: "click", notification: INotificationWithId): void;
}>();
//#endregion

//region Consts
const notificationStore = useNotificationStore();
const isShowNotification = ref(false);
let timer: NodeJS.Timeout;
//endregion

//#region Computeds
const duration = computed(() => props.notification?.duration || props.duration);

const isActiveHandlers = computed(
  () => props.notification?.handlers || props.handlers,
);

const verticalIndent = computed(() => {
  if (props.index === 0) {
    return props.verticalIndent;
  } else {
    let notificationElements = Array.from(document.getElementsByClassName("ui-notification")).slice(0, props.index + 1);
    notificationElements = notificationElements.filter(i => i.className !== "ui-notification fade-leave-from fade-leave-active");
    let top = props.verticalIndent;
    notificationElements.forEach((i) => {
      top += i.clientHeight + 2 + 18;
    });
    return top;
  }
});

const notificationStyle = computed(() => {
  return {
    [props.verticalPosition]: verticalIndent.value + `px`,
    [props.horizontalPosition]: props.horizontalIndent + `px`,
  };
});
//#endregion

//#region Functions
const removeNotification = () => {
  isShowNotification.value = false;
  setTimeout(() => {
    notificationStore.notifications = notificationStore.notifications.filter(
      (i: INotificationWithId) => {
        return i.id !== props.notification.id;
      },
    );
  }, 0);
};

const startTimer = () => {
  if (!duration.value) return;
  setTimeout(removeNotification, duration.value);
};

const stopTimer = () => clearTimeout(timer);
//#endregion

//#Handlers
const onMouseEnter = () => {
  stopTimer();
  if (isActiveHandlers.value) emit("mouseEnter", props.notification);
};

const onMouseLeave = () => {
  startTimer();
  if (isActiveHandlers.value) emit("mouseLeave", props.notification);
};

const onClick = () => {
  if (isActiveHandlers.value) emit("click", props.notification);
};
//#endregion

//#region Hooks
onMounted(() => {
  isShowNotification.value = true;
  if (duration.value) {
    timer = setTimeout(() => {
      removeNotification();
    }, duration.value);
  }
});
//endregion
</script>

<style lang="sass">
.ui-notification
  font-family: 'HelveticaNeueCyr', serif
  color: var(--primaryText)
  background-color: var(--overlayBackground)
  border-radius: 8px
  border: 1px solid var(--lighterBorder)
  width: 290px
  position: fixed
  transition: all 0.5s ease
  display: flex
  justify-content: space-between
  align-items: start
  padding: 20px

  &_content
    width: 84%
    display: flex
    flex-direction: column
    gap: 20px
    word-wrap: break-word

    &_title
      font-size: 18px
      font-weight: 700

  &_close-button
    width: 24px

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.3s ease
  height: fit-content

.fade-enter-from,
.fade-leave-to
  opacity: 0
  height: fit-content
</style>
