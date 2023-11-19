export interface INotificationWithId extends INotification {
  id: string;
}

export type notificationStoreStateType = {
  notifications: INotificationWithId[];
};

export interface INotification {
  title: string;
  description?: string;
  duration?: number;
  handlers?: boolean;
}
