import NeonButton from '../ui/NeonButton';

export default function ApprovalGate({ onApprove, disabled }) {
  return <NeonButton disabled={disabled} onClick={onApprove}>Approve & Continue</NeonButton>;
}
