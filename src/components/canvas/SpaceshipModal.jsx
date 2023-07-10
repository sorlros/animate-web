import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, Suspense, useState, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Loader from "../Loader";
import gsap from "gsap";
import { motion } from "framer-motion";
import { debounce, throttle } from "lodash";

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

	const variants = {
		initial: { bottom: "-50px", left: "45%" },
		sectionOne: { bottom: "45%", left: "55%" },
		sectionTwo: { bottom: "5%", left: "55%" },
		sectionThree: { rotation: "270deg", bottom: "5%", left: "55%" },
	};

	useEffect(() => {
		const handleScroll = (event) => {
			const scrollY = event.deltaY;
			const currentScroll = window.pageYOffset;

			const isScrollPositive = scrollY > 0;

			if (currentScroll === 0 && scrollY < 0) {
				setPage2(1);
				setScrollCount(0);
				wholePageState(page2);
			}

			console.log(isScrollPositive());
		};

		window.addEventListener("wheel", handleScroll);

		return () => {
			window.removeEventListener("wheel", handleScroll);
		};
	}, []);

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
				// display: "flex",
				// justifyContent: "center",
				// alignItems: "center",
			}}
			// onWheel={handleScroll}
		>
			<motion.div
				className="canvas-object"
				style={{
					width: "300px",
					height: "300px",
					position: "fixed",
					zIndex: 999,
					overflowStyle: "none",
				}}
				initial="initial"
				animate={isScrollPositive ? "sectionOne" : "initial"}
				variants={variants}
				transition={{ duration: 1 }}
			>
				<Canvas frameloop="false">
					<Suspense fallback={<Loader />}>
						<OrbitControls enableZoom={false} enableRotate={false} />
						<ambientLight color="#CCCCCC" intensity={0.5} />
						<directionalLight castShadow={false} />
						<SpaceshipModal scrollCount={scrollCount} meshRef={meshRef} />
					</Suspense>
				</Canvas>
			</motion.div>
		</div>
	);
};

export default SpaceshipModalCanvas;
