'use strict';
const URL = "http://localhost:4500/index.html";
const display = document.querySelector("#contentArea");

//create
const createButton = document.querySelector("#createButton");
const cakeName = document.querySelector("#cakeNameInput");
const cakeURL = document.querySelector("#cakeURLInput");
const cakeDescription = document.querySelector("#cakeDescriptionInput");

//search
const searchId = document.querySelector("#searchId");
const searchName = document.querySelector("#searchName");
const searchButton = document.querySelector("#searchButton");
const searchButton2 = document.querySelector("#searchButton2")
const searchTitle = document.querySelector("#searchModalTitle");
const searchBody = document.querySelector("#searchModalBody");
const searchTopClose = document.querySelector("#searchTopClose");
const searchModalClose = document.querySelector("#searchModalClose");

//delete + update



const updateButton = document.querySelector("#updateButton");
const updateId = document.querySelector("#updateCakeIdInput");
const updateName = document.querySelector("#updateCakeNameInput");
const updateDescription = document.querySelector("#updateCakeDescriptionInput");
const updateURL = document.querySelector("#updateCakeURLInput");







//Create a cake
const addCakeToContentArea = (res) => {
    const mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "card cake");
    mainDiv.setAttribute("style", "width: 18rem;");
    mainDiv.setAttribute("id", `mainDiv${res.data.id}`);

    //card image
    const img = document.createElement("img");
    img.setAttribute("src", `${res.data.cakeURL}`);
    img.setAttribute("class", "card-img-top");
    img.setAttribute("alt", `${res.data.cakeName}`);
    img.setAttribute("id",`URL${res.data.id}`);

    mainDiv.appendChild(img);

    //card body
    const bodyDiv = document.createElement("div");
    bodyDiv.setAttribute("class", "card-body");

    const h5 = document.createElement("h5");
    h5.setAttribute("id",`cardCakeName${res.data.id}`)
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
    modalDialogue.setAttribute("class", "modal-dialog modal-dialog-centered");

    const modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content");

    const modalHeader = document.createElement("div");
    modalHeader.setAttribute("class", "modal-header");

    const modalId = document.createElement("h6");
    modalId.setAttribute("id", `cakeId${res.data.id}`);
    const text3 = document.createTextNode(`${res.data.id}`);
    modalId.appendChild(text3);

    const modalName = document.createElement("h5");
    modalName.setAttribute("class", "modal-title");
    modalName.setAttribute("id", `ModalLabel${res.data.id}`);

    const text4 = document.createTextNode(`${res.data.cakeName}`);
    const h52 = document.createElement("h5");
    h52.setAttribute("id",`h52${res.data.id}`);
    h52.appendChild(text4)
    
    modalName.appendChild(modalId);
    modalName.appendChild(h52);
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
    modalBody.setAttribute("id",`modal-body${res.data.id}`);

    const text5 = document.createTextNode(`${res.data.cakeDescription}`);

    modalBody.appendChild(text5);
    modalContent.appendChild(modalBody);

    const modalFooter = document.createElement("div");
    modalFooter.setAttribute("class", "modal-footer");

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("class", "btn btn-danger");
    deleteButton.setAttribute("data-bs-dismiss", "modal");
    deleteButton.setAttribute("id", "deleteButton");
    deleteButton.setAttribute("onClick", `deleteCake(${res.data.id})`);


    const text7 = document.createTextNode("Delete");
    deleteButton.appendChild(text7);
    modalFooter.appendChild(deleteButton);

    const closeButton2 = document.createElement("button");
    closeButton2.setAttribute("type", "button");
    closeButton2.setAttribute("class", "btn btn-secondary");
    closeButton2.setAttribute("data-bs-dismiss", "modal");
    const text6 = document.createTextNode("Close");
    closeButton2.appendChild(text6);
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


// search for a cake using name - faulty
const getCakeByName = () => {
    const cakeName = searchName.value;

    axios
        .get(`${URL}/getOneByName/${cakeName}`)
        .then(res => {
            const text = document.createTextNode(`${res.data.cakeName}`);
            searchTitle.appendChild(text);

            const text2 = document.createTextNode(`${res.data.cakeDescription}`);
            searchBody.appendChild(text2);
        })
        .catch(err => console.log(err));
}


// search for a cake using id
const getCakeById = () => {
    const cakeId = searchId.value;

    axios
        .get(`${URL}/getOne/${cakeId}`)
        .then(res => {
            const text = document.createTextNode(`${res.data.cakeName}`);
            searchTitle.appendChild(text);

            const text2 = document.createTextNode(`${res.data.cakeDescription}`);
            searchBody.appendChild(text2);
        })
        .catch(err => console.log(err));
}


const resetModal = () => {
    searchBody.innerHTML = "";
    searchTitle.innerHTML = "";
}


// delete a cake
const deleteCake = (id) => {
    const toRemoveFromDisplay = document.querySelector(`#mainDiv${id}`);

    axios
        .delete(`${URL}/remove/${id}`)
        .then(res => {
            console.log(res);
            while(toRemoveFromDisplay.firstChild){
                toRemoveFromDisplay.removeChild(toRemoveFromDisplay.firstChild);
            }
            display.removeChild(toRemoveFromDisplay);
        }).catch(err => console.log(err));
}

//update a cake
const resetUpdateForm = () => {
    updateId.value = "";
    updateName.value = "";
    updateDescription.value = "";
    updateURL.value = "";
}

const updateCake = () => {
    let obj = {
        "id" : updateId.value,
        "cakeName" : updateName.value, 
        "cakeDescription" : updateDescription.value,
        "cakeURL" : updateURL.value
    }

    axios
        .put(`${URL}/update/${updateId.value}`,obj)
        .then(res =>{
            console.log(res);
            updateDisplay(res);
            // resetUpdateForm();
        })
}

const updateDisplay = (res) => {
    const cardName = document.querySelector(`#cardCakeName${res.data.id}`);
    cardName.innerHTML = `${res.data.cakeName}`;

    const cardURL = document.querySelector(`#URL${res.data.id}`);
    cardURL.setAttribute("src",`${res.data.cakeURL}`);
    cardURL.setAttribute("alt",`${res.data.cakeName}`);

    const modalTitle = document.querySelector(`#h52${res.data.id}`);
    modalTitle.innerHTML = `${res.data.cakeName}`;

    const modalBody = document.querySelector(`#modal-body${res.data.id}`);
    modalBody.innerHTML = `${res.data.cakeDescription}`;

}

//Event listeners
createButton.addEventListener("click", createCake);
searchButton.addEventListener("click", getCakeById);
searchButton2.addEventListener("click", getCakeByName);
searchModalClose.addEventListener("click", resetModal);
searchTopClose.addEventListener("click",resetModal);
updateButton.addEventListener("click", updateCake);

