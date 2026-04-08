import NeonButton from '../ui/NeonButton';

/**
 * Renders an approval button labeled "Approve & Continue".
 * @param {() => void} onApprove - Callback invoked when the button is clicked.
 * @param {boolean} disabled - When true, the button is disabled and cannot be activated.
 * @returns {JSX.Element} The rendered approval button element.
 */
export default function ApprovalGate({ onApprove, disabled }) {
  return <NeonButton disabled={disabled} onClick={onApprove}>Approve & Continue</NeonButton>;
}