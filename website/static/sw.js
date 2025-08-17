// --- In website/static/sw.js ---

const CACHE_NAME = 'journeys-cache-v2'; // Make sure this matches the version from Step 1
const urlsToCache = [
    // ... PASTE THE ENTIRE LIST FROM STEP 1 HERE ...
    // --- Core Pages ---
    '/', '/home', '/love-puzzle', '/letters', '/music', '/flower-entry', '/flower-display', '/our-memories', '/plan-a-date',
    // --- Main Layout Images ---
    '/static/image/logo.png', '/static/image/hero_bg.jpg', '/static/image/me.jpg',
    // --- Carousel Images ---
    '/static/image/pgpc.jpg', '/static/image/samgyup.jpg', '/static/image/camplebana.jpg', '/static/image/jollibee.jpg', '/static/image/mcdo.jpg', '/static/image/louieandchit.jpg', '/static/image/kfc.jpg', '/static/image/cafe.jpg', '/static/image/citymart.jpg',
    // --- Memories Page Images ---
    '/static/image/mels1.jpg', '/static/image/mels2.jpg', '/static/image/mels3.jpg', '/static/image/mels4.jpg', '/static/image/mels5.jpg', '/static/image/melsaqua.jpg', '/static/image/memory1.jpg', '/static/image/soon.jpg', '/static/image/mes1.jpg', '/static/image/mes2.jpg', '/static/image/mes3.jpg', '/static/image/mes4.jpg', '/static/image/mes5.jpg', '/static/image/mes6.jpg',
    // --- Video File ---
    '/static/video/aquantance.mp4',
    // --- Music Files ---
    "/static/music/sa_bawat_sandali.mp3", "/static/music/tanging_dahilan.mp3",
    // --- External CDN Files ---
    'https://cdn.tailwindcss.com/3.4.16', 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap', 'https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
];

// 1. Install Phase: Cache all essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching assets');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// 2. Activate Phase: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. Fetch Phase: Serve from cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response from cache
        if (response) {
          return response;
        }
        // Not in cache - try to fetch from network
        return fetch(event.request);
      }
    )
  );
});