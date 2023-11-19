<template>
  <wrapper>
    <ui-notification
      :vertical-position="verticalPosition"
      :horizontal-position="horizontalPosition"
      :horizontal-indent="horizontalIndent || undefined"
      :vertical-indent="verticalIndent || undefined"
      :duration="duration || undefined"
      :handlers="isActiveHandlers"
      @mouse-leave="mouseLeave"
      @mouse-enter="mouseEnter"
      @click="click"
    />
    <template #title>
      {{ title }}
    </template>
    <template #description>
      {{ description }}
    </template>
    <div class="settings">
      <ui-button @click="addNotification">
        Добавить уведомление
      </ui-button>
      <ui-input
        v-model:number="horizontalIndent"
        label="Горизонтальный отступ"
        type="number"
      />
      <ui-input
        v-model:number="verticalIndent"
        label="Вертикальный отступ"
        type="number"
      />
      <ui-input
        v-model:number="duration"
        label="Время жизни уведомления"
        type="number"
      />
    </div>
  </wrapper>
</template>
<script setup lang="ts">
import { useNotificationStore } from "../../ui/notification/store";
import { reactive, ref } from "vue";
import type { INotification, INotificationWithId } from "../../ui/notification/types";
import UiNotification from '@/components/ui/notification/UiNotification.vue';
import Wrapper from '@/components/pages/components/Wrapper.vue';
import UiButton from '@/components/ui/button/UiButton.vue';
import UiInput from '@/components/ui/input/UiInput.vue';

const notificationStore = useNotificationStore();

const isActiveHandlers = ref(false);
const horizontalPosition = ref("right");
const verticalPosition = ref("top");
const duration = ref<number | null>(null);
const title = ref("Уведомление");
const description = ref("Обычное уведомление");
const horizontalIndent = ref<number | null>(null);
const verticalIndent = ref<number | null>(null);

const notification = reactive<INotification>({
  title: "Заголовок",
  description: "Описание",
  handlers: true,
});

const addNotification = () => notificationStore.addNotification(notification);

const mouseLeave = (notification: INotificationWithId) => {
  console.log("Курсор покинул уведомление " + notification.id);
};

const mouseEnter = (notification: INotificationWithId) => {
  console.log("Курсор попал на уведомление " + notification.id);
};

const click = (notification: INotificationWithId) => {
  console.log("Клик по уведомлению " + notification.id);
};
</script>

<style lang="sass" scoped>
.settings
  display: flex
  flex-direction: column
  row-gap: 20px
  width: 300px
</style>
