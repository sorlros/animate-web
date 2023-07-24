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
			// console.log(scrollY, "scsc");
			const currentScroll = window.pageYOffset;

			if (scrollY > 0) {
				setTimeout(() => {
					const newAnimateValue =
						animateValue === "initial" ? "sectionOne" : "sectionTwo";
					setAnimateValue(newAnimateValue);
					console.log(animateValue, "animateValue");
					if (animateValue === "sectionOne") {
						setPage2(3);
						if (currentScroll === 0 && scrollY < 0) {
							setPage2(1);

							wholePageState(page2);
						}
						wholePageState(page2);
					} else if (animateValue === "sectionTwo") {
						setPage2(4);
						wholePageState(page2);
					}
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

				if (currentScroll === 0 && scrollY < 0 && animateValue === "initial") {
					setPage2(1);
					wholePageState(page2);
					return;
				}
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
				overflowY: "hidden",
			}}
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
				transition={{ duration: 0.5 }}
			>
				<Canvas frameloop="false">
					<Suspense fallback={<Loader />}>
						<OrbitControls enableZoom={false} enableRotate={false} />
						<ambientLight color="#CCCCCC" intensity={0.5} />
						<directionalLight castShadow={false} />
						<SpaceshipModal meshRef={meshRef} />
					</Suspense>
				</Canvas>
			</motion.div>
		</div>
	);
};

export default SpaceshipModalCanvas;
