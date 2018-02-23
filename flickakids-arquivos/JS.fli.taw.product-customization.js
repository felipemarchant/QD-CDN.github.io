$(function () {
	if (vtxctx.departmentName == "Personalizados")
		$(document.body).addClass('qd-fpp-product-page');
		
	var link = $('<a href="#" class="qd-fpp-btn">Personalizar</a>').click(prodCustomize);
	$('.product-qd-v1-sku-selection-box .product-qd-v1-buy-button').prepend(link);
	$('.qd-fpp-banner').click(prodCustomize);
	var preLoad = $('<div class="qd-fpp-pre-load" style="width:1px;height:1px;overflow:hidden;opacity:0.01;"><br /></div>').insertAfter(link);

	var skuId = null;
	var sellerId = null;
	if (skuJson.skus.length > 1)
		$(window).on('skuSelected.vtex', function (e, productId, skuData) {
			skuId = skuData.sku;
			sellerId = skuData.sellerId;
		});
	else {
		skuId = skuJson.skus[0].sku;
		sellerId = skuJson.skus[0].sellerId;
	}

	function getSkuImage(wrapper, skuId) {
		wrapper.addClass('qd-loading');
		$.qdAjax({ url: '/produto/sku/' + skuId }).done(function (data) {
			var images = data[0].Images;
			var image;

			for (var i = 0; i < images.length; i++)
				if (images[i][0].name == "Personaliza")
					image = images[i][0].Path;

			if (!image)
				image = images[0][0].Path;

			wrapper.prepend('<img class="sku-image" src="' + image.replace(/(ids\/\d+)-\d+-\d+/, '$1-350-350') + '" />');
			wrapper.removeClass('qd-loading');
		});
	};

	function getCustomizationOptions(modal) {
		modal.find('.qd-fpp-items').addClass('qd-loading');
		vtexjs.checkout.simulateShipping([{
			id: skuId,
			quantity: 1,
			seller: sellerId
		}], '', 'BRA').done(function (result) {
			var items = result.items;
			var itemIndex = null;
			for (var i = 0; i < items.length; i++) {
				if (items[i].id == skuId) {
					itemIndex = i;
					continue;
				}
			}

			if (itemIndex == null)
				return;

			var ao;
			var offeringId;
			var formArea = [];
			var text, fonts, illustrations, colors, authorizeOpenPackage;
			for (var k = 0; k < items[itemIndex].offerings.length; k++) {
				ao = items[itemIndex].offerings[k].attachmentOfferings;
				offeringId = items[itemIndex].offerings[k].id;
				for (var i = 0; i < ao.length; i++) {
					if (!(ao[i].schema && ao[i].schema['Autoriza abrir embalagem']))
						continue;

					authorizeOpenPackage = ao[i].schema['Autoriza abrir embalagem'];
					text = ao[i].schema['Texto'] || null;
					text2 = ao[i].schema['Texto 2'] || null;
					fonts = ao[i].schema['Letra'] ? ao[i].schema['Letra'].domain : null;
					illustrations = ao[i].schema['Figura'] ? ao[i].schema['Figura'].domain : null;
					colors = ao[i].schema['Cor da letra'] ? ao[i].schema['Cor da letra'].domain : null;

					if (text || text2 || fonts || illustrations || colors)
						formArea.push({
							name: ao[i].name,
							offering: items[itemIndex].offerings[k],
							fields: {
								authorizeOpenPackage: authorizeOpenPackage,
								text: text,
								text2: text2,
								fonts: fonts,
								illustrations: illustrations,
								colors: colors
							}
						});
				}
			}

			if (!formArea.length)
				return;

			var attData = formArea[0];
			var price = items[itemIndex].sellingPrice + attData.offering.price;
			modal.find('.qd-fpp-price .total-price').text("R$ " + qd_number_format(price / 100, 2, ",", "."));

			if (attData.fields.authorizeOpenPackage != null)
				modal.find('.qd-authorize-remove-product').closest('fieldset').show();

			if (attData.fields.text != null)
				modal.find('.qd-baby-name').closest('fieldset').show();

			if (attData.fields.text2 != null)
				modal.find('.qd-baby-name-second').closest('fieldset').show();

			if (attData.fields.fonts != null) {
				modal.find('.qd-fpp-font').closest('fieldset').show();
				modal.find('.qd-fpp-font').empty();

				for (var i = 0; i < attData.fields.fonts.length; i++)
					modal.find('.qd-fpp-font').append('<label style="font-family:' + attData.fields.fonts[i] + ';" class="radio-inline"><input type="radio" name="qd_font_radio" value="' + attData.fields.fonts[i] + '">' + attData.fields.fonts[i] + '</label>');

				modal.find('.qd-fpp-font .radio-inline').first().find('input').addClass('required');
			}

			if (attData.fields.illustrations != null) {
				modal.find('.qd-illustration').closest('fieldset').show();
				modal.find('.qd-illustration').empty();
				modal.find('.qd-illustration').append('<option value="">Sem ilustração</option>');

				for (var i = 0; i < attData.fields.illustrations.length; i++) {
					var illustration = attData.fields.illustrations[i];
					modal.find('.qd-illustration').append('<option value="' + illustration + '">' + illustration + '</option>');					
					preLoad.append('<img src="/arquivos/qd-stamp-' + illustration.toLowerCase().replaceSpecialChars().replace(' ', '-') + '.png" class="img-flag" />');
				}

				modal.find('.qd-illustration').select2({
					placeholder: 'Sem ilustração',
					minimumResultsForSearch: Infinity,
					templateResult: function (data) {
						if (!data.id)
							return data.text;

						var imgName = data.text.toLowerCase().replaceSpecialChars().replace(' ', '-');
						var imgUrl = '/arquivos/qd-stamp-' + imgName + '.png';
						var $data = $('<span><img src="' + imgUrl + '" class="img-flag" /> ' + data.text + '</span>');
						$data.find('.img-flag').css('width', '40px');
						return $data;
					}
				});
			}

			if (attData.fields.colors != null) {
				modal.find('.qd-fpp-colors').closest('fieldset').show();
				modal.find('.qd-fpp-colors').empty();
				modal.find('.qd-fpp-colors').append('<option value="">Sem cor</option>');

				for (var i = 0; i < attData.fields.colors.length; i++) {
					var color = attData.fields.colors[i];
					modal.find('.qd-fpp-colors').append('<option value="' + color + '">' + color + '</option>');			
					preLoad.append('<img src="/arquivos/personalizacao-cor-' + color.toLowerCase().replaceSpecialChars().replace(' ', '-') + '.jpg" class="img-flag" />');
				}

				modal.find('.qd-fpp-colors').select2({
					placeholder: 'Sem cor',
					templateResult: function (data) {
						if (!data.id)
							return data.text;

						var imgName = data.text.toLowerCase().replaceSpecialChars().replace(' ', '-');
						var imgUrl = '/arquivos/personalizacao-cor-' + imgName + '.jpg';
						preLoad.append('<img src="' + imgUrl + '" class="img-flag" />');
						var $data = $('<span><img src="' + imgUrl + '" class="img-flag" /> ' + data.text + '</span>');
						$data.find('.img-flag').css('width', '40px');
						return $data;
					}
				});
			}

			modal.find('.qd-fpp-items input[type="radio"]').on("click", function () {
				$('.input-group-radio .radio-inline').removeClass('checked');
				$(this).closest('.radio-inline').addClass('checked');

				updateCustomize(null, null, $(this).val(), $(this).val().toLowerCase().replace(' ', '-'));
			});

			modal.find('.qd-fpp-items .qd-illustration').on("change", function () {
				if ($(this).val())
					$(this).closest('.input-group').addClass('filled');
				else
					$(this).closest('.input-group').removeClass('filled');

				if (vtxctx.categoryName.indexOf('Chupeta') > -1 && $('.qd-baby-name-second').is(':hidden')) {
					var imgName = $(this).val().toLowerCase().replace('â', 'a').replaceSpecialChars().replace(' ', '-');
					var imgUrl = '/arquivos/qd-stamp-' + imgName + '.png';
					updateCustomize(null, imgUrl, null);
				}
			});

			$(".qd_cart_auto").QD_buyButton({
				buyButton: modal.find('.buy-button'),
				productPageCallback: function () { showSuccessModal(formArea, modal, attData); }
			});

			modal.find('.modal-footer .buy-button').click(function (e) {
				if ($(e.target).attr('href') != '#')
					return;
				e.preventDefault();
				validateForm(formArea, modal);
			});

			modal.find('.qd-fpp-items').removeClass('qd-loading');
		});
	};

	function updateCustomize(text, imageUrl, font, preview) {
		if (!$('.qd-fpp-area #qd_fpp_nome').length)
			$('.qd-fpp-area').append($('<div id="qd_fpp_nome">'));

		wrapperCustomize = $('.qd-fpp-area #qd_fpp_nome');

		if (imageUrl) {
			var wrapperImg = wrapperCustomize.find('img').length ? wrapperCustomize.find('img') : $('<img>').prependTo(wrapperCustomize);
			wrapperImg.attr('src', imageUrl);
		}
		
		var wrapperText = wrapperCustomize.find('.qd-fpp-text').length ? wrapperCustomize.find('.qd-fpp-text') : $('<div class="qd-fpp-text"><span></span></div>').appendTo(wrapperCustomize);

		if (text && vtxctx.categoryName.indexOf('Chupeta') > -1 && $('.qd-baby-name-second').is(':hidden')) {
			wrapperText.html(text.replace(/\s/gi, '<br>'));
			if (text != " ")
				textFit(wrapperText, { minFontSize: 16, maxFontSize: 37 });
		}
		if (font)
			wrapperText.find('span').css('font-family', font.replaceSpecialChars());

		if (preview && !(vtxctx.categoryName.indexOf('Chupeta') > -1 || vtxctx.categoryName.indexOf('Mamadeira') > -1 || vtxctx.categoryName.indexOf('Copo') > -1)) {
			var previewText = $('.qd-fpp-preview-text');
			
			$('<img src="/arquivos/personalizacao-preview-' + preview + '.jpg" />')
				.load(function (e) {
					previewText.show();
				})
				.error(function (e) {
					previewText.hide();
				})
				.appendTo(previewText.find('span').empty());

			previewText.hide();
		}

		if (!wrapperCustomize.find('img').length)
			wrapperText.addClass('qd-fpp-no-img');
		else
			wrapperText.removeClass('qd-fpp-no-img');
	}

	function addCustomization(skuId, attContent, attData) {
		var itemIndex = null;
		var items = vtexjs.checkout.orderForm.items;
		
		for (var i = 0; i < items.length; i++) {
			if (items[i].id == skuId)
				itemIndex = i; // aqui tem que ser o último do carrinho
		}

		if (itemIndex == null)
			return;

		vtexjs.checkout.addOffering(attData.offering.id, itemIndex)
			.done(function (orderForm) {
				vtexjs.checkout.addBundleItemAttachment(itemIndex, attData.offering.id, attData.name, attContent)
					.done(function (orderForm) {
						$(window).trigger('QuatroDigital.bia_callback');
					});
			});
	}

	function validateForm(formArea, modal) {
		var $form = $('.qd-fpp-items .form-qd-v1');
		$form.validate({
			rules: {},
			submitHandler: function (form) {
				var $form = $(form);
				if (!$form.valid())
					modal.find('.modal-footer .buy-button').attr('href', '#');
				else {
					modal.find('.modal-footer .buy-button').attr('href', '/checkout/cart/add?sku=' + skuId + '&qty=1&seller=' + sellerId + '&redirect=true&sc=' + jssalesChannel);
					modal.find('.modal-content').addClass('qd-loading');
				}

				modal.find('.modal-footer .buy-button').click();
			},
			highlight: function (element, errorClass, validClass) {
				var $e = $(element);

				$e.addClass(errorClass).removeClass(validClass);

				if ($e.is(':radio'))
					$e.parents('.input-group-radio').addClass(errorClass+'-wrapper').removeClass(validClass+'-wrapper');
				else
					$e.parent().addClass(errorClass+'-wrapper').removeClass(validClass+'-wrapper');
			},
			unhighlight: function (element, errorClass, validClass) {
				var $e = $(element);

				$e.addClass(validClass).removeClass(errorClass);

				if ($e.is(':radio'))
					$e.parents('.input-group-radio').addClass(validClass+'-wrapper').removeClass(errorClass+'-wrapper');
				else
					$e.parent().addClass(validClass+'-wrapper').removeClass(errorClass+'-wrapper');
			},
			errorPlacement: function () { }
		});

		$form.submit();
	}

	function showSuccessModal(formArea, modal, attData) {
		$(window).one('orderFormUpdated.vtex', function () {
			var content = {};

			if (attData.fields.fonts != null)
				content['Letra'] = (modal.find('.qd-fpp-font .checked input').val() || '*** NÃO ***');

			if (attData.fields.text != null)
				content['Texto'] = (modal.find('.qd-baby-name').val() || '*** NÃO ***');

			if (attData.fields.text2 != null)
				content['Texto 2'] = (modal.find('.qd-baby-name-second').val() || '*** NÃO ***');

			if (attData.fields.illustrations != null)
				content['Figura'] = (modal.find('.qd-illustration').val() || '*** NÃO ***');

			if (attData.fields.colors != null)
				content['Cor da letra'] = (modal.find('.qd-fpp-colors').val() || '*** NÃO ***');

			if (attData.fields.authorizeOpenPackage != null)
				content['Autoriza abrir embalagem'] = (modal.find('.qd-authorize-remove-product').is(':checked') ? 'true' : 'false');

			addCustomization(skuId, content, attData);
			modal.find('.modal-body').addClass('qd-loading');
		});

		$(window).one('QuatroDigital.bia_callback', function () {
			$(document.body).removeClass('.qd-ddc-product-add-time').removeClass('.qd-ddc-product-add-time-v2');
			modal.modal('hide');

			var modalSuccess = $('.qd-v1-modal').first().clone().addClass('qd-fpp-success');

			var modalBody = '<a href="javascript: void(0);" class="qd-fpp-close" data-dismiss="modal">Fechar</a>';
			modalBody += '<i class="fa fa-check-circle" aria-hidden="true"></i>';
			modalBody += '<h5 class="qd-fpp-success-text">Produto adicionado com sucesso!</h5>';
			modalBody += '<div class="product-qd-v1-buy-button"><a class="qd-fpp-success-btn" href="/checkout">Finalizar Compra</a></div>';
			modalBody += '<a href="javascript: void(0);" class="qd-fpp-continue" data-dismiss="modal">Continuar comprando</a>';
			modalSuccess.find('.modal-body').append(modalBody);
			modalSuccess.find('.modal-header, .modal-footer').remove();

			modalSuccess.modal();
		});
	}

	function prodCustomize(e) {
		e.preventDefault();

		if (!skuId) {
			alert('Por favor, selecione o modelo desejado.');
			return;
		}

		var modal = $('.qd-v1-modal').first().clone().addClass('qd-fpp-modal');

		modal.find('.modal-header').append("<style> @import url('https://fonts.googleapis.com/css?family=Architects+Daughter|Lobster'); </style>");
		modal.find('.modal-header').append($('<h5></h5>').text($('.product-qd-v1-sku-selection-box .product-qd-v1-name').text()));
		modal.find('.modal-header .close').addClass('qd-fpp-close').text('Não quero personalizar o produto');

		var modalBody = '<div class="row"><div class="col-xs-12 col-sm-5 qd-fpp-image"><div class="qd-fpp-area"></div></div><div class="col-xs-12 col-sm-7 qd-fpp-items"></div>';
		modal.find('.modal-body').append(modalBody);
		getSkuImage(modal.find('.qd-fpp-image'), skuId);

		var modalItems = '<form class="form-qd-v1">';
		modalItems += '<fieldset class="qd-fpp-fieldset-text"><label>Digite o nome</label><div class="input-group"><input type="text" class="qd-baby-name form-control required" placeholder="Escreva aqui o nome do bebê" maxlength="18"  name="qd_form_baby_name"></div><div class="qd-fpp-preview-text">Preview: <span></span></div></fieldset>';
		modalItems += '<fieldset class="qd-fpp-fieldset-text"><label>Digite o segundo nome</label><div class="input-group"><input type="text" class="qd-baby-name-second form-control required" placeholder="Escreva aqui o nome do bebê" maxlength="18"  name="qd_form_baby_name_second"></div><div class="qd-fpp-preview-text">Preview: <span></span></div></fieldset>';
		modalItems += '<fieldset><label>Escolha a ilustração</label><div class="input-group"><select class="qd-illustration required" name="qd_form_illustration"></select></div></fieldset>';
		modalItems += '<fieldset><label>Escolha a fonte</label><div class="qd-fpp-font input-group-radio"></div></fieldset>';
		modalItems += '<fieldset><label>Escolha a cor</label><div class="input-group"><select class="qd-fpp-colors required"></select></div></fieldset>';
		modalItems += '<fieldset><label class="checkbox"><input class="qd-authorize-remove-product required" type="checkbox" name="qd-form-authorize-remove-product" value="autorizado"> Autorizo a Flicka Kids a retirar o produto da embalagem, para realizar a personalização por mim escolhida.</label></fieldset>';
		modalItems += '</form>';
		modal.find('.qd-fpp-items').append(modalItems);

		var modalFooter = '<a href="javascript: void(0);" class="qd-fpp-close" data-dismiss="modal">Não quero personalizar o produto</a>';
		modalFooter += '<div class="qd-fpp-price">Valor com a personalização:<span class="total-price">R$ ---</span></div>';
		modalFooter += '<div class="product-qd-v1-buy-button"><a class="buy-button qd-fpp-modal-btn" href="#">Comprar personalizado</a></div>';
		modal.find('.modal-footer').append(modalFooter);

		modal.insertAfter($('.qd-v1-modal').first());
		modal.on('hidden.bs.modal', function (e) {
			$(this).remove();
		});
		modal.modal();

		$('.qd-fpp-items select').on("change", function () {
			if ($(this).val())
				$(this).closest('.input-group').addClass('filled');
			else
				$(this).closest('.input-group').removeClass('filled');

			if (!($(this).is('.qd-illustration') && (vtxctx.categoryName.indexOf('Chupeta') > -1)))
				return;

			// updateCustomize(null, '/arquivos/' + $(this).val() + '.png', null);
		});

		$('.qd-fpp-items input[type="radio"]').on("click", function () {
			$('.input-group-radio .radio-inline').removeClass('checked');
			$(this).closest('.radio-inline').addClass('checked');

			updateCustomize(null, null, $(this).val().replaceSpecialChars());
		});

		$('input[type="text"], button', '.qd-fpp-items').on("click keyup", function () {
			var input = $(this).closest('fieldset').find('input');

			if (input.val()) {
				input.closest('.input-group').addClass('filled');
				if(input.is('.qd-baby-name'))
					updateCustomize(input.val());
			}
			else {
				input.closest('.input-group').removeClass('filled');
				if(input.is('.qd-baby-name'))
					updateCustomize(" ");
			}
		});

		getCustomizationOptions(modal);
	}
});