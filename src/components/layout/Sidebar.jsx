import { Link } from 'react-router-dom';

const links = ['dashboard', 'content', 'calendar', 'analytics', 'social', 'brand', 'settings'];

/**
 * Renders the application sidebar with the "NexusAI" title and navigation links for the main sections.
 *
 * @returns {JSX.Element} The sidebar element containing the title and a list of navigation links.
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
