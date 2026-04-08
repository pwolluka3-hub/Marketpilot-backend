import { generateWithModel } from './aiService';

export async function validateImageDescription(description) {
  const prompt = `Analyze this image description. Does it contain: extra fingers, deformed hands, distorted face, missing limbs, or unrealistic anatomy? Answer PASS or FAIL. Description: ${description}`;
  const response = await generateWithModel({
    systemPrompt: 'You are a strict media QA validator.',
    userPrompt: prompt,
    model: 'gpt-4o-mini'
  });
  return typeof response === 'string' ? response : JSON.stringify(response);
}
