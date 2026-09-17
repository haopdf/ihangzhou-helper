// ============================================
// iHangzhou Service Worker
// HTML/JS/CSS 网络优先（确保最新），图片 缓存优先
// ============================================

var CACHE_NAME = 'ihangzhou-v50';
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

// 收到 SKIP_WAITING 消息立即激活
self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 请求拦截
self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // /api/* 始终走网络，不读缓存（确保 CMS 改动立即生效）
  if (url.pathname.indexOf('/api/') === 0) {
    event.respondWith(fetch(event.request));
    return;
  }

  var isHtml = event.request.mode === 'navigate' || /\.html(\?|$)/.test(url.pathname);
  var isJs = /\.js(\?|$)/.test(url.pathname);
  var isJson = /\.json(\?|$)/.test(url.pathname);

  // HTML / JS / JSON：网络优先，失败回退缓存（JSON 数据需确保最新，避免缓存旧数据导致页面加载失败）
  if (isHtml || isJs || isJson) {
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

  // CSS：网络优先（确保最新），失败回退缓存
  var isCss = /\.css(\?|$)/.test(url.pathname);
  if (isCss) {
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
        return caches.match(event.request);
      })
    );
    return;
  }

  // 其他资源（图片等）：缓存优先，网络回退
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
