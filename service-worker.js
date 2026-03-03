const CACHE_NAME = 'cams-s-cache-v1';

// قائمة الملفات التي يجب حفظها لتعمل أوفلاين
const urlsToCache = [
  './',
  './index.html',
  './css/all.min.css',
  './js/tailwindcss.js',
  './js/sweetalert2.all.min.js',
  './js/qrcode.min.js'
];

// عند تثبيت التطبيق: احفظ كل الملفات في الذاكرة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// عند فتح التطبيق أوفلاين: اقرأ من الذاكرة بدلاً من الإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // لو الملف موجود في الذاكرة هاته، لو مش موجود جربه من النت
        return response || fetch(event.request);
      })
  );
});