/**
 * Renders a section with the CSS class "glass-card" containing the provided children.
 * @param {{children: import('react').ReactNode}} props - Component props.
 * @param {import('react').ReactNode} props.children - Content to display inside the card.
 * @returns {JSX.Element} A `<section>` element with className `"glass-card"` that wraps the children.
 */
export default function GlassCard({ children }) {
  return <section className="glass-card">{children}</section>;
}