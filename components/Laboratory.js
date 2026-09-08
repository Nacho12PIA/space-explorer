"use client";

import { useEffect, useMemo, useState } from "react";

const experiments = [
  {
    id: "gravity",
    icon: "🪂",
    title: "GRAVEDAD",
    subtitle: "¿Pesas lo mismo en todos los mundos?",
  },
  {
    id: "orbits",
    icon: "☀️",
    title: "ÓRBITAS",
    subtitle: "Cambia la distancia y observa qué ocurre.",
  },
  {
    id: "daynight",
    icon: "🌗",
    title: "DÍA Y NOCHE",
    subtitle: "Haz girar un planeta frente a su estrella.",
  },
];

const worlds = [
  { name: "Mercurio", gravity: 3.7, icon: "☿" },
  { name: "Venus", gravity: 8.87, icon: "♀" },
  { name: "Tierra", gravity: 9.81, icon: "🌍" },
  { name: "Luna", gravity: 1.62, icon: "🌕" },
  { name: "Marte", gravity: 3.71, icon: "♂" },
  { name: "Júpiter", gravity: 24.79, icon: "♃" },
  { name: "Saturno", gravity: 10.44, icon: "♄" },
  { name: "Urano", gravity: 8.69, icon: "♅" },
  { name: "Neptuno", gravity: 11.15, icon: "♆" },
];

const panelStyle = {
  marginTop: 22,
  borderRadius: 24,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(15,23,42,0.76)",
  overflow: "hidden",
};

const controlStyle = {
  width: "100%",
  accentColor: "#38bdf8",
};

export default function Laboratory() {
  const [activeExperiment, setActiveExperiment] = useState(null);

  if (!activeExperiment) {
    return (
      <section style={{ marginTop: 34 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          {experiments.map((experiment) => (
            <button
              key={experiment.id}
              type="button"
              onClick={() => setActiveExperiment(experiment.id)}
              style={{
                minHeight: 190,
                textAlign: "left",
                padding: 22,
                color: "white",
                cursor: "pointer",
                borderRadius: 22,
                border: "1px solid rgba(56,189,248,0.24)",
                background:
                  "linear-gradient(145deg, rgba(14,165,233,0.18), rgba(15,23,42,0.92))",
                boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
              }}
            >
              <div style={{ fontSize: 34 }}>{experiment.icon}</div>
              <div
                style={{
                  marginTop: 16,
                  fontSize: 20,
                  fontWeight: 900,
                  letterSpacing: 0.5,
                }}
              >
                {experiment.title}
              </div>
              <p style={{ opacity: 0.72, lineHeight: 1.5, marginBottom: 18 }}>
                {experiment.subtitle}
              </p>
              <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 1.2 }}>
                ABRIR EXPERIMENTO →
              </div>
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: 20,
            padding: "16px 18px",
            borderRadius: 18,
            background: "rgba(56,189,248,0.08)",
            border: "1px solid rgba(56,189,248,0.16)",
            fontSize: 14,
            lineHeight: 1.6,
            opacity: 0.86,
          }}
        >
          🔬 Elige un experimento. Aquí no basta con leer: cambia una variable y observa cómo responde el Universo.
        </div>
      </section>
    );
  }

  return (
    <section style={{ marginTop: 28 }}>
      <button
        type="button"
        onClick={() => setActiveExperiment(null)}
        style={{
          color: "white",
          background: "transparent",
          border: 0,
          padding: "10px 0",
          cursor: "pointer",
          fontWeight: 900,
          fontSize: 12,
          letterSpacing: 1,
          opacity: 0.82,
        }}
      >
        ← TODOS LOS EXPERIMENTOS
      </button>

      {activeExperiment === "gravity" && <GravityExperiment />}
      {activeExperiment === "orbits" && <OrbitExperiment />}
      {activeExperiment === "daynight" && <DayNightExperiment />}
    </section>
  );
}

function GravityExperiment() {
  const [mass, setMass] = useState(40);
  const [selectedWorld, setSelectedWorld] = useState("Luna");

  const world = worlds.find((item) => item.name === selectedWorld) || worlds[3];
  const force = mass * world.gravity;
  const earthForce = mass * 9.81;
  const ratio = world.gravity / 9.81;

  return (
    <div style={panelStyle}>
      <ExperimentHeader
        icon="🪂"
        eyebrow="EXPERIMENTO 01"
        title="LABORATORIO DE GRAVEDAD"
        text="Tu masa no cambia al viajar. Lo que cambia es la fuerza con la que cada mundo tira de ti."
      />

      <div style={{ padding: "0 22px 24px" }}>
        <ControlBlock label={`TU MASA · ${mass} kg`}>
          <input
            aria-label="Masa en kilogramos"
            type="range"
            min="10"
            max="120"
            step="1"
            value={mass}
            onChange={(event) => setMass(Number(event.target.value))}
            style={controlStyle}
          />
        </ControlBlock>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(105px, 1fr))",
            gap: 9,
            marginTop: 18,
          }}
        >
          {worlds.map((item) => {
            const selected = item.name === selectedWorld;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setSelectedWorld(item.name)}
                style={{
                  minHeight: 82,
                  borderRadius: 16,
                  cursor: "pointer",
                  color: "white",
                  border: selected
                    ? "1px solid rgba(56,189,248,0.9)"
                    : "1px solid rgba(255,255,255,0.10)",
                  background: selected
                    ? "rgba(14,165,233,0.22)"
                    : "rgba(255,255,255,0.04)",
                  fontWeight: 800,
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 5 }}>{item.icon}</div>
                <div style={{ fontSize: 12 }}>{item.name}</div>
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginTop: 20,
          }}
        >
          <Metric title={`EN ${world.name.toUpperCase()}`} value={`${force.toFixed(0)} N`} detail="fuerza de tu peso" />
          <Metric title="COMPARADO CON LA TIERRA" value={`${Math.round(ratio * 100)}%`} detail={`en la Tierra serían ${earthForce.toFixed(0)} N`} />
        </div>

        <Discovery>
          {ratio < 0.75
            ? `En ${world.name} notarías que pesas mucho menos, aunque seguirías teniendo exactamente ${mass} kg de masa.`
            : ratio > 1.25
              ? `En ${world.name} la gravedad tira con mucha más fuerza. Moverte y saltar sería bastante más difícil.`
              : `La gravedad de ${world.name} es relativamente parecida a la terrestre, pero tu masa seguiría siendo la misma.`}
        </Discovery>
      </div>
    </div>
  );
}

function OrbitExperiment() {
  const [distance, setDistance] = useState(1);

  const orbitalSpeed = 29.78 / Math.sqrt(distance);
  const orbitalPeriod = Math.pow(distance, 1.5);
  const orbitRadius = 56 + distance * 28;
  const visualDuration = Math.max(3.5, Math.min(14, orbitalPeriod * 8));

  return (
    <div style={panelStyle}>
      <ExperimentHeader
        icon="☀️"
        eyebrow="EXPERIMENTO 02"
        title="LABORATORIO DE ÓRBITAS"
        text="Aleja o acerca el planeta al Sol. La distancia cambia tanto su velocidad orbital como la duración de su año."
      />

      <div style={{ padding: "0 22px 24px" }}>
        <ControlBlock label={`DISTANCIA AL SOL · ${distance.toFixed(2)} UA`}>
          <input
            aria-label="Distancia orbital en unidades astronómicas"
            type="range"
            min="0.4"
            max="2.5"
            step="0.05"
            value={distance}
            onChange={(event) => setDistance(Number(event.target.value))}
            style={controlStyle}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, opacity: 0.55 }}>
            <span>Más cerca</span>
            <span>Más lejos</span>
          </div>
        </ControlBlock>

        <div
          style={{
            position: "relative",
            height: 330,
            marginTop: 18,
            borderRadius: 22,
            overflow: "hidden",
            background:
              "radial-gradient(circle at center, rgba(56,189,248,0.08), rgba(2,6,23,0.88) 65%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <style>{`@keyframes labOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 60,
              height: 60,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #fff7ae, #f59e0b 46%, #b45309 100%)",
              boxShadow: "0 0 32px rgba(245,158,11,0.75)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: orbitRadius * 2,
              height: orbitRadius * 2,
              transform: "translate(-50%, -50%)",
              border: "1px solid rgba(125,211,252,0.35)",
              borderRadius: "50%",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: `calc(50% - ${orbitRadius}px)`,
              top: `calc(50% - ${orbitRadius}px)`,
              width: orbitRadius * 2,
              height: orbitRadius * 2,
              transformOrigin: "center",
              animation: `labOrbit ${visualDuration}s linear infinite`,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -9,
                width: 18,
                height: 18,
                marginLeft: -9,
                borderRadius: "50%",
                background: "linear-gradient(145deg, #60a5fa, #1d4ed8)",
                boxShadow: "0 0 14px rgba(96,165,250,0.65)",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: 14,
              bottom: 12,
              right: 14,
              textAlign: "center",
              fontSize: 11,
              opacity: 0.55,
            }}
          >
            Visualización educativa: las distancias no están a escala real.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginTop: 18,
          }}
        >
          <Metric title="VELOCIDAD ORBITAL" value={`${orbitalSpeed.toFixed(1)} km/s`} detail="aprox. para una órbita circular" />
          <Metric title="DURACIÓN DEL AÑO" value={`${orbitalPeriod.toFixed(2)} años`} detail="comparado con el año terrestre" />
        </div>

        <Discovery>
          {distance < 0.8
            ? "Al acercar el planeta al Sol, debe moverse más rápido y completa su órbita en menos tiempo: su año se hace más corto."
            : distance > 1.3
              ? "Al alejar el planeta, su velocidad orbital disminuye y necesita mucho más tiempo para completar una vuelta al Sol."
              : "Estás cerca de la órbita terrestre: 1 UA es aproximadamente la distancia media entre la Tierra y el Sol."}
        </Discovery>
      </div>
    </div>
  );
}

function DayNightExperiment() {
  const [dayHours, setDayHours] = useState(24);
  const [paused, setPaused] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (paused) return undefined;

    const interval = window.setInterval(() => {
      const step = 4 * (24 / dayHours);
      setAngle((current) => (current + step) % 360);
    }, 50);

    return () => window.clearInterval(interval);
  }, [dayHours, paused]);

  const localPhase = ((angle % 360) + 360) % 360;
  const phaseName =
    localPhase < 70 || localPhase > 290
      ? "MEDIODÍA"
      : localPhase < 110
        ? "ATARDECER"
        : localPhase < 250
          ? "NOCHE"
          : "AMANECER";

  const markerX = 50 + Math.cos((angle * Math.PI) / 180) * 36;

  return (
    <div style={panelStyle}>
      <ExperimentHeader
        icon="🌗"
        eyebrow="EXPERIMENTO 03"
        title="LABORATORIO DE DÍA Y NOCHE"
        text="Una mitad del planeta recibe luz mientras la otra queda en sombra. La rotación lleva cada lugar de una zona a la otra."
      />

      <div style={{ padding: "0 22px 24px" }}>
        <ControlBlock label={`DURACIÓN DE UNA ROTACIÓN · ${dayHours} h`}>
          <input
            aria-label="Duración del día en horas"
            type="range"
            min="6"
            max="72"
            step="1"
            value={dayHours}
            onChange={(event) => setDayHours(Number(event.target.value))}
            style={controlStyle}
          />
        </ControlBlock>

        <div
          style={{
            position: "relative",
            height: 320,
            marginTop: 18,
            borderRadius: 22,
            overflow: "hidden",
            background: "linear-gradient(90deg, rgba(251,191,36,0.08), rgba(2,6,23,0.92))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -42,
              top: "50%",
              width: 92,
              height: 92,
              transform: "translateY(-50%)",
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 40%, #fffbd1, #f59e0b 55%, #b45309)",
              boxShadow: "0 0 45px rgba(245,158,11,0.72)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 174,
              height: 174,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              overflow: "hidden",
              background:
                "linear-gradient(90deg, #38bdf8 0%, #2563eb 46%, #111827 52%, #020617 100%)",
              boxShadow: "-18px 0 34px rgba(56,189,248,0.16), 20px 0 32px rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: `${markerX}%`,
                top: "50%",
                width: 11,
                height: 11,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 0 9px white",
                transition: "left 50ms linear",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: 14,
              right: 14,
              bottom: 14,
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.8,
            }}
          >
            <span style={{ color: "#fcd34d" }}>☀ ZONA ILUMINADA</span>
            <span style={{ color: "#93c5fd" }}>ZONA NOCTURNA ☾</span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginTop: 18,
          }}
        >
          <Metric title="EN EL PUNTO BLANCO" value={phaseName} detail="cambia al rotar el planeta" />
          <Metric title="ROTACIÓN" value={`${dayHours} horas`} detail={dayHours < 24 ? "más rápida que la terrestre" : dayHours > 24 ? "más lenta que la terrestre" : "como la Tierra"} />
        </div>

        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          style={{
            marginTop: 14,
            width: "100%",
            minHeight: 48,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
            color: "white",
            cursor: "pointer",
            fontWeight: 900,
            letterSpacing: 0.8,
          }}
        >
          {paused ? "▶ REANUDAR ROTACIÓN" : "⏸ PAUSAR ROTACIÓN"}
        </button>

        <Discovery>
          Cambiar la velocidad de rotación modifica cuánto dura un día completo, pero el mecanismo es el mismo: la zona orientada hacia la estrella tiene día y la zona opuesta tiene noche.
        </Discovery>
      </div>
    </div>
  );
}

function ExperimentHeader({ icon, eyebrow, title, text }) {
  return (
    <div style={{ padding: "24px 22px 18px" }}>
      <div style={{ fontSize: 34 }}>{icon}</div>
      <div
        style={{
          marginTop: 10,
          fontSize: 11,
          letterSpacing: 2,
          fontWeight: 900,
          color: "#7dd3fc",
        }}
      >
        {eyebrow}
      </div>
      <h2 style={{ margin: "7px 0 9px", fontSize: "clamp(25px, 5vw, 38px)" }}>{title}</h2>
      <p style={{ margin: 0, maxWidth: 680, lineHeight: 1.6, opacity: 0.72 }}>{text}</p>
    </div>
  );
}

function ControlBlock({ label, children }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 17,
        background: "rgba(255,255,255,0.045)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 1, marginBottom: 11 }}>{label}</div>
      {children}
    </div>
  );
}

function Metric({ title, value, detail }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 17,
        background: "rgba(2,132,199,0.10)",
        border: "1px solid rgba(56,189,248,0.14)",
      }}
    >
      <div style={{ fontSize: 10, letterSpacing: 1.4, fontWeight: 900, opacity: 0.6 }}>{title}</div>
      <div style={{ marginTop: 5, fontSize: 25, fontWeight: 900 }}>{value}</div>
      <div style={{ marginTop: 3, fontSize: 12, opacity: 0.58 }}>{detail}</div>
    </div>
  );
}

function Discovery({ children }) {
  return (
    <div
      style={{
        marginTop: 18,
        padding: "16px 17px",
        borderRadius: 17,
        background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(74,222,128,0.16)",
        lineHeight: 1.58,
        fontSize: 14,
      }}
    >
      <strong style={{ color: "#86efac" }}>✦ DESCUBRIMIENTO</strong>
      <div style={{ marginTop: 6, opacity: 0.84 }}>{children}</div>
    </div>
  );
}
