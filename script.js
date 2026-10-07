/* ══════════════════════════════════════════════════════════════
   TINY JOURNEY — style.css
   ── EDIT ME ──────────────────────────────────────────────
   • Palette: change --cream --lav --pink --blue --peach --green --gold
   • Teddy fur: --fur --fur-dark --cream-muzzle --cheek
   • Speed: --ease, --reveal-t, keyframe durations (blink 4.6s, breathe 4s)
   • Type: --font-head / --font-body
   ══════════════════════════════════════════════════════════════ */
:root{
  color-scheme:light;
  --cream:#FFF8EC; --lav:#E9E2F7; --pink:#F9DCE2; --blue:#DCE9F7;
  --peach:#FFE6CF; --green:#DDF0DC; --gold:#FFD98A;
  --ink:#5a4a44; --ink-soft:#8a766e; --card:#ffffffd9;
  --fur:#cf9a68; --fur-dark:#b38152; --muzzle:#f6e3c3; --cheek:#f5a3a3;
  --ease:cubic-bezier(.22,1,.36,1);
  --reveal-t:.9s;
  --font-head:"Fraunces",Georgia,serif;
  --font-body:"Quicksand",system-ui,-apple-system,sans-serif;
  --sat:env(safe-area-inset-top,0px); --sab:env(safe-area-inset-bottom,0px);
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
html,body{overflow-x:hidden}
body{
  font-family:var(--font-body); color:var(--ink);
  background:var(--cream);
  transition:background 1.2s ease;
  -webkit-font-smoothing:antialiased; line-height:1.65;
}
body[data-theme="lavender"]{background:#EFE9FA}
body[data-theme="blue"]{background:#E3EDFB}
body[data-theme="peach"]{background:#FFF0DE}
body[data-theme="rain"]{background:#D9E2EE}
body[data-theme="green"]{background:#E2F2DF}
body[data-theme="pink"]{background:#FBE3E8}
body[data-theme="warm"]{background:#FFF3D9}

.grain{position:fixed;inset:0;z-index:60;pointer-events:none;opacity:.05;mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.9'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E");}
#glow-bg{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.glow{position:absolute;border-radius:50%;filter:blur(70px);opacity:.55;animation:drift 14s ease-in-out infinite alternate}
.g1{width:44vmax;height:44vmax;background:#ffe3b3;top:-10%;left:-10%}
.g2{width:40vmax;height:40vmax;background:#d9c9ff;bottom:-12%;right:-8%;animation-delay:-5s}
.g3{width:30vmax;height:30vmax;background:#ffd0da;top:40%;left:60%;opacity:.35;animation-delay:-9s}
@keyframes drift{to{transform:translate(4vmax,3vmax) scale(1.08)}}
#stars{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.5}
#dust{position:fixed;inset:0;z-index:1;pointer-events:none;
  background-image:radial-gradient(#fff 1.2px,transparent 1.3px);background-size:90px 90px;opacity:.5;animation:dustFloat 26s linear infinite}
@keyframes dustFloat{to{background-position:90px 180px}}

/* ── HUD ── */
.hud{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;
  padding:calc(10px + var(--sat)) 16px 10px;pointer-events:none}
.hud-left,.hud-right{display:flex;align-items:center;gap:10px;pointer-events:auto}
.hud-bear{font-size:22px;filter:drop-shadow(0 3px 6px #0002);animation:bob 3s ease-in-out infinite}
@keyframes bob{50%{transform:translateY(-3px) rotate(-4deg)}}
.hud-title{font-family:var(--font-head);font-style:italic;font-size:15px;color:var(--ink-soft);letter-spacing:.04em}
.progress-dots{display:flex;gap:6px}
.progress-dots i{width:7px;height:7px;border-radius:50%;background:#5a4a4426;transition:.4s}
.progress-dots i.on{background:var(--ink);transform:scale(1.35)}
.music-btn{display:flex;align-items:center;gap:8px;border:1px solid #5a4a4422;background:#ffffffc9;backdrop-filter:blur(8px);
  border-radius:99px;padding:7px 13px;font-family:inherit;font-size:12px;font-weight:700;color:var(--ink);cursor:pointer;box-shadow:0 4px 16px #5a4a4415;touch-action:manipulation}
.music-btn .music-icon{display:flex;align-items:flex-end;gap:2px;height:14px}
.music-icon i{width:3px;background:var(--ink-soft);border-radius:2px;height:5px}
.music-btn.playing .music-icon i{animation:eq .9s ease-in-out infinite}
.music-btn.playing .music-icon i:nth-child(2){animation-delay:.15s}.music-btn.playing .music-icon i:nth-child(3){animation-delay:.3s}.music-btn.playing .music-icon i:nth-child(4){animation-delay:.45s}
@keyframes eq{0%,100%{height:4px}50%{height:14px;background:#e08a8a}}
.progress-line{position:absolute;bottom:0;left:0;right:0;height:2px;background:#5a4a4412}
.progress-line span{display:block;height:100%;width:0;background:linear-gradient(90deg,#e8a0a0,#c3a6ec,#8fb8e8);border-radius:2px}

#companion{position:fixed;right:12px;bottom:calc(16px + var(--sab));z-index:50;display:flex;flex-direction:column;align-items:center;gap:4px;
  opacity:0;transform:translateY(12px);transition:.6s var(--ease);pointer-events:none}
#companion.show{opacity:1;transform:none}
.companion-bear{font-size:30px;animation:bob 2.6s ease-in-out infinite;filter:drop-shadow(0 4px 8px #0003)}
.companion-tip{font-size:10px;font-weight:700;background:#ffffffd9;padding:3px 9px;border-radius:99px;color:var(--ink-soft);box-shadow:0 2px 10px #0001;white-space:nowrap}

/* ── SCENES ── */
#journey{position:relative;z-index:2}
.scene{position:relative;min-height:100svh;display:flex;align-items:center;justify-content:center;padding:90px 20px 70px;overflow:hidden}
.sky{position:absolute;inset:0;pointer-events:none}
.stage{position:relative;width:min(480px,100%);text-align:center;display:flex;flex-direction:column;align-items:center;gap:14px}
.eyebrow{font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--ink-soft);opacity:.9}
h1,h2{font-family:var(--font-head);font-weight:600;font-size:clamp(28px,7.4vw,40px);line-height:1.18;letter-spacing:-.01em}
.line-big{font-size:clamp(30px,8vw,44px)}
.card{background:var(--card);backdrop-filter:blur(12px);border:1px solid #fff;border-radius:22px;padding:20px 22px;
  font-size:16.5px;box-shadow:0 12px 40px #5a4a4414, inset 0 1px 0 #fff;max-width:420px}
.card p+p{margin-top:8px}
.card .soft{color:var(--ink-soft)} .card .big{font-size:18px;font-weight:600}
.glow-card{border-color:#ffe1a8;box-shadow:0 0 0 4px #ffdf9e55,0 12px 40px #e8a04c22}
.hint{font-size:13px;color:var(--ink-soft)}
.scroll-arrow{display:inline-block;animation:bob 1.6s ease-in-out infinite}
.continue{margin-top:6px;border:none;cursor:pointer;font-family:inherit;font-weight:700;font-size:14px;color:#fff;
  background:linear-gradient(135deg,#b79ced,#e8a0a8);padding:13px 24px;border-radius:99px;box-shadow:0 8px 24px #b79ced55;transition:transform .3s var(--ease),box-shadow .3s;touch-action:manipulation;min-height:48px}
.continue:active{transform:scale(.96)}
.continue:hover{transform:translateY(-2px);box-shadow:0 12px 30px #b79ced66}

/* reveal system */
.reveal{opacity:0;transform:translateY(26px) scale(.985);transition:opacity var(--reveal-t) var(--ease),transform var(--reveal-t) var(--ease)}
.reveal.in{opacity:1;transform:none}
.reveal.d1{transition-delay:.15s}.reveal.d2{transition-delay:.35s}.reveal.d3{transition-delay:.55s}

/* skies */
.sky-cream{background:linear-gradient(#fff6e3,#ffedd6)}
.sun{position:absolute;border-radius:50%}
.sun-soft{width:120px;height:120px;background:radial-gradient(circle,#fff8dc,#ffd98a);top:9%;right:10%;box-shadow:0 0 60px 20px #ffdf9e66;animation:sunPulse 5s ease-in-out infinite}
@keyframes sunPulse{50%{transform:scale(1.06);box-shadow:0 0 80px 30px #ffdf9e88}}
.cloud{position:absolute;background:#fff;border-radius:99px;opacity:.95;box-shadow:0 8px 24px #5a4a4410}
.cloud::before,.cloud::after{content:"";position:absolute;background:#fff;border-radius:50%}
.c1{width:130px;height:38px;top:14%;left:6%;animation:cloudMove 26s linear infinite}
.c1::before{width:52px;height:52px;top:-26px;left:18px}.c1::after{width:38px;height:38px;top:-18px;left:62px}
.c2{width:100px;height:30px;top:26%;right:8%;animation:cloudMove 34s linear infinite reverse}
.c2::before{width:40px;height:40px;top:-20px;left:14px}.c2::after{width:30px;height:30px;top:-14px;left:48px}
.c3{width:150px;height:40px;top:8%;left:40%;opacity:.7;animation:cloudMove 44s linear infinite}
.c3::before{width:56px;height:56px;top:-28px;left:26px}.c3::after{width:40px;height:40px;top:-18px;left:80px}
@keyframes cloudMove{0%{transform:translateX(-4vw)}50%{transform:translateX(4vw)}100%{transform:translateX(-4vw)}}
.hill{position:absolute;bottom:-40px;border-radius:50% 50% 0 0}
.h1{width:120%;height:180px;background:#d8e8c8;left:-10%}
.h2{width:90%;height:140px;background:#e8f0d4;right:-10%;bottom:-50px}
.flower-row{position:absolute;bottom:26px;left:0;right:0;display:flex;justify-content:center;gap:14px;font-size:26px}
.fl{display:inline-block;animation:sway 3.4s ease-in-out infinite;transform-origin:bottom center}
.fl.f2{animation-delay:-.8s}.fl.f3{animation-delay:-1.6s}.fl.f4{animation-delay:-2.2s}.fl.f5{animation-delay:-2.8s}.fl.f6{animation-delay:-1.1s}
@keyframes sway{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}
.sparkles i{position:absolute;width:6px;height:6px;background:#fff;border-radius:50%;box-shadow:0 0 8px 2px #ffdf9e;animation:tw 2.8s ease-in-out infinite}
.sparkles i:nth-child(1){top:20%;left:20%}.sparkles i:nth-child(2){top:34%;right:22%;animation-delay:-.7s}
.sparkles i:nth-child(3){top:55%;left:14%;animation-delay:-1.4s}.sparkles i:nth-child(4){top:16%;right:38%;animation-delay:-2s}
.sparkles i:nth-child(5){top:48%;right:14%;animation-delay:-1s}.sparkles i:nth-child(6){top:62%;left:40%;animation-delay:-2.4s}
.sparkles i:nth-child(7){top:28%;left:48%;animation-delay:-1.8s}.sparkles i:nth-child(8){top:70%;right:35%;animation-delay:-.4s}
@keyframes tw{50%{opacity:.2;transform:scale(.6) translateY(-6px)}}

/* scene 2 */
.sky-lav{background:linear-gradient(#efe7ff,#dcd2f5 60%,#cfc2ec)}
.moon{position:absolute;width:84px;height:84px;border-radius:50%;top:11%;right:14%;
  background:radial-gradient(circle at 35% 35%,#fffbe8,#f5e6b8);box-shadow:0 0 50px 14px #fff6c988;animation:sunPulse 6s ease-in-out infinite}
.twinkles i{position:absolute;width:4px;height:4px;background:#fff;border-radius:50%;animation:tw 3s ease-in-out infinite}
.twinkles i:nth-child(1){top:12%;left:22%}.twinkles i:nth-child(2){top:22%;left:60%;animation-delay:-1s}
.twinkles i:nth-child(3){top:16%;left:44%;animation-delay:-2s}.twinkles i:nth-child(4){top:30%;left:12%;animation-delay:-.5s}
.twinkles i:nth-child(5){top:36%;right:16%;animation-delay:-1.5s}.twinkles i:nth-child(6){top:8%;right:40%;animation-delay:-2.4s}
.cloud.big{width:200px;height:56px;top:34%}
.cloud.big::before{width:80px;height:80px;top:-40px;left:28px}.cloud.big::after{width:56px;height:56px;top:-26px;left:96px}
.cb1{left:2%;animation:cloudMove 30s linear infinite}.cb2{right:2%;animation:cloudMove 38s linear infinite reverse}
.main-cloud{left:50%;transform:translateX(-50%);width:250px;height:64px;top:auto;bottom:34%;opacity:1;box-shadow:0 18px 50px #6a5a9e33}
.main-cloud::before{width:100px;height:100px;top:-50px;left:36px}.main-cloud::after{width:70px;height:70px;top:-32px;left:126px}
.on-cloud{margin-bottom:-70px;z-index:2}
.breath-ring span{display:block;width:120px;height:120px;margin:0 auto;border-radius:50%;border:2px solid #8f7cc933;animation:ring 4s ease-in-out infinite}
@keyframes ring{0%,100%{transform:scale(.82);opacity:.5}50%{transform:scale(1.08);opacity:1}}
.breathe-widget{display:flex;align-items:center;gap:10px;background:#ffffff88;border-radius:99px;padding:10px 18px;font-size:13px;font-weight:700;color:var(--ink-soft)}
.b-dot{width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg,#b79ced,#8fb8e8);animation:ring 4s ease-in-out infinite}

/* scene 3 */
.sky-blue{background:linear-gradient(#e6f0fd,#d3e2f7)}
.cozy-glow{position:absolute;width:320px;height:320px;border-radius:50%;left:50%;top:32%;transform:translate(-50%,-50%);background:radial-gradient(circle,#fff6d8aa,transparent 70%)}
.rug{position:absolute;bottom:8%;left:50%;transform:translateX(-50%);width:min(380px,86vw);height:110px;border-radius:50%;background:radial-gradient(ellipse,#e8c9a8,#d9ae86);opacity:.8}
.lamp{position:absolute;top:12%;right:10%;width:44px;height:44px;border-radius:50%;background:radial-gradient(circle,#fff3c4,#ffd98a);box-shadow:0 0 40px 12px #ffdf9e88;animation:sunPulse 5s ease-in-out infinite}
.lamp span{display:block;width:2px;height:60px;background:#8a766e55;margin:40px auto 0}
.motes i{position:absolute;width:5px;height:5px;border-radius:50%;background:#fff;animation:floatUp 7s linear infinite}
.motes i:nth-child(1){left:20%;bottom:10%}.motes i:nth-child(2){left:40%;bottom:8%;animation-delay:-2s}
.motes i:nth-child(3){left:60%;bottom:12%;animation-delay:-4s}.motes i:nth-child(4){left:75%;bottom:9%;animation-delay:-1s}.motes i:nth-child(5){left:30%;bottom:6%;animation-delay:-5.5s}
@keyframes floatUp{to{transform:translateY(-46vh);opacity:0}}
.speech{display:flex;gap:6px;justify-content:center;height:18px}
.speech span{width:9px;height:9px;border-radius:50%;background:#b79ced;animation:speechB 1.2s ease-in-out infinite}
.speech span:nth-child(2){animation-delay:.2s}.speech span:nth-child(3){animation-delay:.4s}
@keyframes speechB{50%{transform:translateY(-8px);opacity:.6}}
.talk-box .talk-label{font-size:12.5px;font-weight:700;color:var(--ink-soft);background:#ffffffaa;padding:8px 16px;border-radius:99px;display:inline-block}

/* scene 4 */
.sky-peach{background:linear-gradient(#fff1dd,#ffdfc2)}
.paper-plane{position:absolute;top:12%;left:-40px;font-size:30px;animation:flyAcross 16s linear infinite}
@keyframes flyAcross{to{transform:translate(120vw,-30px)}}
.float-hearts{position:absolute;inset:0;font-size:18px;color:#e8a0a0}
.float-hearts i{position:absolute;animation:floatUp 9s linear infinite;font-style:normal}
.float-hearts i:nth-child(1){left:18%;bottom:6%}.float-hearts i:nth-child(2){left:70%;bottom:4%;animation-delay:-3s}.float-hearts i:nth-child(3){left:45%;bottom:2%;animation-delay:-6s}
.envelope{position:relative;border:none;background:none;cursor:pointer;padding:10px;touch-action:manipulation}
.env-body{position:relative;display:block;width:150px;height:104px;background:linear-gradient(#fff,#ffe9d2);border-radius:12px;box-shadow:0 12px 30px #b3815244;transition:transform .4s var(--ease)}
.envelope:hover .env-body{transform:translateY(-4px) rotate(-2deg)}
.env-flap{position:absolute;inset:0;border-radius:12px;background:linear-gradient(#f3c9a2,#e8a87e);clip-path:polygon(0 0,50% 55%,100% 0,100% 0,0 0);transform-origin:top;transition:transform .7s var(--ease);z-index:2}
.envelope.open .env-flap{transform:rotateX(180deg)}
.env-letter{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:34px;transition:.7s var(--ease)}
.envelope.open .env-letter{transform:translate(-50%,-130%) scale(1.15)}
.env-seal{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);font-size:22px;z-index:3;transition:.4s}

line 179
.envelope.open .env-seal{opacity:0;transform:translate(-50%,-50%) scale(0)}
.env-shadow{display:block;width:110px;height:12px;background:#b3815233;border-radius:50%;margin:10px auto 0;filter:blur(3px)}
.env-tap{display:block;margin-top:8px;font-size:12px;font-weight:700;color:var(--ink-soft);animation:bob 2s ease-in-out infinite}
.envelope.open .env-tap{opacity:0}
.letter-pop{max-height:0;overflow:hidden;transition:max-height .8s var(--ease),opacity .6s;opacity:0;scroll-margin:16px}
.letter-pop.show{max-height:480px;opacity:1}
.letter-paper{background:#fffdf6;border-radius:16px;padding:20px 22px;box-shadow:0 14px 40px #b3815244;border:1px dashed #e8c9a8;text-align:left;max-width:380px;margin:0 auto}
.letter-pop.show .letter-paper{animation:letterIn .8s var(--ease)}
@keyframes letterIn{from{transform:translateY(20px) rotate(-2deg) scale(.95);opacity:0}}
.lp-head{font-family:var(--font-head);font-style:italic;font-size:15px;color:#b38152;margin-bottom:10px;text-align:center}
.lp-body{font-size:15.5px;line-height:1.7}
.lp-sign{margin-top:12px;font-size:14px;font-weight:700;color:var(--ink-soft);text-align:right}

/* scene 5 */
.sky-rain{background:linear-gradient(#cfd9e8,#b9c8dd);transition:background 2s}
.scene-5.sunny .sky-rain{background:linear-gradient(#fff3d0,#ffe3ec 55%,#d8ecff)}
.cloud.dark{background:#9aa8c0}.cloud.dark::before,.cloud.dark::after{background:#9aa8c0}
.scene-5.sunny .cloud.dark{background:#fff}.scene-5.sunny .cloud.dark::before,.scene-5.sunny .cloud.dark::after{background:#fff}
.cd1{width:170px;height:48px;top:10%;left:4%}.cd1::before{width:64px;height:64px;top:-32px;left:24px}.cd1::after{width:44px;height:44px;top:-20px;left:84px}
.cd2{width:140px;height:40px;top:20%;right:4%}.cd2::before{width:54px;height:54px;top:-27px;left:20px}.cd2::after{width:36px;height:36px;top:-16px;left:70px}
.rain{position:absolute;inset:0;overflow:hidden;transition:opacity 1.6s}
.scene-5.sunny .rain{opacity:0}
.rain i{position:absolute;top:-20px;width:2px;height:26px;background:linear-gradient(#8fb8e8aa,transparent);border-radius:2px;animation:fall .9s linear infinite}
.rain i:nth-child(1){left:8%}.rain i:nth-child(2){left:18%;animation-delay:-.2s}.rain i:nth-child(3){left:28%;animation-delay:-.5s}
.rain i:nth-child(4){left:38%;animation-delay:-.1s}.rain i:nth-child(5){left:48%;animation-delay:-.7s}.rain i:nth-child(6){left:58%;animation-delay:-.3s}
.rain i:nth-child(7){left:68%;animation-delay:-.6s}.rain i:nth-child(8){left:78%;animation-delay:-.15s}.rain i:nth-child(9){left:88%;animation-delay:-.45s}
.rain i:nth-child(10){left:95%;animation-delay:-.8s}.rain i:nth-child(11){left:55%;animation-delay:-.25s}.rain i:nth-child(12){left:33%;animation-delay:-.65s}
@keyframes fall{to{transform:translateY(110vh)}}
.sunbeam{position:absolute;top:-60px;right:8%;width:120px;height:260px;background:linear-gradient(#fff6c855,transparent);transform:rotate(18deg);opacity:0;transition:opacity 2s}
.scene-5.sunny .sunbeam{opacity:1}
.rainbow{position:absolute;left:50%;bottom:6%;transform:translateX(-50%) scale(.6);width:min(400px,92vw);opacity:0;transition:opacity 2s,transform 2s var(--ease)}
.scene-5.sunny .rainbow{opacity:1;transform:translateX(-50%) scale(1)}
.rainbow-flowers{position:absolute;bottom:22px;left:0;right:0;display:flex;justify-content:center;gap:12px;font-size:24px;opacity:0;transform:translateY(14px);transition:1.4s .5s}
.scene-5.sunny .rainbow-flowers{opacity:1;transform:none}
.rainbow-flowers span{animation:sway 3s ease-in-out infinite}

/* scene 6 */
.sky-green{background:linear-gradient(#e8f6e2,#d2e9d8)}
.happy-sun{width:110px;height:110px;background:radial-gradient(circle,#fff8dc,#ffd166);top:8%;left:10%;box-shadow:0 0 60px 18px #ffd16666;animation:sunPulse 5s ease-in-out infinite}
.balloon{position:absolute;font-size:34px;animation:balloonF 7s ease-in-out infinite}
.b1{top:12%;right:12%}.b2{top:22%;right:26%;font-size:26px;animation-delay:-3s}
@keyframes balloonF{50%{transform:translateY(-22px) rotate(4deg)}}
.bird{position:absolute;top:16%;left:-80px;font-size:22px;animation:flyAcross 20s linear infinite}
.butterflies span{position:absolute;font-size:22px;animation:bfly 6s ease-in-out infinite}
.bf1{top:34%;left:12%}.bf2{top:44%;right:14%;animation-delay:-2s}.bf3{top:26%;left:55%;animation-delay:-4s;font-size:18px}
@keyframes bfly{0%,100%{transform:translate(0,0) rotate(-8deg)}25%{transform:translate(18px,-16px) rotate(6deg)}50%{transform:translate(-10px,-26px)}75%{transform:translate(-20px,-8px) rotate(-5deg)}}
.garden{margin-top:-8px}
.soil{position:relative;width:170px;height:26px;background:linear-gradient(#c9a06e,#a87f52);border-radius:99px;margin:0 auto;box-shadow:inset 0 3px 6px #0003}
.seed,.sprout,.bloom{position:absolute;left:50%;transform:translateX(-50%);transition:.8s var(--ease)}
.seed{bottom:16px;font-size:18px;color:#6a4a2e}
.sprout{bottom:14px;font-size:30px;opacity:0;transform:translateX(-50%) scale(0)}
.bloom{bottom:8px;font-size:46px;opacity:0;transform:translateX(-50%) scale(0)}
.garden.grow .sprout{opacity:1;transform:translateX(-50%) scale(1)}
.garden.bloom .sprout{opacity:0;transform:translateX(-50%) scale(0)}
.garden.bloom .bloom{opacity:1;transform:translateX(-50%) scale(1);animation:sway 3s ease-in-out infinite}

/* scene 7 */
.sky-pink{background:linear-gradient(#ffe6ec,#f9d2dd)}
.glow-heart-bg{position:absolute;width:340px;height:340px;left:50%;top:36%;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,#ffb3c155,transparent 70%);animation:sunPulse 4s ease-in-out infinite}
.petals i{position:absolute;width:10px;height:14px;background:#f5a3b8;border-radius:60% 60% 60% 60%;opacity:.7;top:-20px;animation:petal 8s linear infinite}
.petals i:nth-child(1){left:15%}.petals i:nth-child(2){left:30%;animation-delay:-2s}.petals i:nth-child(3){left:50%;animation-delay:-4s}
.petals i:nth-child(4){left:65%;animation-delay:-1s}.petals i:nth-child(5){left:80%;animation-delay:-5.5s}.petals i:nth-child(6){left:40%;animation-delay:-6.5s}
@keyframes petal{to{transform:translateY(110vh) rotate(320deg)}}

/* scene 8 */
.sky-warm{background:linear-gradient(#fff4d6,#ffe3c4)}
.big-sun{width:150px;height:150px;background:radial-gradient(circle,#fffbe0,#ffcf7e);top:7%;left:50%;transform:translateX(-50%);box-shadow:0 0 90px 30px #ffcf7e66;animation:sunPulse 5s ease-in-out infinite}
.final-teddy{transform:scale(1.12)}
.hug-burst{position:relative;height:0}
.hug-burst i{position:absolute;left:50%;top:-150px;font-size:14px;opacity:0}
.hug-burst i::after{content:"✦";color:#e8a04c}
.hug-burst.go i{animation:burst 1.8s var(--ease) infinite}
.hug-burst.go i:nth-child(1){transform:rotate(0deg) translateY(-70px)}.hug-burst.go i:nth-child(2){transform:rotate(45deg) translateY(-70px);animation-delay:-.2s}
.hug-burst.go i:nth-child(3){transform:rotate(90deg) translateY(-70px);animation-delay:-.4s}.hug-burst.go i:nth-child(4){transform:rotate(135deg) translateY(-70px);animation-delay:-.6s}
.hug-burst.go i:nth-child(5){transform:rotate(180deg) translateY(-70px);animation-delay:-.8s}.hug-burst.go i:nth-child(6){transform:rotate(225deg) translateY(-70px);animation-delay:-1s}
.hug-burst.go i:nth-child(7){transform:rotate(270deg) translateY(-70px);animation-delay:-1.2s}.hug-burst.go i:nth-child(8){transform:rotate(315deg) translateY(-70px);animation-delay:-1.4s}
@keyframes burst{0%{opacity:0}30%{opacity:1}100%{opacity:0}}
.sign{background:#ffffffd9;border-radius:20px;padding:20px 24px;box-shadow:0 12px 40px #e8a04c22;border:1px solid #fff}
.sign-hug{font-family:var(--font-head);font-size:20px}
.sign-name{font-family:var(--font-head);font-style:italic;font-size:24px;margin-top:6px;color:#b38152}
.replay{margin-top:12px;border:1px solid #5a4a4422;background:#fff;border-radius:99px;padding:10px 20px;font-family:inherit;font-weight:700;font-size:13px;cursor:pointer;color:var(--ink);min-height:44px}
.wave-note{font-size:12px;color:var(--ink-soft);font-weight:600}
.finale-fade{position:absolute;inset:auto 0 0 0;height:120px;background:linear-gradient(transparent,#fff2cf);pointer-events:none}

/* ═════════ TEDDY — one consistent character ═════════ */
.teddy-slot{display:flex;justify-content:center;min-height:230px}
.teddy{width:190px;height:auto;overflow:visible;filter:drop-shadow(0 14px 22px #5a4a4433)}
.final-teddy .teddy{width:225px}
.t-body{animation:breathe 4s ease-in-out infinite;transform-origin:50% 80%}
@keyframes breathe{0%,100%{transform:scale(1,1)}50%{transform:scale(1.015,1.03)}}
.t-head-g{animation:headSway 6s ease-in-out infinite;transform-origin:50% 60%}
@keyframes headSway{0%,100%{transform:rotate(-1.6deg)}50%{transform:rotate(1.6deg)}}
.t-eye{transform-origin:center;transform-box:fill-box;animation:blink 4.6s ease-in-out infinite}
.t-eye.right{animation-delay:.03s}
@keyframes blink{0%,92%,100%{transform:scaleY(1)}94%,96%{transform:scaleY(.08)}}
.t-cheek{opacity:.75}
.t-arm{transform-origin:top center;transition:transform .8s var(--ease)}
.t-leg{transform-origin:top center}

/* poses (JS toggles .pose-* on .teddy-slot) */
.teddy-slot[data-pose] .t-arm.L{transform:rotate(10deg)}
.teddy-slot[data-pose] .t-arm.R{transform:rotate(-10deg)}
.pose-wave .t-arm.R{transform:rotate(-150deg)!important;animation:wave .7s ease-in-out 6;transform-origin:top center}
@keyframes wave{50%{transform:rotate(-120deg)}}
.pose-hug .t-arm.L{transform:rotate(62deg) translateY(-8px)!important}
.pose-hug .t-arm.R{transform:rotate(-62deg) translateY(-8px)!important}
.pose-hug .t-body{animation:hugSqueeze 2.6s ease-in-out infinite}
@keyframes hugSqueeze{0%,100%{transform:scale(1,1)}30%{transform:scale(1.06,1.04)}55%{transform:scale(1.03,1.05)}}
.pose-sit .t-leg{transform:scaleY(.55)}
.pose-sit .teddy{transform:translateY(14px)}
.pose-nod .t-head-g{animation:nod 2.4s ease-in-out infinite}
@keyframes nod{0%,100%{transform:rotate(0)}25%{transform:rotate(0) translateY(3px)}50%{transform:rotate(-4deg)}75%{transform:rotate(3deg)}}
.pose-tilt .t-head-g{animation:tilt 3.4s ease-in-out infinite}
@keyframes tilt{50%{transform:rotate(7deg) translateY(2px)}}
.pose-walk .teddy{animation:walkIn 1s ease-in-out infinite}
@keyframes walkIn{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-7px) rotate(1deg)}}
.pose-walk .t-leg.L{animation:step .5s ease-in-out infinite alternate}
.pose-walk .t-leg.R{animation:step .5s ease-in-out infinite alternate-reverse}
@keyframes step{to{transform:rotate(16deg)}}
.t-prop{opacity:0;transform:translateY(8px) scale(.9);transition:.7s var(--ease);transform-origin:center}
.show-prop .t-prop{opacity:1;transform:none}
.t-heart{animation:heartBeat 1.8s ease-in-out infinite;transform-origin:center;transform-box:fill-box}
@keyframes heartBeat{0%,100%{transform:scale(1)}25%{transform:scale(1.14)}40%{transform:scale(1.02)}60%{transform:scale(1.12)}}
.t-umbrella{transform-origin:bottom center;animation:umbWob 2.4s ease-in-out infinite}
@keyframes umbWob{50%{transform:rotate(2.5deg)}}
.teddy-slot{cursor:pointer}

/* responsive */
@media(min-width:760px){
  .teddy{width:215px}.final-teddy .teddy{width:250px}
  .card{font-size:17px}
}
@media(max-width:380px){
  .teddy{width:170px}.final-teddy .teddy{width:200px}
  .card{font-size:15px;padding:17px 18px}
  h1,h2{font-size:27px}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
  html{scroll-behavior:auto}
}

/* ═════════ PAGED STORYBOOK MODE — one moment at a time ═════════ */
html,body{height:100%;overflow:hidden;overscroll-behavior:none}
#journey{position:relative;height:100dvh}
.scene{position:absolute;inset:0;min-height:0;height:100dvh;padding:76px 20px 110px;
  opacity:0;visibility:hidden;transform:scale(.985);
  transition:opacity .8s var(--ease),transform .8s var(--ease),visibility 0s .8s;
  pointer-events:none}
.scene.active{opacity:1;visibility:visible;transform:none;transition:opacity .8s var(--ease),transform .8s var(--ease);pointer-events:auto}
.scene.leaving{opacity:0;transform:scale(1.015) translateY(-14px)}
.scene .sky{transition:opacity 1s ease}
.stage{width:min(480px,100%);max-height:calc(100dvh - 190px);overflow-y:auto;scrollbar-width:none;padding:6px 2px 10px}
.stage::-webkit-scrollbar{display:none}
.scene.active .reveal{opacity:0;transform:translateY(26px) scale(.985)}
.scene.active .reveal.in{opacity:1;transform:none}
/* staggered entrance each time a page opens */
.scene.active .reveal.in.d1{transition-delay:.35s}
.scene.active .reveal.in.d2{transition-delay:.6s}
.scene.active .reveal.in.d3{transition-delay:.85s}
.progress-dots button{width:22px;height:14px;border:none;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;min-height:24px}
.progress-dots button i{width:7px;height:7px;border-radius:50%;background:#5a4a4426;transition:.4s;display:block}
.progress-dots button.on i{background:var(--ink);transform:scale(1.35)}
.progress-dots button.done i{background:#5a4a4466}
.pager{position:fixed;left:0;right:0;bottom:calc(12px + var(--sab));z-index:55;display:flex;align-items:center;justify-content:center;gap:14px;pointer-events:none}
.pager-back{pointer-events:auto;border:1px solid #5a4a4422;background:#ffffffb8;backdrop-filter:blur(8px);
  border-radius:99px;padding:9px 18px;font-family:inherit;font-size:12.5px;font-weight:700;color:var(--ink-soft);
  cursor:pointer;opacity:0;transform:translateY(8px);transition:.5s var(--ease);min-height:40px}
.pager-back.show{opacity:1;transform:none}
.pager-back:active{transform:scale(.95)}
.pager-count{font-size:11px;font-weight:700;letter-spacing:.24em;color:var(--ink-soft);background:#ffffff90;padding:6px 14px;border-radius:99px}
#companion{bottom:calc(64px + var(--sab))}

/* ═════════ MOBILE-FIRST POLISH ═════════ */
html{-webkit-text-size-adjust:100%}
body{touch-action:manipulation;-webkit-tap-highlight-color:transparent}
button{-webkit-tap-highlight-color:transparent;touch-action:manipulation}
.teddy-slot{-webkit-user-select:none;user-select:none}
#journey{height:100vh;height:100dvh}
.scene{height:100vh;height:100dvh}
.stage{-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
.progress-dots button{width:32px;min-height:32px}
.pager-back{min-height:44px}

/* thumb-friendly full-width buttons on phones */
@media(max-width:560px){
  .continue{width:100%;max-width:340px}
  .replay{width:100%;max-width:340px}
  .stage{gap:12px}
}

/* short screens (small phones in portrait) */
@media(max-height:680px){
  .scene{padding:68px 14px 100px}
  .teddy{width:160px}
  .final-teddy .teddy{width:185px}
  .teddy-slot{min-height:180px}
  h1,h2{font-size:clamp(24px,6.6vw,32px)}
  .line-big{font-size:clamp(26px,7vw,34px)}
  .card{font-size:15px;padding:16px 18px}
  .flower-row{font-size:21px;bottom:20px}
  .main-cloud{bottom:30%}
}

/* landscape phones / very short heights */
@media(max-height:500px){
  .scene{padding:60px 14px 88px}
  .stage{gap:8px;max-height:calc(100vh - 150px);max-height:calc(100dvh - 150px)}
  .teddy{width:112px}
  .final-teddy .teddy{width:130px}
  .teddy-slot{min-height:120px}
  h1,h2{font-size:22px}
  .line-big{font-size:24px}
  .card{font-size:13.5px;padding:12px 16px}
  .card .big{font-size:14.5px}
  .eyebrow{font-size:10px;letter-spacing:.22em}
  .hint,.talk-box,.breathe-widget,.wave-note{display:none}
  .flower-row{display:none}
  .continue{padding:11px 20px;min-height:44px;font-size:13px}
  .sign{padding:14px 18px}
  .sign-hug{font-size:17px}.sign-name{font-size:20px}
  .envelope .env-body{width:120px;height:84px}
}

/* very narrow phones */
@media(max-width:340px){
  .card{font-size:14px;padding:15px 16px}
  .hud-title{display:none}
}
