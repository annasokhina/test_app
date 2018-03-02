var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concatCss     = require('gulp-concat'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		autoprefixer   = require('gulp-autoprefixer'),
		notify         = require("gulp-notify");

// Сервер и автообновление страницы Browsersync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	});
});


gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('app/img')); 
});

gulp.task('watch', ['sass', 'browser-sync'], 
	function() {
		gulp.watch('app/sass/**/*.scss', ['sass']);
		gulp.watch('app/scripts/*.js', ['js']);
		gulp.watch('app/*.html', browserSync.reload);
	});

gulp.task('default', ['watch']);
