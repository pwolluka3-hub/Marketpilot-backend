import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react';

// ---------------------------------------------------------------------------
// Mocks for external service dependencies
// ---------------------------------------------------------------------------
vi.mock('../services/puterService', () => ({
  puterAuth: vi.fn(),
}));

vi.mock('../services/memoryService', () => ({
  loadBrandKit: vi.fn(),
  saveBrandKit: vi.fn(),
}));

import { puterAuth } from '../services/puterService';
import { loadBrandKit, saveBrandKit } from '../services/memoryService';

import { AuthProvider, useAuthContext } from '../context/AuthContext';
import { BrandProvider, useBrandContext } from '../context/BrandContext';
import { QueueProvider, useQueueContext } from '../context/QueueContext';

// ---------------------------------------------------------------------------
// AuthContext
// ---------------------------------------------------------------------------
describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides user as null initially', () => {
    const { result } = renderHook(() => useAuthContext(), {
      wrapper: AuthProvider,
    });
    expect(result.current.user).toBeNull();
  });

  it('provides a signIn function', () => {
    const { result } = renderHook(() => useAuthContext(), {
      wrapper: AuthProvider,
    });
    expect(typeof result.current.signIn).toBe('function');
  });

  it('sets user after successful signIn', async () => {
    const fakeProfile = { id: 'u1', username: 'alice' };
    puterAuth.mockResolvedValueOnce(fakeProfile);

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.signIn();
    });

    expect(result.current.user).toEqual(fakeProfile);
  });

  it('calls puterAuth exactly once when signIn is invoked', async () => {
    puterAuth.mockResolvedValueOnce({ id: 'u2' });

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.signIn();
    });

    expect(puterAuth).toHaveBeenCalledTimes(1);
  });

  it('propagates errors thrown by puterAuth', async () => {
    puterAuth.mockRejectedValueOnce(new Error('Auth failed: network'));

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: AuthProvider,
    });

    await expect(
      act(async () => {
        await result.current.signIn();
      })
    ).rejects.toThrow('Auth failed: network');
  });

  it('useAuthContext returns null when called outside AuthProvider', () => {
    const { result } = renderHook(() => useAuthContext());
    expect(result.current).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// BrandContext
// ---------------------------------------------------------------------------
describe('BrandContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads brandKit on mount via loadBrandKit', async () => {
    const kit = { brandName: 'TestBrand' };
    loadBrandKit.mockResolvedValueOnce(kit);

    const { result } = renderHook(() => useBrandContext(), {
      wrapper: BrandProvider,
    });

    await waitFor(() => {
      expect(result.current.brandKit).toEqual(kit);
    });
  });

  it('brandKit is null before loadBrandKit resolves', () => {
    // Never resolves during this synchronous check
    loadBrandKit.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useBrandContext(), {
      wrapper: BrandProvider,
    });

    expect(result.current.brandKit).toBeNull();
  });

  it('brandKit is null when loadBrandKit resolves with null', async () => {
    loadBrandKit.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useBrandContext(), {
      wrapper: BrandProvider,
    });

    await waitFor(() => {
      // After resolution it should still be null (loaded null)
      expect(loadBrandKit).toHaveBeenCalled();
    });
    expect(result.current.brandKit).toBeNull();
  });

  it('provides an updateBrandKit function', async () => {
    loadBrandKit.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useBrandContext(), {
      wrapper: BrandProvider,
    });

    expect(typeof result.current.updateBrandKit).toBe('function');
  });

  it('updateBrandKit sets brandKit state', async () => {
    loadBrandKit.mockResolvedValueOnce(null);
    saveBrandKit.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useBrandContext(), {
      wrapper: BrandProvider,
    });

    const newKit = { brandName: 'Updated' };
    await act(async () => {
      await result.current.updateBrandKit(newKit);
    });

    expect(result.current.brandKit).toEqual(newKit);
  });

  it('updateBrandKit calls saveBrandKit with new value', async () => {
    loadBrandKit.mockResolvedValueOnce(null);
    saveBrandKit.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useBrandContext(), {
      wrapper: BrandProvider,
    });

    const newKit = { brandName: 'Saved' };
    await act(async () => {
      await result.current.updateBrandKit(newKit);
    });

    expect(saveBrandKit).toHaveBeenCalledWith(newKit);
  });

  it('useBrandContext returns null outside BrandProvider', () => {
    const { result } = renderHook(() => useBrandContext());
    expect(result.current).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// QueueContext
// ---------------------------------------------------------------------------
describe('QueueContext', () => {
  it('initialises with an empty queue', () => {
    const { result } = renderHook(() => useQueueContext(), {
      wrapper: QueueProvider,
    });
    expect(result.current.queue).toEqual([]);
  });

  it('provides enqueue and setQueue functions', () => {
    const { result } = renderHook(() => useQueueContext(), {
      wrapper: QueueProvider,
    });
    expect(typeof result.current.enqueue).toBe('function');
    expect(typeof result.current.setQueue).toBe('function');
  });

  it('enqueue appends an item to the queue', () => {
    const { result } = renderHook(() => useQueueContext(), {
      wrapper: QueueProvider,
    });

    act(() => {
      result.current.enqueue({ id: 1, text: 'post one' });
    });

    expect(result.current.queue).toHaveLength(1);
    expect(result.current.queue[0]).toEqual({ id: 1, text: 'post one' });
  });

  it('enqueue appends multiple items in order', () => {
    const { result } = renderHook(() => useQueueContext(), {
      wrapper: QueueProvider,
    });

    act(() => {
      result.current.enqueue('a');
      result.current.enqueue('b');
      result.current.enqueue('c');
    });

    expect(result.current.queue).toEqual(['a', 'b', 'c']);
  });

  it('setQueue replaces the entire queue', () => {
    const { result } = renderHook(() => useQueueContext(), {
      wrapper: QueueProvider,
    });

    act(() => {
      result.current.enqueue('initial');
      result.current.setQueue([{ id: 99 }]);
    });

    expect(result.current.queue).toEqual([{ id: 99 }]);
  });

  it('setQueue with empty array clears the queue', () => {
    const { result } = renderHook(() => useQueueContext(), {
      wrapper: QueueProvider,
    });

    act(() => {
      result.current.enqueue('item');
      result.current.setQueue([]);
    });

    expect(result.current.queue).toHaveLength(0);
  });

  it('useQueueContext returns null outside QueueProvider', () => {
    const { result } = renderHook(() => useQueueContext());
    expect(result.current).toBeNull();
  });

  it('enqueue does not mutate previous queue reference', () => {
    const { result } = renderHook(() => useQueueContext(), {
      wrapper: QueueProvider,
    });

    let capturedQueue;
    act(() => {
      capturedQueue = result.current.queue;
      result.current.enqueue('new item');
    });

    // Original captured reference should not be mutated
    expect(capturedQueue).toEqual([]);
    expect(result.current.queue).toEqual(['new item']);
  });

  it('enqueue handles complex objects as items', () => {
    const { result } = renderHook(() => useQueueContext(), {
      wrapper: QueueProvider,
    });

    const complexItem = { id: 'abc', caption: 'Hello', platforms: ['twitter', 'instagram'], approved: true };
    act(() => {
      result.current.enqueue(complexItem);
    });

    expect(result.current.queue[0]).toEqual(complexItem);
  });

  it('enqueue preserves order of many items', () => {
    const { result } = renderHook(() => useQueueContext(), {
      wrapper: QueueProvider,
    });

    const items = Array.from({ length: 10 }, (_, i) => ({ id: i }));
    act(() => {
      items.forEach((item) => result.current.enqueue(item));
    });

    expect(result.current.queue).toHaveLength(10);
    expect(result.current.queue.map((q) => q.id)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});

// ---------------------------------------------------------------------------
// AuthContext — additional edge cases
// ---------------------------------------------------------------------------
describe('AuthContext — additional', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('signIn can be called multiple times updating user each time', async () => {
    const { puterAuth } = await import('../services/puterService');
    puterAuth
      .mockResolvedValueOnce({ id: 'first' })
      .mockResolvedValueOnce({ id: 'second' });

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: AuthProvider,
    });

    await act(async () => { await result.current.signIn(); });
    expect(result.current.user).toEqual({ id: 'first' });

    await act(async () => { await result.current.signIn(); });
    expect(result.current.user).toEqual({ id: 'second' });
  });
});

// ---------------------------------------------------------------------------
// BrandContext — additional edge cases
// ---------------------------------------------------------------------------
describe('BrandContext — additional', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('updateBrandKit can be called multiple times and always reflects the latest value', async () => {
    loadBrandKit.mockResolvedValueOnce(null);
    saveBrandKit.mockResolvedValue(undefined);

    const { result } = renderHook(() => useBrandContext(), {
      wrapper: BrandProvider,
    });

    const kit1 = { brandName: 'First' };
    const kit2 = { brandName: 'Second' };

    await act(async () => { await result.current.updateBrandKit(kit1); });
    expect(result.current.brandKit).toEqual(kit1);

    await act(async () => { await result.current.updateBrandKit(kit2); });
    expect(result.current.brandKit).toEqual(kit2);
    expect(saveBrandKit).toHaveBeenCalledTimes(2);
  });

  it('loadBrandKit is called exactly once on mount', async () => {
    loadBrandKit.mockResolvedValueOnce({ brandName: 'OnceOnly' });

    renderHook(() => useBrandContext(), { wrapper: BrandProvider });

    await waitFor(() => {
      expect(loadBrandKit).toHaveBeenCalledTimes(1);
    });
  });
});