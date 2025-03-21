import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/core.js',
  output: [
    {
      file: 'dist/atip.umd.js',
      format: 'umd',
      name: 'Atip'
    },
    {
      file: 'dist/atip.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    nodeResolve(),
    terser() // 代码压缩
  ]
};