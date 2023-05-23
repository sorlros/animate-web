import styles from "../../styles/Home.module.css"
import Planet from "../planets/Planet"
import { useEffect } from "react"

const HomeCircle = ({ number }) => {
	useEffect(() => {
		function getRandomPixelValue(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min + "px"
		}
		function changeBoxShadow() {
			let element = document.getElementById("circle-shadow")
			let boxShadowValue =
				"#fff 0 -1px" +
				getRandomPixelValue(20, 60) +
				", #ff0 0 -2px " +
				getRandomPixelValue(20, 60) +
				", #ff8000 0 -10px " +
				getRandomPixelValue(10, 30) +
				", red 0 -18px " +
				getRandomPixelValue(20, 60) +
				", 5px 5px 15px 5px rgba(0, 0, 0, 0)"
			element.style.boxShadow = boxShadowValue

			setInterval(changeBoxShadow, 500)
		}
	}, [])

	return (
		<div className={styles.homeCircle} id="circle-shadow">
			<Planet number={number} />
		</div>
	)
}

export default HomeCircle
