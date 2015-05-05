
$(document).ready(function() {
	$("input[value='home']").remove();
	$("#home").remove();
	$("#tocify-header0 .tocify-item a").on("click", function() {
		window.location.href = "/landing.html";
	});
	
	$("input[value='api-listing']").remove();
	$("#api-listing").remove();
	$("#tocify-header1 .tocify-item a").on("click", function() {
		window.location.href = "/#apply-for-an-api-key";
	});
	
	$("input[value='getting-started-link']").remove();
	$("#getting-started-link").remove();
	$("#tocify-header1 .tocify-item a").on("click", function() {
		window.location.href = "/landing.html#getting-started";
	});
});
