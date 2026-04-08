import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GlassCard from '../../../components/ui/GlassCard';

describe('GlassCard', () => {
  it('renders children inside a section element', () => {
    render(<GlassCard><span>Hello</span></GlassCard>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders a <section> element', () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('applies glass-card class to section', () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    expect(container.querySelector('section')).toHaveClass('glass-card');
  });

  it('renders multiple children', () => {
    render(
      <GlassCard>
        <p>First</p>
        <p>Second</p>
      </GlassCard>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('renders with no children without crashing', () => {
    const { container } = render(<GlassCard />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('renders string children directly', () => {
    render(<GlassCard>Plain text</GlassCard>);
    expect(screen.getByText('Plain text')).toBeInTheDocument();
  });
});