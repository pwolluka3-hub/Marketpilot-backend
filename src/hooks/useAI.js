import { useState } from 'react';
import { runPipeline } from '../services/contentEngine';

/**
 * React hook that provides a loading flag and a function to run the content pipeline.
 *
 * @returns {{loading: boolean, generate: function}} An object with:
 *  - `loading`: `true` when a pipeline run is in progress, `false` otherwise.
 *  - `generate(params)`: executes the pipeline with `params` and returns the pipeline's result.
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