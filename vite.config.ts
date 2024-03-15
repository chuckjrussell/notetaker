import {defineConfig, transformWithEsbuild} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {extname} from 'path';
import svgr from 'vite-plugin-svgr';
import babel from 'vite-plugin-babel';

export default defineConfig({
  define: {
    global: 'window',
    'process.env': {},
    __DEV__: 'true',
  },
  optimizeDeps: {
    esbuildOptions: {
      mainFields: ['module', 'main'],
      resolveExtensions: ['.web.js', '.js', '.ts'],
      jsx: 'automatic',
      loader: {
        '.js': 'jsx',
      },
    },
  },
  resolve: {
    extensions: ['.web.tsx', '.web.jsx', '.web.js', '.tsx', '.ts', '.js'],
    alias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
      '@ui-library': path.resolve(__dirname, './ui-library'),
    },
  },
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null; // include ts or tsx for TypeScript support

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
    svgr(),
    react(),
    babel({
      filter:
        /[\/](node_modules\/@react-navigation|node_modules\/react-native-drawer-layout)[\/].+\.(js|ts|jsx|tsx)$/,
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: [
          '@babel/plugin-proposal-export-namespace-from',
          'react-native-reanimated/plugin',
        ],
      },
    }),
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
