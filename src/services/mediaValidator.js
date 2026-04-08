import { generateWithModel } from './aiService';

/**
 * Determine whether an image description contains anatomical issues (extra fingers, deformed hands, distorted face, missing limbs, or other unrealistic anatomy) and produce a QA verdict.
 * @param {string} description - The image description to evaluate.
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