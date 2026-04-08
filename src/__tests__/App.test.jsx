import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

// Mock service dependencies for context providers
vi.mock('../services/puterService', () => ({
  puterAuth: vi.fn(),
  kvGet: vi.fn(),
  kvSet: vi.fn(),
  fsRead: vi.fn().mockResolvedValue(null),
  fsWrite: vi.fn().mockResolvedValue(undefined),
  puterText: vi.fn(),
  puterImage: vi.fn()
}));

vi.mock('../services/memoryService', () => ({
  loadBrandKit: vi.fn().mockResolvedValue(null),
  saveBrandKit: vi.fn().mockResolvedValue(undefined),
  buildContextFromMemory: vi.fn()
}));

// Mock all lazy-loaded page components
vi.mock('../pages/Onboarding', () => ({ default: () => <div>Onboarding Page</div> }));
vi.mock('../pages/Dashboard', () => ({ default: () => <div>Dashboard Page</div> }));
vi.mock('../pages/ContentStudio', () => ({ default: () => <div>ContentStudio Page</div> }));
vi.mock('../pages/Calendar', () => ({ default: () => <div>Calendar Page</div> }));
vi.mock('../pages/Analytics', () => ({ default: () => <div>Analytics Page</div> }));
vi.mock('../pages/SocialHub', () => ({ default: () => <div>SocialHub Page</div> }));
vi.mock('../pages/SkillManager', () => ({ default: () => <div>SkillManager Page</div> }));
vi.mock('../pages/BrandKit', () => ({ default: () => <div>BrandKit Page</div> }));
vi.mock('../pages/AIChat', () => ({ default: () => <div>AIChat Page</div> }));
vi.mock('../pages/Settings', () => ({ default: () => <div>Settings Page</div> }));

import App from '../App';

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  );
}

describe('App', () => {
  it('renders the layout container', async () => {
    const { container } = renderApp('/dashboard');
    await waitFor(() => expect(container.querySelector('.layout')).not.toBeNull());
  });

  it('renders Sidebar', async () => {
    renderApp('/dashboard');
    await waitFor(() => expect(screen.getByRole('heading', { name: 'NexusAI' })).toBeInTheDocument());
  });

  it('renders BottomNav with Home link', async () => {
    renderApp('/dashboard');
    await waitFor(() => expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument());
  });

  it('renders main element', async () => {
    const { container } = renderApp('/dashboard');
    await waitFor(() => expect(container.querySelector('main.main')).not.toBeNull());
  });

  it('redirects unknown routes to /onboarding', async () => {
    renderApp('/unknown-path');
    await waitFor(() => expect(screen.getByText('Onboarding Page')).toBeInTheDocument());
  });

  it('renders Dashboard page at /dashboard', async () => {
    renderApp('/dashboard');
    await waitFor(() => expect(screen.getByText('Dashboard Page')).toBeInTheDocument());
  });

  it('renders ContentStudio page at /content', async () => {
    renderApp('/content');
    await waitFor(() => expect(screen.getByText('ContentStudio Page')).toBeInTheDocument());
  });

  it('renders Calendar page at /calendar', async () => {
    renderApp('/calendar');
    await waitFor(() => expect(screen.getByText('Calendar Page')).toBeInTheDocument());
  });

  it('renders Analytics page at /analytics', async () => {
    renderApp('/analytics');
    await waitFor(() => expect(screen.getByText('Analytics Page')).toBeInTheDocument());
  });

  it('renders Settings page at /settings', async () => {
    renderApp('/settings');
    await waitFor(() => expect(screen.getByText('Settings Page')).toBeInTheDocument());
  });

  it('renders Onboarding page at /onboarding', async () => {
    renderApp('/onboarding');
    await waitFor(() => expect(screen.getByText('Onboarding Page')).toBeInTheDocument());
  });

  it('wraps content in ErrorBoundary (fallback not visible under normal conditions)', async () => {
    renderApp('/dashboard');
    await waitFor(() => expect(screen.queryByText('Something went wrong. Please retry.')).not.toBeInTheDocument());
  });
});