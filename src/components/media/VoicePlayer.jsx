export default function VoicePlayer({ text }) {
  return <div className="glass-card">Voice Script: {text?.slice(0, 140)}</div>;
}
