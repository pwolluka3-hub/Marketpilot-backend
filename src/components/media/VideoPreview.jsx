/**
 * Renders a responsive HTML5 video element when a source is provided.
 *
 * @param {{src?: string}} props - Component props.
 * @param {string} props.src - Video source URL; if falsy, nothing is rendered.
 * @returns {JSX.Element|null} A `<video>` element with controls and width set to 100%, or `null` if `src` is falsy.
 */
export default function VideoPreview({ src }) {
  return src ? <video src={src} controls style={{ width: '100%' }} /> : null;
}