import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DraftList from '../DraftList';

describe('DraftList', () => {
  it('renders Drafts: 0 when no drafts are provided', () => {
    render(<DraftList />);
    expect(screen.getByText('Drafts: 0')).toBeInTheDocument();
  });

  it('renders Drafts: 0 when an empty array is passed', () => {
    render(<DraftList drafts={[]} />);
    expect(screen.getByText('Drafts: 0')).toBeInTheDocument();
  });

  it('renders the correct count for a non-empty drafts array', () => {
    render(<DraftList drafts={['a', 'b', 'c']} />);
    expect(screen.getByText('Drafts: 3')).toBeInTheDocument();
  });

  it('applies glass-card class to container', () => {
    const { container } = render(<DraftList />);
    expect(container.querySelector('.glass-card')).not.toBeNull();
  });

  it('renders Drafts: 1 with a single draft', () => {
    render(<DraftList drafts={[{ id: '1', text: 'hello' }]} />);
    expect(screen.getByText('Drafts: 1')).toBeInTheDocument();
  });

  it('updates count with a large array', () => {
    const many = new Array(100).fill({ id: 'x' });
    render(<DraftList drafts={many} />);
    expect(screen.getByText('Drafts: 100')).toBeInTheDocument();
  });
});