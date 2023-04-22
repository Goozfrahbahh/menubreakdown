/** @type {import('tailwindcss').Config} */

module.exports = {
	prefix: '',
	purge: {
		enabled: process.env.NODE_ENV === 'production',
		content: [
			'./src/**/*.{html,ts}',
		]
	},
	theme: {
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
			}
		},
	}
}