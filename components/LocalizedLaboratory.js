"use client";

import { useEffect, useRef } from "react";
import Laboratory from "./Laboratory";
import { useLanguage } from "../i18n/LanguageContext";

const exact = {
  "EXPERIMENTO":"EXPERIMENT","ENTRAR AL SIMULADOR →":"ENTER SIMULATOR →","TODOS LOS EXPERIMENTOS":"ALL EXPERIMENTS",
  "🔬 REGLA DEL LABORATORIO:":"🔬 LAB RULE:","toca, arrastra y experimenta. Aquí aprendes haciendo que el Universo cambie delante de ti.":"tap, drag, and experiment. Here you learn by making the Universe change right in front of you.",
  "MUNDO EXTREMO":"EXTREME WORLD","NUEVO":"NEW","SUPERGRAVEDAD":"SUPERGRAVITY","Salta en la Luna, Marte o Júpiter.":"Jump on the Moon, Mars, or Jupiter.",
  "DOMINA UNA ÓRBITA":"MASTER AN ORBIT","Mueve un planeta y cambia su año.":"Move a planet and change the length of its year.","FABRICA UN DÍA":"MAKE A DAY","Acelera la rotación de un mundo.":"Speed up a world's rotation.",
  "AGUJERO NEGRO":"BLACK HOLE","¿Qué ocurre si te acercas demasiado?":"What happens if you get too close?","IMPACTO DE ASTEROIDE":"ASTEROID IMPACT","Cambia el tamaño y la velocidad del impacto.":"Change the asteroid's size and impact speed.",
  "Luna":"Moon","Marte":"Mars","Tierra":"Earth","Neptuno":"Neptune","Júpiter":"Jupiter",
  "Elige un mundo y pulsa SALTAR. Usamos siempre el mismo impulso para que veas de verdad cómo cambia el movimiento.":"Choose a world and press JUMP. We always use the same push so you can really see how gravity changes motion.",
  "SALTAR":"JUMP","GRAVEDAD":"GRAVITY","TU PESO":"YOUR WEIGHT","TIEMPO DE SALTO":"JUMP TIME","ALTURA VISUAL":"VISUAL HEIGHT","visuales":"visual",
  "Arrastra el planeta. Acercarlo al Sol lo hace viajar más rápido; alejarlo alarga su viaje.":"Move the planet. Bringing it closer to the Sun makes it travel faster; moving it farther away makes its year longer.",
  "DISTANCIA":"DISTANCE","🔥 Cerca":"🔥 Close","❄️ Lejos":"❄️ Far","ÓRBITAS VISUALIZADAS A ESCALA EDUCATIVA":"ORBITS SHOWN AT AN EDUCATIONAL SCALE","VELOCIDAD":"SPEED","DURACIÓN DEL AÑO":"YEAR LENGTH","TENDENCIA TÉRMICA":"TEMPERATURE TREND","MUY CALIENTE":"VERY HOT","MUY FRÍA":"VERY COLD","TEMPLADA":"MILD",
  "Gira el planeta con el control. Una vuelta completa equivale a un día: mira cómo la luz y la noche recorren la superficie.":"Rotate the planet with the control. One full turn equals one day: watch daylight and night move across the surface.",
  "VELOCIDAD DE ROTACIÓN":"ROTATION SPEED","LENTO":"SLOW","RÁPIDO":"FAST","DÍA":"DAY","NOCHE":"NIGHT","DURACIÓN DEL DÍA":"DAY LENGTH","ROTACIÓN":"ROTATION",
  "Acerca la nave poco a poco. Observa cómo cambia lo que ve un observador lejano cuando te aproximas al horizonte de sucesos.":"Move the spacecraft closer little by little. Watch what a distant observer would see as you approach the event horizon.",
  "DISTANCIA AL AGUJERO NEGRO":"DISTANCE TO BLACK HOLE","LEJOS":"FAR","CERCA":"CLOSE","HORIZONTE DE SUCESOS":"EVENT HORIZON","DILATACIÓN TEMPORAL":"TIME DILATION","PELIGRO":"DANGER","SEGURO":"SAFE","EXTREMO":"EXTREME",
  "Cambia el tamaño y la velocidad del asteroide. Después lánzalo y observa cómo cambia el impacto.":"Change the asteroid's size and speed. Then launch it and watch how the impact changes.",
  "TAMAÑO DEL ASTEROIDE":"ASTEROID SIZE","VELOCIDAD DE IMPACTO":"IMPACT SPEED","LANZAR ASTEROIDE":"LAUNCH ASTEROID","REPETIR IMPACTO":"REPEAT IMPACT","ENERGÍA":"ENERGY","CRÁTER":"CRATER","ONDA EXPANSIVA":"SHOCK WAVE","IMPACTO":"IMPACT"
};

const rules = [
  [/^EXPERIMENTO (\d+)$/, "EXPERIMENT $1"],[/^SALTO EN (.+)$/, "JUMP ON $1"],[/^TU MASA · (.+)$/, "YOUR MASS · $1"],
  [/^(\d+) días$/, "$1 days"],[/^([\d.,]+) años$/, "$1 years"],[/^([\d.,]+) horas$/, "$1 hours"],
];
const words=[["Luna","Moon"],["Marte","Mars"],["Tierra","Earth"],["Neptuno","Neptune"],["Júpiter","Jupiter"],["Sol","Sun"],["días","days"],["años","years"]];
function tr(value){const lead=value.match(/^\s*/)?.[0]||"",tail=value.match(/\s*$/)?.[0]||"",s=value.trim().replace(/\s+/g," ");if(!s)return value;let out=exact[s];if(!out){for(const[p,r]of rules){if(p.test(s)){out=s.replace(p,r);break;}}}if(!out)return value;for(const[a,b]of words)out=out.split(a).join(b);return lead+out+tail;}

export default function LocalizedLaboratory(){const {language}=useLanguage();const rootRef=useRef(null);const en=language==="en";
 useEffect(()=>{const root=rootRef.current;if(!root)return;let busy=false;
  const one=(node,refresh=false)=>{if(node.nodeType!==Node.TEXT_NODE)return;const current=node.nodeValue||"";if(refresh&&current!==node.__labLocalized)node.__labOriginal=current;const original=node.__labOriginal??current;node.__labOriginal=original;const next=en?tr(original):original;node.__labLocalized=next;if(current!==next)node.nodeValue=next;};
  const tree=target=>{if(target.nodeType===Node.TEXT_NODE){one(target);return;}const w=document.createTreeWalker(target,NodeFilter.SHOW_TEXT);let n=w.nextNode();while(n){one(n);n=w.nextNode();}};
  tree(root);const obs=new MutationObserver(ms=>{if(busy)return;busy=true;try{ms.forEach(m=>m.type==="characterData"?one(m.target,true):m.addedNodes.forEach(tree));}finally{busy=false;}});obs.observe(root,{childList:true,subtree:true,characterData:true});return()=>obs.disconnect();
 },[en]);return <div ref={rootRef} style={{display:"contents"}}><Laboratory/></div>;
}
