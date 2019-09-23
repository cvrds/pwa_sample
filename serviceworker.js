var CACHE_NAME = 'pwa_sample-cache-v1';
var urlsToCache = [
  'https://raw.githubusercontent.com/cvrds/pwa_sample/master/css/sytle.css',
  'https://raw.githubusercontent.com/cvrds/pwa_sample/master/image/logo.png',
  'https://raw.githubusercontent.com/cvrds/pwa_sample/master/js/jquery-3.4.1.min.js',
  'https://raw.githubusercontent.com/cvrds/pwa_sample/master/js/main.js',
//   '/css/style.css',
//   '/js/jquery-3.4.1.min.js',
//   '/js/main.js',
//   '/image/logo.png'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function(event) {
  
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.filter(function(cacheName){
                return cacheName != CACHE_NAME
            }).map(function(cacheName){
                return caches.delete(cacheName)
            })
        );
      })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        
        caches.match(event.request).then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
            }
        )
        );
});