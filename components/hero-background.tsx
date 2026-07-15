"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTexture, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function LiquidImage() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Load the user's specific image
  const tex = useTexture("/herosectionbg.avif")
  tex.colorSpace = THREE.SRGBColorSpace

  // Slowly rotate and drift the liquid plane for an extra feeling of life
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime()
      meshRef.current.rotation.z = Math.sin(t * 0.1) * 0.05
      meshRef.current.position.x = Math.sin(t * 0.2) * 0.2
      meshRef.current.position.y = Math.cos(t * 0.2) * 0.2
    }
  })

  return (
    // Scale made extremely large to cover the entire viewport even when distorted
    <mesh ref={meshRef} scale={[18, 12, 1]}>
      {/* High segment count for buttery smooth 3D liquid deformation */}
      <planeGeometry args={[1, 1, 128, 128]} />
      
      {/* Drei's Distort Material makes the geometry ripple and bulge like flowing liquid */}
      <MeshDistortMaterial 
        map={tex}
        speed={1.5}        // Speed of the liquid flowing
        distort={0.3}      // How much the liquid bulges and ripples
        radius={1}
        roughness={1}
        metalness={0}
        toneMapped={false} // Preserve original image colors
      />
    </mesh>
  )
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#020617]">
      {/* Real 3D WebGL Canvas for the liquid animation */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true }}>
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <LiquidImage />
        </Suspense>
      </Canvas>

      {/* Premium Film Grain Noise overlay */}
      <svg className="hidden">
        <filter id="noiseFilterHero">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
        </filter>
      </svg>
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{ filter: "url(#noiseFilterHero)" }}
      />
      
      {/* Heavy Vignette Overlay to blend the edges perfectly into the dark theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,6,23,0.95)_100%)]" />
    </div>
  )
}
