const questions = [];

function add(question, options, answer, explanation) {
  questions.push({
    id: questions.length + 1,
    question,
    options,
    answer,
    explanation,
  });
}

const base = [
  ["¿Qué planeta está más cerca del Sol?", ["Mercurio", "Venus", "Marte"], "Mercurio", "Mercurio es el planeta más cercano al Sol."],
  ["¿Cuál es el planeta más caliente del Sistema Solar?", ["Mercurio", "Venus", "Júpiter"], "Venus", "Venus es el planeta más caliente por su atmósfera muy densa y su intenso efecto invernadero."],
  ["¿Qué planeta tiene aproximadamente el 71% de su superficie cubierta por agua?", ["Tierra", "Marte", "Urano"], "Tierra", "Aproximadamente el 71% de la superficie terrestre está cubierta por agua."],
  ["¿En qué planeta se encuentra Olympus Mons?", ["Marte", "Mercurio", "Venus"], "Marte", "Olympus Mons es un enorme volcán situado en Marte."],
  ["¿Qué planeta tiene la Gran Mancha Roja?", ["Júpiter", "Saturno", "Neptuno"], "Júpiter", "La Gran Mancha Roja es una gigantesca tormenta de Júpiter."],
  ["¿Qué planeta destaca por sus espectaculares anillos de hielo y roca?", ["Saturno", "Urano", "Júpiter"], "Saturno", "Saturno posee un sistema de anillos formado principalmente por hielo y roca."],
  ["¿Qué planeta gira prácticamente tumbado sobre uno de sus lados?", ["Urano", "Neptuno", "Saturno"], "Urano", "Urano presenta una inclinación extrema y gira casi tumbado."],
  ["¿En qué planeta se producen algunos de los vientos más rápidos del Sistema Solar?", ["Neptuno", "Marte", "Venus"], "Neptuno", "Neptuno presenta algunos de los vientos más rápidos del Sistema Solar."],
];
base.forEach((item) => add(...item));

const planetData = [
  ["Mercurio", "4.879 km", "59 días terrestres", "88 días terrestres", "38% de la terrestre"],
  ["Venus", "12.104 km", "243 días terrestres", "225 días terrestres", "90% de la terrestre"],
  ["Tierra", "12.742 km", "24 horas", "365,25 días", "9,81 m/s²"],
  ["Marte", "6.779 km", "24 h 37 min", "687 días terrestres", "38% de la terrestre"],
  ["Júpiter", "139.820 km", "9 h 56 min", "11,86 años terrestres", "2,5 veces la terrestre"],
  ["Saturno", "116.460 km", "10 h 42 min", "29,45 años terrestres", "similar a la terrestre"],
  ["Urano", "50.724 km", "17 h 14 min", "84 años terrestres", "89% de la terrestre"],
  ["Neptuno", "49.244 km", "16 h 6 min", "164,8 años terrestres", "14% superior a la terrestre"],
];

const names = planetData.map(([name]) => name);
planetData.forEach(([name, diameter, day, year, gravity], index) => {
  const distractor1 = names[(index + 2) % names.length];
  const distractor2 = names[(index + 5) % names.length];

  add(
    `¿Qué planeta tiene un diámetro aproximado de ${diameter}?`,
    [name, distractor1, distractor2],
    name,
    `${name} tiene un diámetro aproximado de ${diameter}.`
  );

  add(
    `¿En qué planeta dura el día aproximadamente ${day}?`,
    [distractor1, name, distractor2],
    name,
    `En ${name}, un día dura aproximadamente ${day}.`
  );

  add(
    `¿En qué planeta dura el año aproximadamente ${year}?`,
    [distractor2, distractor1, name],
    name,
    `${name} tarda aproximadamente ${year} en completar una órbita alrededor del Sol.`
  );

  add(
    `¿Qué planeta tiene una gravedad aproximada de ${gravity}?`,
    [name, distractor2, distractor1],
    name,
    `En ${name}, la gravedad es aproximadamente ${gravity}.`
  );
});

const comparisons = [
  ["¿Cuál de estos planetas tiene el año más corto?", ["Mercurio", "Tierra", "Marte"], "Mercurio", "Mercurio tarda solo 88 días terrestres en completar su órbita."],
  ["¿Cuál de estos planetas tiene el año más largo?", ["Neptuno", "Urano", "Saturno"], "Neptuno", "Neptuno tarda unos 164,8 años terrestres en completar su órbita."],
  ["¿Cuál de estos planetas tiene el día más largo?", ["Venus", "Mercurio", "Tierra"], "Venus", "Un día en Venus dura aproximadamente 243 días terrestres."],
  ["¿Qué planeta tiene un día más parecido al de la Tierra?", ["Marte", "Venus", "Mercurio"], "Marte", "El día marciano dura unas 24 h 37 min."],
  ["¿Cuál de estos planetas es mayor en diámetro?", ["Júpiter", "Saturno", "Urano"], "Júpiter", "Júpiter es el planeta más grande del Sistema Solar."],
  ["¿Cuál de estos planetas es menor en diámetro?", ["Mercurio", "Marte", "Venus"], "Mercurio", "Mercurio es el planeta más pequeño de esos tres."],
  ["¿Cuál es mayor: la Tierra o Venus?", ["Tierra", "Venus", "Tienen exactamente el mismo diámetro"], "Tierra", "La Tierra mide unos 12.742 km y Venus unos 12.104 km de diámetro."],
  ["¿Cuál es mayor: Urano o Neptuno?", ["Urano", "Neptuno", "Tienen exactamente el mismo diámetro"], "Urano", "Urano tiene un diámetro ligeramente mayor que Neptuno."],
  ["¿Qué planeta completa antes una órbita alrededor del Sol?", ["Tierra", "Venus", "Marte"], "Venus", "Venus tarda unos 225 días, menos que la Tierra y Marte."],
  ["¿Qué planeta tarda más en completar una órbita?", ["Júpiter", "Saturno", "Urano"], "Urano", "Urano tarda unos 84 años terrestres."],
  ["¿Cuál gira más rápido sobre sí mismo?", ["Júpiter", "Tierra", "Urano"], "Júpiter", "Júpiter tiene un día de solo 9 h 56 min."],
  ["¿Cuál gira más lentamente sobre sí mismo?", ["Venus", "Mercurio", "Marte"], "Venus", "Venus tiene un día extremadamente largo."],
  ["Una sonda busca un mundo con un día de unas 17 horas. ¿Cuál debe visitar?", ["Urano", "Neptuno", "Saturno"], "Urano", "El día de Urano dura unas 17 h 14 min."],
  ["Una sonda busca un mundo con un día de unas 16 horas. ¿Cuál debe visitar?", ["Neptuno", "Urano", "Júpiter"], "Neptuno", "El día de Neptuno dura unas 16 h 6 min."],
  ["Una sonda busca un planeta cuyo año dure unos 29 años terrestres. ¿Cuál es?", ["Saturno", "Júpiter", "Urano"], "Saturno", "Saturno tarda unos 29,45 años terrestres en completar su órbita."],
];
comparisons.forEach((item) => add(...item));

const sun = [
  ["¿Qué tipo de astro es el Sol?", ["Una estrella", "Un planeta", "Una luna"], "Una estrella", "El Sol es una estrella."],
  ["¿Cuál es el diámetro aproximado del Sol?", ["1,39 millones de km", "139.820 km", "12.742 km"], "1,39 millones de km", "El diámetro del Sol es de aproximadamente 1,39 millones de kilómetros."],
  ["¿Qué edad aproximada tiene el Sol?", ["4.600 millones de años", "460 millones de años", "46.000 millones de años"], "4.600 millones de años", "El Sol tiene aproximadamente 4.600 millones de años."],
  ["¿Qué temperatura aproximada tiene la superficie visible del Sol?", ["5.500 °C", "550 °C", "15 millones °C"], "5.500 °C", "La superficie visible del Sol está en torno a 5.500 °C."],
  ["¿Qué temperatura aproximada alcanza el núcleo del Sol?", ["15 millones °C", "5.500 °C", "150.000 °C"], "15 millones °C", "El núcleo solar alcanza aproximadamente 15 millones de grados Celsius."],
  ["¿Qué proceso produce la energía del Sol?", ["Fusión nuclear", "Combustión", "Electricidad"], "Fusión nuclear", "El Sol obtiene su energía mediante fusión nuclear."],
  ["En la fusión del Sol, ¿qué elemento se transforma principalmente en helio?", ["Hidrógeno", "Oxígeno", "Hierro"], "Hidrógeno", "En el núcleo solar, el hidrógeno se fusiona para formar helio."],
  ["¿En qué estado se encuentra gran parte de la materia del Sol?", ["Plasma", "Hielo", "Roca sólida"], "Plasma", "El Sol está formado principalmente por plasma."],
  ["¿Qué mantiene a los planetas orbitando alrededor del Sol?", ["La gravedad", "El viento solar", "Los anillos"], "La gravedad", "La gravedad del Sol mantiene a los planetas en sus órbitas."],
  ["¿Por qué el Sol se ve mucho más grande que las demás estrellas del cielo?", ["Porque está muchísimo más cerca", "Porque es la estrella más grande del Universo", "Porque las demás estrellas son planetas"], "Porque está muchísimo más cerca", "El Sol se ve grande porque es la estrella más cercana a la Tierra."],
  ["Las estrellas del fondo de EXPLORA, ¿representan sus posiciones reales?", ["No, son decorativas", "Sí, todas están en su posición exacta", "Solo las más brillantes"], "No, son decorativas", "En EXPLORA, el fondo de estrellas es decorativo."],
  ["¿Dónde ocurre la fusión nuclear que alimenta al Sol?", ["En el núcleo", "En los anillos", "En la superficie de la Tierra"], "En el núcleo", "La fusión nuclear tiene lugar en el núcleo del Sol."],
];
sun.forEach((item) => add(...item));

const general = [
  ["¿Cuántos planetas principales hay en el Sistema Solar?", ["8", "7", "9"], "8", "El Sistema Solar tiene ocho planetas principales."],
  ["¿Cuál es el orden correcto de los cuatro primeros planetas desde el Sol?", ["Mercurio, Venus, Tierra, Marte", "Venus, Mercurio, Marte, Tierra", "Mercurio, Tierra, Venus, Marte"], "Mercurio, Venus, Tierra, Marte", "Desde el Sol: Mercurio, Venus, Tierra y Marte."],
  ["¿Cuál es el orden correcto de los cuatro planetas exteriores?", ["Júpiter, Saturno, Urano, Neptuno", "Saturno, Júpiter, Neptuno, Urano", "Urano, Saturno, Júpiter, Neptuno"], "Júpiter, Saturno, Urano, Neptuno", "Los cuatro exteriores son Júpiter, Saturno, Urano y Neptuno."],
  ["¿Qué planeta está inmediatamente después de la Tierra al alejarnos del Sol?", ["Marte", "Venus", "Júpiter"], "Marte", "Marte es el siguiente planeta después de la Tierra."],
  ["¿Qué planeta está inmediatamente antes de la Tierra al alejarnos del Sol?", ["Venus", "Marte", "Mercurio"], "Venus", "Venus está entre Mercurio y la Tierra."],
  ["¿Qué planeta está inmediatamente después de Júpiter?", ["Saturno", "Urano", "Marte"], "Saturno", "Saturno es el siguiente planeta después de Júpiter."],
  ["¿Qué planeta está inmediatamente antes de Neptuno?", ["Urano", "Saturno", "Júpiter"], "Urano", "Urano está justo antes de Neptuno."],
  ["¿Cuál es el planeta más lejano del Sol?", ["Neptuno", "Urano", "Saturno"], "Neptuno", "Neptuno es el planeta más lejano del Sol."],
  ["¿Cuál es el planeta más grande del Sistema Solar?", ["Júpiter", "Saturno", "Neptuno"], "Júpiter", "Júpiter es el planeta más grande."],
  ["¿Cuál de estos planetas es conocido como el planeta rojo?", ["Marte", "Venus", "Mercurio"], "Marte", "Marte es conocido como el planeta rojo."],
  ["¿Qué dos planetas tienen una gravedad aproximada del 38% de la terrestre?", ["Mercurio y Marte", "Venus y Urano", "Saturno y Neptuno"], "Mercurio y Marte", "Mercurio y Marte tienen una gravedad cercana al 38% de la terrestre."],
  ["¿Qué planeta es nuestro hogar?", ["Tierra", "Venus", "Marte"], "Tierra", "La Tierra es nuestro planeta."],
];
general.forEach((item) => add(...item));

const applied = [
  ["Si quisieras observar una enorme tormenta llamada Gran Mancha Roja, ¿a qué planeta viajarías?", ["Júpiter", "Saturno", "Neptuno"], "Júpiter", "La Gran Mancha Roja se encuentra en Júpiter."],
  ["Si una misión quiere estudiar anillos formados principalmente por hielo y roca, ¿qué destino escogería?", ["Saturno", "Marte", "Venus"], "Saturno", "Los anillos de Saturno están formados principalmente por hielo y roca."],
  ["Si una nave quiere estudiar una atmósfera extremadamente densa y un calor intenso, ¿qué planeta es el mejor candidato?", ["Venus", "Mercurio", "Marte"], "Venus", "Venus posee una atmósfera muy densa y es el planeta más caliente."],
  ["Si una misión busca estudiar vientos extremadamente rápidos, ¿qué planeta debería visitar?", ["Neptuno", "Tierra", "Mercurio"], "Neptuno", "Neptuno alberga algunos de los vientos más rápidos del Sistema Solar."],
  ["Si buscas un planeta que parezca girar de lado, ¿cuál escogerías?", ["Urano", "Saturno", "Júpiter"], "Urano", "Urano gira prácticamente tumbado."],
  ["Si una misión quiere estudiar Olympus Mons, ¿qué planeta debe visitar?", ["Marte", "Venus", "Mercurio"], "Marte", "Olympus Mons está en Marte."],
  ["Una nave quiere observar una vuelta completa al Sol lo antes posible. ¿Qué planeta elige?", ["Mercurio", "Venus", "Tierra"], "Mercurio", "Mercurio completa una órbita en solo 88 días terrestres."],
  ["Una nave compara Júpiter y Saturno. ¿Cuál tiene el día más corto?", ["Júpiter", "Saturno", "Duran lo mismo"], "Júpiter", "Júpiter tiene un día de 9 h 56 min."],
  ["Una nave compara Urano y Neptuno. ¿Cuál tarda más en dar una vuelta al Sol?", ["Neptuno", "Urano", "Tardan lo mismo"], "Neptuno", "Neptuno tarda unos 164,8 años terrestres."],
  ["¿Qué planeta combina un año de 687 días y un día de unas 24 h 37 min?", ["Marte", "Tierra", "Venus"], "Marte", "Esos valores corresponden a Marte."],
  ["¿Qué planeta combina un diámetro de 116.460 km y un año de 29,45 años terrestres?", ["Saturno", "Júpiter", "Urano"], "Saturno", "Ambos datos corresponden a Saturno."],
  ["¿Qué planeta combina un diámetro de 50.724 km, un año de 84 años y una inclinación extrema?", ["Urano", "Neptuno", "Saturno"], "Urano", "Esos rasgos corresponden a Urano."],
  ["Si un astronauta busca una gravedad parecida a la terrestre entre estos tres, ¿qué planeta encaja mejor según EXPLORA?", ["Saturno", "Mercurio", "Marte"], "Saturno", "En EXPLORA, Saturno aparece con una gravedad similar a la terrestre."],
  ["¿Qué planeta tiene una gravedad algo mayor que la terrestre y está más allá de Urano?", ["Neptuno", "Saturno", "Júpiter"], "Neptuno", "Neptuno tiene una gravedad aproximadamente un 14% superior a la terrestre."],
  ["Si buscas un planeta cuyo año sea más corto que el terrestre pero cuyo día sea muchísimo más largo, ¿cuál es?", ["Venus", "Mercurio", "Marte"], "Venus", "Venus tarda 225 días en orbitar el Sol, pero su día dura unos 243 días terrestres."],
  ["¿Qué planeta tiene un tamaño parecido a la Tierra y además es el más caliente?", ["Venus", "Marte", "Mercurio"], "Venus", "Venus tiene un diámetro parecido al terrestre y es el planeta más caliente."],
  ["¿Qué planeta es enorme, gira muy rápido y tiene una gigantesca tormenta visible?", ["Júpiter", "Saturno", "Urano"], "Júpiter", "Júpiter es el mayor planeta, gira muy rápido y posee la Gran Mancha Roja."],
  ["¿Qué planeta está más lejos del Sol entre Saturno, Urano y Neptuno?", ["Neptuno", "Urano", "Saturno"], "Neptuno", "Neptuno es el más lejano de los tres."],
  ["¿Qué planeta tiene un año más largo que Saturno pero más corto que Neptuno?", ["Urano", "Júpiter", "Marte"], "Urano", "Urano tarda unos 84 años terrestres, entre Saturno y Neptuno."],
  ["Si quisieras comparar dos mundos con una gravedad cercana al 38% de la terrestre, ¿qué pareja escogerías?", ["Mercurio y Marte", "Venus y Tierra", "Urano y Neptuno"], "Mercurio y Marte", "Mercurio y Marte tienen una gravedad aproximada del 38% de la terrestre."],
  ["¿Qué planeta combina color azul verdoso, gran inclinación y un día de unas 17 horas?", ["Urano", "Neptuno", "Saturno"], "Urano", "Urano es azul verdoso, gira casi tumbado y su día dura unas 17 h 14 min."],
];
applied.forEach((item) => add(...item));

export const missionQuestions = questions;
