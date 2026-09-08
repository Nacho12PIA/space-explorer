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
  { name: "Luna", gravity: 1.62, color: "#cbd5e1" },
  { name: "Marte", gravity: 3.71, color: "#f97316" },
  { name: "Tierra", gravity: 9.81, color: "#38bdf8" },
  { name: "Neptuno", gravity: 11.15, color: "#3b82f6" },
  { name: "Júpiter", gravity: 24.79, color: "#d6a66f" },
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
            <button key={item.id} onClick={() => setActive(item.id)} style={{ position: "relative", minHeight: 220, overflow: "hidden", textAlign: "left", padding: 22, color: "white", cursor: "pointer", borderRadius: 24, border: `1px solid ${item.accent}55`, background: `radial-gradient(circle at 85% 15%,${item.accent}30,transparent 38%),linear-gradient(145deg,rgba(15,23,42,.72),rgba(2,6,23,.98))`, boxShadow: `inset 0 0 45px ${item.accent}0c,0 16px 35px rgba(0,0,0,.2)` }}>
              <div style={{ position: "absolute", right: -20, bottom: -28, width: 115, height: 115, borderRadius: "50%", background: `${item.accent}12`, filter: "blur(2px)" }} />
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
  const [worldIndex, setWorldIndex] = useState(0);
  const world = worlds[worldIndex];
  const ratio = world.gravity / 9.81;
  const jump = Math.min(95, 22 / ratio);
  const jumpTime = Math.sqrt(1 / ratio).toFixed(1);

  return <ExperimentShell icon="🧑‍🚀" number="01" title="SUPERGRAVEDAD" intro="Elige un mundo y mira cómo cambia el mismo salto. Tu masa es la misma; la gravedad cambia cuánto tira el planeta de ti.">
    <Control label={`TU MASA · ${mass} kg`}><input type="range" min="20" max="100" value={mass} onChange={e => setMass(+e.target.value)} style={slider} /></Control>
    <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "14px 0 5px" }}>{worlds.map((w,i)=><button key={w.name} onClick={()=>setWorldIndex(i)} style={{ flex: "1 0 90px", padding: "12px 8px", borderRadius: 15, color: "white", fontWeight: 900, cursor: "pointer", border: i===worldIndex?`2px solid ${w.color}`:"1px solid rgba(255,255,255,.1)", background:i===worldIndex?`${w.color}22`:"rgba(255,255,255,.04)" }}>{w.name}</button>)}</div>
    <Stage height={330} background={`radial-gradient(circle at 50% 115%,${world.color}55,transparent 45%),linear-gradient(#020617,#0f172a)`}>
      <div style={{ position:"absolute", left:"50%", bottom:42, transform:`translate(-50%,-${jump}px)`, transition:"transform .65s cubic-bezier(.2,.8,.3,1)", fontSize:55, filter:`drop-shadow(0 0 15px ${world.color})` }}>🧑‍🚀</div>
      <div style={{ position:"absolute", left:0,right:0,bottom:0,height:48,background:`linear-gradient(${world.color}55,#111827)`, borderTop:`2px solid ${world.color}88` }} />
      <div style={{ position:"absolute", top:18,left:18,padding:"8px 11px",borderRadius:12,background:"rgba(0,0,0,.45)",fontWeight:900 }}>SALTO EN {world.name.toUpperCase()}</div>
      <div style={{ position:"absolute", right:18,bottom:65,fontSize:12,opacity:.7 }}>↑ altura relativa {jump.toFixed(0)}</div>
    </Stage>
    <Metrics items={[["GRAVEDAD",`${world.gravity} m/s²`],["TU PESO",`${(mass*world.gravity).toFixed(0)} N`],["TIEMPO EN EL AIRE",`${jumpTime}× Tierra`]]}/>
    <Discovery>{ratio < .5 ? `¡Casi flotas! En ${world.name} puedes saltar mucho más alto porque la gravedad es mucho menor.` : ratio > 1.5 ? `En ${world.name} la gravedad te pega al suelo. Saltar sería muchísimo más difícil.` : `En ${world.name} tu salto se parece más al terrestre, pero la fuerza de gravedad sigue siendo diferente.`}</Discovery>
  </ExperimentShell>;
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
  const size=90+danger*.75;
  const stretch=Math.max(1,1+(danger/100)*2.8);
  const timeFactor=1/Math.sqrt(Math.max(.08,1-danger/108));
  const zone=distance>65?"ZONA SEGURA":distance>35?"GRAVEDAD EXTREMA":distance>12?"PELIGRO: FUERZAS DE MAREA":"HORIZONTE DE SUCESOS";
  return <ExperimentShell icon="🕳️" number="04 · MUNDO EXTREMO" title="ACÉRCATE A UN AGUJERO NEGRO" intro="Pilota una sonda hacia un agujero negro. Observa cómo aumentan la gravedad, las fuerzas de marea y la dilatación del tiempo.">
    <Control label={`DISTANCIA DE SEGURIDAD · ${distance}%`}><input type="range" min="3" max="100" value={distance} onChange={e=>setDistance(+e.target.value)} style={{...slider,accentColor:distance<20?"#fb7185":"#c084fc"}}/><Scale left="☠ HORIZONTE" right="🚀 LEJOS"/></Control>
    <Stage height={410} background="radial-gradient(circle at center,#311044 0%,#090313 35%,#020617 72%)">
      <StarField distorted={danger}/>
      <div style={{position:"absolute",left:"50%",top:"50%",width:size+75,height:(size+75)*.32,transform:"translate(-50%,-50%) rotate(-8deg)",borderRadius:"50%",background:"linear-gradient(90deg,#7c2d12,#f97316,#fff7ed,#f97316,#7c2d12)",boxShadow:"0 0 25px #f97316,0 0 65px rgba(168,85,247,.5)",filter:"blur(2px)"}}/>
      <div style={{position:"absolute",left:"50%",top:"50%",width:size,height:size,transform:"translate(-50%,-50%)",borderRadius:"50%",background:"#000",boxShadow:"0 0 0 7px rgba(255,255,255,.10),0 0 35px #a855f7,0 0 85px rgba(168,85,247,.5)"}}/>
      <div style={{position:"absolute",left:`${8+(distance/100)*20}%`,top:"50%",fontSize:38,transform:`translateY(-50%) scaleY(${stretch})`,transformOrigin:"center",transition:"all .18s",filter:"drop-shadow(0 0 8px #67e8f9)"}}>🚀</div>
      <div style={{position:"absolute",left:15,top:15,padding:"9px 12px",borderRadius:12,background:distance<20?"rgba(190,24,93,.45)":"rgba(0,0,0,.55)",fontSize:11,fontWeight:950,letterSpacing:1,color:distance<20?"#fecdd3":"white"}}>{zone}</div>
      {distance<13&&<div style={{position:"absolute",left:0,right:0,bottom:25,textAlign:"center",fontSize:18,fontWeight:950,color:"#fb7185",animation:"labPulse .7s infinite"}}>⚠ YA NO HAY CAMINO DE VUELTA</div>}
    </Stage>
    <Metrics items={[["FUERZAS DE MAREA",danger<30?"BAJAS":danger<65?"MUY ALTAS":"EXTREMAS"],["TIEMPO LEJANO",`≈ ${timeFactor.toFixed(1)}× más rápido`],["ESTADO",zone]]}/>
    <Discovery>{distance>65?"Desde aquí puedes observarlo sin estar cerca del horizonte. Su enorme gravedad ya domina la región que lo rodea.":distance>12?"Al acercarte, la diferencia de gravedad entre la parte delantera y trasera de la nave crece. Eso produce fuerzas de marea extremas.":"Has cruzado el horizonte de sucesos en esta simulación. Según la relatividad general, desde aquí nada puede regresar al exterior, ni siquiera la luz."}</Discovery>
    <Note>La imagen es una representación educativa. Un agujero negro no es un “agujero” visible: vemos sus efectos sobre la luz y la materia que lo rodea.</Note>
  </ExperimentShell>
}

function Impact(){
  const [diameter,setDiameter]=useState(30),[speed,setSpeed]=useState(20),[hit,setHit]=useState(false);
  const energy=Math.pow(diameter,3)*Math.pow(speed,2);
  const level=energy<2000000?"IMPACTO LOCAL":energy<15000000?"IMPACTO REGIONAL":"IMPACTO DEVASTADOR";
  useEffect(()=>setHit(false),[diameter,speed]);
  return <ExperimentShell icon="☄️" number="05" title="IMPACTO DE ASTEROIDE" intro="Construye un asteroide, elige su velocidad y lánzalo. Más masa y más velocidad significan mucha más energía.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:10}}><Control label={`DIÁMETRO · ${diameter} m`}><input type="range" min="5" max="100" value={diameter} onChange={e=>setDiameter(+e.target.value)} style={{...slider,accentColor:"#fb7185"}}/></Control><Control label={`VELOCIDAD · ${speed} km/s`}><input type="range" min="11" max="40" value={speed} onChange={e=>setSpeed(+e.target.value)} style={{...slider,accentColor:"#fb7185"}}/></Control></div>
    <Stage height={370} background="linear-gradient(#020617 0%,#172554 60%,#0f766e 61%,#14532d 100%)">
      <StarField/>
      <div style={{position:"absolute",left:hit?"58%":"8%",top:hit?"65%":"12%",fontSize:Math.max(28,diameter*.55),transform:"rotate(35deg)",transition:"all .85s cubic-bezier(.6,.05,.9,.5)",filter:"drop-shadow(-18px -12px 12px #f97316)"}}>☄️</div>
      {hit&&<><div style={{position:"absolute",left:"58%",top:"65%",width:Math.min(190,50+diameter),height:Math.min(190,50+diameter),transform:"translate(-50%,-50%)",borderRadius:"50%",background:"radial-gradient(circle,#fff,#fbbf24 25%,#f97316 48%,transparent 70%)",animation:"labBlast .8s ease-out"}}/><div style={{position:"absolute",left:"58%",bottom:18,transform:"translateX(-50%)",fontSize:13,fontWeight:950,color:"#fecaca"}}>{level}</div></>}
    </Stage>
    <button onClick={()=>{setHit(false);setTimeout(()=>setHit(true),30)}} style={{...actionButton,background:"linear-gradient(90deg,#be123c,#ea580c)",border:"1px solid #fb718566"}}>☄️ LANZAR ASTEROIDE</button>
    <Metrics items={[["DIÁMETRO",`${diameter} m`],["VELOCIDAD",`${speed} km/s`],["RESULTADO",level]]}/>
    <Discovery>La energía cinética aumenta muchísimo al crecer el asteroide o su velocidad. El resultado real de un impacto también depende del ángulo, la composición y el lugar donde choque.</Discovery>
  </ExperimentShell>
}

function ExperimentShell({icon,number,title,intro,children}){return <div style={panel}><div style={{padding:"25px 22px 18px",background:"radial-gradient(circle at 90% 0%,rgba(56,189,248,.10),transparent 40%)"}}><div style={{fontSize:42}}>{icon}</div><div style={{marginTop:8,fontSize:10,letterSpacing:2,fontWeight:950,color:"#7dd3fc"}}>EXPERIMENTO {number}</div><h2 style={{fontSize:"clamp(27px,6vw,42px)",margin:"6px 0 8px"}}>{title}</h2><p style={{maxWidth:700,margin:0,lineHeight:1.55,opacity:.74}}>{intro}</p></div><div style={{padding:"0 22px 25px"}}>{children}</div></div>}
function Control({label,children}){return <div style={{padding:15,borderRadius:17,background:"rgba(255,255,255,.045)",border:"1px solid rgba(255,255,255,.08)"}}><div style={{fontSize:11,fontWeight:950,letterSpacing:1.1,marginBottom:10}}>{label}</div>{children}</div>}
function Scale({left,right}){return <div style={{display:"flex",justifyContent:"space-between",fontSize:10,opacity:.55,marginTop:5}}><span>{left}</span><span>{right}</span></div>}
function Stage({height,background,children}){return <div style={{position:"relative",height,marginTop:14,borderRadius:22,overflow:"hidden",background,border:"1px solid rgba(255,255,255,.09)",boxShadow:"inset 0 0 50px rgba(0,0,0,.25)"}}>{children}</div>}
function Metrics({items}){return <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(135px,1fr))",gap:9,marginTop:13}}>{items.map(([a,b])=><div key={a} style={{padding:13,borderRadius:15,background:"rgba(14,165,233,.08)",border:"1px solid rgba(56,189,248,.13)"}}><div style={{fontSize:9,fontWeight:950,letterSpacing:1,opacity:.52}}>{a}</div><div style={{fontSize:17,fontWeight:950,marginTop:5}}>{b}</div></div>)}</div>}
function Discovery({children}){return <div style={{marginTop:14,padding:"15px 16px",borderRadius:16,background:"linear-gradient(90deg,rgba(34,197,94,.09),rgba(14,165,233,.06))",border:"1px solid rgba(74,222,128,.16)",fontSize:13,lineHeight:1.55}}><b style={{color:"#86efac"}}>✦ HAS DESCUBIERTO</b><div style={{marginTop:5,opacity:.84}}>{children}</div></div>}
function Note({children}){return <div style={{marginTop:10,fontSize:11,lineHeight:1.5,opacity:.5}}>ℹ️ {children}</div>}
function StarField({distorted=0}){return <>{[12,25,39,67,78,88].map((x,i)=><i key={x} style={{position:"absolute",left:`${x}%`,top:`${12+(i*17)%70}%`,width:2+distorted/80,height:2+distorted/40,borderRadius:"50%",background:"white",boxShadow:"0 0 5px white",transform:`rotate(${i*25}deg)`}}/>)}</>}

const backButton={color:"white",background:"transparent",border:0,padding:"10px 0",cursor:"pointer",fontWeight:950,fontSize:11,letterSpacing:1,opacity:.82};
const actionButton={marginTop:12,width:"100%",minHeight:50,borderRadius:15,border:"1px solid rgba(255,255,255,.15)",background:"rgba(255,255,255,.07)",color:"white",cursor:"pointer",fontWeight:950,letterSpacing:.8};
const animations=`@keyframes labOrbit{to{transform:rotate(360deg)}}@keyframes labPulse{50%{opacity:.35;transform:scale(.98)}}@keyframes labBlast{0%{transform:translate(-50%,-50%) scale(.1);opacity:1}100%{transform:translate(-50%,-50%) scale(1.8);opacity:.15}}`;
