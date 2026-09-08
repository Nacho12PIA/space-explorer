"use client";

import { useState } from "react";
import { missionQuestions } from "../data/missionQuestions";

const missions = [
  { id: 1, icon: "🚀", title: "Rescate en el Sistema Solar", subtitle: "Recupera los datos de una sonda perdida.", meta: "5 retos · banco de 100" },
  { id: 2, icon: "🪐", title: "Identifica el planeta", subtitle: "Descubre mundos desconocidos a partir de pistas.", meta: "5 mundos · pistas" },
  { id: 3, icon: "🛰️", title: "Ruta de navegación", subtitle: "Reconstruye rutas correctas por el Sistema Solar.", meta: "5 de 10 rutas · navegación" },
  { id: 4, icon: "🌡️", title: "Mundos extremos", subtitle: "Elige el mejor destino para cada misión científica.", meta: "5 de 12 escenarios · decisión" },
  { id: 5, icon: "⭐", title: "Misión estelar", subtitle: "Investiga el Sol y descubre cómo funcionan las estrellas.", meta: "6 de 15 retos · estrellas" },
  { id: 6, icon: "🏆", title: "Desafío del explorador", subtitle: "Una expedición final que combina todo lo aprendido.", meta: "5 etapas · prueba final" },
];

const identifyPlanets = [
  { answer: "Júpiter", options: ["Júpiter", "Saturno", "Neptuno"], clues: ["Soy el planeta más grande del Sistema Solar.", "Mi día dura menos de 10 horas.", "Tengo la Gran Mancha Roja."] },
  { answer: "Venus", options: ["Mercurio", "Venus", "Marte"], clues: ["Tengo un tamaño parecido al de la Tierra.", "Mi atmósfera es extremadamente densa.", "Soy el planeta más caliente."] },
  { answer: "Urano", options: ["Saturno", "Urano", "Neptuno"], clues: ["Soy un gigante helado azul verdoso.", "Mi año dura unos 84 años terrestres.", "Giro prácticamente tumbado."] },
  { answer: "Marte", options: ["Tierra", "Marte", "Mercurio"], clues: ["Mi día se parece al de la Tierra.", "Me llaman el planeta rojo.", "Tengo el volcán Olympus Mons."] },
  { answer: "Neptuno", options: ["Urano", "Neptuno", "Saturno"], clues: ["Soy un gigante helado.", "Mi año dura casi 165 años terrestres.", "Tengo vientos extraordinariamente rápidos."] },
  { answer: "Saturno", options: ["Júpiter", "Saturno", "Urano"], clues: ["Soy un gigante gaseoso.", "Mi año dura unos 29 años terrestres.", "Destaco por mis espectaculares anillos."] },
  { answer: "Mercurio", options: ["Mercurio", "Venus", "Marte"], clues: ["Soy un planeta rocoso pequeño.", "Mi año dura solo 88 días terrestres.", "Soy el planeta más cercano al Sol."] },
  { answer: "Tierra", options: ["Venus", "Tierra", "Marte"], clues: ["Mi día dura 24 horas.", "Tengo mucha agua líquida superficial.", "Soy el único mundo donde sabemos que existe vida."] },
];

const routeChallenges = [
  { prompt: "Ordena los cuatro planetas interiores desde el Sol.", items: ["Marte", "Mercurio", "Tierra", "Venus"], answer: ["Mercurio", "Venus", "Tierra", "Marte"] },
  { prompt: "Ordena los cuatro planetas exteriores desde el Sol.", items: ["Neptuno", "Saturno", "Júpiter", "Urano"], answer: ["Júpiter", "Saturno", "Urano", "Neptuno"] },
  { prompt: "La sonda parte de Venus y viaja hacia fuera. Ordena sus destinos.", items: ["Júpiter", "Tierra", "Saturno", "Marte"], answer: ["Tierra", "Marte", "Júpiter", "Saturno"] },
  { prompt: "Regresamos desde Neptuno hacia el Sol. Ordena estos mundos.", items: ["Júpiter", "Urano", "Marte", "Saturno"], answer: ["Urano", "Saturno", "Júpiter", "Marte"] },
  { prompt: "Desde Mercurio viajamos hacia el exterior. Ordena estos destinos.", items: ["Urano", "Venus", "Júpiter", "Tierra"], answer: ["Venus", "Tierra", "Júpiter", "Urano"] },
  { prompt: "Desde Saturno regresamos hacia el Sol. Ordena los planetas.", items: ["Mercurio", "Marte", "Júpiter", "Tierra"], answer: ["Júpiter", "Marte", "Tierra", "Mercurio"] },
  { prompt: "Una nave sale de la Tierra hacia Neptuno. Ordena estas escalas.", items: ["Neptuno", "Júpiter", "Urano", "Saturno"], answer: ["Júpiter", "Saturno", "Urano", "Neptuno"] },
  { prompt: "Una sonda sale de Marte hacia el Sol. Ordena estos destinos.", items: ["Mercurio", "Tierra", "Venus"], answer: ["Tierra", "Venus", "Mercurio"] },
  { prompt: "Ordena estos planetas del más cercano al Sol al más lejano.", items: ["Neptuno", "Venus", "Saturno", "Marte"], answer: ["Venus", "Marte", "Saturno", "Neptuno"] },
  { prompt: "Ordena estos planetas del más lejano al Sol al más cercano.", items: ["Mercurio", "Urano", "Tierra", "Júpiter"], answer: ["Urano", "Júpiter", "Tierra", "Mercurio"] },
];

const extremeWorlds = [
  ["Queremos estudiar los vientos más extremos. ¿Dónde enviamos la sonda?", ["Neptuno", "Marte", "Mercurio"], "Neptuno", "Neptuno presenta algunos de los vientos más rápidos del Sistema Solar."],
  ["Buscamos un efecto invernadero extremo. ¿Qué destino elegimos?", ["Venus", "Tierra", "Marte"], "Venus", "La densa atmósfera de Venus produce un efecto invernadero extremo."],
  ["Queremos estudiar Olympus Mons. ¿Dónde aterrizamos?", ["Marte", "Mercurio", "Venus"], "Marte", "Olympus Mons se encuentra en Marte."],
  ["Queremos observar un planeta que gira casi tumbado.", ["Urano", "Saturno", "Neptuno"], "Urano", "Urano tiene una inclinación axial extrema, de aproximadamente 98°."],
  ["Buscamos la Gran Mancha Roja.", ["Júpiter", "Saturno", "Neptuno"], "Júpiter", "La Gran Mancha Roja es una gigantesca tormenta de Júpiter."],
  ["Necesitamos estudiar el sistema de anillos más espectacular.", ["Saturno", "Marte", "Venus"], "Saturno", "Saturno destaca por sus extensos anillos de hielo y roca."],
  ["Queremos llegar al planeta más cercano al Sol.", ["Mercurio", "Venus", "Tierra"], "Mercurio", "Mercurio es el planeta más cercano al Sol."],
  ["La misión busca el planeta más grande.", ["Júpiter", "Saturno", "Tierra"], "Júpiter", "Júpiter es el planeta más grande del Sistema Solar."],
  ["Buscamos el mundo cuya superficie está cubierta aproximadamente en un 71% por agua.", ["Tierra", "Marte", "Venus"], "Tierra", "Aproximadamente el 71% de la superficie terrestre está cubierta por agua."],
  ["Buscamos un planeta con un día de casi 243 días terrestres.", ["Venus", "Mercurio", "Urano"], "Venus", "Venus gira muy lentamente: su día dura unos 243 días terrestres."],
  ["Queremos observar Tritón, una gran luna con órbita retrógrada.", ["Neptuno", "Urano", "Saturno"], "Neptuno", "Tritón es la mayor luna de Neptuno y orbita en sentido retrógrado."],
  ["Buscamos un planeta con dos pequeñas lunas llamadas Fobos y Deimos.", ["Marte", "Tierra", "Mercurio"], "Marte", "Fobos y Deimos son las dos pequeñas lunas de Marte."],
].map(([question, options, answer, explanation]) => ({ question, options, answer, explanation }));

const starQuestions = [
  ["¿Qué es el Sol?", ["Una estrella", "Un planeta", "Una galaxia"], "Una estrella", "El Sol es la estrella de nuestro Sistema Solar."],
  ["¿Qué proceso produce la energía del Sol?", ["Fusión nuclear", "Combustión", "Electricidad"], "Fusión nuclear", "La fusión nuclear libera energía en el núcleo solar."],
  ["¿Qué elemento se fusiona principalmente para formar helio?", ["Hidrógeno", "Oxígeno", "Hierro"], "Hidrógeno", "El hidrógeno se fusiona para formar helio."],
  ["¿Qué temperatura aproximada alcanza el núcleo del Sol?", ["15 millones °C", "5.500 °C", "150.000 °C"], "15 millones °C", "El núcleo solar alcanza unos 15 millones de grados Celsius."],
  ["¿Por qué el Sol parece mayor que las otras estrellas?", ["Está mucho más cerca", "Es la mayor del Universo", "Las otras son planetas"], "Está mucho más cerca", "El Sol es la estrella más cercana a la Tierra."],
  ["¿De qué estado de la materia están formadas principalmente las estrellas?", ["Plasma", "Hielo", "Roca"], "Plasma", "Las estrellas están formadas principalmente por plasma."],
  ["¿Dónde nacen las estrellas?", ["En nebulosas", "En planetas", "En agujeros negros"], "En nebulosas", "Las estrellas nacen en grandes nubes de gas y polvo llamadas nebulosas."],
  ["¿Qué fuerza ayuda a concentrar el gas hasta formar una estrella?", ["Gravedad", "Magnetismo terrestre", "Viento solar"], "Gravedad", "La gravedad concentra el material de una nebulosa."],
  ["En general, ¿qué indica el color de una estrella?", ["Su temperatura superficial", "Su número de planetas", "Su distancia exacta"], "Su temperatura superficial", "El color aporta información sobre la temperatura superficial de una estrella."],
  ["¿Qué estrella suele tener una superficie más caliente?", ["Una azulada", "Una rojiza", "Todas igual"], "Una azulada", "Las estrellas azuladas tienen temperaturas superficiales mayores que las rojizas."],
  ["¿Son todas las estrellas del mismo tamaño?", ["No", "Sí", "Solo cambian de color"], "No", "Existen estrellas mucho más pequeñas y mucho más grandes que el Sol."],
  ["¿En qué se convertirá finalmente una estrella parecida al Sol?", ["En una enana blanca", "En un planeta", "En una luna"], "En una enana blanca", "Tras su fase de gigante roja, una estrella como el Sol termina dejando una enana blanca."],
  ["¿Qué puede ocurrir al final de la vida de una estrella muy masiva?", ["Puede explotar como supernova", "Se convierte en una luna", "Se apaga cada noche"], "Puede explotar como supernova", "Las estrellas suficientemente masivas pueden terminar en una supernova."],
  ["¿Qué mide un año luz?", ["Distancia", "Tiempo", "Temperatura"], "Distancia", "Un año luz es la distancia que recorre la luz en un año."],
  ["¿Cuál es la estrella más cercana al Sol?", ["Próxima Centauri", "Sirio", "Betelgeuse"], "Próxima Centauri", "Próxima Centauri está a unos 4,24 años luz del Sol."],
].map(([question, options, answer, explanation]) => ({ question, options, answer, explanation }));

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function prepare(items, amount) {
  return shuffle(items).slice(0, amount).map((item) => ({ ...item, options: item.options ? shuffle(item.options) : item.options }));
}

const panel = { marginTop: 32, padding: "clamp(18px, 4vw, 28px)", borderRadius: 22, background: "rgba(15,23,42,0.84)", border: "1px solid rgba(255,255,255,0.14)" };
const pill = { border: 0, borderRadius: 999, padding: "12px 18px", cursor: "pointer", fontWeight: 900, fontSize: 13 };

function Progress({ current, total }) {
  return (
    <div style={{ margin: "16px 0 26px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 800, opacity: 0.65, marginBottom: 10 }}><span>DESAFÍO {current}</span><span>{current} / {total}</span></div>
      <div style={{ height: 7, borderRadius: 999, overflow: "hidden", background: "rgba(255,255,255,0.1)" }}><div style={{ width: `${(current / total) * 100}%`, height: "100%", background: "rgba(96,165,250,0.9)" }} /></div>
    </div>
  );
}

function Result({ score, total, onRetry, onBack, final = false }) {
  const ratio = score / total;
  return (
    <section style={{ ...panel, textAlign: "center" }}>
      <div style={{ fontSize: 50 }}>{ratio >= 0.8 ? "🏆" : ratio >= 0.6 ? "🚀" : "🛰️"}</div>
      <h2 style={{ fontSize: "clamp(26px,6vw,34px)" }}>{final && ratio >= 0.8 ? "EXPLORADOR CERTIFICADO" : "MISIÓN COMPLETADA"}</h2>
      <p style={{ fontSize: 18 }}>Resultado: <strong>{score} de {total}</strong></p>
      <p style={{ maxWidth: 540, margin: "18px auto", lineHeight: 1.6, opacity: 0.72 }}>{ratio === 1 ? "¡Excelente! Has resuelto todos los desafíos." : ratio >= 0.6 ? "Buen trabajo. La misión está superada, aunque puedes mejorar tu resultado." : "Todavía quedan datos por dominar. Vuelve a EXPLORA y prueba de nuevo."}</p>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}><button onClick={onRetry} style={pill}>REPETIR</button><button onClick={onBack} style={{ ...pill, background: "rgba(255,255,255,0.12)", color: "white" }}>← CENTRO DE MISIONES</button></div>
    </section>
  );
}

function ChoiceMission({ title, factory, onBack }) {
  const [round, setRound] = useState(() => factory());
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const q = round[current];

  function retry() { setRound(factory()); setCurrent(0); setScore(0); setSelected(null); setFinished(false); }
  function next() { if (current === round.length - 1) setFinished(true); else { setCurrent((v) => v + 1); setSelected(null); } }

  if (finished) return <Result score={score} total={round.length} onRetry={retry} onBack={onBack} />;

  return (
    <section style={panel}>
      <button onClick={onBack} style={{ ...pill, padding: 0, background: "transparent", color: "white", opacity: 0.7 }}>← VOLVER</button>
      <div style={{ marginTop: 18, fontSize: 12, letterSpacing: 2, fontWeight: 800, opacity: 0.55 }}>{title}</div>
      <Progress current={current + 1} total={round.length} />
      <h2 style={{ fontSize: "clamp(22px,5vw,30px)", lineHeight: 1.35 }}>{q.question}</h2>
      <div style={{ display: "grid", gap: 12 }}>{q.options.map((option) => { const correct = option === q.answer; const picked = option === selected; return <button key={option} disabled={selected !== null} onClick={() => { setSelected(option); if (correct) setScore((v) => v + 1); }} style={{ padding: "16px 18px", textAlign: "left", borderRadius: 14, color: "white", fontSize: 16, fontWeight: 700, background: selected !== null && correct ? "rgba(34,197,94,0.18)" : picked && !correct ? "rgba(239,68,68,0.18)" : "rgba(255,255,255,0.06)", border: selected !== null && correct ? "1px solid rgba(74,222,128,0.55)" : picked && !correct ? "1px solid rgba(248,113,113,0.55)" : "1px solid rgba(255,255,255,0.12)" }}>{option}</button>; })}</div>
      {selected !== null && <div style={{ marginTop: 22, padding: 18, borderRadius: 16, background: selected === q.answer ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)" }}><strong>{selected === q.answer ? "✓ CORRECTO" : "✕ CASI"}</strong><p style={{ lineHeight: 1.55, opacity: 0.82 }}>{selected === q.answer ? q.explanation : `La respuesta correcta es ${q.answer}. ${q.explanation}`}</p><button onClick={next} style={pill}>{current === round.length - 1 ? "VER RESULTADO →" : "SIGUIENTE →"}</button></div>}
    </section>
  );
}

function IdentifyMission({ onBack }) {
  const makeRound = () => prepare(identifyPlanets, 5);
  const [round, setRound] = useState(makeRound);
  const [current, setCurrent] = useState(0);
  const [clues, setClues] = useState(1);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = round[current];

  function retry() { setRound(makeRound()); setCurrent(0); setClues(1); setSelected(null); setScore(0); setFinished(false); }
  function next() { if (current === round.length - 1) setFinished(true); else { setCurrent((v) => v + 1); setClues(1); setSelected(null); } }
  if (finished) return <Result score={score} total={round.length} onRetry={retry} onBack={onBack} />;

  return <section style={panel}><button onClick={onBack} style={{ ...pill, padding: 0, background: "transparent", color: "white", opacity: 0.7 }}>← VOLVER</button><div style={{ marginTop: 18, fontSize: 12, letterSpacing: 2, fontWeight: 800, opacity: 0.55 }}>MISIÓN 02 · PLANETA DESCONOCIDO</div><Progress current={current + 1} total={round.length} /><h2>¿Qué planeta soy?</h2><div style={{ display: "grid", gap: 10, marginBottom: 18 }}>{q.clues.slice(0, clues).map((clue, i) => <div key={clue} style={{ padding: 14, borderRadius: 14, background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.22)" }}><strong>PISTA {i + 1}:</strong> {clue}</div>)}</div>{clues < q.clues.length && selected === null && <button onClick={() => setClues((v) => v + 1)} style={{ ...pill, marginBottom: 18 }}>REVELAR OTRA PISTA</button>}<div style={{ display: "grid", gap: 12 }}>{q.options.map((option) => <button key={option} disabled={selected !== null} onClick={() => { setSelected(option); if (option === q.answer) setScore((v) => v + 1); }} style={{ padding: "16px 18px", textAlign: "left", borderRadius: 14, color: "white", fontSize: 16, fontWeight: 700, background: selected !== null && option === q.answer ? "rgba(34,197,94,0.18)" : selected === option ? "rgba(239,68,68,0.18)" : "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>{option}</button>)}</div>{selected !== null && <button onClick={next} style={{ ...pill, marginTop: 20 }}>{current === round.length - 1 ? "VER RESULTADO →" : "SIGUIENTE MUNDO →"}</button>}</section>;
}

function RouteMission({ onBack }) {
  const makeRound = () => shuffle(routeChallenges).slice(0, 5);
  const [round, setRound] = useState(makeRound);
  const [current, setCurrent] = useState(0);
  const [picked, setPicked] = useState([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = round[current];
  const available = q.items.filter((item) => !picked.includes(item));
  const correct = picked.join("|") === q.answer.join("|");

  function retry() { setRound(makeRound()); setCurrent(0); setPicked([]); setChecked(false); setScore(0); setFinished(false); }
  function check() { if (picked.length !== q.answer.length) return; setChecked(true); if (correct) setScore((v) => v + 1); }
  function next() { if (current === round.length - 1) setFinished(true); else { setCurrent((v) => v + 1); setPicked([]); setChecked(false); } }
  if (finished) return <Result score={score} total={round.length} onRetry={retry} onBack={onBack} />;

  return <section style={panel}><button onClick={onBack} style={{ ...pill, padding: 0, background: "transparent", color: "white", opacity: 0.7 }}>← VOLVER</button><div style={{ marginTop: 18, fontSize: 12, letterSpacing: 2, fontWeight: 800, opacity: 0.55 }}>MISIÓN 03 · RUTA DE NAVEGACIÓN</div><Progress current={current + 1} total={round.length} /><h2 style={{ lineHeight: 1.35 }}>{q.prompt}</h2><p style={{ opacity: 0.65 }}>Pulsa los planetas uno a uno para construir la ruta.</p><div style={{ minHeight: 64, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", margin: "20px 0", padding: 14, borderRadius: 16, background: "rgba(96,165,250,0.08)", border: "1px dashed rgba(96,165,250,0.35)" }}>{picked.length ? picked.map((item, i) => <span key={item} style={{ fontWeight: 800 }}>{i > 0 ? "→ " : ""}{item}</span>) : <span style={{ opacity: 0.45 }}>Tu ruta aparecerá aquí…</span>}</div>{!checked && <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>{available.map((item) => <button key={item} onClick={() => setPicked((v) => [...v, item])} style={{ ...pill, background: "rgba(255,255,255,0.1)", color: "white" }}>{item}</button>)}</div>}{!checked && picked.length > 0 && <button onClick={() => setPicked((v) => v.slice(0, -1))} style={{ ...pill, marginTop: 16, background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.16)" }}>↶ DESHACER</button>}{!checked && picked.length === q.answer.length && <button onClick={check} style={{ ...pill, display: "block", marginTop: 18 }}>COMPROBAR RUTA</button>}{checked && <div style={{ marginTop: 20, padding: 18, borderRadius: 16, background: correct ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)" }}><strong>{correct ? "✓ RUTA CORRECTA" : "✕ RUTA INCORRECTA"}</strong>{!correct && <p>Ruta correcta: {q.answer.join(" → ")}</p>}<button onClick={next} style={pill}>{current === round.length - 1 ? "VER RESULTADO →" : "SIGUIENTE RUTA →"}</button></div>}</section>;
}

function FinalMission({ onBack }) {
  const build = () => {
    const planet = prepare(identifyPlanets, 1)[0];
    const extreme = prepare(extremeWorlds, 1)[0];
    const star = prepare(starQuestions, 1)[0];
    const general = prepare(missionQuestions, 2);
    return [
      { question: `PLANETA DESCONOCIDO: ${planet.clues.join(" ")} ¿Qué planeta es?`, options: planet.options, answer: planet.answer, explanation: `El planeta era ${planet.answer}.` },
      extreme,
      star,
      ...general,
    ];
  };
  return <ChoiceMission title="MISIÓN 06 · DESAFÍO DEL EXPLORADOR" factory={build} onBack={onBack} />;
}

function MissionCenter({ onSelect }) {
  return <div style={{ marginTop: 34 }}><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>{missions.map((mission) => <button key={mission.id} onClick={() => onSelect(mission.id)} style={{ minHeight: 210, padding: 22, textAlign: "left", color: "white", cursor: "pointer", borderRadius: 20, border: "1px solid rgba(255,255,255,0.14)", background: "linear-gradient(145deg, rgba(37,99,235,0.16), rgba(15,23,42,0.84))" }}><div style={{ fontSize: 34 }}>{mission.icon}</div><div style={{ marginTop: 14, fontSize: 11, letterSpacing: 1.5, fontWeight: 800, opacity: 0.5 }}>MISIÓN {String(mission.id).padStart(2, "0")}</div><h2 style={{ margin: "6px 0 8px", fontSize: 21 }}>{mission.title}</h2><p style={{ margin: 0, lineHeight: 1.5, opacity: 0.7 }}>{mission.subtitle}</p><div style={{ marginTop: 18, fontSize: 12, fontWeight: 800, opacity: 0.5 }}>{mission.meta}</div></button>)}</div></div>;
}

export default function MissionPlayer() {
  const [active, setActive] = useState(null);
  const back = () => setActive(null);
  if (active === 1) return <ChoiceMission title="MISIÓN 01 · RESCATE EN EL SISTEMA SOLAR" factory={() => prepare(missionQuestions, 5)} onBack={back} />;
  if (active === 2) return <IdentifyMission onBack={back} />;
  if (active === 3) return <RouteMission onBack={back} />;
  if (active === 4) return <ChoiceMission title="MISIÓN 04 · MUNDOS EXTREMOS" factory={() => prepare(extremeWorlds, 5)} onBack={back} />;
  if (active === 5) return <ChoiceMission title="MISIÓN 05 · MISIÓN ESTELAR" factory={() => prepare(starQuestions, 6)} onBack={back} />;
  if (active === 6) return <FinalMission onBack={back} />;
  return <MissionCenter onSelect={setActive} />;
}
