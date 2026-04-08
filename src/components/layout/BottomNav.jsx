import { Link } from 'react-router-dom';

/**
 * Renders a bottom-fixed navigation bar with links to Home, Create, and Calendar.
 *
 * The bar is styled with the `glass-card` class and fixed to the bottom of the viewport.
 * @returns {JSX.Element} A navigation element containing links to `/dashboard`, `/content`, and `/calendar`.
 */
export default function BottomNav() {
  return (
    <nav className="glass-card" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <Link to="/dashboard">Home</Link> | <Link to="/content">Create</Link> | <Link to="/calendar">Calendar</Link>
    </nav>
  );
}