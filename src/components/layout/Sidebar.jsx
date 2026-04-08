import { Link } from 'react-router-dom';

const links = ['dashboard', 'content', 'calendar', 'analytics', 'social', 'brand', 'settings'];

/**
 * Sidebar component that renders the app title and primary navigation links.
 * @returns {JSX.Element} An `<aside>` element containing the "NexusAI" heading and a list of navigation links for each entry in the module's `links` array.
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