/* eslint-disable */
var gulp       = require('gulp');
var ts         = require('gulp-typescript');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var del        = require('del');
var sourcemaps = require('gulp-sourcemaps');

var sdkSrcNoEncryption = [
  'src/browser-loader.js', // only needed to be able to use generated files in dist directly in the browser
  'dist/index.js'          // created by TypeScript compiler
];

var fullSdkSrc = [
  'node_modules/node-forge/dist/forge.min.js',
  ...sdkSrcNoEncryption
];

gulp.task('ts', function () {
  var tsProject = ts.createProject('tsconfig.json');
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./')) // combined with tsconfig.json's outFile, this will create ./dist/index.js
    .on('end', function() {
      return del(['./dist/index.d.ts.map']); // remove sourcemap for TypeScript definition
    });
});

gulp.task('createFullSdk', function () {
  return gulp.src(fullSdkSrc)
    .pipe(sourcemaps.init())
    .pipe(concat('connectsdk.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(concat('connectsdk.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('createSdkNoEncryption', function () {
  return gulp.src(sdkSrcNoEncryption)
    .pipe(sourcemaps.init())
    .pipe(concat('connectsdk.noEncrypt.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(concat('connectsdk.noEncrypt.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
});

// clean folder
gulp.task('clean', function () {
  return del(['./dist']);
});

gulp.task('build', gulp.series('ts', gulp.parallel('createFullSdk', 'createSdkNoEncryption')));

gulp.task('watch', function () {
  gulp.watch(['src/*.ts'], gulp.series('build'))
});

gulp.task('default', function () {
  console.error('no default task! use gulp --tasks');
});
