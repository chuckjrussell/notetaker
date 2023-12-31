import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


export default defineConfig({
  define: {
    global: "window",
  },
  optimizeDeps: {
    esbuildOptions: {
      mainFields: ["module", "main"],
      resolveExtensions: [".web.js", ".js", ".ts"],
    },
  },
  resolve: {
    extensions: [".web.tsx", ".web.jsx", ".web.js", ".tsx", ".ts", ".js"],
    alias: {
      "react-native": "react-native-web",
      '@ui-library': path.resolve(__dirname, './ui-library'),
    },
  },
  plugins: [
    react()
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})