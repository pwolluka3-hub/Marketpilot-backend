export default function EngagementChart({ data }) {
  return <div className="glass-card">Engagement points: {Array.isArray(data) ? data.length : 0}</div>;
}
