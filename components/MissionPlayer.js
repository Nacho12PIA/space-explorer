"use client";

import { useState } from "react";
import { missionQuestions } from "../data/missionQuestions";

const missions = [
  {
    id: 1,
    icon: "🚀",
    title: "Rescate en el Sistema Solar",
    subtitle: "Recupera los datos de una sonda perdida.",
    meta: "5 retos · aleatorios",
  },
  {
    id: 2,
    icon: "🪐",
    title: "Identifica el planeta",
    subtitle: "Descubre mundos desconocidos a partir de pistas.",
    meta: "5 mundos · pistas",
  },
  {
    id: 3,
    icon: "🛰️",
    title: "Ruta de navegación",
    subtitle: "Reconstruye rutas correctas por el Sistema Solar.",
    meta: "4 rutas · orden",
  },
  {
    id: 4,
    icon: "🌡️",
    title: "Mundos extremos",
    subtitle: "Elige el mejor destino para cada misión científica.",
    meta: "5 escenarios · decisión",
  },
  {
    id: 5,
    icon: "☀️",
    title: "Alerta solar",
    subtitle: "Reactiva los sistemas resolviendo señales sobre el Sol.",
    meta: "5 señales · estrella",
  },
  {
    id: 6,
    icon: "🏆",
    title: "Desafío del explorador",
    subtitle: "La prueba final para demostrar todo lo aprendido.",
    meta: "8 retos · nivel final",
  },
];

const identifyPlanets = [
  {
    answer: "Júpiter",
    options: ["Júpiter", "Saturno", "Neptuno"],
    clues: [
      "Soy el planeta más grande del Sistema Solar.",
      "Mi día dura menos de 10 horas.",
      "Tengo una gigantesca tormenta llamada Gran Mancha Roja.",
    ],
  },
  {
    answer: "Venus",
    options: ["Mercurio", "Venus", "Marte"],
    clues: [
      "Tengo un tamaño parecido al de la Tierra.",
      "Mi atmósfera es extremadamente densa.",
      "Soy el planeta más caliente del Sistema Solar.",
    ],
  },
  {
    answer: "Urano",
    options: ["Saturno", "Urano", "Neptuno"],
    clues: [
      "Soy un gigante helado de color azul verdoso.",
      "Mi año dura unos 84 años terrestres.",
      "Giro prácticamente tumbado sobre uno de mis lados.",
    ],
  },
  {
    answer: "Marte",
    options: ["Tierra", "Marte", "Mercurio"],
    clues: [
      "Mi día se parece mucho al de la Tierra.",
      "Me llaman el planeta rojo.",
      "En mi superficie se encuentra Olympus Mons.",
    ],
  },
  {
    answer: "Neptuno",
    options: ["Urano", "Neptuno", "Saturno"],
    clues: [
      "Soy un gigante helado.",
      "Tardo casi 165 años terrestres en orbitar el Sol.",
      "En mi atmósfera soplan algunos de los vientos más rápidos del Sistema Solar.",
    ],
  },
  {
    answer: "Saturno",
    options: ["Júpiter", "Saturno", "Urano"],
    clues: [
      "Soy un gigante gaseoso.",
      "Mi año dura unos 29 años terrestres.",
      "Estoy rodeado por un espectacular sistema de anillos de hielo y roca.",
    ],
  },
];

const routeChallenges = [
  {
    prompt: "Ordena los cuatro planetas interiores desde el Sol.",
    items: ["Marte", "Mercurio", "Tierra", "Venus"],
    answer: ["Mercurio", "Venus", "Tierra", "Marte"],
  },
  {
    prompt: "Ordena los cuatro planetas exteriores desde el Sol.",
    items: ["Neptuno", "Saturno", "Júpiter", "Urano"],
    answer: ["Júpiter", "Saturno", "Urano", "Neptuno"],
  },
  {
    prompt: "La sonda parte de Venus y viaja hacia fuera. Ordena los siguientes destinos.",
    items: ["Júpiter", "Tierra", "Saturno", "Marte"],
    answer: ["Tierra", "Marte", "Júpiter", "Saturno"],
  },
  {
    prompt: "Una nave regresa desde Neptuno hacia el Sol. Ordena estos planetas en su ruta.",
    items: ["Júpiter", "Urano", "Marte", "Saturno"],
    answer: ["Urano", "Saturno", "Júpiter", "Marte"],
  },
];

const extremeWorlds = [
  {
    question: "Necesitamos estudiar los vientos más extremos. ¿Dónde enviamos la sonda?",
    options: ["Neptuno", "Marte", "Mercurio"],
    answer: "Neptuno",
    explanation: "Neptuno presenta algunos de los vientos más rápidos del Sistema Solar.",
  },
  {
    question: "Queremos investigar un efecto invernadero extremo. ¿Qué destino elegimos?",
    options: ["Venus", "Tierra", "Marte"],
    answer: "Venus",
    explanation: "La densa atmósfera de Venus produce un efecto invernadero extremo.",
  },
  {
    question: "Buscamos un mundo con una gravedad cercana al 38% de la terrestre y Olympus Mons.",
    options: ["Marte", "Mercurio", "Venus"],
    answer: "Marte",
    explanation: "Marte tiene aproximadamente el 38% de la gravedad terrestre y alberga Olympus Mons.",
  },
  {
    question: "Queremos observar un planeta que gira casi tumbado. ¿Cuál es el objetivo?",
    options: ["Urano", "Saturno", "Neptuno"],
    answer: "Urano",
    explanation: "Urano tiene una inclinación axial extrema de aproximadamente 98°.",
  },
  {
    question: "La misión quiere estudiar una tormenta gigantesca y un planeta de enorme tamaño.",
    options: ["Júpiter", "Saturno", "Neptuno"],
    answer: "Júpiter",
    explanation: "Júpiter es el planeta más grande y contiene la Gran Mancha Roja.",
  },
];

const solarAlerts = [
  {
    question: "¿Qué tipo de astro está alimentando nuestra misión?",
    options: ["Una estrella", "Un planeta", "Una luna"],
    answer: "Una estrella",
    explanation: "El Sol es una estrella.",
  },
  {
    question: "El ordenador pregunta qué proceso produce la energía del Sol.",
    options: ["Fusión nuclear", "Combustión", "Electricidad"],
    answer: "Fusión nuclear",
    explanation: "En el núcleo del Sol, la fusión nuclear libera enormes cantidades de energía.",
  },
  {
    question: "¿Qué elemento se fusiona principalmente para formar helio?",
    options: ["Hidrógeno", "Oxígeno", "Hierro"],
    answer: "Hidrógeno",
    explanation: "El hidrógeno se fusiona en el núcleo solar para formar helio.",
  },
  {
    question: "¿Qué temperatura aproximada alcanza el núcleo solar?",
    options: ["15 millones °C", "5.500 °C", "150.000 °C"],
    answer: "15 millones °C",
    explanation: "El núcleo del Sol alcanza aproximadamente 15 millones de grados Celsius.",
  },
  {
    question: "¿Por qué el Sol parece mucho mayor que las otras estrellas del cielo?",
    options: ["Porque está mucho más cerca", "Porque es la mayor estrella del Universo", "Porque las otras son planetas"],
    answer: "Porque está mucho más cerca",
    explanation: "El Sol es la estrella más cercana a la Tierra.",
  },
];

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function prepareQuestions(items, amount) {
  return shuffle(items)
    .slice(0, amount)
    .map((item) => ({ ...item, options: shuffle(item.options) }));
}

const panelStyle = {
  marginTop: 32,
  padding: "clamp(18px, 4vw, 28px)",
  borderRadius: 22,
  background: "rgba(15,23,42,0.84)",
  border: "1px solid rgba(255,255,255,0.14)",
};

const buttonStyle = {
  border: 0,
  borderRadius: 999,
  padding: "12px 18px",
  cursor: "pointer",
  fontWeight: 900,
  fontSize: 13,
};

function Progress({ current, total }) {
  const progress = (current / total) * 100;
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10, fontSize: 12, fontWeight: 800, opacity: 0.65 }}>
        <span>DESAFÍO {Math.min(current, total)}</span>
        <span>{Math.min(current, total)} / {total}</span>
      </div>
      <div style={{ width: "100%", height: 7, borderRadius: 999, overflow: "hidden", background: "rgba(255,255,255,0.10)" }}>
        <div style={{ width: `${progress}%`, height: "100%", background: "rgba(96,165,250,0.9)", transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}

function MissionResult({ score, total, onRetry, onBack, final = false }) {
  const ratio = score / total;
  return (
    <section style={{ ...panelStyle, textAlign: "center" }}>
      <div style={{ fontSize: 50 }}>{ratio >= 0.8 ? "🏆" : ratio >= 0.6 ? "🚀" : "🛰️"}</div>
      <h2 style={{ fontSize: "clamp(26px, 6vw, 34px)", marginBottom: 8 }}>
        {final && ratio >= 0.75 ? "EXPLORADOR CERTIFICADO" : "MISIÓN COMPLETADA"}
      </h2>
      <p style={{ fontSize: 18, opacity: 0.8 }}>
        Resultado: <strong>{score} de {total}</strong>
      </p>
      <p style={{ maxWidth: 540, margin: "18px auto 0", lineHeight: 1.6, opacity: 0.72 }}>
        {ratio === 1
          ? "¡Excelente! Has resuelto todos los desafíos de la misión."
          : ratio >= 0.6
            ? "Buen trabajo. La misión está superada, aunque todavía puedes mejorar tu resultado."
            : "Todavía quedan datos por dominar. Vuelve a EXPLORA cuando quieras y repite la misión."}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 26 }}>
        <button onClick={onRetry} style={buttonStyle}>REPETIR</button>
        <button onClick={onBack} style={{ ...buttonStyle, background: "rgba(255,255,255,0.12)", color: "white" }}>← CENTRO DE MISIONES</button>
      </div>
    </section>
  );
}

function ChoiceMission({ title, questions, onBack, final = false }) {
  const [round, setRound] = useState(() => questions());
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const question = round[current];

  function answer(option) {
    if (selected !== null) return;
    setSelected(option);
    if (option === question.answer) setScore((value) => value + 1);
  }

  function next() {
    if (current === round.length - 1) {
      setFinished(true);
      return;
    }
    setCurrent((value) => value + 1);
    setSelected(null);
  }

  function retry() {
    setRound(questions());
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    return <MissionResult score={score} total={round.length} onRetry={retry} onBack={onBack} final={final} />;
  }

  return (
    <section style={panelStyle}>
      <button onClick={onBack} style={{ ...buttonStyle, padding: 0, background: "transparent", color: "white", opacity: 0.7, marginBottom: 20 }}>← VOLVER</button>
      <div style={{ fontSize: 12, letterSpacing: 2, fontWeight: 800, opacity: 0.55 }}>{title}</div>
      <Progress current={current + 1} total={round.length} />
      <h2 style={{ fontSize: "clamp(22px, 5vw, 30px)", lineHeight: 1.35, marginBottom: 22 }}>{question.question}</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {question.options.map((option) => {
          const correct = option === question.answer;
          const picked = option === selected;
          let background = "rgba(255,255,255,0.06)";
          let border = "1px solid rgba(255,255,255,0.12)";
          if (selected !== null && correct) {
            background = "rgba(34,197,94,0.18)";
            border = "1px solid rgba(74,222,128,0.55)";
          }
          if (selected !== null && picked && !correct) {
            background = "rgba(239,68,68,0.18)";
            border = "1px solid rgba(248,113,113,0.55)";
          }
          return (
            <button key={option} onClick={() => answer(option)} disabled={selected !== null} style={{ width: "100%", padding: "16px 18px", textAlign: "left", borderRadius: 14, border, background, color: "white", cursor: selected === null ? "pointer" : "default", fontSize: 16, fontWeight: 700 }}>
              {option}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ marginTop: 22, padding: 18, borderRadius: 16, background: selected === question.answer ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)" }}>
          <strong>{selected === question.answer ? "✓ CORRECTO" : "✕ CASI"}</strong>
          <p style={{ margin: "8px 0 0", lineHeight: 1.55, opacity: 0.82 }}>
            {selected === question.answer ? question.explanation : `La respuesta correcta es ${question.answer}. ${question.explanation}`}
          </p>
          <button onClick={next} style={{ ...buttonStyle, marginTop: 16 }}>
            {current === round.length - 1 ? "VER RESULTADO →" : "SIGUIENTE →"}
          </button>
        </div>
      )}
    </section>
  );
}

function IdentifyMission({ onBack }) {
  const [round, setRound] = useState(() => shuffle(identifyPlanets).slice(0, 5).map((item) => ({ ...item, options: shuffle(item.options) })));
  const [current, setCurrent] = useState(0);
  const [clueCount, setClueCount] = useState(1);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const item = round[current];

  function answer(option) {
    if (selected !== null) return;
    setSelected(option);
    if (option === item.answer) setScore((value) => value + 1);
  }

  function next() {
    if (current === round.length - 1) return setFinished(true);
    setCurrent((value) => value + 1);
    setClueCount(1);
    setSelected(null);
  }

  function retry() {
    setRound(shuffle(identifyPlanets).slice(0, 5).map((entry) => ({ ...entry, options: shuffle(entry.options) })));
    setCurrent(0);
    setClueCount(1);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) return <MissionResult score={score} total={round.length} onRetry={retry} onBack={onBack} />;

  return (
    <section style={panelStyle}>
      <button onClick={onBack} style={{ ...buttonStyle, padding: 0, background: "transparent", color: "white", opacity: 0.7, marginBottom: 20 }}>← VOLVER</button>
      <div style={{ fontSize: 12, letterSpacing: 2, fontWeight: 800, opacity: 0.55 }}>MISIÓN 02 · PLANETA DESCONOCIDO</div>
      <Progress current={current + 1} total={round.length} />
      <h2 style={{ fontSize: "clamp(24px, 5vw, 32px)", marginBottom: 18 }}>¿Qué planeta soy?</h2>
      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        {item.clues.slice(0, clueCount).map((clue, index) => (
          <div key={clue} style={{ padding: 14, borderRadius: 14, background: "rgba(96,165,250,0.10)", border: "1px solid rgba(96,165,250,0.22)", lineHeight: 1.5 }}>
            <strong>PISTA {index + 1}:</strong> {clue}
          </div>
        ))}
      </div>
      {clueCount < item.clues.length && selected === null && (
        <button onClick={() => setClueCount((value) => value + 1)} style={{ ...buttonStyle, marginBottom: 20, background: "rgba(255,255,255,0.12)", color: "white" }}>REVELAR OTRA PISTA</button>
      )}
      <div style={{ display: "grid", gap: 12 }}>
        {item.options.map((option) => (
          <button key={option} onClick={() => answer(option)} disabled={selected !== null} style={{ width: "100%", padding: "16px 18px", textAlign: "left", borderRadius: 14, color: "white", fontSize: 16, fontWeight: 700, cursor: selected === null ? "pointer" : "default", background: selected !== null && option === item.answer ? "rgba(34,197,94,0.18)" : selected === option && option !== item.answer ? "rgba(239,68,68,0.18)" : "rgba(255,255,255,0.06)", border: selected !== null && option === item.answer ? "1px solid rgba(74,222,128,0.55)" : selected === option && option !== item.answer ? "1px solid rgba(248,113,113,0.55)" : "1px solid rgba(255,255,255,0.12)" }}>
            {option}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div style={{ marginTop: 22, padding: 18, borderRadius: 16, background: selected === item.answer ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)" }}>
          <strong>{selected === item.answer ? "✓ PLANETA IDENTIFICADO" : `✕ ERA ${item.answer.toUpperCase()}`}</strong>
          <button onClick={next} style={{ ...buttonStyle, display: "block", marginTop: 16 }}>{current === round.length - 1 ? "VER RESULTADO →" : "SIGUIENTE MUNDO →"}</button>
        </div>
      )}
    </section>
  );
}

function RouteMission({ onBack }) {
  const [current, setCurrent] = useState(0);
  const [picked, setPicked] = useState([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const challenge = routeChallenges[current];
  const available = challenge.items.filter((item) => !picked.includes(item));
  const correct = picked.join("|") === challenge.answer.join("|");

  function check() {
    if (picked.length !== challenge.answer.length) return;
    setChecked(true);
    if (correct) setScore((value) => value + 1);
  }

  function next() {
    if (current === routeChallenges.length - 1) return setFinished(true);
    setCurrent((value) => value + 1);
    setPicked([]);
    setChecked(false);
  }

  function retry() {
    setCurrent(0);
    setPicked([]);
    setChecked(false);
    setScore(0);
    setFinished(false);
  }

  if (finished) return <MissionResult score={score} total={routeChallenges.length} onRetry={retry} onBack={onBack} />;

  return (
    <section style={panelStyle}>
      <button onClick={onBack} style={{ ...buttonStyle, padding: 0, background: "transparent", color: "white", opacity: 0.7, marginBottom: 20 }}>← VOLVER</button>
      <div style={{ fontSize: 12, letterSpacing: 2, fontWeight: 800, opacity: 0.55 }}>MISIÓN 03 · RUTA DE NAVEGACIÓN</div>
      <Progress current={current + 1} total={routeChallenges.length} />
      <h2 style={{ fontSize: "clamp(22px, 5vw, 30px)", lineHeight: 1.35 }}>{challenge.prompt}</h2>
      <p style={{ opacity: 0.65, lineHeight: 1.5 }}>Pulsa los planetas uno a uno para construir la ruta.</p>
      <div style={{ minHeight: 64, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", margin: "20px 0", padding: 14, borderRadius: 16, background: "rgba(96,165,250,0.08)", border: "1px dashed rgba(96,165,250,0.35)" }}>
        {picked.length === 0 ? <span style={{ opacity: 0.45 }}>Tu ruta aparecerá aquí…</span> : picked.map((item, index) => <span key={item} style={{ fontWeight: 800 }}>{index > 0 ? "→ " : ""}{item}</span>)}
      </div>
      {!checked && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {available.map((item) => <button key={item} onClick={() => setPicked((value) => [...value, item])} style={{ ...buttonStyle, background: "rgba(255,255,255,0.10)", color: "white" }}>{item}</button>)}
        </div>
      )}
      {!checked && picked.length > 0 && <button onClick={() => setPicked((value) => value.slice(0, -1))} style={{ ...buttonStyle, marginTop: 16, background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.16)" }}>↶ DESHACER</button>}
      {!checked && picked.length === challenge.answer.length && <button onClick={check} style={{ ...buttonStyle, display: "block", marginTop: 18 }}>COMPROBAR RUTA</button>}
      {checked && (
        <div style={{ marginTop: 22, padding: 18, borderRadius: 16, background: correct ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)" }}>
          <strong>{correct ? "✓ RUTA CORRECTA" : "✕ RUTA INCORRECTA"}</strong>
          {!correct && <p style={{ lineHeight: 1.5, opacity: 0.82 }}>Ruta correcta: {challenge.answer.join(" → ")}</p>}
          <button onClick={next} style={{ ...buttonStyle, marginTop: 12 }}>{current === routeChallenges.length - 1 ? "VER RESULTADO →" : "SIGUIENTE RUTA →"}</button>
        </div>
      )}
    </section>
  );
}

function MissionCenter({ onSelect }) {
  return (
    <div style={{ marginTop: 34 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {missions.map((mission) => (
          <button key={mission.id} onClick={() => onSelect(mission.id)} style={{ minHeight: 210, padding: 22, textAlign: "left", color: "white", cursor: "pointer", borderRadius: 20, border: "1px solid rgba(255,255,255,0.14)", background: "linear-gradient(145deg, rgba(37,99,235,0.16), rgba(15,23,42,0.84))" }}>
            <div style={{ fontSize: 34 }}>{mission.icon}</div>
            <div style={{ marginTop: 14, fontSize: 11, letterSpacing: 1.5, fontWeight: 800, opacity: 0.5 }}>MISIÓN {String(mission.id).padStart(2, "0")}</div>
            <h2 style={{ margin: "6px 0 8px", fontSize: 21 }}>{mission.title}</h2>
            <p style={{ margin: 0, lineHeight: 1.5, opacity: 0.7 }}>{mission.subtitle}</p>
            <div style={{ marginTop: 18, fontSize: 12, fontWeight: 800, opacity: 0.5 }}>{mission.meta}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MissionPlayer() {
  const [activeMission, setActiveMission] = useState(null);
  const back = () => setActiveMission(null);

  if (activeMission === 1) {
    return <ChoiceMission title="MISIÓN 01 · RESCATE EN EL SISTEMA SOLAR" questions={() => prepareQuestions(missionQuestions, 5)} onBack={back} />;
  }
  if (activeMission === 2) return <IdentifyMission onBack={back} />;
  if (activeMission === 3) return <RouteMission onBack={back} />;
  if (activeMission === 4) {
    return <ChoiceMission title="MISIÓN 04 · MUNDOS EXTREMOS" questions={() => prepareQuestions(extremeWorlds, 5)} onBack={back} />;
  }
  if (activeMission === 5) {
    return <ChoiceMission title="MISIÓN 05 · ALERTA SOLAR" questions={() => prepareQuestions(solarAlerts, 5)} onBack={back} />;
  }
  if (activeMission === 6) {
    return <ChoiceMission title="MISIÓN 06 · DESAFÍO DEL EXPLORADOR" questions={() => prepareQuestions(missionQuestions.filter((item) => item.id > 40), 8)} onBack={back} final />;
  }

  return <MissionCenter onSelect={setActiveMission} />;
}
