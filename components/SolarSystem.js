"use client";

import {
  useEffect,
  useMemo,
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
  Mercurio:
    "/textures/2k_mercury.jpg",
  Venus:
    "/textures/2k_venus_atmosphere.jpg",
  Tierra:
    "/textures/2k_earth_daymap.jpg",
  Marte:
    "/textures/2k_mars.jpg",
  Júpiter:
    "/textures/2k_jupiter.jpg",
  Saturno:
    "/textures/2k_saturn.jpg",
  Urano:
    "/textures/2k_uranus.jpg",
  Neptuno:
    "/textures/2k_neptune.jpg",
};

const sunData = {
  name: "Sol",
  size: 2.8,
};

function Moon({
  earthSize,
  showOrbit = false,
}) {
  const moonOrbit =
    useRef();

  const moonTexture =
    useLoader(
      THREE.TextureLoader,
      "/textures/2k_moon.jpg"
    );

  const orbitDistance =
    earthSize + 1.4;

  useFrame(
    (state, delta) => {
      if (
        moonOrbit.current
      ) {
        moonOrbit.current.rotation.y +=
          delta * 0.35;
      }
    }
  );

  return (
    <>
      {showOrbit && (
        <mesh
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              orbitDistance,
              0.012,
              8,
              128,
            ]}
          />

          <meshBasicMaterial
            color="#94a3b8"
            transparent
            opacity={0.45}
          />
        </mesh>
      )}

      <group
        ref={moonOrbit}
      >
        <mesh
          position={[
            orbitDistance,
            0.15,
            0,
          ]}
        >
          <sphereGeometry
            args={[
              0.27,
              48,
              48,
            ]}
          />

          <meshStandardMaterial
            map={
              moonTexture
            }
            roughness={1}
            metalness={0}
          />
        </mesh>

        <Html
          position={[
            orbitDistance,
            0.7,
            0,
          ]}
          center
          distanceFactor={12}
        >
          <PlanetLabel>
            Luna
          </PlanetLabel>
        </Html>
      </group>
    </>
  );
}

function MarsMoon({
  name,
  orbitDistance,
  size,
  speed,
  startAngle,
  color,
  seed,
}) {
  const orbitRef = useRef();
  const moonRef = useRef();

  const geometry = useMemo(() => {
    const geo =
      new THREE.IcosahedronGeometry(
        size,
        3
      );

    const positions =
      geo.attributes.position;

    const vertex =
      new THREE.Vector3();

    for (
      let i = 0;
      i < positions.count;
      i++
    ) {
      vertex.fromBufferAttribute(
        positions,
        i
      );

      const direction =
        vertex
          .clone()
          .normalize();

      const irregularity =
        1 +
        Math.sin(
          direction.x * 7.3 +
            seed
        ) *
          0.08 +
        Math.sin(
          direction.y * 9.1 +
            seed * 1.7
        ) *
          0.06 +
        Math.sin(
          direction.z * 11.4 +
            seed * 2.3
        ) *
          0.05;

      const length =
        vertex.length() *
        irregularity;

      direction.multiplyScalar(
        length
      );

      positions.setXYZ(
        i,
        direction.x,
        direction.y,
        direction.z
      );
    }

    positions.needsUpdate =
      true;

    geo.computeVertexNormals();

    return geo;
  }, [size, seed]);

  useFrame(
    (state, delta) => {
      if (orbitRef.current) {
        orbitRef.current.rotation.y +=
          delta * speed;
      }

      if (moonRef.current) {
        moonRef.current.rotation.x +=
          delta * 0.12;

        moonRef.current.rotation.y +=
          delta * 0.18;
      }
    }
  );

  return (
    <>
      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            orbitDistance,
            0.008,
            8,
            128,
          ]}
        />

        <meshBasicMaterial
          color="#a8a29e"
          transparent
          opacity={0.34}
        />
      </mesh>

      <group
        ref={orbitRef}
        rotation={[
          0,
          startAngle,
          0,
        ]}
      >
        <group
          position={[
            orbitDistance,
            0.04,
            0,
          ]}
        >
          <mesh
            ref={moonRef}
            geometry={geometry}
          >
            <meshStandardMaterial
              color={color}
              roughness={1}
              metalness={0}
              flatShading
            />
          </mesh>

          <Html
            position={[
              0,
              size * 3.8,
              0,
            ]}
            center
            distanceFactor={5}
            style={{
              pointerEvents:
                "none",
            }}
          >
            <div
              style={{
                padding:
                  "5px 8px",
                borderRadius: 999,
                background:
                  "rgba(15, 10, 8, 0.88)",
                border:
                  "1px solid rgba(214,211,209,0.32)",
                color:
                  "#f5f5f4",
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 0.6,
                whiteSpace:
                  "nowrap",
              }}
            >
              {name}
            </div>
          </Html>
        </group>
      </group>
    </>
  );
}

function MarsMoons({
  marsSize,
}) {
  return (
    <group>
      <MarsMoon
        name="FOBOS"
        orbitDistance={
          marsSize + 0.72
        }
        size={0.075}
        speed={0.95}
        startAngle={0}
        color="#77716d"
        seed={1.7}
      />

      <MarsMoon
        name="DEIMOS"
        orbitDistance={
          marsSize + 1.32
        }
        size={0.055}
        speed={0.34}
        startAngle={
          Math.PI * 0.8
        }
        color="#928b86"
        seed={4.3}
      />
    </group>
  );
}
function JupiterMoon({
  size,
  distance,
  speed,
  color,
  label,
  moonSize,
}) {
  const orbitRef = useRef();

  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y +=
        delta * speed;
    }
  });

  return (
    <group>
      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            distance,
            size * 0.004,
            8,
            96,
          ]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      <group ref={orbitRef}>
        <mesh
          position={[
            distance,
            0,
            0,
          ]}
        >
          <sphereGeometry
            args={[
              moonSize,
              24,
              24,
            ]}
          />

          <meshStandardMaterial
            color={color}
            roughness={0.9}
          />

          <Html
            position={[
              0,
              moonSize * 1.8,
              0,
            ]}
            center
            distanceFactor={8}
            style={{
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: "10px",
                fontWeight: 700,
                background:
                  "rgba(0,0,0,0.55)",
                padding: "3px 6px",
                borderRadius: "999px",
              }}
            >
              {label}
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  );
}

function JupiterMoons({
  size,
}) {
  return (
    <group>
      <JupiterMoon
        size={size}
        distance={size * 1.45}
        speed={0.75}
        color="#e8b84f"
        label="ÍO"
        moonSize={size * 0.065}
      />

      <JupiterMoon
        size={size}
        distance={size * 1.8}
        speed={0.52}
        color="#d9d7c5"
        label="EUROPA"
        moonSize={size * 0.055}
      />

      <JupiterMoon
        size={size}
        distance={size * 2.2}
        speed={0.36}
        color="#9b8068"
        label="GANÍMEDES"
        moonSize={size * 0.085}
      />

      <JupiterMoon
        size={size}
        distance={size * 2.65}
        speed={0.25}
        color="#4f4b47"
        label="CALISTO"
        moonSize={size * 0.075}
      />
    </group>
  );
}

function SaturnMoons({
  size,
}) {
  return (
    <group>
      <JupiterMoon
        size={size}
        distance={size * 3.1}
        speed={0.34}
        color="#d9a441"
        label="TITÁN"
        moonSize={size * 0.075}
      />

      <JupiterMoon
        size={size}
        distance={size * 2.55}
        speed={0.62}
        color="#e7edf4"
        label="ENCÉLADO"
        moonSize={size * 0.04}
      />
    </group>
  );
}
function UranusMoons({
  size,
}) {
  return (
    <group>
      <JupiterMoon
        size={size}
        distance={size * 1.7}
        speed={0.42}
        color="#d8dee8"
        label="TITANIA"
        moonSize={size * 0.06}
      />

      <JupiterMoon
        size={size}
        distance={size * 1.35}
        speed={0.68}
        color="#b7c4d6"
        label="MIRANDA"
        moonSize={size * 0.035}
      />
    </group>
  );
}

function NeptuneMoons({
  size,
}) {
  return (
    <group>
      <JupiterMoon
        size={size}
        distance={size * 1.65}
        speed={-0.48}
        color="#d8d2c4"
        label="TRITÓN"
        moonSize={size * 0.065}
      />
    </group>
  );
}

function PlanetLabel({
  children,
}) {
  return (
    <div
      style={{
        padding:
          "4px 8px",
        borderRadius:
          999,
        background:
          "rgba(4, 10, 25, 0.82)",
        border:
          "1px solid rgba(255,255,255,0.16)",
        color:
          "white",
        fontSize:
          11,
        whiteSpace:
          "nowrap",
        pointerEvents:
          "none",
      }}
    >
      {children}
    </div>
  );
}

function EarthNightLayer({
  size,
  nightTexture,
  onClick,
}) {
  const uniforms =
    useMemo(
      () => ({
        nightMap: {
          value:
            nightTexture,
        },
      }),
      [nightTexture]
    );

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying vec3 vWorldNormal;

    void main() {
      vUv = uv;

      vec4 worldPosition =
        modelMatrix *
        vec4(position, 1.0);

      vWorldPosition =
        worldPosition.xyz;

      vWorldNormal =
        normalize(
          mat3(modelMatrix) *
          normal
        );

      gl_Position =
        projectionMatrix *
        viewMatrix *
        worldPosition;
    }
  `;

  const fragmentShader = `
    uniform sampler2D nightMap;

    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying vec3 vWorldNormal;

    void main() {
      vec3 normal =
        normalize(vWorldNormal);

      vec3 directionToSun =
        normalize(
          -vWorldPosition
        );

      float illumination =
        dot(
          normal,
          directionToSun
        );

      float darkness =
        1.0 -
        smoothstep(
          -0.10,
          0.12,
          illumination
        );

      vec3 nightColor =
        texture2D(
          nightMap,
          vUv
        ).rgb;

      float brightness =
        max(
          nightColor.r,
          max(
            nightColor.g,
            nightColor.b
          )
        );

      float lightsMask =
        smoothstep(
          0.055,
          0.32,
          brightness
        );

      float alpha =
        darkness *
        lightsMask;

      vec3 cityLights =
        nightColor *
        1.55;

      gl_FragColor =
        vec4(
          cityLights,
          alpha
        );
    }
  `;

  return (
    <mesh
      scale={1.004}
      onClick={onClick}
    >
      <sphereGeometry
        args={[
          size,
          64,
          64,
        ]}
      />

      <shaderMaterial
        uniforms={
          uniforms
        }
        vertexShader={
          vertexShader
        }
        fragmentShader={
          fragmentShader
        }
        transparent
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
      />
    </mesh>
  );
}

function EarthAtmosphereLayer({
  size,
  onClick,
}) {
  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vViewDirection;

    void main() {
      vec4 modelViewPosition =
        modelViewMatrix *
        vec4(position, 1.0);

      vNormal =
        normalize(
          normalMatrix *
          normal
        );

      vViewDirection =
        normalize(
          -modelViewPosition.xyz
        );

      gl_Position =
        projectionMatrix *
        modelViewPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vViewDirection;

    void main() {
      float facing =
        max(
          dot(
            normalize(vNormal),
            normalize(vViewDirection)
          ),
          0.0
        );

      float rim =
        pow(
          1.0 - facing,
          2.2
        );

      vec3 atmosphereColor =
        vec3(
          0.18,
          0.55,
          1.0
        );

      float alpha =
        rim *
        0.72;

      gl_FragColor =
        vec4(
          atmosphereColor *
          (0.8 + rim),
          alpha
        );
    }
  `;

  return (
    <mesh
      scale={1.065}
      onClick={onClick}
    >
      <sphereGeometry
        args={[
          size,
          96,
          96,
        ]}
      />

      <shaderMaterial
        vertexShader={
          vertexShader
        }
        fragmentShader={
          fragmentShader
        }
        transparent
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
        side={
          THREE.FrontSide
        }
      />
    </mesh>
  );
}
function MercuryExosphereLayer({
  size,
  onClick,
}) {
  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vViewDirection;

    void main() {
      vec4 modelViewPosition =
        modelViewMatrix *
        vec4(position, 1.0);

      vNormal =
        normalize(
          normalMatrix *
          normal
        );

      vViewDirection =
        normalize(
          -modelViewPosition.xyz
        );

      gl_Position =
        projectionMatrix *
        modelViewPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vViewDirection;

    void main() {
      float facing =
        max(
          dot(
            normalize(vNormal),
            normalize(vViewDirection)
          ),
          0.0
        );

      float rim =
        pow(
          1.0 - facing,
          3.4
        );

      vec3 exosphereColor =
        vec3(
          1.0,
          0.72,
          0.35
        );

      float alpha =
        rim * 0.16;

      gl_FragColor =
        vec4(
          exosphereColor *
          (0.55 + rim),
          alpha
        );
    }
  `;

  return (
    <mesh
      scale={1.045}
      onClick={onClick}
    >
      <sphereGeometry
        args={[
          size,
          96,
          96,
        ]}
      />

      <shaderMaterial
        vertexShader={
          vertexShader
        }
        fragmentShader={
          fragmentShader
        }
        transparent
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
        side={
          THREE.FrontSide
        }
      />
    </mesh>
  );
}

function MarsAtmosphereLayer({
  size,
  onClick,
}) {
  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vViewDirection;

    void main() {
      vec4 modelViewPosition =
        modelViewMatrix *
        vec4(position, 1.0);

      vNormal =
        normalize(
          normalMatrix *
          normal
        );

      vViewDirection =
        normalize(
          -modelViewPosition.xyz
        );

      gl_Position =
        projectionMatrix *
        modelViewPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vViewDirection;

    void main() {
      float facing =
        max(
          dot(
            normalize(vNormal),
            normalize(vViewDirection)
          ),
          0.0
        );

      float rim =
        pow(
          1.0 - facing,
          2.5
        );

      vec3 atmosphereColor =
        vec3(
          1.0,
          0.34,
          0.12
        );

      float alpha =
        rim *
        0.28;

      gl_FragColor =
        vec4(
          atmosphereColor *
          (0.65 + rim),
          alpha
        );
    }
  `;

  return (
    <mesh
      scale={1.035}
      onClick={onClick}
    >
      <sphereGeometry
        args={[
          size,
          96,
          96,
        ]}
      />

      <shaderMaterial
        vertexShader={
          vertexShader
        }
        fragmentShader={
          fragmentShader
        }
        transparent
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
        side={
          THREE.FrontSide
        }
      />
    </mesh>
  );
}

function getSpherePosition(
  radius,
  latitude,
  longitude
) {
  const lat =
    THREE.MathUtils.degToRad(
      latitude
    );

  const lon =
    THREE.MathUtils.degToRad(
      longitude
    );

  const x =
    radius *
    Math.cos(lat) *
    Math.cos(lon);

  const y =
    radius *
    Math.sin(lat);

  const z =
    -radius *
    Math.cos(lat) *
    Math.sin(lon);

  return [
    x,
    y,
    z,
  ];
}

function MarsHotspot({
  size,
  latitude,
  longitude,
  label,
  icon,
  occluder,
}) {
  const markerRef =
    useRef();

  const position =
    getSpherePosition(
      size * 1.045,
      latitude,
      longitude
    );

  useFrame(
    (state) => {
      if (
        markerRef.current
      ) {
        const time =
          state.clock.getElapsedTime();

        const pulse =
          1 +
          Math.sin(
            time * 3
          ) *
            0.16;

        markerRef.current.scale.setScalar(
          pulse
        );
      }
    }
  );

  return (
    <group
      position={position}
    >
      <mesh
        ref={markerRef}
      >
        <sphereGeometry
          args={[
            size * 0.055,
            24,
            24,
          ]}
        />

        <meshBasicMaterial
          color="#ffb15c"
          toneMapped={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry
          args={[
            size * 0.09,
            24,
            24,
          ]}
        />

        <meshBasicMaterial
          color="#ff7a33"
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      <Html
        position={[
          0,
          size * 0.2,
          0,
        ]}
        center
        distanceFactor={5}
        occlude={
          occluder?.current
            ? [
                occluder,
              ]
            : false
        }
        zIndexRange={[
          10,
          0,
        ]}
        style={{
          pointerEvents:
            "none",
        }}
      >
        <div
          style={{
            display:
              "flex",
            alignItems:
              "center",
            gap: 5,
            padding:
              "5px 8px",
            borderRadius:
              999,
            background:
              "rgba(22, 8, 3, 0.92)",
            border:
              "1px solid rgba(251,146,60,0.48)",
            color:
              "#fed7aa",
            fontSize:
              9,
            fontWeight:
              800,
            whiteSpace:
              "nowrap",
            boxShadow:
              "0 4px 16px rgba(0,0,0,0.45)",
          }}
        >
          <span>
            {icon}
          </span>

          {label}
        </div>
      </Html>
    </group>
  );
}

function MarsSurfaceMarkers({
  size,
  occluder,
}) {
  return (
    <>
      <MarsHotspot
        size={size}
        latitude={18.65}
        longitude={-133.8}
        label="OLYMPUS MONS"
        icon="▲"
        occluder={
          occluder
        }
      />

      <MarsHotspot
        size={size}
        latitude={-14}
        longitude={-60}
        label="VALLES MARINERIS"
        icon="⌁"
        occluder={
          occluder
        }
      />

      <MarsHotspot
        size={size}
        latitude={82}
        longitude={20}
        label="CASQUETE POLAR"
        icon="❄"
        occluder={
          occluder
        }
      />
    </>
  );
}

function MercuryHotspot({
  size,
  latitude,
  longitude,
  label,
  icon,
  occluder,
}) {
  const markerRef =
    useRef();

  const position =
    getSpherePosition(
      size * 1.05,
      latitude,
      longitude
    );

  useFrame(
    (state) => {
      if (
        markerRef.current
      ) {
        const time =
          state.clock.getElapsedTime();

        const pulse =
          1 +
          Math.sin(
            time * 3.2
          ) *
            0.14;

        markerRef.current.scale.setScalar(
          pulse
        );
      }
    }
  );

  return (
    <group
      position={position}
    >
      <mesh
        ref={markerRef}
      >
        <sphereGeometry
          args={[
            size * 0.05,
            24,
            24,
          ]}
        />

        <meshBasicMaterial
          color="#facc15"
          toneMapped={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry
          args={[
            size * 0.085,
            24,
            24,
          ]}
        />

        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      <Html
        position={[
          0,
          size * 0.2,
          0,
        ]}
        center
        distanceFactor={5}
        occlude={
          occluder?.current
            ? [
                occluder,
              ]
            : false
        }
        zIndexRange={[
          10,
          0,
        ]}
        style={{
          pointerEvents:
            "none",
        }}
      >
        <div
          style={{
            display:
              "flex",
            alignItems:
              "center",
            gap: 5,
            padding:
              "5px 8px",
            borderRadius:
              999,
            background:
              "rgba(20, 16, 8, 0.92)",
            border:
              "1px solid rgba(250,204,21,0.42)",
            color:
              "#fef3c7",
            fontSize: 9,
            fontWeight:
              800,
            whiteSpace:
              "nowrap",
            boxShadow:
              "0 4px 16px rgba(0,0,0,0.45)",
          }}
        >
          <span>
            {icon}
          </span>

          {label}
        </div>
      </Html>
    </group>
  );
}

function MercurySurfaceMarkers({
  size,
  occluder,
}) {
  return (
    <>
      <MercuryHotspot
        size={size}
        latitude={30.5}
        longitude={162.7}
        label="CALORIS PLANITIA"
        icon="☄"
        occluder={
          occluder
        }
      />

      <MercuryHotspot
        size={size}
        latitude={-18}
        longitude={45}
        label="TERRENO CRATERIZADO"
        icon="◉"
        occluder={
          occluder
        }
      />

      <MercuryHotspot
        size={size}
        latitude={84}
        longitude={0}
        label="HIELO POLAR"
        icon="❄"
        occluder={
          occluder
        }
      />
    </>
  );
}
function JupiterHotspot({
  size,
  latitude,
  longitude,
  label,
  occluder,
  variant = "spot",
}) {
  const markerRef =
    useRef();

  const position =
    getSpherePosition(
      size * 1.045,
      latitude,
      longitude
    );

  useFrame(
    (state) => {
      if (
        markerRef.current
      ) {
        const time =
          state.clock.getElapsedTime();

        const pulse =
          1 +
          Math.sin(
            time * 3
          ) *
            0.14;

        markerRef.current.scale.setScalar(
          pulse
        );
      }
    }
  );

  return (
    <group
      position={position}
    >
      <mesh
        ref={markerRef}
      >
       <sphereGeometry
  args={[
    size *
      (variant === "band"
        ? 0.025
        : 0.045),
    24,
    24,
  ]}
/>

<meshBasicMaterial
  color={
    variant === "band"
      ? "#f6d6a8"
      : "#ff6b4a"
  }
  toneMapped={false}
/>
      </mesh>

      {variant !== "band" && (
  <mesh>
    <sphereGeometry
      args={[
        size * 0.075,
        24,
        24,
      ]}
    />

    <meshBasicMaterial
      color="#ef4444"
      transparent
      opacity={0.18}
      depthWrite={false}
      blending={
        THREE.AdditiveBlending
      }
    />
  </mesh>
)}

      <Html
        position={[
          0,
          0,
          0,
        ]}
        center
        distanceFactor={5}
        occlude={
          occluder?.current
            ? [
                occluder,
              ]
            : false
        }
        zIndexRange={[
          10,
          0,
        ]}
        style={{
          pointerEvents:
            "none",
          transform:
            "translateY(-28px)",
        }}
      >
        <div
          style={{
            display:
              "flex",
            alignItems:
              "center",
            gap: 5,
            padding:
              "5px 8px",
            borderRadius:
              999,
            background:
              "rgba(35, 8, 5, 0.92)",
            border:
              "1px solid rgba(248,113,113,0.45)",
            color:
              "#fecaca",
            fontSize: 9,
            fontWeight: 800,
            whiteSpace:
              "nowrap",
            boxShadow:
              "0 4px 16px rgba(0,0,0,0.45)",
          }}
        >
          <span>
            ◉
          </span>

          {label}
        </div>
      </Html>
    </group>
  );
}

function JupiterBandsLayer({
  size,
}) {
  return (
    <mesh
      scale={1.006}
    >
      <sphereGeometry
        args={[
          size,
          64,
          64,
        ]}
      />

      <meshBasicMaterial
        color="#f5d6a1"
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </mesh>
  );
}
function JupiterAtmosphereMarkers({
  size,
  occluder,
}) {
  return (
    <>
    
      <JupiterHotspot
        size={size}
        latitude={-22}
        longitude={-45}
        label="GRAN MANCHA ROJA"
        occluder={
          occluder
        }
      />

      <JupiterHotspot
        size={size}
        latitude={15}
        longitude={-25}
        label="CINTURÓN OSCURO"
        variant="band"
        occluder={
          occluder
        }
      />

          <JupiterHotspot
        size={size}
        latitude={32}
        longitude={-10}
        label="ZONA CLARA"
        variant="band"
        occluder={
          occluder
        }
      />
    </>
  );
}
function GasAtmosphereLayer({
  size,
  color,
  intensity = 0.55,
  scale = 1.06,
}) {
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[size, 64, 64]} />

      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.FrontSide}
        uniforms={{
          glowColor: {
            value: new THREE.Color(color),
          },
          intensity: {
            value: intensity,
          },
        }}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vViewDirection;

          void main() {
            vec4 mvPosition =
              modelViewMatrix *
              vec4(position, 1.0);

            vNormal =
              normalize(
                normalMatrix * normal
              );

            vViewDirection =
              normalize(-mvPosition.xyz);

            gl_Position =
              projectionMatrix *
              mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 glowColor;
          uniform float intensity;

          varying vec3 vNormal;
          varying vec3 vViewDirection;

          void main() {
            float fresnel =
              1.0 -
              max(
                dot(
                  normalize(vNormal),
                  normalize(vViewDirection)
                ),
                0.0
              );

            fresnel =
              pow(fresnel, 2.4);

            gl_FragColor =
              vec4(
                glowColor,
                fresnel * intensity
              );
          }
        `}
      />
    </mesh>
  );
}

function Planet({
  planet,
  index,
  onSelect,
  registerPlanet,
  selectedPlanet,
  activeSection,
}) {
  const orbitGroup =
    useRef();

  const planetGroup =
    useRef();

  const planetMesh =
    useRef();

  const earthRotationGroup =
    useRef();

  const marsRotationGroup =
    useRef();

  const mercuryRotationGroup =
  useRef();

  const jupiterRotationGroup =
  useRef();

  const uranusRotationGroup =
  useRef();
  
  const venusAtmosphereMaterial =
    useRef();

  const texture =
    useLoader(
      THREE.TextureLoader,
      textureFiles[
        planet.name
      ]
    );

  const venusSurfaceTexture =
    useLoader(
      THREE.TextureLoader,
      "/textures/2k_venus_surface.jpg"
    );

  const earthNightTexture =
    useLoader(
      THREE.TextureLoader,
      "/textures/2k_earth_nightmap.jpg"
    );

  const saturnRingTexture =
    useLoader(
      THREE.TextureLoader,
      "/textures/2k_saturn_ring_alpha.png"
    );

  const isSelected =
    selectedPlanet?.name ===
    planet.name;

  const isVisible =
    !selectedPlanet ||
    isSelected;

  const isVenus =
    planet.name ===
    "Venus";

  const isEarth =
    planet.name ===
    "Tierra";

  const isMars =
    planet.name ===
    "Marte";

  const isMercury =
  planet.name ===
  "Mercurio";

  const isJupiter =
  planet.name ===
  "Júpiter";

  const isUranus =
  planet.name ===
  "Urano";
  
  useFrame(
    (state, delta) => {
      if (
        orbitGroup.current &&
        !selectedPlanet
      ) {
        orbitGroup.current.rotation.y +=
          planet.speed *
          delta *
          0.35;
      }

      if (
  isEarth &&
  earthRotationGroup.current
) {
  earthRotationGroup.current.rotation.y +=
    delta * 0.08;
} else if (
  isMars &&
  marsRotationGroup.current
) {
  marsRotationGroup.current.rotation.y +=
    delta * 0.08;
} else if (
  isMercury &&
  mercuryRotationGroup.current
) {
  mercuryRotationGroup.current.rotation.y +=
    delta * 0.08;
} else if (
  isJupiter &&
  jupiterRotationGroup.current
) {
  jupiterRotationGroup.current.rotation.y +=
    delta * 0.08;
} else if (
  isUranus &&
  uranusRotationGroup.current
) {
  uranusRotationGroup.current.rotation.y +=
    delta * 0.08;
} else if (
  planetMesh.current
) {
  planetMesh.current.rotation.y +=
    delta * 0.08;
}

      if (
        isVenus &&
        venusAtmosphereMaterial.current
      ) {
        const revealSurface =
          isSelected &&
          activeSection ===
            "surface";

        const targetOpacity =
          revealSurface
            ? 0
            : 1;

        venusAtmosphereMaterial.current.opacity =
          THREE.MathUtils.lerp(
            venusAtmosphereMaterial
              .current
              .opacity,
            targetOpacity,
            0.06
          );
      }

      if (
        planetGroup.current
      ) {
        registerPlanet(
          planet.name,
          planetGroup.current
        );
      }
    }
  );

  const startingAngle =
    (index /
      planets.length) *
    Math.PI *
    2;

  function handlePlanetClick(
    event
  ) {
    event.stopPropagation();

    if (
      !selectedPlanet
    ) {
      onSelect(
        planet
      );
    }
  }

  return (
    <group
      ref={orbitGroup}
      rotation={[
        0,
        startingAngle,
        0,
      ]}
    >
      <group
        ref={planetGroup}
        position={[
          planet.distance,
          0,
          0,
        ]}
        visible={
          isVisible
        }
      >
        {isMercury ? (
  <>
    <group
      ref={
        mercuryRotationGroup
      }
    >
      <mesh
        ref={planetMesh}
        onClick={
          handlePlanetClick
        }
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
          roughness={1}
          metalness={0}
        />
      </mesh>

      {isSelected &&
        activeSection ===
          "surface" && (
          <MercurySurfaceMarkers
            size={
              planet.size
            }
            occluder={
              planetMesh
            }
          />
        )}
        </group>

    {isSelected &&
      activeSection ===
        "atmosphere" && (
        <MercuryExosphereLayer
          size={
            planet.size
          }
          onClick={
            handlePlanetClick
          }
        />
      )}
  </>
) : isVenus ? (
          <>
            <mesh
              ref={planetMesh}
              onClick={
                handlePlanetClick
              }
            >
              <sphereGeometry
                args={[
                  planet.size,
                  64,
                  64,
                ]}
              />

              <meshStandardMaterial
                map={
                  venusSurfaceTexture
                }
                roughness={0.95}
                metalness={0}
              />
            </mesh>

            <mesh
              scale={1.012}
              onClick={
                handlePlanetClick
              }
            >
              <sphereGeometry
                args={[
                  planet.size,
                  64,
                  64,
                ]}
              />

              <meshStandardMaterial
                ref={
                  venusAtmosphereMaterial
                }
                map={texture}
                roughness={0.9}
                metalness={0}
                transparent
                opacity={1}
                depthWrite={false}
              />
            </mesh>
          </>
        ) : isEarth ? (
          <>
            <group
              ref={
                earthRotationGroup
              }
            >
              <mesh
                ref={
                  planetMesh
                }
                onClick={
                  handlePlanetClick
                }
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

              {isSelected &&
                activeSection ===
                  "surface" && (
                  <EarthNightLayer
                    size={
                      planet.size
                    }
                    nightTexture={
                      earthNightTexture
                    }
                    onClick={
                      handlePlanetClick
                    }
                  />
                )}
            </group>

            {isSelected &&
              activeSection ===
                "atmosphere" && (
                <EarthAtmosphereLayer
                  size={
                    planet.size
                  }
                  onClick={
                    handlePlanetClick
                  }
                />
              )}
          </>
        ) : isMars ? (
          <>
            <group
              ref={
                marsRotationGroup
              }
            >
              <mesh
                ref={planetMesh}
                onClick={
                  handlePlanetClick
                }
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
                  roughness={0.95}
                  metalness={0}
                />
              </mesh>

              {isSelected &&
                activeSection ===
                  "surface" && (
                  <MarsSurfaceMarkers
                    size={
                      planet.size
                    }
                    occluder={
                      planetMesh
                    }
                  />
                )}
            </group>

            {isSelected &&
              activeSection ===
                "atmosphere" && (
                <MarsAtmosphereLayer
                  size={
                    planet.size
                  }
                  onClick={
                    handlePlanetClick
                  }
                />
              )}

            {isSelected &&
              activeSection ===
                "moons" && (
                <MarsMoons
                  marsSize={
                    planet.size
                  }
                />
              )}
          </>
        ) : isJupiter ? (
          <group
            ref={
              jupiterRotationGroup
            }
          >
            <mesh
              ref={planetMesh}
              onClick={
                handlePlanetClick
              }
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

            {isSelected &&
              activeSection ===
                "atmosphere" && (
                <JupiterAtmosphereMarkers
                  size={
                    planet.size
                  }
                  occluder={
                    planetMesh
                  }
                />
              )}
                    {isSelected &&
  activeSection ===
    "moons" && (
    <JupiterMoons
      size={planet.size}
    />
  )}
          </group>
        ) : isUranus ? (
  <group
    rotation={[
      0,
      0,
      THREE.MathUtils.degToRad(98),
    ]}
  >
    <group
      ref={uranusRotationGroup}
    >
      <mesh
        ref={planetMesh}
        onClick={handlePlanetClick}
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
    </group>
  </group>
) : (
          <mesh
            ref={planetMesh}
            onClick={
              handlePlanetClick
            }
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
        )}

        {planet.name ===
          "Saturno" && (
          <mesh
            rotation={[
  Math.PI / 2,
  THREE.MathUtils.degToRad(26.7),
  0,
]}
            onClick={
              handlePlanetClick
            }
          >
            <ringGeometry
              args={[
                planet.size *
                  1.25,
                planet.size *
                  2.25,
                128,
              ]}
            />

            <meshBasicMaterial
              map={
                saturnRingTexture
              }
              transparent
              opacity={0.95}
              side={
                THREE.DoubleSide
              }
              depthWrite={false}
            />
          </mesh>
        )}

{planet.name ===
  "Júpiter" &&
  isSelected &&
  activeSection ===
    "atmosphere" && (
    <GasAtmosphereLayer
      size={planet.size}
      color="#d9b98c"
      intensity={0.38}
      scale={1.045}
    />
  )}

{planet.name ===
  "Saturno" &&
  isSelected &&
  activeSection ===
    "atmosphere" && (
    <GasAtmosphereLayer
      size={planet.size}
      color="#e8c982"
      intensity={0.42}
      scale={1.055}
    />
  )}

        {planet.name ===
  "Urano" &&
  isSelected &&
  activeSection ===
    "atmosphere" && (
    <GasAtmosphereLayer
      size={planet.size}
      color="#70e1e8"
      intensity={0.52}
      scale={1.065}
    />
  )}

        {planet.name ===
  "Neptuno" &&
  isSelected &&
  activeSection ===
    "atmosphere" && (
    <GasAtmosphereLayer
      size={planet.size}
      color="#3b82f6"
      intensity={0.58}
      scale={1.07}
    />
  )}
        
        {planet.name ===
          "Saturno" &&
          isSelected &&
          activeSection ===
    "moons" && (
    <SaturnMoons
      size={planet.size}
    />
  )}

{planet.name ===
  "Urano" &&
  isSelected &&
  activeSection ===
    "moons" && (
    <UranusMoons
      size={planet.size}
    />
  )}

{planet.name ===
  "Neptuno" &&
  isSelected &&
  activeSection ===
    "moons" && (
    <NeptuneMoons
      size={planet.size}
    />
  )}

        {planet.name ===
          "Tierra" &&
          !selectedPlanet && (
            <Moon
              earthSize={
                planet.size
              }
            />
          )}

        {isEarth &&
          isSelected &&
          activeSection ===
            "moons" && (
            <Moon
              earthSize={
                planet.size
              }
              showOrbit
            />
          )}

        {!selectedPlanet && (
          <Html
            position={[
              0,
              planet.size +
                0.7,
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

function Sun({
  selectedPlanet,
  onSelect,
  registerPlanet,
}) {
  const sunGroup =
    useRef();

  const sunRef =
    useRef();

  const glowRef =
    useRef();

  const sunTexture =
    useLoader(
      THREE.TextureLoader,
      "/textures/2k_sun.jpg"
    );

  const isSelected =
    selectedPlanet?.name ===
    "Sol";

  const isVisible =
    !selectedPlanet ||
    isSelected;

  useFrame(
    (state) => {
      const t =
        state.clock.getElapsedTime();

      if (
        sunRef.current
      ) {
        sunRef.current.rotation.y =
          t * 0.025;
      }

      if (
        glowRef.current
      ) {
        const pulse =
          1 +
          Math.sin(
            t * 1.5
          ) *
            0.02;

        glowRef.current.scale.set(
          pulse,
          pulse,
          pulse
        );
      }

      if (
        sunGroup.current
      ) {
        registerPlanet(
          "Sol",
          sunGroup.current
        );
      }
    }
  );

  function handleSunClick(
    event
  ) {
    event.stopPropagation();

    if (
      !selectedPlanet
    ) {
      onSelect(
        sunData
      );
    }
  }

  return (
    <>
      <pointLight
        color="#ffd27a"
        intensity={650}
        distance={110}
        decay={2}
      />

      <group
        ref={sunGroup}
        visible={isVisible}
      >
        <mesh
          ref={sunRef}
          onClick={
            handleSunClick
          }
        >
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

        <mesh
          ref={glowRef}
          onClick={
            handleSunClick
          }
        >
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
            side={
              THREE.BackSide
            }
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
          />
        </mesh>

        <mesh
          onClick={
            handleSunClick
          }
        >
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
            side={
              THREE.BackSide
            }
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
          />
        </mesh>

        {!selectedPlanet && (
          <Html
            position={[
              0,
              4,
              0,
            ]}
            center
            distanceFactor={12}
          >
            <PlanetLabel>
              Sol
            </PlanetLabel>
          </Html>
        )}
      </group>
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

  const homePosition =
    useRef(
      new THREE.Vector3(
        0,
        18,
        34
      )
    );

  const homeTarget =
    useRef(
      new THREE.Vector3(
        0,
        0,
        0
      )
    );

  const targetPosition =
    useRef(
      new THREE.Vector3()
    );

  const targetLookAt =
    useRef(
      new THREE.Vector3()
    );

  const currentPlanet =
    useRef(null);

  const isFocusing =
    useRef(false);

  useEffect(() => {
    if (
      selectedPlanet
    ) {
      const verticalOffset =
        size.height *
        0.17;

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
    if (
      !controlsRef.current
    ) {
      return;
    }

    if (
      selectedPlanet
    ) {
      const object =
        planetRefs.current[
          selectedPlanet.name
        ];

      if (
        !object
      ) {
        return;
      }

      if (
        currentPlanet.current !==
        selectedPlanet.name
      ) {
        currentPlanet.current =
          selectedPlanet.name;

        isFocusing.current =
          true;
      }

      const worldPosition =
        new THREE.Vector3();

      object.getWorldPosition(
        worldPosition
      );

      const distance =
        Math.max(
          selectedPlanet.size *
            3.4,
          3.4
        );

      targetPosition.current.set(
        worldPosition.x +
          distance,
        worldPosition.y +
          distance *
            0.22,
        worldPosition.z +
          distance
      );

      targetLookAt.current.copy(
        worldPosition
      );

      if (
        isFocusing.current
      ) {
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
    } else if (
      returningHome
    ) {
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
  activeSection,
}) {
  const controlsRef =
    useRef();

  const planetRefs =
    useRef({});

  function registerPlanet(
    name,
    object
  ) {
    planetRefs.current[
      name
    ] =
      object;
  }

  const planetMode =
    Boolean(
      selectedPlanet
    );

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
  selectedPlanet={
    selectedPlanet
  }
  onSelect={
    onSelect
  }
  registerPlanet={
    registerPlanet
  }
/>

      {planets.map(
        (
          planet,
          index
        ) => (
          <Planet
            key={
              planet.name
            }
            planet={planet}
            index={index}
            onSelect={onSelect}
            registerPlanet={
              registerPlanet
            }
            selectedPlanet={
              selectedPlanet
            }
            activeSection={
              activeSection
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

  const [
    activeSection,
    setActiveSection,
  ] = useState(
    "overview"
  );

  function handleSelectPlanet(
    planet
  ) {
    setReturningHome(false);

    setActiveSection(
      "overview"
    );

    setSelectedPlanet(
      planet
    );
  }

  function handleReturnHome() {
    setActiveSection(
      "overview"
    );

    setSelectedPlanet(
      null
    );

    setReturningHome(
      true
    );
  }

  return (
    <div
      style={{
        width:
          "100vw",
        height:
          "100vh",
        position:
          "relative",
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
          activeSection={
            activeSection
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
          position:
            "absolute",
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
            letterSpacing:
              0.5,
            transition:
              "font-size 0.3s ease",
          }}
        >
          SPACE EXPLORER
        </div>

        {!selectedPlanet && (
          <div
            style={{
              opacity:
                0.72,
            }}
          >
            Explora.
            Descubre.
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
              left:
                "50%",
              transform:
                "translateX(-50%)",
              background:
                "rgba(5, 10, 25, 0.78)",
              padding:
                "10px 16px",
              borderRadius:
                999,
              fontSize: 13,
              textAlign:
                "center",
              whiteSpace:
                "nowrap",
            }}
          >
            Arrastra para girar · Pellizca para hacer zoom
          </div>
        )}

      {returningHome && (
        <div
          style={{
            position:
              "absolute",
            bottom: 18,
            left:
              "50%",
            transform:
              "translateX(-50%)",
            background:
              "rgba(5, 10, 25, 0.82)",
            padding:
              "10px 16px",
            borderRadius:
              999,
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

      {selectedPlanet &&
  selectedPlanet.name ===
    "Sol" ? (
    <SunCard
      onClose={
        handleReturnHome
      }
    />
  ) : (
    selectedPlanet && (
      <PlanetCard
        planet={
          selectedPlanet
        }
        activeSection={
          activeSection
        }
        onSectionChange={
          setActiveSection
        }
        onClose={
          handleReturnHome
        }
      />
    )
  )}

    </div>
  );
}

function PlanetNavigation({
  activeSection,
  onSectionChange,
}) {
  const sections = [
    {
      id:
        "overview",
      label:
        "VISTA GENERAL",
    },
    {
      id:
        "surface",
      label:
        "SUPERFICIE",
    },
    {
      id:
        "atmosphere",
      label:
        "ATMÓSFERA",
    },
    {
      id:
        "moons",
      label:
        "LUNAS",
    },
  ];

  return (
    <div
      style={{
        display:
          "flex",
        gap: 7,
        overflowX:
          "auto",
        scrollbarWidth:
          "none",
        WebkitOverflowScrolling:
          "touch",
        marginTop: 16,
        marginBottom: 16,
        paddingBottom: 2,
      }}
    >
      {sections.map(
        (section) => {
          const isActive =
            activeSection ===
            section.id;

          return (
            <button
              key={
                section.id
              }
              onClick={() =>
                onSectionChange(
                  section.id
                )
              }
              style={{
                flex:
                  "0 0 auto",
                border:
                  isActive
                    ? "1px solid rgba(96,165,250,0.8)"
                    : "1px solid rgba(255,255,255,0.12)",
                background:
                  isActive
                    ? "rgba(59,130,246,0.22)"
                    : "rgba(255,255,255,0.045)",
                color:
                  "white",
                borderRadius:
                  999,
                padding:
                  "8px 11px",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing:
                  0.55,
                whiteSpace:
                  "nowrap",
                cursor:
                  "pointer",
                opacity:
                  isActive
                    ? 1
                    : 0.68,
                transition:
                  "all 0.2s ease",
              }}
            >
              {section.label}
            </button>
          );
        }
      )}
    </div>
  );
}

function SunCard({
  onClose,
}) {
  return (
    <div
      style={{
        position:
          "absolute",
        left: 16,
        right: 16,
        bottom: 18,
        maxWidth: 420,
        maxHeight:
          "48vh",
        overflowY:
          "auto",
        margin:
          "0 auto",
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
          position:
            "absolute",
          right: 14,
          top: 14,
          background:
            "rgba(255,255,255,0.08)",
          border:
            "1px solid rgba(255,255,255,0.14)",
          borderRadius:
            999,
          color: "white",
          padding:
            "7px 12px",
          fontSize: 12,
          fontWeight: 700,
          cursor:
            "pointer",
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
        EXPLORANDO · ESTRELLA
      </div>

      <h1
        style={{
          marginTop: 6,
          marginBottom: 12,
          fontSize: 28,
        }}
      >
        Sol
      </h1>

      <div
        style={{
          display:
            "inline-block",
          padding:
            "6px 10px",
          borderRadius: 999,
          background:
            "rgba(251,146,60,0.14)",
          border:
            "1px solid rgba(251,146,60,0.32)",
          color:
            "#fed7aa",
          fontSize: 11,
          fontWeight: 800,
          marginBottom: 14,
        }}
      >
        ⭐ NUESTRA ESTRELLA
      </div>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.9,
          margin:
            "0 0 14px",
        }}
      >
        El Sol no es un planeta:
        es una estrella. Es una
        enorme esfera de plasma
        que mantiene unido al
        Sistema Solar gracias a
        su gravedad.
      </p>

      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: 10,
        }}
      >
        <InfoBox
          label="Diámetro"
          value="≈ 1,39 millones km"
        />

        <InfoBox
          label="Edad"
          value="≈ 4.600 millones años"
        />

        <InfoBox
          label="Superficie visible"
          value="≈ 5.500 °C"
        />

        <InfoBox
          label="Núcleo"
          value="≈ 15 millones °C"
        />
      </div>

      <div
        style={{
          marginTop: 16,
          padding: 14,
          borderRadius: 14,
          background:
            "rgba(251,146,60,0.10)",
          border:
            "1px solid rgba(251,146,60,0.24)",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            marginBottom: 6,
          }}
        >
          ¿CÓMO PRODUCE ENERGÍA?
        </div>

        <div
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            opacity: 0.9,
          }}
        >
          En su núcleo ocurre la
          fusión nuclear: átomos
          de hidrógeno se unen y
          forman helio, liberando
          una enorme cantidad de
          energía.
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          padding: 14,
          borderRadius: 14,
          background:
            "rgba(59,130,246,0.10)",
          border:
            "1px solid rgba(96,165,250,0.22)",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            marginBottom: 6,
          }}
        >
          🌌 EL SOL ES UNA ESTRELLA MÁS
        </div>

        <div
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            opacity: 0.9,
          }}
        >
          El Sol parece muchísimo
          mayor que las estrellas
          del cielo porque está
          mucho más cerca de
          nosotros. Muchas de las
          estrellas que observamos
          son otros enormes soles
          situados a distancias
          increíbles.
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          fontSize: 11,
          lineHeight: 1.45,
          opacity: 0.55,
        }}
      >
        Las estrellas del fondo de
        esta visualización son
        decorativas y no representan
        sus posiciones reales.
      </div>
    </div>
  );
}

function PlanetCard({
  planet,
  activeSection,
  onSectionChange,
  onClose,
}) {
  return (
    <div
      style={{
        position:
          "absolute",
        left: 16,
        right: 16,
        bottom: 18,
        maxWidth: 420,
        maxHeight:
          "48vh",
        overflowY:
          "auto",
        margin:
          "0 auto",
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
          position:
            "absolute",
          right: 14,
          top: 14,
          background:
            "rgba(255,255,255,0.08)",
          border:
            "1px solid rgba(255,255,255,0.14)",
          borderRadius:
            999,
          color: "white",
          padding:
            "7px 12px",
          fontSize: 12,
          fontWeight: 700,
          cursor:
            "pointer",
        }}
      >
        ← SISTEMA SOLAR
      </button>

      <div
        style={{
          fontSize: 11,
          letterSpacing:
            1.5,
          opacity: 0.55,
        }}
      >
        EXPLORANDO
      </div>

      <h1
        style={{
          marginTop: 6,
          marginBottom: 0,
          fontSize: 28,
        }}
      >
        {planet.name}
      </h1>

      <PlanetNavigation
        activeSection={
          activeSection
        }
        onSectionChange={
          onSectionChange
        }
      />

      {activeSection ===
        "overview" && (
        <OverviewSection
          planet={planet}
        />
      )}

      {activeSection ===
        "surface" && (
        <SurfaceSection
          planet={planet}
        />
      )}

      {activeSection ===
        "atmosphere" && (
        <AtmosphereSection
          planet={planet}
        />
      )}

      {activeSection ===
        "moons" && (
        <MoonsSection
          planet={planet}
        />
      )}
    </div>
  );
}

function OverviewSection({
  planet,
}) {
  return (
    <>
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
          display:
            "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: 10,
          marginTop: 16,
        }}
      >
        <InfoBox
          label="Diámetro"
          value={
            planet.diameter
          }
        />

        <InfoBox
          label="Duración del día"
          value={
            planet.day
          }
        />

        <InfoBox
          label="Gravedad"
          value={
            planet.gravity
          }
        />

        <InfoBox
          label="Duración del año"
          value={
            planet.year
          }
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
    </>
  );
}

function SurfaceSection({
  planet,
}) {
    if (
    planet.name ===
    "Mercurio"
  ) {
    return (
      <div>
        <StatusBadge>
          SUPERFICIE CRATERIZADA
        </StatusBadge>

        <h2
          style={{
            fontSize: 19,
            margin:
              "12px 0 8px",
          }}
        >
          Un mundo marcado por impactos
        </h2>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            opacity: 0.88,
            margin: 0,
          }}
        >
          Mercurio posee una superficie rocosa cubierta por miles de cráteres. Como casi no tiene atmósfera que los erosione, muchas de estas cicatrices pueden permanecer durante miles de millones de años.
        </p>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr",
            gap: 9,
            marginTop: 14,
          }}
        >
          <MercuryFeature
            icon="☄️"
            title="Caloris Planitia"
            text="Es una gigantesca cuenca formada por el impacto de un asteroide. Tiene aproximadamente 1.550 km de diámetro."
          />

          <MercuryFeature
            icon="🌑"
            title="Un paisaje lleno de cráteres"
            text="La superficie de Mercurio recuerda a la Luna porque ambos mundos conservan numerosos cráteres de impactos antiguos."
          />

          <MercuryFeature
            icon="❄️"
            title="Hielo cerca de los polos"
            text="Aunque Mercurio está muy cerca del Sol, algunos cráteres polares permanecen siempre en sombra y pueden conservar hielo de agua."
          />
        </div>

        <div
          style={{
            marginTop: 14,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(245,158,11,0.08)",
            border:
              "1px solid rgba(250,204,21,0.20)",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          🔭 Gira Mercurio para explorar los distintos marcadores. Cuando una región pasa al otro lado del planeta, su etiqueta desaparece.
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 11,
            lineHeight: 1.45,
            opacity: 0.55,
          }}
        >
          Los marcadores y su tamaño están exagerados para facilitar la exploración. El marcador de terreno craterizado representa una región característica y no un único accidente geográfico.
        </div>
      </div>
    );
  }
  if (
    planet.name ===
    "Venus"
  ) {
    return (
      <div>
        <StatusBadge>
          SUPERFICIE REVELADA
        </StatusBadge>

        <h2
          style={{
            fontSize: 19,
            margin:
              "12px 0 8px",
          }}
        >
          Bajo las nubes de Venus
        </h2>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            opacity: 0.88,
            margin: 0,
          }}
        >
          La espesa capa de nubes de Venus impide observar directamente su superficie en luz visible. Por eso las sondas espaciales han utilizado radar para estudiar el terreno que se esconde debajo.
        </p>

        <div
          style={{
            marginTop: 14,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(245,158,11,0.10)",
            border:
              "1px solid rgba(245,158,11,0.22)",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          🔎 Mira el planeta: acabamos de retirar visualmente sus nubes para poder explorar lo que hay debajo.
        </div>
      </div>
    );
  }

  if (
    planet.name ===
    "Tierra"
  ) {
    return (
      <div>
        <StatusBadge>
          DÍA Y NOCHE DINÁMICOS
        </StatusBadge>

        <h2
          style={{
            fontSize: 19,
            margin:
              "12px 0 8px",
          }}
        >
          Dos caras de la Tierra
        </h2>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            opacity: 0.88,
            margin: 0,
          }}
        >
          La mitad de la Tierra orientada hacia el Sol vive el día. En el lado opuesto es de noche.
        </p>

        <div
          style={{
            marginTop: 14,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(59,130,246,0.10)",
            border:
              "1px solid rgba(96,165,250,0.22)",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          🌍 Gira la Tierra y observa la frontera entre el día y la noche. En el hemisferio oscuro podrás ver las luces de las ciudades.
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            lineHeight: 1.45,
            opacity: 0.6,
          }}
        >
          La línea que separa la zona iluminada de la zona oscura se llama terminador.
        </div>
      </div>
    );
  }

  if (
    planet.name ===
    "Marte"
  ) {
    return (
      <div>
        <StatusBadge>
          PUNTOS DE INTERÉS ACTIVADOS
        </StatusBadge>

        <h2
          style={{
            fontSize: 19,
            margin:
              "12px 0 8px",
          }}
        >
          Gigantes de la superficie marciana
        </h2>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            opacity: 0.88,
            margin: 0,
          }}
        >
          Marte posee volcanes enormes, cañones gigantescos y casquetes de hielo. Gira el planeta para localizar los marcadores sobre su superficie.
        </p>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr",
            gap: 9,
            marginTop: 14,
          }}
        >
          <MarsFeature
            icon="🌋"
            title="Olympus Mons"
            text="Es el volcán más grande conocido del Sistema Solar. Se eleva aproximadamente 22 km sobre las llanuras que lo rodean."
          />

          <MarsFeature
            icon="🏜️"
            title="Valles Marineris"
            text="Es un inmenso sistema de cañones de unos 4.000 km de longitud: casi la anchura de Estados Unidos."
          />

          <MarsFeature
            icon="❄️"
            title="Casquetes polares"
            text="Los polos de Marte contienen hielo de agua y también dióxido de carbono congelado que cambia con las estaciones."
          />
        </div>

        <div
          style={{
            marginTop: 14,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(249,115,22,0.09)",
            border:
              "1px solid rgba(251,146,60,0.22)",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          📍 Los marcadores están anclados a la superficie de Marte. Al rotar el planeta, cada uno viaja con su región y desaparece cuando queda detrás.
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 11,
            lineHeight: 1.45,
            opacity: 0.55,
          }}
        >
          El tamaño de los marcadores está exagerado para que puedan verse fácilmente.
        </div>
      </div>
    );
  }

if (planet.name === "Júpiter") {
  return (
    <div>
      <StatusBadge>
        SIN SUPERFICIE SÓLIDA
      </StatusBadge>

      <h2
        style={{
          fontSize: 19,
          margin: "12px 0 8px",
        }}
      >
        ¿Dónde aterrizarías?
      </h2>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: 0,
        }}
      >
        En Júpiter no podrías aterrizar:
        es un gigante gaseoso y no tiene
        una superficie sólida como la
        Tierra o Marte.
      </p>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: "10px 0 0",
        }}
      >
        Lo que vemos desde el espacio son
        las capas superiores de sus nubes.
        Si descendieras, la presión y la
        temperatura aumentarían cada vez
        más.
      </p>

      <div
        style={{
          marginTop: 14,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(217,185,140,0.08)",
          border:
            "1px solid rgba(217,185,140,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        ☁️ <strong>DESCUBRIMIENTO:</strong>{" "}
        las bandas que ves en Júpiter
        forman parte de su enorme atmósfera,
        no de un suelo.
      </div>
    </div>
  );
}
if (planet.name === "Saturno") {
  return (
    <div>
      <StatusBadge>
        SIN SUPERFICIE SÓLIDA
      </StatusBadge>

      <h2
        style={{
          fontSize: 19,
          margin: "12px 0 8px",
        }}
      >
        Tampoco podrías aterrizar aquí
      </h2>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: 0,
        }}
      >
        Saturno es un gigante gaseoso.
        No posee una superficie sólida
        como la Tierra, Marte o Mercurio.
      </p>

      <div
        style={{
          marginTop: 14,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(245,158,11,0.08)",
          border:
            "1px solid rgba(250,204,21,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        ☁️ Las franjas que observas
        pertenecen a las capas superiores
        de su atmósfera. Al descender,
        la presión y la temperatura
        aumentarían enormemente.
      </div>
    </div>
  );
}
if (planet.name === "Urano") {
  return (
    <div>
      <StatusBadge>
        SIN SUPERFICIE SÓLIDA
      </StatusBadge>

      <h2
        style={{
          fontSize: 19,
          margin: "12px 0 8px",
        }}
      >
        Un gigante helado
      </h2>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: 0,
        }}
      >
        Urano no posee una superficie
        sólida sobre la que pudiéramos
        aterrizar. Sus capas exteriores
        están formadas principalmente
        por gases.
      </p>

      <div
        style={{
          marginTop: 14,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(34,211,238,0.07)",
          border:
            "1px solid rgba(103,232,249,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🧊 Aunque lo llamamos
        <strong> gigante helado</strong>,
        eso no significa que Urano sea
        una enorme bola de hielo. Bajo
        su atmósfera existen materiales
        como agua, metano y amoníaco a
        enormes presiones y temperaturas.
      </div>
    </div>
  );
}

if (planet.name === "Neptuno") {
  return (
    <div>
      <StatusBadge>
        SIN SUPERFICIE SÓLIDA
      </StatusBadge>

      <h2
        style={{
          fontSize: 19,
          margin: "12px 0 8px",
        }}
      >
        Un mundo sin suelo firme
      </h2>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: 0,
        }}
      >
        Neptuno es un gigante helado y
        no posee una superficie sólida
        sobre la que pudiéramos aterrizar.
        Lo que vemos son las capas
        superiores de su atmósfera.
      </p>

      <div
        style={{
          marginTop: 14,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(59,130,246,0.08)",
          border:
            "1px solid rgba(96,165,250,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🧊 Bajo sus nubes, la presión
        aumenta enormemente. En el
        interior existen materiales como
        agua, metano y amoníaco sometidos
        a condiciones extremas.
      </div>
    </div>
  );
}

  return (
    <ComingSoonSection
      eyebrow="SUPERFICIE"
      title={`Explora la superficie de ${planet.name}`}
      text="La exploración interactiva de la superficie de este mundo se incorporará progresivamente."
    />
  );
}

function AtmosphereSection({
  planet,
}) {
  if (
  planet.name ===
  "Mercurio"
) {
  return (
    <div>
      <StatusBadge>
        EXOSFERA EXTREMADAMENTE TENUE
      </StatusBadge>

      <h2
        style={{
          fontSize: 19,
          margin:
            "12px 0 8px",
        }}
      >
        Casi sin atmósfera
      </h2>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: 0,
        }}
      >
        Mercurio no posee una atmósfera densa como la Tierra. Está rodeado por una exosfera extremadamente tenue formada por átomos y partículas dispersas alrededor del planeta.
      </p>

      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: 9,
          marginTop: 14,
        }}
      >
        <AtmosphereGas
          value="Muy tenue"
          label="Densidad"
        />

        <AtmosphereGas
          value="Exosfera"
          label="Tipo"
        />

        <AtmosphereGas
          value="Na · O"
          label="Entre sus elementos"
        />

        <AtmosphereGas
          value="Casi vacío"
          label="Comparada con la Tierra"
        />
      </div>

      <div
        style={{
          marginTop: 14,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(245,158,11,0.08)",
          border:
            "1px solid rgba(250,204,21,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        ✨ Mira atentamente el borde de Mercurio. El halo representa su exosfera, pero en realidad sería muchísimo más tenue de lo que podemos mostrar en pantalla.
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(148,163,184,0.06)",
          border:
            "1px solid rgba(203,213,225,0.14)",
          fontSize: 12,
          lineHeight: 1.5,
        }}
      >
        ☀️ El viento solar y los impactos de pequeños cuerpos pueden liberar átomos de la superficie de Mercurio. Algunas de esas partículas pasan temporalmente a formar parte de su exosfera.
      </div>

      <div
        style={{
          marginTop: 10,
          fontSize: 11,
          lineHeight: 1.45,
          opacity: 0.55,
        }}
      >
        El grosor y el brillo del halo están exagerados para que la exosfera pueda distinguirse visualmente.
      </div>
    </div>
  );
}
  if (
    planet.name ===
    "Venus"
  ) {
    return (
      <div>
        <StatusBadge>
          NUBES VISIBLES
        </StatusBadge>

        <h2
          style={{
            fontSize: 19,
            margin:
              "12px 0 8px",
          }}
        >
          Un planeta oculto
        </h2>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            opacity: 0.88,
            margin: 0,
          }}
        >
          Venus posee una atmósfera extremadamente densa, formada principalmente por dióxido de carbono y cubierta por gruesas nubes de ácido sulfúrico.
        </p>

        <div
          style={{
            marginTop: 14,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(96,165,250,0.10)",
            border:
              "1px solid rgba(96,165,250,0.22)",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          ☁️ Desde el espacio, esas nubes esconden la superficie. Cambia ahora a{" "}
          <strong>
            SUPERFICIE
          </strong>{" "}
          y observa qué ocurre.
        </div>
      </div>
    );
  }

  if (
    planet.name ===
    "Tierra"
  ) {
    return (
      <div>
        <StatusBadge>
          ATMÓSFERA VISIBLE
        </StatusBadge>

        <h2
          style={{
            fontSize: 19,
            margin:
              "12px 0 8px",
          }}
        >
          El escudo azul de la Tierra
        </h2>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            opacity: 0.88,
            margin: 0,
          }}
        >
          La Tierra está rodeada por una fina envoltura de gases llamada atmósfera. Nos proporciona el aire que respiramos y ayuda a proteger la superficie del entorno espacial.
        </p>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: 9,
            marginTop: 14,
          }}
        >
          <AtmosphereGas
            value="78%"
            label="Nitrógeno"
          />

          <AtmosphereGas
            value="21%"
            label="Oxígeno"
          />

          <AtmosphereGas
            value="≈1%"
            label="Otros gases"
          />

          <AtmosphereGas
            value="≈100 km"
            label="Inicio del espacio*"
          />
        </div>

        <div
          style={{
            marginTop: 14,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(56,189,248,0.09)",
            border:
              "1px solid rgba(125,211,252,0.20)",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          🔵 Mira el borde de la Tierra: hemos exagerado visualmente el grosor de la atmósfera para que puedas distinguirla con claridad.
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 11,
            lineHeight: 1.45,
            opacity: 0.55,
          }}
        >
          * Los 100 km corresponden aproximadamente a la línea de Kármán, una referencia convencional para señalar el comienzo del espacio. La atmósfera no termina bruscamente a esa altura.
        </div>
      </div>
    );
  }

  if (
    planet.name ===
    "Marte"
  ) {
    return (
      <div>
        <StatusBadge>
          ATMÓSFERA MUY FINA
        </StatusBadge>

        <h2
          style={{
            fontSize: 19,
            margin:
              "12px 0 8px",
          }}
        >
          Un cielo muy diferente
        </h2>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            opacity: 0.88,
            margin: 0,
          }}
        >
          Marte tiene una atmósfera mucho más fina que la de la Tierra. Está formada principalmente por dióxido de carbono y retiene mucho menos calor.
        </p>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: 9,
            marginTop: 14,
          }}
        >
          <AtmosphereGas
            value="≈95%"
            label="Dióxido de carbono"
          />

          <AtmosphereGas
            value="<1%"
            label="Presión respecto a la Tierra"
          />

          <AtmosphereGas
            value="≈−63 °C"
            label="Temperatura media"
          />

          <AtmosphereGas
            value="Muy fina"
            label="Atmósfera"
          />
        </div>

        <div
          style={{
            marginTop: 14,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(249,115,22,0.09)",
            border:
              "1px solid rgba(251,146,60,0.22)",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          🔴 Mira el borde de Marte. El halo representa su tenue atmósfera. Su grosor está exagerado en la visualización para que podamos distinguirla.
        </div>

        <div
          style={{
            marginTop: 10,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(234,88,12,0.07)",
            border:
              "1px solid rgba(251,146,60,0.15)",
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          🌪️ Aunque la atmósfera es muy tenue, el polvo puede levantarse y formar enormes tormentas. Algunas llegan a extenderse por gran parte del planeta.
        </div>
      </div>
    );
  }
if (planet.name === "Júpiter") {
  return (
    <div>
      <StatusBadge>
        ATMÓSFERA GIGANTE
      </StatusBadge>

      <h2
        style={{
          fontSize: 19,
          margin: "12px 0 8px",
        }}
      >
        Un mundo de nubes y tormentas
      </h2>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: 0,
        }}
      >
        Júpiter está formado principalmente
        por hidrógeno y helio. Sus nubes se
        organizan en bandas que recorren el
        planeta a enormes velocidades.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 9,
          marginTop: 14,
        }}
      >
        <AtmosphereGas
          value="H₂"
          label="Gas principal"
        />

        <AtmosphereGas
          value="He"
          label="Segundo gas"
        />
      </div>

      <div
        style={{
          marginTop: 14,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(239,68,68,0.08)",
          border:
            "1px solid rgba(248,113,113,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🔴 <strong>Gran Mancha Roja:</strong>{" "}
        es una gigantesca tormenta que lleva
        observándose desde hace siglos.
      </div>

      <div
        style={{
          marginTop: 10,
          fontSize: 11,
          lineHeight: 1.45,
          opacity: 0.55,
        }}
      >
        Los marcadores sobre el planeta te
        permiten localizar una zona clara,
        un cinturón oscuro y la Gran Mancha
        Roja.
      </div>
    </div>
  );
}

if (planet.name === "Saturno") {
  return (
    <div>
      <StatusBadge>
        GIGANTE GASEOSO
      </StatusBadge>

      <h2
        style={{
          fontSize: 19,
          margin: "12px 0 8px",
        }}
      >
        Una atmósfera enorme
      </h2>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: 0,
        }}
      >
        La atmósfera de Saturno está
        formada principalmente por
        hidrógeno y helio.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: 9,
          marginTop: 14,
        }}
      >
        <AtmosphereGas
          value="H₂"
          label="Gas principal"
        />

        <AtmosphereGas
          value="He"
          label="Segundo gas"
        />
      </div>

      <div
        style={{
          marginTop: 14,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(59,130,246,0.08)",
          border:
            "1px solid rgba(96,165,250,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🌬️ Saturno posee fuertes
        corrientes atmosféricas y
        enormes sistemas de tormentas.
      </div>
    </div>
  );
}

if (planet.name === "Urano") {
  return (
    <div>
      <StatusBadge>
        ATMÓSFERA FRÍA
      </StatusBadge>

      <h2
        style={{
          fontSize: 19,
          margin: "12px 0 8px",
        }}
      >
        El metano le da su color
      </h2>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: 0,
        }}
      >
        La atmósfera de Urano está
        formada principalmente por
        hidrógeno y helio, con pequeñas
        cantidades de metano.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 9,
          marginTop: 14,
        }}
      >
        <AtmosphereGas
          value="H₂"
          label="Gas principal"
        />

        <AtmosphereGas
          value="CH₄"
          label="Metano"
        />
      </div>

      <div
        style={{
          marginTop: 14,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(34,211,238,0.07)",
          border:
            "1px solid rgba(103,232,249,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🔵 El metano absorbe parte de
        la luz roja del Sol, ayudando
        a que Urano presente su tono
        azul verdoso característico.
      </div>

      <div
        style={{
          marginTop: 10,
          fontSize: 11,
          lineHeight: 1.45,
          opacity: 0.55,
        }}
      >
        Urano es uno de los planetas
        más fríos del Sistema Solar.
      </div>
    </div>
  );
}

if (planet.name === "Neptuno") {
  return (
    <div>
      <StatusBadge>
        ATMÓSFERA ACTIVA
      </StatusBadge>

      <h2
        style={{
          fontSize: 19,
          margin: "12px 0 8px",
        }}
      >
        Vientos extraordinarios
      </h2>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: 0,
        }}
      >
        La atmósfera de Neptuno está
        formada principalmente por
        hidrógeno y helio, además de
        pequeñas cantidades de metano.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 9,
          marginTop: 14,
        }}
      >
        <AtmosphereGas
          value="H₂"
          label="Gas principal"
        />

        <AtmosphereGas
          value="CH₄"
          label="Metano"
        />
      </div>

      <div
        style={{
          marginTop: 14,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(59,130,246,0.08)",
          border:
            "1px solid rgba(96,165,250,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        💨 Neptuno posee los vientos
        más rápidos conocidos entre los
        planetas del Sistema Solar:
        pueden superar los
        <strong> 2.000 km/h</strong>.
      </div>
    </div>
  );
}

  return (
    <ComingSoonSection
      eyebrow="ATMÓSFERA"
      title={`Investiga la atmósfera de ${planet.name}`}
      text="Esta sección incorporará experiencias visuales para estudiar la composición y los fenómenos atmosféricos de cada planeta."
    />
  );
}

function MoonsSection({
  planet,
}) {
    if (
    planet.name ===
    "Mercurio"
  ) {
    return (
      <div>
        <StatusBadge>
          0 LUNAS
        </StatusBadge>

        <h2
          style={{
            fontSize: 19,
            margin:
              "12px 0 8px",
          }}
        >
          Mercurio no tiene lunas
        </h2>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            opacity: 0.88,
            margin: 0,
          }}
        >
          Mercurio no posee ningún satélite natural conocido. Junto con Venus, es uno de los dos únicos planetas del Sistema Solar que no tienen lunas.
        </p>

        <div
          style={{
            marginTop: 14,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(245,158,11,0.08)",
            border:
              "1px solid rgba(250,204,21,0.18)",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          ☀️ Mercurio se encuentra muy cerca del Sol, donde la influencia gravitatoria solar es muy intensa. No conocemos ninguna luna que orbite de forma natural alrededor del planeta.
        </div>

        <div
          style={{
            marginTop: 10,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(59,130,246,0.07)",
            border:
              "1px solid rgba(96,165,250,0.16)",
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          🔭 Cuando explores otros planetas descubrirás una enorme diferencia: mientras Mercurio tiene <strong>0 lunas</strong>, algunos gigantes del Sistema Solar poseen decenas.
        </div>
      </div>
    );
  }
  if (
    planet.name ===
    "Venus"
  ) {
    return (
      <div>
        <StatusBadge>
          0 LUNAS
        </StatusBadge>

        <h2
          style={{
            fontSize: 19,
            margin:
              "12px 0 8px",
          }}
        >
          Venus no tiene lunas
        </h2>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            opacity: 0.88,
            margin: 0,
          }}
        >
          Venus es uno de los dos planetas del Sistema Solar que no poseen satélites naturales. El otro es Mercurio.
        </p>
      </div>
    );
  }

  if (
    planet.name ===
    "Tierra"
  ) {
    return (
      <div>
        <StatusBadge>
          1 LUNA
        </StatusBadge>

        <h2
          style={{
            fontSize: 19,
            margin:
              "12px 0 8px",
          }}
        >
          Nuestro satélite natural
        </h2>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            opacity: 0.88,
            margin: 0,
          }}
        >
          La Luna es el único satélite natural de la Tierra. Mientras nuestro planeta gira alrededor del Sol, la Luna viaja con nosotros orbitando la Tierra.
        </p>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: 9,
            marginTop: 14,
          }}
        >
          <InfoBox
            label="Diámetro"
            value="3.475 km"
          />

          <InfoBox
            label="Distancia media"
            value="384.400 km"
          />

          <InfoBox
            label="Órbita"
            value="27,3 días"
          />

          <InfoBox
            label="Rotación"
            value="27,3 días"
          />
        </div>

        <div
          style={{
            marginTop: 14,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(148,163,184,0.10)",
            border:
              "1px solid rgba(203,213,225,0.18)",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          🌕 Observa la Luna girando alrededor de la Tierra. La animación está acelerada para que puedas apreciar fácilmente su órbita.
        </div>

        <div
          style={{
            marginTop: 10,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(59,130,246,0.08)",
            border:
              "1px solid rgba(96,165,250,0.18)",
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          ¿Sabías que la Luna tarda aproximadamente lo mismo en girar sobre sí misma que en dar una vuelta alrededor de la Tierra? Por eso siempre vemos prácticamente la misma cara desde nuestro planeta.
        </div>
      </div>
    );
  }

  if (
    planet.name ===
    "Marte"
  ) {
    return (
      <div>
        <StatusBadge>
          2 LUNAS
        </StatusBadge>

        <h2
          style={{
            fontSize: 19,
            margin:
              "12px 0 8px",
          }}
        >
          Fobos y Deimos
        </h2>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            opacity: 0.88,
            margin: 0,
          }}
        >
          Marte tiene dos pequeños satélites naturales. Ambos son mucho más pequeños que nuestra Luna y poseen formas irregulares.
        </p>

        <div
          style={{
            marginTop: 14,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(249,115,22,0.08)",
            border:
              "1px solid rgba(251,146,60,0.18)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color:
                "#fdba74",
              marginBottom: 8,
            }}
          >
            🪨 Fobos
          </div>

          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: 8,
            }}
          >
            <InfoBox
              label="Diámetro aprox."
              value="22 km"
            />

            <InfoBox
              label="Órbita"
              value="7 h 39 min"
            />
          </div>

          <p
            style={{
              fontSize: 12,
              lineHeight: 1.5,
              opacity: 0.72,
              margin:
                "10px 0 0",
            }}
          >
            Es la luna más grande y cercana a Marte. Se mueve alrededor del planeta mucho más rápido que Deimos.
          </p>
        </div>

        <div
          style={{
            marginTop: 10,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(148,163,184,0.07)",
            border:
              "1px solid rgba(203,213,225,0.15)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color:
                "#d6d3d1",
              marginBottom: 8,
            }}
          >
            🪨 Deimos
          </div>

          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: 8,
            }}
          >
            <InfoBox
              label="Diámetro aprox."
              value="12 km"
            />

            <InfoBox
              label="Órbita"
              value="30 h 18 min"
            />
          </div>

          <p
            style={{
              fontSize: 12,
              lineHeight: 1.5,
              opacity: 0.72,
              margin:
                "10px 0 0",
            }}
          >
            Es más pequeña y orbita mucho más lejos de Marte, por eso tarda más tiempo en completar una vuelta.
          </p>
        </div>

        <div
          style={{
            marginTop: 14,
            padding: 13,
            borderRadius: 14,
            background:
              "rgba(59,130,246,0.08)",
            border:
              "1px solid rgba(96,165,250,0.18)",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          🛰️ Observa las dos órbitas. Fobos es el satélite interior y se desplaza más deprisa; Deimos se encuentra más lejos y avanza más lentamente.
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 11,
            lineHeight: 1.45,
            opacity: 0.55,
          }}
        >
          Los tamaños, las distancias y las velocidades de la animación están adaptados para facilitar la comparación y no representan la escala real.
        </div>
      </div>
    );
  }

if (planet.name === "Júpiter") {
  return (
    <div>
      <StatusBadge>
        LUNAS GALILEANAS
      </StatusBadge>

      <h2
        style={{
          fontSize: 19,
          margin: "12px 0 8px",
        }}
      >
        Las lunas galileanas
      </h2>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: 0,
        }}
      >
        Júpiter tiene muchas lunas,
        pero cuatro destacan por su
        tamaño e importancia:
        Ío, Europa, Ganímedes y Calisto.
      </p>

      <div
        style={{
          marginTop: 14,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(148,163,184,0.08)",
          border:
            "1px solid rgba(148,163,184,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🌋 <strong>Ío:</strong>{" "}
        uno de los mundos con mayor
        actividad volcánica conocida.
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(125,211,252,0.07)",
          border:
            "1px solid rgba(125,211,252,0.16)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🧊 <strong>Europa:</strong>{" "}
        bajo su superficie helada
        podría existir un enorme
        océano de agua líquida.
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(148,163,184,0.08)",
          border:
            "1px solid rgba(148,163,184,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🌕 <strong>Ganímedes:</strong>{" "}
        es la luna más grande del
        Sistema Solar.
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(125,211,252,0.07)",
          border:
            "1px solid rgba(125,211,252,0.16)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🌑 <strong>Calisto:</strong>{" "}
        su superficie está cubierta
        por antiguos cráteres.
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(217,185,140,0.08)",
          border:
            "1px solid rgba(217,185,140,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🔭 <strong>OBSERVA:</strong>{" "}
        Galileo estudió estas cuatro
        lunas en 1610.
      </div>

      <div
        style={{
          marginTop: 10,
          fontSize: 11,
          lineHeight: 1.45,
          opacity: 0.55,
        }}
      >
        Las distancias, tamaños y
        velocidades se han adaptado
        para poder observarlas mejor.
      </div>
    </div>
  );
}
if (planet.name === "Saturno") {
  return (
    <div>
      <StatusBadge>
        MUNDOS DE SATURNO
      </StatusBadge>

      <h2
        style={{
          fontSize: 19,
          margin: "12px 0 8px",
        }}
      >
        Titán y Encélado
      </h2>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: 0,
        }}
      >
        Saturno posee muchas lunas.
        Dos de las más fascinantes son
        Titán y Encélado.
      </p>

      <div
        style={{
          marginTop: 14,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(245,158,11,0.08)",
          border:
            "1px solid rgba(250,204,21,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🌕 <strong>Titán:</strong>{" "}
        es la luna más grande de Saturno
        y posee una atmósfera muy densa.
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(147,197,253,0.07)",
          border:
            "1px solid rgba(147,197,253,0.16)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        💧 <strong>Encélado:</strong>{" "}
        es un pequeño mundo helado que
        expulsa chorros de agua y hielo
        desde su región polar.
      </div>

      <div
        style={{
          marginTop: 10,
          fontSize: 11,
          lineHeight: 1.45,
          opacity: 0.55,
        }}
      >
        Los tamaños, distancias y
        velocidades de las lunas están
        adaptados para facilitar su
        observación.
      </div>
    </div>
  );
}

if (planet.name === "Urano") {
  return (
    <div>
      <StatusBadge>
        LUNAS DE URANO
      </StatusBadge>

      <h2
        style={{
          fontSize: 19,
          margin: "12px 0 8px",
        }}
      >
        Titania y Miranda
      </h2>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: 0,
        }}
      >
        Urano posee numerosas lunas.
        Dos de las más conocidas son
        Titania y Miranda.
      </p>

      <div
        style={{
          marginTop: 14,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(148,163,184,0.08)",
          border:
            "1px solid rgba(148,163,184,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🌕 <strong>Titania:</strong>{" "}
        es la luna más grande de Urano.
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(125,211,252,0.07)",
          border:
            "1px solid rgba(125,211,252,0.16)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🧊 <strong>Miranda:</strong>{" "}
        posee una superficie muy variada,
        con grandes acantilados y terrenos
        que parecen haber sido remodelados.
      </div>

      <div
        style={{
          marginTop: 10,
          fontSize: 11,
          lineHeight: 1.45,
          opacity: 0.55,
        }}
      >
        Los tamaños, distancias y
        velocidades están adaptados para
        facilitar su observación.
      </div>
    </div>
  );
}

if (planet.name === "Neptuno") {
  return (
    <div>
      <StatusBadge>
        LUNAS DE NEPTUNO
      </StatusBadge>

      <h2
        style={{
          fontSize: 19,
          margin: "12px 0 8px",
        }}
      >
        Tritón
      </h2>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          opacity: 0.88,
          margin: 0,
        }}
      >
        Tritón es la luna más grande
        de Neptuno y uno de los mundos
        helados más interesantes del
        Sistema Solar.
      </p>

      <div
        style={{
          marginTop: 14,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(148,163,184,0.08)",
          border:
            "1px solid rgba(148,163,184,0.18)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        🔄 <strong>Órbita retrógrada:</strong>{" "}
        Tritón orbita Neptuno en sentido
        contrario a la rotación del planeta.
        Esto hace pensar que pudo ser
        capturado por la gravedad de Neptuno.
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 13,
          borderRadius: 14,
          background:
            "rgba(96,165,250,0.07)",
          border:
            "1px solid rgba(96,165,250,0.16)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        ❄️ Su superficie es extremadamente
        fría y está cubierta por hielos.
      </div>

      <div
        style={{
          marginTop: 10,
          fontSize: 11,
          lineHeight: 1.45,
          opacity: 0.55,
        }}
      >
        El tamaño, la distancia y la
        velocidad están adaptados para
        facilitar su observación.
      </div>
    </div>
  );
}

  return (
    <ComingSoonSection
      eyebrow="LUNAS"
      title={`Descubre las lunas de ${planet.name}`}
      text="Aquí podremos explorar los satélites naturales asociados a este planeta."
    />
  );
}

function MercuryFeature({
  icon,
  title,
  text,
}) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 13,
        background:
          "rgba(245,158,11,0.06)",
        border:
          "1px solid rgba(250,204,21,0.15)",
      }}
    >
      <div
        style={{
          display:
            "flex",
          alignItems:
            "center",
          gap: 7,
          marginBottom: 5,
        }}
      >
        <span>
          {icon}
        </span>

        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color:
              "#fde68a",
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          fontSize: 12,
          lineHeight: 1.45,
          opacity: 0.76,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function MarsFeature({
  icon,
  title,
  text,
}) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 13,
        background:
          "rgba(249,115,22,0.07)",
        border:
          "1px solid rgba(251,146,60,0.16)",
      }}
    >
      <div
        style={{
          display:
            "flex",
          alignItems:
            "center",
          gap: 7,
          marginBottom: 5,
        }}
      >
        <span>
          {icon}
        </span>

        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color:
              "#fdba74",
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          fontSize: 12,
          lineHeight: 1.45,
          opacity: 0.76,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function StatusBadge({
  children,
}) {
  return (
    <div
      style={{
        display:
          "inline-flex",
        alignItems:
          "center",
        padding:
          "6px 9px",
        borderRadius:
          999,
        background:
          "rgba(59,130,246,0.13)",
        border:
          "1px solid rgba(96,165,250,0.25)",
        color:
          "#93c5fd",
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 1,
      }}
    >
      {children}
    </div>
  );
}

function ComingSoonSection({
  eyebrow,
  title,
  text,
}) {
  return (
    <div
      style={{
        padding:
          "18px 4px 4px",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing:
            1.4,
          color:
            "#60a5fa",
          marginBottom: 8,
        }}
      >
        {eyebrow}
      </div>

      <div
        style={{
          fontSize: 19,
          lineHeight: 1.25,
          fontWeight: 750,
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 14,
          lineHeight: 1.5,
          opacity: 0.72,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function AtmosphereGas({
  value,
  label,
}) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 13,
        background:
          "rgba(56,189,248,0.07)",
        border:
          "1px solid rgba(125,211,252,0.14)",
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 800,
          color:
            "#7dd3fc",
          marginBottom: 3,
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize: 11,
          opacity: 0.7,
        }}
      >
        {label}
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
