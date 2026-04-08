import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueueProvider, useQueueContext } from './QueueContext';

function TestConsumer() {
  const { queue, enqueue, setQueue } = useQueueContext();
  return (
    <div>
      <span data-testid="count">{queue.length}</span>
      <span data-testid="items">{JSON.stringify(queue)}</span>
      <button onClick={() => enqueue('item-a')}>Add A</button>
      <button onClick={() => enqueue('item-b')}>Add B</button>
      <button onClick={() => setQueue([])}>Clear</button>
    </div>
  );
}

describe('QueueContext', () => {
  it('provides an empty queue initially', () => {
    render(
      <QueueProvider>
        <TestConsumer />
      </QueueProvider>
    );
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('enqueue adds an item to the queue', async () => {
    const user = userEvent.setup();
    render(
      <QueueProvider>
        <TestConsumer />
      </QueueProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Add A' }));

    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('items').textContent).toBe(JSON.stringify(['item-a']));
  });

  it('enqueue appends items without replacing existing ones', async () => {
    const user = userEvent.setup();
    render(
      <QueueProvider>
        <TestConsumer />
      </QueueProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Add A' }));
    await user.click(screen.getByRole('button', { name: 'Add B' }));

    expect(screen.getByTestId('count').textContent).toBe('2');
    expect(screen.getByTestId('items').textContent).toBe(JSON.stringify(['item-a', 'item-b']));
  });

  it('setQueue replaces the entire queue', async () => {
    const user = userEvent.setup();
    render(
      <QueueProvider>
        <TestConsumer />
      </QueueProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Add A' }));
    await user.click(screen.getByRole('button', { name: 'Add B' }));
    await user.click(screen.getByRole('button', { name: 'Clear' }));

    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('exposes enqueue and setQueue in context value', () => {
    function InspectConsumer() {
      const ctx = useQueueContext();
      return (
        <span>
          {typeof ctx.enqueue}-{typeof ctx.setQueue}
        </span>
      );
    }
    render(
      <QueueProvider>
        <InspectConsumer />
      </QueueProvider>
    );
    expect(screen.getByText('function-function')).toBeInTheDocument();
  });

  it('renders children inside the provider', () => {
    render(
      <QueueProvider>
        <span>child</span>
      </QueueProvider>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('useQueueContext returns null when used outside a provider', () => {
    function BareConsumer() {
      const ctx = useQueueContext();
      return <span>{ctx === null ? 'no-context' : 'has-context'}</span>;
    }
    render(<BareConsumer />);
    expect(screen.getByText('no-context')).toBeInTheDocument();
  });

  it('enqueue with object item stores the object in queue', async () => {
    const user = userEvent.setup();
    function ObjectConsumer() {
      const { queue, enqueue } = useQueueContext();
      return (
        <div>
          <span data-testid="first">{queue[0] ? JSON.stringify(queue[0]) : ''}</span>
          <button onClick={() => enqueue({ id: 1, text: 'post' })}>Add Object</button>
        </div>
      );
    }
    render(
      <QueueProvider>
        <ObjectConsumer />
      </QueueProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Add Object' }));
    expect(screen.getByTestId('first').textContent).toBe(JSON.stringify({ id: 1, text: 'post' }));
  });
});