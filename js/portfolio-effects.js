(function(){
  const root=document.documentElement;
  const saved=localStorage.getItem('theme');
  root.dataset.theme=saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  const toggle=document.querySelector('[data-theme-toggle]');
  toggle?.addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=next;localStorage.setItem('theme',next)});
  const menu=document.querySelector('[data-menu]');
  const nav=document.querySelector('.nav-links');
  menu?.addEventListener('click',()=>nav?.classList.toggle('open'));
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
  if(matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    let raf=0,x=innerWidth/2,y=innerHeight/2;
    addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;if(!raf){raf=requestAnimationFrame(()=>{root.style.setProperty('--mx',x+'px');root.style.setProperty('--my',y+'px');raf=0})}},{passive:true});
  }
  document.querySelectorAll('[data-modal]').forEach(modal=>{
    const video=modal.querySelector('video');
    const close=()=>{modal.classList.remove('open');video?.pause()};
    document.querySelectorAll('[data-video-open]').forEach(btn=>btn.addEventListener('click',()=>{modal.classList.add('open');video?.play().catch(()=>{})}));
    modal.querySelector('[data-modal-close]')?.addEventListener('click',close);
    modal.addEventListener('click',e=>{if(e.target===modal)close()});
    addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  });
})();
