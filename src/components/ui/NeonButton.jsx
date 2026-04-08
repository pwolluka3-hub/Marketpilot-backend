/**
 * Render a button element styled with the "neon-button" class and forward additional props.
 * @param {object} props - Attributes and event handlers to apply to the underlying button.
 * @returns {JSX.Element} A React button element with className "neon-button" and type "button".
 */
export default function NeonButton(props) {
  return <button className="neon-button" type="button" {...props} />;
}