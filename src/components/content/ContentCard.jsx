/**
 * Render a presentational card that displays a title and body.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - Heading text shown at the top of the card.
 * @param {string} props.body - Paragraph text shown below the title.
 * @returns {JSX.Element} The rendered article element with class "glass-card".
 */
export default function ContentCard({ title, body }) {
  return (
    <article className="glass-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}