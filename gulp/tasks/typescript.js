module.exports = (gulp, plugins, config) => {
  const { src, dest } = gulp;

  const task = () => {
    const { sourcemaps, typescript } = plugins;
    const myConfig = config.typescript;

    return src('./src/**/*.ts')
      .pipe(sourcemaps.init())
      .pipe(typescript(myConfig))
      .pipe(sourcemaps.write('./maps'))
      .pipe(dest('./dist'));
  };

  task.displayName = 'typescript';

  return task;
};
