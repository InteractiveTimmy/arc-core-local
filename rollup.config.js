export default {
	input: 'dist/arc-core.js',
	output: [
		{
			format: 'umd',
			name: 'Arc',
			file: 'build/arc.js',
			indent: '\t'
		},
		{
			format: 'umd',
			name: 'ArcCore',
			file: 'debug/arc.js',
			indent: '\t'
		},
		{
			format: 'es',
			file: 'build/arc.module.js',
			indent: '\t'
		}
	],
	watch: {
		include: "./dist/**/*.js"
	}
};