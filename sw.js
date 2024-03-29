const staticCache = 'site-static-v1'
const dynamicCache = 'site-dynamic-v1'

const assets = [
  '/',
  '/index.html',
  '/app.js',
  '/css/style.css',
  '/css/line-awesome/css/line-awesome.min.css',
  '/css/line-awesome/fonts/la-solid-900.woff2',
  '/css/owf-css/owfont-regular.min.css',
  '/images/default-early-am.webp',
  '/images/default-morning.webp',
  '/images/default-night.webp',
  '/images/rox-park-noon.webp',
  '/images/icons/inertiaIcon_96.png',
  '/css/fonts/Exo-Light.woff2',
  '/css/fonts/EBGaramond-VariableFont_wght.woff2',
  '/css/fonts/EBGaramond-Italic-VariableFont_wght.woff2',
  '/css/fonts/owfont-regular.woff2',
]

//  install sw
self.addEventListener('install', e => {
  console.log('service worker installed')
  e.waitUntil(
    caches.open(staticCache).then(cache => {
      console.log('caching shell assets')
      cache.addAll(assets)
    })
  )
})

//  activate event
self.addEventListener('activate', e => {
  console.log('service worker has been activated')
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCache && key !== dynamicCache)
          .map(key => caches.delete(key))
      )
    })
  )
})

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
  console.log('fetch event')
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      if (cacheRes) {
        return cacheRes
      }
      return fetch(e.request)
    })
  )
})
