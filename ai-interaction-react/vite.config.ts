import { defineConfig } from 'vite'
import * as react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    root: 'examples',
    plugins: [react(), tsconfigPaths()],
})
