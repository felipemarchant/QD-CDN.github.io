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
			Common.qdOverlay();
			Common.applySmartCart();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();			
			Common.applyAmazingMenuFooter();
			Common.showFooterLinks();
			Common.applyCarouselShelf();
			Common.setDataScrollToggle();
			Common.openSearchModal();
			Common.applyTipBarCarousel();
			Common.applyTipBarCarouselFooter();
			Common.openAccountMobile();				
			Common.applyMosaicCategorieBanners();				
			Common.applyImageLoad();	
			Common.saveAmountFix();	
			// $(window).on('QuatroDigital.is_Callback', Common.applyImageLoad);			
		},
		ajaxStop: function() {
			Common.saveAmountFix();	
		},
		windowOnload: function() {},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};			
		},
		applyAmazingMenuFooter: function() {
			$('.footer-qd-v1-menu-list').QD_amazingMenu();
		},
		applyMosaicCategorieBanners: function () {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: 0,
				containerWidth: 1336,
				classFourColumn: "col-xs-12 col-sm-6 col-md-2"
			});
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function () {
			$('.components-qd-v1-overlay').click(function () {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		applySmartCart: function () {
			$('.header-qd-v1-actions-cart, .fixed-buttons-qd-v1 .fixed-buttons-qd-v1-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Meu Carrinho</h3></div>');
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

			$('.header-qd-v1-cart-link, .header-qd-v1-cart-link-float').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$('.qd_ddc_lightBoxClose').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		applyAmazingMenu: function () {
			$('.header-qd-v1-amazing-menu').QD_amazingMenu({
				callback: function () {
					$('ul.qd-am-dropdown-menu').each(function () {
						$(this).wrapInner('<li class="container"><ul></ul></li>');
					});
				}
			});
		},
		applyAmazingMenuMobile: function () {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function () { return $(this).prev().clone().wrap('<li></li>').parent() });

			wrapper.QD_amazingMenu({
				callback: function () {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function () {
						var $t = $(this);
						$.merge($t.parent(), $t.closest('ul')).toggleClass('qd-am-is-active');

						$t.filter(function () { return !$(this).closest('ul').is('.qd-amazing-menu'); }).siblings('ul').stop(true, true).slideToggle();
					});

					wrapper.find('> ul > li > .qd-am-dropdown-trigger').click(function () {
						var w = $('.header-qd-v1-amazing-menu-mobile-wrapper');
						w.addClass('qd-am-is-active');
						w.animate({ scrollTop: 0 }, 200);
					});

					wrapper.find('> ul > li > ul > li:first-child').click(function (e) {
						e.preventDefault();
						$(this).parents(".qd-am-is-active").removeClass('qd-am-is-active');
					});
				}
			});

			$('.header-qd-v1-amazing-menu-trigger').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').on('click', 'a#login', function () {
				$(document.body).removeClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').append('<div class="header-qd-v1-close-amazing-menu-mobile"></div>');

			$('.header-qd-v1-close-amazing-menu-mobile').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-menu-list > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		},
		applyCarouselShelf: function() {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira').not('.slick-initialized');

			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore($t);
			});

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 6,
				slidesToScroll: 6,
				infinite: true,
				draggable: false,
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
							slidesToShow: 4,
							slidesToScroll: 4
						}
					},

					{
						breakpoint: 550,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}
				]
			});
		},
		setDataScrollToggle: function () {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		openSearchModal: function () {
			$('.header-qd-v1-action-search').click(function () {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		applyTipBarCarousel: function () {
			var wrapper = $('.tip-bar-qd-v1-carousel');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: false,
				draggable: false,
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
				// Se estiver dentro do product-qd-v1-tip-bar, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if (wrapper.closest('.product-qd-v1-tip-bar').length)
					return { slidesToShow: 3 };
				return {};
			})()));
		},
		applyTipBarCarouselFooter: function () {
			var wrapper = $('.tip-bar-qd-v1-carousel-footer');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: false,
				draggable: false,
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
				// Se estiver dentro do product-qd-v1-tip-bar, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if (wrapper.closest('.product-qd-v1-tip-bar').length)
					return { slidesToShow: 3 };
				return {};
			})()));
		},
		openAccountMobile: function () {
			$('.header-qd-v1-actions-user-link').click(function (e) {
				e.preventDefault();

				$(".header-qd-v1-actions-user-dropdown-mobile").toggle();
			});
		},
		applyImageLoad: function() {
			$('.search-qd-v1-result, .carousel-qd-v1-shelf, .accessories-qd-v1-wrapper').QD_smartImageLoad({
				sizes: {
					width: '230',
					height: '230'
				}
			});
		},
		saveAmountFix: function () {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function () {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		}
	};

	var Home = {
		init: function() {
			Home.applySliderFull();
			Home.applyBrandCarousel();
			Home.applyMosaicCategorieBannersV2();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applySliderFull: function() {
			var wrapper = $('.slider-qd-v1-full, .hotsite-qd-v1-banner-slider');

			wrapper.slick({
				autoplay: true,
				dots: true,
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				draggable: false
			});

			wrapper.each(function() {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyBrandCarousel: function() {
			var wrapper = $('.brand-carousel-qd-v1-carousel');

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
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 380,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}
				]
			});
		},
		applyMosaicCategorieBannersV2: function () {
			$('.mosaic-categories-qd-v2-wrapper > .box-banner').QD_mosaicBanners({
				containerWidth: 1024
			});
		}
	};

	var Search = {
		init: function() {
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.shelfLineFix();
			Search.infinityScroll();
			Home.applySliderFull();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
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
		openFiltersMenu: function () {
			$('.search-qd-v1-navigator-trigger').click(function (e) {
				e.preventDefault();
				$(document.body).toggleClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').appendTo('.search-single-navigator').removeClass('hide');
			});

			$('.menu-departamento').prepend('<span class="search-qd-v1-navigator-close hide"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');

			$('.search-qd-v1-navigator-close').click(function () {
				$(document.body).removeClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').addClass('hide');
			});
		},
		shelfLineFix: function () {
			try {
				var exec = function () {
					var curTop;
					var wrapper = $("div[id*='ResultItems_'] >.prateleira:not('.qd-fi-on')").addClass('qd-fi-on');

					var shelf = wrapper.children("ul").removeClass('qd-first-line');
					shelf.first().addClass("qd-first-line");

					var setFirst = function () {
						shelf.each(function () {
							var $t = $(this);

							if ($t.is(".qd-first-line")) {
								curTop = $t.offset().top;
								shelf = shelf.not($t);
								return;
							}

							var offsetTop = $t.offset().top;
							if (offsetTop >= curTop - 10 && offsetTop <= curTop + 10)
								shelf = shelf.not($t);
							else {
								$t.addClass("qd-first-line");
								return false;
							}
						});

						if (shelf.length)
							setFirst();
					};
					setFirst();
				};
				exec();

				// Olhando para o Smart Research
				if (!window.qd_shelf_line_fix_) {
					$(window).on("QuatroDigital.sr_shelfCallback", exec);
					window.qd_shelf_line_fix_ = true;
				}
				// Olhando tbm para o Infinity Scroll
				if (!window.qd_shelf_line_fix_is) {
					$(window).on("QuatroDigital.is_Callback", exec);
					window.qd_shelf_line_fix_is = true;
				}

				// Olhando para o evento window resize
				var resize = $._data(window).events.resize;
				var allowResize = true;
				if (resize)
					for (var i = 0; i < resize.length; i++) {
						if (resize[i].namespace == "qd") {
							allowResize = false;
							break;
						}
					}
				if (allowResize) {
					var timeOut = 0;
					$(window).on("resize.qd", function () {
						clearTimeout(timeOut);
						timeOut = setTimeout(function () {
							$(".qd-first-line").removeClass(".qd-first-line");
							exec();
						}, 20);
					});
				}
			}
			catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
		},
		infinityScroll: function () {
			$(".prateleira[id*=ResultItems]").QD_infinityScroll();
		}
	};

	var Product = {
		run: function() {},
		init: function() {
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.forceImageZoom();
			Product.setAvailableBodyClass();
			$(window).on('skuSelectable.vtex', Product.applyCarouselThumb);
			Product.scrollToDescription();
			Product.qdCallThumbVideo();
			Product.qdHideUniqueSkuOption();
			Product.saveAmountFlag();
			Product.openShipping();
			Product.qdClickTableMeasures();
			Product.scrollToBuyButton();
			Product.showFloatingBuyBar();
			
			Product.showCustomize();
		},
		ajaxStop: function() {
			Product.applyCarouselThumb();			
		},
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
		accessoriesFix: function () {
			$('fieldset >.buy-product-checkbox').parent().each(function () {
				var $t = $(this);
				$t.add($t.prev('ul')).wrapAll('<div class="accessories-qd-v1-item col-xs-12 col-sm-6 col-md-3"/>');
			});
		},
		accessoriesApplyCarousel: function () {
			var item = $('.accessories-qd-v1-item');

			if (!item.length)
				return;

			item.wrapAll('<div class="accessories-qd-v1-carousel"></div>');

			$('.accessories-qd-v1-carousel').slick({
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
						breakpoint: 600,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
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
		applyCarouselThumb: function() {
			// Wrapper onde foi inserido as thumbs
			var thumbsSliderWrapper = $('.product-qd-v1-thumbs-mobile');
			thumbsSliderWrapper.removeClass('slick-initialized slick-slider');
			
			// Inicializa com o primeiro selecionado
			thumbsSliderWrapper.on('init', function(event, slick){
				$(this).find('.slick-current a').addClass('ON');
				$(this).find('a').on('click', function() {
					thumbsSliderWrapper.slick('slickGoTo', $(this).closest('li').attr('data-slick-index'));
				});
			});

			thumbsSliderWrapper.slick({
				slidesToShow: 4,
				slidesToScroll: 4,				  
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				infinite: false,
				draggable: true,
				swipeToSlide: true,
				edgeFriction: .1,
				variableWidth: true,
				responsive: [
					{
					breakpoint: 600,
						settings: {
							arrows: false,
							slidesToShow: 4,
							slidesToScroll: 4,
							variableWidth: false
						}
					}
				]
			});
		},
		scrollToDescription: function() {
			$('.product-qd-v1-link-description').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description').offset().top -100
				}, 900, 'swing');
			});
		},
		qdCallThumbVideo: function() {

			// $('#caracteristicas').append('<div id="caracteristicas"><h4 class="group Especificacao">Especificação</h4><table cellspacing="0" class="group Especificacao"><tbody><tr class="even"><th class="name-field Fantasia-de">Fantasia de</th><td class="value-field Fantasia-de">Malévola</td></tr><tr><th class="name-field Codigo-do-Produto">Codigo do Produto</th><td class="value-field Codigo-do-Produto">43516</td></tr><tr class="even"><th class="name-field Itens-Inclusos">Itens Inclusos</th><td class="value-field Itens-Inclusos">Vestido , Bolsa , Polainas , Peruca Com Faixa</td></tr><tr><th class="name-field Genero">Genero</th><td class="value-field Genero">Feminino</td></tr><tr class="even"><th class="name-field Garantia">Garantia</th><td class="value-field Garantia">30 dias</td></tr><tr><th class="name-field Video">Video</th><td class="value-field Video">https://www.youtube.com/watch?v=gCmBqppAyiU</td></tr><tr class="even"><th class="name-field Linha">Linha</th><td class="value-field Linha">Luxo</td></tr></tbody></table></div>');

			var iframe = $("td.value-field.Video:first iframe");

			if (!iframe.length) {
				window.qdVideoInProduct = {videoFieldSelector: 'td.value-field.Video:first'};
				return;
			}

			window.qdVideoInProduct = {videoFieldSelector: $('<span/>').addClass('video-product').text('https://www.youtube.com/watch?v=' + iframe.attr("src").split("?").shift().split("/").pop() + '&rel=0')};
		},
		qdHideUniqueSkuOption: function() {
			$(".product-qd-v1-sku-selection [class*='group_']").each(function(){
				var $t = $(this);
				var input =  $t.find("input");

				if(input.length !== 1)
					return;

				input.attr("checked", true).change();
				$t.getParent("ul").hide();
			});
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
		},
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		qdClickTableMeasures: function() {
			var wrapper = $(".product-qd-v1-sku-selection");
			var modal = $(".qd-v1-modal").clone().appendTo(document.body).addClass('qd-v1-modal-table-measures');

			$(".product-qd-v1-table-measures").click(function() {
				modal.find('.modal-body:not(.qd-on)').addClass('qd-on').append('<img width="720" height="688" alt="tabela de medidas" src="//flickakids.vteximg.com.br/arquivos/tabela-de-medidas.jpg" complete="complete">');
				modal.modal();

				modal.on('hidden.bs.modal', function() {
					modal.remove();
				});
			});
		},
		showFloatingBuyBar: function () {
			var targetOffset = $(".product-qd-v1-buy-button").offset().top - 10;
			var elem = $(".product-floating-bar-buy");

			var $w = $(window).scroll(function () {

				if ($w.scrollTop() > targetOffset) {
					elem.addClass("active");
				}
				else {
					elem.removeClass("active");
				}

			});
		},
		scrollToBuyButton: function() {
			$('.product-qd-v1-buy-button-float').click(function(e) {
				e.preventDefault();
				
				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-name').offset().top -100
				}, 900, 'swing');
			});
		},
		showCustomize: function () {
			var link = $('<a>').attr('href', '#').addClass('qd-product-customize').text('Personalizar');

			$('.product-qd-v1-sku-selection-box .product-qd-v1-buy-button').prepend(link);

			$('.qd-product-customize').on("click", function () {
				if ($('a.buy-button[href*="javascript"]').length) {
					$('a.buy-button')[0].click();
					showSuccessModal();
					return;
				}

				var modal = $('.qd-v1-modal').first().clone();
				modal.addClass('qd-modal-customize');

				modal.find('.modal-header').append($('<h5></h5>').text($('.product-qd-v1-sku-selection-box .product-qd-v1-name').text()));
				modal.find('.modal-header .close').addClass('qd-customize-close').text('Não quero personalizar o produto');

				var modalBody = '<div class="row"><div class="col-xs-12 col-sm-5 qd-customize-image"></div><div class="col-xs-12 col-sm-7 qd-customize-items"></div></div>';
				modal.find('.modal-body').append($.parseHTML(modalBody));
				var urlImg = $('.product-qd-v1-image-wrapper #image-main')[0].src.replace($('.product-qd-v1-image-wrapper #image-main')[0].src.match(/\d+-(\d+-\d+)/)[1], '350-350');
				modal.find('.qd-customize-image').append([$('.product-qd-v1-image-wrapper #image-main').clone().attr('src', urlImg), $('<div class="qd-customize-area">')]);

				var modalItems = '<fieldset class="qd-customize-fieldset-text"><label>Digite o nome</label><div class="input-group"><input type="text" class="form-control" placeholder="Escreva aqui o nome do bebê" maxlength="18"><span class="input-group-btn"><button type="button">Ok</button></span></div></fieldset>';
				modalItems += '<fieldset><label>Escolha a ilustração</label><div class="input-group"><select><option value="">Sem ilustração</option><option value="sol">Sol</option></select></div></fieldset>';
				var options = '<label style="font-family:cursive;" class="radio-inline"><input type="radio" value="cursive">Arya</label><label style="font-family:fantasy;" class="radio-inline"><input type="radio" value="fantasy">Jon</label>'
				options += '<label style="font-family:PT Sans;" class="radio-inline"><input type="radio" value="PT Sans">Sansa</label><label style="font-family:Times New Roman;" class="radio-inline"><input type="radio" value="Times New Roman">Jon</label>'
				options += '<label style="font-family:Arial;" class="radio-inline"><input type="radio" value="Arial">Brandon</label><label style="font-family:fantasy;" class="radio-inline"><input type="radio" value="fantasy">Rickson</label>'
				options += '<label style="font-family:Arial Black;" class="radio-inline"><input type="radio" value="Arial Black">Catelyn</label><label style="font-family:webdings;" class="radio-inline"><input type="radio" value="webdings">Jason</label>'
				modalItems += '<fieldset><label>Escolha a fonte</label><div class="input-group-radio">' + options + '</div></fieldset>';
				modalItems += '<fieldset><label class="checkbox"><input type="checkbox" value="autorizado"> Autorizo a Flicka Kids a retirar o produto da embalagem, para realizar a personalização por mim escolhida.</label></fieldset>';
				modal.find('.qd-customize-items').append($.parseHTML(modalItems));

				var modalFooter = '<a href="javascript: void(0);" class="qd-customize-close" data-dismiss="modal">Não quero personalizar o produto</a>';
				modal.find('.modal-footer').append([$.parseHTML(modalFooter), $('<div class="qd-customize-price"></div>'), $('<div class="product-qd-v1-buy-button"></div>')]);
				modal.find('.modal-footer .qd-customize-price').append($.parseHTML('Valor com a personalização:<span class="total-price">R$299,90</span>'));
				modal.find('.modal-footer .product-qd-v1-buy-button').append($('.product-qd-v1-sku-selection-box .buy-button').first().clone().text('Comprar personalizado'));

				modal.insertAfter($('.qd-v1-modal').first());
				modal.modal();

				modal.on('hidden.bs.modal', function (e) {
					$(this).remove();
				});

				$('.qd-customize-items select').on("change", function () {
					var imgUrl = '/arquivos/' + $(this).val() + '.png';
					imgUrl = '/arquivos/icone-amazing-exemplo.png';
					updateCustomize(null, imgUrl, null);

					if ($(this).val())
						$(this).closest('.input-group').addClass('filled');
					else
						$(this).closest('.input-group').removeClass('filled');
				});

				$('.qd-customize-items input[type="radio"]').on("click", function () {
					$('.input-group-radio .radio-inline').removeClass('checked');
					$(this).closest('.radio-inline').addClass('checked');

					updateCustomize(null, null, $(this).val());
				});

				$('input[type="text"], button', '.qd-customize-items').on("click keyup", function () {
					var input = $(this).closest('fieldset').find('input');
					updateCustomize(input.val());

					if (input.val())
						input.closest('.input-group').addClass('filled');
					else
						input.closest('.input-group').removeClass('filled');

				});

				function updateCustomize(text, imageUrl, font) {
					if (!$('.qd-customize-area #qd_customize_nome').length)
						$('.qd-customize-area').append($('<div id="qd_customize_nome">'));

					wrapperCustomize = $('.qd-customize-area #qd_customize_nome');



					var wrapperText = wrapperCustomize.find('span').length ? wrapperCustomize.find('span') : $('<span></span>').appendTo(wrapperCustomize);
					if (text)
						wrapperText.text(text);
					if (font)
						wrapperText.css('font-family', font);

					if (imageUrl) {
						var wrapperImg = wrapperCustomize.find('img').length ? wrapperCustomize.find('img') : $('<img>').appendTo(wrapperCustomize);
						wrapperImg.attr('src', imageUrl);
					}

				}


				function showSuccessModal() {
					$(document.body).removeClass('.qd-ddc-product-add-time-v2');
					$('.qd-modal-customize').modal('hide');
					
					var modalSuccess = $('.qd-v1-modal').first().clone();
					modalSuccess.addClass('qd-modal-success');

					var modalBody = '<a href="javascript: void(0);" class="qd-customize-close" data-dismiss="modal">Fechar</a>';
					modalBody += '<i class="fa fa-check-circle" aria-hidden="true"></i>';
					modalBody += '<h5 class="qd-customize-success">Produto adicionado com sucesso!</h5>';
					modalBody += '<div class="product-qd-v1-buy-button"><a href="/checkout">Finalizar Compra</a></div>';
					modalBody += '<a href="javascript: void(0);" class="qd-customize-continue" data-dismiss="modal">Continuar comprado</a>';
					modalSuccess.find('.modal-body').append($.parseHTML(modalBody));
					modalSuccess.find('.modal-header, .modal-footer').remove();

					modalSuccess.modal();
				}

				modal.find('.modal-footer').QD_buyButton({
					buyButton: ".product-qd-v1-buy-button .buy-button",
					productPageCallback: showSuccessModal
				});

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
var _0x4f80=['data-qd-ssa-qtt','each','find','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','html','replace','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-skus-','skus','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','off','vtex.sku.selected.QD','QuatroDigital.ssa.prodUnavailable','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','join','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','initialSkuSelected','trigger','QuatroDigital.ssa.skuSelected','prod','unavailable','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','url','opts','push','success','call','complete','parameters','callbackFns','boolean','successPopulated','errorPopulated','completePopulated','extend','object','error','clearQueueDelay','jqXHR','undefined','ajax','readyState','textStatus','errorThrown','version','2.1','/produto/sku/','QD_smartStockAvailable','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr'];(function(_0x4d0fa4,_0x1cad59){var _0x4f5a64=function(_0x4f40c8){while(--_0x4f40c8){_0x4d0fa4['push'](_0x4d0fa4['shift']());}};_0x4f5a64(++_0x1cad59);}(_0x4f80,0x17a));var _0x04f8=function(_0x5c66fe,_0x15ac90){_0x5c66fe=_0x5c66fe-0x0;var _0x467f92=_0x4f80[_0x5c66fe];return _0x467f92;};(function(_0x35eabd){if(_0x04f8('0x0')!==typeof _0x35eabd[_0x04f8('0x1')]){var _0x133591={};_0x35eabd[_0x04f8('0x2')]=_0x133591;_0x35eabd[_0x04f8('0x1')]=function(_0x5e6155){var _0x5598a=_0x35eabd['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x5e6155);var _0x56b3ad=escape(encodeURIComponent(_0x5598a[_0x04f8('0x3')]));_0x133591[_0x56b3ad]=_0x133591[_0x56b3ad]||{};_0x133591[_0x56b3ad]['opts']=_0x133591[_0x56b3ad][_0x04f8('0x4')]||[];_0x133591[_0x56b3ad][_0x04f8('0x4')][_0x04f8('0x5')]({'success':function(_0x550eb9,_0x4bacba,_0x3f7534){_0x5598a[_0x04f8('0x6')][_0x04f8('0x7')](this,_0x550eb9,_0x4bacba,_0x3f7534);},'error':function(_0x2f3ce7,_0x4a0b79,_0x18d062){_0x5598a['error']['call'](this,_0x2f3ce7,_0x4a0b79,_0x18d062);},'complete':function(_0x106db2,_0x44143c){_0x5598a[_0x04f8('0x8')]['call'](this,_0x106db2,_0x44143c);}});_0x133591[_0x56b3ad][_0x04f8('0x9')]=_0x133591[_0x56b3ad][_0x04f8('0x9')]||{'success':{},'error':{},'complete':{}};_0x133591[_0x56b3ad][_0x04f8('0xa')]=_0x133591[_0x56b3ad][_0x04f8('0xa')]||{};_0x133591[_0x56b3ad][_0x04f8('0xa')]['successPopulated']=_0x04f8('0xb')===typeof _0x133591[_0x56b3ad][_0x04f8('0xa')][_0x04f8('0xc')]?_0x133591[_0x56b3ad][_0x04f8('0xa')][_0x04f8('0xc')]:!0x1;_0x133591[_0x56b3ad][_0x04f8('0xa')][_0x04f8('0xd')]=_0x04f8('0xb')===typeof _0x133591[_0x56b3ad][_0x04f8('0xa')][_0x04f8('0xd')]?_0x133591[_0x56b3ad][_0x04f8('0xa')][_0x04f8('0xd')]:!0x1;_0x133591[_0x56b3ad][_0x04f8('0xa')][_0x04f8('0xe')]=_0x04f8('0xb')===typeof _0x133591[_0x56b3ad][_0x04f8('0xa')]['completePopulated']?_0x133591[_0x56b3ad][_0x04f8('0xa')][_0x04f8('0xe')]:!0x1;_0x5e6155=_0x35eabd[_0x04f8('0xf')]({},_0x5598a,{'success':function(_0x1e1cda,_0x421a8c,_0x4d7842){_0x133591[_0x56b3ad][_0x04f8('0x9')][_0x04f8('0x6')]={'data':_0x1e1cda,'textStatus':_0x421a8c,'jqXHR':_0x4d7842};_0x133591[_0x56b3ad]['callbackFns']['successPopulated']=!0x0;for(var _0x22bd46 in _0x133591[_0x56b3ad][_0x04f8('0x4')])_0x04f8('0x10')===typeof _0x133591[_0x56b3ad]['opts'][_0x22bd46]&&(_0x133591[_0x56b3ad][_0x04f8('0x4')][_0x22bd46][_0x04f8('0x6')][_0x04f8('0x7')](this,_0x1e1cda,_0x421a8c,_0x4d7842),_0x133591[_0x56b3ad][_0x04f8('0x4')][_0x22bd46][_0x04f8('0x6')]=function(){});},'error':function(_0x5930be,_0x29d6c4,_0x38e678){_0x133591[_0x56b3ad]['parameters'][_0x04f8('0x11')]={'errorThrown':_0x38e678,'textStatus':_0x29d6c4,'jqXHR':_0x5930be};_0x133591[_0x56b3ad][_0x04f8('0xa')][_0x04f8('0xd')]=!0x0;for(var _0x401a57 in _0x133591[_0x56b3ad][_0x04f8('0x4')])_0x04f8('0x10')===typeof _0x133591[_0x56b3ad][_0x04f8('0x4')][_0x401a57]&&(_0x133591[_0x56b3ad][_0x04f8('0x4')][_0x401a57]['error'][_0x04f8('0x7')](this,_0x5930be,_0x29d6c4,_0x38e678),_0x133591[_0x56b3ad][_0x04f8('0x4')][_0x401a57][_0x04f8('0x11')]=function(){});},'complete':function(_0x3ba799,_0x16eea1){_0x133591[_0x56b3ad][_0x04f8('0x9')]['complete']={'textStatus':_0x16eea1,'jqXHR':_0x3ba799};_0x133591[_0x56b3ad]['callbackFns']['completePopulated']=!0x0;for(var _0x24533e in _0x133591[_0x56b3ad][_0x04f8('0x4')])'object'===typeof _0x133591[_0x56b3ad]['opts'][_0x24533e]&&(_0x133591[_0x56b3ad][_0x04f8('0x4')][_0x24533e][_0x04f8('0x8')][_0x04f8('0x7')](this,_0x3ba799,_0x16eea1),_0x133591[_0x56b3ad][_0x04f8('0x4')][_0x24533e][_0x04f8('0x8')]=function(){});isNaN(parseInt(_0x5598a[_0x04f8('0x12')]))||setTimeout(function(){_0x133591[_0x56b3ad][_0x04f8('0x13')]=void 0x0;_0x133591[_0x56b3ad][_0x04f8('0x4')]=void 0x0;_0x133591[_0x56b3ad]['parameters']=void 0x0;_0x133591[_0x56b3ad]['callbackFns']=void 0x0;},_0x5598a[_0x04f8('0x12')]);}});_0x04f8('0x14')===typeof _0x133591[_0x56b3ad][_0x04f8('0x13')]?_0x133591[_0x56b3ad]['jqXHR']=_0x35eabd[_0x04f8('0x15')](_0x5e6155):_0x133591[_0x56b3ad]['jqXHR']&&_0x133591[_0x56b3ad][_0x04f8('0x13')][_0x04f8('0x16')]&&0x4==_0x133591[_0x56b3ad]['jqXHR'][_0x04f8('0x16')]&&(_0x133591[_0x56b3ad][_0x04f8('0xa')]['successPopulated']&&_0x5e6155[_0x04f8('0x6')](_0x133591[_0x56b3ad][_0x04f8('0x9')][_0x04f8('0x6')]['data'],_0x133591[_0x56b3ad][_0x04f8('0x9')][_0x04f8('0x6')][_0x04f8('0x17')],_0x133591[_0x56b3ad][_0x04f8('0x9')][_0x04f8('0x6')][_0x04f8('0x13')]),_0x133591[_0x56b3ad][_0x04f8('0xa')][_0x04f8('0xd')]&&_0x5e6155[_0x04f8('0x11')](_0x133591[_0x56b3ad][_0x04f8('0x9')][_0x04f8('0x11')][_0x04f8('0x13')],_0x133591[_0x56b3ad]['parameters']['error'][_0x04f8('0x17')],_0x133591[_0x56b3ad][_0x04f8('0x9')][_0x04f8('0x11')][_0x04f8('0x18')]),_0x133591[_0x56b3ad][_0x04f8('0xa')][_0x04f8('0xe')]&&_0x5e6155['complete'](_0x133591[_0x56b3ad]['parameters']['complete']['jqXHR'],_0x133591[_0x56b3ad][_0x04f8('0x9')][_0x04f8('0x8')][_0x04f8('0x17')]));};_0x35eabd[_0x04f8('0x1')][_0x04f8('0x19')]=_0x04f8('0x1a');}}(jQuery));(function(_0x23aeb5){function _0x5d3fb2(_0x21bd67,_0x3ca4b8){_0x541c4a['qdAjax']({'url':_0x04f8('0x1b')+_0x21bd67,'clearQueueDelay':null,'success':_0x3ca4b8,'error':function(){_0x438bcd('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});}var _0x541c4a=jQuery;if(_0x04f8('0x0')!==typeof _0x541c4a['fn'][_0x04f8('0x1c')]){var _0x438bcd=function(_0x34bf93,_0x26ffe0){if(_0x04f8('0x10')===typeof console){var _0x595b87;'object'===typeof _0x34bf93?(_0x34bf93['unshift'](_0x04f8('0x1d')),_0x595b87=_0x34bf93):_0x595b87=[_0x04f8('0x1d')+_0x34bf93];_0x04f8('0x14')===typeof _0x26ffe0||_0x04f8('0x1e')!==_0x26ffe0[_0x04f8('0x1f')]()&&'aviso'!==_0x26ffe0[_0x04f8('0x1f')]()?_0x04f8('0x14')!==typeof _0x26ffe0&&'info'===_0x26ffe0[_0x04f8('0x1f')]()?console[_0x04f8('0x20')]['apply'](console,_0x595b87):console[_0x04f8('0x11')][_0x04f8('0x21')](console,_0x595b87):console[_0x04f8('0x22')][_0x04f8('0x21')](console,_0x595b87);}},_0x24c4f3={},_0x292c1e=function(_0x18082c,_0x336e4f){function _0x245071(_0x5e8d7d){try{_0x18082c[_0x04f8('0x23')](_0x04f8('0x24'))[_0x04f8('0x25')](_0x04f8('0x26'));var _0x3fbf56=_0x5e8d7d[0x0][_0x04f8('0x27')][0x0][_0x04f8('0x28')];_0x18082c[_0x04f8('0x29')](_0x04f8('0x2a'),_0x3fbf56);_0x18082c[_0x04f8('0x2b')](function(){var _0x18082c=_0x541c4a(this)[_0x04f8('0x2c')]('[data-qd-ssa-text]');if(0x1>_0x3fbf56)return _0x18082c[_0x04f8('0x2d')]()[_0x04f8('0x25')](_0x04f8('0x2e'))['removeClass'](_0x04f8('0x2f'));var _0x5e8d7d=_0x18082c[_0x04f8('0x30')](_0x04f8('0x31')+_0x3fbf56+'\x22]');_0x5e8d7d=_0x5e8d7d[_0x04f8('0x32')]?_0x5e8d7d:_0x18082c[_0x04f8('0x30')]('[data-qd-ssa-text=\x22default\x22]');_0x18082c[_0x04f8('0x2d')]()[_0x04f8('0x25')]('qd-ssa-hide')[_0x04f8('0x23')](_0x04f8('0x2f'));_0x5e8d7d['html']((_0x5e8d7d[_0x04f8('0x33')]()||'')[_0x04f8('0x34')](_0x04f8('0x35'),_0x3fbf56));_0x5e8d7d[_0x04f8('0x36')]()[_0x04f8('0x25')](_0x04f8('0x2f'))['removeClass'](_0x04f8('0x2e'));});}catch(_0x1de525){_0x438bcd([_0x04f8('0x37'),_0x1de525[_0x04f8('0x38')]]);}}if(_0x18082c[_0x04f8('0x32')]){_0x18082c['addClass']('qd-ssa-on');_0x18082c[_0x04f8('0x25')](_0x04f8('0x24'));try{_0x18082c['addClass'](_0x04f8('0x39')+vtxctx[_0x04f8('0x3a')]['split'](';')[_0x04f8('0x32')]);}catch(_0xd2038f){_0x438bcd([_0x04f8('0x3b'),_0xd2038f['message']]);}_0x541c4a(window)['on'](_0x04f8('0x3c'),function(_0x3db539,_0x317627,_0x55e996){try{_0x5d3fb2(_0x55e996[_0x04f8('0x3d')],function(_0xd802d6){_0x245071(_0xd802d6);0x1===vtxctx[_0x04f8('0x3a')]['split'](';')[_0x04f8('0x32')]&&0x0==_0xd802d6[0x0]['SkuSellersInformation'][0x0][_0x04f8('0x28')]&&_0x541c4a(window)['trigger']('QuatroDigital.ssa.prodUnavailable');});}catch(_0x3e325b){_0x438bcd(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0x3e325b[_0x04f8('0x38')]]);}});_0x541c4a(window)[_0x04f8('0x3e')](_0x04f8('0x3f'));_0x541c4a(window)['on'](_0x04f8('0x40'),function(){_0x18082c[_0x04f8('0x25')]('qd-ssa-sku-prod-unavailable')[_0x04f8('0x2d')]();});}};_0x23aeb5=function(_0x303195){var _0xd75366={'s':_0x04f8('0x41')};return function(_0x254715){var _0x169eb4=function(_0x44b2c1){return _0x44b2c1;};var _0x10ce60=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x254715=_0x254715['d'+_0x10ce60[0x10]+'c'+_0x10ce60[0x11]+'m'+_0x169eb4(_0x10ce60[0x1])+'n'+_0x10ce60[0xd]]['l'+_0x10ce60[0x12]+'c'+_0x10ce60[0x0]+'ti'+_0x169eb4('o')+'n'];var _0x31c87d=function(_0x2b4378){return escape(encodeURIComponent(_0x2b4378[_0x04f8('0x34')](/\./g,'¨')[_0x04f8('0x34')](/[a-zA-Z]/g,function(_0x4eb524){return String['fromCharCode'](('Z'>=_0x4eb524?0x5a:0x7a)>=(_0x4eb524=_0x4eb524[_0x04f8('0x42')](0x0)+0xd)?_0x4eb524:_0x4eb524-0x1a);})));};var _0x5d97b1=_0x31c87d(_0x254715[[_0x10ce60[0x9],_0x169eb4('o'),_0x10ce60[0xc],_0x10ce60[_0x169eb4(0xd)]][_0x04f8('0x43')]('')]);_0x31c87d=_0x31c87d((window[['js',_0x169eb4('no'),'m',_0x10ce60[0x1],_0x10ce60[0x4]['toUpperCase'](),_0x04f8('0x44')][_0x04f8('0x43')]('')]||_0x04f8('0x45'))+['.v',_0x10ce60[0xd],'e',_0x169eb4('x'),'co',_0x169eb4('mm'),_0x04f8('0x46'),_0x10ce60[0x1],'.c',_0x169eb4('o'),'m.',_0x10ce60[0x13],'r'][_0x04f8('0x43')](''));for(var _0x114232 in _0xd75366){if(_0x31c87d===_0x114232+_0xd75366[_0x114232]||_0x5d97b1===_0x114232+_0xd75366[_0x114232]){var _0x95b289='tr'+_0x10ce60[0x11]+'e';break;}_0x95b289='f'+_0x10ce60[0x0]+'ls'+_0x169eb4(_0x10ce60[0x1])+'';}_0x169eb4=!0x1;-0x1<_0x254715[[_0x10ce60[0xc],'e',_0x10ce60[0x0],'rc',_0x10ce60[0x9]][_0x04f8('0x43')]('')][_0x04f8('0x47')](_0x04f8('0x48'))&&(_0x169eb4=!0x0);return[_0x95b289,_0x169eb4];}(_0x303195);}(window);if(!eval(_0x23aeb5[0x0]))return _0x23aeb5[0x1]?_0x438bcd(_0x04f8('0x49')):!0x1;_0x541c4a['fn'][_0x04f8('0x1c')]=function(_0x46ed44){var _0x4dfa83=_0x541c4a(this);_0x46ed44=_0x541c4a[_0x04f8('0xf')](!0x0,{},_0x24c4f3,_0x46ed44);_0x4dfa83[_0x04f8('0x4a')]=new _0x292c1e(_0x4dfa83,_0x46ed44);try{_0x04f8('0x10')===typeof _0x541c4a['fn'][_0x04f8('0x1c')][_0x04f8('0x4b')]&&_0x541c4a(window)[_0x04f8('0x4c')](_0x04f8('0x4d'),[_0x541c4a['fn'][_0x04f8('0x1c')][_0x04f8('0x4b')][_0x04f8('0x4e')],_0x541c4a['fn']['QD_smartStockAvailable']['initialSkuSelected'][_0x04f8('0x3d')]]);}catch(_0x2bf48f){_0x438bcd(['Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20',_0x2bf48f[_0x04f8('0x38')]]);}_0x541c4a['fn']['QD_smartStockAvailable'][_0x04f8('0x4f')]&&_0x541c4a(window)['trigger']('QuatroDigital.ssa.prodUnavailable');return _0x4dfa83;};_0x541c4a(window)['on']('vtex.sku.selected.QD',function(_0x17f794,_0x901b91,_0x577289){try{_0x541c4a['fn'][_0x04f8('0x1c')][_0x04f8('0x4b')]={'prod':_0x901b91,'sku':_0x577289},_0x541c4a(this)[_0x04f8('0x3e')](_0x17f794);}catch(_0x20855d){_0x438bcd(['Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20',_0x20855d['message']]);}});_0x541c4a(window)['on'](_0x04f8('0x50'),function(_0x3fa609,_0x2aa734,_0x4fee01){try{for(var _0x310760=_0x4fee01['length'],_0x427ebb=_0x2aa734=0x0;_0x427ebb<_0x310760&&!_0x4fee01[_0x427ebb][_0x04f8('0x51')];_0x427ebb++)_0x2aa734+=0x1;_0x310760<=_0x2aa734&&(_0x541c4a['fn']['QD_smartStockAvailable'][_0x04f8('0x4f')]=!0x0);_0x541c4a(this)[_0x04f8('0x3e')](_0x3fa609);}catch(_0x58477d){_0x438bcd([_0x04f8('0x52'),_0x58477d[_0x04f8('0x38')]]);}});_0x541c4a(function(){_0x541c4a(_0x04f8('0x53'))[_0x04f8('0x1c')]();});}}(window));
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
var _0xaf03=['each','addClass','first','last','qd-am-last','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','html','img[alt=\x27','attr','getParent','insertBefore','hide','qd-am-content-loaded','text','trim','data-qdam-value','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children','qd-am-elem-','replaceSpecialChars','replace','>li','qd-amazing-menu','>ul','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','extend','exec','function','QD_amazingMenu','/qd-amazing-menu','undefined','error','warn','object','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','info','apply','join','qdAmAddNdx'];(function(_0x3558db,_0x168ddf){var _0xc41f4f=function(_0x12bd00){while(--_0x12bd00){_0x3558db['push'](_0x3558db['shift']());}};_0xc41f4f(++_0x168ddf);}(_0xaf03,0x163));var _0x3af0=function(_0x23474c,_0x16d5fc){_0x23474c=_0x23474c-0x0;var _0x410804=_0xaf03[_0x23474c];return _0x410804;};(function(_0x18b564){_0x18b564['fn']['getParent']=_0x18b564['fn']['closest'];}(jQuery));(function(_0xe0e561){var _0x35d3b5;var _0x334c95=jQuery;if(_0x3af0('0x0')!==typeof _0x334c95['fn'][_0x3af0('0x1')]){var _0x26276a={'url':_0x3af0('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x538832=function(_0x4a29f8,_0x51355a){if('object'===typeof console&&_0x3af0('0x3')!==typeof console[_0x3af0('0x4')]&&_0x3af0('0x3')!==typeof console['info']&&'undefined'!==typeof console[_0x3af0('0x5')]){var _0x2220fd;_0x3af0('0x6')===typeof _0x4a29f8?(_0x4a29f8['unshift']('[QD\x20Amazing\x20Menu]\x0a'),_0x2220fd=_0x4a29f8):_0x2220fd=[_0x3af0('0x7')+_0x4a29f8];if(_0x3af0('0x3')===typeof _0x51355a||_0x3af0('0x8')!==_0x51355a[_0x3af0('0x9')]()&&_0x3af0('0xa')!==_0x51355a[_0x3af0('0x9')]())if(_0x3af0('0x3')!==typeof _0x51355a&&_0x3af0('0xb')===_0x51355a[_0x3af0('0x9')]())try{console[_0x3af0('0xb')][_0x3af0('0xc')](console,_0x2220fd);}catch(_0x4c3633){try{console[_0x3af0('0xb')](_0x2220fd[_0x3af0('0xd')]('\x0a'));}catch(_0x30349c){}}else try{console['error'][_0x3af0('0xc')](console,_0x2220fd);}catch(_0xe22b07){try{console['error'](_0x2220fd[_0x3af0('0xd')]('\x0a'));}catch(_0x29d4f0){}}else try{console[_0x3af0('0x5')][_0x3af0('0xc')](console,_0x2220fd);}catch(_0x1580d5){try{console[_0x3af0('0x5')](_0x2220fd[_0x3af0('0xd')]('\x0a'));}catch(_0x5e7c8b){}}}};_0x334c95['fn'][_0x3af0('0xe')]=function(){var _0xd0fa40=_0x334c95(this);_0xd0fa40[_0x3af0('0xf')](function(_0x5ad070){_0x334c95(this)[_0x3af0('0x10')]('qd-am-li-'+_0x5ad070);});_0xd0fa40[_0x3af0('0x11')]()[_0x3af0('0x10')]('qd-am-first');_0xd0fa40[_0x3af0('0x12')]()[_0x3af0('0x10')](_0x3af0('0x13'));return _0xd0fa40;};_0x334c95['fn'][_0x3af0('0x1')]=function(){};_0xe0e561=function(_0x174b21){var _0x2b81fc={'s':_0x3af0('0x14')};return function(_0xfb09ef){var _0x5f234f=function(_0x4caa82){return _0x4caa82;};var _0x411e71=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xfb09ef=_0xfb09ef['d'+_0x411e71[0x10]+'c'+_0x411e71[0x11]+'m'+_0x5f234f(_0x411e71[0x1])+'n'+_0x411e71[0xd]]['l'+_0x411e71[0x12]+'c'+_0x411e71[0x0]+'ti'+_0x5f234f('o')+'n'];var _0x49d0e2=function(_0x3dbc69){return escape(encodeURIComponent(_0x3dbc69['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x44efb8){return String['fromCharCode'](('Z'>=_0x44efb8?0x5a:0x7a)>=(_0x44efb8=_0x44efb8[_0x3af0('0x15')](0x0)+0xd)?_0x44efb8:_0x44efb8-0x1a);})));};var _0x57b218=_0x49d0e2(_0xfb09ef[[_0x411e71[0x9],_0x5f234f('o'),_0x411e71[0xc],_0x411e71[_0x5f234f(0xd)]][_0x3af0('0xd')]('')]);_0x49d0e2=_0x49d0e2((window[['js',_0x5f234f('no'),'m',_0x411e71[0x1],_0x411e71[0x4][_0x3af0('0x16')](),'ite'][_0x3af0('0xd')]('')]||_0x3af0('0x17'))+['.v',_0x411e71[0xd],'e',_0x5f234f('x'),'co',_0x5f234f('mm'),_0x3af0('0x18'),_0x411e71[0x1],'.c',_0x5f234f('o'),'m.',_0x411e71[0x13],'r']['join'](''));for(var _0x1fa3a0 in _0x2b81fc){if(_0x49d0e2===_0x1fa3a0+_0x2b81fc[_0x1fa3a0]||_0x57b218===_0x1fa3a0+_0x2b81fc[_0x1fa3a0]){var _0x4b361e='tr'+_0x411e71[0x11]+'e';break;}_0x4b361e='f'+_0x411e71[0x0]+'ls'+_0x5f234f(_0x411e71[0x1])+'';}_0x5f234f=!0x1;-0x1<_0xfb09ef[[_0x411e71[0xc],'e',_0x411e71[0x0],'rc',_0x411e71[0x9]][_0x3af0('0xd')]('')][_0x3af0('0x19')](_0x3af0('0x1a'))&&(_0x5f234f=!0x0);return[_0x4b361e,_0x5f234f];}(_0x174b21);}(window);if(!eval(_0xe0e561[0x0]))return _0xe0e561[0x1]?_0x538832(_0x3af0('0x1b')):!0x1;var _0x27ac3f=function(_0x463ff4){var _0x4f0cf7=_0x463ff4[_0x3af0('0x1c')](_0x3af0('0x1d'));var _0x335633=_0x4f0cf7[_0x3af0('0x1e')](_0x3af0('0x1f'));var _0x311f7d=_0x4f0cf7[_0x3af0('0x1e')](_0x3af0('0x20'));if(_0x335633[_0x3af0('0x21')]||_0x311f7d[_0x3af0('0x21')])_0x335633[_0x3af0('0x22')]()[_0x3af0('0x10')](_0x3af0('0x23')),_0x311f7d[_0x3af0('0x22')]()[_0x3af0('0x10')](_0x3af0('0x24')),_0x334c95['qdAjax']({'url':_0x35d3b5[_0x3af0('0x25')],'dataType':_0x3af0('0x26'),'success':function(_0x4eb40c){var _0x40a79b=_0x334c95(_0x4eb40c);_0x335633[_0x3af0('0xf')](function(){var _0x4eb40c=_0x334c95(this);var _0x2a22d5=_0x40a79b['find'](_0x3af0('0x27')+_0x4eb40c[_0x3af0('0x28')]('data-qdam-value')+'\x27]');_0x2a22d5[_0x3af0('0x21')]&&(_0x2a22d5[_0x3af0('0xf')](function(){_0x334c95(this)[_0x3af0('0x29')]('.box-banner')['clone']()[_0x3af0('0x2a')](_0x4eb40c);}),_0x4eb40c[_0x3af0('0x2b')]());})['addClass'](_0x3af0('0x2c'));_0x311f7d[_0x3af0('0xf')](function(){var _0x4eb40c={};var _0x510bc2=_0x334c95(this);_0x40a79b[_0x3af0('0x1c')]('h2')[_0x3af0('0xf')](function(){if(_0x334c95(this)[_0x3af0('0x2d')]()[_0x3af0('0x2e')]()[_0x3af0('0x9')]()==_0x510bc2[_0x3af0('0x28')](_0x3af0('0x2f'))['trim']()[_0x3af0('0x9')]())return _0x4eb40c=_0x334c95(this),!0x1;});_0x4eb40c[_0x3af0('0x21')]&&(_0x4eb40c[_0x3af0('0xf')](function(){_0x334c95(this)[_0x3af0('0x29')]('[class*=\x27colunas\x27]')['clone']()['insertBefore'](_0x510bc2);}),_0x510bc2[_0x3af0('0x2b')]());})[_0x3af0('0x10')]('qd-am-content-loaded');},'error':function(){_0x538832(_0x3af0('0x30')+_0x35d3b5['url']+'\x27\x20falho.');},'complete':function(){_0x35d3b5[_0x3af0('0x31')][_0x3af0('0x32')](this);_0x334c95(window)[_0x3af0('0x33')](_0x3af0('0x34'),_0x463ff4);},'clearQueueDelay':0xbb8});};_0x334c95[_0x3af0('0x1')]=function(_0x4054e7){var _0x1f818c=_0x4054e7['find'](_0x3af0('0x35'))['each'](function(){var _0x46cfab=_0x334c95(this);if(!_0x46cfab[_0x3af0('0x21')])return _0x538832([_0x3af0('0x36'),_0x4054e7],_0x3af0('0x8'));_0x46cfab[_0x3af0('0x1c')](_0x3af0('0x37'))[_0x3af0('0x22')]()[_0x3af0('0x10')](_0x3af0('0x38'));_0x46cfab[_0x3af0('0x1c')]('li')[_0x3af0('0xf')](function(){var _0x3f2c4e=_0x334c95(this);var _0x26aa03=_0x3f2c4e[_0x3af0('0x39')](':not(ul)');_0x26aa03[_0x3af0('0x21')]&&_0x3f2c4e[_0x3af0('0x10')](_0x3af0('0x3a')+_0x26aa03[_0x3af0('0x11')]()[_0x3af0('0x2d')]()[_0x3af0('0x2e')]()[_0x3af0('0x3b')]()[_0x3af0('0x3c')](/\./g,'')[_0x3af0('0x3c')](/\s/g,'-')[_0x3af0('0x9')]());});var _0x4b257c=_0x46cfab[_0x3af0('0x1c')](_0x3af0('0x3d'))['qdAmAddNdx']();_0x46cfab[_0x3af0('0x10')](_0x3af0('0x3e'));_0x4b257c=_0x4b257c['find'](_0x3af0('0x3f'));_0x4b257c[_0x3af0('0xf')](function(){var _0x1ecd2b=_0x334c95(this);_0x1ecd2b[_0x3af0('0x1c')](_0x3af0('0x3d'))[_0x3af0('0xe')]()['addClass']('qd-am-column');_0x1ecd2b[_0x3af0('0x10')](_0x3af0('0x40'));_0x1ecd2b['parent']()[_0x3af0('0x10')](_0x3af0('0x41'));});_0x4b257c[_0x3af0('0x10')]('qd-am-dropdown');var _0x493235=0x0,_0xe0e561=function(_0x473cc5){_0x493235+=0x1;_0x473cc5=_0x473cc5['children']('li')['children']('*');_0x473cc5[_0x3af0('0x21')]&&(_0x473cc5[_0x3af0('0x10')](_0x3af0('0x42')+_0x493235),_0xe0e561(_0x473cc5));};_0xe0e561(_0x46cfab);_0x46cfab[_0x3af0('0x43')](_0x46cfab[_0x3af0('0x1c')]('ul'))[_0x3af0('0xf')](function(){var _0xe33f70=_0x334c95(this);_0xe33f70[_0x3af0('0x10')](_0x3af0('0x44')+_0xe33f70[_0x3af0('0x39')]('li')[_0x3af0('0x21')]+_0x3af0('0x45'));});});_0x27ac3f(_0x1f818c);_0x35d3b5[_0x3af0('0x46')][_0x3af0('0x32')](this);_0x334c95(window)[_0x3af0('0x33')](_0x3af0('0x47'),_0x4054e7);};_0x334c95['fn'][_0x3af0('0x1')]=function(_0x151c30){var _0x472e53=_0x334c95(this);if(!_0x472e53[_0x3af0('0x21')])return _0x472e53;_0x35d3b5=_0x334c95[_0x3af0('0x48')]({},_0x26276a,_0x151c30);_0x472e53[_0x3af0('0x49')]=new _0x334c95[(_0x3af0('0x1'))](_0x334c95(this));return _0x472e53;};_0x334c95(function(){_0x334c95('.qd_amazing_menu_auto')[_0x3af0('0x1')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x55bd=['input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','selector','dropDown','updateOnlyHover','QD_buyButton','buyButton','smartCart','closest','abs','undefined','pow','round','split','length','replace','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','object','info','warn','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','vtexjs','ajax','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','SDK','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','add','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxProdAdd','body','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','mouseenter.qd_ddc_hover','getCartInfoByUrl','cartIsEmpty','cartTotal','texts','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','html','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','cartContainer','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','shipping','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','call','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','qd-ddc-prodLoaded','totalizers','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','each','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','.qd-ddc-quantity','insertProdImg','.qd-ddc-image','imageUrl','appendTo','getParent','shippingData','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','filter','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','keyup.qd_ddc_change','.qd-ddc-remove','click.qd_ddc_remove','removeProduct','stop','remove','qdDdcLastPostalCode','calculateShipping','BRA','done','data','changeQantity','boolean','simpleCart','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','index','updateItems','fail','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','quickViewUpdate','allowRecalculate','productId','prod_','prodId','qtt','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added'];(function(_0x2e6a02,_0x588dbf){var _0x4d2a87=function(_0xe3e8c8){while(--_0xe3e8c8){_0x2e6a02['push'](_0x2e6a02['shift']());}};_0x4d2a87(++_0x588dbf);}(_0x55bd,0xe0));var _0xd55b=function(_0x576908,_0x4a3d4e){_0x576908=_0x576908-0x0;var _0x450af2=_0x55bd[_0x576908];return _0x450af2;};(function(_0x11401f){_0x11401f['fn']['getParent']=_0x11401f['fn'][_0xd55b('0x0')];}(jQuery));function qd_number_format(_0x59dd13,_0x45f6cc,_0x1f1e0e,_0x4e0773){_0x59dd13=(_0x59dd13+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x59dd13=isFinite(+_0x59dd13)?+_0x59dd13:0x0;_0x45f6cc=isFinite(+_0x45f6cc)?Math[_0xd55b('0x1')](_0x45f6cc):0x0;_0x4e0773=_0xd55b('0x2')===typeof _0x4e0773?',':_0x4e0773;_0x1f1e0e=_0xd55b('0x2')===typeof _0x1f1e0e?'.':_0x1f1e0e;var _0x3308a3='',_0x3308a3=function(_0x13eb30,_0x82e609){var _0x45f6cc=Math[_0xd55b('0x3')](0xa,_0x82e609);return''+(Math[_0xd55b('0x4')](_0x13eb30*_0x45f6cc)/_0x45f6cc)['toFixed'](_0x82e609);},_0x3308a3=(_0x45f6cc?_0x3308a3(_0x59dd13,_0x45f6cc):''+Math['round'](_0x59dd13))[_0xd55b('0x5')]('.');0x3<_0x3308a3[0x0][_0xd55b('0x6')]&&(_0x3308a3[0x0]=_0x3308a3[0x0][_0xd55b('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4e0773));(_0x3308a3[0x1]||'')[_0xd55b('0x6')]<_0x45f6cc&&(_0x3308a3[0x1]=_0x3308a3[0x1]||'',_0x3308a3[0x1]+=Array(_0x45f6cc-_0x3308a3[0x1]['length']+0x1)[_0xd55b('0x8')]('0'));return _0x3308a3[_0xd55b('0x8')](_0x1f1e0e);};(function(){try{window[_0xd55b('0x9')]=window['_QuatroDigital_CartData']||{},window[_0xd55b('0x9')][_0xd55b('0xa')]=window[_0xd55b('0x9')][_0xd55b('0xa')]||$[_0xd55b('0xb')]();}catch(_0x5baf36){_0xd55b('0x2')!==typeof console&&_0xd55b('0xc')===typeof console[_0xd55b('0xd')]&&console[_0xd55b('0xd')](_0xd55b('0xe'),_0x5baf36[_0xd55b('0xf')]);}}());(function(_0x441d1e){try{var _0x2b01e6=jQuery,_0x1cdc2a=function(_0x3f5215,_0x20127e){if(_0xd55b('0x10')===typeof console&&_0xd55b('0x2')!==typeof console['error']&&_0xd55b('0x2')!==typeof console[_0xd55b('0x11')]&&_0xd55b('0x2')!==typeof console[_0xd55b('0x12')]){var _0x3db7d7;_0xd55b('0x10')===typeof _0x3f5215?(_0x3f5215['unshift'](_0xd55b('0x13')),_0x3db7d7=_0x3f5215):_0x3db7d7=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x3f5215];if(_0xd55b('0x2')===typeof _0x20127e||_0xd55b('0x14')!==_0x20127e[_0xd55b('0x15')]()&&_0xd55b('0x16')!==_0x20127e[_0xd55b('0x15')]())if(_0xd55b('0x2')!==typeof _0x20127e&&_0xd55b('0x11')===_0x20127e['toLowerCase']())try{console[_0xd55b('0x11')]['apply'](console,_0x3db7d7);}catch(_0x3446bd){try{console[_0xd55b('0x11')](_0x3db7d7[_0xd55b('0x8')]('\x0a'));}catch(_0x735757){}}else try{console[_0xd55b('0xd')][_0xd55b('0x17')](console,_0x3db7d7);}catch(_0x255a88){try{console[_0xd55b('0xd')](_0x3db7d7[_0xd55b('0x8')]('\x0a'));}catch(_0x1805aa){}}else try{console[_0xd55b('0x12')][_0xd55b('0x17')](console,_0x3db7d7);}catch(_0x24dcb7){try{console[_0xd55b('0x12')](_0x3db7d7['join']('\x0a'));}catch(_0x44ebca){}}}};window[_0xd55b('0x18')]=window[_0xd55b('0x18')]||{};window[_0xd55b('0x18')][_0xd55b('0x19')]=!0x0;_0x2b01e6[_0xd55b('0x1a')]=function(){};_0x2b01e6['fn'][_0xd55b('0x1a')]=function(){return{'fn':new _0x2b01e6()};};var _0x2211fd=function(_0x330a85){var _0x4f5ccd={'s':_0xd55b('0x1b')};return function(_0x32871c){var _0x22f8e4=function(_0x58fd98){return _0x58fd98;};var _0x29cd23=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x32871c=_0x32871c['d'+_0x29cd23[0x10]+'c'+_0x29cd23[0x11]+'m'+_0x22f8e4(_0x29cd23[0x1])+'n'+_0x29cd23[0xd]]['l'+_0x29cd23[0x12]+'c'+_0x29cd23[0x0]+'ti'+_0x22f8e4('o')+'n'];var _0x340135=function(_0x518cdb){return escape(encodeURIComponent(_0x518cdb['replace'](/\./g,'¨')[_0xd55b('0x7')](/[a-zA-Z]/g,function(_0x30c755){return String['fromCharCode'](('Z'>=_0x30c755?0x5a:0x7a)>=(_0x30c755=_0x30c755[_0xd55b('0x1c')](0x0)+0xd)?_0x30c755:_0x30c755-0x1a);})));};var _0x2df702=_0x340135(_0x32871c[[_0x29cd23[0x9],_0x22f8e4('o'),_0x29cd23[0xc],_0x29cd23[_0x22f8e4(0xd)]][_0xd55b('0x8')]('')]);_0x340135=_0x340135((window[['js',_0x22f8e4('no'),'m',_0x29cd23[0x1],_0x29cd23[0x4][_0xd55b('0x1d')](),_0xd55b('0x1e')][_0xd55b('0x8')]('')]||_0xd55b('0x1f'))+['.v',_0x29cd23[0xd],'e',_0x22f8e4('x'),'co',_0x22f8e4('mm'),_0xd55b('0x20'),_0x29cd23[0x1],'.c',_0x22f8e4('o'),'m.',_0x29cd23[0x13],'r'][_0xd55b('0x8')](''));for(var _0x5cf061 in _0x4f5ccd){if(_0x340135===_0x5cf061+_0x4f5ccd[_0x5cf061]||_0x2df702===_0x5cf061+_0x4f5ccd[_0x5cf061]){var _0x42d2b7='tr'+_0x29cd23[0x11]+'e';break;}_0x42d2b7='f'+_0x29cd23[0x0]+'ls'+_0x22f8e4(_0x29cd23[0x1])+'';}_0x22f8e4=!0x1;-0x1<_0x32871c[[_0x29cd23[0xc],'e',_0x29cd23[0x0],'rc',_0x29cd23[0x9]][_0xd55b('0x8')]('')][_0xd55b('0x21')](_0xd55b('0x22'))&&(_0x22f8e4=!0x0);return[_0x42d2b7,_0x22f8e4];}(_0x330a85);}(window);if(!eval(_0x2211fd[0x0]))return _0x2211fd[0x1]?_0x1cdc2a('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x2b01e6[_0xd55b('0x1a')]=function(_0x3e82d9,_0x40695a){var _0x87e552=_0x2b01e6(_0x3e82d9);if(!_0x87e552['length'])return _0x87e552;var _0x107bbb=_0x2b01e6[_0xd55b('0x23')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xd55b('0x24'),'linkCheckout':_0xd55b('0x25'),'cartTotal':_0xd55b('0x26'),'emptyCart':_0xd55b('0x27'),'continueShopping':_0xd55b('0x28'),'shippingForm':_0xd55b('0x29')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x223303){return _0x223303[_0xd55b('0x2a')]||_0x223303[_0xd55b('0x2b')];},'callback':function(){},'callbackProductsList':function(){}},_0x40695a);_0x2b01e6('');var _0x1e2de0=this;if(_0x107bbb[_0xd55b('0x2c')]){var _0x46bf8d=!0x1;'undefined'===typeof window[_0xd55b('0x2d')]&&(_0x1cdc2a('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x2b01e6[_0xd55b('0x2e')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':'script','error':function(){_0x1cdc2a(_0xd55b('0x2f'));_0x46bf8d=!0x0;}}));if(_0x46bf8d)return _0x1cdc2a('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0xd55b('0x10')===typeof window['vtexjs']&&_0xd55b('0x2')!==typeof window['vtexjs'][_0xd55b('0x30')])var _0x441d1e=window[_0xd55b('0x2d')][_0xd55b('0x30')];else if(_0xd55b('0x10')===typeof vtex&&_0xd55b('0x10')===typeof vtex[_0xd55b('0x30')]&&_0xd55b('0x2')!==typeof vtex[_0xd55b('0x30')]['SDK'])_0x441d1e=new vtex['checkout'][(_0xd55b('0x31'))]();else return _0x1cdc2a('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x1e2de0['cartContainer']=_0xd55b('0x32');var _0x40db04=function(_0x173211){_0x2b01e6(this)[_0xd55b('0x33')](_0x173211);_0x173211[_0xd55b('0x34')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0xd55b('0x35')](_0x2b01e6('.qd_ddc_lightBoxOverlay'))['on'](_0xd55b('0x36'),function(){_0x87e552[_0xd55b('0x37')]('qd-bb-lightBoxProdAdd');_0x2b01e6(document['body'])['removeClass'](_0xd55b('0x38'));});_0x2b01e6(document)[_0xd55b('0x39')]('keyup.qd_ddc_closeFn')['on'](_0xd55b('0x3a'),function(_0x5f460){0x1b==_0x5f460[_0xd55b('0x3b')]&&(_0x87e552[_0xd55b('0x37')](_0xd55b('0x3c')),_0x2b01e6(document[_0xd55b('0x3d')])[_0xd55b('0x37')](_0xd55b('0x38')));});var _0x24fc03=_0x173211[_0xd55b('0x34')](_0xd55b('0x3e'));_0x173211[_0xd55b('0x34')](_0xd55b('0x3f'))['on']('click.qd_ddc_scrollUp',function(){_0x1e2de0[_0xd55b('0x40')]('-',void 0x0,void 0x0,_0x24fc03);return!0x1;});_0x173211[_0xd55b('0x34')](_0xd55b('0x41'))['on'](_0xd55b('0x42'),function(){_0x1e2de0[_0xd55b('0x40')](void 0x0,void 0x0,void 0x0,_0x24fc03);return!0x1;});_0x173211[_0xd55b('0x34')](_0xd55b('0x43'))[_0xd55b('0x44')]('')['on'](_0xd55b('0x45'),function(){_0x1e2de0[_0xd55b('0x46')](_0x2b01e6(this));});if(_0x107bbb['updateOnlyHover']){var _0x40695a=0x0;_0x2b01e6(this)['on'](_0xd55b('0x47'),function(){var _0x173211=function(){window[_0xd55b('0x18')]['allowUpdate']&&(_0x1e2de0[_0xd55b('0x48')](),window[_0xd55b('0x18')][_0xd55b('0x19')]=!0x1,_0x2b01e6['fn']['simpleCart'](!0x0),_0x1e2de0[_0xd55b('0x49')]());};_0x40695a=setInterval(function(){_0x173211();},0x258);_0x173211();});_0x2b01e6(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x40695a);});}};var _0x2605ca=function(_0x4851e9){_0x4851e9=_0x2b01e6(_0x4851e9);_0x107bbb['texts'][_0xd55b('0x4a')]=_0x107bbb['texts'][_0xd55b('0x4a')]['replace']('#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x107bbb[_0xd55b('0x4b')][_0xd55b('0x4a')]=_0x107bbb['texts'][_0xd55b('0x4a')]['replace'](_0xd55b('0x4c'),_0xd55b('0x4d'));_0x107bbb[_0xd55b('0x4b')][_0xd55b('0x4a')]=_0x107bbb['texts'][_0xd55b('0x4a')][_0xd55b('0x7')](_0xd55b('0x4e'),_0xd55b('0x4f'));_0x107bbb['texts'][_0xd55b('0x4a')]=_0x107bbb[_0xd55b('0x4b')]['cartTotal']['replace'](_0xd55b('0x50'),_0xd55b('0x51'));_0x4851e9['find'](_0xd55b('0x52'))['html'](_0x107bbb[_0xd55b('0x4b')][_0xd55b('0x53')]);_0x4851e9['find'](_0xd55b('0x54'))[_0xd55b('0x55')](_0x107bbb['texts'][_0xd55b('0x56')]);_0x4851e9[_0xd55b('0x34')](_0xd55b('0x57'))[_0xd55b('0x55')](_0x107bbb[_0xd55b('0x4b')][_0xd55b('0x58')]);_0x4851e9[_0xd55b('0x34')]('.qd-ddc-infoTotal')[_0xd55b('0x55')](_0x107bbb[_0xd55b('0x4b')][_0xd55b('0x4a')]);_0x4851e9['find'](_0xd55b('0x59'))[_0xd55b('0x55')](_0x107bbb[_0xd55b('0x4b')][_0xd55b('0x5a')]);_0x4851e9['find'](_0xd55b('0x5b'))['html'](_0x107bbb[_0xd55b('0x4b')]['emptyCart']);return _0x4851e9;}(this[_0xd55b('0x5c')]);var _0x413132=0x0;_0x87e552['each'](function(){0x0<_0x413132?_0x40db04['call'](this,_0x2605ca[_0xd55b('0x5d')]()):_0x40db04['call'](this,_0x2605ca);_0x413132++;});window['_QuatroDigital_CartData'][_0xd55b('0xa')][_0xd55b('0x35')](function(){_0x2b01e6(_0xd55b('0x5e'))['html'](window[_0xd55b('0x9')][_0xd55b('0x5f')]||'--');_0x2b01e6(_0xd55b('0x60'))[_0xd55b('0x55')](window[_0xd55b('0x9')]['qtt']||'0');_0x2b01e6('.qd-ddc-infoTotalShipping')[_0xd55b('0x55')](window[_0xd55b('0x9')][_0xd55b('0x61')]||'--');_0x2b01e6('.qd-ddc-infoAllTotal')[_0xd55b('0x55')](window[_0xd55b('0x9')][_0xd55b('0x62')]||'--');});var _0x1e28d0=function(_0x35d8ba,_0x47ea27){if('undefined'===typeof _0x35d8ba[_0xd55b('0x63')])return _0x1cdc2a(_0xd55b('0x64'));_0x1e2de0['renderProductsList'][_0xd55b('0x65')](this,_0x47ea27);};_0x1e2de0[_0xd55b('0x48')]=function(_0x312452,_0x234ebe){_0xd55b('0x2')!=typeof _0x234ebe?window[_0xd55b('0x18')]['dataOptionsCache']=_0x234ebe:window['_QuatroDigital_DropDown'][_0xd55b('0x66')]&&(_0x234ebe=window[_0xd55b('0x18')][_0xd55b('0x66')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0xd55b('0x66')]=void 0x0;},_0x107bbb[_0xd55b('0x67')]);_0x2b01e6(_0xd55b('0x68'))['removeClass']('qd-ddc-prodLoaded');if(_0x107bbb['smartCheckout']){var _0x40695a=function(_0xd9cbf0){window[_0xd55b('0x18')][_0xd55b('0x69')]=_0xd9cbf0;_0x1e28d0(_0xd9cbf0,_0x234ebe);_0xd55b('0x2')!==typeof window[_0xd55b('0x6a')]&&_0xd55b('0xc')===typeof window[_0xd55b('0x6a')][_0xd55b('0x6b')]&&window['_QuatroDigital_AmountProduct'][_0xd55b('0x6b')][_0xd55b('0x65')](this);_0x2b01e6(_0xd55b('0x68'))[_0xd55b('0x6c')](_0xd55b('0x6d'));};_0xd55b('0x2')!==typeof window[_0xd55b('0x18')]['getOrderForm']?(_0x40695a(window['_QuatroDigital_DropDown']['getOrderForm']),_0xd55b('0xc')===typeof _0x312452&&_0x312452(window[_0xd55b('0x18')][_0xd55b('0x69')])):_0x2b01e6['QD_checkoutQueue']([_0xd55b('0x63'),_0xd55b('0x6e'),'shippingData'],{'done':function(_0xac3942){_0x40695a[_0xd55b('0x65')](this,_0xac3942);_0xd55b('0xc')===typeof _0x312452&&_0x312452(_0xac3942);},'fail':function(_0x58b856){_0x1cdc2a([_0xd55b('0x6f'),_0x58b856]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x1e2de0[_0xd55b('0x49')]=function(){var _0x3ed7f4=_0x2b01e6(_0xd55b('0x68'));_0x3ed7f4['find'](_0xd55b('0x70'))[_0xd55b('0x6')]?_0x3ed7f4[_0xd55b('0x37')](_0xd55b('0x71')):_0x3ed7f4[_0xd55b('0x6c')](_0xd55b('0x71'));};_0x1e2de0[_0xd55b('0x72')]=function(_0x10abd5){var _0x40695a=_0x2b01e6(_0xd55b('0x73'));_0x40695a['empty']();_0x40695a[_0xd55b('0x74')](function(){var _0x40695a=_0x2b01e6(this),_0x5bc5ed,_0x3e82d9,_0x419eac=_0x2b01e6(''),_0x4c4ef2;for(_0x4c4ef2 in window[_0xd55b('0x18')][_0xd55b('0x69')][_0xd55b('0x63')])if(_0xd55b('0x10')===typeof window[_0xd55b('0x18')][_0xd55b('0x69')][_0xd55b('0x63')][_0x4c4ef2]){var _0x59cb51=window[_0xd55b('0x18')][_0xd55b('0x69')][_0xd55b('0x63')][_0x4c4ef2];var _0x5196db=_0x59cb51['productCategoryIds']['replace'](/^\/|\/$/g,'')['split']('/');var _0x333c8e=_0x2b01e6(_0xd55b('0x75'));_0x333c8e[_0xd55b('0x76')]({'data-sku':_0x59cb51['id'],'data-sku-index':_0x4c4ef2,'data-qd-departament':_0x5196db[0x0],'data-qd-category':_0x5196db[_0x5196db['length']-0x1]});_0x333c8e[_0xd55b('0x6c')]('qd-ddc-'+_0x59cb51[_0xd55b('0x77')]);_0x333c8e[_0xd55b('0x34')](_0xd55b('0x78'))[_0xd55b('0x33')](_0x107bbb[_0xd55b('0x2a')](_0x59cb51));_0x333c8e[_0xd55b('0x34')](_0xd55b('0x79'))['append'](isNaN(_0x59cb51[_0xd55b('0x7a')])?_0x59cb51[_0xd55b('0x7a')]:0x0==_0x59cb51[_0xd55b('0x7a')]?_0xd55b('0x7b'):(_0x2b01e6(_0xd55b('0x7c'))[_0xd55b('0x76')]('content')||'R$')+'\x20'+qd_number_format(_0x59cb51[_0xd55b('0x7a')]/0x64,0x2,',','.'));_0x333c8e['find'](_0xd55b('0x7d'))[_0xd55b('0x76')]({'data-sku':_0x59cb51['id'],'data-sku-index':_0x4c4ef2})[_0xd55b('0x44')](_0x59cb51['quantity']);_0x333c8e[_0xd55b('0x34')]('.qd-ddc-remove')[_0xd55b('0x76')]({'data-sku':_0x59cb51['id'],'data-sku-index':_0x4c4ef2});_0x1e2de0[_0xd55b('0x7e')](_0x59cb51['id'],_0x333c8e[_0xd55b('0x34')](_0xd55b('0x7f')),_0x59cb51[_0xd55b('0x80')]);_0x333c8e[_0xd55b('0x34')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0xd55b('0x76')]({'data-sku':_0x59cb51['id'],'data-sku-index':_0x4c4ef2});_0x333c8e[_0xd55b('0x81')](_0x40695a);_0x419eac=_0x419eac['add'](_0x333c8e);}try{var _0x441d1e=_0x40695a[_0xd55b('0x82')](_0xd55b('0x68'))[_0xd55b('0x34')](_0xd55b('0x43'));_0x441d1e['length']&&''==_0x441d1e[_0xd55b('0x44')]()&&window[_0xd55b('0x18')][_0xd55b('0x69')][_0xd55b('0x83')][_0xd55b('0x84')]&&_0x441d1e[_0xd55b('0x44')](window[_0xd55b('0x18')]['getOrderForm'][_0xd55b('0x83')]['address']['postalCode']);}catch(_0x223cba){_0x1cdc2a(_0xd55b('0x85')+_0x223cba['message'],_0xd55b('0x16'));}_0x1e2de0[_0xd55b('0x86')](_0x40695a);_0x1e2de0[_0xd55b('0x49')]();_0x10abd5&&_0x10abd5[_0xd55b('0x87')]&&function(){_0x3e82d9=_0x419eac[_0xd55b('0x88')](_0xd55b('0x89')+_0x10abd5[_0xd55b('0x87')]+'\x27]');_0x3e82d9[_0xd55b('0x6')]&&(_0x5bc5ed=0x0,_0x419eac[_0xd55b('0x74')](function(){var _0x10abd5=_0x2b01e6(this);if(_0x10abd5['is'](_0x3e82d9))return!0x1;_0x5bc5ed+=_0x10abd5[_0xd55b('0x8a')]();}),_0x1e2de0[_0xd55b('0x40')](void 0x0,void 0x0,_0x5bc5ed,_0x40695a[_0xd55b('0x35')](_0x40695a[_0xd55b('0x8b')]())),_0x419eac['removeClass']('qd-ddc-lastAddedFixed'),function(_0x12edb9){_0x12edb9[_0xd55b('0x6c')](_0xd55b('0x8c'));_0x12edb9[_0xd55b('0x6c')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x12edb9[_0xd55b('0x37')](_0xd55b('0x8c'));},_0x107bbb['timeRemoveNewItemClass']);}(_0x3e82d9),_0x2b01e6(document[_0xd55b('0x3d')])[_0xd55b('0x6c')](_0xd55b('0x8d')),setTimeout(function(){_0x2b01e6(document[_0xd55b('0x3d')])[_0xd55b('0x37')](_0xd55b('0x8d'));},_0x107bbb[_0xd55b('0x67')]));}();});(function(){_QuatroDigital_DropDown[_0xd55b('0x69')]['items'][_0xd55b('0x6')]?(_0x2b01e6(_0xd55b('0x3d'))[_0xd55b('0x37')](_0xd55b('0x8e'))[_0xd55b('0x6c')](_0xd55b('0x8f')),setTimeout(function(){_0x2b01e6(_0xd55b('0x3d'))[_0xd55b('0x37')]('qd-ddc-product-add-time');},_0x107bbb[_0xd55b('0x67')])):_0x2b01e6(_0xd55b('0x3d'))[_0xd55b('0x37')](_0xd55b('0x90'))[_0xd55b('0x6c')]('qd-ddc-cart-empty');}());'function'===typeof _0x107bbb['callbackProductsList']?_0x107bbb[_0xd55b('0x91')][_0xd55b('0x65')](this):_0x1cdc2a('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x1e2de0[_0xd55b('0x7e')]=function(_0x3da124,_0xe64c50,_0x20fc8d){function _0x3eac99(){_0xe64c50[_0xd55b('0x37')](_0xd55b('0x92'))[_0xd55b('0x93')](function(){_0x2b01e6(this)[_0xd55b('0x6c')](_0xd55b('0x92'));})['attr'](_0xd55b('0x94'),_0x20fc8d);}_0x20fc8d?_0x3eac99():isNaN(_0x3da124)?_0x1cdc2a(_0xd55b('0x95'),_0xd55b('0x14')):alert(_0xd55b('0x96'));};_0x1e2de0[_0xd55b('0x86')]=function(_0x5ebc05){var _0x40695a=function(_0x34e55d,_0x5b27b3){var _0x159837=_0x2b01e6(_0x34e55d);var _0x31dd9f=_0x159837[_0xd55b('0x76')](_0xd55b('0x97'));var _0x3e82d9=_0x159837[_0xd55b('0x76')]('data-sku-index');if(_0x31dd9f){var _0x4e77f6=parseInt(_0x159837[_0xd55b('0x44')]())||0x1;_0x1e2de0['changeQantity']([_0x31dd9f,_0x3e82d9],_0x4e77f6,_0x4e77f6+0x1,function(_0x433a78){_0x159837['val'](_0x433a78);'function'===typeof _0x5b27b3&&_0x5b27b3();});}};var _0x182724=function(_0x133f1d,_0x4bb23e){var _0x57e9a0=_0x2b01e6(_0x133f1d);var _0x3e82d9=_0x57e9a0[_0xd55b('0x76')](_0xd55b('0x97'));var _0x4fc2c4=_0x57e9a0[_0xd55b('0x76')](_0xd55b('0x98'));if(_0x3e82d9){var _0x3f9dd9=parseInt(_0x57e9a0[_0xd55b('0x44')]())||0x2;_0x1e2de0['changeQantity']([_0x3e82d9,_0x4fc2c4],_0x3f9dd9,_0x3f9dd9-0x1,function(_0xf5ec86){_0x57e9a0['val'](_0xf5ec86);_0xd55b('0xc')===typeof _0x4bb23e&&_0x4bb23e();});}};var _0x1260fa=function(_0x1eb59c,_0xdd3da3){var _0x40695a=_0x2b01e6(_0x1eb59c);var _0x3e82d9=_0x40695a[_0xd55b('0x76')](_0xd55b('0x97'));var _0x182711=_0x40695a[_0xd55b('0x76')](_0xd55b('0x98'));if(_0x3e82d9){var _0x11e349=parseInt(_0x40695a[_0xd55b('0x44')]())||0x1;_0x1e2de0['changeQantity']([_0x3e82d9,_0x182711],0x1,_0x11e349,function(_0x3389c1){_0x40695a[_0xd55b('0x44')](_0x3389c1);_0xd55b('0xc')===typeof _0xdd3da3&&_0xdd3da3();});}};var _0x3e82d9=_0x5ebc05[_0xd55b('0x34')](_0xd55b('0x99'));_0x3e82d9[_0xd55b('0x6c')]('qd_on')[_0xd55b('0x74')](function(){var _0x5ebc05=_0x2b01e6(this);_0x5ebc05[_0xd55b('0x34')]('.qd-ddc-quantityMore')['on'](_0xd55b('0x9a'),function(_0x52af3a){_0x52af3a[_0xd55b('0x9b')]();_0x3e82d9[_0xd55b('0x6c')]('qd-loading');_0x40695a(_0x5ebc05['find']('.qd-ddc-quantity'),function(){_0x3e82d9[_0xd55b('0x37')](_0xd55b('0x9c'));});});_0x5ebc05[_0xd55b('0x34')](_0xd55b('0x9d'))['on'](_0xd55b('0x9e'),function(_0x5038da){_0x5038da[_0xd55b('0x9b')]();_0x3e82d9['addClass'](_0xd55b('0x9c'));_0x182724(_0x5ebc05['find'](_0xd55b('0x7d')),function(){_0x3e82d9[_0xd55b('0x37')](_0xd55b('0x9c'));});});_0x5ebc05[_0xd55b('0x34')](_0xd55b('0x7d'))['on']('focusout.qd_ddc_change',function(){_0x3e82d9[_0xd55b('0x6c')]('qd-loading');_0x1260fa(this,function(){_0x3e82d9[_0xd55b('0x37')](_0xd55b('0x9c'));});});_0x5ebc05[_0xd55b('0x34')](_0xd55b('0x7d'))['on'](_0xd55b('0x9f'),function(_0x5960d5){0xd==_0x5960d5['keyCode']&&(_0x3e82d9[_0xd55b('0x6c')](_0xd55b('0x9c')),_0x1260fa(this,function(){_0x3e82d9[_0xd55b('0x37')]('qd-loading');}));});});_0x5ebc05[_0xd55b('0x34')](_0xd55b('0x70'))['each'](function(){var _0x5ebc05=_0x2b01e6(this);_0x5ebc05[_0xd55b('0x34')](_0xd55b('0xa0'))['on'](_0xd55b('0xa1'),function(){_0x5ebc05['addClass']('qd-loading');_0x1e2de0[_0xd55b('0xa2')](_0x2b01e6(this),function(_0x3f9c77){_0x3f9c77?_0x5ebc05[_0xd55b('0xa3')](!0x0)['slideUp'](function(){_0x5ebc05[_0xd55b('0xa4')]();_0x1e2de0[_0xd55b('0x49')]();}):_0x5ebc05[_0xd55b('0x37')](_0xd55b('0x9c'));});return!0x1;});});};_0x1e2de0['shippingCalculate']=function(_0x58b22a){var _0x442041=_0x58b22a[_0xd55b('0x44')]();_0x442041=_0x442041[_0xd55b('0x7')](/[^0-9\-]/g,'');_0x442041=_0x442041[_0xd55b('0x7')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x442041=_0x442041[_0xd55b('0x7')](/(.{9}).*/g,'$1');_0x58b22a[_0xd55b('0x44')](_0x442041);0x9<=_0x442041[_0xd55b('0x6')]&&(_0x58b22a['data'](_0xd55b('0xa5'))!=_0x442041&&_0x441d1e[_0xd55b('0xa6')]({'postalCode':_0x442041,'country':_0xd55b('0xa7')})[_0xd55b('0xa8')](function(_0x5b7c45){window[_0xd55b('0x18')]['getOrderForm']=_0x5b7c45;_0x1e2de0[_0xd55b('0x48')]();})['fail'](function(_0x204734){_0x1cdc2a(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x204734]);updateCartData();}),_0x58b22a[_0xd55b('0xa9')](_0xd55b('0xa5'),_0x442041));};_0x1e2de0[_0xd55b('0xaa')]=function(_0x4e4805,_0x2f554d,_0x2f6c53,_0xdbe769){function _0x141679(_0x2e057e){_0x2e057e=_0xd55b('0xab')!==typeof _0x2e057e?!0x1:_0x2e057e;_0x1e2de0[_0xd55b('0x48')]();window[_0xd55b('0x18')][_0xd55b('0x19')]=!0x1;_0x1e2de0[_0xd55b('0x49')]();_0xd55b('0x2')!==typeof window[_0xd55b('0x6a')]&&'function'===typeof window[_0xd55b('0x6a')][_0xd55b('0x6b')]&&window[_0xd55b('0x6a')][_0xd55b('0x6b')][_0xd55b('0x65')](this);'function'===typeof adminCart&&adminCart();_0x2b01e6['fn'][_0xd55b('0xac')](!0x0,void 0x0,_0x2e057e);_0xd55b('0xc')===typeof _0xdbe769&&_0xdbe769(_0x2f554d);}_0x2f6c53=_0x2f6c53||0x1;if(0x1>_0x2f6c53)return _0x2f554d;if(_0x107bbb[_0xd55b('0x2c')]){if(_0xd55b('0x2')===typeof window[_0xd55b('0x18')][_0xd55b('0x69')][_0xd55b('0x63')][_0x4e4805[0x1]])return _0x1cdc2a(_0xd55b('0xad')+_0x4e4805[0x1]+']'),_0x2f554d;window[_0xd55b('0x18')][_0xd55b('0x69')][_0xd55b('0x63')][_0x4e4805[0x1]][_0xd55b('0xae')]=_0x2f6c53;window[_0xd55b('0x18')][_0xd55b('0x69')][_0xd55b('0x63')][_0x4e4805[0x1]][_0xd55b('0xaf')]=_0x4e4805[0x1];_0x441d1e[_0xd55b('0xb0')]([window[_0xd55b('0x18')][_0xd55b('0x69')][_0xd55b('0x63')][_0x4e4805[0x1]]],['items',_0xd55b('0x6e'),_0xd55b('0x83')])[_0xd55b('0xa8')](function(_0x52c41d){window[_0xd55b('0x18')]['getOrderForm']=_0x52c41d;_0x141679(!0x0);})[_0xd55b('0xb1')](function(_0x34f4f0){_0x1cdc2a(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x34f4f0]);_0x141679();});}else _0x1cdc2a(_0xd55b('0xb2'));};_0x1e2de0[_0xd55b('0xa2')]=function(_0xa7a143,_0x4af356){function _0x190049(_0x4e3702){_0x4e3702=_0xd55b('0xab')!==typeof _0x4e3702?!0x1:_0x4e3702;'undefined'!==typeof window['_QuatroDigital_AmountProduct']&&_0xd55b('0xc')===typeof window[_0xd55b('0x6a')]['exec']&&window[_0xd55b('0x6a')][_0xd55b('0x6b')][_0xd55b('0x65')](this);'function'===typeof adminCart&&adminCart();_0x2b01e6['fn'][_0xd55b('0xac')](!0x0,void 0x0,_0x4e3702);'function'===typeof _0x4af356&&_0x4af356(_0x3e82d9);}var _0x3e82d9=!0x1,_0x2d55fd=_0x2b01e6(_0xa7a143)[_0xd55b('0x76')](_0xd55b('0x98'));if(_0x107bbb[_0xd55b('0x2c')]){if(_0xd55b('0x2')===typeof window[_0xd55b('0x18')][_0xd55b('0x69')][_0xd55b('0x63')][_0x2d55fd])return _0x1cdc2a('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x2d55fd+']'),_0x3e82d9;window[_0xd55b('0x18')]['getOrderForm'][_0xd55b('0x63')][_0x2d55fd]['index']=_0x2d55fd;_0x441d1e[_0xd55b('0xb3')]([window[_0xd55b('0x18')][_0xd55b('0x69')]['items'][_0x2d55fd]],[_0xd55b('0x63'),_0xd55b('0x6e'),_0xd55b('0x83')])['done'](function(_0x23725b){_0x3e82d9=!0x0;window[_0xd55b('0x18')][_0xd55b('0x69')]=_0x23725b;_0x1e28d0(_0x23725b);_0x190049(!0x0);})[_0xd55b('0xb1')](function(_0x5c5808){_0x1cdc2a([_0xd55b('0xb4'),_0x5c5808]);_0x190049();});}else alert(_0xd55b('0xb5'));};_0x1e2de0[_0xd55b('0x40')]=function(_0x14a4e4,_0x37ead0,_0x4f98cc,_0x5bc301){_0x5bc301=_0x5bc301||_0x2b01e6(_0xd55b('0xb6'));_0x14a4e4=_0x14a4e4||'+';_0x37ead0=_0x37ead0||0.9*_0x5bc301[_0xd55b('0xb7')]();_0x5bc301[_0xd55b('0xa3')](!0x0,!0x0)[_0xd55b('0xb8')]({'scrollTop':isNaN(_0x4f98cc)?_0x14a4e4+'='+_0x37ead0+'px':_0x4f98cc});};_0x107bbb['updateOnlyHover']||(_0x1e2de0[_0xd55b('0x48')](),_0x2b01e6['fn']['simpleCart'](!0x0));_0x2b01e6(window)['on'](_0xd55b('0xb9'),function(){try{window[_0xd55b('0x18')][_0xd55b('0x69')]=void 0x0,_0x1e2de0[_0xd55b('0x48')]();}catch(_0x16e15a){_0x1cdc2a(_0xd55b('0xba')+_0x16e15a['message'],_0xd55b('0xbb'));}});'function'===typeof _0x107bbb[_0xd55b('0xa')]?_0x107bbb[_0xd55b('0xa')]['call'](this):_0x1cdc2a(_0xd55b('0xbc'));};_0x2b01e6['fn'][_0xd55b('0x1a')]=function(_0x4718d5){var _0x4c608e=_0x2b01e6(this);_0x4c608e['fn']=new _0x2b01e6[(_0xd55b('0x1a'))](this,_0x4718d5);return _0x4c608e;};}catch(_0x243229){'undefined'!==typeof console&&_0xd55b('0xc')===typeof console[_0xd55b('0xd')]&&console[_0xd55b('0xd')](_0xd55b('0xe'),_0x243229);}}(this));(function(_0x15f6e8){try{var _0x3452d1=jQuery;window[_0xd55b('0x6a')]=window[_0xd55b('0x6a')]||{};window[_0xd55b('0x6a')][_0xd55b('0x63')]={};window[_0xd55b('0x6a')]['allowRecalculate']=!0x1;window[_0xd55b('0x6a')]['buyButtonClicked']=!0x1;window[_0xd55b('0x6a')][_0xd55b('0xbd')]=!0x1;var _0x48fb81=function(){if(window[_0xd55b('0x6a')][_0xd55b('0xbe')]){var _0x437ee4=!0x1;var _0x4a2971={};window['_QuatroDigital_AmountProduct'][_0xd55b('0x63')]={};for(_0x50af60 in window['_QuatroDigital_DropDown']['getOrderForm']['items'])if(_0xd55b('0x10')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0xd55b('0x63')][_0x50af60]){var _0x21d2e7=window['_QuatroDigital_DropDown']['getOrderForm'][_0xd55b('0x63')][_0x50af60];_0xd55b('0x2')!==typeof _0x21d2e7[_0xd55b('0xbf')]&&null!==_0x21d2e7['productId']&&''!==_0x21d2e7[_0xd55b('0xbf')]&&(window['_QuatroDigital_AmountProduct'][_0xd55b('0x63')][_0xd55b('0xc0')+_0x21d2e7['productId']]=window[_0xd55b('0x6a')][_0xd55b('0x63')][_0xd55b('0xc0')+_0x21d2e7[_0xd55b('0xbf')]]||{},window[_0xd55b('0x6a')]['items']['prod_'+_0x21d2e7[_0xd55b('0xbf')]][_0xd55b('0xc1')]=_0x21d2e7[_0xd55b('0xbf')],_0x4a2971['prod_'+_0x21d2e7[_0xd55b('0xbf')]]||(window['_QuatroDigital_AmountProduct']['items']['prod_'+_0x21d2e7[_0xd55b('0xbf')]][_0xd55b('0xc2')]=0x0),window[_0xd55b('0x6a')]['items'][_0xd55b('0xc0')+_0x21d2e7[_0xd55b('0xbf')]]['qtt']+=_0x21d2e7[_0xd55b('0xae')],_0x437ee4=!0x0,_0x4a2971[_0xd55b('0xc0')+_0x21d2e7['productId']]=!0x0);}var _0x50af60=_0x437ee4;}else _0x50af60=void 0x0;window[_0xd55b('0x6a')][_0xd55b('0xbe')]&&(_0x3452d1(_0xd55b('0xc3'))['remove'](),_0x3452d1(_0xd55b('0xc4'))['removeClass'](_0xd55b('0xc5')));for(var _0x37b0ff in window[_0xd55b('0x6a')]['items']){_0x21d2e7=window[_0xd55b('0x6a')]['items'][_0x37b0ff];if(_0xd55b('0x10')!==typeof _0x21d2e7)return;_0x4a2971=_0x3452d1(_0xd55b('0xc6')+_0x21d2e7[_0xd55b('0xc1')]+']')[_0xd55b('0x82')]('li');if(window[_0xd55b('0x6a')]['allowRecalculate']||!_0x4a2971[_0xd55b('0x34')](_0xd55b('0xc3'))['length'])_0x437ee4=_0x3452d1(_0xd55b('0xc7')),_0x437ee4[_0xd55b('0x34')]('.qd-bap-qtt')[_0xd55b('0x55')](_0x21d2e7[_0xd55b('0xc2')]),_0x21d2e7=_0x4a2971['find'](_0xd55b('0xc8')),_0x21d2e7[_0xd55b('0x6')]?_0x21d2e7['prepend'](_0x437ee4)[_0xd55b('0x6c')](_0xd55b('0xc5')):_0x4a2971[_0xd55b('0xc9')](_0x437ee4);}_0x50af60&&(window[_0xd55b('0x6a')][_0xd55b('0xbe')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0xd55b('0x6b')]=function(){window['_QuatroDigital_AmountProduct'][_0xd55b('0xbe')]=!0x0;_0x48fb81[_0xd55b('0x65')](this);};_0x3452d1(document)[_0xd55b('0xca')](function(){_0x48fb81[_0xd55b('0x65')](this);});}catch(_0x293120){_0xd55b('0x2')!==typeof console&&_0xd55b('0xc')===typeof console[_0xd55b('0xd')]&&console[_0xd55b('0xd')](_0xd55b('0xe'),_0x293120);}}(this));(function(){try{var _0x340d38=jQuery,_0x2ecb9e,_0x1719ec={'selector':_0xd55b('0xcb'),'dropDown':{},'buyButton':{}};_0x340d38[_0xd55b('0xcc')]=function(_0x4a9921){var _0x477642={};_0x2ecb9e=_0x340d38[_0xd55b('0x23')](!0x0,{},_0x1719ec,_0x4a9921);_0x4a9921=_0x340d38(_0x2ecb9e[_0xd55b('0xcd')])[_0xd55b('0x1a')](_0x2ecb9e['dropDown']);_0x477642['buyButton']=_0xd55b('0x2')!==typeof _0x2ecb9e[_0xd55b('0xce')][_0xd55b('0xcf')]&&!0x1===_0x2ecb9e['dropDown'][_0xd55b('0xcf')]?_0x340d38(_0x2ecb9e[_0xd55b('0xcd')])[_0xd55b('0xd0')](_0x4a9921['fn'],_0x2ecb9e[_0xd55b('0xd1')]):_0x340d38(_0x2ecb9e[_0xd55b('0xcd')])[_0xd55b('0xd0')](_0x2ecb9e['buyButton']);_0x477642[_0xd55b('0xce')]=_0x4a9921;return _0x477642;};_0x340d38['fn'][_0xd55b('0xd2')]=function(){_0xd55b('0x10')===typeof console&&_0xd55b('0xc')===typeof console[_0xd55b('0x11')]&&console[_0xd55b('0x11')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x340d38[_0xd55b('0xd2')]=_0x340d38['fn'][_0xd55b('0xd2')];}catch(_0x3d2035){_0xd55b('0x2')!==typeof console&&_0xd55b('0xc')===typeof console[_0xd55b('0xd')]&&console[_0xd55b('0xd')](_0xd55b('0xe'),_0x3d2035);}}());

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x05e5=['QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.produto','object','toLowerCase','[Video\x20in\x20product]\x20','undefined','info','error','qdVideoInProduct','div#image','videoFieldSelector','text','replace','indexOf','youtube','push','split','pop','youtu.be','shift','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','join','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','find','iframe','bind','hide','removeAttr','body','removeClass','.qd-videoItem','length','call','string','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','.ON','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','controlVideo','click','start','insertThumbsIn','trigger'];(function(_0x3579a2,_0x293450){var _0x3e45e2=function(_0x4d3162){while(--_0x4d3162){_0x3579a2['push'](_0x3579a2['shift']());}};_0x3e45e2(++_0x293450);}(_0x05e5,0x1a8));var _0x505e=function(_0x272e2a,_0x8ecea){_0x272e2a=_0x272e2a-0x0;var _0xf84a02=_0x05e5[_0x272e2a];return _0xf84a02;};(function(_0x16dc82){$(function(){if($(document['body'])['is'](_0x505e('0x0'))){var _0x104148=[];var _0x99307d=function(_0x15695c,_0x5e1785){_0x505e('0x1')===typeof console&&('undefined'!==typeof _0x5e1785&&'alerta'===_0x5e1785[_0x505e('0x2')]()?console['warn'](_0x505e('0x3')+_0x15695c):_0x505e('0x4')!==typeof _0x5e1785&&_0x505e('0x5')===_0x5e1785['toLowerCase']()?console[_0x505e('0x5')](_0x505e('0x3')+_0x15695c):console[_0x505e('0x6')](_0x505e('0x3')+_0x15695c));};window[_0x505e('0x7')]=window[_0x505e('0x7')]||{};var _0x2a9af8=$['extend'](!0x0,{'insertThumbsIn':'start','videoFieldSelector':'td.value-field.Videos:first','controlVideo':!0x0,'urlProtocol':'http'},window[_0x505e('0x7')]);var _0x1b2c96=$('ul.thumbs');var _0x34d129=$(_0x505e('0x8'));var _0x483950=$(_0x2a9af8[_0x505e('0x9')])[_0x505e('0xa')]()[_0x505e('0xb')](/\;\s*/,';')['split'](';');for(var _0x21300f=0x0;_0x21300f<_0x483950['length'];_0x21300f++)-0x1<_0x483950[_0x21300f][_0x505e('0xc')](_0x505e('0xd'))?_0x104148[_0x505e('0xe')](_0x483950[_0x21300f][_0x505e('0xf')]('v=')[_0x505e('0x10')]()[_0x505e('0xf')](/[&#]/)['shift']()):-0x1<_0x483950[_0x21300f][_0x505e('0xc')](_0x505e('0x11'))&&_0x104148[_0x505e('0xe')](_0x483950[_0x21300f][_0x505e('0xf')]('be/')['pop']()[_0x505e('0xf')](/[\?&#]/)[_0x505e('0x12')]());var _0x24d3c2=$(_0x505e('0x13'));_0x24d3c2[_0x505e('0x14')](_0x505e('0x15'));_0x24d3c2[_0x505e('0x16')]('<div\x20class=\x22qd-playerContainer\x22></div>');_0x483950=function(_0xda5dde){var _0x5dbf14={'s':_0x505e('0x17')};return function(_0x462d0e){var _0x3b9085=function(_0x46e0d9){return _0x46e0d9;};var _0x528ee0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x462d0e=_0x462d0e['d'+_0x528ee0[0x10]+'c'+_0x528ee0[0x11]+'m'+_0x3b9085(_0x528ee0[0x1])+'n'+_0x528ee0[0xd]]['l'+_0x528ee0[0x12]+'c'+_0x528ee0[0x0]+'ti'+_0x3b9085('o')+'n'];var _0x2d6a6f=function(_0x366b62){return escape(encodeURIComponent(_0x366b62['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x5c32e0){return String['fromCharCode'](('Z'>=_0x5c32e0?0x5a:0x7a)>=(_0x5c32e0=_0x5c32e0[_0x505e('0x18')](0x0)+0xd)?_0x5c32e0:_0x5c32e0-0x1a);})));};var _0x77237b=_0x2d6a6f(_0x462d0e[[_0x528ee0[0x9],_0x3b9085('o'),_0x528ee0[0xc],_0x528ee0[_0x3b9085(0xd)]]['join']('')]);_0x2d6a6f=_0x2d6a6f((window[['js',_0x3b9085('no'),'m',_0x528ee0[0x1],_0x528ee0[0x4]['toUpperCase'](),'ite']['join']('')]||'---')+['.v',_0x528ee0[0xd],'e',_0x3b9085('x'),'co',_0x3b9085('mm'),'erc',_0x528ee0[0x1],'.c',_0x3b9085('o'),'m.',_0x528ee0[0x13],'r']['join'](''));for(var _0x5b4af3 in _0x5dbf14){if(_0x2d6a6f===_0x5b4af3+_0x5dbf14[_0x5b4af3]||_0x77237b===_0x5b4af3+_0x5dbf14[_0x5b4af3]){var _0xe1b719='tr'+_0x528ee0[0x11]+'e';break;}_0xe1b719='f'+_0x528ee0[0x0]+'ls'+_0x3b9085(_0x528ee0[0x1])+'';}_0x3b9085=!0x1;-0x1<_0x462d0e[[_0x528ee0[0xc],'e',_0x528ee0[0x0],'rc',_0x528ee0[0x9]][_0x505e('0x19')]('')][_0x505e('0xc')](_0x505e('0x1a'))&&(_0x3b9085=!0x0);return[_0xe1b719,_0x3b9085];}(_0xda5dde);}(window);if(!eval(_0x483950[0x0]))return _0x483950[0x1]?_0x99307d(_0x505e('0x1b')):!0x1;var _0x26ab0e=function(_0x462200,_0x4355d4){_0x505e('0xd')===_0x4355d4&&_0x24d3c2[_0x505e('0x1c')](_0x505e('0x1d')+_0x2a9af8[_0x505e('0x1e')]+_0x505e('0x1f')+_0x462200+_0x505e('0x20'));_0x34d129[_0x505e('0x21')](_0x505e('0x22'),_0x34d129[_0x505e('0x21')](_0x505e('0x22'))||_0x34d129[_0x505e('0x22')]());_0x34d129[_0x505e('0x23')](!0x0,!0x0)[_0x505e('0x24')](0x1f4,0x0,function(){$('body')[_0x505e('0x25')](_0x505e('0x26'));});_0x24d3c2['stop'](!0x0,!0x0)[_0x505e('0x24')](0x1f4,0x1,function(){_0x34d129[_0x505e('0x27')](_0x24d3c2)[_0x505e('0x28')]({'height':_0x24d3c2[_0x505e('0x29')](_0x505e('0x2a'))[_0x505e('0x22')]()},0x2bc);});};removePlayer=function(){_0x1b2c96[_0x505e('0x29')]('a:not(\x27.qd-videoLink\x27)')[_0x505e('0x2b')]('click.removeVideo',function(){_0x24d3c2[_0x505e('0x23')](!0x0,!0x0)[_0x505e('0x24')](0x1f4,0x0,function(){$(this)[_0x505e('0x2c')]()[_0x505e('0x2d')]('style');$(_0x505e('0x2e'))[_0x505e('0x2f')](_0x505e('0x26'));});_0x34d129[_0x505e('0x23')](!0x0,!0x0)[_0x505e('0x24')](0x1f4,0x1,function(){var _0x3c8926=_0x34d129[_0x505e('0x21')](_0x505e('0x22'));_0x3c8926&&_0x34d129[_0x505e('0x28')]({'height':_0x3c8926},0x2bc);});});};var _0x5bcccd=function(){if(!_0x1b2c96[_0x505e('0x29')](_0x505e('0x30'))[_0x505e('0x31')])for(vId in removePlayer[_0x505e('0x32')](this),_0x104148)if(_0x505e('0x33')===typeof _0x104148[vId]&&''!==_0x104148[vId]){var _0x55e7b5=$('<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x104148[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x104148[vId]+_0x505e('0x34')+_0x104148[vId]+_0x505e('0x35'));_0x55e7b5[_0x505e('0x29')]('a')[_0x505e('0x2b')]('click.playVideo',function(){var _0x9137ca=$(this);_0x1b2c96[_0x505e('0x29')](_0x505e('0x36'))[_0x505e('0x2f')]('ON');_0x9137ca[_0x505e('0x25')]('ON');0x1==_0x2a9af8['controlVideo']?$('.qd-playerWrapper\x20iframe')[_0x505e('0x31')]?(_0x26ab0e[_0x505e('0x32')](this,'',''),$(_0x505e('0x37'))[0x0][_0x505e('0x38')][_0x505e('0x39')](_0x505e('0x3a'),'*')):_0x26ab0e[_0x505e('0x32')](this,_0x9137ca[_0x505e('0x3b')](_0x505e('0x3c')),_0x505e('0xd')):_0x26ab0e[_0x505e('0x32')](this,_0x9137ca[_0x505e('0x3b')](_0x505e('0x3c')),'youtube');return!0x1;});0x1==_0x2a9af8[_0x505e('0x3d')]&&_0x1b2c96['find']('a:not(.qd-videoLink)')[_0x505e('0x3e')](function(_0x3d52c5){$('.qd-playerWrapper\x20iframe')[_0x505e('0x31')]&&$(_0x505e('0x37'))[0x0][_0x505e('0x38')][_0x505e('0x39')]('{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','*');});_0x505e('0x3f')===_0x2a9af8[_0x505e('0x40')]?_0x55e7b5[_0x505e('0x14')](_0x1b2c96):_0x55e7b5['appendTo'](_0x1b2c96);_0x55e7b5[_0x505e('0x41')](_0x505e('0x42'),[_0x104148[vId],_0x55e7b5]);}};$(document)[_0x505e('0x43')](_0x5bcccd);$(window)[_0x505e('0x44')](_0x5bcccd);(function(){var _0x26a4f7=this;var _0x304ce3=window[_0x505e('0x45')]||function(){};window[_0x505e('0x45')]=function(_0x273184,_0x59c81a){$(_0x273184||'')['is']('.qd-videoLink')||(_0x304ce3['call'](this,_0x273184,_0x59c81a),_0x5bcccd['call'](_0x26a4f7));};}());}});}(this));

/* Automatizador de comments box do Facebook // Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
/* Quatro Digital - Smart Image Load // Carlos Vinicius // Todos os direitos reservados */
var _0xe802=['not','.qd-sil-on','find','img:visible','length','scrollTop','bottom','top','height','clone','load','addClass','qd-sil-image-loaded','attr','src','sizes','width','insertAfter','closest','offset','push','extend','QD_SIL_scrollRange','documentElement','trigger','QD_SIL_scroll','QD_smartImageLoad','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','join','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','object','undefined','error','warn','function','unshift','toLowerCase','info','apply','300','imageWrapper'];(function(_0x25ea95,_0x162591){var _0x494fa8=function(_0x2f3186){while(--_0x2f3186){_0x25ea95['push'](_0x25ea95['shift']());}};_0x494fa8(++_0x162591);}(_0xe802,0x7c));var _0x2e80=function(_0x23d413,_0x5ede3f){_0x23d413=_0x23d413-0x0;var _0x2ad0dd=_0xe802[_0x23d413];return _0x2ad0dd;};(function(_0x27f4cc){'use strict';var _0x52b14c=jQuery;if(typeof _0x52b14c['fn'][_0x2e80('0x0')]==='function')return;_0x52b14c['fn'][_0x2e80('0x0')]=function(){};var _0x2c7798=function(_0x1e3b68){var _0x57d63b={'s':_0x2e80('0x1')};return function(_0x79b44a){var _0x1f6242,_0x1c218e,_0x228f1c,_0x111ce9;_0x1c218e=function(_0x401f04){return _0x401f04;};_0x228f1c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x79b44a=_0x79b44a['d'+_0x228f1c[0x10]+'c'+_0x228f1c[0x11]+'m'+_0x1c218e(_0x228f1c[0x1])+'n'+_0x228f1c[0xd]]['l'+_0x228f1c[0x12]+'c'+_0x228f1c[0x0]+'ti'+_0x1c218e('o')+'n'];_0x1f6242=function(_0x3a81a0){return escape(encodeURIComponent(_0x3a81a0[_0x2e80('0x2')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x40ff78){return String[_0x2e80('0x3')](('Z'>=_0x40ff78?0x5a:0x7a)>=(_0x40ff78=_0x40ff78['charCodeAt'](0x0)+0xd)?_0x40ff78:_0x40ff78-0x1a);})));};var _0x3d3181=_0x1f6242(_0x79b44a[[_0x228f1c[0x9],_0x1c218e('o'),_0x228f1c[0xc],_0x228f1c[_0x1c218e(0xd)]][_0x2e80('0x4')]('')]);_0x1f6242=_0x1f6242((window[['js',_0x1c218e('no'),'m',_0x228f1c[0x1],_0x228f1c[0x4][_0x2e80('0x5')](),_0x2e80('0x6')][_0x2e80('0x4')]('')]||_0x2e80('0x7'))+['.v',_0x228f1c[0xd],'e',_0x1c218e('x'),'co',_0x1c218e('mm'),_0x2e80('0x8'),_0x228f1c[0x1],'.c',_0x1c218e('o'),'m.',_0x228f1c[0x13],'r'][_0x2e80('0x4')](''));for(var _0x2db2b0 in _0x57d63b){if(_0x1f6242===_0x2db2b0+_0x57d63b[_0x2db2b0]||_0x3d3181===_0x2db2b0+_0x57d63b[_0x2db2b0]){_0x111ce9='tr'+_0x228f1c[0x11]+'e';break;}_0x111ce9='f'+_0x228f1c[0x0]+'ls'+_0x1c218e(_0x228f1c[0x1])+'';}_0x1c218e=!0x1;-0x1<_0x79b44a[[_0x228f1c[0xc],'e',_0x228f1c[0x0],'rc',_0x228f1c[0x9]][_0x2e80('0x4')]('')][_0x2e80('0x9')](_0x2e80('0xa'))&&(_0x1c218e=!0x0);return[_0x111ce9,_0x1c218e];}(_0x1e3b68);}(window);if(!eval(_0x2c7798[0x0]))return _0x2c7798[0x1]?_0x4801a0('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x3eaa53=_0x2e80('0xb');var _0x4801a0=function(_0x5cdb17,_0x3ec551){if(_0x2e80('0xc')===typeof console&&_0x2e80('0xd')!==typeof console[_0x2e80('0xe')]&&_0x2e80('0xd')!==typeof console['info']&&_0x2e80('0xd')!==typeof console[_0x2e80('0xf')]){if(_0x2e80('0xc')==typeof _0x5cdb17&&_0x2e80('0x10')==typeof _0x5cdb17['unshift']){_0x5cdb17[_0x2e80('0x11')]('['+_0x3eaa53+']\x0a');var _0x39d58f=_0x5cdb17;}else _0x39d58f=['['+_0x3eaa53+']\x0a',_0x5cdb17];if(_0x2e80('0xd')==typeof _0x3ec551||'alerta'!==_0x3ec551[_0x2e80('0x12')]()&&'aviso'!==_0x3ec551[_0x2e80('0x12')]())if(_0x2e80('0xd')!=typeof _0x3ec551&&_0x2e80('0x13')==_0x3ec551[_0x2e80('0x12')]())try{console[_0x2e80('0x13')]['apply'](console,_0x39d58f);}catch(_0x5501dd){try{console[_0x2e80('0x13')](_0x39d58f['join']('\x0a'));}catch(_0x2ba3ab){}}else try{console[_0x2e80('0xe')][_0x2e80('0x14')](console,_0x39d58f);}catch(_0x338c45){try{console['error'](_0x39d58f[_0x2e80('0x4')]('\x0a'));}catch(_0x435c8f){}}else try{console['warn'][_0x2e80('0x14')](console,_0x39d58f);}catch(_0x2a6c55){try{console[_0x2e80('0xf')](_0x39d58f['join']('\x0a'));}catch(_0x373811){}}}};var _0x14e389=/(ids\/[0-9]+-)[0-9-]+/i;var _0x498900={'imageWrapper':'.qd_sil_img_wrapper','sizes':{'width':_0x2e80('0x15'),'height':_0x2e80('0x15')}};var _0x5bdcab=function(_0x212e22,_0xd754f6){'use strict';_0x727c3d();_0x52b14c(window)['on']('QD_SIL_scroll\x20QuatroDigital.is_Callback',_0x727c3d);function _0x727c3d(){try{var _0x7b3899=_0x212e22['find'](_0xd754f6[_0x2e80('0x16')])[_0x2e80('0x17')](_0x2e80('0x18'))[_0x2e80('0x19')](_0x2e80('0x1a'));if(!_0x7b3899[_0x2e80('0x1b')])return;var _0x5d75ef=_0x52b14c(window);var _0x4d0195={'top':_0x5d75ef[_0x2e80('0x1c')]()};_0x4d0195[_0x2e80('0x1d')]=_0x4d0195[_0x2e80('0x1e')]+_0x5d75ef['height']();var _0xee7779=_0x7b3899['first']()[_0x2e80('0x1f')]();var _0x11dc09=_0x2ac92d(_0x7b3899,_0x4d0195,_0xee7779);for(var _0x8ecd7f=0x0;_0x8ecd7f<_0x11dc09['length'];_0x8ecd7f++)_0xeb807e(_0x52b14c(_0x11dc09[_0x8ecd7f]));}catch(_0x2ecee2){typeof console!==_0x2e80('0xd')&&typeof console[_0x2e80('0xe')]==='function'&&console['error']('Problemas\x20:(\x20.\x20Detalhes:\x20',_0x2ecee2);}}function _0xeb807e(_0x27e302){var _0x226e57=_0x27e302[_0x2e80('0x20')]();_0x226e57['on'](_0x2e80('0x21'),function(){_0x52b14c(this)[_0x2e80('0x22')](_0x2e80('0x23'));});_0x226e57[_0x2e80('0x24')]({'src':_0x226e57[0x0][_0x2e80('0x25')][_0x2e80('0x2')](_0x14e389,'$1'+_0xd754f6[_0x2e80('0x26')][_0x2e80('0x27')]+'-'+_0xd754f6[_0x2e80('0x26')][_0x2e80('0x1f')]),'width':_0xd754f6[_0x2e80('0x26')]['width'],'height':_0xd754f6[_0x2e80('0x26')][_0x2e80('0x1f')]});_0x226e57['addClass']('qd-sil-image')[_0x2e80('0x28')](_0x27e302);_0x226e57[_0x2e80('0x29')](_0xd754f6[_0x2e80('0x16')])[_0x2e80('0x22')]('qd-sil-on');}function _0x2ac92d(_0x484d8a,_0x252a84,_0x108183){var _0xd6cd35;var _0x243f13=[];for(var _0x211031=0x0;_0x211031<_0x484d8a[_0x2e80('0x1b')];_0x211031++){_0xd6cd35=_0x52b14c(_0x484d8a[_0x211031])[_0x2e80('0x2a')]();_0xd6cd35[_0x2e80('0x1d')]=_0xd6cd35[_0x2e80('0x1e')]+_0x108183;if(!(_0x252a84['bottom']<_0xd6cd35[_0x2e80('0x1e')]||_0x252a84['top']>_0xd6cd35['bottom'])){_0x243f13[_0x2e80('0x2b')](_0x484d8a[_0x211031]);}}return _0x243f13;};};_0x52b14c['fn']['QD_smartImageLoad']=function(_0x16e840){var _0x5d3207=_0x52b14c(this);if(!_0x5d3207[_0x2e80('0x1b')])return _0x5d3207;_0x5d3207['each'](function(){var _0x4f1759=_0x52b14c(this);_0x4f1759['QD_smartImageLoad']=new _0x5bdcab(_0x4f1759,_0x52b14c[_0x2e80('0x2c')]({},_0x498900,_0x16e840));});return _0x5d3207;};window[_0x2e80('0x2d')]=0x28;var _0x95b79c=QD_SIL_scrollRange;var _0x348222=0x0;_0x52b14c(window)['on']('scroll',function(){var _0x142dc2=document[_0x2e80('0x2e')][_0x2e80('0x1c')];if(_0x142dc2>_0x348222+_0x95b79c||_0x142dc2<_0x348222-_0x95b79c){_0x52b14c(window)[_0x2e80('0x2f')](_0x2e80('0x30'));_0x348222=_0x142dc2;}});}(this));