"use client";

import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const worlds = [
  { es: "Luna", en: "Moon", gravity: 1.62, color: "#cbd5e1", ground: "#64748b" },
  { es: "Marte", en: "Mars", gravity: 3.71, color: "#f97316", ground: "#9a3412" },
  { es: "Tierra", en: "Earth", gravity: 9.81, color: "#38bdf8", ground: "#166534" },
  { es: "Neptuno", en: "Neptune", gravity: 11.15, color: "#3b82f6", ground: "#1e40af" },
  { es: "Júpiter", en: "Jupiter", gravity: 24.79, color: "#d6a66f", ground: "#92400e" },
];

export default function EnhancedGravity({ onBack }) {
  const { language } = useLanguage();
  const en = language === "en";
  const [mass, setMass] = useState(40);
  const [impulse, setImpulse] = useState(55);
  const [worldIndex, setWorldIndex] = useState(2);
  const [jumpKey, setJumpKey] = useState(0);
  const world = worlds[worldIndex];
  const worldName = en ? world.en : world.es;

  // Same take-off speed for equal impulse; mass changes the effort needed, not free-fall acceleration.
  const takeoffSpeed = 1.7 + impulse * 0.035;
  const physicalHeight = (takeoffSpeed * takeoffSpeed) / (2 * world.gravity);
  const physicalAirTime = (2 * takeoffSpeed) / world.gravity;
  const jumpHeight = Math.max(22, Math.min(205, physicalHeight * 42));
  const visualTime = Math.max(.65, Math.min(2.5, physicalAirTime * .48));
  const weight = mass * world.gravity;
  const effort = Math.round((mass / 40) * impulse);

  const discovery = en
    ? `Changing your mass changes your weight and the effort needed to produce the same push. But once you leave the ground, gravity accelerates light and heavy astronauts equally. On ${worldName}, gravity is ${world.gravity.toFixed(2)} m/s².`
    : `Cambiar tu masa cambia tu peso y el esfuerzo necesario para producir el mismo impulso. Pero una vez en el aire, la gravedad acelera igual a astronautas ligeros y pesados. En ${worldName}, la gravedad es ${world.gravity.toFixed(2)} m/s².`;

  return (
    <section style={{ marginTop: 24 }}>
      <style>{animations}</style>
      <button onClick={onBack} style={backButton}>← {en ? "ALL EXPERIMENTS" : "TODOS LOS EXPERIMENTOS"}</button>
      <div style={panel}>
        <div style={{ padding: "25px 22px 18px" }}>
          <div style={{ fontSize: 42 }}>🧑‍🚀</div>
          <div style={{ marginTop: 8, fontSize: 10, letterSpacing: 2, fontWeight: 950, color: "#7dd3fc" }}>{en ? "EXPERIMENT 01 · DEEP MODE" : "EXPERIMENTO 01 · MODO PROFUNDO"}</div>
          <h2 style={{ fontSize: "clamp(27px,6vw,42px)", margin: "6px 0 8px" }}>{en ? "SUPERGRAVITY" : "SUPERGRAVEDAD"}</h2>
          <p style={{ maxWidth: 720, margin: 0, lineHeight: 1.55, opacity: .76 }}>{en ? "Choose a world, your mass and the strength of your jump. Change one variable at a time and discover what really controls the result." : "Elige un mundo, tu masa y la fuerza del salto. Cambia una variable cada vez y descubre qué controla realmente el resultado."}</p>
        </div>
        <div style={{ padding: "0 22px 25px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 10 }}>
            <Control label={`${en ? "YOUR MASS" : "TU MASA"} · ${mass} kg`}><input type="range" min="20" max="100" value={mass} onChange={e => setMass(+e.target.value)} style={slider} /><Scale left="20 kg" right="100 kg" /></Control>
            <Control label={`${en ? "JUMP FORCE" : "FUERZA DEL SALTO"} · ${impulse}%`}><input type="range" min="20" max="100" value={impulse} onChange={e => setImpulse(+e.target.value)} style={slider} /><Scale left={en ? "Soft" : "Suave"} right={en ? "Maximum" : "Máxima"} /></Control>
          </div>

          <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "14px 0 5px" }}>
            {worlds.map((w, i) => <button key={w.es} onClick={() => { setWorldIndex(i); setJumpKey(k => k + 1); }} style={{ flex: "1 0 90px", padding: "12px 8px", borderRadius: 15, color: "white", fontWeight: 900, cursor: "pointer", border: i === worldIndex ? `2px solid ${w.color}` : "1px solid rgba(255,255,255,.1)", background: i === worldIndex ? `${w.color}22` : "rgba(255,255,255,.04)" }}>{en ? w.en : w.es}</button>)}
          </div>

          <div style={{ position: "relative", height: 385, marginTop: 14, borderRadius: 22, overflow: "hidden", background: `radial-gradient(circle at 50% 115%,${world.color}55,transparent 45%),linear-gradient(#020617,#0f172a)`, border: "1px solid rgba(255,255,255,.09)" }}>
            <Stars />
            <div style={{ position: "absolute", left: 15, top: 15, padding: "8px 11px", borderRadius: 12, background: "rgba(0,0,0,.55)", fontWeight: 900, zIndex: 3 }}>{en ? "JUMP ON" : "SALTO EN"} {worldName.toUpperCase()}</div>
            <div style={{ position: "absolute", right: 15, top: 15, textAlign: "right", zIndex: 3 }}><div style={{ fontSize: 10, opacity: .55 }}>{en ? "ESTIMATED HEIGHT" : "ALTURA ESTIMADA"}</div><b style={{ fontSize: 20, color: world.color }}>{physicalHeight.toFixed(2)} m</b></div>
            <div key={`shadow-${jumpKey}`} style={{ position: "absolute", left: "50%", bottom: 51, width: 70, height: 11, transform: "translateX(-50%)", borderRadius: "50%", background: "rgba(0,0,0,.55)", filter: "blur(3px)", animation: `egShadow ${visualTime}s ease-in-out 1` }} />
            <div key={jumpKey} style={{ position: "absolute", left: "50%", bottom: 52, width: 72, height: 116, marginLeft: -36, transformOrigin: "50% 100%", "--jumpHeight": `${jumpHeight}px`, animation: `egJump ${visualTime}s cubic-bezier(.28,.72,.4,1) 1` }}><Astronaut color={world.color} /></div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 54, background: `linear-gradient(${world.color}66,${world.ground})`, borderTop: `2px solid ${world.color}99` }} />
          </div>

          <button onClick={() => setJumpKey(k => k + 1)} style={{ ...actionButton, background: `linear-gradient(90deg,${world.color}55,rgba(255,255,255,.08))` }}>⬆ {en ? "JUMP" : "SALTAR"}</button>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(135px,1fr))", gap: 9, marginTop: 13 }}>
            <Metric title={en ? "GRAVITY" : "GRAVEDAD"} value={`${world.gravity} m/s²`} />
            <Metric title={en ? "YOUR WEIGHT" : "TU PESO"} value={`${weight.toFixed(0)} N`} />
            <Metric title={en ? "AIR TIME" : "TIEMPO EN EL AIRE"} value={`${physicalAirTime.toFixed(2)} s`} />
            <Metric title={en ? "EFFORT" : "ESFUERZO"} value={`${effort}%`} />
          </div>
          <div style={{ marginTop: 14, padding: "15px 16px", borderRadius: 16, background: "linear-gradient(90deg,rgba(34,197,94,.09),rgba(14,165,233,.06))", border: "1px solid rgba(74,222,128,.16)", fontSize: 13, lineHeight: 1.55 }}><b style={{ color: "#86efac" }}>✦ {en ? "YOU DISCOVERED" : "HAS DESCUBIERTO"}</b><div style={{ marginTop: 5, opacity: .86 }}>{discovery}</div></div>
          <div style={{ marginTop: 10, fontSize: 11, lineHeight: 1.5, opacity: .55 }}>💡 {en ? "Try this: keep jump force fixed and change only your mass. Then keep mass fixed and change worlds. Which variable changes the flight?" : "Prueba esto: mantén fija la fuerza del salto y cambia solo tu masa. Después fija la masa y cambia de mundo. ¿Qué variable cambia el vuelo?"}</div>
        </div>
      </div>
    </section>
  );
}

function Control({ label, children }) { return <div style={{ padding: 15, borderRadius: 17, background: "rgba(255,255,255,.045)", border: "1px solid rgba(255,255,255,.08)" }}><div style={{ fontSize: 11, fontWeight: 950, letterSpacing: 1.1, marginBottom: 10 }}>{label}</div>{children}</div>; }
function Scale({ left, right }) { return <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, opacity: .55, marginTop: 5 }}><span>{left}</span><span>{right}</span></div>; }
function Metric({ title, value }) { return <div style={{ padding: 13, borderRadius: 15, background: "rgba(14,165,233,.08)", border: "1px solid rgba(56,189,248,.13)" }}><div style={{ fontSize: 9, fontWeight: 950, letterSpacing: 1, opacity: .52 }}>{title}</div><div style={{ fontSize: 17, fontWeight: 950, marginTop: 5 }}>{value}</div></div>; }
function Stars() { return <>{[12,25,39,67,78,88,18,54,93].map((x,i)=><i key={i} style={{ position:"absolute", left:`${x}%`, top:`${9+(i*17)%78}%`, width:2, height:2, borderRadius:"50%", background:"white", boxShadow:"0 0 5px white", opacity:.5 }}/>)}</>; }
function Astronaut({ color }) { return <div style={{ position:"relative", width:"100%", height:"100%" }}><div style={{ position:"absolute", left:18, top:0, width:36, height:36, borderRadius:"50%", background:"linear-gradient(#f8fafc,#cbd5e1)", border:"3px solid white", boxShadow:`0 0 14px ${color}66` }}><div style={{ position:"absolute", left:6, top:7, width:24, height:15, borderRadius:"45%", background:"linear-gradient(#0f172a,#38bdf8)", border:"1px solid #7dd3fc" }}/></div><div style={{ position:"absolute", left:20, top:34, width:32, height:45, borderRadius:10, background:"linear-gradient(90deg,#e2e8f0,#fff,#cbd5e1)", border:"2px solid white" }}/><div style={{ position:"absolute", left:10, top:40, width:12, height:42, borderRadius:8, background:"#e2e8f0", transform:"rotate(28deg)" }}/><div style={{ position:"absolute", right:10, top:40, width:12, height:42, borderRadius:8, background:"#e2e8f0", transform:"rotate(-28deg)" }}/><div style={{ position:"absolute", left:22, top:75, width:12, height:39, borderRadius:8, background:"#e2e8f0" }}/><div style={{ position:"absolute", right:22, top:75, width:12, height:39, borderRadius:8, background:"#e2e8f0" }}/></div>; }

const panel={borderRadius:26,border:"1px solid rgba(255,255,255,.13)",background:"linear-gradient(180deg,rgba(15,23,42,.92),rgba(2,6,23,.96))",overflow:"hidden",boxShadow:"0 24px 70px rgba(0,0,0,.32)"};
const slider={width:"100%",accentColor:"#38bdf8",cursor:"pointer"};
const backButton={color:"white",background:"transparent",border:0,padding:"10px 0",cursor:"pointer",fontWeight:950,fontSize:11,letterSpacing:1,opacity:.82};
const actionButton={marginTop:12,width:"100%",minHeight:50,borderRadius:15,border:"1px solid rgba(255,255,255,.15)",color:"white",cursor:"pointer",fontWeight:950,letterSpacing:.8};
const animations=`@keyframes egJump{0%{transform:translateY(0) scaleY(1)}10%{transform:translateY(7px) scaleY(.88)}18%{transform:translateY(0) scaleY(1.04)}48%{transform:translateY(calc(-1 * var(--jumpHeight))) scaleY(1)}78%{transform:translateY(0) scaleY(1.04)}88%{transform:translateY(7px) scaleY(.9)}100%{transform:translateY(0) scaleY(1)}} @keyframes egShadow{0%,100%{transform:translateX(-50%) scale(1);opacity:.55}48%{transform:translateX(-50%) scale(.42);opacity:.18}}`;
