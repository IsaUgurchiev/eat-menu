var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	prefix = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	stylelint = require('gulp-stylelint'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

var config = {
	server: {
		baseDir: "./build"
	},
	tunnel: true,
	host: 'localhost',
	port: 8080,
	logPrefix: "Frontend_Devil"
};

var path = {
	build: {
		css: 'build/css/',
		html: 'build'
	},
	src: {
		styles: 'src/scss/**/*.scss',
		html: 'src/index.html'
	}
};

// Stylelint config rules
var stylelintConfig = {
	"extends": "stylelint-config-standard"
};

// SASS Version
gulp.task('styles', function () {
	return gulp.src(path.src.styles)
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
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('html', function () {
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('watcher', function () {
	gulp.watch(path.src.html, ['html']);
	gulp.watch(path.src.styles, ['styles']);
});

gulp.task('browserSync', function () {
	browserSync(config);
});

gulp.task('build', [
	'html',
	'styles'
]);

gulp.task('default', ['build', 'watcher', 'browserSync']);

