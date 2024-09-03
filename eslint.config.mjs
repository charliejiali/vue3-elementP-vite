import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off',
  },
  ignores: [
    'build/*.js',
    'src/assets',
    'public',
    'dist',
  ],
})
