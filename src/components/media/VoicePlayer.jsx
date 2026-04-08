/**
 * Render a compact voice script preview inside a glass-card container.
 * @param {Object} props
 * @param {string} [props.text] - The voice script to preview; only the first 140 characters are displayed.
 * @returns {JSX.Element} The rendered preview element.
 */
export default function VoicePlayer({ text }) {
  return <div className="glass-card">Voice Script: {text?.slice(0, 140)}</div>;
}
