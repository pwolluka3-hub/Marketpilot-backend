import NeonButton from '../ui/NeonButton';

/**
 * Renders an "Approve & Continue" button that triggers the provided approval handler when clicked.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onApprove - Click handler invoked when the button is clicked.
 * @param {boolean} props.disabled - If true, the button is disabled.
 * @returns {JSX.Element} The rendered NeonButton element.
 */
export default function ApprovalGate({ onApprove, disabled }) {
  return <NeonButton disabled={disabled} onClick={onApprove}>Approve & Continue</NeonButton>;
}
