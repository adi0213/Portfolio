/**
 * BouncingTechStack — Physics-based bouncing tech balls (ported from MoncyDev/Portfolio-Website).
 * Uses @react-three/rapier for physics + @react-three/postprocessing for AO.
 * Tech stack customised for Adith S: FastAPI, Flutter, Python, MySQL, ESP32/IoT,
 * Firebase, GitHub, TypeScript, React, Node.
 */
import * as THREE from 'three';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, N8AO } from '@react-three/postprocessing';
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from '@react-three/rapier';

/* ── Images — use cloned repo's images where they exist, placeholder for others ── */
const imageUrls = [
  '/images/react2.webp',       // React
  '/images/typescript.webp',   // TypeScript
  '/images/javascript.webp',   // JavaScript (maps to Python vibe)
  '/images/mysql.webp',        // MySQL
  '/images/mongo.webp',        // Firebase (closest match)
  '/images/node2.webp',        // Node / FastAPI backend vibe
  '/images/express.webp',      // Express / API
  '/images/next2.webp',        // Next.js
  '/images/react2.webp',       // Repeat for more variety
  '/images/typescript.webp',
];

const textureLoader = new THREE.TextureLoader();
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.65, 0.9, 0.75, 1, 0.85][Math.floor(Math.random() * 5)],
}));

/* ── Individual sphere ────────────────────────────────────── */
type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );
    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

/* ── Invisible kinematic sphere that follows the mouse ─────── */
function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.lerp(
        new THREE.Vector3(
          (pointer.x * viewport.width) / 2,
          (pointer.y * viewport.height) / 2,
          0
        ),
        0.2
      )
    );
  });

  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[3]} />
    </RigidBody>
  );
}

/* ── Main component ───────────────────────────────────────── */
export default function BouncingTechStack() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay so the section is in view before physics starts
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  const materials = useMemo(
    () =>
      textures.map(
        (texture) =>
          new THREE.MeshPhysicalMaterial({
            map: texture,
            emissive: '#ffffff',
            emissiveMap: texture,
            emissiveIntensity: 0.3,
            metalness: 0.5,
            roughness: 1,
            clearcoat: 0.1,
          })
      ),
    []
  );

  return (
    <section id="skills" className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 pt-24 pb-4 text-center">
        <span className="font-body text-xs uppercase tracking-[0.25em] text-[var(--primary-accent)]">
          Chapter 02 — What I Use
        </span>
        <h2
          className="font-display font-black text-[var(--cream)] leading-none mt-3"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
        >
          Tech Stack
        </h2>
        <p className="font-body text-[rgba(242,235,224,0.45)] mt-4 text-sm tracking-wide">
          Drag the balls · They bounce off your cursor
        </p>
      </div>

      {/* Physics canvas */}
      <div style={{ width: '100%', height: '60vh', minHeight: '420px' }}>
        {mounted && (
          <Canvas
            shadows
            gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
            camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
            onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={1} />
            <spotLight
              position={[20, 20, 25]}
              penumbra={1}
              angle={0.2}
              color="white"
              castShadow
              shadow-mapSize={[512, 512]}
            />
            <directionalLight position={[0, 5, -4]} intensity={2} />

            <Physics gravity={[0, 0, 0]}>
              <Pointer />
              {spheres.map((props, i) => (
                <SphereGeo
                  key={i}
                  {...props}
                  material={materials[i % materials.length]}
                />
              ))}
            </Physics>

            <Environment files="/char_enviorment.hdr" environmentIntensity={0.5} environmentRotation={[0, 4, 2]} />
            <EffectComposer enableNormalPass={false}>
              <N8AO color="#0a0a0a" aoRadius={2} intensity={1.15} />
            </EffectComposer>
          </Canvas>
        )}
      </div>

      {/* Text skill tags below */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 pb-20">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'FastAPI', 'Flutter', 'Python', 'ESP32', 'MQTT', 'MySQL',
            'InfluxDB', 'React', 'TypeScript', 'Firebase', 'REST APIs',
            'Penetration Testing', 'OpenAI', 'Mapbox', 'GitHub',
          ].map((tech) => (
            <span
              key={tech}
              className="font-body text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-[rgba(242,235,224,0.08)] text-[rgba(242,235,224,0.5)] hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
