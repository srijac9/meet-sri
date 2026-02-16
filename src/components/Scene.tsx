import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import FilmStrip from "./FilmStrip";

export default function Scene() {
  return (
    <div className="h-full w-full bg-burgundy-dark">
      <Canvas
        camera={{ position: [0.85, 2.35, 5.4], fov: 30 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("#5b1015");
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 6]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-5, 5, -3]} intensity={1.35} color="#f1f1f1" />
        <pointLight position={[-5, 3, 4]} intensity={1.1} color="#ffffff" />
        <pointLight position={[5, -2, 6]} intensity={0.7} color="#e8e8e8" />

        <FilmStrip />

        <OrbitControls
          target={[0.5, 0.45, 0]}
          enablePan={false}
          enableZoom
          zoomSpeed={0.9}
          minDistance={3.8}
          maxDistance={26}
          enableRotate
          rotateSpeed={0.7}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={0.35}
          maxPolarAngle={2.45}
          autoRotate
          autoRotateSpeed={0.45}
        />

        <fog attach="fog" args={["#1b1b1b", 15, 40]} />
      </Canvas>
    </div>
  );
}
