function setupPage() {
  var temp = $("#headerSearch");
  var added = $("<div class = 'usa-width-one-whole'><a href = '#main-content' class = 'search-dropdown'><span>Overview</span></a></div>");
  added.appendTo(temp);
  added = $("<div class = 'usa-width-one-whole'><a href = '#signUp' class = 'search-dropdown' name = 'div' ><span>Generate API Key</span></a></div>");
  added.appendTo(temp);
  added = $("<div class = 'usa-width-one-whole'><a href = '#authentication' class = 'search-dropdown' name = 'div' ><span>Authentication</span></a></div>");
  added.appendTo(temp);
  added = $("<div class = 'usa-width-one-whole'><a href = '#recovery' class = 'search-dropdown' name = 'div'><span>Recover API Key</span></a></div>");
  added.appendTo(temp);
  added = $("<div class = 'usa-width-one-whole'><a href = '#browseAPI' class = 'search-dropdown' name = 'div'><span>Browse APIs</span></a></div>");
  added.appendTo(temp);
  var dio = $("#myHeader"); //you thought this variable would be named "header", but it was I, DIO
  dio.addClass("sticky");
  insertFooterHere("main-content");
  $("#infoPic2").on("mouseenter", function(){displayHelp(true, 'infoTab2');})
    .on("mouseout", function(){displayHelp(false, 'infoTab2');})
    .on("focusin", function(){displayHelp(true, 'infoTab2')})
    .on("focusout", function(){displayHelp(false, 'infoTab2')});

  var checkDivMove = false;
  window.onresize = function(){
    if (window.innerWidth < 951){
      if(checkDivMove == false){
        $("#headerForm").insertBefore($("#headerContent"));
      }
      checkDivMove = true;
    }
    else {
      if(checkDivMove == true){
        $("#headerContent").insertBefore($("#headerForm"));
      }
      checkDivMove = false;
    }
  };
  $("#headerContent").children().eq(0).children().addClass("currentDiv");
  window.onscroll = function(){
    highlightMenu();
  };
};