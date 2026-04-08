import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAI } from '../../hooks/useAI';

// Mock the contentEngine service
vi.mock('../../services/contentEngine', () => ({
  runPipeline: vi.fn()
}));

import { runPipeline } from '../../services/contentEngine';

describe('useAI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initialises with loading=false', () => {
    const { result } = renderHook(() => useAI());
    expect(result.current.loading).toBe(false);
  });

  it('exposes a generate function', () => {
    const { result } = renderHook(() => useAI());
    expect(typeof result.current.generate).toBe('function');
  });

  it('sets loading=true while pipeline is running', async () => {
    let resolvePromise;
    const pending = new Promise((resolve) => { resolvePromise = resolve; });
    runPipeline.mockReturnValue(pending);

    const { result } = renderHook(() => useAI());

    let generatePromise;
    act(() => {
      generatePromise = result.current.generate({ idea: 'test' });
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolvePromise({ caption: 'done' });
      await generatePromise;
    });
  });

  it('sets loading=false after pipeline resolves', async () => {
    runPipeline.mockResolvedValue({ caption: 'result' });

    const { result } = renderHook(() => useAI());

    await act(async () => {
      await result.current.generate({ idea: 'test' });
    });

    expect(result.current.loading).toBe(false);
  });

  it('returns the result from runPipeline', async () => {
    const expected = { caption: 'Hello', strategy: 'strategy', image: null };
    runPipeline.mockResolvedValue(expected);

    const { result } = renderHook(() => useAI());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.generate({ idea: 'test' });
    });

    expect(returnValue).toEqual(expected);
  });

  it('forwards params to runPipeline', async () => {
    runPipeline.mockResolvedValue({});
    const params = { idea: 'Post idea', brandContext: 'SaaS', model: 'gpt-4o' };

    const { result } = renderHook(() => useAI());

    await act(async () => {
      await result.current.generate(params);
    });

    expect(runPipeline).toHaveBeenCalledWith(params);
  });

  it('sets loading=false even when runPipeline rejects', async () => {
    runPipeline.mockRejectedValue(new Error('pipeline error'));

    const { result } = renderHook(() => useAI());

    await act(async () => {
      try {
        await result.current.generate({ idea: 'fail' });
      } catch {
        // expected
      }
    });

    expect(result.current.loading).toBe(false);
  });

  it('re-throws errors from runPipeline', async () => {
    runPipeline.mockRejectedValue(new Error('pipeline error'));

    const { result } = renderHook(() => useAI());

    await act(async () => {
      await expect(result.current.generate({ idea: 'fail' })).rejects.toThrow('pipeline error');
    });
  });

  it('handles multiple sequential generate calls', async () => {
    runPipeline
      .mockResolvedValueOnce({ caption: 'first' })
      .mockResolvedValueOnce({ caption: 'second' });

    const { result } = renderHook(() => useAI());

    let r1, r2;
    await act(async () => {
      r1 = await result.current.generate({ idea: 'first' });
      r2 = await result.current.generate({ idea: 'second' });
    });

    expect(r1).toEqual({ caption: 'first' });
    expect(r2).toEqual({ caption: 'second' });
    expect(result.current.loading).toBe(false);
  });
});