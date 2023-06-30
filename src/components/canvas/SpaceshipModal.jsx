import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, Suspense, useState, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Loader from "../Loader";
import * as THREE from "three";
import gsap from "gsap";
import throttle from "lodash/throttle";

export const SpaceshipModal = ({ meshRef }) => {
	const { scene } = useGLTF("./raven_spaceship-star_conflict_v.2/scene.gltf");

	return (
		<group rotation={[Math.PI / 4, Math.PI / 2, 0]} ref={meshRef} scale={[0.002, 0.002, 0.002]}>
			<primitive object={scene} className="gsap-object" tabIndex={-1} />
		</group>
	);
};

const SpaceshipModalCanvas = ({ wholePageState, page }) => {
	const [page2, setPage2] = useState(page);
	const [scrollCount, setScrollCount] = useState(0);

	const meshRef = useRef(null);

	const handleScroll = (event) => {
		const scrollY = event.deltaY;

		const currentScroll = window.pageYOffset;
	};

	useEffect(() => {
		const handleScroll = (event) => {
			const scrollY = event.deltaY;
			const currentScroll = window.pageYOffset;

			if (currentScroll > 150) {
				setScrollCount(1);
			} else if (currentScroll > 300) {
				setScrollCount(2);
			}

			if (currentScroll === 0 && scrollY < 0) {
				setPage2(1);
				wholePageState(page2);
			}
		};

		window.addEventListener("wheel", handleScroll);

		return () => {
			window.removeEventListener("wheel", handleScroll);
		};
	}, []);

	useEffect(() => {
		const element = document.querySelector(".canvas-object");

		if (scrollCount === 1) {
			gsap.to(element, {
				duration: 1,
				rotation: "-90deg",
				top: "30%",
				left: "40%",
			});
		} else if (scrollCount === 2) {
			gsap.to(element, {
				duration: 1,
				top: "20%",
				left: "50%",
			});
		}
	}, [scrollCount]);

	return (
		<div
			id="container"
			style={{
				width: "100%",
				height: "300vh",
				position: "absolute",
				top: 0,
				left: 0,
				zIndex: 900,
				display: "flex",
			}}
			onWheel={handleScroll}
		>
			<Canvas
				className="canvas-object"
				frameloop="false"
				style={{
					width: "100%",
					height: "100vh",
					position: "fixed",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					zIndex: 999,
					overflowStyle: "none",
				}}
			>
				<Suspense fallback={<Loader />}>
					<OrbitControls enableZoom={false} enableRotate={false} />
					<ambientLight color="#CCCCCC" intensity={0.5} />
					<directionalLight castShadow={false} />
					<SpaceshipModal scrollCount={scrollCount} meshRef={meshRef} />
				</Suspense>
			</Canvas>
		</div>
	);
};

export default SpaceshipModalCanvas;
