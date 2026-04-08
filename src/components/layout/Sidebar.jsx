import { Link } from 'react-router-dom';

const links = ['dashboard', 'content', 'calendar', 'analytics', 'social', 'brand', 'settings'];

/**
 * Render the application's sidebar with a NexusAI heading and navigation links.
 * @returns {JSX.Element} An <aside> element containing the "NexusAI" heading and a list of links for "dashboard", "content", "calendar", "analytics", "social", "brand", and "settings".
 */
export default function Sidebar() {
  return (
    <aside className="glass-card">
      <h2>NexusAI</h2>
      {links.map((item) => (
        <div key={item}><Link to={`/${item}`}>{item}</Link></div>
      ))}
    </aside>
  );
}