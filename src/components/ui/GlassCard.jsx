/**
 * Render a section element with the "glass-card" class that wraps the provided children.
 * @param {Object} props
 * @param {import('react').ReactNode} props.children - Content to display inside the glass card.
 * @returns {import('react').JSX.Element} The rendered section element containing the children.
 */
export default function GlassCard({ children }) {
  return <section className="glass-card">{children}</section>;
}