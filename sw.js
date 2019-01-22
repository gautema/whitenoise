self.addEventListener('install', function(event){
    event.waitUntil(self.skipWaiting());
  });
  
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', function(event){
    event.respondWith(caches.match(event.request)
      .then(function(response){
        if(response){
          return response;
        }
        return fetch(event.request).then(function(res){
          var res2 = res.clone();
          caches.open('whitenoise-v1').then(function(cache){
            cache.put(event.request, res2);
          });
          return res;
        });
      }));
  });