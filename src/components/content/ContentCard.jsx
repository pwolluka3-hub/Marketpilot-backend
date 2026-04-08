/**
 * Render an article-styled card that displays a heading and body text.
 *
 * @param {string} title - The card's heading text.
 * @param {string} body - The card's body text.
 * @returns {JSX.Element} The rendered content card element.
 */
export default function ContentCard({ title, body }) {
  return (
    <article className="glass-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}