const C='ielts-boost-pro-v8',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const nav=e.request.mode==='navigate';
 e.respondWith(nav?fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put('./index.html',c));return r}).catch(()=>caches.match('./index.html')):caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(l=>l.length?l[0].focus():clients.openWindow('./')))});
