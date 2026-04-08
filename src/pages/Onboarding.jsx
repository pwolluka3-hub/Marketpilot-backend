import { useState } from 'react';
import NeonButton from '../components/ui/NeonButton';
import { kvSet } from '../services/puterService';

/**
 * Render an onboarding UI that tracks progress through four steps.
 *
 * When the "Next" button is clicked the current step advances (capped at 4).
 * When the "Mark Complete" button is clicked the component stores `onboarding_complete = true` via `kvSet`
 * and advances to the final step.
 *
 * @returns {JSX.Element} The onboarding React element containing the step header, description, and action buttons.
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
