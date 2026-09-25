"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import OuterSolarSystem from "./OuterSolarSystem";

export const EXPLORATION_SCALES = [
  "solarSystem",
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
    outerSolarSystem: "Sistema Solar exterior",
    kuiperBelt: "Cinturón de Kuiper",
    heliosphere: "Heliosfera",
    stellarNeighborhood: "Vecindario estelar",
    milkyWay: "Vía Láctea",
    zoomOut: "ALEJARSE",
    zoomIn: "ACERCARSE",
    coming: "PRÓXIMA ESCALA",
    adapted: "Las distancias y tamaños se adaptan en cada escala para poder explorarlos.",
    preparing: "Preparando esta escala…",
    continue: "Continuaremos construyendo aquí la siguiente región de EXPLORA.",
  },
  en: {
    scale: "EXPLORATION SCALE",
    solarSystem: "Solar System",
    outerSolarSystem: "Outer Solar System",
    kuiperBelt: "Kuiper Belt",
    heliosphere: "Heliosphere",
    stellarNeighborhood: "Stellar Neighborhood",
    milkyWay: "Milky Way",
    zoomOut: "ZOOM OUT",
    zoomIn: "ZOOM IN",
    coming: "NEXT SCALE",
    adapted: "Distances and sizes are adapted at each scale so they can be explored.",
    preparing: "Preparing this scale…",
    continue: "We will continue building the next EXPLORE region here.",
  },
};

function ScalePlaceholder({ label, text }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        color: "white",
        background:
          "radial-gradient(circle at 50% 42%, rgba(36,99,145,0.20), rgba(2,5,14,0.96) 42%, #01030a 78%)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 560 }}>
        <div style={{ fontSize: 11, letterSpacing: 2.4, fontWeight: 900, opacity: 0.5 }}>
          {text.preparing}
        </div>
        <h1 style={{ margin: "10px 0 12px", fontSize: "clamp(32px, 8vw, 58px)" }}>{label}</h1>
        <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.62 }}>{text.continue}</p>
      </div>
    </div>
  );
}

export default function ExplorationJourney({ children, onScaleChange }) {
  const { language } = useLanguage();
  const text = copy[language] || copy.es;
  const [showMap, setShowMap] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(null);

  const currentScale = EXPLORATION_SCALES[currentIndex];
  const previousScale = EXPLORATION_SCALES[currentIndex - 1];
  const nextScale = EXPLORATION_SCALES[currentIndex + 1];

  const scaleItems = useMemo(
    () => EXPLORATION_SCALES.map((id, index) => ({ id, index, label: text[id] })),
    [text]
  );

  function travelTo(index) {
    if (index < 0 || index >= EXPLORATION_SCALES.length || index === currentIndex || transition) return;
    const direction = index > currentIndex ? "out" : "in";
    setShowMap(false);
    setTransition({ direction, target: index });
    window.setTimeout(() => {
      setCurrentIndex(index);
      onScaleChange?.(EXPLORATION_SCALES[index]);
      window.setTimeout(() => setTransition(null), 420);
    }, 420);
  }

  const movingOut = transition?.direction === "out";
  const transitionLabel = transition ? text[EXPLORATION_SCALES[transition.target]] : "";

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", background: "#01030a" }}>
      <div
        style={{
          transform: transition ? `scale(${movingOut ? 0.84 : 1.16})` : "scale(1)",
          opacity: transition ? 0.18 : 1,
          filter: transition ? "blur(5px)" : "blur(0px)",
          transition: "transform 420ms cubic-bezier(.2,.8,.2,1), opacity 420ms ease, filter 420ms ease",
          transformOrigin: "50% 50%",
        }}
      >
        {currentScale === "solarSystem" ? (
          children
        ) : currentScale === "outerSolarSystem" ? (
          <OuterSolarSystem />
        ) : (
          <ScalePlaceholder label={text[currentScale]} text={text} />
        )}
      </div>

      {transition && (
        <div
          aria-live="polite"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 5000,
            display: "grid",
            placeItems: "center",
            pointerEvents: "none",
            color: "white",
            background: "rgba(1,3,10,0.46)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
        >
          <div style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 900, opacity: 0.58 }}>
              {movingOut ? text.zoomOut : text.zoomIn}
            </div>
            <div style={{ marginTop: 8, fontSize: "clamp(24px, 7vw, 42px)", fontWeight: 900 }}>
              {transitionLabel}
            </div>
          </div>
        </div>
      )}

      <div style={{ position: "fixed", left: 16, bottom: 18, zIndex: 5200 }}>
        <button
          type="button"
          onClick={() => setShowMap((value) => !value)}
          aria-expanded={showMap}
          aria-label={text.scale}
          title={text.scale}
          style={{
            border: "1px solid rgba(125,211,252,0.32)",
            borderRadius: 999,
            width: 46,
            height: 46,
            padding: 0,
            display: "grid",
            placeItems: "center",
            color: "white",
            background: "rgba(4,10,25,0.82)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            fontSize: 21,
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.28)",
          }}
        >
          🌌
        </button>

        {showMap && (
          <section
            style={{
              position: "absolute",
              left: 0,
              bottom: 54,
              width: "min(330px, calc(100vw - 32px))",
              padding: 14,
              borderRadius: 20,
              color: "white",
              background: "rgba(4,10,25,0.96)",
              border: "1px solid rgba(125,211,252,0.24)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 22px 60px rgba(0,0,0,0.42)",
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1.4, opacity: 0.58, marginBottom: 10 }}>
              {text.scale}
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              {scaleItems.map((item) => {
                const active = item.index === currentIndex;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => travelTo(item.index)}
                    disabled={active || Boolean(transition)}
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "22px 1fr",
                      gap: 8,
                      alignItems: "center",
                      padding: "9px",
                      border: 0,
                      borderRadius: 12,
                      color: "white",
                      textAlign: "left",
                      background: active ? "rgba(56,189,248,0.16)" : "transparent",
                      opacity: active ? 1 : 0.68,
                      cursor: active ? "default" : "pointer",
                    }}
                  >
                    <span style={{ textAlign: "center" }}>{active ? "●" : "○"}</span>
                    <span style={{ fontSize: 12, fontWeight: active ? 900 : 700 }}>{item.label}</span>
                  </button>
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
          left: 70,
          right: 16,
          bottom: 18,
          zIndex: 5100,
          display: "flex",
          justifyContent: "flex-end",
          gap: 7,
          pointerEvents: transition ? "none" : "auto",
        }}
      >
        {previousScale && (
          <button
            type="button"
            onClick={() => travelTo(currentIndex - 1)}
            aria-label={`${text.zoomIn}: ${text[previousScale]}`}
            style={{
              minWidth: 42,
              height: 42,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white",
              background: "rgba(4,10,25,0.76)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ↓
          </button>
        )}

        {nextScale && (
          <button
            type="button"
            onClick={() => travelTo(currentIndex + 1)}
            style={{
              minHeight: 42,
              maxWidth: "min(260px, calc(100vw - 130px))",
              padding: "8px 13px",
              borderRadius: 999,
              border: "1px solid rgba(125,211,252,0.25)",
              color: "white",
              background: "rgba(4,10,25,0.78)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              fontSize: 10,
              fontWeight: 900,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              cursor: "pointer",
            }}
          >
            {text.zoomOut} ↑ · {text[nextScale]}
          </button>
        )}
      </div>
    </div>
  );
}
