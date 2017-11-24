/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});"function"!=typeof String.prototype.capitalize&&(String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1).toLowerCase()});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E",
"\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.vtexBindQuickViewDestroy();
			Common.applyMosaicCategorieBanners();
			Common.applyCarouselShelf();
			Common.applyTipBarCarousel();
			Common.applyAmazingMenu();
			Common.applySmartCart();
			Common.openSearchModal();
			Common.applyAmazingMenuMobile();
			Common.openVideoModal();
			Common.showFooterLinks();
			Common.applyImageLoad();
			Common.overlay();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		applyAmazingMenu: function () {
			$('.header-qd-v1-amazing-menu, .footer-qd-v1-menu-list').QD_amazingMenu();
		},
		applySmartCart: function () {
			$('.header-qd-v1-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"><div class="qd-sc-wrapper"></div></div>');

			var wrapper = $(".qd-sc-wrapper");

			$.QD_smartCart({
				selector: wrapper,
				dropDown: {
					texts: {
						linkCart: "Finalizar Compra",
						cartTotal: '<span class="qd-infoTotalItems">Itens: #items</span><span class="qd-infoTotalValue">Total: #value</span>'
					},
					updateOnlyHover: false,
					smartCheckout: true,
					callback: function () {
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Meu carrinho</h3></div>');
						wrapper.find('.qd_ddc_continueShopping').after(wrapper.find('.qd-ddc-viewCart'));
					},
					skuName: function (data) {
						return data.name + ' - ' + data.skuName.replace(data.name, '');
					},
					callbackProductsList: function () {
						wrapper.find(".qd-ddc-prodQtt").each(function () {
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
			window._QuatroDigital_prodBuyCallback = function (jqXHR, textStatus, prodLink, skus) {
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$('.header-qd-v1-cart-link-trigger').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$('.qd_ddc_lightBoxClose').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		applyAmazingMenuMobile: function () {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function () { return $(this).prev().clone().wrap('<li></li>').parent() });

			wrapper.QD_amazingMenu({
				callback: function () {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-right"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function () {
						var $t = $(this);
						$.merge($t.parent(), $t.closest('ul')).toggleClass('qd-am-is-active');

						$t.filter(function () { return !$(this).closest('ul').is('.qd-amazing-menu'); }).siblings('ul').stop(true, true).slideToggle();
					});

					wrapper.find('nav > ul > li > .qd-am-dropdown-trigger').click(function () {
						$('.header-qd-v1-amazing-menu-mobile').addClass('qd-am-is-active');
						$('.header-qd-v1-amazing-menu-mobile').animate({
							scrollTop: 0
						}, 200);
					});

					wrapper.find('nav > ul > li > ul > li:first-child').click(function (e) {
						e.preventDefault();
						$(this).parents(".qd-am-is-active").removeClass('qd-am-is-active');
					});
				}
			});

			$('.header-qd-v1-amazing-menu-trigger').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile .header-qd-v1-user-message').on('click', 'a#login', function () {
				$(document.body).removeClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile .header-qd-v1-user-message').append('<div class="header-qd-v1-close-amazing-menu-mobile"></div>');

			$('.header-qd-v1-close-amazing-menu-mobile').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
			});

		},		
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		overlay: function () {
			$('.components-qd-v1-overlay').click(function () {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},	
		openSearchModal: function () {
			$('.header-qd-v1-search-trriger').click(function () {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-menu-list > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		},
		applyTipBarCarousel: function () {
			var wrapper = $('.tip-bar-qd-v1-carousel >ul');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: false,
				draggable: true,
				speed: 1000,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			};

			wrapper.slick($.extend(true, options, (function () {
				// Se estiver dentro do product-qd-v1-sku-selection-box, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if (wrapper.closest('.product-qd-v1-sku-selection-box').length)
					return { slidesToShow: 3 };
				return {};
			})()));
		},
		applyMosaicCategorieBanners: function () {
			$('.banner-qd-v1-responsive > .box-banner').QD_mosaicBanners({
				// classFourColumn: "col-xs-12 col-sm-6 col-md-2"
			});
		},
		openVideoModal: function () {
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function (e) {
				e.preventDefault();
				var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass("component-qd-v1-video-modal");
				var $t = $(this);
				var videoId = ($t.attr('href').match(videoRegex) || ['']).pop();

				modal.find('.modal-header').append('<h2 class="component-qd-v1-section-title">' + $t.find('img').attr('alt') + '</h2>').prepend('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
				modal.find(".modal-dialog").addClass("modal-lg");

				$('<iframe src="' + 'https://www.youtube.com/embed/' + videoId + '?wmode=transparent&rel=0" frameborder="0"></iframe>').appendTo(modal.find('.modal-body'));

				$(".component-qd-v1-video-modal").find('iframe').wrap('<div class="embed-responsive embed-responsive-16by9"></div>')

				modal.modal();

				modal.on('hidden.bs.modal', function () {
					modal.remove();
				});
			});
		},
		applyImageLoad: function () {
			$('.search-qd-v1-result, .prateleira').QD_smartImageLoad({
				sizes: {
					width: '300',
					height: '300'
				}
			});
		},
		applyCarouselShelf: function () {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira').not('.slick-initialized');

			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').addClass("component-qd-v1-section-title").insertBefore($t);
			});

			wrapper.slick({
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
		}													
	};

	var Home = {
		init: function() {
			Home.applySlickSlider();
			Home.homeContentCarousel();
			Home.applyBrandCarousel();
			Home.applyCarouselShelfSpecial();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applySlickSlider: function () {
			var wrapper = $('.slider-qd-v1-full');

			wrapper.slick({
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				autoplay: true,
				autoplaySpeed: 7000,
				draggable: true,
				responsive: [
					{
						breakpoint: 767,
						settings: {
							dots: true
						}
					}
				]
			});
		},
		homeContentCarousel:function() {
			$(".home-qd-v1-content-carousel").QD_amazingMenu();

			var wrapper = $('.home-qd-v1-content-carousel >ul');

			if (!wrapper.length)
				return;

			var options = {
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				draggable: true,
				speed: 1000,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			};

			wrapper.slick($.extend(true, options, (function () {
				// Se estiver dentro do product-qd-v1-sku-selection-box, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if (wrapper.closest('.product-qd-v1-sku-selection-box').length)
					return { slidesToShow: 3 };
				return {};
			})()));
			
		},
		applyBrandCarousel: function () {
			var wrapper = $('.brand-carousel-qd-v1-carousel');

			wrapper.slick({
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
							slidesToShow: 1,
							slidesToScroll: 1,
							centerMode: true,
							infinite: true,
							centerPadding: '40px'
						}
					},

					{
						breakpoint: 380,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerMode: true,
							infinite: true,
							centerPadding: '40px'

						}
					}
				]
			});
		},
		applyCarouselShelfSpecial: function () {
			var wrapper = $('.categories-special-qd-v1-banners .prateleira').not('.slick-initialized');

			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').remove();
			});

			wrapper.slick({
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				draggable: true,
				speed: 700,
				responsive: [
					{
						breakpoint: 550,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		}							
	};

	var Search = {
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Product = {
		run: function() {},
		init: function() {
			// Product.forceImageZoom();
			Product.setAvailableBodyClass();
			Product.productThumbCarousel();
			Product.applyProductTipBarCarousel();
			Product.applyBannerCarousel();
			Product.openShipping();
			Product.scrollToDescription();
			Product.scrollToBuyButton();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		setAvailableBodyClass: function() {
			function checkVisibleNotify(available) {
				if (available)
					$(document.body).addClass('qd-product-available').removeClass('qd-product-unavailable');
				else
					$(document.body).addClass('qd-product-unavailable').removeClass('qd-product-available');
			}

			$(document).on("skuSelected.vtex", function(e, id, sku) {
				checkVisibleNotify(sku.available);
			});

			checkVisibleNotify(skuJson.available);
		},
		forceImageZoom: function() {
			try {
				var orig = window.ImageControl;
				window.ImageControl = function() {
					$("ul.thumbs a").each(function() {
						var $t = $(this);
						if ($t.attr("zoom"))
							return;
						var rel = $t.attr("rel");
						if (rel)
							$t.attr("zoom", rel.replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1000-1000"));
					});
					orig.apply(this, arguments);
				}
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Ops, algo saiu errado como zoom :( . Detalhes: " + e.message)); }
		},
		applyProductTipBarCarousel: function () {
			var wrapper = $('.product-qd-v1-tip-bar >ul');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: false,
				draggable: true,
				speed: 1000,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},

					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			};

			wrapper.slick($.extend(true, options, (function () {
				// Se estiver dentro do product-qd-v1-sku-selection-box, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if (wrapper.closest('.product-qd-v1-sku-selection-box').length)
					return { slidesToShow: 3 };
				return {};
			})()));
		},
		applyBannerCarousel: function () {
			var wrapper = $('.product-qd-v1-banner-carousel');

			wrapper.slick({
				slidesToShow: 4,
				slidesToScroll: 4,
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
							slidesToShow: 1,
							slidesToScroll: 1,
							centerMode: true,
							infinite: true,
							centerPadding: '40px'
						}
					},

					{
						breakpoint: 380,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerMode: true,
							infinite: true,
							centerPadding: '40px'

						}
					}
				]
			});
		},
		openShipping: function () {
			if (typeof window.ShippingValue === "function")
				window.ShippingValue();
		},
		productThumbCarousel:function() {
			$('.product-qd-v1-image').QD_smartPhotoCarousel({
				imageWrapper: '#include',
				thumbsWrapper: '.thumbs',
				sizes: {
					thumb: '150-150',
					image: '500-500',
					imagezoom: '1000-1000'
				},
				slickOptions: {
					images: {
						lazyLoad: 'ondemand',
						infinite: false,
						arrows: false
					},
					thumbs: {
						slidesToShow: 3,
						slidesToScroll: 1,
						arrows: false,
						focusOnSelect: true
					}
				},
			});
		},
		scrollToDescription: function () {
			$('.product-qd-v1-description-link').click(function (e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description').offset().top - 75
				}, 900, 'swing');
			});
		},
		scrollToBuyButton: function () {
			$('.product-qd-v1-fixed-bar .buy-button, .product-qd-v1-fixed-bar .product-qd-v1-price').click(function (e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-sku-selection-wrapper').offset().top - 75
				}, 900, 'swing');
			});
		}									
	};

	var List = {
		run: function() {},
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Institutional = {
		init: function() {
			Institutional.sideMenuToggle();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sideMenuToggle: function () {
			$('.institucional-qd-v1-menu-toggle-wrap').click(function (evt) {
				evt.preventDefault();
				$(document.body).addClass('qd-sn-on');
			});

			$('.institucional-qd-v1-side-menu-wrap-close').click(function () {
				$(document.body).removeClass('qd-sn-on');
			});
		}
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

/* Slick.js - Version: 1.6.0 - Author: Ken Wheeler - Website: http://kenwheeler.github.io - Docs: http://kenwheeler.github.io/slick - Repo: http://github.com/kenwheeler/slick - Issues: http://github.com/kenwheeler/slick/issues */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});

/* PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};

/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);

"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
(function(){var d=jQuery;if("function"!==typeof d.fn.QD_news){var w={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",originField:".qd_news_origin",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,
animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",timeHideSuccessMsg:3E3,platform:"vtexcrm",vtexStore:jsnomeLoja,entity:"NL",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(d,g){}};d.fn.QD_news=function(t){var g=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var e;"object"===typeof a?(a.unshift("[QD News]\n"),e=a):e=["[QD News]\n"+a];if("undefined"===
typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,e)}catch(c){console.info(e.join("\n"))}else try{console.error.apply(console,e)}catch(c){console.error(e.join("\n"))}else try{console.warn.apply(console,e)}catch(c){console.warn(e.join("\n"))}}},k=d(this);if(!k.length)return k;var a=d.extend({},w,t);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==
a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof d.fn.vtexPopUp2)return g("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),k;var v=function(d){var g=0;var e=function(){d.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){d.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&e();g++})})};var c=function(){d.fadeTo(a.animateSpeed,.2,function(){d.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&
c();g++})})};d.stop(!0,!0);"leftRight"==a.animation?e():"blink"==a.animation&&c()};k.each(function(){function k(b,q){l.attr("disabled","disabled");var f={postData:{newsletterClientEmail:b,newsletterClientName:a.defaultName==q?"-":q,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:l,wrapper:c};"linx"==a.platform&&(f.postData.nome=f.postData.newsletterClientName,f.postData.email=f.postData.newsletterClientEmail);
"vtexcrm"==a.platform?t(function(x){e(f,d.ajax({url:"//api.vtexcrm.com.br/"+a.vtexStore+"/dataentities/"+a.entity+"/documents",type:"PATCH",dataType:"json",headers:{Accept:"application/vnd.vtex.ds.v10+json","Content-Type":"application/json; charset=utf-8"},data:JSON.stringify({id:b.toLowerCase().replace(/[^a-z0-9]/ig,function(a){return"-"+a.charCodeAt(0)+"-"}),ip:x,origin:c.find(a.originField).val()||"---",qd_email:b,qd_name:q,URI:location.href})}))}):e(f,d.ajax({url:"linx"==a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"==a.platform?"GET":"POST",data:f.postData}));a.submitCallback(b,q)}function t(a){d.ajax({url:"//api.ipify.org?format=jsonp",dataType:"jsonp",success:function(b){a(b.ip)},error:function(){d.ajax({url:"//freegeoip.net/json/",dataType:"json",success:function(b){a(b.ip)},error:function(b){a(null)}})}})}function e(b,e){e.fail(function(){alert("Desculpe. N\u00e3o foi poss\u00edvel cadastrar seu e-mail, por favor tente novamente.")});e.done(function(e){l.removeAttr("disabled");
if("linx"==a.platform&&!(-1<e.indexOf(" com sucesso.")||-1<e.indexOf(" cadastrado.")))return alert(e);"popup"==a.validationMethod?r.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&r.slideDown().bind("click",function(){d(this).slideUp()});var f=c.find(a.emailField);a.setDefaultName&&c.find(a.nameField).is("input:text, textarea")&&c.find(a.nameField).val(a.defaultName);if("animateField"==a.validationMethod){f.val(c.find(a.animateFieldSuccess).val()||
"Obrigado!!!");f.addClass("vtexNewsSuccess");var g=setTimeout(function(){f.removeClass("vtexNewsSuccess");f.val(a.defaultEmail);f.unbind("focus.vtexNews")},a.timeHideSuccessMsg);f.bind("focus.vtexNews",function(){f.removeClass("vtexNewsSuccess");clearTimeout(g);d(this).val("");d(this).unbind("focus.vtexNews")})}else f.val(a.defaultEmail);a.successCallback(b);d(c).trigger("qdNewsSuccessCallback",b)})}var c=d(this),m=c.find(a.nameField),h=c.find(a.emailField),l=c.find(a.btn);if("animateField"!=a.validationMethod){var n=
c.find(a.elementError);var r=c.find(a.elementSuccess)}1>m.length&&a.checkNameExist&&g("Campo de nome, n\u00e3o encontrado ("+m.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>h.length)return g("Campo de e-mail, n\u00e3o encontrado ("+h.selector+")"),c;if(1>l.length)return g("Bot\u00e3o de envio, n\u00e3o encontrado ("+l.selector+")"),c;if("animateField"!=a.validationMethod&&(1>r.length||1>n.length))return g("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+r.selector+
", "+n.selector+")"),c;a.setDefaultName&&m.is("input[type=text], textarea")&&m.val(a.defaultName);h.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var b=m.filter(":visible");if(!b.length)return}else b=m;var c=b.val();b.is("input:text, textarea")&&b.bind({focus:function(){b.val()!=c||0!==b.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||b.val("")},blur:function(){""===b.val()&&b.val(c)}})}})();(function(){var b=h.val();h.bind({focus:function(){h.val()==
b&&0===h.val().search(a.defaultEmail.substr(0,6))&&h.val("")},blur:function(){""===h.val()&&h.val(b)}})})();var u=function(){var b;var e=(b=c.find(a.nameField).filter("input[type=text],select,textarea").val())?b:c.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?c.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(b=c.find(a.nameField).attr(a.getAttr))?b:(b=c.find(a.nameField).text())?b:(b=c.find(a.nameField).find(".box-banner img:first").attr("alt"))?
b:"Nome_Padrao";b=(c.find(a.emailField).val()||"").trim();var f=c.find(a.nameField).is(":visible");f=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||f?f:!0):!1;var h=0>b.search(/^[a-z0-9_\-\.\+]+@[a-z0-9_\-]+(\.[a-z0-9_\-]{2,})+$/i);f||h?"animateField"==a.validationMethod?(f&&v(c.find(a.nameField)),h&&v(c.find(a.emailField))):"popup"==a.validationMethod?n.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(n.slideDown().bind("click",function(){d(this).slideUp()}),
setTimeout(function(){n.slideUp()},1800)):a.allowSubmit()?k(b,e):g("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),u())};m.filter("input:text, textarea").bind("keydown",p);h.bind("keydown",p);p=l.getParent("form");p.length?p.submit(function(a){a.preventDefault();u()}):l.bind("click.qd_news",function(){u()})});return k};d(function(){d(".qd_news_auto").QD_news()})}})();
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
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
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
var _0xf006=['sku','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','vtex.sku.selected.QD','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','---','erc','join','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QD_smartStockAvailable','initialSkuSelected','QuatroDigital.ssa.skuSelected','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','off','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','extend','url','opts','push','success','call','error','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','clearQueueDelay','jqXHR','readyState','textStatus','qdAjax','version','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','undefined','alerta','aviso','toLowerCase','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','attr','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','[data-qd-ssa-text=\x22default\x22]','html','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected'];(function(_0x11e31d,_0x46f64f){var _0x2e3542=function(_0x40f472){while(--_0x40f472){_0x11e31d['push'](_0x11e31d['shift']());}};_0x2e3542(++_0x46f64f);}(_0xf006,0x17a));var _0x6f00=function(_0x5d744a,_0x396556){_0x5d744a=_0x5d744a-0x0;var _0x35d5eb=_0xf006[_0x5d744a];return _0x35d5eb;};(function(_0x2900c7){if(_0x6f00('0x0')!==typeof _0x2900c7['qdAjax']){var _0x107ead={};_0x2900c7['qdAjaxQueue']=_0x107ead;_0x2900c7['qdAjax']=function(_0x25de26){var _0x419c1e=_0x2900c7[_0x6f00('0x1')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x25de26);var _0x1c2ad8=escape(encodeURIComponent(_0x419c1e[_0x6f00('0x2')]));_0x107ead[_0x1c2ad8]=_0x107ead[_0x1c2ad8]||{};_0x107ead[_0x1c2ad8][_0x6f00('0x3')]=_0x107ead[_0x1c2ad8][_0x6f00('0x3')]||[];_0x107ead[_0x1c2ad8]['opts'][_0x6f00('0x4')]({'success':function(_0x5a5d6a,_0x56d3b1,_0x53e3d9){_0x419c1e[_0x6f00('0x5')][_0x6f00('0x6')](this,_0x5a5d6a,_0x56d3b1,_0x53e3d9);},'error':function(_0x4b3d36,_0x2d7780,_0x54bded){_0x419c1e[_0x6f00('0x7')][_0x6f00('0x6')](this,_0x4b3d36,_0x2d7780,_0x54bded);},'complete':function(_0x1ea7bb,_0x189113){_0x419c1e[_0x6f00('0x8')]['call'](this,_0x1ea7bb,_0x189113);}});_0x107ead[_0x1c2ad8][_0x6f00('0x9')]=_0x107ead[_0x1c2ad8][_0x6f00('0x9')]||{'success':{},'error':{},'complete':{}};_0x107ead[_0x1c2ad8][_0x6f00('0xa')]=_0x107ead[_0x1c2ad8][_0x6f00('0xa')]||{};_0x107ead[_0x1c2ad8][_0x6f00('0xa')][_0x6f00('0xb')]=_0x6f00('0xc')===typeof _0x107ead[_0x1c2ad8][_0x6f00('0xa')]['successPopulated']?_0x107ead[_0x1c2ad8][_0x6f00('0xa')][_0x6f00('0xb')]:!0x1;_0x107ead[_0x1c2ad8][_0x6f00('0xa')][_0x6f00('0xd')]='boolean'===typeof _0x107ead[_0x1c2ad8][_0x6f00('0xa')][_0x6f00('0xd')]?_0x107ead[_0x1c2ad8][_0x6f00('0xa')]['errorPopulated']:!0x1;_0x107ead[_0x1c2ad8][_0x6f00('0xa')][_0x6f00('0xe')]='boolean'===typeof _0x107ead[_0x1c2ad8][_0x6f00('0xa')][_0x6f00('0xe')]?_0x107ead[_0x1c2ad8]['callbackFns']['completePopulated']:!0x1;_0x25de26=_0x2900c7[_0x6f00('0x1')]({},_0x419c1e,{'success':function(_0x5ce1ad,_0x3e3be1,_0x84b447){_0x107ead[_0x1c2ad8][_0x6f00('0x9')]['success']={'data':_0x5ce1ad,'textStatus':_0x3e3be1,'jqXHR':_0x84b447};_0x107ead[_0x1c2ad8][_0x6f00('0xa')][_0x6f00('0xb')]=!0x0;for(var _0x12edad in _0x107ead[_0x1c2ad8]['opts'])'object'===typeof _0x107ead[_0x1c2ad8][_0x6f00('0x3')][_0x12edad]&&(_0x107ead[_0x1c2ad8]['opts'][_0x12edad]['success']['call'](this,_0x5ce1ad,_0x3e3be1,_0x84b447),_0x107ead[_0x1c2ad8][_0x6f00('0x3')][_0x12edad]['success']=function(){});},'error':function(_0x2e9d3d,_0x446a7d,_0x3ae87c){_0x107ead[_0x1c2ad8][_0x6f00('0x9')]['error']={'errorThrown':_0x3ae87c,'textStatus':_0x446a7d,'jqXHR':_0x2e9d3d};_0x107ead[_0x1c2ad8]['callbackFns'][_0x6f00('0xd')]=!0x0;for(var _0x595b92 in _0x107ead[_0x1c2ad8][_0x6f00('0x3')])_0x6f00('0xf')===typeof _0x107ead[_0x1c2ad8][_0x6f00('0x3')][_0x595b92]&&(_0x107ead[_0x1c2ad8][_0x6f00('0x3')][_0x595b92]['error']['call'](this,_0x2e9d3d,_0x446a7d,_0x3ae87c),_0x107ead[_0x1c2ad8][_0x6f00('0x3')][_0x595b92][_0x6f00('0x7')]=function(){});},'complete':function(_0x5642d4,_0x1eafc2){_0x107ead[_0x1c2ad8][_0x6f00('0x9')][_0x6f00('0x8')]={'textStatus':_0x1eafc2,'jqXHR':_0x5642d4};_0x107ead[_0x1c2ad8][_0x6f00('0xa')][_0x6f00('0xe')]=!0x0;for(var _0x5db12e in _0x107ead[_0x1c2ad8][_0x6f00('0x3')])_0x6f00('0xf')===typeof _0x107ead[_0x1c2ad8][_0x6f00('0x3')][_0x5db12e]&&(_0x107ead[_0x1c2ad8]['opts'][_0x5db12e][_0x6f00('0x8')][_0x6f00('0x6')](this,_0x5642d4,_0x1eafc2),_0x107ead[_0x1c2ad8][_0x6f00('0x3')][_0x5db12e][_0x6f00('0x8')]=function(){});isNaN(parseInt(_0x419c1e[_0x6f00('0x10')]))||setTimeout(function(){_0x107ead[_0x1c2ad8][_0x6f00('0x11')]=void 0x0;_0x107ead[_0x1c2ad8][_0x6f00('0x3')]=void 0x0;_0x107ead[_0x1c2ad8]['parameters']=void 0x0;_0x107ead[_0x1c2ad8][_0x6f00('0xa')]=void 0x0;},_0x419c1e[_0x6f00('0x10')]);}});'undefined'===typeof _0x107ead[_0x1c2ad8][_0x6f00('0x11')]?_0x107ead[_0x1c2ad8][_0x6f00('0x11')]=_0x2900c7['ajax'](_0x25de26):_0x107ead[_0x1c2ad8][_0x6f00('0x11')]&&_0x107ead[_0x1c2ad8][_0x6f00('0x11')][_0x6f00('0x12')]&&0x4==_0x107ead[_0x1c2ad8][_0x6f00('0x11')][_0x6f00('0x12')]&&(_0x107ead[_0x1c2ad8][_0x6f00('0xa')]['successPopulated']&&_0x25de26[_0x6f00('0x5')](_0x107ead[_0x1c2ad8][_0x6f00('0x9')][_0x6f00('0x5')]['data'],_0x107ead[_0x1c2ad8][_0x6f00('0x9')][_0x6f00('0x5')][_0x6f00('0x13')],_0x107ead[_0x1c2ad8][_0x6f00('0x9')]['success'][_0x6f00('0x11')]),_0x107ead[_0x1c2ad8][_0x6f00('0xa')][_0x6f00('0xd')]&&_0x25de26['error'](_0x107ead[_0x1c2ad8]['parameters'][_0x6f00('0x7')][_0x6f00('0x11')],_0x107ead[_0x1c2ad8]['parameters'][_0x6f00('0x7')]['textStatus'],_0x107ead[_0x1c2ad8][_0x6f00('0x9')][_0x6f00('0x7')]['errorThrown']),_0x107ead[_0x1c2ad8]['callbackFns'][_0x6f00('0xe')]&&_0x25de26[_0x6f00('0x8')](_0x107ead[_0x1c2ad8][_0x6f00('0x9')][_0x6f00('0x8')][_0x6f00('0x11')],_0x107ead[_0x1c2ad8]['parameters']['complete'][_0x6f00('0x13')]));};_0x2900c7[_0x6f00('0x14')][_0x6f00('0x15')]=_0x6f00('0x16');}}(jQuery));(function(_0x5a5bba){function _0x1009ad(_0x27fede,_0x4f28e1){_0x516011[_0x6f00('0x14')]({'url':_0x6f00('0x17')+_0x27fede,'clearQueueDelay':null,'success':_0x4f28e1,'error':function(){_0x3be49e(_0x6f00('0x18'));}});}var _0x516011=jQuery;if(_0x6f00('0x0')!==typeof _0x516011['fn']['QD_smartStockAvailable']){var _0x3be49e=function(_0x267f09,_0x2bc48a){if(_0x6f00('0xf')===typeof console){var _0x2f47f0;_0x6f00('0xf')===typeof _0x267f09?(_0x267f09[_0x6f00('0x19')](_0x6f00('0x1a')),_0x2f47f0=_0x267f09):_0x2f47f0=[_0x6f00('0x1a')+_0x267f09];_0x6f00('0x1b')===typeof _0x2bc48a||_0x6f00('0x1c')!==_0x2bc48a['toLowerCase']()&&_0x6f00('0x1d')!==_0x2bc48a[_0x6f00('0x1e')]()?_0x6f00('0x1b')!==typeof _0x2bc48a&&_0x6f00('0x1f')===_0x2bc48a[_0x6f00('0x1e')]()?console[_0x6f00('0x1f')]['apply'](console,_0x2f47f0):console[_0x6f00('0x7')][_0x6f00('0x20')](console,_0x2f47f0):console[_0x6f00('0x21')][_0x6f00('0x20')](console,_0x2f47f0);}},_0x34f47e={},_0x3c244d=function(_0x54e5f9,_0x5cfa4f){function _0x213d2e(_0x3cdefd){try{_0x54e5f9[_0x6f00('0x22')](_0x6f00('0x23'))[_0x6f00('0x24')](_0x6f00('0x25'));var _0x125fca=_0x3cdefd[0x0][_0x6f00('0x26')][0x0]['AvailableQuantity'];_0x54e5f9[_0x6f00('0x27')](_0x6f00('0x28'),_0x125fca);_0x54e5f9[_0x6f00('0x29')](function(){var _0x54e5f9=_0x516011(this)[_0x6f00('0x2a')](_0x6f00('0x2b'));if(0x1>_0x125fca)return _0x54e5f9[_0x6f00('0x2c')]()[_0x6f00('0x24')](_0x6f00('0x2d'))['removeClass'](_0x6f00('0x2e'));var _0x3cdefd=_0x54e5f9[_0x6f00('0x2f')](_0x6f00('0x30')+_0x125fca+'\x22]');_0x3cdefd=_0x3cdefd[_0x6f00('0x31')]?_0x3cdefd:_0x54e5f9[_0x6f00('0x2f')](_0x6f00('0x32'));_0x54e5f9[_0x6f00('0x2c')]()[_0x6f00('0x24')](_0x6f00('0x2d'))['removeClass'](_0x6f00('0x2e'));_0x3cdefd[_0x6f00('0x33')]((_0x3cdefd[_0x6f00('0x33')]()||'')['replace'](_0x6f00('0x34'),_0x125fca));_0x3cdefd[_0x6f00('0x35')]()[_0x6f00('0x24')](_0x6f00('0x2e'))[_0x6f00('0x22')](_0x6f00('0x2d'));});}catch(_0x26fa8e){_0x3be49e([_0x6f00('0x36'),_0x26fa8e[_0x6f00('0x37')]]);}}if(_0x54e5f9['length']){_0x54e5f9[_0x6f00('0x24')](_0x6f00('0x38'));_0x54e5f9[_0x6f00('0x24')](_0x6f00('0x23'));try{_0x54e5f9[_0x6f00('0x24')](_0x6f00('0x39')+vtxctx[_0x6f00('0x3a')][_0x6f00('0x3b')](';')[_0x6f00('0x31')]);}catch(_0x3be213){_0x3be49e([_0x6f00('0x3c'),_0x3be213[_0x6f00('0x37')]]);}_0x516011(window)['on'](_0x6f00('0x3d'),function(_0x51dc7f,_0x22a9c5,_0x7a1449){try{_0x1009ad(_0x7a1449[_0x6f00('0x3e')],function(_0x2f508f){_0x213d2e(_0x2f508f);0x1===vtxctx[_0x6f00('0x3a')]['split'](';')['length']&&0x0==_0x2f508f[0x0]['SkuSellersInformation'][0x0]['AvailableQuantity']&&_0x516011(window)[_0x6f00('0x3f')](_0x6f00('0x40'));});}catch(_0x324c71){_0x3be49e([_0x6f00('0x41'),_0x324c71[_0x6f00('0x37')]]);}});_0x516011(window)['off'](_0x6f00('0x42'));_0x516011(window)['on'](_0x6f00('0x40'),function(){_0x54e5f9[_0x6f00('0x24')]('qd-ssa-sku-prod-unavailable')[_0x6f00('0x2c')]();});}};_0x5a5bba=function(_0x21847f){var _0x4dc739={'c':_0x6f00('0x43')};return function(_0xd4099a){var _0x39de93=function(_0x565722){return _0x565722;};var _0x4dcf04=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xd4099a=_0xd4099a['d'+_0x4dcf04[0x10]+'c'+_0x4dcf04[0x11]+'m'+_0x39de93(_0x4dcf04[0x1])+'n'+_0x4dcf04[0xd]]['l'+_0x4dcf04[0x12]+'c'+_0x4dcf04[0x0]+'ti'+_0x39de93('o')+'n'];var _0x18031a=function(_0x1c6d1a){return escape(encodeURIComponent(_0x1c6d1a[_0x6f00('0x44')](/\./g,'¨')[_0x6f00('0x44')](/[a-zA-Z]/g,function(_0x4e72db){return String[_0x6f00('0x45')](('Z'>=_0x4e72db?0x5a:0x7a)>=(_0x4e72db=_0x4e72db['charCodeAt'](0x0)+0xd)?_0x4e72db:_0x4e72db-0x1a);})));};var _0x403ba0=_0x18031a(_0xd4099a[[_0x4dcf04[0x9],_0x39de93('o'),_0x4dcf04[0xc],_0x4dcf04[_0x39de93(0xd)]]['join']('')]);_0x18031a=_0x18031a((window[['js',_0x39de93('no'),'m',_0x4dcf04[0x1],_0x4dcf04[0x4][_0x6f00('0x46')](),_0x6f00('0x47')]['join']('')]||_0x6f00('0x48'))+['.v',_0x4dcf04[0xd],'e',_0x39de93('x'),'co',_0x39de93('mm'),_0x6f00('0x49'),_0x4dcf04[0x1],'.c',_0x39de93('o'),'m.',_0x4dcf04[0x13],'r'][_0x6f00('0x4a')](''));for(var _0x76120e in _0x4dc739){if(_0x18031a===_0x76120e+_0x4dc739[_0x76120e]||_0x403ba0===_0x76120e+_0x4dc739[_0x76120e]){var _0x1cda3a='tr'+_0x4dcf04[0x11]+'e';break;}_0x1cda3a='f'+_0x4dcf04[0x0]+'ls'+_0x39de93(_0x4dcf04[0x1])+'';}_0x39de93=!0x1;-0x1<_0xd4099a[[_0x4dcf04[0xc],'e',_0x4dcf04[0x0],'rc',_0x4dcf04[0x9]]['join']('')][_0x6f00('0x4b')](_0x6f00('0x4c'))&&(_0x39de93=!0x0);return[_0x1cda3a,_0x39de93];}(_0x21847f);}(window);if(!eval(_0x5a5bba[0x0]))return _0x5a5bba[0x1]?_0x3be49e(_0x6f00('0x4d')):!0x1;_0x516011['fn']['QD_smartStockAvailable']=function(_0x35b7eb){var _0x567630=_0x516011(this);_0x35b7eb=_0x516011[_0x6f00('0x1')](!0x0,{},_0x34f47e,_0x35b7eb);_0x567630['qdPlugin']=new _0x3c244d(_0x567630,_0x35b7eb);try{'object'===typeof _0x516011['fn'][_0x6f00('0x4e')][_0x6f00('0x4f')]&&_0x516011(window)['trigger'](_0x6f00('0x50'),[_0x516011['fn'][_0x6f00('0x4e')]['initialSkuSelected']['prod'],_0x516011['fn'][_0x6f00('0x4e')][_0x6f00('0x4f')][_0x6f00('0x3e')]]);}catch(_0x413fe9){_0x3be49e([_0x6f00('0x51'),_0x413fe9[_0x6f00('0x37')]]);}_0x516011['fn'][_0x6f00('0x4e')][_0x6f00('0x52')]&&_0x516011(window)[_0x6f00('0x3f')]('QuatroDigital.ssa.prodUnavailable');return _0x567630;};_0x516011(window)['on'](_0x6f00('0x42'),function(_0x3e6064,_0x4caf21,_0x4b5fd0){try{_0x516011['fn'][_0x6f00('0x4e')]['initialSkuSelected']={'prod':_0x4caf21,'sku':_0x4b5fd0},_0x516011(this)[_0x6f00('0x53')](_0x3e6064);}catch(_0x1c93f2){_0x3be49e(['Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20',_0x1c93f2['message']]);}});_0x516011(window)['on'](_0x6f00('0x54'),function(_0x31bba8,_0x154a41,_0x22eb2c){try{for(var _0x55394e=_0x22eb2c[_0x6f00('0x31')],_0x42dbc8=_0x154a41=0x0;_0x42dbc8<_0x55394e&&!_0x22eb2c[_0x42dbc8][_0x6f00('0x55')];_0x42dbc8++)_0x154a41+=0x1;_0x55394e<=_0x154a41&&(_0x516011['fn']['QD_smartStockAvailable'][_0x6f00('0x52')]=!0x0);_0x516011(this)[_0x6f00('0x53')](_0x31bba8);}catch(_0x49b670){_0x3be49e([_0x6f00('0x56'),_0x49b670['message']]);}});_0x516011(function(){_0x516011(_0x6f00('0x57'))['QD_smartStockAvailable']();});}}(window));
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
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/* Quatro Digital Amazing Menu */
var _0xae7b=['qd-am-last','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','.qd-am-banner','filter','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','img[alt=\x27','attr','.box-banner','clone','text','data-qdam-value','trim','[class*=\x27colunas\x27]','insertBefore','hide','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','replaceSpecialChars','replace','qdAmAddNdx','qd-amazing-menu','>ul','>li','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','callback','trigger','QuatroDigital.am.callback','extend','exec','getParent','function','QD_amazingMenu','object','undefined','error','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','info','join','warn','each','addClass','qd-am-li-','first','last'];(function(_0x48d13f,_0x31b2f4){var _0x3662d7=function(_0x1659f0){while(--_0x1659f0){_0x48d13f['push'](_0x48d13f['shift']());}};_0x3662d7(++_0x31b2f4);}(_0xae7b,0x8a));var _0xbae7=function(_0x311365,_0x5a58fc){_0x311365=_0x311365-0x0;var _0x44667d=_0xae7b[_0x311365];return _0x44667d;};(function(_0x3e3a87){_0x3e3a87['fn'][_0xbae7('0x0')]=_0x3e3a87['fn']['closest'];}(jQuery));(function(_0x22e8db){var _0x2d8514;var _0x5c4e09=jQuery;if(_0xbae7('0x1')!==typeof _0x5c4e09['fn'][_0xbae7('0x2')]){var _0x382f1f={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x1a40a2=function(_0x26569e,_0x43333e){if(_0xbae7('0x3')===typeof console&&_0xbae7('0x4')!==typeof console[_0xbae7('0x5')]&&_0xbae7('0x4')!==typeof console['info']&&_0xbae7('0x4')!==typeof console['warn']){var _0x14548c;'object'===typeof _0x26569e?(_0x26569e[_0xbae7('0x6')](_0xbae7('0x7')),_0x14548c=_0x26569e):_0x14548c=[_0xbae7('0x7')+_0x26569e];if(_0xbae7('0x4')===typeof _0x43333e||_0xbae7('0x8')!==_0x43333e[_0xbae7('0x9')]()&&_0xbae7('0xa')!==_0x43333e[_0xbae7('0x9')]())if(_0xbae7('0x4')!==typeof _0x43333e&&'info'===_0x43333e[_0xbae7('0x9')]())try{console['info'][_0xbae7('0xb')](console,_0x14548c);}catch(_0x178762){try{console[_0xbae7('0xc')](_0x14548c[_0xbae7('0xd')]('\x0a'));}catch(_0x55f0bd){}}else try{console['error']['apply'](console,_0x14548c);}catch(_0x18ae9f){try{console['error'](_0x14548c[_0xbae7('0xd')]('\x0a'));}catch(_0x3985c0){}}else try{console[_0xbae7('0xe')][_0xbae7('0xb')](console,_0x14548c);}catch(_0x3f8026){try{console[_0xbae7('0xe')](_0x14548c[_0xbae7('0xd')]('\x0a'));}catch(_0x3866b6){}}}};_0x5c4e09['fn']['qdAmAddNdx']=function(){var _0x3b947b=_0x5c4e09(this);_0x3b947b[_0xbae7('0xf')](function(_0x5e39d6){_0x5c4e09(this)[_0xbae7('0x10')](_0xbae7('0x11')+_0x5e39d6);});_0x3b947b[_0xbae7('0x12')]()[_0xbae7('0x10')]('qd-am-first');_0x3b947b[_0xbae7('0x13')]()[_0xbae7('0x10')](_0xbae7('0x14'));return _0x3b947b;};_0x5c4e09['fn'][_0xbae7('0x2')]=function(){};_0x22e8db=function(_0x444ab4){var _0x5d0eba={'c':_0xbae7('0x15')};return function(_0x144b5a){var _0x1f24cb=function(_0x470af6){return _0x470af6;};var _0x5748c2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x144b5a=_0x144b5a['d'+_0x5748c2[0x10]+'c'+_0x5748c2[0x11]+'m'+_0x1f24cb(_0x5748c2[0x1])+'n'+_0x5748c2[0xd]]['l'+_0x5748c2[0x12]+'c'+_0x5748c2[0x0]+'ti'+_0x1f24cb('o')+'n'];var _0x3a03b8=function(_0x3f8be8){return escape(encodeURIComponent(_0x3f8be8['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x3cf5c2){return String[_0xbae7('0x16')](('Z'>=_0x3cf5c2?0x5a:0x7a)>=(_0x3cf5c2=_0x3cf5c2[_0xbae7('0x17')](0x0)+0xd)?_0x3cf5c2:_0x3cf5c2-0x1a);})));};var _0x322dc2=_0x3a03b8(_0x144b5a[[_0x5748c2[0x9],_0x1f24cb('o'),_0x5748c2[0xc],_0x5748c2[_0x1f24cb(0xd)]][_0xbae7('0xd')]('')]);_0x3a03b8=_0x3a03b8((window[['js',_0x1f24cb('no'),'m',_0x5748c2[0x1],_0x5748c2[0x4][_0xbae7('0x18')](),_0xbae7('0x19')][_0xbae7('0xd')]('')]||_0xbae7('0x1a'))+['.v',_0x5748c2[0xd],'e',_0x1f24cb('x'),'co',_0x1f24cb('mm'),_0xbae7('0x1b'),_0x5748c2[0x1],'.c',_0x1f24cb('o'),'m.',_0x5748c2[0x13],'r'][_0xbae7('0xd')](''));for(var _0x39a355 in _0x5d0eba){if(_0x3a03b8===_0x39a355+_0x5d0eba[_0x39a355]||_0x322dc2===_0x39a355+_0x5d0eba[_0x39a355]){var _0x359e10='tr'+_0x5748c2[0x11]+'e';break;}_0x359e10='f'+_0x5748c2[0x0]+'ls'+_0x1f24cb(_0x5748c2[0x1])+'';}_0x1f24cb=!0x1;-0x1<_0x144b5a[[_0x5748c2[0xc],'e',_0x5748c2[0x0],'rc',_0x5748c2[0x9]][_0xbae7('0xd')]('')][_0xbae7('0x1c')](_0xbae7('0x1d'))&&(_0x1f24cb=!0x0);return[_0x359e10,_0x1f24cb];}(_0x444ab4);}(window);if(!eval(_0x22e8db[0x0]))return _0x22e8db[0x1]?_0x1a40a2(_0xbae7('0x1e')):!0x1;var _0x5f0245=function(_0x54505e){var _0x501fb4=_0x54505e[_0xbae7('0x1f')](_0xbae7('0x20'));var _0x2a35ad=_0x501fb4['filter'](_0xbae7('0x21'));var _0x3beadc=_0x501fb4[_0xbae7('0x22')](_0xbae7('0x23'));if(_0x2a35ad[_0xbae7('0x24')]||_0x3beadc['length'])_0x2a35ad[_0xbae7('0x25')]()[_0xbae7('0x10')](_0xbae7('0x26')),_0x3beadc[_0xbae7('0x25')]()[_0xbae7('0x10')](_0xbae7('0x27')),_0x5c4e09[_0xbae7('0x28')]({'url':_0x2d8514[_0xbae7('0x29')],'dataType':'html','success':function(_0x59d737){var _0x4fcf31=_0x5c4e09(_0x59d737);_0x2a35ad[_0xbae7('0xf')](function(){var _0x59d737=_0x5c4e09(this);var _0x2a49cb=_0x4fcf31[_0xbae7('0x1f')](_0xbae7('0x2a')+_0x59d737[_0xbae7('0x2b')]('data-qdam-value')+'\x27]');_0x2a49cb[_0xbae7('0x24')]&&(_0x2a49cb['each'](function(){_0x5c4e09(this)[_0xbae7('0x0')](_0xbae7('0x2c'))[_0xbae7('0x2d')]()['insertBefore'](_0x59d737);}),_0x59d737['hide']());})[_0xbae7('0x10')]('qd-am-content-loaded');_0x3beadc[_0xbae7('0xf')](function(){var _0x59d737={};var _0x23603b=_0x5c4e09(this);_0x4fcf31[_0xbae7('0x1f')]('h2')[_0xbae7('0xf')](function(){if(_0x5c4e09(this)[_0xbae7('0x2e')]()['trim']()[_0xbae7('0x9')]()==_0x23603b[_0xbae7('0x2b')](_0xbae7('0x2f'))[_0xbae7('0x30')]()[_0xbae7('0x9')]())return _0x59d737=_0x5c4e09(this),!0x1;});_0x59d737[_0xbae7('0x24')]&&(_0x59d737[_0xbae7('0xf')](function(){_0x5c4e09(this)[_0xbae7('0x0')](_0xbae7('0x31'))[_0xbae7('0x2d')]()[_0xbae7('0x32')](_0x23603b);}),_0x23603b[_0xbae7('0x33')]());})[_0xbae7('0x10')](_0xbae7('0x34'));},'error':function(){_0x1a40a2(_0xbae7('0x35')+_0x2d8514[_0xbae7('0x29')]+_0xbae7('0x36'));},'complete':function(){_0x2d8514[_0xbae7('0x37')][_0xbae7('0x38')](this);_0x5c4e09(window)['trigger']('QuatroDigital.am.ajaxCallback',_0x54505e);},'clearQueueDelay':0xbb8});};_0x5c4e09[_0xbae7('0x2')]=function(_0x2d8675){var _0x394d71=_0x2d8675[_0xbae7('0x1f')](_0xbae7('0x39'))[_0xbae7('0xf')](function(){var _0x191859=_0x5c4e09(this);if(!_0x191859[_0xbae7('0x24')])return _0x1a40a2([_0xbae7('0x3a'),_0x2d8675],_0xbae7('0x8'));_0x191859[_0xbae7('0x1f')](_0xbae7('0x3b'))[_0xbae7('0x25')]()[_0xbae7('0x10')](_0xbae7('0x3c'));_0x191859['find']('li')[_0xbae7('0xf')](function(){var _0x5ae4fe=_0x5c4e09(this);var _0x3359d0=_0x5ae4fe[_0xbae7('0x3d')](_0xbae7('0x3e'));_0x3359d0[_0xbae7('0x24')]&&_0x5ae4fe[_0xbae7('0x10')]('qd-am-elem-'+_0x3359d0[_0xbae7('0x12')]()[_0xbae7('0x2e')]()[_0xbae7('0x30')]()[_0xbae7('0x3f')]()[_0xbae7('0x40')](/\./g,'')['replace'](/\s/g,'-')[_0xbae7('0x9')]());});var _0x548e44=_0x191859[_0xbae7('0x1f')]('>li')[_0xbae7('0x41')]();_0x191859[_0xbae7('0x10')](_0xbae7('0x42'));_0x548e44=_0x548e44['find'](_0xbae7('0x43'));_0x548e44[_0xbae7('0xf')](function(){var _0x141da9=_0x5c4e09(this);_0x141da9[_0xbae7('0x1f')](_0xbae7('0x44'))[_0xbae7('0x41')]()[_0xbae7('0x10')]('qd-am-column');_0x141da9[_0xbae7('0x10')](_0xbae7('0x45'));_0x141da9[_0xbae7('0x25')]()[_0xbae7('0x10')]('qd-am-dropdown');});_0x548e44['addClass'](_0xbae7('0x46'));var _0x11a5a4=0x0,_0x22e8db=function(_0x384792){_0x11a5a4+=0x1;_0x384792=_0x384792[_0xbae7('0x3d')]('li')[_0xbae7('0x3d')]('*');_0x384792[_0xbae7('0x24')]&&(_0x384792[_0xbae7('0x10')](_0xbae7('0x47')+_0x11a5a4),_0x22e8db(_0x384792));};_0x22e8db(_0x191859);_0x191859[_0xbae7('0x48')](_0x191859[_0xbae7('0x1f')]('ul'))['each'](function(){var _0x6371a2=_0x5c4e09(this);_0x6371a2[_0xbae7('0x10')](_0xbae7('0x49')+_0x6371a2[_0xbae7('0x3d')]('li')[_0xbae7('0x24')]+'-li');});});_0x5f0245(_0x394d71);_0x2d8514[_0xbae7('0x4a')][_0xbae7('0x38')](this);_0x5c4e09(window)[_0xbae7('0x4b')](_0xbae7('0x4c'),_0x2d8675);};_0x5c4e09['fn'][_0xbae7('0x2')]=function(_0x1e17eb){var _0xd7e026=_0x5c4e09(this);if(!_0xd7e026[_0xbae7('0x24')])return _0xd7e026;_0x2d8514=_0x5c4e09[_0xbae7('0x4d')]({},_0x382f1f,_0x1e17eb);_0xd7e026[_0xbae7('0x4e')]=new _0x5c4e09['QD_amazingMenu'](_0x5c4e09(this));return _0xd7e026;};_0x5c4e09(function(){_0x5c4e09('.qd_amazing_menu_auto')[_0xbae7('0x2')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0xbd85=['fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','index','updateItems','totalizers','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','prepend','ajaxStop','.qdDdcContainer','selector','dropDown','QD_buyButton','buyButton','smartCart','getParent','closest','replace','abs','undefined','pow','toFixed','round','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','object','info','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','aviso','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','SDK','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','body','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','emptyCart','cartContainer','each','clone','call','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','items','renderProductsList','getCartInfoByUrl','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','qd-ddc-prodLoaded','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','availability','.qd-ddc-prodName','append','skuName','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','$1-$2$3','data','calculateShipping','done'];(function(_0xc5e676,_0x309db8){var _0xbd4662=function(_0x2317c){while(--_0x2317c){_0xc5e676['push'](_0xc5e676['shift']());}};_0xbd4662(++_0x309db8);}(_0xbd85,0x1cf));var _0x5bd8=function(_0x4c3bf6,_0x3bd030){_0x4c3bf6=_0x4c3bf6-0x0;var _0x42b36d=_0xbd85[_0x4c3bf6];return _0x42b36d;};(function(_0x2f4bdc){_0x2f4bdc['fn'][_0x5bd8('0x0')]=_0x2f4bdc['fn'][_0x5bd8('0x1')];}(jQuery));function qd_number_format(_0x2448b4,_0xfe81f5,_0x359364,_0x55d900){_0x2448b4=(_0x2448b4+'')[_0x5bd8('0x2')](/[^0-9+\-Ee.]/g,'');_0x2448b4=isFinite(+_0x2448b4)?+_0x2448b4:0x0;_0xfe81f5=isFinite(+_0xfe81f5)?Math[_0x5bd8('0x3')](_0xfe81f5):0x0;_0x55d900=_0x5bd8('0x4')===typeof _0x55d900?',':_0x55d900;_0x359364=_0x5bd8('0x4')===typeof _0x359364?'.':_0x359364;var _0x41d9f4='',_0x41d9f4=function(_0x50f5f2,_0x4a7f54){var _0xfe81f5=Math[_0x5bd8('0x5')](0xa,_0x4a7f54);return''+(Math['round'](_0x50f5f2*_0xfe81f5)/_0xfe81f5)[_0x5bd8('0x6')](_0x4a7f54);},_0x41d9f4=(_0xfe81f5?_0x41d9f4(_0x2448b4,_0xfe81f5):''+Math[_0x5bd8('0x7')](_0x2448b4))[_0x5bd8('0x8')]('.');0x3<_0x41d9f4[0x0][_0x5bd8('0x9')]&&(_0x41d9f4[0x0]=_0x41d9f4[0x0][_0x5bd8('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x55d900));(_0x41d9f4[0x1]||'')[_0x5bd8('0x9')]<_0xfe81f5&&(_0x41d9f4[0x1]=_0x41d9f4[0x1]||'',_0x41d9f4[0x1]+=Array(_0xfe81f5-_0x41d9f4[0x1][_0x5bd8('0x9')]+0x1)[_0x5bd8('0xa')]('0'));return _0x41d9f4[_0x5bd8('0xa')](_0x359364);};(function(){try{window['_QuatroDigital_CartData']=window[_0x5bd8('0xb')]||{},window[_0x5bd8('0xb')]['callback']=window[_0x5bd8('0xb')][_0x5bd8('0xc')]||$[_0x5bd8('0xd')]();}catch(_0x1b768d){_0x5bd8('0x4')!==typeof console&&_0x5bd8('0xe')===typeof console['error']&&console[_0x5bd8('0xf')](_0x5bd8('0x10'),_0x1b768d[_0x5bd8('0x11')]);}}());(function(_0x366271){try{var _0x293f22=jQuery,_0x5afb3b=function(_0x2f7708,_0x5babcc){if(_0x5bd8('0x12')===typeof console&&'undefined'!==typeof console[_0x5bd8('0xf')]&&'undefined'!==typeof console[_0x5bd8('0x13')]&&_0x5bd8('0x4')!==typeof console[_0x5bd8('0x14')]){var _0x1a9e4d;_0x5bd8('0x12')===typeof _0x2f7708?(_0x2f7708[_0x5bd8('0x15')](_0x5bd8('0x16')),_0x1a9e4d=_0x2f7708):_0x1a9e4d=[_0x5bd8('0x16')+_0x2f7708];if('undefined'===typeof _0x5babcc||_0x5bd8('0x17')!==_0x5babcc['toLowerCase']()&&_0x5bd8('0x18')!==_0x5babcc[_0x5bd8('0x19')]())if(_0x5bd8('0x4')!==typeof _0x5babcc&&_0x5bd8('0x13')===_0x5babcc['toLowerCase']())try{console['info'][_0x5bd8('0x1a')](console,_0x1a9e4d);}catch(_0x3321ad){try{console['info'](_0x1a9e4d[_0x5bd8('0xa')]('\x0a'));}catch(_0x2621ab){}}else try{console['error']['apply'](console,_0x1a9e4d);}catch(_0x2f1854){try{console[_0x5bd8('0xf')](_0x1a9e4d[_0x5bd8('0xa')]('\x0a'));}catch(_0x26e751){}}else try{console[_0x5bd8('0x14')][_0x5bd8('0x1a')](console,_0x1a9e4d);}catch(_0x35a65a){try{console[_0x5bd8('0x14')](_0x1a9e4d[_0x5bd8('0xa')]('\x0a'));}catch(_0x1c6474){}}}};window['_QuatroDigital_DropDown']=window['_QuatroDigital_DropDown']||{};window[_0x5bd8('0x1b')][_0x5bd8('0x1c')]=!0x0;_0x293f22['QD_dropDownCart']=function(){};_0x293f22['fn'][_0x5bd8('0x1d')]=function(){return{'fn':new _0x293f22()};};var _0x4f8d63=function(_0x596e7b){var _0x3e1027={'c':'henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x1edb1d){var _0x54cf78=function(_0x4b998f){return _0x4b998f;};var _0x58f733=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1edb1d=_0x1edb1d['d'+_0x58f733[0x10]+'c'+_0x58f733[0x11]+'m'+_0x54cf78(_0x58f733[0x1])+'n'+_0x58f733[0xd]]['l'+_0x58f733[0x12]+'c'+_0x58f733[0x0]+'ti'+_0x54cf78('o')+'n'];var _0x10be22=function(_0x247c7e){return escape(encodeURIComponent(_0x247c7e[_0x5bd8('0x2')](/\./g,'¨')[_0x5bd8('0x2')](/[a-zA-Z]/g,function(_0x5cb234){return String['fromCharCode'](('Z'>=_0x5cb234?0x5a:0x7a)>=(_0x5cb234=_0x5cb234[_0x5bd8('0x1e')](0x0)+0xd)?_0x5cb234:_0x5cb234-0x1a);})));};var _0x41638d=_0x10be22(_0x1edb1d[[_0x58f733[0x9],_0x54cf78('o'),_0x58f733[0xc],_0x58f733[_0x54cf78(0xd)]][_0x5bd8('0xa')]('')]);_0x10be22=_0x10be22((window[['js',_0x54cf78('no'),'m',_0x58f733[0x1],_0x58f733[0x4][_0x5bd8('0x1f')](),_0x5bd8('0x20')][_0x5bd8('0xa')]('')]||'---')+['.v',_0x58f733[0xd],'e',_0x54cf78('x'),'co',_0x54cf78('mm'),_0x5bd8('0x21'),_0x58f733[0x1],'.c',_0x54cf78('o'),'m.',_0x58f733[0x13],'r'][_0x5bd8('0xa')](''));for(var _0x633f5e in _0x3e1027){if(_0x10be22===_0x633f5e+_0x3e1027[_0x633f5e]||_0x41638d===_0x633f5e+_0x3e1027[_0x633f5e]){var _0x5bd3a1='tr'+_0x58f733[0x11]+'e';break;}_0x5bd3a1='f'+_0x58f733[0x0]+'ls'+_0x54cf78(_0x58f733[0x1])+'';}_0x54cf78=!0x1;-0x1<_0x1edb1d[[_0x58f733[0xc],'e',_0x58f733[0x0],'rc',_0x58f733[0x9]]['join']('')][_0x5bd8('0x22')](_0x5bd8('0x23'))&&(_0x54cf78=!0x0);return[_0x5bd3a1,_0x54cf78];}(_0x596e7b);}(window);if(!eval(_0x4f8d63[0x0]))return _0x4f8d63[0x1]?_0x5afb3b(_0x5bd8('0x24')):!0x1;_0x293f22[_0x5bd8('0x1d')]=function(_0x3bbe03,_0x285bff){var _0x1cf47a=_0x293f22(_0x3bbe03);if(!_0x1cf47a['length'])return _0x1cf47a;var _0x3f4acd=_0x293f22[_0x5bd8('0x25')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x5bd8('0x26'),'linkCheckout':_0x5bd8('0x27'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x5bd8('0x28'),'continueShopping':_0x5bd8('0x29'),'shippingForm':_0x5bd8('0x2a')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x45854f){return _0x45854f['skuName']||_0x45854f['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x285bff);_0x293f22('');var _0x340e8b=this;if(_0x3f4acd[_0x5bd8('0x2b')]){var _0x4f368c=!0x1;_0x5bd8('0x4')===typeof window[_0x5bd8('0x2c')]&&(_0x5afb3b(_0x5bd8('0x2d')),_0x293f22[_0x5bd8('0x2e')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x5bd8('0x2f'),'error':function(){_0x5afb3b(_0x5bd8('0x30'));_0x4f368c=!0x0;}}));if(_0x4f368c)return _0x5afb3b('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x5bd8('0x12')===typeof window['vtexjs']&&_0x5bd8('0x4')!==typeof window[_0x5bd8('0x2c')][_0x5bd8('0x31')])var _0x366271=window['vtexjs']['checkout'];else if('object'===typeof vtex&&_0x5bd8('0x12')===typeof vtex[_0x5bd8('0x31')]&&_0x5bd8('0x4')!==typeof vtex[_0x5bd8('0x31')][_0x5bd8('0x32')])_0x366271=new vtex[(_0x5bd8('0x31'))]['SDK']();else return _0x5afb3b('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x340e8b['cartContainer']=_0x5bd8('0x33');var _0x257706=function(_0x221893){_0x293f22(this)['append'](_0x221893);_0x221893[_0x5bd8('0x34')](_0x5bd8('0x35'))[_0x5bd8('0x36')](_0x293f22(_0x5bd8('0x37')))['on'](_0x5bd8('0x38'),function(){_0x1cf47a[_0x5bd8('0x39')](_0x5bd8('0x3a'));_0x293f22(document['body'])[_0x5bd8('0x39')](_0x5bd8('0x3b'));});_0x293f22(document)[_0x5bd8('0x3c')](_0x5bd8('0x3d'))['on']('keyup.qd_ddc_closeFn',function(_0x4ffd0b){0x1b==_0x4ffd0b['keyCode']&&(_0x1cf47a['removeClass'](_0x5bd8('0x3a')),_0x293f22(document[_0x5bd8('0x3e')])[_0x5bd8('0x39')](_0x5bd8('0x3b')));});var _0x26cb6d=_0x221893[_0x5bd8('0x34')](_0x5bd8('0x3f'));_0x221893[_0x5bd8('0x34')]('.qd-ddc-scrollUp')['on'](_0x5bd8('0x40'),function(){_0x340e8b[_0x5bd8('0x41')]('-',void 0x0,void 0x0,_0x26cb6d);return!0x1;});_0x221893[_0x5bd8('0x34')]('.qd-ddc-scrollDown')['on']('click.qd_ddc_scrollDown',function(){_0x340e8b[_0x5bd8('0x41')](void 0x0,void 0x0,void 0x0,_0x26cb6d);return!0x1;});_0x221893[_0x5bd8('0x34')](_0x5bd8('0x42'))[_0x5bd8('0x43')]('')['on'](_0x5bd8('0x44'),function(){_0x340e8b[_0x5bd8('0x45')](_0x293f22(this));});if(_0x3f4acd[_0x5bd8('0x46')]){var _0x285bff=0x0;_0x293f22(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x221893=function(){window[_0x5bd8('0x1b')][_0x5bd8('0x1c')]&&(_0x340e8b['getCartInfoByUrl'](),window[_0x5bd8('0x1b')]['allowUpdate']=!0x1,_0x293f22['fn'][_0x5bd8('0x47')](!0x0),_0x340e8b[_0x5bd8('0x48')]());};_0x285bff=setInterval(function(){_0x221893();},0x258);_0x221893();});_0x293f22(this)['on'](_0x5bd8('0x49'),function(){clearInterval(_0x285bff);});}};var _0x4504fe=function(_0x26c10b){_0x26c10b=_0x293f22(_0x26c10b);_0x3f4acd[_0x5bd8('0x4a')][_0x5bd8('0x4b')]=_0x3f4acd[_0x5bd8('0x4a')][_0x5bd8('0x4b')][_0x5bd8('0x2')]('#value',_0x5bd8('0x4c'));_0x3f4acd[_0x5bd8('0x4a')][_0x5bd8('0x4b')]=_0x3f4acd['texts'][_0x5bd8('0x4b')][_0x5bd8('0x2')](_0x5bd8('0x4d'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x3f4acd[_0x5bd8('0x4a')][_0x5bd8('0x4b')]=_0x3f4acd[_0x5bd8('0x4a')][_0x5bd8('0x4b')][_0x5bd8('0x2')]('#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x3f4acd[_0x5bd8('0x4a')][_0x5bd8('0x4b')]=_0x3f4acd['texts']['cartTotal'][_0x5bd8('0x2')](_0x5bd8('0x4e'),_0x5bd8('0x4f'));_0x26c10b[_0x5bd8('0x34')](_0x5bd8('0x50'))[_0x5bd8('0x51')](_0x3f4acd[_0x5bd8('0x4a')][_0x5bd8('0x52')]);_0x26c10b['find'](_0x5bd8('0x53'))[_0x5bd8('0x51')](_0x3f4acd[_0x5bd8('0x4a')][_0x5bd8('0x54')]);_0x26c10b[_0x5bd8('0x34')](_0x5bd8('0x55'))[_0x5bd8('0x51')](_0x3f4acd['texts'][_0x5bd8('0x56')]);_0x26c10b[_0x5bd8('0x34')](_0x5bd8('0x57'))[_0x5bd8('0x51')](_0x3f4acd['texts'][_0x5bd8('0x4b')]);_0x26c10b[_0x5bd8('0x34')](_0x5bd8('0x58'))[_0x5bd8('0x51')](_0x3f4acd[_0x5bd8('0x4a')][_0x5bd8('0x59')]);_0x26c10b[_0x5bd8('0x34')]('.qd-ddc-emptyCart\x20p')['html'](_0x3f4acd['texts'][_0x5bd8('0x5a')]);return _0x26c10b;}(this[_0x5bd8('0x5b')]);var _0x4aab3f=0x0;_0x1cf47a[_0x5bd8('0x5c')](function(){0x0<_0x4aab3f?_0x257706['call'](this,_0x4504fe[_0x5bd8('0x5d')]()):_0x257706[_0x5bd8('0x5e')](this,_0x4504fe);_0x4aab3f++;});window[_0x5bd8('0xb')][_0x5bd8('0xc')][_0x5bd8('0x36')](function(){_0x293f22(_0x5bd8('0x5f'))[_0x5bd8('0x51')](window[_0x5bd8('0xb')][_0x5bd8('0x60')]||'--');_0x293f22(_0x5bd8('0x61'))[_0x5bd8('0x51')](window[_0x5bd8('0xb')][_0x5bd8('0x62')]||'0');_0x293f22(_0x5bd8('0x63'))['html'](window[_0x5bd8('0xb')]['shipping']||'--');_0x293f22('.qd-ddc-infoAllTotal')[_0x5bd8('0x51')](window[_0x5bd8('0xb')]['allTotal']||'--');});var _0x3f37b2=function(_0x127321,_0x3bba46){if(_0x5bd8('0x4')===typeof _0x127321[_0x5bd8('0x64')])return _0x5afb3b('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x340e8b[_0x5bd8('0x65')][_0x5bd8('0x5e')](this,_0x3bba46);};_0x340e8b[_0x5bd8('0x66')]=function(_0x2f1210,_0x32c964){'undefined'!=typeof _0x32c964?window[_0x5bd8('0x1b')]['dataOptionsCache']=_0x32c964:window[_0x5bd8('0x1b')][_0x5bd8('0x67')]&&(_0x32c964=window[_0x5bd8('0x1b')][_0x5bd8('0x67')]);setTimeout(function(){window[_0x5bd8('0x1b')]['dataOptionsCache']=void 0x0;},_0x3f4acd[_0x5bd8('0x68')]);_0x293f22(_0x5bd8('0x69'))[_0x5bd8('0x39')]('qd-ddc-prodLoaded');if(_0x3f4acd['smartCheckout']){var _0x285bff=function(_0x38af24){window[_0x5bd8('0x1b')][_0x5bd8('0x6a')]=_0x38af24;_0x3f37b2(_0x38af24,_0x32c964);'undefined'!==typeof window[_0x5bd8('0x6b')]&&_0x5bd8('0xe')===typeof window[_0x5bd8('0x6b')][_0x5bd8('0x6c')]&&window[_0x5bd8('0x6b')]['exec'][_0x5bd8('0x5e')](this);_0x293f22(_0x5bd8('0x69'))[_0x5bd8('0x6d')](_0x5bd8('0x6e'));};_0x5bd8('0x4')!==typeof window[_0x5bd8('0x1b')]['getOrderForm']?(_0x285bff(window[_0x5bd8('0x1b')][_0x5bd8('0x6a')]),_0x5bd8('0xe')===typeof _0x2f1210&&_0x2f1210(window['_QuatroDigital_DropDown'][_0x5bd8('0x6a')])):_0x293f22[_0x5bd8('0x6f')](['items','totalizers',_0x5bd8('0x70')],{'done':function(_0x32538b){_0x285bff[_0x5bd8('0x5e')](this,_0x32538b);'function'===typeof _0x2f1210&&_0x2f1210(_0x32538b);},'fail':function(_0x26f867){_0x5afb3b([_0x5bd8('0x71'),_0x26f867]);}});}else alert(_0x5bd8('0x72'));};_0x340e8b[_0x5bd8('0x48')]=function(){var _0x19639f=_0x293f22(_0x5bd8('0x69'));_0x19639f['find'](_0x5bd8('0x73'))['length']?_0x19639f[_0x5bd8('0x39')](_0x5bd8('0x74')):_0x19639f[_0x5bd8('0x6d')](_0x5bd8('0x74'));};_0x340e8b['renderProductsList']=function(_0x4b37e8){var _0x285bff=_0x293f22('.qd-ddc-prodWrapper2');_0x285bff[_0x5bd8('0x75')]();_0x285bff['each'](function(){var _0x285bff=_0x293f22(this),_0x3b545b,_0x3bbe03,_0x2eba8e=_0x293f22(''),_0x2be31f;for(_0x2be31f in window[_0x5bd8('0x1b')]['getOrderForm'][_0x5bd8('0x64')])if(_0x5bd8('0x12')===typeof window['_QuatroDigital_DropDown'][_0x5bd8('0x6a')][_0x5bd8('0x64')][_0x2be31f]){var _0x3d5d50=window['_QuatroDigital_DropDown']['getOrderForm'][_0x5bd8('0x64')][_0x2be31f];var _0x4fa686=_0x3d5d50[_0x5bd8('0x76')][_0x5bd8('0x2')](/^\/|\/$/g,'')[_0x5bd8('0x8')]('/');var _0x750fbb=_0x293f22(_0x5bd8('0x77'));_0x750fbb[_0x5bd8('0x78')]({'data-sku':_0x3d5d50['id'],'data-sku-index':_0x2be31f,'data-qd-departament':_0x4fa686[0x0],'data-qd-category':_0x4fa686[_0x4fa686[_0x5bd8('0x9')]-0x1]});_0x750fbb['addClass']('qd-ddc-'+_0x3d5d50[_0x5bd8('0x79')]);_0x750fbb[_0x5bd8('0x34')](_0x5bd8('0x7a'))[_0x5bd8('0x7b')](_0x3f4acd[_0x5bd8('0x7c')](_0x3d5d50));_0x750fbb[_0x5bd8('0x34')]('.qd-ddc-prodPrice')['append'](isNaN(_0x3d5d50[_0x5bd8('0x7d')])?_0x3d5d50[_0x5bd8('0x7d')]:0x0==_0x3d5d50[_0x5bd8('0x7d')]?_0x5bd8('0x7e'):(_0x293f22(_0x5bd8('0x7f'))[_0x5bd8('0x78')](_0x5bd8('0x80'))||'R$')+'\x20'+qd_number_format(_0x3d5d50[_0x5bd8('0x7d')]/0x64,0x2,',','.'));_0x750fbb['find']('.qd-ddc-quantity')[_0x5bd8('0x78')]({'data-sku':_0x3d5d50['id'],'data-sku-index':_0x2be31f})['val'](_0x3d5d50['quantity']);_0x750fbb[_0x5bd8('0x34')]('.qd-ddc-remove')[_0x5bd8('0x78')]({'data-sku':_0x3d5d50['id'],'data-sku-index':_0x2be31f});_0x340e8b['insertProdImg'](_0x3d5d50['id'],_0x750fbb[_0x5bd8('0x34')](_0x5bd8('0x81')),_0x3d5d50[_0x5bd8('0x82')]);_0x750fbb[_0x5bd8('0x34')](_0x5bd8('0x83'))[_0x5bd8('0x78')]({'data-sku':_0x3d5d50['id'],'data-sku-index':_0x2be31f});_0x750fbb[_0x5bd8('0x84')](_0x285bff);_0x2eba8e=_0x2eba8e[_0x5bd8('0x36')](_0x750fbb);}try{var _0x366271=_0x285bff[_0x5bd8('0x0')](_0x5bd8('0x69'))[_0x5bd8('0x34')](_0x5bd8('0x42'));_0x366271[_0x5bd8('0x9')]&&''==_0x366271['val']()&&window[_0x5bd8('0x1b')][_0x5bd8('0x6a')]['shippingData'][_0x5bd8('0x85')]&&_0x366271[_0x5bd8('0x43')](window[_0x5bd8('0x1b')][_0x5bd8('0x6a')][_0x5bd8('0x70')][_0x5bd8('0x85')]['postalCode']);}catch(_0x31547f){_0x5afb3b(_0x5bd8('0x86')+_0x31547f['message'],_0x5bd8('0x18'));}_0x340e8b[_0x5bd8('0x87')](_0x285bff);_0x340e8b[_0x5bd8('0x48')]();_0x4b37e8&&_0x4b37e8[_0x5bd8('0x88')]&&function(){_0x3bbe03=_0x2eba8e['filter'](_0x5bd8('0x89')+_0x4b37e8[_0x5bd8('0x88')]+'\x27]');_0x3bbe03[_0x5bd8('0x9')]&&(_0x3b545b=0x0,_0x2eba8e[_0x5bd8('0x5c')](function(){var _0x4b37e8=_0x293f22(this);if(_0x4b37e8['is'](_0x3bbe03))return!0x1;_0x3b545b+=_0x4b37e8[_0x5bd8('0x8a')]();}),_0x340e8b[_0x5bd8('0x41')](void 0x0,void 0x0,_0x3b545b,_0x285bff[_0x5bd8('0x36')](_0x285bff[_0x5bd8('0x8b')]())),_0x2eba8e[_0x5bd8('0x39')](_0x5bd8('0x8c')),function(_0x6b2ab7){_0x6b2ab7['addClass'](_0x5bd8('0x8d'));_0x6b2ab7[_0x5bd8('0x6d')](_0x5bd8('0x8c'));setTimeout(function(){_0x6b2ab7['removeClass'](_0x5bd8('0x8d'));},_0x3f4acd[_0x5bd8('0x68')]);}(_0x3bbe03),_0x293f22(document['body'])[_0x5bd8('0x6d')](_0x5bd8('0x8e')),setTimeout(function(){_0x293f22(document[_0x5bd8('0x3e')])[_0x5bd8('0x39')](_0x5bd8('0x8e'));},_0x3f4acd['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x5bd8('0x64')][_0x5bd8('0x9')]?(_0x293f22(_0x5bd8('0x3e'))[_0x5bd8('0x39')](_0x5bd8('0x8f'))[_0x5bd8('0x6d')](_0x5bd8('0x90')),setTimeout(function(){_0x293f22('body')[_0x5bd8('0x39')]('qd-ddc-product-add-time');},_0x3f4acd[_0x5bd8('0x68')])):_0x293f22(_0x5bd8('0x3e'))[_0x5bd8('0x39')](_0x5bd8('0x91'))[_0x5bd8('0x6d')](_0x5bd8('0x8f'));}());'function'===typeof _0x3f4acd['callbackProductsList']?_0x3f4acd[_0x5bd8('0x92')][_0x5bd8('0x5e')](this):_0x5afb3b(_0x5bd8('0x93'));};_0x340e8b[_0x5bd8('0x94')]=function(_0x1aa853,_0x360a9d,_0x3a9f3d){function _0x3ef581(){_0x360a9d[_0x5bd8('0x39')](_0x5bd8('0x95'))['load'](function(){_0x293f22(this)[_0x5bd8('0x6d')](_0x5bd8('0x95'));})[_0x5bd8('0x78')](_0x5bd8('0x96'),_0x3a9f3d);}_0x3a9f3d?_0x3ef581():isNaN(_0x1aa853)?_0x5afb3b(_0x5bd8('0x97'),_0x5bd8('0x17')):alert(_0x5bd8('0x98'));};_0x340e8b[_0x5bd8('0x87')]=function(_0x2ad2fc){var _0x285bff=function(_0x107d68,_0x22d91b){var _0x472917=_0x293f22(_0x107d68);var _0x2dfad2=_0x472917['attr']('data-sku');var _0x3bbe03=_0x472917['attr'](_0x5bd8('0x99'));if(_0x2dfad2){var _0x326748=parseInt(_0x472917[_0x5bd8('0x43')]())||0x1;_0x340e8b[_0x5bd8('0x9a')]([_0x2dfad2,_0x3bbe03],_0x326748,_0x326748+0x1,function(_0x989af8){_0x472917[_0x5bd8('0x43')](_0x989af8);'function'===typeof _0x22d91b&&_0x22d91b();});}};var _0x1f1b5d=function(_0x1a5da7,_0x5ddb14){var _0x36bfcc=_0x293f22(_0x1a5da7);var _0x3bbe03=_0x36bfcc['attr'](_0x5bd8('0x9b'));var _0x1e659c=_0x36bfcc[_0x5bd8('0x78')](_0x5bd8('0x99'));if(_0x3bbe03){var _0x397edf=parseInt(_0x36bfcc[_0x5bd8('0x43')]())||0x2;_0x340e8b[_0x5bd8('0x9a')]([_0x3bbe03,_0x1e659c],_0x397edf,_0x397edf-0x1,function(_0x496749){_0x36bfcc[_0x5bd8('0x43')](_0x496749);'function'===typeof _0x5ddb14&&_0x5ddb14();});}};var _0x1b8cea=function(_0xfaa8b8,_0x14a968){var _0x285bff=_0x293f22(_0xfaa8b8);var _0x3bbe03=_0x285bff[_0x5bd8('0x78')]('data-sku');var _0x64f594=_0x285bff[_0x5bd8('0x78')](_0x5bd8('0x99'));if(_0x3bbe03){var _0x4ea223=parseInt(_0x285bff[_0x5bd8('0x43')]())||0x1;_0x340e8b[_0x5bd8('0x9a')]([_0x3bbe03,_0x64f594],0x1,_0x4ea223,function(_0x56bc11){_0x285bff[_0x5bd8('0x43')](_0x56bc11);_0x5bd8('0xe')===typeof _0x14a968&&_0x14a968();});}};var _0x3bbe03=_0x2ad2fc['find'](_0x5bd8('0x9c'));_0x3bbe03['addClass'](_0x5bd8('0x9d'))[_0x5bd8('0x5c')](function(){var _0x2ad2fc=_0x293f22(this);_0x2ad2fc[_0x5bd8('0x34')](_0x5bd8('0x9e'))['on'](_0x5bd8('0x9f'),function(_0xcb8f44){_0xcb8f44[_0x5bd8('0xa0')]();_0x3bbe03[_0x5bd8('0x6d')](_0x5bd8('0xa1'));_0x285bff(_0x2ad2fc[_0x5bd8('0x34')](_0x5bd8('0xa2')),function(){_0x3bbe03[_0x5bd8('0x39')](_0x5bd8('0xa1'));});});_0x2ad2fc[_0x5bd8('0x34')](_0x5bd8('0xa3'))['on'](_0x5bd8('0xa4'),function(_0x4d1ac4){_0x4d1ac4[_0x5bd8('0xa0')]();_0x3bbe03['addClass'](_0x5bd8('0xa1'));_0x1f1b5d(_0x2ad2fc[_0x5bd8('0x34')]('.qd-ddc-quantity'),function(){_0x3bbe03[_0x5bd8('0x39')](_0x5bd8('0xa1'));});});_0x2ad2fc[_0x5bd8('0x34')]('.qd-ddc-quantity')['on'](_0x5bd8('0xa5'),function(){_0x3bbe03[_0x5bd8('0x6d')](_0x5bd8('0xa1'));_0x1b8cea(this,function(){_0x3bbe03[_0x5bd8('0x39')](_0x5bd8('0xa1'));});});_0x2ad2fc['find'](_0x5bd8('0xa2'))['on'](_0x5bd8('0xa6'),function(_0x5350b7){0xd==_0x5350b7['keyCode']&&(_0x3bbe03['addClass'](_0x5bd8('0xa1')),_0x1b8cea(this,function(){_0x3bbe03[_0x5bd8('0x39')](_0x5bd8('0xa1'));}));});});_0x2ad2fc[_0x5bd8('0x34')](_0x5bd8('0x73'))[_0x5bd8('0x5c')](function(){var _0x2ad2fc=_0x293f22(this);_0x2ad2fc['find']('.qd-ddc-remove')['on'](_0x5bd8('0xa7'),function(){_0x2ad2fc[_0x5bd8('0x6d')](_0x5bd8('0xa1'));_0x340e8b[_0x5bd8('0xa8')](_0x293f22(this),function(_0x28b31e){_0x28b31e?_0x2ad2fc[_0x5bd8('0xa9')](!0x0)[_0x5bd8('0xaa')](function(){_0x2ad2fc[_0x5bd8('0xab')]();_0x340e8b[_0x5bd8('0x48')]();}):_0x2ad2fc[_0x5bd8('0x39')](_0x5bd8('0xa1'));});return!0x1;});});};_0x340e8b[_0x5bd8('0x45')]=function(_0x384555){var _0x2ee62e=_0x384555[_0x5bd8('0x43')]();_0x2ee62e=_0x2ee62e[_0x5bd8('0x2')](/[^0-9\-]/g,'');_0x2ee62e=_0x2ee62e['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x5bd8('0xac'));_0x2ee62e=_0x2ee62e[_0x5bd8('0x2')](/(.{9}).*/g,'$1');_0x384555[_0x5bd8('0x43')](_0x2ee62e);0x9<=_0x2ee62e[_0x5bd8('0x9')]&&(_0x384555[_0x5bd8('0xad')]('qdDdcLastPostalCode')!=_0x2ee62e&&_0x366271[_0x5bd8('0xae')]({'postalCode':_0x2ee62e,'country':'BRA'})[_0x5bd8('0xaf')](function(_0x3a50de){window[_0x5bd8('0x1b')][_0x5bd8('0x6a')]=_0x3a50de;_0x340e8b[_0x5bd8('0x66')]();})[_0x5bd8('0xb0')](function(_0x237cc1){_0x5afb3b([_0x5bd8('0xb1'),_0x237cc1]);updateCartData();}),_0x384555[_0x5bd8('0xad')]('qdDdcLastPostalCode',_0x2ee62e));};_0x340e8b[_0x5bd8('0x9a')]=function(_0x26bb35,_0x48ffc2,_0x2b167f,_0x4bb5f1){function _0x591f9b(_0x55b048){_0x55b048=_0x5bd8('0xb2')!==typeof _0x55b048?!0x1:_0x55b048;_0x340e8b[_0x5bd8('0x66')]();window['_QuatroDigital_DropDown'][_0x5bd8('0x1c')]=!0x1;_0x340e8b['cartIsEmpty']();_0x5bd8('0x4')!==typeof window[_0x5bd8('0x6b')]&&_0x5bd8('0xe')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0x5bd8('0x6b')][_0x5bd8('0x6c')][_0x5bd8('0x5e')](this);_0x5bd8('0xe')===typeof adminCart&&adminCart();_0x293f22['fn'][_0x5bd8('0x47')](!0x0,void 0x0,_0x55b048);_0x5bd8('0xe')===typeof _0x4bb5f1&&_0x4bb5f1(_0x48ffc2);}_0x2b167f=_0x2b167f||0x1;if(0x1>_0x2b167f)return _0x48ffc2;if(_0x3f4acd[_0x5bd8('0x2b')]){if(_0x5bd8('0x4')===typeof window[_0x5bd8('0x1b')][_0x5bd8('0x6a')]['items'][_0x26bb35[0x1]])return _0x5afb3b(_0x5bd8('0xb3')+_0x26bb35[0x1]+']'),_0x48ffc2;window[_0x5bd8('0x1b')][_0x5bd8('0x6a')]['items'][_0x26bb35[0x1]][_0x5bd8('0xb4')]=_0x2b167f;window[_0x5bd8('0x1b')][_0x5bd8('0x6a')][_0x5bd8('0x64')][_0x26bb35[0x1]][_0x5bd8('0xb5')]=_0x26bb35[0x1];_0x366271[_0x5bd8('0xb6')]([window[_0x5bd8('0x1b')]['getOrderForm'][_0x5bd8('0x64')][_0x26bb35[0x1]]],[_0x5bd8('0x64'),_0x5bd8('0xb7'),_0x5bd8('0x70')])[_0x5bd8('0xaf')](function(_0x4393ef){window[_0x5bd8('0x1b')][_0x5bd8('0x6a')]=_0x4393ef;_0x591f9b(!0x0);})['fail'](function(_0x4a1b11){_0x5afb3b([_0x5bd8('0xb8'),_0x4a1b11]);_0x591f9b();});}else _0x5afb3b(_0x5bd8('0xb9'));};_0x340e8b[_0x5bd8('0xa8')]=function(_0x54ad4d,_0x37df86){function _0x271c60(_0x5e3e14){_0x5e3e14=_0x5bd8('0xb2')!==typeof _0x5e3e14?!0x1:_0x5e3e14;_0x5bd8('0x4')!==typeof window[_0x5bd8('0x6b')]&&'function'===typeof window['_QuatroDigital_AmountProduct'][_0x5bd8('0x6c')]&&window[_0x5bd8('0x6b')][_0x5bd8('0x6c')][_0x5bd8('0x5e')](this);_0x5bd8('0xe')===typeof adminCart&&adminCart();_0x293f22['fn'][_0x5bd8('0x47')](!0x0,void 0x0,_0x5e3e14);_0x5bd8('0xe')===typeof _0x37df86&&_0x37df86(_0x3bbe03);}var _0x3bbe03=!0x1,_0x793d4a=_0x293f22(_0x54ad4d)['attr'](_0x5bd8('0x99'));if(_0x3f4acd[_0x5bd8('0x2b')]){if(_0x5bd8('0x4')===typeof window[_0x5bd8('0x1b')][_0x5bd8('0x6a')][_0x5bd8('0x64')][_0x793d4a])return _0x5afb3b(_0x5bd8('0xb3')+_0x793d4a+']'),_0x3bbe03;window['_QuatroDigital_DropDown']['getOrderForm'][_0x5bd8('0x64')][_0x793d4a][_0x5bd8('0xb5')]=_0x793d4a;_0x366271[_0x5bd8('0xba')]([window[_0x5bd8('0x1b')][_0x5bd8('0x6a')]['items'][_0x793d4a]],[_0x5bd8('0x64'),_0x5bd8('0xb7'),_0x5bd8('0x70')])[_0x5bd8('0xaf')](function(_0x2ce25a){_0x3bbe03=!0x0;window[_0x5bd8('0x1b')][_0x5bd8('0x6a')]=_0x2ce25a;_0x3f37b2(_0x2ce25a);_0x271c60(!0x0);})['fail'](function(_0x55b657){_0x5afb3b([_0x5bd8('0xbb'),_0x55b657]);_0x271c60();});}else alert(_0x5bd8('0xbc'));};_0x340e8b[_0x5bd8('0x41')]=function(_0x5c8a84,_0xd1ae82,_0x2804ea,_0x3c0183){_0x3c0183=_0x3c0183||_0x293f22(_0x5bd8('0xbd'));_0x5c8a84=_0x5c8a84||'+';_0xd1ae82=_0xd1ae82||0.9*_0x3c0183['height']();_0x3c0183['stop'](!0x0,!0x0)[_0x5bd8('0xbe')]({'scrollTop':isNaN(_0x2804ea)?_0x5c8a84+'='+_0xd1ae82+'px':_0x2804ea});};_0x3f4acd[_0x5bd8('0x46')]||(_0x340e8b['getCartInfoByUrl'](),_0x293f22['fn'][_0x5bd8('0x47')](!0x0));_0x293f22(window)['on'](_0x5bd8('0xbf'),function(){try{window[_0x5bd8('0x1b')]['getOrderForm']=void 0x0,_0x340e8b['getCartInfoByUrl']();}catch(_0x51b1a6){_0x5afb3b(_0x5bd8('0xc0')+_0x51b1a6[_0x5bd8('0x11')],_0x5bd8('0xc1'));}});'function'===typeof _0x3f4acd[_0x5bd8('0xc')]?_0x3f4acd['callback'][_0x5bd8('0x5e')](this):_0x5afb3b('Callback\x20não\x20é\x20uma\x20função');};_0x293f22['fn'][_0x5bd8('0x1d')]=function(_0xac42de){var _0x2e8f7c=_0x293f22(this);_0x2e8f7c['fn']=new _0x293f22[(_0x5bd8('0x1d'))](this,_0xac42de);return _0x2e8f7c;};}catch(_0x4156b1){_0x5bd8('0x4')!==typeof console&&_0x5bd8('0xe')===typeof console[_0x5bd8('0xf')]&&console[_0x5bd8('0xf')]('Oooops!\x20',_0x4156b1);}}(this));(function(_0x1b76a0){try{var _0x2a49e3=jQuery;window[_0x5bd8('0x6b')]=window[_0x5bd8('0x6b')]||{};window[_0x5bd8('0x6b')][_0x5bd8('0x64')]={};window['_QuatroDigital_AmountProduct'][_0x5bd8('0xc2')]=!0x1;window['_QuatroDigital_AmountProduct']['buyButtonClicked']=!0x1;window[_0x5bd8('0x6b')][_0x5bd8('0xc3')]=!0x1;var _0x2a29c3=function(){if(window[_0x5bd8('0x6b')]['allowRecalculate']){var _0x5b0603=!0x1;var _0x1c7b17={};window[_0x5bd8('0x6b')][_0x5bd8('0x64')]={};for(_0x201bfd in window['_QuatroDigital_DropDown'][_0x5bd8('0x6a')][_0x5bd8('0x64')])if(_0x5bd8('0x12')===typeof window[_0x5bd8('0x1b')]['getOrderForm']['items'][_0x201bfd]){var _0x595222=window[_0x5bd8('0x1b')]['getOrderForm'][_0x5bd8('0x64')][_0x201bfd];_0x5bd8('0x4')!==typeof _0x595222[_0x5bd8('0xc4')]&&null!==_0x595222[_0x5bd8('0xc4')]&&''!==_0x595222[_0x5bd8('0xc4')]&&(window[_0x5bd8('0x6b')][_0x5bd8('0x64')][_0x5bd8('0xc5')+_0x595222[_0x5bd8('0xc4')]]=window[_0x5bd8('0x6b')][_0x5bd8('0x64')][_0x5bd8('0xc5')+_0x595222[_0x5bd8('0xc4')]]||{},window['_QuatroDigital_AmountProduct'][_0x5bd8('0x64')]['prod_'+_0x595222['productId']][_0x5bd8('0xc6')]=_0x595222['productId'],_0x1c7b17['prod_'+_0x595222[_0x5bd8('0xc4')]]||(window[_0x5bd8('0x6b')]['items'][_0x5bd8('0xc5')+_0x595222[_0x5bd8('0xc4')]]['qtt']=0x0),window[_0x5bd8('0x6b')][_0x5bd8('0x64')][_0x5bd8('0xc5')+_0x595222[_0x5bd8('0xc4')]][_0x5bd8('0x62')]+=_0x595222['quantity'],_0x5b0603=!0x0,_0x1c7b17['prod_'+_0x595222[_0x5bd8('0xc4')]]=!0x0);}var _0x201bfd=_0x5b0603;}else _0x201bfd=void 0x0;window[_0x5bd8('0x6b')]['allowRecalculate']&&(_0x2a49e3(_0x5bd8('0xc7'))[_0x5bd8('0xab')](),_0x2a49e3(_0x5bd8('0xc8'))[_0x5bd8('0x39')](_0x5bd8('0xc9')));for(var _0x18bb36 in window[_0x5bd8('0x6b')][_0x5bd8('0x64')]){_0x595222=window[_0x5bd8('0x6b')][_0x5bd8('0x64')][_0x18bb36];if(_0x5bd8('0x12')!==typeof _0x595222)return;_0x1c7b17=_0x2a49e3(_0x5bd8('0xca')+_0x595222[_0x5bd8('0xc6')]+']')[_0x5bd8('0x0')]('li');if(window[_0x5bd8('0x6b')][_0x5bd8('0xc2')]||!_0x1c7b17[_0x5bd8('0x34')](_0x5bd8('0xc7'))['length'])_0x5b0603=_0x2a49e3(_0x5bd8('0xcb')),_0x5b0603[_0x5bd8('0x34')]('.qd-bap-qtt')[_0x5bd8('0x51')](_0x595222[_0x5bd8('0x62')]),_0x595222=_0x1c7b17[_0x5bd8('0x34')](_0x5bd8('0xcc')),_0x595222[_0x5bd8('0x9')]?_0x595222[_0x5bd8('0xcd')](_0x5b0603)[_0x5bd8('0x6d')](_0x5bd8('0xc9')):_0x1c7b17[_0x5bd8('0xcd')](_0x5b0603);}_0x201bfd&&(window[_0x5bd8('0x6b')][_0x5bd8('0xc2')]=!0x1);};window[_0x5bd8('0x6b')]['exec']=function(){window[_0x5bd8('0x6b')][_0x5bd8('0xc2')]=!0x0;_0x2a29c3[_0x5bd8('0x5e')](this);};_0x2a49e3(document)[_0x5bd8('0xce')](function(){_0x2a29c3[_0x5bd8('0x5e')](this);});}catch(_0x4cf1ed){_0x5bd8('0x4')!==typeof console&&_0x5bd8('0xe')===typeof console[_0x5bd8('0xf')]&&console[_0x5bd8('0xf')]('Oooops!\x20',_0x4cf1ed);}}(this));(function(){try{var _0xa90921=jQuery,_0x3d2de0,_0x1673e3={'selector':_0x5bd8('0xcf'),'dropDown':{},'buyButton':{}};_0xa90921['QD_smartCart']=function(_0x361190){var _0x13ed46={};_0x3d2de0=_0xa90921['extend'](!0x0,{},_0x1673e3,_0x361190);_0x361190=_0xa90921(_0x3d2de0[_0x5bd8('0xd0')])['QD_dropDownCart'](_0x3d2de0[_0x5bd8('0xd1')]);_0x13ed46['buyButton']='undefined'!==typeof _0x3d2de0[_0x5bd8('0xd1')]['updateOnlyHover']&&!0x1===_0x3d2de0[_0x5bd8('0xd1')][_0x5bd8('0x46')]?_0xa90921(_0x3d2de0[_0x5bd8('0xd0')])[_0x5bd8('0xd2')](_0x361190['fn'],_0x3d2de0[_0x5bd8('0xd3')]):_0xa90921(_0x3d2de0[_0x5bd8('0xd0')])[_0x5bd8('0xd2')](_0x3d2de0[_0x5bd8('0xd3')]);_0x13ed46[_0x5bd8('0xd1')]=_0x361190;return _0x13ed46;};_0xa90921['fn']['smartCart']=function(){_0x5bd8('0x12')===typeof console&&_0x5bd8('0xe')===typeof console['info']&&console[_0x5bd8('0x13')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0xa90921[_0x5bd8('0xd4')]=_0xa90921['fn'][_0x5bd8('0xd4')];}catch(_0x2cc55f){'undefined'!==typeof console&&'function'===typeof console[_0x5bd8('0xf')]&&console['error'](_0x5bd8('0x10'),_0x2cc55f);}}());

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

var _0xab09=['attr','src','sizes','width','insertAfter','closest','imageWrapper','qd-sil-on','offset','top','push','each','QD_SIL_scrollRange','scroll','documentElement','QD_SIL_scroll','function','QD_smartImageLoad','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','join','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','undefined','info','warn','object','alerta','toLowerCase','aviso','apply','error','.qd_sil_img_wrapper','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','not','.qd-sil-on','length','scrollTop','bottom','height','first','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','load','addClass','qd-sil-image-loaded'];(function(_0x5d1a2a,_0x57215d){var _0x1d3c7d=function(_0x1b9fd3){while(--_0x1b9fd3){_0x5d1a2a['push'](_0x5d1a2a['shift']());}};_0x1d3c7d(++_0x57215d);}(_0xab09,0x1b8));var _0x9ab0=function(_0x55c79d,_0x41e265){_0x55c79d=_0x55c79d-0x0;var _0x587e0f=_0xab09[_0x55c79d];return _0x587e0f;};(function(_0x151cc2){'use strict';var _0x1a939b=jQuery;if(typeof _0x1a939b['fn']['QD_smartImageLoad']===_0x9ab0('0x0'))return;_0x1a939b['fn'][_0x9ab0('0x1')]=function(){};var _0x3121cd=function(_0x4aba64){var _0x53c96d={'c':_0x9ab0('0x2')};return function(_0x3ddc5e){var _0x1805f6,_0x3f15b7,_0x29e166,_0x5ae585;_0x3f15b7=function(_0x230857){return _0x230857;};_0x29e166=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3ddc5e=_0x3ddc5e['d'+_0x29e166[0x10]+'c'+_0x29e166[0x11]+'m'+_0x3f15b7(_0x29e166[0x1])+'n'+_0x29e166[0xd]]['l'+_0x29e166[0x12]+'c'+_0x29e166[0x0]+'ti'+_0x3f15b7('o')+'n'];_0x1805f6=function(_0x39284e){return escape(encodeURIComponent(_0x39284e['replace'](/\./g,'¨')[_0x9ab0('0x3')](/[a-zA-Z]/g,function(_0x4c1bbd){return String['fromCharCode'](('Z'>=_0x4c1bbd?0x5a:0x7a)>=(_0x4c1bbd=_0x4c1bbd[_0x9ab0('0x4')](0x0)+0xd)?_0x4c1bbd:_0x4c1bbd-0x1a);})));};var _0x48a72d=_0x1805f6(_0x3ddc5e[[_0x29e166[0x9],_0x3f15b7('o'),_0x29e166[0xc],_0x29e166[_0x3f15b7(0xd)]][_0x9ab0('0x5')]('')]);_0x1805f6=_0x1805f6((window[['js',_0x3f15b7('no'),'m',_0x29e166[0x1],_0x29e166[0x4][_0x9ab0('0x6')](),_0x9ab0('0x7')][_0x9ab0('0x5')]('')]||_0x9ab0('0x8'))+['.v',_0x29e166[0xd],'e',_0x3f15b7('x'),'co',_0x3f15b7('mm'),_0x9ab0('0x9'),_0x29e166[0x1],'.c',_0x3f15b7('o'),'m.',_0x29e166[0x13],'r']['join'](''));for(var _0x25e349 in _0x53c96d){if(_0x1805f6===_0x25e349+_0x53c96d[_0x25e349]||_0x48a72d===_0x25e349+_0x53c96d[_0x25e349]){_0x5ae585='tr'+_0x29e166[0x11]+'e';break;}_0x5ae585='f'+_0x29e166[0x0]+'ls'+_0x3f15b7(_0x29e166[0x1])+'';}_0x3f15b7=!0x1;-0x1<_0x3ddc5e[[_0x29e166[0xc],'e',_0x29e166[0x0],'rc',_0x29e166[0x9]][_0x9ab0('0x5')]('')]['indexOf'](_0x9ab0('0xa'))&&(_0x3f15b7=!0x0);return[_0x5ae585,_0x3f15b7];}(_0x4aba64);}(window);if(!eval(_0x3121cd[0x0]))return _0x3121cd[0x1]?_0x3d80ab('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x523d67=_0x9ab0('0xb');var _0x3d80ab=function(_0x4647ed,_0x5b342c){if('object'===typeof console&&_0x9ab0('0xc')!==typeof console['error']&&'undefined'!==typeof console[_0x9ab0('0xd')]&&_0x9ab0('0xc')!==typeof console[_0x9ab0('0xe')]){if(_0x9ab0('0xf')==typeof _0x4647ed&&'function'==typeof _0x4647ed['unshift']){_0x4647ed['unshift']('['+_0x523d67+']\x0a');var _0x265b32=_0x4647ed;}else _0x265b32=['['+_0x523d67+']\x0a',_0x4647ed];if(_0x9ab0('0xc')==typeof _0x5b342c||_0x9ab0('0x10')!==_0x5b342c[_0x9ab0('0x11')]()&&_0x9ab0('0x12')!==_0x5b342c['toLowerCase']())if(_0x9ab0('0xc')!=typeof _0x5b342c&&_0x9ab0('0xd')==_0x5b342c['toLowerCase']())try{console[_0x9ab0('0xd')][_0x9ab0('0x13')](console,_0x265b32);}catch(_0x1859de){try{console[_0x9ab0('0xd')](_0x265b32[_0x9ab0('0x5')]('\x0a'));}catch(_0x29a427){}}else try{console[_0x9ab0('0x14')][_0x9ab0('0x13')](console,_0x265b32);}catch(_0x18f0cb){try{console[_0x9ab0('0x14')](_0x265b32[_0x9ab0('0x5')]('\x0a'));}catch(_0x5eb921){}}else try{console[_0x9ab0('0xe')]['apply'](console,_0x265b32);}catch(_0x2d7171){try{console['warn'](_0x265b32['join']('\x0a'));}catch(_0x388696){}}}};var _0x898ebd=/(ids\/[0-9]+-)[0-9-]+/i;var _0x3d88fa={'imageWrapper':_0x9ab0('0x15'),'sizes':{'width':_0x9ab0('0x16'),'height':_0x9ab0('0x16')}};var _0x2664ab=function(_0x4e72ad,_0x5362a8){'use strict';_0x77f14e();_0x1a939b(window)['on'](_0x9ab0('0x17'),_0x77f14e);function _0x77f14e(){try{var _0x5deec0=_0x4e72ad[_0x9ab0('0x18')](_0x5362a8['imageWrapper'])[_0x9ab0('0x19')](_0x9ab0('0x1a'))[_0x9ab0('0x18')]('img:visible');if(!_0x5deec0[_0x9ab0('0x1b')])return;var _0x5a483c=_0x1a939b(window);var _0x1acafb={'top':_0x5a483c[_0x9ab0('0x1c')]()};_0x1acafb[_0x9ab0('0x1d')]=_0x1acafb['top']+_0x5a483c[_0x9ab0('0x1e')]();var _0x40370c=_0x5deec0[_0x9ab0('0x1f')]()[_0x9ab0('0x1e')]();var _0x38c504=_0x545188(_0x5deec0,_0x1acafb,_0x40370c);for(var _0x408b39=0x0;_0x408b39<_0x38c504['length'];_0x408b39++)_0x4d10db(_0x1a939b(_0x38c504[_0x408b39]));}catch(_0x4e6341){typeof console!==_0x9ab0('0xc')&&typeof console[_0x9ab0('0x14')]===_0x9ab0('0x0')&&console[_0x9ab0('0x14')](_0x9ab0('0x20'),_0x4e6341);}}function _0x4d10db(_0x11588c){var _0x5c67f4=_0x11588c[_0x9ab0('0x21')]();_0x5c67f4['on'](_0x9ab0('0x22'),function(){_0x1a939b(this)[_0x9ab0('0x23')](_0x9ab0('0x24'));});_0x5c67f4[_0x9ab0('0x25')]({'src':_0x5c67f4[0x0][_0x9ab0('0x26')][_0x9ab0('0x3')](_0x898ebd,'$1'+_0x5362a8[_0x9ab0('0x27')][_0x9ab0('0x28')]+'-'+_0x5362a8[_0x9ab0('0x27')][_0x9ab0('0x1e')]),'width':_0x5362a8[_0x9ab0('0x27')][_0x9ab0('0x28')],'height':_0x5362a8[_0x9ab0('0x27')]['height']});_0x5c67f4[_0x9ab0('0x23')]('qd-sil-image')[_0x9ab0('0x29')](_0x11588c);_0x5c67f4[_0x9ab0('0x2a')](_0x5362a8[_0x9ab0('0x2b')])['addClass'](_0x9ab0('0x2c'));}function _0x545188(_0xa0a33a,_0x18dbda,_0x2a9913){var _0x36edc5;var _0x4c7542=[];for(var _0x22789d=0x0;_0x22789d<_0xa0a33a[_0x9ab0('0x1b')];_0x22789d++){_0x36edc5=_0x1a939b(_0xa0a33a[_0x22789d])[_0x9ab0('0x2d')]();_0x36edc5[_0x9ab0('0x1d')]=_0x36edc5['top']+_0x2a9913;if(!(_0x18dbda[_0x9ab0('0x1d')]<_0x36edc5[_0x9ab0('0x2e')]||_0x18dbda[_0x9ab0('0x2e')]>_0x36edc5['bottom'])){_0x4c7542[_0x9ab0('0x2f')](_0xa0a33a[_0x22789d]);}}return _0x4c7542;};};_0x1a939b['fn']['QD_smartImageLoad']=function(_0x455578){var _0x2c3dce=_0x1a939b(this);if(!_0x2c3dce[_0x9ab0('0x1b')])return _0x2c3dce;_0x2c3dce[_0x9ab0('0x30')](function(){var _0x1cf08e=_0x1a939b(this);_0x1cf08e['QD_smartImageLoad']=new _0x2664ab(_0x1cf08e,_0x1a939b['extend']({},_0x3d88fa,_0x455578));});return _0x2c3dce;};window[_0x9ab0('0x31')]=0x28;var _0x3c7a92=QD_SIL_scrollRange;var _0x2cf2df=0x0;_0x1a939b(window)['on'](_0x9ab0('0x32'),function(){var _0x526ebc=document[_0x9ab0('0x33')][_0x9ab0('0x1c')];if(_0x526ebc>_0x2cf2df+_0x3c7a92||_0x526ebc<_0x2cf2df-_0x3c7a92){_0x1a939b(window)['trigger'](_0x9ab0('0x34'));_0x2cf2df=_0x526ebc;}});}(this));

/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Quatro Digital - Smart Photo Carousel // 1.0 // Carlos Vinicius // Todos os direitos reservados */

/*FUNÇÕES AUXILIARES*/

(function(u){function p(d){return a.qdAjax({url:"/produto/sku/"+d,dataType:"json",error:function(){alert("erro ao buscar objeto SKU")}})}var a=jQuery;if("function"!==typeof a.fn.QD_smartPhotoCarousel){var l=/(ids\/[0-9]+-)[0-9-]+/i,q={imageWrapper:".qd-spc-image",thumbsWrapper:".qd-spc-thumbs",sizes:{thumb:"150-150",image:"500-500",imagezoom:"1000-1000"},slickOptions:{images:{lazyLoad:"ondemand",infinite:!1,arrows:!1},thumbs:{slidesToShow:3,slidesToScroll:1,arrows:!1,focusOnSelect:!0}},zoomOptions:{}},
t=function(d,c,b){b||(b=skuJson);p(b.skus[0].sku).done(function(b){b=b[0];try{var e=d.find(c.imageWrapper);e.length||(e=a('<div class="qd-spc-image"></div>').appendTo(d));var f=d.find(c.thumbsWrapper);f.length||(f=a('<div class="qd-spc-thumbs"></div>').appendTo(d));var h=[],k;for(k=0;k<b.Images.length;k++)h.push(b.Images[k][0]);var g;for(g=0;g<h.length;g++){var m=h[g].Path;var r=a("<img>",{"data-lazy":m.replace(l,"$1"+c.sizes.image)}).appendTo(e);r.wrap("<div></div>").wrap(a("<a></a>",{href:m.replace(l,
"$1"+c.sizes.imagezoom),"class":"jqzoom"}));a("<img>",{src:m.replace(l,"$1"+c.sizes.thumb)}).appendTo(f).wrap("<div></div>");h[g].IsMain&&(c.slickOptions.images.initialSlide=g)}}catch(n){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas :( . Detalhes: ",n)}try{c.slickOptions.images.asNavFor=f,a(e).slick(c.slickOptions.images),c.slickOptions.thumbs.asNavFor=e,a(f).slick(c.slickOptions.thumbs),a(".jqzoom").jqzoom(c.zoomOptions),a(f).on("afterChange",function(){a(e).slick("slickGoTo",
a(this).slick("slickCurrentSlide"))})}catch(n){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas :( . Detalhes: ",n)}})};a.fn.QD_smartPhotoCarousel=function(d,c){var b=a(this);if(!b.length)return b;b.each(function(){var b=a(this);b.QD_smartPhotoCarousel=new t(b,a.extend({},q,d),c)});return b};a(function(){a(".qd_auto_smart_photo_carousel").QD_smartPhotoCarousel()})}})(this);