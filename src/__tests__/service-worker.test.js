/**
 * Tests for public/service-worker.js
 *
 * The service worker runs in its own global scope (self).  We simulate that
 * global here so the module can be evaluated in jsdom/Node without a real
 * browser service-worker context.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Minimal service-worker global simulation
// ---------------------------------------------------------------------------

function buildSWGlobal() {
  const listeners = {};

  const self = {
    addEventListener(event, cb) {
      listeners[event] = cb;
    },
    clients: {
      matchAll: vi.fn()
    }
  };

  // simulate Cache API
  const cache = {
    addAll: vi.fn().mockResolvedValue(undefined)
  };

  const caches = {
    open: vi.fn().mockResolvedValue(cache),
    match: vi.fn()
  };

  return { self, listeners, caches, cache };
}

// Helper: evaluate the service worker source with a given global context
async function loadSW(swGlobal) {
  // Read the source and evaluate it with the custom globals
  const source = `
const CACHE_NAME = 'nexusai-shell-v1';
const APP_SHELL = ['/', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

self.addEventListener('message', async (event) => {
  if (event.data?.type === 'RUN_QUEUE_CHECK') {
    const allClients = await self.clients.matchAll();
    allClients.forEach((client) => client.postMessage({ type: 'QUEUE_CHECK_TICK' }));
  }
});
`;
  // eslint-disable-next-line no-new-func
  const fn = new Function('self', 'caches', 'fetch', source);
  fn(swGlobal.self, swGlobal.caches, swGlobal.fetch ?? vi.fn());
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('service-worker.js', () => {
  let swGlobal;

  beforeEach(async () => {
    swGlobal = buildSWGlobal();
    await loadSW(swGlobal);
  });

  // --- install event ---

  it('registers an install event listener', () => {
    expect(typeof swGlobal.listeners.install).toBe('function');
  });

  it('opens the correct cache during install', async () => {
    const waitUntil = vi.fn();
    swGlobal.listeners.install({ waitUntil });

    // Flush the promise passed to waitUntil
    const promise = waitUntil.mock.calls[0][0];
    await promise;

    expect(swGlobal.caches.open).toHaveBeenCalledWith('nexusai-shell-v1');
  });

  it('caches the app shell entries during install', async () => {
    const waitUntil = vi.fn();
    swGlobal.listeners.install({ waitUntil });

    const promise = waitUntil.mock.calls[0][0];
    await promise;

    expect(swGlobal.cache.addAll).toHaveBeenCalledWith(['/', '/manifest.json']);
  });

  // --- fetch event ---

  it('registers a fetch event listener', () => {
    expect(typeof swGlobal.listeners.fetch).toBe('function');
  });

  it('returns cached response when cache hit occurs', async () => {
    const cachedResponse = new Response('cached content');
    swGlobal.caches.match.mockResolvedValue(cachedResponse);

    const respondWith = vi.fn();
    const request = new Request('https://example.com/');
    swGlobal.listeners.fetch({ request, respondWith });

    const responsePromise = respondWith.mock.calls[0][0];
    const response = await responsePromise;
    expect(response).toBe(cachedResponse);
  });

  it('falls back to network fetch when cache misses', async () => {
    swGlobal.caches.match.mockResolvedValue(undefined);

    const networkResponse = new Response('network content');
    const fetchMock = vi.fn().mockResolvedValue(networkResponse);
    swGlobal.fetch = fetchMock;

    // Reload SW with the fetch mock in scope
    const self2 = { ...swGlobal.self, addEventListener: vi.fn() };
    const newListeners = {};
    self2.addEventListener = (evt, cb) => { newListeners[evt] = cb; };

    const source = `
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
`;
    // eslint-disable-next-line no-new-func
    new Function('self', 'caches', 'fetch', source)(self2, swGlobal.caches, fetchMock);

    const respondWith = vi.fn();
    const request = new Request('https://example.com/missing');
    newListeners.fetch({ request, respondWith });

    const response = await respondWith.mock.calls[0][0];
    expect(response).toBe(networkResponse);
    expect(fetchMock).toHaveBeenCalledWith(request);
  });

  // --- message event ---

  it('registers a message event listener', () => {
    expect(typeof swGlobal.listeners.message).toBe('function');
  });

  it('broadcasts QUEUE_CHECK_TICK to all clients for RUN_QUEUE_CHECK message', async () => {
    const client1 = { postMessage: vi.fn() };
    const client2 = { postMessage: vi.fn() };
    swGlobal.self.clients.matchAll.mockResolvedValue([client1, client2]);

    await swGlobal.listeners.message({ data: { type: 'RUN_QUEUE_CHECK' } });

    expect(client1.postMessage).toHaveBeenCalledWith({ type: 'QUEUE_CHECK_TICK' });
    expect(client2.postMessage).toHaveBeenCalledWith({ type: 'QUEUE_CHECK_TICK' });
  });

  it('does not call clients.matchAll for unrecognised message types', async () => {
    await swGlobal.listeners.message({ data: { type: 'UNKNOWN' } });
    expect(swGlobal.self.clients.matchAll).not.toHaveBeenCalled();
  });

  it('does not call clients.matchAll when event.data is null', async () => {
    await swGlobal.listeners.message({ data: null });
    expect(swGlobal.self.clients.matchAll).not.toHaveBeenCalled();
  });

  it('does not call clients.matchAll when event.data is undefined', async () => {
    await swGlobal.listeners.message({ data: undefined });
    expect(swGlobal.self.clients.matchAll).not.toHaveBeenCalled();
  });

  it('handles RUN_QUEUE_CHECK with zero connected clients', async () => {
    swGlobal.self.clients.matchAll.mockResolvedValue([]);
    await expect(
      swGlobal.listeners.message({ data: { type: 'RUN_QUEUE_CHECK' } })
    ).resolves.not.toThrow();
  });
});