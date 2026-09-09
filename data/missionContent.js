export const missions = [
  { id: 1, icon: "🚀", title: "Rescate en el Sistema Solar", subtitle: "Recupera los datos de una sonda perdida.", meta: "5 retos · banco de 100" },
  { id: 2, icon: "🪐", title: "Identifica el planeta", subtitle: "Descubre mundos desconocidos a partir de pistas.", meta: "5 mundos · pistas" },
  { id: 3, icon: "🛰️", title: "Ruta de navegación", subtitle: "Reconstruye rutas correctas por el Sistema Solar.", meta: "5 de 10 rutas · navegación" },
  { id: 4, icon: "🌡️", title: "Mundos extremos", subtitle: "Elige el mejor destino para cada misión científica.", meta: "5 de 12 escenarios · decisión" },
  { id: 5, icon: "⭐", title: "Misión estelar", subtitle: "Investiga el Sol y descubre cómo funcionan las estrellas.", meta: "6 de 15 retos · estrellas" },
  { id: 6, icon: "🏆", title: "Desafío del explorador", subtitle: "Una expedición final que combina todo lo aprendido.", meta: "5 etapas · prueba final" },
];

export const identifyPlanets = [
  { answer: "Júpiter", options: ["Júpiter", "Saturno", "Neptuno"], clues: ["Soy el planeta más grande del Sistema Solar.", "Mi día dura menos de 10 horas.", "Tengo la Gran Mancha Roja."] },
  { answer: "Venus", options: ["Mercurio", "Venus", "Marte"], clues: ["Tengo un tamaño parecido al de la Tierra.", "Mi atmósfera es extremadamente densa.", "Soy el planeta más caliente."] },
  { answer: "Urano", options: ["Saturno", "Urano", "Neptuno"], clues: ["Soy un gigante helado azul verdoso.", "Mi año dura unos 84 años terrestres.", "Giro prácticamente tumbado."] },
  { answer: "Marte", options: ["Tierra", "Marte", "Mercurio"], clues: ["Mi día se parece al de la Tierra.", "Me llaman el planeta rojo.", "Tengo el volcán Olympus Mons."] },
  { answer: "Neptuno", options: ["Urano", "Neptuno", "Saturno"], clues: ["Soy un gigante helado.", "Mi año dura casi 165 años terrestres.", "Tengo vientos extraordinariamente rápidos."] },
  { answer: "Saturno", options: ["Júpiter", "Saturno", "Urano"], clues: ["Soy un gigante gaseoso.", "Mi año dura unos 29 años terrestres.", "Destaco por mis espectaculares anillos."] },
  { answer: "Mercurio", options: ["Mercurio", "Venus", "Marte"], clues: ["Soy un planeta rocoso pequeño.", "Mi año dura solo 88 días terrestres.", "Soy el planeta más cercano al Sol."] },
  { answer: "Tierra", options: ["Venus", "Tierra", "Marte"], clues: ["Mi día dura 24 horas.", "Tengo mucha agua líquida superficial.", "Soy el único mundo donde sabemos que existe vida."] },
];

export const routeChallenges = [
  { prompt: "Ordena los cuatro planetas interiores desde el Sol.", items: ["Marte", "Mercurio", "Tierra", "Venus"], answer: ["Mercurio", "Venus", "Tierra", "Marte"] },
  { prompt: "Ordena los cuatro planetas exteriores desde el Sol.", items: ["Neptuno", "Saturno", "Júpiter", "Urano"], answer: ["Júpiter", "Saturno", "Urano", "Neptuno"] },
  { prompt: "La sonda parte de Venus y viaja hacia fuera. Ordena sus destinos.", items: ["Júpiter", "Tierra", "Saturno", "Marte"], answer: ["Tierra", "Marte", "Júpiter", "Saturno"] },
  { prompt: "Regresamos desde Neptuno hacia el Sol. Ordena estos mundos.", items: ["Júpiter", "Urano", "Marte", "Saturno"], answer: ["Urano", "Saturno", "Júpiter", "Marte"] },
  { prompt: "Desde Mercurio viajamos hacia el exterior. Ordena estos destinos.", items: ["Urano", "Venus", "Júpiter", "Tierra"], answer: ["Venus", "Tierra", "Júpiter", "Urano"] },
  { prompt: "Desde Saturno regresamos hacia el Sol. Ordena los planetas.", items: ["Mercurio", "Marte", "Júpiter", "Tierra"], answer: ["Júpiter", "Marte", "Tierra", "Mercurio"] },
  { prompt: "Una nave sale de la Tierra hacia Neptuno. Ordena estas escalas.", items: ["Neptuno", "Júpiter", "Urano", "Saturno"], answer: ["Júpiter", "Saturno", "Urano", "Neptuno"] },
  { prompt: "Una sonda sale de Marte hacia el Sol. Ordena estos destinos.", items: ["Mercurio", "Tierra", "Venus"], answer: ["Tierra", "Venus", "Mercurio"] },
  { prompt: "Ordena estos planetas del más cercano al Sol al más lejano.", items: ["Neptuno", "Venus", "Saturno", "Marte"], answer: ["Venus", "Marte", "Saturno", "Neptuno"] },
  { prompt: "Ordena estos planetas del más lejano al Sol al más cercano.", items: ["Mercurio", "Urano", "Tierra", "Júpiter"], answer: ["Urano", "Júpiter", "Tierra", "Mercurio"] },
];

export const extremeWorlds = [
  ["Queremos estudiar los vientos más extremos. ¿Dónde enviamos la sonda?", ["Neptuno", "Marte", "Mercurio"], "Neptuno", "Neptuno presenta algunos de los vientos más rápidos del Sistema Solar."],
  ["Buscamos un efecto invernadero extremo. ¿Qué destino elegimos?", ["Venus", "Tierra", "Marte"], "Venus", "La densa atmósfera de Venus produce un efecto invernadero extremo."],
  ["Queremos estudiar Olympus Mons. ¿Dónde aterrizamos?", ["Marte", "Mercurio", "Venus"], "Marte", "Olympus Mons se encuentra en Marte."],
  ["Queremos observar un planeta que gira casi tumbado.", ["Urano", "Saturno", "Neptuno"], "Urano", "Urano tiene una inclinación axial extrema, de aproximadamente 98°."],
  ["Buscamos la Gran Mancha Roja.", ["Júpiter", "Saturno", "Neptuno"], "Júpiter", "La Gran Mancha Roja es una gigantesca tormenta de Júpiter."],
  ["Necesitamos estudiar el sistema de anillos más espectacular.", ["Saturno", "Marte", "Venus"], "Saturno", "Saturno destaca por sus extensos anillos de hielo y roca."],
  ["Queremos llegar al planeta más cercano al Sol.", ["Mercurio", "Venus", "Tierra"], "Mercurio", "Mercurio es el planeta más cercano al Sol."],
  ["La misión busca el planeta más grande.", ["Júpiter", "Saturno", "Tierra"], "Júpiter", "Júpiter es el planeta más grande del Sistema Solar."],
  ["Buscamos el mundo cuya superficie está cubierta aproximadamente en un 71% por agua.", ["Tierra", "Marte", "Venus"], "Tierra", "Aproximadamente el 71% de la superficie terrestre está cubierta por agua."],
  ["Buscamos un planeta con un día de casi 243 días terrestres.", ["Venus", "Mercurio", "Urano"], "Venus", "Venus gira muy lentamente: su día dura unos 243 días terrestres."],
  ["Queremos observar Tritón, una gran luna con órbita retrógrada.", ["Neptuno", "Urano", "Saturno"], "Neptuno", "Tritón es la mayor luna de Neptuno y orbita en sentido retrógrado."],
  ["Buscamos un planeta con dos pequeñas lunas llamadas Fobos y Deimos.", ["Marte", "Tierra", "Mercurio"], "Marte", "Fobos y Deimos son las dos pequeñas lunas de Marte."],
].map(([question, options, answer, explanation]) => ({ question, options, answer, explanation }));

export const starQuestions = [
  ["¿Qué es el Sol?", ["Una estrella", "Un planeta", "Una galaxia"], "Una estrella", "El Sol es la estrella de nuestro Sistema Solar."],
  ["¿Qué proceso produce la energía del Sol?", ["Fusión nuclear", "Combustión", "Electricidad"], "Fusión nuclear", "La fusión nuclear libera energía en el núcleo solar."],
  ["¿Qué elemento se fusiona principalmente para formar helio?", ["Hidrógeno", "Oxígeno", "Hierro"], "Hidrógeno", "El hidrógeno se fusiona para formar helio."],
  ["¿Qué temperatura aproximada alcanza el núcleo del Sol?", ["15 millones °C", "5.500 °C", "150.000 °C"], "15 millones °C", "El núcleo solar alcanza unos 15 millones de grados Celsius."],
  ["¿Por qué el Sol parece mayor que las otras estrellas?", ["Está mucho más cerca", "Es la mayor del Universo", "Las otras son planetas"], "Está mucho más cerca", "El Sol es la estrella más cercana a la Tierra."],
  ["¿De qué estado de la materia están formadas principalmente las estrellas?", ["Plasma", "Hielo", "Roca"], "Plasma", "Las estrellas están formadas principalmente por plasma."],
  ["¿Dónde nacen las estrellas?", ["En nebulosas", "En planetas", "En agujeros negros"], "En nebulosas", "Las estrellas nacen en grandes nubes de gas y polvo llamadas nebulosas."],
  ["¿Qué fuerza ayuda a concentrar el gas hasta formar una estrella?", ["Gravedad", "Magnetismo terrestre", "Viento solar"], "Gravedad", "La gravedad concentra el material de una nebulosa."],
  ["En general, ¿qué indica el color de una estrella?", ["Su temperatura superficial", "Su número de planetas", "Su distancia exacta"], "Su temperatura superficial", "El color aporta información sobre la temperatura superficial de una estrella."],
  ["¿Qué estrella suele tener una superficie más caliente?", ["Una azulada", "Una rojiza", "Todas igual"], "Una azulada", "Las estrellas azuladas tienen temperaturas superficiales mayores que las rojizas."],
  ["¿Son todas las estrellas del mismo tamaño?", ["No", "Sí", "Solo cambian de color"], "No", "Existen estrellas mucho más pequeñas y mucho más grandes que el Sol."],
  ["¿En qué se convertirá finalmente una estrella parecida al Sol?", ["En una enana blanca", "En un planeta", "En una luna"], "En una enana blanca", "Tras su fase de gigante roja, una estrella como el Sol termina dejando una enana blanca."],
  ["¿Qué puede ocurrir al final de la vida de una estrella muy masiva?", ["Puede explotar como supernova", "Se convierte en una luna", "Se apaga cada noche"], "Puede explotar como supernova", "Las estrellas suficientemente masivas pueden terminar en una supernova."],
  ["¿Qué mide un año luz?", ["Distancia", "Tiempo", "Temperatura"], "Distancia", "Un año luz es la distancia que recorre la luz en un año."],
  ["¿Cuál es la estrella más cercana al Sol?", ["Próxima Centauri", "Sirio", "Betelgeuse"], "Próxima Centauri", "Próxima Centauri está a unos 4,24 años luz del Sol."],
].map(([question, options, answer, explanation]) => ({ question, options, answer, explanation }));
