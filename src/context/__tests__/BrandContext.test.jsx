import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrandProvider, useBrandContext } from '../BrandContext';

vi.mock('../../services/memoryService', () => ({
  loadBrandKit: vi.fn(),
  saveBrandKit: vi.fn()
}));

import { loadBrandKit, saveBrandKit } from '../../services/memoryService';

function TestConsumer() {
  const { brandKit, updateBrandKit } = useBrandContext();
  return (
    <div>
      <span data-testid="brand">{brandKit ? brandKit.name : 'null'}</span>
      <button onClick={() => updateBrandKit({ name: 'TestBrand' })}>Update</button>
    </div>
  );
}

describe('BrandContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts with null brandKit before load resolves', () => {
    loadBrandKit.mockResolvedValueOnce(null);
    render(
      <BrandProvider>
        <TestConsumer />
      </BrandProvider>
    );
    expect(screen.getByTestId('brand').textContent).toBe('null');
  });

  it('loads brandKit from memoryService on mount', async () => {
    loadBrandKit.mockResolvedValueOnce({ name: 'Loaded Brand' });
    render(
      <BrandProvider>
        <TestConsumer />
      </BrandProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId('brand').textContent).toBe('Loaded Brand');
    });
  });

  it('calls loadBrandKit once on mount', async () => {
    loadBrandKit.mockResolvedValueOnce(null);
    render(
      <BrandProvider>
        <TestConsumer />
      </BrandProvider>
    );
    await waitFor(() => expect(loadBrandKit).toHaveBeenCalledTimes(1));
  });

  it('updates brandKit state and calls saveBrandKit when updateBrandKit is called', async () => {
    loadBrandKit.mockResolvedValueOnce(null);
    saveBrandKit.mockResolvedValueOnce(undefined);
    render(
      <BrandProvider>
        <TestConsumer />
      </BrandProvider>
    );
    await act(async () => {
      screen.getByRole('button', { name: 'Update' }).click();
    });
    expect(screen.getByTestId('brand').textContent).toBe('TestBrand');
    expect(saveBrandKit).toHaveBeenCalledWith({ name: 'TestBrand' });
  });

  it('renders children correctly', () => {
    loadBrandKit.mockResolvedValueOnce(null);
    render(
      <BrandProvider>
        <span>brand-child</span>
      </BrandProvider>
    );
    expect(screen.getByText('brand-child')).toBeInTheDocument();
  });

  it('provides null brandKit when loadBrandKit resolves null', async () => {
    loadBrandKit.mockResolvedValueOnce(null);
    render(
      <BrandProvider>
        <TestConsumer />
      </BrandProvider>
    );
    await waitFor(() => expect(loadBrandKit).toHaveBeenCalled());
    expect(screen.getByTestId('brand').textContent).toBe('null');
  });
});