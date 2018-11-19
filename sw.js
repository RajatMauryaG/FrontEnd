var cacheName = 'v1';
var filesToCache = [
    './',
    './index.html,',
    './styles/inline.css',
    './js/app.js',
    './lib/angular.min.js',
    './lib/angular-ui-router.min.js',
    './lib/ui-grid.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  
});

// self.addEventlistener('activate', function(e) {
//     console.log('[ServiceWorker] Activated');
// });
// self.addEventlistener('Fetch', function(e) {
//     console.log('[ServiceWorker] Fetched');
// });