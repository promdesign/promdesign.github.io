(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Off-Canvas Navigation.

			// Navigation Toggle.
				$(
					'<div id="navToggle">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navToggle, #navPanel, #page-wrapper')
						.css('transition', 'none');

	});
	
	$(".ajax-form").validate({
		rules: {
			name: {
			required: true,
			minlength: 2
			},
			phone: {
			required: true,
			minlength: 10
			},
			message: {
			required: true,
			}
		},
		messages: {
			name: "Пожалуйста, укажите Ваше имя",
			phone: {
			  required: "Пожалуйста, укажите Ваш телефон для подтверждения заказа",
			  minlength: "Номер телефона не может быть короче 10 символов"
			},
			message: {
			  required: "Пожалуйста, укажите необходимые параметры товара"
			}
		},
		// errorPlacement: function(error, element) {
		// },
		submitHandler: function(form) {
			$.ajax({
				dataType: "jsonp",
				url: "https://getsimpleform.com/messages/ajax?form_api_token=611298e2aef6031a2d171125cf11c1e8",
				data: $(".ajax-form").serialize() 
				}).done(function() {
				//callback which can be used to show a thank you message
				//and reset the form
				$(".ajax-form").hide();
				$(".form-thank-you").fadeIn("400");
				yaCounter15918124.reachGoal('order');
			});
			return false; //to stop the form from submitting
		}
	});
	
	$(document).ready(function() {
		$('.box').matchHeight();
	});
	
	$(document).ready(function() {
		$(".fancybox").fancybox({
			fitToView : true,
			beforeLoad : function() {         
				this.fitToView  = !(this.element.data('fancybox-fit') == false); 
			},
			helpers : {
				title: {
					type: 'over'
			}
    }
		});
	});
	

})(jQuery);