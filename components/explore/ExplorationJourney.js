"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

export const EXPLORATION_SCALES = [
  "solarSystem",
  "asteroidBelt",
  "outerSolarSystem",
  "kuiperBelt",
  "heliosphere",
  "stellarNeighborhood",
  "milkyWay",
];

const copy = {
  es: {
    scale: "ESCALA DE EXPLORACIÓN",
    solarSystem: "Sistema Solar",
    asteroidBelt: "Cinturón de asteroides",
    outerSolarSystem: "Sistema Solar exterior",
    kuiperBelt: "Cinturón de Kuiper",
    heliosphere: "Heliosfera",
    stellarNeighborhood: "Vecindario estelar",
    milkyWay: "Vía Láctea",
    zoomOut: "ALEJARSE",
    coming: "PRÓXIMA ESCALA",
    adapted: "Las distancias y tamaños se adaptan en cada escala para poder explorarlos.",
  },
  en: {
    scale: "EXPLORATION SCALE",
    solarSystem: "Solar System",
    asteroidBelt: "Asteroid Belt",
    outerSolarSystem: "Outer Solar System",
    kuiperBelt: "Kuiper Belt",
    heliosphere: "Heliosphere",
    stellarNeighborhood: "Stellar Neighborhood",
    milkyWay: "Milky Way",
    zoomOut: "ZOOM OUT",
    coming: "NEXT SCALE",
    adapted: "Distances and sizes are adapted at each scale so they can be explored.",
  },
};

export default function ExplorationJourney({ children }) {
  const { language } = useLanguage();
  const text = copy[language] || copy.es;
  const [showMap, setShowMap] = useState(false);

  const currentIndex = 0;
  const nextScale = EXPLORATION_SCALES[currentIndex + 1];
  const scaleItems = useMemo(
    () => EXPLORATION_SCALES.map((id, index) => ({ id, index, label: text[id] })),
    [text]
  );

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      {children}

      <div style={{ position: "fixed", left: 16, bottom: 70, zIndex: 1200 }}>
        <button
          type="button"
          onClick={() => setShowMap((value) => !value)}
          aria-expanded={showMap}
          style={{
            border: "1px solid rgba(125,211,252,0.32)",
            borderRadius: 999,
            padding: "10px 14px",
            color: "white",
            background: "rgba(4,10,25,0.82)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: 0.7,
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.28)",
          }}
        >
          🌌 {text.scale}
        </button>

        {showMap && (
          <section
            style={{
              position: "absolute",
              left: 0,
              bottom: 48,
              width: "min(330px, calc(100vw - 32px))",
              padding: 14,
              borderRadius: 20,
              color: "white",
              background: "rgba(4,10,25,0.94)",
              border: "1px solid rgba(125,211,252,0.24)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 22px 60px rgba(0,0,0,0.42)",
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1.4, opacity: 0.58, marginBottom: 10 }}>
              {text.scale}
            </div>

            <div style={{ display: "grid", gap: 7 }}>
              {scaleItems.map((item) => {
                const active = item.index === currentIndex;
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "22px 1fr",
                      gap: 8,
                      alignItems: "center",
                      padding: "7px 9px",
                      borderRadius: 12,
                      background: active ? "rgba(56,189,248,0.14)" : "transparent",
                      opacity: active ? 1 : 0.48,
                    }}
                  >
                    <span style={{ textAlign: "center" }}>{active ? "●" : item.index > currentIndex ? "○" : "✓"}</span>
                    <span style={{ fontSize: 12, fontWeight: active ? 900 : 700 }}>{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 11, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.09)", fontSize: 11, lineHeight: 1.45, opacity: 0.62 }}>
              ⚖️ {text.adapted}
            </div>
          </section>
        )}
      </div>

      <div
        style={{
          position: "fixed",
          right: 16,
          bottom: 18,
          zIndex: 1100,
          padding: "9px 13px",
          borderRadius: 999,
          color: "rgba(255,255,255,0.72)",
          background: "rgba(4,10,25,0.70)",
          border: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          fontSize: 10,
          fontWeight: 800,
          pointerEvents: "none",
        }}
      >
        {text.coming}: {text[nextScale]} · {text.zoomOut} ↑
      </div>
    </div>
  );
}
