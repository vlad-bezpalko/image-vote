import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // Set the base path to your repository name if deploying to project pages
    // e.g., '/image-vote-sheets/'
    base: '/image-vote/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                results: resolve(__dirname, 'results.html'),
            },
        },
    },
});
