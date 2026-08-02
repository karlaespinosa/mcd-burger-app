import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Burger Menu",
    short_name: "Burger Menu",

    description:
      "Browse burgers, view nutritional information and build your order.",

    start_url: "/",

    display: "standalone",

    background_color: "#000000",

    theme_color: "#000000",

    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
