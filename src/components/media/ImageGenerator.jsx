/**
 * Renders an image that fills its container when an image URL is provided.
 * @param {{ imageUrl?: string }} props - Component props.
 * @param {string} props.imageUrl - Source URL of the image to render.
 * @returns {JSX.Element|null} The rendered <img> element when `imageUrl` is provided, `null` otherwise.
 */
export default function ImageGenerator({ imageUrl }) {
  return imageUrl ? <img src={imageUrl} alt="Generated" style={{ width: '100%' }} /> : null;
}