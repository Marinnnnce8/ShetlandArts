import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import { mozjpeg, svgo } from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import cp from '../util/cp.js';
import pkg from '../util/pkg.js';

const config = pkg.config;

// Copy images
function images() {
	return gulp.src(`${config.src}/img/**/*`)
		.pipe(imagemin([
			mozjpeg({
				quality: 80,
			}),
			svgo({
				plugins: [
					{removeViewBox: false},
				]
			}),
			imageminPngquant({
				quality: [0.6, 0.8],
				dithering: 1,
			}),
		]))
		.pipe(gulp.dest(`${config.dist}/img`));
}

// Fonts
function fonts() {
	return cp(`${config.src}/fonts/*`, `${config.dist}/fonts`);
}

// Favicons
function favicons() {
	return cp(`${config.src}/favicon/*`, config.dist);
}

// tasks.assets
export const assets = gulp.series(images, fonts, favicons);
