import Link from "next/link";
import Laboratory from "../../components/Laboratory";

export default function LaboratorioPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #123047 0%, #060b18 45%, #02040a 100%)",
        color: "white",
        padding: "32px 20px 56px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          margin: "0 auto",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-block",
            color: "white",
            textDecoration: "none",
            marginBottom: 30,
            fontSize: 13,
            fontWeight: 800,
            opacity: 0.8,
          }}
        >
          ← INICIO
        </Link>

        <div
          style={{
            fontSize: 12,
            letterSpacing: 3,
            opacity: 0.55,
            fontWeight: 700,
          }}
        >
          CENTRO DE EXPERIMENTACIÓN
        </div>

        <h1
          style={{
            fontSize: "clamp(34px, 7vw, 64px)",
            margin: "8px 0 12px",
          }}
        >
          LABORATORIO
        </h1>

        <p
          style={{
            maxWidth: 650,
            fontSize: 17,
            lineHeight: 1.6,
            opacity: 0.75,
            marginBottom: 0,
          }}
        >
          Cambia las condiciones, observa los resultados y descubre por ti mismo cómo funciona el Universo.
        </p>

        <Laboratory />
      </div>
    </main>
  );
}
