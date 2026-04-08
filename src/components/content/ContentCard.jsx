export default function ContentCard({ title, body }) {
  return (
    <article className="glass-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}
