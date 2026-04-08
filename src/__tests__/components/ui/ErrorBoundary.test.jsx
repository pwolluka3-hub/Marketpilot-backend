import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../../components/ui/ErrorBoundary';

// A component that throws during render to trigger the error boundary
function ThrowingChild({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('Test render error');
  }
  return <div>Child rendered successfully</div>;
}

describe('ErrorBoundary', () => {
  // Suppress React's console.error output for expected errors in tests
  let consoleError;
  beforeEach(() => {
    consoleError = console.error;
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = consoleError;
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Child rendered successfully')).toBeInTheDocument();
  });

  it('renders fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong. Please retry.')).toBeInTheDocument();
  });

  it('does not render children when error boundary is triggered', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.queryByText('Child rendered successfully')).not.toBeInTheDocument();
  });

  it('applies glass-card class to fallback UI', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(container.querySelector('.glass-card')).toBeInTheDocument();
  });

  it('renders multiple children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <span>First</span>
        <span>Second</span>
      </ErrorBoundary>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('getDerivedStateFromError returns hasError: true', () => {
    const state = ErrorBoundary.getDerivedStateFromError(new Error('test'));
    expect(state).toEqual({ hasError: true });
  });

  it('initialises with hasError: false', () => {
    // Verify the boundary does NOT show the fallback on initial mount
    render(
      <ErrorBoundary>
        <div>Normal content</div>
      </ErrorBoundary>
    );
    expect(screen.queryByText('Something went wrong. Please retry.')).not.toBeInTheDocument();
  });
});