// Fuente bilingüe propia de LABORATORIO.
// La lógica de los experimentos debe depender siempre de ids estables,
// nunca de los textos visibles en español o inglés.

export const laboratoryExperiments = [
  { id: "gravity", icon: "🧑‍🚀", accent: "#38bdf8" },
  { id: "orbits", icon: "🪐", accent: "#fbbf24" },
  { id: "daynight", icon: "🌗", accent: "#60a5fa" },
  { id: "blackhole", icon: "🕳️", accent: "#c084fc", badgeId: "extremeWorld" },
  { id: "impact", icon: "☄️", accent: "#fb7185", badgeId: "new" },
];

export const laboratoryWorlds = [
  { id: "moon", gravity: 1.62, color: "#cbd5e1", ground: "#64748b" },
  { id: "mars", gravity: 3.71, color: "#f97316", ground: "#9a3412" },
  { id: "earth", gravity: 9.81, color: "#38bdf8", ground: "#166534" },
  { id: "neptune", gravity: 11.15, color: "#3b82f6", ground: "#1e40af" },
  { id: "jupiter", gravity: 24.79, color: "#d6a66f", ground: "#92400e" },
];

export const laboratoryText = {
  es: {
    page: { home: "INICIO", center: "CENTRO DE EXPERIMENTACIÓN", title: "LABORATORIO", intro: "Cambia las condiciones, observa los resultados y descubre por ti mismo cómo funciona el Universo." },
    common: { experiment: "EXPERIMENTO", enter: "ENTRAR AL SIMULADOR →", back: "TODOS LOS EXPERIMENTOS", ruleLabel: "🔬 REGLA DEL LABORATORIO:", rule: "toca, arrastra y experimenta. Aquí aprendes haciendo que el Universo cambie delante de ti.", extremeWorld: "MUNDO EXTREMO", new: "NUEVO" },
    experiments: {
      gravity: { title: "SUPERGRAVEDAD", subtitle: "Salta en la Luna, Marte o Júpiter." },
      orbits: { title: "DOMINA UNA ÓRBITA", subtitle: "Mueve un planeta y cambia su año." },
      daynight: { title: "FABRICA UN DÍA", subtitle: "Acelera la rotación de un mundo." },
      blackhole: { title: "AGUJERO NEGRO", subtitle: "¿Qué ocurre si te acercas demasiado?" },
      impact: { title: "IMPACTO DE ASTEROIDE", subtitle: "Cambia el tamaño y la velocidad del impacto." },
    },
    worlds: { moon: "Luna", mars: "Marte", earth: "Tierra", neptune: "Neptuno", jupiter: "Júpiter" },
  },
  en: {
    page: { home: "HOME", center: "EXPERIMENT CENTER", title: "LABORATORY", intro: "Change the conditions, watch what happens, and discover for yourself how the Universe works." },
    common: { experiment: "EXPERIMENT", enter: "ENTER SIMULATOR →", back: "ALL EXPERIMENTS", ruleLabel: "🔬 LAB RULE:", rule: "tap, drag, and experiment. Here you learn by making the Universe change right in front of you.", extremeWorld: "EXTREME WORLD", new: "NEW" },
    experiments: {
      gravity: { title: "SUPERGRAVITY", subtitle: "Jump on the Moon, Mars, or Jupiter." },
      orbits: { title: "MASTER AN ORBIT", subtitle: "Move a planet and change the length of its year." },
      daynight: { title: "MAKE A DAY", subtitle: "Speed up a world's rotation." },
      blackhole: { title: "BLACK HOLE", subtitle: "What happens if you get too close?" },
      impact: { title: "ASTEROID IMPACT", subtitle: "Change the asteroid's size and impact speed." },
    },
    worlds: { moon: "Moon", mars: "Mars", earth: "Earth", neptune: "Neptune", jupiter: "Jupiter" },
  },
};

export function getLaboratoryText(language = "es") {
  return laboratoryText[language] || laboratoryText.es;
}
