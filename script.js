/* ═════════ TINY JOURNEY — script.js (paged storybook, vanilla) ══
   EDIT ME: OPENING times, LULLABY notes, per-scene tips live here.
   Messages in index.html, colors in style.css :root. */
(function(){
"use strict";
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
const OPENING={waveAfter:1600,hugAfter:3800};

/* ── 1. ONE consistent teddy (SVG built once, cloned everywhere) ── */
function teddySVG(extra){
  const prop = extra==="umbrella" ? `
    <g class="t-prop t-umbrella" transform="translate(100,18)">
      <rect x="-3" y="0" width="6" height="66" rx="3" fill="#8a6a4e"/>
      <path d="M-52 22 Q0 -34 52 22 Q34 12 22 22 Q12 12 0 22 Q-12 12 -22 22 Q-34 12 -52 22Z" fill="#e8a0a8" stroke="#fff" stroke-width="3"/>
      <circle cx="0" cy="-12" r="5" fill="#e8a0a8" stroke="#fff" stroke-width="2.5"/>
      <path d="M0 66 q0 12 -12 12" fill="none" stroke="#8a6a4e" stroke-width="5" stroke-linecap="round"/>
    </g>` : extra==="heart" ? `
    <g class="t-prop" transform="translate(100,150)">
      <g class="t-heart">
        <circle cx="0" cy="0" r="26" fill="#ff9db0" opacity=".22"><animate attributeName="r" values="26;32;26" dur="1.8s" repeatCount="indefinite"/></circle>
        <path d="M0 12 C-16 -2 -22 -12 -14 -19 C-8 -24 0 -18 0 -12 C0 -18 8 -24 14 -19 C22 -12 16 -2 0 12Z" fill="#f26d8a" stroke="#fff" stroke-width="2.5"/>
        <circle cx="-6" cy="-16" r="2.4" fill="#fff" opacity=".9"/>
      </g>
    </g>` : "";
  return `
  <svg class="teddy" viewBox="0 0 200 235" role="img" aria-label="A cute teddy bear">
    <ellipse cx="100" cy="222" rx="52" ry="10" fill="#5a4a44" opacity=".15"/>
    <g class="t-legs">
      <g class="t-leg L"><ellipse cx="72" cy="196" rx="24" ry="26" fill="#b38152"/><ellipse cx="72" cy="200" rx="12" ry="13" fill="#f6e3c3"/></g>
      <g class="t-leg R"><ellipse cx="128" cy="196" rx="24" ry="26" fill="#b38152"/><ellipse cx="128" cy="200" rx="12" ry="13" fill="#f6e3c3"/></g>
    </g>
    <g class="t-body">
      <ellipse cx="100" cy="150" rx="52" ry="58" fill="#cf9a68"/>
      <ellipse cx="100" cy="162" rx="30" ry="34" fill="#f6e3c3"/>
    </g>
    <g class="t-arm L"><ellipse cx="48" cy="152" rx="16" ry="30" fill="#c08c5c" transform="rotate(12 48 152)"/></g>
    <g class="t-arm R"><ellipse cx="152" cy="152" rx="16" ry="30" fill="#c08c5c" transform="rotate(-12 152 152)"/></g>
    ${prop}
    <g class="t-head-g">
      <g class="t-ear L"><circle cx="48" cy="62" r="22" fill="#cf9a68"/><circle cx="48" cy="62" r="11" fill="#f0c9a0"/></g>
      <g class="t-ear R"><circle cx="152" cy="62" r="22" fill="#cf9a68"/><circle cx="152" cy="62" r="11" fill="#f0c9a0"/></g>
      <circle cx="100" cy="102" r="52" fill="#cf9a68"/>
      <ellipse class="t-cheek" cx="66" cy="118" rx="11" ry="7" fill="#f5a3a3"/>
      <ellipse class="t-cheek" cx="134" cy="118" rx="11" ry="7" fill="#f5a3a3"/>
      <g class="t-eye left"><circle cx="80" cy="100" r="9.5" fill="#4a3833"/><circle cx="83" cy="97" r="3.4" fill="#fff"/><circle cx="81" cy="101" r="1.4" fill="#fff" opacity=".7"/></g>
      <g class="t-eye right"><circle cx="120" cy="100" r="9.5" fill="#4a3833"/><circle cx="123" cy="97" r="3.4" fill="#fff"/><circle cx="121" cy="101" r="1.4" fill="#fff" opacity=".7"/></g>
      <ellipse cx="100" cy="124" rx="24" ry="19" fill="#f6e3c3"/>
      <ellipse cx="100" cy="117" rx="7.5" ry="6" fill="#5a4438"/>
      <ellipse cx="100" cy="115.5" rx="2.4" ry="1.8" fill="#fff" opacity=".55"/>
      <path d="M100 123 Q100 129 92 130 M100 123 Q100 129 108 130" stroke="#5a4438" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`;
}
$$("[data-teddy]").forEach(slot=>{ slot.innerHTML=teddySVG(slot.dataset.extra); });
function setPose(slot,name){
  if(!slot) return;
  slot.classList.remove("pose-walk","pose-wave","pose-hug","pose-sit","pose-nod","pose-tilt");
  name.split(" ").forEach(p=>slot.classList.add(p));
}
// base poses (opening scene gets its own timeline on activation)
setPose($('#s2 [data-teddy]'),"pose-sit");
setPose($('#s3 [data-teddy]'),"pose-sit pose-tilt");
setPose($('#s4 [data-teddy]'),"pose-sit");
setPose($('#s5 [data-teddy]'),"pose-sit");
setPose($('#s6 [data-teddy]'),"pose-walk");
setPose($('#s7 [data-teddy]'),"pose-hug");
setPose($('#s8 [data-teddy]'),"pose-hug");
setTimeout(()=>{ $('#s5 [data-teddy]')?.classList.add("show-prop"); },reduced?100:1200);
setTimeout(()=>{ $('#s7 [data-teddy]')?.classList.add("show-prop"); },reduced?100:800);

/* ── 2. PAGED engine — click / tap / swipe / keys / dots ── */
const scenes=$$(".scene"), total=scenes.length;
let idx=0, timers=[];
const dotsWrap=$("#dots"), fill=$("#progressFill"),
      count=$("#pageCount"), prevBtn=$("#prevBtn"), tip=$("#companionTip");

dotsWrap.innerHTML="";
const dots=scenes.map((s,i)=>{
  const b=document.createElement("button");
  b.setAttribute("aria-label","Go to moment "+(i+1));
  b.innerHTML="<i></i>";
  b.addEventListener("click",e=>{e.stopPropagation();go(i);});
  dotsWrap.appendChild(b); return b;
});
function later(fn,ms){ timers.push(setTimeout(fn,reduced?60:ms)); }
function clearTimers(){ timers.forEach(clearTimeout); timers=[]; }

function playReveals(sec){
  const items=$$(".reveal",sec);
  items.forEach(el=>el.classList.remove("in"));
  void sec.offsetWidth; // restart transitions
  items.forEach(el=>requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add("in"))));
}
function sceneFX(sec){
  const id=sec.id, slot=$("[data-teddy]",sec);
  if(id==="s1"&&slot){
    setPose(slot,"pose-walk");
    $(".scene-1 .hug-burst")?.classList.remove("go");
    later(()=>setPose(slot,"pose-wave"),OPENING.waveAfter);
    later(()=>{ setPose(slot,"pose-hug"); $(".scene-1 .hug-burst")?.classList.add("go"); },OPENING.hugAfter);
  }
  if(id==="s3"&&slot&&!reduced){
    later(()=>slot.classList.add("pose-nod"),2200);
  }
  if(id==="s5"){
    sec.classList.remove("sunny");
    later(()=>sec.classList.add("sunny"),2600); // rain → rainbow
  }
  if(id==="s6"){
    const g=$(".garden",sec);
    g?.classList.remove("grow","bloom");
    later(()=>g?.classList.add("grow"),900);
    later(()=>g?.classList.add("bloom"),2400);
  }
  if(id==="s8"){
    const hb=$(".scene-8 .hug-burst");
    hb?.classList.remove("go");
    later(()=>hb?.classList.add("go"),1200);
  }
}
function go(n){
  idx=Math.max(0,Math.min(total-1,n));
  clearTimers();
  scenes.forEach((s,i)=>{
    s.classList.toggle("active",i===idx);
    s.classList.remove("leaving");
    if(i===idx){ s.querySelector(".stage")?.scrollTo({top:0}); }
  });
  const sec=scenes[idx];
  document.body.dataset.theme=sec.dataset.theme||"";
  dots.forEach((d,k)=>{ d.classList.toggle("on",k===idx); d.classList.toggle("done",k<idx); });
  fill.style.width=((idx+1)/total*100).toFixed(1)+"%";
  count.textContent=(idx+1)+" · "+total;
  prevBtn.classList.toggle("show",idx>0);
  tip.textContent=sec.dataset.tip||"he's with you";
  $("#companion").classList.toggle("show",idx>0);
  playReveals(sec);
  sceneFX(sec);
}
const next=()=>go(idx+1), back=()=>go(idx-1);

// continue buttons → next page (keeps data-go order)
$$("[data-go]").forEach(b=>b.addEventListener("click",e=>{
  e.stopPropagation();
  const t=$(b.dataset.go); const i=t?scenes.indexOf(t):-1;
  go(i>=0?i:idx+1);
}));
prevBtn.addEventListener("click",e=>{e.stopPropagation();back();});
$("#replayBtn")?.addEventListener("click",e=>{e.stopPropagation();go(0);});

// tap anywhere (except interactive bits) → next page
let px=0,py=0;
$("#journey").addEventListener("pointerdown",e=>{px=e.clientX;py=e.clientY;},{passive:true});
$("#journey").addEventListener("click",e=>{
  if(Math.hypot(e.clientX-px,e.clientY-py)>12) return; // it was a scroll/drag
  if(e.target.closest("button, a, audio, input, .teddy-slot")) return; // interactive: teddy nods, envelope opens, buttons act
  if(idx>=total-1) return; // last page stays for the goodbye
  next();
});
// swipe left → next, right → back
let tx=0;
$("#journey").addEventListener("touchstart",e=>{tx=e.touches[0].clientX;},{passive:true});
$("#journey").addEventListener("touchend",e=>{
  const dx=e.changedTouches[0].clientX-tx;
  if(dx<-60) next(); else if(dx>60) back();
},{passive:true});
// keyboard
addEventListener("keydown",e=>{
  if(e.key==="ArrowRight"||e.key==="PageDown"||e.key===" "){e.preventDefault();next();}
  if(e.key==="ArrowLeft"||e.key==="PageUp"){e.preventDefault();back();}
  if(e.key==="Home") go(0); if(e.key==="End") go(total-1);
});

/* ── 3. Listening scene: tap him, he nods ── */
(function listen(){
  const slot=$('#s3 [data-teddy]'); if(!slot) return;
  slot.addEventListener("click",e=>{
    e.stopPropagation();
    setPose(slot,"pose-sit pose-nod pose-hug");
    setTimeout(()=>setPose(slot,"pose-sit pose-tilt"),1400);
  });
})();

/* ── 4. Envelope interaction ── */
const env=$("#envelope"), pop=$("#letterPop");
env?.addEventListener("click",e=>{
  e.stopPropagation();
  const open=env.classList.toggle("open");
  pop?.classList.toggle("show",open);
  env.querySelector(".env-tap").textContent=open?"aww ♡":"tap to open";
  const slot=$('#s4 [data-teddy]');
  if(open&&slot){ setPose(slot,"pose-hug"); setTimeout(()=>setPose(slot,"pose-sit"),2200); }
});

/* ── 5. Stars canvas (tiny, cheap) ── */
(function stars(){
  const c=$("#stars"),x=c.getContext("2d");let W,H,pts=[];
  function rs(){W=c.width=innerWidth;H=c.height=innerHeight;
    pts=Array.from({length:reduced?0:60},()=>({x:Math.random()*W,y:Math.random()*H*.6,r:Math.random()*1.6+.4,p:Math.random()*6}));
  }
  rs();addEventListener("resize",rs);
  if(reduced) return;
  (function loop(t){
    x.clearRect(0,0,W,H);
    pts.forEach(p=>{x.globalAlpha=.25+.35*Math.abs(Math.sin(t/1400+p.p));x.fillStyle="#fff";
      x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill();});
    x.globalAlpha=1;requestAnimationFrame(loop);
  })(0);
})();

/* ── 6. MUSIC — local file if present, else soft generated lullaby ── */
/* AUDIO: drop your piano/lofi mp3 at assets/music.mp3 — it will be used automatically. */
const btn=$("#musicBtn"), local=$("#localAudio");
let ctx=null,nodes=[],playing=false,localOK=false;
local.addEventListener("canplay",()=>{localOK=true;},{once:true});
local.addEventListener("error",()=>{localOK=false;});
// EDIT ME: lullaby mood — frequencies (C major lullaby)
const LULLABY=[261.6,329.6,392.0,523.3,392.0,329.6,293.7,329.6,261.6,0,392.0,440.0,523.3,440.0,392.0,329.6];
function startSynth(){
  ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();
  ctx.resume();
  const master=ctx.createGain();master.gain.value=.0001;
  master.connect(ctx.destination);
  master.gain.linearRampToValueAtTime(.16,ctx.currentTime+2);
  let t=ctx.currentTime+.1,step=0;
  function note(){
    if(!playing) return;
    const f=LULLABY[step%LULLABY.length];step++;
    if(f){
      const o=ctx.createOscillator(),g=ctx.createGain();
      o.type="sine";o.frequency.value=f;
      const o2=ctx.createOscillator(),g2=ctx.createGain();
      o2.type="triangle";o2.frequency.value=f*2;g2.gain.value=.06;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.5,t+.05);g.gain.exponentialRampToValueAtTime(.001,t+1.6);
      o.connect(g);g.connect(master);o2.connect(g2);g2.connect(g);
      o.start(t);o.stop(t+1.7);o2.start(t);o2.stop(t+1.7);
    }
    t+=.62; nodes.push(setTimeout(note,(t-ctx.currentTime)*1000));
  }
  note(); ctx._master=master;
}
function stopSynth(){
  nodes.forEach(clearTimeout);nodes=[];
  try{ctx&&ctx._master.gain.linearRampToValueAtTime(.0001,ctx.currentTime+.6);}catch(e){}
}
btn?.addEventListener("click",async e=>{
  e.stopPropagation();
  playing=!playing;
  btn.classList.toggle("playing",playing);
  btn.setAttribute("aria-pressed",playing);
  btn.querySelector(".music-label").textContent=playing?"playing":"music";
  if(playing){
    try{ await local.play(); if(!local.paused){localOK=true;local.volume=.6;return;} }
    catch(err){/* fall through to synth */}
    if(!localOK) startSynth();
  }else{ local.pause(); stopSynth(); }
});

/* ── start the story ── */
go(0);
})();
