import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';

function BrokenChild() {
  throw new Error('Test error');
}

function SafeChild() {
  return <div>Safe content</div>;
}

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <SafeChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('renders error fallback UI when a child throws', () => {
    const consoleError = console.error;
    console.error = () => {};
    render(
      <ErrorBoundary>
        <BrokenChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong. Please retry.')).toBeInTheDocument();
    console.error = consoleError;
  });

  it('error fallback has glass-card class', () => {
    const consoleError = console.error;
    console.error = () => {};
    const { container } = render(
      <ErrorBoundary>
        <BrokenChild />
      </ErrorBoundary>
    );
    expect(container.querySelector('.glass-card')).not.toBeNull();
    console.error = consoleError;
  });

  it('does not show the error fallback when no error occurs', () => {
    render(
      <ErrorBoundary>
        <SafeChild />
      </ErrorBoundary>
    );
    expect(screen.queryByText('Something went wrong. Please retry.')).not.toBeInTheDocument();
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
});