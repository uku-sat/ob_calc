const CACHE_NAME = 'ob-calc-v2';
const ASSETS = [
  './',
  './index.html',
  './data.js',
  './i18n.js',
  './images/rectangle.jpeg',
  './images/rectangleHollow.jpeg',
  './images/squarePillar.jpeg',
  './images/roundPillar.jpeg',
  './images/largeTri.jpeg',
  './images/smallTri.jpeg',
  './images/square.jpeg',
  './images/circle.jpeg',
  './images/halfCircle.jpeg',
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
