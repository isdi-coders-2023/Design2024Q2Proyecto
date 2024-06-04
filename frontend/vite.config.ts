import {defineConfig} from 'vitest/config';
import {loadEnv} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [react()],
        server: {
            port: Number(env.VITE_PORT),
            proxy: {
                '/api': 'http://localhost:3000',
            },
        },
        test: {
            globals: true,
            environment: 'js-dom',
            setupFiles: ['./test/setup.ts'],
        },
    };
});
