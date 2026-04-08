import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NeonButton from '../../../components/ui/NeonButton';

describe('NeonButton', () => {
  it('renders children text', () => {
    render(<NeonButton>Click me</NeonButton>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies neon-button class', () => {
    render(<NeonButton>Styled</NeonButton>);
    expect(screen.getByRole('button')).toHaveClass('neon-button');
  });

  it('has type="button" by default to avoid form submission', () => {
    render(<NeonButton>Submit</NeonButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('calls onClick handler when clicked', async () => {
    const onClick = vi.fn();
    render(<NeonButton onClick={onClick}>Click</NeonButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('passes disabled prop to button element', () => {
    render(<NeonButton disabled>Disabled</NeonButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    render(<NeonButton disabled onClick={onClick}>Disabled</NeonButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards arbitrary props to the button element', () => {
    render(<NeonButton aria-label="custom-label" data-testid="my-btn">Go</NeonButton>);
    const btn = screen.getByTestId('my-btn');
    expect(btn).toHaveAttribute('aria-label', 'custom-label');
  });

  it('renders with no children (empty button)', () => {
    render(<NeonButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});