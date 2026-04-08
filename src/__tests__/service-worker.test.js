import { describe, it, expect, vi, beforeEach } from 'vitest';

/**
 * Service Worker tests use a simulated SW environment by reconstructing
 * the logic from public/service-worker.js with mocked global APIs.
 *
 * The SW file itself is not an ES module; we simulate its handlers directly.
 */

const CACHE_NAME = 'nexusai-shell-v1';
const APP_SHELL = ['/', '/manifest.json'];

function makeInstallHandler(cachesStub) {
  return (event) => {
    event.waitUntil(
      cachesStub.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
  };
}

function makeFetchHandler(cachesStub, fetchStub) {
  return (event) => {
    event.respondWith(
      cachesStub.match(event.request).then((cached) => cached || fetchStub(event.request))
    );
  };
}

function makeMessageHandler(clientsStub) {
  return async (event) => {
    if (event.data?.type === 'RUN_QUEUE_CHECK') {
      const allClients = await clientsStub.matchAll();
      allClients.forEach((client) => client.postMessage({ type: 'QUEUE_CHECK_TICK' }));
    }
  };
}

describe('Service Worker – install event', () => {
  it('opens the correct cache name', async () => {
    const mockCache = { addAll: vi.fn().mockResolvedValue(undefined) };
    const mockCaches = { open: vi.fn().mockResolvedValue(mockCache) };

    const handler = makeInstallHandler(mockCaches);
    const waitForPromises = [];
    const event = { waitUntil: (p) => waitForPromises.push(p) };

    handler(event);
    await Promise.all(waitForPromises);

    expect(mockCaches.open).toHaveBeenCalledWith(CACHE_NAME);
  });

  it('adds APP_SHELL URLs to the cache', async () => {
    const mockCache = { addAll: vi.fn().mockResolvedValue(undefined) };
    const mockCaches = { open: vi.fn().mockResolvedValue(mockCache) };

    const handler = makeInstallHandler(mockCaches);
    const waitForPromises = [];
    const event = { waitUntil: (p) => waitForPromises.push(p) };

    handler(event);
    await Promise.all(waitForPromises);

    expect(mockCache.addAll).toHaveBeenCalledWith(['/', '/manifest.json']);
  });

  it('calls event.waitUntil with a promise', () => {
    const mockCache = { addAll: vi.fn().mockResolvedValue(undefined) };
    const mockCaches = { open: vi.fn().mockResolvedValue(mockCache) };
    const waitUntil = vi.fn();
    const event = { waitUntil };

    makeInstallHandler(mockCaches)(event);

    expect(waitUntil).toHaveBeenCalledTimes(1);
    expect(waitUntil.mock.calls[0][0]).toBeInstanceOf(Promise);
  });
});

describe('Service Worker – fetch event', () => {
  it('responds with cached response when cache hit', async () => {
    const cachedResponse = { status: 200, body: 'cached' };
    const mockCaches = { match: vi.fn().mockResolvedValue(cachedResponse) };
    const mockFetch = vi.fn();

    const handler = makeFetchHandler(mockCaches, mockFetch);
    const respondWithPromises = [];
    const event = {
      request: '/manifest.json',
      respondWith: (p) => respondWithPromises.push(p)
    };

    handler(event);
    const result = await respondWithPromises[0];

    expect(result).toBe(cachedResponse);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('falls back to network fetch when cache miss', async () => {
    const networkResponse = { status: 200, body: 'network' };
    const mockCaches = { match: vi.fn().mockResolvedValue(null) };
    const mockFetch = vi.fn().mockResolvedValue(networkResponse);

    const handler = makeFetchHandler(mockCaches, mockFetch);
    const respondWithPromises = [];
    const event = {
      request: '/unknown',
      respondWith: (p) => respondWithPromises.push(p)
    };

    handler(event);
    const result = await respondWithPromises[0];

    expect(result).toBe(networkResponse);
    expect(mockFetch).toHaveBeenCalledWith('/unknown');
  });

  it('calls event.respondWith', () => {
    const mockCaches = { match: vi.fn().mockResolvedValue(null) };
    const mockFetch = vi.fn().mockResolvedValue({});
    const respondWith = vi.fn();
    const event = { request: '/', respondWith };

    makeFetchHandler(mockCaches, mockFetch)(event);

    expect(respondWith).toHaveBeenCalledTimes(1);
  });
});

describe('Service Worker – message event', () => {
  it('does nothing for unrecognized message types', async () => {
    const mockClients = { matchAll: vi.fn().mockResolvedValue([]) };
    const handler = makeMessageHandler(mockClients);
    await handler({ data: { type: 'OTHER_TYPE' } });
    expect(mockClients.matchAll).not.toHaveBeenCalled();
  });

  it('does nothing when event.data is null', async () => {
    const mockClients = { matchAll: vi.fn() };
    const handler = makeMessageHandler(mockClients);
    await handler({ data: null });
    expect(mockClients.matchAll).not.toHaveBeenCalled();
  });

  it('broadcasts QUEUE_CHECK_TICK to all clients on RUN_QUEUE_CHECK', async () => {
    const client1 = { postMessage: vi.fn() };
    const client2 = { postMessage: vi.fn() };
    const mockClients = { matchAll: vi.fn().mockResolvedValue([client1, client2]) };

    const handler = makeMessageHandler(mockClients);
    await handler({ data: { type: 'RUN_QUEUE_CHECK' } });

    expect(client1.postMessage).toHaveBeenCalledWith({ type: 'QUEUE_CHECK_TICK' });
    expect(client2.postMessage).toHaveBeenCalledWith({ type: 'QUEUE_CHECK_TICK' });
  });

  it('calls clients.matchAll when type is RUN_QUEUE_CHECK', async () => {
    const mockClients = { matchAll: vi.fn().mockResolvedValue([]) };
    const handler = makeMessageHandler(mockClients);
    await handler({ data: { type: 'RUN_QUEUE_CHECK' } });
    expect(mockClients.matchAll).toHaveBeenCalledTimes(1);
  });

  it('handles RUN_QUEUE_CHECK with zero clients gracefully', async () => {
    const mockClients = { matchAll: vi.fn().mockResolvedValue([]) };
    const handler = makeMessageHandler(mockClients);
    await expect(handler({ data: { type: 'RUN_QUEUE_CHECK' } })).resolves.toBeUndefined();
  });
});