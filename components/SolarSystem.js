"use client";

import { useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Html,
} from "@react-three/drei";
import * as THREE from "three";

import { planets } from "../data/planets";

const textureFiles = {
  Mercurio: "/textures/2k_mercury.jpg",
  Venus: "/textures/2k_venus_atmosphere.jpg",
  Tierra: "/textures/2k_earth_daymap.jpg",
  Marte: "/textures/2k_mars.jpg",
  Júpiter: "/textures/2k_jupiter.jpg",
  Saturno: "/textures/2k_saturn.jpg",
  Urano: "/textures/2k_uranus.jpg",
  Neptuno: "/textures/2k_neptune.jpg",
};

function Moon({ earthSize }) {
  const moonOrbit = useRef();

  const moonTexture = useLoader(
    THREE.TextureLoader,
    "/textures/2k_moon.jpg"
  );

  useFrame((state, delta) => {
    if (moonOrbit.current) {
      moonOrbit.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={moonOrbit}>
      <mesh position={[earthSize + 1.4, 0.15, 0]}>
        <sphereGeometry args={[0.27, 48, 48]} />

        <meshStandardMaterial
          map={moonTexture}
          roughness={1}
          metalness={0}
        />
      </mesh>

      <Html
        position={[earthSize + 1.4, 0.7, 0]}
        center
        distanceFactor={12}
      >
        <PlanetLabel>Luna</PlanetLabel>
      </Html>
    </group>
  );
}

function PlanetLabel({ children }) {
  return (
    <div
      style={{
        padding: "4px 8px",
        borderRadius: 999,
        background: "rgba(4, 10, 25, 0.82)",
        border: "1px solid rgba(255,255,255,0.16)",
        color: "white",
        fontSize: 11,
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );
}

function Planet({
  planet,
  index,
  onSelect,
  registerPlanet,
  selectedPlanet,
}) {
  const orbitGroup = useRef();
  const planetGroup = useRef();
  const planetMesh = useRef();

  const texture = useLoader(
    THREE.TextureLoader,
    textureFiles[planet.name]
  );

  const saturnRingTexture = useLoader(
    THREE.TextureLoader,
    "/textures/2k_saturn_ring_alpha.png"
  );

  useFrame((state, delta) => {
    if (orbitGroup.current && !selectedPlanet) {
      orbitGroup.current.rotation.y +=
        planet.speed * delta * 0.35;
    }

    if (planetMesh.current) {
      planetMesh.current.rotation.y += delta * 0.08;
    }

    if (planetGroup.current) {
      registerPlanet(
        planet.name,
        planetGroup.current
      );
    }
  });

  const startingAngle =
    (index / planets.length) * Math.PI * 2;

  const isSelected =
    selectedPlanet?.name === planet.name;

  return (
    <group
      ref={orbitGroup}
      rotation={[0, startingAngle, 0]}
    >
      <group
        ref={planetGroup}
        position={[planet.distance, 0, 0]}
      >
        <mesh
          ref={planetMesh}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(planet);
          }}
        >
          <sphereGeometry
            args={[planet.size, 64, 64]}
          />

          <meshStandardMaterial
            map={texture}
            roughness={0.9}
            metalness={0}
          />
        </mesh>

        {planet.name === "Saturno" && (
          <mesh
            rotation={[Math.PI / 2.15, 0, 0]}
            onClick={(event) => {
              event.stopPropagation();
              onSelect(planet);
            }}
          >
            <ringGeometry
              args={[
                planet.size * 1.25,
                planet.size * 2.25,
                128,
              ]}
            />

            <meshBasicMaterial
              map={saturnRingTexture}
              transparent
              opacity={0.95}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )}

        {planet.name === "Tierra" && (
          <Moon earthSize={planet.size} />
        )}

        {!isSelected && (
          <Html
            position={[
              0,
              planet.size + 0.7,
              0,
            ]}
            center
            distanceFactor={12}
          >
            <PlanetLabel>
              {planet.name}
            </PlanetLabel>
          </Html>
        )}
      </group>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry
          args={[
            planet.distance,
            0.015,
            8,
            128,
          ]}
        />

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
  const sunRef = useRef();
  const glowRef = useRef();

  const sunTexture = useLoader(
    THREE.TextureLoader,
    "/textures/2k_sun.jpg"
  );

  useFrame((state) => {
    const t =
      state.clock.getElapsedTime();

    if (sunRef.current) {
      sunRef.current.rotation.y =
        t * 0.025;
    }

    if (glowRef.current) {
      const pulse =
        1 +
        Math.sin(t * 1.5) * 0.02;

      glowRef.current.scale.set(
        pulse,
        pulse,
        pulse
      );
    }
  });

  return (
    <>
      <pointLight
        color="#ffd27a"
        intensity={650}
        distance={110}
        decay={2}
      />

      <mesh ref={sunRef}>
        <sphereGeometry
          args={[2.8, 96, 96]}
        />

        <meshBasicMaterial
          map={sunTexture}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry
          args={[3.08, 64, 64]}
        />

        <meshBasicMaterial
          color="#ff9d32"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry
          args={[3.45, 64, 64]}
        />

        <meshBasicMaterial
          color="#ff7300"
          transparent
          opacity={0.035}
          side={THREE.BackSide}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

function CameraController({
  selectedPlanet,
  planetRefs,
  controlsRef,
}) {
  const { camera } = useThree();

  const targetPosition = useRef(
    new THREE.Vector3()
  );

  const targetLookAt = useRef(
    new THREE.Vector3()
  );

  useFrame(() => {
    if (!controlsRef.current) return;

    if (selectedPlanet) {
      const object =
        planetRefs.current[
          selectedPlanet.name
        ];

      if (object) {
        const worldPosition =
          new THREE.Vector3();

        object.getWorldPosition(
          worldPosition
        );

        const distance = Math.max(
          selectedPlanet.size * 4.5,
          4.5
        );

        targetPosition.current.set(
          worldPosition.x + distance,
          worldPosition.y +
            distance * 0.35,
          worldPosition.z + distance
        );

        targetLookAt.current.copy(
          worldPosition
        );

        camera.position.lerp(
          targetPosition.current,
          0.045
        );

        controlsRef.current.target.lerp(
          targetLookAt.current,
          0.06
        );

        controlsRef.current.update();
      }
    } else {
      controlsRef.current.update();
    }
  });

  return null;
}

function Scene({
  selectedPlanet,
  onSelect,
}) {
  const controlsRef = useRef();
  const planetRefs = useRef({});

  function registerPlanet(
    name,
    object
  ) {
    planetRefs.current[name] =
      object;
  }

  return (
    <>
      <ambientLight
        intensity={0.18}
      />

      <Stars
        radius={120}
        depth={60}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.3}
      />

      <Sun />

      {planets.map(
        (planet, index) => (
          <Planet
            key={planet.name}
            planet={planet}
            index={index}
            onSelect={onSelect}
            registerPlanet={
              registerPlanet
            }
            selectedPlanet={
              selectedPlanet
            }
          />
        )
      )}

      <OrbitControls
        ref={controlsRef}
        enablePan={
          !selectedPlanet
        }
        enableZoom
        enableRotate
        minDistance={2}
        maxDistance={70}
      />

      <CameraController
        selectedPlanet={
          selectedPlanet
        }
        planetRefs={planetRefs}
        controlsRef={controlsRef}
      />
    </>
  );
}

export default function SolarSystem() {
  const [
    selectedPlanet,
    setSelectedPlanet,
  ] = useState(null);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <Canvas
        camera={{
          position: [0, 18, 34],
          fov: 45,
        }}
      >
        <Scene
          selectedPlanet={
            selectedPlanet
          }
          onSelect={
            setSelectedPlanet
          }
        />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 0.5,
          }}
        >
          SPACE EXPLORER
        </div>

        <div
          style={{
            opacity: 0.72,
          }}
        >
          Explora. Descubre.
          Aprende.
        </div>
      </div>

      {!selectedPlanet && (
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: "50%",
            transform:
              "translateX(-50%)",
            background:
              "rgba(5, 10, 25, 0.78)",
            padding:
              "10px 16px",
            borderRadius: 999,
            fontSize: 13,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          Arrastra para girar ·
          Pellizca para hacer zoom
        </div>
      )}

      {selectedPlanet && (
        <PlanetCard
          planet={selectedPlanet}
          onClose={() =>
            setSelectedPlanet(null)
          }
        />
      )}
    </div>
  );
}

function PlanetCard({
  planet,
  onClose,
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 18,
        maxWidth: 420,
        margin: "0 auto",
        background:
          "rgba(4, 10, 25, 0.94)",
        backdropFilter:
          "blur(14px)",
        border:
          "1px solid rgba(255,255,255,0.16)",
        borderRadius: 22,
        padding: 20,
        zIndex: 20,
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.55)",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          right: 14,
          top: 14,
          background:
            "rgba(255,255,255,0.08)",
          border:
            "1px solid rgba(255,255,255,0.14)",
          borderRadius: 999,
          color: "white",
          padding: "7px 12px",
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        ← SISTEMA SOLAR
      </button>

      <div
        style={{
          fontSize: 11,
          letterSpacing: 1.5,
          opacity: 0.55,
        }}
      >
        EXPLORANDO
      </div>

      <h1
        style={{
          marginTop: 6,
          marginBottom: 8,
          fontSize: 28,
        }}
      >
        {planet.name}
      </h1>

      <p
        style={{
          lineHeight: 1.5,
          opacity: 0.9,
          marginTop: 0,
        }}
      >
        {planet.description}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: 10,
          marginTop: 16,
        }}
      >
        <InfoBox
          label="Diámetro"
          value={planet.diameter}
        />

        <InfoBox
          label="Duración del día"
          value={planet.day}
        />

        <InfoBox
          label="Gravedad"
          value={planet.gravity}
        />

        <InfoBox
          label="Duración del año"
          value={planet.year}
        />
      </div>

      <div
        style={{
          marginTop: 16,
          padding: 14,
          borderRadius: 14,
          background:
            "rgba(66, 153, 225, 0.12)",
          border:
            "1px solid rgba(66, 153, 225, 0.25)",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            marginBottom: 5,
          }}
        >
          ¿SABÍAS QUE...?
        </div>

        <div
          style={{
            fontSize: 14,
            lineHeight: 1.45,
            opacity: 0.9,
          }}
        >
          {planet.fact}
        </div>
      </div>
    </div>
  );
}

function InfoBox({
  label,
  value,
}) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 14,
        background:
          "rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          opacity: 0.55,
          marginBottom: 4,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}
