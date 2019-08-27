

const PRECACHE = 'precache-v2';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
    '/',
    // html file
    'index.html',
    // html manifest pointer
    'index.html?homescreen=1',
    // css file
    'dist/style.css',
    // javascript filter
    'dist/main.js',
    // manifest file
    'manifest.json',

];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
        .then(cache => cache.addAll(PRECACHE_URLS))
        .then(self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.dlete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {

    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {

                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});