import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Sidebar from '../Sidebar';

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Sidebar', () => {
  it('renders the NexusAI brand heading', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByRole('heading', { name: 'NexusAI' })).toBeInTheDocument();
  });

  it('renders an aside element', () => {
    const { container } = renderWithRouter(<Sidebar />);
    expect(container.querySelector('aside')).not.toBeNull();
  });

  it('applies glass-card class to aside', () => {
    const { container } = renderWithRouter(<Sidebar />);
    expect(container.querySelector('aside')).toHaveClass('glass-card');
  });

  it('renders all 7 navigation links', () => {
    renderWithRouter(<Sidebar />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(7);
  });

  it('renders a link to /dashboard', () => {
    renderWithRouter(<Sidebar />);
    const link = screen.getByRole('link', { name: 'dashboard' });
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('renders a link to /settings', () => {
    renderWithRouter(<Sidebar />);
    const link = screen.getByRole('link', { name: 'settings' });
    expect(link).toHaveAttribute('href', '/settings');
  });

  it('renders a link to /analytics', () => {
    renderWithRouter(<Sidebar />);
    const link = screen.getByRole('link', { name: 'analytics' });
    expect(link).toHaveAttribute('href', '/analytics');
  });

  it('renders links in the correct order', () => {
    renderWithRouter(<Sidebar />);
    const links = screen.getAllByRole('link');
    const expectedOrder = ['dashboard', 'content', 'calendar', 'analytics', 'social', 'brand', 'settings'];
    links.forEach((link, i) => {
      expect(link.textContent).toBe(expectedOrder[i]);
    });
  });
});