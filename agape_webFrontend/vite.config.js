import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
})

// el root es importante, porque me ayuda a seber desde que carpeta va a tomar los archivos que
// va a autiliozar para generar el dist/ de la build
// esto le dice a vite que compile desde agape_webFrontend y genere el build en dist/

