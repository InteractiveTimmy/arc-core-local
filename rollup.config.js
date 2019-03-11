export default {
  input: 'src/arc-core.js',
  output: [
    {
      format: 'umd',
      name: 'ARCCORE',
      file: 'build/arc-core.js',
      indent: '\t',
    },
    {
      format: 'es',
      file: 'build/arc-core.module.js',
      indent: '\t',
    },
  ],
  watch: {
    include: 'src/**',
  },
};
