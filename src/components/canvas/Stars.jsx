import { Points, PointMaterial, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useState, useRef, Suspense, useEffect } from "react";
import { inSphere } from "maath/random";

const Stars = (props) => {
	const ref = useRef();
	const scrollCountRef = useRef(0);

	const [sphere] = useState(() => inSphere(new Float32Array(5000), { radius: 1.2 }));

	useEffect(() => {
		scrollCountRef.current = props.scrollCount;
	}, [props.scrollCount]);

	useFrame((state, delta) => {
		ref.current.rotation.x -= delta / 10;
		ref.current.rotation.y -= delta / 15;

		const scroll = props.scrollCount;
		if (scroll > 0) {
			ref.current.rotation.x = 0;
			ref.current.rotation.y -= delta / 1;
		} else if (scroll < 0) {
			ref.current.rotation.x = 0;
			ref.current.rotation.y += delta / 1;
		}
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points ref={ref} positions={sphere} frustumCulled={true} {...props}>
				<PointMaterial
					transparent
					color="#f272c8"
					size={0.0015}
					sizeAttenuation={true}
					depthWrite={false}
				/>
			</Points>
		</group>
	);
};

const StarsCanvas = () => {
	const [scrollCount, setScrollCount] = useState(0);
	const scrollRef = useRef(null);

	useEffect(() => {
		const handleScroll = (event) => {
			// event.preventDefault();
			const scroll = event.deltaY;

			if (scroll > 0) {
				setScrollCount(1);
			} else if (scroll < 0) {
				setScrollCount(-1);
			} else {
				setScrollCount(0);
			}
		};

		window.addEventListener("wheel", handleScroll);

		return () => {
			window.removeEventListener("wheel", handleScroll);
		};
	}, []);

	return (
		<div
			className="stars-container"
			style={{
				width: "100%",
				height: "100vh",
				zIndex: 800,
				position: "absolute",
				top: 0,
				left: 0,
			}}
			// onWheel={(e) => e.preventDefault()}
		>
			<Canvas camera={{ position: [0, 0, 0] }}>
				<Suspense fallback={null}>
					<Stars scrollCount={scrollCount} />
				</Suspense>

				<Preload all />
			</Canvas>
		</div>
	);
};

export default StarsCanvas;
