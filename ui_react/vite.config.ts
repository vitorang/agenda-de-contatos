import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/react/', 
    plugins: [plugin()],
    server: {
        port: 5633,
    },
    build: {
        chunkSizeWarningLimit: 1000
    }
})
