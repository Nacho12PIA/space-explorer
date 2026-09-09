"use client";

import { useEffect, useRef } from "react";
import LocalizedMissionPlayer from "./LocalizedMissionPlayer";
import { useLanguage } from "../i18n/LanguageContext";
import { missionEnglishExtra } from "../data/missionEnglishExtra";

const words = [
  ["Mercurio","Mercury"],["Tierra","Earth"],["Marte","Mars"],["Júpiter","Jupiter"],["Saturno","Saturn"],["Urano","Uranus"],["Neptuno","Neptune"],
  ["Sistema Solar","Solar System"],["años terrestres","Earth years"],["año terrestre","Earth year"],["días terrestres","Earth days"],["día terrestre","Earth day"],
  ["millones de años","billion years"],["millones de km","million km"],["de la terrestre","of Earth's"],["veces la terrestre","times Earth's"],["similar a la terrestre","similar to Earth's"],["superior a la terrestre","stronger than Earth's"]
];

const direct = {
  "RUTA CORRECTA":"CORRECT ROUTE","Ruta correcta":"Correct route","RUTA CORRECTA:":"CORRECT ROUTE:","Ruta correcta:":"Correct route:",
  "Sí":"Yes","No":"No","Magnetismo terrestre":"Earth's magnetism","Viento solar":"Solar wind","Su temperatura superficial":"Its surface temperature","Su número de planetas":"Its number of planets","Su distancia exacta":"Its exact distance","Solo cambian de color":"Only their color changes","Está mucho más cerca":"It is much closer","Es la mayor del Universo":"It is the largest in the Universe","Las otras son planetas":"The others are planets",
  "1,39 millones de km":"1.39 million km","4.600 millones de años":"4.6 billion years","460 millones de años":"460 million years","46.000 millones de años":"46 billion years"
};

const rules = [
  [/^¿Qué planeta está más cerca del Sol\?$/,"Which planet is closest to the Sun?"],[/^¿Cuál es el planeta más caliente del Sistema Solar\?$/,"Which is the hottest planet in the Solar System?"],
  [/^¿Qué planeta tiene aproximadamente el 71% de su superficie cubierta por agua\?$/,"Which planet has about 71% of its surface covered by water?"],[/^¿En qué planeta se encuentra Olympus Mons\?$/,"Which planet is home to Olympus Mons?"],
  [/^¿Qué planeta tiene la Gran Mancha Roja\?$/,"Which planet has the Great Red Spot?"],[/^¿Qué planeta destaca por sus espectaculares anillos de hielo y roca\?$/,"Which planet is famous for its spectacular rings of ice and rock?"],
  [/^¿Qué planeta gira prácticamente tumbado sobre uno de sus lados\?$/,"Which planet rotates almost on its side?"],[/^¿En qué planeta se producen algunos de los vientos más rápidos del Sistema Solar\?$/,"Which planet has some of the fastest winds in the Solar System?"],
  [/^¿Cuál de estos planetas tiene el año más corto\?$/,"Which of these planets has the shortest year?"],[/^¿Cuál de estos planetas tiene el año más largo\?$/,"Which of these planets has the longest year?"],[/^¿Cuál de estos planetas tiene el día más largo\?$/,"Which of these planets has the longest day?"],
  [/^¿Qué planeta tiene un día más parecido al de la Tierra\?$/,"Which planet has a day most similar to Earth's?"],[/^¿Cuál de estos planetas es mayor en diámetro\?$/,"Which of these planets has the largest diameter?"],[/^¿Cuál de estos planetas es menor en diámetro\?$/,"Which of these planets has the smallest diameter?"],
  [/^¿Cuál es mayor: la Tierra o Venus\?$/,"Which is larger: Earth or Venus?"],[/^¿Cuál es mayor: Urano o Neptuno\?$/,"Which is larger: Uranus or Neptune?"],[/^¿Qué planeta completa antes una órbita alrededor del Sol\?$/,"Which planet completes an orbit around the Sun sooner?"],[/^¿Qué planeta tarda más en completar una órbita\?$/,"Which planet takes longer to complete an orbit?"],
  [/^¿Cuál gira más rápido sobre sí mismo\?$/,"Which planet rotates fastest?"],[/^¿Cuál gira más lentamente sobre sí mismo\?$/,"Which planet rotates most slowly?"],
  [/^Una sonda busca un mundo con un día de unas 17 horas\. ¿Cuál debe visitar\?$/,"A probe needs a world with a day of about 17 hours. Which should it visit?"],[/^Una sonda busca un mundo con un día de unas 16 horas\. ¿Cuál debe visitar\?$/,"A probe needs a world with a day of about 16 hours. Which should it visit?"],[/^Una sonda busca un planeta cuyo año dure unos 29 años terrestres\. ¿Cuál es\?$/,"A probe needs a planet whose year lasts about 29 Earth years. Which is it?"],
  [/^¿Qué tipo de astro es el Sol\?$/,"What kind of object is the Sun?"],[/^¿Cuál es el diámetro aproximado del Sol\?$/,"What is the Sun's approximate diameter?"],[/^¿Qué edad aproximada tiene el Sol\?$/,"Approximately how old is the Sun?"],[/^¿Qué temperatura aproximada tiene la superficie visible del Sol\?$/,"What is the approximate temperature of the Sun's visible surface?"],
  [/^En la fusión del Sol, ¿qué elemento se transforma principalmente en helio\?$/,"During fusion in the Sun, which element is mainly turned into helium?"],[/^¿En qué estado se encuentra gran parte de la materia del Sol\?$/,"What state of matter makes up most of the Sun?"],[/^¿Qué mantiene a los planetas orbitando alrededor del Sol\?$/,"What keeps the planets orbiting the Sun?"],[/^¿Por qué el Sol se ve mucho más grande que las demás estrellas del cielo\?$/,"Why does the Sun look much larger than the other stars in the sky?"],[/^Las estrellas del fondo de EXPLORA, ¿representan sus posiciones reales\?$/,"Do the background stars in EXPLORE show their real positions?"],[/^¿Dónde ocurre la fusión nuclear que alimenta al Sol\?$/,"Where does the nuclear fusion that powers the Sun happen?"],
  [/^¿Cuántos planetas principales hay en el Sistema Solar\?$/,"How many major planets are there in the Solar System?"],[/^¿Cuál es el orden correcto de los cuatro primeros planetas desde el Sol\?$/,"What is the correct order of the first four planets from the Sun?"],[/^¿Cuál es el orden correcto de los cuatro planetas exteriores\?$/,"What is the correct order of the four outer planets?"],[/^¿Qué planeta está inmediatamente después de la Tierra al alejarnos del Sol\?$/,"Which planet comes immediately after Earth as we move away from the Sun?"],[/^¿Qué planeta está inmediatamente antes de la Tierra al alejarnos del Sol\?$/,"Which planet comes immediately before Earth as we move away from the Sun?"],[/^¿Qué planeta está inmediatamente después de Júpiter\?$/,"Which planet comes immediately after Jupiter?"],[/^¿Qué planeta está inmediatamente antes de Neptuno\?$/,"Which planet comes immediately before Neptune?"],[/^¿Cuál es el planeta más lejano del Sol\?$/,"Which planet is farthest from the Sun?"],[/^¿Cuál es el planeta más grande del Sistema Solar\?$/,"Which is the largest planet in the Solar System?"],[/^¿Cuál de estos planetas es conocido como el planeta rojo\?$/,"Which of these planets is known as the Red Planet?"],[/^¿Qué dos planetas tienen una gravedad aproximada del 38% de la terrestre\?$/,"Which two planets have gravity about 38% as strong as Earth's?"],[/^¿Qué planeta es nuestro hogar\?$/,"Which planet is our home?"],
  [/^Si quisieras observar una enorme tormenta llamada Gran Mancha Roja, ¿a qué planeta viajarías\?$/,"If you wanted to observe the huge Great Red Spot storm, which planet would you visit?"],[/^Si una misión quiere estudiar anillos formados principalmente por hielo y roca, ¿qué destino escogería\?$/,"If a mission wants to study rings made mainly of ice and rock, which destination should it choose?"],[/^Si una misión busca estudiar vientos extremadamente rápidos, ¿qué planeta debería visitar\?$/,"If a mission wants to study extremely fast winds, which planet should it visit?"],[/^Si buscas un planeta que parezca girar de lado, ¿cuál escogerías\?$/,"If you are looking for a planet that seems to rotate on its side, which would you choose?"],[/^Si una misión quiere estudiar Olympus Mons, ¿qué planeta debe visitar\?$/,"If a mission wants to study Olympus Mons, which planet should it visit?"],
  [/^¿Qué planeta tiene un diámetro aproximado de (.+)\?$/,"Which planet has an approximate diameter of $1?"],[/^¿En qué planeta dura el día aproximadamente (.+)\?$/,"On which planet does a day last about $1?"],[/^¿En qué planeta dura el año aproximadamente (.+)\?$/,"On which planet does a year last about $1?"],[/^¿Qué planeta tiene una gravedad aproximada de (.+)\?$/,"Which planet has approximate gravity of $1?"],
  [/^(.+) tiene un diámetro aproximado de (.+)\.$/,"$1 has an approximate diameter of $2."],[/^En (.+), un día dura aproximadamente (.+)\.$/,"On $1, a day lasts about $2."],[/^(.+) tarda aproximadamente (.+) en completar una órbita alrededor del Sol\.$/,"$1 takes about $2 to complete one orbit around the Sun."],[/^En (.+), la gravedad es aproximadamente (.+)\.$/,"On $1, gravity is about $2."],
  [/^La ruta correcta es: (.+)$/,"The correct route is: $1"],[/^Ruta correcta: (.+)$/,"Correct route: $1"]
];

function translate(value){
  const lead=value.match(/^\s*/)?.[0]||"",tail=value.match(/\s*$/)?.[0]||"";const source=value.trim().replace(/\s+/g," ");if(!source)return value;
  let out=missionEnglishExtra[source]||direct[source];
  if(!out){for(const [pattern,replacement] of rules){if(pattern.test(source)){out=source.replace(pattern,replacement);break;}}}
  if(!out)return value;
  for(const [a,b] of words)out=out.split(a).join(b);return lead+out+tail;
}

export default function MissionTranslationCompletion(){
 const {language}=useLanguage();const rootRef=useRef(null);const english=language==="en";
 useEffect(()=>{const root=rootRef.current;if(!root)return;let busy=false;
  const one=(node,refresh=false)=>{if(node.nodeType!==Node.TEXT_NODE)return;const current=node.nodeValue||"";if(refresh&&current!==node.__missionFinalLocalized)node.__missionFinalOriginal=current;const original=node.__missionFinalOriginal??current;node.__missionFinalOriginal=original;const next=english?translate(original):original;node.__missionFinalLocalized=next;if(current!==next)node.nodeValue=next;};
  const tree=target=>{if(target.nodeType===Node.TEXT_NODE){one(target);return;}const w=document.createTreeWalker(target,NodeFilter.SHOW_TEXT);let n=w.nextNode();while(n){one(n);n=w.nextNode();}};
  tree(root);const obs=new MutationObserver(ms=>{if(busy)return;busy=true;try{ms.forEach(m=>m.type==="characterData"?one(m.target,true):m.addedNodes.forEach(tree));}finally{busy=false;}});obs.observe(root,{childList:true,subtree:true,characterData:true});return()=>obs.disconnect();
 },[english]);
 return <div ref={rootRef} style={{display:"contents"}}><LocalizedMissionPlayer/></div>;
}
