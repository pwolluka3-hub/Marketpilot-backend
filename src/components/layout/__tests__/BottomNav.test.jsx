import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import BottomNav from '../BottomNav';

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('BottomNav', () => {
  it('renders a nav element', () => {
    const { container } = renderWithRouter(<BottomNav />);
    expect(container.querySelector('nav')).not.toBeNull();
  });

  it('applies glass-card class to nav', () => {
    const { container } = renderWithRouter(<BottomNav />);
    expect(container.querySelector('nav')).toHaveClass('glass-card');
  });

  it('is fixed positioned at the bottom', () => {
    const { container } = renderWithRouter(<BottomNav />);
    const nav = container.querySelector('nav');
    expect(nav.style.position).toBe('fixed');
    expect(nav.style.bottom).toBe('0');
    expect(nav.style.left).toBe('0');
    expect(nav.style.right).toBe('0');
  });

  it('renders Home link pointing to /dashboard', () => {
    renderWithRouter(<BottomNav />);
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('renders Create link pointing to /content', () => {
    renderWithRouter(<BottomNav />);
    const link = screen.getByRole('link', { name: 'Create' });
    expect(link).toHaveAttribute('href', '/content');
  });

  it('renders Calendar link pointing to /calendar', () => {
    renderWithRouter(<BottomNav />);
    const link = screen.getByRole('link', { name: 'Calendar' });
    expect(link).toHaveAttribute('href', '/calendar');
  });

  it('renders exactly 3 links', () => {
    renderWithRouter(<BottomNav />);
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
});