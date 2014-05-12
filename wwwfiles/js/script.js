$(function(){
	//Replace all SVG images with inline SVG
	$('img.svg').each(function(){
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgStyle = $img.attr('style');
		var imgURL = $img.attr('src');
		$.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg');
			// Add replaced image's ID to the new SVG
			if(typeof imgID !== 'undefined') {
				$svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				$svg.attr('class', imgClass + ' replaced-svg');
			}
			// Add replaced image's style to the new SVG
			if(typeof imgStyle !== 'undefined') {
				$svg.attr('style', imgStyle);
			}
			$img.replaceWith($svg);
		});
	});
	showsloagn(1);
});
function showsloagn(sloganID){
	$('#slogan' + sloganID).animate({'margin-top': '75%'}, 250, function() {
		if((++sloganID) <= 4){
			showsloagn(sloganID);
		}
	});
}