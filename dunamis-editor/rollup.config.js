import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import visualizer from 'rollup-plugin-visualizer';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

const buildFormats = [
  {
    input: 'src/mainBundle.ts',
    output: {
      file: 'build/main.cjs.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    external: [
      'vue',
      '@vue/composition-api',
      '@jsonforms/core',
      '@jsonforms/vue2',
      '@jsonforms/vue2-vuetify',
      'lodash',
      'lodash/startCase',
      'lodash/isEmpty',
      'lodash/findIndex',
      'lodash/merge',
      'lodash/cloneDeep',
      'lodash/mergeWith',
      'lodash/isArray',
      'lodash/every',
      'lodash/isString',
      'lodash/omit',
      'vuetify/lib',
      '@mdi/font',
      'dayjs',
      'dayjs/plugin/customParseFormat',
      'dayjs/plugin/utc',
      'dayjs/plugin/timezone',
      'monaco-editor',
    ],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      }),
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
      postcss(),
      json(),
      vue({
        css: true,
        template: {
          isProduction: true,
        },
        // rollup-plugin-vue can't handle Vue source maps in watch mode
        // https://github.com/vuejs/rollup-plugin-vue/issues/238
        //needMap: !process.env.ROLLUP_WATCH,
        needMap: !process.env.ROLLUP_WATCH,
      }),
      typescript({
        emitDeclarationOnly: true,
      }),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        babelHelpers: 'runtime',
      }),
      visualizer(),
    ],
  },
];

export default buildFormats;
