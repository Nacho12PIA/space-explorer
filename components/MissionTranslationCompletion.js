"use client";

import { useEffect, useRef } from "react";
import LocalizedMissionPlayer from "./LocalizedMissionPlayer";
import { useLanguage } from "../i18n/LanguageContext";
import { missionEnglishExtra } from "../data/missionEnglishExtra";

const words = [["Mercurio","Mercury"],["Tierra","Earth"],["Marte","Mars"],["Júpiter","Jupiter"],["Saturno","Saturn"],["Urano","Uranus"],["Neptuno","Neptune"],["Sistema Solar","Solar System"],["años terrestres","Earth years"],["año terrestre","Earth year"],["días terrestres","Earth days"],["día terrestre","Earth day"]];
const direct={"RUTA CORRECTA":"CORRECT ROUTE","Ruta correcta":"Correct route","RUTA CORRECTA:":"CORRECT ROUTE:","Ruta correcta:":"Correct route:","Las otras son planetas":"The others are planets","Está mucho más cerca":"It is much closer","Es la mayor del Universo":"It is the largest in the Universe","Magnetismo terrestre":"Earth's magnetism","Viento solar":"Solar wind","Su temperatura superficial":"Its surface temperature","Su número de planetas":"Its number of planets","Su distancia exacta":"Its exact distance","Solo cambian de color":"Only their color changes","Tardan lo mismo":"They take the same time","Duran lo mismo":"They last the same time"};
const rules=[
 [/^¿Qué planeta tiene un diámetro aproximado de (.+)\?$/,"Which planet has an approximate diameter of $1?"],[/^¿En qué planeta dura el día aproximadamente (.+)\?$/,"On which planet does a day last about $1?"],[/^¿En qué planeta dura el año aproximadamente (.+)\?$/,"On which planet does a year last about $1?"],[/^¿Qué planeta tiene una gravedad aproximada de (.+)\?$/,"Which planet has approximate gravity of $1?"],
 [/^(.+) tiene un diámetro aproximado de (.+)\.$/,"$1 has an approximate diameter of $2."],[/^En (.+), un día dura aproximadamente (.+)\.$/,"On $1, a day lasts about $2."],[/^(.+) tarda aproximadamente (.+) en completar una órbita alrededor del Sol\.$/,"$1 takes about $2 to complete one orbit around the Sun."],[/^En (.+), la gravedad es aproximadamente (.+)\.$/,"On $1, gravity is about $2."],
 [/^Ruta correcta:\s*(.+)$/,"Correct route: $1"],[/^La ruta correcta es:\s*(.+)$/,"The correct route is: $1"],
 [/^PLANETA DESCONOCIDO:\s*Mi día se parece al de la Tierra\. Me llaman el planeta rojo\. Tengo el volcán Olympus Mons\. ¿Qué planeta es\?$/,"UNKNOWN PLANET: My day is similar to Earth's. I am known as the Red Planet. I have the volcano Olympus Mons. Which planet am I?"],
 [/^PLANETA DESCONOCIDO:\s*Soy el planeta más grande del Sistema Solar\. Mi día dura menos de 10 horas\. Tengo la Gran Mancha Roja\. ¿Qué planeta es\?$/,"UNKNOWN PLANET: I am the largest planet in the Solar System. My day lasts less than 10 hours. I have the Great Red Spot. Which planet am I?"],
 [/^PLANETA DESCONOCIDO:\s*Tengo un tamaño parecido al de la Tierra\. Mi atmósfera es extremadamente densa\. Soy el planeta más caliente\. ¿Qué planeta es\?$/,"UNKNOWN PLANET: I am about the same size as Earth. My atmosphere is extremely dense. I am the hottest planet. Which planet am I?"],
 [/^PLANETA DESCONOCIDO:\s*Soy un gigante helado azul verdoso\. Mi año dura unos 84 años terrestres\. Giro prácticamente tumbado\. ¿Qué planeta es\?$/,"UNKNOWN PLANET: I am a blue-green ice giant. My year lasts about 84 Earth years. I rotate almost on my side. Which planet am I?"],
 [/^PLANETA DESCONOCIDO:\s*Soy un gigante helado\. Mi año dura casi 165 años terrestres\. Tengo vientos extraordinariamente rápidos\. ¿Qué planeta es\?$/,"UNKNOWN PLANET: I am an ice giant. My year lasts almost 165 Earth years. I have extraordinarily fast winds. Which planet am I?"],
 [/^PLANETA DESCONOCIDO:\s*Soy un gigante gaseoso\. Mi año dura unos 29 años terrestres\. Destaco por mis espectaculares anillos\. ¿Qué planeta es\?$/,"UNKNOWN PLANET: I am a gas giant. My year lasts about 29 Earth years. I am famous for my spectacular rings. Which planet am I?"],
 [/^PLANETA DESCONOCIDO:\s*Soy un planeta rocoso pequeño\. Mi año dura solo 88 días terrestres\. Soy el planeta más cercano al Sol\. ¿Qué planeta es\?$/,"UNKNOWN PLANET: I am a small rocky planet. My year lasts only 88 Earth days. I am the closest planet to the Sun. Which planet am I?"],
 [/^PLANETA DESCONOCIDO:\s*Mi día dura 24 horas\. Tengo mucha agua líquida superficial\. Soy el único mundo donde sabemos que existe vida\. ¿Qué planeta es\?$/,"UNKNOWN PLANET: My day lasts 24 hours. I have lots of liquid water on my surface. I am the only world where we know life exists. Which planet am I?"]
];

function translate(value){const lead=value.match(/^\s*/)?.[0]||"",tail=value.match(/\s*$/)?.[0]||"",source=value.trim().replace(/\s+/g," ");if(!source)return value;let out=missionEnglishExtra[source]||direct[source];if(!out){for(const [p,r] of rules){if(p.test(source)){out=source.replace(p,r);break;}}}if(!out)return value;for(const [a,b] of words)out=out.split(a).join(b);return lead+out+tail;}
function translateElement(el){if(!(el instanceof Element))return;const text=el.textContent?.trim().replace(/\s+/g," ");if(!text)return;const next=translate(text);if(next!==text&&el.children.length===0)el.textContent=next;}

export default function MissionTranslationCompletion(){const {language}=useLanguage();const rootRef=useRef(null);const english=language==="en";
 useEffect(()=>{const root=rootRef.current;if(!root)return;let busy=false;
  const one=(node,refresh=false)=>{if(node.nodeType!==Node.TEXT_NODE)return;const current=node.nodeValue||"";if(refresh&&current!==node.__missionFinalLocalized)node.__missionFinalOriginal=current;const original=node.__missionFinalOriginal??current;node.__missionFinalOriginal=original;const next=english?translate(original):original;node.__missionFinalLocalized=next;if(current!==next)node.nodeValue=next;};
  const tree=target=>{if(target.nodeType===Node.TEXT_NODE){one(target);return;}const w=document.createTreeWalker(target,NodeFilter.SHOW_TEXT);let n=w.nextNode();while(n){one(n);n=w.nextNode();}if(english&&target instanceof Element){translateElement(target);target.querySelectorAll("p,h1,h2,h3,h4,div,span,button").forEach(translateElement);}};
  tree(root);const obs=new MutationObserver(ms=>{if(busy)return;busy=true;try{ms.forEach(m=>m.type==="characterData"?one(m.target,true):m.addedNodes.forEach(tree));}finally{busy=false;}});obs.observe(root,{childList:true,subtree:true,characterData:true});return()=>obs.disconnect();
 },[english]);return <div ref={rootRef} style={{display:"contents"}}><LocalizedMissionPlayer/></div>;
}
