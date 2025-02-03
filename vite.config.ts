import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { execSync } from 'child_process'
import path from 'path'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))
const gitCommitHash = execSync('git rev-parse --short HEAD').toString().trim()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __GIT_COMMIT_HASH__: JSON.stringify(gitCommitHash)
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/1_app'),
      '@pages': path.resolve(__dirname, 'src/2_pages'),
      '@widgets': path.resolve(__dirname, 'src/3_widgets'),
      '@features': path.resolve(__dirname, 'src/4_features'),
      '@entities': path.resolve(__dirname, 'src/5_entities'),
      '@shared': path.resolve(__dirname, 'src/6_shared'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  }
})