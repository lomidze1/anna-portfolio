import { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Simplex 3D Noise (GLSL) ────────────────────────────────
const noiseGLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
varying vec2 vUv;

${noiseGLSL}

void main() {
  vec2 uv = vUv;

  // Mouse influence — subtle warping near cursor
  float mouseDist = length(uv - (uMouse * 0.5 + 0.5));
  float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.15;

  // Multi-octave noise for organic blob movement
  float n1 = snoise(vec3(uv * 2.0 + uTime * 0.15, uTime * 0.1));
  float n2 = snoise(vec3(uv * 1.5 - uTime * 0.1, uTime * 0.15 + 10.0));
  float n3 = snoise(vec3(uv * 3.0 + mouseInfluence, uTime * 0.08 + 20.0));

  // Mix 4 colors based on noise layers
  vec3 color = mix(uColor1, uColor2, smoothstep(-0.5, 0.5, n1));
  color = mix(color, uColor3, smoothstep(-0.3, 0.7, n2));
  color = mix(color, uColor4, smoothstep(0.0, 1.0, n3) * 0.5);

  // Subtle vignette for depth
  float vignette = smoothstep(1.4, 0.5, length(uv - 0.5) * 1.5);
  color *= vignette * 0.9 + 0.1;

  gl_FragColor = vec4(color, 1.0);
}
`;

// ─── Color Palettes ─────────────────────────────────────────
const DARK_PALETTE = {
  color1: new THREE.Color('#050510'),
  color2: new THREE.Color('#0f1b3d'),
  color3: new THREE.Color('#1a2a5e'),
  color4: new THREE.Color('#0a1628'),
};

const LIGHT_PALETTE = {
  color1: new THREE.Color('#d4dbe2'),
  color2: new THREE.Color('#b8c8d8'),
  color3: new THREE.Color('#a0b4c8'),
  color4: new THREE.Color('#dde1e4'),
};

// ─── Gradient Mesh (inner R3F component) ────────────────────
function GradientMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute('data-theme') === 'dark'
  );

  // Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(
        document.documentElement.getAttribute('data-theme') === 'dark'
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  // Mouse tracking
  const handlePointerMove = useCallback((e: THREE.Event & { uv?: THREE.Vector2 }) => {
    if (e.uv) {
      mouseRef.current.set(e.uv.x * 2 - 1, e.uv.y * 2 - 1);
    }
  }, []);

  const palette = isDark ? DARK_PALETTE : LIGHT_PALETTE;

  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: palette.color1 },
    uColor2: { value: palette.color2 },
    uColor3: { value: palette.color3 },
    uColor4: { value: palette.color4 },
  });

  // Update palette colors on theme change
  useEffect(() => {
    const p = isDark ? DARK_PALETTE : LIGHT_PALETTE;
    uniforms.current.uColor1.value = p.color1;
    uniforms.current.uColor2.value = p.color2;
    uniforms.current.uColor3.value = p.color3;
    uniforms.current.uColor4.value = p.color4;
  }, [isDark]);

  useFrame((_, delta) => {
    uniforms.current.uTime.value += delta;
    // Lerp mouse for smoothness
    uniforms.current.uMouse.value.lerp(mouseRef.current, 0.05);
  });

  return (
    <mesh ref={meshRef} onPointerMove={handlePointerMove}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}

// ─── Main Export ─────────────────────────────────────────────
const HeroBackground = () => {
  return (
    <div className='hero__canvas' aria-hidden='true'>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1], fov: 50 }}
        style={{ pointerEvents: 'auto' }}
        gl={{ antialias: false, alpha: false }}
      >
        <GradientMesh />
      </Canvas>
    </div>
  );
};

export default HeroBackground;
