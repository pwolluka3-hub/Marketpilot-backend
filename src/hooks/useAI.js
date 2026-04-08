import { useState } from 'react';
import { runPipeline } from '../services/contentEngine';

/**
 * Provides a loading state and a function to run the AI content pipeline.
 *
 * @returns {{loading: boolean, generate: function(Object): Promise<*>}} An object with `loading` (true while a pipeline run is in progress) and `generate(params)` which runs the pipeline and resolves to the pipeline result.
 */
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