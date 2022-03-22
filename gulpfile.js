var gulp = require('gulp');
var $ = require('gulp-load-plugins')({rename: {'gulp-rev-delete-original':'revdel', 'gulp-if': 'if'}});

/* Tasks base */
gulp.task('copy', function() {
    return gulp.src(['site/assets/{img,font}/**/*', 'site/.htaccess'], {base: 'site'})
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist/', {read: false, allowEmpty: true})
        .pipe($.clean());
});

gulp.task('minify', function () {
    gulp.src('site/**/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest('dist/'))

    gulp.src('site/**/*.css')
        .pipe($.cssnano({safe: true}))
        .pipe(gulp.dest('dist/'))

    return gulp.src('site/**/*.html')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'))
});

gulp.task('webp', function () {
    return gulp.src(['dist/assets/img/**/*.{jpg,jpeg,png,gif}'], {base: 'dist'})
        .pipe($.imagemin([
            $.webp({
                quality: 60,
            })
        ]))
        .pipe($.extReplace('.webp'))
        .pipe(gulp.dest('dist'))
});

/* Concatenação */
gulp.task('useref', function () {
    return gulp.src('site/*.html')
        .pipe($.useref())
        .pipe($.if('*.html', $.inlineSource()))
        .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano({safe: true})))
        .pipe($.if('*.jpg', $.webp()))
        .pipe(gulp.dest('dist'));
});

/* Revisão de arquivos */
gulp.task('rev', function(){
    return gulp.src(['dist/**/*.{css,js,jpg,jpeg,png,svg}'])
        .pipe($.rev())
        .pipe($.revdel())
        .pipe(gulp.dest('dist/'))
        .pipe($.rev.manifest())
        .pipe(gulp.dest('dist/'))
})

gulp.task('revreplace', function(){
    return gulp.src(['dist/*.html', 'dist/**/*.css'])
        .pipe(
            $.revReplace({
                manifest: gulp.src('dist/rev-manifest.json'),
                replaceInExtensions: ['.html', '.yaml', '.js', '.css', '.jpg', '.jpeg']
            })
        )
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', gulp.series([
    'clean',
    'copy',
    'minify',
    'useref',
    'rev',
    'revreplace',
    'webp'
]))