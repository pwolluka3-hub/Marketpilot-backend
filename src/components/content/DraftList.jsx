/**
 * Renders a small card showing the number of draft items.
 *
 * @param {Array} [drafts=[]] - Array of draft objects to count.
 * @returns {JSX.Element} A div with class "glass-card" containing the draft count.
 */
export default function DraftList({ drafts = [] }) {
  return <div className="glass-card">Drafts: {drafts.length}</div>;
}
