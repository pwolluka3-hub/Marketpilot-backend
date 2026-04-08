import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DraftList from '../../../components/content/DraftList';

describe('DraftList', () => {
  it('shows count of 0 when no drafts are provided (default)', () => {
    render(<DraftList />);
    expect(screen.getByText('Drafts: 0')).toBeInTheDocument();
  });

  it('shows count of 0 when empty array is passed', () => {
    render(<DraftList drafts={[]} />);
    expect(screen.getByText('Drafts: 0')).toBeInTheDocument();
  });

  it('shows correct count for a single draft', () => {
    render(<DraftList drafts={[{ id: 1 }]} />);
    expect(screen.getByText('Drafts: 1')).toBeInTheDocument();
  });

  it('shows correct count for multiple drafts', () => {
    render(<DraftList drafts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />);
    expect(screen.getByText('Drafts: 3')).toBeInTheDocument();
  });

  it('applies glass-card class', () => {
    const { container } = render(<DraftList />);
    expect(container.firstChild).toHaveClass('glass-card');
  });

  it('renders as a div element', () => {
    const { container } = render(<DraftList />);
    expect(container.firstChild?.tagName).toBe('DIV');
  });

  it('shows correct count for a large list (boundary check)', () => {
    const drafts = Array.from({ length: 100 }, (_, i) => ({ id: i }));
    render(<DraftList drafts={drafts} />);
    expect(screen.getByText('Drafts: 100')).toBeInTheDocument();
  });
});