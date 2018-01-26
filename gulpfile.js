var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	prefix = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	stylelint = require('gulp-stylelint');

var path = {
	build: {
		css: 'build/css/'
	},
	src: {
		style: 'src/scss/**/*.scss'
	}
};

// Stylelint config rules
var stylelintConfig = {
	"extends": "stylelint-config-standard"
};

// SASS Version
gulp.task('styles', function () {
	return gulp.src(path.src.style)
		.pipe(stylelint({
			config: stylelintConfig,
			syntax: "scss",
			reporters: [
				{formatter: 'string', console: true}
			]
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(prefix('last 2 versions'))
		.pipe(concat('main.css'))
		.pipe(minifyCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css));
});

gulp.task('default', function () {
	gulp.run('styles');
	gulp.watch(path.src.style, function () {
		gulp.run('styles');
	})
});