import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// ─── Mouse-Following + Floating Character ───────────────────
function Model() {
  const { scene, animations } = useGLTF('/models/girl.glb');
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    // Play animation if available
    if (animations && animations.length > 0) {
      const mixer = new THREE.AnimationMixer(scene);
      mixerRef.current = mixer;
      const action = mixer.clipAction(animations[0]);
      action.play();
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      mixerRef.current?.stopAllAction();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [scene, animations]);

  useFrame((state, delta) => {
    mixerRef.current?.update(delta);

    if (groupRef.current) {
      const time = state.clock.elapsedTime;

      // Floating bob animation (smooth sine wave)
      groupRef.current.position.y = -2.2 + Math.sin(time * 1.2) * 0.15;

      // Gentle tilt based on mouse position (character "looks" at cursor)
      targetRotation.current.y = mouseRef.current.x * 0.5;
      targetRotation.current.x = mouseRef.current.y * 0.15;

      // Smooth lerp to target rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current.y,
        0.03
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.current.x,
        0.03
      );

      // Subtle breathing scale
      const breathe = 1 + Math.sin(time * 2) * 0.008;
      groupRef.current.scale.setScalar(2 * breathe);
    }
  });

  return (
    <group ref={groupRef} scale={2} position={[0, -2.2, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// ─── Hologram Platform Ring ─────────────────────────────────
function HologramPlatform() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      const pulse = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.3;
    }
  });

  return (
    <group position={[0, -2.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Outer ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[1.2, 1.35, 64]} />
        <meshBasicMaterial
          color='#f1a39a'
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Inner glow disc */}
      <mesh position={[0, 0, -0.01]}>
        <circleGeometry args={[1.2, 64]} />
        <meshBasicMaterial
          color='#f1a39a'
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Second outer ring */}
      <mesh rotation={[0, 0, 0.5]}>
        <ringGeometry args={[1.4, 1.45, 64]} />
        <meshBasicMaterial
          color='#c9d6df'
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ─── Floating Particles ─────────────────────────────────────
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 50;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color='#f1a39a'
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Scene ──────────────────────────────────────────────────
function Scene() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.2, 4.5);
    camera.lookAt(0, -0.5, 0);
  }, [camera]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3, 8, 5]}
        intensity={1.5}
        castShadow
        color='#ffffff'
      />
      <pointLight position={[-3, 2, -2]} intensity={0.6} color='#f1a39a' />
      <pointLight position={[3, -1, 3]} intensity={0.3} color='#c9d6df' />
      <spotLight
        position={[0, 6, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.5}
        color='#f1a39a'
        castShadow
      />

      <Environment preset='studio' />

      {/* Character */}
      <Model />

      {/* Hologram platform */}
      <HologramPlatform />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Contact shadow on ground */}
      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.4}
        scale={5}
        blur={2.5}
        far={4}
      />
    </>
  );
}

// ─── Main Component ─────────────────────────────────────────
const Character3D = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute('data-theme') === 'dark'
  );

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

  return (
    <div className='character-3d' aria-hidden='true'>
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [0, 0.2, 4.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <color
          attach='background'
          args={[isDark ? '#050510' : '#d4dbe2']}
        />
        <fog
          attach='fog'
          args={[isDark ? '#050510' : '#d4dbe2', 6, 12]}
        />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload('/models/girl.glb');

export default Character3D;
