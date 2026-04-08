import { generateWithModel } from './aiService';

/**
 * Validate an image description for specified anatomical issues by requesting a PASS or FAIL verdict.
 * @param {string} description - The natural-language image description to evaluate.
 * @returns {string} `'PASS'` if the description passes the anatomical checks, `'FAIL'` if it fails; if the model response is not a string, returns the JSON-serialized representation of that response.
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