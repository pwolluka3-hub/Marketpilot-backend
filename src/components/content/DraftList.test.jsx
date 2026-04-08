import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DraftList from './DraftList';

describe('DraftList', () => {
  it('renders "Drafts: 0" when no drafts are provided', () => {
    render(<DraftList />);
    expect(screen.getByText('Drafts: 0')).toBeInTheDocument();
  });

  it('renders "Drafts: 0" for empty array', () => {
    render(<DraftList drafts={[]} />);
    expect(screen.getByText('Drafts: 0')).toBeInTheDocument();
  });

  it('renders the count of drafts', () => {
    render(<DraftList drafts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />);
    expect(screen.getByText('Drafts: 3')).toBeInTheDocument();
  });

  it('renders a single draft count', () => {
    render(<DraftList drafts={[{ id: 1 }]} />);
    expect(screen.getByText('Drafts: 1')).toBeInTheDocument();
  });

  it('applies glass-card CSS class', () => {
    const { container } = render(<DraftList />);
    expect(container.firstChild).toHaveClass('glass-card');
  });

  it('updates count when a larger drafts array is given', () => {
    render(<DraftList drafts={new Array(10).fill({})} />);
    expect(screen.getByText('Drafts: 10')).toBeInTheDocument();
  });
});