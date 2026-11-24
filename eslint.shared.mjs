// @ts-check

// Shared stylistic and Vue formatting rules across workspaces
/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    rules: {
      // Stylistic formatting rules (<script> and .ts/.js files)
      '@stylistic/indent': [ 'error', 2 ],
      '@stylistic/semi': [ 'error', 'always' ],
      '@stylistic/quotes': [ 'error', 'single', { avoidEscape: true } ],
      '@stylistic/comma-dangle': [ 'error', 'never' ],
      '@stylistic/space-in-parens': [ 'error', 'always' ],
      '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
      '@stylistic/computed-property-spacing': [ 'error', 'always' ],
      '@stylistic/object-curly-spacing': [ 'error', 'always' ],
      '@stylistic/object-curly-newline': [ 'error', { ImportDeclaration: 'never' } ],
      '@stylistic/template-curly-spacing': [ 'error', 'always' ],
      '@stylistic/arrow-parens': [ 'error', 'always' ],
      '@stylistic/brace-style': [ 'error', '1tbs', { allowSingleLine: true } ],

      // Vue SFC structure & template formatting
      'vue/block-order': [ 'error', { order: [ 'template', 'script', 'style' ] } ],
      'vue/html-indent': [ 'error', 2, { baseIndent: 1 } ],
      'vue/script-indent': [ 'error', 2, { baseIndent: 1, switchCase: 1 } ],
      'vue/html-quotes': [ 'error', 'double', { avoidEscape: true } ],
      'vue/space-in-parens': [ 'error', 'always' ],
      'vue/array-bracket-spacing': [ 'error', 'always' ],
      'vue/template-curly-spacing': [ 'error', 'always' ],
      'vue/brace-style': [ 'error', '1tbs', { allowSingleLine: true } ],
      'vue/attributes-order': [
        'warn',
        {
          order: [
            [ 'GLOBAL', 'ATTR_STATIC', 'ATTR_SHORTHAND_BOOL' ],
            [ 'DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'UNIQUE', 'SLOT', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'ATTR_DYNAMIC' ],
            'EVENTS',
            'CONTENT'
          ]
        }
      ],
      'vue/max-attributes-per-line': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: { void: 'always', normal: 'always', component: 'always' },
          svg: 'always',
          math: 'always'
        }
      ]
    }
  },
  {
    // Disable @stylistic/indent inside .vue files because vue/script-indent handles baseIndent: 1
    files: [ '**/*.vue' ],
    rules: {
      '@stylistic/indent': 'off'
    }
  }
];
