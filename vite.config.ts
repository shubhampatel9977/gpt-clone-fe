import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@src": path.resolve(__dirname, "./src"),
			"@apis": path.resolve(__dirname, "./src/apis"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@config": path.resolve(__dirname, "./src/config"),
			"@containers": path.resolve(__dirname, "./src/containers"),
			"@forms": path.resolve(__dirname, "./src/forms"),
			"@layouts": path.resolve(__dirname, "./src/layouts"),
			"@mockData": path.resolve(__dirname, "./src/mockData"),
			"@lib": path.resolve(__dirname, "./src/lib"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@store": path.resolve(__dirname, "./src/store"),
			"@utils": path.resolve(__dirname, "./src/utils"),
		},
	},
});
