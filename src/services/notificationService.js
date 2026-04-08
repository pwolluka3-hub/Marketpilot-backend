/**
 * Display a browser notification with the given title and optional body when the Notifications API is available and permission is granted.
 *
 * If permission is `"default"`, the user will be prompted; if permission is not `"granted"` or notifications are unsupported, no notification is shown.
 * @param {string} title - Notification title.
 * @param {string} [body] - Optional notification body text.
 */
export async function notifyUser(title, body) {
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }
}