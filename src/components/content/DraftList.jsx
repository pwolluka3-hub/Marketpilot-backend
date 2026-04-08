/**
 * Display the number of drafts inside a styled card.
 * @param {Object} props - Component props.
 * @param {Array} [props.drafts=[]] - Array of draft items; the component displays its length.
 * @returns {JSX.Element} A `div` element with class `"glass-card"` containing the text `Drafts: N` where N is the number of drafts.
 */
export default function DraftList({ drafts = [] }) {
  return <div className="glass-card">Drafts: {drafts.length}</div>;
}