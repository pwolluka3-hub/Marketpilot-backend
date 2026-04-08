import { puterText } from './puterService';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Attempt to execute `fn` up to `maxRetries` times, retrying on errors that indicate rate limiting.
 *
 * Retries use exponential backoff (1s, 2s, 4s, ...) between attempts when the thrown error's message
 * contains the substring "rate" (case-insensitive). Non-rate-related errors are rethrown immediately.
 *
 * @param {Function} fn - A function that returns a value or a promise; its resolved value is returned on success.
 * @param {number} [maxRetries=3] - Maximum number of attempts to run `fn`.
 * @returns {*} The value returned by `fn` if an attempt succeeds, or `null` if all retryable attempts fail.
 * @throws {Error} Any error thrown by `fn` that is not identified as a rate-limit error.
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
 * Generate a chat/completion response from the configured model using a system and user prompt.
 *
 * @param {Object} params - Input parameters.
 * @param {string} params.systemPrompt - The system prompt guiding model behavior.
 * @param {string} params.userPrompt - The user prompt to be sent to the model.
 * @param {string} [params.model='gpt-4o'] - Model identifier to use for the request.
 * @returns {any} The response returned by the AI service call, or `null` if all retry attempts fail without throwing.
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