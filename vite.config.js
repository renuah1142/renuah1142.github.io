import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        projects: resolve(root, 'projects.html'),
        resume: resolve(root, 'resume.html'),
        contact: resolve(root, 'contact.html'),
        wan: resolve(root, 'projects/wan-security-lab.html'),
        lan: resolve(root, 'projects/campus-lan.html'),
        bigbackcooks: resolve(root, 'projects/bigbackcooks.html'),
        houseglimpse: resolve(root, 'projects/houseglimpse.html')
      }
    }
  }
})
