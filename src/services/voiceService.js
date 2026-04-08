import { kvGet } from './puterService';

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
