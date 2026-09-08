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
  </ExperimentShell>;
}

function DayNight(){
  const [hours,setHours]=useState(24),[angle,setAngle]=useState(0),[paused,setPaused]=useState(false);
  useEffect(()=>{if(paused)return;const id=setInterval(()=>setAngle(a=>(a+3*(24/hours))%360),40);return()=>clearInterval(id)},[hours,paused]);
  const x=50+Math.cos(angle*Math.PI/180)*40;
  const phase=x<25?"NOCHE":x<48?"AMANECER":x<75?"DÍA":"MEDIODÍA";
  return <ExperimentShell icon="🌗" number="03" title="FABRICA UN DÍA" intro="Acelera o frena el giro del planeta. Sigue la ciudad luminosa mientras entra y sale de la noche.">
    <Control label={`UN DÍA DURA · ${hours} HORAS`}><input type="range" min="5" max="80" value={hours} onChange={e=>setHours(+e.target.value)} style={slider}/><Scale left="⚡ Giro rápido" right="🐢 Giro lento"/></Control>
    <Stage height={360} background="linear-gradient(90deg,rgba(251,191,36,.13),rgba(2,6,23,.94) 68%)">
      <div style={{position:"absolute",left:-65,top:"50%",width:130,height:130,marginTop:-65,borderRadius:"50%",background:"#fbbf24",boxShadow:"0 0 60px #f59e0b,0 0 130px rgba(245,158,11,.4)"}}/>
      <div style={{position:"absolute",left:"54%",top:"50%",width:205,height:205,transform:"translate(-50%,-50%)",borderRadius:"50%",overflow:"hidden",background:"linear-gradient(90deg,#22d3ee,#2563eb 46%,#111827 53%,#020617)",boxShadow:"-20px 0 50px rgba(56,189,248,.22),20px 0 45px #000"}}>
        <div style={{position:"absolute",left:`${x}%`,top:"47%",width:14,height:14,borderRadius:"50%",background:"white",boxShadow:"0 0 13px white",transition:"left 40ms linear"}}/>
        <div style={{position:"absolute",left:"12%",top:"22%",fontSize:28,opacity:.6}}>☁</div><div style={{position:"absolute",left:"30%",top:"65%",fontSize:22,opacity:.5}}>☁</div>
      </div>
      <div style={{position:"absolute",top:18,right:18,padding:"9px 12px",borderRadius:13,background:"rgba(0,0,0,.5)",fontWeight:950,color:phase==="NOCHE"?"#93c5fd":"#fde68a"}}>📍 {phase}</div>
    </Stage>
    <button onClick={()=>setPaused(p=>!p)} style={actionButton}>{paused?"▶ REANUDAR PLANETA":"⏸ CONGELAR PLANETA"}</button>
    <Metrics items={[["ROTACIÓN",`${hours} h`],["COMPARADA CON TIERRA",hours<24?"MÁS RÁPIDA":hours>24?"MÁS LENTA":"IGUAL"],["EN TU CIUDAD",phase]]}/>
    <Discovery>El Sol no “se apaga” por la noche. Es el planeta el que gira y lleva tu ciudad hacia la cara que queda de espaldas a su estrella.</Discovery>
  </ExperimentShell>
}

function BlackHole(){
  const [distance,setDistance]=useState(100);
  const danger=100-distance;
  const proximity=danger/100;
  const holeSize=100+proximity*72;
  const shipLeft=10+proximity*39;
  const shipScale=1+proximity*.45;
  const shipStretch=distance<35?1+(35-distance)/18:1;
  const timeFactor=1/Math.sqrt(Math.max(.06,1-danger/106));
  const zone=distance>70?"ESPACIO NORMAL":distance>45?"GRAVEDAD INTENSA":distance>20?"FUERZAS DE MAREA":distance>8?"JUNTO AL HORIZONTE":"HORIZONTE CRUZADO";
  const zoneColor=distance>70?"#7dd3fc":distance>45?"#c084fc":distance>20?"#fb923c":"#fb7185";

  return <ExperimentShell icon="🕳️" number="04 · MUNDO EXTREMO" title="ACÉRCATE A UN AGUJERO NEGRO" intro="Pilota una nave hacia el horizonte de sucesos. La escena se deforma cada vez más a medida que entras en una región de gravedad extrema.">
    <Control label={`DISTANCIA DE SEGURIDAD · ${distance}%`}><input type="range" min="3" max="100" value={distance} onChange={e=>setDistance(+e.target.value)} style={{...slider,accentColor:zoneColor}}/><Scale left="☠ HORIZONTE" right="🚀 LEJOS"/></Control>
    <Stage height={455} background={`radial-gradient(circle at 68% 50%,rgba(168,85,247,${.10+proximity*.23}) 0%,#090313 38%,#020617 78%)`}>
      <StarField distorted={danger}/>
      {[0,1,2,3].map(i=><div key={i} style={{position:"absolute",left:"68%",top:"50%",width:holeSize+110+i*42,height:(holeSize+110+i*42)*.44,marginLeft:-(holeSize+110+i*42)/2,marginTop:-(holeSize+110+i*42)*.22,borderRadius:"50%",border:`${1+i*.3}px solid rgba(${i%2?"249,115,22":"192,132,252"},${.22+proximity*.15})`,transform:`rotate(${-13+i*9}deg)`,animation:`labDisk ${5-i*.65}s linear infinite`,filter:`blur(${i*.35}px)`}}/>)}
      <div style={{position:"absolute",left:"68%",top:"50%",width:holeSize+120,height:(holeSize+120)*.29,marginLeft:-(holeSize+120)/2,marginTop:-(holeSize+120)*.145,borderRadius:"50%",background:"linear-gradient(90deg,transparent,#7c2d12,#f97316,#fff7ed,#f97316,#7c2d12,transparent)",boxShadow:`0 0 ${30+proximity*35}px #f97316,0 0 ${70+proximity*55}px rgba(168,85,247,.55)`,filter:"blur(2px)",transform:"rotate(-10deg)",animation:"labDiskGlow 2.5s ease-in-out infinite"}}/>
      <div style={{position:"absolute",left:"68%",top:"50%",width:holeSize+22,height:holeSize+22,marginLeft:-(holeSize+22)/2,marginTop:-(holeSize+22)/2,borderRadius:"50%",border:`${5+proximity*5}px solid rgba(255,255,255,${.25+proximity*.35})`,boxShadow:`0 0 ${25+proximity*35}px white,0 0 ${65+proximity*55}px #a855f7`,animation:"labPhotonRing 1.6s ease-in-out infinite"}}/>
      <div style={{position:"absolute",left:"68%",top:"50%",width:holeSize,height:holeSize,marginLeft:-holeSize/2,marginTop:-holeSize/2,borderRadius:"50%",background:"radial-gradient(circle,#000 0%,#000 72%,#05000a 100%)",boxShadow:"inset 0 0 30px #000,0 0 12px #000"}}/>
      {[0,1,2,3,4].map(i=><div key={`ray-${i}`} style={{position:"absolute",left:`${18+i*8}%`,top:`${24+i*11}%`,width:`${28+proximity*30}%`,height:1,background:`linear-gradient(90deg,rgba(125,211,252,.0),rgba(125,211,252,${.1+proximity*.25}),transparent)`,transform:`rotate(${(-12+i*6)*(1+proximity)}deg)`,transformOrigin:"right",filter:`blur(${proximity*1.4}px)`}}/>)}
      <div style={{position:"absolute",left:`${shipLeft}%`,top:"50%",transform:`translate(-50%,-50%) scale(${shipScale}) scaleX(${shipStretch}) rotate(${proximity*7}deg)`,transition:"all .22s ease-out",fontSize:42,filter:`drop-shadow(-${10+proximity*24}px 0 ${5+proximity*8}px #38bdf8) drop-shadow(0 0 8px white)`,opacity:distance<6?.18:1}}>🚀</div>
      <div style={{position:"absolute",left:`${Math.max(5,shipLeft-16)}%`,top:"50%",width:`${8+proximity*14}%`,height:3,marginTop:-1,background:"linear-gradient(90deg,transparent,#38bdf8,#fff)",filter:"blur(2px)",opacity:.45+proximity*.45,transition:"all .2s"}}/>
      <div style={{position:"absolute",left:15,top:15,padding:"9px 12px",borderRadius:12,background:"rgba(0,0,0,.62)",fontSize:11,fontWeight:950,letterSpacing:1,color:zoneColor,border:`1px solid ${zoneColor}55`}}>● {zone}</div>
      {distance<22&&<div style={{position:"absolute",left:0,right:0,bottom:24,textAlign:"center",fontSize:distance<9?18:13,fontWeight:950,color:"#fb7185",animation:"labPulse .65s infinite"}}>{distance<9?"⚠ HORIZONTE DE SUCESOS: NO HAY REGRESO":"⚠ FUERZAS DE MAREA EXTREMAS"}</div>}
    </Stage>
    <Metrics items={[["FUERZAS DE MAREA",distance>70?"BAJAS":distance>45?"CRECIENDO":distance>20?"EXTREMAS":"CRÍTICAS"],["DILATACIÓN TEMPORAL",`≈ ${timeFactor.toFixed(1)}×`],["ESTADO",zone]]}/>
    <Discovery>{distance>70?"A gran distancia, la nave puede mantenerse lejos de la zona más peligrosa.":distance>45?"La trayectoria de la luz empieza a curvarse de forma extrema en la visualización y la nave cae hacia una región cada vez más intensa.":distance>20?"Las fuerzas de marea crecen rápidamente: la gravedad tira con distinta intensidad de unas partes de la nave y de otras.":distance>8?"Estás peligrosamente cerca del horizonte de sucesos. Para un observador lejano, los efectos relativistas se vuelven enormes.":"Has cruzado el horizonte de sucesos en la simulación. Nada que esté dentro puede enviar una señal de vuelta al exterior."}</Discovery>
    <Note>Representación educativa: exageramos visualmente la deformación para que el fenómeno sea comprensible. La forma exacta depende de la masa y rotación del agujero negro y de la trayectoria del observador.</Note>
  </ExperimentShell>
}

function Impact(){
  const [diameter,setDiameter]=useState(35),[speed,setSpeed]=useState(20),[impactKey,setImpactKey]=useState(0),[launched,setLaunched]=useState(false);
  const normalizedSize=(diameter-5)/145;
  const normalizedSpeed=(speed-11)/39;
  const energyScore=Math.pow(diameter/35,3)*Math.pow(speed/20,2);
  const intensity=Math.min(1,Math.log10(1+energyScore)/1.8);
  const asteroidSize=24+normalizedSize*74;
  const craterDiameter=Math.round(45+Math.min(355,Math.pow(energyScore,.32)*92));
  const craterWidth=Math.min(340,56+Math.pow(energyScore,.3)*92);
  const craterDepth=Math.min(95,18+Math.pow(energyScore,.28)*24);
  const blastRadius=Math.round(90+Math.min(990,Math.pow(energyScore,.36)*210));
  const waveScale=Math.min(4.2,1.2+Math.pow(energyScore,.22));
  const flashSize=Math.min(420,80+Math.pow(energyScore,.28)*120);
  const level=energyScore<.35?"IMPACTO PEQUEÑO":energyScore<1.3?"IMPACTO LOCAL":energyScore<5?"IMPACTO REGIONAL":"IMPACTO CATASTRÓFICO";
  const levelColor=energyScore<.35?"#fde68a":energyScore<1.3?"#fb923c":energyScore<5?"#fb7185":"#ef4444";

  useEffect(()=>{setLaunched(false)},[diameter,speed]);
  const launch=()=>{setLaunched(false);setImpactKey(k=>k+1);requestAnimationFrame(()=>requestAnimationFrame(()=>setLaunched(true)))};

  return <ExperimentShell icon="☄️" number="05" title="IMPACTO DE ASTEROIDE" intro="Lanza el asteroide y observa el terreno después del choque. El cráter final y la onda expansiva cambian con el tamaño y la velocidad.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:10}}>
      <Control label={`DIÁMETRO · ${diameter} m`}><input type="range" min="5" max="150" value={diameter} onChange={e=>setDiameter(+e.target.value)} style={{...slider,accentColor:"#fb7185"}}/><Scale left="🚗 5 m" right="🏢 150 m"/></Control>
      <Control label={`VELOCIDAD · ${speed} km/s`}><input type="range" min="11" max="50" value={speed} onChange={e=>setSpeed(+e.target.value)} style={{...slider,accentColor:"#fb7185"}}/><Scale left="11 km/s" right="50 km/s ⚡"/></Control>
    </div>

    <Stage height={460} background="linear-gradient(#020617 0%,#0f172a 42%,#1d4ed8 43%,#0f766e 60%,#14532d 61%,#052e16 100%)">
      <StarField />
      <div style={{position:"absolute",left:0,right:0,bottom:0,height:180,background:"linear-gradient(#166534,#14532d 42%,#3f3f46 43%,#292524 100%)",zIndex:1}}/>
      <div style={{position:"absolute",left:"50%",bottom:142,width:520,height:90,marginLeft:-260,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(74,222,128,.42),rgba(22,101,52,.16) 58%,transparent 72%)",zIndex:2}}/>

      <div key={`asteroid-${impactKey}`} style={{position:"absolute",left:launched?"52%":"8%",top:launched?"58%":"7%",width:asteroidSize,height:asteroidSize,borderRadius:"48% 52% 45% 55%",background:"radial-gradient(circle at 35% 30%,#a8a29e,#57534e 45%,#292524 78%)",boxShadow:`-${16+normalizedSpeed*35}px -${10+normalizedSpeed*24}px ${10+normalizedSpeed*22}px rgba(249,115,22,${.45+normalizedSpeed*.5}),0 0 ${8+normalizedSize*16}px rgba(255,255,255,.25)`,transform:`translate(-50%,-50%) rotate(${launched?540:25}deg)`,transition:launched?`left ${1.08-normalizedSpeed*.44}s cubic-bezier(.65,.02,.9,.5), top ${1.08-normalizedSpeed*.44}s cubic-bezier(.65,.02,.9,.5), transform ${1.08-normalizedSpeed*.44}s linear`:"none",opacity:launched?.02:1,zIndex:7}}>
        <div style={{position:"absolute",left:"18%",top:"20%",width:"20%",height:"16%",borderRadius:"50%",background:"#292524",opacity:.8}}/>
        <div style={{position:"absolute",right:"15%",bottom:"25%",width:"28%",height:"20%",borderRadius:"50%",background:"#1c1917",opacity:.75}}/>
      </div>
      <div style={{position:"absolute",left:launched?"18%":"2%",top:launched?"24%":"3%",width:launched?"34%":"8%",height:7,background:`linear-gradient(90deg,transparent,rgba(249,115,22,${.45+normalizedSpeed*.5}),#fff7ed)`,filter:`blur(${2+normalizedSpeed*4}px)`,transform:"rotate(33deg)",transformOrigin:"right",transition:launched?`all ${.9-normalizedSpeed*.3}s ease-in`:"none",opacity:launched?.9:.25,zIndex:6}}/>

      {launched&&<>
        <div style={{position:"absolute",left:"52%",top:"58%",width:flashSize,height:flashSize,marginLeft:-flashSize/2,marginTop:-flashSize/2,borderRadius:"50%",background:"radial-gradient(circle,#fff 0%,#fde047 16%,#f97316 38%,rgba(239,68,68,.48) 55%,transparent 72%)",boxShadow:`0 0 ${40+flashSize*.2}px #f97316`,animation:"labImpactFlash 1.1s ease-out forwards",zIndex:9}}/>

        {[0,1,2].map(i=><div key={`wave-${i}`} style={{position:"absolute",left:"52%",top:"62%",width:110+i*28,height:38+i*10,marginLeft:-(55+i*14),marginTop:-(19+i*5),borderRadius:"50%",border:`${4-i}px solid rgba(${i===0?"255,245,200":"255,160,80"},${.95-i*.18})`,boxShadow:`0 0 ${15+i*6}px rgba(255,180,80,.65)`,"--waveScale":waveScale+i*.35,animation:`labGroundWave ${1.3+i*.25}s ease-out ${i*.1}s forwards`,zIndex:8}}/>)}

        <div style={{position:"absolute",left:"52%",top:"65%",width:craterWidth,height:craterDepth*2.1,marginLeft:-craterWidth/2,marginTop:-craterDepth,borderRadius:"50%",background:"radial-gradient(ellipse at 50% 38%,#050505 0%,#1c1917 37%,#451a03 57%,#78350f 69%,#a16207 75%,transparent 78%)",boxShadow:`inset 0 ${craterDepth*.35}px ${craterDepth*.5}px #000,inset 0 -${craterDepth*.22}px ${craterDepth*.35}px rgba(245,158,11,.38),0 0 ${16+intensity*28}px rgba(249,115,22,.42)`,animation:"labCraterFinal .95s ease-out forwards",zIndex:5}}/>
        <div style={{position:"absolute",left:"52%",top:"65%",width:craterWidth*1.22,height:craterDepth*2.45,marginLeft:-(craterWidth*1.22)/2,marginTop:-(craterDepth*1.22),borderRadius:"50%",border:`${4+intensity*7}px solid rgba(120,53,15,.85)`,boxShadow:`0 0 0 ${4+intensity*6}px rgba(217,119,6,.22)`,animation:"labCraterRim .9s ease-out forwards",zIndex:4}}/>

        {[0,1,2,3].map(i=><div key={`dust-${i}`} style={{position:"absolute",left:`${46+i*4}%`,top:"61%",width:18+intensity*25,height:110+intensity*115,borderRadius:"50%",background:`linear-gradient(rgba(251,146,60,${.55-i*.08}),rgba(120,53,15,.28),transparent)`,filter:`blur(${5+i}px)`,transform:`rotate(${-18+i*12}deg)`,transformOrigin:"bottom",animation:`labDebris ${1.5+i*.18}s ease-out forwards`,zIndex:7}}/>)}

        <div style={{position:"absolute",left:0,right:0,bottom:8,textAlign:"center",zIndex:11}}>
          <div style={{display:"inline-block",padding:"9px 13px",borderRadius:14,background:"rgba(0,0,0,.66)",border:`1px solid ${levelColor}66`,color:levelColor,fontWeight:950,fontSize:15}}>💥 {level}</div>
        </div>
        <div style={{position:"absolute",inset:0,background:`rgba(255,245,220,${.12+intensity*.28})`,animation:"labScreenFlash .75s ease-out forwards",pointerEvents:"none",zIndex:10}}/>
      </>}
    </Stage>

    <button onClick={launch} style={{...actionButton,background:"linear-gradient(90deg,#be123c,#ea580c)",border:"1px solid #fb718566"}}>☄️ LANZAR ASTEROIDE</button>

    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:9,marginTop:13}}>
      <MetricCard title="CRÁTER ESTIMADO" value={`≈ ${craterDiameter} m`} detail="diámetro visual relativo" />
      <MetricCard title="ONDA EXPANSIVA" value={`≈ ${blastRadius} m`} detail="radio educativo" />
      <MetricCard title="ENERGÍA RELATIVA" value={`${energyScore.toFixed(1)}×`} detail="respecto al ajuste inicial" />
      <MetricCard title="RESULTADO" value={level} detail="clasificación educativa" />
    </div>

    <Discovery>{energyScore<.35?"El cráter es pequeño y la onda expansiva alcanza una zona limitada. Aumenta el diámetro o la velocidad y vuelve a lanzar.":energyScore<1.3?"El impacto ya excava un cráter mucho mayor y la onda expansiva cubre una zona claramente más amplia.":energyScore<5?"La onda de choque recorre una gran superficie y el cráter crece de forma muy visible. La energía aumenta con enorme rapidez.":"Has creado un impacto extremo: el cráter domina la zona de choque y la onda expansiva se extiende muy lejos del punto de impacto."}</Discovery>
    <Note>Modelo educativo simplificado: el tamaño real del cráter y la onda expansiva dependen también de densidad, ángulo de entrada, terreno, atmósfera y composición del asteroide.</Note>
  </ExperimentShell>
}

function MetricCard({title,value,detail}){return <div style={{padding:13,borderRadius:15,background:"rgba(249,115,22,.08)",border:"1px solid rgba(251,146,60,.16)"}}><div style={{fontSize:9,fontWeight:950,letterSpacing:1,opacity:.52}}>{title}</div><div style={{fontSize:17,fontWeight:950,marginTop:5}}>{value}</div><div style={{fontSize:10,opacity:.5,marginTop:4}}>{detail}</div></div>}
function ExperimentShell({icon,number,title,intro,children}){return <div style={panel}><div style={{padding:"25px 22px 18px",background:"radial-gradient(circle at 90% 0%,rgba(56,189,248,.10),transparent 40%)"}}><div style={{fontSize:42}}>{icon}</div><div style={{marginTop:8,fontSize:10,letterSpacing:2,fontWeight:950,color:"#7dd3fc"}}>EXPERIMENTO {number}</div><h2 style={{fontSize:"clamp(27px,6vw,42px)",margin:"6px 0 8px"}}>{title}</h2><p style={{maxWidth:700,margin:0,lineHeight:1.55,opacity:.74}}>{intro}</p></div><div style={{padding:"0 22px 25px"}}>{children}</div></div>}
function Control({label,children}){return <div style={{padding:15,borderRadius:17,background:"rgba(255,255,255,.045)",border:"1px solid rgba(255,255,255,.08)"}}><div style={{fontSize:11,fontWeight:950,letterSpacing:1.1,marginBottom:10}}>{label}</div>{children}</div>}
function Scale({left,right}){return <div style={{display:"flex",justifyContent:"space-between",fontSize:10,opacity:.55,marginTop:5}}><span>{left}</span><span>{right}</span></div>}
function Stage({height,background,children}){return <div style={{position:"relative",height,marginTop:14,borderRadius:22,overflow:"hidden",background,border:"1px solid rgba(255,255,255,.09)",boxShadow:"inset 0 0 50px rgba(0,0,0,.25)"}}>{children}</div>}
function Metrics({items}){return <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(135px,1fr))",gap:9,marginTop:13}}>{items.map(([a,b])=><div key={a} style={{padding:13,borderRadius:15,background:"rgba(14,165,233,.08)",border:"1px solid rgba(56,189,248,.13)"}}><div style={{fontSize:9,fontWeight:950,letterSpacing:1,opacity:.52}}>{a}</div><div style={{fontSize:17,fontWeight:950,marginTop:5}}>{b}</div></div>)}</div>}
function Discovery({children}){return <div style={{marginTop:14,padding:"15px 16px",borderRadius:16,background:"linear-gradient(90deg,rgba(34,197,94,.09),rgba(14,165,233,.06))",border:"1px solid rgba(74,222,128,.16)",fontSize:13,lineHeight:1.55}}><b style={{color:"#86efac"}}>✦ HAS DESCUBIERTO</b><div style={{marginTop:5,opacity:.84}}>{children}</div></div>}
function Note({children}){return <div style={{marginTop:10,fontSize:11,lineHeight:1.5,opacity:.5}}>ℹ️ {children}</div>}
function StarField({distorted=0}){return <>{[12,25,39,67,78,88,18,54,93].map((x,i)=><i key={`${x}-${i}`} style={{position:"absolute",left:`${x}%`,top:`${9+(i*17)%78}%`,width:2+distorted/70,height:2+distorted/28,borderRadius:"50%",background:"white",boxShadow:"0 0 5px white",transform:`rotate(${i*31}deg)`,opacity:.45+(i%3)*.18}}/>)}</>}

const backButton={color:"white",background:"transparent",border:0,padding:"10px 0",cursor:"pointer",fontWeight:950,fontSize:11,letterSpacing:1,opacity:.82};
const actionButton={marginTop:12,width:"100%",minHeight:50,borderRadius:15,border:"1px solid rgba(255,255,255,.15)",background:"rgba(255,255,255,.07)",color:"white",cursor:"pointer",fontWeight:950,letterSpacing:.8};
const animations=`
@keyframes labOrbit{to{transform:rotate(360deg)}}
@keyframes labPulse{50%{opacity:.3;transform:scale(.98)}}
@keyframes labHumanJump{0%{transform:translateY(0) scaleY(1)}10%{transform:translateY(7px) scaleY(.88)}18%{transform:translateY(0) scaleY(1.04)}48%{transform:translateY(calc(-1 * var(--jumpHeight))) scaleY(1)}78%{transform:translateY(0) scaleY(1.04)}88%{transform:translateY(7px) scaleY(.9)}100%{transform:translateY(0) scaleY(1)}}
@keyframes labShadow{0%,100%{transform:translateX(-50%) scale(1);opacity:.55}48%{transform:translateX(-50%) scale(.42);opacity:.18}}
@keyframes labDisk{to{transform:rotate(347deg)}}
@keyframes labDiskGlow{50%{filter:blur(3px) brightness(1.35);opacity:.72}}
@keyframes labPhotonRing{50%{filter:brightness(1.55);opacity:.72;transform:scale(1.035)}}
@keyframes labImpactFlash{0%{transform:scale(.08);opacity:1}48%{opacity:.98}100%{transform:scale(1.7);opacity:0}}
@keyframes labGroundWave{0%{transform:scale(.18);opacity:1}70%{opacity:.72}100%{transform:scale(var(--waveScale));opacity:0}}
@keyframes labCraterFinal{0%{transform:scale(.08);opacity:0}55%{transform:scale(1.12);opacity:1}100%{transform:scale(1);opacity:1}}
@keyframes labCraterRim{0%{transform:scale(.1);opacity:0}65%{transform:scale(1.08);opacity:.95}100%{transform:scale(1);opacity:.82}}
@keyframes labDebris{0%{transform:translateY(30px) scale(.25);opacity:.15}30%{opacity:.9}100%{transform:translateY(-150px) scale(1.5);opacity:0}}
@keyframes labScreenFlash{0%{opacity:0}16%{opacity:1}100%{opacity:0}}
`;