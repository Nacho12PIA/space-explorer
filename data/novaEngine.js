import { novaKnowledge } from "./novaKnowledge";
import { expandedEntries } from "./novaKnowledgeExpanded";

export const allNovaKnowledge = [...novaKnowledge, ...expandedEntries];

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
  return { found: true, score: bestScore, entry: bestMatch, text: bestMatch.answer[lang] };
}
