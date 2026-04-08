/**
 * Render a card displaying the count of draft items.
 *
 * @param {Array} [drafts=[]] - Array of draft items to count.
 * @returns {JSX.Element} A <div> element with class "glass-card" containing the text "Drafts: {N}", where N is the number of drafts.
 */
export default function DraftList({ drafts = [] }) {
  return <div className="glass-card">Drafts: {drafts.length}</div>;
}