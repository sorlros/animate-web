import { BiBaseball, BiGridSmall, BiBug, BiCoinStack, BiCool } from "react-icons/bi";
import styles from "../styles/RightNav.module.css";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
	ArrowsUpDownIcon,
	ChevronDoubleUpIcon,
	ChevronDoubleDownIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@heroicons/react/24/outline";
const RightNav = ({ number, getNumber }) => {
	const [isCheck, setCheck] = useState(false);

	const co = useRef();
	const itemRef = useRef();

	useEffect(() => {
		const nav = document.querySelector(".rightNav");
		let ctx = gsap.context(() => {
			gsap.to(nav, {
				duration: 1,
				right: "10%",
			});
		}, co);
		return () => ctx.revert();
	}, []);

	return (
		<nav className={`${styles.rightNav} rightNav`} ref={co}>
			<ul className={styles.navUl}>
				<li className={styles.sideMenu}>
					<ChevronDoubleUpIcon
						className={styles.icons}
						onClick={() => {
							getNumber(0);
						}}
					/>
				</li>
				<li className={styles.sideMenu}>
					<ChevronUpIcon
						className={styles.icons}
						onClick={() => {
							getNumber(1);
						}}
					/>
				</li>
				<li className={`${styles.toggleMenu}`}>
					<ArrowsUpDownIcon
						className={styles.icons}
						onClick={() => {
							setCheck((e) => !e);
						}}
					/>
				</li>
				<li className={styles.sideMenu}>
					<ChevronDownIcon
						className={styles.icons}
						onClick={() => {
							getNumber(2);
						}}
					/>
				</li>
				<li className={styles.sideMenu}>
					<ChevronDoubleDownIcon
						className={styles.icons}
						onClick={() => {
							getNumber(3);
						}}
					/>
				</li>
			</ul>
		</nav>
	);
};

export default RightNav;

BiGridSmall;
