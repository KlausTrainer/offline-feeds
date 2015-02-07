console.log('SW startup');

importScripts('serviceworker-cache-polyfill.js');

var urlsToCache = [
  '/index.html',
  '/scripts/main.js',
  '/scripts/template.js',
  '/scripts/db.js',
  'vendor/pouchdb/dist/pouchdb.js',
  'vendor/normalize.css/normalize.css'
];


self.addEventListener('install', function(event) {
  console.log('install');
  event.waitUntil(
    caches.open('exampleCache')
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener('activate', function(event) {
  console.log('SW activated');
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        console.log(event.request.url, 'from cache');
        return response;
      }


      if (event.request.url.match(/feed_images/)) {
        console.log(event.request.url);
      }

      if (event.request.url.match(/feeds/)) {
        console.log(event.request);
        return fetch(event.request);
      }

      console.log(event.request.url, 'not from cache');

      return fetch(event.request);
    })
  );
});
