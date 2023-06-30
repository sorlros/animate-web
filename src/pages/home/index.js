import styles from "../../styles/Home.module.css";
import { useEffect, useState, useRef } from "react";
import RightNav from "@/components/RightNav.jsx";
import Text1 from "@/components/text/Text1";
import SpaceshipCanvas from "@/components/canvas/Spaceship";
import StarsCanvas from "@/components/canvas/Stars";
import { motion } from "framer-motion";
import HomeCircle from "../../components/home/HomeCircle";
import { useRouter } from "next/router";
import SpaceshipModalCanvas from "@/components/canvas/SpaceshipModal";
import earth from "../../../public/earth.jpg";
import Image from "next/image";

const Home = () => {
	const scrollRef = useRef(null);
	const [number, setNumber] = useState();
	const router = useRouter();

	const [page, setPage] = useState(1);

	const hanldePageChange = (page) => {
		setPage(page);
	};

	const handleAnimatedComplete = () => {
		if (scroll.scrollDown && page === 1) {
			setPage(2);
			const firstWrapper = document.querySelector(".section");
			const secondWrapper = document.querySelector(".second-wrapper");
			firstWrapper.style.display = "none";
			secondWrapper.style.display = "block";
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
		const wrapper = document.querySelector(".section");
		const secondWrapper = document.querySelector(".second-wrapper");

		if (page === 1) {
			wrapper.style.display = "block";
			secondWrapper.style.display = "none";
			setScroll({
				scrollDown: false,
				scrollUp: false,
			});
		} else {
			wrapper.style.display = "none";
			secondWrapper.style.display = "block";
		}
	}, [page]);

	useEffect(() => {
		setNumber(0);
		setScroll({
			scrollDown: false,
			scrollUp: false,
		});

		console.log(page);

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
			// console.log("scroll", scroll);
		};

		if (scrollRef.current) {
			scrollRef.current.addEventListener("wheel", handleScroll);
		}
		return () => {
			if (scrollRef.current) {
				scrollRef.current.removeEventListener("wheel", handleScroll);
			}
		};
	}, [page]);

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

					<motion.div
						className={styles.scrollMark}
						animate={{
							display: scroll.scrollDown ? "none" : "block",
						}}
					>
						<p>SCROLL TO UP OR DOWN</p>
					</motion.div>
				</div>
			</div>

			<motion.div className="second-wrapper" style={{ display: "none" }}>
				<motion.div
					className="land-section"
					style={{ zIndex: 900 }}
					// initial={{ position: "fixed", top: 0 }}
				>
					<Image src={earth} alt="earth" style={{ width: "100%", height: "100vh" }} />
				</motion.div>
				<StarsCanvas />
				<motion.div
					initial={{ scale: 0 }}
					transition={{ duration: 1 }}
					animate={{
						scale: page === 2 ? 1 : 0, // 이 부분 해야할것
					}}
				>
					<SpaceshipModalCanvas wholePageState={hanldePageChange} page={page} />
				</motion.div>
			</motion.div>
		</>
	);
};

export default Home;
