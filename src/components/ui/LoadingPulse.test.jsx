import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingPulse from './LoadingPulse';

describe('LoadingPulse', () => {
  it('renders loading text', () => {
    render(<LoadingPulse />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies glass-card CSS class', () => {
    const { container } = render(<LoadingPulse />);
    expect(container.firstChild).toHaveClass('glass-card');
  });

  it('renders a div element', () => {
    const { container } = render(<LoadingPulse />);
    expect(container.firstChild?.tagName).toBe('DIV');
  });

  it('accepts no props without crashing', () => {
    expect(() => render(<LoadingPulse />)).not.toThrow();
  });
});