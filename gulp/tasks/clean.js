module.exports = (gulp, plugins) => {
  const { src, dest } = gulp;

  const task = () => {
    const { del } = plugins;

    return del(['./dist/**/*', './build/**/*'], {});
  };

  task.displayName = 'clean';

  return task;
};
