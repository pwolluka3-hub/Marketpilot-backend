import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueueProvider, useQueueContext } from '../QueueContext';

function TestConsumer() {
  const { queue, enqueue, setQueue } = useQueueContext();
  return (
    <div>
      <span data-testid="count">{queue.length}</span>
      <span data-testid="items">{queue.join(',')}</span>
      <button onClick={() => enqueue('item-a')}>Enqueue A</button>
      <button onClick={() => enqueue('item-b')}>Enqueue B</button>
      <button onClick={() => setQueue([])}>Clear</button>
    </div>
  );
}

describe('QueueContext', () => {
  it('starts with an empty queue', () => {
    render(
      <QueueProvider>
        <TestConsumer />
      </QueueProvider>
    );
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('enqueue adds an item to the queue', () => {
    render(
      <QueueProvider>
        <TestConsumer />
      </QueueProvider>
    );
    act(() => {
      screen.getByRole('button', { name: 'Enqueue A' }).click();
    });
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('items').textContent).toBe('item-a');
  });

  it('enqueue appends to existing items without replacing them', () => {
    render(
      <QueueProvider>
        <TestConsumer />
      </QueueProvider>
    );
    act(() => {
      screen.getByRole('button', { name: 'Enqueue A' }).click();
    });
    act(() => {
      screen.getByRole('button', { name: 'Enqueue B' }).click();
    });
    expect(screen.getByTestId('count').textContent).toBe('2');
    expect(screen.getByTestId('items').textContent).toBe('item-a,item-b');
  });

  it('setQueue allows replacing the queue directly', () => {
    render(
      <QueueProvider>
        <TestConsumer />
      </QueueProvider>
    );
    act(() => {
      screen.getByRole('button', { name: 'Enqueue A' }).click();
    });
    act(() => {
      screen.getByRole('button', { name: 'Clear' }).click();
    });
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('renders children correctly', () => {
    render(
      <QueueProvider>
        <span>queue-child</span>
      </QueueProvider>
    );
    expect(screen.getByText('queue-child')).toBeInTheDocument();
  });

  it('returns null context when useQueueContext is called outside provider', () => {
    function Orphan() {
      const ctx = useQueueContext();
      return <div>{ctx === null ? 'null-ctx' : 'has-ctx'}</div>;
    }
    render(<Orphan />);
    expect(screen.getByText('null-ctx')).toBeInTheDocument();
  });

  it('preserves queue item order (FIFO)', () => {
    render(
      <QueueProvider>
        <TestConsumer />
      </QueueProvider>
    );
    act(() => screen.getByRole('button', { name: 'Enqueue A' }).click());
    act(() => screen.getByRole('button', { name: 'Enqueue B' }).click());
    const items = screen.getByTestId('items').textContent.split(',');
    expect(items[0]).toBe('item-a');
    expect(items[1]).toBe('item-b');
  });
});