const { src, dest, watch, parallel, series} = require('gulp'); //подключение функций gulp
const scss = require('gulp-sass');   //плагин для стилей
const concat = require('gulp-concat'); //плагин для объединения
const browserSync = require('browser-sync').create(); //плагин для браузера
const uglify = require('gulp-uglify-es').default; //плагин для скриптов
const autoprefixer = require('gulp-autoprefixer'); //автопрефиксы для CSS
const imagemin = require('gulp-imagemin'); //компрессор изображений
const del = require('del'); //клинер
//синхронизация с браузером
function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }  
  });
}
//обработка скриптов
function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js', // JQUERY
    'app/js/main.js' //скрипт 
  ])
  .pipe(concat('main.min.js')) // объединение файлов в один
  .pipe(uglify()) // сжатие скриптов
  .pipe(dest('app/js')) //директория
  .pipe(browserSync.stream()) //запуск browser-sync

}
//обработка стилей
function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({outputStyle: 'compressed'})) //вывод в сжатом формате
    .pipe(concat('style.min.css')) //наименование файла
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'], //автопрефиксы
      grid: true //автопрефикс на display: grid
    }))
    .pipe(dest('app/style')) // директория
    .pipe(browserSync.stream()) //запуск browser-sync
}
//изображения 
function images() {
  return src('app/img/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
  ]
  ))
    .pipe(dest('dist/img'))
}
//клинер
function cleanDist(){
  return del('dist')
}
//слежение
function watching() {
  watch(['app/scss/**/*.scss'], styles) //слежение за стилями
  watch(['app/js/main.js', '!app/js/main.min.js'], scripts) //слежение за скриптами
  watch(['app/*.html']).on('change', browserSync.reload) //слежение за html
}
//продакшн
function build() {
  return src([
    'app/style/style.min.css', //стили
    'app/fonts/**/*', //шрифты все папки все файлы
    'app/js/main.min.js', //скрипты
    'app/*.html' //html

  ], {base: 'app'})
  .pipe(dest('dist'))
}
//экспорт функций
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, browsersync, watching, scripts); //запускает параллельно два плагина