import { useState } from 'react';
import { runPipeline } from '../services/contentEngine';

export function useAI() {
  const [loading, setLoading] = useState(false);

  const generate = async (params) => {
    setLoading(true);
    try {
      return await runPipeline(params);
    } finally {
      setLoading(false);
    }
  };

  return { loading, generate };
}
