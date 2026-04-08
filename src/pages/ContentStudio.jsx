import { useState } from 'react';
import ApprovalGate from '../components/content/ApprovalGate';
import ContentCard from '../components/content/ContentCard';
import NeonButton from '../components/ui/NeonButton';
import { useAI } from '../hooks/useAI';

/**
 * Render a content studio UI that generates an AI caption and supports human approval.
 *
 * Renders a button that triggers caption generation with a fixed idea ("Launch teaser post"),
 * brand context ("Tech SaaS"), and model ("gpt-4o"); while generation is in progress the button
 * label shows "Generating...". When a result is available the generated caption is shown in a
 * ContentCard and the ApprovalGate becomes enabled; approving triggers a browser alert.
 *
 * @returns {JSX.Element} The ContentStudio React component UI.
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
