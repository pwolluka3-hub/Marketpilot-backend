import { kvGet } from './puterService';

/**
 * Publish a post to Ayrshare with optional media and scheduling.
 *
 * @param {Object} params - Publish parameters.
 * @param {string} params.text - The post content.
 * @param {string} [params.mediaUrl] - A single media URL to attach to the post.
 * @param {string[]} params.platforms - Array of platform identifiers to publish to.
 * @param {string} [params.scheduleDate] - ISO 8601 date/time string to schedule the post.
 * @returns {Object} The parsed JSON response from the Ayrshare API.
 * @throws {Error} Throws `Error('Ayrshare key missing')` if the API key is not available.
 * @throws {Error} Throws `Error('Publish failed: <status>')` if the HTTP response status is not OK (status code included).
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