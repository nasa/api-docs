var sectionCounter = 1;

function insertBlockXatY(divAddPath,divParentID,isInsertBefore){
  var divParent = document.getElementsByTagName(divParentID);
  var newBlock = document.createElement("div");
  newBlock.id = "section" + sectionCounter.toString();
  sectionCounter++;
  newBlock.setAttribute("w3-include-html" , divAddPath);
  if(isInsertBefore){
    divParent[0].insertBefore(newBlock, divParent[0].children[0]);
  }
  else{
    divParent[0].appendChild(newBlock);
  }
}

function loadContent(){
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("div");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          $(elmnt.children[0]).unwrap();
          loadContent();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
  loadAPIs();
  setupPage();
}