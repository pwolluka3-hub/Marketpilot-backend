import { puterText } from './puterService';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Call an async function with retry support for rate-related errors using exponential backoff.
 *
 * @param {() => Promise<any>} fn - The asynchronous operation to execute.
 * @param {number} [maxRetries=3] - Maximum number of attempts (including the first).
 * @returns {any|null} The resolved value from `fn` if successful, or `null` if no value is returned after all attempts.
 * @throws {Error} Rethrows the original error if it is not a rate-related error or if retries are exhausted.
 */
export async function aiCallWithRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i += 1) {
    try {
      return await fn();
    } catch (error) {
      if (error.message?.toLowerCase().includes('rate') && i < maxRetries - 1) {
        await sleep(1000 * 2 ** i);
        continue;
      }
      throw error;
    }
  }
  return null;
}

/**
 * Generate a text response from the specified model using the provided system and user prompts.
 *
 * @param {Object} params - Parameters for the generation.
 * @param {string} params.systemPrompt - The system-level prompt that sets behavior or context for the model.
 * @param {string} params.userPrompt - The user-facing prompt to generate a response for.
 * @param {string} [params.model='gpt-4o'] - The model identifier to use for generation.
 * @returns {any} The response produced by `puterText`, or `null` if retries are exhausted. 
 */
export async function generateWithModel({ systemPrompt, userPrompt, model = 'gpt-4o' }) {
  return aiCallWithRetry(() =>
    puterText({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })
  );
}