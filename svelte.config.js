import adapter from '@sveltejs/adapter-vercel';

const config = {
	kit: {
		adapter: adapter({
			fallback: "404.html"
		}),

		output: {
			bundleStrategy: "single"
		}
	}
};

export default config;
