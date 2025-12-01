import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  // 👇 AQUÍ ESTABA EL ERROR. Lo cambiamos por el nombre de tu repo:
  base: '/VigiTechLab_Corregido-PS/',
  
  publicDir: 'public',
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'src/css',   dest: 'src' },
        { src: 'src/views', dest: 'src' },
        { src: 'public/docs', dest: '.' } 
      ]
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})