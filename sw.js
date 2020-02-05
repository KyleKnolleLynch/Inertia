const staticCache = 'site-static-v1';
const dynamicCache = 'site-dynamic-v1';

const assets = [
  '/',
  '/index.html',
  '/app.js',
  '/css/style.css',
  '/images/default-early-am.jpg',
  '/images/default-morning.jpg',
  '/images/default-night.jpg',
  '/images/rox-park-noon.jpg',
  '/images/icons/inertiaIcon_96.png',
  '/css/fonts/Exo-Light.woff'
];

//  install sw
self.addEventListener('install', e => {
  console.log('service worker installed');
  e.waitUntil(
    caches.open(staticCache).then(cache => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

//  activate event
self.addEventListener('activate', e => {
  console.log('service worker has been activated');
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCache && key !== dynamicCache)
          .map(key => caches.delete(key))
      );
    })
  );
});

// self.addEventListener("fetch", e => {
//   console.log("fetch event ");
//   e.respondWith(
//     caches
//     .match(e.request)
//     .then(cacheRes => {
//       return cacheRes
//       || fetch(e.request).then(fetchRes => {
//         return caches.open(dynamicCache).then(cache => {
//           cache.put(e.request.url, fetchRes.clone());
//           return fetchRes;
//         })
//       })
//     })
//   );
// });

self.addEventListener('fetch', e => {
  console.log('fetch event');
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      if (cacheRes) {
        return cacheRes;
      }
      return fetch(e.request);
    })
  );
});
