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
			Common.applySmartCart();
			Common.openSearchModal();
			Common.vtexBindQuickViewDestroy();
			Common.boxTelevendas();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.qdOverlay();
			Common.showFooterLinks();
			Common.applyTipBarCarousel();
			Common.saveAmountFix();
			Common.applySmartPrice();
			Common.applyCarouselShelf();
			Common.bodyDataQDScrollT();
			Common.showHideMenuFloat();
			Common.openModalVideoInstitutional();
			Common.smartQuantityShelf();
		},
		ajaxStop: function() {
			Common.appendSkuPopUpCloseBtn();
			Common.applySmartPrice();
		},
		windowOnload: function() {
			Common.facebookLikebox();
			Common.saveAmountFix();
		},
		showHideMenuFloat: function(){
			$('.header-qd-v1-float-menu-trigger').click(function(){
				$('.header-qd-v1-amazing-menu-wrapper.float-bar').toggleClass('qd-nav-float-on');
			});
		},
		bodyDataQDScrollT: function() {
			$(document.body).attr('data-qd-scroll-limit', '145');
		},

		smartQuantityShelf: function() {
            $(".shelf-qd-v1-buy-button:not(.qd-on)").addClass('qd-on').QD_smartQuantity({
                buyButton: ".btn-add-buy-button-asynchronous"
            });
		},
		
		applySmartCart: function() {
			$('.header-qd-v1-actions-wrapper').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"><div class="qd-sc-wrapper"></div></div>');

			var wrapper = $(".qd-sc-wrapper");

			$.QD_smartCart({
				selector: wrapper,
				dropDown:{
					texts: {
						linkCart: "Finalizar Compra",
						cartTotal: '<span class="qd-infoTotalItems">Itens: #items</span><span class="qd-infoTotalValue">Total: #value</span>'
					},
					updateOnlyHover: false,
					smartCheckout: true,
					callback: function() {
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Meu carrinho</h3></div>');
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
		appendSkuPopUpCloseBtn: function() {
			var wrapper = $('.boxPopUp2 .selectSkuTitle:not(.qd-on)');
			wrapper.addClass('qd-on').append($('<span class="modal-qd-v1-box-popup-close">Fechar</span>').click(function() {
				$(window).trigger('vtex.modal.hide');
				wrapper.removeClass('.qd-on');
				return false;
			}));
		},		
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},		
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		boxTelevendas: function () {
			var wrapper = $('.boxTelevendas');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},

					{
						breakpoint: 991,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
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
			wrapper.first().css('opacity', '1');
		},
		applyAmazingMenu: function() {
			$('.header-qd-v1-amazing-menu, .footer-qd-v1-menu-list').QD_amazingMenu();

			$('.header-qd-v1-floating-amazing-menu').click(function(e) {
				$('.header-qd-v1-amazing-menu-wrapper').toggleClass('qd-is-active');
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

			$('.header-qd-v1-amazing-menu-trigger').click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').on('click', 'a#login', function() {
				$(document.body).removeClass('qd-am-on');
			});
		},
		facebookLikebox: function () {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/gasometromadeiras/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/gasometromadeiras/"></a></blockquote></div></div>');
		},
		openSearchModal: function() {
			$('.header-qd-v1-action-search').click(function(e) {
				e.preventDefault();
				
				var modal = $('.modal-qd-v1-search');
				modal.modal();
				
				$(document.body).addClass('qd-sm-on');
				modal.on('hidden.bs.modal', function (e) {
					$(document.body).removeClass('qd-sm-on');
					modal.off(e);
				})
			});
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-menu-list > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		},
		applyTipBarCarousel: function() {
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

			wrapper.slick($.extend(true, options, (function() {
				// Se estiver dentro do product-qd-v1-sku-selection-box, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				// if(wrapper.closest('.product-qd-v1-sku-selection-box').length)
					// return { slidesToShow: 2 };
				return {};
			})()));
		},
		saveAmountFix: function() {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		applySmartPrice:function(){

			
			// ATENÇÃO CHAMAR ESSA FUNÇÃO TBM NO AJAX STOP
			var wrapper = $("li[layout]");

			$('<div class="shelf-qd-v1-smart-price component-qd-v1-smart-price"> <div class="row"> <div class="col-xs-2"> <div class="shelf-qd-v1-sp-icon"> <i class="fa fa-barcode" aria-hidden="true"></i> </div> </div> <div class="col-xs-10"> <span class="qd_displayPrice shelf-qd-v1-sp-best-price">R$ </span> <span class="qd-sp-display-discount shelf-qd-v1-sp-discount">0% de desconto no boleto</span> </div> </div> </div>').insertBefore(".shelf-qd-v1-price:not(.qd-on)");

			$(".shelf-qd-v1-price").addClass('qd-on');

			wrapper.find(".flag").QD_SmartPrice({
				filterFlagBy: "[class*='boleto']",
				wrapperElement: wrapper,
				productPage:{
					isProductPage: false
				}
			});            
		},
		applyCarouselShelf: function() {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);
				$t.find('h2').insertBefore(wrapper);
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
		openModalVideoInstitutional: function() {
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function(e) {
				e.preventDefault();
				var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('hotsite-information-qd-v1-modal');
				var $t = $(this);
				var videoId = ($t.attr('href').match(videoRegex) || ['']).pop();

				modal.find('.modal-header').append('<h2 class="modal-title">' + $t.find('img').attr('alt') + '</h2>');
				$('<iframe src="' + 'https://www.youtube.com/embed/' + videoId + '?wmode=transparent&rel=0" frameborder="0"></iframe>').appendTo(modal.find('.modal-body'));
				modal.modal();
				
				modal.on('hidden.bs.modal', function() {
					modal.remove();
				});
			});
		}	
	};

	var Home = {
		init: function() {
			Home.sliderFull();
			Home.applySpecialShelfCarousel();
			Home.homeSpecialLinksToggle();
			Home.applyMosaicCategorieBanners();
			Home.applyBrandCarousel();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sliderFull: function() {
			var wrapper = $('.slider-qd-v1-full, .slider-qd-v1-full-hotsite');
			
			// wrapper.find(".box-banner").each(function() {
				
			wrapper.slick({
				dots: true,
				customPaging : function(slider, i) {
					var alt = slider.$slides[i].querySelector('img').alt;
					return '<button data-role="none" tabindex="' + i + '">' + alt + '</button>';
				},
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				autoplay: true,
				draggable: false
			});
			
			var mobileDotsWrapper = $('.slider-qd-v1-full-mobile .slick-dots, .slider-qd-v1-full-hotsite-mobile .slick-dots ');
			mobileDotsWrapper.on('init', function(event, slick){
				$(this).find('.slick-current').addClass('slick-active');
			});	

			mobileDotsWrapper.slick({
				asNavFor: '.slider-qd-v1-full-mobile, .slider-qd-v1-full-hotsite-mobile',
				arrows: false,
				autoplay: true,
				centerMode: true,
				infinite: false,
				focusOnSelect: true,
				variableWidth: true,
				centerPadding: '24%'
			});

			// On after slide change
			var mobileWrapper = $('.slider-qd-v1-full.slider-qd-v1-full-mobile, .slider-qd-v1-full-hotsite.slider-qd-v1-full-hotsite-mobile');
			mobileWrapper.on('afterChange', function(event, slick, currentSlide, nextSlide){
				mobileDotsWrapper.slick('slickGoTo', currentSlide);
				mobileDotsWrapper.find('.slick-current').addClass('slick-active');
			});

			wrapper.each(function() {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyBrandCarousel: function() {
			var wrapper = $('.brand-carousel-qd-v1-carousel, .hotsite-videos-carousel-qd-v1-carousel');

			var slideShow = 6;
			var slideShowM = 2;

			if($("body").is(".hotsite")) {
				slideShow = 4;
				slideShowM = 1;
			} 

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: slideShow,
				slidesToScroll: slideShow,
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
							slidesToShow: slideShowM,
							slidesToScroll: slideShowM
						}
					},

					{
						breakpoint: 380,
						settings: {
							slidesToShow: slideShowM,
							slidesToScroll: slideShowM
						}
					}
				]
			});
		},
		homeSpecialLinksToggle:function() {	
			var closedHeight = $('.home-qd-v1-special-links, .hotsite-qd-v1-special-links').outerHeight();
			var maxheight = $('.home-qd-v1-special-links >ul, .hotsite-qd-v1-special-links >ul').height();

			$('.home-qd-v1-special-links, .hotsite-qd-v1-special-links').click(function() {
				$(this).stop();

				if ($(this).outerHeight() == closedHeight) {
					$(this).animate({
						height: maxheight
					});
				}
				else {
					$(this).animate({
						height: closedHeight
					});
				}
			});

		},
		applySpecialShelfCarousel: function() {
			var wrapper = $('.home-qd-v1-special-carousel-banner, .hotsite-qd-v1-special-carousel-banner');

			if (!wrapper.length)
				return false;

			var hasBanner = wrapper.find('.box-banner, .home-qd-v1-special-links ul[itemscope="itemscope"], .hotsite-qd-v1-special-links ul[itemscope="itemscope"]').length;
			if (!hasBanner)
				wrapper.find('[class*="col-md-"]').removeClass().addClass('col-xs-12');

			wrapper.each(function() {
				var $t = $(this);
				$t.find('.special-carousel-qd-v1-shelf h2').remove();
			});

			var slideQtd = hasBanner ? 3 : 4;

			wrapper.find('.prateleira').slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: slideQtd,
				slidesToScroll: slideQtd,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
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
		applyMosaicCategorieBanners: function() {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				classFourColumn: "col-xs-12 col-sm-6 col-md-2"
			});
		},		
	};

	var Search = {
		init: function() {
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.shelfLineFix();
		},
		ajaxStop: function() {
			Search.shelfLineFix();
		},
		windowOnload: function() {
			Search.shelfLineFix();
		},
		hideExtendedMenu: function () {
			$(".search-qd-v1-navigator ul").each(function () {
				var t, li, qtt, moreLink, moreLi, click, liHide;

				t = $(this);
				li = t.find(">li");
				qtt = 200;

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
		openFiltersMenu: function() {
			$('.search-qd-v1-navigator-trigger').click(function(e) {
				e.preventDefault();
				
				$(document.body).toggleClass('qd-sn-on');
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
					if(!window.qd_shelf_line_fix_is){
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
		}	
	};

	var Product = {
		run: function() {},
		init: function() {
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.openShipping();
			Product.qdClickTableMeasures();
			Product.qdCallThumbVideo();
			Product.forceImageZoom();
			Product.selectSku();
			Product.scrollToDescription();
			Product.applySmartPrice();
			Product.doublePrice();
			Product.applyTipBarProductCarousel();			
			Product.scrollToBuyButton();
			Product.showFloatingBuyBar();

			// Apenas para tela de KIT
			if( $(document.body).is(".product-kit")){
				Product.kitShowItem();
				Product.kitShowSpecification();
				Product.kitItemSelected();
				Product.kitItemSkuSelect();
				Product.kitDustRenderCallback();
				Product.kitUnavailableCheck();
				Product.kitShowDescription();
				Product.kitShowImage();
				Product.kitBuyAllItemsButton();
				Product.updateKitTotalPrice();
			}
			else{
				Product.saveAmountFlag();
				Product.setAvailableBodyClass();	
			}

			// Roda slick das thumbs quando volta para estado inicial
			$(window).on('skuSelectable.vtex', function() {
				Product.applyCarouselThumb();
			});
		},
		ajaxStop: function() {
			Product.applyCarouselThumb();
		},
		windowOnload: function() {},
		skuListSelection:function(){
			if (!$(".product-qd-v1-sku-selection .imageSku, .product-qd-v2-sku-selection .imageSku").length > 0)
				return;

			$(document.body).addClass('sku-in-list');

			var wrapper = $(".product-qd-v1-sku-selection, .product-qd-v2-sku-selection");

			wrapper.find(".skuList").each(function(){
				$(this).addClass("product-qd-v1-sku-in-list");

				if ($(window).width() >= 500){
					$(this).addClass('no-xs');
				}
			});

			wrapper.find(".buy-button").each(function(){
				$(this).wrap('<div class="qd-v1-buy-button-content"></div>');
			});

			wrapper.find(".portal-notify-me-ref").each(function() {
				var $t = $(this);

				$t.find(".notifyme").addClass("qd-notifyme-hide");
				$t.getParent(".skuList").addClass("qd-sku-unavaliable");

				var btn = $('<div class="notifyme-btn-wrap"><button class="btn btn-xs notifyme-btn">Avise-me</button></div>');
				btn.find("button").click(function() {
					btn.siblings(".notifyme").removeClass("qd-notifyme-hide");
					btn.addClass("qd-notifyme-hide");
				});
				$t.prepend(btn);
			});

			wrapper.find(".qd-v1-buy-button-content").prepend('<div class="qd-v1-smart-qtt"> <input type="tel" class="qd-sq-quantity" /> <div class="btns-wrapper"> <span class="qd-sq-more"></span> <span class="qd-sq-minus"></span> </div> </div>');
		},
		doublePrice: function () {
			var row = $('.product-qd-v1-box-quantity').clone().addClass('product-qd-v1-double-size qd-show');
			row.find('script').remove();
			// row.insertBefore($('.product-floating-bar-smart-qtt'));

			Product.applySmartQuantity();
		},
		applyTipBarProductCarousel: function() {
			var wrapper = $('.tip-bar-qd-v1-carousel-product');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 2,
				slidesToScroll: 2,
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

			wrapper.slick($.extend(true, options, (function() {
				// Se estiver dentro do product-qd-v1-sku-selection-box, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				// if(wrapper.closest('.product-qd-v1-sku-selection-box').length)
					// return { slidesToShow: 2 };
				return {};
			})()));
		},
		scrollToBuyButton: function() {
			$('.product-qd-v1-buy-button-float').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-price').offset().top -100
				}, 900, 'swing');
			});
		},
		showFloatingBuyBar: function () {
			var targetOffset = $(".product-qd-v1-buy-button").offset().top - 20;
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
		applySmartQuantity: function () {
			$('.product-qd-v1-sku-selection-box, .product-floating-bar-buy').QD_smartQuantity();

			$(window).on("skuSelected.vtex", function (e, id, data) {
				$('.qd-sq-more, .qd-sq-minus').click();
			});

			var skuList = $(".skuList");
			skuList.QD_smartQuantity();

			skuList.on('QuatroDigital.sq_change', function(){
				var skuId = ( ($(this).find('a.buy-button').attr('href') || '').match(/sku\=([0-9]+)/i) || [''] ).pop();
				var qtt   = parseInt($(this).find('.qd-sq-quantity').val() || '1');
				for (var i in skuJson.skus) {
					if(typeof skuJson.skus[i] != "function" && skuJson.skus[i].sku == skuId) {
						$(this).find('.valor-de strong').text('R$ ' + qd_number_format((skuJson.skus[i].listPrice * qtt) / 100, 2, ",", "."));
						$(this).find('.valor-por strong').text('R$ ' + qd_number_format((skuJson.skus[i].bestPrice * qtt) / 100, 2, ",", "."));
						break;
					}
				}
			});

			var skuRadio = $(".product-qd-v1-price-wrapper");
			skuRadio.QD_smartQuantity();

			skuRadio.on('QuatroDigital.sq_change', function(){
				var skuId = ( ($(this).find('a.buy-button').attr('href') || '').match(/sku\=([0-9]+)/i) || [''] ).pop();
				var qtt   = parseInt($(this).find('.qd-sq-quantity').val() || '1');
				console.log("skuid="+skuId);
				console.log("qtt="+qtt);
				for (var i in skuJson.skus) {	
					if (typeof skuJson.skus[i] != "function" && skuJson.skus[i].sku == skuId) {	
						console.log("skuJson.skus.listPrice="+skuJson.skus[i].listPrice);
						console.log("skuJson.skus.bestPrice="+skuJson.skus[i].bestPrice);
						$(this).find('.valor-de strong').text('R$ ' + qd_number_format((skuJson.skus[i].listPrice * qtt) / 100, 2, ",", "."));
						$(this).find('.valor-por strong').text('R$ ' + qd_number_format((skuJson.skus[i].bestPrice * qtt) / 100, 2, ",", "."));
					}
				}
			});
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
		applySmartPrice:function(){
			if($('.product-qd-v1-stamps-highlight .flag[class*="boleto"]').length){
				$(".product-qd-v1-price").prepend('<div class="product-qd-v1-bank-slip"> <div class="row"> <div class="col-xs-2"> <div class="shelf-qd-v1-sp-icon"> <i class="fa fa-barcode" aria-hidden="true"></i> </div> </div> <div class="col-xs-10"> <p class="qd-sp-best-price"><span class="qd_displayPrice">R$ </span></p> <p class="qd-sp-best-discount"><span class="qd-sp-display-discount">0%  de desconto no boleto</span></p> </div> </div> </div>');
	
				$(".product-qd-v1-stamps .flag").QD_SmartPrice({
					filterFlagBy: "[class*='boleto']",
					productPage:{
						wrapperElement: ".product-qd-v1-wrapper",
						changeNativePrice: false,
						isProductPage: true
					}
				});            
			}
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
				slidesToShow: 5,
				slidesToScroll: 5,				  
  				arrows: false,
				infinite: false,
				draggable: true,
				swipeToSlide: true,
				edgeFriction: .1,
				variableWidth: true,
				responsive: [
					{
					breakpoint: 600,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							variableWidth: false
						}
					}
				]
			});
		},
		qdClickTableMeasures: function() {
			var wrapper = $(".product-qd-v1-sku-selection");
			var modal = $(".qd-v1-modal");

			$(".sku-qd-v1-click-table-measures").click(function() {
				modal.find('.modal-body:not(.qd-on)').addClass('qd-on').append('<img width="720" height="688" alt="tabela de medidas" src="//madeirasgasometro.vteximg.com.br/arquivos/ids/166944-1000-1000/coladeira-de-bordas-new-plus-diamante-imagem-01.jpg" complete="complete">');
				modal.addClass('qd-v1-modal-table-measures');
				modal.modal();
			});
		},
		qdCallThumbVideo: function() {
			var iframe = $("td.value-field.Video:first iframe");

			if (!iframe.length) {
				window.qdVideoInProduct = {videoFieldSelector: 'td.value-field.Video:first'};
				return;
			}

			window.qdVideoInProduct = {videoFieldSelector: $('<span/>').addClass('video-product').text('https://www.youtube.com/watch?v=' + iframe.attr("src").split("?").shift().split("/").pop() + '&rel=0')};
		},
		scrollToDescription: function() {
			$('.product-qd-v1-link-description').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-specification').offset().top -100
				}, 900, 'swing');
			});
		},
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		selectSku: function(){
			var wrapper = $('.skuList');

			wrapper.on('selectSku.qd_click', function() {
				try{
					var $t = $(this);

					var buyButton = $t.find('.buy-button');
					if(buyButton.length)
						var skuId = buyButton.attr('href').match(/sku\=([0-9]+)/i)[1];
					else
						var skuId = $t.find('.sku-notifyme-skuid').val();

					var selectedSku;
					for(var i = 0; i < skuJson.skus.length; i++){
						if(skuJson.skus[i].sku == skuId){
							selectedSku = skuJson.skus[i];
							break;
						}
					}

					if(selectedSku)
						$(document).trigger('skuSelected.vtex', [skuId, selectedSku]);

					wrapper.removeClass('qd-sku-list-selected qd-sku-list-selected-by-click');
					$t.addClass('qd-sku-list-selected');
				}
				catch(e){if (typeof console !== 'undefined' && typeof console.info === 'function') console.info('Problemas ao selecionar o SKU', e.message); };
			});

			wrapper.click(function() {
				var $t = $(this);

				$t.trigger('selectSku.qd_click');
				$t.addClass('qd-sku-list-selected-by-click');
			});
		},
		kitShowItem: function () {
			$(".product-qd-v1-kit-item-row").each(function () {
				if ($(this).find("#image-main").length) {
					$(this).show();
				}
			});
		},
		kitShowSpecification: function () {
			$(".specification-row").each(function () {
				if ($(this).find(".productName").length) {
					$(this).show();
				}
			});
		},
		kitItemSelected: function () {
			$(".kit-item-selects").bind("click", function () {
				$(this).parents(".product-qd-v1-kit-item-row").toggleClass("qd-state-not-selected");
				Product.updateKitTotalPrice();
			});
		},
		kitBuyAllItemsButton: function() {
			$(".product-qd-v1-buy-button a").attr('href', '#').click(function(e){
				
				var url = Product.setBuyUrl();
				if(url)
					$(this).attr('href', url);
				else{
					e.preventDefault();
					alert('Por favor, selecione o modelo desejado.');
				}
			});
		},
		setBuyUrl: function(){
			var btns = $(".product-qd-v1-kit-item-row:not('.qd-state-not-selected, .qd-item-unavailable') .buy-in-page-button");
			var uri = [];
			btns.each(function(){
				var href = this.href || "";
				
				if( href == "" || href.indexOf("javascript:alert(") > -1 ){
					uri = [];
					
					var elem = $(this).closest('.product-qd-v1-kit-item-row').addClass('qd-state-not-chosen');
					$("html, body").animate({ scrollTop: elem.offset().top - 150 });
					setTimeout(function() {
						elem.removeClass('qd-state-not-chosen');
					}, 700);

					return false;
				}

				var param = (this.search || '').replace('?','').split("&");
				var itemUri = [];
				for( var k = 0; k < param.length; k++ ){
					if( param[k].search(/^(sku|qty|seller)/i) != 0)
						continue;
					itemUri.push( param[k] );
				}
				uri.push( itemUri.join("&") );

			});

			if(uri.length)
				return "/checkout/cart/add?" + uri.join("&") + "&sc=" + jssalesChannel;
		},
		kitDustRenderCallback: function () {
			var orig = window.dust.render;

			window.dust.render = function () {
				orig.apply(this, arguments);

				Product.kitUnavailableCheck();
			}
		},
		kitUnavailableCheck: function () {
			$(".product-qd-v1-kit-item-row").each(function () {
				var $t = $(this);
				if ($t.find(".sku-notifyme:visible").length)
					$t.addClass("qd-item-unavailable");
				else
					$t.removeClass("qd-item-unavailable");
			});
		},
		kitShowDescription: function () {
			var wrapper = $('.product-qd-v1-specification');

			$(".product-qd-v1-kit-details a").click(function (e) {
				e.preventDefault();				

				var pId = $(this).closest('.product-qd-v1-kit-item-row').find('.product-qd-v1-name #___rc-p-id').val();
				var elem = wrapper.find('#___rc-p-id[value=' + pId + ']').closest('.specification-row').addClass('qd-specification-hightlight');
				$("html, body").animate({ scrollTop: elem.offset().top - 150 });
				setTimeout(function() {
					elem.removeClass('qd-specification-hightlight');
				}, 1500);
				
				return false;
			})
		},
		kitShowImage: function () {
			$(".product-qd-v1-kit-image").bind("click", function () {
				if (typeof window.FireSkuChangeImage === "function")
					window.FireSkuChangeImage(($(this).parents(".product-qd-v1-kit-item-row").find("#___rc-p-sku-ids").val() || "").split(",").shift());

				$('html, body').animate({ scrollTop: Math.floor($(".bread-crumb").offset().top || 0) });

				return false;
			});

			$(".product-picture").bind("click", function () {
				if (typeof window.FireSkuChangeImage === "function")
					window.FireSkuChangeImage(($(".product-qd-v1-name #___rc-p-sku-ids").val() || "").split(",").shift());

				$('html, body').animate({ scrollTop: Math.floor($("header").offset().top || 0) });
				// $('html, body').animate({ scrollTop: Math.floor($(".bread-crumb").offset().top || 0) });

				return false;
			});
		},
		kitItemSkuSelect: function () {
			$(".product-kit-sku-selection .sku-selector").bind("change", function () {
				if($(this)[0].value)
					Product.updateKitTotalPrice();
			});
		},
		updateKitTotalPrice: function () {
			var installment = 1;
			var totalPrice = 0;
			var items = $(".product-qd-v1-kit-item-row:not('.qd-state-not-selected, .qd-item-unavailable') a.buy-in-page-button");
			
			for(var i = 0; i < items.length; i++){
				var sku = '';
				var url = items[i].href;
				if(url.indexOf('sku=') >= 0){
					sku = items[i].href.split('?')[1].match(/sku=(\s*\d+)/i)[1];
				}

				var skuData = Product.getKitItemPrice($(items[i]).attr('productindex'), sku);
				
				installment = Math.min(installment, skuData['installment']);
				totalPrice += skuData['price'];
			}
			
			
			$('.product-qd-v1-price-wrapper .skuBestInstallmentNumber').html(installment + "<span class='x'>x</span>");
			$('.product-qd-v1-price-wrapper .skuBestInstallmentValue').text('R$ ' + (totalPrice / (installment*100)).toFixed(2).toString().replace('.',','));
			$('.product-qd-v1-price-wrapper .skuBestPrice').text('R$ ' + (totalPrice / 100).toFixed(2).toString().replace('.',','));
		},
		getKitItemPrice: function(productindex, sku) {
			var skuData = [];
			var selectedSku = '';
			var productJson = window['skuJson_' + productindex];
			if(sku){
				for(var k = 0; k < productJson.skus.length; k++) {
					if(productJson.skus[k].sku == sku)
						selectedSku = productJson.skus[k];
				}
			}
			else {
				for(var k = 0; k < productJson.skus.length; k++) {
					if(!selectedSku || productJson.skus[k].bestPrice < selectedSku.bestPrice)
						selectedSku = productJson.skus[k];
				}
			}
			skuData['price'] = selectedSku.bestPrice * selectedSku.unitMultiplier;
			skuData['installment'] = selectedSku.installments;
			return skuData;
		},
		saveAmountFlag: function () {
			var flag = $('.product-qd-v1-stamps-highlight-discount');

			$(window).on('skuSelected.vtex', function (e, sku, data) {
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
		init: function() {
			Home.sliderFull();
			Home.applyBrandCarousel();
			Home.applyMosaicCategorieBanners();
			Home.applySpecialShelfCarousel();
			Home.homeSpecialLinksToggle();			
			Institutional.sidemenuToggle();
			Search.shelfLineFix();			
		},
		ajaxStop: function() {
		},
		windowOnload: function() {
		},
		sidemenuToggle:function() {
			// Amazing Menu Responsivo
			$('.institucional-qd-v1-menu-toggle').click(function(evt) {
				evt.preventDefault();
				$(document.body).addClass('qd-sn-on');
			});
			$('.institucional-qd-v1-side-menu-wrap-close').click(function() {
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

/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function () { var a = $(".fb-comments"); a.length && a.attr("data-href", document.location.href.split("#").shift().split("?").shift()); $("#fb-root").length || $("body").append('<div id="fb-root"></div>'); if (!$("script#facebook-jssdk").length) { a = $("meta[property='fb:app_id']").attr("content") || !1; var b, c = document.getElementsByTagName("script")[0]; document.getElementById("facebook-jssdk") || (b = document.createElement("script"), b.id = "facebook-jssdk", b.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3" + (a ? "&appId=" + a : ""), c.parentNode.insertBefore(b, c)) } "undefined" !== typeof FB && "undefined" !== typeof FB.XFBML && FB.XFBML.parse() });

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

/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var c=jQuery,e=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(c){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(l){try{console.warn(b.join("\n"))}catch(m){}}}};"function"!==typeof c.QD_scrollToggle&&(c.QD_scrollToggle=function(a){var d=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)d.push(c(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||d.push(a))}if(!d.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!c(window).scrollTop||isNaN(parseInt(c(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}c(window).scroll(function(){for(var a=0;a<d.length;a++)c(window).scrollTop()>d[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},c(function(){var a=c("body[data-qd-scroll-limit]");a.length&&c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
var _0xb570=['qd_sp_processedItem','startedByWrapper','forcePromotion','string','not','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','style','display:none\x20!important;','append','after','call','extend','boolean','body','.produto','function','prototype','replace','abs','pow','round','split','length','join','Smart\x20Price','object','error','unshift','undefined','alerta','toLowerCase','aviso','info','warn','apply','text','match','[class*=\x27desconto\x27]','auto','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','strong.skuPrice','QD_SmartPrice','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','isProductPage','productPage','wrapperElement','closest','find','addClass','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','skuBestPrice','.qd_active','removeClass','qd-active','oneFlagByItem','.qd_sp_on','isDiscountFlag','div[skuCorrente]:first','attr','skus','sku','bestPrice','qd-sp-product-unavailable','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','.qd_productPrice','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','listPrice','.qd_productOldPrice','changeNativePrice','trim','.qd_displayPrice','skuPrice','.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_saveAmountPercent','prepend','changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex'];(function(_0x3dd15e,_0x1f0015){var _0x231fd0=function(_0x4f680a){while(--_0x4f680a){_0x3dd15e['push'](_0x3dd15e['shift']());}};_0x231fd0(++_0x1f0015);}(_0xb570,0x133));var _0x0b57=function(_0x317fb9,_0x19afe3){_0x317fb9=_0x317fb9-0x0;var _0x583463=_0xb570[_0x317fb9];return _0x583463;};_0x0b57('0x0')!==typeof String['prototype']['trim']&&(String[_0x0b57('0x1')]['trim']=function(){return this[_0x0b57('0x2')](/^\s+|\s+$/g,'');});function qd_number_format(_0x5b82d2,_0xb1f6b9,_0x4bcdeb,_0x7fbdfd){_0x5b82d2=(_0x5b82d2+'')[_0x0b57('0x2')](/[^0-9+\-Ee.]/g,'');_0x5b82d2=isFinite(+_0x5b82d2)?+_0x5b82d2:0x0;_0xb1f6b9=isFinite(+_0xb1f6b9)?Math[_0x0b57('0x3')](_0xb1f6b9):0x0;_0x7fbdfd='undefined'===typeof _0x7fbdfd?',':_0x7fbdfd;_0x4bcdeb='undefined'===typeof _0x4bcdeb?'.':_0x4bcdeb;var _0x143519='',_0x143519=function(_0xa91497,_0x5d8f07){var _0xb1f6b9=Math[_0x0b57('0x4')](0xa,_0x5d8f07);return''+(Math['round'](_0xa91497*_0xb1f6b9)/_0xb1f6b9)['toFixed'](_0x5d8f07);},_0x143519=(_0xb1f6b9?_0x143519(_0x5b82d2,_0xb1f6b9):''+Math[_0x0b57('0x5')](_0x5b82d2))[_0x0b57('0x6')]('.');0x3<_0x143519[0x0][_0x0b57('0x7')]&&(_0x143519[0x0]=_0x143519[0x0][_0x0b57('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x7fbdfd));(_0x143519[0x1]||'')[_0x0b57('0x7')]<_0xb1f6b9&&(_0x143519[0x1]=_0x143519[0x1]||'',_0x143519[0x1]+=Array(_0xb1f6b9-_0x143519[0x1][_0x0b57('0x7')]+0x1)[_0x0b57('0x8')]('0'));return _0x143519[_0x0b57('0x8')](_0x4bcdeb);};(function(_0x154ed8){'use strict';var _0x3c8ba3=jQuery;if(typeof _0x3c8ba3['fn']['QD_SmartPrice']==='function')return;var _0x413a39=_0x0b57('0x9');var _0x3ba6f5=function(_0x294434,_0x562ffe){if(_0x0b57('0xa')===typeof console&&'function'===typeof console[_0x0b57('0xb')]&&_0x0b57('0x0')===typeof console['info']&&_0x0b57('0x0')===typeof console['warn']){var _0x157a8e;'object'===typeof _0x294434?(_0x294434[_0x0b57('0xc')]('['+_0x413a39+']\x0a'),_0x157a8e=_0x294434):_0x157a8e=['['+_0x413a39+']\x0a'+_0x294434];if(_0x0b57('0xd')===typeof _0x562ffe||_0x0b57('0xe')!==_0x562ffe[_0x0b57('0xf')]()&&_0x0b57('0x10')!==_0x562ffe[_0x0b57('0xf')]())if(_0x0b57('0xd')!==typeof _0x562ffe&&_0x0b57('0x11')===_0x562ffe[_0x0b57('0xf')]())try{console[_0x0b57('0x11')]['apply'](console,_0x157a8e);}catch(_0x4ac85f){console[_0x0b57('0x11')](_0x157a8e[_0x0b57('0x8')]('\x0a'));}else try{console[_0x0b57('0xb')]['apply'](console,_0x157a8e);}catch(_0x1e6471){console[_0x0b57('0xb')](_0x157a8e[_0x0b57('0x8')]('\x0a'));}else try{console[_0x0b57('0x12')][_0x0b57('0x13')](console,_0x157a8e);}catch(_0x590c7f){console[_0x0b57('0x12')](_0x157a8e['join']('\x0a'));}}};var _0x46ccba=/[0-9]+\%/i;var _0x2f698d=/[0-9\.]+(?=\%)/i;var _0x527adf={'isDiscountFlag':function(_0x6b56bb){if(_0x6b56bb[_0x0b57('0x14')]()['search'](_0x46ccba)>-0x1)return!![];return![];},'getDiscountValue':function(_0xf256be){return _0xf256be[_0x0b57('0x14')]()[_0x0b57('0x15')](_0x2f698d);},'startedByWrapper':![],'flagElement':'.flag','wrapperElement':'li','filterFlagBy':_0x0b57('0x16'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0x0b57('0x17'),'wrapperElement':_0x0b57('0x18'),'skuBestPrice':_0x0b57('0x19'),'installments':_0x0b57('0x1a'),'installmentValue':'label.skuBestInstallmentValue','skuPrice':_0x0b57('0x1b')}};_0x3c8ba3['fn'][_0x0b57('0x1c')]=function(){};var _0x4d9d0d=function(_0x4775b3){var _0x295bf5={'t':_0x0b57('0x1d')};return function(_0x531397){var _0x3ccae5,_0x3bff92,_0x3611b6,_0x2acf24;_0x3bff92=function(_0x53496e){return _0x53496e;};_0x3611b6=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x531397=_0x531397['d'+_0x3611b6[0x10]+'c'+_0x3611b6[0x11]+'m'+_0x3bff92(_0x3611b6[0x1])+'n'+_0x3611b6[0xd]]['l'+_0x3611b6[0x12]+'c'+_0x3611b6[0x0]+'ti'+_0x3bff92('o')+'n'];_0x3ccae5=function(_0x3a66c8){return escape(encodeURIComponent(_0x3a66c8[_0x0b57('0x2')](/\./g,'¨')[_0x0b57('0x2')](/[a-zA-Z]/g,function(_0x4e8661){return String[_0x0b57('0x1e')](('Z'>=_0x4e8661?0x5a:0x7a)>=(_0x4e8661=_0x4e8661[_0x0b57('0x1f')](0x0)+0xd)?_0x4e8661:_0x4e8661-0x1a);})));};var _0x1dd538=_0x3ccae5(_0x531397[[_0x3611b6[0x9],_0x3bff92('o'),_0x3611b6[0xc],_0x3611b6[_0x3bff92(0xd)]]['join']('')]);_0x3ccae5=_0x3ccae5((window[['js',_0x3bff92('no'),'m',_0x3611b6[0x1],_0x3611b6[0x4][_0x0b57('0x20')](),_0x0b57('0x21')][_0x0b57('0x8')]('')]||_0x0b57('0x22'))+['.v',_0x3611b6[0xd],'e',_0x3bff92('x'),'co',_0x3bff92('mm'),_0x0b57('0x23'),_0x3611b6[0x1],'.c',_0x3bff92('o'),'m.',_0x3611b6[0x13],'r'][_0x0b57('0x8')](''));for(var _0x1fdd2c in _0x295bf5){if(_0x3ccae5===_0x1fdd2c+_0x295bf5[_0x1fdd2c]||_0x1dd538===_0x1fdd2c+_0x295bf5[_0x1fdd2c]){_0x2acf24='tr'+_0x3611b6[0x11]+'e';break;}_0x2acf24='f'+_0x3611b6[0x0]+'ls'+_0x3bff92(_0x3611b6[0x1])+'';}_0x3bff92=!0x1;-0x1<_0x531397[[_0x3611b6[0xc],'e',_0x3611b6[0x0],'rc',_0x3611b6[0x9]][_0x0b57('0x8')]('')][_0x0b57('0x24')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x3bff92=!0x0);return[_0x2acf24,_0x3bff92];}(_0x4775b3);}(window);if(!eval(_0x4d9d0d[0x0]))return _0x4d9d0d[0x1]?_0x3ba6f5(_0x0b57('0x25')):!0x1;var _0x364a54=function(_0xdf7511,_0x9fc137){'use strict';var _0x42ab7d=function(_0x4c0c74){'use strict';var _0x35c218,_0x4972b0,_0x462218,_0x1cbc96,_0x55da65,_0x36265f,_0x17b70d,_0x2bb532,_0x45c7dd,_0x1e535a,_0xceb5d7,_0x56af78,_0x54c674,_0x19630a,_0x5c8c75,_0x6b43ea,_0x8eef0,_0x277753,_0x2efa77;var _0x5e363a=_0x3c8ba3(this);_0x4c0c74=typeof _0x4c0c74==='undefined'?![]:_0x4c0c74;if(_0x9fc137['productPage'][_0x0b57('0x26')])var _0x29cd4f=_0x5e363a['closest'](_0x9fc137[_0x0b57('0x27')][_0x0b57('0x28')]);else var _0x29cd4f=_0x5e363a[_0x0b57('0x29')](_0x9fc137[_0x0b57('0x28')]);if(!_0x4c0c74&&!_0x5e363a['is'](_0x9fc137['filterFlagBy'])){if(_0x9fc137[_0x0b57('0x27')][_0x0b57('0x26')]&&_0x29cd4f['is'](_0x9fc137[_0x0b57('0x27')]['wrapperElement'])){_0x29cd4f[_0x0b57('0x2a')](_0x9fc137[_0x0b57('0x27')]['skuBestPrice'])['addClass']('qd-active');_0x29cd4f[_0x0b57('0x2b')](_0x0b57('0x2c'));}return;}var _0x4bc782=_0x9fc137[_0x0b57('0x27')][_0x0b57('0x26')];if(_0x5e363a['is'](_0x0b57('0x2d'))&&!_0x4bc782)return;if(_0x4bc782){_0x2bb532=_0x29cd4f[_0x0b57('0x2a')](_0x9fc137[_0x0b57('0x27')][_0x0b57('0x2e')]);if(_0x2bb532[_0x0b57('0x2a')](_0x0b57('0x2f'))['length'])return;_0x2bb532[_0x0b57('0x30')](_0x0b57('0x31'));_0x29cd4f[_0x0b57('0x30')]('qd-sp-active');}if(_0x9fc137[_0x0b57('0x32')]&&_0x5e363a['siblings'](_0x0b57('0x33'))[_0x0b57('0x7')]){_0x5e363a['addClass']('qd_sp_ignored');return;}_0x5e363a[_0x0b57('0x2b')]('qd_sp_on');if(!_0x9fc137[_0x0b57('0x34')](_0x5e363a))return;if(_0x4bc782){_0x462218={};var _0x27100f=parseInt(_0x3c8ba3(_0x0b57('0x35'))[_0x0b57('0x36')]('skuCorrente'),0xa);if(_0x27100f){for(var _0x3e57e8=0x0;_0x3e57e8<skuJson[_0x0b57('0x37')][_0x0b57('0x7')];_0x3e57e8++){if(skuJson[_0x0b57('0x37')][_0x3e57e8][_0x0b57('0x38')]==_0x27100f){_0x462218=skuJson[_0x0b57('0x37')][_0x3e57e8];break;}}}else{var _0x57efe1=0x5af3107a3fff;for(var _0x459e45 in skuJson[_0x0b57('0x37')]){if(typeof skuJson[_0x0b57('0x37')][_0x459e45]==='function')continue;if(!skuJson[_0x0b57('0x37')][_0x459e45]['available'])continue;if(skuJson[_0x0b57('0x37')][_0x459e45][_0x0b57('0x39')]<_0x57efe1){_0x57efe1=skuJson['skus'][_0x459e45]['bestPrice'];_0x462218=skuJson[_0x0b57('0x37')][_0x459e45];}}}}_0x6b43ea=!![];_0x8eef0=0x0;if(_0x9fc137['isSmartCheckout']&&_0x277753){_0x6b43ea=skuJson['available'];if(!_0x6b43ea)return _0x29cd4f[_0x0b57('0x2b')](_0x0b57('0x3a'));}_0x4972b0=_0x9fc137['getDiscountValue'](_0x5e363a);_0x35c218=parseFloat(_0x4972b0,0xa);if(isNaN(_0x35c218))return _0x3ba6f5([_0x0b57('0x3b'),_0x5e363a],_0x0b57('0xe'));var _0x3b9bd8=function(_0x220220){if(_0x4bc782)_0x1cbc96=(_0x220220[_0x0b57('0x39')]||0x0)/0x64;else{_0x54c674=_0x29cd4f[_0x0b57('0x2a')](_0x0b57('0x3c'));_0x1cbc96=parseFloat((_0x54c674[_0x0b57('0x3d')]()||'')['replace'](/[^0-9\.\,]+/i,'')['replace']('.','')[_0x0b57('0x2')](',','.'),0xa);}if(isNaN(_0x1cbc96))return _0x3ba6f5([_0x0b57('0x3e'),_0x5e363a,_0x29cd4f]);if(_0x9fc137[_0x0b57('0x3f')]!==null){_0x19630a=0x0;if(!isNaN(_0x9fc137['appliedDiscount']))_0x19630a=_0x9fc137['appliedDiscount'];else{_0x5c8c75=_0x29cd4f[_0x0b57('0x2a')](_0x9fc137[_0x0b57('0x3f')]);if(_0x5c8c75[_0x0b57('0x7')])_0x19630a=_0x9fc137['getDiscountValue'](_0x5c8c75);}_0x19630a=parseFloat(_0x19630a,0xa);if(isNaN(_0x19630a))_0x19630a=0x0;if(_0x19630a!==0x0)_0x1cbc96=_0x1cbc96*0x64/(0x64-_0x19630a);}if(_0x4bc782)_0x55da65=(_0x220220[_0x0b57('0x40')]||0x0)/0x64;else _0x55da65=parseFloat((_0x29cd4f[_0x0b57('0x2a')](_0x0b57('0x41'))[_0x0b57('0x3d')]()||'')[_0x0b57('0x2')](/[^0-9\.\,]+/i,'')[_0x0b57('0x2')]('.','')[_0x0b57('0x2')](',','.'),0xa);if(isNaN(_0x55da65))_0x55da65=0.001;_0x36265f=_0x1cbc96*((0x64-_0x35c218)/0x64);if(_0x4bc782&&_0x9fc137[_0x0b57('0x27')][_0x0b57('0x42')]){_0x2bb532[_0x0b57('0x14')](_0x2bb532[_0x0b57('0x14')]()[_0x0b57('0x43')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x36265f,0x2,',','.')))['addClass'](_0x0b57('0x31'));_0x29cd4f['addClass'](_0x0b57('0x2c'));}else{_0x2efa77=_0x29cd4f[_0x0b57('0x2a')](_0x0b57('0x44'));_0x2efa77[_0x0b57('0x14')](_0x2efa77['text']()['replace'](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x36265f,0x2,',','.'));}if(_0x4bc782){_0x17b70d=_0x29cd4f[_0x0b57('0x2a')](_0x9fc137[_0x0b57('0x27')][_0x0b57('0x45')]);if(_0x17b70d[_0x0b57('0x7')])_0x17b70d[_0x0b57('0x14')](_0x17b70d[_0x0b57('0x14')]()[_0x0b57('0x43')]()[_0x0b57('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x36265f,0x2,',','.')));}var _0x495ce8=_0x29cd4f[_0x0b57('0x2a')](_0x0b57('0x46'));_0x495ce8[_0x0b57('0x14')](_0x495ce8['text']()[_0x0b57('0x2')](/[0-9]+\%/i,_0x35c218+'%'));var _0x2680ec=function(_0x1c2d05,_0x20ec99,_0x5c57c2){var _0x91c6fc=_0x29cd4f[_0x0b57('0x2a')](_0x1c2d05);if(_0x91c6fc[_0x0b57('0x7')])_0x91c6fc[_0x0b57('0x47')](_0x91c6fc['html']()[_0x0b57('0x43')]()[_0x0b57('0x2')](/[0-9]{1,2}/,_0x5c57c2?_0x5c57c2:_0x220220['installments']||0x0));var _0x469cb7=_0x29cd4f[_0x0b57('0x2a')](_0x20ec99);if(_0x469cb7[_0x0b57('0x7')])_0x469cb7[_0x0b57('0x47')](_0x469cb7['html']()[_0x0b57('0x43')]()[_0x0b57('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x36265f/(_0x5c57c2?_0x5c57c2:_0x220220[_0x0b57('0x48')]||0x1),0x2,',','.')));};if(_0x4bc782&&_0x9fc137[_0x0b57('0x27')][_0x0b57('0x49')])_0x2680ec(_0x9fc137[_0x0b57('0x27')][_0x0b57('0x48')],_0x9fc137[_0x0b57('0x27')][_0x0b57('0x4a')]);else if(_0x9fc137[_0x0b57('0x49')])_0x2680ec('.qd_sp_display_installments','.qd_sp_display_installmentValue',parseInt(_0x29cd4f['find']('.qd_sp_installments')[_0x0b57('0x3d')]()||0x1)||0x1);_0x29cd4f['find']('.qd_saveAmount')['append'](qd_number_format(_0x55da65-_0x36265f,0x2,',','.'));_0x29cd4f[_0x0b57('0x2a')](_0x0b57('0x4b'))[_0x0b57('0x4c')](qd_number_format((_0x55da65-_0x36265f)*0x64/_0x55da65,0x2,',','.'));if(_0x4bc782&&_0x9fc137[_0x0b57('0x27')][_0x0b57('0x4d')]){_0x3c8ba3(_0x0b57('0x4e'))[_0x0b57('0x4f')](function(){_0xceb5d7=_0x3c8ba3(this);_0xceb5d7['text'](_0xceb5d7[_0x0b57('0x14')]()['trim']()[_0x0b57('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x55da65-_0x36265f,0x2,',','.')));_0xceb5d7[_0x0b57('0x2b')](_0x0b57('0x31'));});}};_0x3b9bd8(_0x462218);if(_0x4bc782)_0x3c8ba3(window)['on'](_0x0b57('0x50'),function(_0x3e86b3,_0x180ea1,_0x4cd3ff){_0x3b9bd8(_0x4cd3ff);});_0x29cd4f[_0x0b57('0x2b')](_0x0b57('0x51'));if(!_0x4bc782)_0x54c674[_0x0b57('0x2b')](_0x0b57('0x51'));};(_0x9fc137[_0x0b57('0x52')]?_0xdf7511['find'](_0x9fc137['flagElement']):_0xdf7511)[_0x0b57('0x4f')](function(){_0x42ab7d['call'](this,![]);});if(typeof _0x9fc137[_0x0b57('0x53')]==_0x0b57('0x54')){var _0x2e60d9=_0x9fc137['startedByWrapper']?_0xdf7511:_0xdf7511[_0x0b57('0x29')](_0x9fc137[_0x0b57('0x28')]);if(_0x9fc137[_0x0b57('0x27')][_0x0b57('0x26')])_0x2e60d9=_0x2e60d9[_0x0b57('0x29')](_0x9fc137[_0x0b57('0x27')][_0x0b57('0x28')])[_0x0b57('0x55')](_0x0b57('0x56'));else _0x2e60d9=_0x2e60d9[_0x0b57('0x2a')](_0x0b57('0x57'));_0x2e60d9['each'](function(){var _0x5bd592=_0x3c8ba3(_0x9fc137[_0x0b57('0x53')]);_0x5bd592['attr'](_0x0b57('0x58'),_0x0b57('0x59'));if(_0x9fc137['productPage'][_0x0b57('0x26')])_0x3c8ba3(this)[_0x0b57('0x5a')](_0x5bd592);else _0x3c8ba3(this)[_0x0b57('0x5b')](_0x5bd592);_0x42ab7d[_0x0b57('0x5c')](_0x5bd592,!![]);});}};_0x3c8ba3['fn'][_0x0b57('0x1c')]=function(_0x46ab7a){var _0x11d8e6=_0x3c8ba3(this);if(!_0x11d8e6['length'])return _0x11d8e6;var _0x2ec2bd=_0x3c8ba3[_0x0b57('0x5d')](!![],{},_0x527adf,_0x46ab7a);if(typeof _0x2ec2bd[_0x0b57('0x27')][_0x0b57('0x26')]!=_0x0b57('0x5e'))_0x2ec2bd['productPage'][_0x0b57('0x26')]=_0x3c8ba3(document[_0x0b57('0x5f')])['is'](_0x0b57('0x60'));_0x364a54(_0x11d8e6,_0x2ec2bd);return _0x11d8e6;};}(this));
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

/* Quatro Digital Amazing Menu */
var _0xfefe=['qd-am-content-loaded','trim','data-qdam-value','clone','hide','url','\x27\x20falho.','ajaxCallback','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','text','replaceSpecialChars','replace','>li','qdAmAddNdx','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','each','addClass','first','qd-am-first','last','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-banner','.qd-am-collection','length','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','html','img[alt=\x27','attr','insertBefore'];(function(_0x43c3f7,_0xe365fc){var _0x31c416=function(_0x11ef84){while(--_0x11ef84){_0x43c3f7['push'](_0x43c3f7['shift']());}};_0x31c416(++_0xe365fc);}(_0xfefe,0x193));var _0xefef=function(_0x3b8cf3,_0x310461){_0x3b8cf3=_0x3b8cf3-0x0;var _0x2090be=_0xfefe[_0x3b8cf3];return _0x2090be;};(function(_0x571f82){_0x571f82['fn'][_0xefef('0x0')]=_0x571f82['fn'][_0xefef('0x1')];}(jQuery));(function(_0x309bbf){var _0x3c1d09;var _0x19e9c7=jQuery;if(_0xefef('0x2')!==typeof _0x19e9c7['fn'][_0xefef('0x3')]){var _0x55c5e7={'url':_0xefef('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0xe1051e=function(_0x5a5a06,_0x3ca3d2){if('object'===typeof console&&_0xefef('0x5')!==typeof console[_0xefef('0x6')]&&_0xefef('0x5')!==typeof console[_0xefef('0x7')]&&'undefined'!==typeof console[_0xefef('0x8')]){var _0x185284;'object'===typeof _0x5a5a06?(_0x5a5a06[_0xefef('0x9')](_0xefef('0xa')),_0x185284=_0x5a5a06):_0x185284=[_0xefef('0xa')+_0x5a5a06];if(_0xefef('0x5')===typeof _0x3ca3d2||_0xefef('0xb')!==_0x3ca3d2[_0xefef('0xc')]()&&_0xefef('0xd')!==_0x3ca3d2[_0xefef('0xc')]())if('undefined'!==typeof _0x3ca3d2&&_0xefef('0x7')===_0x3ca3d2['toLowerCase']())try{console['info'][_0xefef('0xe')](console,_0x185284);}catch(_0xeb5249){try{console['info'](_0x185284[_0xefef('0xf')]('\x0a'));}catch(_0x5c3c16){}}else try{console[_0xefef('0x6')][_0xefef('0xe')](console,_0x185284);}catch(_0xf7d39){try{console[_0xefef('0x6')](_0x185284[_0xefef('0xf')]('\x0a'));}catch(_0x1f805c){}}else try{console[_0xefef('0x8')][_0xefef('0xe')](console,_0x185284);}catch(_0x8538da){try{console[_0xefef('0x8')](_0x185284[_0xefef('0xf')]('\x0a'));}catch(_0x2da7ed){}}}};_0x19e9c7['fn']['qdAmAddNdx']=function(){var _0x20ccb0=_0x19e9c7(this);_0x20ccb0[_0xefef('0x10')](function(_0xa9719f){_0x19e9c7(this)[_0xefef('0x11')]('qd-am-li-'+_0xa9719f);});_0x20ccb0[_0xefef('0x12')]()['addClass'](_0xefef('0x13'));_0x20ccb0[_0xefef('0x14')]()['addClass']('qd-am-last');return _0x20ccb0;};_0x19e9c7['fn'][_0xefef('0x3')]=function(){};_0x309bbf=function(_0x327dd0){var _0x1b4244={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x49eaea){var _0x20f5ee=function(_0x23cf34){return _0x23cf34;};var _0x23a3ac=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x49eaea=_0x49eaea['d'+_0x23a3ac[0x10]+'c'+_0x23a3ac[0x11]+'m'+_0x20f5ee(_0x23a3ac[0x1])+'n'+_0x23a3ac[0xd]]['l'+_0x23a3ac[0x12]+'c'+_0x23a3ac[0x0]+'ti'+_0x20f5ee('o')+'n'];var _0xd2065d=function(_0x491e3a){return escape(encodeURIComponent(_0x491e3a['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x1d9d2b){return String[_0xefef('0x15')](('Z'>=_0x1d9d2b?0x5a:0x7a)>=(_0x1d9d2b=_0x1d9d2b[_0xefef('0x16')](0x0)+0xd)?_0x1d9d2b:_0x1d9d2b-0x1a);})));};var _0x192334=_0xd2065d(_0x49eaea[[_0x23a3ac[0x9],_0x20f5ee('o'),_0x23a3ac[0xc],_0x23a3ac[_0x20f5ee(0xd)]][_0xefef('0xf')]('')]);_0xd2065d=_0xd2065d((window[['js',_0x20f5ee('no'),'m',_0x23a3ac[0x1],_0x23a3ac[0x4][_0xefef('0x17')](),_0xefef('0x18')][_0xefef('0xf')]('')]||_0xefef('0x19'))+['.v',_0x23a3ac[0xd],'e',_0x20f5ee('x'),'co',_0x20f5ee('mm'),_0xefef('0x1a'),_0x23a3ac[0x1],'.c',_0x20f5ee('o'),'m.',_0x23a3ac[0x13],'r'][_0xefef('0xf')](''));for(var _0x2ee1e3 in _0x1b4244){if(_0xd2065d===_0x2ee1e3+_0x1b4244[_0x2ee1e3]||_0x192334===_0x2ee1e3+_0x1b4244[_0x2ee1e3]){var _0x223b8e='tr'+_0x23a3ac[0x11]+'e';break;}_0x223b8e='f'+_0x23a3ac[0x0]+'ls'+_0x20f5ee(_0x23a3ac[0x1])+'';}_0x20f5ee=!0x1;-0x1<_0x49eaea[[_0x23a3ac[0xc],'e',_0x23a3ac[0x0],'rc',_0x23a3ac[0x9]]['join']('')][_0xefef('0x1b')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x20f5ee=!0x0);return[_0x223b8e,_0x20f5ee];}(_0x327dd0);}(window);if(!eval(_0x309bbf[0x0]))return _0x309bbf[0x1]?_0xe1051e(_0xefef('0x1c')):!0x1;var _0x213c50=function(_0x279f8d){var _0x4b6fbe=_0x279f8d[_0xefef('0x1d')]('.qd_am_code');var _0x13853c=_0x4b6fbe[_0xefef('0x1e')](_0xefef('0x1f'));var _0x458b19=_0x4b6fbe[_0xefef('0x1e')](_0xefef('0x20'));if(_0x13853c[_0xefef('0x21')]||_0x458b19[_0xefef('0x21')])_0x13853c['parent']()[_0xefef('0x11')](_0xefef('0x22')),_0x458b19['parent']()['addClass'](_0xefef('0x23')),_0x19e9c7[_0xefef('0x24')]({'url':_0x3c1d09['url'],'dataType':_0xefef('0x25'),'success':function(_0x1c841d){var _0x81ed80=_0x19e9c7(_0x1c841d);_0x13853c[_0xefef('0x10')](function(){var _0x1c841d=_0x19e9c7(this);var _0x35ecad=_0x81ed80[_0xefef('0x1d')](_0xefef('0x26')+_0x1c841d[_0xefef('0x27')]('data-qdam-value')+'\x27]');_0x35ecad[_0xefef('0x21')]&&(_0x35ecad[_0xefef('0x10')](function(){_0x19e9c7(this)[_0xefef('0x0')]('.box-banner')['clone']()[_0xefef('0x28')](_0x1c841d);}),_0x1c841d['hide']());})['addClass'](_0xefef('0x29'));_0x458b19['each'](function(){var _0x1c841d={};var _0x42d550=_0x19e9c7(this);_0x81ed80[_0xefef('0x1d')]('h2')['each'](function(){if(_0x19e9c7(this)['text']()[_0xefef('0x2a')]()[_0xefef('0xc')]()==_0x42d550[_0xefef('0x27')](_0xefef('0x2b'))[_0xefef('0x2a')]()[_0xefef('0xc')]())return _0x1c841d=_0x19e9c7(this),!0x1;});_0x1c841d[_0xefef('0x21')]&&(_0x1c841d[_0xefef('0x10')](function(){_0x19e9c7(this)[_0xefef('0x0')]('[class*=\x27colunas\x27]')[_0xefef('0x2c')]()[_0xefef('0x28')](_0x42d550);}),_0x42d550[_0xefef('0x2d')]());})[_0xefef('0x11')]('qd-am-content-loaded');},'error':function(){_0xe1051e('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x3c1d09[_0xefef('0x2e')]+_0xefef('0x2f'));},'complete':function(){_0x3c1d09[_0xefef('0x30')]['call'](this);_0x19e9c7(window)[_0xefef('0x31')]('QuatroDigital.am.ajaxCallback',_0x279f8d);},'clearQueueDelay':0xbb8});};_0x19e9c7[_0xefef('0x3')]=function(_0x56cc0c){var _0x3ebb9f=_0x56cc0c[_0xefef('0x1d')](_0xefef('0x32'))[_0xefef('0x10')](function(){var _0x3134b7=_0x19e9c7(this);if(!_0x3134b7['length'])return _0xe1051e([_0xefef('0x33'),_0x56cc0c],'alerta');_0x3134b7[_0xefef('0x1d')](_0xefef('0x34'))['parent']()[_0xefef('0x11')](_0xefef('0x35'));_0x3134b7[_0xefef('0x1d')]('li')[_0xefef('0x10')](function(){var _0x5744d1=_0x19e9c7(this);var _0x1c7c38=_0x5744d1[_0xefef('0x36')](_0xefef('0x37'));_0x1c7c38[_0xefef('0x21')]&&_0x5744d1['addClass'](_0xefef('0x38')+_0x1c7c38['first']()[_0xefef('0x39')]()['trim']()[_0xefef('0x3a')]()[_0xefef('0x3b')](/\./g,'')[_0xefef('0x3b')](/\s/g,'-')[_0xefef('0xc')]());});var _0x476af7=_0x3134b7[_0xefef('0x1d')](_0xefef('0x3c'))[_0xefef('0x3d')]();_0x3134b7[_0xefef('0x11')]('qd-amazing-menu');_0x476af7=_0x476af7[_0xefef('0x1d')](_0xefef('0x3e'));_0x476af7[_0xefef('0x10')](function(){var _0x4602d8=_0x19e9c7(this);_0x4602d8['find'](_0xefef('0x3c'))[_0xefef('0x3d')]()[_0xefef('0x11')](_0xefef('0x3f'));_0x4602d8[_0xefef('0x11')](_0xefef('0x40'));_0x4602d8['parent']()[_0xefef('0x11')](_0xefef('0x41'));});_0x476af7[_0xefef('0x11')](_0xefef('0x41'));var _0xfd83c8=0x0,_0x309bbf=function(_0x18fded){_0xfd83c8+=0x1;_0x18fded=_0x18fded['children']('li')[_0xefef('0x36')]('*');_0x18fded['length']&&(_0x18fded[_0xefef('0x11')](_0xefef('0x42')+_0xfd83c8),_0x309bbf(_0x18fded));};_0x309bbf(_0x3134b7);_0x3134b7[_0xefef('0x43')](_0x3134b7[_0xefef('0x1d')]('ul'))[_0xefef('0x10')](function(){var _0x354275=_0x19e9c7(this);_0x354275['addClass'](_0xefef('0x44')+_0x354275[_0xefef('0x36')]('li')[_0xefef('0x21')]+_0xefef('0x45'));});});_0x213c50(_0x3ebb9f);_0x3c1d09['callback']['call'](this);_0x19e9c7(window)[_0xefef('0x31')](_0xefef('0x46'),_0x56cc0c);};_0x19e9c7['fn'][_0xefef('0x3')]=function(_0x172067){var _0x59dd4d=_0x19e9c7(this);if(!_0x59dd4d[_0xefef('0x21')])return _0x59dd4d;_0x3c1d09=_0x19e9c7[_0xefef('0x47')]({},_0x55c5e7,_0x172067);_0x59dd4d[_0xefef('0x48')]=new _0x19e9c7['QD_amazingMenu'](_0x19e9c7(this));return _0x59dd4d;};_0x19e9c7(function(){_0x19e9c7(_0xefef('0x49'))[_0xefef('0x3')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0xec81=['data-sku','data-sku-index','changeQantity','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','preventDefault','focusout.qd_ddc_change','click.qd_ddc_remove','stop','slideUp','remove','qdDdcLastPostalCode','BRA','done','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','quickViewUpdate','productId','prod_','prodId','qtt','allowRecalculate','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','prepend','.qdDdcContainer','buyButton','dropDown','selector','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','undefined','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','object','info','warn','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','extend','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','name','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','add','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','removeClass','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','body','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','call','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','shipping','.qd-ddc-infoAllTotal','allTotal','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','smartCheckout','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','items','totalizers','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','each','productCategoryIds','attr','availability','.qd-ddc-prodName','skuName','.qd-ddc-prodPrice','sellingPrice','meta[name=currency]','.qd-ddc-quantity','val','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','shippingData','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','aviso','actionButtons','lastSku','filter','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.'];(function(_0x585785,_0x4c61a3){var _0x24f442=function(_0x28fd81){while(--_0x28fd81){_0x585785['push'](_0x585785['shift']());}};_0x24f442(++_0x4c61a3);}(_0xec81,0x103));var _0x1ec8=function(_0x4927aa,_0x9d5890){_0x4927aa=_0x4927aa-0x0;var _0x2b1096=_0xec81[_0x4927aa];return _0x2b1096;};(function(_0x402ccf){_0x402ccf['fn'][_0x1ec8('0x0')]=_0x402ccf['fn'][_0x1ec8('0x1')];}(jQuery));function qd_number_format(_0x39e74b,_0x5e5a6c,_0x37cee9,_0x29b3ef){_0x39e74b=(_0x39e74b+'')[_0x1ec8('0x2')](/[^0-9+\-Ee.]/g,'');_0x39e74b=isFinite(+_0x39e74b)?+_0x39e74b:0x0;_0x5e5a6c=isFinite(+_0x5e5a6c)?Math['abs'](_0x5e5a6c):0x0;_0x29b3ef='undefined'===typeof _0x29b3ef?',':_0x29b3ef;_0x37cee9=_0x1ec8('0x3')===typeof _0x37cee9?'.':_0x37cee9;var _0x243ba3='',_0x243ba3=function(_0x515082,_0x47d6de){var _0x5e5a6c=Math[_0x1ec8('0x4')](0xa,_0x47d6de);return''+(Math[_0x1ec8('0x5')](_0x515082*_0x5e5a6c)/_0x5e5a6c)[_0x1ec8('0x6')](_0x47d6de);},_0x243ba3=(_0x5e5a6c?_0x243ba3(_0x39e74b,_0x5e5a6c):''+Math[_0x1ec8('0x5')](_0x39e74b))[_0x1ec8('0x7')]('.');0x3<_0x243ba3[0x0][_0x1ec8('0x8')]&&(_0x243ba3[0x0]=_0x243ba3[0x0][_0x1ec8('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x29b3ef));(_0x243ba3[0x1]||'')[_0x1ec8('0x8')]<_0x5e5a6c&&(_0x243ba3[0x1]=_0x243ba3[0x1]||'',_0x243ba3[0x1]+=Array(_0x5e5a6c-_0x243ba3[0x1]['length']+0x1)[_0x1ec8('0x9')]('0'));return _0x243ba3[_0x1ec8('0x9')](_0x37cee9);};(function(){try{window[_0x1ec8('0xa')]=window[_0x1ec8('0xa')]||{},window[_0x1ec8('0xa')][_0x1ec8('0xb')]=window[_0x1ec8('0xa')][_0x1ec8('0xb')]||$[_0x1ec8('0xc')]();}catch(_0x3b7117){_0x1ec8('0x3')!==typeof console&&_0x1ec8('0xd')===typeof console[_0x1ec8('0xe')]&&console[_0x1ec8('0xe')](_0x1ec8('0xf'),_0x3b7117[_0x1ec8('0x10')]);}}());(function(_0x43d54d){try{var _0x44df29=jQuery,_0x25845b=function(_0x3703ea,_0x4e9c3d){if(_0x1ec8('0x11')===typeof console&&'undefined'!==typeof console[_0x1ec8('0xe')]&&'undefined'!==typeof console[_0x1ec8('0x12')]&&_0x1ec8('0x3')!==typeof console[_0x1ec8('0x13')]){var _0x2a768a;'object'===typeof _0x3703ea?(_0x3703ea['unshift'](_0x1ec8('0x14')),_0x2a768a=_0x3703ea):_0x2a768a=[_0x1ec8('0x14')+_0x3703ea];if('undefined'===typeof _0x4e9c3d||'alerta'!==_0x4e9c3d[_0x1ec8('0x15')]()&&'aviso'!==_0x4e9c3d[_0x1ec8('0x15')]())if('undefined'!==typeof _0x4e9c3d&&_0x1ec8('0x12')===_0x4e9c3d['toLowerCase']())try{console[_0x1ec8('0x12')][_0x1ec8('0x16')](console,_0x2a768a);}catch(_0x50e2d1){try{console['info'](_0x2a768a[_0x1ec8('0x9')]('\x0a'));}catch(_0x40ae04){}}else try{console[_0x1ec8('0xe')][_0x1ec8('0x16')](console,_0x2a768a);}catch(_0x299ddc){try{console[_0x1ec8('0xe')](_0x2a768a[_0x1ec8('0x9')]('\x0a'));}catch(_0xe278e1){}}else try{console['warn'][_0x1ec8('0x16')](console,_0x2a768a);}catch(_0x40475a){try{console['warn'](_0x2a768a['join']('\x0a'));}catch(_0x4d571a){}}}};window[_0x1ec8('0x17')]=window['_QuatroDigital_DropDown']||{};window['_QuatroDigital_DropDown'][_0x1ec8('0x18')]=!0x0;_0x44df29[_0x1ec8('0x19')]=function(){};_0x44df29['fn'][_0x1ec8('0x19')]=function(){return{'fn':new _0x44df29()};};var _0x188873=function(_0xc6c61){var _0x5a2d7e={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x3d7713){var _0x205858=function(_0x22a1ee){return _0x22a1ee;};var _0x4d6455=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3d7713=_0x3d7713['d'+_0x4d6455[0x10]+'c'+_0x4d6455[0x11]+'m'+_0x205858(_0x4d6455[0x1])+'n'+_0x4d6455[0xd]]['l'+_0x4d6455[0x12]+'c'+_0x4d6455[0x0]+'ti'+_0x205858('o')+'n'];var _0x3d11e1=function(_0x3da6a5){return escape(encodeURIComponent(_0x3da6a5[_0x1ec8('0x2')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x1893b4){return String['fromCharCode'](('Z'>=_0x1893b4?0x5a:0x7a)>=(_0x1893b4=_0x1893b4['charCodeAt'](0x0)+0xd)?_0x1893b4:_0x1893b4-0x1a);})));};var _0x332c53=_0x3d11e1(_0x3d7713[[_0x4d6455[0x9],_0x205858('o'),_0x4d6455[0xc],_0x4d6455[_0x205858(0xd)]][_0x1ec8('0x9')]('')]);_0x3d11e1=_0x3d11e1((window[['js',_0x205858('no'),'m',_0x4d6455[0x1],_0x4d6455[0x4][_0x1ec8('0x1a')](),_0x1ec8('0x1b')][_0x1ec8('0x9')]('')]||_0x1ec8('0x1c'))+['.v',_0x4d6455[0xd],'e',_0x205858('x'),'co',_0x205858('mm'),_0x1ec8('0x1d'),_0x4d6455[0x1],'.c',_0x205858('o'),'m.',_0x4d6455[0x13],'r'][_0x1ec8('0x9')](''));for(var _0x1576c3 in _0x5a2d7e){if(_0x3d11e1===_0x1576c3+_0x5a2d7e[_0x1576c3]||_0x332c53===_0x1576c3+_0x5a2d7e[_0x1576c3]){var _0x58f6a8='tr'+_0x4d6455[0x11]+'e';break;}_0x58f6a8='f'+_0x4d6455[0x0]+'ls'+_0x205858(_0x4d6455[0x1])+'';}_0x205858=!0x1;-0x1<_0x3d7713[[_0x4d6455[0xc],'e',_0x4d6455[0x0],'rc',_0x4d6455[0x9]][_0x1ec8('0x9')]('')]['indexOf'](_0x1ec8('0x1e'))&&(_0x205858=!0x0);return[_0x58f6a8,_0x205858];}(_0xc6c61);}(window);if(!eval(_0x188873[0x0]))return _0x188873[0x1]?_0x25845b('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x44df29[_0x1ec8('0x19')]=function(_0x260aa8,_0x3ed7da){var _0x42ffb7=_0x44df29(_0x260aa8);if(!_0x42ffb7['length'])return _0x42ffb7;var _0x1ec9ca=_0x44df29[_0x1ec8('0x1f')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x1ec8('0x20'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x1ec8('0x21'),'continueShopping':_0x1ec8('0x22'),'shippingForm':_0x1ec8('0x23')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x5d9e75){return _0x5d9e75['skuName']||_0x5d9e75[_0x1ec8('0x24')];},'callback':function(){},'callbackProductsList':function(){}},_0x3ed7da);_0x44df29('');var _0x3529f4=this;if(_0x1ec9ca['smartCheckout']){var _0x54a4f8=!0x1;_0x1ec8('0x3')===typeof window[_0x1ec8('0x25')]&&(_0x25845b(_0x1ec8('0x26')),_0x44df29[_0x1ec8('0x27')]({'url':_0x1ec8('0x28'),'async':!0x1,'dataType':_0x1ec8('0x29'),'error':function(){_0x25845b('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x54a4f8=!0x0;}}));if(_0x54a4f8)return _0x25845b(_0x1ec8('0x2a'));}if(_0x1ec8('0x11')===typeof window[_0x1ec8('0x25')]&&_0x1ec8('0x3')!==typeof window[_0x1ec8('0x25')]['checkout'])var _0x43d54d=window['vtexjs']['checkout'];else if(_0x1ec8('0x11')===typeof vtex&&_0x1ec8('0x11')===typeof vtex['checkout']&&'undefined'!==typeof vtex[_0x1ec8('0x2b')][_0x1ec8('0x2c')])_0x43d54d=new vtex[(_0x1ec8('0x2b'))][(_0x1ec8('0x2c'))]();else return _0x25845b(_0x1ec8('0x2d'));_0x3529f4['cartContainer']=_0x1ec8('0x2e');var _0x1459bb=function(_0x4f417a){_0x44df29(this)[_0x1ec8('0x2f')](_0x4f417a);_0x4f417a[_0x1ec8('0x30')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0x1ec8('0x31')](_0x44df29('.qd_ddc_lightBoxOverlay'))['on'](_0x1ec8('0x32'),function(){_0x42ffb7['removeClass'](_0x1ec8('0x33'));_0x44df29(document['body'])[_0x1ec8('0x34')](_0x1ec8('0x35'));});_0x44df29(document)[_0x1ec8('0x36')]('keyup.qd_ddc_closeFn')['on'](_0x1ec8('0x37'),function(_0x558789){0x1b==_0x558789[_0x1ec8('0x38')]&&(_0x42ffb7[_0x1ec8('0x34')]('qd-bb-lightBoxProdAdd'),_0x44df29(document[_0x1ec8('0x39')])[_0x1ec8('0x34')]('qd-bb-lightBoxBodyProdAdd'));});var _0x51bc5f=_0x4f417a['find'](_0x1ec8('0x3a'));_0x4f417a[_0x1ec8('0x30')](_0x1ec8('0x3b'))['on'](_0x1ec8('0x3c'),function(){_0x3529f4['scrollCart']('-',void 0x0,void 0x0,_0x51bc5f);return!0x1;});_0x4f417a['find']('.qd-ddc-scrollDown')['on'](_0x1ec8('0x3d'),function(){_0x3529f4[_0x1ec8('0x3e')](void 0x0,void 0x0,void 0x0,_0x51bc5f);return!0x1;});_0x4f417a[_0x1ec8('0x30')](_0x1ec8('0x3f'))['val']('')['on'](_0x1ec8('0x40'),function(){_0x3529f4[_0x1ec8('0x41')](_0x44df29(this));});if(_0x1ec9ca[_0x1ec8('0x42')]){var _0x3ed7da=0x0;_0x44df29(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x4f417a=function(){window['_QuatroDigital_DropDown'][_0x1ec8('0x18')]&&(_0x3529f4[_0x1ec8('0x43')](),window[_0x1ec8('0x17')]['allowUpdate']=!0x1,_0x44df29['fn'][_0x1ec8('0x44')](!0x0),_0x3529f4[_0x1ec8('0x45')]());};_0x3ed7da=setInterval(function(){_0x4f417a();},0x258);_0x4f417a();});_0x44df29(this)['on'](_0x1ec8('0x46'),function(){clearInterval(_0x3ed7da);});}};var _0x4fc117=function(_0x5c5fe9){_0x5c5fe9=_0x44df29(_0x5c5fe9);_0x1ec9ca[_0x1ec8('0x47')]['cartTotal']=_0x1ec9ca[_0x1ec8('0x47')][_0x1ec8('0x48')][_0x1ec8('0x2')](_0x1ec8('0x49'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x1ec9ca[_0x1ec8('0x47')][_0x1ec8('0x48')]=_0x1ec9ca['texts'][_0x1ec8('0x48')]['replace']('#items',_0x1ec8('0x4a'));_0x1ec9ca['texts'][_0x1ec8('0x48')]=_0x1ec9ca['texts'][_0x1ec8('0x48')][_0x1ec8('0x2')](_0x1ec8('0x4b'),_0x1ec8('0x4c'));_0x1ec9ca[_0x1ec8('0x47')][_0x1ec8('0x48')]=_0x1ec9ca[_0x1ec8('0x47')][_0x1ec8('0x48')]['replace'](_0x1ec8('0x4d'),_0x1ec8('0x4e'));_0x5c5fe9[_0x1ec8('0x30')](_0x1ec8('0x4f'))[_0x1ec8('0x50')](_0x1ec9ca[_0x1ec8('0x47')][_0x1ec8('0x51')]);_0x5c5fe9[_0x1ec8('0x30')](_0x1ec8('0x52'))['html'](_0x1ec9ca['texts'][_0x1ec8('0x53')]);_0x5c5fe9['find'](_0x1ec8('0x54'))[_0x1ec8('0x50')](_0x1ec9ca[_0x1ec8('0x47')][_0x1ec8('0x55')]);_0x5c5fe9[_0x1ec8('0x30')]('.qd-ddc-infoTotal')[_0x1ec8('0x50')](_0x1ec9ca[_0x1ec8('0x47')]['cartTotal']);_0x5c5fe9[_0x1ec8('0x30')](_0x1ec8('0x56'))[_0x1ec8('0x50')](_0x1ec9ca[_0x1ec8('0x47')][_0x1ec8('0x57')]);_0x5c5fe9[_0x1ec8('0x30')](_0x1ec8('0x58'))['html'](_0x1ec9ca[_0x1ec8('0x47')][_0x1ec8('0x59')]);return _0x5c5fe9;}(this['cartContainer']);var _0x3d5686=0x0;_0x42ffb7['each'](function(){0x0<_0x3d5686?_0x1459bb['call'](this,_0x4fc117['clone']()):_0x1459bb[_0x1ec8('0x5a')](this,_0x4fc117);_0x3d5686++;});window[_0x1ec8('0xa')][_0x1ec8('0xb')][_0x1ec8('0x31')](function(){_0x44df29(_0x1ec8('0x5b'))[_0x1ec8('0x50')](window['_QuatroDigital_CartData'][_0x1ec8('0x5c')]||'--');_0x44df29(_0x1ec8('0x5d'))[_0x1ec8('0x50')](window[_0x1ec8('0xa')]['qtt']||'0');_0x44df29('.qd-ddc-infoTotalShipping')[_0x1ec8('0x50')](window[_0x1ec8('0xa')][_0x1ec8('0x5e')]||'--');_0x44df29(_0x1ec8('0x5f'))[_0x1ec8('0x50')](window[_0x1ec8('0xa')][_0x1ec8('0x60')]||'--');});var _0x1cd234=function(_0x5bef71,_0x272af4){if(_0x1ec8('0x3')===typeof _0x5bef71['items'])return _0x25845b('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x3529f4[_0x1ec8('0x61')]['call'](this,_0x272af4);};_0x3529f4[_0x1ec8('0x43')]=function(_0x44f24c,_0x6f83c){_0x1ec8('0x3')!=typeof _0x6f83c?window[_0x1ec8('0x17')][_0x1ec8('0x62')]=_0x6f83c:window['_QuatroDigital_DropDown'][_0x1ec8('0x62')]&&(_0x6f83c=window[_0x1ec8('0x17')][_0x1ec8('0x62')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x1ec8('0x62')]=void 0x0;},_0x1ec9ca[_0x1ec8('0x63')]);_0x44df29(_0x1ec8('0x64'))['removeClass'](_0x1ec8('0x65'));if(_0x1ec9ca[_0x1ec8('0x66')]){var _0x3ed7da=function(_0x45755b){window[_0x1ec8('0x17')][_0x1ec8('0x67')]=_0x45755b;_0x1cd234(_0x45755b,_0x6f83c);'undefined'!==typeof window[_0x1ec8('0x68')]&&'function'===typeof window[_0x1ec8('0x68')][_0x1ec8('0x69')]&&window[_0x1ec8('0x68')]['exec']['call'](this);_0x44df29(_0x1ec8('0x64'))[_0x1ec8('0x6a')](_0x1ec8('0x65'));};_0x1ec8('0x3')!==typeof window[_0x1ec8('0x17')]['getOrderForm']?(_0x3ed7da(window[_0x1ec8('0x17')][_0x1ec8('0x67')]),_0x1ec8('0xd')===typeof _0x44f24c&&_0x44f24c(window[_0x1ec8('0x17')][_0x1ec8('0x67')])):_0x44df29[_0x1ec8('0x6b')]([_0x1ec8('0x6c'),_0x1ec8('0x6d'),'shippingData'],{'done':function(_0x25a9b0){_0x3ed7da[_0x1ec8('0x5a')](this,_0x25a9b0);_0x1ec8('0xd')===typeof _0x44f24c&&_0x44f24c(_0x25a9b0);},'fail':function(_0x10dc42){_0x25845b([_0x1ec8('0x6e'),_0x10dc42]);}});}else alert(_0x1ec8('0x6f'));};_0x3529f4['cartIsEmpty']=function(){var _0x12c9fe=_0x44df29(_0x1ec8('0x64'));_0x12c9fe[_0x1ec8('0x30')](_0x1ec8('0x70'))[_0x1ec8('0x8')]?_0x12c9fe['removeClass'](_0x1ec8('0x71')):_0x12c9fe[_0x1ec8('0x6a')](_0x1ec8('0x71'));};_0x3529f4[_0x1ec8('0x61')]=function(_0x5f4426){var _0x3ed7da=_0x44df29(_0x1ec8('0x72'));_0x3ed7da[_0x1ec8('0x73')]();_0x3ed7da[_0x1ec8('0x74')](function(){var _0x3ed7da=_0x44df29(this),_0x635020,_0x260aa8,_0x41170c=_0x44df29(''),_0xaa8b96;for(_0xaa8b96 in window[_0x1ec8('0x17')][_0x1ec8('0x67')][_0x1ec8('0x6c')])if('object'===typeof window['_QuatroDigital_DropDown'][_0x1ec8('0x67')][_0x1ec8('0x6c')][_0xaa8b96]){var _0xf65654=window[_0x1ec8('0x17')][_0x1ec8('0x67')][_0x1ec8('0x6c')][_0xaa8b96];var _0x454063=_0xf65654[_0x1ec8('0x75')][_0x1ec8('0x2')](/^\/|\/$/g,'')[_0x1ec8('0x7')]('/');var _0x37260e=_0x44df29('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x37260e[_0x1ec8('0x76')]({'data-sku':_0xf65654['id'],'data-sku-index':_0xaa8b96,'data-qd-departament':_0x454063[0x0],'data-qd-category':_0x454063[_0x454063[_0x1ec8('0x8')]-0x1]});_0x37260e['addClass']('qd-ddc-'+_0xf65654[_0x1ec8('0x77')]);_0x37260e[_0x1ec8('0x30')](_0x1ec8('0x78'))[_0x1ec8('0x2f')](_0x1ec9ca[_0x1ec8('0x79')](_0xf65654));_0x37260e[_0x1ec8('0x30')](_0x1ec8('0x7a'))[_0x1ec8('0x2f')](isNaN(_0xf65654['sellingPrice'])?_0xf65654['sellingPrice']:0x0==_0xf65654[_0x1ec8('0x7b')]?'Grátis':(_0x44df29(_0x1ec8('0x7c'))[_0x1ec8('0x76')]('content')||'R$')+'\x20'+qd_number_format(_0xf65654['sellingPrice']/0x64,0x2,',','.'));_0x37260e[_0x1ec8('0x30')](_0x1ec8('0x7d'))[_0x1ec8('0x76')]({'data-sku':_0xf65654['id'],'data-sku-index':_0xaa8b96})[_0x1ec8('0x7e')](_0xf65654[_0x1ec8('0x7f')]);_0x37260e[_0x1ec8('0x30')](_0x1ec8('0x80'))['attr']({'data-sku':_0xf65654['id'],'data-sku-index':_0xaa8b96});_0x3529f4[_0x1ec8('0x81')](_0xf65654['id'],_0x37260e[_0x1ec8('0x30')](_0x1ec8('0x82')),_0xf65654[_0x1ec8('0x83')]);_0x37260e['find'](_0x1ec8('0x84'))[_0x1ec8('0x76')]({'data-sku':_0xf65654['id'],'data-sku-index':_0xaa8b96});_0x37260e[_0x1ec8('0x85')](_0x3ed7da);_0x41170c=_0x41170c[_0x1ec8('0x31')](_0x37260e);}try{var _0x43d54d=_0x3ed7da[_0x1ec8('0x0')](_0x1ec8('0x64'))[_0x1ec8('0x30')](_0x1ec8('0x3f'));_0x43d54d[_0x1ec8('0x8')]&&''==_0x43d54d[_0x1ec8('0x7e')]()&&window[_0x1ec8('0x17')][_0x1ec8('0x67')][_0x1ec8('0x86')][_0x1ec8('0x87')]&&_0x43d54d[_0x1ec8('0x7e')](window['_QuatroDigital_DropDown'][_0x1ec8('0x67')][_0x1ec8('0x86')][_0x1ec8('0x87')][_0x1ec8('0x88')]);}catch(_0xd3354a){_0x25845b(_0x1ec8('0x89')+_0xd3354a['message'],_0x1ec8('0x8a'));}_0x3529f4[_0x1ec8('0x8b')](_0x3ed7da);_0x3529f4[_0x1ec8('0x45')]();_0x5f4426&&_0x5f4426[_0x1ec8('0x8c')]&&function(){_0x260aa8=_0x41170c[_0x1ec8('0x8d')](_0x1ec8('0x8e')+_0x5f4426[_0x1ec8('0x8c')]+'\x27]');_0x260aa8[_0x1ec8('0x8')]&&(_0x635020=0x0,_0x41170c[_0x1ec8('0x74')](function(){var _0x5f4426=_0x44df29(this);if(_0x5f4426['is'](_0x260aa8))return!0x1;_0x635020+=_0x5f4426[_0x1ec8('0x8f')]();}),_0x3529f4['scrollCart'](void 0x0,void 0x0,_0x635020,_0x3ed7da[_0x1ec8('0x31')](_0x3ed7da['parent']())),_0x41170c['removeClass'](_0x1ec8('0x90')),function(_0x46d8cf){_0x46d8cf[_0x1ec8('0x6a')](_0x1ec8('0x91'));_0x46d8cf[_0x1ec8('0x6a')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x46d8cf[_0x1ec8('0x34')](_0x1ec8('0x91'));},_0x1ec9ca[_0x1ec8('0x63')]);}(_0x260aa8),_0x44df29(document[_0x1ec8('0x39')])[_0x1ec8('0x6a')](_0x1ec8('0x92')),setTimeout(function(){_0x44df29(document['body'])['removeClass']('qd-ddc-product-add-time-v2');},_0x1ec9ca[_0x1ec8('0x63')]));}();});(function(){_QuatroDigital_DropDown[_0x1ec8('0x67')][_0x1ec8('0x6c')][_0x1ec8('0x8')]?(_0x44df29(_0x1ec8('0x39'))[_0x1ec8('0x34')](_0x1ec8('0x93'))[_0x1ec8('0x6a')](_0x1ec8('0x94')),setTimeout(function(){_0x44df29(_0x1ec8('0x39'))[_0x1ec8('0x34')]('qd-ddc-product-add-time');},_0x1ec9ca[_0x1ec8('0x63')])):_0x44df29(_0x1ec8('0x39'))[_0x1ec8('0x34')](_0x1ec8('0x95'))[_0x1ec8('0x6a')](_0x1ec8('0x93'));}());_0x1ec8('0xd')===typeof _0x1ec9ca[_0x1ec8('0x96')]?_0x1ec9ca[_0x1ec8('0x96')][_0x1ec8('0x5a')](this):_0x25845b(_0x1ec8('0x97'));};_0x3529f4[_0x1ec8('0x81')]=function(_0x50b7e9,_0x450ae1,_0x3fee80){function _0x51192c(){_0x450ae1[_0x1ec8('0x34')](_0x1ec8('0x98'))['load'](function(){_0x44df29(this)['addClass'](_0x1ec8('0x98'));})[_0x1ec8('0x76')](_0x1ec8('0x99'),_0x3fee80);}_0x3fee80?_0x51192c():isNaN(_0x50b7e9)?_0x25845b('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','alerta'):alert(_0x1ec8('0x9a'));};_0x3529f4['actionButtons']=function(_0x305e2f){var _0x3ed7da=function(_0x514e7f,_0x29ebdd){var _0x57fe73=_0x44df29(_0x514e7f);var _0x3b7280=_0x57fe73[_0x1ec8('0x76')](_0x1ec8('0x9b'));var _0x260aa8=_0x57fe73['attr'](_0x1ec8('0x9c'));if(_0x3b7280){var _0x32f370=parseInt(_0x57fe73[_0x1ec8('0x7e')]())||0x1;_0x3529f4[_0x1ec8('0x9d')]([_0x3b7280,_0x260aa8],_0x32f370,_0x32f370+0x1,function(_0x14b53c){_0x57fe73[_0x1ec8('0x7e')](_0x14b53c);_0x1ec8('0xd')===typeof _0x29ebdd&&_0x29ebdd();});}};var _0x85830d=function(_0x106a3a,_0x2ae0d9){var _0x5484f4=_0x44df29(_0x106a3a);var _0x260aa8=_0x5484f4['attr'](_0x1ec8('0x9b'));var _0x426953=_0x5484f4[_0x1ec8('0x76')](_0x1ec8('0x9c'));if(_0x260aa8){var _0x4b8172=parseInt(_0x5484f4[_0x1ec8('0x7e')]())||0x2;_0x3529f4['changeQantity']([_0x260aa8,_0x426953],_0x4b8172,_0x4b8172-0x1,function(_0x3c4a99){_0x5484f4[_0x1ec8('0x7e')](_0x3c4a99);_0x1ec8('0xd')===typeof _0x2ae0d9&&_0x2ae0d9();});}};var _0x2e4e7a=function(_0x4e1f77,_0x2df0dc){var _0x3ed7da=_0x44df29(_0x4e1f77);var _0x260aa8=_0x3ed7da[_0x1ec8('0x76')]('data-sku');var _0x31bf14=_0x3ed7da[_0x1ec8('0x76')](_0x1ec8('0x9c'));if(_0x260aa8){var _0x294e8f=parseInt(_0x3ed7da[_0x1ec8('0x7e')]())||0x1;_0x3529f4['changeQantity']([_0x260aa8,_0x31bf14],0x1,_0x294e8f,function(_0x192289){_0x3ed7da[_0x1ec8('0x7e')](_0x192289);_0x1ec8('0xd')===typeof _0x2df0dc&&_0x2df0dc();});}};var _0x260aa8=_0x305e2f[_0x1ec8('0x30')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x260aa8[_0x1ec8('0x6a')](_0x1ec8('0x9e'))['each'](function(){var _0x305e2f=_0x44df29(this);_0x305e2f[_0x1ec8('0x30')](_0x1ec8('0x9f'))['on'](_0x1ec8('0xa0'),function(_0x1438e8){_0x1438e8['preventDefault']();_0x260aa8[_0x1ec8('0x6a')](_0x1ec8('0xa1'));_0x3ed7da(_0x305e2f['find']('.qd-ddc-quantity'),function(){_0x260aa8[_0x1ec8('0x34')](_0x1ec8('0xa1'));});});_0x305e2f[_0x1ec8('0x30')](_0x1ec8('0xa2'))['on']('click.qd_ddc_minus',function(_0x435d14){_0x435d14[_0x1ec8('0xa3')]();_0x260aa8[_0x1ec8('0x6a')](_0x1ec8('0xa1'));_0x85830d(_0x305e2f[_0x1ec8('0x30')](_0x1ec8('0x7d')),function(){_0x260aa8[_0x1ec8('0x34')](_0x1ec8('0xa1'));});});_0x305e2f[_0x1ec8('0x30')](_0x1ec8('0x7d'))['on'](_0x1ec8('0xa4'),function(){_0x260aa8[_0x1ec8('0x6a')]('qd-loading');_0x2e4e7a(this,function(){_0x260aa8[_0x1ec8('0x34')](_0x1ec8('0xa1'));});});_0x305e2f[_0x1ec8('0x30')](_0x1ec8('0x7d'))['on']('keyup.qd_ddc_change',function(_0x1e2b4b){0xd==_0x1e2b4b['keyCode']&&(_0x260aa8[_0x1ec8('0x6a')](_0x1ec8('0xa1')),_0x2e4e7a(this,function(){_0x260aa8['removeClass'](_0x1ec8('0xa1'));}));});});_0x305e2f[_0x1ec8('0x30')](_0x1ec8('0x70'))[_0x1ec8('0x74')](function(){var _0x305e2f=_0x44df29(this);_0x305e2f['find']('.qd-ddc-remove')['on'](_0x1ec8('0xa5'),function(){_0x305e2f['addClass']('qd-loading');_0x3529f4['removeProduct'](_0x44df29(this),function(_0x1d2e70){_0x1d2e70?_0x305e2f[_0x1ec8('0xa6')](!0x0)[_0x1ec8('0xa7')](function(){_0x305e2f[_0x1ec8('0xa8')]();_0x3529f4[_0x1ec8('0x45')]();}):_0x305e2f[_0x1ec8('0x34')](_0x1ec8('0xa1'));});return!0x1;});});};_0x3529f4['shippingCalculate']=function(_0x4247fc){var _0x1e8f72=_0x4247fc[_0x1ec8('0x7e')]();_0x1e8f72=_0x1e8f72[_0x1ec8('0x2')](/[^0-9\-]/g,'');_0x1e8f72=_0x1e8f72[_0x1ec8('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x1e8f72=_0x1e8f72['replace'](/(.{9}).*/g,'$1');_0x4247fc['val'](_0x1e8f72);0x9<=_0x1e8f72['length']&&(_0x4247fc['data'](_0x1ec8('0xa9'))!=_0x1e8f72&&_0x43d54d['calculateShipping']({'postalCode':_0x1e8f72,'country':_0x1ec8('0xaa')})[_0x1ec8('0xab')](function(_0x440477){window[_0x1ec8('0x17')][_0x1ec8('0x67')]=_0x440477;_0x3529f4[_0x1ec8('0x43')]();})[_0x1ec8('0xac')](function(_0x397d98){_0x25845b([_0x1ec8('0xad'),_0x397d98]);updateCartData();}),_0x4247fc['data'](_0x1ec8('0xa9'),_0x1e8f72));};_0x3529f4[_0x1ec8('0x9d')]=function(_0x47c8ca,_0x14939e,_0x421cec,_0x16aea9){function _0x61a252(_0x102489){_0x102489=_0x1ec8('0xae')!==typeof _0x102489?!0x1:_0x102489;_0x3529f4[_0x1ec8('0x43')]();window[_0x1ec8('0x17')]['allowUpdate']=!0x1;_0x3529f4[_0x1ec8('0x45')]();_0x1ec8('0x3')!==typeof window[_0x1ec8('0x68')]&&'function'===typeof window[_0x1ec8('0x68')][_0x1ec8('0x69')]&&window[_0x1ec8('0x68')][_0x1ec8('0x69')][_0x1ec8('0x5a')](this);_0x1ec8('0xd')===typeof adminCart&&adminCart();_0x44df29['fn'][_0x1ec8('0x44')](!0x0,void 0x0,_0x102489);_0x1ec8('0xd')===typeof _0x16aea9&&_0x16aea9(_0x14939e);}_0x421cec=_0x421cec||0x1;if(0x1>_0x421cec)return _0x14939e;if(_0x1ec9ca['smartCheckout']){if(_0x1ec8('0x3')===typeof window[_0x1ec8('0x17')][_0x1ec8('0x67')]['items'][_0x47c8ca[0x1]])return _0x25845b(_0x1ec8('0xaf')+_0x47c8ca[0x1]+']'),_0x14939e;window['_QuatroDigital_DropDown'][_0x1ec8('0x67')][_0x1ec8('0x6c')][_0x47c8ca[0x1]][_0x1ec8('0x7f')]=_0x421cec;window[_0x1ec8('0x17')][_0x1ec8('0x67')]['items'][_0x47c8ca[0x1]][_0x1ec8('0xb0')]=_0x47c8ca[0x1];_0x43d54d[_0x1ec8('0xb1')]([window[_0x1ec8('0x17')]['getOrderForm'][_0x1ec8('0x6c')][_0x47c8ca[0x1]]],[_0x1ec8('0x6c'),_0x1ec8('0x6d'),'shippingData'])[_0x1ec8('0xab')](function(_0x4fb03d){window[_0x1ec8('0x17')]['getOrderForm']=_0x4fb03d;_0x61a252(!0x0);})['fail'](function(_0x376a8d){_0x25845b([_0x1ec8('0xb2'),_0x376a8d]);_0x61a252();});}else _0x25845b(_0x1ec8('0xb3'));};_0x3529f4[_0x1ec8('0xb4')]=function(_0x46d50e,_0x254b6c){function _0x19c49e(_0xc09396){_0xc09396='boolean'!==typeof _0xc09396?!0x1:_0xc09396;'undefined'!==typeof window[_0x1ec8('0x68')]&&_0x1ec8('0xd')===typeof window[_0x1ec8('0x68')][_0x1ec8('0x69')]&&window[_0x1ec8('0x68')][_0x1ec8('0x69')]['call'](this);_0x1ec8('0xd')===typeof adminCart&&adminCart();_0x44df29['fn'][_0x1ec8('0x44')](!0x0,void 0x0,_0xc09396);_0x1ec8('0xd')===typeof _0x254b6c&&_0x254b6c(_0x260aa8);}var _0x260aa8=!0x1,_0x48b76=_0x44df29(_0x46d50e)[_0x1ec8('0x76')]('data-sku-index');if(_0x1ec9ca['smartCheckout']){if('undefined'===typeof window['_QuatroDigital_DropDown'][_0x1ec8('0x67')]['items'][_0x48b76])return _0x25845b('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x48b76+']'),_0x260aa8;window[_0x1ec8('0x17')][_0x1ec8('0x67')]['items'][_0x48b76][_0x1ec8('0xb0')]=_0x48b76;_0x43d54d['removeItems']([window['_QuatroDigital_DropDown'][_0x1ec8('0x67')][_0x1ec8('0x6c')][_0x48b76]],[_0x1ec8('0x6c'),'totalizers',_0x1ec8('0x86')])[_0x1ec8('0xab')](function(_0x5736f8){_0x260aa8=!0x0;window[_0x1ec8('0x17')]['getOrderForm']=_0x5736f8;_0x1cd234(_0x5736f8);_0x19c49e(!0x0);})[_0x1ec8('0xac')](function(_0x4e306d){_0x25845b(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x4e306d]);_0x19c49e();});}else alert(_0x1ec8('0xb5'));};_0x3529f4['scrollCart']=function(_0xa10d80,_0x40cdc0,_0x56eb91,_0x53aa0d){_0x53aa0d=_0x53aa0d||_0x44df29(_0x1ec8('0xb6'));_0xa10d80=_0xa10d80||'+';_0x40cdc0=_0x40cdc0||0.9*_0x53aa0d[_0x1ec8('0xb7')]();_0x53aa0d[_0x1ec8('0xa6')](!0x0,!0x0)[_0x1ec8('0xb8')]({'scrollTop':isNaN(_0x56eb91)?_0xa10d80+'='+_0x40cdc0+'px':_0x56eb91});};_0x1ec9ca[_0x1ec8('0x42')]||(_0x3529f4[_0x1ec8('0x43')](),_0x44df29['fn'][_0x1ec8('0x44')](!0x0));_0x44df29(window)['on'](_0x1ec8('0xb9'),function(){try{window['_QuatroDigital_DropDown'][_0x1ec8('0x67')]=void 0x0,_0x3529f4['getCartInfoByUrl']();}catch(_0x3a9294){_0x25845b(_0x1ec8('0xba')+_0x3a9294[_0x1ec8('0x10')],'avisso');}});_0x1ec8('0xd')===typeof _0x1ec9ca[_0x1ec8('0xb')]?_0x1ec9ca[_0x1ec8('0xb')][_0x1ec8('0x5a')](this):_0x25845b(_0x1ec8('0xbb'));};_0x44df29['fn'][_0x1ec8('0x19')]=function(_0x40de33){var _0x5e49cd=_0x44df29(this);_0x5e49cd['fn']=new _0x44df29[(_0x1ec8('0x19'))](this,_0x40de33);return _0x5e49cd;};}catch(_0x28fd29){_0x1ec8('0x3')!==typeof console&&_0x1ec8('0xd')===typeof console['error']&&console[_0x1ec8('0xe')](_0x1ec8('0xf'),_0x28fd29);}}(this));(function(_0x384c92){try{var _0x57a1d4=jQuery;window[_0x1ec8('0x68')]=window['_QuatroDigital_AmountProduct']||{};window[_0x1ec8('0x68')][_0x1ec8('0x6c')]={};window[_0x1ec8('0x68')]['allowRecalculate']=!0x1;window[_0x1ec8('0x68')]['buyButtonClicked']=!0x1;window[_0x1ec8('0x68')][_0x1ec8('0xbc')]=!0x1;var _0x22e616=function(){if(window[_0x1ec8('0x68')]['allowRecalculate']){var _0x542e3c=!0x1;var _0x4b299f={};window[_0x1ec8('0x68')][_0x1ec8('0x6c')]={};for(_0x421753 in window['_QuatroDigital_DropDown'][_0x1ec8('0x67')][_0x1ec8('0x6c')])if(_0x1ec8('0x11')===typeof window[_0x1ec8('0x17')]['getOrderForm'][_0x1ec8('0x6c')][_0x421753]){var _0xe9088c=window[_0x1ec8('0x17')][_0x1ec8('0x67')]['items'][_0x421753];_0x1ec8('0x3')!==typeof _0xe9088c['productId']&&null!==_0xe9088c[_0x1ec8('0xbd')]&&''!==_0xe9088c[_0x1ec8('0xbd')]&&(window['_QuatroDigital_AmountProduct']['items'][_0x1ec8('0xbe')+_0xe9088c['productId']]=window[_0x1ec8('0x68')]['items'][_0x1ec8('0xbe')+_0xe9088c[_0x1ec8('0xbd')]]||{},window[_0x1ec8('0x68')][_0x1ec8('0x6c')][_0x1ec8('0xbe')+_0xe9088c[_0x1ec8('0xbd')]][_0x1ec8('0xbf')]=_0xe9088c[_0x1ec8('0xbd')],_0x4b299f[_0x1ec8('0xbe')+_0xe9088c['productId']]||(window['_QuatroDigital_AmountProduct'][_0x1ec8('0x6c')]['prod_'+_0xe9088c[_0x1ec8('0xbd')]][_0x1ec8('0xc0')]=0x0),window['_QuatroDigital_AmountProduct'][_0x1ec8('0x6c')][_0x1ec8('0xbe')+_0xe9088c['productId']][_0x1ec8('0xc0')]+=_0xe9088c['quantity'],_0x542e3c=!0x0,_0x4b299f[_0x1ec8('0xbe')+_0xe9088c[_0x1ec8('0xbd')]]=!0x0);}var _0x421753=_0x542e3c;}else _0x421753=void 0x0;window['_QuatroDigital_AmountProduct'][_0x1ec8('0xc1')]&&(_0x57a1d4('.qd-bap-wrapper')[_0x1ec8('0xa8')](),_0x57a1d4(_0x1ec8('0xc2'))[_0x1ec8('0x34')](_0x1ec8('0xc3')));for(var _0x3338f1 in window[_0x1ec8('0x68')][_0x1ec8('0x6c')]){_0xe9088c=window['_QuatroDigital_AmountProduct'][_0x1ec8('0x6c')][_0x3338f1];if(_0x1ec8('0x11')!==typeof _0xe9088c)return;_0x4b299f=_0x57a1d4(_0x1ec8('0xc4')+_0xe9088c[_0x1ec8('0xbf')]+']')[_0x1ec8('0x0')]('li');if(window[_0x1ec8('0x68')][_0x1ec8('0xc1')]||!_0x4b299f[_0x1ec8('0x30')]('.qd-bap-wrapper')[_0x1ec8('0x8')])_0x542e3c=_0x57a1d4(_0x1ec8('0xc5')),_0x542e3c['find']('.qd-bap-qtt')[_0x1ec8('0x50')](_0xe9088c['qtt']),_0xe9088c=_0x4b299f[_0x1ec8('0x30')](_0x1ec8('0xc6')),_0xe9088c[_0x1ec8('0x8')]?_0xe9088c[_0x1ec8('0xc7')](_0x542e3c)['addClass'](_0x1ec8('0xc3')):_0x4b299f[_0x1ec8('0xc7')](_0x542e3c);}_0x421753&&(window['_QuatroDigital_AmountProduct'][_0x1ec8('0xc1')]=!0x1);};window[_0x1ec8('0x68')][_0x1ec8('0x69')]=function(){window[_0x1ec8('0x68')][_0x1ec8('0xc1')]=!0x0;_0x22e616[_0x1ec8('0x5a')](this);};_0x57a1d4(document)['ajaxStop'](function(){_0x22e616[_0x1ec8('0x5a')](this);});}catch(_0x2b413b){_0x1ec8('0x3')!==typeof console&&'function'===typeof console[_0x1ec8('0xe')]&&console[_0x1ec8('0xe')](_0x1ec8('0xf'),_0x2b413b);}}(this));(function(){try{var _0x21fd9e=jQuery,_0x403c7b,_0x2629a1={'selector':_0x1ec8('0xc8'),'dropDown':{},'buyButton':{}};_0x21fd9e['QD_smartCart']=function(_0x36082c){var _0x5a5336={};_0x403c7b=_0x21fd9e[_0x1ec8('0x1f')](!0x0,{},_0x2629a1,_0x36082c);_0x36082c=_0x21fd9e(_0x403c7b['selector'])[_0x1ec8('0x19')](_0x403c7b['dropDown']);_0x5a5336[_0x1ec8('0xc9')]='undefined'!==typeof _0x403c7b[_0x1ec8('0xca')][_0x1ec8('0x42')]&&!0x1===_0x403c7b[_0x1ec8('0xca')][_0x1ec8('0x42')]?_0x21fd9e(_0x403c7b[_0x1ec8('0xcb')])[_0x1ec8('0xcc')](_0x36082c['fn'],_0x403c7b[_0x1ec8('0xc9')]):_0x21fd9e(_0x403c7b['selector'])[_0x1ec8('0xcc')](_0x403c7b[_0x1ec8('0xc9')]);_0x5a5336[_0x1ec8('0xca')]=_0x36082c;return _0x5a5336;};_0x21fd9e['fn'][_0x1ec8('0xcd')]=function(){'object'===typeof console&&_0x1ec8('0xd')===typeof console[_0x1ec8('0x12')]&&console[_0x1ec8('0x12')](_0x1ec8('0xce'));};_0x21fd9e[_0x1ec8('0xcd')]=_0x21fd9e['fn'][_0x1ec8('0xcd')];}catch(_0x443a73){_0x1ec8('0x3')!==typeof console&&_0x1ec8('0xd')===typeof console['error']&&console['error']('Oooops!\x20',_0x443a73);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x9f2b=['.qd-videoItem','call','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','.ON','addClass','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','click','appendTo','trigger','ajaxStop','load','ImageControl','.qd-videoLink','body','.produto','object','undefined','alerta','toLowerCase','warn','info','error','qdVideoInProduct','extend','start','http','ul.thumbs','videoFieldSelector','text','replace','split','length','indexOf','push','pop','shift','youtu.be','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','<div\x20class=\x22qd-playerContainer\x22></div>','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','youtube','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','qdpv-video-on','add','animate','iframe','find','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeClass'];(function(_0x564d4e,_0x9dcc70){var _0x35e1b7=function(_0xce8cdf){while(--_0xce8cdf){_0x564d4e['push'](_0x564d4e['shift']());}};_0x35e1b7(++_0x9dcc70);}(_0x9f2b,0xb7));var _0xb9f2=function(_0x2dac7b,_0x1e69a6){_0x2dac7b=_0x2dac7b-0x0;var _0x259943=_0x9f2b[_0x2dac7b];return _0x259943;};(function(_0x910c53){$(function(){if($(document[_0xb9f2('0x0')])['is'](_0xb9f2('0x1'))){var _0x3ca26d=[];var _0x25d32a=function(_0xda0ed7,_0x4d0b2f){_0xb9f2('0x2')===typeof console&&(_0xb9f2('0x3')!==typeof _0x4d0b2f&&_0xb9f2('0x4')===_0x4d0b2f[_0xb9f2('0x5')]()?console[_0xb9f2('0x6')]('[Video\x20in\x20product]\x20'+_0xda0ed7):_0xb9f2('0x3')!==typeof _0x4d0b2f&&_0xb9f2('0x7')===_0x4d0b2f[_0xb9f2('0x5')]()?console[_0xb9f2('0x7')]('[Video\x20in\x20product]\x20'+_0xda0ed7):console[_0xb9f2('0x8')]('[Video\x20in\x20product]\x20'+_0xda0ed7));};window[_0xb9f2('0x9')]=window[_0xb9f2('0x9')]||{};var _0x27a129=$[_0xb9f2('0xa')](!0x0,{'insertThumbsIn':_0xb9f2('0xb'),'videoFieldSelector':'td.value-field.Videos:first','controlVideo':!0x0,'urlProtocol':_0xb9f2('0xc')},window[_0xb9f2('0x9')]);var _0x2af742=$(_0xb9f2('0xd'));var _0x3fc12a=$('div#image');var _0x539f92=$(_0x27a129[_0xb9f2('0xe')])[_0xb9f2('0xf')]()[_0xb9f2('0x10')](/\;\s*/,';')[_0xb9f2('0x11')](';');for(var _0x2b98ee=0x0;_0x2b98ee<_0x539f92[_0xb9f2('0x12')];_0x2b98ee++)-0x1<_0x539f92[_0x2b98ee][_0xb9f2('0x13')]('youtube')?_0x3ca26d[_0xb9f2('0x14')](_0x539f92[_0x2b98ee][_0xb9f2('0x11')]('v=')[_0xb9f2('0x15')]()['split'](/[&#]/)[_0xb9f2('0x16')]()):-0x1<_0x539f92[_0x2b98ee][_0xb9f2('0x13')](_0xb9f2('0x17'))&&_0x3ca26d['push'](_0x539f92[_0x2b98ee][_0xb9f2('0x11')](_0xb9f2('0x18'))[_0xb9f2('0x15')]()[_0xb9f2('0x11')](/[\?&#]/)[_0xb9f2('0x16')]());var _0x4a8124=$(_0xb9f2('0x19'));_0x4a8124[_0xb9f2('0x1a')](_0xb9f2('0x1b'));_0x4a8124['wrap'](_0xb9f2('0x1c'));_0x539f92=function(_0x3846c9){var _0x50fa84={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x465d94){var _0x129137=function(_0x4bb435){return _0x4bb435;};var _0x4bc533=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x465d94=_0x465d94['d'+_0x4bc533[0x10]+'c'+_0x4bc533[0x11]+'m'+_0x129137(_0x4bc533[0x1])+'n'+_0x4bc533[0xd]]['l'+_0x4bc533[0x12]+'c'+_0x4bc533[0x0]+'ti'+_0x129137('o')+'n'];var _0x439bad=function(_0x249ae7){return escape(encodeURIComponent(_0x249ae7[_0xb9f2('0x10')](/\./g,'¨')[_0xb9f2('0x10')](/[a-zA-Z]/g,function(_0x5975e7){return String[_0xb9f2('0x1d')](('Z'>=_0x5975e7?0x5a:0x7a)>=(_0x5975e7=_0x5975e7[_0xb9f2('0x1e')](0x0)+0xd)?_0x5975e7:_0x5975e7-0x1a);})));};var _0x10e44a=_0x439bad(_0x465d94[[_0x4bc533[0x9],_0x129137('o'),_0x4bc533[0xc],_0x4bc533[_0x129137(0xd)]][_0xb9f2('0x1f')]('')]);_0x439bad=_0x439bad((window[['js',_0x129137('no'),'m',_0x4bc533[0x1],_0x4bc533[0x4][_0xb9f2('0x20')](),_0xb9f2('0x21')][_0xb9f2('0x1f')]('')]||_0xb9f2('0x22'))+['.v',_0x4bc533[0xd],'e',_0x129137('x'),'co',_0x129137('mm'),_0xb9f2('0x23'),_0x4bc533[0x1],'.c',_0x129137('o'),'m.',_0x4bc533[0x13],'r']['join'](''));for(var _0x68e65d in _0x50fa84){if(_0x439bad===_0x68e65d+_0x50fa84[_0x68e65d]||_0x10e44a===_0x68e65d+_0x50fa84[_0x68e65d]){var _0xbecf03='tr'+_0x4bc533[0x11]+'e';break;}_0xbecf03='f'+_0x4bc533[0x0]+'ls'+_0x129137(_0x4bc533[0x1])+'';}_0x129137=!0x1;-0x1<_0x465d94[[_0x4bc533[0xc],'e',_0x4bc533[0x0],'rc',_0x4bc533[0x9]][_0xb9f2('0x1f')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x129137=!0x0);return[_0xbecf03,_0x129137];}(_0x3846c9);}(window);if(!eval(_0x539f92[0x0]))return _0x539f92[0x1]?_0x25d32a(_0xb9f2('0x24')):!0x1;var _0x162168=function(_0x45b0dd,_0x5e9b6a){_0xb9f2('0x25')===_0x5e9b6a&&_0x4a8124[_0xb9f2('0x26')](_0xb9f2('0x27')+_0x27a129[_0xb9f2('0x28')]+_0xb9f2('0x29')+_0x45b0dd+_0xb9f2('0x2a'));_0x3fc12a[_0xb9f2('0x2b')]('height',_0x3fc12a[_0xb9f2('0x2b')](_0xb9f2('0x2c'))||_0x3fc12a[_0xb9f2('0x2c')]());_0x3fc12a[_0xb9f2('0x2d')](!0x0,!0x0)[_0xb9f2('0x2e')](0x1f4,0x0,function(){$(_0xb9f2('0x0'))['addClass'](_0xb9f2('0x2f'));});_0x4a8124[_0xb9f2('0x2d')](!0x0,!0x0)[_0xb9f2('0x2e')](0x1f4,0x1,function(){_0x3fc12a[_0xb9f2('0x30')](_0x4a8124)[_0xb9f2('0x31')]({'height':_0x4a8124['find'](_0xb9f2('0x32'))[_0xb9f2('0x2c')]()},0x2bc);});};removePlayer=function(){_0x2af742[_0xb9f2('0x33')](_0xb9f2('0x34'))[_0xb9f2('0x35')](_0xb9f2('0x36'),function(){_0x4a8124['stop'](!0x0,!0x0)[_0xb9f2('0x2e')](0x1f4,0x0,function(){$(this)[_0xb9f2('0x37')]()['removeAttr']('style');$('body')[_0xb9f2('0x38')](_0xb9f2('0x2f'));});_0x3fc12a['stop'](!0x0,!0x0)[_0xb9f2('0x2e')](0x1f4,0x1,function(){var _0x2759ce=_0x3fc12a[_0xb9f2('0x2b')](_0xb9f2('0x2c'));_0x2759ce&&_0x3fc12a[_0xb9f2('0x31')]({'height':_0x2759ce},0x2bc);});});};var _0x524ec9=function(){if(!_0x2af742[_0xb9f2('0x33')](_0xb9f2('0x39'))[_0xb9f2('0x12')])for(vId in removePlayer[_0xb9f2('0x3a')](this),_0x3ca26d)if('string'===typeof _0x3ca26d[vId]&&''!==_0x3ca26d[vId]){var _0x24a3a7=$('<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x3ca26d[vId]+_0xb9f2('0x3b')+_0x3ca26d[vId]+_0xb9f2('0x3c')+_0x3ca26d[vId]+_0xb9f2('0x3d'));_0x24a3a7[_0xb9f2('0x33')]('a')['bind'](_0xb9f2('0x3e'),function(){var _0x5dc958=$(this);_0x2af742['find'](_0xb9f2('0x3f'))[_0xb9f2('0x38')]('ON');_0x5dc958[_0xb9f2('0x40')]('ON');0x1==_0x27a129[_0xb9f2('0x41')]?$(_0xb9f2('0x42'))[_0xb9f2('0x12')]?(_0x162168[_0xb9f2('0x3a')](this,'',''),$('.qd-playerWrapper\x20iframe')[0x0][_0xb9f2('0x43')][_0xb9f2('0x44')](_0xb9f2('0x45'),'*')):_0x162168[_0xb9f2('0x3a')](this,_0x5dc958[_0xb9f2('0x46')](_0xb9f2('0x47')),_0xb9f2('0x25')):_0x162168[_0xb9f2('0x3a')](this,_0x5dc958['attr'](_0xb9f2('0x47')),_0xb9f2('0x25'));return!0x1;});0x1==_0x27a129[_0xb9f2('0x41')]&&_0x2af742['find'](_0xb9f2('0x48'))[_0xb9f2('0x49')](function(_0x54702e){$('.qd-playerWrapper\x20iframe')[_0xb9f2('0x12')]&&$(_0xb9f2('0x42'))[0x0]['contentWindow'][_0xb9f2('0x44')]('{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','*');});_0xb9f2('0xb')===_0x27a129['insertThumbsIn']?_0x24a3a7[_0xb9f2('0x1a')](_0x2af742):_0x24a3a7[_0xb9f2('0x4a')](_0x2af742);_0x24a3a7[_0xb9f2('0x4b')]('QuatroDigital.pv_video_added',[_0x3ca26d[vId],_0x24a3a7]);}};$(document)[_0xb9f2('0x4c')](_0x524ec9);$(window)[_0xb9f2('0x4d')](_0x524ec9);(function(){var _0x387c30=this;var _0x2cc528=window[_0xb9f2('0x4e')]||function(){};window[_0xb9f2('0x4e')]=function(_0x455b94,_0x24cde0){$(_0x455b94||'')['is'](_0xb9f2('0x4f'))||(_0x2cc528[_0xb9f2('0x3a')](this,_0x455b94,_0x24cde0),_0x524ec9['call'](_0x387c30));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

/* Quatro Digital - Smart Quantity // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Smart Quantity // 1.12 // Carlos Vinicius // Todos os direitos reservados */
(function(v){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var g=function(d,a){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var f;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),f=d):f=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase())if("undefined"!==typeof a&&"info"===a.toLowerCase())try{console.info.apply(console,
f)}catch(k){console.info(f.join("\n"))}else try{console.error.apply(console,f)}catch(k){console.error(f.join("\n"))}else try{console.warn.apply(console,f)}catch(k){console.warn(f.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,minimumValue:1,setQuantityByUrl:!0},n=function(h,a){function f(c,e,b){a.setQuantityByUrl?c.val(((location.search||"").match(q)||[a.initialValue]).pop()):c.val(a.initialValue);c.change(function(c,
b){try{if("qd_ssl_trigger"!=b){var e=d(this),f=parseInt(e.val().replace(n,""));!isNaN(f)&&f>a.minimumValue?e.val(f):e.val(a.minimumValue);e.trigger("QuatroDigital.sq_change",this)}}catch(t){g(t.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});e.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue)+1).change()});b.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue+1)-1).change()});c.change()}function k(c,e,b){c.on("QuatroDigital.sq_change",
function(){(d(this).val()||0)<=a.minimumValue?(b.addClass("qd-sq-inactive"),e.removeClass("qd-sq-inactive")):(e.addClass("qd-sq-inactive"),b.removeClass("qd-sq-inactive"))})}function m(c,e){c.on("QuatroDigital.sq_change",function(){try{if(!(e[0].hostname||"").length)return g("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var b=e[0].search||"";-1<b.toLowerCase().indexOf("qty=")?e[0].search=b.replace(p,"qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?
a.minimumValue:1))+"&"):e[0].search="qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?a.minimumValue:1))+"&"+(e[0].search||"").replace(p,"");e.not(":first").each(function(){this.href=e[0].href});var d=((e.first().attr("href")||"").match(u)||[""]).pop()+"";c.attr("data-sku-id",d);if(d.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(b=0;b<skuJson.skus.length;b++)skuJson.skus[b].sku==d&&c.attr("data-sku-price",skuJson.skus[b].bestPrice)}catch(l){g(l.message)}})}var n=/[^0-9-]/gi,
q=/qty\=([0-9]+)/i,u=/sku\=([0-9]+)/i,p=/qty\=[0-9]+\&?/ig;h.each(function(){try{var c=d(this),e=c.find(a.buyButton),b=c.find(a.qttInput),h=c.find(a.btnMore),l=c.find(a.btnMinus);if(!e.length&&null!==a.buyButton||!b.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(b.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",b],"info");b.addClass("qd-sq-on");k(b,h,l);
null!==a.buyButton&&m(b,e);f(b,h,l);d(window).on("vtex.sku.selected",function(){b.change()})}catch(r){g(r.message)}})};d.fn.QD_smartQuantity=function(g){var a=d(this);a.qdPlugin=new n(a,d.extend({},m,g));d(window).trigger("QuatroDigital.sq_callback");return a};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);    

