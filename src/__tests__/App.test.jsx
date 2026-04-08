import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// ---------------------------------------------------------------------------
// Mock service dependencies used by contexts
// ---------------------------------------------------------------------------
vi.mock('../services/puterService', () => ({
  puterAuth: vi.fn(),
  kvGet: vi.fn(),
  kvSet: vi.fn(),
}));

vi.mock('../services/memoryService', () => ({
  loadBrandKit: vi.fn().mockResolvedValue(null),
  saveBrandKit: vi.fn().mockResolvedValue(undefined),
}));

// Mock lazy-loaded pages so we don't need full page implementations
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

// App internally renders BrowserRouter content; we wrap with MemoryRouter
// to control the initial route
const renderApp = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  );

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    renderApp('/onboarding');
    // Sidebar brand name is always visible
    expect(screen.getByRole('heading', { name: 'NexusAI' })).toBeInTheDocument();
  });

  it('renders the Sidebar with NexusAI heading', async () => {
    renderApp('/onboarding');
    expect(screen.getByRole('heading', { level: 2, name: 'NexusAI' })).toBeInTheDocument();
  });

  it('renders the BottomNav', async () => {
    renderApp('/onboarding');
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('redirects unknown routes to /onboarding', async () => {
    renderApp('/unknown-route');
    await waitFor(() => {
      expect(screen.getByText('Onboarding Page')).toBeInTheDocument();
    });
  });

  it('renders Onboarding page at /onboarding', async () => {
    renderApp('/onboarding');
    await waitFor(() => {
      expect(screen.getByText('Onboarding Page')).toBeInTheDocument();
    });
  });

  it('renders Dashboard page at /dashboard', async () => {
    renderApp('/dashboard');
    await waitFor(() => {
      expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
    });
  });

  it('renders ContentStudio page at /content', async () => {
    renderApp('/content');
    await waitFor(() => {
      expect(screen.getByText('ContentStudio Page')).toBeInTheDocument();
    });
  });

  it('renders Calendar page at /calendar', async () => {
    renderApp('/calendar');
    await waitFor(() => {
      expect(screen.getByText('Calendar Page')).toBeInTheDocument();
    });
  });

  it('renders Analytics page at /analytics', async () => {
    renderApp('/analytics');
    await waitFor(() => {
      expect(screen.getByText('Analytics Page')).toBeInTheDocument();
    });
  });

  it('renders SocialHub page at /social', async () => {
    renderApp('/social');
    await waitFor(() => {
      expect(screen.getByText('SocialHub Page')).toBeInTheDocument();
    });
  });

  it('renders BrandKit page at /brand', async () => {
    renderApp('/brand');
    await waitFor(() => {
      expect(screen.getByText('BrandKit Page')).toBeInTheDocument();
    });
  });

  it('renders Settings page at /settings', async () => {
    renderApp('/settings');
    await waitFor(() => {
      expect(screen.getByText('Settings Page')).toBeInTheDocument();
    });
  });

  it('wraps content in an ErrorBoundary (no crash in normal operation)', async () => {
    renderApp('/onboarding');
    await waitFor(() => {
      expect(screen.queryByText('Something went wrong. Please retry.')).not.toBeInTheDocument();
    });
  });

  it('layout div is present', async () => {
    const { container } = renderApp('/onboarding');
    expect(container.querySelector('.layout')).toBeInTheDocument();
  });

  it('main element has the main class', async () => {
    renderApp('/onboarding');
    const main = screen.getByRole('main');
    expect(main).toHaveClass('main');
  });
});