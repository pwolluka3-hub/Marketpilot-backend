import NeonButton from '../ui/NeonButton';

/**
 * Render an "Approve & Continue" NeonButton wired to the provided handler and disabled state.
 *
 * @param {Function} onApprove - Callback invoked when the button is clicked.
 * @param {boolean} disabled - If `true`, the button is disabled and not clickable.
 * @returns {JSX.Element} The `NeonButton` element labeled "Approve & Continue".
 */
export default function ApprovalGate({ onApprove, disabled }) {
  return <NeonButton disabled={disabled} onClick={onApprove}>Approve & Continue</NeonButton>;
}