import { novaKnowledge } from "./novaKnowledge";
import { expandedEntries } from "./novaKnowledgeExpanded";

export const allNovaKnowledge = [...novaKnowledge, ...expandedEntries];

const personality = {
  es: {
    openings: ["Buena pregunta.", "Buena observación.", "Vamos a investigarlo.", "Has encontrado una buena pista."],
    curiosities: ["Dato de misión", "Pista espacial", "Para recordar"],
    followUps: ["¿Quieres seguir investigando este tema?", "¿Quieres descubrir algo relacionado?", "¿Te lanzo otra pregunta sobre esto?"],
  },
  en: {
    openings: ["Great question.", "Good observation.", "Let's investigate it.", "You've found a useful clue."],
    curiosities: ["Mission fact", "Space clue", "Remember this"],
    followUps: ["Want to keep investigating this topic?", "Want to discover something related?", "Shall I give you another question about this?"],
  },
};

const cadetReplacements = {
  es: [
    ["aproximadamente", "más o menos"], ["principalmente", "sobre todo"], ["extremadamente", "muchísimo"],
    ["gravitatoria", "de la gravedad"], ["gravitatorio", "de la gravedad"], ["radiación", "energía y luz"],
    ["atmósfera", "capa de gases"], ["hidrocarburos", "sustancias parecidas al gas y al petróleo"],
    ["supermasivo", "gigantesco"], ["interestelar", "entre las estrellas"], ["espectro", "luz separada en colores"],
  ],
  en: [
    ["approximately", "about"], ["mainly", "mostly"], ["extremely", "very"], ["gravitational", "caused by gravity"],
    ["radiation", "energy and light"], ["atmosphere", "layer of gases"], ["hydrocarbons", "oil-like substances"],
    ["supermassive", "gigantic"], ["interstellar", "between the stars"], ["spectrum", "light split into colours"],
  ],
};

function normalizeText(text = "") {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokens(text) {
  return new Set(normalizeText(text).split(" ").filter((word) => word.length > 2));
}

function similarity(input, candidate) {
  const a = normalizeText(input);
  const b = normalizeText(candidate);
  if (!a || !b) return 0;
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.92;
  const aa = tokens(a);
  const bb = tokens(b);
  let shared = 0;
  aa.forEach((word) => { if (bb.has(word)) shared += 1; });
  return shared / Math.max(aa.size, bb.size, 1);
}

function stableIndex(seed, length, offset = 0) {
  if (!length) return 0;
  const value = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return (value + offset) % length;
}

function findRelated(entry, lang) {
  const related = allNovaKnowledge.filter((candidate) => candidate.id !== entry.id && candidate.topic === entry.topic);
  if (!related.length) return null;
  return related[stableIndex(entry.id, related.length, 17)];
}

function firstSentence(text) {
  const match = text.match(/^.*?[.!?](?:\s|$)/);
  return (match ? match[0] : text).trim();
}

function simplifyForCadet(text, lang) {
  let simple = firstSentence(text);
  cadetReplacements[lang].forEach(([from, to]) => {
    simple = simple.replace(new RegExp(from, "gi"), to);
  });
  return simple;
}

function adaptAnswer(entry, lang, level) {
  const answer = entry.answer[lang];
  if (level === "cadet") return simplifyForCadet(answer, lang);
  if (level === "astronomer") {
    const topic = entry.topic;
    return lang === "es"
      ? `${answer}\n\nNivel astrónomo: esta idea pertenece a ${topic}. Fíjate en los términos científicos de la explicación: son las pistas que usan los astrónomos para describir el fenómeno con precisión.`
      : `${answer}\n\nAstronomer level: this idea belongs to ${topic}. Notice the scientific terms in the explanation: they are the clues astronomers use to describe the phenomenon precisely.`;
  }
  return answer;
}

function buildTutorReply(entry, lang, level = "explorer") {
  const voice = personality[lang];
  const opening = voice.openings[stableIndex(entry.id, voice.openings.length)];
  const curiosityLabel = voice.curiosities[stableIndex(entry.id, voice.curiosities.length, 5)];
  const related = findRelated(entry, lang);
  const relatedQuestion = related?.questions?.[lang]?.[0] || null;
  const followUp = relatedQuestion
    ? (lang === "es" ? `Siguiente misión: ${relatedQuestion}` : `Next mission: ${relatedQuestion}`)
    : voice.followUps[stableIndex(entry.id, voice.followUps.length, 11)];
  const answer = adaptAnswer(entry, lang, level);
  const curiosity = level === "cadet" ? null : entry.curiosity?.[lang] || null;

  return [opening, answer, curiosity ? `${curiosityLabel}: ${curiosity}` : null, followUp].filter(Boolean).join("\n\n");
}

export function findNovaAnswer(question, language = "es", level = "explorer") {
  const lang = language === "en" ? "en" : "es";
  const safeLevel = ["cadet", "explorer", "astronomer"].includes(level) ? level : "explorer";
  const normalized = normalizeText(question);
  let bestMatch = null;
  let bestScore = 0;

  allNovaKnowledge.forEach((entry) => {
    const questionScore = Math.max(...entry.questions[lang].map((candidate) => similarity(normalized, candidate)));
    const hits = entry.keywords[lang].filter((keyword) => normalized.includes(normalizeText(keyword))).length;
    const keywordScore = entry.keywords[lang].length ? hits / entry.keywords[lang].length : 0;
    const score = Math.max(questionScore, keywordScore * 0.76);
    if (score > bestScore) { bestScore = score; bestMatch = entry; }
  });

  if (!bestMatch || bestScore < 0.5) return { found: false, score: bestScore, entry: null };
  return {
    found: true,
    score: bestScore,
    entry: bestMatch,
    text: buildTutorReply(bestMatch, lang, safeLevel),
    relatedQuestion: findRelated(bestMatch, lang)?.questions?.[lang]?.[0] || null,
  };
}
