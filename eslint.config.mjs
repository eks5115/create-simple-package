import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended, {
    ignores: ['dist/*', 'example/*', 'node_modules/*', 'template/*'],
  }, {
    'rules': {
      '@typescript-eslint/no-explicit-any': 'off',
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 0, 'maxEOF': 1 }],
      'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
      'semi': ['error', 'never'],
      'object-curly-spacing': ['error', 'always']
    }
  }
]
