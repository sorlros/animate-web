import Nav from "./Nav.jsx"

const Layout = ({ children }) => {
	return (
		<>
			<Nav />
			<div>{children}</div>
		</>
	)
}

export default Layout
