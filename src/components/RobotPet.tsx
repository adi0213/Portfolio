/**
 * RobotPet — GLB-based companion with:
 *  • Global mouse tracking (eyes + head follow cursor anywhere on page)
 *  • Auto-wave every 5s (shoulder → forearm → hand, returns smoothly)
 *  • Grayish-black base with pulsing brand accents
 *  • Faces forward on load
 */

import { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, ContactShadows, Center, Bounds } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/genkub_greeting_robot.glb');

/* ── Shared mouse NDC updated globally (whole window) ───────── */
const mouse = { x: 0, y: 0 };

/* ── Materials ───────────────────────────────────────────────── */
const MATS = {
  body:   new THREE.MeshStandardMaterial({ color: '#3a3a3e', roughness: 0.30, metalness: 0.80 }),
  joint:  new THREE.MeshStandardMaterial({ color: '#252528', roughness: 0.40, metalness: 0.90 }),
  head:   new THREE.MeshStandardMaterial({ color: '#2e2e34', roughness: 0.25, metalness: 0.82 }),
  eye:    new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#c8e8ff', emissiveIntensity: 3.5, roughness: 0, metalness: 0 }),
  accent: new THREE.MeshStandardMaterial({ color: '#C9361C', emissive: '#C9361C', emissiveIntensity: 2.0, roughness: 0.15, metalness: 0.5 }),
  purple: new THREE.MeshStandardMaterial({ color: '#7B61FF', emissive: '#7B61FF', emissiveIntensity: 1.2, roughness: 0.20, metalness: 0.4 }),
};

function pickMat(name: string, idx: number) {
  const n = name.toLowerCase();
  if (/eye|lens|pupil|iris|visor/.test(n))                           return MATS.eye;
  if (/chest|core|badge|ring|glow|antenna|light|accent|led/.test(n)) return MATS.accent;
  if (/joint|socket|knee|elbow|hip|neck|wrist|ankle/.test(n))        return MATS.joint;
  if (/head|face|helm|skull|cap/.test(n))                            return MATS.head;
  if (/detail|panel|stripe|rib|trim/.test(n))                        return MATS.purple;
  if (idx % 7 === 0) return MATS.accent;
  if (idx % 5 === 0) return MATS.purple;
  return MATS.body;
}

/* ── GLB component ───────────────────────────────────────────── */
function GenkubRobot({ hovered }: { hovered: boolean }) {
  const { scene } = useGLTF('/genkub_greeting_robot.glb');

  // Store initial bone quaternions so we can lerp back
  const initQ = useRef<Map<string, THREE.Quaternion>>(new Map());

  useEffect(() => {
    let i = 0;
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.material = pickMat(obj.name, i++);
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
      // Store initial quaternion for every named node
      if (obj.name) {
        initQ.current.set(obj.name, obj.quaternion.clone());
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const pulse = (Math.sin(t * 2.5) + 1) / 2;

    /* Material pulse */
    MATS.accent.emissiveIntensity = hovered ? 3.0 + pulse * 1.5 : 1.6 + pulse * 0.8;
    MATS.eye.emissiveIntensity    = hovered ? 5.0 + pulse * 2.0 : 3.0 + pulse * 1.0;
    MATS.purple.emissiveIntensity = 0.8 + pulse * 0.6;

    /* ── Eye / Head tracking ─────────────────────────────────
       The primitive has rotation [0, -PI/2, 0].
       In that local space: local-Y = world-Y (left/right OK with .y)
       For up/down we rotate around world-X = local -Z → use .z negated.
    ─────────────────────────────────────────────────────────── */
    const eyesNode = scene.getObjectByName('Eyes Move') ?? scene.getObjectByName('Eyes');
    const headNode = scene.getObjectByName('Head');

    // mouse.x → rotation around world-Y  → local rotation.y (same axis, sign: +mouse.x = look right = -rotY)
    // mouse.y → rotation around world-X  → local rotation.z (scene local +Z = world -X, so negate)
    const eyeY = -mouse.x * 0.7;   // eyes track left/right
    const eyeZ =  mouse.y * 0.4;   // eyes track up/down  (negated axis offset)
    const hdY  = -mouse.x * 0.35;  // head follows subtly
    const hdZ  =  mouse.y * 0.2;

    if (eyesNode) {
      eyesNode.rotation.y = THREE.MathUtils.lerp(eyesNode.rotation.y, eyeY, delta * 8);
      eyesNode.rotation.z = THREE.MathUtils.lerp(eyesNode.rotation.z, eyeZ, delta * 8);
    }
    if (headNode) {
      headNode.rotation.y = THREE.MathUtils.lerp(headNode.rotation.y, hdY, delta * 5);
      headNode.rotation.z = THREE.MathUtils.lerp(headNode.rotation.z, hdZ, delta * 5);
    }

    /* ── Wave arm every 5 s ──────────────────────────────────
       Wave window: first 1.8 s of every 5 s cycle.
       Don't wave at t=0 (offset by -2 so first wave fires at t=3).
    ─────────────────────────────────────────────────────────── */
    const cycle   = (t + 3) % 5;   // +3 → first wave at t=2 (not immediately)
    const isWave  = cycle < 1.8;

    const shoulder  = scene.getObjectByName('ARM_R') ?? scene.getObjectByName('Arm_R');
    const forearm   = scene.getObjectByName('Forearm_R');
    const hand      = scene.getObjectByName('HAND_R') ?? scene.getObjectByName('Hand Down');

    if (shoulder) {
      // Raise shoulder up (around its Z in scene-local = world X → lifts arm up)
      const targetZ = isWave ? -Math.PI / 2.2 : 0;
      shoulder.rotation.z = THREE.MathUtils.lerp(shoulder.rotation.z, targetZ, delta * 6);

      if (forearm) {
        // Swing forearm back and forth while waving
        const targetFZ = isWave ? Math.sin(t * 14) * 0.45 : 0;
        forearm.rotation.z = THREE.MathUtils.lerp(forearm.rotation.z, targetFZ, delta * (isWave ? 25 : 6));
      }
      if (hand) {
        const targetHZ = isWave ? Math.sin(t * 14 + 0.5) * 0.2 : 0;
        hand.rotation.z = THREE.MathUtils.lerp(hand.rotation.z, targetHZ, delta * (isWave ? 25 : 6));
      }
    }
  });

  /* Fix initial facing: the Spline export has its ear to the camera.
     Rotate -90° around Y to face forward. */
  return <primitive object={scene} rotation={[0, -Math.PI / 2, 0]} />;
}

/* ── Global mouse tracker (window-level, no canvas dependency) ── */
function PointerTracker() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onLeave = () => { mouse.x = 0; mouse.y = 0; };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return null;
}

/* ── Body wrapper: subtle body sway to reinforce tracking ─────── */
function AnimatedModel({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const pulse = (Math.sin(t * 2.5) + 1) / 2;

    // Update body-level materials not touched inside GenkubRobot
    MATS.body.roughness = 0.28 + pulse * 0.04;

    if (!ref.current) return;
    // Subtle body lean (eyes/head do the heavy lifting)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouse.x * 0.15, delta * 3);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -mouse.y * 0.08, delta * 3);
  });

  return (
    <group ref={ref}>
      <Center>
        <GenkubRobot hovered={hovered} />
      </Center>
    </group>
  );
}

/* ── Lights ──────────────────────────────────────────────────── */
function Lights({ hovered }: { hovered: boolean }) {
  return (
    <>
      <pointLight position={[3, 5, 5]}    intensity={hovered ? 7 : 4}   color="#ffe8d6" />
      <pointLight position={[-3, 2, -2]}  intensity={2.0}               color="#7B61FF" />
      <pointLight position={[0, -3, 2]}   intensity={hovered ? 3 : 1.5} color="#C9361C" />
      <pointLight position={[0, 6, 0]}    intensity={1.2}               color="#ffffff" />
      <ambientLight intensity={0.75} color="#202028" />
    </>
  );
}

/* ── Canvas ──────────────────────────────────────────────────── */
export default function RobotPet({ onPointerEnter, onPointerLeave, hovered }: {
  hovered: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  return (
    <Canvas
      camera={{ fov: 45, near: 0.001, far: 10000 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <PointerTracker />
      <Lights hovered={hovered} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.6}>
          <Float speed={1.2} rotationIntensity={0.03} floatIntensity={0.25} floatingRange={[-0.02, 0.02]}>
            <AnimatedModel hovered={hovered} />
          </Float>
        </Bounds>
        <ContactShadows position={[0, -0.8, 0]} opacity={0.4} scale={4} blur={3} far={3} color="#C9361C" />
      </Suspense>
    </Canvas>
  );
}
