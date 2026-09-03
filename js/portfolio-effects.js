(function(){
  'use strict';
  const root=document.documentElement;
  const STORAGE_KEY='theme';
  const mediaFine=window.matchMedia('(pointer:fine)');
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyTheme(theme){
    const next=theme==='light'?'light':'dark';
    root.dataset.theme=next;
    try{localStorage.setItem(STORAGE_KEY,next)}catch(e){}
    document.querySelectorAll('[data-theme-toggle],.theme-btn,.theme').forEach(btn=>{
      btn.setAttribute('aria-pressed',next==='light'?'true':'false');
      btn.dataset.theme=next;
      btn.textContent=next==='light'?'☀ Light':'☾ Dark';
      btn.title=next==='light'?'Switch to dark mode':'Switch to light mode';
    });
    const meta=document.querySelector('meta[name="theme-color"]');
    if(meta)meta.content=next==='light'?'#f3f1eb':'#050806';
  }

  let saved='dark';
  try{saved=localStorage.getItem(STORAGE_KEY)||'dark'}catch(e){}
  applyTheme(saved);

  document.querySelectorAll('[data-theme-toggle],.theme-btn,.theme').forEach(btn=>{
    if(btn.dataset.themeBound)return;
    btn.dataset.themeBound='1';
    btn.addEventListener('click',function(e){
      e.preventDefault();
      applyTheme(root.dataset.theme==='dark'?'light':'dark');
    });
  });

  window.addEventListener('storage',function(e){
    if(e.key===STORAGE_KEY)applyTheme(e.newValue||'dark');
  });

  const menu=document.querySelector('[data-menu],.menu');
  const nav=document.querySelector('.nav-links,.nav nav');
  if(menu&&nav){
    menu.addEventListener('click',function(){nav.classList.toggle('open')});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',function(){nav.classList.remove('open')}));
  }

  if(mediaFine.matches&&!reduceMotion.matches){
    let raf=0,x=innerWidth/2,y=innerHeight/2;
    window.addEventListener('pointermove',function(e){
      x=e.clientX;y=e.clientY;
      if(!raf){
        raf=requestAnimationFrame(function(){
          root.style.setProperty('--mx',x+'px');
          root.style.setProperty('--my',y+'px');
          raf=0;
        });
      }
    },{passive:true});
  }

  document.querySelectorAll('[data-modal]').forEach(function(modal){
    const video=modal.querySelector('video');
    const close=function(){modal.classList.remove('open');if(video)video.pause();document.body.style.overflow=''};
    const open=function(){modal.classList.add('open');document.body.style.overflow='hidden';if(video)video.play().catch(function(){})};
    modal.querySelector('[data-modal-close]')?.addEventListener('click',close);
    modal.addEventListener('click',function(e){if(e.target===modal)close()});
    document.querySelectorAll('[data-video-open]').forEach(btn=>btn.addEventListener('click',open));
    window.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('open'))close()});
  });
})();
