const staticCache = "site-static-v2";
const dynamicCache = "site-dynamic-v2";

const assets = [
  "/",
  "/index.html",
  "/app.js",
  "/weather.js",
  "/css/style.css",
  "https://fonts.googleapis.com/css?family=Exo:300&display=swap",
  "https://fonts.googleapis.com/css?family=EB+Garamond&display=swap",
  "https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap",
  "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
  "/images/default-early-am.jpg",
  "/images/default-morning.jpg",
  "/images/default-night.jpg",
  "/images/rox-park-noon.jpg",
  "https://favqs.com/api/qotd",
  "https://favqs.com/"
];

//  install sw
self.addEventListener("install", e => {
  console.log("service worker installed");
  e.waitUntil(
    caches.open(staticCache).then(cache => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

//  activate event
self.addEventListener("activate", e => {
  console.log("service worker has been activated");
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

//  fetch event
// self.addEventListener('fetch', e => {
//   console.log('service worker: fetching');
//   e.respondWith(
//     fetch(e.request)
//     .then(res => {
//       //  make clone of res
//       const resClone = res.clone();
//       //  open cache
//       caches.open(staticCache)
//       .then(cache => {
//        // add res to cache
//        cache.put(e.request, resClone);
//       })
//       return res;
//     })
//     .catch(err => caches.match(e.request).then(res => res))
//   );
// });

self.addEventListener("fetch", e => {
  console.log("fetch event ", e);
});

//  fetch event
// self.addEventListener('fetch', e => {
//  e.respondWith(
//    caches
//    .match(e.request)
//    .then(cacheRes => {
//      return (
//        caches ||
//        fetch(e.request).then(fetchRes => {
//          return caches.open(dynamicCache).then(cache => {
//            cache.put(e.request.url, fetchRes.clone());
//            limitCacheSize(dynamicCache, 20);
//            return fetchRes;
//          });
//        })
//      );
//    })
//    .catch((err) => {
//      console.log(err);
//    })
//  )
// })
