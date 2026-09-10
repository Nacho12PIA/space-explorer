"use client";
import {useMemo,useState} from "react";
import {useLanguage} from "../i18n/LanguageContext";

const presets=[
 {id:"mercury",es:"Mercurio",en:"Mercury",d:.39,icon:"⚪"},
 {id:"venus",es:"Venus",en:"Venus",d:.72,icon:"🟡"},
 {id:"earth",es:"Tierra",en:"Earth",d:1,icon:"🌍"},
 {id:"mars",es:"Marte",en:"Mars",d:1.52,icon:"🔴"},
 {id:"custom",es:"Libre",en:"Custom",d:1.1,icon:"🛰️"}
];
const calc=(distance,mass)=>{
 const speed=29.78/Math.sqrt(distance);
 const year=Math.pow(distance,1.5);
 const temp=Math.round(278/Math.sqrt(distance)-273);
 const force=(mass/(distance*distance));
 return{speed,year,temp,force};
};

export default function OrbitPlayground({onBack}){
 const{language}=useLanguage();const en=language==="en";
 const[mode,setMode]=useState("orbit"),[distance,setDistance]=useState(1),[planetMass,setPlanetMass]=useState(1),[starMass,setStarMass]=useState(1),[run,setRun]=useState(0),[history,setHistory]=useState([]);
 const[prediction,setPrediction]=useState(null),[revealed,setRevealed]=useState(false),[duelA,setDuelA]=useState(.72),[duelB,setDuelB]=useState(1.52),[duelRun,setDuelRun]=useState(0);
 const effectiveDistance=distance;
 const base=calc(effectiveDistance,planetMass);
 const speed=base.speed*Math.sqrt(starMass),year=base.year/Math.sqrt(starMass),temp=Math.round((278*Math.pow(starMass,.875))/Math.sqrt(distance)-273),force=planetMass*starMass/(distance*distance);
 const orbitRadius=Math.max(75,Math.min(170,70+distance*45));
 const animTime=Math.max(2.4,Math.min(12,year*5));
 const zone=temp>80?"HOT":temp<0?"COLD":"HABITABLE-ish";
 const zoneText=en?(zone==="HOT"?"VERY HOT":zone==="COLD"?"VERY COLD":"TEMPERATE ZONE"):(zone==="HOT"?"MUY CALIENTE":zone==="COLD"?"MUY FRÍA":"ZONA TEMPLADA");
 const addHistory=()=>{setRun(x=>x+1);setHistory(h=>[{d:distance,s:speed,y:year,t:temp},...h].slice(0,4))};
 const resultPred=distance<1?"shorter":"longer";
 const predCorrect=prediction===resultPred;
 const revealPrediction=()=>{setRevealed(true);setRun(x=>x+1)};
 const da=calc(duelA,1),db=calc(duelB,1);
 return <section style={{marginTop:20}}><style>{css}</style>
  <button onClick={onBack} style={back}>← {en?"ALL EXPERIMENTS":"TODOS LOS EXPERIMENTOS"}</button>
  <div style={shell}>
   <header style={{padding:"24px 20px 17px",background:"radial-gradient(circle at 90% 0%,rgba(251,191,36,.18),transparent 40%)"}}><div style={{fontSize:44}}>🪐</div><small style={eyebrow}>{en?"EXPERIMENT 02 · ORBIT LAB":"EXPERIMENTO 02 · LABORATORIO ORBITAL"}</small><h2 style={{fontSize:"clamp(30px,7vw,46px)",margin:"5px 0 8px"}}>{en?"MASTER AN ORBIT":"DOMINA UNA ÓRBITA"}</h2><p style={intro}>{en?"Move a planet, change its star and compare two solar systems. Discover what controls speed, year length and temperature.":"Mueve un planeta, cambia su estrella y compara dos sistemas. Descubre qué controla la velocidad, la duración del año y la temperatura."}</p></header>
   <div style={{padding:"0 20px 25px"}}>
    <nav style={tabs}>{[["orbit","🌀",en?"BUILD":"CREAR"],["predict","🔮",en?"PREDICT":"PREDECIR"],["duel","⚔️",en?"DUEL":"DUELO"]].map(([id,ic,n])=><button key={id} onClick={()=>setMode(id)} style={tab(mode===id)}>{ic} {n}</button>)}</nav>

    {mode==="orbit"&&<>
      <div style={presetRow}>{presets.map(p=><button key={p.id} onClick={()=>setDistance(p.d)} style={preset(Math.abs(distance-p.d)<.03)}><span>{p.icon}</span>{en?p.en:p.es}</button>)}</div>
      <div style={controls}><Range label={`${en?"DISTANCE FROM STAR":"DISTANCIA A LA ESTRELLA"} · ${distance.toFixed(2)} AU`} min={.3} max={2.5} step={.05} value={distance} set={setDistance}/><Range label={`${en?"STAR MASS":"MASA DE LA ESTRELLA"} · ${starMass.toFixed(1)} ☉`} min={.5} max={1.8} step={.1} value={starMass} set={setStarMass}/><Range label={`${en?"PLANET MASS":"MASA DEL PLANETA"} · ${planetMass.toFixed(1)} ⊕`} min={.2} max={5} step={.1} value={planetMass} set={setPlanetMass}/></div>
      <OrbitScene radius={orbitRadius} speed={animTime} run={run} distance={distance} starMass={starMass} temp={temp}/>
      <button onClick={addHistory} style={action}>🌀 {en?"RUN ORBIT":"SIMULAR ÓRBITA"}</button>
      <div style={metrics}><Metric n={`${speed.toFixed(1)} km/s`} l={en?"ORBIT SPEED":"VELOCIDAD"}/><Metric n={year<1?`${Math.round(year*365)} d`:`${year.toFixed(2)} y`} l={en?"YEAR LENGTH":"DURACIÓN DEL AÑO"}/><Metric n={`${temp} °C`} l={en?"SIMPLE TEMP. MODEL":"TEMP. SIMPLIFICADA"}/><Metric n={zoneText} l={en?"THERMAL ZONE":"ZONA TÉRMICA"}/></div>
      <Challenge ok={temp>=0&&temp<=50}>{temp>=0&&temp<=50?(en?"You found a temperate orbit in this simplified model. Can you keep it temperate around a more massive star?":"Has encontrado una órbita templada en este modelo simplificado. ¿Puedes mantenerla templada alrededor de una estrella más masiva?"):(en?"Challenge: adjust distance and star mass until the model shows 0–50 °C.":"Reto: ajusta distancia y masa estelar hasta que el modelo marque entre 0 y 50 °C.")}</Challenge>
      {history.length>0&&<div style={box}><b>{en?"LAST ORBITS":"ÚLTIMAS ÓRBITAS"}</b>{history.map((x,i)=><div key={i} style={row}><span>{x.d.toFixed(2)} AU</span><span>{x.s.toFixed(1)} km/s</span><span>{x.y.toFixed(2)} y</span><span>{x.t} °C</span></div>)}</div>}
      <Discovery>{en?"Distance has a huge effect: closer planets move faster and complete shorter years. Increasing the star's mass also speeds up the orbit. Planet mass barely changes its own orbital period in this simplified model.":"La distancia manda muchísimo: los planetas cercanos se mueven más rápido y tienen años más cortos. Aumentar la masa de la estrella también acelera la órbita. En este modelo simplificado, la masa del planeta apenas cambia su propio periodo orbital."}</Discovery>
    </>}

    {mode==="predict"&&<>
      <div style={predictionBox}><b>🔮 {en?"MAKE A PREDICTION":"HAZ UNA PREDICCIÓN"}</b><p>{en?`If the planet is at ${distance.toFixed(2)} AU, will its year be shorter or longer than Earth's?`:`Si el planeta está a ${distance.toFixed(2)} UA, ¿su año será más corto o más largo que el terrestre?`}</p><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><Pred active={prediction==="shorter"} onClick={()=>{setPrediction("shorter");setRevealed(false)}}>{en?"SHORTER":"MÁS CORTO"}</Pred><Pred active={prediction==="longer"} onClick={()=>{setPrediction("longer");setRevealed(false)}}>{en?"LONGER":"MÁS LARGO"}</Pred></div></div>
      <Range label={`${en?"DISTANCE":"DISTANCIA"} · ${distance.toFixed(2)} AU`} min={.3} max={2.5} step={.05} value={distance} set={v=>{setDistance(v);setRevealed(false);setPrediction(null)}}/>
      <OrbitScene radius={orbitRadius} speed={animTime} run={run} distance={distance} starMass={1} temp={Math.round(278/Math.sqrt(distance)-273)}/>
      <button disabled={!prediction} onClick={revealPrediction} style={{...action,opacity:prediction?1:.45}}>🔬 {en?"TEST PREDICTION":"COMPROBAR PREDICCIÓN"}</button>
      {revealed&&<div style={{...result,borderColor:predCorrect?"rgba(74,222,128,.4)":"rgba(251,191,36,.4)"}}><b>{predCorrect?(en?"✅ CORRECT":"✅ CORRECTO"):(en?"💡 SURPRISE":"💡 SORPRESA")}</b><div style={{marginTop:6}}>{en?`At ${distance.toFixed(2)} AU, one orbit takes ${year.toFixed(2)} Earth years.`:`A ${distance.toFixed(2)} UA, una órbita tarda ${year.toFixed(2)} años terrestres.`}</div></div>}
      <Discovery>{en?"Kepler's third law links distance and orbital period: farther worlds take disproportionately longer to go around their star.":"La tercera ley de Kepler relaciona distancia y periodo orbital: los mundos más lejanos tardan desproporcionadamente más en completar una vuelta."}</Discovery>
    </>}

    {mode==="duel"&&<>
      <p style={hint}>{en?"Choose two orbital distances and launch both planets together.":"Elige dos distancias orbitales y lanza ambos planetas a la vez."}</p>
      <div style={duelControls}><Range label={`A · ${duelA.toFixed(2)} AU`} min={.35} max={2.2} step={.05} value={duelA} set={setDuelA}/><Range label={`B · ${duelB.toFixed(2)} AU`} min={.35} max={2.2} step={.05} value={duelB} set={setDuelB}/></div>
      <DuelScene a={duelA} b={duelB} run={duelRun}/>
      <button onClick={()=>setDuelRun(x=>x+1)} style={action}>⚔️ {en?"START BOTH ORBITS":"INICIAR AMBAS ÓRBITAS"}</button>
      <div style={metrics}><Metric n={`${da.speed.toFixed(1)} km/s`} l={`A · ${en?"SPEED":"VELOCIDAD"}`}/><Metric n={`${db.speed.toFixed(1)} km/s`} l={`B · ${en?"SPEED":"VELOCIDAD"}`}/><Metric n={`${da.year.toFixed(2)} y`} l={`A · ${en?"YEAR":"AÑO"}`}/><Metric n={`${db.year.toFixed(2)} y`} l={`B · ${en?"YEAR":"AÑO"}`}/></div>
      <Challenge ok={Math.abs(da.year-db.year)<.15}>{Math.abs(da.year-db.year)<.15?(en?"You made two nearly equal years. Now separate the orbits and compare again.":"Has conseguido dos años casi iguales. Ahora separa las órbitas y compara de nuevo."):(en?"Challenge: make both planets have almost the same year without putting them at exactly the same distance.":"Reto: consigue que ambos planetas tengan casi el mismo año sin ponerlos exactamente a la misma distancia.")}</Challenge>
      <Discovery>{en?"The inner planet always laps the outer one because it travels faster and has a much shorter path around the star.":"El planeta interior adelanta al exterior porque viaja más rápido y además recorre una órbita más corta alrededor de la estrella."}</Discovery>
    </>}
   </div>
  </div>
 </section>
}

function OrbitScene({radius,speed,run,distance,starMass,temp}){const star=55+starMass*22;return <div style={scene}><Stars/><div style={{position:"absolute",left:"50%",top:"50%",width:star,height:star,marginLeft:-star/2,marginTop:-star/2,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#fff,#fde047 22%,#f59e0b 58%,#b45309)",boxShadow:"0 0 38px #f59e0b,0 0 85px rgba(245,158,11,.42)"}}/><div style={{position:"absolute",left:"50%",top:"50%",width:radius*2,height:radius*2,marginLeft:-radius,marginTop:-radius,borderRadius:"50%",border:"1px solid rgba(125,211,252,.35)"}}/><div key={run} className="orbitRunner" style={{width:radius*2,height:radius*2,marginLeft:-radius,marginTop:-radius,"--orb":speed+"s"}}><span>🌍</span></div><div style={{position:"absolute",left:12,bottom:12,fontSize:11,opacity:.66}}>{distance.toFixed(2)} AU</div><div style={{position:"absolute",right:12,bottom:12,fontSize:11,fontWeight:900,color:temp>80?"#fb7185":temp<0?"#93c5fd":"#86efac"}}>{temp} °C</div></div>}
function DuelScene({a,b,run}){const ra=70+a*42,rb=70+b*42;return <div style={scene}><Stars/><div className="sun"/><div style={orbitRing(ra)}/><div style={orbitRing(rb)}/><div key={`a${run}`} className="orbitRunner" style={{width:ra*2,height:ra*2,marginLeft:-ra,marginTop:-ra,"--orb":Math.max(2.5,Math.pow(a,1.5)*5)+"s"}}><span>🔵</span></div><div key={`b${run}`} className="orbitRunner" style={{width:rb*2,height:rb*2,marginLeft:-rb,marginTop:-rb,"--orb":Math.max(2.5,Math.pow(b,1.5)*5)+"s"}}><span>🔴</span></div></div>}
function Range({label,min,max,step=1,value,set}){return <div style={control}><b style={{fontSize:11}}>{label}</b><input type="range" min={min} max={max} step={step} value={value} onChange={e=>set(+e.target.value)} style={{width:"100%",marginTop:12,accentColor:"#fbbf24"}}/></div>}
function Metric({n,l}){return <div style={metric}><b style={{fontSize:18}}>{n}</b><small>{l}</small></div>}
function Pred({active,onClick,children}){return <button onClick={onClick} style={{padding:"10px 13px",borderRadius:12,border:active?"1px solid #c084fc":"1px solid rgba(255,255,255,.1)",background:active?"rgba(168,85,247,.18)":"rgba(255,255,255,.04)",color:"white",fontWeight:900}}>{children}</button>}
function Challenge({ok,children}){return <div style={{...challenge,borderColor:ok?"rgba(74,222,128,.3)":"rgba(251,191,36,.25)"}}><b>🎯 RETO / CHALLENGE</b><div style={{marginTop:6}}>{children}</div></div>}
function Discovery({children}){return <div style={discovery}><b>✦ HAS DESCUBIERTO / YOU DISCOVERED</b><div style={{marginTop:6}}>{children}</div></div>}
function Stars(){return <>{[7,16,28,41,55,69,83,94,35,75].map((x,i)=><i key={i} style={{position:"absolute",left:x+"%",top:(8+(i*19)%68)+"%",width:2,height:2,borderRadius:"50%",background:"white",boxShadow:"0 0 5px white",opacity:.48}}/>)}</>}
const orbitRing=r=>({position:"absolute",left:"50%",top:"50%",width:r*2,height:r*2,marginLeft:-r,marginTop:-r,borderRadius:"50%",border:"1px solid rgba(125,211,252,.28)"});

const shell={borderRadius:26,border:"1px solid rgba(255,255,255,.13)",background:"linear-gradient(#0f172a,#020617)",overflow:"hidden",boxShadow:"0 25px 70px rgba(0,0,0,.35)"},back={background:"none",border:0,color:"white",fontWeight:900,padding:"10px 0",cursor:"pointer",opacity:.8},eyebrow={display:"block",marginTop:8,color:"#fde68a",fontWeight:900,letterSpacing:2},intro={maxWidth:720,lineHeight:1.55,opacity:.75,margin:0},tabs={display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,margin:"8px 0 10px"},tab=a=>({padding:"12px 5px",borderRadius:13,border:a?"1px solid #fbbf24":"1px solid rgba(255,255,255,.08)",background:a?"rgba(251,191,36,.13)":"rgba(255,255,255,.035)",color:"white",fontWeight:900}),presetRow={display:"flex",gap:7,overflowX:"auto",padding:"2px 0 10px"},preset=a=>({flex:"1 0 95px",padding:"10px 8px",borderRadius:13,border:a?"1px solid #fbbf24":"1px solid rgba(255,255,255,.08)",background:a?"rgba(251,191,36,.13)":"rgba(255,255,255,.035)",color:"white",fontWeight:900}),controls={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:8},control={padding:13,borderRadius:14,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)"},scene={position:"relative",height:390,borderRadius:20,overflow:"hidden",border:"1px solid rgba(255,255,255,.09)",marginTop:12,background:"radial-gradient(circle at center,rgba(251,191,36,.08),#020617 68%)"},action={width:"100%",minHeight:52,marginTop:10,borderRadius:14,border:"1px solid rgba(251,191,36,.3)",background:"linear-gradient(90deg,#b45309,#d97706)",color:"white",fontWeight:950,fontSize:14},metrics={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(125px,1fr))",gap:7,marginTop:10},metric={display:"flex",flexDirection:"column",gap:4,padding:12,borderRadius:13,background:"rgba(251,191,36,.07)",border:"1px solid rgba(251,191,36,.12)"},challenge={marginTop:12,padding:14,borderRadius:15,background:"rgba(251,191,36,.06)",border:"1px solid"},discovery={marginTop:12,padding:14,borderRadius:15,background:"linear-gradient(90deg,rgba(34,197,94,.09),rgba(251,191,36,.05))",border:"1px solid rgba(74,222,128,.16)",fontSize:13,lineHeight:1.5},box={marginTop:12,padding:13,borderRadius:15,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)"},row={display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.06)",fontSize:11},predictionBox={marginBottom:9,padding:14,borderRadius:15,background:"rgba(168,85,247,.08)",border:"1px solid rgba(192,132,252,.18)"},result={marginTop:10,padding:14,borderRadius:15,background:"rgba(255,255,255,.05)",border:"1px solid"},hint={fontSize:13,opacity:.72},duelControls={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:8};
const css=`.orbitRunner{position:absolute;left:50%;top:50%;border-radius:50%;animation:oSpin var(--orb) linear infinite}.orbitRunner span{position:absolute;left:50%;top:-13px;transform:translateX(-50%);font-size:26px;filter:drop-shadow(0 0 7px #38bdf8)}.sun{position:absolute;left:50%;top:50%;width:68px;height:68px;margin:-34px;border-radius:50%;background:radial-gradient(circle,#fff,#fde047 25%,#f59e0b 62%,#b45309);box-shadow:0 0 35px #f59e0b,0 0 75px rgba(245,158,11,.4)}@keyframes oSpin{to{transform:rotate(360deg)}}@media(max-width:560px){.orbitRunner span{font-size:22px}}`;
