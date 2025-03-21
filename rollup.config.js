import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/core.js',
  output: [
    {
      file: 'dist/k-tip.umd.js',
      format: 'umd',
      name: 'k-tip'
    },
    {
      file: 'dist/k-tip.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    nodeResolve(),
    terser() // 代码压缩
  ]
};