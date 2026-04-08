import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock service dependencies used by context providers
vi.mock('./services/puterService', () => ({
  puterAuth: vi.fn(),
  kvGet: vi.fn(),
  kvSet: vi.fn(),
  fsRead: vi.fn().mockResolvedValue(null),
  fsWrite: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('./services/memoryService', () => ({
  loadBrandKit: vi.fn().mockResolvedValue(null),
  saveBrandKit: vi.fn().mockResolvedValue(undefined)
}));

// Stub page components to avoid lazy loading complexity in tests
vi.mock('./pages/Onboarding', () => ({ default: () => <div>Onboarding Page</div> }));
vi.mock('./pages/Dashboard', () => ({ default: () => <div>Dashboard Page</div> }));
vi.mock('./pages/ContentStudio', () => ({ default: () => <div>ContentStudio Page</div> }));
vi.mock('./pages/Calendar', () => ({ default: () => <div>Calendar Page</div> }));
vi.mock('./pages/Analytics', () => ({ default: () => <div>Analytics Page</div> }));
vi.mock('./pages/SocialHub', () => ({ default: () => <div>SocialHub Page</div> }));
vi.mock('./pages/SkillManager', () => ({ default: () => <div>SkillManager Page</div> }));
vi.mock('./pages/BrandKit', () => ({ default: () => <div>BrandKit Page</div> }));
vi.mock('./pages/AIChat', () => ({ default: () => <div>AIChat Page</div> }));
vi.mock('./pages/Settings', () => ({ default: () => <div>Settings Page</div> }));

function renderApp(initialPath = '/onboarding') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  );
}

describe('App', () => {
  it('renders without crashing', async () => {
    renderApp();
    // Sidebar heading confirms the tree mounted
    expect(await screen.findByRole('heading', { name: 'NexusAI' })).toBeInTheDocument();
  });

  it('renders the Sidebar', async () => {
    renderApp();
    expect(await screen.findByRole('heading', { name: 'NexusAI' })).toBeInTheDocument();
  });

  it('renders the BottomNav', async () => {
    renderApp();
    expect(await screen.findByRole('navigation')).toBeInTheDocument();
  });

  it('renders the Onboarding page at /onboarding', async () => {
    renderApp('/onboarding');
    expect(await screen.findByText('Onboarding Page')).toBeInTheDocument();
  });

  it('renders the Dashboard page at /dashboard', async () => {
    renderApp('/dashboard');
    expect(await screen.findByText('Dashboard Page')).toBeInTheDocument();
  });

  it('renders the ContentStudio page at /content', async () => {
    renderApp('/content');
    expect(await screen.findByText('ContentStudio Page')).toBeInTheDocument();
  });

  it('renders the Calendar page at /calendar', async () => {
    renderApp('/calendar');
    expect(await screen.findByText('Calendar Page')).toBeInTheDocument();
  });

  it('renders the Analytics page at /analytics', async () => {
    renderApp('/analytics');
    expect(await screen.findByText('Analytics Page')).toBeInTheDocument();
  });

  it('renders the SocialHub page at /social', async () => {
    renderApp('/social');
    expect(await screen.findByText('SocialHub Page')).toBeInTheDocument();
  });

  it('renders the BrandKit page at /brand', async () => {
    renderApp('/brand');
    expect(await screen.findByText('BrandKit Page')).toBeInTheDocument();
  });

  it('renders the Settings page at /settings', async () => {
    renderApp('/settings');
    expect(await screen.findByText('Settings Page')).toBeInTheDocument();
  });

  it('redirects unknown paths to /onboarding', async () => {
    renderApp('/unknown-route');
    expect(await screen.findByText('Onboarding Page')).toBeInTheDocument();
  });

  it('wraps content in an ErrorBoundary (layout div is rendered)', async () => {
    const { container } = renderApp();
    await screen.findByRole('heading', { name: 'NexusAI' });
    expect(container.querySelector('.layout')).toBeInTheDocument();
  });

  it('renders main element with class "main"', async () => {
    const { container } = renderApp();
    await screen.findByRole('heading', { name: 'NexusAI' });
    expect(container.querySelector('main.main')).toBeInTheDocument();
  });
});