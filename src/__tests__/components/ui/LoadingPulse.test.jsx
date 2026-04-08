import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingPulse from '../../../components/ui/LoadingPulse';

describe('LoadingPulse', () => {
  it('renders a loading indicator', () => {
    render(<LoadingPulse />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies glass-card class', () => {
    const { container } = render(<LoadingPulse />);
    expect(container.firstChild).toHaveClass('glass-card');
  });

  it('renders as a div element', () => {
    const { container } = render(<LoadingPulse />);
    expect(container.firstChild?.tagName).toBe('DIV');
  });

  it('accepts no props and renders without crashing', () => {
    expect(() => render(<LoadingPulse />)).not.toThrow();
  });
});