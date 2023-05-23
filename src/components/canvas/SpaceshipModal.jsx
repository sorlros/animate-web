import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, Suspense, useState, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Loader from "../Loader";
import * as THREE from "three";

export const SpaceshipModal = ({ scale, position }) => {
	const spaceship = useGLTF("./raven_spaceship-star_conflict_v.2/scene.gltf");

	const meshRef = useRef();

	console.log("pppp", position);
	console.log("ssss", scale);

	useEffect(() => {
		console.log(meshRef);
		// 초기 위치와 크기 설정
		if (meshRef.current) {
			meshRef.current.position.copy(new THREE.Vector3(position[0], position[1], position[2]));
			meshRef.current.scale.copy(new THREE.Vector3(scale[0], scale[1], scale[2]));
		}
	}, [position, scale]);

	useFrame(() => {
		if (meshRef.current) {
			const targetPosition = new THREE.Vector3(position[0], position[1], position[2]);
			const targetScale = new THREE.Vector3(scale[0], scale[1], scale[2]);
			meshRef.current.position.lerp(targetPosition, 0.01);
			meshRef.current.scale.lerp(targetScale, 0.001);
		}
	});

	return (
		<group rotation={[Math.PI / 4, Math.PI / 2, 0]} ref={meshRef}>
			<primitive object={spaceship.scene} />
		</group>
	);
};

const SpaceshipModalCanvas = () => {
	const [changeModel, setChangeModel] = useState({
		animate: {
			position: [0, 0, 0],
			scale: [0.003, 0.003, 0.03],
		},
	});

	const [scrollCount, setScrollCount] = useState(0);
	const maxScrollCount = 3;

	const scrollRef = useRef(null);

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

		let timeoutIn;

		const handleDelayedScroll = (event) => {
			event.preventDefault();
			clearTimeout(timeoutIn);
			timeoutIn = setTimeout(() => handleScroll(event), 500);
		};

		if (scrollRef.current) {
			scrollRef.current.addEventListener("wheel", handleDelayedScroll);
		}
		return () => {
			if (scrollRef.current) {
				scrollRef.current.removeEventListener("wheel", handleDelayedScroll);
			}
			clearTimeout(timeoutIn);
		};
	}, []);

	useEffect(() => {
		console.log(scrollCount);
		if (scrollCount === 0) {
			setChangeModel({
				animate: {
					position: [0, 0, 0],
					scale: [0.003, 0.003, 0.003],
				},
			});
		} else if (scrollCount === 1) {
			setChangeModel({
				animate: {
					position: [0, 0, 0],
					scale: [0.001, 0.001, 0.001],
				},
			});
		} else if (scrollCount === 2) {
			return setChangeModel({
				animate: {
					position: [0, 0, 0],
					scale: [0.002, 0.002, 0.002],
				},
			});
		} else if (scrollCount === 3) {
			return setChangeModel({
				animate: {
					position: [0, 0, 0],
					scale: [0.003, 0.003, 0.003],
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
				<OrbitControls enableZoom={false} />
				<ambientLight color="#CCCCCC" intensity={0.5} />

				<directionalLight castShadow={false} />
				<SpaceshipModal
					scale={changeModel.animate.scale}
					position={changeModel.animate.position}
				/>
			</Suspense>
		</Canvas>
	);
};

export default SpaceshipModalCanvas;
