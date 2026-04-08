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
