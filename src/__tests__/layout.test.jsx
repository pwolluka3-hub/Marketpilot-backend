import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';
import Sidebar from '../components/layout/Sidebar';

// ---------------------------------------------------------------------------
// BottomNav
// ---------------------------------------------------------------------------
describe('BottomNav', () => {
  const renderBottomNav = () =>
    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>
    );

  it('renders a nav element', () => {
    renderBottomNav();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('nav has glass-card class', () => {
    renderBottomNav();
    expect(screen.getByRole('navigation')).toHaveClass('glass-card');
  });

  it('renders a link to /dashboard labeled Home', () => {
    renderBottomNav();
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('renders a link to /content labeled Create', () => {
    renderBottomNav();
    const link = screen.getByRole('link', { name: 'Create' });
    expect(link).toHaveAttribute('href', '/content');
  });

  it('renders a link to /calendar labeled Calendar', () => {
    renderBottomNav();
    const link = screen.getByRole('link', { name: 'Calendar' });
    expect(link).toHaveAttribute('href', '/calendar');
  });

  it('renders exactly 3 navigation links', () => {
    renderBottomNav();
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('nav is positioned fixed at the bottom via inline style', () => {
    renderBottomNav();
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveStyle({ position: 'fixed', bottom: '0px' });
  });
});

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------
describe('Sidebar', () => {
  const renderSidebar = () =>
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

  it('renders the NexusAI brand heading', () => {
    renderSidebar();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('NexusAI');
  });

  it('renders an aside element', () => {
    renderSidebar();
    // aside has role complementary
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('aside has glass-card class', () => {
    renderSidebar();
    expect(screen.getByRole('complementary')).toHaveClass('glass-card');
  });

  it('renders exactly 7 navigation links', () => {
    renderSidebar();
    expect(screen.getAllByRole('link')).toHaveLength(7);
  });

  it('renders link to /dashboard', () => {
    renderSidebar();
    expect(screen.getByRole('link', { name: 'dashboard' })).toHaveAttribute('href', '/dashboard');
  });

  it('renders link to /content', () => {
    renderSidebar();
    expect(screen.getByRole('link', { name: 'content' })).toHaveAttribute('href', '/content');
  });

  it('renders link to /calendar', () => {
    renderSidebar();
    expect(screen.getByRole('link', { name: 'calendar' })).toHaveAttribute('href', '/calendar');
  });

  it('renders link to /analytics', () => {
    renderSidebar();
    expect(screen.getByRole('link', { name: 'analytics' })).toHaveAttribute('href', '/analytics');
  });

  it('renders link to /social', () => {
    renderSidebar();
    expect(screen.getByRole('link', { name: 'social' })).toHaveAttribute('href', '/social');
  });

  it('renders link to /brand', () => {
    renderSidebar();
    expect(screen.getByRole('link', { name: 'brand' })).toHaveAttribute('href', '/brand');
  });

  it('renders link to /settings', () => {
    renderSidebar();
    expect(screen.getByRole('link', { name: 'settings' })).toHaveAttribute('href', '/settings');
  });
});