"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useLanguage } from "../../i18n/LanguageContext";

const bodies = [
  { id: "ceres", name: "Ceres", kind: "dwarf", radius: 0.72, orbit: 8.4, speed: 0.055, color: "#a8a39a", diameter: "≈ 940 km" },
  { id: "vesta", name: "Vesta", kind: "asteroid", radius: 0.50, orbit: 7.1, speed: 0.066, color: "#b8a18b", diameter: "≈ 525 km" },
  { id: "pallas", name: "Pallas", kind: "asteroid", radius: 0.45, orbit: 9.5, speed: 0.048, color: "#85827c", diameter: "≈ 510 km" },
  { id: "hygiea", name: "Hygiea", kind: "asteroid", radius: 0.39, orbit: 10.6, speed: 0.043, color: "#77736c", diameter: "≈ 430 km" },
];

const copy = {
  es: {
    eyebrow: "ENTRE MARTE Y JÚPITER",
    title: "Cinturón de asteroides",
    intro: "No es una muralla de rocas. Es una región enorme y, sobre todo, casi vacía.",
    sparse: "Los objetos están mucho más separados de lo que parecen aquí. Los tamaños y distancias se han adaptado para poder explorarlos.",
    emptyTitle: "EL DESCUBRIMIENTO IMPORTANTE",
    emptyText: "En el cinturón real, una nave no tendría que esquivar rocas continuamente. Incluso entre asteroides grandes puede haber distancias enormes.",
    originTitle: "¿POR QUÉ HAY UN CINTURÓN?",
    originText: "Son restos de la formación temprana del Sistema Solar. La influencia gravitatoria de Júpiter dificultó que gran parte de este material terminara formando un planeta.",
    select: "Toca un objeto destacado para investigarlo",
    dwarf: "PLANETA ENANO",
    asteroid: "ASTEROIDE",
    close: "Cerrar",
    diameter: "Diámetro aprox.",
    ceres: "Ceres es el objeto más grande del cinturón principal y el único planeta enano del Sistema Solar interior. La misión Dawn llegó hasta él en 2015.",
    vesta: "Vesta es uno de los cuerpos más grandes del cinturón. Dawn lo orbitó antes de viajar hacia Ceres.",
    pallas: "Pallas es uno de los grandes asteroides del cinturón principal y posee una órbita notablemente inclinada.",
    hygiea: "Hygiea es uno de los mayores objetos del cinturón principal y pertenece a una gran familia de asteroides.",
    classification: "¿POR QUÉ NO SON TODOS IGUALES?",
    classificationText: "«Asteroide» describe muchos cuerpos pequeños que orbitan el Sol. Ceres, además, cumple los criterios para ser clasificado como planeta enano.",
    route: "MARTE  →  CINTURÓN DE ASTEROIDES  →  JÚPITER",
    mars: "MARTE",
    jupiter: "JÚPITER",
    belt: "CINTURÓN",
    routeHint: "Has salido de la órbita de Marte. Antes de llegar a Júpiter, atraviesas la región del cinturón principal.",
  },
  en: {
    eyebrow: "BETWEEN MARS AND JUPITER",
    title: "Asteroid Belt",
    intro: "It is not a wall of rocks. It is an enormous region and, above all, mostly empty.",
    sparse: "Objects are far more separated than they appear here. Sizes and distances are adapted so they can be explored.",
    emptyTitle: "THE IMPORTANT DISCOVERY",
    emptyText: "In the real belt, a spacecraft would not need to dodge rocks continuously. Even large asteroids can be separated by enormous distances.",
    originTitle: "WHY IS THERE A BELT?",
    originText: "These are remnants of the early formation of the Solar System. Jupiter's gravitational influence made it difficult for much of this material to finish forming a planet.",
    select: "Tap a highlighted object to investigate it",
    dwarf: "DWARF PLANET",
    asteroid: "ASTEROID",
    close: "Close",
    diameter: "Approx. diameter",
    ceres: "Ceres is the largest object in the main belt and the only dwarf planet in the inner Solar System. The Dawn mission reached it in 2015.",
    vesta: "Vesta is one of the largest bodies in the belt. Dawn orbited it before travelling on to Ceres.",
    pallas: "Pallas is one of the large asteroids of the main belt and has a notably inclined orbit.",
    hygiea: "Hygiea is one of the largest objects in the main belt and belongs to a large asteroid family.",
    classification: "WHY AREN'T THEY ALL THE SAME?",
    classificationText: "“Asteroid” describes many small bodies orbiting the Sun. Ceres also meets the criteria to be classified as a dwarf planet.",
    route: "MARS  →  ASTEROID BELT  →  JUPITER",
    mars: "MARS",
    jupiter: "JUPITER",
    belt: "BELT",
    routeHint: "You have travelled beyond Mars. Before reaching Jupiter, you cross the region of the main asteroid belt.",
  },
};

function OrbitLine({ radius }) {
  const points = useMemo(() => {
    const vertices = [];
    for (let i = 0; i <= 96; i += 1) {
      const a = (i / 96) * Math.PI * 2;
      vertices.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return vertices;
  }, [radius]);
  return <line geometry={new THREE.BufferGeometry().setFromPoints(points)}><lineBasicMaterial color="#64748b" transparent opacity={0.16} /></line>;
}

function BeltParticles() {
  const ref = useRef();
  const count = 1150;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 6.2 + Math.random() * 5.3;
      const thickness = (Math.random() - 0.5) * 0.8;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = thickness;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, []);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.012; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.045} color="#b8aa96" transparent opacity={0.58} sizeAttenuation />
    </points>
  );
}

function MajorBody({ body, onSelect }) {
  const ref = useRef();
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const a = phase + clock.elapsedTime * body.speed;
    ref.current.position.set(Math.cos(a) * body.orbit, body.id === "pallas" ? Math.sin(a) * 0.55 : 0, Math.sin(a) * body.orbit);
    ref.current.rotation.y += 0.006;
  });
  return (
    <group ref={ref}>
      <mesh onClick={(e) => { e.stopPropagation(); onSelect(body); }}>
        <icosahedronGeometry args={[body.radius, 2]} />
        <meshStandardMaterial color={body.color} roughness={0.92} />
      </mesh>
      <mesh scale={1.45} onClick={(e) => { e.stopPropagation(); onSelect(body); }}>
        <sphereGeometry args={[body.radius, 16, 16]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.055} />
      </mesh>
    </group>
  );
}

function BeltScene({ onSelect }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 3, 0]} intensity={55} distance={45} color="#fff2c2" />
      <Stars radius={75} depth={35} count={1800} factor={2} fade speed={0.25} />
      <mesh><sphereGeometry args={[1.15, 32, 32]} /><meshBasicMaterial color="#fbbf24" /></mesh>
      <OrbitLine radius={4.8} />
      <OrbitLine radius={12.7} />
      <mesh position={[4.8, 0, 0]}>
        <sphereGeometry args={[0.34, 20, 20]} />
        <meshStandardMaterial color="#c65f45" roughness={0.9} />
      </mesh>
      <mesh position={[-12.7, 0, 0]}>
        <sphereGeometry args={[0.82, 24, 24]} />
        <meshStandardMaterial color="#d7b58a" roughness={0.8} />
      </mesh>
      <BeltParticles />
      {bodies.map((body) => <MajorBody key={body.id} body={body} onSelect={onSelect} />)}
      <OrbitControls enablePan={false} minDistance={13} maxDistance={32} autoRotate autoRotateSpeed={0.18} />
    </>
  );
}

export default function AsteroidBelt() {
  const { language } = useLanguage();
  const text = copy[language] || copy.es;
  const [selected, setSelected] = useState(null);
  const [showLesson, setShowLesson] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", color: "white", background: "#01030a" }}>
      <Canvas camera={{ position: [0, 13, 18], fov: 48 }}>
        <BeltScene onSelect={setSelected} />
      </Canvas>

      <div style={{ position: "absolute", top: 88, left: 18, right: 18, zIndex: 10, pointerEvents: "none" }}>
        <div style={{ maxWidth: 580 }}>
          <div style={{ fontSize: 10, letterSpacing: 2.2, fontWeight: 900, opacity: 0.52 }}>{text.eyebrow}</div>
          <h1 style={{ margin: "5px 0 5px", fontSize: "clamp(27px, 7vw, 46px)" }}>{text.title}</h1>
          <p style={{ margin: 0, maxWidth: 500, fontSize: "clamp(12px, 3vw, 15px)", lineHeight: 1.45, opacity: 0.72 }}>{text.intro}</p>
          <div style={{ marginTop: 10, display: "inline-flex", padding: "7px 10px", borderRadius: 999, background: "rgba(4,10,25,0.72)", border: "1px solid rgba(255,255,255,0.10)", fontSize: 9, fontWeight: 900, letterSpacing: 0.6, opacity: 0.82 }}>
            {text.route}
          </div>
          <p style={{ margin: "8px 0 0", maxWidth: 470, fontSize: 10, lineHeight: 1.4, opacity: 0.52 }}>{text.routeHint}</p>
        </div>
      </div>

      <div style={{ position: "absolute", left: 18, right: 18, bottom: 76, zIndex: 10, display: "flex", gap: 8, alignItems: "flex-end", justifyContent: "space-between", pointerEvents: "none" }}>
        <div style={{ maxWidth: 440, padding: "10px 12px", borderRadius: 15, background: "rgba(4,10,25,0.74)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(10px)", fontSize: 11, lineHeight: 1.45, opacity: 0.86 }}>
          ⚖️ {text.sparse}
        </div>
        <button onClick={() => setShowLesson(true)} style={{ pointerEvents: "auto", flexShrink: 0, border: "1px solid rgba(125,211,252,0.28)", borderRadius: 999, padding: "10px 12px", color: "white", background: "rgba(4,10,25,0.82)", fontWeight: 900, cursor: "pointer" }}>?</button>
      </div>

      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, zIndex: 7000, display: "grid", placeItems: "end center", padding: 16, background: "rgba(1,3,10,0.54)" }}>
          <article onClick={(e) => e.stopPropagation()} style={{ width: "min(520px,100%)", padding: 20, borderRadius: 24, background: "rgba(7,14,32,0.98)", border: "1px solid rgba(125,211,252,0.20)", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
            <div style={{ fontSize: 10, letterSpacing: 1.8, fontWeight: 900, opacity: 0.55 }}>{selected.kind === "dwarf" ? text.dwarf : text.asteroid}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12 }}>
              <h2 style={{ margin: "5px 0 10px", fontSize: 32 }}>{selected.name}</h2>
              <button onClick={() => setSelected(null)} aria-label={text.close} style={{ border: 0, width: 36, height: 36, borderRadius: 999, color: "white", background: "rgba(255,255,255,0.08)", fontSize: 19 }}>×</button>
            </div>
            <div style={{ fontSize: 12, opacity: 0.55, marginBottom: 9 }}>{text.diameter}: {selected.diameter}</div>
            <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.78 }}>{text[selected.id]}</p>
          </article>
        </div>
      )}

      {showLesson && (
        <div onClick={() => setShowLesson(false)} style={{ position: "fixed", inset: 0, zIndex: 7000, display: "grid", placeItems: "center", padding: 18, background: "rgba(1,3,10,0.76)", backdropFilter: "blur(6px)" }}>
          <article onClick={(e) => e.stopPropagation()} style={{ width: "min(600px,100%)", padding: 22, borderRadius: 24, background: "rgba(7,14,32,0.98)", border: "1px solid rgba(125,211,252,0.20)" }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 20 }}>{text.emptyTitle}</h2>
            <p style={{ margin: "0 0 18px", lineHeight: 1.55, opacity: 0.75 }}>{text.emptyText}</p>
            <h3 style={{ margin: "0 0 7px", fontSize: 14 }}>{text.originTitle}</h3>
            <p style={{ margin: "0 0 18px", lineHeight: 1.55, opacity: 0.75 }}>{text.originText}</p>
            <h3 style={{ margin: "0 0 7px", fontSize: 14 }}>{text.classification}</h3>
            <p style={{ margin: 0, lineHeight: 1.55, opacity: 0.75 }}>{text.classificationText}</p>
            <button onClick={() => setShowLesson(false)} style={{ marginTop: 18, width: "100%", border: 0, borderRadius: 14, padding: 12, color: "white", background: "rgba(56,189,248,0.18)", fontWeight: 900 }}>{text.close}</button>
          </article>
        </div>
      )}
    </div>
  );
}
