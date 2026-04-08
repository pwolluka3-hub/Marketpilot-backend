/**
 * Show a browser notification with the given title and body when notifications are supported and permission is granted.
 *
 * If permission is "default", the user will be prompted. No action is taken when notifications are unsupported or permission is denied.
 * @param {string} title - The notification title.
 * @param {string} [body] - The notification body text.
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