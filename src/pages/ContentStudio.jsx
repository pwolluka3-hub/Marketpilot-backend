import { useState } from 'react';
import ApprovalGate from '../components/content/ApprovalGate';
import ContentCard from '../components/content/ContentCard';
import NeonButton from '../components/ui/NeonButton';
import { useAI } from '../hooks/useAI';

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
