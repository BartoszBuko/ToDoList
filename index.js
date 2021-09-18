const submitBtn = document.getElementById("form--container__btn");
const input = document.getElementById("form-container__input");
const container = document.getElementById("list");

// add item to the list
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // add item to the list
  if (input.value !== "") {
    const element = document.createElement("article");
    // add class to the div
    element.classList.add("items--list__item");
    // add id to the item
    const id = new Date().getTime().toString();
    const attribute = document.createAttribute("data-id");
    attribute.value = id;
    element.setAttributeNode(attribute);
    element.innerHTML = ` 
                <p>${input.value}</p>
                <button class="items--list__fa" >
                  <i class="fas fa-times fa-2x"></i>
                </button> 
                `;
    const deleteBtn = element.querySelector(".items--list__fa");
    deleteBtn.addEventListener("click", deleteItem);
    // append child
    container.appendChild(element);

    //   delete old value from input
    input.value = "";
  } else {
    input.value = "Value cannot be empty!";

    setTimeout(() => {
      input.value = "";
    }, 1500);
  }
});

// delete item
function deleteItem(e) {
  const element = e.currentTarget.parentElement;
  container.removeChild(element);
}

// insert date to footer
const year = document.querySelector(".year");
year.innerHTML = new Date().getFullYear();
