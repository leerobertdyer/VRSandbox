import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils";
import "./Experience.css";
import ElephantModel from "./ElephantModel";
import { Controllers, XR, XRButton, startSession } from "@react-three/xr";
import { useState } from "react";

export default function Experience() {
  const [isImmersed, setIsImmersed] = useState(false);

  return (
    <div className="mainExperienceDiv">
      <XRButton
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute top-0 right-0 m-4 z-10"
        id="enterVR"
        mode="immersive-vr"
        sessionInit={{
          optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking"],
        }}
        onClick={() => startSession('immersive-vr')}
      >
        {isImmersed ? "Exit VR" : "Enter VR"}
      </XRButton>
      <Canvas className="canvas">
        <OrbitControls
          enablePan={false}
          // set the min and max polar angle (vertical height) for the camera
          minPolarAngle={degToRad(0)}
          maxPolarAngle={degToRad(90)}
          // set the min and max zoom distances for the camera
          minDistance={1}
          maxDistance={3}
        />
        <XR
          referenceSpace="local-floor"
          onSessionStart={() => setIsImmersed(true)}
          onSessionEnd={() => setIsImmersed(false)}
        >
          <Controllers />
          <ambientLight intensity={1.0} />
          <ElephantModel />
          <mesh rotation-x={-(Math.PI * 0.5)}>
            <planeGeometry />
            <meshBasicMaterial color="lightblue" />
          </mesh>
        </XR>
      </Canvas>
    </div>
  );
}
