import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrandProvider, useBrandContext } from '../../context/BrandContext';

// Mock memoryService
vi.mock('../../services/memoryService', () => ({
  loadBrandKit: vi.fn(),
  saveBrandKit: vi.fn()
}));

import { loadBrandKit, saveBrandKit } from '../../services/memoryService';

const sampleKit = { brandName: 'Test Brand', niche: 'SaaS' };

function BrandConsumer() {
  const { brandKit, updateBrandKit } = useBrandContext();
  return (
    <div>
      <span data-testid="brand">{brandKit ? JSON.stringify(brandKit) : 'null'}</span>
      <button onClick={() => updateBrandKit(sampleKit)}>Update</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <BrandProvider>
      <BrandConsumer />
    </BrandProvider>
  );
}

describe('BrandContext / BrandProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts with null brand kit while loading', async () => {
    loadBrandKit.mockResolvedValue(null);
    renderWithProvider();
    // Before the promise resolves the brand should be null
    expect(screen.getByTestId('brand').textContent).toBe('null');
  });

  it('loads brand kit from memoryService on mount', async () => {
    loadBrandKit.mockResolvedValue(sampleKit);
    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('brand').textContent).toBe(JSON.stringify(sampleKit));
    });
    expect(loadBrandKit).toHaveBeenCalledTimes(1);
  });

  it('updates brand kit in state when updateBrandKit is called', async () => {
    loadBrandKit.mockResolvedValue(null);
    saveBrandKit.mockResolvedValue(undefined);

    renderWithProvider();
    await userEvent.click(screen.getByRole('button', { name: 'Update' }));

    expect(screen.getByTestId('brand').textContent).toBe(JSON.stringify(sampleKit));
  });

  it('calls saveBrandKit with the new kit when updateBrandKit is invoked', async () => {
    loadBrandKit.mockResolvedValue(null);
    saveBrandKit.mockResolvedValue(undefined);

    renderWithProvider();
    await userEvent.click(screen.getByRole('button', { name: 'Update' }));

    expect(saveBrandKit).toHaveBeenCalledWith(sampleKit);
  });

  it('returns null when useBrandContext is used outside provider', () => {
    function NoProvider() {
      const ctx = useBrandContext();
      return <div data-testid="ctx">{ctx === null ? 'null' : 'value'}</div>;
    }
    render(<NoProvider />);
    expect(screen.getByTestId('ctx').textContent).toBe('null');
  });

  it('sets brand kit to null when loadBrandKit resolves null', async () => {
    loadBrandKit.mockResolvedValue(null);
    renderWithProvider();

    await waitFor(() => {
      // loadBrandKit resolves, state is set to null
      expect(loadBrandKit).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByTestId('brand').textContent).toBe('null');
  });
});