import { useBrandContext } from '../context/BrandContext';
import NeonButton from '../components/ui/NeonButton';

const defaultBrand = {
  brandName: 'My Brand',
  niche: 'SaaS',
  targetAudience: 'Founders',
  primaryColor: '#00F5FF',
  secondaryColor: '#BF5FFF',
  tone: 'professional',
  avoidTopics: [],
  competitorInsights: [],
  uniqueSellingPoint: 'Fast execution',
  contentPillars: ['Tips', 'Stories', 'Case Studies']
};

/**
 * Render the current brand kit as formatted JSON and provide a button that saves the default brand kit into context.
 *
 * Displays the active `brandKit` from BrandContext (or `defaultBrand` when absent) and a `NeonButton` which, when clicked,
 * sets the context value to `defaultBrand`.
 *
 * @returns {JSX.Element} A container with a preformatted JSON view of the brand kit and a save button.
 */
export default function BrandKit() {
  const { brandKit, updateBrandKit } = useBrandContext();
  return (
    <div className="glass-card">
      <pre>{JSON.stringify(brandKit ?? defaultBrand, null, 2)}</pre>
      <NeonButton onClick={() => updateBrandKit(defaultBrand)}>Save Brand Kit</NeonButton>
    </div>
  );
}
