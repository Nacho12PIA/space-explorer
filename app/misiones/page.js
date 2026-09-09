"use client";

import Link from "next/link";
import MissionTranslationCompletion from "../../components/MissionTranslationCompletion";
import { useLanguage } from "../../i18n/LanguageContext";

export default function MisionesPage() {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <main style={{minHeight:"100vh",background:"radial-gradient(circle at top, #13213f 0%, #060b18 45%, #02040a 100%)",color:"white",padding:"32px 20px"}}>
      <div style={{width:"100%",maxWidth:900,margin:"0 auto"}}>
        <Link href="/" style={{display:"inline-block",color:"white",textDecoration:"none",marginBottom:32,fontSize:13,fontWeight:800,opacity:0.8}}>← {en ? "HOME" : "INICIO"}</Link>
        <div style={{fontSize:12,letterSpacing:3,opacity:0.55,fontWeight:700}}>{en ? "MISSION CENTER" : "CENTRO DE MISIONES"}</div>
        <h1 style={{fontSize:"clamp(34px, 7vw, 64px)",margin:"8px 0 12px"}}>{en ? "MISSIONS" : "MISIONES"}</h1>
        <p style={{maxWidth:620,fontSize:17,lineHeight:1.6,opacity:0.75}}>{en ? "Take on challenges, show what you have discovered, and grow as a space explorer." : "Supera retos, demuestra lo que has descubierto y avanza como explorador espacial."}</p>
        <MissionTranslationCompletion />
      </div>
    </main>
  );
}
