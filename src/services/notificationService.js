/**
 * Attempt to display a browser notification with the provided title and body.
 *
 * If the Notifications API is available and permission is `"default"`, the function requests permission;
 * it creates a notification only when permission is `"granted"`. Does nothing if the API is unsupported or permission is not granted.
 * @param {string} title - The notification title.
 * @param {string} body - The notification body text.
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
