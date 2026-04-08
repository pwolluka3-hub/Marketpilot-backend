import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrandProvider, useBrandContext } from './BrandContext';

vi.mock('../services/memoryService', () => ({
  loadBrandKit: vi.fn(),
  saveBrandKit: vi.fn()
}));

import { loadBrandKit, saveBrandKit } from '../services/memoryService';

function TestConsumer() {
  const { brandKit, updateBrandKit } = useBrandContext();
  return (
    <div>
      <span data-testid="brand">{brandKit ? JSON.stringify(brandKit) : 'null'}</span>
      <button onClick={() => updateBrandKit({ name: 'Updated' })}>Update</button>
    </div>
  );
}

describe('BrandContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes brandKit with null before load resolves', async () => {
    // Never resolving promise to freeze state at null
    loadBrandKit.mockReturnValue(new Promise(() => {}));

    render(
      <BrandProvider>
        <TestConsumer />
      </BrandProvider>
    );

    expect(screen.getByTestId('brand').textContent).toBe('null');
  });

  it('populates brandKit after loadBrandKit resolves', async () => {
    const kit = { brandName: 'Acme', niche: 'SaaS' };
    loadBrandKit.mockResolvedValue(kit);

    render(
      <BrandProvider>
        <TestConsumer />
      </BrandProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId('brand').textContent).toBe(JSON.stringify(kit))
    );
  });

  it('sets brandKit to null when loadBrandKit resolves with null', async () => {
    loadBrandKit.mockResolvedValue(null);

    render(
      <BrandProvider>
        <TestConsumer />
      </BrandProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId('brand').textContent).toBe('null')
    );
  });

  it('updateBrandKit updates state and calls saveBrandKit', async () => {
    const user = userEvent.setup();
    loadBrandKit.mockResolvedValue(null);
    saveBrandKit.mockResolvedValue(undefined);

    render(
      <BrandProvider>
        <TestConsumer />
      </BrandProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Update' }));

    expect(screen.getByTestId('brand').textContent).toBe(JSON.stringify({ name: 'Updated' }));
    expect(saveBrandKit).toHaveBeenCalledWith({ name: 'Updated' });
  });

  it('calls loadBrandKit on mount exactly once', async () => {
    loadBrandKit.mockResolvedValue(null);

    render(
      <BrandProvider>
        <TestConsumer />
      </BrandProvider>
    );

    await waitFor(() => expect(loadBrandKit).toHaveBeenCalledTimes(1));
  });

  it('renders children inside the provider', () => {
    loadBrandKit.mockResolvedValue(null);

    render(
      <BrandProvider>
        <span>child</span>
      </BrandProvider>
    );

    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('useBrandContext returns null when used outside a provider', () => {
    function BareConsumer() {
      const ctx = useBrandContext();
      return <span>{ctx === null ? 'no-context' : 'has-context'}</span>;
    }
    render(<BareConsumer />);
    expect(screen.getByText('no-context')).toBeInTheDocument();
  });
});