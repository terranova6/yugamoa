// 육아모아 서비스워커: 앱 파일을 저장해 두고 인터넷이 없어도 열리게 한다.
const CACHE = 'yuamoa-v1.12.0';
const SHELL = ['./', './index.html', './manifest.webmanifest', './config.js', './icon.svg', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // 앱 파일: 네트워크 우선(업데이트 반영), 실패하면 저장본
    e.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; }).catch(() => caches.match(req).then((r) => r || caches.match('./index.html'))));
  } else if (url.hostname.includes('fonts.g')) {
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })));
  }
});
// 알림을 누르면 앱을 열고, 추억 영상 알림이면 그 영상을 바로 띄움
self.addEventListener('notificationclick', (e) => {
  e.notification.close(); const day = e.notification.data?.memory;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
    if (cs[0]) { if (day) cs[0].postMessage({ type: 'memory', day }); return cs[0].focus(); }
    return self.clients.openWindow(day ? `./#memory=${day}` : './');
  }));
});
