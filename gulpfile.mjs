import gulp from 'gulp';
import sync from 'browser-sync';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de tareas
const server = sync.create();

// HTML
const html = () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dest'))
    .pipe(server.reload({ stream: true }));
};

// Copy styles, scripts, images
const copy = () => {
  return gulp.src([
    'src/**/*',
    '!src/**/*.html' // Excluir archivos HTML ya procesados
  ], { base: 'src' })
    .pipe(gulp.dest('dest'))
    .pipe(server.reload({ stream: true }));
};

// Server
const startServer = () => {
  server.init({
    notify: false,
    server: {
      baseDir: 'dest',
      index: 'index.html' // Cambiado a index_home.html
    },
    ghostMode: false
  });
};

// Watch
const watch = () => {
  gulp.watch('src/**/*.html', html);
  gulp.watch(['src/**/*', '!src/**/*.html'], copy);
};

// Build
const build = gulp.series(html, copy);

// Default
export default gulp.series(build, gulp.parallel(watch, startServer));
