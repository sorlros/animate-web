import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, Suspense, useState, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Loader from "../Loader";
import * as THREE from "three";

export const SpaceshipModal = ({ changeModel, meshRef }) => {
	const { scene } = useGLTF("./raven_spaceship-star_conflict_v.2/scene.gltf");

	useEffect(() => {
		// 초기 위치와 크기 설정
		if (meshRef.current) {
			meshRef.current.position.copy(new THREE.Vector3(0, 0, 0));
			meshRef.current.scale.copy(new THREE.Vector3(0.004, 0.004, 0.004));
		}
	}, []);

	useFrame(() => {
		if (meshRef.current) {
			const targetPosition = new THREE.Vector3(
				changeModel.animate.position[0],
				changeModel.animate.position[1],
				changeModel.animate.position[2]
			);
			const targetScale = new THREE.Vector3(
				changeModel.animate.scale[0],
				changeModel.animate.scale[1],
				changeModel.animate.scale[2]
			);
			meshRef.current.position.lerp(targetPosition, 0.05);
			meshRef.current.scale.lerp(targetScale, 0.05);
		}
	});

	return (
		<group rotation={[Math.PI / 4, Math.PI / 2, 0]} ref={meshRef}>
			<primitive object={scene} scale={[0.04, 0.04, 0.04]} />
		</group>
	);
};

const SpaceshipModalCanvas = () => {
	const [changeModel, setChangeModel] = useState({
		animate: {
			position: [0, 0, 0],
			scale: [0.001, 0.001, 0.01],
		},
	});

	const [scrollCount, setScrollCount] = useState(0);
	const maxScrollCount = 3;

	const animationRef = useRef(null);
	const scrollRef = useRef(null);
	const meshRef = useRef(null);

	useEffect(() => {
		const handleScroll = (event) => {
			event.preventDefault();
			const scroll = event.deltaY;

			if (scroll > 0) {
				setScrollCount((prevScrollCount) => Math.min(prevScrollCount + 1, maxScrollCount));
			} else if (scroll < 0) {
				setScrollCount((prevScrollCount) => Math.max(prevScrollCount - 1, 0));
			}
		};

		const animate = () => {
			if (meshRef.current) {
				const targetPosition = new THREE.Vector3(
					changeModel.animate.position[0],
					changeModel.animate.position[1],
					changeModel.animate.position[2]
				);
				const targetScale = new THREE.Vector3(
					changeModel.animate.scale[0],
					changeModel.animate.scale[1],
					changeModel.animate.scale[2]
				);
				meshRef.current.position.lerp(targetPosition, 0.05);
				meshRef.current.scale.lerp(targetScale, 0.05);
			}
			animationRef.current = requestAnimationFrame(animate);
		};

		const handleDelayedScroll = (event) => {
			event.preventDefault();
			handleScroll(event);
			cancelAnimationFrame(animationRef.current);
			animationRef.current = requestAnimationFrame(animate);
		};

		if (scrollRef.current) {
			scrollRef.current.addEventListener("wheel", handleDelayedScroll);
		}
		return () => {
			if (scrollRef.current) {
				scrollRef.current.removeEventListener("wheel", handleDelayedScroll);
			}
			cancelAnimationFrame(animationRef.current);
		};
	}, []);

	useEffect(() => {
		console.log(scrollCount);
		if (scrollCount === 0) {
			setChangeModel({
				animate: {
					position: [0, 0, 0],
					scale: [0.004, 0.004, 0.004],
				},
			});
		} else if (scrollCount === 1) {
			setChangeModel({
				animate: {
					position: [5, 0, 0],
					scale: [0.004, 0.004, 0.004],
				},
			});
		} else if (scrollCount === 2) {
			setChangeModel({
				animate: {
					position: [10, 0, 0],
					scale: [0.004, 0.004, 0.004],
				},
			});
		} else if (scrollCount === 3) {
			setChangeModel({
				animate: {
					position: [15, 0, 0],
					scale: [0.004, 0.004, 0.004],
				},
			});
		}
	}, [scrollCount]);

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
				<SpaceshipModal changeModel={changeModel} meshRef={meshRef} />
			</Suspense>
		</Canvas>
	);
};

export default SpaceshipModalCanvas;
