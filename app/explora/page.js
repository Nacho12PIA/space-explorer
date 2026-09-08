"use client";

import { useState } from "react";
import Link from "next/link";
import SolarSystem from "../../components/SolarSystem";

const starFacts = [
  {
    title: "¿Qué es una estrella?",
    text: "Una estrella es una enorme esfera de plasma mantenida unida por su gravedad. Brilla porque en su núcleo se produce fusión nuclear.",
  },
  {
    title: "¿Por qué tienen colores distintos?",
    text: "El color nos da pistas sobre su temperatura. Las estrellas azuladas son más calientes; las rojizas son más frías en su superficie.",
  },
  {
    title: "¿Dónde nacen?",
    text: "Las estrellas nacen dentro de grandes nubes de gas y polvo llamadas nebulosas. La gravedad concentra el material hasta que comienza la fusión.",
  },
  {
    title: "¿Todas son iguales?",
    text: "No. Hay estrellas mucho más pequeñas o mucho más grandes que el Sol. Su masa influye en su temperatura, brillo, duración y evolución.",
  },
  {
    title: "¿Cómo termina su vida?",
    text: "Una estrella parecida al Sol acabará como gigante roja y después como enana blanca. Las estrellas muy masivas pueden explotar como supernovas.",
  },
  {
    title: "Distancias enormes",
    text: "Para medir distancias entre estrellas usamos el año luz: la distancia que recorre la luz en un año. Próxima Centauri, después del Sol, está a unos 4,24 años luz.",
  },
];

export default function ExploraPage() {
  const [showStars, setShowStars] = useState(false);

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Link
        href="/"
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 50,
          color: "white",
          textDecoration: "none",
          background: "rgba(4, 10, 25, 0.72)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 999,
          padding: "10px 14px",
          fontSize: 12,
          fontWeight: 800,
          backdropFilter: "blur(10px)",
        }}
      >
        ← INICIO
      </Link>

      <button
        onClick={() => setShowStars(true)}
        style={{
          position: "absolute",
          right: 16,
          bottom: 18,
          zIndex: 50,
          color: "white",
          background: "rgba(38, 25, 73, 0.84)",
          border: "1px solid rgba(196,181,253,0.35)",
          borderRadius: 999,
          padding: "11px 15px",
          fontSize: 12,
          fontWeight: 900,
          cursor: "pointer",
          backdropFilter: "blur(10px)",
        }}
      >
        ⭐ APRENDE SOBRE ESTRELLAS
      </button>

      <SolarSystem />

      {showStars && (
        <div
          onClick={() => setShowStars(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "grid",
            placeItems: "center",
            padding: 18,
            background: "rgba(2,4,10,0.78)",
            backdropFilter: "blur(8px)",
          }}
        >
          <section
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "min(760px, 100%)",
              maxHeight: "86vh",
              overflowY: "auto",
              padding: "clamp(20px, 4vw, 30px)",
              borderRadius: 24,
              color: "white",
              background: "linear-gradient(145deg, rgba(30,20,70,0.98), rgba(5,10,28,0.98))",
              border: "1px solid rgba(196,181,253,0.28)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "start" }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 900, opacity: 0.55 }}>EXPLORA · ASTRONOMÍA</div>
                <h2 style={{ margin: "7px 0 8px", fontSize: "clamp(28px, 6vw, 42px)" }}>⭐ El Sol y las estrellas</h2>
                <p style={{ margin: 0, maxWidth: 590, lineHeight: 1.6, opacity: 0.75 }}>
                  Nuestro Sol es una estrella. Entenderlo nos ayuda a comprender millones de estrellas que vemos en el Universo.
                </p>
              </div>
              <button
                onClick={() => setShowStars(false)}
                aria-label="Cerrar"
                style={{ border: 0, background: "rgba(255,255,255,0.1)", color: "white", borderRadius: 999, width: 38, height: 38, cursor: "pointer", fontSize: 20 }}
              >
                ×
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 24 }}>
              {starFacts.map((fact) => (
                <article key={fact.title} style={{ padding: 17, borderRadius: 17, background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: 17 }}>{fact.title}</h3>
                  <p style={{ margin: 0, lineHeight: 1.55, fontSize: 14, opacity: 0.75 }}>{fact.text}</p>
                </article>
              ))}
            </div>

            <div style={{ marginTop: 18, padding: 15, borderRadius: 16, background: "rgba(96,165,250,0.10)", lineHeight: 1.55, fontSize: 14 }}>
              <strong>RECUERDA:</strong> las estrellas no son puntos pequeños ni bolas de fuego. Parecen puntos porque están increíblemente lejos y están formadas principalmente por plasma.
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
