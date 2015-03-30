console.log('SW startup');

importScripts('serviceworker-cache-polyfill.js', 'vendor/pouchdb/dist/pouchdb.js');
//importScripts('vendor/pouchdb/dist/pouchdb.js');

var urlsToCache = [
  'index.html',
  'scripts/main.js',
  'scripts/template.js',
  'scripts/db.js',
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
      var attachmentRegex = '^https?://[^/]+/feed_images/(.+)/(.+)',
          matches,
          docId,
          attachmentId,
          db;

      if (response) {
        console.log(event.request.url, 'from cache');
        return response;
      }

      matches = event.request.url.match(attachmentRegex);

      if (matches) {
        db = new PouchDB('feeds');

        docId = decodeURIComponent(matches[1]);
        attachmentId = decodeURIComponent(matches[2]);

        return db.getAttachment(docId, attachmentId).then(function(result) {
          return new Promise(function(resolve, reject) {
            resolve(new Response(result, {headers: {'Content-Type': result.type}}));
          });
        });
      }

      console.log(event.request.url, 'not from cache');

      return fetch(event.request);
    })
  );
});
