/**
 * Renders a native HTML `<button>` element styled with the "neon-button" class and forwards all provided props.
 *
 * @param {object} props - Additional attributes and event handlers to apply to the underlying `<button>`. Note that `className` and `type` are set by the component (`"neon-button"` and `"button"`, respectively).
 * @returns {JSX.Element} A `<button>` element with "neon-button" styling and the forwarded props applied.
 */
export default function NeonButton(props) {
  return <button className="neon-button" type="button" {...props} />;
}