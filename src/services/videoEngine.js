/**
 * Create a WebM video by drawing an array of images onto an offscreen canvas.
 *
 * @param {{images?: string[], width?: number, height?: number, fps?: number}} options - Video generation options.
 * @param {string[]} [options.images=[]] - Array of image source URLs or data URIs to render sequentially as frames.
 * @param {number} [options.width=1080] - Canvas width in pixels.
 * @param {number} [options.height=1920] - Canvas height in pixels.
 * @param {number} [options.fps=30] - Frame rate used when capturing the canvas stream.
 * @returns {Blob} A Blob containing the generated video in `video/webm` format.
 */
export async function createStoryboardVideo({ images = [], width = 1080, height = 1920, fps = 30 }) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  const chunks = [];

  recorder.ondataavailable = (event) => chunks.push(event.data);
  recorder.start();

  for (const img of images) {
    await new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height);
        setTimeout(resolve, 1200);
      };
      image.src = img;
    });
  }

  recorder.stop();
  return new Promise((resolve) => {
    recorder.onstop = () => resolve(new Blob(chunks, { type: 'video/webm' }));
  });
}