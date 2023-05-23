import { Html, useProgress } from "@react-three/drei";
import React, { useState } from "react";

const Loader = () => {
	const { progress } = useProgress();
	const [loading, setLoading] = useState(true);

	useState(() => {
		const handleScroll = () => {
			const loader = document.querySelector(".canvas-load");
			if (loader && window.scrollY + window.innterHeight > loader.offsetTop) {
				setLoading(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			{loading && (
				<Html>
					<span className="canvas-load"></span>
					<p
						style={{
							fontSize: 45,
							color: "#f1f1f1",
							fontWeight: 800,
							position: "absolute",
							top: "50%",
							left: "50%",
							// transform: translate("-50%, -50%"),
						}}
					>
						{progress.toFixed(2)}%
					</p>
				</Html>
			)}
		</>
	);
};

export default Loader;
