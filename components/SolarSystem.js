"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

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

  const isSelected =
    selectedPlanet?.name === planet.name;

  const isVisible =
    !selectedPlanet || isSelected;

  useFrame((state, delta) => {
    if (
      orbitGroup.current &&
      !selectedPlanet
    ) {
      orbitGroup.current.rotation.y +=
        planet.speed * delta * 0.35;
    }

    if (planetMesh.current) {
      planetMesh.current.rotation.y +=
        delta * 0.08;
    }

    if (planetGroup.current) {
      registerPlanet(
        planet.name,
        planetGroup.current
      );
    }
  });

  const startingAngle =
    (index / planets.length) *
    Math.PI *
    2;

  return (
    <group
      ref={orbitGroup}
      rotation={[0, startingAngle, 0]}
    >
      <group
        ref={planetGroup}
        position={[
          planet.distance,
          0,
          0,
        ]}
        visible={isVisible}
      >
        <mesh
          ref={planetMesh}
          onClick={(event) => {
            event.stopPropagation();

            if (!selectedPlanet) {
              onSelect(planet);
            }
          }}
        >
          <sphereGeometry
            args={[
              planet.size,
              64,
              64,
            ]}
          />

          <meshStandardMaterial
            map={texture}
            roughness={0.9}
            metalness={0}
          />
        </mesh>

        {planet.name === "Saturno" && (
          <mesh
            rotation={[
              Math.PI / 2.15,
              0,
              0,
            ]}
            onClick={(event) => {
              event.stopPropagation();

              if (!selectedPlanet) {
                onSelect(planet);
              }
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

        {planet.name === "Tierra" &&
          !selectedPlanet && (
            <Moon
              earthSize={planet.size}
            />
          )}

        {!selectedPlanet && (
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

      {!selectedPlanet && (
        <mesh
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
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
      )}
    </group>
  );
}

function Sun({ planetMode }) {
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
        Math.sin(t * 1.5) *
          0.02;

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

      {!planetMode && (
        <>
          <mesh ref={sunRef}>
            <sphereGeometry
              args={[
                2.8,
                96,
                96,
              ]}
            />

            <meshBasicMaterial
              map={sunTexture}
              toneMapped={false}
            />
          </mesh>

          <mesh ref={glowRef}>
            <sphereGeometry
              args={[
                3.08,
                64,
                64,
              ]}
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
              args={[
                3.45,
                64,
                64,
              ]}
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
      )}
    </>
  );
}

function CameraController({
  selectedPlanet,
  planetRefs,
  controlsRef,
  returningHome,
  onArrivedHome,
}) {
  const {
    camera,
    size,
  } = useThree();

  const homePosition = useRef(
    new THREE.Vector3(
      0,
      18,
      34
    )
  );

  const homeTarget = useRef(
    new THREE.Vector3(
      0,
      0,
      0
    )
  );

  const targetPosition = useRef(
    new THREE.Vector3()
  );

  const targetLookAt = useRef(
    new THREE.Vector3()
  );

  const currentPlanet =
    useRef(null);

  const isFocusing =
    useRef(false);

  /*
    DESPLAZAMIENTO VISUAL DEL PLANETA

    El planeta sigue siendo el centro real
    de OrbitControls, pero la cámara utiliza
    una vista desplazada para que aparezca
    más arriba en la pantalla.

    De este modo la ficha no lo tapa.
  */
  useEffect(() => {
    if (selectedPlanet) {
      const verticalOffset =
        size.height * 0.17;

      camera.setViewOffset(
        size.width,
        size.height,
        0,
        verticalOffset,
        size.width,
        size.height
      );

      camera.updateProjectionMatrix();
    } else {
      camera.clearViewOffset();
      camera.updateProjectionMatrix();
    }

    return () => {
      camera.clearViewOffset();
      camera.updateProjectionMatrix();
    };
  }, [
    selectedPlanet,
    camera,
    size.width,
    size.height,
  ]);

  useFrame(() => {
    if (!controlsRef.current) {
      return;
    }

    if (selectedPlanet) {
      const object =
        planetRefs.current[
          selectedPlanet.name
        ];

      if (!object) {
        return;
      }

      if (
        currentPlanet.current !==
        selectedPlanet.name
      ) {
        currentPlanet.current =
          selectedPlanet.name;

        isFocusing.current = true;
      }

      const worldPosition =
        new THREE.Vector3();

      object.getWorldPosition(
        worldPosition
      );

      /*
        Acercamos algo más el planeta
        que antes para que tenga mayor
        presencia en la vista.
      */
      const distance = Math.max(
        selectedPlanet.size * 3.4,
        3.4
      );

      targetPosition.current.set(
        worldPosition.x + distance,
        worldPosition.y +
          distance * 0.22,
        worldPosition.z + distance
      );

      targetLookAt.current.copy(
        worldPosition
      );

      if (isFocusing.current) {
        camera.position.lerp(
          targetPosition.current,
          0.055
        );

        controlsRef.current.target.lerp(
          targetLookAt.current,
          0.07
        );

        const cameraArrived =
          camera.position.distanceTo(
            targetPosition.current
          ) < 0.08;

        const targetArrived =
          controlsRef.current.target.distanceTo(
            targetLookAt.current
          ) < 0.08;

        if (
          cameraArrived &&
          targetArrived
        ) {
          camera.position.copy(
            targetPosition.current
          );

          controlsRef.current.target.copy(
            targetLookAt.current
          );

          isFocusing.current =
            false;
        }
      } else {
        controlsRef.current.target.copy(
          worldPosition
        );
      }

      controlsRef.current.update();
    } else if (returningHome) {
      currentPlanet.current =
        null;

      isFocusing.current =
        false;

      camera.position.lerp(
        homePosition.current,
        0.055
      );

      controlsRef.current.target.lerp(
        homeTarget.current,
        0.055
      );

      controlsRef.current.update();

      const cameraIsHome =
        camera.position.distanceTo(
          homePosition.current
        ) < 0.15;

      const targetIsHome =
        controlsRef.current.target.distanceTo(
          homeTarget.current
        ) < 0.15;

      if (
        cameraIsHome &&
        targetIsHome
      ) {
        camera.position.copy(
          homePosition.current
        );

        controlsRef.current.target.copy(
          homeTarget.current
        );

        controlsRef.current.update();

        onArrivedHome();
      }
    } else {
      currentPlanet.current =
        null;

      controlsRef.current.update();
    }
  });

  return null;
}

function Scene({
  selectedPlanet,
  onSelect,
  returningHome,
  onArrivedHome,
}) {
  const controlsRef = useRef();

  const planetRefs =
    useRef({});

  function registerPlanet(
    name,
    object
  ) {
    planetRefs.current[name] =
      object;
  }

  const planetMode =
    Boolean(selectedPlanet);

  return (
    <>
      <ambientLight
        intensity={
          planetMode
            ? 0.28
            : 0.18
        }
      />

      <Stars
        radius={120}
        depth={60}
        count={
          planetMode
            ? 3500
            : 5000
        }
        factor={4}
        saturation={0}
        fade
        speed={0.3}
      />

      <Sun
        planetMode={planetMode}
      />

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
          !returningHome &&
          !selectedPlanet
        }
        enableZoom={
          !returningHome
        }
        enableRotate={
          !returningHome
        }
        minDistance={
          selectedPlanet
            ? 1.7
            : 2
        }
        maxDistance={
          selectedPlanet
            ? 20
            : 70
        }
        enableDamping
        dampingFactor={0.08}
      />

      <CameraController
        selectedPlanet={
          selectedPlanet
        }
        planetRefs={
          planetRefs
        }
        controlsRef={
          controlsRef
        }
        returningHome={
          returningHome
        }
        onArrivedHome={
          onArrivedHome
        }
      />
    </>
  );
}

export default function SolarSystem() {
  const [
    selectedPlanet,
    setSelectedPlanet,
  ] = useState(null);

  const [
    returningHome,
    setReturningHome,
  ] = useState(false);

  function handleSelectPlanet(
    planet
  ) {
    setReturningHome(false);
    setSelectedPlanet(planet);
  }

  function handleReturnHome() {
    setSelectedPlanet(null);
    setReturningHome(true);
  }

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
          position: [
            0,
            18,
            34,
          ],
          fov: 45,
        }}
      >
        <Scene
          selectedPlanet={
            selectedPlanet
          }
          onSelect={
            handleSelectPlanet
          }
          returningHome={
            returningHome
          }
          onArrivedHome={() =>
            setReturningHome(
              false
            )
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
            fontSize:
              selectedPlanet
                ? 20
                : 28,
            fontWeight: 800,
            letterSpacing: 0.5,
            transition:
              "font-size 0.3s ease",
          }}
        >
          SPACE EXPLORER
        </div>

        {!selectedPlanet && (
          <div
            style={{
              opacity: 0.72,
            }}
          >
            Explora. Descubre.
            Aprende.
          </div>
        )}
      </div>

      {!selectedPlanet &&
        !returningHome && (
          <div
            style={{
              position:
                "absolute",
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
              textAlign:
                "center",
              whiteSpace:
                "nowrap",
            }}
          >
            Arrastra para girar ·
            Pellizca para hacer zoom
          </div>
        )}

      {returningHome && (
        <div
          style={{
            position:
              "absolute",
            bottom: 18,
            left: "50%",
            transform:
              "translateX(-50%)",
            background:
              "rgba(5, 10, 25, 0.82)",
            padding:
              "10px 16px",
            borderRadius: 999,
            fontSize: 13,
            textAlign:
              "center",
            whiteSpace:
              "nowrap",
            pointerEvents:
              "none",
          }}
        >
          Volviendo al Sistema Solar…
        </div>
      )}

      {selectedPlanet && (
        <PlanetCard
          planet={
            selectedPlanet
          }
          onClose={
            handleReturnHome
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
