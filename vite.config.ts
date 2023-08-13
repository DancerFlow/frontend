import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    assetsInclude: ['**/*.glb'],
    plugins: [react()],
    server: {
        watch: {
            usePolling: true
        },

        // open: true, // 브라우저 자동 실행 여부
        hmr: {
            // 브라우저 자동 새로고침 여부
            overlay: true
        }
    }
});
