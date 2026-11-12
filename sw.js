// 이미 열어본 페이지를 오프라인에서도 볼 수 있도록 기본 파일 저장.
// 새 버전 배포 시 CACHE_VERSION을 바꾸면 이전 파일 캐시가 정리됩니다.
const CACHE_VERSION = 'shizuoka-trip-v2';
const FILES = ['./', './index.html', './styles.css', './data.js', './app.js', './assets/fuji-scene.svg', './assets/icon.svg', './assets/apple-touch-icon.png', './manifest.webmanifest'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
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
  }).catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html'))));
});
