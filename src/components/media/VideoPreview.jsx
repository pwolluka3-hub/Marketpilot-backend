export default function VideoPreview({ src }) {
  return src ? <video src={src} controls style={{ width: '100%' }} /> : null;
}
