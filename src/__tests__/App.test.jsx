import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Mock external service dependencies used by providers
vi.mock('../services/puterService', () => ({
  puterAuth: vi.fn(),
  kvGet: vi.fn(),
  kvSet: vi.fn(),
  fsRead: vi.fn().mockResolvedValue(null),
  fsWrite: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('../services/memoryService', () => ({
  loadBrandKit: vi.fn().mockResolvedValue(null),
  saveBrandKit: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('../services/contentEngine', () => ({
  runPipeline: vi.fn()
}));

// Mock all lazy-loaded page components so Suspense resolves quickly
vi.mock('../pages/Onboarding', () => ({
  default: () => <div>Onboarding Page</div>
}));
vi.mock('../pages/Dashboard', () => ({
  default: () => <div>Dashboard Page</div>
}));
vi.mock('../pages/ContentStudio', () => ({
  default: () => <div>ContentStudio Page</div>
}));
vi.mock('../pages/Calendar', () => ({
  default: () => <div>Calendar Page</div>
}));
vi.mock('../pages/Analytics', () => ({
  default: () => <div>Analytics Page</div>
}));
vi.mock('../pages/SocialHub', () => ({
  default: () => <div>SocialHub Page</div>
}));
vi.mock('../pages/SkillManager', () => ({
  default: () => <div>SkillManager Page</div>
}));
vi.mock('../pages/BrandKit', () => ({
  default: () => <div>BrandKit Page</div>
}));
vi.mock('../pages/AIChat', () => ({
  default: () => <div>AIChat Page</div>
}));
vi.mock('../pages/Settings', () => ({
  default: () => <div>Settings Page</div>
}));

// App uses BrowserRouter internally via providers but needs an outer router
// since it uses <Routes>/<Navigate>. We wrap in MemoryRouter instead of
// BrowserRouter to control the initial path in tests.
// Note: App itself does NOT render its own Router, that comes from main.jsx.
function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  );
}

describe('App', () => {
  it('renders without crashing', async () => {
    renderApp('/onboarding');
    await waitFor(() => expect(screen.getByText('Onboarding Page')).toBeInTheDocument());
  });

  it('renders the Sidebar', async () => {
    renderApp('/onboarding');
    await waitFor(() => expect(screen.getByRole('heading', { name: 'NexusAI' })).toBeInTheDocument());
  });

  it('renders the BottomNav', async () => {
    renderApp('/onboarding');
    await waitFor(() => expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument());
  });

  it('redirects unknown paths to /onboarding', async () => {
    renderApp('/unknown-route');
    await waitFor(() => expect(screen.getByText('Onboarding Page')).toBeInTheDocument());
  });

  it('renders Dashboard at /dashboard route', async () => {
    renderApp('/dashboard');
    await waitFor(() => expect(screen.getByText('Dashboard Page')).toBeInTheDocument());
  });

  it('renders ContentStudio at /content route', async () => {
    renderApp('/content');
    await waitFor(() => expect(screen.getByText('ContentStudio Page')).toBeInTheDocument());
  });

  it('renders Calendar at /calendar route', async () => {
    renderApp('/calendar');
    await waitFor(() => expect(screen.getByText('Calendar Page')).toBeInTheDocument());
  });

  it('renders Analytics at /analytics route', async () => {
    renderApp('/analytics');
    await waitFor(() => expect(screen.getByText('Analytics Page')).toBeInTheDocument());
  });

  it('renders SocialHub at /social route', async () => {
    renderApp('/social');
    await waitFor(() => expect(screen.getByText('SocialHub Page')).toBeInTheDocument());
  });

  it('renders Settings at /settings route', async () => {
    renderApp('/settings');
    await waitFor(() => expect(screen.getByText('Settings Page')).toBeInTheDocument());
  });

  it('renders BrandKit at /brand route', async () => {
    renderApp('/brand');
    await waitFor(() => expect(screen.getByText('BrandKit Page')).toBeInTheDocument());
  });

  it('wraps content in ErrorBoundary (layout div present)', () => {
    const { container } = renderApp('/onboarding');
    expect(container.querySelector('.layout')).toBeInTheDocument();
  });

  it('renders main element inside layout', () => {
    const { container } = renderApp('/onboarding');
    expect(container.querySelector('main.main')).toBeInTheDocument();
  });
});