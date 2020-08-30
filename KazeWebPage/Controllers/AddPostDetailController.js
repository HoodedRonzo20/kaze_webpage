import Factory from '../Models/Factory.js';

//Elements
var inputTitle = document.getElementById("inputTitle");
var inputTags = document.getElementById("inputTags");
var inputDescription = document.getElementById("inputDescription");
var inputUris = document.getElementById("inputUris");
var inputIsAdultContent = document.getElementById("inputIsAdultContent");

//#region Events
inputTitle.addEventListener("onchange", CheckInputTitle);
inputDescription.addEventListener("onchange", CheckInputDescription);
inputTags.addEventListener("onchange", CheckInputTags);
inputIsAdultContent.addEventListener("onchange", CheckInputIsAdultContent);

inputTitle.addEventListener("oninput", CheckInputTitle);
inputDescription.addEventListener("oninput", CheckInputDescription);
inputTags.addEventListener("oninput", CheckInputTags);
inputIsAdultContent.addEventListener("oninput", CheckInputIsAdultContent);
//#endregion Events

function CheckInputTitle() {
    try {
        Factory.CheckValTitle(inputTitle)
        //input... //da impostare il bordo verde
    } catch (error) {
        //input... //da impostare il bordo rozzo
    }
}

function CheckInputDescription() {
    try {
        Factory.CheckValDescription(inputDescription)
        //input... //da impostare il bordo verde
    } catch (error) {
        //input... //da impostare il bordo rozzo
    }
}

function CheckInputTags() {
    try {
        Factory.CheckValTags(inputTags)
        //input... //da impostare il bordo verde
    } catch (error) {
        //input... //da impostare il bordo rozzo
    }
}

function CheckInputIsAdultContent() {
    try {
        Factory.CheckValTitle(inputIsAdultContent)
        //input... //da impostare il bordo verde
    } catch (error) {
        //input... //da impostare il bordo vrozzo
    }
}