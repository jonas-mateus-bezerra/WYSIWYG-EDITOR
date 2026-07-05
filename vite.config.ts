import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    // Roda o novo ESLint a cada salvamento de arquivo
    eslint({
      cache: false,
      include: ['src/**/*.ts'],
      lintOnStart: true,
      customOverlay: true
    }),
    // Roda o compilador TypeScript checando o tsconfig.json em tempo real
    checker({
      typescript: true
    })
  ],
    base: 'https://jonas-mateus-bezerra.github.io/WYSIWYG-EDITOR/',
});
