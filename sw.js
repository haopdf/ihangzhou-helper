// ============================================
// iHangzhou Service Worker v2
// PWA 离线缓存策略：Network-first for pages, Cache-first for static assets
// ============================================

var CACHE_NAME = 'ihangzhou-v59';
var OFFLINE_PAGE = '/offline.html';

var CACHE_URLS = [
  '/',
  '/index.html',
  '/banshi.html',
  '/museum.html',
  '/css/style.css',
  '/manifest.json',
  '/js/app.js',
  OFFLINE_PAGE,
  '/images/qrcode-ihangzhou.jpg',
  '/images/promo/search-box-white.jpg',
  '/images/promo/search-box-green.jpg'
];

// 安装：预缓存核心资源
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CACHE_URLS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

// 激活：清理旧缓存 & 立即接管页面
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
  if (url.pathname.indexOf('/api/') === 0 || url.pathname.indexOf('/data/') === 0) {
    event.respondWith(fetch(event.request).catch(function () {
      return new Response(JSON.stringify({ error: 'offline', message: '当前离线，数据暂不可用' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }));
    return;
  }

  var isHtml = event.request.mode === 'navigate' || /\.html(\?|$)/.test(url.pathname);
  var isJs = /\.js(\?|$)/.test(url.pathname);
  var isCss = /\.css(\?|$)/.test(url.pathname);
  var isImage = /\.(png|jpg|jpeg|gif|svg|webp|ico)(\?|$)/.test(url.pathname);

  // HTML / JS / CSS / JSON：网络优先，失败回退缓存
  if (isHtml || isJs || isCss) {
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
          // SPA 导航回退到离线页
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_PAGE);
          }
        });
      })
    );
    return;
  }

  // 图片：缓存优先，网络回退
  if (isImage) {
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
        }).catch(function () {
          return new Response('', { status: 204 });
        });
      })
    );
    return;
  }

  // 其他资源：缓存优先
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request).then(function (response) {
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
