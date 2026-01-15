// Version: 1.1.0 - Fixed OAuth redirect caching issue
const CACHE_NAME = 'internpro-v1.1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/bethel-logo.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // NEVER cache auth-related requests or navigation (HTML) requests
  // This prevents OAuth redirect loops in PWAs
  const isNavigation = event.request.mode === 'navigate';
  const isAuthRelated = url.hostname.includes('google') ||
                        url.hostname.includes('firebase') ||
                        url.hostname.includes('googleapis') ||
                        url.pathname.includes('__/auth/');

  if (isNavigation || isAuthRelated) {
    // Network-first for navigation and auth
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for static assets only
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
