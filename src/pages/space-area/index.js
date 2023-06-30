import StarsCanvas from "@/components/canvas/Stars";
import React from "react";
import SpaceshipModalCanvas from "@/components/canvas/SpaceshipModal";

export const SpaceArea = () => {
	return (
		<div style={{ width: "100%", height: "300vh", overflow: "hidden", position: "relative" }}>
			<div style={{ width: "100%", height: "100%" }}>
				<StarsCanvas />
				<SpaceshipModalCanvas />
			</div>
		</div>
	);
};

export default SpaceArea;
