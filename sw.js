const ChacheName = 'Cache:v1'

self.addEventListener('install', (event) => {
  console.log('Service Worker install', event)
})

self.addEventListener('activate', (event) => {
  console.log('ServiceWorker activate:', event)
})

const newworkFallingBackToCache = async(request) => {
  const cache = await caches.open(ChacheName)
  try {
    //fetchリクエストで、レスポンスを取得
    const response = await fetch(request)
    //レスポンス内容をキャッシュに保存
    await cache.put(request, response.clone())
    return response
  } catch(err) {
    console.error(err)
    return cache.match(request)
  }
}

// ネットワークなどを経由してリソースを取得するfetch
self.addEventListener('fetch', (event) => {
  event.respondWith(newworkFallingBackToCache(event.request))
})