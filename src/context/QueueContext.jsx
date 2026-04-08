import { createContext, useContext, useMemo, useState } from 'react';

const QueueContext = createContext(null);

/**
 * Provides a context for managing a FIFO in-memory queue to descendant components.
 *
 * The context value exposed to descendants includes:
 * - `queue`: current array of queued items
 * - `enqueue(item)`: appends an item to the end of the queue
 * - `setQueue`: setter for replacing the queue state
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.children - Child elements that will have access to the queue context.
 * @returns {import('react').ReactElement} A Context Provider wrapping the given children.
 */
export function QueueProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const enqueue = (item) => setQueue((prev) => [...prev, item]);
  const value = useMemo(() => ({ queue, enqueue, setQueue }), [queue]);
  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

export const useQueueContext = () => useContext(QueueContext);