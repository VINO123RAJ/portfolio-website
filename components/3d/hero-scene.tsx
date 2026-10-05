'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Line, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const NODE_COUNT = 26
const PARTICLE_COUNT = 600
const RADIUS = 2.35
const PARTICLE_SEED = 20250927

/** Deterministic PRNG so particle layout is stable across renders. */
function mulberry32(seed: number) {
  let state = seed
  return function random() {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generateNodes(count: number) {
  const nodes: THREE.Vector3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = golden * i
    nodes.push(
      new THREE.Vector3(
        Math.cos(theta) * radius * RADIUS,
        y * RADIUS,
        Math.sin(theta) * radius * RADIUS,
      ),
    )
  }
  return nodes
}

function CoreMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.08
      wireRef.current.rotation.z += delta * 0.04
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#15151d" transparent opacity={0.9} />
      </mesh>
      <mesh ref={wireRef} scale={1.001}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#3a3a52" wireframe transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

function NeuralNodes({ nodes }: { nodes: THREE.Vector3[] }) {
  const groupRef = useRef<THREE.Group>(null)

  const connections = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = 0; i < nodes.length; i++) {
      const next = nodes[(i + 5) % nodes.length]
      if (next) pairs.push([nodes[i]!, next])
    }
    return pairs
  }, [nodes])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float
          key={i}
          speed={1 + (i % 3) * 0.4}
          rotationIntensity={0}
          floatIntensity={0.45}
          floatingRange={[-0.06, 0.06]}
        >
          <mesh position={node}>
            <sphereGeometry args={[i % 4 === 0 ? 0.045 : 0.028, 12, 12]} />
            <meshBasicMaterial
              color={i % 4 === 0 ? '#8b8cf5' : '#5b5b78'}
              transparent
              opacity={i % 4 === 0 ? 1 : 0.75}
            />
          </mesh>
        </Float>
      ))}
      {connections.map((pair, i) => (
        <Line
          key={i}
          points={[pair[0], pair[1]]}
          color="#33334a"
          lineWidth={0.5}
          transparent
          opacity={0.35}
        />
      ))}
    </group>
  )
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const random = mulberry32(PARTICLE_SEED)
    const array = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 3.2 + random() * 3.5
      const theta = random() * Math.PI * 2
      const phi = Math.acos(2 * random() - 1)
      array[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      array[i * 3 + 2] = r * Math.cos(phi)
    }
    return array
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.018
      ref.current.rotation.x += delta * 0.006
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#8c8cf0"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  )
}

function ParallaxRig() {
  const { camera, pointer } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    target.set(pointer.x * 0.4, pointer.y * 0.3, 0)
    camera.position.lerp(new THREE.Vector3(target.x, target.y, 6.2), 0.04)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function SceneContents() {
  const nodes = useMemo(() => generateNodes(NODE_COUNT), [])

  return (
    <>
      <ParallaxRig />
      <CoreMesh />
      <NeuralNodes nodes={nodes} />
      <ParticleField />
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1.4} color="#8b8cf5" />
      <pointLight position={[-4, -2, -2]} intensity={0.8} color="#4a4a6a" />
    </>
  )
}

export function HeroScene() {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lowPower =
      typeof navigator !== 'undefined' &&
      'deviceMemory' in navigator &&
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory !== undefined &&
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory! < 4
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    if (!reduceMotion && !lowPower) {
      setCanRender(true)
    } else {
      setCanRender(isMobile ? false : !lowPower)
    }
  }, [])

  if (!canRender) {
    return <StaticCoreFallback />
  }

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
      frameloop="always"
    >
      <SceneContents />
    </Canvas>
  )
}

function StaticCoreFallback() {
  return (
    <div className="staticCore" aria-hidden="true">
      <svg viewBox="0 0 400 400" role="presentation" focusable="false">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#coreGlow)" />
        <g stroke="#3a3a52" fill="none" strokeWidth="0.8" opacity="0.8">
          <circle cx="200" cy="200" r="120" />
          <circle cx="200" cy="200" r="90" />
          <circle cx="200" cy="200" r="150" opacity="0.5" />
        </g>
        <g stroke="#5b5b78" strokeWidth="0.6" opacity="0.5">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2
            const x = 200 + Math.cos(angle) * 120
            const y = 200 + Math.sin(angle) * 120
            return <line key={i} x1="200" y1="200" x2={x} y2={y} />
          })}
        </g>
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2
          const x = 200 + Math.cos(angle) * 120
          const y = 200 + Math.sin(angle) * 120
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i % 4 === 0 ? 4 : 2.4}
              fill={i % 4 === 0 ? '#8b8cf5' : '#5b5b78'}
            />
          )
        })}
      </svg>
    </div>
  )
}
