import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const MovingGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      // Move the grid towards the camera to create "flight" effect
      // Reset position to create infinite loop
      const speed = 0.5;
      gridRef.current.position.z = (state.clock.elapsedTime * speed) % 10;
    }
  });

  return (
    <gridHelper 
      ref={gridRef} 
      args={[100, 100, 0x6366f1, 0x6366f1]} 
      position={[0, -5, 0]} 
      rotation={[0, 0, 0]}
    />
  );
};

const AnimatedScene = () => {
    // Cyberpunk/Space fog color
    const fogColor = "#1e1b4b"; // Dark indigo

    return (
        <>
            <color attach="background" args={[fogColor]} />
            <fog attach="fog" args={[fogColor, 10, 40]} />
            
            <PerspectiveCamera makeDefault position={[0, 2, 20]} fov={75} />
            
            {/* Stars for depth */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {/* Moving Grid */}
            <MovingGrid />
            
            {/* Ambient light for general visibility */}
            <ambientLight intensity={0.5} />
        </>
    )
}

const ThreeBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-background/90" style={{ pointerEvents: 'none' }}>
        {/* We use a slight overlay or just rely on the canvas being z-index -1 */}
        {/* But we need the canvas explicitly */}
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
            <AnimatedScene />
        </Canvas>
    </div>
  );
};

export default ThreeBackground;
