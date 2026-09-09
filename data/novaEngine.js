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

function buildTutorReply(entry, lang) {
  const voice = personality[lang];
  const opening = voice.openings[stableIndex(entry.id, voice.openings.length)];
  const curiosityLabel = voice.curiosities[stableIndex(entry.id, voice.curiosities.length, 5)];
  const related = findRelated(entry, lang);
  const relatedQuestion = related?.questions?.[lang]?.[0] || null;
  const followUp = relatedQuestion
    ? (lang === "es" ? `Siguiente misión: ${relatedQuestion}` : `Next mission: ${relatedQuestion}`)
    : voice.followUps[stableIndex(entry.id, voice.followUps.length, 11)];

  const answer = entry.answer[lang];
  const curiosity = entry.curiosity?.[lang] || null;
  return [
    opening,
    answer,
    curiosity ? `${curiosityLabel}: ${curiosity}` : null,
    followUp,
  ].filter(Boolean).join("\n\n");
}

export function findNovaAnswer(question, language = "es") {
  const lang = language === "en" ? "en" : "es";
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
    text: buildTutorReply(bestMatch, lang),
    relatedQuestion: findRelated(bestMatch, lang)?.questions?.[lang]?.[0] || null,
  };
}
