import { createContext, useContext, useMemo, useState } from 'react';

const QueueContext = createContext(null);

/**
 * Provides queue state and updater functions to descendant components via React context.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children - Child elements that will receive the queue context.
 * @returns {import('react').ReactElement} A context provider supplying `{ queue, enqueue, setQueue }` to its descendants.
 */
export function QueueProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const enqueue = (item) => setQueue((prev) => [...prev, item]);
  const value = useMemo(() => ({ queue, enqueue, setQueue }), [queue]);
  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

export const useQueueContext = () => useContext(QueueContext);