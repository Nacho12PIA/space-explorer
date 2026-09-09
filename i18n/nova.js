export const novaContent = {
  es: {
    home: "INICIO",
    homeAction: "HABLAR CON NOVA →",
    label: "TUTOR ESPACIAL",
    title: "NOVA",
    subtitle: "Pregunta, investiga y comprende el Universo.",
    placeholder: "Pregúntale a NOVA sobre el espacio…",
    send: "ENVIAR",
    thinking: "NOVA está pensando…",
    hint: "PISTA",
    explain: "EXPLÍCAMELO",
    tryAgain: "INTENTAR DE NUEVO",
    relatedExplore: "VER EN EXPLORA",
    relatedMissions: "IR A MISIONES",
    relatedLaboratory: "PROBAR EN LABORATORIO",
    suggestedQuestions: "¿QUÉ QUIERES DESCUBRIR?",
    safetyFallback: "Esa pregunta se sale de mi misión espacial. Puedo ayudarte a explorar astronomía y ciencia.",
    error: "NOVA no ha podido responder. Inténtalo de nuevo.",
    suggestions: [
      "¿Por qué Saturno tiene anillos?",
      "¿Qué pasaría si me acercara a un agujero negro?",
      "¿Por qué hay día y noche?",
      "¿Cómo sabemos de qué están hechas las estrellas?",
    ],
    tutorPrompt: "Responde en español. Eres NOVA, el tutor espacial educativo de Space Explorer para niños de aproximadamente 6 a 12 años. Explica astronomía y ciencia con lenguaje claro, breve, atractivo y científicamente riguroso. Cuando sea apropiado, guía mediante una pregunta, una pista o un pequeño reto antes de dar directamente la respuesta. Relaciona tus explicaciones con EXPLORA, MISIONES y LABORATORIO cuando ayude a comprender. No inventes hechos. Si algo es incierto, dilo de forma sencilla. Mantén siempre una experiencia segura y apropiada para niños.",
  },
  en: {
    home: "HOME",
    homeAction: "TALK TO NOVA →",
    label: "SPACE TUTOR",
    title: "NOVA",
    subtitle: "Ask questions, investigate, and understand the Universe.",
    placeholder: "Ask NOVA something about space…",
    send: "SEND",
    thinking: "NOVA is thinking…",
    hint: "HINT",
    explain: "EXPLAIN IT TO ME",
    tryAgain: "TRY AGAIN",
    relatedExplore: "SEE IT IN EXPLORE",
    relatedMissions: "GO TO MISSIONS",
    relatedLaboratory: "TRY IT IN LABORATORY",
    suggestedQuestions: "WHAT DO YOU WANT TO DISCOVER?",
    safetyFallback: "That question is outside my space mission. I can help you explore astronomy and science.",
    error: "NOVA couldn't answer that. Please try again.",
    suggestions: [
      "Why does Saturn have rings?",
      "What would happen if I got close to a black hole?",
      "Why do we have day and night?",
      "How do we know what stars are made of?",
    ],
    tutorPrompt: "Answer in English. You are NOVA, Space Explorer's educational space tutor for children around 6–12 years old. Explain astronomy and science in clear, concise, engaging language while remaining scientifically accurate. When appropriate, guide the learner with a question, hint, or small challenge before giving the answer directly. Connect explanations to EXPLORE, MISSIONS, and LABORATORY when that helps understanding. Never invent facts. If something is uncertain, say so simply. Always keep the experience safe and age-appropriate.",
  },
};

export function getNovaContent(language = "es") {
  return novaContent[language] || novaContent.es;
}

export function getNovaTutorPrompt(language = "es") {
  return getNovaContent(language).tutorPrompt;
}
