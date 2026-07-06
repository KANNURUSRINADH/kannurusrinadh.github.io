const CACHE_NAME = 'srinadh-portfolio-v7';
const ASSETS = [
  './',
  './index.html',
  './styles-two-column.css?v=2.7',
  './script-two-column.js?v=1.8',
  './manifest.json',
  './images/KANNURU SRINADH.png',
  './images/qr-code.png',
  './images/NIT_Rourkela_Colour_Logo.svg',
  './images/JNTUKlogo.png',
  './images/ap-inter.png',
  './images/ssc.png',
  './documents/Kannuru_Srinadh_CV.pdf'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all core assets');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event (Stale-While-Revalidate for cached assets, network fallback otherwise)
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Check if request is for local files or CDNs
  const isLocal = url.origin === self.location.origin;
  const isCDN = url.hostname.includes('cdnjs.cloudflare.com') || url.hostname.includes('cdn.jsdelivr.net');

  if (isLocal || isCDN) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Fetch in background to update cache (Stale-while-revalidate)
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, networkResponse);
                });
              }
            })
            .catch(() => { /* Ignore background fetch failures */ });
          return cachedResponse;
        }

        // Fallback to network
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          }
          return networkResponse;
        });
      })
    );
  }
});
