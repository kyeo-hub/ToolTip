import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/core.js',
  output: [
    {
      file: 'dist/K-tip.umd.js',
      format: 'umd',
      name: 'K-tip'
    },
    {
      file: 'dist/K-tip.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    nodeResolve(),
    terser() // 代码压缩
  ]
};