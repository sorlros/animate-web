import { Points, PointMaterial, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useState, useRef, Suspense } from "react";
// import * as random from "maath/random/dist/maath-random.esm"
// const { random } = require("maath/random")
import { inSphere } from "maath/random";

const Stars = (props) => {
	const ref = useRef();

	const [sphere] = useState(() => inSphere(new Float32Array(5000), { radius: 1.2 }));

	useFrame((state, delta) => {
		ref.current.rotation.x -= delta / 10;
		ref.current.rotation.y -= delta / 15;
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points ref={ref} positions={sphere} frustumCulled={true} {...props}>
				<PointMaterial
					transparent
					color="#f272c8"
					size={0.002}
					sizeAttenuation={true}
					depthWrite={false}
				/>
			</Points>
		</group>
	);
};

const StarsCanvas = () => {
	return (
		<div
			style={{
				width: "100%",
				height: "100vh",
				zIndex: -1,
				position: "absolute",
				top: 0,
				left: 0,
			}}
		>
			<Canvas camera={{ position: [0, 0, 0] }}>
				<Suspense fallback={null}>
					<Stars />
				</Suspense>

				<Preload all />
			</Canvas>
		</div>
	);
};

export default StarsCanvas;
