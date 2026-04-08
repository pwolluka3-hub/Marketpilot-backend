/**
 * Render a card showing the number of engagement points.
 *
 * @param {Array<any>} data - Array of engagement items; treated as empty when not an array.
 * @returns {JSX.Element} A div with class "glass-card" containing "Engagement points: N" where N is `data.length` when `data` is an array, otherwise `0`.
 */
export default function EngagementChart({ data }) {
  return <div className="glass-card">Engagement points: {Array.isArray(data) ? data.length : 0}</div>;
}