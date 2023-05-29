// import path from 'path';

import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import json from '@rollup/plugin-json';
// import alias from '@rollup/plugin-alias';
import url from '@rollup/plugin-url';

// const rootDir = path.resolve(__dirname);

export default {
  input: {
    index: 'src/index.ts'
  },
  output: [
    {
      dir: 'dist',
      format: 'cjs'
    },
    {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src'
    }
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    url(),
    typescript(),
    resolve(),
    commonjs(),
    json()
  ]
};