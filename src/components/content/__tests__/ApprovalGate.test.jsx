import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ApprovalGate from '../ApprovalGate';

describe('ApprovalGate', () => {
  it('renders the Approve & Continue button', () => {
    render(<ApprovalGate />);
    expect(screen.getByRole('button', { name: 'Approve & Continue' })).toBeInTheDocument();
  });

  it('calls onApprove when button is clicked', () => {
    const handleApprove = vi.fn();
    render(<ApprovalGate onApprove={handleApprove} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleApprove).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    render(<ApprovalGate disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('enables the button when disabled prop is false', () => {
    render(<ApprovalGate disabled={false} />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('does not call onApprove when disabled', () => {
    const handleApprove = vi.fn();
    render(<ApprovalGate onApprove={handleApprove} disabled={true} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleApprove).not.toHaveBeenCalled();
  });

  it('button has neon-button class', () => {
    render(<ApprovalGate />);
    expect(screen.getByRole('button')).toHaveClass('neon-button');
  });

  it('renders without crashing when no props are provided', () => {
    render(<ApprovalGate />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});