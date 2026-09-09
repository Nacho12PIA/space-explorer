import { novaKnowledge } from "./novaKnowledge";
import { expandedEntries } from "./novaKnowledgeExpanded";

export const allNovaKnowledge = [...novaKnowledge, ...expandedEntries];

const personality = {
  es: { openings: ["Buena pregunta.", "Buena observación.", "Vamos a investigarlo.", "Has encontrado una buena pista."], curiosities: ["Dato de misión", "Pista espacial", "Para recordar"] },
  en: { openings: ["Great question.", "Good observation.", "Let's investigate it.", "You've found a useful clue."], curiosities: ["Mission fact", "Space clue", "Remember this"] },
};

const cadetReplacements = {
  es: [["aproximadamente","más o menos"],["principalmente","sobre todo"],["extremadamente","muchísimo"],["gravitatoria","de la gravedad"],["gravitatorio","de la gravedad"],["radiación","energía y luz"],["atmósfera","capa de gases"],["hidrocarburos","sustancias parecidas al gas y al petróleo"],["supermasivo","gigantesco"],["interestelar","entre las estrellas"],["espectro","luz separada en colores"],["horizonte de sucesos","borde del agujero negro"],["fusión nuclear","un proceso que libera muchísima energía"]],
  en: [["approximately","about"],["mainly","mostly"],["extremely","very"],["gravitational","caused by gravity"],["radiation","energy and light"],["atmosphere","layer of gases"],["hydrocarbons","oil-like substances"],["supermassive","gigantic"],["interstellar","between the stars"],["spectrum","light split into colours"],["event horizon","edge of the black hole"],["nuclear fusion","a process that releases lots of energy"]],
};

const planetTopics = new Set(["mercurio","venus","la Tierra","tierra","Marte","marte","Júpiter","jupiter","Saturno","saturno","Urano","urano","Neptuno","neptuno","earth","mars","saturn","stars"]);

function normalizeText(text="") { return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim(); }
function tokens(text){return new Set(normalizeText(text).split(" ").filter((word)=>word.length>2));}
function similarity(input,candidate){const a=normalizeText(input),b=normalizeText(candidate);if(!a||!b)return 0;if(a===b)return 1;if(a.includes(b)||b.includes(a))return .92;const aa=tokens(a),bb=tokens(b);let shared=0;aa.forEach((word)=>{if(bb.has(word))shared+=1;});return shared/Math.max(aa.size,bb.size,1);}
function stableIndex(seed,length,offset=0){if(!length)return 0;const value=[...seed].reduce((sum,char)=>sum+char.charCodeAt(0),0);return(value+offset)%length;}
function findRelated(entry,lang){const related=allNovaKnowledge.filter((candidate)=>candidate.id!==entry.id&&candidate.topic===entry.topic);if(!related.length)return null;return related[stableIndex(entry.id,related.length,17)];}
function sentences(text){return text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((item)=>item.trim()).filter(Boolean)||[text];}

function simplifyForCadet(text,lang){let simple=sentences(text).slice(0,1).join(" ");cadetReplacements[lang].forEach(([from,to])=>{simple=simple.replace(new RegExp(from,"gi"),to);});return simple;}
function explorerAnswer(entry,lang){return entry.answer[lang];}
function astronomerAnswer(entry,lang){const base=entry.answer[lang];const extra=entry.curiosity?.[lang];if(lang==="es")return[base,extra?`Profundiza: ${extra}`:null].filter(Boolean).join("\n\n");return[base,extra?`Go deeper: ${extra}`:null].filter(Boolean).join("\n\n");}
function adaptAnswer(entry,lang,level){if(level==="cadet")return simplifyForCadet(entry.answer[lang],lang);if(level==="astronomer")return astronomerAnswer(entry,lang);return explorerAnswer(entry,lang);}

function getSpaceExplorerRecommendation(entry,lang){
  const id=normalizeText(entry.id);const topic=normalizeText(entry.topic);
  const lab=(experiment,es,en)=>({area:"laboratory",href:`/laboratorio?experiment=${experiment}`,icon:"🔬",label:lang==="es"?es:en});
  if(id.includes("agujero-negro")||id.includes("black-hole")||topic.includes("black-hole")||topic.includes("agujero"))return lab("blackhole","PROBAR AGUJERO NEGRO EN LABORATORIO","TRY BLACK HOLE IN LABORATORY");
  if(id.includes("asteroid")||id.includes("asteroide")||id.includes("meteor")||topic.includes("asteroid"))return lab("impact","PROBAR IMPACTO DE ASTEROIDE","TRY ASTEROID IMPACT");
  if(id.includes("orbita")||id.includes("orbit"))return lab("orbits","EXPERIMENTAR CON ÓRBITAS","EXPERIMENT WITH ORBITS");
  if(id.includes("dia-noche")||id.includes("day-night")||id.includes("rotacion")||id.includes("rotation"))return lab("daynight","FABRICAR UN DÍA EN LABORATORIO","MAKE A DAY IN LABORATORY");
  if(id.includes("gravedad")||id.includes("gravity")||id.includes("salto")||id.includes("weight"))return lab("gravity","PROBAR LA GRAVEDAD","TRY GRAVITY");
  if(planetTopics.has(entry.topic)||["mercurio","venus","tierra","marte","jupiter","saturno","urano","neptuno","sol","luna","moon","stars","estrella","estrellas"].some((name)=>id.includes(name)||topic.includes(name)))return{area:"explore",href:"/explora",icon:"🪐",label:lang==="es"?"SEGUIR DESCUBRIENDO EN EXPLORA":"KEEP DISCOVERING IN EXPLORE"};
  return{area:"missions",href:"/misiones",icon:"🚀",label:lang==="es"?"PONER A PRUEBA LO APRENDIDO EN MISIONES":"TEST WHAT YOU LEARNED IN MISSIONS"};
}

function buildTutorReply(entry,lang,level="explorer"){
  const voice=personality[lang];const opening=voice.openings[stableIndex(entry.id,voice.openings.length)];const related=findRelated(entry,lang);const relatedQuestion=related?.questions?.[lang]?.[0]||null;const answer=adaptAnswer(entry,lang,level);const curiosity=level==="explorer"?entry.curiosity?.[lang]||null:null;const curiosityLabel=voice.curiosities[stableIndex(entry.id,voice.curiosities.length,5)];const mission=relatedQuestion?(lang==="es"?`Siguiente misión: ${relatedQuestion}`:`Next mission: ${relatedQuestion}`):null;const levelLead=level==="cadet"?(lang==="es"?"Te lo cuento fácil:":"Here's the simple version:"):level==="astronomer"?(lang==="es"?"Vamos un paso más allá:":"Let's go one step further:"):null;return[opening,levelLead,answer,curiosity?`${curiosityLabel}: ${curiosity}`:null,mission].filter(Boolean).join("\n\n");
}

function findBestMatch(question,lang,entries=allNovaKnowledge){
  const normalized=normalizeText(question);let bestMatch=null,bestScore=0;
  entries.forEach((entry)=>{
    const questionScore=Math.max(...entry.questions[lang].map((candidate)=>similarity(normalized,candidate)));
    const hits=entry.keywords[lang].filter((keyword)=>normalized.includes(normalizeText(keyword))).length;
    // A single topic word (for example "Saturno") is not enough evidence that NOVA knows the user's intent.
    const keywordScore=hits>=2&&entry.keywords[lang].length?hits/entry.keywords[lang].length:0;
    const score=Math.max(questionScore,keywordScore*.76);
    if(score>bestScore){bestScore=score;bestMatch=entry;}
  });
  return{bestMatch,bestScore};
}

function looksLikeFollowUp(question,lang){
  const normalized=normalizeText(question);
  if(!normalized)return false;
  const words=normalized.split(" ");
  const markers=lang==="es"?["y si","y que","que pasaria","como seria","por que","y entonces","y eso","y alli","y dentro","y fuera","puede pasar","cuanto tarda","que ocurre","que le pasa","y despues","y antes","y tiene","tiene agua"]:["what if","and if","then what","what happens","how would","why is that","and then","and there","inside it","outside it","can it","how long","what occurs","what happens to","after that","before that","and does","does it have"];
  return words.length<=9||markers.some((marker)=>normalized.includes(marker));
}

function contextualCandidates(contextEntry){
  if(!contextEntry)return[];
  const topic=normalizeText(contextEntry.topic);
  const idParts=normalizeText(contextEntry.id).split(" ").filter((part)=>part.length>3);
  return allNovaKnowledge.filter((entry)=>{
    if(entry.id===contextEntry.id)return true;
    if(normalizeText(entry.topic)===topic)return true;
    const entryId=normalizeText(entry.id);
    return idParts.some((part)=>entryId.includes(part));
  });
}

export function findNovaAnswer(question,language="es",level="explorer",contextEntry=null){
  const lang=language==="en"?"en":"es";const safeLevel=["cadet","explorer","astronomer"].includes(level)?level:"explorer";
  let bestMatch=null,bestScore=0,usedContext=false;

  // For a genuine short follow-up, try the current topic first. It must still match a known intent strongly.
  if(contextEntry&&looksLikeFollowUp(question,lang)){
    const contextual=findBestMatch(question,lang,contextualCandidates(contextEntry));
    if(contextual.bestMatch&&contextual.bestScore>=.5){bestMatch=contextual.bestMatch;bestScore=contextual.bestScore;usedContext=true;}
  }

  // If context did not produce a reliable answer, treat the message as a fresh question.
  if(!bestMatch){
    const global=findBestMatch(question,lang);
    bestMatch=global.bestMatch;bestScore=global.bestScore;
  }

  if(!bestMatch||bestScore<.5)return{found:false,score:bestScore,entry:null,usedContext:false};
  return{found:true,score:bestScore,entry:bestMatch,text:buildTutorReply(bestMatch,lang,safeLevel),relatedQuestion:findRelated(bestMatch,lang)?.questions?.[lang]?.[0]||null,recommendation:getSpaceExplorerRecommendation(bestMatch,lang),usedContext};
}
