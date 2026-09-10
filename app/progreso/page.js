"use client";

import Link from "next/link";
import { useLanguage } from "../../i18n/LanguageContext";
import { useProgress } from "../../i18n/ProgressContext";

const copy = {
  es: {
    eyebrow: "CENTRO DE PROGRESO",
    title: "TU VIAJE ESPACIAL",
    intro: "Aquí puedes ver todo lo que has explorado, aprendido y superado en Space Explorer.",
    level: "NIVEL ACTUAL",
    progress: "PROGRESO GENERAL",
    discoveries: "DESCUBRIMIENTOS",
    missions: "MISIONES",
    experiments: "EXPERIMENTOS",
    nova: "CONSULTAS A NOVA",
    achievements: "LOGROS",
    achievementsIntro: "Desbloquea insignias mientras exploras el Universo.",
    locked: "POR DESBLOQUEAR",
    unlocked: "DESBLOQUEADO",
    continue: "Sigue explorando: cada descubrimiento, misión, experimento y consulta a NOVA impulsa tu rango espacial.",
    explore: "SEGUIR EXPLORANDO →",
    home: "← VOLVER AL INICIO",
    levels: [
      { min: 0, icon: "🛰️", name: "CADETE ESPACIAL" },
      { min: 20, icon: "🚀", name: "EXPLORADOR ORBITAL" },
      { min: 45, icon: "🌙", name: "PILOTO LUNAR" },
      { min: 70, icon: "🪐", name: "COMANDANTE PLANETARIO" },
      { min: 90, icon: "🌌", name: "MAESTRO DEL COSMOS" },
    ],
    badges: {
      firstDiscovery: ["🪐", "PRIMER MUNDO", "Descubre tu primer planeta en EXPLORA."],
      threeDiscoveries: ["🔭", "CAZAMUNDOS", "Descubre 3 planetas diferentes."],
      firstMission: ["🚀", "MISIÓN CUMPLIDA", "Completa tu primera misión."],
      fiveMissions: ["🏆", "TRIPULACIÓN VETERANA", "Completa 5 misiones."],
      firstExperiment: ["🔬", "CIENTÍFICO EN PRÁCTICAS", "Prueba tu primer experimento."],
      allExperiments: ["⚗️", "MAESTRO DEL LABORATORIO", "Prueba los 5 experimentos del laboratorio."],
      firstNova: ["✦", "MENTE CURIOSA", "Haz tu primera consulta científica a NOVA."],
      fiveNova: ["🧠", "PREGUNTA SIN MIEDO", "Investiga 5 temas distintos con NOVA."],
    },
  },
  en: {
    eyebrow: "PROGRESS CENTRE",
    title: "YOUR SPACE JOURNEY",
    intro: "Here you can see everything you have explored, learned and completed in Space Explorer.",
    level: "CURRENT LEVEL",
    progress: "OVERALL PROGRESS",
    discoveries: "DISCOVERIES",
    missions: "MISSIONS",
    experiments: "EXPERIMENTS",
    nova: "NOVA QUESTIONS",
    achievements: "ACHIEVEMENTS",
    achievementsIntro: "Unlock badges as you explore the Universe.",
    locked: "LOCKED",
    unlocked: "UNLOCKED",
    continue: "Keep exploring: every discovery, mission, experiment and NOVA question advances your space rank.",
    explore: "KEEP EXPLORING →",
    home: "← BACK TO HOME",
    levels: [
      { min: 0, icon: "🛰️", name: "SPACE CADET" },
      { min: 20, icon: "🚀", name: "ORBITAL EXPLORER" },
      { min: 45, icon: "🌙", name: "LUNAR PILOT" },
      { min: 70, icon: "🪐", name: "PLANETARY COMMANDER" },
      { min: 90, icon: "🌌", name: "MASTER OF THE COSMOS" },
    ],
    badges: {
      firstDiscovery: ["🪐", "FIRST WORLD", "Discover your first planet in EXPLORE."],
      threeDiscoveries: ["🔭", "WORLD HUNTER", "Discover 3 different planets."],
      firstMission: ["🚀", "MISSION COMPLETE", "Complete your first mission."],
      fiveMissions: ["🏆", "VETERAN CREW", "Complete 5 missions."],
      firstExperiment: ["🔬", "TRAINEE SCIENTIST", "Try your first experiment."],
      allExperiments: ["⚗️", "LAB MASTER", "Try all 5 laboratory experiments."],
      firstNova: ["✦", "CURIOUS MIND", "Ask NOVA your first science question."],
      fiveNova: ["🧠", "KEEP ASKING", "Explore 5 different topics with NOVA."],
    },
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

  const currentLevel = [...t.levels].reverse().find((level) => displayStats.percent >= level.min) || t.levels[0];
  const nextLevel = t.levels.find((level) => level.min > displayStats.percent);

  const badgeStates = [
    [t.badges.firstDiscovery, displayStats.discoveries >= 1],
    [t.badges.threeDiscoveries, displayStats.discoveries >= 3],
    [t.badges.firstMission, displayStats.missions >= 1],
    [t.badges.fiveMissions, displayStats.missions >= 5],
    [t.badges.firstExperiment, displayStats.experiments >= 1],
    [t.badges.allExperiments, displayStats.experiments >= 5],
    [t.badges.firstNova, displayStats.nova >= 1],
    [t.badges.fiveNova, displayStats.nova >= 5],
  ];

  return (
    <main className="progressPage" style={{ minHeight: "100%", boxSizing: "border-box", background: "radial-gradient(circle at top, #172554 0%, #060b18 44%, #02040a 100%)", color: "white", padding: "36px 20px 56px" }}>
      <style>{`
        @media (max-width: 560px) {
          .progressPage { padding: 28px 14px 44px !important; }
          .progressLevelCard { padding: 19px !important; border-radius: 20px !important; }
          .progressStats { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .progressStatCard { min-height: 104px !important; padding: 15px !important; }
          .progressBadges { grid-template-columns: 1fr !important; }
          .progressAchievements { padding: 17px !important; }
          .progressActions { display: grid !important; grid-template-columns: 1fr !important; }
          .progressActions a { text-align: center; }
        }
        @media (max-width: 360px) {
          .progressStats { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ width: "100%", maxWidth: 980, margin: "0 auto" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, opacity: .55, fontWeight: 800 }}>{t.eyebrow}</div>
        <h1 style={{ fontSize: "clamp(34px, 7vw, 64px)", lineHeight: 1, margin: "10px 0 14px" }}>{t.title}</h1>
        <p style={{ maxWidth: 650, opacity: .76, lineHeight: 1.6, fontSize: 17, marginBottom: 28 }}>{t.intro}</p>

        <section className="progressLevelCard" style={{ padding: 24, borderRadius: 24, border: "1px solid rgba(96,165,250,.32)", background: "linear-gradient(145deg, rgba(37,99,235,.20), rgba(15,23,42,.88))", marginBottom: 18 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, opacity: .6, fontWeight: 800 }}>{t.level}</div>
          <div style={{ fontSize: "clamp(21px, 5vw, 25px)", fontWeight: 900, marginTop: 7 }}>{currentLevel.icon} {currentLevel.name}</div>
          <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", gap: 12, fontSize: 12, fontWeight: 800 }}><span>{t.progress}</span><span>{displayStats.percent}%</span></div>
          <div style={{ height: 10, background: "rgba(255,255,255,.10)", borderRadius: 99, overflow: "hidden", marginTop: 8 }}><div style={{ width: `${displayStats.percent}%`, height: "100%", background: "linear-gradient(90deg,#38bdf8,#818cf8)", transition: "width .35s ease" }} /></div>
          {nextLevel && <div style={{ marginTop: 10, fontSize: 12, opacity: .62 }}>{language === "en" ? `${nextLevel.min - displayStats.percent} points to ${nextLevel.name}` : `${nextLevel.min - displayStats.percent} puntos para ${nextLevel.name}`}</div>}
        </section>

        <div className="progressStats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
          {cards.map(([icon, label, value]) => <section className="progressStatCard" key={label} style={{ minHeight: 118, padding: 18, borderRadius: 18, border: "1px solid rgba(255,255,255,.10)", background: "rgba(15,23,42,.72)" }}><div style={{ fontSize: 25 }}>{icon}</div><div style={{ marginTop: 10, fontSize: 12, fontWeight: 800, opacity: .7 }}>{label}</div><div style={{ fontSize: 24, fontWeight: 900, marginTop: 3 }}>{value}</div></section>)}
        </div>

        <section className="progressAchievements" style={{ marginTop: 22, padding: 20, borderRadius: 22, border: "1px solid rgba(251,191,36,.18)", background: "linear-gradient(145deg,rgba(120,53,15,.16),rgba(15,23,42,.76))" }}>
          <div style={{ fontSize: 11, letterSpacing: 2.2, fontWeight: 900, opacity: .62 }}>{t.achievements}</div>
          <h2 style={{ margin: "7px 0 4px", fontSize: 24 }}>{t.achievements}</h2>
          <p style={{ margin: "0 0 16px", opacity: .68, lineHeight: 1.5 }}>{t.achievementsIntro}</p>
          <div className="progressBadges" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 10 }}>
            {badgeStates.map(([[icon, name, description], unlocked]) => (
              <article key={name} style={{ padding: 16, borderRadius: 17, border: unlocked ? "1px solid rgba(250,204,21,.34)" : "1px solid rgba(255,255,255,.08)", background: unlocked ? "rgba(250,204,21,.09)" : "rgba(255,255,255,.035)", opacity: unlocked ? 1 : .52 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28, filter: unlocked ? "none" : "grayscale(1)" }}>{icon}</span>
                  <span style={{ fontSize: 9, letterSpacing: 1.3, fontWeight: 900, padding: "5px 7px", borderRadius: 999, background: unlocked ? "rgba(250,204,21,.12)" : "rgba(255,255,255,.06)" }}>{unlocked ? t.unlocked : t.locked}</span>
                </div>
                <div style={{ marginTop: 10, fontSize: 14, fontWeight: 900 }}>{name}</div>
                <p style={{ margin: "6px 0 0", fontSize: 12, lineHeight: 1.45, opacity: .72 }}>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <p style={{ margin: "22px 0", padding: "16px 18px", borderRadius: 16, background: "rgba(255,255,255,.055)", lineHeight: 1.55, opacity: .72 }}>{t.continue}</p>
        <div className="progressActions" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <Link href="/explora" style={{ display: "inline-block", color: "white", textDecoration: "none", fontWeight: 900, fontSize: 13, padding: "13px 17px", borderRadius: 14, background: "rgba(37,99,235,.75)", border: "1px solid rgba(96,165,250,.45)" }}>{t.explore}</Link>
          <Link href="/" style={{ display: "inline-block", color: "white", textDecoration: "none", fontWeight: 900, fontSize: 13, padding: "13px 17px", borderRadius: 14, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.16)" }}>{t.home}</Link>
        </div>
      </div>
    </main>
  );
}
