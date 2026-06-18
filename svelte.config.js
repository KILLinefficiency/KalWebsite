import adapterVercel from "@sveltejs/adapter-vercel";
import adapterStatic from "@sveltejs/adapter-static";

const config = {
	kit: {
		adapter: process.env.DEPLOY_TARGET === "gh-pages"
			? adapterStatic()
			: adapterVercel(),

		output: {
			bundleStrategy: "single"
		}
	}
};

export default config;
