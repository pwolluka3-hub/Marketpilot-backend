import { kvGet, fsWrite } from './puterService';

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
