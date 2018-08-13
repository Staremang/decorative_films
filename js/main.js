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
//		this.$block = $('.popup');
		this.$block = $('.popup__wrapper');
		this.generated = false;
	}
	
	open (id) {
		if (!this.generated)
			this.generate();
		
		this.switch(id);
		
//		document.body.classList.add('fancybox-active');
//		this.$block.fadeIn();
//		this.$block.addClass('active');
//		
		
	}
	
//	close () {
//		this.$block.fadeOut();
//		this.$block.removeClass('active');
//		document.body.classList.remove('fancybox-active');
//	}
//	
	switch (id) {
		$('.films-menu__title').removeClass('active');
		$('.films-menu__subtitle').removeClass('active');
		$('.films-preview__color').removeClass('active');
		$('.films-preview__colors-list').removeClass('active');

		$('.films-menu__subtitle[data-src="' + id + '"]').addClass('active').parents('.films-menu__title').addClass('active');
		$('.films-preview__color[data-src="' + id + '"]').addClass('active').parent().addClass('active');
		
//		$('.films-gallery').
		var t, data;
		type.some(function(item, i) {
			t = item;
			return item.sub.some(function(item, i) {
				data = item;
				return (id === item.id);
			})
		});
		
		$('.films-description__title').text(t.name);
		$('.films-description__subtitle').text(data.name);
		
		
		$('.films-gallery').empty();
		if (data.galleryPrev) {
			data.galleryPrev.forEach(function (item) {
				$('.films-gallery').append('<a class="films-gallery__item" data-fancybox="gallery" href="' + item[0] + '"><img src="' + item[1] + '"></a>');
			})
		}
		
//		$('.films-description__content').html(data.description || t.description);
	}
		
	generate () {
		
		var menuHtml = '',
			colorList = '',
			description = '';
		
		var $this = this;
		
		
//		description = '';
		

		type.forEach(function(item, i) {
			menuHtml += '<li class="films-menu__title">\n';
			menuHtml += '<span class="films-menu__title-link">' + item.name + '</span>';
			menuHtml += '<ul class="films-menu__subtitle-block">'

			colorList += '<div class="films-preview__colors-list">';
			item.sub.forEach(function(item, i) {
				menuHtml += '<li class="films-menu__subtitle" data-popup-in data-src="' + item.id + '">' + item.name + '</li>';
				colorList += '<div class="films-preview__color" data-popup-in data-src="' + item.id + '"><img src="' + item.prevUrl + '" alt="' + item.name + '"></div>';
			})

			menuHtml += '</ul>';
			menuHtml += '</li>';

			colorList += '</div>';

		});

		menuHtml += '<li>\
					<button type="button" data-fancybox data-src="#payment_and_shiping" class="btn films-menu__btn">Оплата и доставка</button>\
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
		
//		$('[data-popup-close]').click(function () {
//			$this.close();
//		})
		
		$this.generated = true;
	}
}


function removeSelect () {
	document.querySelector('.film-list-select').removeChild(this.parentElement);
}

function addSelect () {
	
	document.querySelectorAll('.form-popup__select-add').forEach(function (item, i) {
		item.removeEventListener('click', addSelect);
		item.classList.remove('form-popup__select-add');
		item.classList.add('form-popup__select-remove');
		item.innerHTML = '–';
		item.title = 'Удалить наименование';
		item.addEventListener('click', removeSelect);
	})
	
	var selectHtml = '';
	
	type.forEach(function(item, i) {
		selectHtml += '<optgroup label="' + item.id + '">';
		
		item.sub.forEach(function(item, i) {
			selectHtml += '<option value=”' + item.id + '”>' + item.name + '</option>';
		})
		
		selectHtml += '</optgroup>';
	});
		
	var el = document.createElement('div'),
		select = document.createElement('select'),
		input = document.createElement('input'),
		btn = document.createElement('button');

	el.className = 'form-popup__select-item';

	select.name = '';
	select.className = 'form-popup__select';
	select.innerHTML = selectHtml;
	
	input.className = 'input form-popup__select-input';
	input.name = '';
	input.type = 'number';
	input.placeholder = 'Размер, м';

	btn.type = 'button';
	btn.className = 'btn form-popup__select-add';
	btn.innerHTML = '+';
	btn.title = 'Добавить наименование';

	btn.addEventListener('click', addSelect);

	el.appendChild(select);
	el.appendChild(input);
	el.appendChild(btn);

	document.querySelector('.film-list-select').appendChild(el);
}

$.fn.tooltip = function () {
	var b = '';
	
	$(this).each(function () {
		if ($(this).data('tooltip') == "") {
			return;
		}

		b = '<div class="tooltip">\
					<div class="tooltip__icon"></div>\
					<div class="tooltip__content">' 
						+ $(this).data('tooltip') + 
					'</div>\
				</div>';

		$(this).prepend(b);
	})
}
//$.fn.nwfTooltip = function(showTime, hideTime){
//    if(!$(this).attr('title')) { return; }
//    var tooltipTitle, 
//		posTop, 
//		posLeft, 
//		titleTxt;
//    var tooltipBlock = '<div class="nwf-tooltip">' + tooltipTitle + '</div>';
//	
//    $(this).mouseover(function(e){
//        posTop = e.pageY;
//        posLeft = e.pageX;
//        titleTxt = $(this).attr('title');
//        $(this).attr('title','');
//        $(tooltipBlock).text(titleTxt).appendTo('body').css({
//            top: posTop,
//            left: posLeft
//        }).fadeIn(showTime);
//
//        $(document).on('mousemove',function(evt){
//            if($('.nwf-tooltip').css('display') == 'block'){
//                $('.nwf-tooltip').css({
//                    left: evt.pageX,
//                    top: evt.pageY
//                });
//            }
//        });
//    }).mouseout(function(){
//        $(this).attr('title',titleTxt);
//        $('.nwf-tooltip').fadeOut(hideTime, function(){
//            $(this).remove();
//        });
//    });
//};

$(document).ready(function () {
//	
//	$('.films-gallery').owlCarousel({
//		loop: false,
//		margin:10,
//		nav:true,
//		items:3
//	})
	$("[data-fancybox]").fancybox({
		transitionEffect: "slide",
	});
	$('.section__list-item').click(function () {
//		console.log($(this).index($(this).parent()));
		var section = $(this).parents('.section');
		section.find('.section__bg').removeClass('active');
		section.find('.section__bg').eq($(this).data('bg')).addClass('active');
//		section.prepend('<div class="section__bg" style="background-image: url(' + $(this).data('bg') + ')"></div>');
	})
	
	var popup = new Popup();
	
	$('[data-film-id]').click(function () {
//		console.log(popup, $(this).data('film-id'));
//		showPopup($(this).attr('data-src'));
		popup.open($(this).data('film-id'));
	})
	
    $('[data-tooltip]').tooltip();
	
//	$('.section__list-item').hover(
//		function () {
//			var section = $(this).parents('.section');
//			section.children('.section__bg').remove();
//			section.prepend('<div class="section__bg" style="background-image: url(' + $(this).data('bg') + ')"></div>');
//		}, 
//		function () {
//			var section = $(this).parents('.section');
//			section.children('.section__bg').remove();
//		}
//	)
//	
	addSelect();
	
})