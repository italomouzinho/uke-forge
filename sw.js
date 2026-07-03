const CACHE = 'melodia-v1';

const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/native.js',
  '/assets/fonts/poppins-300.woff2',
  '/assets/fonts/poppins-400.woff2',
  '/assets/fonts/poppins-500.woff2',
  '/assets/fonts/poppins-600.woff2',
  '/assets/fonts/nunito-300.woff2',
  '/assets/fonts/nunito-400.woff2',
  '/assets/fonts/nunito-500.woff2',
  '/assets/fonts/nunito-600.woff2',
  '/assets/fonts/nunito-700.woff2',
  '/assets/icons/icon-192.svg',
  '/assets/icons/icon-512.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
