// Overrides the href call to div to adapt to the header
document.onclick = function (e) {
    $("#headerSearch").css("display","none");
    e = e ||  window.event;
    var element = e.target || e.srcElement;
    if(element.tagName == 'SPAN'){
        element = element.parentElement;
    }
    if(element.href != null){
        var nameSplit = element.href.split('/');
        nameSplit = nameSplit[nameSplit.length - 1].replace(/%20/g, " ");
        if (element.tagName == 'A'&& $(nameSplit).is('button') && $(element).parent().attr("class") == "usa-width-one-whole") {
            $(nameSplit).click();
            return false; // prevent default action and stop event propagation
        }
        else if (element.tagName == 'A'&& nameSplit[0] == '#') {
            goTo(nameSplit.substring(1));
            return false; // prevent default action and stop event propagation
        }
    }
  };
//function replacing the "scrollTo" for href div calls
function goTo(divName){
    var divTop = document.getElementById(divName).getBoundingClientRect().top;
    if($("#" + divName).parent().is('li')){
        divTop -= 30;
    }
    //Space buffer base for Mobile vs Desktop view
    if(window.innerWidth > 951){
        divTop -= 80;
    }
    else{
        divTop -= 32;
    }
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    if(isSafari){
        var target = $("#" + divName);
            $('html, body').animate({
                scrollTop: divTop + window.scrollY
            }, 500, function() {
                return false;
            });
    }
    else{
        window.scrollBy({left: 0, top: divTop, behavior: "smooth"});
    }
    $("#" + divName).attr("tabindex", "0");
    $("#" + divName)[0].focus({preventScroll:true});   
    if($("#" + divName).is("Section")){
        $("#" + divName).attr("tabindex", "-1");
    }
    highlightMenu();
}
//Displays the Application URL help
function displayHelp(enterExit, divHelpName2){
    if(enterExit){
        $('#' + divHelpName2).css('display','block');
    }
    else{
        $('#' + divHelpName2).css('display','none');
    }
}
var clickOn = {};
function displayHelpClick(thisDiv, divHelpName){
    if(clickOn[thisDiv] == null){
        clickOn[thisDiv] = true;
    }
    else{
        clickOn[thisDiv] = !clickOn[thisDiv]; 
    }
    displayHelp(clickOn[thisDiv], divHelpName);
    if(clickOn[thisDiv]){
        $("#" + thisDiv).off("mouseenter")
        .off("mouseout")
        .off("focusin")
        .off("focusout");
    }
    else{
        $("#" + thisDiv).on("mouseenter", function(){displayHelp(true, divHelpName)})
            .on("mouseout", function(){displayHelp(false, divHelpName)})
            .on("focusin", function(){displayHelp(true, divHelpName)})
            .on("focusout", function(){displayHelp(false, divHelpName)});
    }
}

//async function for editing Generate API key form after load
var resolveCounter = 0;
function resolveAfterTenthSeconds() {
    return new Promise(resolve => {
     setTimeout(() => {
        if(document.getElementById("apidatagov_signup_form") != null && document.getElementById("apidatagov_signup_form").length > 4){
            resolveCounter = 0;
            resolve("true");
        }
        else if(resolveCounter < 30){
            resolve("false");
        }
        else{
            resolve("error in loading form");
        }
     }, 100);
    });
  }
  function resolveAfterSucessfulKey() {
    return new Promise(resolve => {
     setTimeout(() => {
        if(document.getElementById("apidatagov_signup_form") == null){
            resolveCounter = 0;
            resolve("true");
        }
        else{
            resolve("false");
        }
     }, 100);
    });
  }

  async function asyncCall() {
    var result = await resolveAfterTenthSeconds();
    if(result == "true"){
        $("#apidatagov_signup").removeClass();
            //.children().eq(1).css("text-align","center");
        $($("#apidatagov_signup").children().eq(1)[0].children[0]).remove();
        $("#apidatagov_signup").children().eq(1).html("*" + $("#apidatagov_signup").children().eq(1).html());

        $("#apidatagov_signup_form").addClass("usa-form");
        //$("#apidatagov_signup_form").css("margin", "0 auto");
        for(var x = 0; x < 4; x++){
            var temp = $("#apidatagov_signup_form").children().eq(x);
            temp.children().eq(0).removeClass("col-sm-4");
            temp.children().eq(0).removeClass("control-label");
            temp.children().eq(0).children().eq(0).remove();
            temp.children().eq(0).html("*" + temp.children().eq(0).html());
            var tempChild = temp.children().eq(1).children().eq(0);
            tempChild.removeClass("form-control");
            temp.children().eq(1).remove();
            temp.append(tempChild);
        }
        var textDiv = document.getElementById("apidatagov_signup_form").children[3]
        textDiv.children[0].innerHTML = "Application URL<img src='assets/img/alerts/info.svg' alt='Info I icon' height = '20px' width = '20px' class = 'infoDiv' tabindex = '0' onclick = 'displayHelpClick(this.id, \"infoTab\")' id = 'infoPic'>(optional):";
        $("#infoPic").on("mouseenter", function(){displayHelp(true, 'infoTab');})
        .on("mouseout", function(){displayHelp(false, 'infoTab');})
        .on("focusin", function(){displayHelp(true, 'infoTab')})
        .on("focusout", function(){displayHelp(false, 'infoTab')});
        textDiv.children[1].remove();
        var newField = document.createElement("input");
        newField.id = "user_use_description";
        newField.name = "user[use_description]";
        newField.size = "50";
        newField.type = "url";
        document.getElementById("apidatagov_signup_form").children[3].appendChild(newField);
        var help = document.createElement("label");
        help.id = "infoTab";
        help.style.display = "none";
        help.animation = "slidein-bottom .3s ease-in-out";
        help.innerHTML = "<small>Enter the URL that you will use your API key with. We would love to see what you do with your key!</small>";
        textDiv.insertBefore(help, textDiv.children[1]);
        var submitButton = $("#apidatagov_signup_form").find("button");
        submitButton.on("click", function(){rmPeriods();});
    }
    else if(result == "false"){
        asyncCall();
    }
    else{
        alert(result);
    }
}

// Searches by name and summary of the APIs
function searchFunction() { 
  var input = document.getElementById('search-field-big');
  var filter = input.value.toUpperCase();
  var ul = document.getElementById("APIList");
  var li = ul.children;
  for (i = 0; i < li.length; i++) {
    var a = li[i].getElementsByTagName("button")[0];
    var txtValue = a.textContent || a.innerText;
    var b = li[i].getElementsByTagName("small")[0];
    var txtValueB = b.textContent || b.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValueB.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
function toSearchResults(e){
    if(e.keyCode === 40){
        var arrayB = document.getElementById("APIList").getElementsByTagName("button");
        for(var x = 0; x < arrayB.length; x++){
          if(arrayB[x].parentElement.style.display != "none"){
            arrayB[x].focus();
            break;
          }
        }
    } 
}
function toSearchResultsHeader(e){
    if(e.keyCode === 40){
        var arrayB = document.getElementById("headerSearch").getElementsByTagName("a");
        for(var x = 0; x < arrayB.length; x++){
          if(arrayB[x].parentElement.style.display != "none"){
            arrayB[x].focus();
            break;
          }
        }
    } 
}

//Same as above, but includes the other divs on the page
function searchHeader(){
    var input = document.getElementById('basic-search-field-small');
    var filter = input.value.toUpperCase();
    var bigDiv = document.getElementById("headerSearch");
    var childDiv = bigDiv.children;
    if(filter.length > 0){
        bigDiv.style.display = "block";

        for (i = 0; i < childDiv.length; i++) {
        var a = childDiv[i].getElementsByTagName("a")[0];
        var txtValue = a.textContent || a.innerText;
        var txtValueB = "xxxxxxx";
        if(a.sum != null){
            txtValueB = a.sum;
        }
        if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValueB.toUpperCase().indexOf(filter) > -1) {
            childDiv[i].style.display = "";
        } else {
            childDiv[i].style.display = "none";
        }
        }
    }
}

// removes periods from error submit forms 
async function rmPeriods(){
    var result2 = await resolveAfterTenthSeconds();
    result2 = "";
    var liElements = $("#apidatagov_signup_form").find("li");
    if(liElements.length != 0){
        for(var x = 0; x < liElements.length; x++){
            liElements[x].innerHTML = liElements[x].innerHTML.substring(0, liElements[x].innerHTML.length-1);
        }
    }
    else{
        for(var x = 0; x < 30; x++){
            result2 = await resolveAfterSucessfulKey();
            if(result2 == "true"){
                goTo("signUp");
                break;
            }
        }
    }
}
//checks if div is in top half of page
function isElementInViewport (el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 && rect.top <= window.innerHeight/2
    );
}

//adapts the header menu with location highlights
var topDiv = "#main-content";
function highlightMenu(){
    var checkTopDiv = isElementInViewport($(topDiv));
    if(!checkTopDiv){
      var divList = ["#main-content", "#signUp", "#authentication", "#recovery", "#browseAPI"];
      for(var x = 0; x < 5; x++){
        if(isElementInViewport($(divList[x]))){
          $("#headerContent").children().eq(divList.indexOf(topDiv)).children().removeClass( "currentDiv" );
          topDiv = divList[x];
          $("#headerContent").children().eq(x).children().addClass("currentDiv");
          break;
        }
      }
    }
}
