import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingPulse from '../LoadingPulse';

describe('LoadingPulse', () => {
  it('renders the Loading... text', () => {
    render(<LoadingPulse />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies glass-card class', () => {
    const { container } = render(<LoadingPulse />);
    expect(container.querySelector('.glass-card')).not.toBeNull();
  });

  it('renders a div element', () => {
    const { container } = render(<LoadingPulse />);
    expect(container.firstChild?.tagName).toBe('DIV');
  });

  it('takes no props and renders consistently', () => {
    const { container: c1 } = render(<LoadingPulse />);
    const { container: c2 } = render(<LoadingPulse />);
    expect(c1.innerHTML).toBe(c2.innerHTML);
  });
});