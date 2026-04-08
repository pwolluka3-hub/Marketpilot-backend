import NeonButton from '../ui/NeonButton';

/**
 * Render an approval button labeled "Approve & Continue".
 *
 * @param {Object} props
 * @param {() => void} props.onApprove - Callback invoked when the button is clicked.
 * @param {boolean} props.disabled - When `true`, the button is disabled and cannot be activated.
 * @returns {JSX.Element} The rendered approval button element.
 */
export default function ApprovalGate({ onApprove, disabled }) {
  return <NeonButton disabled={disabled} onClick={onApprove}>Approve & Continue</NeonButton>;
}