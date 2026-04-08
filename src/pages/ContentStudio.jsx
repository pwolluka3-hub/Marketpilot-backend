import { useState } from 'react';
import ApprovalGate from '../components/content/ApprovalGate';
import ContentCard from '../components/content/ContentCard';
import NeonButton from '../components/ui/NeonButton';
import { useAI } from '../hooks/useAI';

/**
 * Render the Content Studio page that generates AI captions and provides a human approval control.
 *
 * Uses the `useAI` hook to request a caption for a fixed idea and brand context, displays a "Generate"
 * button that reflects loading state, shows a `ContentCard` with the generated `caption` when available,
 * and renders an `ApprovalGate` disabled until a result exists (its approve action currently alerts).
 * @returns {JSX.Element} The page UI containing the generate button, conditional generated-content card, and approval gate.
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