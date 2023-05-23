import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import HeadInfo from "../components/HeadInfo.js"
import HomeAnimation from "../components/HomeAnimation.jsx"

export default function Home() {
	return (
		<>
			<HeadInfo />
			<HomeAnimation />
		</>
	)
}
