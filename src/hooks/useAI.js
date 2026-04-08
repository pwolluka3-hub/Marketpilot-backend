import { useState } from 'react';
import { runPipeline } from '../services/contentEngine';

/**
 * React hook that provides an AI content generation helper and its loading state.
 * @returns {{loading: boolean, generate: function}} An object containing:
 *  - loading: `true` when a generation is in progress, `false` otherwise.
 *  - generate: a function that accepts a `params` object, invokes the content pipeline with those parameters, and returns the pipeline result.
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
