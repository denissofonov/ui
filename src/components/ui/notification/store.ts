import { defineStore } from "pinia";
import type { INotification, notificationStoreStateType } from "./types";

export const useNotificationStore = defineStore({
  id: "notificationStore",
  state: (): notificationStoreStateType => ({
    notifications: [],
  }),
  actions: {
    addNotification(notification: INotification): string {
      const id = crypto.randomUUID().slice(0, 8);
      this.notifications.push({ ...notification, id });
      return id;
    },
  },
});
