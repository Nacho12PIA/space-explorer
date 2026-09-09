"use client";

import { useEffect, useState } from "react";

const experiments = [
  { id: "gravity", icon: "🧑‍🚀", title: "SUPERGRAVEDAD", subtitle: "Salta en la Luna, Marte o Júpiter.", accent: "#38bdf8" },
  { id: "orbits", icon: "🪐", title: "DOMINA UNA ÓRBITA", subtitle: "Mueve un planeta y cambia su año.", accent: "#fbbf24" },
  { id: "daynight", icon: "🌗", title: "FABRICA UN DÍA", subtitle: "Acelera la rotación de un mundo.", accent: "#60a5fa" },
  { id: "blackhole", icon: "🕳️", title: "AGUJERO NEGRO", subtitle: "¿Qué ocurre si te acercas demasiado?", accent: "#c084fc", badge: "MUNDO EXTREMO" },
  { id: "impact", icon: "☄️", title: "IMPACTO DE ASTEROIDE", subtitle: "Cambia el tamaño y la velocidad del impacto.", accent: "#fb7185", badge: "NUEVO" },
];

const worlds = [
  { name: "Luna", gravity: 1.62, color: "#cbd5e1", ground: "#64748b" },
  { name: "Marte", gravity: 3.71, color: "#f97316", ground: "#9a3412" },
  { name: "Tierra", gravity: 9.81, color: "#38bdf8", ground: "#166534" },
  { name: "Neptuno", gravity: 11.15, color: "#3b82f6", ground: "#1e40af" },
  { name: "Júpiter", gravity: 24.79, color: "#d6a66f", ground: "#92400e" },
];

const panel = {
  marginTop: 18,
  borderRadius: 26,
  border: "1px solid rgba(255,255,255,.13)",
  background: "linear-gradient(180deg,rgba(15,23,42,.92),rgba(2,6,23,.96))",
  overflow: "hidden",
  boxShadow: "0 24px 70px rgba(0,0,0,.32)",
};

const slider = { width: "100%", accentColor: "#38bdf8", cursor: "pointer" };

export default function Laboratory() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("experiment");
    if (experiments.some((item) => item.id === requested)) setActive(requested);
  }, []);

  if (!active) {
    return (
      <section style={{ marginTop: 30 }}>
        <style>{animations}</style>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 15 }}>
          {experiments.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                position: "relative",
                minHeight: 220,
                overflow: "hidden",
                textAlign: "left",
                padding: 22,
                color: "white",
                cursor: "pointer",
                borderRadius: 24,
                border: `1px solid ${item.accent}55`,
                background: `radial-gradient(circle at 85% 15%,${item.accent}30,transparent 38%),linear-gradient(145deg,rgba(15,23,42,.72),rgba(2,6,23,.98))`,
                boxShadow: `inset 0 0 45px ${item.accent}0c,0 16px 35px rgba(0,0,0,.2)`,
              }}
            >
              <div style={{ position: "absolute", right: -20, bottom: -28, width: 115, height: 115, borderRadius: "50%", background: `${item.accent}12` }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: 42, filter: `drop-shadow(0 0 12px ${item.accent})` }}>{item.icon}</span>
                {item.badge && <span style={{ padding: "6px 8px", borderRadius: 20, fontSize: 9, fontWeight: 900, letterSpacing: 1, color: item.accent, border: `1px solid ${item.accent}66`, background: `${item.accent}14` }}>{item.badge}</span>}
              </div>
              <div style={{ marginTop: 20, fontSize: 11, opacity: .48, fontWeight: 900, letterSpacing: 1.6 }}>EXPERIMENTO {String(index + 1).padStart(2, "0")}</div>
              <div style={{ marginTop: 5, fontSize: 20, fontWeight: 950 }}>{item.title}</div>
              <p style={{ opacity: .7, lineHeight: 1.45, minHeight: 42 }}>{item.subtitle}</p>
              <div style={{ color: item.accent, fontSize: 11, fontWeight: 950, letterSpacing: 1 }}>ENTRAR AL SIMULADOR →</div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 18, padding: "17px 19px", borderRadius: 18, background: "linear-gradient(90deg,rgba(56,189,248,.10),rgba(168,85,247,.08))", border: "1px solid rgba(125,211,252,.16)", lineHeight: 1.55, fontSize: 14 }}>
          <b>🔬 REGLA DEL LABORATORIO:</b> toca, arrastra y experimenta. Aquí aprendes haciendo que el Universo cambie delante de ti.
        </div>
      </section>
    );
  }

  return (
    <section style={{ marginTop: 24 }}>
      <style>{animations}</style>
      <button onClick={() => setActive(null)} style={backButton}>← TODOS LOS EXPERIMENTOS</button>
      {active === "gravity" && <Gravity />}
      {active === "orbits" && <Orbits />}
      {active === "daynight" && <DayNight />}
      {active === "blackhole" && <BlackHole />}
      {active === "impact" && <Impact />}
    </section>
  );
}

function Gravity() {
  const [mass, setMass] = useState(40);
  const [worldIndex, setWorldIndex] = useState(2);
  const [jumpKey, setJumpKey] = useState(0);
  const world = worlds[worldIndex];
  const ratio = world.gravity / 9.81;
  const jumpHeight = Math.max(38, Math.min(205, 82 / ratio));
  const airTime = Math.max(.65, Math.min(2.4, 1.15 / Math.sqrt(ratio)));

  const discovery = world.name === "Tierra"
    ? "Estás en la Tierra: esta es nuestra referencia. El salto que ves representa un salto terrestre normal."
    : ratio < .5
      ? `¡Casi flotas! En ${world.name} puedes permanecer mucho más tiempo en el aire porque la gravedad es mucho menor que en la Tierra.`
      : ratio > 1.5
        ? `En ${world.name} la gravedad te pega al suelo. El mismo impulso apenas consigue levantarte.`
        : `En ${world.name} la gravedad es distinta a la terrestre y eso cambia la altura y duración del mismo salto.`;

  return <ExperimentShell icon="🧑‍🚀" number="01" title="SUPERGRAVEDAD" intro="Elige un mundo y pulsa SALTAR. Usamos siempre el mismo impulso para que veas de verdad cómo cambia el movimiento.">
    <Control label={`TU MASA · ${mass} kg`}><input type="range" min="20" max="100" value={mass} onChange={e => setMass(+e.target.value)} style={slider} /></Control>
    <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "14px 0 5px" }}>
      {worlds.map((w,i)=><button key={w.name} onClick={()=>{setWorldIndex(i);setJumpKey(k=>k+1)}} style={{ flex: "1 0 90px", padding: "12px 8px", borderRadius: 15, color: "white", fontWeight: 900, cursor: "pointer", border: i===worldIndex?`2px solid ${w.color}`:"1px solid rgba(255,255,255,.1)", background:i===worldIndex?`${w.color}22`:"rgba(255,255,255,.04)" }}>{w.name}</button>)}
    </div>
    <Stage height={385} background={`radial-gradient(circle at 50% 115%,${world.color}55,transparent 45%),linear-gradient(#020617,#0f172a)`}>
      <StarField />
      <div style={{ position:"absolute", left:15, top:15, padding:"8px 11px", borderRadius:12, background:"rgba(0,0,0,.5)", fontWeight:900 }}>SALTO EN {world.name.toUpperCase()}</div>
      <div style={{ position:"absolute", left:"50%", bottom:51, width:70, height:11, transform:"translateX(-50%)", borderRadius:"50%", background:"rgba(0,0,0,.55)", filter:"blur(3px)", animation:`labShadow ${airTime}s ease-in-out 1`, animationKey:jumpKey }} />
      <div key={jumpKey} style={{ position:"absolute", left:"50%", bottom:52, width:72, height:116, marginLeft:-36, transformOrigin:"50% 100%", "--jumpHeight":`${jumpHeight}px`, animation:`labHumanJump ${airTime}s cubic-bezier(.28,.72,.4,1) 1` }}>
        <AstronautFigure color={world.color}/>
      </div>
      <div style={{ position:"absolute", left:0,right:0,bottom:0,height:54,background:`linear-gradient(${world.color}66,${world.ground})`, borderTop:`2px solid ${world.color}99` }} />
      <div style={{ position:"absolute", right:15, top:15, textAlign:"right" }}><div style={{fontSize:10,opacity:.55}}>ALTURA VISUAL</div><b style={{fontSize:20,color:world.color}}>{Math.round(jumpHeight)} px</b></div>
    </Stage>
    <button onClick={()=>setJumpKey(k=>k+1)} style={{...actionButton,background:`linear-gradient(90deg,${world.color}55,rgba(255,255,255,.08))`}}>⬆ SALTAR</button>
    <Metrics items={[["GRAVEDAD",`${world.gravity} m/s²`],["TU PESO",`${(mass*world.gravity).toFixed(0)} N`],["TIEMPO DE SALTO",`${airTime.toFixed(1)} s visuales`]]}/>
    <Discovery>{discovery}</Discovery>
  </ExperimentShell>;
}

function AstronautFigure({color}) {
  return <div style={{position:"relative",width:"100%",height:"100%"}}>
    <div style={{position:"absolute",left:18,top:0,width:36,height:36,borderRadius:"50%",background:"linear-gradient(#f8fafc,#cbd5e1)",border:"3px solid white",boxShadow:`0 0 14px ${color}66`}}><div style={{position:"absolute",left:6,top:7,width:24,height:15,borderRadius:"45%",background:"linear-gradient(#0f172a,#38bdf8)",border:"1px solid #7dd3fc"}}/></div>
    <div style={{position:"absolute",left:20,top:34,width:32,height:45,borderRadius:"11px 11px 8px 8px",background:"linear-gradient(90deg,#e2e8f0,#fff,#cbd5e1)",border:"2px solid white"}}><div style={{position:"absolute",left:8,top:10,width:16,height:12,borderRadius:3,background:color,opacity:.7}}/></div>
    <div style={{position:"absolute",left:10,top:40,width:12,height:42,borderRadius:8,background:"#e2e8f0",transform:"rotate(28deg)",transformOrigin:"top"}}/><div style={{position:"absolute",right:10,top:40,width:12,height:42,borderRadius:8,background:"#e2e8f0",transform:"rotate(-28deg)",transformOrigin:"top"}}/>
    <div style={{position:"absolute",left:22,top:75,width:12,height:39,borderRadius:8,background:"#e2e8f0",transform:"rotate(8deg)",transformOrigin:"top"}}/><div style={{position:"absolute",right:22,top:75,width:12,height:39,borderRadius:8,background:"#e2e8f0",transform:"rotate(-8deg)",transformOrigin:"top"}}/>
  </div>
}

function Orbits() {
  const [distance,setDistance]=useState(1);
  const speed=29.78/Math.sqrt(distance), year=Math.pow(distance,1.5);
  const r=58+distance*35;
  const temp=Math.round(278/Math.sqrt(distance)-273);
  return <ExperimentShell icon="🪐" number="02" title="DOMINA UNA ÓRBITA" intro="Arrastra el planeta. Acercarlo al Sol lo hace viajar más rápido; alejarlo alarga su viaje.">
    <Control label={`DISTANCIA · ${distance.toFixed(2)} UA`}><input type="range" min=".35" max="2.3" step=".05" value={distance} onChange={e=>setDistance(+e.target.value)} style={slider}/><Scale left="🔥 Cerca" right="❄️ Lejos"/></Control>
    <Stage height={380} background="radial-gradient(circle at center,rgba(251,191,36,.08),rgba(2,6,23,.96) 65%)">
      <StarField />
      <div style={{ position:"absolute",left:"50%",top:"50%",width:72,height:72,transform:"translate(-50%,-50%)",borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#fff,#fde047 25%,#f59e0b 60%,#b45309)",boxShadow:"0 0 35px #f59e0b,0 0 80px rgba(245,158,11,.45)" }}/>
      <div style={{ position:"absolute",left:"50%",top:"50%",width:r*2,height:r*2,marginLeft:-r,marginTop:-r,borderRadius:"50%",border:"1px solid rgba(125,211,252,.4)" }}/>
      <div style={{ position:"absolute",left:"50%",top:"50%",width:r*2,height:r*2,marginLeft:-r,marginTop:-r,animation:`labOrbit ${Math.max(2.8,year*6)}s linear infinite` }}><div style={{ position:"absolute",left:"50%",top:-12,width:25,height:25,marginLeft:-12,borderRadius:"50%",background:"radial-gradient(circle at 30% 30%,#93c5fd,#2563eb 65%,#172554)",boxShadow:"0 0 15px #3b82f6" }}/></div>
      <div style={{position:"absolute",bottom:12,left:12,right:12,textAlign:"center",fontSize:10,opacity:.48}}>ÓRBITAS VISUALIZADAS A ESCALA EDUCATIVA</div>
    </Stage>
    <Metrics items={[["VELOCIDAD",`${speed.toFixed(1)} km/s`],["DURACIÓN DEL AÑO",year<1?`${Math.round(year*365)} días`:`${year.toFixed(2)} años`],["TENDENCIA TÉRMICA",temp>60?"MUY CALIENTE":temp<0?"MUY FRÍA":"TEMPLADA"]]}/>
    <Discovery>{distance<.7?"Has llevado el planeta muy cerca: recibe mucha más energía del Sol y se mueve a gran velocidad.":distance>1.5?"Aquí el Sol calienta mucho menos y el planeta tarda bastante más en completar su año.":"Estás cerca de la zona de la órbita terrestre. Sigue moviendo el planeta y compara."}</Discovery>
  </ExperimentShell>
}

function DayNight() {
  const [hours,setHours]=useState(24), [paused,setPaused]=useState(false);
  const duration=Math.max(1.4,Math.min(14,hours/5));
  return <ExperimentShell icon="🌗" number="03" title="FABRICA UN DÍA" intro="Acelera o frena el giro del planeta. Sigue la ciudad luminosa mientras entra y sale de la noche.">
    <Control label={`UN DÍA DURA · ${hours} HORAS`}><input type="range" min="4" max="80" value={hours} onChange={e=>setHours(+e.target.value)} style={slider}/><Scale left="⚡ Giro rápido" right="🐢 Giro lento"/></Control>
    <Stage height={390} background="radial-gradient(circle at 14% 50%,rgba(251,191,36,.22),transparent 32%),linear-gradient(90deg,#020617,#111827)">
      <StarField/><div style={{position:"absolute",left:-48,top:"50%",width:100,height:100,marginTop:-50,borderRadius:"50%",background:"#fde047",boxShadow:"0 0 45px #f59e0b,0 0 110px rgba(245,158,11,.5)"}}/>
      <div style={{position:"absolute",left:"50%",top:"50%",width:210,height:210,marginLeft:-105,marginTop:-105,borderRadius:"50%",overflow:"hidden",boxShadow:"0 0 30px rgba(59,130,246,.35)",animation:`labSpin ${duration}s linear infinite`,animationPlayState:paused?"paused":"running"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#38bdf8 0 46%,#020617 54% 100%)"}}/><div style={{position:"absolute",left:46,top:65,width:45,height:80,borderRadius:"55% 35% 45% 60%",background:"#22c55e",transform:"rotate(20deg)"}}/><div style={{position:"absolute",right:36,top:52,width:36,height:64,borderRadius:"45%",background:"#166534"}}/><div style={{position:"absolute",left:98,top:28,width:12,height:12,borderRadius:"50%",background:"#fff",boxShadow:"0 0 10px #fff"}}/>
      </div>
      <div style={{position:"absolute",left:"50%",top:24,bottom:24,width:1,background:"rgba(255,255,255,.18)"}}/><div style={{position:"absolute",left:18,bottom:18,fontWeight:900,color:"#fde68a"}}>☀️ DÍA</div><div style={{position:"absolute",right:18,bottom:18,fontWeight:900,color:"#93c5fd"}}>🌙 NOCHE</div>
    </Stage>
    <button onClick={()=>setPaused(v=>!v)} style={actionButton}>{paused?"▶ REANUDAR PLANETA":"⏸ CONGELAR PLANETA"}</button>
    <Metrics items={[["ROTACIÓN",`${hours} h`],["COMPARADA CON TIERRA",hours<24?"MÁS RÁPIDA":hours>24?"MÁS LENTA":"IGUAL"],["EN TU CIUDAD","DÍA → NOCHE → DÍA"]]}/>
    <Discovery>El Sol no “se apaga” por la noche. Es el planeta el que gira y lleva tu ciudad hacia la cara que queda de espaldas a su estrella.</Discovery>
  </ExperimentShell>
}

function BlackHole() {
  const [distance,setDistance]=useState(78);
  const proximity=100-distance;
  const ringScale=1+proximity/220, shipX=12+distance*.63, shipScale=Math.max(.55,1-proximity/190), stretch=1+proximity/90;
  const stageState=distance>65?"ESPACIO NORMAL":distance>38?"GRAVEDAD INTENSA":distance>16?"FUERZAS DE MAREA":"HORIZONTE";
  const discovery=distance>65?"A gran distancia, la nave puede mantenerse lejos de la zona más peligrosa.":distance>38?"La trayectoria de la luz empieza a curvarse de forma extrema en la visualización y la nave cae hacia una región cada vez más intensa.":distance>16?"Las fuerzas de marea crecen rápidamente: la gravedad tira con distinta intensidad de unas partes de la nave y de otras.":distance>5?"Estás peligrosamente cerca del horizonte de sucesos. Para un observador lejano, los efectos relativistas se vuelven enormes.":"Has cruzado el horizonte de sucesos en la simulación. Nada que esté dentro puede enviar una señal de vuelta al exterior.";
  return <ExperimentShell icon="🕳️" number="04 · MUNDO EXTREMO" title="ACÉRCATE A UN AGUJERO NEGRO" intro="Pilota una nave hacia el horizonte de sucesos. La escena se deforma cada vez más a medida que entras en una región de gravedad extrema.">
    <Control label={`DISTANCIA DE SEGURIDAD · ${distance}%`}><input type="range" min="0" max="100" value={distance} onChange={e=>setDistance(+e.target.value)} style={{...slider,accentColor:"#c084fc"}}/><Scale left="☠️ Horizonte" right="🚀 Lejos"/></Control>
    <Stage height={440} background="radial-gradient(circle at center,#111827 0,#030712 52%,#000 100%)">
      <div style={{position:"absolute",inset:0,transform:`scaleX(${1+proximity/240})`,filter:`blur(${proximity/80}px)`,transition:"all .25s"}}><StarField/></div>
      <div style={{position:"absolute",left:"50%",top:"50%",width:245*ringScale,height:96*ringScale,marginLeft:-122*ringScale,marginTop:-48*ringScale,borderRadius:"50%",border:`${10+proximity/12}px solid rgba(192,132,252,.72)`,boxShadow:`0 0 ${28+proximity}px rgba(168,85,247,.72), inset 0 0 ${20+proximity/2}px rgba(251,146,60,.38)`,transform:`rotate(-9deg) scaleY(${.48+proximity/400})`,transition:"all .25s"}}/>
      <div style={{position:"absolute",left:"50%",top:"50%",width:142,height:142,marginLeft:-71,marginTop:-71,borderRadius:"50%",background:"#000",boxShadow:"0 0 0 2px rgba(255,255,255,.05),0 0 45px #000"}}/>
      <div style={{position:"absolute",left:`${shipX}%`,top:"46%",fontSize:34,transform:`translate(-50%,-50%) scale(${shipScale}) scaleX(${stretch})`,filter:`drop-shadow(0 0 ${5+proximity/4}px #a78bfa)`,transition:"all .25s"}}>🚀</div>
      <div style={{position:"absolute",left:14,top:14,padding:"8px 10px",borderRadius:12,background:"rgba(0,0,0,.55)",fontSize:10,fontWeight:900,color:distance<20?"#fda4af":"#ddd6fe"}}>{stageState}</div>
      <div style={{position:"absolute",left:"50%",bottom:13,transform:"translateX(-50%)",fontSize:10,opacity:.45}}>REPRESENTACIÓN EDUCATIVA · EFECTOS VISUALES EXAGERADOS</div>
    </Stage>
    <Metrics items={[["FUERZAS DE MAREA",proximity<30?"BAJAS":proximity<60?"CRECIENDO":proximity<85?"EXTREMAS":"CRÍTICAS"],["DILATACIÓN TEMPORAL",proximity<35?"PEQUEÑA":proximity<70?"FUERTE":"EXTREMA"],["ESTADO",distance<6?"HORIZONTE CRUZADO":distance<20?"JUNTO AL HORIZONTE":"LEJOS"]]}/>
    <Discovery>{discovery}</Discovery><ScienceNote>Representación educativa: exageramos visualmente la deformación para que el fenómeno sea comprensible. La forma exacta depende de la masa y rotación del agujero negro y de la trayectoria del observador.</ScienceNote>
  </ExperimentShell>
}

function Impact() {
  const [diameter,setDiameter]=useState(70),[speed,setSpeed]=useState(20),[impactKey,setImpactKey]=useState(0),[launched,setLaunched]=useState(true);
  const power=(diameter/70)**3*(speed/20)**2;
  const crater=Math.round(70+115*Math.pow(power,.27)), wave=Math.round(100+190*Math.pow(power,.31));
  const result=power<.55?"IMPACTO PEQUEÑO":power<2.4?"IMPACTO LOCAL":power<9?"IMPACTO REGIONAL":"IMPACTO CATASTRÓFICO";
  const discovery=power<.55?"El cráter es pequeño y la onda expansiva alcanza una zona limitada. Aumenta el diámetro o la velocidad y vuelve a lanzar.":power<2.4?"El impacto ya excava un cráter mucho mayor y la onda expansiva cubre una zona claramente más amplia.":power<9?"La onda de choque recorre una gran superficie y el cráter crece de forma muy visible. La energía aumenta con enorme rapidez.":"Has creado un impacto extremo: el cráter domina la zona de choque y la onda expansiva se extiende muy lejos del punto de impacto.";
  function launch(){setLaunched(false);requestAnimationFrame(()=>{setImpactKey(k=>k+1);setLaunched(true)})}
  return <ExperimentShell icon="☄️" number="05" title="IMPACTO DE ASTEROIDE" intro="Lanza el asteroide y observa el terreno después del choque. El cráter final y la onda expansiva cambian con el tamaño y la velocidad.">
    <Control label={`DIÁMETRO · ${diameter} m`}><input type="range" min="15" max="250" value={diameter} onChange={e=>{setDiameter(+e.target.value);setLaunched(false)}} style={{...slider,accentColor:"#fb7185"}}/><Scale left="15 m" right="250 m"/></Control>
    <Control label={`VELOCIDAD · ${speed} km/s`}><input type="range" min="8" max="45" value={speed} onChange={e=>{setSpeed(+e.target.value);setLaunched(false)}} style={{...slider,accentColor:"#fb7185"}}/><Scale left="8 km/s" right="45 km/s"/></Control>
    <Stage height={450} background="linear-gradient(#081426 0 54%,#31251f 55% 67%,#4a2b1b 68%)">
      <StarField/><div style={{position:"absolute",left:0,right:0,top:"54%",height:2,background:"#fda4af55"}}/>
      {launched&&<div key={`meteor-${impactKey}`} style={{position:"absolute",left:"8%",top:"5%",fontSize:Math.min(55,24+diameter/9),filter:"drop-shadow(0 0 12px #fb7185)",animation:"labMeteor 1.15s cubic-bezier(.65,.05,.95,.5) forwards"}}>☄️</div>}
      {launched&&<div key={`flash-${impactKey}`} style={{position:"absolute",left:"50%",top:"55%",width:25,height:25,marginLeft:-12,marginTop:-12,borderRadius:"50%",background:"#fff7ed",boxShadow:`0 0 ${Math.min(150,35+power*9)}px ${Math.min(80,12+power*4)}px #fb923c`,animation:"labFlash 1.5s ease-out forwards"}}/>}
      {launched&&<div key={`wave-${impactKey}`} style={{position:"absolute",left:"50%",top:"55%",width:30,height:14,marginLeft:-15,borderRadius:"50%",border:"3px solid #fdba74",boxShadow:"0 0 18px #fb923c",animation:`labShock 1.8s ease-out forwards`,"--waveScale":Math.min(14,wave/32)}}/>}
      <div style={{position:"absolute",left:"50%",top:"55%",width:Math.min(330,crater),height:Math.min(105,crater*.28),marginLeft:-Math.min(330,crater)/2,borderRadius:"0 0 50% 50%",background:"radial-gradient(ellipse at top,#120806,#29140f 42%,#5b321f)",boxShadow:`inset 0 10px 20px #000,0 -3px 10px #fb923c44`,transform:`scaleY(${launched?1:.25})`,transformOrigin:"top",transition:"transform .35s"}}/>
      {launched&&Array.from({length:10}).map((_,i)=><span key={`${impactKey}-d-${i}`} style={{position:"absolute",left:"50%",top:"54%",width:5+(i%3)*3,height:5+(i%3)*3,borderRadius:"50%",background:i%2?"#78350f":"#a16207",animation:`labDebris ${.8+(i%4)*.18}s ease-out forwards`,"--dx":`${(i-5)*(18+Math.min(20,power))}px`,"--dy":`${-45-(i%5)*18-Math.min(80,power*5)}px`}}/>)}
      <div style={{position:"absolute",left:14,bottom:14,padding:"8px 10px",borderRadius:12,background:"rgba(0,0,0,.55)",fontSize:10,fontWeight:900,color:"#fecdd3"}}>{result}</div>
    </Stage>
    <button onClick={launch} style={{...actionButton,background:"linear-gradient(90deg,rgba(251,113,133,.35),rgba(249,115,22,.25))"}}>☄️ LANZAR ASTEROIDE</button>
    <Metrics items={[["CRÁTER ESTIMADO",`${crater} m · diámetro visual relativo`],["ONDA EXPANSIVA",`${wave} m · radio educativo`],["ENERGÍA RELATIVA",`${power.toFixed(1)}× respecto al ajuste inicial`],["RESULTADO",`${result} · clasificación educativa`]]}/>
    <Discovery>{discovery}</Discovery><ScienceNote>Modelo educativo simplificado: el tamaño real del cráter y la onda expansiva dependen también de densidad, ángulo de entrada, terreno, atmósfera y composición del asteroide.</ScienceNote>
  </ExperimentShell>
}

function ExperimentShell({icon,number,title,intro,children}) {return <div style={panel}><div style={{padding:"24px 24px 18px",borderBottom:"1px solid rgba(255,255,255,.08)"}}><div style={{fontSize:38}}>{icon}</div><div style={{fontSize:10,opacity:.5,fontWeight:900,letterSpacing:1.7}}>EXPERIMENTO {number}</div><h2 style={{fontSize:"clamp(25px,5vw,38px)",margin:"6px 0 8px"}}>{title}</h2><p style={{opacity:.7,lineHeight:1.55,margin:0}}>{intro}</p></div><div style={{padding:24}}>{children}</div></div>}
function Control({label,children}) {return <div style={{marginBottom:15,padding:16,borderRadius:17,background:"rgba(255,255,255,.045)",border:"1px solid rgba(255,255,255,.08)"}}><div style={{fontSize:11,fontWeight:900,letterSpacing:1.1,marginBottom:11}}>{label}</div>{children}</div>}
function Scale({left,right}) {return <div style={{display:"flex",justifyContent:"space-between",fontSize:10,opacity:.48,marginTop:6}}><span>{left}</span><span>{right}</span></div>}
function Stage({height,background,children}) {return <div style={{position:"relative",height,overflow:"hidden",borderRadius:22,margin:"18px 0",background,border:"1px solid rgba(255,255,255,.1)"}}>{children}</div>}
function Metrics({items}) {return <div style={{display:"grid",gridTemplateColumns:`repeat(${Math.min(items.length,4)},minmax(0,1fr))`,gap:8,marginTop:13}}>{items.map(([label,value])=><div key={label} style={{padding:"13px 8px",textAlign:"center",borderRadius:14,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.07)",minWidth:0}}><div style={{fontSize:9,opacity:.5,fontWeight:900}}>{label}</div><div style={{marginTop:5,fontWeight:950,fontSize:14,overflowWrap:"anywhere"}}>{value}</div></div>)}</div>}
function Discovery({children}) {return <div style={{marginTop:15,padding:16,borderRadius:16,background:"rgba(168,85,247,.1)",border:"1px solid rgba(192,132,252,.2)",lineHeight:1.55}}><b>🔎 HAS DESCUBIERTO:</b> {children}</div>}
function ScienceNote({children}) {return <div style={{marginTop:10,padding:"12px 14px",borderRadius:14,background:"rgba(255,255,255,.035)",border:"1px solid rgba(255,255,255,.07)",fontSize:11,lineHeight:1.55,opacity:.62}}><b>NOTA CIENTÍFICA · </b>{children}</div>}
function StarField(){return <>{Array.from({length:26}).map((_,i)=><i key={i} style={{position:"absolute",left:`${(i*37)%97}%`,top:`${(i*53)%89}%`,width:i%4===0?2:1,height:i%4===0?2:1,borderRadius:"50%",background:"white",opacity:.35+(i%5)*.1}}/>)}</>}
const backButton={padding:"10px 14px",borderRadius:13,border:"1px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.05)",color:"white",fontWeight:900,fontSize:11,cursor:"pointer",marginBottom:15};
const actionButton={width:"100%",padding:14,borderRadius:15,border:"1px solid rgba(255,255,255,.15)",background:"linear-gradient(90deg,rgba(168,85,247,.25),rgba(56,189,248,.18))",color:"white",fontWeight:950,cursor:"pointer"};
const animations=`
@keyframes labOrbit{to{transform:rotate(360deg)}}
@keyframes labSpin{to{transform:rotate(360deg)}}
@keyframes labHumanJump{0%,100%{transform:translateY(0) rotate(0)}15%{transform:translateY(calc(var(--jumpHeight)*-.35)) rotate(-2deg)}50%{transform:translateY(calc(var(--jumpHeight)*-1)) rotate(2deg)}85%{transform:translateY(calc(var(--jumpHeight)*-.35)) rotate(-1deg)}}
@keyframes labShadow{0%,100%{transform:translateX(-50%) scale(1);opacity:.55}50%{transform:translateX(-50%) scale(.5);opacity:.2}}
@keyframes labMeteor{0%{transform:translate(-80px,-80px) rotate(-25deg);opacity:0}8%{opacity:1}100%{left:50%;top:55%;transform:translate(-50%,-50%) rotate(-25deg);opacity:1}}
@keyframes labFlash{0%,68%{transform:scale(.15);opacity:0}72%{transform:scale(1);opacity:1}100%{transform:scale(6);opacity:0}}
@keyframes labShock{0%,68%{transform:scale(.1);opacity:0}72%{opacity:1}100%{transform:scale(var(--waveScale));opacity:0}}
@keyframes labDebris{0%,68%{transform:translate(0,0);opacity:0}72%{opacity:1}100%{transform:translate(var(--dx),var(--dy));opacity:0}}
`;
