// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	compiler: {
// 		styledComponents: true,
// 	},
// 	publicRuntimeConfig: {
// 		// 정적 파일 경로 설정
// 		staticFolder: "/static",
// 	},
// }

// module.exports = nextConfig

// module.exports = {
// 	experimental: { esmExternals: true },
// 	webpack: (config, { isServer }) => {
// 		if (!isServer) {
// 			config.resolve.fallback = {
// 				fs: false,
// 				module: true,
// 			}
// 		}

// 		return config
// 	},
// }

const withTM = require("next-transpile-modules")(["module1", "module2"])

module.exports = withTM({
	experimental: { esmExternals: true },
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
				module: true,
			}
		}

		return config
	},
})
