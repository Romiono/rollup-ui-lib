import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';
import postcss from 'rollup-plugin-postcss';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

const config: RollupOptions[] = [
    // Конфиг 1: JavaScript (ESM + CJS) БЕЗ типов
    {
        input: {
            index: 'src/index.ts',
            'ui/index': 'src/ui/index.ts',
            'hooks/index': 'src/hooks/index.ts',
        },

        output: [
            {
                dir: 'dist/esm',
                format: 'esm',
                sourcemap: true,
                preserveModules: true,
                preserveModulesRoot: 'src',
            },
            {
                dir: 'dist/cjs',
                format: 'cjs',
                sourcemap: true,
                exports: 'named',
                preserveModules: true,
                preserveModulesRoot: 'src',
            },
        ],

        plugins: [
            peerDepsExternal(),
            nodeResolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            }),
            commonjs(),
            postcss({
                modules: {
                    generateScopedName: '--ui-[name]-[local]-[hash:base64:5]',
                },
                extract: false,
                minimize: true,
                sourceMap: true,
            }),
            typescript({
                tsconfig: './tsconfig.json',
                compilerOptions: {
                    declaration: false, // ✅ Типы НЕ здесь
                },
                exclude: ['node_modules/**'],
            }),
            json(),
        ],

        external: ['react', 'react-dom', 'react/jsx-runtime'],
    },

    // Конфиг 2: TypeScript деклараций (только типы)
    {
        input: {
            index: 'src/index.ts',
            'ui/index': 'src/ui/index.ts',
            'hooks/index': 'src/hooks/index.ts',
        },

        output: {
            dir: 'dist/types', // ✅ Типы в отдельной папке
            format: 'esm',
            preserveModules: true,
            preserveModulesRoot: 'src',
        },

        plugins: [
            dts({
                respectExternal: true,
            }),
        ],

        external: ['react', 'react-dom', 'react/jsx-runtime', /\.css$/],
    },
];

export default config;
