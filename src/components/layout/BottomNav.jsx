import { Link } from 'react-router-dom';

export default function BottomNav() {
  return (
    <nav className="glass-card" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <Link to="/dashboard">Home</Link> | <Link to="/content">Create</Link> | <Link to="/calendar">Calendar</Link>
    </nav>
  );
}
