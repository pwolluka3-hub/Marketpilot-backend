import { generateWithModel } from './aiService';
import { puterImage } from './puterService';
import { validateImageDescription } from './mediaValidator';

/**
 * Orchestrates an AI-driven content and image generation workflow for a given idea and brand context.
 *
 * @param {Object} params - Parameters.
 * @param {string} params.idea - The content idea used to generate strategy, caption, and image prompts.
 * @param {string} params.brandContext - Brand context to tailor the generated strategy and caption.
 * @param {string} params.model - Identifier of the text-generation model to use for strategy and caption.
 * @returns {{strategy: string, caption: string, image: any, validation: any, approved: boolean}} An object with:
 *   - `strategy`: generated content strategy,
 *   - `caption`: generated post text,
 *   - `image`: generated image result,
 *   - `validation`: validation output for the image description,
 *   - `approved`: `true` if `validation` includes the substring `"PASS"`, `false` otherwise.
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