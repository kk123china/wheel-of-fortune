/**
 * 幸运转盘 - Service Worker
 * 功能：离线缓存、资源预加载、快速加载
 */

const CACHE_NAME = 'wheel-of-fortune-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// 安装事件 - 预缓存关键资源
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Pre-caching assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                // 强制激活
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Pre-cache failed:', error);
            })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // 立即控制所有客户端
            return self.clients.claim();
        })
    );
});

// 拦截网络请求 - 缓存优先策略
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // 如果有缓存，返回缓存
                if (cachedResponse) {
                    // 在后台更新缓存
                    fetchAndCache(event.request);
                    return cachedResponse;
                }

                // 没有缓存，从网络获取
                return fetchAndCache(event.request);
            })
            .catch(() => {
                // 网络失败且无缓存，返回离线页面
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});

// 获取并缓存资源
async function fetchAndCache(request) {
    try {
        const response = await fetch(request);
        
        // 只缓存成功的GET请求
        if (response.ok && request.method === 'GET') {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        console.error('[SW] Fetch failed:', error);
        throw error;
    }
}

// 后台同步（可选功能）
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-data') {
        console.log('[SW] Background sync triggered');
    }
});

// 推送通知（可选功能）
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        
        const options = {
            body: data.body || '你有新的消息',
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                url: data.url || '/'
            },
            actions: [
                { action: 'open', title: '打开' },
                { action: 'close', title: '关闭' }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title || '幸运转盘', options)
        );
    }
});

// 通知点击事件
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});