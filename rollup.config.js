import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';


export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/tool-tip.umd.js',
      format: 'umd',
      name: 'ToolTip',
      exports: 'named',
      globals: { 
        'lodash': '_',
        'document': 'document' }
    },
    {
      file: 'dist/tool-tip.esm.js',
      format: 'es',
      globals: { 'document': 'document' }
    },
    {
      file: 'dist/tool-tip.cjs.js',
      format: 'cjs',
      exports: 'auto'
    }
  ],
  plugins: [
    resolve(),
    terser() // 代码压缩
  ]
};