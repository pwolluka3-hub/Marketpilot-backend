import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NeonButton from '../NeonButton';

describe('NeonButton', () => {
  it('renders a button element', () => {
    render(<NeonButton>Click me</NeonButton>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('has type="button" by default', () => {
    render(<NeonButton>Click</NeonButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('applies neon-button class', () => {
    render(<NeonButton>Click</NeonButton>);
    expect(screen.getByRole('button')).toHaveClass('neon-button');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<NeonButton onClick={handleClick}>Click</NeonButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('respects disabled prop', () => {
    render(<NeonButton disabled>Disabled</NeonButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<NeonButton disabled onClick={handleClick}>Disabled</NeonButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('forwards additional props to button element', () => {
    render(<NeonButton data-testid="my-btn" aria-label="action">Act</NeonButton>);
    expect(screen.getByTestId('my-btn')).toHaveAttribute('aria-label', 'action');
  });

  it('renders children content correctly', () => {
    render(<NeonButton><span>inner</span></NeonButton>);
    expect(screen.getByText('inner')).toBeInTheDocument();
  });
});