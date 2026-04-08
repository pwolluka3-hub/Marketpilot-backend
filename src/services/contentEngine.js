import { generateWithModel } from './aiService';
import { puterImage } from './puterService';
import { validateImageDescription } from './mediaValidator';

export async function runPipeline({ idea, brandContext, model }) {
  const systemPrompt = `You are an elite social media strategist, content creator, and growth expert. Brand context: ${brandContext}.`;
  const strategy = await generateWithModel({ systemPrompt, userPrompt: `Build strategy for: ${idea}`, model });
  const caption = await generateWithModel({ systemPrompt, userPrompt: `Create post text for: ${idea}`, model });

  const basePrompt = `${idea}, ultra-realistic, photorealistic, 8K, shot on Canon EOS R5, natural lighting, anatomically correct human proportions, 5 fingers per hand, symmetrical face, sharp focus`;
  const image = await puterImage(basePrompt);
  const validation = await validateImageDescription(`Generated image for ${idea}`);

  return { strategy, caption, image, validation, approved: String(validation).includes('PASS') };
}
