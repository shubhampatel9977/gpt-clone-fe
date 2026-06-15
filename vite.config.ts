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
			"@components": path.resolve(__dirname, "./src/components"),
			"@features": path.resolve(__dirname, "./src/features"),
			"@layouts": path.resolve(__dirname, "./src/layouts"),
			"@lib": path.resolve(__dirname, "./src/lib"),
			"@mocks": path.resolve(__dirname, "./src/mocks"),
			"@routes": path.resolve(__dirname, "./src/routes"),
			"@app-types": path.resolve(__dirname, "./src/types"),
			"@utils": path.resolve(__dirname, "./src/utils"),
		},
	},
});
