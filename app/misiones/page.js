import Link from "next/link";

export default function MisionesPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #13213f 0%, #060b18 45%, #02040a 100%)",
        color: "white",
        padding: "32px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-block",
            color: "white",
            textDecoration: "none",
            marginBottom: 32,
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
          CENTRO DE MISIONES
        </div>

        <h1
          style={{
            fontSize: "clamp(34px, 7vw, 64px)",
            margin: "8px 0 12px",
          }}
        >
          MISIONES
        </h1>

        <p
          style={{
            maxWidth: 620,
            fontSize: 17,
            lineHeight: 1.6,
            opacity: 0.75,
          }}
        >
          Supera retos, demuestra lo que has descubierto
          y avanza como explorador espacial.
        </p>

        <section
          style={{
            marginTop: 36,
            padding: 24,
            borderRadius: 22,
            background:
              "linear-gradient(145deg, rgba(37,99,235,0.24), rgba(15,23,42,0.88))",
            border:
              "1px solid rgba(96,165,250,0.35)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: 1.5,
              fontWeight: 800,
              opacity: 0.65,
            }}
          >
            MISIÓN 01
          </div>

          <h2
            style={{
              fontSize: 28,
              margin: "8px 0 10px",
            }}
          >
            🚀 Rescate en el Sistema Solar
          </h2>

          <p
            style={{
              maxWidth: 600,
              lineHeight: 1.6,
              opacity: 0.75,
            }}
          >
            Una sonda ha perdido sus datos de navegación.
            Recupera la ruta resolviendo cinco desafíos
            sobre el Sistema Solar.
          </p>

          <div
            style={{
              marginTop: 24,
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            PREPARANDO MISIÓN...
          </div>
        </section>
      </div>
    </main>
  );
}
