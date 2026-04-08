import { kvGet } from './puterService';

/**
 * Publish a social post through the Ayrshare API.
 *
 * @param {Object} params - Publish parameters.
 * @param {string} params.text - The post text content.
 * @param {string} [params.mediaUrl] - Optional single media URL to include; will be sent as an array if provided.
 * @param {string[] | string} params.platforms - Target platform(s) identifier(s) for the post.
 * @param {string} [params.scheduleDate] - Optional ISO 8601 date-time string to schedule the post.
 * @returns {Object} The parsed JSON response from the Ayrshare API.
 * @throws {Error} If the Ayrshare API key is missing.
 * @throws {Error} If the HTTP request responds with a non-OK status (message contains the status code).
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