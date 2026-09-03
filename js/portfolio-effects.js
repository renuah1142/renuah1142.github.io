(function(){
  const root=document.documentElement;
  const mediaDark=matchMedia('(prefers-color-scheme: dark)');
  root.dataset.theme=localStorage.getItem('theme')||(mediaDark.matches?'dark':'light');
  const themeButtons=document.querySelectorAll('[data-theme-toggle],.theme-btn');
  themeButtons.forEach(btn=>btn.addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=next;localStorage.setItem('theme',next)}));
  const menu=document.querySelector('[data-menu]');
  const nav=document.querySelector('.nav-links');
  menu?.addEventListener('click',()=>nav?.classList.toggle('open'));
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
  if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    let raf=0,x=innerWidth/2,y=innerHeight/2;
    addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;if(!raf){raf=requestAnimationFrame(()=>{root.style.setProperty('--mx',x+'px');root.style.setProperty('--my',y+'px');raf=0})}},{passive:true});
  }
  document.querySelectorAll('[data-modal]').forEach(modal=>{
    const video=modal.querySelector('video');
    const close=()=>{modal.classList.remove('open');video?.pause();document.body.style.overflow=''};
    modal.querySelector('[data-modal-close]')?.addEventListener('click',close);
    modal.addEventListener('click',e=>{if(e.target===modal)close()});
    modal.querySelectorAll('[data-video-open]').forEach(btn=>btn.addEventListener('click',()=>{modal.classList.add('open');document.body.style.overflow='hidden';video?.play().catch(()=>{})}));
    addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  });
})();
