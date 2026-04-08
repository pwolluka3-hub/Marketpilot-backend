import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAI } from './useAI';

vi.mock('../services/contentEngine', () => ({
  runPipeline: vi.fn()
}));

import { runPipeline } from '../services/contentEngine';

describe('useAI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns loading as false initially', () => {
    const { result } = renderHook(() => useAI());
    expect(result.current.loading).toBe(false);
  });

  it('returns a generate function', () => {
    const { result } = renderHook(() => useAI());
    expect(typeof result.current.generate).toBe('function');
  });

  it('sets loading to true during generation', async () => {
    let resolveGenerate;
    runPipeline.mockReturnValue(new Promise((resolve) => { resolveGenerate = resolve; }));

    const { result } = renderHook(() => useAI());

    act(() => {
      result.current.generate({ idea: 'test' });
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolveGenerate({ caption: 'done' });
    });

    expect(result.current.loading).toBe(false);
  });

  it('sets loading to false after generation completes', async () => {
    runPipeline.mockResolvedValue({ caption: 'Hello world' });

    const { result } = renderHook(() => useAI());

    await act(async () => {
      await result.current.generate({ idea: 'launch post' });
    });

    expect(result.current.loading).toBe(false);
  });

  it('returns the result of runPipeline', async () => {
    const mockResult = { caption: 'Amazing post', strategy: 'Growth', approved: true };
    runPipeline.mockResolvedValue(mockResult);

    const { result } = renderHook(() => useAI());

    let returnedValue;
    await act(async () => {
      returnedValue = await result.current.generate({ idea: 'test', brandContext: 'SaaS', model: 'gpt-4o' });
    });

    expect(returnedValue).toEqual(mockResult);
  });

  it('passes params to runPipeline', async () => {
    runPipeline.mockResolvedValue({});
    const { result } = renderHook(() => useAI());
    const params = { idea: 'launch', brandContext: 'Tech', model: 'gpt-4o' };

    await act(async () => {
      await result.current.generate(params);
    });

    expect(runPipeline).toHaveBeenCalledWith(params);
  });

  it('sets loading to false even when runPipeline throws', async () => {
    runPipeline.mockRejectedValue(new Error('Pipeline error'));

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

  it('propagates errors thrown by runPipeline', async () => {
    runPipeline.mockRejectedValue(new Error('Pipeline error'));

    const { result } = renderHook(() => useAI());

    await act(async () => {
      await expect(result.current.generate({ idea: 'fail' })).rejects.toThrow('Pipeline error');
    });
  });

  it('can call generate multiple times sequentially', async () => {
    runPipeline.mockResolvedValueOnce({ caption: 'First' }).mockResolvedValueOnce({ caption: 'Second' });

    const { result } = renderHook(() => useAI());

    let r1, r2;
    await act(async () => {
      r1 = await result.current.generate({ idea: '1' });
    });
    await act(async () => {
      r2 = await result.current.generate({ idea: '2' });
    });

    expect(r1).toEqual({ caption: 'First' });
    expect(r2).toEqual({ caption: 'Second' });
    expect(result.current.loading).toBe(false);
  });
});