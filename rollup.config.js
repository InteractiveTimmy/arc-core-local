export default {
	input: 'dist/arc-core.js',
	output: [
		{
			format: 'umd',
			name: 'ArcCore',
			file: 'build/arc-core.js',
			indent: '\t'
		},
		{
			format: 'umd',
			name: 'ArcCore',
			file: 'debug/arc-core.js',
			indent: '\t'
		},
		{
			format: 'es',
			file: 'build/arc-core.module.js',
			indent: '\t'
		}
	],
	watch: {
		include: "./dist/**/*.js"
	}
};