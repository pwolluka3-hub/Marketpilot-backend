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
 * Render a card that displays the current brand kit as pretty-printed JSON and provides a button to save the fallback default brand kit.
 * @returns {JSX.Element} A container with a <pre> showing the active brand kit (uses the built-in default when none is set) and a button that sets the default brand kit when clicked.
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