import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "TicTacToe Next.js",
		short_name: "TicTacToe",
		description: "Developed by Sergey",
		start_url: "/",
		display: "standalone",
		background_color: "rgb(238, 238, 238)",
		theme_color: "rgb(238, 238, 238)",
		icons: [
			{
				src: "/logo.svg",
				sizes: "any",
				type: "image/x-icon",
			},
		],
	}
}