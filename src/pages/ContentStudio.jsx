import { useState } from 'react';
import ApprovalGate from '../components/content/ApprovalGate';
import ContentCard from '../components/content/ContentCard';
import NeonButton from '../components/ui/NeonButton';
import { useAI } from '../hooks/useAI';

/**
 * Render the Content Studio page that lets a user generate an AI caption and approve it.
 *
 * Renders a generate button that reflects loading state, conditionally displays a generated-content card
 * when a caption is available, and provides an approval control that is disabled until a result exists.
 * @returns {JSX.Element} The page UI containing a generate button, optional generated-content card, and an approval gate.
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