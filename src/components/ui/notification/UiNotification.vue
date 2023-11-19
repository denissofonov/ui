<template>
  <ui-single-notification
    v-for="(notification, index) in notificationStore.notifications"
    :key="notification.id"
    :notification="notification"
    :index="index"
    :vertical-position="verticalPosition"
    :horizontal-position="horizontalPosition"
    :horizontal-indent="horizontalIndent"
    :vertical-indent="verticalIndent"
    :duration="duration"
    :handlers="handlers"
    @mouse-leave="$emit('mouseLeave', $event)"
    @mouse-enter="$emit('mouseEnter', $event)"
    @click="$emit('click', $event)"
  />
</template>

<script lang="ts" setup>
import { useNotificationStore } from "./store";
import UiSingleNotification from '@/components/ui/notification/UiSingleNotification.vue';
import type { INotificationWithId } from "./types";

const notificationStore = useNotificationStore();

//#region Props/Emits
withDefaults(
  defineProps<{
    horizontalPosition?: string;
    verticalPosition?: string;
    duration?: number;
    handlers?: boolean;
    horizontalIndent?: number;
    verticalIndent?: number;
  }>(),
  {
    horizontalPosition: "right",
    verticalPosition: "top",
    duration: 3000,
    handlers: false,
    horizontalIndent: 30,
    verticalIndent: 90,
  },
);

defineEmits<{
  (e: "mouseLeave", notification: INotificationWithId): void;
  (e: "mouseEnter", notification: INotificationWithId): void;
  (e: "click", notification: INotificationWithId): void;
}>();
//#endregion
</script>
