import { notifyUser } from '../services/notificationService';

/**
 * Exposes notification utilities to consumers.
 *
 * @returns {{ notifyUser: Function }} An object containing `notifyUser`, the function used to send notifications.
 */
export function useNotifications() {
  return { notifyUser };
}