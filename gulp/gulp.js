const gulp = require('gulp');

const plugins = {
  sourcemaps: require('gulp-sourcemaps'),
  typescript: require('gulp-typescript'),
  rollup: require('gulp-better-rollup'),
  eslint: require('gulp-eslint'),
  del: require('del'),
};

const tasks = require('./tasks/index');
const confs = require('./config/index');

const { task, series } = gulp;
const { typescript, rollup, clean } = tasks;

// general tasks
task(typescript(gulp, plugins, confs));
task(rollup(gulp, plugins, confs));
task(clean(plugins));

// complex tasks
exports.build = series(clean(plugins), typescript(gulp, plugins, confs), rollup(gulp, plugins, confs));
