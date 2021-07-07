function loadAPIs(){
  var jqxhr = $.getJSON( "assets/json/apis.json", function(data) {
      var tempHeader = $("#headerSearch");
      $.each(data, function( key, APIname){
        var APILI = $('<li></li>');
        var APIButton = $('<button class="usa-accordion-button" aria-expanded = "false"></button>');
        APIButton.attr("aria-controls", "b-a" + (key+1));
        APIButton.attr("name", "b-a" + (key+1));
        APIButton.attr("id", APIname.name.toLowerCase().replace(/\//g, "-").replace(/\s/g, "-"));
        APIButton.click(openTabs);
        APIButton.keydown(arrowThruTabs);
        APIButton.focus(function(){overrideHREF(this);});
        var APISummary = $('<small></small>');
        APISummary.css("font-weight", "400");
        APISummary.html(APIname.summary);
        APIButton.html(APIname.name + ": ");
        APISummary.appendTo(APIButton);
        var APIDiv = $('<div class="usa-accordion-content" style = "display: none"></div');
        APIDiv.attr("id", "b-a" + (key+1));
        APIDiv.html(APIname.html_template);
        //hide tabbing with API is closed;
        $("A", APIDiv).each(function(){
          $(this).attr("tabIndex", -1);
        });
        APIDiv.attr("tabIndex", -1);
        APIButton.appendTo(APILI);
        APIDiv.appendTo(APILI);
        APILI.appendTo("#APIList");
        var addHeader = $("<div class = 'usa-width-one-whole'><a sum = '" + APIname.summary + "' class = 'search-dropdown'><span>" + APIname.name + "</span></a></div>");
        $(addHeader).find("a").attr("href", ("#" + APIname.name.toLowerCase().replace(/\//g, "-").replace(/\s/g, "-")));
        $(addHeader).find("a").attr("name", "api");
        $(addHeader).find("a").keydown(arrowThruTabsHeader);
        addHeader.appendTo(tempHeader);
      });
    })
      .done(function() {
        console.log( "success" );
      })
      .fail(function(jqXHR, textStatus, errorThrown) { 
        console.log( "API Info Download Unsuccesfull" );
        console.log(errorThrown);
        console.log('getJSON request failed! ' + textStatus); 
      });
}
// function to initiate a scroll when a API tab is extended
    async function openTabs(){
      var APIDiv = $(this).next();
      if($(this).attr("aria-expanded") == "true"){
        $("A", APIDiv).each(function(){
          $(this).attr("tabIndex", -1);
        });
      }
      else{
        $("A", APIDiv).each(function(){
          $(this).removeAttr("tabIndex");
        });
      }
    }
    function overrideHREF(apiButton){
      if(apiButton.id == window.location.hash.substring(1) && $(window.location.hash).attr("aria-expanded") == "false"){
        $(window.location.hash).trigger("click");
      }
    }
    function arrowThruTabs(e){
      if(e.keyCode != 38 && e.keyCode != 40){
        return 0;
      }
      var prevButton = "";
      var nextButton = "";
      var tempArray = document.getElementById("APIList").getElementsByTagName("button");
      var arrayB = [];
      for(var x = 0; x < tempArray.length; x++){
        if(tempArray[x].parentElement.style.display != "none"){
          arrayB.push(tempArray[x]);
        }
      }
      for(var y = 0; y < arrayB.length; y++){
        if(document.activeElement.name == arrayB[y].name){
          if(y != 0){
            prevButton = arrayB[y-1];
          }
          else{
            prevButton = document.getElementById("search-field-big");
          }
          if(y != arrayB.length - 1){
            nextButton = arrayB[y+1];
          }
          else{
            nextButton = arrayB[y];
          }
          break;
        }
      }
      if(e.keyCode === 40){
          nextButton.focus();
      }
      else{
          prevButton.focus();
      }
    }

    function arrowThruTabsHeader(e){
      if(e.keyCode != 38 && e.keyCode != 40){
        return 0;
      }
      var prevButton = "";
      var nextButton = "";
      var tempArray = document.getElementById("headerSearch").getElementsByTagName("a");
      var arrayB = [];
      for(var x = 0; x < tempArray.length; x++){
        if(tempArray[x].parentElement.style.display != "none"){
          arrayB.push(tempArray[x]);
        }
      }
      for(var y = 0; y < arrayB.length; y++){
        console.log(arrayB[y].href);
        if(document.activeElement.href == arrayB[y].href){
          if(y != 0){
            prevButton = arrayB[y-1];
          }
          else{
            prevButton = document.getElementById("basic-search-field-small");
          }
          if(y != arrayB.length - 1){
            nextButton = arrayB[y+1];
          }
          else{
            nextButton = arrayB[y];
          }
          break;
        }
      }
      if(e.keyCode === 40){
          nextButton.focus();
      }
      else{
          prevButton.focus();
      }
    }
