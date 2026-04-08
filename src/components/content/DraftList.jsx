export default function DraftList({ drafts = [] }) {
  return <div className="glass-card">Drafts: {drafts.length}</div>;
}
