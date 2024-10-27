import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.js',
      name: 'Micromponents',
      fileName: 'button',
      formats: ['umd', 'es']
    },
    outDir: 'dist',
  }
});
