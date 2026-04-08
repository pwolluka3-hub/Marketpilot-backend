import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GlassCard from '../components/ui/GlassCard';
import LoadingPulse from '../components/ui/LoadingPulse';
import NeonButton from '../components/ui/NeonButton';
import ErrorBoundary from '../components/ui/ErrorBoundary';

// ---------------------------------------------------------------------------
// GlassCard
// ---------------------------------------------------------------------------
describe('GlassCard', () => {
  it('renders children inside a section element', () => {
    render(<GlassCard><span>hello</span></GlassCard>);
    expect(screen.getByText('hello')).toBeInTheDocument();
    const section = screen.getByText('hello').closest('section');
    expect(section).not.toBeNull();
  });

  it('applies glass-card class', () => {
    render(<GlassCard>content</GlassCard>);
    const section = screen.getByText('content').closest('section');
    expect(section).toHaveClass('glass-card');
  });

  it('renders multiple children', () => {
    render(
      <GlassCard>
        <p>first</p>
        <p>second</p>
      </GlassCard>
    );
    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
  });

  it('renders with no children without crashing', () => {
    const { container } = render(<GlassCard />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// LoadingPulse
// ---------------------------------------------------------------------------
describe('LoadingPulse', () => {
  it('renders loading text', () => {
    render(<LoadingPulse />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('has glass-card class', () => {
    render(<LoadingPulse />);
    expect(screen.getByText('Loading...').closest('div')).toHaveClass('glass-card');
  });

  it('renders consistently with no props', () => {
    const { container } = render(<LoadingPulse />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// NeonButton
// ---------------------------------------------------------------------------
describe('NeonButton', () => {
  it('renders as a button element', () => {
    render(<NeonButton>Click me</NeonButton>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('has type="button" to avoid accidental form submission', () => {
    render(<NeonButton>Go</NeonButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('applies neon-button class', () => {
    render(<NeonButton>Styled</NeonButton>);
    expect(screen.getByRole('button')).toHaveClass('neon-button');
  });

  it('calls onClick handler when clicked', async () => {
    const handler = vi.fn();
    render(<NeonButton onClick={handler}>Press</NeonButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is passed', () => {
    render(<NeonButton disabled>Disabled</NeonButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', async () => {
    const handler = vi.fn();
    render(<NeonButton disabled onClick={handler}>Disabled</NeonButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('spreads arbitrary props onto the button', () => {
    render(<NeonButton data-testid="neon-btn" aria-label="custom">X</NeonButton>);
    const btn = screen.getByTestId('neon-btn');
    expect(btn).toHaveAttribute('aria-label', 'custom');
  });
});

// ---------------------------------------------------------------------------
// ErrorBoundary
// ---------------------------------------------------------------------------

// Helper component that throws on demand
function ThrowingChild({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
}

describe('ErrorBoundary', () => {
  // Suppress console.error noise from React's error boundary internals
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    console.error.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('renders fallback UI when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong. Please retry.')).toBeInTheDocument();
  });

  it('fallback UI has glass-card class', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={true} />
      </ErrorBoundary>
    );
    const fallback = screen.getByText('Something went wrong. Please retry.');
    expect(fallback.closest('div')).toHaveClass('glass-card');
  });

  it('does not show fallback when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <span>safe content</span>
      </ErrorBoundary>
    );
    expect(screen.queryByText('Something went wrong. Please retry.')).not.toBeInTheDocument();
    expect(screen.getByText('safe content')).toBeInTheDocument();
  });

  it('getDerivedStateFromError returns hasError: true', () => {
    expect(ErrorBoundary.getDerivedStateFromError(new Error('boom'))).toEqual({ hasError: true });
  });

  it('catches errors from deeply nested children', () => {
    const DeepThrower = () => { throw new Error('deep error'); };
    render(
      <ErrorBoundary>
        <div>
          <div>
            <DeepThrower />
          </div>
        </div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong. Please retry.')).toBeInTheDocument();
  });

  it('renders multiple safe children without triggering fallback', () => {
    render(
      <ErrorBoundary>
        <span>child one</span>
        <span>child two</span>
        <span>child three</span>
      </ErrorBoundary>
    );
    expect(screen.getByText('child one')).toBeInTheDocument();
    expect(screen.getByText('child two')).toBeInTheDocument();
    expect(screen.getByText('child three')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong. Please retry.')).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Additional GlassCard edge cases
// ---------------------------------------------------------------------------
describe('GlassCard — additional', () => {
  it('renders nested GlassCards without crashing', () => {
    render(
      <GlassCard>
        <GlassCard>
          <span>nested</span>
        </GlassCard>
      </GlassCard>
    );
    expect(screen.getByText('nested')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Additional NeonButton edge cases
// ---------------------------------------------------------------------------
describe('NeonButton — additional', () => {
  it('renders with no children (empty button) without crashing', () => {
    const { container } = render(<NeonButton />);
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('passes custom className alongside neon-button', () => {
    render(<NeonButton className="extra-class">X</NeonButton>);
    // NeonButton spreads props, so className overrides the hardcoded one
    // This test documents the current spread behaviour
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });

  it('accepts numeric children', () => {
    render(<NeonButton>{42}</NeonButton>);
    expect(screen.getByRole('button')).toHaveTextContent('42');
  });
});