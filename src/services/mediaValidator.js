import { generateWithModel } from './aiService';

/**
 * Validate an image description for common anatomical and realism issues.
 *
 * Evaluates the provided description and produces a media QA result: `PASS` if the description does not exhibit the flagged issues, `FAIL` if it does; when the underlying model returns a non-string value the result is returned as a JSON string.
 * @param {string} description - Text describing an image to be evaluated for extra fingers, deformed hands, distorted faces, missing limbs, or unrealistic anatomy.
 * @returns {string} `PASS` if the description passes the checks, `FAIL` if it fails, or a JSON string of the model response when the response is not a string.
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
