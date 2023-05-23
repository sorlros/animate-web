import styles from "../../styles/Home.module.css";
import { useEffect, useState, useRef } from "react";
import RightNav from "@/components/RightNav.jsx";
import Text1 from "@/components/text/Text1";
import SpaceshipCanvas from "@/components/canvas/Spaceship";
import StarsCanvas from "@/components/canvas/Stars";
import { motion } from "framer-motion";
import HomeCircle from "../../components/home/HomeCircle";
import { useRouter } from "next/router";

const Home = () => {
	const scrollRef = useRef(null);
	const [number, setNumber] = useState();
	const router = useRouter();

	const handleAnimatedComplete = () => {
		if (scroll.scrollDown) {
			router.push("/space-area", undefined, { shallow: true });
		} else if (!scroll.scrollDown) {
			return null;
		}
	};

	const getNumber = (number) => {
		setNumber(number);
	};
	const [scroll, setScroll] = useState({
		scrollDown: false,
		scrollUp: false,
	});

	useEffect(() => {
		setNumber(0);
		setScroll({
			scrollDown: false,
			scrollUp: false,
		});

		const handleScroll = (event) => {
			// 스크롤 다운
			if (event.deltaY > 0) {
				// console.log("스크롤 다운")
				event.preventDefault();
				setScroll({
					scrollUp: false,
					scrollDown: true,
				});
			}
			// 스크롤 업
			else if (event.deltaY < 0) {
				// console.log("스크롤 업")
				event.preventDefault();
				setScroll({
					scrollUp: true,
					scrollDown: false,
				});
			}
		};

		if (scrollRef.current) {
			scrollRef.current.addEventListener("wheel", handleScroll);
		}
		return () => {
			if (scrollRef.current) {
				scrollRef.current.removeEventListener("wheel", handleScroll);
			}
		};
	}, []);

	return (
		<>
			<div ref={scrollRef}>
				<div className={`${styles.wrapper} section`}>
					<motion.div
						animate={{
							scale: scroll.scrollDown ? 0 : 1,
							transition: {
								duration: 1,
								delay: 0.5,
								type: "spring",
								ease: "easeInOut",
								onComplete: () => handleAnimatedComplete(),
							},
						}}
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						<HomeCircle number={number} />
					</motion.div>

					<div className={styles.description}></div>

					<motion.div
						animate={{
							right: scroll.scrollDown ? "-40%" : "10%",
							transition: { duration: 0.5 },
						}}
						style={{
							position: "absolute",
							top: "50%",
							transform: "translateY(-50%)",
							right: "10%",
						}}
					>
						<RightNav number={number} getNumber={getNumber} />
					</motion.div>

					<motion.div
						animate={{
							left: scroll.scrollDown ? "-40%" : "5%",
							transition: { duration: 0.5 },
						}}
						style={{ position: "absolute", top: "25%" }}
					>
						<Text1 number={number} />
					</motion.div>

					<div className={styles.scrollMark}>
						<p>SCROLL TO UP OR DOWN</p>
					</div>
				</div>

				{/* <div style={{ width: "100%", height: "100vh" }} className="section">
					<StarsCanvas />
				</div>

				<div style={{ width: "100%", height: "100vh" }} className="section">
					<SpaceshipCanvas />
				</div> */}
			</div>
		</>
	);
};

export default Home;
