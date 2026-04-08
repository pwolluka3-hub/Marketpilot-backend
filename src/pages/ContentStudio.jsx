import { useState } from 'react';
import ApprovalGate from '../components/content/ApprovalGate';
import ContentCard from '../components/content/ContentCard';
import NeonButton from '../components/ui/NeonButton';
import { useAI } from '../hooks/useAI';

/**
 * Render a UI for generating AI captions and approving the generated result.
 *
 * Renders a button that triggers generation via the `useAI` hook, displays the generated caption when available, and provides an approval gate that becomes enabled after generation.
 * @returns {JSX.Element} A React element containing the generation button, an optional content card showing the generated caption, and an approval gate.
 */
export default function ContentStudio() {
  const [result, setResult] = useState(null);
  const { loading, generate } = useAI();

  const onGenerate = async () => {
    const next = await generate({ idea: 'Launch teaser post', brandContext: 'Tech SaaS', model: 'gpt-4o' });
    setResult(next);
  };

  return (
    <div>
      <NeonButton onClick={onGenerate}>{loading ? 'Generating...' : 'Generate'}</NeonButton>
      {result && <ContentCard title="Generated Caption" body={String(result.caption)} />}
      <ApprovalGate disabled={!result} onApprove={() => alert('Human-approved')} />
    </div>
  );
}