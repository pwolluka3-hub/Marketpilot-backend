import { useState } from 'react';
import NeonButton from '../components/ui/NeonButton';
import { kvSet } from '../services/puterService';

/**
 * Render an onboarding UI that tracks a four-step progress and lets the user advance or mark completion.
 *
 * The component maintains an internal `step` state starting at 1. The "Next" control advances `step` up to 4.
 * The "Mark Complete" control persists completion by writing `onboarding_complete = true` to the key-value store
 * and advances the UI to the final step.
 *
 * @returns {JSX.Element} The onboarding component UI.
 */
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