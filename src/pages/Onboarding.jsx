import { useState } from 'react';
import NeonButton from '../components/ui/NeonButton';
import { kvSet } from '../services/puterService';

export default function Onboarding() {
  const [step, setStep] = useState(1);

  const complete = async () => {
    await kvSet('onboarding_complete', true);
    setStep(4);
  };

  return (
    <div className="glass-card">
      <h1>Onboarding Step {step}/4</h1>
      <p>Puter auth, brand kit, social connect, model setup.</p>
      <NeonButton onClick={() => setStep((s) => Math.min(4, s + 1))}>Next</NeonButton>
      <NeonButton onClick={complete}>Mark Complete</NeonButton>
    </div>
  );
}
