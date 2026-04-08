import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EngagementChart from '../../../components/charts/EngagementChart';

describe('EngagementChart', () => {
  it('shows 0 engagement points when data is an empty array', () => {
    render(<EngagementChart data={[]} />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('shows correct engagement point count for a populated array', () => {
    render(<EngagementChart data={[1, 2, 3, 4, 5]} />);
    expect(screen.getByText('Engagement points: 5')).toBeInTheDocument();
  });

  it('shows 0 when data is undefined', () => {
    render(<EngagementChart />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('shows 0 when data is null (non-array)', () => {
    render(<EngagementChart data={null} />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('shows 0 when data is a non-array object', () => {
    render(<EngagementChart data={{ a: 1 }} />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('shows 0 when data is a number', () => {
    render(<EngagementChart data={42} />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('applies glass-card class to wrapper', () => {
    const { container } = render(<EngagementChart data={[]} />);
    expect(container.firstChild).toHaveClass('glass-card');
  });

  it('handles a single-element array', () => {
    render(<EngagementChart data={['point']} />);
    expect(screen.getByText('Engagement points: 1')).toBeInTheDocument();
  });
});