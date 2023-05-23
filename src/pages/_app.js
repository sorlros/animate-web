import { useRouter } from "next/router.js"
import Layout from "../components/Layout.jsx"
import "../styles/globals.css"
import Home from "./index"
import Head from "next/head"

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Portfolio</title>
			</Head>
			<Component {...pageProps} />
		</>
	)
}

// return router.pathname === "/" || "/home" ? (
//   <Home />
// ) : (
//   <Layout>
//     <Component {...pageProps} />
//   </Layout>
// )
