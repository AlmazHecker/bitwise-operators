import { sync } from "glob";
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default {
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: sync("./src/*.html".replace(/\\/g, "/")),
    },
  },

   base: '/bitwise-operators/',

  plugins: [ViteMinifyPlugin()],
};
