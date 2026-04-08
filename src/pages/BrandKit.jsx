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
 * Display the current brand kit as readable JSON and provide a control to save the fallback default brand kit.
 * @returns {JSX.Element} A container showing the active or fallback brand kit and a button that sets the fallback as the stored brand kit.
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