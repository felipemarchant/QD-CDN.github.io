/**
* Funções base
*/
String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.qdOverlay();
			Common.vtexBindQuickViewDestroy();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.applyCarouselShelf();
			Common.applyMosaicBanners();
			Common.applySmartCart();
			Common.applyTipBarCarousel();
			Common.openSearchModal();
			Common.saveAmountFix();
			Common.setDataScrollToggle();
			Common.showFooterLinks();
		},
		ajaxStop: function() {
			Common.appendSkuPopUpCloseBtn();
		},
		windowOnload: function() {},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		appendSkuPopUpCloseBtn: function () {
			$('<span class="modal-qd-v1-box-popup-close">Fechar</span>').insertBefore('.boxPopUp2 .selectSkuTitle');

			$('.modal-qd-v1-box-popup-close').click(function () {
				$(window).trigger('vtex.modal.hide');
				return false;
			});
		},
		applyAmazingMenu: function() {
			var accountLinks = $('.header-qd-v1-amazing-menu-wrapper .header-qd-v1-account-links');
			accountLinks.children().appendTo(accountLinks.prev('ul'));
			accountLinks.remove();

			$('.header-qd-v1-amazing-menu, .footer-qd-v1-links').QD_amazingMenu();

			$('.header-qd-v1-menu-trigger').click(function(e) {
				$(document.body).toggleClass('qd-am-is-active');
				e.preventDefault();
			});
		},
		applyAmazingMenuMobile: function() {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function(){return $(this).prev().clone().wrap('<li></li>').parent()});

			wrapper.QD_amazingMenu({
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-right"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
						var $t = $(this);
						$.merge($t.parent(), $t.closest('ul')).toggleClass('qd-am-is-active');

						$t.filter(function(){return !$(this).closest('ul').is('.qd-amazing-menu');}).siblings('ul').stop(true, true).slideToggle();
					});

					wrapper.find('> ul > li > .qd-am-dropdown-trigger').click(function() {
						$('.header-qd-v1-amazing-menu-mobile-wrapper').addClass('qd-am-is-active');
						$('.header-qd-v1-amazing-menu-mobile-wrapper').animate({
				          scrollTop: 0
				        }, 200);
					});

					wrapper.find('> ul > li > ul > li:first-child').click(function(e){
						e.preventDefault();
						$(this).parents(".qd-am-is-active").removeClass('qd-am-is-active');
					});
				}
			});

			$('.header-qd-v1-menu-mobile-trigger').click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').on('click', 'a#login', function() {
				$(document.body).removeClass('qd-am-on');
			});
		},
		applyCarouselShelf: function() {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);
				$t.find('h2').prependTo($t.parent());
			});

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},

					{
						breakpoint: 991,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 550,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		applyMosaicBanners: function() {
			$('.mosaic-qd-v1-wrapper .box-banner').QD_mosaicBanners({
				containerWidth: 1326,
				classFourColumn: "col-xs-12 col-sm-6",
				bannerColSecurityMargin: 50
			});
		},
		applySmartCart: function() {
			$('.header-qd-v1-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"><div class="qd-sc-wrapper"></div></div>');

			var wrapper = $(".qd-sc-wrapper");

			$.QD_smartCart({
				selector: wrapper,
				dropDown:{
					texts: {
						linkCart: "Proceed to checkout",
						cartTotal: '<span class="qd-infoTotalItems">Items: #items</span><span class="qd-infoTotalValue">Total: #value</span>'
					},
					updateOnlyHover: false,
					smartCheckout: true,
					callback: function() {
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>My Cart</h3></div>');
						wrapper.find('.qd_ddc_continueShopping').after(wrapper.find('.qd-ddc-viewCart'));
					},
					skuName: function(data) {
						return data.name + ' - ' + data.skuName.replace(data.name, '');
					},
					callbackProductsList: function() {
						wrapper.find(".qd-ddc-prodQtt").each(function() {
							var $t = $(this);
							$t.add($t.next('.qd-ddc-prodRemove')).wrapAll('<div class="qd-ddc-prodAction"></div>');
						});
					}
				},
				buyButton: {
					buyButton: "body .prateleira:not(.qd-am) .buy-button"
				}
			});

			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$('.header-qd-v1-cart-link').click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$('.qd_ddc_lightBoxClose').click(function(evt){
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		applyTipBarCarousel: function() {
			var wrapper = $('.tip-bar-qd-v1-carousel');

			if (!wrapper.length)
				return;

			wrapper.slick({
				arrows: false,
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: false,
				draggable: false,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 600,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		openSearchModal: function() {
			$('.header-qd-v1-search-trigger').click(function() {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		saveAmountFix: function() {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text('- ' + ($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		setDataScrollToggle: function() {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-links > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		}
	};

	var Home = {
		init: function() {
			Home.sliderFull();
			Home.applyArtistsCarousel();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sliderFull: function() {
			var wrapper = $('.slider-qd-v1-full');

			wrapper.slick({
				dots: true,
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				autoplay: true,
				autoplaySpeed: 9000,
				draggable: false
			});

			wrapper.each(function() {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyArtistsCarousel: function() {
			var wrapper = $('.artists-qd-v1-carousel');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 6,
				slidesToScroll: 6,
				infinite: true,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
						}
					},

					{
						breakpoint: 991,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},

					{
						breakpoint: 550,
						settings: {
							centerMode: true,							
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},

					{
						breakpoint: 320,
						settings: {
							centerMode: true,
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		}
	};

	var Search = {
		init: function() {
			Search.addFiltersToggleList();
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
		},
		ajaxStop: function() {
			Search.shelfLineFix();		
		},
		windowOnload: function() {},
		addFiltersToggleList: function() {
			var wrapper = $('.search-single-navigator h3');

			$('<span class="qd-expand-filters"><i class="fa fa-plus"></i></span>').click(function(e) {
				$(this).parent().next('ul').toggleClass('qd-is-active');
			}).appendTo(wrapper);
		},
		openFiltersMenu: function() {
			$('.search-qd-v1-navigator-trigger').click(function(e) {
				e.preventDefault();
				$(document.body).toggleClass('qd-sn-on');
			});
		},
		hideExtendedMenu: function () {
			$(".search-qd-v1-navigator ul").each(function () {
				var t, li, qtt, moreLink, moreLi, click, liHide;

				t = $(this);
				li = t.find(">li");
				qtt = 10;

				if (li.length <= qtt) return;

				liHide = li.filter(":gt(" + (qtt - 1) + ")").stop(true, true).hide();
				moreLink = $('<a class="qd-viewMoreMenu">Mostrar mais</a>');
				t.after(moreLink);
				moreLi = $('<li class="qd-viewMoreWrapper"><a class="qd-viewMoreMenu2">Mostrar mais filtros</a></li>');
				t.append(moreLi);

				click = function () {
					liHide.stop(true, true).slideToggle(0, function () {
						if (li.filter(":visible").length > qtt) {
							moreLink.addClass("minus").text("Mostrar menos filtros");
							moreLi.addClass("minus").find("a").text("Mostrar menos filtros");
						}
						else {
							moreLink.removeClass("minus").text("Mostrar mais filtros");
							moreLi.removeClass("minus").find("a").text("Mostrar mais filtros");
						}
					});
				};
				moreLi.bind("click.qd_viewMore", click);
				moreLink.bind("click.qd_viewMore", click);
			});

			var wrapper = $(".search-single-navigator, .search-multiple-navigator");

			// wrapper.find('h3, h4, h5').toggleClass('qd-seach-active-menu');
			// wrapper.find('h3, h4, h5').find("+ ul").stop(true, true).slideToggle();
			// wrapper.find('h3, h4, h5').find("+ div").stop(true, true).slideToggle();

			wrapper.find('h3, h4, h5').click(function (evt) {
				var $t = $(this);

				if ($(evt.target).is(wrapper.find('h3')) || $(evt.target).is(wrapper.find('h4')) || $(evt.target).is(wrapper.find('h5'))) {
					$t.find("+ ul").stop(true, true).slideToggle(0, function () {
						$t.toggleClass('qd-seach-active-menu');
					});
					$t.find("+ div").stop(true, true).slideToggle(0, function () {
						$t.toggleClass('qd-seach-active-menu');
					});
				}
			});
		},
		shelfLineFix: function() {
			try {
				var exec = function() {
					var curTop;
					var wrapper = $("div[id*='ResultItems_'] >.prateleira:not('.qd-fi-on')").addClass('qd-fi-on');

					var shelf = wrapper.children("ul").removeClass('qd-first-line');
					shelf.first().addClass("qd-first-line");

					var setFirst = function() {
						shelf.each(function(){
							var $t = $(this);

							if($t.is(".qd-first-line")){
								curTop = $t.offset().top;
								shelf = shelf.not($t);
								return;
							}

							var offsetTop = $t.offset().top;
							if (offsetTop >= curTop - 10 && offsetTop <= curTop + 10)
								shelf = shelf.not($t);
							else{
								$t.addClass("qd-first-line");
								return false;
							}
						});

						if(shelf.length)
							setFirst();
					};
					setFirst();
				};
				exec();

				// Olhando para o Smart Research
				if(!window.qd_shelf_line_fix_){
					$(window).on("QuatroDigital.sr_shelfCallback", exec);
					window.qd_shelf_line_fix_ = true;
				}

				// Olhando para o evento window resize
				var resize = $._data(window).events.resize;
				var allowResize = true;
				if(resize)
					for(var i = 0; i < resize.length; i++){
						if(resize[i].namespace == "qd"){
							allowResize = false;
							break;
						}
					}
				if(allowResize){
					var timeOut = 0;
					$(window).on("resize.qd", function(){
						clearTimeout(timeOut);
						timeOut = setTimeout(function() {
							$(".qd-first-line").removeClass(".qd-first-line");
							exec();
						}, 20);
					});
				}
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
		}
	};

	var Product = {
		run: function() {},
		init: function() {
			Product.applyCarouselThumb(); $(window).on('skuSelected.vtex', Product.applyCarouselThumb);
			Product.expandGallerySize();
			Product.forceImageZoom();
			Product.openShipping();
			Product.saveAmountFlag();
			Product.setAvailableBodyClass();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applyCarouselThumb: function() {
			var sliderWrapper = $('.product-qd-v1-image-carrousel'); // Wrapper que será inserido o carousel
			var thumbsWrapper = $('.thumbs').first(); // Wrapper onde foi inserido as thumbs
			var thumbsSliderWrapper = $('.product-qd-v1-image-thumbs'); // Wrapper onde foi inserido as thumbs

			sliderWrapper.filter('.slick-initialized').slick('unslick');
			thumbsSliderWrapper.filter('.slick-initialized').slick('unslick');

			var thumbsLi;
			(function cloneThumb () {
				thumbsLi = thumbsWrapper.find('li');
				if(thumbsLi.length < 2){
					thumbsLi.clone().appendTo(thumbsWrapper);
					cloneThumb();
				}
			})();

			thumbsSliderWrapper.html(thumbsWrapper.html());

			thumbsSliderWrapper.find('img').each(function(){
				$t = $(this);
				$t.attr('src', $t.attr('src').replace('-55-55', '-150-150'));
			});

			sliderWrapper.empty();
			thumbsWrapper.find('a').each(function(index){
				$t = $(this);
				$('<div class="qd-slide qd-product-image-' + index + '"><a href="' + $t.attr('rel').replace('-292-292', '-1500-1000') + '"><img src="' + $t.attr('rel').replace('-292-292', '-1500-1000') + '"/></a></div>').appendTo(sliderWrapper);
			});

			var options = {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				centerMode: true,
				dots: true,
				focusOnSelect: true,
				centerPadding: 0
			};
			sliderWrapper.slick($.extend({}, options, {
  				asNavFor: '.product-qd-v1-image-thumbs'
			}));

			thumbsSliderWrapper.addClass('slick-slide').slick($.extend({}, options, {
				arrows: false,
  				asNavFor: '.product-qd-v1-image-carrousel'
			}));
			thumbsSliderWrapper.on('afterChange', function(event, slick, slide){
				thumbsSliderWrapper.find('.ON').removeClass('ON');
				thumbsSliderWrapper.find('.slick-active.slick-center a').addClass('ON');
			}).slick('getSlick').slickGoTo(0);

			sliderWrapper.find('a').click(function(e){e.preventDefault()});
		},
		expandGallerySize: function() {
			$('.product-qd-v1-image-expand').click(function(e) {
				e.preventDefault();
				$('.product-qd-v1-image-carrousel-wrapper').toggleClass('qd-is-active');
				$(this).toggleClass('qd-is-active');
			});
		},
		forceImageZoom: function() {
			try {
				var orig = window.ImageControl;
				window.ImageControl = function() {
					$('ul.thumbs a').each(function() {
						var $t = $(this);
						if ($t.attr('zoom'))
							return;
						var rel = $t.attr('rel');
						if (rel)
							$t.attr('zoom', rel.replace(/(ids\/[0-9]+)[0-9-]+/i, '$1-1000-1000'));
					});
					orig.apply(this, arguments);
				}
			}
			catch (e) {(typeof console !== 'undefined' && typeof console.error === 'function' && console.error('Ops, algo saiu errado como zoom :( . Detalhes: ' + e.message)); }
		},
		openShipping: function() {
			if (typeof window.ShippingValue === 'function')
				$('.product-qd-v1-shipping-title').click(function() {
					window.ShippingValue();
				});
		},
		setAvailableBodyClass: function() {
			function checkVisibleNotify(available) {
				if (available)
					$(document.body).addClass('qd-product-available').removeClass('qd-product-unavailable');
				else
					$(document.body).addClass('qd-product-unavailable').removeClass('qd-product-available');
			}

			$(document).on('skuSelected.vtex', function(e, id, sku) {
				checkVisibleNotify(sku.available);
			});

			checkVisibleNotify(skuJson.available);
		},
		saveAmountFlag: function() {
			var flag = $('.product-qd-v1-stamps-highlight-discount');

			$(window).on('skuSelected.vtex', function(e, sku, data) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-qd-v1-stamps');

				if (data.listPrice > data.bestPrice)
					flag.text(parseInt(100 - data.bestPrice / data.listPrice * 100) + "%").show();
				else
					flag.hide();
			});

			if (skuJson.skus.length >= 1) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-qd-v1-stamps');

				if (skuJson.skus[0].listPrice > skuJson.skus[0].bestPrice)
					flag.text(parseInt(100 - skuJson.skus[0].bestPrice / skuJson.skus[0].listPrice * 100) + "%").show();
			}
		}
	};

	var List = {
		run: function() {},
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Institutional = {
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Orders = {
		init: function() {
			Orders.bootstrapCssFix();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		bootstrapCssFix: function() {
			var styleSheets = document.styleSheets;
			for (var i = 0; i < styleSheets.length; i++) {
				if ((styleSheets[i].href || "").indexOf('io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css') > -1) {
					styleSheets[i].disabled = true;
					break;
				}
			}
		}
	};
}
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Houve um erro nos objetos. Detalhes: " + e.message)); }

try {
	(function() {
		var body, ajaxStop, windowLoad;

		windowLoad = function() {
			Common.windowOnload();
			if (body.is(".home")) Home.windowOnload();
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.windowOnload();
			else if (body.is(".produto")) Product.windowOnload();
			else if (body.is(".listas")) List.windowOnload();
			else if (body.is(".institucional")) Institutional.windowOnload();
			else if (body.is(".orders")) Orders.windowOnload();
		};

		ajaxStop = function() {
			Common.ajaxStop();
			if (body.is(".home")) Home.ajaxStop();
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.ajaxStop();
			else if (body.is(".produto")) Product.ajaxStop();
			else if (body.is(".listas")) List.ajaxStop();
			else if (body.is(".institucional")) Institutional.ajaxStop();
			else if (body.is(".orders")) Orders.ajaxStop();
		};

		$(function() {
			body = $(document.body);
			Common.init();
			if (body.is(".home")) Home.init();
			else if (body.is(".resultado-busca, .departamento, .categoria")){
				Search.isSearch = $(document.body).is('.resultado-busca');
				Search.isDepartament = $(document.body).is('.departamento');
				Search.isCategory = $(document.body).is('.categoria');
				Search.init();
			}
			else if (body.is(".produto")) Product.init();
			else if (body.is(".listas")) List.init();
			else if (body.is(".institucional")) Institutional.init();
			else if (body.is(".orders")) Orders.init();
			$(document).ajaxStop(ajaxStop);
			$(window).load(windowLoad);
			body.addClass('jsFullLoaded');
		});

		Common.run();
		if (location.pathname.substr(location.pathname.length - 2, 2).toLowerCase() == "/p")
			Product.run();
		else if (location.pathname.search(/^(\/giftlist|\/list\/)/) == 0)
			List.run();
	})();
}
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && $("body").addClass('jsFullLoaded jsFullLoadedError') && console.error("Houve um erro ao iniciar os objetos. Detalhes: " + e.message)); }

/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(){"function"!==typeof $.cookie&&function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)}(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){var b;if(e.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?
g(b):b}var l=/\+/g,e=c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires,h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},h=document.cookie?document.cookie.split("; "):[],m=0,l=h.length;m<l;m++){var f=
h[m].split("="),k;k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}})})();

/* PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};

/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);

/* Slick.js - Version: 1.6.0 - Author: Ken Wheeler - Website: http://kenwheeler.github.io - Docs: http://kenwheeler.github.io/slick - Repo: http://github.com/kenwheeler/slick - Issues: http://github.com/kenwheeler/slick/issues */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});

/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var c=jQuery,e=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(c){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(l){try{console.warn(b.join("\n"))}catch(m){}}}};"function"!==typeof c.QD_scrollToggle&&(c.QD_scrollToggle=function(a){var d=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)d.push(c(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||d.push(a))}if(!d.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!c(window).scrollTop||isNaN(parseInt(c(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}c(window).scroll(function(){for(var a=0;a<d.length;a++)c(window).scrollTop()>d[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},c(function(){var a=c("body[data-qd-scroll-limit]");a.length&&c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/* Quatro Digital - Smart Buy Button // 2.0 // Carlos Vinicius // Todos os direitos reservados */
(function(u){try{var a=jQuery,r=a({}),n=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[Quatro Digital - Buy Button]\n"),b=a):b=["[Quatro Digital - Buy Button]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(h){try{console.info(b.join("\n"))}catch(l){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(l){}}else try{console.warn.apply(console,b)}catch(h){try{console.warn(b.join("\n"))}catch(l){}}}},t={timeRemoveNewItemClass:5E3,isSmartCheckout:!0,buyButton:".productInformationWrapper  a.buy-button",buyQtt:"input.buy-in-page-quantity",selectSkuMsg:"javascript:",autoWatchBuyButton:!0,buyIfQuantityZeroed:!1,fakeRequest:!1,productPageCallback:function(g,d,b){a("body").is(".productQuickView")&&("success"===d?alert("Produto adicionado ao carrinho!"):(alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
("object"===typeof parent?parent:document).location.href=b))},isProductPage:function(){return a("body").is("#produto, .produto")},execDefaultAction:function(a){return!1},allowBuyClick:function(){return!0},callback:function(){},asyncCallback:function(){}};a.QD_buyButton=function(g,d,b){function h(a){f.isSmartCheckout?a.data("qd-bb-click-active")||(a.data("qd-bb-click-active",1),a.on("click.qd_bb_buy_sc",function(a){if(!f.allowBuyClick())return!0;if(!0!==m.clickBuySmartCheckout.call(this))return a.preventDefault(),
!1})):alert("M\u00e9todo descontinuado!")}function l(e){e=e||a(f.buyButton);e.each(function(){var c=a(this);c.is(".qd-sbb-on")||(c.addClass("qd-sbb-on"),c.is(".btn-add-buy-button-asynchronous")&&!c.is(".remove-href")||c.data("qd-bb-active")||(c.data("qd-bb-active",1),c.children(".qd-bb-productAdded").length||c.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'),c.is(".buy-in-page-button")&&f.isProductPage()&&p.call(c),h(c)))});f.isProductPage()&&
!e.length&&n("Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '"+e.selector+"'.","info")}var p,f=b||f,k=a(g),m=this;window._Quatro_Digital_dropDown=window._Quatro_Digital_dropDown||{};window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};m.prodAdd=function(e,c){k.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");a("body").addClass("qd-bb-lightBoxBodyProdAdd");var b=
a(f.buyButton).filter("[href='"+(e.attr("href")||"---")+"']").add(e);b.addClass("qd-bb-itemAddBuyButtonWrapper");setTimeout(function(){k.removeClass("qd-bb-itemAddCartWrapper");b.removeClass("qd-bb-itemAddBuyButtonWrapper")},f.timeRemoveNewItemClass);window._Quatro_Digital_dropDown.getOrderForm=void 0;if("undefined"!==typeof d&&"function"===typeof d.getCartInfoByUrl)return f.isSmartCheckout||(n("fun\u00e7\u00e3o descontinuada"),d.getCartInfoByUrl()),window._QuatroDigital_DropDown.getOrderForm=void 0,
d.getCartInfoByUrl(function(c){window._Quatro_Digital_dropDown.getOrderForm=c;a.fn.simpleCart(!0,void 0,!0)},{lastSku:c});window._Quatro_Digital_dropDown.allowUpdate=!0;a.fn.simpleCart(!0);a(window).trigger("QuatroDigital.qd_sc_prodAdd",[e,c,b])};(function(){if(f.isSmartCheckout&&f.autoWatchBuyButton){var e=a(".btn-add-buy-button-asynchronous");e.length&&l(e)}})();p=function(){var e=a(this);"undefined"!==typeof e.data("buyButton")?(e.unbind("click"),h(e)):(e.bind("mouseenter.qd_bb_buy_sc",function(c){e.unbind("click");
h(e);a(this).unbind(c)}),a(window).load(function(){e.unbind("click");h(e);e.unbind("mouseenter.qd_bb_buy_sc")}))};m.clickBuySmartCheckout=function(){var e=a(this),c=e.attr("href")||"";if(-1<c.indexOf(f.selectSkuMsg))return!0;c=c.replace(/redirect\=(false|true)/ig,"").replace("?","?redirect=false&").replace(/\&\&/ig,"&");if(f.execDefaultAction(e))return e.attr("href",c.replace("redirect=false","redirect=true")),!0;c=c.replace(/http.?:/i,"");r.queue(function(b){if(!f.buyIfQuantityZeroed&&!/(&|\?)qty\=[1-9][0-9]*/ig.test(c))return b();
var d=function(b,d){var g=c.match(/sku\=([0-9]+)/ig),h=[],l;if("object"===typeof g&&null!==g)for(var k=g.length-1;0<=k;k--)l=parseInt(g[k].replace(/sku\=/ig,"")),isNaN(l)||h.push(l);f.productPageCallback.call(this,b,d,c);m.buyButtonClickCallback.call(this,b,d,c,h);m.prodAdd(e,c.split("ku=").pop().split("&").shift());"function"===typeof f.asyncCallback&&f.asyncCallback.call(this);a(window).trigger("productAddedToCart");a(window).trigger("cartProductAdded.vtex")};f.fakeRequest?(d(null,"success"),b()):
a.ajax({url:c,complete:d}).always(function(){b()})})};m.buyButtonClickCallback=function(a,c,b,d){try{"success"===c&&"object"===typeof window.parent&&"function"===typeof window.parent._QuatroDigital_prodBuyCallback&&window.parent._QuatroDigital_prodBuyCallback(a,c,b,d)}catch(v){n("Problemas ao tentar comunicar a p\u00e1gina que o produto foi aicionado ao carrinho.")}};l();"function"===typeof f.callback?f.callback.call(this):n("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o")};var k=a.Callbacks();a.fn.QD_buyButton=
function(g,d){var b=a(this);"undefined"!==typeof d||"object"!==typeof g||g instanceof a||(d=g,g=void 0);var h;k.add(function(){b.children(".qd-bb-itemAddWrapper").length||b.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');h=new a.QD_buyButton(b,g,a.extend({},t,d))});k.fire();a(window).on("QuatroDigital.qd_bb_prod_add",function(a,b,d){h.prodAdd(b,d)});return a.extend(b,h)};var q=0;a(document).ajaxSend(function(a,d,b){-1<b.url.toLowerCase().indexOf("/checkout/cart/add")&&
(q=(b.url.match(/sku\=([0-9]+)/i)||[""]).pop())});a(window).bind("productAddedToCart.qdSbbVtex",function(){a(window).trigger("QuatroDigital.qd_bb_prod_add",[new a,q])});a(document).ajaxStop(function(){k.fire()})}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",g)}})(this);
/* Quatro Digital Simple Cart // 4.15 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */

	
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};

(function(){var b=jQuery;if("function"!==typeof b.fn.simpleCart){b(function(){var b=vtexjs.checkout.getOrderForm;vtexjs.checkout.getOrderForm=function(){return b.call()}});try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;b.fn.simpleCart=function(c,p,g){var d,h,m,l,f,k,q,r,t,n;h=function(a,b){if("object"===typeof console){var e="object"===typeof a;"undefined"!==typeof b&&"alerta"===b.toLowerCase()?e?console.warn("[Simple Cart]\n",
a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[Simple Cart]\n"+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?e?console.info("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Simple Cart]\n"+a):e?console.error("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Simple Cart]\n"+a)}};d=b(this);"object"===typeof c?p=c:(c=c||!1,d=d.add(b.QD_simpleCart.elements));if(!d.length)return d;b.QD_simpleCart.elements=b.QD_simpleCart.elements.add(d);
g="undefined"===typeof g?!1:g;m={cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:(b("meta[name=currency]").attr("content")||"R$")+" ",showQuantityByItems:!0,smartCheckout:!0,callback:function(){}};f=b.extend({},m,p);l=b("");d.each(function(){var a=b(this);a.data("qd_simpleCartOpts")||a.data("qd_simpleCartOpts",f)});n=function(a){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var b=0,e=0,c=0;c<a.totalizers.length;c++)"Shipping"==a.totalizers[c].id&&
(e+=a.totalizers[c].value),b+=a.totalizers[c].value;window._QuatroDigital_CartData.total=f.currencySymbol+qd_number_format(b/100,2,",",".");window._QuatroDigital_CartData.shipping=f.currencySymbol+qd_number_format(e/100,2,",",".");window._QuatroDigital_CartData.allTotal=f.currencySymbol+qd_number_format((b+e)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(f.showQuantityByItems)for(c=0;c<a.items.length;c++)window._QuatroDigital_CartData.qtt+=a.items[c].quantity;else window._QuatroDigital_CartData.qtt=
a.items.length||0;try{window._QuatroDigital_CartData.callback&&window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(u){h("Problemas com o callback do Smart Cart")}t(l)};k=function(a,b){1===a?b.hide().filter(".singular").show():b.hide().filter(".plural").show()};r=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};q=function(a,b){var c;c=parseInt(window._QuatroDigital_CartData.qtt,10);b.$this.show();isNaN(c)&&(h("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.",
"alerta"),c=0);b.cartTotalE.html(window._QuatroDigital_CartData.total);b.cartQttE.html(c);k(c,b.itemsTextE);r(c)};t=function(a){d.each(function(){var d={},e;e=b(this);c&&e.data("qd_simpleCartOpts")&&b.extend(f,e.data("qd_simpleCartOpts"));d.$this=e;d.cartQttE=e.find(f.cartQtt)||l;d.cartTotalE=e.find(f.cartTotal)||l;d.itemsTextE=e.find(f.itemsText)||l;d.emptyElem=e.find(f.emptyCart)||l;q(a,d);e.addClass("qd-sc-populated")})};(function(){if(f.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||
{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(g?g:!c))return n(window._QuatroDigital_DropDown.getOrderForm);if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return h("N\u00e3o foi encontrada a biblioteca VTEX.js");b.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){n(a);window._QuatroDigital_DropDown.getOrderForm=
a},fail:function(a){h(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();f.callback();b(window).trigger("simpleCartCallback.quatro_digital");return d};b.QD_simpleCart={elements:b("")};b(function(){var c;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(c=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(k,g,d,h,m){c.call(this,k,g,d,h,function(){"function"===typeof m&&
m();b.QD_simpleCart.elements.each(function(){var c;c=b(this);c.simpleCart(c.data("qd_simpleCartOpts"))})})})});var k=window.ReloadItemsCart||void 0;window.ReloadItemsCart=function(c){b.fn.simpleCart(!0);"function"===typeof k?k.call(this,c):alert(c)};b(function(){var c=b(".qd_cart_auto");c.length&&c.simpleCart()});b(function(){b(window).bind("productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",function(){b.fn.simpleCart(!0)})})}catch(c){"undefined"!==typeof console&&"function"===typeof console.error&&
console.error("Oooops! ",c)}}})();
/* Quatro Digital Newsletter // 5.1 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function(){var f=jQuery;if("function"!==typeof f.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(f,l){}};f.fn.QD_news=function(r){var l=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var g;"object"===typeof a?(a.unshift("[QD News]\n"),g=a):g=["[QD News]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===
d.toLowerCase())try{console.info.apply(console,g)}catch(b){console.info(g.join("\n"))}else try{console.error.apply(console,g)}catch(b){console.error(g.join("\n"))}else try{console.warn.apply(console,g)}catch(b){console.warn(g.join("\n"))}}},h=f(this);if(!h.length)return h;var a=f.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof f.fn.vtexPopUp2)return l("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
h;var q=function(f){var d,g,b;g=0;d=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&d();g++})})};b=function(){f.fadeTo(a.animateSpeed,.2,function(){f.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&b();g++})})};f.stop(!0,!0);"leftRight"==a.animation?d():"blink"==a.animation&&b()};h.each(function(){var h,d,g,b=f(this),k=b.find(a.nameField),e=b.find(a.emailField),m=b.find(a.btn);"animateField"!=
a.validationMethod&&(d=b.find(a.elementError),g=b.find(a.elementSuccess));1>k.length&&a.checkNameExist&&l("Campo de nome, n\u00e3o encontrado ("+k.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>e.length)return l("Campo de e-mail, n\u00e3o encontrado ("+e.selector+")"),b;if(1>m.length)return l("Bot\u00e3o de envio, n\u00e3o encontrado ("+m.selector+")"),b;if("animateField"!=a.validationMethod&&(1>g.length||1>d.length))return l("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
g.selector+", "+d.selector+")"),b;a.setDefaultName&&k.is("input[type=text], textarea")&&k.val(a.defaultName);e.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var c=k.filter(":visible");if(!c.length)return}else c=k;var b=c.val();c.is("input:text, textarea")&&c.bind({focus:function(){c.val()!=b||0!==c.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||c.val("")},blur:function(){""===c.val()&&c.val(b)}})}})();(function(){var b;b=e.val();e.bind({focus:function(){e.val()==
b&&0===e.val().search(a.defaultEmail.substr(0,6))&&e.val("")},blur:function(){""===e.val()&&e.val(b)}})})();h=function(){var c,e,h,k;e=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();h=b.find(a.nameField).is(":visible");h=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||h?h:!0):!1;k=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(h||k)"animateField"==a.validationMethod?(h&&q(b.find(a.nameField)),k&&q(b.find(a.emailField))):"popup"==a.validationMethod?d.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(d.slideDown().bind("click",function(){f(this).slideUp()}),
setTimeout(function(){d.slideUp()},1800));else if(a.allowSubmit()){m.attr("disabled","disabled");var n={postData:{newsletterClientEmail:c,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:m,wrapper:b};"linx"===a.platform&&(n.postData.nome=n.postData.newsletterClientName,n.postData.email=n.postData.newsletterClientEmail);f.ajax({url:"linx"===a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:n.postData,success:function(c){var e,h,d;m.removeAttr("disabled");if("linx"===a.platform&&!(-1<c.indexOf(" com sucesso.")||-1<c.indexOf(" cadastrado.")))return alert(c);"popup"==a.validationMethod?g.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&g.slideDown().bind("click",function(){f(this).slideUp()});d=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&
b.find(a.nameField).val(a.defaultName);e=function(){d.val(a.defaultEmail)};"animateField"==a.validationMethod?(d.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),d.addClass("vtexNewsSuccess"),h=setTimeout(function(){d.removeClass("vtexNewsSuccess");e();d.unbind("focus.vtexNews")},a.timeHideSuccessMsg),d.bind("focus.vtexNews",function(){d.removeClass("vtexNewsSuccess");clearTimeout(h);f(this).val("");f(this).unbind("focus.vtexNews")})):e();a.successCallback(n);f(b).trigger("qdNewsSuccessCallback",
n)}});a.submitCallback(c,e)}else l("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),h())};k.filter("input:text, textarea").bind("keydown",p);e.bind("keydown",p);p=m.getParent("form");p.length?p.submit(function(a){a.preventDefault();h()}):m.bind("click.qd_news",function(){h()})});return h};f(function(){f(".qd_news_auto").QD_news()})}})();

var _0xf8de=['QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','qd-ssa-sku-prod-unavailable','ragnevalp%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','join','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','QD_smartStockAvailable','QuatroDigital.ssa.skuSelected','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','vtex.sku.selected.QD','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','.qd_smart_stock_available_auto','qdAjax','qdAjaxQueue','opts','push','success','call','error','complete','parameters','callbackFns','boolean','successPopulated','errorPopulated','completePopulated','extend','object','clearQueueDelay','jqXHR','readyState','textStatus','errorThrown','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','function','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','aviso','info','apply','warn','removeClass','SkuSellersInformation','AvailableQuantity','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','addClass','qd-ssa-hide','filter','length','[data-qd-ssa-text=\x22default\x22]','qd-ssa-show','html','replace','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','qd-ssa-on','qd-ssa-skus-','split','message','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','skus','trigger'];(function(_0x329f85,_0x58b3a2){var _0x4fa6a2=function(_0x578e00){while(--_0x578e00){_0x329f85['push'](_0x329f85['shift']());}};_0x4fa6a2(++_0x58b3a2);}(_0xf8de,0x10d));var _0xef8d=function(_0xb85b35,_0x4318b7){_0xb85b35=_0xb85b35-0x0;var _0x1e832e=_0xf8de[_0xb85b35];return _0x1e832e;};(function(_0x57f8c0){if('function'!==typeof _0x57f8c0[_0xef8d('0x0')]){var _0x1426a9={};_0x57f8c0[_0xef8d('0x1')]=_0x1426a9;_0x57f8c0['qdAjax']=function(_0x19af2a){var _0xf61820=_0x57f8c0['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x19af2a);var _0x2ba6b9=escape(encodeURIComponent(_0xf61820['url']));_0x1426a9[_0x2ba6b9]=_0x1426a9[_0x2ba6b9]||{};_0x1426a9[_0x2ba6b9]['opts']=_0x1426a9[_0x2ba6b9][_0xef8d('0x2')]||[];_0x1426a9[_0x2ba6b9][_0xef8d('0x2')][_0xef8d('0x3')]({'success':function(_0x55f7a1,_0x5791d3,_0x39f735){_0xf61820[_0xef8d('0x4')][_0xef8d('0x5')](this,_0x55f7a1,_0x5791d3,_0x39f735);},'error':function(_0x2ba404,_0x3773e7,_0x277cc9){_0xf61820[_0xef8d('0x6')][_0xef8d('0x5')](this,_0x2ba404,_0x3773e7,_0x277cc9);},'complete':function(_0x37a776,_0x20d714){_0xf61820[_0xef8d('0x7')][_0xef8d('0x5')](this,_0x37a776,_0x20d714);}});_0x1426a9[_0x2ba6b9][_0xef8d('0x8')]=_0x1426a9[_0x2ba6b9][_0xef8d('0x8')]||{'success':{},'error':{},'complete':{}};_0x1426a9[_0x2ba6b9][_0xef8d('0x9')]=_0x1426a9[_0x2ba6b9][_0xef8d('0x9')]||{};_0x1426a9[_0x2ba6b9]['callbackFns']['successPopulated']=_0xef8d('0xa')===typeof _0x1426a9[_0x2ba6b9]['callbackFns'][_0xef8d('0xb')]?_0x1426a9[_0x2ba6b9][_0xef8d('0x9')][_0xef8d('0xb')]:!0x1;_0x1426a9[_0x2ba6b9][_0xef8d('0x9')]['errorPopulated']='boolean'===typeof _0x1426a9[_0x2ba6b9][_0xef8d('0x9')][_0xef8d('0xc')]?_0x1426a9[_0x2ba6b9][_0xef8d('0x9')][_0xef8d('0xc')]:!0x1;_0x1426a9[_0x2ba6b9][_0xef8d('0x9')]['completePopulated']=_0xef8d('0xa')===typeof _0x1426a9[_0x2ba6b9][_0xef8d('0x9')][_0xef8d('0xd')]?_0x1426a9[_0x2ba6b9][_0xef8d('0x9')][_0xef8d('0xd')]:!0x1;_0x19af2a=_0x57f8c0[_0xef8d('0xe')]({},_0xf61820,{'success':function(_0x5cf793,_0xff325b,_0x138968){_0x1426a9[_0x2ba6b9][_0xef8d('0x8')][_0xef8d('0x4')]={'data':_0x5cf793,'textStatus':_0xff325b,'jqXHR':_0x138968};_0x1426a9[_0x2ba6b9][_0xef8d('0x9')]['successPopulated']=!0x0;for(var _0x2deb31 in _0x1426a9[_0x2ba6b9][_0xef8d('0x2')])_0xef8d('0xf')===typeof _0x1426a9[_0x2ba6b9][_0xef8d('0x2')][_0x2deb31]&&(_0x1426a9[_0x2ba6b9][_0xef8d('0x2')][_0x2deb31]['success'][_0xef8d('0x5')](this,_0x5cf793,_0xff325b,_0x138968),_0x1426a9[_0x2ba6b9]['opts'][_0x2deb31]['success']=function(){});},'error':function(_0x1bab14,_0x526ba9,_0x43cf28){_0x1426a9[_0x2ba6b9][_0xef8d('0x8')][_0xef8d('0x6')]={'errorThrown':_0x43cf28,'textStatus':_0x526ba9,'jqXHR':_0x1bab14};_0x1426a9[_0x2ba6b9][_0xef8d('0x9')][_0xef8d('0xc')]=!0x0;for(var _0x5bf32f in _0x1426a9[_0x2ba6b9][_0xef8d('0x2')])'object'===typeof _0x1426a9[_0x2ba6b9][_0xef8d('0x2')][_0x5bf32f]&&(_0x1426a9[_0x2ba6b9][_0xef8d('0x2')][_0x5bf32f][_0xef8d('0x6')][_0xef8d('0x5')](this,_0x1bab14,_0x526ba9,_0x43cf28),_0x1426a9[_0x2ba6b9][_0xef8d('0x2')][_0x5bf32f][_0xef8d('0x6')]=function(){});},'complete':function(_0x10bcd8,_0x57dc17){_0x1426a9[_0x2ba6b9][_0xef8d('0x8')][_0xef8d('0x7')]={'textStatus':_0x57dc17,'jqXHR':_0x10bcd8};_0x1426a9[_0x2ba6b9][_0xef8d('0x9')][_0xef8d('0xd')]=!0x0;for(var _0x246b64 in _0x1426a9[_0x2ba6b9][_0xef8d('0x2')])_0xef8d('0xf')===typeof _0x1426a9[_0x2ba6b9][_0xef8d('0x2')][_0x246b64]&&(_0x1426a9[_0x2ba6b9][_0xef8d('0x2')][_0x246b64][_0xef8d('0x7')]['call'](this,_0x10bcd8,_0x57dc17),_0x1426a9[_0x2ba6b9][_0xef8d('0x2')][_0x246b64][_0xef8d('0x7')]=function(){});isNaN(parseInt(_0xf61820[_0xef8d('0x10')]))||setTimeout(function(){_0x1426a9[_0x2ba6b9][_0xef8d('0x11')]=void 0x0;_0x1426a9[_0x2ba6b9][_0xef8d('0x2')]=void 0x0;_0x1426a9[_0x2ba6b9]['parameters']=void 0x0;_0x1426a9[_0x2ba6b9][_0xef8d('0x9')]=void 0x0;},_0xf61820[_0xef8d('0x10')]);}});'undefined'===typeof _0x1426a9[_0x2ba6b9][_0xef8d('0x11')]?_0x1426a9[_0x2ba6b9][_0xef8d('0x11')]=_0x57f8c0['ajax'](_0x19af2a):_0x1426a9[_0x2ba6b9][_0xef8d('0x11')]&&_0x1426a9[_0x2ba6b9][_0xef8d('0x11')]['readyState']&&0x4==_0x1426a9[_0x2ba6b9]['jqXHR'][_0xef8d('0x12')]&&(_0x1426a9[_0x2ba6b9][_0xef8d('0x9')][_0xef8d('0xb')]&&_0x19af2a[_0xef8d('0x4')](_0x1426a9[_0x2ba6b9]['parameters']['success']['data'],_0x1426a9[_0x2ba6b9][_0xef8d('0x8')]['success'][_0xef8d('0x13')],_0x1426a9[_0x2ba6b9]['parameters'][_0xef8d('0x4')][_0xef8d('0x11')]),_0x1426a9[_0x2ba6b9][_0xef8d('0x9')][_0xef8d('0xc')]&&_0x19af2a[_0xef8d('0x6')](_0x1426a9[_0x2ba6b9]['parameters'][_0xef8d('0x6')][_0xef8d('0x11')],_0x1426a9[_0x2ba6b9]['parameters'][_0xef8d('0x6')][_0xef8d('0x13')],_0x1426a9[_0x2ba6b9][_0xef8d('0x8')][_0xef8d('0x6')][_0xef8d('0x14')]),_0x1426a9[_0x2ba6b9][_0xef8d('0x9')][_0xef8d('0xd')]&&_0x19af2a[_0xef8d('0x7')](_0x1426a9[_0x2ba6b9][_0xef8d('0x8')]['complete'][_0xef8d('0x11')],_0x1426a9[_0x2ba6b9][_0xef8d('0x8')][_0xef8d('0x7')][_0xef8d('0x13')]));};_0x57f8c0[_0xef8d('0x0')]['version']=_0xef8d('0x15');}}(jQuery));(function(_0x17271d){function _0x3bf4fd(_0x12778f,_0x2a6086){_0x20379c[_0xef8d('0x0')]({'url':_0xef8d('0x16')+_0x12778f,'clearQueueDelay':null,'success':_0x2a6086,'error':function(){_0x37e001(_0xef8d('0x17'));}});}var _0x20379c=jQuery;if(_0xef8d('0x18')!==typeof _0x20379c['fn']['QD_smartStockAvailable']){var _0x37e001=function(_0x2a4149,_0x5f0bec){if('object'===typeof console){var _0x32004b;_0xef8d('0xf')===typeof _0x2a4149?(_0x2a4149[_0xef8d('0x19')]('[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'),_0x32004b=_0x2a4149):_0x32004b=[_0xef8d('0x1a')+_0x2a4149];'undefined'===typeof _0x5f0bec||_0xef8d('0x1b')!==_0x5f0bec[_0xef8d('0x1c')]()&&_0xef8d('0x1d')!==_0x5f0bec[_0xef8d('0x1c')]()?'undefined'!==typeof _0x5f0bec&&'info'===_0x5f0bec[_0xef8d('0x1c')]()?console[_0xef8d('0x1e')][_0xef8d('0x1f')](console,_0x32004b):console[_0xef8d('0x6')]['apply'](console,_0x32004b):console[_0xef8d('0x20')][_0xef8d('0x1f')](console,_0x32004b);}},_0x4f6521={},_0x25ddd3=function(_0x5ae7fc,_0x273bc7){function _0x5c2a69(_0x194fd7){try{_0x5ae7fc[_0xef8d('0x21')]('qd-ssa-sku-no-selected')['addClass']('qd-ssa-sku-selected');var _0x2f6de2=_0x194fd7[0x0][_0xef8d('0x22')][0x0][_0xef8d('0x23')];_0x5ae7fc['attr'](_0xef8d('0x24'),_0x2f6de2);_0x5ae7fc[_0xef8d('0x25')](function(){var _0x5ae7fc=_0x20379c(this)[_0xef8d('0x26')](_0xef8d('0x27'));if(0x1>_0x2f6de2)return _0x5ae7fc[_0xef8d('0x28')]()[_0xef8d('0x29')](_0xef8d('0x2a'))['removeClass']('qd-ssa-show');var _0x194fd7=_0x5ae7fc[_0xef8d('0x2b')]('[data-qd-ssa-text=\x22'+_0x2f6de2+'\x22]');_0x194fd7=_0x194fd7[_0xef8d('0x2c')]?_0x194fd7:_0x5ae7fc['filter'](_0xef8d('0x2d'));_0x5ae7fc[_0xef8d('0x28')]()[_0xef8d('0x29')](_0xef8d('0x2a'))['removeClass'](_0xef8d('0x2e'));_0x194fd7[_0xef8d('0x2f')]((_0x194fd7[_0xef8d('0x2f')]()||'')[_0xef8d('0x30')]('#qtt',_0x2f6de2));_0x194fd7[_0xef8d('0x31')]()[_0xef8d('0x29')](_0xef8d('0x2e'))['removeClass'](_0xef8d('0x2a'));});}catch(_0x1030f3){_0x37e001([_0xef8d('0x32'),_0x1030f3['message']]);}}if(_0x5ae7fc[_0xef8d('0x2c')]){_0x5ae7fc[_0xef8d('0x29')](_0xef8d('0x33'));_0x5ae7fc['addClass']('qd-ssa-sku-no-selected');try{_0x5ae7fc['addClass'](_0xef8d('0x34')+vtxctx['skus'][_0xef8d('0x35')](';')['length']);}catch(_0x20be36){_0x37e001(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0x20be36[_0xef8d('0x36')]]);}_0x20379c(window)['on'](_0xef8d('0x37'),function(_0x21ed19,_0x5e0e8e,_0x290a24){try{_0x3bf4fd(_0x290a24[_0xef8d('0x38')],function(_0x5e5b84){_0x5c2a69(_0x5e5b84);0x1===vtxctx[_0xef8d('0x39')][_0xef8d('0x35')](';')[_0xef8d('0x2c')]&&0x0==_0x5e5b84[0x0][_0xef8d('0x22')][0x0][_0xef8d('0x23')]&&_0x20379c(window)[_0xef8d('0x3a')](_0xef8d('0x3b'));});}catch(_0x2e8ebe){_0x37e001([_0xef8d('0x3c'),_0x2e8ebe[_0xef8d('0x36')]]);}});_0x20379c(window)[_0xef8d('0x3d')]('vtex.sku.selected.QD');_0x20379c(window)['on'](_0xef8d('0x3b'),function(){_0x5ae7fc[_0xef8d('0x29')](_0xef8d('0x3e'))[_0xef8d('0x28')]();});}};_0x17271d=function(_0x77d858){var _0x25eb03={'i':_0xef8d('0x3f')};return function(_0x17c747){var _0xee2035=function(_0x57f082){return _0x57f082;};var _0x4453d7=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x17c747=_0x17c747['d'+_0x4453d7[0x10]+'c'+_0x4453d7[0x11]+'m'+_0xee2035(_0x4453d7[0x1])+'n'+_0x4453d7[0xd]]['l'+_0x4453d7[0x12]+'c'+_0x4453d7[0x0]+'ti'+_0xee2035('o')+'n'];var _0x26d168=function(_0x4ea2c0){return escape(encodeURIComponent(_0x4ea2c0[_0xef8d('0x30')](/\./g,'¨')[_0xef8d('0x30')](/[a-zA-Z]/g,function(_0x21a10f){return String[_0xef8d('0x40')](('Z'>=_0x21a10f?0x5a:0x7a)>=(_0x21a10f=_0x21a10f['charCodeAt'](0x0)+0xd)?_0x21a10f:_0x21a10f-0x1a);})));};var _0x35a0c1=_0x26d168(_0x17c747[[_0x4453d7[0x9],_0xee2035('o'),_0x4453d7[0xc],_0x4453d7[_0xee2035(0xd)]][_0xef8d('0x41')]('')]);_0x26d168=_0x26d168((window[['js',_0xee2035('no'),'m',_0x4453d7[0x1],_0x4453d7[0x4][_0xef8d('0x42')](),_0xef8d('0x43')][_0xef8d('0x41')]('')]||_0xef8d('0x44'))+['.v',_0x4453d7[0xd],'e',_0xee2035('x'),'co',_0xee2035('mm'),_0xef8d('0x45'),_0x4453d7[0x1],'.c',_0xee2035('o'),'m.',_0x4453d7[0x13],'r'][_0xef8d('0x41')](''));for(var _0x9828fa in _0x25eb03){if(_0x26d168===_0x9828fa+_0x25eb03[_0x9828fa]||_0x35a0c1===_0x9828fa+_0x25eb03[_0x9828fa]){var _0xef5a27='tr'+_0x4453d7[0x11]+'e';break;}_0xef5a27='f'+_0x4453d7[0x0]+'ls'+_0xee2035(_0x4453d7[0x1])+'';}_0xee2035=!0x1;-0x1<_0x17c747[[_0x4453d7[0xc],'e',_0x4453d7[0x0],'rc',_0x4453d7[0x9]][_0xef8d('0x41')]('')]['indexOf'](_0xef8d('0x46'))&&(_0xee2035=!0x0);return[_0xef5a27,_0xee2035];}(_0x77d858);}(window);if(!eval(_0x17271d[0x0]))return _0x17271d[0x1]?_0x37e001('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x20379c['fn'][_0xef8d('0x47')]=function(_0x3e2ed1){var _0x1695f8=_0x20379c(this);_0x3e2ed1=_0x20379c['extend'](!0x0,{},_0x4f6521,_0x3e2ed1);_0x1695f8['qdPlugin']=new _0x25ddd3(_0x1695f8,_0x3e2ed1);try{_0xef8d('0xf')===typeof _0x20379c['fn']['QD_smartStockAvailable']['initialSkuSelected']&&_0x20379c(window)[_0xef8d('0x3a')](_0xef8d('0x48'),[_0x20379c['fn'][_0xef8d('0x47')][_0xef8d('0x49')][_0xef8d('0x4a')],_0x20379c['fn'][_0xef8d('0x47')][_0xef8d('0x49')][_0xef8d('0x38')]]);}catch(_0x3a6b2b){_0x37e001([_0xef8d('0x4b'),_0x3a6b2b[_0xef8d('0x36')]]);}_0x20379c['fn'][_0xef8d('0x47')][_0xef8d('0x4c')]&&_0x20379c(window)['trigger'](_0xef8d('0x3b'));return _0x1695f8;};_0x20379c(window)['on'](_0xef8d('0x4d'),function(_0x472cd0,_0x28f540,_0x202f2d){try{_0x20379c['fn']['QD_smartStockAvailable'][_0xef8d('0x49')]={'prod':_0x28f540,'sku':_0x202f2d},_0x20379c(this)['off'](_0x472cd0);}catch(_0x588322){_0x37e001([_0xef8d('0x4e'),_0x588322['message']]);}});_0x20379c(window)['on'](_0xef8d('0x4f'),function(_0x5c89bb,_0x1e71e1,_0x4c4747){try{for(var _0x4ab161=_0x4c4747[_0xef8d('0x2c')],_0xb1d7a5=_0x1e71e1=0x0;_0xb1d7a5<_0x4ab161&&!_0x4c4747[_0xb1d7a5][_0xef8d('0x50')];_0xb1d7a5++)_0x1e71e1+=0x1;_0x4ab161<=_0x1e71e1&&(_0x20379c['fn'][_0xef8d('0x47')]['unavailable']=!0x0);_0x20379c(this)[_0xef8d('0x3d')](_0x5c89bb);}catch(_0x5eda3a){_0x37e001(['Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20',_0x5eda3a[_0xef8d('0x36')]]);}});_0x20379c(function(){_0x20379c(_0xef8d('0x51'))['QD_smartStockAvailable']();});}}(window));
var _0xa5db=['unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','aviso','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','qd-am-first','last','ragnevalp%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','attr','data-qdam-value','length','.box-banner','clone','hide','text','trim','getParent','insertBefore','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','trigger','QD_amazingMenu','find','UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul','children',':not(ul)','qd-am-elem-','first','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','-li','callback','call','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','closest','function','/qd-amazing-menu','object','undefined','error','info','warn'];(function(_0x58ce2f,_0x16d26d){var _0x3d808e=function(_0x3ba446){while(--_0x3ba446){_0x58ce2f['push'](_0x58ce2f['shift']());}};_0x3d808e(++_0x16d26d);}(_0xa5db,0x134));var _0xba5d=function(_0x6b2337,_0x31e740){_0x6b2337=_0x6b2337-0x0;var _0x3e343b=_0xa5db[_0x6b2337];return _0x3e343b;};(function(_0x4c0d29){_0x4c0d29['fn']['getParent']=_0x4c0d29['fn'][_0xba5d('0x0')];}(jQuery));(function(_0x136e62){var _0x1c5a6a;var _0x2f6e4e=jQuery;if(_0xba5d('0x1')!==typeof _0x2f6e4e['fn']['QD_amazingMenu']){var _0x4d8c1b={'url':_0xba5d('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x5cd042=function(_0x480557,_0x4da931){if(_0xba5d('0x3')===typeof console&&_0xba5d('0x4')!==typeof console[_0xba5d('0x5')]&&_0xba5d('0x4')!==typeof console[_0xba5d('0x6')]&&_0xba5d('0x4')!==typeof console[_0xba5d('0x7')]){var _0x3d0672;_0xba5d('0x3')===typeof _0x480557?(_0x480557[_0xba5d('0x8')](_0xba5d('0x9')),_0x3d0672=_0x480557):_0x3d0672=[_0xba5d('0x9')+_0x480557];if(_0xba5d('0x4')===typeof _0x4da931||'alerta'!==_0x4da931[_0xba5d('0xa')]()&&_0xba5d('0xb')!==_0x4da931[_0xba5d('0xa')]())if(_0xba5d('0x4')!==typeof _0x4da931&&'info'===_0x4da931[_0xba5d('0xa')]())try{console[_0xba5d('0x6')][_0xba5d('0xc')](console,_0x3d0672);}catch(_0x52df70){try{console[_0xba5d('0x6')](_0x3d0672['join']('\x0a'));}catch(_0x44e656){}}else try{console[_0xba5d('0x5')][_0xba5d('0xc')](console,_0x3d0672);}catch(_0x37a95c){try{console[_0xba5d('0x5')](_0x3d0672['join']('\x0a'));}catch(_0x1aff1d){}}else try{console['warn'][_0xba5d('0xc')](console,_0x3d0672);}catch(_0x53307d){try{console[_0xba5d('0x7')](_0x3d0672[_0xba5d('0xd')]('\x0a'));}catch(_0x223000){}}}};_0x2f6e4e['fn'][_0xba5d('0xe')]=function(){var _0x21b5ec=_0x2f6e4e(this);_0x21b5ec[_0xba5d('0xf')](function(_0x416ece){_0x2f6e4e(this)[_0xba5d('0x10')](_0xba5d('0x11')+_0x416ece);});_0x21b5ec['first']()['addClass'](_0xba5d('0x12'));_0x21b5ec[_0xba5d('0x13')]()['addClass']('qd-am-last');return _0x21b5ec;};_0x2f6e4e['fn']['QD_amazingMenu']=function(){};_0x136e62=function(_0x22e63d){var _0x4b4d3c={'i':_0xba5d('0x14')};return function(_0x4d6488){var _0x22bb07=function(_0xedaa6b){return _0xedaa6b;};var _0x23c89c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4d6488=_0x4d6488['d'+_0x23c89c[0x10]+'c'+_0x23c89c[0x11]+'m'+_0x22bb07(_0x23c89c[0x1])+'n'+_0x23c89c[0xd]]['l'+_0x23c89c[0x12]+'c'+_0x23c89c[0x0]+'ti'+_0x22bb07('o')+'n'];var _0x39784d=function(_0x419f0f){return escape(encodeURIComponent(_0x419f0f['replace'](/\./g,'¨')[_0xba5d('0x15')](/[a-zA-Z]/g,function(_0xa6f44c){return String[_0xba5d('0x16')](('Z'>=_0xa6f44c?0x5a:0x7a)>=(_0xa6f44c=_0xa6f44c[_0xba5d('0x17')](0x0)+0xd)?_0xa6f44c:_0xa6f44c-0x1a);})));};var _0x629bf6=_0x39784d(_0x4d6488[[_0x23c89c[0x9],_0x22bb07('o'),_0x23c89c[0xc],_0x23c89c[_0x22bb07(0xd)]][_0xba5d('0xd')]('')]);_0x39784d=_0x39784d((window[['js',_0x22bb07('no'),'m',_0x23c89c[0x1],_0x23c89c[0x4][_0xba5d('0x18')](),_0xba5d('0x19')]['join']('')]||_0xba5d('0x1a'))+['.v',_0x23c89c[0xd],'e',_0x22bb07('x'),'co',_0x22bb07('mm'),_0xba5d('0x1b'),_0x23c89c[0x1],'.c',_0x22bb07('o'),'m.',_0x23c89c[0x13],'r'][_0xba5d('0xd')](''));for(var _0x427936 in _0x4b4d3c){if(_0x39784d===_0x427936+_0x4b4d3c[_0x427936]||_0x629bf6===_0x427936+_0x4b4d3c[_0x427936]){var _0x570dc7='tr'+_0x23c89c[0x11]+'e';break;}_0x570dc7='f'+_0x23c89c[0x0]+'ls'+_0x22bb07(_0x23c89c[0x1])+'';}_0x22bb07=!0x1;-0x1<_0x4d6488[[_0x23c89c[0xc],'e',_0x23c89c[0x0],'rc',_0x23c89c[0x9]][_0xba5d('0xd')]('')][_0xba5d('0x1c')](_0xba5d('0x1d'))&&(_0x22bb07=!0x0);return[_0x570dc7,_0x22bb07];}(_0x22e63d);}(window);if(!eval(_0x136e62[0x0]))return _0x136e62[0x1]?_0x5cd042(_0xba5d('0x1e')):!0x1;var _0x278d20=function(_0x5d6c82){var _0x1f3bed=_0x5d6c82['find'](_0xba5d('0x1f'));var _0x5e0803=_0x1f3bed[_0xba5d('0x20')](_0xba5d('0x21'));var _0xae64d4=_0x1f3bed[_0xba5d('0x20')](_0xba5d('0x22'));if(_0x5e0803['length']||_0xae64d4['length'])_0x5e0803[_0xba5d('0x23')]()['addClass'](_0xba5d('0x24')),_0xae64d4[_0xba5d('0x23')]()[_0xba5d('0x10')](_0xba5d('0x25')),_0x2f6e4e[_0xba5d('0x26')]({'url':_0x1c5a6a[_0xba5d('0x27')],'dataType':_0xba5d('0x28'),'success':function(_0x16ad29){var _0x4f8004=_0x2f6e4e(_0x16ad29);_0x5e0803[_0xba5d('0xf')](function(){var _0x16ad29=_0x2f6e4e(this);var _0x1e1099=_0x4f8004['find']('img[alt=\x27'+_0x16ad29[_0xba5d('0x29')](_0xba5d('0x2a'))+'\x27]');_0x1e1099[_0xba5d('0x2b')]&&(_0x1e1099[_0xba5d('0xf')](function(){_0x2f6e4e(this)['getParent'](_0xba5d('0x2c'))[_0xba5d('0x2d')]()['insertBefore'](_0x16ad29);}),_0x16ad29[_0xba5d('0x2e')]());})[_0xba5d('0x10')]('qd-am-content-loaded');_0xae64d4[_0xba5d('0xf')](function(){var _0x16ad29={};var _0x899287=_0x2f6e4e(this);_0x4f8004['find']('h2')[_0xba5d('0xf')](function(){if(_0x2f6e4e(this)[_0xba5d('0x2f')]()[_0xba5d('0x30')]()['toLowerCase']()==_0x899287[_0xba5d('0x29')](_0xba5d('0x2a'))[_0xba5d('0x30')]()['toLowerCase']())return _0x16ad29=_0x2f6e4e(this),!0x1;});_0x16ad29[_0xba5d('0x2b')]&&(_0x16ad29[_0xba5d('0xf')](function(){_0x2f6e4e(this)[_0xba5d('0x31')]('[class*=\x27colunas\x27]')[_0xba5d('0x2d')]()[_0xba5d('0x32')](_0x899287);}),_0x899287[_0xba5d('0x2e')]());})[_0xba5d('0x10')]('qd-am-content-loaded');},'error':function(){_0x5cd042(_0xba5d('0x33')+_0x1c5a6a['url']+_0xba5d('0x34'));},'complete':function(){_0x1c5a6a[_0xba5d('0x35')]['call'](this);_0x2f6e4e(window)[_0xba5d('0x36')]('QuatroDigital.am.ajaxCallback',_0x5d6c82);},'clearQueueDelay':0xbb8});};_0x2f6e4e[_0xba5d('0x37')]=function(_0x355e53){var _0x307603=_0x355e53[_0xba5d('0x38')]('ul[itemscope]')[_0xba5d('0xf')](function(){var _0x3b99ac=_0x2f6e4e(this);if(!_0x3b99ac['length'])return _0x5cd042([_0xba5d('0x39'),_0x355e53],'alerta');_0x3b99ac[_0xba5d('0x38')]('li\x20>ul')[_0xba5d('0x23')]()[_0xba5d('0x10')](_0xba5d('0x3a'));_0x3b99ac['find']('li')['each'](function(){var _0x250d42=_0x2f6e4e(this);var _0xac3694=_0x250d42[_0xba5d('0x3b')](_0xba5d('0x3c'));_0xac3694[_0xba5d('0x2b')]&&_0x250d42[_0xba5d('0x10')](_0xba5d('0x3d')+_0xac3694[_0xba5d('0x3e')]()[_0xba5d('0x2f')]()[_0xba5d('0x30')]()[_0xba5d('0x3f')]()['replace'](/\./g,'')[_0xba5d('0x15')](/\s/g,'-')[_0xba5d('0xa')]());});var _0x54b30f=_0x3b99ac['find'](_0xba5d('0x40'))['qdAmAddNdx']();_0x3b99ac['addClass'](_0xba5d('0x41'));_0x54b30f=_0x54b30f[_0xba5d('0x38')](_0xba5d('0x42'));_0x54b30f[_0xba5d('0xf')](function(){var _0x4765bf=_0x2f6e4e(this);_0x4765bf[_0xba5d('0x38')](_0xba5d('0x40'))[_0xba5d('0xe')]()[_0xba5d('0x10')](_0xba5d('0x43'));_0x4765bf[_0xba5d('0x10')](_0xba5d('0x44'));_0x4765bf[_0xba5d('0x23')]()[_0xba5d('0x10')](_0xba5d('0x45'));});_0x54b30f[_0xba5d('0x10')](_0xba5d('0x45'));var _0x17d42d=0x0,_0x136e62=function(_0x42269b){_0x17d42d+=0x1;_0x42269b=_0x42269b['children']('li')[_0xba5d('0x3b')]('*');_0x42269b[_0xba5d('0x2b')]&&(_0x42269b[_0xba5d('0x10')](_0xba5d('0x46')+_0x17d42d),_0x136e62(_0x42269b));};_0x136e62(_0x3b99ac);_0x3b99ac[_0xba5d('0x47')](_0x3b99ac['find']('ul'))['each'](function(){var _0x567ee7=_0x2f6e4e(this);_0x567ee7[_0xba5d('0x10')]('qd-am-'+_0x567ee7['children']('li')['length']+_0xba5d('0x48'));});});_0x278d20(_0x307603);_0x1c5a6a[_0xba5d('0x49')][_0xba5d('0x4a')](this);_0x2f6e4e(window)[_0xba5d('0x36')](_0xba5d('0x4b'),_0x355e53);};_0x2f6e4e['fn']['QD_amazingMenu']=function(_0x75a812){var _0x37ab5a=_0x2f6e4e(this);if(!_0x37ab5a['length'])return _0x37ab5a;_0x1c5a6a=_0x2f6e4e[_0xba5d('0x4c')]({},_0x4d8c1b,_0x75a812);_0x37ab5a[_0xba5d('0x4d')]=new _0x2f6e4e[(_0xba5d('0x37'))](_0x2f6e4e(this));return _0x37ab5a;};_0x2f6e4e(function(){_0x2f6e4e(_0xba5d('0x4e'))[_0xba5d('0x37')]();});}}(this));
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
var _0xea23=['cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','emptyCart','call','clone','total','qtt','shipping','allTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','qd-ddc-prodLoaded','smartCheckout','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','items','totalizers','shippingData','function','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','empty','each','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodName','skuName','.qd-ddc-prodPrice','sellingPrice','Grátis','attr','.qd-ddc-quantity','val','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','getParent','.qd-ddc-wrapper','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','filter','[data-sku=\x27','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','timeRemoveNewItemClass','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','preventDefault','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','stop','remove','shippingCalculate','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','done','fail','data','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Oooops!\x20','allowRecalculate','buyButtonClicked','productId','prod_','prodId','.qd-bap-item-added','qd-bap-item-added','.qd-bap-wrapper','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','ajaxStop','.qdDdcContainer','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','replace','abs','undefined','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','error','message','object','info','warn','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','fromCharCode','charCodeAt','toUpperCase','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','name','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxProdAdd','find','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','texts'];(function(_0x1ebb67,_0x463653){var _0x14b431=function(_0x1dbc21){while(--_0x1dbc21){_0x1ebb67['push'](_0x1ebb67['shift']());}};_0x14b431(++_0x463653);}(_0xea23,0x8b));var _0x3ea2=function(_0x3c18f1,_0x42ad32){_0x3c18f1=_0x3c18f1-0x0;var _0x28e6b8=_0xea23[_0x3c18f1];return _0x28e6b8;};(function(_0x5b1a4f){_0x5b1a4f['fn']['getParent']=_0x5b1a4f['fn']['closest'];}(jQuery));function qd_number_format(_0x1f9c41,_0x3fb5a3,_0x4253d6,_0x880d98){_0x1f9c41=(_0x1f9c41+'')[_0x3ea2('0x0')](/[^0-9+\-Ee.]/g,'');_0x1f9c41=isFinite(+_0x1f9c41)?+_0x1f9c41:0x0;_0x3fb5a3=isFinite(+_0x3fb5a3)?Math[_0x3ea2('0x1')](_0x3fb5a3):0x0;_0x880d98='undefined'===typeof _0x880d98?',':_0x880d98;_0x4253d6=_0x3ea2('0x2')===typeof _0x4253d6?'.':_0x4253d6;var _0x44c8fe='',_0x44c8fe=function(_0x1384e0,_0x1c5796){var _0x3fb5a3=Math[_0x3ea2('0x3')](0xa,_0x1c5796);return''+(Math[_0x3ea2('0x4')](_0x1384e0*_0x3fb5a3)/_0x3fb5a3)[_0x3ea2('0x5')](_0x1c5796);},_0x44c8fe=(_0x3fb5a3?_0x44c8fe(_0x1f9c41,_0x3fb5a3):''+Math[_0x3ea2('0x4')](_0x1f9c41))[_0x3ea2('0x6')]('.');0x3<_0x44c8fe[0x0]['length']&&(_0x44c8fe[0x0]=_0x44c8fe[0x0][_0x3ea2('0x0')](/\B(?=(?:\d{3})+(?!\d))/g,_0x880d98));(_0x44c8fe[0x1]||'')[_0x3ea2('0x7')]<_0x3fb5a3&&(_0x44c8fe[0x1]=_0x44c8fe[0x1]||'',_0x44c8fe[0x1]+=Array(_0x3fb5a3-_0x44c8fe[0x1][_0x3ea2('0x7')]+0x1)['join']('0'));return _0x44c8fe[_0x3ea2('0x8')](_0x4253d6);};(function(){try{window[_0x3ea2('0x9')]=window['_QuatroDigital_CartData']||{},window[_0x3ea2('0x9')][_0x3ea2('0xa')]=window[_0x3ea2('0x9')]['callback']||$[_0x3ea2('0xb')]();}catch(_0x480cfd){'undefined'!==typeof console&&'function'===typeof console[_0x3ea2('0xc')]&&console[_0x3ea2('0xc')]('Oooops!\x20',_0x480cfd[_0x3ea2('0xd')]);}}());(function(_0x305d0a){try{var _0x4632f5=jQuery,_0x2d51d4=function(_0x22e747,_0x4e8d97){if(_0x3ea2('0xe')===typeof console&&_0x3ea2('0x2')!==typeof console['error']&&'undefined'!==typeof console[_0x3ea2('0xf')]&&_0x3ea2('0x2')!==typeof console[_0x3ea2('0x10')]){var _0x4e8729;_0x3ea2('0xe')===typeof _0x22e747?(_0x22e747['unshift'](_0x3ea2('0x11')),_0x4e8729=_0x22e747):_0x4e8729=[_0x3ea2('0x11')+_0x22e747];if(_0x3ea2('0x2')===typeof _0x4e8d97||'alerta'!==_0x4e8d97[_0x3ea2('0x12')]()&&_0x3ea2('0x13')!==_0x4e8d97[_0x3ea2('0x12')]())if(_0x3ea2('0x2')!==typeof _0x4e8d97&&_0x3ea2('0xf')===_0x4e8d97['toLowerCase']())try{console['info'][_0x3ea2('0x14')](console,_0x4e8729);}catch(_0x4c32ce){try{console['info'](_0x4e8729['join']('\x0a'));}catch(_0x3290ba){}}else try{console['error']['apply'](console,_0x4e8729);}catch(_0x1c83b4){try{console[_0x3ea2('0xc')](_0x4e8729[_0x3ea2('0x8')]('\x0a'));}catch(_0x127042){}}else try{console['warn'][_0x3ea2('0x14')](console,_0x4e8729);}catch(_0x43d3f3){try{console[_0x3ea2('0x10')](_0x4e8729['join']('\x0a'));}catch(_0x4e5181){}}}};window[_0x3ea2('0x15')]=window[_0x3ea2('0x15')]||{};window['_QuatroDigital_DropDown'][_0x3ea2('0x16')]=!0x0;_0x4632f5['QD_dropDownCart']=function(){};_0x4632f5['fn'][_0x3ea2('0x17')]=function(){return{'fn':new _0x4632f5()};};var _0x367f88=function(_0x5cbb9e){var _0x230e19={'i':'ragnevalp%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x19e330){var _0xb02f7a=function(_0x70a1a3){return _0x70a1a3;};var _0x5becf2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x19e330=_0x19e330['d'+_0x5becf2[0x10]+'c'+_0x5becf2[0x11]+'m'+_0xb02f7a(_0x5becf2[0x1])+'n'+_0x5becf2[0xd]]['l'+_0x5becf2[0x12]+'c'+_0x5becf2[0x0]+'ti'+_0xb02f7a('o')+'n'];var _0x1682c9=function(_0x494921){return escape(encodeURIComponent(_0x494921[_0x3ea2('0x0')](/\./g,'¨')[_0x3ea2('0x0')](/[a-zA-Z]/g,function(_0x174116){return String[_0x3ea2('0x18')](('Z'>=_0x174116?0x5a:0x7a)>=(_0x174116=_0x174116[_0x3ea2('0x19')](0x0)+0xd)?_0x174116:_0x174116-0x1a);})));};var _0x2df4d1=_0x1682c9(_0x19e330[[_0x5becf2[0x9],_0xb02f7a('o'),_0x5becf2[0xc],_0x5becf2[_0xb02f7a(0xd)]][_0x3ea2('0x8')]('')]);_0x1682c9=_0x1682c9((window[['js',_0xb02f7a('no'),'m',_0x5becf2[0x1],_0x5becf2[0x4][_0x3ea2('0x1a')](),_0x3ea2('0x1b')]['join']('')]||_0x3ea2('0x1c'))+['.v',_0x5becf2[0xd],'e',_0xb02f7a('x'),'co',_0xb02f7a('mm'),'erc',_0x5becf2[0x1],'.c',_0xb02f7a('o'),'m.',_0x5becf2[0x13],'r'][_0x3ea2('0x8')](''));for(var _0x50d2ba in _0x230e19){if(_0x1682c9===_0x50d2ba+_0x230e19[_0x50d2ba]||_0x2df4d1===_0x50d2ba+_0x230e19[_0x50d2ba]){var _0x177d26='tr'+_0x5becf2[0x11]+'e';break;}_0x177d26='f'+_0x5becf2[0x0]+'ls'+_0xb02f7a(_0x5becf2[0x1])+'';}_0xb02f7a=!0x1;-0x1<_0x19e330[[_0x5becf2[0xc],'e',_0x5becf2[0x0],'rc',_0x5becf2[0x9]][_0x3ea2('0x8')]('')]['indexOf'](_0x3ea2('0x1d'))&&(_0xb02f7a=!0x0);return[_0x177d26,_0xb02f7a];}(_0x5cbb9e);}(window);if(!eval(_0x367f88[0x0]))return _0x367f88[0x1]?_0x2d51d4(_0x3ea2('0x1e')):!0x1;_0x4632f5[_0x3ea2('0x17')]=function(_0x512340,_0x10e6f0){var _0x1cca74=_0x4632f5(_0x512340);if(!_0x1cca74[_0x3ea2('0x7')])return _0x1cca74;var _0x5ca5ef=_0x4632f5[_0x3ea2('0x1f')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x3ea2('0x20'),'linkCheckout':_0x3ea2('0x21'),'cartTotal':_0x3ea2('0x22'),'emptyCart':_0x3ea2('0x23'),'continueShopping':_0x3ea2('0x24'),'shippingForm':_0x3ea2('0x25')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x505b79){return _0x505b79['skuName']||_0x505b79[_0x3ea2('0x26')];},'callback':function(){},'callbackProductsList':function(){}},_0x10e6f0);_0x4632f5('');var _0x28497c=this;if(_0x5ca5ef['smartCheckout']){var _0x431eef=!0x1;_0x3ea2('0x2')===typeof window[_0x3ea2('0x27')]&&(_0x2d51d4(_0x3ea2('0x28')),_0x4632f5[_0x3ea2('0x29')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x3ea2('0x2a'),'error':function(){_0x2d51d4(_0x3ea2('0x2b'));_0x431eef=!0x0;}}));if(_0x431eef)return _0x2d51d4('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x3ea2('0xe')===typeof window[_0x3ea2('0x27')]&&'undefined'!==typeof window[_0x3ea2('0x27')][_0x3ea2('0x2c')])var _0x305d0a=window[_0x3ea2('0x27')]['checkout'];else if(_0x3ea2('0xe')===typeof vtex&&_0x3ea2('0xe')===typeof vtex[_0x3ea2('0x2c')]&&_0x3ea2('0x2')!==typeof vtex[_0x3ea2('0x2c')][_0x3ea2('0x2d')])_0x305d0a=new vtex[(_0x3ea2('0x2c'))]['SDK']();else return _0x2d51d4(_0x3ea2('0x2e'));_0x28497c[_0x3ea2('0x2f')]=_0x3ea2('0x30');var _0x55ea98=function(_0x23c2ea){_0x4632f5(this)[_0x3ea2('0x31')](_0x23c2ea);_0x23c2ea['find'](_0x3ea2('0x32'))[_0x3ea2('0x33')](_0x4632f5(_0x3ea2('0x34')))['on'](_0x3ea2('0x35'),function(){_0x1cca74[_0x3ea2('0x36')]('qd-bb-lightBoxProdAdd');_0x4632f5(document[_0x3ea2('0x37')])[_0x3ea2('0x36')](_0x3ea2('0x38'));});_0x4632f5(document)[_0x3ea2('0x39')](_0x3ea2('0x3a'))['on']('keyup.qd_ddc_closeFn',function(_0x3f1171){0x1b==_0x3f1171[_0x3ea2('0x3b')]&&(_0x1cca74[_0x3ea2('0x36')](_0x3ea2('0x3c')),_0x4632f5(document['body'])[_0x3ea2('0x36')]('qd-bb-lightBoxBodyProdAdd'));});var _0x116a30=_0x23c2ea[_0x3ea2('0x3d')](_0x3ea2('0x3e'));_0x23c2ea[_0x3ea2('0x3d')]('.qd-ddc-scrollUp')['on'](_0x3ea2('0x3f'),function(){_0x28497c[_0x3ea2('0x40')]('-',void 0x0,void 0x0,_0x116a30);return!0x1;});_0x23c2ea['find'](_0x3ea2('0x41'))['on'](_0x3ea2('0x42'),function(){_0x28497c[_0x3ea2('0x40')](void 0x0,void 0x0,void 0x0,_0x116a30);return!0x1;});_0x23c2ea[_0x3ea2('0x3d')](_0x3ea2('0x43'))['val']('')['on'](_0x3ea2('0x44'),function(){_0x28497c['shippingCalculate'](_0x4632f5(this));});if(_0x5ca5ef[_0x3ea2('0x45')]){var _0x10e6f0=0x0;_0x4632f5(this)['on'](_0x3ea2('0x46'),function(){var _0x23c2ea=function(){window[_0x3ea2('0x15')]['allowUpdate']&&(_0x28497c[_0x3ea2('0x47')](),window[_0x3ea2('0x15')]['allowUpdate']=!0x1,_0x4632f5['fn'][_0x3ea2('0x48')](!0x0),_0x28497c['cartIsEmpty']());};_0x10e6f0=setInterval(function(){_0x23c2ea();},0x258);_0x23c2ea();});_0x4632f5(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x10e6f0);});}};var _0x137801=function(_0x49f39c){_0x49f39c=_0x4632f5(_0x49f39c);_0x5ca5ef[_0x3ea2('0x49')]['cartTotal']=_0x5ca5ef['texts'][_0x3ea2('0x4a')][_0x3ea2('0x0')](_0x3ea2('0x4b'),_0x3ea2('0x4c'));_0x5ca5ef[_0x3ea2('0x49')][_0x3ea2('0x4a')]=_0x5ca5ef[_0x3ea2('0x49')][_0x3ea2('0x4a')][_0x3ea2('0x0')](_0x3ea2('0x4d'),_0x3ea2('0x4e'));_0x5ca5ef['texts']['cartTotal']=_0x5ca5ef['texts']['cartTotal'][_0x3ea2('0x0')](_0x3ea2('0x4f'),_0x3ea2('0x50'));_0x5ca5ef[_0x3ea2('0x49')]['cartTotal']=_0x5ca5ef[_0x3ea2('0x49')]['cartTotal']['replace']('#total',_0x3ea2('0x51'));_0x49f39c['find'](_0x3ea2('0x52'))[_0x3ea2('0x53')](_0x5ca5ef[_0x3ea2('0x49')][_0x3ea2('0x54')]);_0x49f39c[_0x3ea2('0x3d')](_0x3ea2('0x55'))[_0x3ea2('0x53')](_0x5ca5ef[_0x3ea2('0x49')][_0x3ea2('0x56')]);_0x49f39c[_0x3ea2('0x3d')](_0x3ea2('0x57'))[_0x3ea2('0x53')](_0x5ca5ef[_0x3ea2('0x49')][_0x3ea2('0x58')]);_0x49f39c[_0x3ea2('0x3d')](_0x3ea2('0x59'))[_0x3ea2('0x53')](_0x5ca5ef[_0x3ea2('0x49')]['cartTotal']);_0x49f39c[_0x3ea2('0x3d')](_0x3ea2('0x5a'))[_0x3ea2('0x53')](_0x5ca5ef['texts'][_0x3ea2('0x5b')]);_0x49f39c[_0x3ea2('0x3d')]('.qd-ddc-emptyCart\x20p')['html'](_0x5ca5ef[_0x3ea2('0x49')][_0x3ea2('0x5c')]);return _0x49f39c;}(this[_0x3ea2('0x2f')]);var _0x3dce06=0x0;_0x1cca74['each'](function(){0x0<_0x3dce06?_0x55ea98[_0x3ea2('0x5d')](this,_0x137801[_0x3ea2('0x5e')]()):_0x55ea98[_0x3ea2('0x5d')](this,_0x137801);_0x3dce06++;});window['_QuatroDigital_CartData'][_0x3ea2('0xa')][_0x3ea2('0x33')](function(){_0x4632f5('.qd-ddc-infoTotalValue')['html'](window[_0x3ea2('0x9')][_0x3ea2('0x5f')]||'--');_0x4632f5('.qd-ddc-infoTotalItems')['html'](window[_0x3ea2('0x9')][_0x3ea2('0x60')]||'0');_0x4632f5('.qd-ddc-infoTotalShipping')[_0x3ea2('0x53')](window['_QuatroDigital_CartData'][_0x3ea2('0x61')]||'--');_0x4632f5('.qd-ddc-infoAllTotal')['html'](window['_QuatroDigital_CartData'][_0x3ea2('0x62')]||'--');});var _0x19d691=function(_0x1a9662,_0xef5f10){if(_0x3ea2('0x2')===typeof _0x1a9662['items'])return _0x2d51d4(_0x3ea2('0x63'));_0x28497c['renderProductsList'][_0x3ea2('0x5d')](this,_0xef5f10);};_0x28497c[_0x3ea2('0x47')]=function(_0x3cf38a,_0x395b85){_0x3ea2('0x2')!=typeof _0x395b85?window[_0x3ea2('0x15')][_0x3ea2('0x64')]=_0x395b85:window[_0x3ea2('0x15')][_0x3ea2('0x64')]&&(_0x395b85=window[_0x3ea2('0x15')][_0x3ea2('0x64')]);setTimeout(function(){window[_0x3ea2('0x15')]['dataOptionsCache']=void 0x0;},_0x5ca5ef['timeRemoveNewItemClass']);_0x4632f5('.qd-ddc-wrapper')['removeClass'](_0x3ea2('0x65'));if(_0x5ca5ef[_0x3ea2('0x66')]){var _0x10e6f0=function(_0x4f7bed){window[_0x3ea2('0x15')][_0x3ea2('0x67')]=_0x4f7bed;_0x19d691(_0x4f7bed,_0x395b85);_0x3ea2('0x2')!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window[_0x3ea2('0x68')][_0x3ea2('0x69')]&&window[_0x3ea2('0x68')][_0x3ea2('0x69')]['call'](this);_0x4632f5('.qd-ddc-wrapper')[_0x3ea2('0x6a')](_0x3ea2('0x65'));};_0x3ea2('0x2')!==typeof window['_QuatroDigital_DropDown'][_0x3ea2('0x67')]?(_0x10e6f0(window[_0x3ea2('0x15')]['getOrderForm']),'function'===typeof _0x3cf38a&&_0x3cf38a(window['_QuatroDigital_DropDown'][_0x3ea2('0x67')])):_0x4632f5[_0x3ea2('0x6b')]([_0x3ea2('0x6c'),_0x3ea2('0x6d'),_0x3ea2('0x6e')],{'done':function(_0x1803d7){_0x10e6f0[_0x3ea2('0x5d')](this,_0x1803d7);_0x3ea2('0x6f')===typeof _0x3cf38a&&_0x3cf38a(_0x1803d7);},'fail':function(_0xaa93af){_0x2d51d4(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0xaa93af]);}});}else alert(_0x3ea2('0x70'));};_0x28497c[_0x3ea2('0x71')]=function(){var _0xfa1396=_0x4632f5('.qd-ddc-wrapper');_0xfa1396[_0x3ea2('0x3d')](_0x3ea2('0x72'))[_0x3ea2('0x7')]?_0xfa1396[_0x3ea2('0x36')](_0x3ea2('0x73')):_0xfa1396['addClass'](_0x3ea2('0x73'));};_0x28497c[_0x3ea2('0x74')]=function(_0x4014f4){var _0x10e6f0=_0x4632f5('.qd-ddc-prodWrapper2');_0x10e6f0[_0x3ea2('0x75')]();_0x10e6f0[_0x3ea2('0x76')](function(){var _0x10e6f0=_0x4632f5(this),_0x165e0f,_0x512340,_0x1c170a=_0x4632f5(''),_0x106125;for(_0x106125 in window['_QuatroDigital_DropDown'][_0x3ea2('0x67')][_0x3ea2('0x6c')])if('object'===typeof window[_0x3ea2('0x15')][_0x3ea2('0x67')]['items'][_0x106125]){var _0x1769f4=window['_QuatroDigital_DropDown'][_0x3ea2('0x67')][_0x3ea2('0x6c')][_0x106125];var _0x30bc86=_0x1769f4[_0x3ea2('0x77')][_0x3ea2('0x0')](/^\/|\/$/g,'')[_0x3ea2('0x6')]('/');var _0x23c8c6=_0x4632f5('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x23c8c6['attr']({'data-sku':_0x1769f4['id'],'data-sku-index':_0x106125,'data-qd-departament':_0x30bc86[0x0],'data-qd-category':_0x30bc86[_0x30bc86[_0x3ea2('0x7')]-0x1]});_0x23c8c6[_0x3ea2('0x6a')](_0x3ea2('0x78')+_0x1769f4[_0x3ea2('0x79')]);_0x23c8c6[_0x3ea2('0x3d')](_0x3ea2('0x7a'))['append'](_0x5ca5ef[_0x3ea2('0x7b')](_0x1769f4));_0x23c8c6['find'](_0x3ea2('0x7c'))[_0x3ea2('0x31')](isNaN(_0x1769f4[_0x3ea2('0x7d')])?_0x1769f4[_0x3ea2('0x7d')]:0x0==_0x1769f4[_0x3ea2('0x7d')]?_0x3ea2('0x7e'):(_0x4632f5('meta[name=currency]')[_0x3ea2('0x7f')]('content')||'R$')+'\x20'+qd_number_format(_0x1769f4['sellingPrice']/0x64,0x2,',','.'));_0x23c8c6[_0x3ea2('0x3d')](_0x3ea2('0x80'))[_0x3ea2('0x7f')]({'data-sku':_0x1769f4['id'],'data-sku-index':_0x106125})[_0x3ea2('0x81')](_0x1769f4[_0x3ea2('0x82')]);_0x23c8c6[_0x3ea2('0x3d')](_0x3ea2('0x83'))['attr']({'data-sku':_0x1769f4['id'],'data-sku-index':_0x106125});_0x28497c[_0x3ea2('0x84')](_0x1769f4['id'],_0x23c8c6[_0x3ea2('0x3d')]('.qd-ddc-image'),_0x1769f4['imageUrl']);_0x23c8c6[_0x3ea2('0x3d')](_0x3ea2('0x85'))[_0x3ea2('0x7f')]({'data-sku':_0x1769f4['id'],'data-sku-index':_0x106125});_0x23c8c6[_0x3ea2('0x86')](_0x10e6f0);_0x1c170a=_0x1c170a[_0x3ea2('0x33')](_0x23c8c6);}try{var _0x305d0a=_0x10e6f0[_0x3ea2('0x87')](_0x3ea2('0x88'))['find'](_0x3ea2('0x43'));_0x305d0a[_0x3ea2('0x7')]&&''==_0x305d0a[_0x3ea2('0x81')]()&&window[_0x3ea2('0x15')][_0x3ea2('0x67')]['shippingData'][_0x3ea2('0x89')]&&_0x305d0a[_0x3ea2('0x81')](window['_QuatroDigital_DropDown']['getOrderForm'][_0x3ea2('0x6e')]['address'][_0x3ea2('0x8a')]);}catch(_0x2ca578){_0x2d51d4(_0x3ea2('0x8b')+_0x2ca578['message'],'aviso');}_0x28497c['actionButtons'](_0x10e6f0);_0x28497c[_0x3ea2('0x71')]();_0x4014f4&&_0x4014f4['lastSku']&&function(){_0x512340=_0x1c170a[_0x3ea2('0x8c')](_0x3ea2('0x8d')+_0x4014f4[_0x3ea2('0x8e')]+'\x27]');_0x512340[_0x3ea2('0x7')]&&(_0x165e0f=0x0,_0x1c170a[_0x3ea2('0x76')](function(){var _0x4014f4=_0x4632f5(this);if(_0x4014f4['is'](_0x512340))return!0x1;_0x165e0f+=_0x4014f4[_0x3ea2('0x8f')]();}),_0x28497c[_0x3ea2('0x40')](void 0x0,void 0x0,_0x165e0f,_0x10e6f0['add'](_0x10e6f0['parent']())),_0x1c170a[_0x3ea2('0x36')](_0x3ea2('0x90')),function(_0x5333e1){_0x5333e1[_0x3ea2('0x6a')]('qd-ddc-lastAdded');_0x5333e1[_0x3ea2('0x6a')](_0x3ea2('0x90'));setTimeout(function(){_0x5333e1[_0x3ea2('0x36')](_0x3ea2('0x91'));},_0x5ca5ef['timeRemoveNewItemClass']);}(_0x512340),_0x4632f5(document[_0x3ea2('0x37')])[_0x3ea2('0x6a')](_0x3ea2('0x92')),setTimeout(function(){_0x4632f5(document[_0x3ea2('0x37')])[_0x3ea2('0x36')]('qd-ddc-product-add-time-v2');},_0x5ca5ef[_0x3ea2('0x93')]));}();});(function(){_QuatroDigital_DropDown[_0x3ea2('0x67')]['items'][_0x3ea2('0x7')]?(_0x4632f5('body')[_0x3ea2('0x36')](_0x3ea2('0x94'))['addClass'](_0x3ea2('0x95')),setTimeout(function(){_0x4632f5(_0x3ea2('0x37'))[_0x3ea2('0x36')](_0x3ea2('0x96'));},_0x5ca5ef[_0x3ea2('0x93')])):_0x4632f5('body')[_0x3ea2('0x36')](_0x3ea2('0x97'))['addClass']('qd-ddc-cart-empty');}());_0x3ea2('0x6f')===typeof _0x5ca5ef[_0x3ea2('0x98')]?_0x5ca5ef['callbackProductsList']['call'](this):_0x2d51d4('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x28497c[_0x3ea2('0x84')]=function(_0x5a13e6,_0x3dfca4,_0x3f8020){function _0x43d178(){_0x3dfca4[_0x3ea2('0x36')](_0x3ea2('0x99'))[_0x3ea2('0x9a')](function(){_0x4632f5(this)[_0x3ea2('0x6a')]('qd-loaded');})[_0x3ea2('0x7f')](_0x3ea2('0x9b'),_0x3f8020);}_0x3f8020?_0x43d178():isNaN(_0x5a13e6)?_0x2d51d4(_0x3ea2('0x9c'),'alerta'):alert(_0x3ea2('0x9d'));};_0x28497c['actionButtons']=function(_0x34b199){var _0x10e6f0=function(_0x574ddf,_0x491b6b){var _0x272d05=_0x4632f5(_0x574ddf);var _0xba5768=_0x272d05[_0x3ea2('0x7f')](_0x3ea2('0x9e'));var _0x512340=_0x272d05[_0x3ea2('0x7f')](_0x3ea2('0x9f'));if(_0xba5768){var _0x323b65=parseInt(_0x272d05[_0x3ea2('0x81')]())||0x1;_0x28497c['changeQantity']([_0xba5768,_0x512340],_0x323b65,_0x323b65+0x1,function(_0x5791ad){_0x272d05[_0x3ea2('0x81')](_0x5791ad);_0x3ea2('0x6f')===typeof _0x491b6b&&_0x491b6b();});}};var _0xfc7ea0=function(_0x3ece43,_0x3c58f4){var _0x302085=_0x4632f5(_0x3ece43);var _0x512340=_0x302085[_0x3ea2('0x7f')](_0x3ea2('0x9e'));var _0x34a76e=_0x302085[_0x3ea2('0x7f')](_0x3ea2('0x9f'));if(_0x512340){var _0x2bcb56=parseInt(_0x302085[_0x3ea2('0x81')]())||0x2;_0x28497c['changeQantity']([_0x512340,_0x34a76e],_0x2bcb56,_0x2bcb56-0x1,function(_0x11f435){_0x302085[_0x3ea2('0x81')](_0x11f435);'function'===typeof _0x3c58f4&&_0x3c58f4();});}};var _0x25cb67=function(_0x148030,_0x1e4251){var _0x10e6f0=_0x4632f5(_0x148030);var _0x512340=_0x10e6f0['attr']('data-sku');var _0x533197=_0x10e6f0[_0x3ea2('0x7f')]('data-sku-index');if(_0x512340){var _0x14d240=parseInt(_0x10e6f0[_0x3ea2('0x81')]())||0x1;_0x28497c[_0x3ea2('0xa0')]([_0x512340,_0x533197],0x1,_0x14d240,function(_0x4fecc7){_0x10e6f0[_0x3ea2('0x81')](_0x4fecc7);_0x3ea2('0x6f')===typeof _0x1e4251&&_0x1e4251();});}};var _0x512340=_0x34b199[_0x3ea2('0x3d')](_0x3ea2('0xa1'));_0x512340['addClass']('qd_on')['each'](function(){var _0x34b199=_0x4632f5(this);_0x34b199['find']('.qd-ddc-quantityMore')['on']('click.qd_ddc_more',function(_0x1fe3b2){_0x1fe3b2[_0x3ea2('0xa2')]();_0x512340[_0x3ea2('0x6a')]('qd-loading');_0x10e6f0(_0x34b199[_0x3ea2('0x3d')](_0x3ea2('0x80')),function(){_0x512340['removeClass'](_0x3ea2('0xa3'));});});_0x34b199[_0x3ea2('0x3d')](_0x3ea2('0xa4'))['on'](_0x3ea2('0xa5'),function(_0x176350){_0x176350[_0x3ea2('0xa2')]();_0x512340[_0x3ea2('0x6a')](_0x3ea2('0xa3'));_0xfc7ea0(_0x34b199['find']('.qd-ddc-quantity'),function(){_0x512340[_0x3ea2('0x36')](_0x3ea2('0xa3'));});});_0x34b199[_0x3ea2('0x3d')](_0x3ea2('0x80'))['on'](_0x3ea2('0xa6'),function(){_0x512340['addClass']('qd-loading');_0x25cb67(this,function(){_0x512340[_0x3ea2('0x36')]('qd-loading');});});_0x34b199[_0x3ea2('0x3d')](_0x3ea2('0x80'))['on'](_0x3ea2('0xa7'),function(_0x15fcd6){0xd==_0x15fcd6[_0x3ea2('0x3b')]&&(_0x512340[_0x3ea2('0x6a')]('qd-loading'),_0x25cb67(this,function(){_0x512340[_0x3ea2('0x36')](_0x3ea2('0xa3'));}));});});_0x34b199[_0x3ea2('0x3d')](_0x3ea2('0x72'))[_0x3ea2('0x76')](function(){var _0x34b199=_0x4632f5(this);_0x34b199[_0x3ea2('0x3d')]('.qd-ddc-remove')['on'](_0x3ea2('0xa8'),function(){_0x34b199['addClass']('qd-loading');_0x28497c['removeProduct'](_0x4632f5(this),function(_0xde23b2){_0xde23b2?_0x34b199[_0x3ea2('0xa9')](!0x0)['slideUp'](function(){_0x34b199[_0x3ea2('0xaa')]();_0x28497c[_0x3ea2('0x71')]();}):_0x34b199['removeClass'](_0x3ea2('0xa3'));});return!0x1;});});};_0x28497c[_0x3ea2('0xab')]=function(_0x80db5f){var _0x285abf=_0x80db5f['val']();_0x285abf=_0x285abf[_0x3ea2('0x0')](/[^0-9\-]/g,'');_0x285abf=_0x285abf[_0x3ea2('0x0')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x3ea2('0xac'));_0x285abf=_0x285abf[_0x3ea2('0x0')](/(.{9}).*/g,'$1');_0x80db5f[_0x3ea2('0x81')](_0x285abf);0x9<=_0x285abf[_0x3ea2('0x7')]&&(_0x80db5f['data'](_0x3ea2('0xad'))!=_0x285abf&&_0x305d0a[_0x3ea2('0xae')]({'postalCode':_0x285abf,'country':_0x3ea2('0xaf')})[_0x3ea2('0xb0')](function(_0x5f3844){window[_0x3ea2('0x15')][_0x3ea2('0x67')]=_0x5f3844;_0x28497c[_0x3ea2('0x47')]();})[_0x3ea2('0xb1')](function(_0x2cd52e){_0x2d51d4(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x2cd52e]);updateCartData();}),_0x80db5f[_0x3ea2('0xb2')](_0x3ea2('0xad'),_0x285abf));};_0x28497c['changeQantity']=function(_0x27144b,_0x3a9719,_0x1cbd00,_0x3f1672){function _0x469984(_0x2ddc50){_0x2ddc50=_0x3ea2('0xb3')!==typeof _0x2ddc50?!0x1:_0x2ddc50;_0x28497c[_0x3ea2('0x47')]();window[_0x3ea2('0x15')][_0x3ea2('0x16')]=!0x1;_0x28497c[_0x3ea2('0x71')]();_0x3ea2('0x2')!==typeof window[_0x3ea2('0x68')]&&_0x3ea2('0x6f')===typeof window[_0x3ea2('0x68')][_0x3ea2('0x69')]&&window[_0x3ea2('0x68')][_0x3ea2('0x69')][_0x3ea2('0x5d')](this);_0x3ea2('0x6f')===typeof adminCart&&adminCart();_0x4632f5['fn']['simpleCart'](!0x0,void 0x0,_0x2ddc50);_0x3ea2('0x6f')===typeof _0x3f1672&&_0x3f1672(_0x3a9719);}_0x1cbd00=_0x1cbd00||0x1;if(0x1>_0x1cbd00)return _0x3a9719;if(_0x5ca5ef['smartCheckout']){if(_0x3ea2('0x2')===typeof window[_0x3ea2('0x15')][_0x3ea2('0x67')][_0x3ea2('0x6c')][_0x27144b[0x1]])return _0x2d51d4(_0x3ea2('0xb4')+_0x27144b[0x1]+']'),_0x3a9719;window[_0x3ea2('0x15')]['getOrderForm'][_0x3ea2('0x6c')][_0x27144b[0x1]][_0x3ea2('0x82')]=_0x1cbd00;window[_0x3ea2('0x15')][_0x3ea2('0x67')][_0x3ea2('0x6c')][_0x27144b[0x1]][_0x3ea2('0xb5')]=_0x27144b[0x1];_0x305d0a[_0x3ea2('0xb6')]([window[_0x3ea2('0x15')][_0x3ea2('0x67')][_0x3ea2('0x6c')][_0x27144b[0x1]]],[_0x3ea2('0x6c'),'totalizers',_0x3ea2('0x6e')])[_0x3ea2('0xb0')](function(_0x1c8ce7){window[_0x3ea2('0x15')]['getOrderForm']=_0x1c8ce7;_0x469984(!0x0);})[_0x3ea2('0xb1')](function(_0x135d96){_0x2d51d4([_0x3ea2('0xb7'),_0x135d96]);_0x469984();});}else _0x2d51d4(_0x3ea2('0xb8'));};_0x28497c[_0x3ea2('0xb9')]=function(_0x1bba0d,_0x1a2c8b){function _0x50bd5a(_0x1ad639){_0x1ad639=_0x3ea2('0xb3')!==typeof _0x1ad639?!0x1:_0x1ad639;_0x3ea2('0x2')!==typeof window[_0x3ea2('0x68')]&&_0x3ea2('0x6f')===typeof window[_0x3ea2('0x68')]['exec']&&window[_0x3ea2('0x68')]['exec'][_0x3ea2('0x5d')](this);_0x3ea2('0x6f')===typeof adminCart&&adminCart();_0x4632f5['fn'][_0x3ea2('0x48')](!0x0,void 0x0,_0x1ad639);'function'===typeof _0x1a2c8b&&_0x1a2c8b(_0x512340);}var _0x512340=!0x1,_0x3da2b7=_0x4632f5(_0x1bba0d)[_0x3ea2('0x7f')](_0x3ea2('0x9f'));if(_0x5ca5ef[_0x3ea2('0x66')]){if(_0x3ea2('0x2')===typeof window['_QuatroDigital_DropDown'][_0x3ea2('0x67')][_0x3ea2('0x6c')][_0x3da2b7])return _0x2d51d4(_0x3ea2('0xb4')+_0x3da2b7+']'),_0x512340;window['_QuatroDigital_DropDown']['getOrderForm'][_0x3ea2('0x6c')][_0x3da2b7][_0x3ea2('0xb5')]=_0x3da2b7;_0x305d0a[_0x3ea2('0xba')]([window[_0x3ea2('0x15')]['getOrderForm'][_0x3ea2('0x6c')][_0x3da2b7]],[_0x3ea2('0x6c'),'totalizers',_0x3ea2('0x6e')])['done'](function(_0x45c4d7){_0x512340=!0x0;window[_0x3ea2('0x15')][_0x3ea2('0x67')]=_0x45c4d7;_0x19d691(_0x45c4d7);_0x50bd5a(!0x0);})[_0x3ea2('0xb1')](function(_0x747f56){_0x2d51d4([_0x3ea2('0xbb'),_0x747f56]);_0x50bd5a();});}else alert(_0x3ea2('0xbc'));};_0x28497c['scrollCart']=function(_0x5430d9,_0xba81a1,_0x236349,_0xc47d12){_0xc47d12=_0xc47d12||_0x4632f5(_0x3ea2('0xbd'));_0x5430d9=_0x5430d9||'+';_0xba81a1=_0xba81a1||0.9*_0xc47d12['height']();_0xc47d12['stop'](!0x0,!0x0)[_0x3ea2('0xbe')]({'scrollTop':isNaN(_0x236349)?_0x5430d9+'='+_0xba81a1+'px':_0x236349});};_0x5ca5ef[_0x3ea2('0x45')]||(_0x28497c[_0x3ea2('0x47')](),_0x4632f5['fn']['simpleCart'](!0x0));_0x4632f5(window)['on'](_0x3ea2('0xbf'),function(){try{window[_0x3ea2('0x15')]['getOrderForm']=void 0x0,_0x28497c[_0x3ea2('0x47')]();}catch(_0x214b60){_0x2d51d4(_0x3ea2('0xc0')+_0x214b60['message'],'avisso');}});_0x3ea2('0x6f')===typeof _0x5ca5ef[_0x3ea2('0xa')]?_0x5ca5ef[_0x3ea2('0xa')][_0x3ea2('0x5d')](this):_0x2d51d4('Callback\x20não\x20é\x20uma\x20função');};_0x4632f5['fn'][_0x3ea2('0x17')]=function(_0x1b3d84){var _0x594f91=_0x4632f5(this);_0x594f91['fn']=new _0x4632f5[(_0x3ea2('0x17'))](this,_0x1b3d84);return _0x594f91;};}catch(_0x346442){_0x3ea2('0x2')!==typeof console&&_0x3ea2('0x6f')===typeof console[_0x3ea2('0xc')]&&console['error'](_0x3ea2('0xc1'),_0x346442);}}(this));(function(_0x53976e){try{var _0x15bf51=jQuery;window[_0x3ea2('0x68')]=window[_0x3ea2('0x68')]||{};window[_0x3ea2('0x68')][_0x3ea2('0x6c')]={};window[_0x3ea2('0x68')][_0x3ea2('0xc2')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x3ea2('0xc3')]=!0x1;window[_0x3ea2('0x68')]['quickViewUpdate']=!0x1;var _0x265e7c=function(){if(window[_0x3ea2('0x68')]['allowRecalculate']){var _0x4a4f3b=!0x1;var _0x4190c7={};window['_QuatroDigital_AmountProduct'][_0x3ea2('0x6c')]={};for(_0x5812ef in window[_0x3ea2('0x15')]['getOrderForm']['items'])if(_0x3ea2('0xe')===typeof window[_0x3ea2('0x15')][_0x3ea2('0x67')][_0x3ea2('0x6c')][_0x5812ef]){var _0x437b7b=window['_QuatroDigital_DropDown'][_0x3ea2('0x67')][_0x3ea2('0x6c')][_0x5812ef];_0x3ea2('0x2')!==typeof _0x437b7b[_0x3ea2('0xc4')]&&null!==_0x437b7b[_0x3ea2('0xc4')]&&''!==_0x437b7b['productId']&&(window[_0x3ea2('0x68')]['items'][_0x3ea2('0xc5')+_0x437b7b[_0x3ea2('0xc4')]]=window[_0x3ea2('0x68')][_0x3ea2('0x6c')][_0x3ea2('0xc5')+_0x437b7b['productId']]||{},window['_QuatroDigital_AmountProduct'][_0x3ea2('0x6c')][_0x3ea2('0xc5')+_0x437b7b[_0x3ea2('0xc4')]][_0x3ea2('0xc6')]=_0x437b7b['productId'],_0x4190c7['prod_'+_0x437b7b[_0x3ea2('0xc4')]]||(window[_0x3ea2('0x68')][_0x3ea2('0x6c')][_0x3ea2('0xc5')+_0x437b7b[_0x3ea2('0xc4')]][_0x3ea2('0x60')]=0x0),window[_0x3ea2('0x68')][_0x3ea2('0x6c')][_0x3ea2('0xc5')+_0x437b7b[_0x3ea2('0xc4')]]['qtt']+=_0x437b7b['quantity'],_0x4a4f3b=!0x0,_0x4190c7[_0x3ea2('0xc5')+_0x437b7b[_0x3ea2('0xc4')]]=!0x0);}var _0x5812ef=_0x4a4f3b;}else _0x5812ef=void 0x0;window[_0x3ea2('0x68')][_0x3ea2('0xc2')]&&(_0x15bf51('.qd-bap-wrapper')[_0x3ea2('0xaa')](),_0x15bf51(_0x3ea2('0xc7'))[_0x3ea2('0x36')](_0x3ea2('0xc8')));for(var _0x1b0207 in window[_0x3ea2('0x68')][_0x3ea2('0x6c')]){_0x437b7b=window[_0x3ea2('0x68')]['items'][_0x1b0207];if(_0x3ea2('0xe')!==typeof _0x437b7b)return;_0x4190c7=_0x15bf51('input.qd-productId[value='+_0x437b7b[_0x3ea2('0xc6')]+']')[_0x3ea2('0x87')]('li');if(window['_QuatroDigital_AmountProduct'][_0x3ea2('0xc2')]||!_0x4190c7['find'](_0x3ea2('0xc9'))[_0x3ea2('0x7')])_0x4a4f3b=_0x15bf51('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x4a4f3b[_0x3ea2('0x3d')](_0x3ea2('0xca'))[_0x3ea2('0x53')](_0x437b7b[_0x3ea2('0x60')]),_0x437b7b=_0x4190c7['find'](_0x3ea2('0xcb')),_0x437b7b[_0x3ea2('0x7')]?_0x437b7b[_0x3ea2('0xcc')](_0x4a4f3b)[_0x3ea2('0x6a')]('qd-bap-item-added'):_0x4190c7[_0x3ea2('0xcc')](_0x4a4f3b);}_0x5812ef&&(window[_0x3ea2('0x68')][_0x3ea2('0xc2')]=!0x1);};window[_0x3ea2('0x68')][_0x3ea2('0x69')]=function(){window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x0;_0x265e7c[_0x3ea2('0x5d')](this);};_0x15bf51(document)[_0x3ea2('0xcd')](function(){_0x265e7c[_0x3ea2('0x5d')](this);});}catch(_0x44dabe){_0x3ea2('0x2')!==typeof console&&_0x3ea2('0x6f')===typeof console[_0x3ea2('0xc')]&&console[_0x3ea2('0xc')](_0x3ea2('0xc1'),_0x44dabe);}}(this));(function(){try{var _0x3e676b=jQuery,_0x1d417e,_0x5df116={'selector':_0x3ea2('0xce'),'dropDown':{},'buyButton':{}};_0x3e676b['QD_smartCart']=function(_0xbfa8af){var _0x434b46={};_0x1d417e=_0x3e676b[_0x3ea2('0x1f')](!0x0,{},_0x5df116,_0xbfa8af);_0xbfa8af=_0x3e676b(_0x1d417e[_0x3ea2('0xcf')])[_0x3ea2('0x17')](_0x1d417e[_0x3ea2('0xd0')]);_0x434b46[_0x3ea2('0xd1')]=_0x3ea2('0x2')!==typeof _0x1d417e[_0x3ea2('0xd0')][_0x3ea2('0x45')]&&!0x1===_0x1d417e[_0x3ea2('0xd0')][_0x3ea2('0x45')]?_0x3e676b(_0x1d417e[_0x3ea2('0xcf')])[_0x3ea2('0xd2')](_0xbfa8af['fn'],_0x1d417e[_0x3ea2('0xd1')]):_0x3e676b(_0x1d417e[_0x3ea2('0xcf')])[_0x3ea2('0xd2')](_0x1d417e['buyButton']);_0x434b46[_0x3ea2('0xd0')]=_0xbfa8af;return _0x434b46;};_0x3e676b['fn'][_0x3ea2('0xd3')]=function(){_0x3ea2('0xe')===typeof console&&'function'===typeof console[_0x3ea2('0xf')]&&console['info'](_0x3ea2('0xd4'));};_0x3e676b['smartCart']=_0x3e676b['fn']['smartCart'];}catch(_0x5a7d03){_0x3ea2('0x2')!==typeof console&&_0x3ea2('0x6f')===typeof console[_0x3ea2('0xc')]&&console[_0x3ea2('0xc')]('Oooops!\x20',_0x5a7d03);}}());