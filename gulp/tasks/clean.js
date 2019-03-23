module.exports = (plugins) => {
  const task = () => {
    const { del } = plugins;

    return del(['./dist/**/*', './build/**/*'], {});
  };

  task.displayName = 'clean';

  return task;
};
