import { kvGet } from './puterService';

/**
 * Selects an available voice provider and initiates speech for the provided text.
 *
 * @param {string} text - The text to synthesize. When the browser's SpeechSynthesis is used, occurrences of "[pause]" are replaced with ". " to create short pauses.
 * @returns {{provider: 'elevenlabs'|'webspeech', text: string}} An object identifying the chosen provider and echoing the input text. `provider` is `'elevenlabs'` when an ElevenLabs API key is configured, otherwise `'webspeech'` when the browser's SpeechSynthesis is used.
 * @throws {Error} If no voice provider is available.
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
