/**
 * Render a responsive HTML5 video element when a source URL is provided.
 *
 * @param {Object} props
 * @param {string} props.src - The video source URL; when falsy, the component renders `null`.
 * @returns {JSX.Element|null} The `<video>` element with controls and width set to 100%, or `null` if no `src` is given.
 */
export default function VideoPreview({ src }) {
  return src ? <video src={src} controls style={{ width: '100%' }} /> : null;
}