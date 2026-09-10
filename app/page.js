"use client";

import Link from "next/link";
import { useLanguage } from "../i18n/LanguageContext";
import { getNovaContent } from "../i18n/nova";

export default function Home() {
  const { language, t } = useLanguage();
  const nova = getNovaContent(language);

  return (
    <main
      style={{
        minHeight: "100%",
        boxSizing: "border-box",
        background:
          "radial-gradient(circle at top, #13213f 0%, #060b18 45%, #02040a 100%)",
        color: "white",
        padding: "32px 20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, opacity: 0.55, fontWeight: 700 }}>
            {t("home.controlCenter", "CENTRO DE CONTROL")}
          </div>
          <h1 style={{ fontSize: "clamp(36px, 7vw, 72px)", margin: "8px 0 12px", lineHeight: 1 }}>
            SPACE EXPLORER
          </h1>
          <p style={{ maxWidth: 620, fontSize: 17, lineHeight: 1.6, opacity: 0.75, margin: 0 }}>
            {t("home.intro", "Explora el espacio, descubre cómo funciona el Universo y supera nuevos retos.")}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
          <AreaLink
            href="/explora"
            icon="🪐"
            title={t("home.explore.title", "EXPLORA")}
            description={t("home.explore.description", "Viaja por el Sistema Solar y descubre sus planetas, lunas y nuestra estrella.")}
            action={t("home.explore.action", "INICIAR EXPLORACIÓN →")}
            background="linear-gradient(145deg, rgba(37,99,235,0.28), rgba(15,23,42,0.88))"
            border="1px solid rgba(96,165,250,0.35)"
          />
          <AreaLink
            href="/misiones"
            icon="🚀"
            title={t("home.missions.title", "MISIONES")}
            description={t("home.missions.description", "Supera retos y demuestra lo que has descubierto.")}
            action={t("home.missions.action", "INICIAR MISIÓN →")}
            background="linear-gradient(145deg, rgba(124,58,237,0.24), rgba(15,23,42,0.88))"
            border="1px solid rgba(167,139,250,0.35)"
          />
          <AreaLink
            href="/laboratorio"
            icon="🔬"
            title={t("home.laboratory.title", "LABORATORIO")}
            description={t("home.laboratory.description", "Cambia variables y experimenta con las leyes que gobiernan el espacio.")}
            action={t("home.laboratory.action", "ENTRAR AL LABORATORIO →")}
            background="linear-gradient(145deg, rgba(8,145,178,0.24), rgba(15,23,42,0.88))"
            border="1px solid rgba(34,211,238,0.32)"
          />
          <AreaLink
            href="/nova"
            icon="✦"
            title={t("home.nova.title", "NOVA")}
            description={t("home.nova.description", "Tu asistente para investigar y comprender el Universo.")}
            action={nova.homeAction}
            background="linear-gradient(145deg, rgba(217,70,239,0.22), rgba(15,23,42,0.88))"
            border="1px solid rgba(232,121,249,0.34)"
          />
          <AreaLink
            href="/progreso"
            icon="🏅"
            title={language === "en" ? "PROGRESS" : "PROGRESIÓN"}
            description={language === "en" ? "See your discoveries, missions, experiments and progress as a space explorer." : "Consulta tus descubrimientos, misiones, experimentos y avance como explorador espacial."}
            action={language === "en" ? "VIEW MY PROGRESS →" : "VER MI PROGRESO →"}
            background="linear-gradient(145deg, rgba(245,158,11,0.20), rgba(15,23,42,0.88))"
            border="1px solid rgba(251,191,36,0.34)"
          />
        </div>
      </div>
    </main>
  );
}

function AreaLink({ href, icon, title, description, action, background, border }) {
  return (
    <Link href={href} style={{ color: "white", textDecoration: "none", display: "block", height: "100%" }}>
      <section style={{ minHeight: 220, height: "100%", padding: 24, borderRadius: 22, background, border, boxSizing: "border-box" }}>
        <div style={{ fontSize: 34 }}>{icon}</div>
        <h2>{title}</h2>
        <p style={{ opacity: 0.7, lineHeight: 1.5 }}>{description}</p>
        <div style={{ marginTop: 24, fontWeight: 800, fontSize: 13 }}>{action}</div>
      </section>
    </Link>
  );
}
