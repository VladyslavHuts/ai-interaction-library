import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ai/components': path.resolve(__dirname, '../../ai-interaction-react/src/components'),
      '@ai/hooks': path.resolve(__dirname, '../../ai-interaction-react/src/hooks'),
      '@ai/styles': path.resolve(__dirname, '../../ai-interaction-react/src/styles'),
      '@ai/utils': path.resolve(__dirname, '../../ai-interaction-react/src/utils'),
      '@ai/types': path.resolve(__dirname, '../../ai-interaction-react/src/types'),
    }
  }
});
