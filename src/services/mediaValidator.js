import { generateWithModel } from './aiService';

/**
 * Validates an image text description for common anatomical and hand-related issues.
 *
 * Checks the description for extra fingers, deformed hands, distorted face, missing limbs, or other unrealistic anatomy and produces a QA verdict.
 * @param {string} description - The image description to validate.
 * @returns {string} `'PASS'` if the description passes the QA checks, `'FAIL'` if it does not; if the model response is not a string, returns the JSON-serialized response.
 */
export async function validateImageDescription(description) {
  const prompt = `Analyze this image description. Does it contain: extra fingers, deformed hands, distorted face, missing limbs, or unrealistic anatomy? Answer PASS or FAIL. Description: ${description}`;
  const response = await generateWithModel({
    systemPrompt: 'You are a strict media QA validator.',
    userPrompt: prompt,
    model: 'gpt-4o-mini'
  });
  return typeof response === 'string' ? response : JSON.stringify(response);
}