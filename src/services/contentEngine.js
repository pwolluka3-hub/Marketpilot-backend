import { generateWithModel } from './aiService';
import { puterImage } from './puterService';
import { validateImageDescription } from './mediaValidator';

/**
 * Orchestrates an AI-driven content workflow for a given idea and brand context.
 *
 * @param {Object} params - Input parameters.
 * @param {string} params.idea - The content idea or prompt to generate strategy, caption, and image for.
 * @param {string} params.brandContext - Brand-specific context to include in the system prompt.
 * @param {string} params.model - Identifier of the AI model to use for text generation.
 * @returns {{strategy: string, caption: string, image: any, validation: any, approved: boolean}}
 *   An object containing:
 *   - `strategy`: the generated content/marketing strategy text.
 *   - `caption`: the generated post text for the idea.
 *   - `image`: the result returned from the image-generation service.
 *   - `validation`: the validation result for the generated image description.
 *   - `approved`: `true` if `validation` contains the substring `'PASS'`, `false` otherwise.
 */
export async function runPipeline({ idea, brandContext, model }) {
  const systemPrompt = `You are an elite social media strategist, content creator, and growth expert. Brand context: ${brandContext}.`;
  const strategy = await generateWithModel({ systemPrompt, userPrompt: `Build strategy for: ${idea}`, model });
  const caption = await generateWithModel({ systemPrompt, userPrompt: `Create post text for: ${idea}`, model });

  const basePrompt = `${idea}, ultra-realistic, photorealistic, 8K, shot on Canon EOS R5, natural lighting, anatomically correct human proportions, 5 fingers per hand, symmetrical face, sharp focus`;
  const image = await puterImage(basePrompt);
  const validation = await validateImageDescription(`Generated image for ${idea}`);

  return { strategy, caption, image, validation, approved: String(validation).includes('PASS') };
}
