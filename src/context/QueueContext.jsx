import { createContext, useContext, useMemo, useState } from 'react';

const QueueContext = createContext(null);

export function QueueProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const enqueue = (item) => setQueue((prev) => [...prev, item]);
  const value = useMemo(() => ({ queue, enqueue, setQueue }), [queue]);
  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

export const useQueueContext = () => useContext(QueueContext);
