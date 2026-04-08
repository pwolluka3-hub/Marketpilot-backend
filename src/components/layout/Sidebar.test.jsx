import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Sidebar', () => {
  it('renders the NexusAI heading', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByRole('heading', { level: 2, name: 'NexusAI' })).toBeInTheDocument();
  });

  it('renders a link for each navigation item', () => {
    renderWithRouter(<Sidebar />);
    const expectedLinks = ['dashboard', 'content', 'calendar', 'analytics', 'social', 'brand', 'settings'];
    expectedLinks.forEach((item) => {
      expect(screen.getByRole('link', { name: item })).toBeInTheDocument();
    });
  });

  it('links point to the correct paths', () => {
    renderWithRouter(<Sidebar />);
    const expectedLinks = ['dashboard', 'content', 'calendar', 'analytics', 'social', 'brand', 'settings'];
    expectedLinks.forEach((item) => {
      expect(screen.getByRole('link', { name: item })).toHaveAttribute('href', `/${item}`);
    });
  });

  it('renders exactly 7 navigation links', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getAllByRole('link')).toHaveLength(7);
  });

  it('applies glass-card CSS class to the aside element', () => {
    const { container } = renderWithRouter(<Sidebar />);
    expect(container.querySelector('aside')).toHaveClass('glass-card');
  });

  it('renders inside an aside element', () => {
    const { container } = renderWithRouter(<Sidebar />);
    expect(container.querySelector('aside')).toBeInTheDocument();
  });
});