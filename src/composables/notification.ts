import { useNotificationStore } from "../components/ui/notification/store";
import type { INotification } from "../components/ui/notification/types";

export const UIAddNotification = (notification: INotification) => {
  const notificationStore = useNotificationStore();
  notificationStore.addNotification(notification);
};
