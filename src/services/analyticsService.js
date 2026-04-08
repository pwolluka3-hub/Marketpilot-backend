import { kvGet, fsWrite } from './puterService';

/**
 * Retrieves social analytics from Ayrshare using the stored API key.
 *
 * Writes the parsed analytics JSON to /NexusAI/analytics/performance.json.
 * @returns {Object|null} Parsed analytics JSON if a stored `ayrshare_key` exists; `null` if the key is missing.
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