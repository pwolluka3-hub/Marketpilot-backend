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
 * Render the Brand Kit page showing the current brand configuration and a control to persist the default brand.
 *
 * Displays a glass-card containing a pretty-printed JSON representation of the active `brandKit` (falls back to `defaultBrand` when none is present) and a button that replaces the context brand kit with `defaultBrand` when clicked.
 * @returns {JSX.Element} The BrandKit page UI.
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