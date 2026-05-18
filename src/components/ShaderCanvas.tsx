import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = a_position;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;
    float t = u_time * 0.08;

    vec2 noisePos = st * 2.5;
    noisePos += vec2(snoise(st * 0.5 + t), snoise(st * 0.5 + t + 2.0)) * 0.3;
    noisePos += vec2(snoise(st * 1.0 - t * 0.5), snoise(st * 1.0 - t * 0.5 + 3.0)) * 0.15;
    float noiseVal = fbm(noisePos);

    vec3 color1 = vec3(0.18, 0.03, 0.06);
    vec3 color2 = vec3(0.29, 0.05, 0.09);
    vec3 color3 = vec3(0.42, 0.08, 0.14);
    vec3 color4 = vec3(0.55, 0.12, 0.18);

    float gradient = st.y + noiseVal * 0.4 + sin(st.x * 1.5 + t) * 0.08;
    gradient = clamp(gradient, 0.0, 1.0);

    float blend1 = smoothstep(0.0, 0.4, gradient);
    float blend2 = smoothstep(0.3, 0.7, gradient);
    float blend3 = smoothstep(0.6, 1.0, gradient);

    vec3 finalColor = mix(color1, color2, blend1);
    finalColor = mix(finalColor, color3, blend2);
    finalColor = mix(finalColor, color4, blend3);

    finalColor += vec3(0.03, 0.005, 0.0);

    float vig = length(st - vec2(0.5 * u_resolution.x / u_resolution.y, 0.5));
    finalColor *= smoothstep(1.2, 0.3, vig);

    finalColor += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - 0.5) * 0.02;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function ShaderCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationId: number;
    let isActive = true;

    const animate = () => {
      if (!isActive) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      uniforms.u_time.value += 0.016;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h);
    };

    window.addEventListener('resize', handleResize);
    animationId = requestAnimationFrame(animate);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    />
  );
}
