"use client";

import Link from "next/link";
import { useState } from "react";
import LocalizedLaboratory from "../../components/LocalizedLaboratory";
import LaboratoryDeepLink from "../../components/LaboratoryDeepLink";
import GravityPlayground from "../../components/GravityPlayground";
import OrbitPlayground from "../../components/OrbitPlayground";
import { useLanguage } from "../../i18n/LanguageContext";
import { useProgress } from "../../i18n/ProgressContext";
import { getLaboratoryText } from "../../data/laboratoryContent";

const experimentDiscoveryIds = [
  { id: "gravity", titles: ["SUPERGRAVEDAD", "SUPERGRAVITY"] },
  { id: "orbits", titles: ["DOMINA UNA ÓRBITA", "MASTER AN ORBIT"] },
  { id: "daynight", titles: ["FABRICA UN DÍA", "MAKE A DAY"] },
  { id: "blackhole", titles: ["AGUJERO NEGRO", "BLACK HOLE"] },
  { id: "impact", titles: ["IMPACTO DE ASTEROIDE", "ASTEROID IMPACT"] },
];

export default function LaboratorioPage() {
  const { language } = useLanguage();
  const { recordProgress } = useProgress();
  const [activeEnhanced, setActiveEnhanced] = useState(null);
  const text = getLaboratoryText(language);

  const handleLaboratoryClick = (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const buttonText = (button.textContent || "").toUpperCase();
    const experiment = experimentDiscoveryIds.find(({ titles }) => titles.some((title) => buttonText.includes(title)));
    if (!experiment) return;
    recordProgress("experiments", experiment.id);
    if (experiment.id === "gravity" || experiment.id === "orbits") {
      event.preventDefault();
      event.stopPropagation();
      setActiveEnhanced(experiment.id);
    }
  };

  const enhanced = activeEnhanced === "gravity"
    ? <GravityPlayground onBack={() => setActiveEnhanced(null)} />
    : activeEnhanced === "orbits"
      ? <OrbitPlayground onBack={() => setActiveEnhanced(null)} />
      : null;

  return (
    <main style={{minHeight:"100vh",background:"radial-gradient(circle at top, #123047 0%, #060b18 45%, #02040a 100%)",color:"white",padding:"32px 20px 56px",boxSizing:"border-box"}}>
      <div style={{width:"100%",maxWidth:920,margin:"0 auto"}}>
        {!activeEnhanced && <Link href="/" style={{display:"inline-block",color:"white",textDecoration:"none",marginBottom:30,fontSize:13,fontWeight:800,opacity:.8}}>← {text.page.home}</Link>}
        {!activeEnhanced && <>
          <div style={{fontSize:12,letterSpacing:3,opacity:.55,fontWeight:700}}>{text.page.center}</div>
          <h1 style={{fontSize:"clamp(34px, 7vw, 64px)",margin:"8px 0 12px"}}>{text.page.title}</h1>
          <p style={{maxWidth:650,fontSize:17,lineHeight:1.6,opacity:.75,marginBottom:0}}>{text.page.intro}</p>
          <LaboratoryDeepLink />
        </>}
        {activeEnhanced ? enhanced : <div onClickCapture={handleLaboratoryClick}><LocalizedLaboratory /></div>}
      </div>
    </main>
  );
}
