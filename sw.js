const CACHE_NAME = 'note-app-v2'; // Đổi tên version để trình duyệt nhận biết bản mới
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/1792/1792931.png'
];

// Cài đặt và ép kích hoạt ngay lập tức
self.addEventListener('install', e => {
  self.skipWaiting(); // Không chờ đợi, cài đặt ngay
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Kiểm soát các trang ngay khi kích hoạt
self.addEventListener('activate', e => {
  e.waitUntil(clients.claim()); 
});

// Chiến lược: Ưu tiên lấy từ Cache, nếu không có mới tải từ mạng
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});