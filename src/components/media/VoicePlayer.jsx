/**
 * Render a labeled card showing the "Voice Script" prefix followed by the provided text truncated to 140 characters.
 * @param {string|null|undefined} text - The voice script text to display; if `null` or `undefined`, no text is shown.
 * @returns {JSX.Element} The rendered card element containing the label and the truncated text.
 */
export default function VoicePlayer({ text }) {
  return <div className="glass-card">Voice Script: {text?.slice(0, 140)}</div>;
}