// ============================================
// iHangzhou Service Worker
// HTML/JS 网络优先（确保最新），CSS/图片 缓存优先
// ============================================

var CACHE_NAME = 'ihangzhou-v29';
var CACHE_URLS = [
  '/css/style.css',
  '/manifest.json',
  '/images/qrcode-ihangzhou.jpg',
  '/images/promo/search-box-white.jpg',
  '/images/promo/search-box-green.jpg'
];

// 安装：预缓存静态资源
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CACHE_URLS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

// 激活：清理旧缓存
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (name) {
          return name !== CACHE_NAME;
        }).map(function (name) {
          return caches.delete(name);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// 请求拦截
self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  var isHtml = event.request.mode === 'navigate' || /\.html(\?|$)/.test(url.pathname);
  var isJs = /\.js(\?|$)/.test(url.pathname);

  // HTML / JS：网络优先，失败回退缓存
  if (isHtml || isJs) {
    event.respondWith(
      fetch(event.request).then(function (response) {
        if (response && response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function () {
        return caches.match(event.request).then(function (cached) {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
    );
    return;
  }

  // 其他资源（CSS、图片等）：缓存优先，网络回退
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request).then(function (response) {
        if (response && response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function () {});
    })
  );
});
