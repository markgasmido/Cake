'use strict';
const URL = "http://localhost:4500/index.html";
const display = document.querySelector("#contentArea");
const createButton = document.querySelector("#createButton");
const cakeName = document.querySelector("#cakeNameInput");
const cakeURL = document.querySelector("#cakeURLInput");
const cakeDescription = document.querySelector("#cakeDescriptionInput");


//Create a cake
const addCakeToContentArea = (res) => {
    const mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "card");
    mainDiv.setAttribute("style", "width: 18rem;");
    mainDiv.setAttribute("id", "box");

    //card image
    const img = document.createElement("img");
    img.setAttribute("src", `${res.data.cakeURL}`);
    img.setAttribute("class", "card-img-top");
    img.setAttribute("alt", `${res.data.cakeName}`);

    mainDiv.appendChild(img);

    //card body
    const bodyDiv = document.createElement("div");
    bodyDiv.setAttribute("class", "card-body");

    const h5 = document.createElement("h5");
    const text = document.createTextNode(`${res.data.cakeName}`);

    h5.appendChild(text);
    bodyDiv.appendChild(h5);

    const cardButton = document.createElement("button");
    cardButton.setAttribute("type", "button");
    cardButton.setAttribute("class", "btn btn-primary");
    cardButton.setAttribute("data-bs-toggle", "modal");
    cardButton.setAttribute("data-bs-target", `#Modal${res.data.id}`);
    const text2 = document.createTextNode("Show More!");

    cardButton.appendChild(text2);
    bodyDiv.appendChild(cardButton);

    //modal
    const modalDiv = document.createElement("div");
    modalDiv.setAttribute("class", "modal fade");
    modalDiv.setAttribute("id", `Modal${res.data.id}`);
    modalDiv.setAttribute("tabindex", "-1");
    modalDiv.setAttribute("aria-labelledby", `ModalLabel${res.data.id}`);
    modalDiv.setAttribute("aria-hidden", "true");

    const modalDialogue = document.createElement("div");
    modalDialogue.setAttribute("class", "modal-dialog");

    const modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content");

    const modalHeader = document.createElement("div");
    modalHeader.setAttribute("class", "modal-header");

    const modalName = document.createElement("h5");
    modalName.setAttribute("class", "modal-title");
    modalName.setAttribute("id", `${res.data.id}ModalLabel`);

    const text3 = document.createTextNode(`${res.data.cakeName}`);
    modalName.appendChild(text3);
    modalHeader.appendChild(modalName);

    const closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "btn-close");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    modalHeader.appendChild(closeButton);
    modalContent.appendChild(modalHeader);

    const modalBody = document.createElement("div");
    modalBody.setAttribute("class", "modal-body");

    const text4 = document.createTextNode(`${res.data.cakeDescription}`);

    modalBody.appendChild(text4);
    modalContent.appendChild(modalBody);

    const modalFooter = document.createElement("div");
    modalFooter.setAttribute("class", "modal-footer");

    const closeButton2 = document.createElement("button");
    closeButton2.setAttribute("type", "button");
    closeButton2.setAttribute("class", "btn btn-secondary");
    closeButton2.setAttribute("data-bs-dismiss", "modal");

    const text5 = document.createTextNode("Close");

    closeButton2.appendChild(text5);
    modalFooter.appendChild(closeButton2);
    modalContent.appendChild(modalFooter);
    modalDialogue.appendChild(modalContent);
    modalDiv.appendChild(modalDialogue);
    bodyDiv.appendChild(modalDiv);
    mainDiv.appendChild(bodyDiv);
    display.appendChild(mainDiv);
}

const createCake = () => {

    const cakeNameValue = cakeName.value;
    const cakeURLValue = cakeURL.value;
    const cakeDescriptionValue = cakeDescription.value;


    let obj = {
        "cakeDescription": cakeDescriptionValue,
        "cakeName": cakeNameValue,
        "cakeURL": cakeURLValue
    }

    axios
        .post(`${URL}/createCake`, obj)
        .then(res => {
            console.log(res);
            addCakeToContentArea(res);
        }).catch(err => console.log(err));
}


//Event listeners
createButton.addEventListener("click", createCake);