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

		main.mmenu();

		main.modalDropdown();

		main.openDropdown();

		main.openSearch();

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

	modalDropdown: () => {

		const el = uk.$('#megamenu');
		const html = uk.$("html");
		if (!el) return;


		uk.on(el, 'shown', () => {
			uk.addClass(html, 'html-modal-active');
		})

		// uk.on(el, 'hide', () => {
		// 	setTimeout(function () {
		// 		uk.addClass(html, 'uk-modal-page');
		// 	}, 2000);
		// })

		// uk.on(el, 'hidden', () => {
		// 	setTimeout(function () {
		// 		// uk.removeClass(html, 'uk-modal-page');
		// 		uk.removeClass(html, 'html-modal-active');
		// 	}, 3000);
		// })
	},

	openDropdown: () => {

		const el = uk.$('.open-today-menu');
		const html = uk.$("html");
		if (!el) return;


		uk.on(el, 'shown', () => {
			uk.addClass(html, 'html-dropdown-active');
		})
	},

	openSearch: () => {

		const el = uk.$('.search-menu');
		const html = uk.$("html");
		if (!el) return;


		uk.on(el, 'shown', () => {
			uk.addClass(html, 'html-search-active');
		})
	},

	initFlatpickr: () => {
		flatpickr("#basicDate", {
			altInput: true,
			altFormat: "F j, Y",
			dateFormat: "Y-m-d"
		});
	}
};

uk.ready(() => main.init());
