const staticCache = "site-static-v1";
const dynamicCache = "site-dynamic-v2"

const assets = [
  "/",
  "/index.html",
  "/app.js",
  "/weather.js",
  "/css/style.css",
  "/css?family=Exo:300&display=swap",
  "/css?family=EB+Garamond&display=swap",
  "/css?family=Nanum+Gothic&display=swap",
  "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
  "/images/default-early-am.jpg",
  "/images/default-morning.jpg",
  "/images/default-night.jpg",
  "/images/rox-park-noon.jpg"
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
self.addEventListener('fetch', e => {
  console.log('service worker: fetching');
  e.respondWith(
    fetch(e.request)
    .then(res => {
      //  make clone of res
      const resClone = res.clone();
      //  open cache
      caches.open(staticCache)
      .then(cache => {
       // add res to cache
       cache.put(e.request, resClone);
      })
      return res;
    })
    .catch(err => caches.match(e.request).then(res => res))
  );
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