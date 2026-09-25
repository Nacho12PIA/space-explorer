"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useLanguage } from "../../i18n/LanguageContext";

const copy = {
  es: {
    eyebrow: "MÁS ALLÁ DE LOS PLANETAS GIGANTES",
    title: "Sistema Solar exterior",
    intro: "Neptuno ya queda muy lejos del Sol. Pero el Sistema Solar todavía continúa.",
    neptune: "NEPTUNO",
    pluto: "PLUTÓN",
    hint: "Gira la escena y toca Plutón para descubrir qué hay más allá de Neptuno.",
    plutoTitle: "Plutón · planeta enano",
    plutoText: "Plutón orbita más allá de Neptuno y forma parte de la región transneptuniana. Su órbita es más excéntrica e inclinada que las de los ocho planetas.",
    charon: "CARONTE",
    charonText: "Caronte es la mayor luna de Plutón. Ambos cuerpos giran alrededor de un punto común situado fuera de Plutón: parecen bailar juntos.",
    next: "Al seguir alejándote entrarás en el cinturón de Kuiper.",
    adapted: "Representación educativa: tamaños, distancias y velocidades están adaptados.",
    close: "Cerrar",
  },
  en: {
    eyebrow: "BEYOND THE GIANT PLANETS",
    title: "Outer Solar System",
    intro: "Neptune is already very far from the Sun. But the Solar System continues beyond it.",
    neptune: "NEPTUNE",
    pluto: "PLUTO",
    hint: "Rotate the scene and tap Pluto to discover what lies beyond Neptune.",
    plutoTitle: "Pluto · dwarf planet",
    plutoText: "Pluto orbits beyond Neptune and belongs to the trans-Neptunian region. Its orbit is more eccentric and inclined than those of the eight planets.",
    charon: "CHARON",
    charonText: "Charon is Pluto's largest moon. Both bodies orbit a common point located outside Pluto: they appear to dance together.",
    next: "Keep zooming out and you will enter the Kuiper Belt.",
    adapted: "Educational representation: sizes, distances and speeds are adapted.",
    close: "Close",
  },
};

function Orbit({ radius, color = "#64748b", opacity = 0.22, rotation = [Math.PI / 2, 0, 0], scale = [1, 1, 1] }) {
  return (
    <mesh rotation={rotation} scale={scale}>
      <torusGeometry args={[radius, 0.018, 8, 180]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

function PlutoSystem({ onSelect, text }) {
  const orbitRef = useRef();
  const plutoTexture = useLoader(THREE.TextureLoader, "/textures/2k_pluto.jpg");
  const charonTexture = useLoader(THREE.TextureLoader, "/textures/2k_charon.jpg");
  const plutoRef = useRef();
  const charonRef = useRef();

  useFrame((_, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.y += delta * 0.045;
    if (plutoRef.current) plutoRef.current.rotation.y += delta * 0.18;
    if (charonRef.current) charonRef.current.rotation.y += delta * 0.22;
  });

  return (
    <group ref={orbitRef} rotation={[0.22, 0.8, 0.28]}>
      <group position={[15.8, 0, 0]}>
        <group rotation={[0, 0, 0.08]}>
          <mesh ref={plutoRef} position={[-0.24, 0, 0]} onClick={(e) => { e.stopPropagation(); onSelect(); }}>
            <sphereGeometry args={[0.62, 48, 48]} />
            <meshStandardMaterial map={plutoTexture} roughness={0.94} metalness={0} />
          </mesh>
          <mesh ref={charonRef} position={[1.25, 0, 0]}>
            <sphereGeometry args={[0.31, 36, 36]} />
            <meshStandardMaterial map={charonTexture} roughness={0.98} metalness={0} />
          </mesh>
          <Orbit radius={0.76} opacity={0.16} />
        </group>
        <Html position={[0, 1.05, 0]} center distanceFactor={12} style={{ pointerEvents: "none" }}>
          <div style={{ padding: "4px 7px", borderRadius: 999, background: "rgba(4,10,25,.78)", border: "1px solid rgba(255,255,255,.14)", color: "white", fontSize: 9, fontWeight: 900, whiteSpace: "nowrap" }}>{text.pluto}</div>
        </Html>
      </group>
    </group>
  );
}

function Scene({ onSelect, text }) {
  const neptune = useRef();
  const neptuneTexture = useLoader(THREE.TextureLoader, "/textures/2k_neptune.jpg");
  const sunTexture = useLoader(THREE.TextureLoader, "/textures/2k_sun.jpg");
  useFrame((_, delta) => { if (neptune.current) neptune.current.rotation.y += delta * 0.1; });

  return (
    <>
      <ambientLight intensity={0.42} />
      <pointLight position={[0, 3, 0]} intensity={42} distance={60} color="#fff1c4" />
      <Stars radius={100} depth={55} count={3800} factor={3} fade speed={0.25} />

      <mesh>
        <sphereGeometry args={[0.72, 40, 40]} />
        <meshBasicMaterial map={sunTexture} color="#fff1b8" />
      </mesh>

      <Orbit radius={9.6} opacity={0.18} />
      <group position={[9.6, 0, 0]}>
        <mesh ref={neptune}>
          <sphereGeometry args={[0.72, 48, 48]} />
          <meshStandardMaterial map={neptuneTexture} roughness={0.8} metalness={0} />
        </mesh>
        <Html position={[0, 1.05, 0]} center distanceFactor={12} style={{ pointerEvents: "none" }}>
          <div style={{ color: "white", fontSize: 9, fontWeight: 900, opacity: 0.7 }}>{text.neptune}</div>
        </Html>
      </group>

      <Orbit radius={15.8} color="#b9a58f" opacity={0.25} rotation={[Math.PI / 2 + 0.28, 0, 0.22]} scale={[1.18, 1, 1]} />
      <PlutoSystem onSelect={onSelect} text={text} />

      <OrbitControls enablePan={false} minDistance={16} maxDistance={42} enableDamping dampingFactor={0.08} />
    </>
  );
}

export default function OuterSolarSystem() {
  const { language } = useLanguage();
  const text = copy[language] || copy.es;
  const [selected, setSelected] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", color: "white", background: "#01030a" }}>
      <Canvas camera={{ position: [0, 13, 25], fov: 46 }}>
        <Scene onSelect={() => setSelected(true)} text={text} />
      </Canvas>

      <div style={{ position: "absolute", top: 88, left: 18, right: 18, zIndex: 10, pointerEvents: "none" }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ fontSize: 10, letterSpacing: 2.1, fontWeight: 900, opacity: 0.52 }}>{text.eyebrow}</div>
          <h1 style={{ margin: "5px 0 5px", fontSize: "clamp(28px,7vw,45px)" }}>{text.title}</h1>
          <p style={{ margin: 0, maxWidth: 510, fontSize: "clamp(12px,3vw,15px)", lineHeight: 1.45, opacity: 0.7 }}>{text.intro}</p>
        </div>
      </div>

      <div style={{ position: "absolute", left: 18, right: 18, bottom: 78, zIndex: 10, pointerEvents: "none" }}>
        <div style={{ maxWidth: 440, padding: "9px 11px", borderRadius: 15, background: "rgba(4,10,25,.72)", border: "1px solid rgba(255,255,255,.09)", backdropFilter: "blur(10px)", fontSize: 10, lineHeight: 1.4, opacity: 0.8 }}>
          🛰️ {text.hint}<br /><span style={{ opacity: 0.65 }}>⚖️ {text.adapted}</span>
        </div>
      </div>

      {selected && (
        <div onClick={() => setSelected(false)} style={{ position: "fixed", inset: 0, zIndex: 7000, display: "grid", placeItems: "end center", padding: 16, background: "rgba(1,3,10,.62)", backdropFilter: "blur(5px)" }}>
          <article onClick={(e) => e.stopPropagation()} style={{ width: "min(520px,100%)", padding: 20, borderRadius: 24, background: "rgba(7,14,32,.98)", border: "1px solid rgba(125,211,252,.20)", boxShadow: "0 24px 80px rgba(0,0,0,.5)" }}>
            <div style={{ fontSize: 10, letterSpacing: 1.8, fontWeight: 900, color: "#c4b5fd" }}>{text.plutoTitle.toUpperCase()}</div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <h2 style={{ margin: "6px 0 10px", fontSize: 31 }}>Plutón + Caronte</h2>
              <button onClick={() => setSelected(false)} aria-label={text.close} style={{ border: 0, width: 36, height: 36, flexShrink: 0, borderRadius: 999, color: "white", background: "rgba(255,255,255,.08)", fontSize: 19 }}>×</button>
            </div>
            <p style={{ margin: "0 0 14px", lineHeight: 1.55, opacity: 0.78 }}>{text.plutoText}</p>
            <div style={{ padding: 13, borderRadius: 15, background: "rgba(139,92,246,.09)", border: "1px solid rgba(167,139,250,.16)" }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: "#c4b5fd", marginBottom: 5 }}>🌕 {text.charon}</div>
              <div style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.76 }}>{text.charonText}</div>
            </div>
            <div style={{ marginTop: 13, fontSize: 11, lineHeight: 1.45, opacity: 0.52 }}>→ {text.next}</div>
          </article>
        </div>
      )}
    </div>
  );
}
