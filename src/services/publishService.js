import { kvGet } from './puterService';

/**
 * Publish a post to Ayrshare with optional media and an optional schedule.
 *
 * @param {Object} options - Publish options.
 * @param {string} options.text - The post content.
 * @param {string} [options.mediaUrl] - URL of a single media item to attach; if provided it will be sent as a single-element array.
 * @param {string[]} options.platforms - Target platforms (e.g., ['facebook', 'twitter']).
 * @param {string} [options.scheduleDate] - ISO 8601 datetime to schedule the post.
 * @returns {Object} The parsed JSON response from the Ayrshare API.
 * @throws {Error} If the Ayrshare API key is missing.
 * @throws {Error} If the HTTP request returns a non-OK status; the error message includes the status code.
 */
export async function publishPost({ text, mediaUrl, platforms, scheduleDate }) {
  const key = await kvGet('ayrshare_key');
  if (!key) throw new Error('Ayrshare key missing');

  const response = await fetch('https://app.ayrshare.com/api/post', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      post: text,
      platforms,
      mediaUrls: mediaUrl ? [mediaUrl] : undefined,
      scheduleDate
    })
  });

  if (!response.ok) {
    throw new Error(`Publish failed: ${response.status}`);
  }

  return response.json();
}
