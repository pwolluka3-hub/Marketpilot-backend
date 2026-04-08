import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EngagementChart from './EngagementChart';

describe('EngagementChart', () => {
  it('renders engagement points count of 0 for empty array', () => {
    render(<EngagementChart data={[]} />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('renders the correct count for a non-empty array', () => {
    render(<EngagementChart data={[1, 2, 3]} />);
    expect(screen.getByText('Engagement points: 3')).toBeInTheDocument();
  });

  it('renders 0 when data is undefined', () => {
    render(<EngagementChart />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('renders 0 when data is null', () => {
    render(<EngagementChart data={null} />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('renders 0 when data is a non-array value', () => {
    render(<EngagementChart data={42} />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('renders 0 when data is a string', () => {
    render(<EngagementChart data="abc" />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('applies glass-card CSS class', () => {
    const { container } = render(<EngagementChart data={[]} />);
    expect(container.firstChild).toHaveClass('glass-card');
  });

  it('renders the correct count for a single-element array', () => {
    render(<EngagementChart data={[{ value: 99 }]} />);
    expect(screen.getByText('Engagement points: 1')).toBeInTheDocument();
  });

  it('renders a large data set count correctly', () => {
    render(<EngagementChart data={new Array(1000).fill(0)} />);
    expect(screen.getByText('Engagement points: 1000')).toBeInTheDocument();
  });
});