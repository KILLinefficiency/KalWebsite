import adapterVercel from "@sveltejs/adapter-vercel";
import adapterStatic from "@sveltejs/adapter-static";

const isGithub = process.env.TARGET === "github";

const config = {
	kit: {
		adapter: isGithub
			? adapterStatic({ pages: "build" })
			: adapterVercel(),

		output: {
			bundleStrategy: "single"
		},

		paths: {
			base: isGithub ? process.env.BASE_PATH : ''
		}
	}
};

export default config;
