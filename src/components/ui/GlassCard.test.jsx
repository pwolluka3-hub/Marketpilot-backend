import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GlassCard from './GlassCard';

describe('GlassCard', () => {
  it('renders children inside a section element', () => {
    render(<GlassCard><p>Hello</p></GlassCard>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('uses a section element as the root', () => {
    const { container } = render(<GlassCard>content</GlassCard>);
    expect(container.firstChild?.tagName).toBe('SECTION');
  });

  it('applies glass-card CSS class', () => {
    const { container } = render(<GlassCard>content</GlassCard>);
    expect(container.firstChild).toHaveClass('glass-card');
  });

  it('renders multiple children', () => {
    render(
      <GlassCard>
        <span>A</span>
        <span>B</span>
      </GlassCard>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('renders with no children without crashing', () => {
    const { container } = render(<GlassCard />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('renders string children', () => {
    render(<GlassCard>Just a string</GlassCard>);
    expect(screen.getByText('Just a string')).toBeInTheDocument();
  });
});