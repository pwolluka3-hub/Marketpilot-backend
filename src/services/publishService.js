import { kvGet } from './puterService';

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
