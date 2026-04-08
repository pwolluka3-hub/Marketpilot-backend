/**
 * Render an image element when an image URL is provided.
 *
 * @param {Object} props - Component props.
 * @param {string} props.imageUrl - URL of the image to display; if falsy, the component renders nothing.
 * @returns {JSX.Element|null} The rendered `<img>` element configured with the provided URL, or `null` when no URL is supplied.
 */
export default function ImageGenerator({ imageUrl }) {
  return imageUrl ? <img src={imageUrl} alt="Generated" style={{ width: '100%' }} /> : null;
}
