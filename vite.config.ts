import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  /**
   * [plugin:vite:css] '~antd/dist/antd.less' wasn't found.
   * less import no support webpack alias '~'
   *
   * Ref: https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
   */
  resolve: {
    alias: [{ find: /^~/, replacement: "" }],
  },

  /**
   * [plugin:vite:css] Inline JavaScript is not enabled. Is it set in your options?
   *
   * Ref:
   *   https://blog.csdn.net/baobao_123456789/article/details/113986961
   *   https://stackoverflow.com/questions/46729091/enable-inline-javascript-in-less
   * 
   * TODO:
   *   In watch mode, changes in @import'ed files don't trigger CSS rebuild
   *   https://github.com/vitejs/vite/issues/3387
   */
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

  // https://vitejs.bootcss.com/config/#build-options
  build: {
    // https://vitejs.bootcss.com/config/#build-lib
    lib: {
      entry: "./src/index.tsx",
      formats: ["es"],
      fileName: "index",
    },

    // https://vitejs.bootcss.com/config/#build-minify
    minify: false,

    /**
     * index.es.js:250 Uncaught Error: Minified React error #321; visit https://reactjs.org/docs/error-decoder.html?invariant=321 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
     * 
     * Ref:
     *   https://github.com/styled-components/styled-components/issues/2690
     *   https://vitejs.bootcss.com/config/#build-rollupoptions
     */
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
