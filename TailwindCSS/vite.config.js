import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  // Reemplaza 'mi-portafolio' por el nombre exacto de tu repositorio en GitHub
  base: 'TailwindCSS/',
});