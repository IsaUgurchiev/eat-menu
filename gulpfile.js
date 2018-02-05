var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	prefix = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	stylelint = require('gulp-stylelint'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

var config = {
	server: {
		baseDir: "./build"
	},
	host: 'localhost',
	port: 8080
};

var path = {
	build: {
		css: 'build/css/',
		js: 'build/js/',
		img: 'build/img/',
		html: 'build'
	},
	src: {
		styles: 'src/scss/**/*.scss',
		js: 'src/js/**/*.js',
		img: 'src/img/*',
		html: 'src/index.html'
	}
};

// Stylelint config rules
var stylelintConfig = {
	"extends": "stylelint-config-standard",
	"rules": {
		"at-rule-no-unknown": [
			true, {
				ignoreAtRules: ['extend', 'each']
			}
		]
	}
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

gulp.task('js', function () {
	gulp.src(path.src.js)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

gulp.task('html', function () {
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('img', function () {
	gulp.src(path.src.img)
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true}));
});

gulp.task('watcher', function () {
	gulp.watch(path.src.html, ['html']);
	gulp.watch(path.src.styles, ['styles']);
	gulp.watch(path.src.js, ['js']);
	gulp.watch(path.src.img, ['img']);
});

gulp.task('browserSync', function () {
	browserSync(config);
});

gulp.task('build', [
	'html',
	'styles',
	'js',
	'img'
]);

gulp.task('default', ['build', 'watcher', 'browserSync']);

