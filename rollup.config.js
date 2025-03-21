import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/core.js',
  output: [
    {
      file: 'dist/kyeo-tip.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/kyeo-tip.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/kyeo-tip.umd.js',
      format: 'umd',
      name: 'TooltipLibrary',
      sourcemap: true
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env']
    }),
    terser()
  ]
};