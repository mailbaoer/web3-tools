import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components(),
    nodePolyfills({ protocolImports: true }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      plugins: [visualizer(), splitVendorChunkPlugin()],
      output: {
        manualChunks: (id) => {
          if (id.includes('wagmi') || id.includes('viem')) {
            return 'web3';
          }
          // if (id.includes('lodash')) {
          //   return 'lodash';
          // }

          // if (id.includes('bn.js')) {
          //   return 'bn.js';
          // }
          // if (id.includes('walletconnect')) {
          //   return 'walletconnect'
          // }
        },
      },
    },
  },
})
