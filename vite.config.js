import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        resume: resolve(__dirname, 'resume.html'),
        contact: resolve(__dirname, 'contact.html'),
        wan: resolve(__dirname, 'projects/wan-security-lab.html'),
        lan: resolve(__dirname, 'projects/campus-lan.html'),
        bigbackcooks: resolve(__dirname, 'projects/bigbackcooks.html'),
        houseglimpse: resolve(__dirname, 'projects/houseglimpse.html')
      }
    }
  }
})
