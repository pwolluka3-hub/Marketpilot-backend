import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApprovalGate from '../../../components/content/ApprovalGate';

describe('ApprovalGate', () => {
  it('renders the approval button with correct label', () => {
    render(<ApprovalGate onApprove={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Approve & Continue' })).toBeInTheDocument();
  });

  it('calls onApprove when button is clicked', async () => {
    const onApprove = vi.fn();
    render(<ApprovalGate onApprove={onApprove} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    render(<ApprovalGate onApprove={vi.fn()} disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onApprove when button is disabled', async () => {
    const onApprove = vi.fn();
    render(<ApprovalGate onApprove={onApprove} disabled={true} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onApprove).not.toHaveBeenCalled();
  });

  it('enables the button when disabled prop is false', () => {
    render(<ApprovalGate onApprove={vi.fn()} disabled={false} />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('applies neon-button class from NeonButton', () => {
    render(<ApprovalGate onApprove={vi.fn()} />);
    expect(screen.getByRole('button')).toHaveClass('neon-button');
  });

  it('renders without onApprove prop without crashing', () => {
    expect(() => render(<ApprovalGate />)).not.toThrow();
  });
});