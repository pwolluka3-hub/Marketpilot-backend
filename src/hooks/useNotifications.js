import { notifyUser } from '../services/notificationService';

/**
 * Provides access to a `notifyUser` function for sending user notifications.
 * @returns {{ notifyUser: Function }} An object containing the `notifyUser` function.
export function useNotifications() {
  return { notifyUser };
}
