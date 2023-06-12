import { gsap } from "gsap/dist/gsap";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import styles from "../styles/HomeAnimation.module.css";

const HomeAnimation = () => {
	const root = useRef();
	const router = useRouter();

	useEffect(() => {
		import("gsap").then((gsap) => {
			const theHeight = document.querySelector(".homeCircle");
			const tl = gsap.default.timeline({
				onComplete: () => router.push("/home", undefined, { shallow: true }),
			});

			tl.to(".insideLoader", {
				keyframes: [
					{ duration: 2, borderTop: "140px solid red", scale: 0.8 },
					{ duration: 0.5, borderRight: "140px solid red" },
					{ duration: 0.5, borderBottom: "140px solid red" },
					{ duration: 0.5, borderLeft: "140px solid red" },
				],
				rotate: "360deg",
				ease: "power2.out",
			})
				.to(".insideLoader", {
					delay: 0.5,
					duration: 1,
					scale: 10,
				})
				.to(".homeCircle", {
					delay: 0.5,
					duration: 1,
					width: "600px",
					height: "600px",
					display: "block",
					backgroundColor: "rgb(253, 189, 80)",
					ease: "power3.in",
				});
		});
	}, []);

	return (
		<>
			<div className={`${styles.wrapper}`} ref={root}>
				<div className={`${styles.loader} loader`}>
					<div className={`${styles.insideLoader} insideLoader`}></div>
				</div>
				<div className={`${styles.homeCircle} homeCircle`}></div>
			</div>
		</>
	);
};

export default HomeAnimation;
