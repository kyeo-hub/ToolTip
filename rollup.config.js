import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/core.js',
  output: [
    {
      file: 'dist/kyeo-tip.umd.js',
      format: 'umd',
      name: 'k-tip'
    },
    {
      file: 'dist/kyeo-tip.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    nodeResolve(),
    terser() // 代码压缩
  ]
};