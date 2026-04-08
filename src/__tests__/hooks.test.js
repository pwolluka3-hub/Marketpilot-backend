import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

// ---------------------------------------------------------------------------
// Mock contentEngine
// ---------------------------------------------------------------------------
vi.mock('../services/contentEngine', () => ({
  runPipeline: vi.fn(),
}));

import { runPipeline } from '../services/contentEngine';
import { useAI } from '../hooks/useAI';

// ---------------------------------------------------------------------------
// useAI
// ---------------------------------------------------------------------------
describe('useAI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initialises with loading = false', () => {
    const { result } = renderHook(() => useAI());
    expect(result.current.loading).toBe(false);
  });

  it('provides a generate function', () => {
    const { result } = renderHook(() => useAI());
    expect(typeof result.current.generate).toBe('function');
  });

  it('sets loading to true while generating and back to false after', async () => {
    let resolvePromise;
    const deferred = new Promise((res) => { resolvePromise = res; });
    runPipeline.mockReturnValueOnce(deferred);

    const { result } = renderHook(() => useAI());

    // Start generate without awaiting
    let generatePromise;
    act(() => {
      generatePromise = result.current.generate({ idea: 'Test' });
    });

    // loading should now be true
    expect(result.current.loading).toBe(true);

    // Resolve the deferred pipeline call
    await act(async () => {
      resolvePromise({ caption: 'done' });
      await generatePromise;
    });

    expect(result.current.loading).toBe(false);
  });

  it('returns the result from runPipeline', async () => {
    const pipelineResult = { caption: 'Hello World', approved: true };
    runPipeline.mockResolvedValueOnce(pipelineResult);

    const { result } = renderHook(() => useAI());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.generate({ idea: 'launch post' });
    });

    expect(returnValue).toEqual(pipelineResult);
  });

  it('calls runPipeline with the params passed to generate', async () => {
    runPipeline.mockResolvedValueOnce({});

    const { result } = renderHook(() => useAI());
    const params = { idea: 'product launch', brandContext: 'SaaS', model: 'gpt-4o' };

    await act(async () => {
      await result.current.generate(params);
    });

    expect(runPipeline).toHaveBeenCalledWith(params);
  });

  it('resets loading to false even when runPipeline throws', async () => {
    runPipeline.mockRejectedValueOnce(new Error('pipeline error'));

    const { result } = renderHook(() => useAI());

    await act(async () => {
      try {
        await result.current.generate({});
      } catch {
        // expected
      }
    });

    expect(result.current.loading).toBe(false);
  });

  it('re-throws errors from runPipeline to the caller', async () => {
    runPipeline.mockRejectedValueOnce(new Error('AI unavailable'));

    const { result } = renderHook(() => useAI());

    await expect(
      act(async () => {
        await result.current.generate({});
      })
    ).rejects.toThrow('AI unavailable');
  });

  it('can be called multiple times sequentially', async () => {
    runPipeline
      .mockResolvedValueOnce({ caption: 'first' })
      .mockResolvedValueOnce({ caption: 'second' });

    const { result } = renderHook(() => useAI());

    let r1, r2;
    await act(async () => {
      r1 = await result.current.generate({ idea: 'one' });
    });
    await act(async () => {
      r2 = await result.current.generate({ idea: 'two' });
    });

    expect(r1).toEqual({ caption: 'first' });
    expect(r2).toEqual({ caption: 'second' });
    expect(runPipeline).toHaveBeenCalledTimes(2);
  });
});