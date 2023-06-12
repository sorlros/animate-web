import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, Suspense, useState, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Loader from "../Loader";
import * as THREE from "three";

export const SpaceshipModal = ({ scrollCount, meshRef }) => {
	const { scene } = useGLTF("./raven_spaceship-star_conflict_v.2/scene.gltf");

	useFrame(() => {
		if (meshRef.current) {
			const currentPosition = meshRef.current.position.clone();
			const currentScale = meshRef.current.scale.clone();

			// 0일 때
			if (scrollCount === 0) {
				const targetPosition = new THREE.Vector3(0, 0, 0);
				const targetScale = new THREE.Vector3(0.002, 0.002, 0.002);
				meshRef.current.position.copy(targetPosition);
				meshRef.current.scale.copy(targetScale);
			}
			// 1일 때
			else if (scrollCount === 1) {
				const targetPosition = new THREE.Vector3(15, 5, 0);
				const targetScale = new THREE.Vector3(0.002, 0.002, 0.002);
				meshRef.current.position.lerp(targetPosition, 0.05);
				meshRef.current.scale.lerp(targetScale, 0.05);
			}
			// 2일 때
			else if (scrollCount === 2) {
				const targetPosition = new THREE.Vector3(30, 10, 0);
				const targetScale = new THREE.Vector3(0.002, 0.002, 0.002);
				meshRef.current.position.lerp(targetPosition, 0.05);
				meshRef.current.scale.lerp(targetScale, 0.05);
			}
			// 3일 때
			else if (scrollCount === 3) {
				const targetPosition = new THREE.Vector3(15, 0, 0);
				const targetScale = new THREE.Vector3(0.004, 0.004, 0.004);
				meshRef.current.position.copy(targetPosition);
				meshRef.current.scale.copy(targetScale);
			}
		}
	});

	return (
		<group rotation={[Math.PI / 4, Math.PI / 2, 0]} ref={meshRef}>
			<primitive object={scene} />
		</group>
	);
};

const SpaceshipModalCanvas = () => {
	const [scrollCount, setScrollCount] = useState(0);
	const scrollRef = useRef(null);
	const meshRef = useRef(null);

	useEffect(() => {
		const handleScroll = (event) => {
			event.preventDefault();
			const scroll = event.deltaY;

			if (scroll > 0) {
				setScrollCount((prevScrollCount) => Math.min(prevScrollCount + 1, 3));
			} else if (scroll < 0) {
				setScrollCount((prevScrollCount) => Math.max(prevScrollCount - 1, 0));
			}
		};

		if (scrollRef.current) {
			scrollRef.current.addEventListener("wheel", handleScroll);
		}

		return () => {
			if (scrollRef.current) {
				scrollRef.current.removeEventListener("wheel", handleScroll);
			}
		};
	}, []);

	return (
		<Canvas
			frameloop="false"
			style={{
				zIndex: 999,
				position: "absolute",
			}}
			ref={scrollRef}
		>
			<Suspense fallback={<Loader />}>
				<OrbitControls enableZoom={true} />
				<ambientLight color="#CCCCCC" intensity={0.5} />
				<directionalLight castShadow={false} />
				<SpaceshipModal scrollCount={scrollCount} meshRef={meshRef} />
			</Suspense>
		</Canvas>
	);
};

export default SpaceshipModalCanvas;
