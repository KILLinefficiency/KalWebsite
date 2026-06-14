import adapter from '@sveltejs/adapter-static';

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
