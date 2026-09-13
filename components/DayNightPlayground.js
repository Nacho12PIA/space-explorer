"use client";
import {useEffect,useState} from "react";
import {useLanguage} from "../i18n/LanguageContext";

const worlds=[
 {es:"Tierra",en:"Earth",day:24,color:"#38bdf8",icon:"🌍"},
 {es:"Júpiter",en:"Jupiter",day:9.9,color:"#d6a66f",icon:"🟠"},
 {es:"Marte",en:"Mars",day:24.6,color:"#f97316",icon:"🔴"},
 {es:"Venus",en:"Venus",day:5832,color:"#f59e0b",icon:"🟡"}
];

export default function DayNightPlayground({onBack}){
 const{language}=useLanguage();const en=language==="en";
 const[step,setStep]=useState(0),[angle,setAngle]=useState(200),[speed,setSpeed]=useState(1),[running,setRunning]=useState(false),[world,setWorld]=useState(0),[turns,setTurns]=useState(0);
 const w=worlds[world];
 useEffect(()=>{if(!running)return;const id=setInterval(()=>setAngle(a=>{const n=(a+1.6*speed)%360;if(a>350&&n<20)setTurns(t=>t+1);return n}),40);return()=>clearInterval(id)},[running,speed]);
 const phase=getPhase(angle,en);
 const rotate=d=>setAngle(a=>(a+d+360)%360);
 return <section style={{marginTop:20}}><style>{css}</style>
  <button onClick={onBack} style={back}>← {en?"ALL EXPERIMENTS":"TODOS LOS EXPERIMENTOS"}</button>
  <div style={shell}>
   <header style={header}><div style={{fontSize:45}}>🌍☀️</div><small style={eyebrow}>{en?"EXPERIMENT 03":"EXPERIMENTO 03"}</small><h2 style={title}>{en?"MAKE A DAY":"FABRICA UN DÍA"}</h2><p style={intro}>{en?"Make the Sun rise, cross the sky and set. You only need to turn the planet.":"Haz que salga el Sol, cruce el cielo y se ponga. Solo tienes que girar el planeta."}</p></header>
   <div style={{padding:"0 20px 25px"}}>
    <div style={steps}>{[en?"1 · TURN":"1 · GIRA",en?"2 · SPEED":"2 · VELOCIDAD",en?"3 · WORLDS":"3 · MUNDOS"].map((x,i)=><button key={x} onClick={()=>setStep(i)} style={stepBtn(step===i)}>{x}</button>)}</div>

    {step===0&&<>
      <Instruction icon="👆" text={en?"TURN THE PLANET. What happens to the astronaut?":"GIRA EL PLANETA. ¿Qué le ocurre al astronauta?"}/>
      <DayScene angle={angle} color={w.color} phase={phase} en={en}/>
      <div style={turnControls}><button onClick={()=>rotate(-18)} style={turnButton}>↶</button><button onClick={()=>rotate(18)} style={turnButton}>↷</button></div>
      <p style={fingerHint}>{en?"Tap the arrows again and again: night → sunrise → day → sunset.":"Pulsa las flechas varias veces: noche → amanecer → día → atardecer."}</p>
      <Discovery en={en}>{en?"The Sun is not moving around the astronaut. The planet turns, carrying the astronaut from darkness into sunlight and back again.":"El Sol no está dando vueltas alrededor del astronauta. El planeta gira y lleva al astronauta desde la oscuridad hasta la luz y de nuevo a la oscuridad."}</Discovery>
      <button onClick={()=>setStep(1)} style={action}>{en?"I GET IT → WHAT IF IT SPINS FASTER?":"LO ENTIENDO → ¿Y SI GIRA MÁS RÁPIDO?"}</button>
    </>}

    {step===1&&<>
      <Instruction icon="⏩" text={en?"START TIME and change the speed. Count how quickly a whole day passes.":"INICIA EL TIEMPO y cambia la velocidad. Mira cuánto tarda en pasar un día completo."}/>
      <DayScene angle={angle} color={w.color} phase={phase} en={en}/>
      <div style={speedBox}><b>{en?"PLANET SPEED":"VELOCIDAD DEL PLANETA"}</b><div style={speedButtons}>{[[.5,en?"SLOW":"LENTO"],[1,en?"NORMAL":"NORMAL"],[3,en?"FAST":"RÁPIDO"],[7,en?"CRAZY":"LOCURA"]].map(([v,l])=><button key={v} onClick={()=>setSpeed(v)} style={pill(speed===v)}>{l}</button>)}</div></div>
      <button onClick={()=>setRunning(x=>!x)} style={action}>{running?(en?"⏸ STOP TIME":"⏸ PARAR EL TIEMPO"):(en?"▶ START TIME":"▶ INICIAR EL TIEMPO")}</button>
      <div style={metrics}><Metric n={turns} l={en?"DAYS COMPLETED":"DÍAS COMPLETADOS"}/><Metric n={speed+"×"} l={en?"SPIN SPEED":"VELOCIDAD DE GIRO"}/></div>
      <Challenge ok={turns>=2}>{turns>=2?(en?"You made several days pass. Faster spin = shorter day.":"Has hecho pasar varios días. Más velocidad de giro = día más corto."):(en?"Challenge: make 2 complete days pass. Then try a different speed.":"Reto: haz que pasen 2 días completos. Después prueba otra velocidad.")}</Challenge>
      <button onClick={()=>{setRunning(false);setStep(2)}} style={action}>{en?"NEXT → TRY OTHER WORLDS":"SIGUIENTE → PRUEBA OTROS MUNDOS"}</button>
    </>}

    {step===2&&<>
      <Instruction icon="🪐" text={en?"Now compare real planet day lengths. Pick a world and watch how fast it turns.":"Ahora compara la duración real del día de varios planetas. Elige un mundo y observa cómo gira."}/>
      <div style={worldRow}>{worlds.map((x,i)=><button key={x.es} onClick={()=>{setWorld(i);setSpeed(Math.max(.35,Math.min(5,24/x.day)));setTurns(0)}} style={worldBtn(world===i)}><span>{x.icon}</span>{en?x.en:x.es}<small>{formatDay(x.day,en)}</small></button>)}</div>
      <DayScene angle={angle} color={w.color} phase={phase} en={en}/>
      <button onClick={()=>setRunning(x=>!x)} style={action}>{running?(en?"⏸ PAUSE":"⏸ PAUSA"):(en?"▶ WATCH IT TURN":"▶ VERLO GIRAR")}</button>
      <div style={bigFact}><span>{w.icon}</span><div><b>{en?w.en:w.es}</b><strong>{formatDay(w.day,en)}</strong><small>{en?"one rotation":"una rotación"}</small></div></div>
      <Discovery en={en}>{en?"Jupiter completes a rotation in about 10 hours, while Venus needs thousands of hours. Different worlds can have completely different days.":"Júpiter completa una rotación en unas 10 horas, mientras Venus necesita miles de horas. Los días pueden ser completamente distintos en otros mundos."}</Discovery>
    </>}
   </div>
  </div>
 </section>
}

function DayScene({angle,color,phase,en}){const r=102,cx=245,cy=190,rad=angle*Math.PI/180,x=cx+Math.cos(rad)*r,y=cy+Math.sin(rad)*r;return <div style={scene}>
 <div className="spaceStars">✦　·　✧　　　·　✦　　　·　✧</div><div className="simpleSun">☀️</div><div className="sunRays"/>
 <div className="bigPlanet" style={{background:"linear-gradient(90deg,"+color+" 0%,"+color+" 45%,#101827 55%,#010409 100%)"}}/>
 <div className="person" style={{left:x,top:y,transform:"translate(-50%,-50%) rotate("+(angle+90)+"deg)"}}>🧑‍🚀</div>
 <div className="phaseCard"><b>{phase.icon} {phase.name}</b><small>{phase.help}</small></div>
 <div className="skyStrip" style={{background:phase.sky}}><span>{phase.skyIcon}</span><b>{en?"WHAT THE ASTRONAUT SEES":"LO QUE VE EL ASTRONAUTA"}</b><span>{phase.skyIcon}</span></div>
 </div>}
function getPhase(a,en){const c=(a+360)%360;if(c>135&&c<=225)return{icon:"☀️",name:en?"DAY":"DÍA",help:en?"The astronaut is on the sunlit side":"El astronauta está en la zona iluminada",sky:"linear-gradient(#38bdf8,#dbeafe)",skyIcon:"☀️"};if(c>225&&c<=285)return{icon:"🌇",name:en?"SUNSET":"ATARDECER",help:en?"The astronaut is leaving the light":"El astronauta sale de la zona iluminada",sky:"linear-gradient(#2563eb,#f97316)",skyIcon:"🌇"};if(c>285||c<=75)return{icon:"🌙",name:en?"NIGHT":"NOCHE",help:en?"The astronaut is on the dark side":"El astronauta está en la zona oscura",sky:"linear-gradient(#020617,#172554)",skyIcon:"✨"};return{icon:"🌅",name:en?"SUNRISE":"AMANECER",help:en?"The astronaut is entering the light":"El astronauta entra en la zona iluminada",sky:"linear-gradient(#7c3aed,#fb923c)",skyIcon:"🌅"}}
function Instruction({icon,text}){return <div style={instruction}><span>{icon}</span><b>{text}</b></div>}
function Metric({n,l}){return <div style={metric}><strong>{n}</strong><small>{l}</small></div>}
function Challenge({ok,children}){return <div style={{...challenge,borderColor:ok?"rgba(74,222,128,.45)":"rgba(251,191,36,.3)"}}><b>{ok?"✅":"🎯"} RETO / CHALLENGE</b><div>{children}</div></div>}
function Discovery({children,en}){return <div style={discovery}><b>💡 {en?"YOU DISCOVERED":"HAS DESCUBIERTO"}</b><div>{children}</div></div>}
function formatDay(h,en){return h<48?h.toFixed(1)+" h":Math.round(h/24)+(en?" days":" días")}

const shell={borderRadius:26,border:"1px solid rgba(255,255,255,.13)",background:"linear-gradient(#0f172a,#020617)",overflow:"hidden"},header={padding:"24px 20px 17px",background:"radial-gradient(circle at 90% 0%,rgba(56,189,248,.2),transparent 42%)"},back={background:"none",border:0,color:"white",fontWeight:900,padding:"10px 0",opacity:.8},eyebrow={display:"block",color:"#7dd3fc",fontWeight:900,letterSpacing:2},title={fontSize:"clamp(30px,7vw,46px)",margin:"5px 0 8px"},intro={maxWidth:680,lineHeight:1.55,opacity:.78,margin:0},steps={display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,margin:"10px 0"},stepBtn=a=>({padding:"11px 4px",borderRadius:12,border:a?"1px solid #38bdf8":"1px solid rgba(255,255,255,.08)",background:a?"rgba(14,165,233,.16)":"rgba(255,255,255,.03)",color:"white",fontWeight:900,fontSize:11}),instruction={display:"flex",alignItems:"center",gap:11,padding:13,borderRadius:14,background:"rgba(56,189,248,.08)",border:"1px solid rgba(56,189,248,.16)",marginBottom:10,lineHeight:1.35},scene={position:"relative",height:430,borderRadius:20,overflow:"hidden",background:"radial-gradient(circle at 16% 38%,rgba(251,191,36,.11),#020617 58%)",border:"1px solid rgba(255,255,255,.09)"},turnControls={display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:9},turnButton={minHeight:58,borderRadius:15,border:"1px solid rgba(125,211,252,.25)",background:"rgba(14,165,233,.12)",color:"white",fontSize:31,fontWeight:900},fingerHint={textAlign:"center",fontSize:12,opacity:.65},action={width:"100%",minHeight:52,marginTop:10,borderRadius:14,border:"1px solid rgba(125,211,252,.3)",background:"linear-gradient(90deg,#0369a1,#2563eb)",color:"white",fontWeight:950},speedBox={marginTop:10,padding:13,borderRadius:14,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)"},speedButtons={display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginTop:9},pill=a=>({padding:"10px 4px",borderRadius:11,border:a?"1px solid #7dd3fc":"1px solid rgba(255,255,255,.08)",background:a?"rgba(14,165,233,.2)":"rgba(255,255,255,.03)",color:"white",fontWeight:900,fontSize:10}),metrics={display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:9},metric={display:"flex",flexDirection:"column",padding:13,borderRadius:13,background:"rgba(56,189,248,.07)",border:"1px solid rgba(56,189,248,.12)"},challenge={marginTop:10,padding:14,borderRadius:14,background:"rgba(251,191,36,.06)",border:"1px solid",lineHeight:1.45},discovery={marginTop:10,padding:14,borderRadius:14,background:"rgba(34,197,94,.07)",border:"1px solid rgba(74,222,128,.18)",lineHeight:1.45},worldRow={display:"flex",gap:7,overflowX:"auto",padding:"2px 0 10px"},worldBtn=a=>({flex:"1 0 105px",display:"flex",flexDirection:"column",gap:3,alignItems:"center",padding:10,borderRadius:13,border:a?"1px solid #38bdf8":"1px solid rgba(255,255,255,.08)",background:a?"rgba(14,165,233,.14)":"rgba(255,255,255,.03)",color:"white",fontWeight:900}),bigFact={display:"flex",alignItems:"center",gap:14,marginTop:10,padding:15,borderRadius:15,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",fontSize:28};
const css=".spaceStars{position:absolute;inset:15px;color:white;opacity:.35;letter-spacing:12px}.simpleSun{position:absolute;left:25px;top:145px;font-size:78px;filter:drop-shadow(0 0 25px #f59e0b)}.sunRays{position:absolute;left:80px;top:130px;width:190px;height:120px;background:linear-gradient(90deg,rgba(253,224,71,.18),transparent);clip-path:polygon(0 25%,100% 0,100% 100%,0 75%)}.bigPlanet{position:absolute;left:245px;top:190px;width:205px;height:205px;margin:-102px;border-radius:50%;box-shadow:0 0 32px rgba(56,189,248,.22)}.person{position:absolute;font-size:29px;z-index:5;transition:all .16s ease}.phaseCard{position:absolute;left:12px;top:12px;display:flex;flex-direction:column;padding:9px 11px;border-radius:12px;background:rgba(0,0,0,.58);z-index:7}.phaseCard small{font-size:9px;opacity:.7;margin-top:3px}.skyStrip{position:absolute;left:12px;right:12px;bottom:12px;height:72px;border-radius:14px;display:flex;align-items:center;justify-content:space-around;color:white;text-shadow:0 1px 5px #000;font-size:11px;font-weight:900;transition:background .2s}.skyStrip span{font-size:28px}@media(max-width:560px){.simpleSun{left:10px;font-size:58px}.bigPlanet{left:68%;width:170px;height:170px;margin:-85px}.person{font-size:25px}.speedButtons{grid-template-columns:repeat(2,1fr)}}";
