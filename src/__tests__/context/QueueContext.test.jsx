import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueueProvider, useQueueContext } from '../../context/QueueContext';

function QueueConsumer() {
  const { queue, enqueue, setQueue } = useQueueContext();
  return (
    <div>
      <span data-testid="length">{queue.length}</span>
      <span data-testid="items">{JSON.stringify(queue)}</span>
      <button onClick={() => enqueue('item-a')}>Enqueue A</button>
      <button onClick={() => enqueue('item-b')}>Enqueue B</button>
      <button onClick={() => setQueue([])}>Clear</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <QueueProvider>
      <QueueConsumer />
    </QueueProvider>
  );
}

describe('QueueContext / QueueProvider', () => {
  it('starts with an empty queue', () => {
    renderWithProvider();
    expect(screen.getByTestId('length').textContent).toBe('0');
  });

  it('enqueues an item when enqueue is called', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByRole('button', { name: 'Enqueue A' }));
    expect(screen.getByTestId('length').textContent).toBe('1');
  });

  it('appends items in FIFO order', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByRole('button', { name: 'Enqueue A' }));
    await userEvent.click(screen.getByRole('button', { name: 'Enqueue B' }));
    expect(screen.getByTestId('items').textContent).toBe(JSON.stringify(['item-a', 'item-b']));
  });

  it('enqueues the same item multiple times', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByRole('button', { name: 'Enqueue A' }));
    await userEvent.click(screen.getByRole('button', { name: 'Enqueue A' }));
    expect(screen.getByTestId('length').textContent).toBe('2');
  });

  it('clears the queue with setQueue([])', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByRole('button', { name: 'Enqueue A' }));
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByTestId('length').textContent).toBe('0');
  });

  it('exposes setQueue to directly replace the queue', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByRole('button', { name: 'Enqueue A' }));
    await userEvent.click(screen.getByRole('button', { name: 'Enqueue B' }));
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(JSON.parse(screen.getByTestId('items').textContent)).toEqual([]);
  });

  it('returns null when useQueueContext is used outside provider', () => {
    function NoProvider() {
      const ctx = useQueueContext();
      return <div data-testid="ctx">{ctx === null ? 'null' : 'value'}</div>;
    }
    render(<NoProvider />);
    expect(screen.getByTestId('ctx').textContent).toBe('null');
  });
});