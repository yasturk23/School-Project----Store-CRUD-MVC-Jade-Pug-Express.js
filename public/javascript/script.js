//selectors
let modal = document.querySelector(".modal");
let modal2 = document.querySelector(".modal2");

let modalForm = document.querySelector("#modalForm");
let modalForm2 = document.querySelector("#modalForm2");

let overlay = document.querySelector("#overlay");
let newItemImg = document.querySelector("#newItemImg");
let imgInput = document.querySelector("#imgInput");
let newItemSKU = document.querySelector("#newItemSKU");
let newItemPrice = document.querySelector("#newItemPrice");
let newItemBrand = document.querySelector("#newItemBrand");
let newItemName = document.querySelector("#newItemName");
let newItemDescription = document.querySelector("#newItemDescription");

let editItemSKU = document.querySelector("#editItemSKU");
let editItemPrice = document.querySelector("#editItemPrice");
let editItemBrand = document.querySelector("#editItemBrand");
let editItemName = document.querySelector("#editItemName");
let editItemDescription = document.querySelector("#editItemDescription");

//buttons for Add new Item
let addBtn = document.getElementById("addBtn");
let cancelBtn = document.querySelector("#CancelBtn");

//Display/Remove Modal
//////////////////////////////////////////////////////////////////////////////////////////////////
let showModal = () => {
  console.log("modal on");
  modal.style.visibility = "visible";
  overlay.style.visibility = "visible";
};

let showModal2 = () => {
  console.log("modal2 on");
  modal2.style.visibility = "visible";

  overlay.style.visibility = "visible";
};

let removeModal = () => {
  console.log("modal off");
  modal.style.visibility = "hidden";
  overlay.style.visibility = "hidden";
  newItemImg.src = "/images/image-placeholder.png";
  modalForm.reset();
};

let removeModal2 = () => {
  console.log("modal2 off");

  modal2.style.visibility = "hidden";

  overlay.style.visibility = "hidden";
};

//Event Listeners/Form submit functions
/////////////////////////////////////////////////////////////////////////////////////////////////////
addBtn.addEventListener("click", showModal);
//////////////////////////
let setEditBtn = function () {
  let editBtn = document.querySelectorAll("#editBtn");

  editBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      //console.log(btn.parentElement.children[2]);
      let modal = btn.parentElement.children[2];
      modal.style.visibility = "visible";

      overlay.style.visibility = "visible";

      // let imgUrl = btn.parentElement.parentElement.children[0].children[0].src;
      // let sku = btn.parentElement.parentElement.children[1].textContent;
      // let brand = btn.parentElement.parentElement.children[2].textContent;
      // let name = btn.parentElement.parentElement.children[3].textContent;
      // let price = parseFloat(
      //   btn.parentElement.parentElement.children[4].textContent
      // );
    });
  });
};

////////////////////////////
cancelBtn.addEventListener("click", removeModal);
///////////////////////////////////
let setEditCancelBtns = function () {
  let editCancelBtn = document.querySelectorAll("#editCancelBtn");

  editCancelBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let modal = btn.parentElement.parentElement.parentElement.parentElement;
      modal.style.visibility = "hidden";
      overlay.style.visibility = "hidden";
    });
  });
};
//////////////////////////

let setDelCancelBtns = function () {
  let delCancelBtn = document.querySelectorAll("#delCancelBtn");
  delCancelBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let modal =
        btn.parentElement.parentElement.parentElement.parentElement
          .parentElement;
      //console.log(modal);

      modal.style.visibility = "hidden";
      overlay.style.visibility = "hidden";
    });
  });
};

//////////////////////////////////////

newItemImg.addEventListener("click", (e) => {
  console.log("image clicked");
  imgInput.click();
});

let setEditItemImg = function () {
  let editItemImg = document.querySelectorAll("#editItemImg");

  editItemImg.forEach((image) => {
    image.addEventListener("click", (e) => {
      console.log("image clicked");
      //console.log(image.nextSibling);
      let editImgInput = image.nextSibling;
      editImgInput.click();
    });
  });
};

function readImage(file) {
  // Check if the file is an image.
  if (file.type && !file.type.startsWith("image/")) {
    console.log("File is not an image.", file.type, file);
    return;
  }
}

imgInput.addEventListener("change", (e) => {
  let newItemImage = e.target.files[0];
  //console.log(newItemImage);

  let reader = new FileReader();
  reader.addEventListener("load", (e) => {
    newItemImg.src = e.target.result;
  });
  reader.readAsDataURL(newItemImage);
});
///////////////////////////////

let setEditImgInputs = function () {
  let editImgInput = document.querySelectorAll("#editImgInput");

  editImgInput.forEach((input) => {
    input.addEventListener("change", (e) => {
      //console.log(input);
      let editImg = input.parentElement.firstChild;
      //console.log(input.parentElement.firstChild);
      let newEditImgInput = e.target.files[0];
      //console.log(newEditImgInput);

      let reader = new FileReader();
      reader.addEventListener("load", (e) => {
        editImg.src = e.target.result;
      });
      reader.readAsDataURL(newEditImgInput);
    });
  });
};

////////////////////////////////////////////
let setDeleteBtns = function () {
  let delBtn = document.querySelectorAll("#delBtn");

  delBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log("del btn clicked");

      let sku = Number(btn.parentElement.parentElement.children[1].textContent);
      console.log(sku);
      let itemRow = btn.parentElement.parentElement;
      let modal = itemRow.children[5].children[3];
      modal.style.visibility = "visible";

      overlay.style.visibility = "visible";
    });
  });
};

////////////////////////////////////

let setDelConfirmBtns = function () {
  let delConfirmBtn = document.querySelectorAll("#delConfirmBtn");

  delConfirmBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      let form = btn.parentElement.parentElement.parentElement;
      let modal = form.parentElement.parentElement;

      console.log(modal.parentElement.parentElement);
      let itemRow = modal.parentElement.parentElement;

      let sku =
        form.children[0].children[1].children[0].textContent.split(" ")[1];

      axios
        .post(
          `/items/delete`,
          {
            params: {
              sku: `${sku}`,
            },
          },
          {
            "Content-Type": "text/json",
          }
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err.message);
        })
        .then(() => {});
      modal.style.visibility = "hidden";
      overlay.style.visibility = "hidden";
      itemRow.remove();
    });
  });
};

/////////////////////////////////////////

let setEditBtns = function () {
  let editConfirmBtn = document.querySelectorAll("#editConfirmBtn");

  editConfirmBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log("edit btn clicked");
      e.preventDefault();

      let form = btn.parentElement.parentElement;
      let modal = form.parentElement.parentElement;
      //console.log(modal);

      let formData = new FormData(form);

      axios
        .post(
          `/items/edit`,

          formData
        )
        .catch((err) => console.log(err))
        .then(() => {
          modal.style.visibility = "hidden";
          overlay.style.visibility = "hidden";
          location.reload();
        });
    });
  });
};
//////////////////////////////////

modalForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let tableBody = document.getElementsByTagName("tbody")[0];
  //console.log(tableBody);

  let formData = new FormData();

  formData.append("sku", newItemSKU.value);
  formData.append("price", newItemPrice.value);
  formData.append("brand", newItemBrand.value);
  formData.append("name", newItemName.value);
  formData.append("description", newItemDescription.value);
  formData.append("image", imgInput.files[0]);

  // const config = {
  //   headers: {
  //     "content-type": `application/x-www-form-urlencoded,
  //       boundary=${formData._boundary}`,
  //   },
  // };

  axios
    .post("/items", formData)

    .then((res) => {
      //console.log(formData);
      let newItem = { ...formData };
      //console.log(newItem);
      let newRow = tableBody.insertRow(0);
      let newCell = newRow.insertCell(0);
      newCell.classList.add("table-center");
      const image = document.createElement("img");
      image.classList.add("item-picture");
      newCell.appendChild(image);

      let reader = new FileReader();
      reader.onload = function () {
        image.src = reader.result;
      };
      ////////////
      if (imgInput.files[0] !== undefined) {
        reader.readAsDataURL(imgInput.files[0]);
      }

      newCell = newRow.insertCell(1);
      newCell.classList.add("table-center");
      newCell.textContent = newItemSKU.value;

      newCell = newRow.insertCell(2);
      newCell.classList.add("table-center");
      newCell.textContent = newItemBrand.value;

      newCell = newRow.insertCell(3);
      newCell.classList.add("table-center");
      newCell.textContent = newItemName.value;

      newCell = newRow.insertCell(4);
      newCell.classList.add("table-center");
      newCell.textContent = `${newItemPrice.value} $`;

      newCell = newRow.insertCell(5);
      newCell.classList.add("table-center");
      let editIcon = document.createElement("i");
      editIcon.className = "fas fa-edit";
      editIcon.setAttribute("id", "editBtn");

      newCell.append(editIcon);

      let trashIcon = document.createElement("i");
      trashIcon.className = "far fa-trash-alt";
      trashIcon.setAttribute("id", "delBtn");

      newCell.append(trashIcon);

      newCell.innerHTML += `<div class="modal2"> <div class="modal2-header"> <h1>Modification d'un produit</h1></div><div class="modal2-body"><form id="modal2Form" action="/items/edit" method="POST"><div style="display:flex;justify-content: space-around; margin: 5%;"> <div><img class='newAddedImg' id="editItemImg" 
      
      src="/uploads/8e722fcd-df65-491b-8246-8edf6425d7da.jpg" 
      
      
      alt="Placeholder for new item" name="editImg" width="60%" height="60%"><input class="form-control-file" id="editImgInput" type="file" name="image"></div><div><label for="SKU">SKU</label><br><input id="editItemSKU" type="text" name="SKU" value=${newItemSKU.value} readonly="readonly"><br><label for="Prix">Prix</label><br><input id="editItemPrice" type="number" name="Prix" value=${newItemPrice.value} required="required"></div></div><br><label for="Marque">Marque</label><br><input id="editItemBrand" type="text" name="Marque" value=${newItemBrand.value} maxlength="30" minlength="2"><br><label for="Nom">Nom</label><br><input id="editItemName" type="Nom" name="Nom" value=${newItemName.value} required="required"><br><label for="Description">Description</label><br><textarea id="editItemDescription" name="Description" cols="8" rows="10">${newItemDescription.value}</textarea><br><div style="display:flex;justify-content: flex-end"> <button class="btn" id="editConfirmBtn" type="submit" value="Confirmer">Confirmer</button><button class="btn" id="editCancelBtn" type="button" value="Annuler">Annuler</button></div></form></div></div>`;

      let reader2 = new FileReader();
      console.log("line 351");

      console.log(imgInput.files[0]);
      if (imgInput.files[0]) {
        reader2.onload = function () {
          document.querySelector(".newAddedImg").src = reader2.result;
        };
        reader2.readAsDataURL(imgInput.files[0]);
      }

      newCell.innerHTML += `<div class="modal3"> <div class="modal3-header"> <h1>Confirmation</h1></div><div class="modal3-body"><form id="modal3Form" action="/items/delete" method="POST"><div style="display:flex;justify-content: space-around; margin: 5%;"> <div><img id="editItemImg" src="/uploads/8e722fcd-df65-491b-8246-8edf6425d7da.jpg" alt="Placeholder for new item" name="editImg" width="60%" height="60%"></div><div><label for="SKU">SKU: 6720574</label><br><label for="Marque">Marque: 1</label><br><label for="Prix">Prix: 1$</label><br><br><br><br><br><button class="btn" id="delConfirmBtn" type="submit" value="Confirmer">Confirmer</button><button class="btn" id="delCancelBtn" type="button" value="Annuler">Annuler</button></div></div></form></div></div>`;
    })

    .catch((err) => {
      console.log(err.message);
    })
    .then(() => {
      removeModal();
      setEditBtn();
      setEditCancelBtns();
      setEditItemImg();
      setEditImgInputs();
      setDeleteBtns();
      setDelConfirmBtns();
      setEditBtns();
      setDelCancelBtns();
    });
});

//Function Calls
///////////////////////////////////////////////////////////////////////////////////////////////////////

setEditBtn();
setEditCancelBtns();
setEditItemImg();
setEditImgInputs();
setDeleteBtns();
setDelConfirmBtns();
setEditBtns();
setDelCancelBtns();
