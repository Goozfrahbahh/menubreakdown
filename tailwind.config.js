/** @type {import('tailwindcss').Config} */

module.exports = {
	purge: [
		'./src/**/*.{html,ts}',
	],
	theme: {
		patterns: {
			opacities: {
				100: "1",
				80: ".80",
				60: ".60",
				40: ".40",
				20: ".20",
				10: ".10",
				5: ".05",
			},
			sizes: {
				1: "0.25rem",
				2: "0.5rem",
				4: "1rem",
				6: "1.5rem",
				8: "2rem",
				16: "4rem",
				20: "5rem",
				24: "6rem",
				32: "8rem",
			}
		},
		extend: {
			keyframes: {
				'fade-in-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
				}
			},
			animation: {
				'fade-in-down': 'fade-in-down 0.5s ease-out'
			},
			keyframes: {
				'in-out-ease': {
					'0%': {
						width: '100%',
					},
					'100%': {
						width: 0,
						position: 'absolute'
					},
				}
			},
			animation: {
				'in-out-ease': 'fade-in-down 2s cubic-bezier( 0.455, 0.03, 0.515, 0.955 )'
			},
		},
	},
	plugins: [require('@tailwindcss/typography')]
}