import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAI } from '../useAI';

vi.mock('../../services/contentEngine', () => ({
  runPipeline: vi.fn()
}));

import { runPipeline } from '../../services/contentEngine';

describe('useAI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns loading=false initially', () => {
    const { result } = renderHook(() => useAI());
    expect(result.current.loading).toBe(false);
  });

  it('returns a generate function', () => {
    const { result } = renderHook(() => useAI());
    expect(typeof result.current.generate).toBe('function');
  });

  it('sets loading=true while generate is in progress', async () => {
    let resolvePromise;
    runPipeline.mockReturnValueOnce(new Promise((res) => { resolvePromise = res; }));
    const { result } = renderHook(() => useAI());
    let pending;
    act(() => {
      pending = result.current.generate({ idea: 'test' });
    });
    expect(result.current.loading).toBe(true);
    await act(async () => {
      resolvePromise({ caption: 'hi' });
      await pending;
    });
    expect(result.current.loading).toBe(false);
  });

  it('sets loading=false after generate resolves', async () => {
    runPipeline.mockResolvedValueOnce({ caption: 'result' });
    const { result } = renderHook(() => useAI());
    await act(async () => {
      await result.current.generate({ idea: 'test' });
    });
    expect(result.current.loading).toBe(false);
  });

  it('sets loading=false after generate rejects', async () => {
    runPipeline.mockRejectedValueOnce(new Error('Pipeline failed'));
    const { result } = renderHook(() => useAI());
    await act(async () => {
      try {
        await result.current.generate({ idea: 'test' });
      } catch {
        // expected error
      }
    });
    expect(result.current.loading).toBe(false);
  });

  it('returns the result from runPipeline', async () => {
    const mockResult = { caption: 'My Caption', strategy: 'Go viral', image: 'img.png' };
    runPipeline.mockResolvedValueOnce(mockResult);
    const { result } = renderHook(() => useAI());
    let generated;
    await act(async () => {
      generated = await result.current.generate({ idea: 'Launch' });
    });
    expect(generated).toEqual(mockResult);
  });

  it('calls runPipeline with the provided params', async () => {
    runPipeline.mockResolvedValueOnce({});
    const { result } = renderHook(() => useAI());
    const params = { idea: 'Product teaser', brandContext: 'SaaS', model: 'gpt-4o' };
    await act(async () => {
      await result.current.generate(params);
    });
    expect(runPipeline).toHaveBeenCalledWith(params);
  });

  it('rethrows errors from runPipeline', async () => {
    const error = new Error('AI error');
    runPipeline.mockRejectedValueOnce(error);
    const { result } = renderHook(() => useAI());
    await act(async () => {
      await expect(result.current.generate({})).rejects.toThrow('AI error');
    });
  });
});