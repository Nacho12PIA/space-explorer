"use client";

import { useEffect, useMemo, useRef } from "react";
import SolarSystem from "./SolarSystem";
import { useLanguage } from "../i18n/LanguageContext";
import { planets } from "../data/planets";

const staticKeys = {
  "Explora. Descubre. Aprende.": "solarSystem.tagline",
  "Arrastra para girar · Pellizca para hacer zoom": "solarSystem.controls",
  "Volviendo al Sistema Solar…": "solarSystem.returning",
  "VISTA GENERAL": "solarSystem.navigation.overview",
  "SUPERFICIE": "solarSystem.navigation.surface",
  "ATMÓSFERA": "solarSystem.navigation.atmosphere",
  "LUNAS": "solarSystem.navigation.moons",
  "EXPLORANDO": "solarSystem.exploring",
  "← SISTEMA SOLAR": "solarSystem.solarSystem",
  "Diámetro": "solarSystem.overview.diameter",
  "Duración del día": "solarSystem.overview.day",
  "Gravedad": "solarSystem.overview.gravity",
  "Duración del año": "solarSystem.overview.year",
  "¿SABÍAS QUE...?": "solarSystem.overview.didYouKnow",
  "Sol": "planets.sun.name",
  "Luna": "planets.moon",

  "EXPLORANDO · ESTRELLA": "solarSystem.text.exploringStar",
  "⭐ NUESTRA ESTRELLA": "solarSystem.text.ourStar",
  "El Sol no es un planeta: es una estrella. Es una enorme esfera de plasma que mantiene unido al Sistema Solar gracias a su gravedad.": "solarSystem.text.sunIntro",
  "Edad": "solarSystem.text.age",
  "Superficie visible": "solarSystem.text.visibleSurface",
  "Núcleo": "solarSystem.text.core",
  "≈ 1,39 millones km": "solarSystem.text.sunDiameter",
  "≈ 4.600 millones años": "solarSystem.text.sunAge",
  "≈ 5.500 °C": "solarSystem.text.sunSurfaceTemp",
  "≈ 15 millones °C": "solarSystem.text.sunCoreTemp",
  "¿CÓMO PRODUCE ENERGÍA?": "solarSystem.text.howEnergy",
  "En su núcleo ocurre la fusión nuclear: átomos de hidrógeno se unen y forman helio, liberando una enorme cantidad de energía.": "solarSystem.text.fusion",
  "🌌 EL SOL ES UNA ESTRELLA MÁS": "solarSystem.text.sunAnotherStar",
  "El Sol parece muchísimo mayor que las estrellas del cielo porque está mucho más cerca de nosotros. Muchas de las estrellas que observamos son otros enormes soles situados a distancias increíbles.": "solarSystem.text.sunDistance",
  "Las estrellas del fondo de esta visualización son decorativas y no representan sus posiciones reales.": "solarSystem.text.starsDecorative",

  "SUPERFICIE CRATERIZADA": "solarSystem.text.crateredSurface",
  "Un mundo marcado por impactos": "solarSystem.text.impactsWorld",
  "Mercurio posee una superficie rocosa cubierta por miles de cráteres. Como casi no tiene atmósfera que los erosione, muchas de estas cicatrices pueden permanecer durante miles de millones de años.": "solarSystem.text.mercurySurface",
  "Es una gigantesca cuenca formada por el impacto de un asteroide. Tiene aproximadamente 1.550 km de diámetro.": "solarSystem.text.giantImpactBasin",
  "Un paisaje lleno de cráteres": "solarSystem.text.craterLandscape",
  "La superficie de Mercurio recuerda a la Luna porque ambos mundos conservan numerosos cráteres de impactos antiguos.": "solarSystem.text.mercuryMoonLike",
  "Hielo cerca de los polos": "solarSystem.text.polarIce",
  "Aunque Mercurio está muy cerca del Sol, algunos cráteres polares permanecen siempre en sombra y pueden conservar hielo de agua.": "solarSystem.text.mercuryPolarIce",
  "🔭 Gira Mercurio para explorar los distintos marcadores. Cuando una región pasa al otro lado del planeta, su etiqueta desaparece.": "solarSystem.text.rotateMercury",
  "Los marcadores y su tamaño están exagerados para facilitar la exploración. El marcador de terreno craterizado representa una región característica y no un único accidente geográfico.": "solarSystem.text.mercuryMarkersNote",
  "TERRENO CRATERIZADO": "solarSystem.text.crateredTerrain",
  "HIELO POLAR": "solarSystem.text.polarIceMarker",

  "SUPERFICIE REVELADA": "solarSystem.text.surfaceRevealed",
  "Bajo las nubes de Venus": "solarSystem.text.beneathVenusClouds",
  "La densa capa de nubes de Venus impide observar directamente su superficie en luz visible. Por eso las sondas espaciales han utilizado radar para estudiar el terreno oculto bajo la atmósfera.": "solarSystem.text.venusSurface",
  "🔎 Observa el planeta: hemos retirado visualmente sus nubes para que puedas explorar lo que hay debajo.": "solarSystem.text.venusRevealHint",

  "DÍA Y NOCHE DINÁMICOS": "solarSystem.text.dynamicDayNight",
  "Las dos caras de la Tierra": "solarSystem.text.twoSidesEarth",
  "La mitad de la Tierra orientada hacia el Sol está iluminada. En el lado opuesto es de noche.": "solarSystem.text.earthDayNight",
  "🌍 Gira la Tierra y observa la frontera entre el día y la noche. En el lado oscuro puedes ver las luces de las ciudades.": "solarSystem.text.rotateEarth",
  "La línea que separa la zona iluminada de la zona oscura se llama terminador.": "solarSystem.text.terminator",

  "PUNTOS DE INTERÉS ACTIVADOS": "solarSystem.text.pointsActivated",
  "Gigantes de la superficie marciana": "solarSystem.text.marsSurfaceTitle",
  "Marte posee enormes volcanes, cañones gigantescos y casquetes polares de hielo. Gira el planeta para localizar los marcadores sobre su superficie.": "solarSystem.text.marsSurface",
  "Es el volcán más grande conocido del Sistema Solar. Se eleva unos 22 km sobre las llanuras que lo rodean.": "solarSystem.text.olympusText",
  "Es un enorme sistema de cañones de unos 4.000 km de longitud: casi tan ancho como Estados Unidos.": "solarSystem.text.vallesText",
  "Casquetes polares": "solarSystem.text.polarCaps",
  "Los polos de Marte contienen hielo de agua y también dióxido de carbono congelado que cambia con las estaciones.": "solarSystem.text.marsPolarCaps",
  "📍 Los marcadores están anclados a la superficie de Marte. Al girar el planeta, cada uno se desplaza con su región y desaparece cuando pasa por detrás.": "solarSystem.text.marsMarkers",
  "El tamaño de los marcadores está exagerado para facilitar su observación.": "solarSystem.text.markersExaggerated",
  "CASQUETE POLAR": "solarSystem.text.polarCapMarker",

  "SIN SUPERFICIE SÓLIDA": "solarSystem.text.noSolidSurface",
  "¿Dónde aterrizarías?": "solarSystem.text.whereLand",
  "En Júpiter no podrías aterrizar: es un gigante gaseoso y no posee una superficie sólida como la Tierra o Marte.": "solarSystem.text.jupiterNoLand",
  "Lo que vemos desde el espacio son las capas superiores de sus nubes. Si descendieras, la presión y la temperatura aumentarían cada vez más.": "solarSystem.text.jupiterCloudLayers",
  "DESCUBRIMIENTO:": "solarSystem.text.discovery",
  "las bandas que ves en Júpiter forman parte de su enorme atmósfera, no de una superficie sólida.": "solarSystem.text.jupiterBandsDiscovery",
  "Tampoco podrías aterrizar aquí": "solarSystem.text.saturnNoLandTitle",
  "Saturno es un gigante gaseoso. No posee una superficie sólida como la Tierra, Marte o Mercurio.": "solarSystem.text.saturnNoLand",
  "☁️ Las bandas que ves pertenecen a las capas superiores de su atmósfera. Si descendieras, la presión y la temperatura aumentarían enormemente.": "solarSystem.text.saturnCloudLayers",
  "Un gigante helado": "solarSystem.text.iceGiant",
  "Urano no posee una superficie sólida sobre la que pudiéramos aterrizar. Sus capas exteriores están formadas principalmente por gases.": "solarSystem.text.uranusNoLand",
  "🧊 Aunque lo llamamos gigante helado, eso no significa que Urano sea una enorme bola de hielo. Bajo su atmósfera existen materiales como agua, metano y amoníaco sometidos a enormes presiones y temperaturas.": "solarSystem.text.uranusIceGiant",
  "Un mundo sin suelo sólido": "solarSystem.text.neptuneNoGroundTitle",
  "Neptuno es un gigante helado y no posee una superficie sólida sobre la que pudiéramos aterrizar. Lo que vemos son las capas superiores de su atmósfera.": "solarSystem.text.neptuneNoGround",
  "🧊 Bajo sus nubes, la presión aumenta enormemente. En su interior existen materiales como agua, metano y amoníaco sometidos a condiciones extremas.": "solarSystem.text.neptuneInterior",

  "EXOSFERA EXTREMADAMENTE TENUE": "solarSystem.text.exosphereThin",
  "Casi sin atmósfera": "solarSystem.text.almostNoAtmosphere",
  "Mercurio no posee una atmósfera densa como la Tierra. Está rodeado por una exosfera extremadamente tenue formada por átomos y partículas dispersas alrededor del planeta.": "solarSystem.text.mercuryAtmosphere",
  "Muy baja": "solarSystem.text.veryThin",
  "Densidad": "solarSystem.text.density",
  "Exosfera": "solarSystem.text.exosphere",
  "Tipo": "solarSystem.text.type",
  "Entre sus elementos": "solarSystem.text.amongElements",
  "Casi vacío": "solarSystem.text.almostVacuum",
  "Comparada con la Tierra": "solarSystem.text.comparedEarth",
  "✨ Observa el borde de Mercurio. El resplandor representa su exosfera, pero en realidad sería muchísimo más tenue de lo que podemos mostrar en pantalla.": "solarSystem.text.mercuryHalo",
  "☀️ El viento solar y los impactos de pequeños cuerpos pueden liberar átomos de la superficie de Mercurio. Parte de esas partículas pasan temporalmente a formar parte de su exosfera.": "solarSystem.text.solarWind",
  "El grosor y el brillo del halo están exagerados para hacer visible la exosfera.": "solarSystem.text.haloExaggerated",

  "NUBES VISIBLES": "solarSystem.text.cloudsVisible",
  "Un planeta oculto": "solarSystem.text.hiddenPlanet",
  "Venus posee una atmósfera extremadamente densa formada principalmente por dióxido de carbono y cubierta por espesas nubes de ácido sulfúrico.": "solarSystem.text.venusAtmosphere",
  "☁️ Desde el espacio, esas nubes ocultan la superficie. Cambia a": "solarSystem.text.venusSwitchSurfaceA",
  "y observa qué ocurre.": "solarSystem.text.venusSwitchSurfaceB",

  "ATMÓSFERA VISIBLE": "solarSystem.text.atmosphereVisible",
  "El escudo azul de la Tierra": "solarSystem.text.earthBlueShield",
  "La Tierra está rodeada por una fina envoltura de gases llamada atmósfera. Nos proporciona el aire que respiramos y ayuda a proteger la superficie del entorno espacial.": "solarSystem.text.earthAtmosphere",
  "Nitrógeno": "solarSystem.text.nitrogen",
  "Oxígeno": "solarSystem.text.oxygen",
  "Otros gases": "solarSystem.text.otherGases",
  "Inicio del espacio*": "solarSystem.text.startSpace",
  "🔵 Observa el borde de la Tierra: hemos exagerado el grosor de la atmósfera para que puedas verla claramente.": "solarSystem.text.earthAtmosphereHint",
  "* Aproximadamente 100 km corresponde a la línea de Kármán, una referencia convencional utilizada para marcar el inicio del espacio. La atmósfera no termina de forma brusca a esa altura.": "solarSystem.text.karman",

  "ATMÓSFERA MUY TENUE": "solarSystem.text.veryThinAtmosphere",
  "Un cielo muy diferente": "solarSystem.text.differentSky",
  "Marte posee una atmósfera mucho más tenue que la Tierra. Está formada principalmente por dióxido de carbono y retiene mucho menos calor.": "solarSystem.text.marsAtmosphere",
  "Dióxido de carbono": "solarSystem.text.carbonDioxide",
  "Presión frente a la Tierra": "solarSystem.text.pressureVsEarth",
  "Temperatura media": "solarSystem.text.averageTemp",
  "Atmósfera": "solarSystem.text.atmosphere",
  "🔴 Observa el borde de Marte. El resplandor representa su fina atmósfera. Su grosor está exagerado en la visualización para poder verla.": "solarSystem.text.marsHalo",
  "🌪️ Aunque la atmósfera es muy tenue, el polvo puede levantarse y formar enormes tormentas. Algunas pueden extenderse por gran parte del planeta.": "solarSystem.text.dustStorms",

  "ATMÓSFERA GIGANTE": "solarSystem.text.giantAtmosphere",
  "Un mundo de nubes y tormentas": "solarSystem.text.cloudsStorms",
  "Júpiter está formado principalmente por hidrógeno y helio. Sus nubes forman bandas que recorren el planeta a enormes velocidades.": "solarSystem.text.jupiterAtmosphere",
  "Gas principal": "solarSystem.text.mainGas",
  "Segundo gas": "solarSystem.text.secondGas",
  "Gran Mancha Roja:": "solarSystem.text.greatRedSpot",
  "es una gigantesca tormenta que lleva siglos siendo observada.": "solarSystem.text.greatRedSpotText",
  "Los marcadores sobre el planeta te ayudan a localizar una zona clara, un cinturón oscuro y la Gran Mancha Roja.": "solarSystem.text.jupiterMarkersText",
  "GRAN MANCHA ROJA": "solarSystem.text.greatRedSpotMarker",
  "CINTURÓN OSCURO": "solarSystem.text.darkBeltMarker",
  "ZONA CLARA": "solarSystem.text.brightZoneMarker",

  "GIGANTE GASEOSO": "solarSystem.text.gasGiant",
  "Una atmósfera enorme": "solarSystem.text.hugeAtmosphere",
  "La atmósfera de Saturno está formada principalmente por hidrógeno y helio.": "solarSystem.text.saturnAtmosphere",
  "🌬️ Saturno posee potentes corrientes atmosféricas y enormes sistemas de tormentas.": "solarSystem.text.saturnWinds",

  "ATMÓSFERA FRÍA": "solarSystem.text.coldAtmosphere",
  "El metano le da color": "solarSystem.text.methaneColor",
  "La atmósfera de Urano está formada principalmente por hidrógeno y helio, con pequeñas cantidades de metano.": "solarSystem.text.uranusAtmosphere",
  "Metano": "solarSystem.text.methane",
  "🔵 El metano absorbe parte de la luz roja del Sol, ayudando a producir el característico color azul verdoso de Urano.": "solarSystem.text.uranusColor",
  "Urano es uno de los planetas más fríos del Sistema Solar.": "solarSystem.text.uranusCold",

  "ATMÓSFERA ACTIVA": "solarSystem.text.activeAtmosphere",
  "Vientos extraordinarios": "solarSystem.text.extraordinaryWinds",
  "La atmósfera de Neptuno está formada principalmente por hidrógeno y helio, junto con pequeñas cantidades de metano.": "solarSystem.text.neptuneAtmosphere",
  "💨 Neptuno posee los vientos más rápidos conocidos entre los planetas del Sistema Solar: pueden superar los": "solarSystem.text.neptuneWinds",

  "0 LUNAS": "solarSystem.text.zeroMoons",
  "Mercurio no tiene lunas": "solarSystem.text.mercuryNoMoonsTitle",
  "Mercurio no posee ningún satélite natural conocido. Junto con Venus, es uno de los dos únicos planetas del Sistema Solar que no tienen lunas.": "solarSystem.text.mercuryNoMoons",
  "☀️ Mercurio se encuentra muy cerca del Sol, donde la influencia gravitatoria solar es muy intensa. No conocemos ninguna luna que orbite de forma natural alrededor del planeta.": "solarSystem.text.mercuryNoMoonsGravity",
  "🔭 Cuando explores otros planetas descubrirás una enorme diferencia: mientras Mercurio tiene": "solarSystem.text.mercuryMoonCompareA",
  "algunos gigantes del Sistema Solar poseen decenas.": "solarSystem.text.mercuryMoonCompareB",
  "Venus no tiene lunas": "solarSystem.text.venusNoMoonsTitle",
  "Venus es uno de los dos planetas del Sistema Solar que no poseen satélites naturales. El otro es Mercurio.": "solarSystem.text.venusNoMoons",
  "1 LUNA": "solarSystem.text.oneMoon",
  "Nuestro satélite natural": "solarSystem.text.ourNaturalSatellite",
  "La Luna es el único satélite natural de la Tierra. Mientras nuestro planeta gira alrededor del Sol, la Luna viaja con nosotros orbitando la Tierra.": "solarSystem.text.moonEarth",
  "Distancia media": "solarSystem.text.averageDistance",
  "Órbita": "solarSystem.text.orbit",
  "Rotación": "solarSystem.text.rotation",
  "🌕 Observa la Luna girando alrededor de la Tierra. La animación está acelerada para que puedas apreciar fácilmente su órbita.": "solarSystem.text.moonOrbitHint",
  "¿Sabías que la Luna tarda aproximadamente lo mismo en girar sobre sí misma que en dar una vuelta alrededor de la Tierra? Por eso siempre vemos prácticamente la misma cara desde nuestro planeta.": "solarSystem.text.moonSameFace",
  "2 LUNAS": "solarSystem.text.twoMoons",
  "Fobos y Deimos": "solarSystem.text.phobosDeimos",
  "Marte tiene dos pequeños satélites naturales. Ambos son mucho más pequeños que nuestra Luna y poseen formas irregulares.": "solarSystem.text.marsMoons",
  "Diámetro aprox.": "solarSystem.text.approxDiameter",
  "Es la luna más grande y cercana a Marte. Se mueve alrededor del planeta mucho más rápido que Deimos.": "solarSystem.text.phobosText",
  "Es más pequeña y orbita mucho más lejos de Marte, por eso tarda más tiempo en completar una vuelta.": "solarSystem.text.deimosText",
  "🛰️ Observa las dos órbitas. Fobos es el satélite interior y se desplaza más deprisa; Deimos se encuentra más lejos y avanza más lentamente.": "solarSystem.text.marsMoonsObserve",
  "Los tamaños, las distancias y las velocidades de la animación están adaptados para facilitar la comparación y no representan la escala real.": "solarSystem.text.moonScaleNote",

  "LUNAS GALILEANAS": "solarSystem.text.galileanMoons",
  "Las lunas galileanas": "solarSystem.text.galileanTitle",
  "Júpiter tiene muchas lunas, pero cuatro destacan por su tamaño e importancia: Ío, Europa, Ganímedes y Calisto.": "solarSystem.text.jupiterMoons",
  "uno de los mundos con mayor actividad volcánica conocida.": "solarSystem.text.ioText",
  "bajo su superficie helada podría existir un enorme océano de agua líquida.": "solarSystem.text.europaText",
  "es la luna más grande del Sistema Solar.": "solarSystem.text.ganymedeText",
  "su superficie está cubierta por antiguos cráteres.": "solarSystem.text.callistoText",
  "OBSERVA:": "solarSystem.text.observe",
  "Galileo estudió estas cuatro lunas en 1610.": "solarSystem.text.galileoText",
  "Las distancias, tamaños y velocidades se han adaptado para poder observarlas mejor.": "solarSystem.text.adaptedMoons",

  "MUNDOS DE SATURNO": "solarSystem.text.saturnWorlds",
  "Titán y Encélado": "solarSystem.text.titanEnceladus",
  "Saturno posee muchas lunas. Dos de las más fascinantes son Titán y Encélado.": "solarSystem.text.saturnMoons",
  "es la luna más grande de Saturno y posee una atmósfera muy densa.": "solarSystem.text.titanText",
  "es un pequeño mundo helado que expulsa chorros de agua y hielo desde su región polar.": "solarSystem.text.enceladusText",

  "LUNAS DE URANO": "solarSystem.text.uranusMoonsBadge",
  "Titania y Miranda": "solarSystem.text.titaniaMiranda",
  "Urano posee numerosas lunas. Dos de las más conocidas son Titania y Miranda.": "solarSystem.text.uranusMoons",
  "es la luna más grande de Urano.": "solarSystem.text.titaniaText",
  "posee una superficie muy variada, con grandes acantilados y terrenos que parecen haber sido remodelados.": "solarSystem.text.mirandaText",

  "LUNAS DE NEPTUNO": "solarSystem.text.neptuneMoonsBadge",
  "Tritón es la luna más grande de Neptuno y uno de los mundos helados más interesantes del Sistema Solar.": "solarSystem.text.tritonText",
  "Órbita retrógrada:": "solarSystem.text.retrogradeOrbit",
  "Tritón orbita Neptuno en sentido contrario a la rotación del planeta. Esto hace pensar que pudo ser capturado por la gravedad de Neptuno.": "solarSystem.text.retrogradeText",
  "❄️ Su superficie es extremadamente fría y está cubierta por hielos.": "solarSystem.text.tritonCold",
  "El tamaño, la distancia y la velocidad están adaptados para facilitar su observación.": "solarSystem.text.adaptedSingleMoon",

  "FOBOS": "solarSystem.text.phobos",
  "DEIMOS": "solarSystem.text.deimos",
  "ÍO": "solarSystem.text.io",
  "GANÍMEDES": "solarSystem.text.ganymede",
  "CALISTO": "solarSystem.text.callisto",
  "TITÁN": "solarSystem.text.titan",
  "ENCÉLADO": "solarSystem.text.enceladus",
  "TRITÓN": "solarSystem.text.triton"
};

export default function LocalizedSolarSystem() {
  const rootRef = useRef(null);
  const { language, t } = useLanguage();

  const translations = useMemo(() => {
    const map = new Map();

    Object.entries(staticKeys).forEach(([spanish, key]) => {
      map.set(spanish, t(key, spanish));
    });

    planets.forEach((planet) => {
      const base = `planets.${planet.id}`;
      map.set(planet.name, t(`${base}.name`, planet.name));
      map.set(planet.description, t(`${base}.description`, planet.description));
      map.set(planet.fact, t(`${base}.fact`, planet.fact));
      map.set(planet.diameter, t(`${base}.diameter`, planet.diameter));
      map.set(planet.day, t(`${base}.day`, planet.day));
      map.set(planet.year, t(`${base}.year`, planet.year));
      map.set(planet.gravity, t(`${base}.gravity`, planet.gravity));
    });

    return map;
  }, [language, t]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const translateTextNode = (node) => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const original = node.__spaceExplorerOriginal ?? node.nodeValue;
      node.__spaceExplorerOriginal = original;

      const trimmed = original.trim();
      if (!trimmed) return;

      const normalized = trimmed.replace(/\s+/g, " ");
      const translated = translations.get(normalized);
      if (!translated) {
        node.nodeValue = original;
        return;
      }

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
      <SolarSystem />
    </div>
  );
}
