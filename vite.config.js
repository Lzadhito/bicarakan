import solid from "solid-start/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import staticAdapter from "solid-start-static";

// import devtools from 'solid-devtools/vite';

export default defineConfig({
  base: "/bicarakan/",
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    solid({ adapter: staticAdapter() }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
