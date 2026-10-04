(function(){
  var cards=document.querySelectorAll('.project-card');
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
  },{threshold:.15});
  cards.forEach(function(c){io.observe(c)});
  document.querySelectorAll('.rv').forEach(function(c){io.observe(c)});

  var roles=['WebDev','BotsDev','Youtuber','Streamer'],ri=0,ci=0,del=false,el=document.getElementById('role');
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=roles.join(' / ')}
  else (function tick(){
    var w=roles[ri];
    ci+=del?-1:1;
    el.textContent=w.slice(0,ci);
    var t=del?45:95;
    if(!del&&ci===w.length){del=true;t=1400}
    else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;t=350}
    setTimeout(tick,t);
  })();

  var T={
    en:{pill:'Online & building',iam:"I'm a",sub:'My Digital Workspace',scroll:'Scroll down',
      bio:'I build websites and bots, make videos and go live on stream. Everything I make lives here.',
      projects:'My projects',find:'Find me online',copied:'Discord username copied',clock:'A sleek, high-precision digital clock application designed for clarity and style.',
      uno:'One of the most helpful Uno software tools.',update:'Update',beta:'Beta',hot:'Hot',soon:'Soon',alpha:'Alpha',stable:'Stable',wip:'In progress',nHome:'Home',nAbout:'About',nProj:'Projects',nSoc:'Socials',cta1:'View projects',cta2:'Contact me',aboutT:'About me',sProj:'Projects',sPlat:'Platforms',sRoles:'Roles',top:'Back to top',
      openApp:'Open Application',openDash:'Open Dashboard','new':'New'},
    ru:{pill:'Онлайн и в работе',iam:'Я —',sub:'Моё цифровое пространство',scroll:'Листай вниз',
      bio:'Я делаю сайты и ботов, снимаю видео и стримлю. Всё, что я создаю, живёт здесь.',
      projects:'Мои проекты',find:'Я в сети',copied:'Ник Discord скопирован',clock:'Стильные цифровые часы с высокой точностью — чёткие и красивые.',
      uno:'Одна из самых полезных программ для игры в Уно.',update:'Обновление',beta:'Бета',hot:'Хит',soon:'Скоро',alpha:'Альфа',stable:'Стабильно',wip:'В работе',nHome:'Главная',nAbout:'Обо мне',nProj:'Проекты',nSoc:'Соцсети',cta1:'Смотреть проекты',cta2:'Связаться',aboutT:'Обо мне',sProj:'Проекты',sPlat:'Платформы',sRoles:'Роли',top:'Наверх',
      openApp:'Открыть приложение',openDash:'Открыть дашборд','new':'Новое'},
    de:{pill:'Online & am Bauen',iam:'Ich bin',sub:'Mein digitaler Arbeitsbereich',scroll:'Nach unten',
      bio:'Ich baue Websites und Bots, drehe Videos und streame live. Alles, was ich mache, findest du hier.',
      projects:'Meine Projekte',find:'Hier findest du mich',copied:'Discord-Name kopiert',clock:'Eine elegante, hochpräzise digitale Uhr für Klarheit und Stil.',
      uno:'Eines der hilfreichsten Uno-Programme.',update:'Update',beta:'Beta',hot:'Beliebt',soon:'Bald',alpha:'Alpha',stable:'Stabil',wip:'In Arbeit',nHome:'Start',nAbout:'Über mich',nProj:'Projekte',nSoc:'Social',cta1:'Projekte ansehen',cta2:'Kontakt',aboutT:'Über mich',sProj:'Projekte',sPlat:'Plattformen',sRoles:'Rollen',top:'Nach oben',
      openApp:'App öffnen',openDash:'Dashboard öffnen','new':'Neu'}
  };
  var lang=document.getElementById('lang'),langBtn=document.getElementById('langBtn');
  function setLang(l){
    if(!T[l])l='en';
    document.documentElement.lang=l;
    document.querySelectorAll('[data-i18n]').forEach(function(n){n.textContent=T[l][n.dataset.i18n]});
    document.getElementById('langCode').textContent=l.toUpperCase();
    document.querySelectorAll('#langMenu button').forEach(function(b){b.classList.toggle('active',b.dataset.lang===l)});
    try{localStorage.setItem('lang',l)}catch(e){}
  }
  langBtn.addEventListener('click',function(e){
    e.stopPropagation();
    var o=lang.classList.toggle('open');langBtn.setAttribute('aria-expanded',o);
  });
  document.querySelectorAll('#langMenu button').forEach(function(b){
    b.addEventListener('click',function(){setLang(b.dataset.lang);lang.classList.remove('open')});
  });
  addEventListener('click',function(){lang.classList.remove('open')});
  addEventListener('keydown',function(e){if(e.key==='Escape')lang.classList.remove('open')});
  var saved='en';
  try{saved=localStorage.getItem('lang')||((navigator.language||'en').slice(0,2))}catch(e){}
  setLang(saved);

  var toast=document.getElementById('toast'),tt;
  document.getElementById('discord').addEventListener('click',function(){
    var u=this.dataset.copy;
    function done(){
      toast.textContent=T[document.documentElement.lang].copied+': '+u;toast.classList.add('show');
      clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('show')},2200);
    }
    function fallback(){
      var i=document.createElement('input');i.value=u;document.body.appendChild(i);i.select();
      try{document.execCommand('copy')}catch(e){}
      document.body.removeChild(i);done();
    }
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(u).then(done,fallback)}else{fallback()}
  });

  var navA=document.querySelectorAll('#nav a'),ids=['top','about','projects','socials'],spy=false;
  function spyNav(){spy=false;var y=innerHeight*.4,cur='top';
    ids.forEach(function(id){var e=document.getElementById(id);if(e&&e.getBoundingClientRect().top<=y)cur=id});
    navA.forEach(function(a){a.classList.toggle('on',a.dataset.s===cur)})}
  addEventListener('scroll',function(){if(!spy){spy=true;requestAnimationFrame(spyNav)}},{passive:true});spyNav();

  var tr=document.getElementById('track'),L=['🌐 WebDev','🤖 BotsDev','🎬 Youtuber','🎮 Streamer'],h='';
  for(var k=0;k<2;k++)for(var j=0;j<3;j++)L.forEach(function(x){h+='<span>'+x+'</span>'});
  tr.innerHTML=h;

  var io2=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;io2.unobserve(e.target);
    var n=+e.target.dataset.count,t0=performance.now();
    if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    (function f(t){var p=Math.min(1,(t-t0)/900);e.target.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)})},{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(function(b){io2.observe(b)});
  document.addEventListener('visibilitychange',function(){document.body.classList.toggle('paused',document.hidden)});

  var bar=document.getElementById('progress');
  addEventListener('scroll',function(){
    var h=document.documentElement;
    bar.style.transform='scaleX('+(h.scrollTop/(h.scrollHeight-h.clientHeight||1))+')';
  },{passive:true});
  var orb=document.querySelector('.orb'),mx=0,my=0,tick2=false;
  addEventListener('pointermove',function(e){
    mx=e.clientX;my=e.clientY;
    if(tick2||scrollY>innerHeight)return;
    tick2=true;
    requestAnimationFrame(function(){
      orb.style.setProperty('--px',((mx/innerWidth-.5)*-40)+'px');
      orb.style.setProperty('--py',((my/innerHeight-.5)*-40)+'px');
      tick2=false;
    });
  },{passive:true});

  var light=document.getElementById('light');
  var fine=matchMedia('(hover:hover)').matches;
  if(!fine) return;
  addEventListener('pointermove',function(e){
    light.style.opacity=1;
    light.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)';
  });
  document.querySelectorAll('.project-card').forEach(function(c){
    c.addEventListener('pointermove',function(e){
      var r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
      c.style.setProperty('--mx',x+'px');
      c.style.setProperty('--my',y+'px');
    });
  });
})();
