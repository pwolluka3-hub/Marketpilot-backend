import { puterText } from './puterService';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Execute `fn`, retrying on rate-related errors using exponential backoff.
 *
 * Calls the provided async function and if it throws an error whose message
 * contains "rate" (case-insensitive), retries up to `maxRetries` times with
 * delays of 1000 * 2**attempt milliseconds between attempts. Non-rate errors
 * are rethrown immediately.
 *
 * @param {Function} fn - An async function to execute on each attempt.
 * @param {number} [maxRetries=3] - Maximum number of attempts before giving up.
 * @returns {*} The successful result returned by `fn`, or `null` if no attempt succeeded.
 * @throws {*} Rethrows the caught error when it is not rate-related or when retries are exhausted.
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
 * Generate text from the specified model using provided system and user prompts.
 * @param {string} systemPrompt - The system-level instruction or context sent to the model.
 * @param {string} userPrompt - The user-facing prompt to be processed by the model.
 * @param {string} [model='gpt-4o'] - The model identifier to use for generation.
 * @returns {Object|null} The generation result returned by the model, or `null` if all retry attempts were exhausted.
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
