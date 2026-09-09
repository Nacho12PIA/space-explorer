export const planetIds = {
  Mercurio: "mercury",
  Mercury: "mercury",
  Venus: "venus",
  Tierra: "earth",
  Earth: "earth",
  Marte: "mars",
  Mars: "mars",
  Júpiter: "jupiter",
  Jupiter: "jupiter",
  Saturno: "saturn",
  Saturn: "saturn",
  Urano: "uranus",
  Uranus: "uranus",
  Neptuno: "neptune",
  Neptune: "neptune",
};

const answerAliases = {
  "Una estrella": "star",
  "A star": "star",
  "Un planeta": "planet",
  "A planet": "planet",
  "Una luna": "moon",
  "A moon": "moon",
  "Fusión nuclear": "nuclear-fusion",
  "Nuclear fusion": "nuclear-fusion",
  "Hidrógeno": "hydrogen",
  "Hydrogen": "hydrogen",
  "Plasma": "plasma",
  "La gravedad": "gravity",
  "Gravedad": "gravity",
  "Gravity": "gravity",
  "No": "no",
  "Sí": "yes",
  "Yes": "yes",
  "Distancia": "distance",
  "Distance": "distance",
};

export function missionAnswerId(value) {
  if (value == null) return "";
  if (Array.isArray(value)) return value.map(missionAnswerId);
  return planetIds[value] || answerAliases[value] || `answer:${String(value).trim().toLowerCase()}`;
}

export function sameMissionAnswer(a, b) {
  const left = missionAnswerId(a);
  const right = missionAnswerId(b);
  if (Array.isArray(left) && Array.isArray(right)) {
    return left.length === right.length && left.every((item, index) => item === right[index]);
  }
  return left === right;
}

export const planetNames = {
  es: {
    mercury: "Mercurio", venus: "Venus", earth: "Tierra", mars: "Marte",
    jupiter: "Júpiter", saturn: "Saturno", uranus: "Urano", neptune: "Neptuno",
  },
  en: {
    mercury: "Mercury", venus: "Venus", earth: "Earth", mars: "Mars",
    jupiter: "Jupiter", saturn: "Saturn", uranus: "Uranus", neptune: "Neptune",
  },
};

export function localizePlanetName(value, language = "es") {
  const id = planetIds[value];
  return id ? planetNames[language]?.[id] || value : value;
}
