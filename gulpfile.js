var gulp = require('gulp');
var connect = require('gulp-connect');
 
gulp.task('init', function() {
  connect.server({
  	root: './dist',
  	livereload: true
  });
});
gulp.task('copyhtml',function(){

	gulp.src('./src/html/**/*.html').pipe(gulp.dest('./dist'));
});
gulp.task('copyjs',function(){

	gulp.src('./src/controller/**/*.js').pipe(gulp.dest('./dist/js'));
});

gulp.task('copyjslib',function(){
	gulp.src('./bower_components/**/*.*').pipe(gulp.dest('./dist/bower_components'));
});
gulp.task('reload', function () {
  gulp.src('./dist/**/*.html')
    .pipe(connect.reload());
});
gulp.task('watch', function () {
  gulp.watch(['./src/html/*.html','./src/html/**/*.html','./src/controller/*.js'], ['copyhtml','copyjs','reload']);
});

gulp.task('default', ['init','copyhtml','copyjslib','copyjs','watch']);