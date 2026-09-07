"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import { planets } from "../data/planets";

function Planet({ planet, index, onSelect }) {
  const group = useRef();

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += planet.speed * 0.01;
    }
  });

  const startingAngle = (index / planets.length) * Math.PI * 2;

  return (
    <group ref={group} rotation={[0, startingAngle, 0]}>
      <mesh
        position={[planet.distance, 0, 0]}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(planet);
        }}
      >
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial color={planet.color} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[planet.distance, 0.015, 8, 128]} />
        <meshBasicMaterial
          color="#475569"
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

function Sun() {
  return (
    <>
      <pointLight intensity={450} distance={100} decay={2} />

      <mesh>
        <sphereGeometry args={[2.8, 48, 48]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
    </>
  );
}

function Scene({ onSelect }) {
  return (
    <>
      <ambientLight intensity={0.15} />

      <Stars
        radius={120}
        depth={60}
        count={4000}
        factor={4}
        saturation={0}
        fade
        speed={0.3}
      />

      <Sun />

      {planets.map((planet, index) => (
        <Planet
          key={planet.name}
          planet={planet}
          index={index}
          onSelect={onSelect}
        />
      ))}

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={8}
        maxDistance={70}
      />
    </>
  );
}

export default function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas
        camera={{
          position: [0, 20, 35],
          fov: 45,
        }}
        onPointerMissed={() => setSelectedPlanet(null)}
      >
        <Scene onSelect={setSelectedPlanet} />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 800 }}>
          SPACE EXPLORER
        </div>
        <div style={{ opacity: 0.75 }}>
          Explora. Descubre. Aprende.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(5, 10, 25, 0.75)",
          padding: "10px 16px",
          borderRadius: 999,
          fontSize: 14,
        }}
      >
        Arrastra para girar · Pellizca para hacer zoom
      </div>

      {selectedPlanet && (
        <div
          style={{
            position: "absolute",
            right: 20,
            top: 20,
            width: 280,
            background: "rgba(4, 10, 25, 0.92)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 18,
            padding: 20,
            zIndex: 20,
          }}
        >
          <button
            onClick={() => setSelectedPlanet(null)}
            style={{
              position: "absolute",
              right: 12,
              top: 10,
              background: "transparent",
              border: 0,
              color: "white",
              fontSize: 24,
            }}
          >
            ×
          </button>

          <div style={{ fontSize: 12, opacity: 0.6 }}>
            PLANETA
          </div>

          <h1 style={{ marginBottom: 8 }}>
            {selectedPlanet.name}
          </h1>

          <p style={{ lineHeight: 1.5 }}>
            {selectedPlanet.description}
          </p>
        </div>
      )}
    </div>
  );
}
