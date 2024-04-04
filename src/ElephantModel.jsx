import { useGLTF } from '@react-three/drei';

export default function ElephantModel() {

const model = useGLTF('elephant.glb')
for (const child of model.scene.children) {
    console.log(child.material)
}


return <primitive object={model.scene} scale={2} position={[0, 0, 0]} rotation-y={Math.PI * 2} />

}
