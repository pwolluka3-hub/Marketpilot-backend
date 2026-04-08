import { generateWithModel } from './aiService';
import { puterImage } from './puterService';
import { validateImageDescription } from './mediaValidator';

/**
 * Orchestrates generation of a social media strategy, post caption, and a validated image for a given idea and brand context.
 *
 * @param {Object} options - Input options.
 * @param {string} options.idea - The creative idea or prompt used to generate the strategy, caption, and image.
 * @param {string} options.brandContext - Brand-specific context or guidelines to tailor the generated content.
 * @param {string|Object} options.model - Identifier or configuration for the AI text-generation model to use.
 * @returns {{ strategy: string, caption: string, image: any, validation: any, approved: boolean }} An object containing:
 *  - strategy: Generated strategy text.
 *  - caption: Generated post text.
 *  - image: Generated image result (format depends on image service).
 *  - validation: Result from the image validation step.
 *  - approved: `true` if the validation result indicates a pass, `false` otherwise.
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