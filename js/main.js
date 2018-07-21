/**
 * anchor.js - jQuery Plugin
 * Jump to a specific section smoothly
 *
 * @dependencies	jQuery v1.5.0 http://jquery.com
 * @author			Cornel Boppart <cornel@bopp-art.com>
 * @copyright		Author
 
 * @version		1.0.5 (02/11/2014)
 */

(function ($) {
	
	window.anchor = {
		
		/**
		 * Default settings
		 *
		 */
		settings: {
			transitionDuration: 2000,
			transitionTimingFunction: 'swing',
			labels: {
				error: 'Couldn\'t find any section'
			}
		},

		/**
		 * Initializes the plugin
		 *
		 * @param	{object}	options	The plugin options (Merged with default settings)
		 * @return	{object}	this	The current element itself
		 */
		init: function (options) {
			// Apply merged settings to the current object
			$(this).data('settings', $.extend(anchor.settings, options));

			return this.each(function () {
				var $this = $(this);

				$this.unbind('click').click(function (event) {
					event.preventDefault();
					anchor.jumpTo(
						anchor.getTopOffsetPosition($this),
						$this.data('settings')
					);
				});
			});
		},

		/**
		 * Gets the top offset position
		 *
		 * @param	{object}	$object				The root object to get sections position from
		 * @return	{int}		topOffsetPosition	The top offset position
		 */
		getTopOffsetPosition: function ($object) {
			var href = $object.attr('href'),
				$section = $($(href).get(0)),
				documentHeight = $(document).height(),
				browserHeight = $(window).height();

			if (!$section || $section.length < 1) {
				throw new ReferenceError(anchor.settings.labels.error);
			}

			if (($section.offset().top + browserHeight) > documentHeight) {
				return documentHeight - browserHeight;
			} else {
				return $section.offset().top;
			}
		},
		
		/**
		 * Jumps to the specific position
		 *
		 * @param	{int}		topOffsetPosition	The top offset position
		 * @param	{object}	settings			The object specific settings
		 * @return	{void}
		 */
		jumpTo: function (topOffsetPosition, settings) {
			var $viewport = $('html, body');

			$viewport.animate(
				{scrollTop: topOffsetPosition - 50},
				settings.transitionDuration,
				settings.transitionTimingFunction
			);

				// Stop the animation immediately, if a user manually scrolls during the animation.
			$viewport.bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(event){
				if (event.which > 0 || event.type === 'mousedown' || event.type === 'mousewheel') {
					$viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
				}
			});
		}

	};

	$.fn.anchor = function (method) {
			// Method calling logic
		if (anchor[method]) {
			return anchor[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return anchor.init.apply(this, arguments);
		} else {
			return $.error('Method ' + method + ' does not exist on jQuery.anchor');
		}
	};

})(jQuery);



class Popup {
	constructor () {
		this.$block = $('.popup');
		this.generated = false;
	}
	
	open (id) {
		if (!this.generated)
			this.generate();
		
		this.switch(id);
		
		document.body.classList.add('fancybox-active');
		this.$block.fadeIn();
		
		
	}
	
	close () {
		this.$block.fadeOut();
		document.body.classList.remove('fancybox-active');
	}
	
	switch (id) {
		$('.films-menu__title').removeClass('active');
		$('.films-menu__subtitle').removeClass('active');
		$('.films-preview__color').removeClass('active');
		$('.films-preview__colors-list').removeClass('active');

		$('.films-menu__subtitle[data-src="' + id + '"]').addClass('active').parents('.films-menu__title').addClass('active');
		$('.films-preview__color[data-src="' + id + '"]').addClass('active').parent().addClass('active');
	}
		
	generate () {
		
		var menuHtml = '',
			colorList = '';
		
		var $this = this;

		type.forEach(function(item, i) {
			menuHtml += '<li class="films-menu__title">\n';
			menuHtml += '<span class="films-menu__title-link">' + item.name + '</span>';
			menuHtml += '<ul class="films-menu__subtitle-block">'

			colorList += '<div class="films-preview__colors-list">';
			item.sub.forEach(function(item, i) {
				menuHtml += '<li class="films-menu__subtitle" data-popup-in data-src="' + item.id + '">' + item.name + '</li>';
				colorList += '<div class="films-preview__color" data-popup-in data-src="' + item.id + '" style="background-image: url(' + item.prevUrl + ')"></div>';
			})

			menuHtml += '</ul>';
			menuHtml += '</li>';

			colorList += '</div>';

		});

		menuHtml += '<li>\
					<button type="button" data-fancybox data-src="#payment" class="btn films-menu__btn">Варианты оплаты</button>\
				</li>\
				<li>\
					<button type="button" data-fancybox data-src="#shiping" class="btn films-menu__btn">Доставка заказа</button>\
				</li>';
		
		
		$this.$block.find('.films-menu').html(menuHtml);
		$this.$block.find('.films-preview__colors-container').html(colorList);


		$('.films-menu__title-link').click(function () {
			$('.films-menu__title').removeClass('active');
			$(this).parent().addClass('active');
		})

		$('[data-popup-in]').click(function () {
			$this.switch($(this).data('src'));
		})
		
		$('[data-popup-close]').click(function () {
			$this.close();
		})
		
		$this.generated = true;
	}
}

$(document).ready(function () {
	$('.section__list-item').click(function () {
		var section = $(this).parents('.section');
		section.children('.section__bg').remove();
		section.prepend('<div class="section__bg" style="background-image: url(' + $(this).data('bg') + ')"></div>');
	})
	
	var popup = new Popup();
	
	$('[data-popup]').click(function () {
//		showPopup($(this).attr('data-src'));
		popup.open($(this).data('src'));
	})
	
})