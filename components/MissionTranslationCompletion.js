"use client";

import { useEffect, useRef } from "react";
import LocalizedMissionPlayer from "./LocalizedMissionPlayer";
import { useLanguage } from "../i18n/LanguageContext";
import { missionEnglishExtra } from "../data/missionEnglishExtra";

const names = [["Mercurio","Mercury"],["Tierra","Earth"],["Marte","Mars"],["Júpiter","Jupiter"],["Saturno","Saturn"],["Urano","Uranus"],["Neptuno","Neptune"],["Sistema Solar","Solar System"]];

function localize(value) {
  const lead=value.match(/^\s*/)?.[0]||"", tail=value.match(/\s*$/)?.[0]||"";
  const source=value.trim().replace(/\s+/g," ");
  let out=missionEnglishExtra[source];
  if(!out) return value;
  for(const [a,b] of names) out=out.split(a).join(b);
  return lead+out+tail;
}

export default function MissionTranslationCompletion(){
  const {language}=useLanguage(); const rootRef=useRef(null); const english=language==="en";
  useEffect(()=>{const root=rootRef.current;if(!root)return;let busy=false;
    const one=(node,refresh=false)=>{if(node.nodeType!==Node.TEXT_NODE)return;const current=node.nodeValue||"";if(refresh&&current!==node.__missionCompletionLocalized)node.__missionCompletionOriginal=current;const original=node.__missionCompletionOriginal??current;node.__missionCompletionOriginal=original;const next=english?localize(original):original;node.__missionCompletionLocalized=next;if(current!==next)node.nodeValue=next;};
    const tree=target=>{if(target.nodeType===Node.TEXT_NODE){one(target);return;}const w=document.createTreeWalker(target,NodeFilter.SHOW_TEXT);let n=w.nextNode();while(n){one(n);n=w.nextNode();}};
    tree(root);const obs=new MutationObserver(ms=>{if(busy)return;busy=true;try{ms.forEach(m=>m.type==="characterData"?one(m.target,true):m.addedNodes.forEach(tree));}finally{busy=false;}});obs.observe(root,{childList:true,subtree:true,characterData:true});return()=>obs.disconnect();
  },[english]);
  return <div ref={rootRef} style={{display:"contents"}}><LocalizedMissionPlayer/></div>;
}
