import { notifyUser } from '../services/notificationService';

/**
 * Provide access to the application's notification function for components.
 *
 * @returns {Object} An object exposing notification utilities.
 * @property {Function} notifyUser - Sends a notification to the user.
 */
export function useNotifications() {
  return { notifyUser };
}