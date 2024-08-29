const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

function serve() {
    browserSync.init({
      server: {
        baseDir: './dist'
      }
    });
  }

function html() {
    return gulp.src('src/**/*.html')
        .pipe(plumber())
            .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function css() {
    return gulp.src('src/styles/**/*.css')
            .pipe(plumber())
            .pipe(concat('bundle.css'))
                  .pipe(gulp.dest('dist/'))
            .pipe(browserSync.reload({stream: true}));
  }
  

function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.reload({stream: true}));
    }

function svg() {
  return gulp.src('src/svg/**/*.{svg}')
            .pipe(gulp.dest('dist/svg'))
            .pipe(browserSync.reload({stream: true}));
    }

function scripts() {
  return gulp.src('src/scripts/**/*.js')
            .pipe(gulp.dest('dist/scripts'))
            .pipe(browserSync.reload({stream: true}));
    }    

function fonts() {
    return gulp.src('src/fonts/**/*.{woff, woff2}')
            .pipe(gulp.dest('dist/fonts'))
            .pipe(browserSync.reload({stream: true}));
    }
    
function clean() {
    return del('dist');
  }
  
function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/styles/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}

exports.svg = svg;
const build = gulp.series(clean, gulp.parallel(html, css, images, svg, fonts, scripts));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.fonts = fonts;    
exports.images = images;
exports.svg = svg;
exports.css = css;
exports.scripts = scripts;
exports.html = html;
exports.clean = clean;

exports.build = build;  
exports.watchapp = watchapp;
exports.default = watchapp; 
// Теперь функция watchapp будет вызываться из терминала просто по команде gulp

  