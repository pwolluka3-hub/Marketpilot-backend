import { kvGet, fsWrite } from './puterService';

/**
 * Fetches social analytics from Ayrshare and saves them to /NexusAI/analytics/performance.json.
 *
 * If no Ayrshare API key is found in the key-value store, the function returns `null`.
 * @returns {any|null} The parsed analytics JSON when available, or `null` if no API key is configured.
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