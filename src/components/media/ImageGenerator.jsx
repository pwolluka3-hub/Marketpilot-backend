/**
 * Render an image when an image URL is provided.
 * @param {{imageUrl?: string}} props
 * @param {string} props.imageUrl - The URL of the image to display; if falsy, the component renders nothing.
 * @returns {JSX.Element|null} The `<img>` element with `src` set to `imageUrl` and `alt` set to `"Generated"`, or `null` when no `imageUrl` is provided.
 */
export default function ImageGenerator({ imageUrl }) {
  return imageUrl ? <img src={imageUrl} alt="Generated" style={{ width: '100%' }} /> : null;
}