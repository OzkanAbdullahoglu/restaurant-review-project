/**
 * Defining a constant variable for staticCacheName
 */
const staticCacheName = 'mws-restaurant-v41';

/**
 * Installing serviceWorker
 */
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                "/",
                "index.html",
                "restaurant.html",
                "img/1.jpg",
                "img/2.jpg",
                "img/3.jpg",
                "img/4.jpg",
                "img/5.jpg",
                "img/6.jpg",
                "img/7.jpg",
                "img/8.jpg",
                "img/9.jpg",
                "img/10.jpg",
                "img/1_320w.jpg",
                "img/2_320w.jpg",
                "img/3_320w.jpg",
                "img/4_320w.jpg",
                "img/5_320w.jpg",
                "img/6_320w.jpg",
                "img/7_320w.jpg",
                "img/8_320w.jpg",
                "img/9_320w.jpg",
                "img/10_320w.jpg",
                "data/restaurants.json",
                "manifest.json",
                "js/main.js",
                "css/styles.css",
                "js/dbhelper.js",
                "js/restaurant_info.js",
                "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.css",
                "https://fonts.googleapis.com/css?family=Montserrat"
            ]);
        })
    );
});

/**
 * Cache activated serviceWorker and delete older version
 */
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {

            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('mws-restaurant-v') &&
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

/**
 * To fetch path "/" to work offline first
 */
self.addEventListener('fetch', function(event) {
    let requestUrl = new URL(event.request.url);
    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
            event.respondWith(caches.match('/'));
            return;
        }
    }
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});