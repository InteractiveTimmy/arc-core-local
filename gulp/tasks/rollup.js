module.exports = (gulp, plugins, config) => {
  const { src, dest } = gulp;

  const task = () => {
    const { sourcemaps, rollup } = plugins;
    const myConfig = config.rollup;

    return src('./dist/arc-core.js')
      .pipe(sourcemaps.init())
      .pipe(rollup(myConfig.input, myConfig.output))
      .pipe(sourcemaps.write('./maps'))
      .pipe(dest('./build'));
  };

  task.displayName = 'rollup';

  return task;
};
