import { createContext, useContext, useMemo, useState } from 'react';

const QueueContext = createContext(null);

/**
 * Provides a context for managing a FIFO queue to descendant components.
 * @param {object} props
 * @param {import('react').ReactNode} props.children - Child elements that will have access to the queue context.
 * @returns {JSX.Element} A provider element that supplies queue state and queue-manipulation functions to descendants.
 */
export function QueueProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const enqueue = (item) => setQueue((prev) => [...prev, item]);
  const value = useMemo(() => ({ queue, enqueue, setQueue }), [queue]);
  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

export const useQueueContext = () => useContext(QueueContext);
