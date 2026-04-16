const CACHE_NAME = 'note-app-v1';
const assets = [
  'index.html',
  'manifest.json'
];

// Cài đặt Service Worker và lưu file vào Cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Khi không có mạng, lấy file từ Cache ra dùng
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});