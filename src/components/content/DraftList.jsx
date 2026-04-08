/**
 * Render a card displaying the count of provided drafts.
 * @param {Object} props - Component props.
 * @param {Array} [props.drafts=[]] - Array of draft items; the component displays its length.
 * @returns {JSX.Element} A div with class "glass-card" that shows the number of drafts.
 */
export default function DraftList({ drafts = [] }) {
  return <div className="glass-card">Drafts: {drafts.length}</div>;
}