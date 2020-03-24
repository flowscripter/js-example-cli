module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2017
    },
    extends: [
        'airbnb-base',
    ],
    rules: {
        'padded-blocks': 'off',
        'comma-dangle': 'off',
        indent: [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'max-len': [
            'error',
            {
                code: 120,
                comments: 120
            }
        ],
        'no-restricted-syntax': [
            'error',
            'ForInStatement',
            'LabeledStatement',
            'WithStatement'
        ]
    },
    overrides: [
        {
            files: [
                '**/*.test.js'
            ],
            env: {
                jest: true
            },
            plugins: [
                'jest'
            ],
            rules: {
                'jest/no-disabled-tests': 'warn',
                'jest/no-focused-tests': 'error',
                'jest/no-identical-title': 'error',
                'jest/prefer-to-have-length': 'warn',
                'jest/valid-expect': 'error'
            }
        }
    ]
};
