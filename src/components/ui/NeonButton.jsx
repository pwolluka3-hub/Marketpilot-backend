/**
 * Renders a button element with the "neon-button" CSS class.
 *
 * Forces `type="button"` and forwards all provided props to the underlying `<button>`.
 * @param {object} props - HTML attributes and event handlers to apply to the button.
 * @returns {JSX.Element} The rendered `<button>` element.
 */
export default function NeonButton(props) {
  return <button className="neon-button" type="button" {...props} />;
}
