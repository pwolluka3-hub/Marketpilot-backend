import { kvGet, fsWrite } from './puterService';

/**
 * Fetches social analytics from Ayrshare and persists them to disk.
 *
 * Retrieves the API key from KV storage; if absent, returns `null`. When a key
 * is present, requests analytics from Ayrshare, writes the parsed JSON to
 * /NexusAI/analytics/performance.json, and returns the parsed data.
 *
 * @returns {Object|null} The parsed analytics JSON on success, or `null` if no API key is configured.
 */
export async function fetchAnalytics() {
  const key = await kvGet('ayrshare_key');
  if (!key) return null;
  const res = await fetch('https://app.ayrshare.com/api/analytics/social', {
    headers: { Authorization: `Bearer ${key}` }
  });
  const data = await res.json();
  await fsWrite('/NexusAI/analytics/performance.json', data);
  return data;
}
