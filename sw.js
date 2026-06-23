// Service Worker — Home Tracker
const CACHE = 'home-tracker-v1';
const ASSETS = ['./index.html', './manifest.json'];

// Install: cache core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate: clear old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first, fall back to cache
self.addEventListener('fetch', e => {
  // Don't intercept Firebase or ntfy requests
  if (e.request.url.includes('firebase') || e.request.url.includes('ntfy.sh')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Cache successful GET responses for app assets
        if (e.request.method === 'GET' && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// Background sync: check for due expenses when SW wakes
self.addEventListener('sync', e => {
  if (e.tag === 'check-expenses') {
    e.waitUntil(checkDueExpenses());
  }
});

// Push notifications from server (if using Web Push later)
self.addEventListener('push', e => {
  if (!e.data) return;
  const { title, body } = e.data.json();
  e.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      tag: 'home-tracker',
      renotify: true,
      actions: [{ action: 'open', title: 'Open App' }]
    })
  );
});

// Notification click: open the app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length) return list[0].focus();
      return clients.openWindow('./index.html');
    })
  );
});

async function checkDueExpenses() {
  // Read data from main thread via IndexedDB or message —
  // For simplicity, the main app handles notification logic on open.
  // This is a placeholder for future Web Push integration.
}
