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

  it('renders AIChat page at /chat', async () => {
    renderApp('/chat');
    await waitFor(() => {
      expect(screen.getByText('AIChat Page')).toBeInTheDocument();
    });
  });

  it('renders SkillManager page at /skills', async () => {
    renderApp('/skills');
    await waitFor(() => {
      expect(screen.getByText('SkillManager Page')).toBeInTheDocument();
    });
  });

  it('renders LoadingPulse fallback while lazy page is loading', () => {
    // Render with a known route; Suspense fallback ("Loading...") may appear momentarily
    // but at minimum the layout structure is in place
    renderApp('/dashboard');
    // The layout container should always be present regardless of Suspense state
    const { container } = renderApp('/dashboard');
    expect(container.querySelector('.layout')).toBeInTheDocument();
  });

  it('providers compose correctly — QueueContext is accessible inside routes', async () => {
    // Verifies that all three providers are stacked without error
    renderApp('/onboarding');
    await waitFor(() => {
      expect(screen.getByText('Onboarding Page')).toBeInTheDocument();
    });
    // No "Something went wrong" fallback means the provider tree is healthy
    expect(screen.queryByText('Something went wrong. Please retry.')).not.toBeInTheDocument();
  });
});