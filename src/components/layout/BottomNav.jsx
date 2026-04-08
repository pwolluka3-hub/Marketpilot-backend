import { Link } from 'react-router-dom';

/**
 * Renders a fixed bottom navigation bar with links to the dashboard, content creation, and calendar.
 * @returns {JSX.Element} A nav element fixed to the bottom of the viewport containing links labeled "Home", "Create", and "Calendar".
 */
export default function BottomNav() {
  return (
    <nav className="glass-card" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <Link to="/dashboard">Home</Link> | <Link to="/content">Create</Link> | <Link to="/calendar">Calendar</Link>
    </nav>
  );
}
