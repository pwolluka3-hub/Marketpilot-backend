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
