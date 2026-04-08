import { kvGet } from './puterService';

/**
 * Selects an available text-to-speech provider and synthesizes the provided text.
 * @param {string} text - Text to synthesize; occurrences of "[pause]" are replaced with ". " when using web speech.
 * @returns {{provider: 'elevenlabs'|'webspeech', text: string}} An object with the chosen provider and the original text.
 * @throws {Error} If no supported voice provider is available.
 */
export async function synthesizeVoice(text) {
  const elevenLabsKey = await kvGet('elevenlabs_key');
  if (elevenLabsKey) {
    return { provider: 'elevenlabs', text };
  }

  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text.replaceAll('[pause]', '. '));
    speechSynthesis.speak(utterance);
    return { provider: 'webspeech', text };
  }

  throw new Error('No voice provider available');
}