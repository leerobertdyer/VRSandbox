/* eslint-disable react/no-unknown-property */

import { useGLTF } from "@react-three/drei";
import * as THREE from 'three'

export default function PortalScene() {

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('bakedPortal.jpg')
texture.flipY = false
const model = useGLTF('office.glb')
console.log(model);

for (const child of model.scene.children) {
    if (child.name === 'House') child.visible = false
}

return <primitive object={model.scene} scale={1} position={[-2, -1.25, -.5]} rotation-y={Math.PI * 2} />

}
