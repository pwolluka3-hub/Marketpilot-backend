/**
 * Render a simple card showing the count of engagement points.
 *
 * @param {{data: any}} props
 * @param {any} props.data - The engagement data; when an array, its length is used as the displayed count. Non-array values are treated as no points.
 * @returns {JSX.Element} A div with class "glass-card" that displays "Engagement points: N".
 */
export default function EngagementChart({ data }) {
  return <div className="glass-card">Engagement points: {Array.isArray(data) ? data.length : 0}</div>;
}