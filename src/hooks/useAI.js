import { useState } from 'react';
import { runPipeline } from '../services/contentEngine';

/**
 * Provide an AI content generation helper and its loading state.
 *
 * The `generate` function runs the content pipeline with the supplied `params` and sets `loading` to `true` while the operation is in progress.
 *
 * @returns {Object} An object exposing the loading state and generate helper.
 * @property {boolean} loading - `true` when a generation is in progress, `false` otherwise.
 * @property {function(Object): any} generate - Function that accepts a `params` object, invokes the content pipeline with those parameters, and returns the pipeline result.
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
