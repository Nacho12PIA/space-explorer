"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useLanguage } from "../../i18n/LanguageContext";

const PLUTO_MAP = "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia11/pia11707/PIA11707.jpg?crop=faces%2Cfocalpoint&fit=clip&h=960&w=1920";
const CHARON_MAP = "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia19/pia19866/PIA19866.jpg?crop=faces%2Cfocalpoint&fit=clip&h=960&w=1920";

const planets = [
  { name:"Mercurio", en:"Mercury", r:2.2, size:.13, speed:.24, tex:"/textures/2k_mercury.jpg" },
  { name:"Venus", en:"Venus", r:3.0, size:.20, speed:.19, tex:"/textures/2k_venus_atmosphere.jpg" },
  { name:"Tierra", en:"Earth", r:3.8, size:.21, speed:.15, tex:"/textures/2k_earth_daymap.jpg" },
  { name:"Marte", en:"Mars", r:4.6, size:.16, speed:.12, tex:"/textures/2k_mars.jpg" },
  { name:"Júpiter", en:"Jupiter", r:6.0, size:.48, speed:.075, tex:"/textures/2k_jupiter.jpg" },
  { name:"Saturno", en:"Saturn", r:7.3, size:.41, speed:.055, tex:"/textures/2k_saturn.jpg" },
  { name:"Urano", en:"Uranus", r:8.5, size:.30, speed:.04, tex:"/textures/2k_uranus.jpg" },
  { name:"Neptuno", en:"Neptune", r:9.7, size:.30, speed:.032, tex:"/textures/2k_neptune.jpg" },
];

const copy={
 es:{
  eyebrow:"MÁS ALLÁ DE NEPTUNO", title:"Sistema Solar exterior",
  intro:"Los ocho planetas siguen ahí. Al alejarnos de Neptuno aparece un nuevo mundo: Plutón.",
  hint:"Gira la escena y toca Plutón para explorarlo.", pluto:"PLUTÓN",
  tabs:["VISTA GENERAL","SUPERFICIE","ATMÓSFERA","LUNAS"],
  general:"Plutón es un planeta enano del cinturón de Kuiper. New Horizons lo visitó en 2015 y reveló un mundo complejo de hielo, montañas y grandes llanuras.",
  surface:"Su superficie contiene hielos de nitrógeno, metano y monóxido de carbono. Sputnik Planitia, la gran región clara con forma de corazón, es una enorme llanura de hielo de nitrógeno.",
  atmosphere:"Plutón posee una atmósfera muy tenue, dominada por nitrógeno y con metano y monóxido de carbono. Se expande y contrae a medida que cambia su distancia al Sol.",
  moons:"Plutón tiene cinco lunas conocidas: Caronte, Nix, Hidra, Cerbero y Estigia. Caronte es tan grande respecto a Plutón que ambos giran alrededor de un punto común situado fuera de Plutón.",
  diameter:"Diámetro", diameterValue:"2.377 km", day:"Duración del día", dayValue:"6,4 días terrestres",
  year:"Duración del año", yearValue:"248 años terrestres", temp:"Temperatura media", tempValue:"≈ −229 °C",
  back:"← SISTEMA SOLAR EXTERIOR", adapted:"Representación educativa: distancias y tamaños adaptados.",
 },
 en:{
  eyebrow:"BEYOND NEPTUNE", title:"Outer Solar System",
  intro:"All eight planets are still here. Beyond Neptune, a new world appears: Pluto.",
  hint:"Rotate the scene and tap Pluto to explore it.", pluto:"PLUTO",
  tabs:["OVERVIEW","SURFACE","ATMOSPHERE","MOONS"],
  general:"Pluto is a dwarf planet in the Kuiper Belt. New Horizons visited it in 2015 and revealed a complex world of ice, mountains and vast plains.",
  surface:"Its surface contains nitrogen, methane and carbon monoxide ices. Sputnik Planitia, the bright heart-shaped region, is a vast plain of nitrogen ice.",
  atmosphere:"Pluto has a very thin atmosphere dominated by nitrogen, with methane and carbon monoxide. It expands and contracts as Pluto's distance from the Sun changes.",
  moons:"Pluto has five known moons: Charon, Nix, Hydra, Kerberos and Styx. Charon is so large relative to Pluto that both orbit a common point outside Pluto.",
  diameter:"Diameter", diameterValue:"2,377 km", day:"Day length", dayValue:"6.4 Earth days",
  year:"Year length", yearValue:"248 Earth years", temp:"Average temperature", tempValue:"≈ −229 °C",
  back:"← OUTER SOLAR SYSTEM", adapted:"Educational representation: distances and sizes are adapted.",
 }
};

function Orbit({r,opacity=.13,tilt=0}){
 return <mesh rotation={[Math.PI/2+tilt,0,tilt*.4]}><torusGeometry args={[r,.012,6,160]}/><meshBasicMaterial color="#8290a8" transparent opacity={opacity} depthWrite={false}/></mesh>;
}

function Planet({p,index,language}){
 const tex=useLoader(THREE.TextureLoader,p.tex);
 const orbitRef=useRef(); const bodyRef=useRef();
 const a=.5+index*.73;
 useFrame((_,d)=>{
  if(orbitRef.current) orbitRef.current.rotation.y+=d*p.speed;
  if(bodyRef.current) bodyRef.current.rotation.y+=d*(.18+index*.012);
 });
 return <group ref={orbitRef} rotation={[0,a,0]}>
  <group position={[p.r,0,0]}>
   <mesh ref={bodyRef}><sphereGeometry args={[p.size,32,32]}/><meshStandardMaterial map={tex} roughness={.86}/></mesh>
   {p.name==="Saturno"&&<mesh rotation={[Math.PI/2,0,.22]}><ringGeometry args={[.55,.82,48]}/><meshBasicMaterial color="#bba77d" transparent opacity={.58} side={THREE.DoubleSide}/></mesh>}
   {p.name==="Neptuno"&&<Html position={[0,.55,0]} center distanceFactor={15} style={{pointerEvents:"none"}}><span style={{fontSize:8,fontWeight:900,color:"white",opacity:.65,whiteSpace:"nowrap"}}>{language==="en"?p.en:p.name}</span></Html>}
  </group>
 </group>;
}

function Pluto({onSelect,text}){
 const tex=useLoader(THREE.TextureLoader,PLUTO_MAP);
 const orbitRef=useRef(); const bodyRef=useRef();
 useFrame((_,d)=>{
  if(orbitRef.current) orbitRef.current.rotation.y+=d*.022;
  if(bodyRef.current) bodyRef.current.rotation.y+=d*.08;
 });
 return <group rotation={[0,0,.2]}>
  <Orbit r={13.3} opacity={.24} tilt={.12}/>
  <group ref={orbitRef} rotation={[.12,2.82,0]}>
   <group position={[13.3,0,0]}>
    <mesh ref={bodyRef} onClick={e=>{e.stopPropagation();onSelect()}}>
     <sphereGeometry args={[.52,48,48]}/><meshStandardMaterial map={tex} roughness={.92}/>
    </mesh>
    <Html position={[0,.9,0]} center distanceFactor={13} style={{pointerEvents:"none"}}><span style={{padding:"3px 7px",borderRadius:999,background:"rgba(4,10,25,.75)",fontSize:8,fontWeight:900,color:"white",whiteSpace:"nowrap"}}>{text.pluto}</span></Html>
   </group>
  </group>
 </group>;
}

function OverviewScene({onSelect,text,language}){
 const sun=useLoader(THREE.TextureLoader,"/textures/2k_sun.jpg");
 const sunRef=useRef();
 useFrame((_,d)=>{if(sunRef.current) sunRef.current.rotation.y+=d*.04});
 return <>
  <ambientLight intensity={.55}/><pointLight position={[0,3,0]} intensity={38} distance={50}/>
  <Stars radius={100} depth={55} count={4200} factor={3} fade speed={.2}/>
  <mesh ref={sunRef}><sphereGeometry args={[.65,40,40]}/><meshBasicMaterial map={sun}/></mesh>
  {planets.map((p,i)=><group key={p.name}><Orbit r={p.r}/><Planet p={p} index={i} language={language}/></group>)}
  <Pluto onSelect={onSelect} text={text}/>
  <OrbitControls enablePan={false} minDistance={12} maxDistance={34} enableDamping dampingFactor={.08}/>
 </>;
}

function PlutoAtmosphere(){
 return <mesh scale={1.055}>
  <sphereGeometry args={[2.35,96,96]}/>
  <shaderMaterial
   transparent depthWrite={false} side={THREE.FrontSide}
   blending={THREE.AdditiveBlending}
   vertexShader={`
    varying vec3 vNormal; varying vec3 vViewDirection;
    void main(){
      vec4 mv=modelViewMatrix*vec4(position,1.0);
      vNormal=normalize(normalMatrix*normal);
      vViewDirection=normalize(-mv.xyz);
      gl_Position=projectionMatrix*mv;
    }`}
   fragmentShader={`
    varying vec3 vNormal; varying vec3 vViewDirection;
    void main(){
      float facing=max(dot(normalize(vNormal),normalize(vViewDirection)),0.0);
      float rim=pow(1.0-facing,2.8);
      vec3 haze=vec3(0.35,0.58,0.82);
      gl_FragColor=vec4(haze*(0.55+rim),rim*0.34);
    }`}
  />
 </mesh>;
}

function PlutoHero({showCharon,showAtmosphere}){
 const pluto=useLoader(THREE.TextureLoader,PLUTO_MAP);
 const charon=useLoader(THREE.TextureLoader,CHARON_MAP);
 const plutoRef=useRef();
 const moonOrbit=useRef();
 const moonRef=useRef();

 useFrame((_,delta)=>{
  if(plutoRef.current) plutoRef.current.rotation.y+=delta*.07;
  if(moonOrbit.current&&showCharon) moonOrbit.current.rotation.y+=delta*.22;
  if(moonRef.current) moonRef.current.rotation.y+=delta*.06;
 });

 return <>
  <ambientLight intensity={.42}/><directionalLight position={[4,2,5]} intensity={2.7}/>
  <Stars radius={80} depth={40} count={1800} factor={2} fade/>
  <group ref={plutoRef} rotation={[0,0,-.12]}>
   <mesh><sphereGeometry args={[2.35,96,96]}/><meshStandardMaterial map={pluto} roughness={.94}/></mesh>
   {showAtmosphere&&<PlutoAtmosphere/>}
  </group>
  {showCharon&&<group ref={moonOrbit}>
   <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[3.45,.018,8,160]}/><meshBasicMaterial color="#94a3b8" transparent opacity={.48}/></mesh>
   <group position={[3.45,.15,0]}>
    <mesh ref={moonRef}><sphereGeometry args={[.78,64,64]}/><meshStandardMaterial map={charon} roughness={.97}/></mesh>
    <Html position={[0,1.05,0]} center distanceFactor={7} style={{pointerEvents:"none"}}><span style={{padding:"5px 9px",borderRadius:999,background:"rgba(4,10,25,.82)",border:"1px solid rgba(255,255,255,.16)",color:"white",fontSize:10}}>Caronte</span></Html>
   </group>
  </group>}
  <OrbitControls enablePan={false} minDistance={5.2} maxDistance={10} enableDamping dampingFactor={.08}/>
 </>;
}

export default function OuterSolarSystem(){
 const {language}=useLanguage(); const text=copy[language]||copy.es;
 const [selected,setSelected]=useState(false); const [tab,setTab]=useState(0);
 const body=[text.general,text.surface,text.atmosphere,text.moons][tab];
 return <div style={{width:"100vw",height:"100vh",position:"relative",color:"white",background:"#01030a"}}>
  <Canvas camera={{position:[0,12,23],fov:48}}><OverviewScene onSelect={()=>{setSelected(true);setTab(0)}} text={text} language={language}/></Canvas>
  {!selected&&<>
   <div style={{position:"absolute",top:88,left:18,right:18,zIndex:10,pointerEvents:"none",maxWidth:590}}>
    <div style={{fontSize:10,letterSpacing:2.1,fontWeight:900,opacity:.52}}>{text.eyebrow}</div>
    <h1 style={{margin:"5px 0",fontSize:"clamp(28px,7vw,45px)"}}>{text.title}</h1>
    <p style={{margin:0,fontSize:"clamp(12px,3vw,15px)",lineHeight:1.45,opacity:.7}}>{text.intro}</p>
   </div>
   <div style={{position:"absolute",left:18,right:18,bottom:78,zIndex:10,pointerEvents:"none",fontSize:10,opacity:.7}}>🛰️ {text.hint}<br/>⚖️ {text.adapted}</div>
  </>}
  {selected&&<div style={{position:"fixed",inset:0,zIndex:9000,background:"#01030a",overflowY:"auto"}}>
   <div style={{height:"clamp(330px,48vh,520px)",position:"sticky",top:0}}>
    <Canvas camera={{position:[0,0,7],fov:43}}><PlutoHero showCharon={tab===3} showAtmosphere={tab===2}/></Canvas>
   </div>
   <section style={{position:"relative",zIndex:2,width:"min(760px,calc(100% - 28px))",margin:"-24px auto 28px",padding:"22px clamp(18px,4vw,32px) 30px",borderRadius:28,background:"rgba(5,12,29,.96)",border:"1px solid rgba(125,211,252,.24)",boxShadow:"0 -20px 70px rgba(0,0,0,.36)"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
     <div><div style={{fontSize:11,letterSpacing:2,fontWeight:900,opacity:.55}}>EXPLORANDO</div><h1 style={{margin:"6px 0 0",fontSize:"clamp(36px,8vw,54px)"}}>Plutón</h1></div>
     <button onClick={()=>setSelected(false)} style={{border:"1px solid rgba(255,255,255,.16)",borderRadius:999,padding:"10px 14px",color:"white",background:"rgba(255,255,255,.06)",fontWeight:900}}>{text.back}</button>
    </div>
    <div style={{display:"flex",gap:8,overflowX:"auto",padding:"18px 0 14px"}}>
     {text.tabs.map((label,i)=><button key={label} onClick={()=>setTab(i)} style={{flex:"0 0 auto",borderRadius:999,padding:"10px 15px",border:i===tab?"1px solid #60a5fa":"1px solid rgba(255,255,255,.12)",background:i===tab?"rgba(37,99,235,.25)":"rgba(255,255,255,.035)",color:"white",fontSize:11,fontWeight:900}}>{label}</button>)}
    </div>
    <p style={{fontSize:"clamp(16px,4vw,20px)",lineHeight:1.6,opacity:.82,margin:"8px 0 18px"}}>{body}</p>
    {tab===0&&<div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:10}}>
     {[[text.diameter,text.diameterValue],[text.day,text.dayValue],[text.year,text.yearValue],[text.temp,text.tempValue]].map(([a,b])=><div key={a} style={{padding:14,borderRadius:16,background:"rgba(255,255,255,.055)"}}><div style={{fontSize:12,opacity:.55}}>{a}</div><strong style={{display:"block",marginTop:5,fontSize:16}}>{b}</strong></div>)}
    </div>}
    {tab===3&&<div style={{marginTop:12,padding:15,borderRadius:18,background:"rgba(139,92,246,.10)",border:"1px solid rgba(167,139,250,.18)"}}><strong>Caronte · Charon</strong><div style={{fontSize:13,lineHeight:1.5,opacity:.72,marginTop:6}}>{text.moons}</div></div>}
   </section>
  </div>}
 </div>;
}
