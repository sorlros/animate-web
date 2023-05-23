import Image from "next/image"
import planetPic from "../../../public/planet001.png"
import planetPic2 from "../../../public/planet002.png"
import planetPic3 from "../../../public/planet003.png"
import planetPic4 from "../../../public/planet004.png"
import styles from "../../styles/Planet.module.css"
import { gsap } from "gsap"
import { useEffect, useState, useRef } from "react"
import ScrollTrigger from "gsap/dist/ScrollTrigger"

const Planet = ({ number }) => {
	gsap.registerPlugin(ScrollTrigger)

	const app = useRef()

	// const [exNumber, setExNumber] = useState()

	const moveHeight = -605 * number
	// const moveHeight2 = -605 * (exNumber - number)

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.to(".moveCircle", {
				y: moveHeight,
				duration: 1,
			})
		}, app)
	}, [number])

	return (
		<div className={`${styles.wrapper} wrapper`} ref={app}>
			<div className={`${styles.homeCircle}`}>
				<div className={`${styles.moveCircle} moveCircle`}>
					<Image
						className={`${styles.planets} planets planet1`}
						src={planetPic}
						alt="planet-01"
					/>
					<Image
						className={`${styles.planets} planets planet2`}
						src={planetPic2}
						alt="planet-02"
					/>
					<Image
						className={`${styles.planets} planets planet3`}
						src={planetPic3}
						alt="planet-03"
					/>
					<Image
						className={`${styles.planets} planets planet4`}
						src={planetPic4}
						alt="planet-04"
					/>
				</div>
			</div>
		</div>
	)
}

export default Planet
