import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EngagementChart from '../EngagementChart';

describe('EngagementChart', () => {
  it('renders Engagement points: 0 when data is an empty array', () => {
    render(<EngagementChart data={[]} />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('renders the correct count for a non-empty array', () => {
    render(<EngagementChart data={[1, 2, 3]} />);
    expect(screen.getByText('Engagement points: 3')).toBeInTheDocument();
  });

  it('renders Engagement points: 0 when data is undefined', () => {
    render(<EngagementChart />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('renders Engagement points: 0 when data is null', () => {
    render(<EngagementChart data={null} />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('renders Engagement points: 0 when data is a non-array value (string)', () => {
    render(<EngagementChart data="not-an-array" />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('applies glass-card class', () => {
    const { container } = render(<EngagementChart data={[]} />);
    expect(container.querySelector('.glass-card')).not.toBeNull();
  });

  it('renders the correct count with many data points', () => {
    const data = new Array(50).fill({ value: 1 });
    render(<EngagementChart data={data} />);
    expect(screen.getByText('Engagement points: 50')).toBeInTheDocument();
  });
});