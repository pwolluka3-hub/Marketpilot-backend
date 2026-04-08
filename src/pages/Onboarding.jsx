import { useState } from 'react';
import NeonButton from '../components/ui/NeonButton';
import { kvSet } from '../services/puterService';

/**
 * Render the onboarding UI and controls for progressing through four steps.
 *
 * The "Next" button advances the current step by one, capped at 4. The "Mark Complete"
 * action persists `onboarding_complete = true` via `kvSet` and moves the UI to the final step.
 *
 * @returns {JSX.Element} The onboarding React element showing the current step, a description, and action buttons.
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
