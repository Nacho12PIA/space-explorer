"use client";

import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const worlds = [
  { es:"Luna", en:"Moon", gravity:1.62, color:"#cbd5e1", ground:"#64748b", sky:"#050816", icon:"🌕" },
  { es:"Marte", en:"Mars", gravity:3.71, color:"#f97316", ground:"#7c2d12", sky:"#34110b", icon:"🔴" },
  { es:"Tierra", en:"Earth", gravity:9.81, color:"#38bdf8", ground:"#166534", sky:"#082f49", icon:"🌍" },
  { es:"Neptuno", en:"Neptune", gravity:11.15, color:"#3b82f6", ground:"#1e40af", sky:"#0b1e51", icon:"🔵" },
  { es:"Júpiter", en:"Jupiter", gravity:24.79, color:"#d6a66f", ground:"#92400e", sky:"#4a2b16", icon:"🟠" },
];

export default function EnhancedGravity({ onBack }) {
  const { language } = useLanguage();
  const en = language === "en";
  const [mode,setMode] = useState("jump");
  const [mass,setMass] = useState(40);
  const [impulse,setImpulse] = useState(55);
  const [worldIndex,setWorldIndex] = useState(2);
  const [jumpKey,setJumpKey] = useState(0);
  const [dropKey,setDropKey] = useState(0);
  const [dropped,setDropped] = useState(false);
  const world = worlds[worldIndex];
  const worldName = en ? world.en : world.es;

  const takeoffSpeed = 1.7 + impulse * 0.035;
  const physicalHeight = (takeoffSpeed * takeoffSpeed) / (2 * world.gravity);
  const physicalAirTime = (2 * takeoffSpeed) / world.gravity;
  const jumpHeight = Math.max(22, Math.min(215, physicalHeight * 43));
  const visualTime = Math.max(.65, Math.min(2.6, physicalAirTime * .5));
  const weight = mass * world.gravity;
  const effort = Math.round((mass / 40) * impulse);
  const targetMet = physicalHeight >= 2;
  const dropHeight = 20;
  const dropTime = Math.sqrt((2*dropHeight)/world.gravity);
  const dropVisual = Math.max(.7,Math.min(2.4,dropTime*.55));

  const worldComparisons = worlds.map(w=>({
    ...w,
    h:(takeoffSpeed*takeoffSpeed)/(2*w.gravity)
  }));
  const maxH = Math.max(...worldComparisons.map(w=>w.h));

  const launchJump=()=>setJumpKey(k=>k+1);
  const launchDrop=()=>{setDropped(false);setDropKey(k=>k+1);requestAnimationFrame(()=>requestAnimationFrame(()=>setDropped(true)))};

  return <section style={{marginTop:24}}>
    <style>{animations}</style>
    <button onClick={onBack} style={backButton}>← {en?"ALL EXPERIMENTS":"TODOS LOS EXPERIMENTOS"}</button>
    <div style={panel}>
      <div style={{padding:"25px 22px 18px",background:`radial-gradient(circle at 92% 0%,${world.color}22,transparent 38%)`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16}}>
          <div><div style={{fontSize:44}}>🧑‍🚀</div><div style={{marginTop:8,fontSize:10,letterSpacing:2,fontWeight:950,color:"#7dd3fc"}}>{en?"EXPERIMENT 01 · GRAVITY PLAYGROUND":"EXPERIMENTO 01 · PARQUE DE GRAVEDAD"}</div><h2 style={{fontSize:"clamp(29px,6vw,44px)",margin:"6px 0 8px"}}>{en?"SUPERGRAVITY":"SUPERGRAVEDAD"}</h2></div>
          <div style={{padding:"8px 11px",borderRadius:14,background:`${world.color}16`,border:`1px solid ${world.color}44`,fontSize:12,fontWeight:900,whiteSpace:"nowrap"}}>{world.icon} {worldName}</div>
        </div>
        <p style={{maxWidth:760,margin:0,lineHeight:1.55,opacity:.76}}>{en?"This is now a real gravity playground: jump, compare worlds and run a falling-object experiment. Change one variable and watch the consequences immediately.":"Ahora es un verdadero parque de gravedad: salta, compara mundos y haz un experimento de caída libre. Cambia una variable y observa inmediatamente las consecuencias."}</p>
      </div>

      <div style={{padding:"0 22px 25px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:10}}>
          <Control label={`${en?"YOUR MASS":"TU MASA"} · ${mass} kg`}><input type="range" min="20" max="100" value={mass} onChange={e=>setMass(+e.target.value)} style={slider}/><Scale left="20 kg" right="100 kg"/></Control>
          <Control label={`${en?"JUMP FORCE":"FUERZA DEL SALTO"} · ${impulse}%`}><input type="range" min="20" max="100" value={impulse} onChange={e=>setImpulse(+e.target.value)} style={slider}/><Scale left={en?"Soft":"Suave"} right={en?"Maximum":"Máxima"}/></Control>
        </div>

        <div style={{display:"flex",gap:8,overflowX:"auto",padding:"14px 0 10px"}}>
          {worlds.map((w,i)=><button key={w.es} onClick={()=>{setWorldIndex(i);setJumpKey(k=>k+1);setDropped(false)}} style={{flex:"1 0 100px",padding:"12px 8px",borderRadius:15,color:"white",fontWeight:900,cursor:"pointer",border:i===worldIndex?`2px solid ${w.color}`:"1px solid rgba(255,255,255,.1)",background:i===worldIndex?`${w.color}22`:"rgba(255,255,255,.04)"}}><div style={{fontSize:20}}>{w.icon}</div><div style={{marginTop:4}}>{en?w.en:w.es}</div></button>)}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:8,marginBottom:12}}>
          <ModeButton active={mode==="jump"} onClick={()=>setMode("jump")}>⬆️ {en?"JUMP LAB":"LAB DE SALTO"}</ModeButton>
          <ModeButton active={mode==="drop"} onClick={()=>setMode("drop")}>🧪 {en?"FALL RACE":"CARRERA DE CAÍDA"}</ModeButton>
        </div>

        {mode==="jump" ? <>
          <div style={{position:"relative",height:440,borderRadius:22,overflow:"hidden",background:`linear-gradient(${world.sky},#0f172a 64%,${world.ground} 65%,#07110b)`,border:"1px solid rgba(255,255,255,.09)",boxShadow:"inset 0 0 60px rgba(0,0,0,.35)"}}>
            <Stars/>
            <div style={{position:"absolute",left:14,top:14,zIndex:5,padding:"8px 11px",borderRadius:12,background:"rgba(0,0,0,.56)",fontWeight:900}}>{en?"JUMP ON":"SALTO EN"} {worldName.toUpperCase()}</div>
            <div style={{position:"absolute",right:14,top:14,zIndex:5,textAlign:"right"}}><div style={{fontSize:10,opacity:.58}}>{en?"ESTIMATED HEIGHT":"ALTURA ESTIMADA"}</div><div style={{fontSize:27,fontWeight:950,color:world.color}}>{physicalHeight.toFixed(2)} m</div></div>
            {[1,2,3,4].map(m=><div key={m} style={{position:"absolute",left:0,right:0,bottom:54+m*75,borderTop:"1px dashed rgba(255,255,255,.13)",fontSize:9,opacity:.42,paddingLeft:8}}>{m} m</div>)}
            <div key={`shadow-${jumpKey}`} style={{position:"absolute",left:"50%",bottom:51,width:74,height:11,transform:"translateX(-50%)",borderRadius:"50%",background:"rgba(0,0,0,.58)",filter:"blur(3px)",animation:`egShadow ${visualTime}s ease-in-out 1`}}/>
            <div key={jumpKey} style={{position:"absolute",left:"50%",bottom:52,width:72,height:116,marginLeft:-36,"--jumpHeight":`${jumpHeight}px`,animation:`egJump ${visualTime}s cubic-bezier(.28,.72,.4,1) 1`,zIndex:3}}><Astronaut color={world.color}/></div>
            <div style={{position:"absolute",left:0,right:0,bottom:0,height:54,background:`linear-gradient(${world.color}44,${world.ground})`,borderTop:`2px solid ${world.color}99`}}/>
            <div key={`dust-${jumpKey}`} style={{position:"absolute",left:"50%",bottom:48,width:120,height:40,marginLeft:-60,borderRadius:"50%",background:`radial-gradient(ellipse,${world.color}66,transparent 70%)`,filter:"blur(7px)",animation:"egDust 1s ease-out"}}/>
          </div>
          <button onClick={launchJump} style={{...actionButton,background:`linear-gradient(90deg,${world.color}66,rgba(255,255,255,.08))`}}>⬆ {en?"LAUNCH JUMP":"LANZAR SALTO"}</button>

          <div style={{marginTop:14,padding:16,borderRadius:18,background:targetMet?"rgba(34,197,94,.09)":"rgba(251,191,36,.08)",border:`1px solid ${targetMet?"rgba(74,222,128,.2)":"rgba(251,191,36,.2)"}`}}>
            <div style={{fontSize:11,fontWeight:950,letterSpacing:1.1}}>{en?"CHALLENGE: JUMP 2 METRES":"RETO: SALTA 2 METROS"}</div>
            <div style={{marginTop:6,fontSize:14,opacity:.78}}>{targetMet?(en?"✅ You made it. Can you do it with less force?":"✅ Lo has conseguido. ¿Puedes hacerlo con menos fuerza?"):(en?"❌ Not yet. Change world or jump force and try again.":"❌ Aún no. Cambia de mundo o la fuerza del salto y vuelve a probar.")}</div>
          </div>

          <h3 style={{fontSize:14,letterSpacing:1.2,margin:"20px 0 10px"}}>{en?"SAME JUMP, FIVE WORLDS":"MISMO SALTO, CINCO MUNDOS"}</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,minmax(74px,1fr))",gap:7,alignItems:"end",height:170,padding:"10px 6px 0",borderRadius:18,background:"rgba(255,255,255,.035)",overflowX:"auto"}}>
            {worldComparisons.map(w=><div key={w.es} style={{minWidth:70,textAlign:"center",display:"flex",height:"100%",flexDirection:"column",justifyContent:"flex-end"}}><div style={{fontSize:10,fontWeight:900,marginBottom:5}}>{w.h.toFixed(1)} m</div><div style={{height:`${Math.max(12,(w.h/maxH)*110)}px`,borderRadius:"9px 9px 3px 3px",background:`linear-gradient(${w.color},${w.color}55)`,boxShadow:`0 0 14px ${w.color}33`}}/><div style={{fontSize:9,marginTop:6,opacity:.68}}>{en?w.en:w.es}</div></div>)}
          </div>
        </> : <>
          <div style={{position:"relative",height:440,borderRadius:22,overflow:"hidden",background:`linear-gradient(${world.sky},#0f172a 76%,${world.ground} 77%)`,border:"1px solid rgba(255,255,255,.09)"}}>
            <Stars/>
            <div style={{position:"absolute",left:14,top:14,padding:"8px 11px",borderRadius:12,background:"rgba(0,0,0,.56)",fontWeight:900}}>{en?"20 m DROP TOWER":"TORRE DE CAÍDA · 20 m"}</div>
            <div style={{position:"absolute",left:"22%",top:78,bottom:50,width:8,background:"linear-gradient(#94a3b8,#334155)"}}/><div style={{position:"absolute",left:"17%",top:74,width:120,height:8,background:"#64748b"}}/>
            <div key={`a-${dropKey}`} style={{position:"absolute",left:"34%",top:dropped?350:88,fontSize:46,transition:dropped?`top ${dropVisual}s cubic-bezier(.55,.02,.9,.5)`:"none",zIndex:4}}>⚽</div>
            <div key={`b-${dropKey}`} style={{position:"absolute",left:"61%",top:dropped?350:88,fontSize:46,transition:dropped?`top ${dropVisual}s cubic-bezier(.55,.02,.9,.5)`:"none",zIndex:4}}>🧱</div>
            <div style={{position:"absolute",left:"31%",top:145,fontSize:11,opacity:.7}}>{en?"LIGHT":"LIGERO"}</div><div style={{position:"absolute",left:"60%",top:145,fontSize:11,opacity:.7}}>{en?"HEAVY":"PESADO"}</div>
            {dropped&&<div style={{position:"absolute",left:"50%",bottom:18,transform:"translateX(-50%)",padding:"9px 12px",borderRadius:12,background:"rgba(0,0,0,.66)",fontWeight:950,color:"#86efac",animation:"egResult .5s ease-out"}}>🏁 {en?"THEY LAND TOGETHER":"LLEGAN A LA VEZ"}</div>}
          </div>
          <button onClick={launchDrop} style={{...actionButton,background:"linear-gradient(90deg,#7c3aed,#2563eb)"}}>🧪 {en?"DROP BOTH OBJECTS":"SOLTAR LOS DOS OBJETOS"}</button>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:9,marginTop:13}}><Metric title={en?"HEIGHT":"ALTURA"} value="20 m"/><Metric title={en?"FALL TIME":"TIEMPO DE CAÍDA"} value={`${dropTime.toFixed(2)} s`}/><Metric title={en?"RESULT":"RESULTADO"} value={en?"SAME TIME":"MISMO TIEMPO"}/></div>
          <Discovery>{en?`A football and a brick fall with the same gravitational acceleration on ${worldName}. Ignoring air resistance, mass does not make one fall faster than the other.`:`Un balón y un ladrillo caen con la misma aceleración gravitatoria en ${worldName}. Si ignoramos la resistencia del aire, tener más masa no hace que uno caiga más rápido.`}</Discovery>
        </>}

        {mode==="jump"&&<>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(135px,1fr))",gap:9,marginTop:13}}><Metric title={en?"GRAVITY":"GRAVEDAD"} value={`${world.gravity} m/s²`}/><Metric title={en?"YOUR WEIGHT":"TU PESO"} value={`${weight.toFixed(0)} N`}/><Metric title={en?"AIR TIME":"TIEMPO EN EL AIRE"} value={`${physicalAirTime.toFixed(2)} s`}/><Metric title={en?"EFFORT":"ESFUERZO"} value={`${effort}%`}/></div>
          <Discovery>{en?`Your mass changes your weight and the effort needed to push off, but gravity itself accelerates all objects equally. The planet and your take-off speed are what change the flight most.`:`Tu masa cambia tu peso y el esfuerzo necesario para impulsarte, pero la gravedad acelera por igual a todos los objetos. El planeta y la velocidad con la que despegas son las variables que más cambian el vuelo.`}</Discovery>
        </>}
      </div>
    </div>
  </section>;
}

function ModeButton({active,onClick,children}){return <button onClick={onClick} style={{padding:"12px 8px",borderRadius:14,border:active?"1px solid rgba(125,211,252,.55)":"1px solid rgba(255,255,255,.09)",background:active?"rgba(14,165,233,.16)":"rgba(255,255,255,.04)",color:"white",fontWeight:950,cursor:"pointer"}}>{children}</button>}
function Control({label,children}){return <div style={{padding:15,borderRadius:17,background:"rgba(255,255,255,.045)",border:"1px solid rgba(255,255,255,.08)"}}><div style={{fontSize:11,fontWeight:950,letterSpacing:1.1,marginBottom:10}}>{label}</div>{children}</div>}
function Scale({left,right}){return <div style={{display:"flex",justifyContent:"space-between",fontSize:10,opacity:.55,marginTop:5}}><span>{left}</span><span>{right}</span></div>}
function Metric({title,value}){return <div style={{padding:13,borderRadius:15,background:"rgba(14,165,233,.08)",border:"1px solid rgba(56,189,248,.13)"}}><div style={{fontSize:9,fontWeight:950,letterSpacing:1,opacity:.52}}>{title}</div><div style={{fontSize:17,fontWeight:950,marginTop:5}}>{value}</div></div>}
function Discovery({children}){return <div style={{marginTop:14,padding:"15px 16px",borderRadius:16,background:"linear-gradient(90deg,rgba(34,197,94,.09),rgba(14,165,233,.06))",border:"1px solid rgba(74,222,128,.16)",fontSize:13,lineHeight:1.55}}><b style={{color:"#86efac"}}>✦ HAS DESCUBIERTO / YOU DISCOVERED</b><div style={{marginTop:5,opacity:.86}}>{children}</div></div>}
function Stars(){return <>{[8,17,28,39,51,64,76,87,94,23,71].map((x,i)=><i key={i} style={{position:"absolute",left:`${x}%`,top:`${8+(i*19)%66}%`,width:i%3===0?3:2,height:i%3===0?3:2,borderRadius:"50%",background:"white",boxShadow:"0 0 6px white",opacity:.45+(i%4)*.12}}/>)}</>}
function Astronaut({color}){return <div style={{position:"relative",width:"100%",height:"100%"}}><div style={{position:"absolute",left:18,top:0,width:36,height:36,borderRadius:"50%",background:"linear-gradient(#f8fafc,#cbd5e1)",border:"3px solid white",boxShadow:`0 0 16px ${color}77`}}><div style={{position:"absolute",left:6,top:7,width:24,height:15,borderRadius:"45%",background:"linear-gradient(#0f172a,#38bdf8)",border:"1px solid #7dd3fc"}}/></div><div style={{position:"absolute",left:20,top:34,width:32,height:45,borderRadius:10,background:"linear-gradient(90deg,#e2e8f0,#fff,#cbd5e1)",border:"2px solid white"}}/><div style={{position:"absolute",left:10,top:40,width:12,height:42,borderRadius:8,background:"#e2e8f0",transform:"rotate(28deg)"}}/><div style={{position:"absolute",right:10,top:40,width:12,height:42,borderRadius:8,background:"#e2e8f0",transform:"rotate(-28deg)"}}/><div style={{position:"absolute",left:22,top:75,width:12,height:39,borderRadius:8,background:"#e2e8f0"}}/><div style={{position:"absolute",right:22,top:75,width:12,height:39,borderRadius:8,background:"#e2e8f0"}}/></div>}

const panel={borderRadius:26,border:"1px solid rgba(255,255,255,.13)",background:"linear-gradient(180deg,rgba(15,23,42,.92),rgba(2,6,23,.96))",overflow:"hidden",boxShadow:"0 24px 70px rgba(0,0,0,.32)"};
const slider={width:"100%",accentColor:"#38bdf8",cursor:"pointer"};
const backButton={color:"white",background:"transparent",border:0,padding:"10px 0",cursor:"pointer",fontWeight:950,fontSize:11,letterSpacing:1,opacity:.82};
const actionButton={marginTop:12,width:"100%",minHeight:52,borderRadius:15,border:"1px solid rgba(255,255,255,.15)",color:"white",cursor:"pointer",fontWeight:950,letterSpacing:.8};
const animations=`
@keyframes egJump{0%{transform:translateY(0) scaleY(1)}10%{transform:translateY(7px) scaleY(.88)}18%{transform:translateY(0) scaleY(1.04)}48%{transform:translateY(calc(-1 * var(--jumpHeight))) scaleY(1)}78%{transform:translateY(0) scaleY(1.04)}88%{transform:translateY(7px) scaleY(.9)}100%{transform:translateY(0) scaleY(1)}}
@keyframes egShadow{0%,100%{transform:translateX(-50%) scale(1);opacity:.55}48%{transform:translateX(-50%) scale(.35);opacity:.12}}
@keyframes egDust{0%{transform:scale(.3);opacity:.8}100%{transform:scale(1.5);opacity:0}}
@keyframes egResult{0%{transform:translate(-50%,12px);opacity:0}100%{transform:translate(-50%,0);opacity:1}}
`;
