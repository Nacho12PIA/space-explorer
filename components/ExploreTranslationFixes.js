"use client";

import { useEffect, useMemo, useRef } from "react";
import LocalizedSolarSystem from "./LocalizedSolarSystem";
import { useLanguage } from "../i18n/LanguageContext";

const aliases = {
  "✨ Mira atentamente el borde de Mercurio. El halo representa su exosfera, pero en realidad sería muchísimo más tenue de lo que podemos mostrar en pantalla.": "solarSystem.text.mercuryHalo",
  "☀️ El viento solar y los impactos de pequeños cuerpos pueden liberar átomos de la superficie de Mercurio. Algunas de esas partículas pasan temporalmente a formar parte de su exosfera.": "solarSystem.text.solarWind",
  "El grosor y el brillo del halo están exagerados para que la exosfera pueda distinguirse visualmente.": "solarSystem.text.haloExaggerated",

  "La espesa capa de nubes de Venus impide observar directamente su superficie en luz visible. Por eso las sondas espaciales han utilizado radar para estudiar el terreno que se esconde debajo.": "solarSystem.text.venusSurface",
  "🔎 Mira el planeta: acabamos de retirar visualmente sus nubes para poder explorar lo que hay debajo.": "solarSystem.text.venusRevealHint",
  "Venus posee una atmósfera extremadamente densa, formada principalmente por dióxido de carbono y cubierta por gruesas nubes de ácido sulfúrico.": "solarSystem.text.venusAtmosphere",
  "☁️ Desde el espacio, esas nubes esconden la superficie. Cambia ahora a": "solarSystem.text.venusSwitchSurfaceA",

  "Dos caras de la Tierra": "solarSystem.text.twoSidesEarth",
  "La mitad de la Tierra orientada hacia el Sol vive el día. En el lado opuesto es de noche.": "solarSystem.text.earthDayNight",
  "🌍 Gira la Tierra y observa la frontera entre el día y la noche. En el hemisferio oscuro podrás ver las luces de las ciudades.": "solarSystem.text.rotateEarth",
  "🔵 Mira el borde de la Tierra: hemos exagerado visualmente el grosor de la atmósfera para que puedas distinguirla con claridad.": "solarSystem.text.earthAtmosphereHint",
  "* Los 100 km corresponden aproximadamente a la línea de Kármán, una referencia convencional para señalar el comienzo del espacio. La atmósfera no termina bruscamente a esa altura.": "solarSystem.text.karman",

  "Marte posee volcanes enormes, cañones gigantescos y casquetes de hielo. Gira el planeta para localizar los marcadores sobre su superficie.": "solarSystem.text.marsSurface",
  "Es el volcán más grande conocido del Sistema Solar. Se eleva aproximadamente 22 km sobre las llanuras que lo rodean.": "solarSystem.text.olympusText",
  "Es un inmenso sistema de cañones de unos 4.000 km de longitud: casi la anchura de Estados Unidos.": "solarSystem.text.vallesText",
  "📍 Los marcadores están anclados a la superficie de Marte. Al rotar el planeta, cada uno viaja con su región y desaparece cuando queda detrás.": "solarSystem.text.marsMarkers",
  "El tamaño de los marcadores está exagerado para que puedan verse fácilmente.": "solarSystem.text.markersExaggerated",
  "Marte tiene una atmósfera mucho más fina que la de la Tierra. Está formada principalmente por dióxido de carbono y retiene mucho menos calor.": "solarSystem.text.marsAtmosphere",
  "Presión respecto a la Tierra": "solarSystem.text.pressureVsEarth",
  "Muy fina": "solarSystem.text.veryThin",
  "🔴 Mira el borde de Marte. El halo representa su tenue atmósfera. Su grosor está exagerado en la visualización para que podamos distinguirla.": "solarSystem.text.marsHalo",
  "🌪️ Aunque la atmósfera es muy tenue, el polvo puede levantarse y formar enormes tormentas. Algunas llegan a extenderse por gran parte del planeta.": "solarSystem.text.dustStorms",

  "En Júpiter no podrías aterrizar: es un gigante gaseoso y no tiene una superficie sólida como la Tierra o Marte.": "solarSystem.text.jupiterNoLand",
  "las bandas que ves en Júpiter forman parte de su enorme atmósfera, no de un suelo.": "solarSystem.text.jupiterBandsDiscovery",
  "Júpiter está formado principalmente por hidrógeno y helio. Sus nubes se organizan en bandas que recorren el planeta a enormes velocidades.": "solarSystem.text.jupiterAtmosphere",
  "es una gigantesca tormenta que lleva observándose desde hace siglos.": "solarSystem.text.greatRedSpotText",
  "Los marcadores sobre el planeta te permiten localizar una zona clara, un cinturón oscuro y la Gran Mancha Roja.": "solarSystem.text.jupiterMarkersText",

  "☁️ Las franjas que observas pertenecen a las capas superiores de su atmósfera. Al descender, la presión y la temperatura aumentarían enormemente.": "solarSystem.text.saturnCloudLayers",
  "🌬️ Saturno posee fuertes corrientes atmosféricas y enormes sistemas de tormentas.": "solarSystem.text.saturnWinds",

  "🧊 Aunque lo llamamos": "solarSystem.text.uranusIceGiantLead",
  "eso no significa que Urano sea una enorme bola de hielo. Bajo su atmósfera existen materiales como agua, metano y amoníaco a enormes presiones y temperaturas.": "solarSystem.text.uranusIceGiantTail",
  "🔵 El metano absorbe parte de la luz roja del Sol, ayudando a que Urano presente su tono azul verdoso característico.": "solarSystem.text.uranusColor",

  "🧊 Bajo sus nubes, la presión aumenta enormemente. En el interior existen materiales como agua, metano y amoníaco sometidos a condiciones extremas.": "solarSystem.text.neptuneInterior",
  "La atmósfera de Neptuno está formada principalmente por hidrógeno y helio, además de pequeñas cantidades de metano.": "solarSystem.text.neptuneAtmosphere",
  "💨 Neptuno posee los vientos más rápidos conocidos entre los planetas del Sistema Solar: pueden superar los": "solarSystem.text.neptuneWinds"
};

export default function ExploreTranslationFixes() {
  const rootRef = useRef(null);
  const { language, t } = useLanguage();

  const translations = useMemo(() => {
    const map = new Map();
    Object.entries(aliases).forEach(([spanish, key]) => {
      map.set(spanish, t(key, spanish));
    });
    return map;
  }, [language, t]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const translateTextNode = (node) => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const original = node.__spaceExplorerFixOriginal ?? node.nodeValue;
      node.__spaceExplorerFixOriginal = original;
      const trimmed = original.trim();
      if (!trimmed) return;
      const normalized = trimmed.replace(/\s+/g, " ");
      const translated = translations.get(normalized);
      if (!translated) return;
      const leading = original.match(/^\s*/)?.[0] ?? "";
      const trailing = original.match(/\s*$/)?.[0] ?? "";
      node.nodeValue = `${leading}${translated}${trailing}`;
    };

    const translateTree = (target) => {
      if (target.nodeType === Node.TEXT_NODE) {
        translateTextNode(target);
        return;
      }
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        translateTextNode(node);
        node = walker.nextNode();
      }
    };

    translateTree(root);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(translateTree);
      });
    });
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language, translations]);

  return (
    <div ref={rootRef} style={{ display: "contents" }}>
      <LocalizedSolarSystem />
    </div>
  );
}
