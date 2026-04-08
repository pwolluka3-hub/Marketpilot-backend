import { Link } from 'react-router-dom';

/**
 * Renders a fixed-position bottom navigation bar with links to the main app sections.
 *
 * @returns {JSX.Element} A navigation element fixed to the bottom of the viewport containing links labeled "Home" ("/dashboard"), "Create" ("/content"), and "Calendar" ("/calendar").
 */
export default function BottomNav() {
  return (
    <nav className="glass-card" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <Link to="/dashboard">Home</Link> | <Link to="/content">Create</Link> | <Link to="/calendar">Calendar</Link>
    </nav>
  );
}