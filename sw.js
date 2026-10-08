/* Built by Sudheer. Portal v5.99.14: shell only. Never cache Sheet/Drive/API requests. */
const CACHE='iocl-portal-shell-v5.99.14';
const ROOT=new URL('./',self.location.href),APP=new URL('index.html',ROOT).href;
const FILES=['index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','icon-maskable-512.png'].map(p=>new URL(p,ROOT).href);
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('iocl-portal-shell-')&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==ROOT.origin)return;
 const shell=e.request.mode==='navigate'&&(u.pathname===ROOT.pathname||u.pathname===new URL(APP).pathname);
 if(!shell&&!FILES.includes(u.href))return;
 const key=shell?APP:u.href;
 e.respondWith((async()=>{const c=await caches.open(CACHE);try{const r=await fetch(e.request,{cache:'no-store'});if(r.ok){await c.put(key,r.clone());return r}throw Error('Shell unavailable')}catch(x){const r=await c.match(key);if(r)return r;return new Response('Open the portal online once to prepare offline use.',{status:503,headers:{'Content-Type':'text/plain'}})}})());
});
