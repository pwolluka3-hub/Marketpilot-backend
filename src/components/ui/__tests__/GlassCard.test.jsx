import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GlassCard from '../GlassCard';

describe('GlassCard', () => {
  it('renders children inside a section element', () => {
    render(<GlassCard>Hello World</GlassCard>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders a <section> tag', () => {
    const { container } = render(<GlassCard>content</GlassCard>);
    expect(container.querySelector('section')).not.toBeNull();
  });

  it('applies glass-card class to section', () => {
    const { container } = render(<GlassCard>content</GlassCard>);
    expect(container.querySelector('section')).toHaveClass('glass-card');
  });

  it('renders nested JSX children', () => {
    render(
      <GlassCard>
        <span data-testid="inner">nested</span>
      </GlassCard>
    );
    expect(screen.getByTestId('inner')).toBeInTheDocument();
  });

  it('renders without children (empty)', () => {
    const { container } = render(<GlassCard />);
    expect(container.querySelector('section.glass-card')).not.toBeNull();
  });
});