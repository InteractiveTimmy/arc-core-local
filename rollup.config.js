export default {
	input: 'dist/arc.js',
	output: [
		{
			format: 'umd',
			name: 'Arc',
			file: 'build/arc.js',
			indent: '\t'
		},
		{
			format: 'umd',
			name: 'Arc',
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