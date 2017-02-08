/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

try {
	var Common = {
		run: function() {},
		init: function() {
			// Home.modalNewsletter();
			Common.bannersCount();
			Common.amazingMenu();
			Common.clickActiveMiniCartMobile();
			Common.floatBarMiniCart();
			Common.setScrollToggle();
			Common.smartCart();
			Common.cartAddProduct();
			Common.qdOverlay();
		},
		ajaxStop: function() {},
		windowOnload: function() {
			Common.facebookLikebox();
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on qd-rs-on qd-bb-lightBoxBodyProdAdd',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		cartAddProduct: function() {
			var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('qd-v1-modal-add-product-cart').addClass('modal').removeClass('qd-v1-modal');

			modal.find('.modal-body').append('<p><i class="fa fa-check-circle" aria-hidden="true"></i> Produto adicionado com sucesso!</p>');

			$(window).on("cartProductAdded.vtex", function() {
				modal.modal();

				// setTimeout(function() {
				// 	modal.modal('hide');
				// }, 3000);
			});
		},
		setScrollToggle: function() {
			if($(document.body).is('.vstm') || $(document.body).is('.pinkgym')) {
				$("body").attr("data-qd-scroll-limit", 120);
				return;
			}
			$("body").attr("data-qd-scroll-limit", 200);
		},
		bannersCount: function() {
			$(".box-banner").parent().each(function() {
				var $t = $(this);
				$t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
			});
		},
		floatBarMiniCart: function() {
			var miniCart = $(".show-minicart-on-hover");
			$(".floating-qd-v1-content .header-qd-v1-cart").mouseenter(function() {
				miniCart.not(this).mouseover();
			});
		},
		amazingMenu: function() {
			$(".header-qd-v3-main-amazing-menu").QD_amazingMenu();

			// Amazing Menu Responsivo
			$(".header-qd-v3-amazing-menu-toggle").click(function(){
				$("body").toggleClass('qd-am-on');
			});

			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-am-on');
			});


			$(".header-qd-v3-main-amazing-menu-mobile").QD_amazingMenu();
			$('.header-qd-v3-main-amazing-menu-mobile > ul > .qd-am-has-ul > a, .header-qd-v2-main-amazing-menu-mobile > .qd-am-has-ul > li > p').click(function(evt){
				evt.preventDefault();

				var $t = $(this);
				$t.toggleClass('qd-on');
				$t.next('ul').slideToggle();
			});
		},
		facebookLikebox: function() {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/" data-width="100%" data-height="290px" data-hide-cover="false" data-show-facepile="true" data-show-posts="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/"><a href="https://www.facebook.com/">Quatro Digital</a></blockquote></div></div>');
		},
		clickActiveMiniCartMobile: function(){
			if ($(window).width() <= 767) {
				$(".cart-click-active-mobile, .floating-qd-v1-content .header-qd-v1-cart a").click(function(evt) {
					evt.preventDefault();
					$(".v2-vtexsc-cart").toggleClass('cart-show');
				});
			};
		},
		formCadastreMask: function() {
			var form = $(".modal form.form-first-step");

			if (!form.length || typeof $.fn.mask !== "function")
				return;

			form.find('[name=cnpj]').mask('00.000.000/0000-00');
			form.find('[name=cpf]').mask('000.000.000-00');
			form.find('[name=tel_comercial]').mask('(00) 0000-00009');
			form.find('[name=tel_celular]').mask('(00) 0000-00009');
			form.find('[name=cep]').mask('00000-000');
			form.find('[name=insc_estadual]').mask('###.###.###.###.###');
		},
		smartCart:function(){

			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"> <div class="qd-sc-wrapper"></div> </div>');

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
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Carrinho</h3></div>');
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
					buyButton: "body .prateleira .buy-button"
				}
			});

			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$.fn.simpleCart(true);
				$(".shelf-qd-v2-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$(".header-qd-v3-cart a").click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$(".components-qd-v1-overlay, .qd_ddc_lightBoxClose").click(function(evt){
				$(document.body).removeClass('qd-cart-show');
			});
		}
	};

	var Home = {
		init: function() {
			Home.cycle2();
			Home.bannerResponsive();
			Home.mosaicAdjustment(); // Chamar depois do "bannerResponsive"
			Home.homeShelfCarousel();
			Home.mosaicSetCol();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		cycle2: function() {
			if(typeof $.fn.cycle !== "function")
				return;

			var elem = $(".slider-qd-v1-full-wrapper");
			elem.find(".box-banner").each(function() {
				var $t = $(this);
				$t.attr("data-cycle-pager-template", "<div class='cycle-pager-item'><span class='slider-pager-content'>" + $t.find("img").attr("alt") + "</span></div>");
			});
			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ">.slider-qd-v1-responsive-pager",
				prev: ">.slider-qd-v1-cycle-prev",
				next: ">.slider-qd-v1-cycle-next",
				pauseOnHover: true
			});
		},
		bannerResponsive : function(){
			$(".qd-mosaic-wrapper .box-banner a, .banner-qd-v1-browse-by-brand .box-banner a, .qd-banner-responsive .box-banner a").each(function(){
				var $t = $(this);
				var cols = [];

				var href = $t.attr("href") || "";
				if(!href.length)
					return;

				$t.attr("href", href.replace(/(col-)?(xs|sm|md|lg)-[0-9]{1,2},?/ig, function(match){
					var str = match.replace(",", "").toLowerCase();
					cols.push( str.substr(0,4) === "col-" ? str : "col-" + str );
					return "";
				}));

				$t.parent().addClass( cols.length ? cols.join(" ") : "col-xs-12 col-sm-12" );
			});
		},
		mosaicAdjustment: function() {
			mosaicAddRow($(".qd-mosaic-wrapper >div:not(.row)"));

			function mosaicAddRow(wrapper) {
				var firstTop;
				var items = new $;

				if(!wrapper.length)
					return;

				wrapper.each(function(){
					var $t = $(this);
					var offsetTop = $t.offset().top;

					if (!firstTop)
						firstTop = offsetTop;

					if (offsetTop >= firstTop - 10 && offsetTop <= firstTop + 10)
						items = items.add($t);
					else
						return false;
				});

				items.wrapAll('<div class="row"></div>');
				mosaicAddRow($(".qd-mosaic-wrapper > div:not(.row)"));
			}
		},
		homeShelfCarousel: function() {
			var wrapper = $('.shelf-qd-v2-carousel');

			// Titulo
			wrapper.find('.prateleira').each(function(){
				var wrap = $(this);

				wrap.find("h2").addClass('heading-3 shelf-qd-v2-title').wrapInner("<span></span>").insertBefore(wrap);
			});

			wrapper.find('.prateleira').owlCarousel({
				items: 4,
				itemsDesktopSmall: [991,3],
				navigation: true,
				pagination: false
			});
		},
		mosaicSetCol: function() {
			$(".banner-qd-v1-responsive .box-banner").QD_mosaicBanners();
		},
		modalNewsletter: function() {
			var modal = $(".qd-v1-modal");
			var html = $('<div class="content-news"> <form novalidate="1"> <div class="qd_news"> <div class="row form-row"> <input type="text" name="name" class="qd_news_name input-type-text-ghost form-control" /> <input type="text" name="email" class="qd_news_email input-type-text-ghost form-control" /> </div> <div class="row form-row"> <button class="qd_news_button">Enviar</button> <a href="/politica-de-privacidade" style="display: none;" class="link-politica-privacidade-modal">Politica de privacidade</a> </div> </div> <span class="content-close"> <i class="btn-close ico-close" data-dismiss="modal"></i> </span> </form> </div>');
			var inputSuccess = $('<div class="row form-row"><input type="text" name="name" class="qd_success input-type-text-ghost form-control" /></div>');

			modal.on("hidden.bs.modal", function(){
				modal.removeClass("qd-v1-newsletter-modal");
				html.trigger("QuatroDigital.cf_close");
				$(document.body).removeClass('modal-open');
			});

			html.QD_cookieFn({
				cookieName: "newsletter",
				close: "",
				expireDays: 7,
				show: function($elem){
					modal.find(".modal-body").empty().append(html);
					modal.addClass("qd-v1-newsletter-modal");
					modal.modal();
					$(document.body).addClass('modal-open');

					html.QD_news({
						defaultEmail: "Digite seu e-mail",
						checkNameFieldIsVisible: false,
						successCallback: function (e) {
							$(".qd-v1-newsletter-modal").addClass("qd-v1-newsletter-modal-finish");

							try {
								lc.sendData({
									evento: "Cadastro Cliente Newslleter",
									nm_email: e.postData.newsletterClientEmail,
									vars: {},
									lista: {
										nm_lista: "Newsletter_do_site",
									}
								});
							}
							catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas no GTM :( . Detalhes: " + e.message)); }
						}
					});

				},
				hide: function($elem){}
			});
		},
		hotsiteProductImageBig: function() {
			$('.shelf-qd-v2-big img').each(function() {
				var $t = $(this);
				var url = $t.attr('src').replace(/(ids\/[0-9]+\-)[0-9]+\-[0-9]+/i, '$1470-470');
				$t.attr('src', url);
				$t.removeAttr('width height');
			});
		}
	};

	var Departament = {
		init: function() {
			Search.shelfLineFix();
			Search.openFiltersMenu();
		},
		ajaxStop: function() {
			Search.shelfLineFix();
		},
		windowOnload: function() {
			Search.shelfLineFix();
		},
	};

	var Search = {
	    init: function() {
	        Search.shelfLineFix();
	        Search.openFiltersMenu();
	    },
	    ajaxStop: function() {
	        Search.shelfLineFix();
	    },
	    windowOnload: function() {
	        Search.shelfLineFix();
	    },
	    shelfLineFix: function() {
	        try {
	            var exec = function() {
	                var curTop;
	                var wrapper = $("div[id*='ResultItems_'] >.prateleira:not('.qd-fi-on')").addClass('qd-fi-on');

	                var shelf = wrapper.children("ul").removeClass('qd-first-line');
	                shelf.first().addClass("qd-first-line");

	                var setFirst = function() {
	                    shelf.each(function() {
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
	                $(window).on("resize.qd", function() {
	                    clearTimeout(timeOut);
	                    timeOut = setTimeout(function() {
	                        $(".qd-first-line").removeClass(".qd-first-line");
	                        exec();
	                    }, 20);
	                });
	            }
	        } catch (e) {
	            (typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message));
	        }
	    },
	    openFiltersMenu: function() {
			$('.search-qd-v1-menu-toggle').click(function(e) {
				e.preventDefault();
				$(document.body).toggleClass('qd-sn-on');
			});

			$('.qd-am-overlay').click(function(){
				$(document.body).removeClass('qd-sn-on');
			});
		}
	};

	var Product = {
		run: function() {},
		init: function() {
			Product.seeDescription();
			Product.openShipping();
			Product.checkBuyTogether();
			Product.checkSpecification();
			Product.currentColorThumb();
			Product.paymentFix();
			Product.openPaymentMethods();
			Home.homeShelfCarousel();
			// Product.qdProductCollectionsWrapCarousel(); // Chamar este metodo sempre por último
		},

		ajaxStop: function() {},
		windowOnload: function() {},
		seeDescription: function() {
			$(".product-qd-v2-link-description").click(function(e){
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".product-qd-v2-description").offset().top - 100
				}, 900, 'swing');
			});
		},
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		currentColorThumb: function() {
			var ul = $(".sku-qd-v1-color-similar .prateleira >ul:first");
			var newUl = ul.clone();

			newUl.find("img").attr("src", skuJson.skus[0].image);
			newUl.find("a").attr("href", "").addClass("qd-sku-selected");
			newUl.insertBefore(ul);

			if ($(document.body).is('.vstm') || $(document.body).is('.pinkgym'))
				$('.sku-qd-v1-color-similar .prateleira h2').attr('data-selected-item' , '( '+$('.productName').text()+' )' );
		},
		qdProductCollectionsWrapCarousel: function() {
			$('.qd-collections-wrap').find('.prateleira').each(function(){
				var $this = $(this);

				$this.find("h2").addClass('heading-3').insertBefore($this);

				$this.owlCarousel({
					items : 4,
					navigation: true,
					pagination: false
				});
			});
		},
		checkBuyTogether: function(){
			if ($(document.body).is('.vstm'))
				return;

			var wrapper = $(".product-qd-v2-area-placeholder-buy-together");

			if (wrapper.find('.buy-together-content > *').length <= 0)
				wrapper.find('> .col-sm-6').removeClass('col-sm-6').addClass('col-sm-12');

			$(".product-qd-v2-area-placeholder-buy-together").find('.prateleira').each(function(){
				var $this = $(this);

				$this.find("h2").addClass('heading-3').insertBefore($this);

				$this.owlCarousel({
					items : 2,
					navigation: true,
					pagination: false
				});
			});
		},
		checkSpecification: function() {
			if ($(document.body).is('.vstm'))
				return;

			if ($(".product-qd-v2-specification #caracteristicas > *").length <= 0)
				$(".product-qd-v2-description").parent().removeClass('col-sm-5').addClass('col-sm-12');
		},
		paymentFix: function(){
			var newUl,elem,li,l;

			newUl=$("<ul class='firstInstallments'></ul>");
			newUl2=$("<ul class='secondInstallments'></ul>");
			elem=$('.other-payment-method');
			li=elem.find('li');

			// Ordem crescente
			l=Math.ceil(li.length/2);
			for(var i = 0; i < l; i++){
				li.eq(i).clone().prependTo(newUl);
				li.eq(i+l).clone().prependTo(newUl);
			}
			elem.find('ul:first').after(newUl);

			// Ordem decrescente
			l=Math.ceil(li.length/2);
			for(var i = 0; i < l; i++){
				li.eq(i).clone().appendTo(newUl2);
				li.eq(i+l).clone().appendTo(newUl2);
			}
			elem.find('ul:first').after(newUl2);
		},
		openPaymentMethods: function() {
			$(".product-qd-v2-see-other-payment-method").click(function(){
				$('.product-qd-v2-other-payment-method').toggleClass('qd-on');
			});

			$('.product-qd-v2-other-payment-method .qd-close').click(function(){
				$('.product-qd-v2-other-payment-method').removeClass('qd-on');
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
			Institutional.sidemenuToggleInstitutional();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sidemenuToggleInstitutional: function() {
			// Amazing Menu Responsivo
			$(".institucional-qd-v1-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});

			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
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
			else if (body.is(".departamento, .categoria")) Departament.windowOnload();
			else if (body.is(".resultado-busca")) Search.windowOnload();
			else if (body.is(".produto")) Product.windowOnload();
			else if (body.is(".listas")) List.windowOnload();
			else if (body.is(".institucional")) Institutional.windowOnload();
			else if (body.is(".orders")) Orders.windowOnload();
		};

		ajaxStop = function() {
			Common.ajaxStop();
			if (body.is(".home")) Home.ajaxStop();
			else if (body.is(".departamento, .categoria")) Departament.ajaxStop();
			else if (body.is(".resultado-busca")) Search.ajaxStop();
			else if (body.is(".produto")) Product.ajaxStop();
			else if (body.is(".listas")) List.ajaxStop();
			else if (body.is(".institucional")) Institutional.ajaxStop();
			else if (body.is(".orders")) Orders.ajaxStop();
		};

		$(function() {
			body = $(document.body);
			Common.init();
			if (body.is(".home")) Home.init();
			else if (body.is(".departamento, .categoria")) Departament.init();
			else if (body.is(".resultado-busca")) Search.init();
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

/* Quatro Digital Newsletter // 5.0 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function(){var f=jQuery;if("function"!==typeof f.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(f,l){}};f.fn.QD_news=function(r){var l=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var g;"object"===typeof a?(a.unshift("[QD News]\n"),g=a):g=["[QD News]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===
d.toLowerCase())try{console.info.apply(console,g)}catch(b){console.info(g.join("\n"))}else try{console.error.apply(console,g)}catch(f){console.error(g.join("\n"))}else try{console.warn.apply(console,g)}catch(e){console.warn(g.join("\n"))}}},h=f(this);if(!h.length)return h;var a=f.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof f.fn.vtexPopUp2)return l("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
h;var q=function(f){var d,g,b;g=0;d=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&d();g++})})};b=function(){f.fadeTo(a.animateSpeed,.2,function(){f.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&b();g++})})};f.stop(!0,!0);"leftRight"==a.animation?d():"blink"==a.animation&&b()};h.each(function(){var h,d,g,b=f(this),k=b.find(a.nameField),e=b.find(a.emailField),m=b.find(a.btn);"animateField"!=
a.validationMethod&&(d=b.find(a.elementError),g=b.find(a.elementSuccess));1>k.length&&a.checkNameExist&&l("Campo de nome, n\u00e3o encontrado ("+k.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>e.length)return l("Campo de e-mail, n\u00e3o encontrado ("+e.selector+")"),b;if(1>m.length)return l("Bot\u00e3o de envio, n\u00e3o encontrado ("+m.selector+")"),b;if("animateField"!=a.validationMethod&&(1>g.length||1>d.length))return l("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
g.selector+", "+d.selector+")"),b;a.setDefaultName&&k.is("input[type=text], textarea")&&k.val(a.defaultName);e.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var c=k.filter(":visible");if(!c.length)return}else c=k;var b=c.val();c.is("input:text, textarea")&&c.bind({focus:function(){c.val()!=b||0!==c.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||c.val("")},blur:function(){""===c.val()&&c.val(b)}})}})();(function(){var c;c=e.val();e.bind({focus:function(){e.val()==
c&&0===e.val().search(a.defaultEmail.substr(0,6))&&e.val("")},blur:function(){""===e.val()&&e.val(c)}})})();h=function(){var c,e,h,k;e=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();h=b.find(a.nameField).is(":visible");h=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||h?h:!0):!1;k=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(h||k)"animateField"==a.validationMethod?(h&&q(b.find(a.nameField)),k&&q(b.find(a.emailField))):"popup"==a.validationMethod?d.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(d.slideDown().bind("click",function(){f(this).slideUp()}),
setTimeout(function(){d.slideUp()},1800));else if(a.allowSubmit()){m.attr("disabled","disabled");var n={postData:{newsletterClientEmail:c,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:m,wrapper:b};"linx"===a.platform&&(n.postData.nome=n.postData.newsletterClientName,n.postData.email=n.postData.newsletterClientEmail);f.ajax({url:"linx"===a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:n.postData,success:function(c){var e,h,d;m.removeAttr("disabled");if("linx"===a.platform&&!(-1<c.indexOf(" com sucesso.")||-1<c.indexOf(" cadastrado.")))return alert(c);"popup"==a.validationMethod?g.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&g.slideDown().bind("click",function(){f(this).slideUp()});d=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&
b.find(a.nameField).val(a.defaultName);e=function(){d.val(a.defaultEmail)};"animateField"==a.validationMethod?(d.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),d.addClass("vtexNewsSuccess"),h=setTimeout(function(){d.removeClass("vtexNewsSuccess");e();d.unbind("focus.vtexNews")},a.timeHideSuccessMsg),d.bind("focus.vtexNews",function(){d.removeClass("vtexNewsSuccess");clearTimeout(h);f(this).val("");f(this).unbind("focus.vtexNews")})):e();a.successCallback(n);f(window).trigger("qdNewsSuccessCallback",
n)}});a.submitCallback(c,e)}else l("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),h())};k.filter("input:text, textarea").bind("keydown",p);e.bind("keydown",p);p=m.getParent("form");p.length?p.submit(function(a){a.preventDefault();h()}):m.bind("click.qd_news",function(){h()})});return h};f(function(){f(".qd_news_auto").QD_news()})}})();
/*http://phpjs.org/functions/utf8_encode/*/
function utf8_encode(b){if(null===b||"undefined"===typeof b)return"";b+="";var d="",f,g,h=0;f=g=0;for(var h=b.length,e=0;e<h;e++){var a=b.charCodeAt(e),c=null;if(128>a)g++;else if(127<a&&2048>a)c=String.fromCharCode(a>>6|192,a&63|128);else if(55296!=(a&63488))c=String.fromCharCode(a>>12|224,a>>6&63|128,a&63|128);else{if(55296!=(a&64512))throw new RangeError("Unmatched trail surrogate at "+e);c=b.charCodeAt(++e);if(56320!=(c&64512))throw new RangeError("Unmatched lead surrogate at "+(e-1));a=((a&1023)<<
10)+(c&1023)+65536;c=String.fromCharCode(a>>18|240,a>>12&63|128,a>>6&63|128,a&63|128)}null!==c&&(g>f&&(d+=b.slice(f,g)),d+=c,f=g=e+1)}g>f&&(d+=b.slice(f,h));return d};
/*http://phpjs.org/functions/md5/*/
if("function"!==typeof qd_md5)var qd_md5=function(p){var h=function(b,a){var d,c,f,e,g;f=b&2147483648;e=a&2147483648;d=b&1073741824;c=a&1073741824;g=(b&1073741823)+(a&1073741823);return d&c?g^2147483648^f^e:d|c?g&1073741824?g^3221225472^f^e:g^1073741824^f^e:g^f^e},k=function(b,a,d,c,f,e,g){b=h(b,h(h(a&d|~a&c,f),g));return h(b<<e|b>>>32-e,a)},l=function(b,a,d,c,f,e,g){b=h(b,h(h(a&c|d&~c,f),g));return h(b<<e|b>>>32-e,a)},m=function(b,a,c,d,e,f,g){b=h(b,h(h(a^c^d,e),g));return h(b<<f|b>>>32-f,a)},n=
function(b,a,c,d,f,e,g){b=h(b,h(h(c^(a|~d),f),g));return h(b<<e|b>>>32-e,a)},q=function(b){var a="",c="",d;for(d=0;3>=d;d++)c=b>>>8*d&255,c="0"+c.toString(16),a+=c.substr(c.length-2,2);return a},e=[],f,r,t,u,v,b,a,d,c;p=this.utf8_encode(p);e=function(b){var a,c=b.length;a=c+8;for(var d=16*((a-a%64)/64+1),e=Array(d-1),f=0,g=0;g<c;)a=(g-g%4)/4,f=g%4*8,e[a]|=b.charCodeAt(g)<<f,g++;a=(g-g%4)/4;e[a]|=128<<g%4*8;e[d-2]=c<<3;e[d-1]=c>>>29;return e}(p);b=1732584193;a=4023233417;d=2562383102;c=271733878;p=
e.length;for(f=0;f<p;f+=16)r=b,t=a,u=d,v=c,b=k(b,a,d,c,e[f+0],7,3614090360),c=k(c,b,a,d,e[f+1],12,3905402710),d=k(d,c,b,a,e[f+2],17,606105819),a=k(a,d,c,b,e[f+3],22,3250441966),b=k(b,a,d,c,e[f+4],7,4118548399),c=k(c,b,a,d,e[f+5],12,1200080426),d=k(d,c,b,a,e[f+6],17,2821735955),a=k(a,d,c,b,e[f+7],22,4249261313),b=k(b,a,d,c,e[f+8],7,1770035416),c=k(c,b,a,d,e[f+9],12,2336552879),d=k(d,c,b,a,e[f+10],17,4294925233),a=k(a,d,c,b,e[f+11],22,2304563134),b=k(b,a,d,c,e[f+12],7,1804603682),c=k(c,b,a,d,e[f+13],
12,4254626195),d=k(d,c,b,a,e[f+14],17,2792965006),a=k(a,d,c,b,e[f+15],22,1236535329),b=l(b,a,d,c,e[f+1],5,4129170786),c=l(c,b,a,d,e[f+6],9,3225465664),d=l(d,c,b,a,e[f+11],14,643717713),a=l(a,d,c,b,e[f+0],20,3921069994),b=l(b,a,d,c,e[f+5],5,3593408605),c=l(c,b,a,d,e[f+10],9,38016083),d=l(d,c,b,a,e[f+15],14,3634488961),a=l(a,d,c,b,e[f+4],20,3889429448),b=l(b,a,d,c,e[f+9],5,568446438),c=l(c,b,a,d,e[f+14],9,3275163606),d=l(d,c,b,a,e[f+3],14,4107603335),a=l(a,d,c,b,e[f+8],20,1163531501),b=l(b,a,d,c,e[f+
13],5,2850285829),c=l(c,b,a,d,e[f+2],9,4243563512),d=l(d,c,b,a,e[f+7],14,1735328473),a=l(a,d,c,b,e[f+12],20,2368359562),b=m(b,a,d,c,e[f+5],4,4294588738),c=m(c,b,a,d,e[f+8],11,2272392833),d=m(d,c,b,a,e[f+11],16,1839030562),a=m(a,d,c,b,e[f+14],23,4259657740),b=m(b,a,d,c,e[f+1],4,2763975236),c=m(c,b,a,d,e[f+4],11,1272893353),d=m(d,c,b,a,e[f+7],16,4139469664),a=m(a,d,c,b,e[f+10],23,3200236656),b=m(b,a,d,c,e[f+13],4,681279174),c=m(c,b,a,d,e[f+0],11,3936430074),d=m(d,c,b,a,e[f+3],16,3572445317),a=m(a,d,
c,b,e[f+6],23,76029189),b=m(b,a,d,c,e[f+9],4,3654602809),c=m(c,b,a,d,e[f+12],11,3873151461),d=m(d,c,b,a,e[f+15],16,530742520),a=m(a,d,c,b,e[f+2],23,3299628645),b=n(b,a,d,c,e[f+0],6,4096336452),c=n(c,b,a,d,e[f+7],10,1126891415),d=n(d,c,b,a,e[f+14],15,2878612391),a=n(a,d,c,b,e[f+5],21,4237533241),b=n(b,a,d,c,e[f+12],6,1700485571),c=n(c,b,a,d,e[f+3],10,2399980690),d=n(d,c,b,a,e[f+10],15,4293915773),a=n(a,d,c,b,e[f+1],21,2240044497),b=n(b,a,d,c,e[f+8],6,1873313359),c=n(c,b,a,d,e[f+15],10,4264355552),
d=n(d,c,b,a,e[f+6],15,2734768916),a=n(a,d,c,b,e[f+13],21,1309151649),b=n(b,a,d,c,e[f+4],6,4149444226),c=n(c,b,a,d,e[f+11],10,3174756917),d=n(d,c,b,a,e[f+2],15,718787259),a=n(a,d,c,b,e[f+9],21,3951481745),b=h(b,r),a=h(a,t),d=h(d,u),c=h(c,v);return(q(b)+q(a)+q(d)+q(c)).toLowerCase()};
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
/*! * Javascript Cookie v1.5.1 * https://github.com/js-cookie/js-cookie * * Copyright 2006, 2014 Klaus Hartl * Released under the MIT license */
(function(e){var l;if("function"===typeof define&&define.amd)define(["jquery"],e);else if("object"===typeof exports){try{l=require("jquery")}catch(n){}module.exports=e(l)}else{var m=window.Cookies,h=window.Cookies=e(window.jQuery);h.noConflict=function(){window.Cookies=m;return h}}})(function(e){function l(a){a=c.json?JSON.stringify(a):String(a);return c.raw?a:encodeURIComponent(a)}function n(a,r){var b;if(c.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g, "\\"));try{d=decodeURIComponent(d.replace(p," "));b=c.json?JSON.parse(d):d;break a}catch(e){}b=void 0}return h(r)?r(b):b}function m(){for(var a,c,b=0,d={};b<arguments.length;b++)for(a in c=arguments[b],c)d[a]=c[a];return d}function h(a){return"[object Function]"===Object.prototype.toString.call(a)}var p=/\+/g,c=function(a,e,b){if(1<arguments.length&&!h(e)){b=m(c.defaults,b);if("number"===typeof b.expires){var d=b.expires,k=b.expires=new Date;k.setMilliseconds(k.getMilliseconds()+864E5*d)}return document.cookie= [c.raw?a:encodeURIComponent(a),"=",l(e),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},k=document.cookie?document.cookie.split("; "):[],q=0,p=k.length;q<p;q++){var f=k[q].split("="),g;g=f.shift();g=c.raw?g:decodeURIComponent(g);f=f.join("=");if(a===g){d=n(f,e);break}a||void 0===(f=n(f))||(d[g]=f)}return d};c.get=c.set=c;c.defaults={};c.remove=function(a,e){c(a,"",m(e,{expires:-1})); return!c(a)};e&&(e.cookie=c,e.removeCookie=c.remove);return c});
var $Cookies = Cookies.noConflict();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* Quatro Digital Simple Cart // 4.14 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var b=jQuery;if("function"!==typeof b.fn.simpleCart){b(function(){var b=vtexjs.checkout.getOrderForm;vtexjs.checkout.getOrderForm=function(){return b.call()}});try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;b.fn.simpleCart=function(c,n,h){var d,k,g,f,l,p,q,r,m;k=function(a,b){if("object"===typeof console){var e="object"===typeof a;"undefined"!==typeof b&&"alerta"===b.toLowerCase()?e?console.warn("[Simple Cart]\n",a[0],
a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[Simple Cart]\n"+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?e?console.info("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Simple Cart]\n"+a):e?console.error("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Simple Cart]\n"+a)}};d=b(this);"object"===typeof c?n=c:(c=c||!1,d=d.add(b.QD_simpleCart.elements));if(!d.length)return d;b.QD_simpleCart.elements=b.QD_simpleCart.elements.add(d);h="undefined"===
typeof h?!1:h;f=b.extend({},{cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:"R$ ",showQuantityByItems:!0,smartCheckout:!0,callback:function(){}},n);g=b("");d.each(function(){var a=b(this);a.data("qd_simpleCartOpts")||a.data("qd_simpleCartOpts",f)});m=function(a){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var b=0,e=0,c=0;c<a.totalizers.length;c++)"Shipping"==a.totalizers[c].id&&(e+=a.totalizers[c].value),b+=a.totalizers[c].value;
window._QuatroDigital_CartData.total=f.currencySymbol+qd_number_format(b/100,2,",",".");window._QuatroDigital_CartData.shipping=f.currencySymbol+qd_number_format(e/100,2,",",".");window._QuatroDigital_CartData.allTotal=f.currencySymbol+qd_number_format((b+e)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(f.showQuantityByItems)for(c=0;c<a.items.length;c++)window._QuatroDigital_CartData.qtt+=a.items[c].quantity;else window._QuatroDigital_CartData.qtt=a.items.length||0;try{window._QuatroDigital_CartData.callback&&
window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(d){k("Problemas com o callback do Smart Cart")}r(g)};l=function(a,b){1===a?b.hide().filter(".singular").show():b.hide().filter(".plural").show()};q=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};p=function(a,b){var c;c=parseInt(window._QuatroDigital_CartData.qtt,10);b.$this.show();isNaN(c)&&(k("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.",
"alerta"),c=0);b.cartTotalE.html(window._QuatroDigital_CartData.total);b.cartQttE.html(c);l(c,b.itemsTextE);q(c)};r=function(a){d.each(function(){var d={},e;e=b(this);c&&e.data("qd_simpleCartOpts")&&b.extend(f,e.data("qd_simpleCartOpts"));d.$this=e;d.cartQttE=e.find(f.cartQtt)||g;d.cartTotalE=e.find(f.cartTotal)||g;d.itemsTextE=e.find(f.itemsText)||g;d.emptyElem=e.find(f.emptyCart)||g;p(a,d);e.addClass("qd-sc-populated")})};(function(){if(f.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||
{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(h?h:!c))return m(window._QuatroDigital_DropDown.getOrderForm);if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return k("N\u00e3o foi encontrada a biblioteca VTEX.js");b.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){m(a);window._QuatroDigital_DropDown.getOrderForm=
a},fail:function(a){k(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();f.callback();b(window).trigger("simpleCartCallback.quatro_digital");return d};b.QD_simpleCart={elements:b("")};b(function(){var c;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(c=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(l,h,d,k,g){c.call(this,l,h,d,k,function(){"function"===typeof g&&
g();b.QD_simpleCart.elements.each(function(){var c;c=b(this);c.simpleCart(c.data("qd_simpleCartOpts"))})})})});var l=window.ReloadItemsCart||void 0;window.ReloadItemsCart=function(c){b.fn.simpleCart(!0);"function"===typeof l?l.call(this,c):alert(c)};b(function(){var c=b(".qd_cart_auto");c.length&&c.simpleCart()});b(function(){b(window).bind("productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",function(){b.fn.simpleCart(!0)})})}catch(c){"undefined"!==typeof console&&"function"===typeof console.error&&
console.error("Oooops! ",c)}}})();
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);
/* Quatro Digital - Product Thumbs // 1.0 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs()}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return $.extend({},a,new b(a))},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/* Automatizador de comments box do Facebook // 1.5 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script[src*='connect.facebook.net/pt_BR/sdk.js']").filter("[src*='sdk.js']").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk", b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});
/* Quatro Digital - localStorage // 1.1 // Carlos Vinicius // Todos os direitos reservados */
(function(){var e=function(b,c){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var a;"object"===typeof b?(b.unshift("[Quatro Digital - localStorage]\n"),a=b):a=["[Quatro Digital - localStorage]\n"+b];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,a)}catch(d){console.info(a.join("\n"))}else try{console.error.apply(console,
a)}catch(e){console.error(a.join("\n"))}else try{console.warn.apply(console,a)}catch(f){console.warn(a.join("\n"))}}};window.qdLocalStorage=window.qdLocalStorage||{};var f="undefined"!==typeof localStorage&&"undefined"!==typeof localStorage.setItem&&"undefined"!==typeof localStorage.getItem;window.qdLocalStorage.setItem=function(b,c,a){try{if(!f)return!1;var d=new Date;localStorage.setItem(b,c);isNaN(parseInt(a))||(d.setTime(d.getTime()+6E4*a),localStorage.setItem(b+"_expiration",d.getTime()))}catch(g){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar salvar os dados no armazenamento local. Detalhes: ",
g.message],"alerta")}};window.qdLocalStorage.getItem=function(b){try{if(!f)return!1;var c=new Date,a=parseInt(localStorage.getItem(b+"_expiration")||0,10)||0;return c.getTime()>a?(localStorage.removeItem&&(localStorage.removeItem(b),localStorage.removeItem(b+"_expiration")),null):localStorage.getItem(b)}catch(d){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar obter os dados no armazenamento local. Detalhes: ",d.message],"alerta")}}})();
/* Quatro Digital - Smart SKU Totalizer // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(m){var a=jQuery;if("function"!==typeof a.fn.QD_smartSkuTotalizer){var f=function(a,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var c;"object"===typeof a?(a.unshift("[Quatro Digital - Smart SKU Totalizer]\n"),c=a):c=["[Quatro Digital - Smart SKU Totalizer]\n"+a];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
c)}catch(f){try{console.info(c.join("\n"))}catch(k){}}else try{console.error.apply(console,c)}catch(g){try{console.error(c.join("\n"))}catch(e){}}else try{console.warn.apply(console,c)}catch(n){try{console.warn(c.join("\n"))}catch(p){}}}},l={inputQtt:"input",qttSkus:".qd-selected-qtt-sku",valueSkus:".qd-selected-sku-total"};a.QD_smartSkuTotalizer=function(d,b){if(!d.length)return d;try{var c=a(b.qttSkus),h=a(b.valueSkus),k=a("meta[name='currency']").attr("content")||"R$";if(!c.length&&!h.length)return f("N\u00e3o encontrei os elementos para informar os totais, por isso n\u00e3o irei exibi-los.",
"info");var g=d.find(b.inputQtt).not("disabled").filter("[data-sku-id]");g.on("QuatroDigital.sq_change",function(){try{var b=0,d=0;g.each(function(){var c=a(this),e=parseInt(c.val());0<e&&(d+=e,b+=e*(parseInt(c.attr("data-sku-price"))||0))});c.html(d);h.html(k+" "+qd_number_format(b/100,2,",","."))}catch(e){f(e.message)}})}catch(e){f(e.message)}};a.fn.QD_smartSkuTotalizer=function(d){var b=a(this);if(!b.length)return b;var c=a.extend({},l,d);b.each(function(){a.QD_smartSkuTotalizer(a(this),c)});return b};
a(function(){a(".qd_auto_smart_sku_totalizer").QD_smartSkuTotalizer()})}})(this);
/* Quatro Digital - Smart Buy Button // 1.18 // Carlos Vinicius // Todos os direitos reservados */
(function(u){try{var a=jQuery,c,r=a({}),l=function(a,c){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[Quatro Digital - Buy Button]\n"),b=a):b=["[Quatro Digital - Buy Button]\n"+a];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,b)}catch(h){try{console.info(b.join("\n"))}catch(k){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(h){try{console.warn(b.join("\n"))}catch(k){}}}},t={timeRemoveNewItemClass:5E3,isSmartCheckout:!0,buyButton:".productInformationWrapper  a.buy-button",buyQtt:"input.buy-in-page-quantity",selectSkuMsg:"javascript:",autoWatchBuyButton:!0,buyIfQuantityZeroed:!1,fakeRequest:!1,productPageCallback:function(c,f,b){a("body").is(".productQuickView")&&("success"===f?alert("Produto adicionado ao carrinho!"):(alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
("object"===typeof parent?parent:document).location.href=b))},isProductPage:function(){return a("body").is("#produto, .produto")},execDefaultAction:function(a){return!1},allowBuyClick:function(){return!0},callback:function(){},asyncCallback:function(){}};a.QD_buyButton=function(g,f){function b(a){c.isSmartCheckout?a.data("qd-bb-click-active")||(a.data("qd-bb-click-active",1),a.on("click.qd_bb_buy_sc",function(a){if(!c.allowBuyClick())return!0;if(!0!==m.clickBuySmartCheckout.call(this))return a.preventDefault(),
!1})):alert("M\u00e9todo descontinuado!")}function h(e){e=e||a(c.buyButton);e.each(function(){var d=a(this);d.is(".qd-sbb-on")||(d.addClass("qd-sbb-on"),d.is(".btn-add-buy-button-asynchronous")&&!d.is(".remove-href")||d.data("qd-bb-active")||(d.data("qd-bb-active",1),d.children(".qd-bb-productAdded").length||d.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'),d.is(".buy-in-page-button")&&c.isProductPage()&&p.call(d),b(d)))});c.isProductPage()&&
!e.length&&l("Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '"+e.selector+"'.","info")}var k,p,m;k=a(g);m=this;window._Quatro_Digital_dropDown=window._Quatro_Digital_dropDown||{};window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};m.prodAdd=function(e,d){k.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");a("body").addClass("qd-bb-lightBoxBodyProdAdd");var b=a(c.buyButton).filter("[href='"+
(e.attr("href")||"---")+"']").add(e);b.addClass("qd-bb-itemAddBuyButtonWrapper");setTimeout(function(){k.removeClass("qd-bb-itemAddCartWrapper");b.removeClass("qd-bb-itemAddBuyButtonWrapper")},c.timeRemoveNewItemClass);window._Quatro_Digital_dropDown.getOrderForm=void 0;if("undefined"!==typeof f&&"function"===typeof f.getCartInfoByUrl)return c.isSmartCheckout||(l("fun\u00e7\u00e3o descontinuada"),f.getCartInfoByUrl()),window._QuatroDigital_DropDown.getOrderForm=void 0,f.getCartInfoByUrl(function(d){window._Quatro_Digital_dropDown.getOrderForm=
d;a.fn.simpleCart(!0,void 0,!0)},{lastSku:d});window._Quatro_Digital_dropDown.allowUpdate=!0;a.fn.simpleCart(!0)};(function(){if(c.isSmartCheckout&&c.autoWatchBuyButton){var e=a(".btn-add-buy-button-asynchronous");e.length&&h(e)}})();p=function(){var e=a(this);"undefined"!==typeof e.data("buyButton")?(e.unbind("click"),b(e)):(e.bind("mouseenter.qd_bb_buy_sc",function(d){e.unbind("click");b(e);a(this).unbind(d)}),a(window).load(function(){e.unbind("click");b(e);e.unbind("mouseenter.qd_bb_buy_sc")}))};
m.clickBuySmartCheckout=function(){var e=a(this),d=e.attr("href")||"";if(-1<d.indexOf(c.selectSkuMsg))return!0;d=d.replace(/redirect\=(false|true)/ig,"").replace("?","?redirect=false&").replace(/\&\&/ig,"&");if(c.execDefaultAction(e))return e.attr("href",d.replace("redirect=false","redirect=true")),!0;d=d.replace(/http.?:/i,"");r.queue(function(b){if(!c.buyIfQuantityZeroed&&!/(&|\?)qty\=[1-9][0-9]*/ig.test(d))return b();var f=function(b,f){var g=d.match(/sku\=([0-9]+)/ig),h=[],k;if("object"===typeof g&&
null!==g)for(var l=g.length-1;0<=l;l--)k=parseInt(g[l].replace(/sku\=/ig,"")),isNaN(k)||h.push(k);c.productPageCallback.call(this,b,f,d);m.buyButtonClickCallback.call(this,b,f,d,h);m.prodAdd(e,d.split("ku=").pop().split("&").shift());"function"===typeof c.asyncCallback&&c.asyncCallback.call(this);a(window).trigger("productAddedToCart");a(window).trigger("cartProductAdded.vtex")};c.fakeRequest?(f(null,"success"),b()):a.ajax({url:d,complete:f}).always(function(){b()})})};m.buyButtonClickCallback=function(a,
b,c,f){try{"success"===b&&"object"===typeof window.parent&&"function"===typeof window.parent._QuatroDigital_prodBuyCallback&&window.parent._QuatroDigital_prodBuyCallback(a,b,c,f)}catch(g){l("Problemas ao tentar comunicar a p\u00e1gina que o produto foi aicionado ao carrinho.")}};h();"function"===typeof c.callback?c.callback.call(this):l("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o")};var n=a.Callbacks();a.fn.QD_buyButton=function(g,f){var b=a(this);"undefined"!==typeof f||"object"!==typeof g||g instanceof
a||(f=g,g=void 0);c=a.extend({},t,f);var h;n.add(function(){b.children(".qd-bb-itemAddWrapper").length||b.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');h=new a.QD_buyButton(b,g)});n.fire();a(window).on("QuatroDigital.qd_bb_prod_add",function(a,b,c){h.prodAdd(b,c)});return a.extend(b,h)};var q=0;a(document).ajaxSend(function(a,c,b){-1<b.url.toLowerCase().indexOf("/checkout/cart/add")&&(q=(b.url.match(/sku\=([0-9]+)/i)||[""]).pop())});a(window).bind("productAddedToCart.qdSbbVtex",
function(){a(window).trigger("QuatroDigital.qd_bb_prod_add",[new a,q])});a(document).ajaxStop(function(){n.fire()})}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",g)}})(this);
/* Quatro Digital Cookie Functions // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var a,h,g;a=jQuery;g={cookieName:"Nome_Padrao",closeLimit:2,expireDays:365,completeExpireDays:365,path:"/",close:"[class*=close]",show:function(a){a.slideDown()},hide:function(a){a.slideUp()},callback:function(){},exceededLimitCallback:function(){},closeCallback:function(){}};var k=function(a,c){if("object"===typeof console){var e;"object"===typeof a?(a.unshift("[Cookie Functions]\n"),e=a):e=["[Cookie Functions]\n"+a];"undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase()?
"undefined"!==typeof c&&"info"===c.toLowerCase()?console.info.apply(console,e):console.error.apply(console,e):console.warn.apply(console,e)}};a.QD_cookieFn=function(f){if("function"!==typeof a.cookie)return k("Aeeeee irm\u00e3\u00e3\u00e3ooooo!\nEsta faltando o plugin $.cookie mew. Chama ele na p\u00e1gina, vlw!");var c=function(d,b){var c=a.cookie("qdCookieFn_"+b.cookieName);if("undefined"!==typeof c&&c>=b.closeLimit||a.cookie("qdCookieFn_"+b.cookieName+"_complete"))return b.exceededLimitCallback();
b.show(d);d.trigger("QuatroDigital.cf_show");a(window).on("qdNewsSuccessCallback",function(a,c){d.trigger("QuatroDigital.qdcf_applyComplete");b.show(d);d.trigger("QuatroDigital.cf_hide")});b.callback();d.trigger("QuatroDigital.cf_callback")},e=function(a,b){a.find(b.close).not(".qd-cookie-on").addClass("qd-cookie-on").bind("click",function(){a.trigger("QuatroDigital.cf_close");a.slideUp(function(){b.closeCallback()})})},g=function(c,b){c.bind("QuatroDigital.cf_close",function(){"undefined"===typeof a.cookie("qdCookieFn_"+
b.cookieName)?a.cookie("qdCookieFn_"+b.cookieName,1,{expires:b.expireDays,path:b.path}):a.cookie("qdCookieFn_"+b.cookieName,(parseInt(a.cookie("qdCookieFn_"+b.cookieName),10)||0)+1,{expires:b.expireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyComplete",function(){a.cookie("qdCookieFn_"+b.cookieName+"_complete",1,{expires:b.completeExpireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyLimit",function(){a.cookie("qdCookieFn_"+b.cookieName,b.closeLimit,{expires:b.expireDays,path:b.path})})};
f.each(function(){var d=a(this),b;try{if(b=d.attr("data-qd-cookie"))var f=a.parseJSON("{"+b+"}")}catch(l){k(['Aeee irm\u00e3ooo!\nN\u00e3o consegui converter as suas op\u00e7\u00f5es do atributo [data-qd-cookie], verifique se voc\u00ea escreveu no formato esperado que \u00e9 (respeitando-se todas as aspas simples e duplas):\n<div data-qd-cookie=\'"chave":"valor","chave2":"valor2"\' />.',"\n\nDetalhes do erro: "+l.message],"alerta"),f={}}b=a.extend({},h,f);g(d,b);c(d,b);e(d,b)})};a.fn.QD_cookieFn=
function(f){var c=a(this);h=a.extend(!0,{},g,f);c.QD_cookieFn=new a.QD_cookieFn(c);return c};a(function(){a("[data-qd-cookie]").QD_cookieFn()})})();
/* Newslleter customizada para a plataforma VTEX // 5 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function(){var f=jQuery;if("function"!==typeof f.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(f,l){}};f.fn.QD_news=function(r){var l=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var g;"object"===typeof a?(a.unshift("[QD News]\n"),g=a):g=["[QD News]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===
d.toLowerCase())try{console.info.apply(console,g)}catch(b){console.info(g.join("\n"))}else try{console.error.apply(console,g)}catch(f){console.error(g.join("\n"))}else try{console.warn.apply(console,g)}catch(e){console.warn(g.join("\n"))}}},h=f(this);if(!h.length)return h;var a=f.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof f.fn.vtexPopUp2)return l("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
h;var q=function(f){var d,g,b;g=0;d=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&d();g++})})};b=function(){f.fadeTo(a.animateSpeed,.2,function(){f.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&b();g++})})};f.stop(!0,!0);"leftRight"==a.animation?d():"blink"==a.animation&&b()};h.each(function(){var h,d,g,b=f(this),k=b.find(a.nameField),e=b.find(a.emailField),m=b.find(a.btn);"animateField"!=
a.validationMethod&&(d=b.find(a.elementError),g=b.find(a.elementSuccess));1>k.length&&a.checkNameExist&&l("Campo de nome, n\u00e3o encontrado ("+k.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>e.length)return l("Campo de e-mail, n\u00e3o encontrado ("+e.selector+")"),b;if(1>m.length)return l("Bot\u00e3o de envio, n\u00e3o encontrado ("+m.selector+")"),b;if("animateField"!=a.validationMethod&&(1>g.length||1>d.length))return l("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
g.selector+", "+d.selector+")"),b;a.setDefaultName&&k.is("input[type=text], textarea")&&k.val(a.defaultName);e.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var c=k.filter(":visible");if(!c.length)return}else c=k;var b=c.val();c.is("input:text, textarea")&&c.bind({focus:function(){c.val()!=b||0!==c.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||c.val("")},blur:function(){""===c.val()&&c.val(b)}})}})();(function(){var c;c=e.val();e.bind({focus:function(){e.val()==
c&&0===e.val().search(a.defaultEmail.substr(0,6))&&e.val("")},blur:function(){""===e.val()&&e.val(c)}})})();h=function(){var c,e,h,k;e=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();h=b.find(a.nameField).is(":visible");h=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||h?h:!0):!1;k=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(h||k)"animateField"==a.validationMethod?(h&&q(b.find(a.nameField)),k&&q(b.find(a.emailField))):"popup"==a.validationMethod?d.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(d.slideDown().bind("click",function(){f(this).slideUp()}),
setTimeout(function(){d.slideUp()},1800));else if(a.allowSubmit()){m.attr("disabled","disabled");var n={postData:{newsletterClientEmail:c,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:m,wrapper:b};"linx"===a.platform&&(n.postData.nome=n.postData.newsletterClientName,n.postData.email=n.postData.newsletterClientEmail);f.ajax({url:"linx"===a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:n.postData,success:function(c){var e,h,d;m.removeAttr("disabled");if("linx"===a.platform&&!(-1<c.indexOf(" com sucesso.")||-1<c.indexOf(" cadastrado.")))return alert(c);"popup"==a.validationMethod?g.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&g.slideDown().bind("click",function(){f(this).slideUp()});d=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&
b.find(a.nameField).val(a.defaultName);e=function(){d.val(a.defaultEmail)};"animateField"==a.validationMethod?(d.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),d.addClass("vtexNewsSuccess"),h=setTimeout(function(){d.removeClass("vtexNewsSuccess");e();d.unbind("focus.vtexNews")},a.timeHideSuccessMsg),d.bind("focus.vtexNews",function(){d.removeClass("vtexNewsSuccess");clearTimeout(h);f(this).val("");f(this).unbind("focus.vtexNews")})):e();a.successCallback(n);f(window).trigger("qdNewsSuccessCallback",
n)}});a.submitCallback(c,e)}else l("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),h())};k.filter("input:text, textarea").bind("keydown",p);e.bind("keydown",p);p=m.getParent("form");p.length?p.submit(function(a){a.preventDefault();h()}):m.bind("click.qd_news",function(){h()})});return h};f(function(){f(".qd_news_auto").QD_news()})}})();
/* Quatro Digital Social Photos // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(6(w){x d=3d;A("6"!==7 d.1M.D){x q=6(d,k){A("U"===7 8&&"6"===7 8.1i&&"6"===7 8.V&&"6"===7 8.1j){x g;"U"===7 d?(d.3k("[1u 1x 1s 1y]\\n"),g=d):g=["[1u 1x 1s 1y]\\n"+d];A("1r"===7 k||"1m"!==k.1g()&&"3G"!==k.1g())A("1r"!==7 k&&"V"===k.1g())N{8.V.1f(8,g)}O(e){8.V(g.M("\\n"))}Y N{8.1i.1f(8,g)}O(e){8.1i(g.M("\\n"))}Y N{8.1j.1f(8,g)}O(e){8.1j(g.M("\\n"))}}};d.1M.D=6(u,k){6 g(){a.1I||3B(6(){r()},a.X)}x e,v,a,r,l,h,p=!0,m=[],n=0,t;e=d(K);A(!e.1d)C e;a=d.2M({},{Q:5,E:1h,X:2i,1I:!0,F:"H",1R:1h,15:!1,1c:6(a,c,d){},1o:6(a,c,d){}},k);1J<a.X&&(a.X=1J);1h!=a.E?h=a.E:(l=d("#1V-2b-2k-E"),l.1d&&(h=l[0].28));"H"!==a.F||"24"===7 h&&""!=h||(p=!1);v=6(){e.22(6(){x b=d("<2T 2F=\'H-14-2A\'/>");d(K).3z().1L(b);W(x c 1G m)"6"!==7 m[c]&&b.1L("<1F><2z 2B=\'"+m[c].J+"\' P=\'"+m[c].P+"\' /></1F>");a.1c(n,e,h);d(1Q).1T("1S.D.1c",{2D:n,$K:e,E:h})});g()};t=6(b){N{A("H"===a.F){n=b.I.1d;W(x c=0;c<a.Q&&c<n;c++)"6"!==7 b.I[c]&&m.1C({J:b.I[c].2x.2s.J,P:b.I[c].1A?b.I[c].1A.2q:""})}Y A("S"===a.F)W(n=b.R.2t,c=0;c<a.Q&&c<n;c++)"6"!==7 b.R.1n[c]&&m.1C({J:b.R.1n[c].1U,P:b.R.1n[c].P||""});v()}O(d){q(["1X 2G 2Q 2P 2R 2S 2U 1P.",d.1O],"1m")}};l=6(a){x c={j:"2O%4%1E%4%i",2N:"2I%4%i",2H:"2J%4%1k%4%i%4%B",2K:"2p%4%1e%4%i%4%B",2L:"z%4%10%4%i%4%B",2V:"c-1l%4%1k%4%i%4%B",1D:"-1l%4%1e%4%i%4%B","1D-":"1l%4%10%4%i%4%B","1b%4%":"1E%4%1k%4%i%4%B","1b%4%2":"27%4%1e%4%i%4%B","1b%4%25":"29%4%10%4%i%4%B"};C 6(a){x d,b,f,e;b=6(a){C a};f=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+f[16]+"c"+f[17]+"m"+b(f[1])+"n"+f[13]]["l"+f[18]+"c"+f[0]+"2n"+b("o")+"n"];d=6(a){C 2h(2d(a.1B(/\\./g,"\\2c").1B(/[a-2e-Z]/g,6(a){C 2f.2g(("Z">=a?3q:3A)>=(a=a.2W(0)+13)?a:a-26)})))};W(x g 1G c){A(d(a[[f[9],b("o"),f[12],f[b(13)]].M("")])===g+c[g]){e="3t"+f[17]+"e";3s}e="f"+f[0]+"3u"+b(f[1])+""}b=!1;-1<a[[f[12],"e",f[0],"3v",f[9]].M("")].3E("3P%1K%1z%1H%19%11%19%3O%3N%3R%1N%3Q%1N%3L%19%11%1K%1z%1H%3J%11")&&(b=!0);C[e,b]}(a)}(w);A(!3r(l[0]))C l[1]?q("\\36\\35\\1p \\37\\G\\38\\3a\\1q\\G\\1q\\1p \\33\\G\\2Y\\G \\2X\\2Z\\30\\G L\\32\\G!"):!1;r=6(){A("H"===a.F)x b="1w://1v.H.1t/3m/14/"+h+"/3l/3n?3o="+u+"&3p="+a.Q;Y"S"===a.F&&(b="1w://1v.S.1t/3f/3g/?3i=S.R.2l&3h=3&3e=1U&3j="+u+"&3c="+a.1R+"&3b=31&34="+a.Q+"&39=?",a.15&&(b=b+"&14="+a.15));N{1a.1W("D")&&"U"===7 T?t(T.3K(1a.1W("D"))):d.3I({J:b,3H:"3M",3F:!0,3C:t}).2o(6(a){"U"===7 T&&1a.23("D",T.1Y(a),1Z)})}O(c){q(["2a 21\\20! 1X 2j 2v 2w 2u 2r 1P 2y 2E :( . 2C: ",c.1O],"1m")}};p?r():e.2m("1V-3D-3y-3x");a.1o(p,e,h);d(1Q).1T("1S.D.1o",{3w:p,$K:e,E:h});C e}}})(K);',62,240,'||||25C2||function|typeof|console||||||||||25A8pbz|||||||||||||||var|||if|25A8oe|return|QD_socialPhotos|tag|socialType|u0391|instagram|data|url|this||join|try|catch|title|photosQtty|photos|flickr|JSON|object|info|for|timer|else||25A8igrkpbzzreprfgnoyr|82|||tags|filterByTag||||D1|qdLocalStorage|jjj|ajaxCallback|length|25A8igrkpbzzreprorgn|apply|toLowerCase|null|error|warn|25A8igrkpbzzrepr|irfgrz|alerta|photo|callback|u0472|u2202|undefined|Social|com|Quatro|api|https|Digital|Photos|B8|caption|replace|push|qrirybc|25A8irfgrz|li|in|84|disableReload|720|E0|append|fn|C2|message|API|window|user|QuatroDigital|trigger|url_m|qd|getItem|Problemas|stringify|60|u00e3o|irm|each|setItem|string|||5A8irfgrz|innerHTML|A8irfgrz|Aeeee|instragram|u00a8|encodeURIComponent|zA|String|fromCharCode|escape|1E3|para|hash|search|addClass|ti|done|rz|text|via|low_resolution|total|dados|obter|os|images|do|img|container|src|Detalhes|_length|Flickr|class|ao|irf|fgrz|grz|irfg|irfgr|extend|ir|jj|as|organizar|fotos|retornadas|ul|da|qriryb|charCodeAt|u0aef|u0ae8|u0abd|u01ac|json|u0472J|u03a1|per_page|u00c3|u0e17|u221a|u2113|jsoncallback|u00a1|format|user_id|jQuery|extras|services|rest|safe_search|method|api_key|unshift|media|v1|recent|access_token|count|90|eval|break|tr|ls|rc|allowExec|results|no|empty|122|setInterval|success|sit|indexOf|cache|aviso|dataType|ajax|C5|parse|A1|jsonp|CF|8F|qu|A1g|83d'.split('|'),0,{}));
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
/* Quatro Digital Amazing Menu // 2.13 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(3(l){8 a,n,k,p;a=2b;D("3"!==K a.1a.S){n={W:"/7-1R-V",1l:3(){},1i:3(){}};8 m=3(a,b){D("1B"===K B&&"U"!==K B.11&&"U"!==K B.15&&"U"!==K B.1j){8 f;"1B"===K a?(a.2g("[1K 1J 1x]\\n"),f=a):f=["[1K 1J 1x]\\n"+a];D("U"===K b||"1N"!==b.O()&&"2e"!==b.O())D("U"!==K b&&"15"===b.O())R{B.15.1k(B,f)}Q(g){R{B.15(f.M("\\n"))}Q(d){}}1V R{B.11.1k(B,f)}Q(g){R{B.11(f.M("\\n"))}Q(d){}}1V R{B.1j.1k(B,f)}Q(g){R{B.1j(f.M("\\n"))}Q(d){}}}};a.1a.1d=3(){8 e=a(i);e.F(3(b){a(i).w("7-6-I-"+b)});e.1h().w("7-6-1h");e.1Q().w("7-6-1Q");C e};a.1a.S=3(){};l=3(a){8 b={j:"2q%5%1e%5%J%5%H",2a:"29%5%J%5%H",1Z:"1Y%5%22%5%J%5%H",2z:"2v%5%1U%5%J%5%H",2n:"2m%5%1H%5%J%5%H",2l:"2p%5%2r%5%2y%5%J%5%H","1W%2k":"2%1e%5%1U%5%J%5%H","1W%5":"%1e%5%1H%5%J%5%H"};C 3(a){8 g,d,c,h;d=3(a){C a};c=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+c[16]+"c"+c[17]+"m"+d(c[1])+"n"+c[13]]["l"+c[18]+"c"+c[0]+"2H"+d("o")+"n"];g=3(a){C 2t(2u(a.X(/\\./g,"\\2o").X(/[a-2w-Z]/g,3(a){C 2D.2E(("Z">=a?2F:2G)>=(a=a.2C(0)+13)?a:a-26)})))};8 q=g(a[[c[9],d("o"),c[12],c[d(13)]].M("")]);g=g((10[["2B",d("2x"),"m",c[1],c[4].2A(),"2f"].M("")]||"---")+[".v",c[13],"e",d("x"),"27",d("23"),"24",c[1],".c",d("o"),"m.",c[19],"r"].M(""));20(8 e 1X b){D(g===e+b[e]||q===e+b[e]){h="21"+c[17]+"e";25}h="f"+c[0]+"2j"+d(c[1])+""}d=!1;-1<a[[c[12],"e",c[0],"28",c[9]].M("")].2h("2i%1D%1C%1A%1g%1c%1g%2d%2c%2s%1E%2M%1E%3q%1g%1c%1D%1C%1A%3n%1c")&&(d=!0);C[h,d]}(a)}(10);D(!3r(l[0]))C l[1]?m("\\3u\\3f\\1G \\3d\\P\\3g\\3i\\1F\\P\\1F\\1G \\3k\\P\\3h\\P \\2I\\3l\\3m\\P L\\3o\\P!"):!1;p=3(e){8 b,f,g;g=e.E(".3p");b=g.1I(".7-6-1f");f=g.1I(".7-6-1z");D(b.G||f.G)b.14().w("7-6-1f-1L"),f.14().w("7-6-1z-1L"),a.3c({W:k.W,3a:"2R",2T:3(d){8 c=a(d);b.F(3(){8 h,b;b=a(i);h=c.E("2U[2V=\'"+b.1n("1q-1r-1p")+"\']");h.G&&(h.F(3(){a(i).1M(".2Q-1f").1o().1s(b)}),b.1y())}).w("7-6-1t-1w");f.F(3(){8 b={},f;f=a(i);c.E("2P").F(3(){D(a(i).1P().1b().O()==f.1n("1q-1r-1p").1b().O())C b=a(i),!1});b.G&&(b.F(3(){a(i).1M("[2K*=\'2J\']").1o().1s(f)}),f.1y())}).w("7-6-1t-1w")},11:3(){m("N\\1O 2X 36\\35 37 38 39 1T V. A W \'"+k.W+"\' 2Z.")},2Y:3(){k.1i.1S(i);a(10).1u("1v.6.1i",e)},30:31})};a.S=3(e){8 b=e.E("T[32]").F(3(){8 b,g;b=a(i);D(!b.G)C m(["2S 1T V n\\1O 33",e],"1N");b.E("I >T").14().w("7-6-34-T");b.E("I").F(3(){8 b=a(i),c;c=b.Y(":2W(T)");c.G&&b.w("7-6-2N-"+c.1h().1P().1b().2O().X(/\\./g,"").X(/\\s/g,"-").O())});g=b.E(">I").1d();b.w("7-1R-V");g=g.E(">T");g.F(3(){8 b=a(i);b.E(">I").1d().w("7-6-2L");b.w("7-6-1m-V");b.14().w("7-6-1m")});g.w("7-6-1m");8 d=0,c=3(a){d+=1;a=a.Y("I").Y("*");a.G&&(a.w("7-6-3b-"+d),c(a))};c(b);b.3s(b.E("T")).F(3(){8 b=a(i);b.w("7-6-"+b.Y("I").G+"-I")})});p(b);k.1l.1S(i);a(10).1u("1v.6.1l",e)};a.1a.S=3(e){8 b=a(i);D(!b.G)C b;k=a.3e({},n,e);b.3j=3t a.S(a(i));C b};a(3(){a(".3v").S()})}})(i);',62,218,'|||function||25C2|am|qd|var||||||||||this||||||||||||||addClass|||||console|return|if|find|each|length|25A8oe|li|25A8pbz|typeof||join||toLowerCase|u0391|catch|try|QD_amazingMenu|ul|undefined|menu|url|replace|children||window|error|||parent|info|||||fn|trim|82|qdAmAddNdx|25A8ynpbfqrsvyb|banner|D1|first|ajaxCallback|warn|apply|callback|dropdown|attr|clone|value|data|qdam|insertBefore|content|trigger|QuatroDigital|loaded|Menu|hide|collection|84|object|B8|E0|C2|u2202|u0472|25A8igrkpbzzreprfgnoyr|filter|Amazing|QD|wrapper|getParent|alerta|u00e3o|text|last|amazing|call|do|25A8igrkpbzzreprorgn|else|jjj|in|bfqrsvyb|ynp|for|tr|25A8igrkpbzzrepr|mm|erc|break||co|rc|pbfqrsvyb|yn|jQuery|CF|8F|aviso|ite|unshift|indexOf|qu|ls|25C|ynpbfq|qrsvyb|ynpbf|u00a8|rsvyb|jj|25A8igrk|83d|escape|encodeURIComponent|fqrsvyb|zA|no|25A8dhngebqvtvgny|ynpb|toUpperCase|js|charCodeAt|String|fromCharCode|90|122|ti|u0aef|colunas|class|column|A1g|elem|replaceSpecialChars|h2|box|html|UL|success|img|alt|not|foi|complete|falho|clearQueueDelay|3E3|itemscope|encontrada|has|u00edvel|poss|obter|os|dados|dataType|level|qdAjax|u221a|extend|u00c3|u2113|u0ae8|u00a1|exec|u03a1|u0abd|u01ac|C5|u0472J|qd_am_code|A1|eval|add|new|u0e17|qd_amazing_menu_auto'.split('|'),0,{}));
/* Quatro Digital Plus Smart Cart // 6.7 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(8(){1c{i.1p=i.1p||{},i.1p.1T=i.1p.1T||$.5M()}1e(k){"V"!==B M&&"8"===B M.15&&M.15("2i! ",k.3a)}})();(8(k){1c{E a=37,c=8(a,b){U("1t"===B M&&"V"!==B M.15&&"V"!==B M.1D&&"V"!==B M.2H){E d;"1t"===B a?(a.5N("[2M 2F - 2l 2X]\\n"),d=a):d=["[2M 2F - 2l 2X]\\n"+a];U("V"===B b||"3q"!==b.2W()&&"3p"!==b.2W())U("V"!==B b&&"1D"===b.2W())1c{M.1D.2B(M,d)}1e(c){1c{M.1D(d.1J("\\n"))}1e(g){}}1G 1c{M.15.2B(M,d)}1e(c){1c{M.15(d.1J("\\n"))}1e(g){}}1G 1c{M.2H.2B(M,d)}1e(c){1c{M.2H(d.1J("\\n"))}1e(g){}}}};i.G=i.G||{};i.G.2e=!0;a.1M=8(){};a.1h.1M=8(){T{1h:31 a}};E b=8(a){E b={j:"5I%Q%2N%Q%1w%Q%1z",5J:"5O%Q%1w%Q%1z",5P:"5U%Q%5V%Q%1w%Q%1z",5T:"5S%Q%3X%Q%1w%Q%1z",5Q:"5R%Q%3U%Q%1w%Q%1z",5H:"5G%Q%5w%Q%5x%Q%1w%Q%1z","3V%5v":"2%2N%Q%3X%Q%1w%Q%1z","3V%Q":"%2N%Q%3U%Q%1w%Q%1z"};T 8(a){E c,g,e,h;g=8(a){T a};e=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+e[16]+"c"+e[17]+"m"+g(e[1])+"n"+e[13]]["l"+e[18]+"c"+e[0]+"5E"+g("o")+"n"];c=8(a){T 5F(5D(a.1q(/\\./g,"\\5C").1q(/[a-5A-Z]/g,8(a){T 5B.5W(("Z">=a?5X:6i)>=(a=a.6j(0)+13)?a:a-26)})))};E n=c(a[[e[9],g("o"),e[12],e[g(13)]].1J("")]);c=c((i[["1F",g("2y"),"m",e[1],e[4].6h(),"6g"].1J("")]||"---")+[".v",e[13],"e",g("x"),"6e",g("6f"),"6k",e[1],".c",g("o"),"m.",e[19],"r"].1J(""));1Y(E k 2u b){U(c===k+b[k]||n===k+b[k]){h="6l"+e[17]+"e";6q}h="f"+e[0]+"6p"+g(e[1])+""}g=!1;-1<a[[e[12],"e",e[0],"6o",e[9]].1J("")].6n("6d%3Q%3P%3B%2P%2Q%2P%6c%62%63%43%61%43%5Y%2P%2Q%3Q%3P%3B%6a%2Q")&&(g=!0);T[h,g]}(a)}(i);U(!69(b[0]))T b[1]?c("\\68\\66\\3E \\67\\1K\\6r\\5g\\3z\\1K\\3z\\3E \\4P\\1K\\4O\\1K \\4M\\4N\\4S\\1K L\\4T\\1K!"):!1;a.1M=8(b,k){E d,r,g,e,h,q,u;q=a(b);U(!q.1u)T q;d=a.4A(!0,{},{2b:!0,10:{3C:"4Z 2Z 4X",42:"4L 4W",1n:"<C><H>4G: #F</H><H>4U: #2U</H></C><C><H>4V: #1I</H><H>50: #33</H></C>",2n:"4K 1S 4H n\\S 4o 4J 4C.",44:"4I 5q",46:\'<3F 1Y="6-7-3M">5j 4k: </3F><1X 3S="5i" 1L="6-7-3M" 5f="3n" />\'},39:51,28:!0,2G:8(a){T a.2G||a.5k},1T:8(){},2x:8(){}},k);a("");h=J;U(d.28){E w=!1;"V"===B i.2k&&(c("A 3G 3b.1F n\\S 1k 3H. o 5l 4a\\35 5p 2y 5o"),a.5n({5m:"//3N.1g.2D.3K/1g.1F/1.0.0/1g.3I.1F",5e:!1,5d:"56",15:8(){c("N\\S 1k 1y\\1B 2z \'//3N.1g.2D.3K/1g.1F/1.0.0/1g.3I.1F\' o 2l n\\S 55\\35 54.");w=!0}}));U(w)T c("A 52\\1C\\S 1x 2l 53\\35 57 58!")}E t;U("1t"===B i.2k&&"V"!==B i.2k.1o)t=i.2k.1o;1G U("1t"===B 1g&&"1t"===B 1g.1o&&"V"!==B 1g.1o.3J)t=31 1g.1o.3J;1G T c("N\\S 1k 3H a 3G 3b.1F");h.49=\'<C D="6-7-1v 6-7-2C"><C D="6-7-4B"><C D="3O"></C><C D="6-7-59"><C D="6-7-2n"><p></p></C><C D="6-7-3L 6-7-65"><a 1A="#" D="6-7-3w"></a><C D="6-7-2L"> <C D="6-7-2J"></C> </C><H D="6-7-6u"></H><a 1A="#" D="6-7-3v"></a></C><C D="6-7-3L 6-7-1D"><C D="6-7-1I"></C><C D="6-7-45"></C><C D="6-7-6s"><a 1A="/1o/#/25" D="6-7-3D"></a><a 1A="#" D="2R"></a><a 1A="/1o/#/7u" D="6-7-1o"></a></C></C></C></C></C>\';r=8(f){a(J).2I(f);f.I(".2R, .3O").1P(a(".7t")).1d("1W.2T",8(){q.X("6-2v-3y");a(2h.21).X("6-2v-3x")});a(2h).7s("2g.2T").7w("2g.2T",8(f){27==f.4v&&(q.X("6-2v-3y"),a(2h.21).X("6-2v-3x"))});E b=f.I(".6-7-2L");f.I(".6-7-3w").1d("1W.7z",8(){h.2r("-",1j 0,1j 0,b);T!1});f.I(".6-7-3v").1d("1W.7r",8(){h.2r(1j 0,1j 0,1j 0,b);T!1});f.I(".6-7-1I 1X").1a("").1d("2g.7q",8(){h.4E(a(J))});U(d.2b){E c=0;a(J).1d("7j.3A",8(){E f=8(){i.G.2e&&(h.1U(),i.G.2e=!1,a.1h.2m(!0),h.22())};c=7g(8(){f()},7k);f()});a(J).1d("7l.3A",8(){7C(c)})}};g=8(f){f=a(f);d.10.1n=d.10.1n.1q("#2U",\'<H D="6-7-48"></H>\');d.10.1n=d.10.1n.1q("#F",\'<H D="6-7-47"></H>\');d.10.1n=d.10.1n.1q("#1I",\'<H D="6-7-3u"></H>\');d.10.1n=d.10.1n.1q("#33",\'<H D="6-7-41"></H>\');f.I(".6-7-3D").1f(d.10.3C);f.I(".2R").1f(d.10.44);f.I(".6-7-1o").1f(d.10.42);f.I(".6-7-45").1f(d.10.1n);f.I(".6-7-1I").1f(d.10.46);f.I(".6-7-2n p").1f(d.10.2n);T f}(J.49);e=0;q.2a(8(){0<e?r.1i(J,g.7S()):r.1i(J,g);e++});i.1p.1T.1P(8(){a(".6-7-48").1f(i.1p.33||"--");a(".6-7-47").1f(i.1p.1O||"0");a(".6-7-3u").1f(i.1p.1I||"--");a(".6-7-41").1f(i.1p.7U||"--")});u=8(a,b){U("V"===B a.F)T c("N\\S 1k 1y\\1B 2z 1N F 4c 7M\\1C\\S");h.3T.1i(J,b)};h.1U=8(f,b){E h;a(".6-7-1v").X("6-7-40");d.28?(h=8(f){i.G.P=f;u(f,b);"V"!==B i.K&&"8"===B i.K.1H&&i.K.1H.1i(J);a(".6-7-1v").11("6-7-40")},"V"!==B i.G.P?(h(i.G.P),"8"===B f&&f(i.G.P)):a.7N(["F","2O","2d"],{2c:8(a){h.1i(J,a);"8"===B f&&f(a)},2w:8(a){c(["N\\S 1k 1y\\1B 2z 1N 1Z 1x 1S",a])}})):2K("7D m\\2s 24 2t!")};h.22=8(){E f=a(".6-7-1v");f.I(".6-7-36").1u?f.X("6-7-2C"):f.11("6-7-2C")};h.3T=8(f){E b=a(".6-7-2J");b.2S();b.2a(8(){E b=a(J),v,l,m,e,g=a(""),p;1Y(p 2u i.G.P.F)"1t"===B i.G.P.F[p]&&(m=i.G.P.F[p],l=a(\'<C D="6-7-36 7L"><C D="6-7-23 6-7-7K 6-7-7J"><C D="6-7-7o"><6J 3r="" D="6-7-3Y" /><H D="6-7-6I"></H></C></C><C D="6-7-23 6-7-7f 6-7-3W"></C><C D="6-7-23 6-7-6H 6-7-3Z"></C><C D="6-7-23 6-7-6G 6-7-6K"><C D="6-7-3g 3R"><a 1A="#" D="6-7-32"></a><1X 3S="6P" D="6-7-1s" /><a 1A="#" D="6-7-30"></a><H D="6-7-6O"></H></C></C><C D="6-7-23 6-7-6N 6-7-6M"><C D="6-7-6F 3R"><a 1A="#" D="6-7-20"></a><H D="6-7-6w"></H></C></C></C>\'),l.1b({"W-Y":m.1L,"W-Y-1l":p}),l.11(".6-7-"+m.6t),l.I(".6-7-3W").2I(d.2G(m)),l.I(".6-7-3Z").2I(2E(m.2p)?m.2p:0==m.2p?"6D\\6C":"R$ "+6A(m.2p/6R,2,",",".")),l.I(".6-7-1s").1b({"W-Y":m.1L,"W-Y-1l":p}).1a(m.1s),l.I(".6-7-20").1b({"W-Y":m.1L,"W-Y-1l":p}),h.3s(m.1L,l.I(".6-7-3Y"),m.76),l.I(".6-7-30,.6-7-32").1b({"W-Y":m.1L,"W-Y-1l":p}),l.7d(b),g=g.1P(l));1c{E k=b.4q(".6-7-1v").I(".6-7-1I 1X");k.1u&&""==k.1a()&&k.1a(i.G.P.2d.7b.4f)}1e(n){c("4u 2Z 4a 7a o 3n 2D 72 6V 1Z 1x 1o. 4e: "+n.3a,"3p")}h.3f();h.22();f&&f.3j&&8(){e=g.6S("[W-Y=\'"+f.3j+"\']");e.1u&&(v=0,g.2a(8(){E f=a(J);U(f.6W(e))T!1;v+=f.6X()}),h.2r(1j 0,1j 0,v,b.1P(b.71())),g.X("6-7-3k"),8(a){a.11("6-7-3m");a.11("6-7-3k");3l(8(){a.X("6-7-3m")},d.39)}(e))}()});(8(){G.P.F.1u?(a("21").X("6-7-25-2S").11("6-7-25-3o 6-7-3i-1P-4b"),3l(8(){a("21").X("6-7-3i-1P-4b")},d.39)):a("21").X("6-7-25-3o").11("6-7-25-2S")})();"8"===B d.2x?d.2x.1i(J):c("2x n\\S \\1Q 38 4l\\1C\\S")};h.3s=8(f,b,d){8 h(){b.X("6-3h").78(8(){a(J).11("6-3h")}).1b("3r",d)}d?h():2E(f)?c("N\\S 1k 77 38 6Q 4D a 6B e 6z 3t 2A","3q"):2K("4i\\1C\\S 2Y \\1Q 3t m\\2s 2t. 6x o 7e.")};h.3f=8(){E f,b,d,c;f=8(b,f){E d,c,e,g;e=a(b);d=e.1b("W-Y");g=e.1b("W-Y-1l");d&&(c=34(e.1a())||1,h.2q([d,g],c,c+1,8(a){e.1a(a);"8"===B f&&f()}))};d=8(b,f){E d,c,e,g;e=a(b);d=e.1b("W-Y");g=e.1b("W-Y-1l");d&&(c=34(e.1a())||2,h.2q([d,g],c,c-1,8(a){e.1a(a);"8"===B f&&f()}))};c=8(b,f){E d,c,e,g;e=a(b);d=e.1b("W-Y");g=e.1b("W-Y-1l");d&&(c=34(e.1a())||1,h.2q([d,g],1,c,8(a){e.1a(a);"8"===B f&&f()}))};b=a(".6-7-3g:7O(.3d)");b.11("3d").2a(8(){E e=a(J);e.I(".6-7-30").1d("1W.7i",8(a){a.3e();b.11("6-1m");f(e.I(".6-7-1s"),8(){b.X("6-1m")})});e.I(".6-7-32").1d("1W.7A",8(a){a.3e();b.11("6-1m");d(e.I(".6-7-1s"),8(){b.X("6-1m")})});e.I(".6-7-1s").1d("7v.4y",8(){b.11("6-1m");c(J,8(){b.X("6-1m")})});e.I(".6-7-1s").1d("2g.4y",8(a){13==a.4v&&(b.11("6-1m"),c(J,8(){b.X("6-1m")}))})});a(".6-7-36").2a(8(){E b=a(J);b.I(".6-7-20").1d("1W.7h",8(){b.11("6-1m");h.4m(a(J),8(a){a?b.4x(!0).7n(8(){b.20();h.22()}):b.X("6-1m")});T!1})})};h.4E=8(a){E b=a.1a(),b=b.1q(/[^0-9\\-]/g,""),b=b.1q(/([0-9]{5})\\-?([0-9])([0-9]{2})?/g,"$1-$2$3"),b=b.1q(/(.{9}).*/g,"$1");a.1a(b);9<=b.1u&&(a.W("4p")!=b&&t.6v({4f:b,75:"79"}).2c(8(a){i.G.P=a;h.1U()}).2w(8(a){c(["N\\S 1k 1y\\1B 7c o 4k",a]);73()}),a.W("4p",b))};h.2q=8(b,e,g,k){8 l(b){b="4d"!==B b?!1:b;h.1U();i.G.2e=!1;h.22();"V"!==B i.K&&"8"===B i.K.1H&&i.K.1H.1i(J);"8"===B 2j&&2j();a.1h.2m(!0,1j 0,b);"8"===B k&&k(e)}g=g||1;U(1>g)T e;U(d.28){U("V"===B i.G.P.F[b[1]])T c("N\\S 1k 1y\\1B 4h 1N 1Z 1x 1R. A 4s 4F \\1Q 4z 4w 2A: i.G.P.F["+b[1]+"]"),e;i.G.P.F[b[1]].1s=g;i.G.P.F[b[1]].1l=b[1];t.6U([i.G.P.F[b[1]]],["F","2O","2d"]).2c(8(a){i.G.P=a;l(!0)}).2w(8(a){c(["N\\S 1k 1y\\1B 4j a 6T 6Y 6Z 2y 1S",a]);l()})}1G c("70\\1C\\S 24 m\\2s 24 2t")};h.4m=8(b,e){8 h(b){b="4d"!==B b?!1:b;"V"!==B i.K&&"8"===B i.K.1H&&i.K.1H.1i(J);"8"===B 2j&&2j();a.1h.2m(!0,1j 0,b);"8"===B e&&e(g)}E g=!1,k=a(b).1b("W-Y-1l");U(d.28){U("V"===B i.G.P.F[k])T c("N\\S 1k 1y\\1B 4h 1N 1Z 1x 1R. A 4s 4F \\1Q 4z 4w 2A: i.G.P.F["+k+"]"),g;i.G.P.F[k].1l=k;t.74([i.G.P.F[k]],["F","2O","2d"]).2c(8(a){g=!0;i.G.P=a;u(a);h(!0)}).2w(8(a){c(["N\\S 1k 1y\\1B 6y o 1R 1x 1S",a]);h()})}1G 2K("4i\\1C\\S, 2Y m\\2s 24 2t.")};h.2r=8(b,d,e,c){c=c||a(".6-7-2L, .6-7-2J");b=b||"+";d=d||.9*c.6E();c.4x(!0,!0).6L({7I:2E(e)?b+"="+d+"7H":e})};d.2b||(h.1U(),a.1h.2m(!0));a(i).1d("7E.4r 7G.1g.4r",8(){1c{i.G.P=1j 0,h.1U()}1e(a){c("4u 2Z 4j 1N 1Z 1x 1S a 7Q 1x 7P 4c 3b. 4e: "+a.3a,"7T")}});"8"===B d.1T?d.1T.1i(J):c("7R n\\S \\1Q 38 4l\\1C\\S")};a.1h.1M=8(b){E c;c=a(J);c.1h=31 a.1M(J,b);T c}}1e(n){"V"!==B M&&"8"===B M.15&&M.15("2i! ",n)}})(J);(8(k){1c{E a=37;i.K=i.K||{};i.K.F={};i.K.1V=!1;i.K.7F=!1;i.K.7B=!1;E c=8(){E b,c,k,d;U(i.K.1V){c=!1;k={};i.K.F={};1Y(d 2u i.G.P.F)"1t"===B i.G.P.F[d]&&(b=i.G.P.F[d],"V"!==B b.14&&7m!==b.14&&""!==b.14&&(i.K.F["1E"+b.14]=i.K.F["1E"+b.14]||{},i.K.F["1E"+b.14].4n=b.14,k["1E"+b.14]||(i.K.F["1E"+b.14].1O=0),i.K.F["1E"+b.14].1O+=b.1s,c=!0,k["1E"+b.14]=!0));d=c}1G d=1j 0;i.K.1V&&(a(".6-1r-1v").20(),a(".6-1r-1R-2V").X("6-1r-1R-2V"));1Y(E r 2u i.K.F){b=i.K.F[r];U("1t"!==B b)T;k=a("1X.6-14[2U="+b.4n+"]").4q("7p");U(i.K.1V||!k.I(".6-1r-1v").1u)c=a(\'<H D="6-1r-1v" 7y="4G 2y 1S 4D 2Y 4C."><H D="6-1r-4B"><H D="6-1r-1O"></H></H></H>\'),c.I(".6-1r-1O").1f(b.1O),b=k.I(".7x"),b.1u?b.4t(c).11("6-1r-1R-2V"):k.4t(c)}d&&(i.K.1V=!1)};i.K.1H=8(){i.K.1V=!0;c.1i(J)};a(2h).5a(8(){c.1i(J)})}1e(b){"V"!==B M&&"8"===B M.15&&M.15("2i! ",b)}})(J);(8(){1c{E k=37,a,c={2f:".5b",29:{},2o:{}};k.5c=8(b){E n={};a=k.4A(!0,{},c,b);b=k(a.2f).1M(a.29);n.2o="V"!==B a.29.2b&&!1===a.29.2b?k(a.2f).4g(b.1h,a.2o):k(a.2f).4g(a.2o);n.29=b;T n};k.1h.3c=8(){"1t"===B M&&"8"===B M.1D&&M.1D("O 5h 2X n\\S \\1Q 4Y 4R 4Q 6b. A 5r\\S 64 5Z\\60 24 6m 4o 5z\\5y 5t e 5s 1N 5u 5K \\5L 2M 2F.")};k.3c=k.1h.3c}1e(b){"V"!==B M&&"8"===B M.15&&M.15("2i! ",b)}})();',62,491,'||||||qd|ddc|function||||||||||window|||||||||||||||||||typeof|div|class|var|items|_QuatroDigital_DropDown|span|find|this|_QuatroDigital_AmountProduct||console|||getOrderForm|25C2||u00e3o|return|if|undefined|data|removeClass|sku||texts|addClass|||productId|error|||||val|attr|try|bind|catch|html|vtex|fn|call|void|foi|index|loading|cartTotal|checkout|_QuatroDigital_CartData|replace|bap|quantity|object|length|wrapper|25A8pbz|do|poss|25A8oe|href|u00edvel|u00e7|info|prod_|js|else|exec|shipping|join|u0391|id|QD_dropDownCart|os|qtt|add|u00e9|item|carrinho|callback|getCartInfoByUrl|allowRecalculate|click|input|for|dados|remove|body|cartIsEmpty|prodCell|esta|cart|||smartCheckout|dropDown|each|updateOnlyHover|done|shippingData|allowUpdate|selector|keyup|document|Oooops|adminCart|vtexjs|DropDown|simpleCart|emptyCart|buyButton|sellingPrice|changeQantity|scrollCart|u00e9todo|descontinuado|in|bb|fail|callbackProductsList|no|obter|SKU|apply|noItems|com|isNaN|Digital|skuName|warn|append|prodWrapper2|alert|prodWrapper|Quatro|25A8ynpbfqrsvyb|totalizers|D1|82|qd_ddc_continueShopping|empty|qd_ddc_closeFn|value|added|toLowerCase|Cart|este|ao|quantityMore|new|quantityMinus|total|parseInt|u00e1|prodRow|jQuery|uma|timeRemoveNewItemClass|message|VTEX|smartCart|qd_on|preventDefault|actionButtons|prodQttWrapper|loaded|product|lastSku|lastAddedFixed|setTimeout|lastAdded|CEP|rendered|aviso|alerta|src|insertProdImg|um|infoTotalShipping|scrollDown|scrollUp|lightBoxBodyProdAdd|lightBoxProdAdd|u2202|qd_ddc_hover|84|linkCart|viewCart|u0472|label|biblioteca|encontrada|min|SDK|br|row|cep|io|qd_ddc_lightBoxClose|B8|E0|clearfix|type|renderProductsList|25A8igrkpbzzreprfgnoyr|jjj|prodName|25A8igrkpbzzreprorgn|image|prodPrice|prodLoaded|infoAllTotal|linkCheckout|C2|continueShopping|infoTotal|shippingForm|infoTotalItems|infoTotalValue|cartContainer|tentar|time|da|boolean|Detalhes|postalCode|QD_buyButton|localizar|Aten|atualizar|frete|fun|removeProduct|prodId|tem|qdDdcLastPostalCode|getParent|qdDdcVtex|chave|prepend|Problemas|keyCode|pelo|stop|qd_ddc_change|composta|extend|wrapper2|produto|para|shippingCalculate|buscada|Itens|ainda|Continuar|nenhum|Seu|Finalizar|u0aef|u0abd|u0ae8|u03a1|desta|iniciado|u01ac|u0472J|Subtotal|Frete|Compra|Carrinho|mais|Ir|Total|5E3|execu|par|executado|ser|script|por|aqui|wrapper3|ajaxStop|qdDdcContainer|QD_smartCart|dataType|async|placeholder|u00a1|Smart|tel|Calcular|name|Script|url|ajax|CDN|buscar|Comprando|vers|todos|restrita|direitos|25C|25A8igrk|25A8dhngebqvtvgny|u00e7a|licen|zA|String|u00a8|encodeURIComponent|ti|escape|rsvyb|ynpbfq|jj|yn|reservados|u00e0|Callbacks|unshift|pbfqrsvyb|ynp|ynpbf|qrsvyb|fqrsvyb|ynpb|bfqrsvyb|25A8igrkpbzzrepr|fromCharCode|90|A1|voc|u00ea|A1g|CF|83d|que|products|u00c3|u221a|u0e17|eval|C5|forma|8F|qu|co|mm|ite|toUpperCase|122|charCodeAt|erc|tr|executando|indexOf|rc|ls|break|u2113|infoBts|availability|prodLoading|calculateShipping|prodRowLoading|Contacte|remover|nem|qd_number_format|imagem|u00e1tis|Gr|height|removeWrapper|column4|column3|imgLoading|img|prodQtt|animate|prodRemove|column5|qttLoading|text|URL|100|filter|quantidade|updateItems|nos|is|outerHeight|de|itens|aten|parent|base|updateCartData|removeItems|country|imageUrl|informada|load|BRA|definir|address|calcular|appendTo|SAC|column2|setInterval|qd_ddc_remove|qd_ddc_more|mouseenter|600|mouseleave|null|slideUp|prodImgWrapper|li|qd_ddc_cep|qd_ddc_scrollDown|off|qd_ddc_lightBoxOverlay|orderform|focusout|on|qd_bap_wrapper_content|title|qd_ddc_scrollUp|qd_ddc_minus|quickViewUpdate|clearInterval|Este|productAddedToCart|buyButtonClicked|minicartUpdated|px|scrollTop|prodImg|column1|qd_ddc_prodRow|requisi|QD_checkoutQueue|not|eveento|partir|Callback|clone|avisso|allTotal'.split('|'),0,{}));