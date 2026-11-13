// 파일 업데이트 시 버전 변경. 메인 사진을 로컬에서 미리 캐시합니다.
const CACHE_VERSION = 'shizuoka-trip-v3-fuji';
const FILES = [
  './', './index.html', './styles.css?v=3', './data.js?v=3', './app.js?v=3',
  './assets/fuji-hero.jpg', './assets/fuji-scene.svg', './assets/icon.svg',
  './assets/apple-touch-icon.png', './manifest.webmanifest'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k.startsWith('shizuoka-trip-') && k !== CACHE_VERSION).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE_VERSION).then(cache => cache.put(event.request, copy));
    }
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached ||
    (event.request.mode === 'navigate' ? caches.match('./index.html') : Response.error()))));
});
