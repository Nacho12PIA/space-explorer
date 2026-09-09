"use client";

import { useState } from "react";
import { missionQuestions } from "../data/missionQuestions";
import { missions, identifyPlanets, routeChallenges, extremeWorlds, starQuestions } from "../data/missionContent";
import { translateMissionText } from "../data/missionTranslator";
import { useLanguage } from "../i18n/LanguageContext";

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

function useMissionText() {
  const { language } = useLanguage();
  return { language, m: (value) => translateMissionText(value, language) };
}

function Progress({ current, total }) {
  const { m } = useMissionText();
  return (
    <div style={{ margin: "16px 0 26px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 800, opacity: 0.65, marginBottom: 10 }}><span>{m("DESAFÍO")} {current}</span><span>{current} / {total}</span></div>
      <div style={{ height: 7, borderRadius: 999, overflow: "hidden", background: "rgba(255,255,255,0.1)" }}><div style={{ width: `${(current / total) * 100}%`, height: "100%", background: "rgba(96,165,250,0.9)" }} /></div>
    </div>
  );
}

function Result({ score, total, onRetry, onBack, final = false }) {
  const { m } = useMissionText();
  const ratio = score / total;
  return (
    <section style={{ ...panel, textAlign: "center" }}>
      <div style={{ fontSize: 50 }}>{ratio >= 0.8 ? "🏆" : ratio >= 0.6 ? "🚀" : "🛰️"}</div>
      <h2 style={{ fontSize: "clamp(26px,6vw,34px)" }}>{m(final && ratio >= 0.8 ? "EXPLORADOR CERTIFICADO" : "MISIÓN COMPLETADA")}</h2>
      <p style={{ fontSize: 18 }}>{m("Resultado")}: <strong>{score} {m("de")} {total}</strong></p>
      <p style={{ maxWidth: 540, margin: "18px auto", lineHeight: 1.6, opacity: 0.72 }}>{m(ratio === 1 ? "¡Excelente! Has resuelto todos los desafíos." : ratio >= 0.6 ? "Buen trabajo. La misión está superada, aunque puedes mejorar tu resultado." : "Todavía quedan datos por dominar. Vuelve a EXPLORA y prueba de nuevo.")}</p>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}><button onClick={onRetry} style={pill}>{m("REPETIR")}</button><button onClick={onBack} style={{ ...pill, background: "rgba(255,255,255,0.12)", color: "white" }}>← {m("CENTRO DE MISIONES")}</button></div>
    </section>
  );
}

function ChoiceMission({ title, factory, onBack, final = false }) {
  const { m, language } = useMissionText();
  const [round, setRound] = useState(() => factory());
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const q = round[current];

  function retry() { setRound(factory()); setCurrent(0); setScore(0); setSelected(null); setFinished(false); }
  function next() { if (current === round.length - 1) setFinished(true); else { setCurrent((v) => v + 1); setSelected(null); } }
  if (finished) return <Result score={score} total={round.length} onRetry={retry} onBack={onBack} final={final} />;

  const feedback = selected === null
    ? null
    : selected === q.answer
      ? m(q.explanation)
      : `${language === "en" ? "The correct answer is" : "La respuesta correcta es"} ${m(q.answer)}. ${m(q.explanation)}`;

  return (
    <section style={panel}>
      <button onClick={onBack} style={{ ...pill, padding: 0, background: "transparent", color: "white", opacity: 0.7 }}>← {m("VOLVER")}</button>
      <div style={{ marginTop: 18, fontSize: 12, letterSpacing: 2, fontWeight: 800, opacity: 0.55 }}>{m(title)}</div>
      <Progress current={current + 1} total={round.length} />
      <h2 style={{ fontSize: "clamp(22px,5vw,30px)", lineHeight: 1.35 }}>{m(q.question)}</h2>
      <div style={{ display: "grid", gap: 12 }}>{q.options.map((option) => { const correct = option === q.answer; const picked = option === selected; return <button key={option} disabled={selected !== null} onClick={() => { setSelected(option); if (correct) setScore((v) => v + 1); }} style={{ padding: "16px 18px", textAlign: "left", borderRadius: 14, color: "white", fontSize: 16, fontWeight: 700, background: selected !== null && correct ? "rgba(34,197,94,0.18)" : picked && !correct ? "rgba(239,68,68,0.18)" : "rgba(255,255,255,0.06)", border: selected !== null && correct ? "1px solid rgba(74,222,128,0.55)" : picked && !correct ? "1px solid rgba(248,113,113,0.55)" : "1px solid rgba(255,255,255,0.12)" }}>{m(option)}</button>; })}</div>
      {selected !== null && <div style={{ marginTop: 22, padding: 18, borderRadius: 16, background: selected === q.answer ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)" }}><strong>{selected === q.answer ? `✓ ${m("CORRECTO")}` : `✕ ${m("CASI")}`}</strong><p style={{ lineHeight: 1.55, opacity: 0.82 }}>{feedback}</p><button onClick={next} style={pill}>{current === round.length - 1 ? `${m("VER RESULTADO")} →` : `${m("SIGUIENTE")} →`}</button></div>}
    </section>
  );
}

function IdentifyMission({ onBack }) {
  const { m } = useMissionText();
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
  return <section style={panel}><button onClick={onBack} style={{ ...pill, padding: 0, background: "transparent", color: "white", opacity: 0.7 }}>← {m("VOLVER")}</button><div style={{ marginTop: 18, fontSize: 12, letterSpacing: 2, fontWeight: 800, opacity: 0.55 }}>{m("MISIÓN 02 · PLANETA DESCONOCIDO")}</div><Progress current={current + 1} total={round.length} /><h2>{m("¿Qué planeta soy?")}</h2><div style={{ display: "grid", gap: 10, marginBottom: 18 }}>{q.clues.slice(0, clues).map((clue, i) => <div key={clue} style={{ padding: 14, borderRadius: 14, background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.22)" }}><strong>{m("PISTA")} {i + 1}:</strong> {m(clue)}</div>)}</div>{clues < q.clues.length && selected === null && <button onClick={() => setClues((v) => v + 1)} style={{ ...pill, marginBottom: 18 }}>{m("REVELAR OTRA PISTA")}</button>}<div style={{ display: "grid", gap: 12 }}>{q.options.map((option) => <button key={option} disabled={selected !== null} onClick={() => { setSelected(option); if (option === q.answer) setScore((v) => v + 1); }} style={{ padding: "16px 18px", textAlign: "left", borderRadius: 14, color: "white", fontSize: 16, fontWeight: 700, background: selected !== null && option === q.answer ? "rgba(34,197,94,0.18)" : selected === option ? "rgba(239,68,68,0.18)" : "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>{m(option)}</button>)}</div>{selected !== null && <button onClick={next} style={{ ...pill, marginTop: 20 }}>{current === round.length - 1 ? `${m("VER RESULTADO")} →` : `${m("SIGUIENTE MUNDO")} →`}</button>}</section>;
}

function RouteMission({ onBack }) {
  const { m } = useMissionText();
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
  return <section style={panel}><button onClick={onBack} style={{ ...pill, padding: 0, background: "transparent", color: "white", opacity: 0.7 }}>← {m("VOLVER")}</button><div style={{ marginTop: 18, fontSize: 12, letterSpacing: 2, fontWeight: 800, opacity: 0.55 }}>{m("MISIÓN 03 · RUTA DE NAVEGACIÓN")}</div><Progress current={current + 1} total={round.length} /><h2 style={{ lineHeight: 1.35 }}>{m(q.prompt)}</h2><p style={{ opacity: 0.65 }}>{m("Pulsa los planetas uno a uno para construir la ruta.")}</p><div style={{ minHeight: 64, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", margin: "20px 0", padding: 14, borderRadius: 16, background: "rgba(96,165,250,0.08)", border: "1px dashed rgba(96,165,250,0.35)" }}>{picked.length ? picked.map((item, i) => <span key={item} style={{ fontWeight: 800 }}>{i > 0 ? "→ " : ""}{m(item)}</span>) : <span style={{ opacity: 0.45 }}>{m("Tu ruta aparecerá aquí…")}</span>}</div>{!checked && <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>{available.map((item) => <button key={item} onClick={() => setPicked((v) => [...v, item])} style={{ ...pill, background: "rgba(255,255,255,0.1)", color: "white" }}>{m(item)}</button>)}</div>}{!checked && picked.length > 0 && <button onClick={() => setPicked((v) => v.slice(0, -1))} style={{ ...pill, marginTop: 16, background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.16)" }}>↶ {m("DESHACER")}</button>}{!checked && picked.length === q.answer.length && <button onClick={check} style={{ ...pill, display: "block", marginTop: 18 }}>{m("COMPROBAR RUTA")}</button>}{checked && <div style={{ marginTop: 20, padding: 18, borderRadius: 16, background: correct ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)" }}><strong>{correct ? `✓ ${m("RUTA CORRECTA")}` : `✕ ${m("RUTA INCORRECTA")}`}</strong>{!correct && <p>{m("Ruta correcta")}: {q.answer.map(m).join(" → ")}</p>}<button onClick={next} style={pill}>{current === round.length - 1 ? `${m("VER RESULTADO")} →` : `${m("SIGUIENTE RUTA")} →`}</button></div>}</section>;
}

function FinalMission({ onBack }) {
  const build = () => {
    const planet = prepare(identifyPlanets, 1)[0];
    const extreme = prepare(extremeWorlds, 1)[0];
    const star = prepare(starQuestions, 1)[0];
    const general = prepare(missionQuestions, 2);
    return [
      { question: `PLANETA DESCONOCIDO: ${planet.clues.join(" ")} ¿Qué planeta es?`, options: planet.options, answer: planet.answer, explanation: `El planeta era ${planet.answer}.` },
      extreme, star, ...general,
    ];
  };
  return <ChoiceMission title="MISIÓN 06 · DESAFÍO DEL EXPLORADOR" factory={build} onBack={onBack} final />;
}

function MissionCenter({ onSelect }) {
  const { m } = useMissionText();
  return <div style={{ marginTop: 34 }}><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>{missions.map((mission) => <button key={mission.id} onClick={() => onSelect(mission.id)} style={{ minHeight: 210, padding: 22, textAlign: "left", color: "white", cursor: "pointer", borderRadius: 20, border: "1px solid rgba(255,255,255,0.14)", background: "linear-gradient(145deg, rgba(37,99,235,0.16), rgba(15,23,42,0.84))" }}><div style={{ fontSize: 34 }}>{mission.icon}</div><div style={{ marginTop: 14, fontSize: 11, letterSpacing: 1.5, fontWeight: 800, opacity: 0.5 }}>{m("MISIÓN")} {String(mission.id).padStart(2, "0")}</div><h2 style={{ margin: "6px 0 8px", fontSize: 21 }}>{m(mission.title)}</h2><p style={{ margin: 0, lineHeight: 1.5, opacity: 0.7 }}>{m(mission.subtitle)}</p><div style={{ marginTop: 18, fontSize: 12, fontWeight: 800, opacity: 0.5 }}>{m(mission.meta)}</div></button>)}</div></div>;
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
