import { useState } from 'react';
import NeonButton from '../components/ui/NeonButton';
import { kvSet } from '../services/puterService';

/**
 * Render a four-step onboarding UI that displays the current step and provides controls to advance or mark onboarding complete.
 *
 * The component manages internal `step` state (1–4). Clicking "Next" increments the step up to 4. Clicking "Mark Complete" persists an `onboarding_complete` flag via `kvSet` and then sets the step to 4.
 *
 * @returns {JSX.Element} The onboarding interface showing the current step, a description, a "Next" button, and a "Mark Complete" button.
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