import Factory from '../Models/Factory.js';

//Elements
var inputDescription = document.getElementById("inputDescription");
var inputUris = document.getElementById("inputUris");
var inputIsAdultContent = document.getElementById("inputIsAdultContent");

//#region Events
inputDescription.addEventListener("onchange", CheckInputDescription);
inputIsAdultContent.addEventListener("onchange", CheckInputIsAdultContent);

inputDescription.addEventListener("oninput", CheckInputDescription);
inputIsAdultContent.addEventListener("oninput", CheckInputIsAdultContent);
//#endregion Events