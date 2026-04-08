import { Link } from 'react-router-dom';

const links = ['dashboard', 'content', 'calendar', 'analytics', 'social', 'brand', 'settings'];

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
