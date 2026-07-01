import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    // Roda o novo ESLint a cada salvamento de arquivo
    eslint({
      cache: false,
      include: ['src/**/*.ts']
    }),
    // Roda o compilador TypeScript checando o tsconfig.json em tempo real
    checker({
      typescript: true
    })
  ]
});
