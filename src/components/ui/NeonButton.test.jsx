import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NeonButton from './NeonButton';

describe('NeonButton', () => {
  it('renders children as button text', () => {
    render(<NeonButton>Click me</NeonButton>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies neon-button CSS class', () => {
    render(<NeonButton>Test</NeonButton>);
    expect(screen.getByRole('button')).toHaveClass('neon-button');
  });

  it('uses type="button" to prevent accidental form submission', () => {
    render(<NeonButton>Submit</NeonButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<NeonButton onClick={handleClick}>Click</NeonButton>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<NeonButton disabled>Disabled</NeonButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<NeonButton disabled onClick={handleClick}>Disabled</NeonButton>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('passes through additional props', () => {
    render(<NeonButton data-testid="custom-btn" aria-label="custom">Btn</NeonButton>);
    expect(screen.getByTestId('custom-btn')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'custom');
  });

  it('is not disabled by default', () => {
    render(<NeonButton>Active</NeonButton>);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});