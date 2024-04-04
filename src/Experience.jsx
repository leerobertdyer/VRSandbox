import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils";
import "./Experience.css"
import ElephantModel from "./ElephantModel";
import { XRButton } from "@react-three/xr";
import { useState } from "react";

export default function Experience() {
  const [isImmersed, setIsImmersed] = useState(false);

  return (
    <div className="mainExperienceDiv">
      <XRButton 
      id="enterVR"
      mode="immersive-vr"
      sessionInit={{ optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking'] }}
      onsessionstart={() => setIsImmersed(true)}
      onsessionend={() => setIsImmersed(false)}
      >{isImmersed ? 'Exit VR' : 'Enter VR'}</XRButton>
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
      <ambientLight intensity={1.0}/>
      <ElephantModel />
      <mesh rotation-x={-(Math.PI * .5)} >
        <planeGeometry/>
        <meshBasicMaterial color="lightblue" />
      </mesh>
    </Canvas>
        </div>
  );
}
