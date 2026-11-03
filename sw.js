const C='radar-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET')return;
  const put=res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res};
  if(u.origin===location.origin){e.respondWith(fetch(r).then(put).catch(()=>caches.match(r).then(x=>x||caches.match('./index.html'))));return}
  if(u.hostname==='cdnjs.cloudflare.com'||u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){e.respondWith(caches.match(r).then(x=>x||fetch(r).then(put)))}
});
