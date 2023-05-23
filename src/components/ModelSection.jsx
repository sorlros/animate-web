import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber"
import styles from "../styles/ModelSection.module.css"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Suspense, useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import * as THREE from "three"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ModelSection = () => {
	const modelRef = useRef()
	let { scene, renderer } = useThree()

	const loader = new GLTFLoader()
	loader.load("/need_some_space/scene.gltf", (gltf) => {
		const model = gltf.scene
		modelRef.current = model
		scene.add(model)

		const box = new THREE.Box3().setFromObject(model)
		const size = box.getSize(new THREE.Vector3()).length()
		const center = box.getCenter(new THREE.Vector3())

		model.position.x += model.position.x - center.x
		model.position.y += model.position.y - center.y
		model.position.z += model.position.z - center.z
		scene.position.z = -size
	})

	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true,
	})

	renderer.physicalCorrectLights = true
	renderer.outputEncoding = THREE.sRGBEncoding

	const light = new THREE.DirectionalLight(0xffffff, 10)
	scene.add(light)

	scene.rotation.set(-15, 60, 0)

	useFrame(() => {
		if (modelRef.current) {
			modelRef.current.scale.x += 10
			modelRef.current.scale.y += 10
			modelRef.current.scale.z += 10
		}
	})

	useEffect(() => {
		if (!modelRef.current) return
		const animate = gsap.from(modelRef.current.scale, {
			duration: 1,
			x: 2,
			y: 2,
			z: 2,
			ease: "power3.out",
			paused: true,
		})

		const tl = ScrollTrigger.create({
			trigger: ".sec01",
			start: "top top",
			endTrigger: "sec04",
			onEnter: () => animate.play(),
			onLeaveBack: () => animate.reverse(),
		})
		tl.to(modelRef.current, { duration: 1, scale: 3 })
		tl.to(modelRef.current, { duration: 2, scale: 5 })
		tl.to(modelRef.current, { duration: 3, scale: 7 })
		tl.to(modelRef.current, { duration: 4, scale: 9 })

		// return () => {
		// 	animate.kill()
		// }
	}, [])
}

export default ModelSection
