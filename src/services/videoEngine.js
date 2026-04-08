/**
 * Generates a WebM video by drawing a sequence of image URLs onto an offscreen canvas and recording the canvas output.
 *
 * @param {Object} options - Configuration options.
 * @param {string[]} [options.images=[]] - Ordered array of image URLs or data URIs to include as frames; each image is drawn to fill the canvas and displayed for approximately 1200ms.
 * @param {number} [options.width=1080] - Canvas width in pixels.
 * @param {number} [options.height=1920] - Canvas height in pixels.
 * @param {number} [options.fps=30] - Frame rate used when capturing the canvas stream.
 * @returns {Promise<Blob>} A Promise that resolves to a Blob containing the recorded video in WebM format.
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