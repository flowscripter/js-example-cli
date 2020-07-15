import cleanup from 'rollup-plugin-cleanup';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';

module.exports = [
    {
        input: {
            node: 'src/exampleCli.js'
        },
        output: {
            dir: 'dist',
            format: 'es',
            sourcemap: true
        },
        watch: {
            include: 'src/**',
        },
        external: [
            'assert',
            'crypto',
            'events',
            'fs',
            'os',
            'path',
            'readline',
            'stream',
            'tty',
            'util',
            'http',
            'https',
            'zlib',
            'url',
            'string_decoder',
            'buffer',
            'constants',
            'readable-stream'
        ],
        plugins: [
            eslint({
                include: [
                    'src/**/*.js'
                ]
            }),
            commonjs(),
            resolve(),
            resolve({
                preferBuiltins: true
            }),
            cleanup({
                extensions: [
                    'js'
                ]
            })
        ]
    }
];
