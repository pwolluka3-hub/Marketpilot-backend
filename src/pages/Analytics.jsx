import EngagementChart from '../components/charts/EngagementChart';

/**
 * Render the analytics page containing the engagement chart.
 *
 * Renders an EngagementChart component and supplies it an empty data array.
 * @returns {JSX.Element} The analytics page element.
 */
export default function Analytics() {
  return <EngagementChart data={[]} />;
}