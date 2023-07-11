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
	const [animateValue, setAnimateValue] = useState("initial");

	const meshRef = useRef(null);

	const variants = {
		initial: { bottom: "-300px", left: "45%" },
		sectionOne: { bottom: "45%", left: "55%" },
		sectionTwo: { bottom: "5%", left: "55%" },
		sectionThree: { rotation: "270deg", bottom: "20%", left: "55%" },
	};

	useEffect(() => {
		const handleScroll = (event) => {
			const scrollY = event.deltaY;
			console.log(scrollY, "scsc");
			const currentScroll = window.pageYOffset;

			if (scrollY > 0) {
				setTimeout(() => {
					const newAnimateValue =
						animateValue === "initial" ? "sectionOne" : "sectionTwo";
					setAnimateValue(newAnimateValue);
				}, 500);
			} else if (scrollY < 0) {
				setTimeout(() => {
					if (animateValue === "sectionOne") {
						const newAnimateValue = "initial";
						setAnimateValue(newAnimateValue);
					} else if (animateValue === "sectionTwo") {
						const newAnimateValue = "sectionOne";
						setAnimateValue(newAnimateValue);
					}
				}, 500);
			}

			console.log(animateValue, "animateValue");

			if (currentScroll === 0 && scrollY < 0 && animateValue === "initial") {
				setPage2(1);
				setScrollCount(0);
				wholePageState(page2);
			}
		};

		window.addEventListener("wheel", handleScroll);

		return () => {
			window.removeEventListener("wheel", handleScroll);
		};
	}, [animateValue]);

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
				animate={animateValue} // <=== 수정
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
