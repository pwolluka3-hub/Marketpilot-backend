/**
 * Create a WebM video Blob by rendering a sequence of image URLs onto a canvas.
 *
 * Renders each provided image scaled to the specified canvas dimensions, holds each frame for approximately 1200 milliseconds, captures the canvas as a media stream at the given framerate, and returns a Blob containing the recorded WebM video.
 *
 * @param {Object} params - Function options.
 * @param {string[]} [params.images=[]] - Array of image URLs to render as sequential frames.
 * @param {number} [params.width=1080] - Canvas width in pixels.
 * @param {number} [params.height=1920] - Canvas height in pixels.
 * @param {number} [params.fps=30] - Capture framerate (frames per second) for the recorded stream.
 * @returns {Blob} A Blob containing the recorded video in `video/webm` format.
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
