function setupPage() {
  var temp = $("#headerSearch");
  var added = $("<div class = 'usa-width-one-whole'><a href = '#main-content' class = 'search-dropdown'><span>Overview</span></a></div>");
  $(added).find("a").keydown(arrowThruTabsHeader);
  added.appendTo(temp);
  added = $("<div class = 'usa-width-one-whole'><a href = '#signUp' class = 'search-dropdown' name = 'div' ><span>Generate API Key</span></a></div>");
  $(added).find("a").keydown(arrowThruTabsHeader);
  added.appendTo(temp);
  added = $("<div class = 'usa-width-one-whole'><a href = '#authentication' class = 'search-dropdown' name = 'div' ><span>Authentication</span></a></div>");
  $(added).find("a").keydown(arrowThruTabsHeader);
  added.appendTo(temp);
  added = $("<div class = 'usa-width-one-whole'><a href = '#recovery' class = 'search-dropdown' name = 'div'><span>Recover API Key</span></a></div>");
  $(added).find("a").keydown(arrowThruTabsHeader);
  added.appendTo(temp);
  added = $("<div class = 'usa-width-one-whole'><a href = '#browseAPI' class = 'search-dropdown' name = 'div'><span>Browse APIs</span></a></div>");
  $(added).find("a").keydown(arrowThruTabsHeader);
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

  var isChromium = window.chrome;
var winNav = window.navigator;
var vendorName = winNav.vendor;
var isOpera = typeof window.opr !== "undefined";
var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");

if (isIOSChrome) {
  var style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet.insertRule('@media screen and (min-width: 1026px){.usa-nav{padding-top: 4.5rem !important;}}');
} else if(
  isChromium !== null &&
  typeof isChromium !== "undefined" &&
  vendorName === "Google Inc." &&
  isOpera === false &&
  isIEedge === false
) {
  var style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet.insertRule('@media screen and (min-width: 1002px){.usa-nav{padding-top: 4.5rem !important;}}');
} 
document.getElementById("search-field-big").addEventListener("keydown", toSearchResults);
document.getElementById("basic-search-field-small").addEventListener("keydown", toSearchResultsHeader);

};