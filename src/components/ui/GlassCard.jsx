/**
 * Render a section element styled as a glass card that wraps its children.
 * @param {Object} props
 * @param {import('react').ReactNode} props.children - Content to render inside the card.
 * @returns {import('react').JSX.Element} The section element with className "glass-card" containing the provided children.
 */
export default function GlassCard({ children }) {
  return <section className="glass-card">{children}</section>;
}
