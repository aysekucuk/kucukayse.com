(function($){
	$(function(){
		$('.photo_picker li').each(function(){
			if($(this).find('input').prop('checked'))
				$(this).addClass('active');
			$(this).click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				$(this).find('input').prop('checked', true);
			});
		});
		//
		$('.photo_picker').next().remove();
	});
})(django.jQuery);