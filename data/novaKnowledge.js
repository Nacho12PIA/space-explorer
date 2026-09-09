export const novaKnowledge = [
  {
    id: "saturn-rings",
    topic: "saturn",
    keywords: {
      es: ["saturno", "anillos", "aros"],
      en: ["saturn", "rings"],
    },
    questions: {
      es: [
        "¿Por qué Saturno tiene anillos?",
        "¿Cómo se hicieron los anillos de Saturno?",
        "¿De dónde salen los anillos de Saturno?",
        "¿Por qué Saturno tiene esos aros?",
      ],
      en: [
        "Why does Saturn have rings?",
        "How did Saturn's rings form?",
        "Where do Saturn's rings come from?",
      ],
    },
    answer: {
      es: "Los anillos de Saturno están formados por incontables fragmentos de hielo, roca y polvo que orbitan el planeta. Algunos son diminutos y otros pueden medir varios metros. Los científicos creen que gran parte de ese material procede de lunas, cometas u otros cuerpos que se rompieron cerca de Saturno. Aunque desde lejos parecen discos sólidos, en realidad son millones de piezas separadas.",
      en: "Saturn's rings are made of countless pieces of ice, rock, and dust orbiting the planet. Some are tiny and others can be several metres across. Scientists think much of this material came from moons, comets, or other bodies that broke apart near Saturn. From far away the rings look solid, but they are actually millions of separate pieces.",
    },
  },
  {
    id: "black-hole-approach",
    topic: "black-holes",
    keywords: {
      es: ["agujero", "negro", "acercar", "caer", "entrar"],
      en: ["black", "hole", "close", "fall", "enter"],
    },
    questions: {
      es: [
        "¿Qué pasaría si me acercara a un agujero negro?",
        "¿Qué pasa si caigo en un agujero negro?",
        "¿Qué ocurre cerca de un agujero negro?",
      ],
      en: [
        "What would happen if I got close to a black hole?",
        "What happens if I fall into a black hole?",
        "What happens near a black hole?",
      ],
    },
    answer: {
      es: "Al acercarte a un agujero negro, su enorme gravedad afectaría cada vez más a tu movimiento y al paso del tiempo. Cerca de muchos agujeros negros, la diferencia de gravedad entre distintas partes de un objeto puede llegar a estirarlo muchísimo: es lo que se conoce como espaguetificación. Si cruzaras el horizonte de sucesos, ya no podrías regresar ni enviar luz hacia fuera. En LABORATORIO puedes experimentar con una aproximación a un agujero negro.",
      en: "As you approached a black hole, its enormous gravity would affect your motion and the passage of time more and more. Near many black holes, the difference in gravity across an object can stretch it enormously, an effect called spaghettification. If you crossed the event horizon, you could no longer return or send light back out. You can experiment with approaching a black hole in LABORATORY.",
    },
  },
  {
    id: "day-night",
    topic: "earth",
    keywords: {
      es: ["dia", "noche", "tierra", "gira", "rotacion"],
      en: ["day", "night", "earth", "rotate", "rotation"],
    },
    questions: {
      es: [
        "¿Por qué hay día y noche?",
        "¿Cómo se producen el día y la noche?",
        "¿Por qué se hace de noche?",
      ],
      en: [
        "Why do we have day and night?",
        "How do day and night happen?",
        "Why does it get dark at night?",
      ],
    },
    answer: {
      es: "Hay día y noche porque la Tierra gira sobre su eje. La mitad que está orientada hacia el Sol recibe su luz y tiene día; la mitad que queda al otro lado tiene noche. La Tierra tarda aproximadamente 24 horas en completar una vuelta, por eso el ciclo se repite cada día.",
      en: "We have day and night because Earth rotates on its axis. The half facing the Sun receives sunlight and has daytime, while the half facing away has night. Earth takes about 24 hours to complete one rotation, so the cycle repeats every day.",
    },
  },
  {
    id: "star-composition",
    topic: "stars",
    keywords: {
      es: ["estrellas", "estrella", "hechas", "compuestas", "composicion", "saber"],
      en: ["stars", "star", "made", "composition", "know"],
    },
    questions: {
      es: [
        "¿Cómo sabemos de qué están hechas las estrellas?",
        "¿De qué están hechas las estrellas?",
        "¿Cómo sabemos qué elementos tiene una estrella?",
      ],
      en: [
        "How do we know what stars are made of?",
        "What are stars made of?",
        "How do we know which elements are in a star?",
      ],
    },
    answer: {
      es: "Podemos averiguarlo estudiando la luz de las estrellas. Cuando los científicos separan esa luz en sus colores obtienen un espectro. Los elementos químicos dejan patrones característicos en él, como si fueran huellas dactilares. Gracias a esas huellas sabemos, por ejemplo, que las estrellas están formadas principalmente por hidrógeno y helio.",
      en: "We can find out by studying starlight. When scientists split that light into its colours, they obtain a spectrum. Chemical elements leave characteristic patterns in it, rather like fingerprints. Those fingerprints tell us, for example, that stars are made mostly of hydrogen and helium.",
    },
  },
];

function normalizeText(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text) {
  return new Set(normalizeText(text).split(" ").filter((word) => word.length > 2));
}

function similarity(input, candidate) {
  const normalizedInput = normalizeText(input);
  const normalizedCandidate = normalizeText(candidate);

  if (!normalizedInput || !normalizedCandidate) return 0;
  if (normalizedInput === normalizedCandidate) return 1;
  if (normalizedInput.includes(normalizedCandidate) || normalizedCandidate.includes(normalizedInput)) return 0.92;

  const inputTokens = tokens(normalizedInput);
  const candidateTokens = tokens(normalizedCandidate);
  if (!inputTokens.size || !candidateTokens.size) return 0;

  let shared = 0;
  inputTokens.forEach((word) => {
    if (candidateTokens.has(word)) shared += 1;
  });

  return shared / Math.max(inputTokens.size, candidateTokens.size);
}

export function findNovaAnswer(question, language = "es") {
  const lang = language === "en" ? "en" : "es";
  const normalizedQuestion = normalizeText(question);
  let bestMatch = null;
  let bestScore = 0;

  novaKnowledge.forEach((entry) => {
    const questionScores = entry.questions[lang].map((candidate) => similarity(normalizedQuestion, candidate));
    const keywordHits = entry.keywords[lang].filter((keyword) => normalizedQuestion.includes(normalizeText(keyword))).length;
    const keywordScore = keywordHits / entry.keywords[lang].length;
    const score = Math.max(...questionScores, keywordScore * 0.78);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  });

  if (!bestMatch || bestScore < 0.5) {
    return { found: false, score: bestScore, entry: null };
  }

  return {
    found: true,
    score: bestScore,
    entry: bestMatch,
    text: bestMatch.answer[lang],
  };
}
