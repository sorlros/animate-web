import { gsap } from "gsap"
import { useEffect, useState } from "react"
import styled, { css } from "styled-components"

const Wrapper = ({ children, className, style }) => (
	<div className={`wrapper ${className}`} style={style}>
		{children}
		<style jsx>{`
			.wrapper {
				width: 400px;
				height: 400px;
				padding: 10px 0 0 10px;
				background-color: transparent;
				position: absolute;
				top: 25%;
				left: 5%;
				overflow: hidden;
				transition: 0.5s;
			}
			// Add more styles as needed
		`}</style>
	</div>
)

const Title = ({ children }) => (
	<span>
		{children}
		<style jsx>{`
			span {
				width: 100px;
				height: 20px;
				color: white;
				font-weight: 700;
				font-size: 45px;
				margin-top: 0px;
				white-space: inherit;
			}
			// Add more styles as needed
		`}</style>
	</span>
)

const Text = ({ children }) => (
	<p>
		{children}
		<style jsx>{`
			p {
				width: 350px;
				height: 250px;
				position: absolute;
				font-size: 20px;
				color: white;
				word-break: break-all;
				white-space: inherit;
				margin-top: 30px;
				line-height: 30px;
			}
			// Add more styles as needed
		`}</style>
	</p>
)

const Text1 = ({ number }) => {
	const [exNumber, setExnumber] = useState(number)

	useEffect(() => {
		setExnumber(number)

		const exElement = document.querySelectorAll(`.wrapper-${exNumber}`)
		const nextElement = document.querySelector(`.wrapper-${number}`)

		// if (exNumber !== number) {
		// }
		const ctx = gsap.context(() => {
			if (exNumber !== number) {
				gsap.to(exElement, {
					ease: "slowmo",
					height: "0px",
					visibility: "hidden",
					duration: 1,
				})
				gsap.to(nextElement, {
					delay: 0.8,
					ease: "expo",
					height: "400px",
					visibility: "visible",
					duration: 0.5,
				})
			}
		})
	}, [number])
	return (
		<>
			<div>
				<Wrapper className="wrapper-0">
					<Title>First Section</Title>
					<Text>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ut vero
						tenetur perspiciatis eaque assumenda consequuntur rem fuga quo nulla
						eligendi sapiente quos non officia repellat, praesentium qui ratione porro?
					</Text>
				</Wrapper>
				<Wrapper className="wrapper-1" style={{ visibility: "hidden", height: "0px" }}>
					<Title>Second Section</Title>
					<Text>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci porro fuga
						ab. Ullam culpa voluptatum est quidem totam unde odit error porro ducimus,
						possimus, non quis dolores vel rerum nesciunt?
					</Text>
				</Wrapper>
				<Wrapper className="wrapper-2" style={{ visibility: "hidden", height: "0px" }}>
					<Title>Third Section</Title>
					<Text>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda iste
						omnis animi architecto eum nisi illo repellat nobis cumque itaque saepe
						vitae id aliquam, neque tenetur nulla, magnam sequi excepturi?
					</Text>
				</Wrapper>
				<Wrapper className="wrapper-3" style={{ visibility: "hidden", height: "0px" }}>
					<Title>Fourth Section</Title>
					<Text>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus sint
						quibusdam consectetur distinctio. Dignissimos fugit doloremque tempore
						dolores eaque ducimus modi laboriosam? Amet magnam obcaecati perferendis!
						Ipsa eius possimus natus!
					</Text>
				</Wrapper>
			</div>
		</>
	)
}

export default Text1
