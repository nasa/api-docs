
$(document).ready(function() {
	$("input[value='home']").remove();
	$("#home").remove();
	$("#tocify-header0 .tocify-item a").on("click", function() {
		window.location.href = "/api-docs/index.html";
	});
	
	$("input[value='api-listing']").remove();
	$("#api-listing").remove();
	$("#tocify-header1 .tocify-item a").on("click", function() {
		window.location.href = "/api-docs/api.html#authentication";
	});
	
	$("input[value='getting-started-link']").remove();
	$("#getting-started-link").remove();
	$("#tocify-header1 .tocify-item a").on("click", function() {
		window.location.href = "/api-docs/index.html#getting-started";
	});
});
