"use client";

import { useEffect, useMemo, useRef } from "react";
import MissionPlayer from "./MissionPlayer";
import { useLanguage } from "../i18n/LanguageContext";

const exact = {
  "DESAFÍO": "CHALLENGE",
  "EXPLORADOR CERTIFICADO": "CERTIFIED EXPLORER",
  "MISIÓN COMPLETADA": "MISSION COMPLETE",
  "Resultado:": "Score:",
  "¡Excelente! Has resuelto todos los desafíos.": "Excellent! You solved every challenge.",
  "Buen trabajo. La misión está superada, aunque puedes mejorar tu resultado.": "Great work. Mission accomplished! You can still try again to improve your score.",
  "Todavía quedan datos por dominar. Vuelve a EXPLORA y prueba de nuevo.": "There is still more to discover. Head back to EXPLORE and try again.",
  "REPETIR": "TRY AGAIN",
  "← CENTRO DE MISIONES": "← MISSION CENTER",
  "← VOLVER": "← BACK",
  "✓ CORRECTO": "✓ CORRECT",
  "✕ CASI": "✕ ALMOST",
  "VER RESULTADO →": "SEE RESULT →",
  "SIGUIENTE →": "NEXT →",
  "MISIÓN 02 · PLANETA DESCONOCIDO": "MISSION 02 · UNKNOWN PLANET",
  "¿Qué planeta soy?": "Which planet am I?",
  "REVELAR OTRA PISTA": "REVEAL ANOTHER CLUE",
  "SIGUIENTE MUNDO →": "NEXT WORLD →",
  "MISIÓN 03 · RUTA DE NAVEGACIÓN": "MISSION 03 · NAVIGATION ROUTE",
  "Pulsa los planetas uno a uno para construir la ruta.": "Tap the planets one by one to build the route.",
  "Tu ruta aparecerá aquí…": "Your route will appear here…",
  "↶ DESHACER": "↶ UNDO",
  "COMPROBAR RUTA": "CHECK ROUTE",
  "✓ RUTA CORRECTA": "✓ CORRECT ROUTE",
  "✕ RUTA INCORRECTA": "✕ WRONG ROUTE",
  "SIGUIENTE RUTA →": "NEXT ROUTE →",
  "MISIÓN 01 · RESCATE EN EL SISTEMA SOLAR": "MISSION 01 · SOLAR SYSTEM RESCUE",
  "MISIÓN 04 · MUNDOS EXTREMOS": "MISSION 04 · EXTREME WORLDS",
  "MISIÓN 05 · MISIÓN ESTELAR": "MISSION 05 · STELLAR MISSION",
  "MISIÓN 06 · DESAFÍO DEL EXPLORADOR": "MISSION 06 · EXPLORER CHALLENGE",
  "Rescate en el Sistema Solar": "Solar System Rescue",
  "Recupera los datos de una sonda perdida.": "Recover the data from a lost space probe.",
  "5 retos · banco de 100": "5 challenges · bank of 100",
  "Identifica el planeta": "Identify the Planet",
  "Descubre mundos desconocidos a partir de pistas.": "Discover unknown worlds from clues.",
  "5 mundos · pistas": "5 worlds · clues",
  "Ruta de navegación": "Navigation Route",
  "Reconstruye rutas correctas por el Sistema Solar.": "Rebuild the correct routes through the Solar System.",
  "5 de 10 rutas · navegación": "5 of 10 routes · navigation",
  "Mundos extremos": "Extreme Worlds",
  "Elige el mejor destino para cada misión científica.": "Choose the best destination for each science mission.",
  "5 de 12 escenarios · decisión": "5 of 12 scenarios · decision",
  "Misión estelar": "Stellar Mission",
  "Investiga el Sol y descubre cómo funcionan las estrellas.": "Investigate the Sun and discover how stars work.",
  "6 de 15 retos · estrellas": "6 of 15 challenges · stars",
  "Desafío del explorador": "Explorer Challenge",
  "Una expedición final que combina todo lo aprendido.": "A final expedition combining everything you have learned.",
  "5 etapas · prueba final": "5 stages · final challenge",
  "Mercurio": "Mercury", "Tierra": "Earth", "Marte": "Mars", "Júpiter": "Jupiter", "Saturno": "Saturn", "Urano": "Uranus", "Neptuno": "Neptune",
  "Una estrella": "A star", "Un planeta": "A planet", "Una luna": "A moon", "Una galaxia": "A galaxy",
  "Fusión nuclear": "Nuclear fusion", "Combustión": "Combustion", "Electricidad": "Electricity",
  "Hidrógeno": "Hydrogen", "Oxígeno": "Oxygen", "Hierro": "Iron", "Hielo": "Ice", "Roca": "Rock",
  "Gravedad": "Gravity", "Distancia": "Distance", "Tiempo": "Time", "Temperatura": "Temperature",
  "En nebulosas": "In nebulae", "En planetas": "On planets", "En agujeros negros": "In black holes",
  "Una azulada": "A blue star", "Una rojiza": "A red star", "Todas igual": "They are all the same",
  "En una enana blanca": "A white dwarf", "Puede explotar como supernova": "It can explode as a supernova",
  "Próxima Centauri": "Proxima Centauri", "Sirio": "Sirius"
};

const phrases = [
  [/^PISTA (\d+):$/, "CLUE $1:"],
  [/^MISIÓN (\d+):$/, "MISSION $1:"],
  [/^La respuesta correcta es (.+)\.$/, "The correct answer is $1."],
  [/^Ruta correcta:$/, "Correct route:"],
];

function translateText(value) {
  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  const normalized = value.trim().replace(/\s+/g, " ");
  if (!normalized) return value;
  if (exact[normalized]) return `${leading}${exact[normalized]}${trailing}`;
  for (const [pattern, replacement] of phrases) {
    if (pattern.test(normalized)) return `${leading}${normalized.replace(pattern, replacement)}${trailing}`;
  }
  return value;
}

export default function LocalizedMissionPlayer() {
  const { language } = useLanguage();
  const rootRef = useRef(null);
  const isEnglish = language === "en";
  const mode = useMemo(() => language, [language]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let applying = false;

    const applyNode = (node, refresh = false) => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const current = node.nodeValue || "";
      if (refresh && current !== node.__missionLocalized) node.__missionOriginal = current;
      const original = node.__missionOriginal ?? current;
      node.__missionOriginal = original;
      const next = isEnglish ? translateText(original) : original;
      node.__missionLocalized = next;
      if (current !== next) node.nodeValue = next;
    };

    const applyTree = (target) => {
      if (target.nodeType === Node.TEXT_NODE) return applyNode(target);
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) { applyNode(node); node = walker.nextNode(); }
    };

    applyTree(root);
    const observer = new MutationObserver((mutations) => {
      if (applying) return;
      applying = true;
      try {
        mutations.forEach((mutation) => {
          if (mutation.type === "characterData") applyNode(mutation.target, true);
          else mutation.addedNodes.forEach(applyTree);
        });
      } finally { applying = false; }
    });
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [isEnglish, mode]);

  return <div ref={rootRef} style={{ display: "contents" }}><MissionPlayer /></div>;
}
