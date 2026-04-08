/**
 * Render a simple card that displays the number of engagement points.
 *
 * If `data` is an array, the displayed count is `data.length`; otherwise the count is `0`.
 *
 * @param {Object} props - Component props.
 * @param {Array<any>} props.data - Optional array of engagement items used to compute the count.
 * @returns {JSX.Element} A `div` with class `"glass-card"` containing the text "Engagement points: N".
 */
export default function EngagementChart({ data }) {
  return <div className="glass-card">Engagement points: {Array.isArray(data) ? data.length : 0}</div>;
}
