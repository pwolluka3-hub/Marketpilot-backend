import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomNav from './BottomNav';

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('BottomNav', () => {
  it('renders a nav element', () => {
    renderWithRouter(<BottomNav />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders a Home link pointing to /dashboard', () => {
    renderWithRouter(<BottomNav />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/dashboard');
  });

  it('renders a Create link pointing to /content', () => {
    renderWithRouter(<BottomNav />);
    const createLink = screen.getByRole('link', { name: 'Create' });
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute('href', '/content');
  });

  it('renders a Calendar link pointing to /calendar', () => {
    renderWithRouter(<BottomNav />);
    const calendarLink = screen.getByRole('link', { name: 'Calendar' });
    expect(calendarLink).toBeInTheDocument();
    expect(calendarLink).toHaveAttribute('href', '/calendar');
  });

  it('applies glass-card CSS class', () => {
    renderWithRouter(<BottomNav />);
    expect(screen.getByRole('navigation')).toHaveClass('glass-card');
  });

  it('is positioned fixed at the bottom', () => {
    renderWithRouter(<BottomNav />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveStyle({ position: 'fixed', bottom: '0' });
  });

  it('renders exactly three links', () => {
    renderWithRouter(<BottomNav />);
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
});