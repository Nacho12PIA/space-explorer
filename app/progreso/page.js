"use client";

import Link from "next/link";
import { useLanguage } from "../../i18n/LanguageContext";
import { useProgress } from "../../i18n/ProgressContext";

const copy = {
  es: {
    eyebrow: "CENTRO DE PROGRESO",
    title: "TU VIAJE ESPACIAL",
    intro: "Aquí podrás ver todo lo que has explorado, aprendido y superado en Space Explorer.",
    level: "NIVEL ACTUAL",
    levelName: "CADETE ESPACIAL",
    progress: "PROGRESO GENERAL",
    discoveries: "DESCUBRIMIENTOS",
    missions: "MISIONES",
    experiments: "EXPERIMENTOS",
    nova: "CONSULTAS A NOVA",
    pending: "Tu progreso ya se guarda en este dispositivo. Ahora iremos conectando EXPLORA, MISIONES, LABORATORIO y NOVA para que cada logro aparezca aquí automáticamente.",
    explore: "SEGUIR EXPLORANDO →",
  },
  en: {
    eyebrow: "PROGRESS CENTRE",
    title: "YOUR SPACE JOURNEY",
    intro: "Here you will be able to see everything you have explored, learned and completed in Space Explorer.",
    level: "CURRENT LEVEL",
    levelName: "SPACE CADET",
    progress: "OVERALL PROGRESS",
    discoveries: "DISCOVERIES",
    missions: "MISSIONS",
    experiments: "EXPERIMENTS",
    nova: "NOVA QUESTIONS",
    pending: "Your progress is now saved on this device. Next we will connect EXPLORE, MISSIONS, LABORATORY and NOVA so every achievement appears here automatically.",
    explore: "KEEP EXPLORING →",
  },
};

export default function ProgressPage() {
  const { language } = useLanguage();
  const { stats, ready } = useProgress();
  const t = copy[language] || copy.es;
  const displayStats = ready ? stats : { discoveries: 0, missions: 0, experiments: 0, nova: 0, percent: 0 };
  const cards = [
    ["🪐", t.discoveries, displayStats.discoveries],
    ["🚀", t.missions, displayStats.missions],
    ["🔬", t.experiments, displayStats.experiments],
    ["✦", t.nova, displayStats.nova],
  ];

  return (
    <main style={{ minHeight: "100%", boxSizing: "border-box", background: "radial-gradient(circle at top, #172554 0%, #060b18 44%, #02040a 100%)", color: "white", padding: "36px 20px 56px" }}>
      <div style={{ width: "100%", maxWidth: 980, margin: "0 auto" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, opacity: .55, fontWeight: 800 }}>{t.eyebrow}</div>
        <h1 style={{ fontSize: "clamp(34px, 7vw, 64px)", lineHeight: 1, margin: "10px 0 14px" }}>{t.title}</h1>
        <p style={{ maxWidth: 650, opacity: .76, lineHeight: 1.6, fontSize: 17, marginBottom: 28 }}>{t.intro}</p>

        <section style={{ padding: 24, borderRadius: 24, border: "1px solid rgba(96,165,250,.32)", background: "linear-gradient(145deg, rgba(37,99,235,.20), rgba(15,23,42,.88))", marginBottom: 18 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, opacity: .6, fontWeight: 800 }}>{t.level}</div>
          <div style={{ fontSize: 25, fontWeight: 900, marginTop: 7 }}>🛰️ {t.levelName}</div>
          <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", gap: 12, fontSize: 12, fontWeight: 800 }}><span>{t.progress}</span><span>{displayStats.percent}%</span></div>
          <div style={{ height: 10, background: "rgba(255,255,255,.10)", borderRadius: 99, overflow: "hidden", marginTop: 8 }}><div style={{ width: `${displayStats.percent}%`, height: "100%", background: "linear-gradient(90deg,#38bdf8,#818cf8)", transition: "width .35s ease" }} /></div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
          {cards.map(([icon, label, value]) => <section key={label} style={{ minHeight: 118, padding: 18, borderRadius: 18, border: "1px solid rgba(255,255,255,.10)", background: "rgba(15,23,42,.72)" }}><div style={{ fontSize: 25 }}>{icon}</div><div style={{ marginTop: 10, fontSize: 12, fontWeight: 800, opacity: .7 }}>{label}</div><div style={{ fontSize: 24, fontWeight: 900, marginTop: 3 }}>{value}</div></section>)}
        </div>

        <p style={{ margin: "22px 0", padding: "16px 18px", borderRadius: 16, background: "rgba(255,255,255,.055)", lineHeight: 1.55, opacity: .72 }}>{t.pending}</p>
        <Link href="/explora" style={{ display: "inline-block", color: "white", textDecoration: "none", fontWeight: 900, fontSize: 13, padding: "13px 17px", borderRadius: 14, background: "rgba(37,99,235,.75)", border: "1px solid rgba(96,165,250,.45)" }}>{t.explore}</Link>
      </div>
    </main>
  );
}
