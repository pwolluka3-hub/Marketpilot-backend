import { puterText } from './puterService';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
