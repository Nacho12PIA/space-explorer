"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import MissionPlayer from "../../components/MissionPlayer";
import { useLanguage } from "../../i18n/LanguageContext";
import { useProgress } from "../../i18n/ProgressContext";

export default function MisionesPage() {
  const { language } = useLanguage();
  const { recordProgress } = useProgress();
  const recordRef = useRef(recordProgress);
  const resultVisibleRef = useRef(false);
  const en = language === "en";

  recordRef.current = recordProgress;

  useEffect(() => {
    const completionLabels = new Set([
      "MISIÓN COMPLETADA",
      "MISSION COMPLETED",
      "EXPLORADOR CERTIFICADO",
      "CERTIFIED EXPLORER",
    ]);

    const checkMissionCompletion = () => {
      const completed = Array.from(document.querySelectorAll("h2")).some((heading) =>
        completionLabels.has((heading.textContent || "").trim().toUpperCase())
      );

      if (completed && !resultVisibleRef.current) {
        resultVisibleRef.current = true;
        recordRef.current(
          "missions",
          `mission-session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
        );
      } else if (!completed) {
        resultVisibleRef.current = false;
      }
    };

    checkMissionCompletion();
    const observer = new MutationObserver(checkMissionCompletion);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{minHeight:"100vh",background:"radial-gradient(circle at top, #13213f 0%, #060b18 45%, #02040a 100%)",color:"white",padding:"32px 20px"}}>
      <div style={{width:"100%",maxWidth:900,margin:"0 auto"}}>
        <Link href="/" style={{display:"inline-block",color:"white",textDecoration:"none",marginBottom:32,fontSize:13,fontWeight:800,opacity:0.8}}>← {en ? "HOME" : "INICIO"}</Link>
        <div style={{fontSize:12,letterSpacing:3,opacity:0.55,fontWeight:700}}>{en ? "MISSION CENTER" : "CENTRO DE MISIONES"}</div>
        <h1 style={{fontSize:"clamp(34px, 7vw, 64px)",margin:"8px 0 12px"}}>{en ? "MISSIONS" : "MISIONES"}</h1>
        <p style={{maxWidth:620,fontSize:17,lineHeight:1.6,opacity:0.75}}>{en ? "Take on challenges, show what you have discovered, and grow as a space explorer." : "Supera retos, demuestra lo que has descubierto y avanza como explorador espacial."}</p>
        <MissionPlayer />
      </div>
    </main>
  );
}
