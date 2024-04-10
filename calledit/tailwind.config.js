/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {

			colors: {
				"cinna": "#FF3800",
				"seagreen": "#20B2AA",
				"background-gray": "#d6dbdc",
			},
		},
	},
	plugins: [],
}

