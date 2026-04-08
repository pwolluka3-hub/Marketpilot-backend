/**
 * Renders a glass-styled content card with a heading and paragraph.
 *
 * @param {{title: string, body: string}} props
 * @param {string} props.title - Heading text displayed inside an <h3>.
 * @param {string} props.body - Paragraph text displayed inside a <p>.
 * @returns {JSX.Element} The article element containing the title and body.
 */
export default function ContentCard({ title, body }) {
  return (
    <article className="glass-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}
