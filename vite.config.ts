import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Automatically use the repo name from GITHUB_REPOSITORY (e.g., 'username/repo-name')
  // Falls back to './' for local development
  base: process.env.GITHUB_REPOSITORY 
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : './',
  define: {
    // We use JSON.stringify to correctly replace the variable with a string literal
    // This targets the specific key to avoid overwriting the entire process.env object
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    // Only expose GITHUB_TOKEN in Codespaces environment for development
    // The CODESPACES env var is set to 'true' when running in GitHub Codespaces
    'process.env.GITHUB_TOKEN': JSON.stringify(
      process.env.CODESPACES === 'true' ? process.env.GITHUB_TOKEN || '' : ''
    )
  }
})