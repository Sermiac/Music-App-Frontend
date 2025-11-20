import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // listens on all network interfaces
    port: 5174, // optional: specify port
  },
});
