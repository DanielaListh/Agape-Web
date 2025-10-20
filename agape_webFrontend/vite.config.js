import { defineConfig } from 'vite';

// el root es importante, porque me ayuda a seber desde que carpeta va a tomar los archivos que
// va a autiliozar para generar el dist/ de la build
// esto le dice a vite que compile desde agape_webFrontend y genere el build en dist/

export default defineConfig({
  root: 'agape_webFrontend',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});