import { UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import terser from "@rollup/plugin-terser";
import path from "path";

export default (): UserConfigExport => {
  return {
    publicDir: false,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true, // 解构 props
        },
      }),
      vueJsx(),
    ],
    build: {
      cssCodeSplit: false,
      outDir: "lib",
      emptyOutDir: true,
      lib: {
        entry: resolve(process.cwd(), "./src/index.ts"),
        name: "vue-compoments",
        formats: ["es"],
        fileName: (name) => `index.js`,
      },
      rollupOptions: {
        output: {
          globals: {
            vue: "Vue",
          },
          assetFileNames: "index.css",
        },
        plugins: [terser()],
        external: ["vue"],
      },
    },
  };
};
