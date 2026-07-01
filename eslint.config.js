import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 1. Alvo de validação
  { files: ['src/**/*.ts'] },
  
  // 2. Pastas ignoradas
  { ignores: ['dist/**', 'node_modules/**'] },
  
  // 3. Configurações recomendadas da comunidade
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // 4. Suas regras estritas de padronização visual
  {
    rules: {
      // OBRIGA o uso de ponto e vírgula no final de todas as instruções
      'semi': ['error', 'always'], 
      
      // Proíbe pontos e vírgulas duplicados (ex: ;; )
      'no-extra-semi': 'error',                      
      
      // Força o uso de aspas simples por padrão para textos
      'quotes': ['error', 'single'],                 
      
      // Força a indentação padronizada com 2 espaços
      'indent': ['error', 2],

      // Desliga no-unused-vars do ESLint pois o tsconfig já trata
      // com noUnusedLocals e noUnusedParameters
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
);
