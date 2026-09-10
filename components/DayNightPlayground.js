"use client";
import {useEffect,useMemo,useState} from "react";
import {useLanguage} from "../i18n/LanguageContext";

const planets=[
 {es:"Mercurio",en:"Mercury",day:1407.6,tilt:.03,color:"#a8a29e",icon:"⚪"},
 {es:"Venus",en:"Venus",day:5832.5,tilt:177.4,color:"#f59e0b",icon:"🟡"},
 {es:"Tierra",en:"Earth",day:24,tilt:23.4,color:"#38bdf8",icon:"🌍"},
 {es:"Marte",en:"Mars",day:24.6,tilt:25.2,color:"#f97316",icon:"🔴"},
 {es:"Júpiter",en:"Jupiter",day:9.9,tilt:3.1,color:"#d6a66f",icon:"🟠"},
 {es:"Saturno",en:"Saturn",day:10.7,tilt:26.7,color:"#fde68a",icon:"🪐"},
 {es:"Urano",en:"Uranus",day:17.2,tilt:97.8,color:"#67e8f9",icon:"🩵"},
 {es:"Neptuno",en:"Neptune",day:16.1,tilt:28.3,color:"#3b82f6",icon:"🔵"}
];

export default function DayNightPlayground({onBack}){
 const{language}=useLanguage();const en=language==="en";
 const[mode,setMode]=useState("rotation"),[pi,setPi]=useState(2),[hours,setHours]=useState(24),[tilt,setTilt]=useState(23.4),[angle,setAngle]=useState(0),[paused,setPaused]=useState(false),[prediction,setPrediction]=useState(null),[revealed,setRevealed]=useState(false),[compareA,setCompareA]=useState(2),[compareB,setCompareB]=useState(4);
 const p=planets[pi];
 useEffect(()=>{if(paused)return;const id=setInterval(()=>setAngle(a=>(a+Math.max(.5,6*(24/hours)))%360),50);return()=>clearInterval(id)},[hours,paused]);
 useEffect(()=>{setHours(p.day);setTilt(p.tilt);setRevealed(false);setPrediction(null)},[pi]);
 const daylight=useMemo(()=>Math.max(4,Math.min(20,12+Math.sin((Math.min(tilt,100)*Math.PI)/180)*4*Math.cos((angle*Math.PI)/180))),[tilt,angle]);
 const season=tilt<5?(en?"WEAK SEASONS":"ESTACIONES DÉBILES"):tilt>60?(en?"EXTREME SEASONS":"ESTACIONES EXTREMAS"):(en?"CLEAR SEASONS":"ESTACIONES MARCADAS");
 const periodLabel=formatDay(hours,en);
 const a=planets[compareA],b=planets[compareB],faster=a.day<b.day?"a":a.day>b.day?"b":"tie";
 return <section style={{marginTop:20}}><style>{css}</style>
  <button onClick={onBack} style={back}>← {en?"ALL EXPERIMENTS":"TODOS LOS EXPERIMENTOS"}</button>
  <div style={shell}>
   <header style={{padding:"24px 20px 17px",background:"radial-gradient(circle at 90% 0%,rgba(96,165,250,.18),transparent 40%)"}}>
    <div style={{fontSize:44}}>🌗</div><small style={eyebrow}>{en?"EXPERIMENT 03 · PLANET CLOCK":"EXPERIMENTO 03 · RELOJ PLANETARIO"}</small>
    <h2 style={{fontSize:"clamp(30px,7vw,46px)",margin:"5px 0 8px"}}>{en?"MAKE A DAY":"FABRICA UN DÍA"}</h2>
    <p style={intro}>{en?"Control rotation, axial tilt and seasons. Compare worlds and predict which one spins faster.":"Controla la rotación, la inclinación axial y las estaciones. Compara mundos y predice cuál gira más rápido."}</p>
   </header>
   <div style={{padding:"0 20px 25px"}}>
    <nav style={tabs}>{[["rotation","🕒",en?"ROTATION":"ROTACIÓN"],["tilt","🌞",en?"SEASONS":"ESTACIONES"],["compare","⚔️",en?"COMPARE":"COMPARAR"]].map(x=><button key={x[0]} onClick={()=>setMode(x[0])} style={tab(mode===x[0])}>{x[1]} {x[2]}</button>)}</nav>

    {mode==="rotation"&&<>
      <Worlds value={pi} set={setPi} en={en}/>
      <Range label={(en?"DAY LENGTH":"DURACIÓN DEL DÍA")+" · "+periodLabel} min={5} max={100} step={1} value={Math.min(hours,100)} set={setHours}/>
      <PlanetScene p={p} angle={angle} tilt={tilt} daylight={daylight}/>
      <button onClick={()=>setPaused(x=>!x)} style={action}>{paused?(en?"▶ RESUME PLANET":"▶ REANUDAR PLANETA"):(en?"⏸ FREEZE PLANET":"⏸ CONGELAR PLANETA")}</button>
      <div style={metrics}><Metric n={periodLabel} l={en?"DAY LENGTH":"DURACIÓN DEL DÍA"}/><Metric n={hours<24?(en?"FASTER":"MÁS RÁPIDO"):hours>24?(en?"SLOWER":"MÁS LENTO"):(en?"EARTH-LIKE":"COMO LA TIERRA")} l={en?"ROTATION":"ROTACIÓN"}/><Metric n={daylight.toFixed(1)+" h"} l={en?"DAYLIGHT NOW":"HORAS DE LUZ"}/></div>
      <Challenge ok={Math.abs(hours-24)<2}>{Math.abs(hours-24)<2?(en?"You created an Earth-like day. Now make a world with a day under 12 hours.":"Has creado un día parecido al terrestre. Ahora crea uno de menos de 12 horas."):(en?"Challenge: adjust rotation until the day is close to 24 hours.":"Reto: ajusta la rotación hasta acercarte a 24 horas.")}</Challenge>
      <Discovery en={en}>{en?"Day and night happen because a planet rotates. Faster rotation means shorter days; slower rotation means longer days.":"El día y la noche ocurren porque el planeta gira. Una rotación más rápida produce días más cortos; una más lenta, días más largos."}</Discovery>
    </>}

    {mode==="tilt"&&<>
      <Worlds value={pi} set={setPi} en={en}/>
      <Range label={(en?"AXIAL TILT":"INCLINACIÓN AXIAL")+" · "+Math.min(tilt,100).toFixed(1)+"°"} min={0} max={100} step={1} value={Math.min(tilt,100)} set={setTilt}/>
      <SeasonScene tilt={tilt} p={p}/>
      <div style={metrics}><Metric n={Math.min(tilt,100).toFixed(1)+"°"} l={en?"AXIAL TILT":"INCLINACIÓN AXIAL"}/><Metric n={season} l={en?"SEASONS":"ESTACIONES"}/><Metric n={tilt>80?(en?"SIDEWAYS WORLD":"MUNDO DE LADO"):tilt<5?(en?"ALMOST UPRIGHT":"CASI RECTO"):(en?"TILTED":"INCLINADO")} l={en?"AXIS":"EJE"}/></div>
      <Challenge ok={tilt>85}>{tilt>85?(en?"You recreated Uranus-like tilt: the planet is almost rolling around the Sun.":"Has recreado una inclinación tipo Urano: el planeta casi rueda alrededor del Sol."):(en?"Challenge: tilt the planet beyond 85°. What happens to the seasons?":"Reto: inclina el planeta más de 85°. ¿Qué ocurre con las estaciones?")}</Challenge>
      <Discovery en={en}>{en?"Axial tilt is one of the main causes of seasons. A larger tilt usually makes seasonal differences stronger. Uranus is extreme because its axis is tilted by about 98°.":"La inclinación axial es una de las principales causas de las estaciones. Una inclinación mayor suele hacer más fuertes las diferencias estacionales. Urano es extremo porque su eje está inclinado unos 98°."}</Discovery>
    </>}

    {mode==="compare"&&<>
      <div style={duelControls}><SelectWorld label="A" value={compareA} set={setCompareA} en={en}/><SelectWorld label="B" value={compareB} set={setCompareB} en={en}/></div>
      <div style={predictionBox}><b>🔮 {en?"PREDICT BEFORE WATCHING":"PREDICE ANTES DE MIRAR"}</b><p>{en?"Which planet completes one rotation first?":"¿Qué planeta completa antes una rotación?"}</p><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><Pred active={prediction==="a"} onClick={()=>{setPrediction("a");setRevealed(false)}}>A · {a.icon}</Pred><Pred active={prediction==="tie"} onClick={()=>{setPrediction("tie");setRevealed(false)}}>{en?"SAME":"IGUAL"}</Pred><Pred active={prediction==="b"} onClick={()=>{setPrediction("b");setRevealed(false)}}>B · {b.icon}</Pred></div></div>
      <CompareScene a={a} b={b} en={en}/>
      <button disabled={!prediction} onClick={()=>setRevealed(true)} style={{...action,opacity:prediction?1:.45}}>⚔️ {en?"START ROTATION RACE":"INICIAR CARRERA DE ROTACIÓN"}</button>
      {revealed&&<div style={{...result,borderColor:prediction===faster?"rgba(74,222,128,.4)":"rgba(251,191,36,.4)"}}><b>{prediction===faster?(en?"✅ CORRECT":"✅ CORRECTO"):(en?"💡 DIFFERENT RESULT":"💡 RESULTADO DIFERENTE")}</b><div style={{marginTop:6}}>{faster==="a"?"A · "+(en?a.en:a.es)+" "+(en?"spins faster.":"gira más rápido."):faster==="b"?"B · "+(en?b.en:b.es)+" "+(en?"spins faster.":"gira más rápido."):(en?"Both have the same rotation period.":"Ambos tienen el mismo periodo de rotación.")}</div></div>}
      <div style={metrics}><Metric n={formatDay(a.day,en)} l={"A · "+(en?"DAY":"DÍA")}/><Metric n={formatDay(b.day,en)} l={"B · "+(en?"DAY":"DÍA")}/><Metric n={a.tilt.toFixed(1)+"°"} l={"A · "+(en?"TILT":"INCLINACIÓN")}/><Metric n={b.tilt.toFixed(1)+"°"} l={"B · "+(en?"TILT":"INCLINACIÓN")}/></div>
      <Discovery en={en}>{en?"Planets can be wildly different: Jupiter spins in about 10 hours, while Venus takes thousands of hours and rotates in the opposite direction.":"Los planetas pueden ser muy distintos: Júpiter gira en unas 10 horas, mientras Venus tarda miles de horas y rota en sentido contrario."}</Discovery>
    </>}
   </div>
  </div>
 </section>
}

function Worlds({value,set,en}){return <div style={{display:"flex",gap:7,overflowX:"auto",padding:"10px 0"}}>{planets.map((p,i)=><button key={p.es} onClick={()=>set(i)} style={{flex:"1 0 92px",padding:"10px 7px",borderRadius:14,border:value===i?"2px solid "+p.color:"1px solid rgba(255,255,255,.09)",background:value===i?p.color+"20":"rgba(255,255,255,.035)",color:"white",fontWeight:900}}><div>{p.icon}</div>{en?p.en:p.es}</button>)}</div>}
function Range({label,min,max,step,value,set}){return <div style={control}><b style={{fontSize:11}}>{label}</b><input type="range" min={min} max={max} step={step} value={value} onChange={e=>set(+e.target.value)} style={{width:"100%",marginTop:12,accentColor:"#60a5fa"}}/></div>}
function PlanetScene({p,angle,tilt,daylight}){return <div style={scene}><div className="dnSun"/><div className="planetWrap" style={{transform:"translate(-50%,-50%) rotate("+Math.min(tilt,100)+"deg)"}}><div className="planet" style={{background:"linear-gradient(90deg,"+p.color+" 0%,"+p.color+" 47%,#020617 53%,#000 100%)",transform:"rotate("+angle+"deg)"}}><span className="city">●</span></div><div className="axis"/></div><div style={{position:"absolute",left:12,bottom:12,fontSize:11,opacity:.7}}>☀️ {daylight.toFixed(1)} h</div></div>}
function SeasonScene({tilt,p}){return <div style={scene}><div className="dnSun" style={{left:"18%"}}/><div style={{position:"absolute",left:"66%",top:"50%",transform:"translate(-50%,-50%) rotate("+Math.min(tilt,100)+"deg)",transition:"transform .25s ease"}}><div style={{width:150,height:150,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#fff,"+p.color+" 12%,"+p.color+" 58%,#0f172a)",boxShadow:"0 0 30px "+p.color+"55"}}/><div style={{position:"absolute",left:"50%",top:-35,bottom:-35,width:3,background:"#fff",transform:"translateX(-50%)",opacity:.75}}></div><div style={{position:"absolute",left:"61%",top:"17%",fontSize:11,opacity:.72}}>N</div><div style={{position:"absolute",left:"70%",bottom:"15%",fontSize:11,opacity:.72}}>S</div></div></div>}
function CompareScene({a,b,en}){return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}><SpinLane p={a} en={en}/><SpinLane p={b} en={en}/></div>}
function SpinLane({p,en}){const dur=Math.max(1.4,Math.min(12,p.day/6));return <div style={{...scene,height:290,marginTop:0}}><div style={{position:"absolute",top:10,left:10,fontWeight:900}}>{p.icon} {en?p.en:p.es}</div><div className="spinPlanet" style={{background:"radial-gradient(circle at 35% 35%,#fff,"+p.color+" 16%,"+p.color+" 62%,#111827)",animationDuration:dur+"s"}}><span>✦</span></div><div style={{position:"absolute",left:0,right:0,bottom:12,textAlign:"center",fontSize:11,opacity:.7}}>{formatDay(p.day,en)}</div></div>}
function SelectWorld({label,value,set,en}){return <div style={control}><b>{label}</b><select value={value} onChange={e=>set(+e.target.value)} style={select}>{planets.map((p,i)=><option key={p.es} value={i}>{en?p.en:p.es}</option>)}</select></div>}
function Pred({active,onClick,children}){return <button onClick={onClick} style={{padding:"10px 13px",borderRadius:12,border:active?"1px solid #c084fc":"1px solid rgba(255,255,255,.1)",background:active?"rgba(168,85,247,.18)":"rgba(255,255,255,.04)",color:"white",fontWeight:900}}>{children}</button>}
function Metric({n,l}){return <div style={metric}><b style={{fontSize:18}}>{n}</b><small>{l}</small></div>}
function Challenge({ok,children}){return <div style={{...challenge,borderColor:ok?"rgba(74,222,128,.3)":"rgba(251,191,36,.25)"}}><b>🎯 RETO / CHALLENGE</b><div style={{marginTop:6}}>{children}</div></div>}
function Discovery({children,en}){return <div style={discovery}><b>✦ {en?"YOU DISCOVERED":"HAS DESCUBIERTO"}</b><div style={{marginTop:6}}>{children}</div></div>}
function formatDay(h,en){return h<48?h.toFixed(1)+" h":h<1000?(h/24).toFixed(1)+(en?" days":" días"):(h/24).toFixed(0)+(en?" days":" días")}

const shell={borderRadius:26,border:"1px solid rgba(255,255,255,.13)",background:"linear-gradient(#0f172a,#020617)",overflow:"hidden",boxShadow:"0 25px 70px rgba(0,0,0,.35)"},back={background:"none",border:0,color:"white",fontWeight:900,padding:"10px 0",cursor:"pointer",opacity:.8},eyebrow={display:"block",marginTop:8,color:"#93c5fd",fontWeight:900,letterSpacing:2},intro={maxWidth:720,lineHeight:1.55,opacity:.75,margin:0},tabs={display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,margin:"8px 0 10px"},tab=a=>({padding:"12px 5px",borderRadius:13,border:a?"1px solid #60a5fa":"1px solid rgba(255,255,255,.08)",background:a?"rgba(96,165,250,.13)":"rgba(255,255,255,.035)",color:"white",fontWeight:900}),control={padding:13,borderRadius:14,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)"},scene={position:"relative",height:390,borderRadius:20,overflow:"hidden",border:"1px solid rgba(255,255,255,.09)",marginTop:12,background:"radial-gradient(circle at 20% 50%,rgba(251,191,36,.12),#020617 62%)"},action={width:"100%",minHeight:52,marginTop:10,borderRadius:14,border:"1px solid rgba(96,165,250,.3)",background:"linear-gradient(90deg,#1d4ed8,#2563eb)",color:"white",fontWeight:950,fontSize:14},metrics={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(125px,1fr))",gap:7,marginTop:10},metric={display:"flex",flexDirection:"column",gap:4,padding:12,borderRadius:13,background:"rgba(96,165,250,.07)",border:"1px solid rgba(96,165,250,.12)"},challenge={marginTop:12,padding:14,borderRadius:15,background:"rgba(251,191,36,.06)",border:"1px solid"},discovery={marginTop:12,padding:14,borderRadius:15,background:"linear-gradient(90deg,rgba(34,197,94,.09),rgba(96,165,250,.05))",border:"1px solid rgba(74,222,128,.16)",fontSize:13,lineHeight:1.5},duelControls={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:8},predictionBox={marginTop:10,padding:14,borderRadius:15,background:"rgba(168,85,247,.08)",border:"1px solid rgba(192,132,252,.18)"},result={marginTop:10,padding:14,borderRadius:15,background:"rgba(255,255,255,.05)",border:"1px solid"},select={width:"100%",marginTop:9,padding:9,borderRadius:10,background:"#111827",color:"white",border:"1px solid rgba(255,255,255,.12)"};
const css=".dnSun{position:absolute;left:16%;top:50%;width:92px;height:92px;margin:-46px;border-radius:50%;background:radial-gradient(circle,#fff,#fde047 20%,#f59e0b 60%,#b45309);box-shadow:0 0 35px #f59e0b,0 0 90px rgba(245,158,11,.4)}.planetWrap{position:absolute;left:66%;top:50%;width:170px;height:170px;transition:transform .25s}.planet{position:absolute;inset:0;border-radius:50%;box-shadow:0 0 28px rgba(56,189,248,.3)}.axis{position:absolute;left:50%;top:-25px;bottom:-25px;width:3px;background:#fff;opacity:.7}.city{position:absolute;left:73%;top:47%;color:white;filter:drop-shadow(0 0 5px white)}.spinPlanet{position:absolute;left:50%;top:50%;width:130px;height:130px;margin:-65px;border-radius:50%;animation:spin linear infinite;box-shadow:0 0 24px rgba(255,255,255,.16)}.spinPlanet span{position:absolute;right:18px;top:52px}@keyframes spin{to{transform:rotate(360deg)}}@media(max-width:560px){.planetWrap{left:70%;width:140px;height:140px}.dnSun{width:72px;height:72px;margin:-36px}.spinPlanet{width:105px;height:105px;margin:-52px}}";
