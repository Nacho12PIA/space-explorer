const normalize = (text = "") => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();

const privacyPatterns = [
  /mi nombre es\b/i, /me llamo\b/i, /vivo en\b/i, /mi direccion\b/i, /mi telefono\b/i, /mi numero\b/i, /mi correo\b/i, /mi email\b/i, /mi colegio\b/i, /mi escuela\b/i,
  /my name is\b/i, /i live at\b/i, /i live in\b/i, /my address\b/i, /my phone\b/i, /my number\b/i, /my email\b/i, /my school\b/i,
];

const harmfulPatterns = [
  /como (hacer|fabricar|construir) (una )?(bomba|explosivo|arma)/i,
  /como (matar|herir|hacer dano|hacer daño)/i,
  /how to (make|build) (a )?(bomb|explosive|weapon)/i,
  /how to (kill|hurt|harm)/i,
];

const adultPatterns = [
  /sexo explicito/i, /pornografia/i, /porno\b/i,
  /explicit sex/i, /pornography/i, /porn\b/i,
];

export function checkNovaSafety(text, language = "es") {
  const input = normalize(text);
  if (!input) return { safe: true };

  if (privacyPatterns.some((pattern) => pattern.test(input))) {
    return {
      safe: false,
      type: "privacy",
      text: language === "en"
        ? "You don't need to tell me your real name, address, phone number, email, school, or where you live. Let's keep that private. We can keep exploring space without personal information."
        : "No necesitas decirme tu nombre real, dirección, teléfono, correo, colegio ni dónde vives. Es mejor mantener esos datos en privado. Podemos seguir explorando el espacio sin información personal.",
    };
  }

  if (harmfulPatterns.some((pattern) => pattern.test(input))) {
    return {
      safe: false,
      type: "harmful",
      text: language === "en"
        ? "I can't help with instructions to hurt someone or build dangerous weapons. I can explain the science safely instead, for example how explosions release energy or how astronauts stay safe."
        : "No puedo dar instrucciones para hacer daño o fabricar armas peligrosas. Sí puedo explicar la ciencia de forma segura, por ejemplo cómo se libera energía en una explosión o cómo se protegen los astronautas.",
    };
  }

  if (adultPatterns.some((pattern) => pattern.test(input))) {
    return {
      safe: false,
      type: "adult",
      text: language === "en"
        ? "That topic is outside my space mission for children. Ask me about astronomy, physics, planets, stars, rockets, astronauts, or the Universe."
        : "Ese tema está fuera de mi misión espacial para niños. Pregúntame sobre astronomía, física, planetas, estrellas, cohetes, astronautas o el Universo.",
    };
  }

  return { safe: true };
}
