
export default [
  {
    input: './src/time.mjs',
    output: [
      {
        file: './dist/time.cjs',
        format: 'cjs',
      },
      {
        file: './dist/time.mjs',
        format: 'es',
      },
    ]
  }
];

