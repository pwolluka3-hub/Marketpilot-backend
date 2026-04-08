/**
 * Render a simple voice script preview inside a glass-card container.
 *
 * @param {Object} props
 * @param {string} [props.text] - Optional script text to display; will be truncated to the first 140 characters. If `text` is `null` or `undefined`, only the label is rendered.
 * @returns {JSX.Element} A div element with class `glass-card` containing the "Voice Script:" label and the truncated text.
 */
export default function VoicePlayer({ text }) {
  return <div className="glass-card">Voice Script: {text?.slice(0, 140)}</div>;
}