import { Canvas } from "@react-three/fiber"
import React, { Suspense } from "react"
import { OrbitControls, useGLTF } from "@react-three/drei"
import Loader from "../Loader"

const Spaceship = () => {
	const spaceship = useGLTF("./sci-fi_spaceship_bridge/scene.gltf")

	return (
		<mesh>
			<directionalLight intensity={0.05} />
			<pointLight intensity={0} />
			<primitive
				object={spaceship.scene}
				scale={1}
				position-y={2}
				position-x={-0.5}
				position-z={1}
				// position={[-0.5, 2, 1]}
			/>
		</mesh>
	)
}

const SpaceshipCanvas = () => {
	return (
		<Canvas
			shadows={false}
			frameloop="demand"
			gl={{ preserveDrawingBuffer: true }}
			camera={{
				fov: 45,
				near: 0.1,
				far: 100,
				position: [-4, 2, 10],
			}}
		>
			<Suspense fallback={<Loader />}>
				<OrbitControls enableZoom={false} />
				<Spaceship />
			</Suspense>
		</Canvas>
	)
}

export default SpaceshipCanvas
