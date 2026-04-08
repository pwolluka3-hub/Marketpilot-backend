/**
 * Conditionally displays a browser notification using the Web Notifications API.
 *
 * Prompts the user for permission when the permission state is `"default"`, and
 * creates a notification only if permission is `"granted"`. Does nothing if the
 * Notifications API is unavailable or permission is not granted.
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