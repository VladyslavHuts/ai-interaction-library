import viteReact from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'

export default defineConfig({
    root: 'examples',
    plugins: [viteReact(), tsconfigPaths()],
})
