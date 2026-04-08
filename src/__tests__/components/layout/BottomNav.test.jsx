import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomNav from '../../../components/layout/BottomNav';

function renderBottomNav() {
  return render(
    <MemoryRouter>
      <BottomNav />
    </MemoryRouter>
  );
}

describe('BottomNav', () => {
  it('renders a <nav> element', () => {
    const { container } = renderBottomNav();
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('applies glass-card class to nav', () => {
    const { container } = renderBottomNav();
    expect(container.querySelector('nav')).toHaveClass('glass-card');
  });

  it('renders fixed position styles', () => {
    const { container } = renderBottomNav();
    const nav = container.querySelector('nav');
    expect(nav).toHaveStyle({ position: 'fixed', bottom: '0', left: '0', right: '0' });
  });

  it('renders Home link pointing to /dashboard', () => {
    renderBottomNav();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/dashboard');
  });

  it('renders Create link pointing to /content', () => {
    renderBottomNav();
    expect(screen.getByRole('link', { name: 'Create' })).toHaveAttribute('href', '/content');
  });

  it('renders Calendar link pointing to /calendar', () => {
    renderBottomNav();
    expect(screen.getByRole('link', { name: 'Calendar' })).toHaveAttribute('href', '/calendar');
  });

  it('renders exactly 3 navigation links', () => {
    renderBottomNav();
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
});