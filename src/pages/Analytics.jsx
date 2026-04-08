import EngagementChart from '../components/charts/EngagementChart';

/**
 * Render the Analytics page containing the engagement chart.
 *
 * @returns {JSX.Element} The Analytics page element (renders EngagementChart with an empty data array).
 */
export default function Analytics() {
  return <EngagementChart data={[]} />;
}
