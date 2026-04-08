/**
 * Render a small card that displays the count of draft items.
 *
 * @param {Object} props
 * @param {Array} [props.drafts=[]] - Array of draft objects; defaults to an empty array.
 * @returns {JSX.Element} A div element with class "glass-card" containing the draft count.
 */
export default function DraftList({ drafts = [] }) {
  return <div className="glass-card">Drafts: {drafts.length}</div>;
}
