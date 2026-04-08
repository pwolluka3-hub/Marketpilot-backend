import EngagementChart from '../components/charts/EngagementChart';

/**
 * Render the analytics page containing an engagement chart.
 *
 * @returns {JSX.Element} A React element that displays an EngagementChart initialized with an empty data array.
 */
export default function Analytics() {
  return <EngagementChart data={[]} />;
}