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

export default function BrandKit() {
  const { brandKit, updateBrandKit } = useBrandContext();
  return (
    <div className="glass-card">
      <pre>{JSON.stringify(brandKit ?? defaultBrand, null, 2)}</pre>
      <NeonButton onClick={() => updateBrandKit(defaultBrand)}>Save Brand Kit</NeonButton>
    </div>
  );
}
