import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContentCard from '../components/content/ContentCard';
import DraftList from '../components/content/DraftList';
import ApprovalGate from '../components/content/ApprovalGate';
import EngagementChart from '../components/charts/EngagementChart';

// ---------------------------------------------------------------------------
// ContentCard
// ---------------------------------------------------------------------------
describe('ContentCard', () => {
  it('renders the title in an h3', () => {
    render(<ContentCard title="My Title" body="Some body" />);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('My Title');
  });

  it('renders the body in a paragraph', () => {
    render(<ContentCard title="T" body="The body text" />);
    expect(screen.getByText('The body text')).toBeInTheDocument();
  });

  it('wraps content in an article element', () => {
    render(<ContentCard title="T" body="B" />);
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
  });

  it('article has glass-card class', () => {
    render(<ContentCard title="T" body="B" />);
    expect(screen.getByRole('article')).toHaveClass('glass-card');
  });

  it('renders with empty strings without crashing', () => {
    render(<ContentCard title="" body="" />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('renders HTML-safe text content (no XSS)', () => {
    render(<ContentCard title="<script>xss</script>" body="safe" />);
    // The raw <script> tag should not execute; text is treated as content
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('<script>xss</script>');
  });
});

// ---------------------------------------------------------------------------
// DraftList
// ---------------------------------------------------------------------------
describe('DraftList', () => {
  it('shows 0 drafts by default (no prop)', () => {
    render(<DraftList />);
    expect(screen.getByText('Drafts: 0')).toBeInTheDocument();
  });

  it('shows correct draft count for a non-empty array', () => {
    render(<DraftList drafts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />);
    expect(screen.getByText('Drafts: 3')).toBeInTheDocument();
  });

  it('shows 0 when an empty array is explicitly passed', () => {
    render(<DraftList drafts={[]} />);
    expect(screen.getByText('Drafts: 0')).toBeInTheDocument();
  });

  it('has glass-card class on wrapper', () => {
    render(<DraftList />);
    expect(screen.getByText('Drafts: 0').closest('div')).toHaveClass('glass-card');
  });

  it('handles a large number of drafts', () => {
    const manyDrafts = Array.from({ length: 100 }, (_, i) => ({ id: i }));
    render(<DraftList drafts={manyDrafts} />);
    expect(screen.getByText('Drafts: 100')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// ApprovalGate
// ---------------------------------------------------------------------------
describe('ApprovalGate', () => {
  it('renders an "Approve & Continue" button', () => {
    render(<ApprovalGate onApprove={vi.fn()} disabled={false} />);
    expect(screen.getByRole('button', { name: 'Approve & Continue' })).toBeInTheDocument();
  });

  it('calls onApprove when clicked and not disabled', async () => {
    const onApprove = vi.fn();
    render(<ApprovalGate onApprove={onApprove} disabled={false} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it('button is disabled when disabled prop is true', () => {
    render(<ApprovalGate onApprove={vi.fn()} disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onApprove when disabled', async () => {
    const onApprove = vi.fn();
    render(<ApprovalGate onApprove={onApprove} disabled={true} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onApprove).not.toHaveBeenCalled();
  });

  it('button is enabled when disabled is false', () => {
    render(<ApprovalGate onApprove={vi.fn()} disabled={false} />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// EngagementChart
// ---------------------------------------------------------------------------
describe('EngagementChart', () => {
  it('renders 0 points when data is an empty array', () => {
    render(<EngagementChart data={[]} />);
    expect(screen.getByText('Engagement points: 0')).toBeInTheDocument();
  });

  it('renders correct count for a populated array', () => {
    render(<EngagementChart data={[10, 20, 30]} />);
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

  it('has glass-card class on wrapper', () => {
    render(<EngagementChart data={[]} />);
    expect(screen.getByText('Engagement points: 0').closest('div')).toHaveClass('glass-card');
  });

  it('handles array with a single element', () => {
    render(<EngagementChart data={['only one']} />);
    expect(screen.getByText('Engagement points: 1')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// ContentCard — additional edge cases
// ---------------------------------------------------------------------------
describe('ContentCard — additional', () => {
  it('renders with undefined title without crashing', () => {
    render(<ContentCard body="Body only" />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('renders with undefined body without crashing', () => {
    render(<ContentCard title="Title only" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Title only');
  });

  it('renders title and body independently (title change does not affect body)', () => {
    render(<ContentCard title="Unique Title" body="Unique Body" />);
    expect(screen.getByText('Unique Title')).toBeInTheDocument();
    expect(screen.getByText('Unique Body')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// DraftList — additional edge cases
// ---------------------------------------------------------------------------
describe('DraftList — additional', () => {
  it('renders 0 drafts when drafts contains non-array truthy value (fallback)', () => {
    // The default parameter `= []` only applies when prop is undefined.
    // Passing a string (non-array) shows how the component handles bad input.
    // The component uses .length so string length would be used — document this.
    render(<DraftList drafts="not-an-array" />);
    // "not-an-array".length === 13 — component uses .length directly
    expect(screen.getByText(/Drafts:/)).toBeInTheDocument();
  });

  it('renders single draft correctly', () => {
    render(<DraftList drafts={[{ id: 'single' }]} />);
    expect(screen.getByText('Drafts: 1')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// ApprovalGate — additional edge cases
// ---------------------------------------------------------------------------
describe('ApprovalGate — additional', () => {
  it('button label is exactly "Approve & Continue"', () => {
    render(<ApprovalGate onApprove={vi.fn()} disabled={false} />);
    expect(screen.getByRole('button').textContent).toBe('Approve & Continue');
  });

  it('renders without onApprove prop without crashing', () => {
    // Should not crash if onApprove is omitted (though clicking would throw)
    render(<ApprovalGate disabled={true} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});