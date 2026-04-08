import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApprovalGate from './ApprovalGate';

describe('ApprovalGate', () => {
  it('renders "Approve & Continue" button text', () => {
    render(<ApprovalGate />);
    expect(screen.getByRole('button', { name: 'Approve & Continue' })).toBeInTheDocument();
  });

  it('is enabled when disabled prop is false', () => {
    render(<ApprovalGate disabled={false} />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<ApprovalGate disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onApprove when clicked and not disabled', async () => {
    const user = userEvent.setup();
    const onApprove = vi.fn();
    render(<ApprovalGate disabled={false} onApprove={onApprove} />);
    await user.click(screen.getByRole('button'));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it('does not call onApprove when disabled', async () => {
    const user = userEvent.setup();
    const onApprove = vi.fn();
    render(<ApprovalGate disabled={true} onApprove={onApprove} />);
    await user.click(screen.getByRole('button'));
    expect(onApprove).not.toHaveBeenCalled();
  });

  it('renders without onApprove prop without crashing', () => {
    expect(() => render(<ApprovalGate disabled={false} />)).not.toThrow();
  });

  it('renders with neon-button class via NeonButton', () => {
    render(<ApprovalGate />);
    expect(screen.getByRole('button')).toHaveClass('neon-button');
  });
});