/**
 * Renders a responsive HTML5 video element for the provided source or nothing when no source is provided.
 *
 * @param {string} src - Video source URL or object URL; when falsy, the component renders nothing.
 * @returns {JSX.Element|null} A <video> element with controls and full-width styling when `src` is provided, or `null` otherwise.
 */
export default function VideoPreview({ src }) {
  return src ? <video src={src} controls style={{ width: '100%' }} /> : null;
}
