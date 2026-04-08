export default function ImageGenerator({ imageUrl }) {
  return imageUrl ? <img src={imageUrl} alt="Generated" style={{ width: '100%' }} /> : null;
}
