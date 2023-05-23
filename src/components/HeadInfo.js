import Head from "next/head"

const HeadInfo = ({ title, keyword, contents }) => {
	return (
		<Head>
			<title>{title}</title>
			<meta keyword={keyword} contents={contents} />
		</Head>
	)
}

HeadInfo.defaultProps = {
	title: "My Portfolio with next.js",
	keyword: "Portfolio",
	contents: "This webpage is made with 3D animation.",
}

export default HeadInfo
