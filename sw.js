const CACHE_NAME = 'ob-calc-v1';
const ASSETS = [
  './',
  './index.html',
  './data.js',
  './images/rectangle.webp',
  './images/rectangleHollow.webp',
  './images/squarePillar.webp',
  './images/roundPillar.webp',
  './images/largeTri.webp',
  './images/smallTri.webp',
  './images/square.webp',
  './images/circle.webp',
  './images/halfCircle.webp',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
