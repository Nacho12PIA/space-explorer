import Link from "next/link";

export default function Home() {
  return (
  <main
  style={{
    height: "100vh",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    boxSizing: "border-box",
    background:
      "radial-gradient(circle at top, #13213f 0%, #060b18 45%, #02040a 100%)",
    color: "white",
    padding: "32px 20px",
  }}
>
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: 3,
              opacity: 0.55,
              fontWeight: 700,
            }}
          >
            CENTRO DE CONTROL
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 7vw, 72px)",
              margin: "8px 0 12px",
              lineHeight: 1,
            }}
          >
            SPACE EXPLORER
          </h1>

          <p
            style={{
              maxWidth: 620,
              fontSize: 17,
              lineHeight: 1.6,
              opacity: 0.75,
              margin: 0,
            }}
          >
            Explora el espacio, descubre
            cómo funciona el Universo y
            supera nuevos retos.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 16,
          }}
        >
          <Link
            href="/explora"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            <section
              style={{
                minHeight: 220,
                padding: 24,
                borderRadius: 22,
                background:
                  "linear-gradient(145deg, rgba(37,99,235,0.28), rgba(15,23,42,0.88))",
                border:
                  "1px solid rgba(96,165,250,0.35)",
              }}
            >
              <div style={{ fontSize: 34 }}>
                🪐
              </div>

              <h2>EXPLORA</h2>

              <p
                style={{
                  opacity: 0.7,
                  lineHeight: 1.5,
                }}
              >
                Viaja por el Sistema Solar
                y descubre sus planetas,
                lunas y nuestra estrella.
              </p>

              <div
                style={{
                  marginTop: 24,
                  fontWeight: 800,
                  fontSize: 13,
                }}
              >
                INICIAR EXPLORACIÓN →
              </div>
            </section>
          </Link>

          <HomeArea
            icon="🚀"
            title="MISIONES"
            description="Supera retos y demuestra lo que has descubierto."
            status="PRÓXIMAMENTE"
          />

          <HomeArea
            icon="🔬"
            title="LABORATORIO"
            description="Experimenta con las leyes que gobiernan el espacio."
            status="PRÓXIMAMENTE"
          />

          <HomeArea
            icon="✦"
            title="NOVA"
            description="Tu asistente para investigar y comprender el Universo."
            status="PRÓXIMAMENTE"
          />
        </div>
      </div>
    </main>
  );
}

function HomeArea({
  icon,
  title,
  description,
  status,
}) {
  return (
    <section
      style={{
        minHeight: 220,
        padding: 24,
        borderRadius: 22,
        background:
          "rgba(15,23,42,0.72)",
        border:
          "1px solid rgba(255,255,255,0.10)",
        opacity: 0.68,
      }}
    >
      <div style={{ fontSize: 34 }}>
        {icon}
      </div>

      <h2>{title}</h2>

      <p
        style={{
          opacity: 0.7,
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>

      <div
        style={{
          marginTop: 24,
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 1.2,
          opacity: 0.6,
        }}
      >
        {status}
      </div>
    </section>
  );
}
