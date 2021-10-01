/**
 * Main JS
 *
 * @copyright 2021 NB Communication Ltd
 *
 */

const main = {

	init: () => {

		nb.profilerStart('main.init');

		// Content
		const blocks = uk.$$('.content');
		if (blocks.length) {

			blocks.forEach((block) => {

				// Apply UIkit table component
				uk.$$('table', block).forEach((el) => {
					uk.addClass(el, 'uk-table');
					uk.wrapAll(el, '<div class="uk-overflow-auto">');
				});

				// Inline Images UIkit Lightbox/Scrollspy
				(uk.$$('a[href]', block).filter((a) => {
					return uk.attr(a, 'href').match(/\.(jpg|jpeg|png|gif|webp)/i);
				})).forEach((a) => {

					let figure = a.parentElement;
					if (figure.nodeName !== 'FIGURE') {
						uk.wrapAll(a, '<figure>');
						figure = a.parentElement;
					}

					const img = uk.$('img', a);
					if (uk.hasAttr(img, 'class')) {
						uk.addClass(figure, uk.attr(img, 'class'));
						uk.removeAttr(img, 'class');
					}

					const caption = uk.$('figcaption', figure);

					// uk-lightbox
					uk.attr(figure, 'data-uk-lightbox', 'animation: fade');
					if (caption) uk.attr(a, 'data-caption', nb.wrap(uk.html(caption), 'div'));
				});
			});
		}

		main.toggleMegamenu();

		main.mmenu();

		main.initFlatpickr();

		nb.profilerStop('main.init');
	},

	mmenu: () => {

		const el = uk.$('#mmenu');
		if (!el) return;

		const menu = new Mmenu(el,
			{
				// navbars: [
				// 	{
				// 		"position": "top",
				// 		"content": [
				// 			'<div class="uk-flex uk-flex-left uk-flex-middle menu-back"><svg class="uk-margin-small-right" width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.65102 0.0263672L11.5977 1.96988L4.73061 8.94536L11.579 15.5776L9.47049 17.6824L0.766091 8.94536L9.65102 0.0263672Z" fill="white"/></svg><a href="#mm-0" class="uk-text-small">Back</a></div>'
				// 		]
				// 	}
				// ],
				offCanvas: false,
				extensions: [
					'border-full',
					'fullscreen'
				],
			},
			{
				classNames: {
					selected: 'uk-active'
				},
				transitionDuration: 256
			}
		);

		uk.removeClass(uk.$('.mmenu-overlay'), 'uk-hidden');

		const toggle = uk.$('.uk-navbar-toggle');
		const html = uk.$("html");
		if (toggle) {

			const toggler = (open) => {
				uk[`${open ? 'add' : 'remove'}Class`](toggle, 'uk-open');
				uk[`${open ? 'add' : 'remove'}Class`](html, 'show-menu');
			};

			menu.API.bind('close:start', () => toggler(false));
			uk.on(toggle, 'click', () => {

				toggler(!uk.hasClass(toggle, 'uk-open'))
			});
		}
	},

	//nav toggle
	toggleMegamenu: () => {
		const navToggleButton = document.querySelectorAll('.button-toggle');

		for (let i = 0; i < navToggleButton.length; i++) {

			navToggleButton[i].addEventListener('click', () => {
				const nav = document.getElementById('megamenu');
				if (nav.getAttribute('aria-hidden') === 'false') {
					document.querySelector('html').classList.remove('html-menu-active');
					nav.setAttribute('aria-hidden', 'true');
					setTimeout(() => {
						nav.setAttribute('hidden', true);
					}, 850);
				} else {
					document.querySelector('html').classList.add('html-menu-active');
					nav.removeAttribute('hidden');
					nav.setAttribute('aria-hidden', 'false');
				}
			}, false);
		}
	},

	initFlatpickr: () => {
		flatpickr(".basicDate", {
			altInput: true,
			altFormat: "F j, Y",
			dateFormat: "Y-m-d",
		});
	}
};

uk.ready(() => main.init());
