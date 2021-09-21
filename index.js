const submitBtn = document.getElementById("form--container__btn");
const input = document.getElementById("form-container__input");
const container = document.getElementById("list");

// get and write items from local storage

document.addEventListener("DOMContentLoaded", () => {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => addTodo(item.id, item.value));
  }
});

//* add item to the list
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value !== "") {
    // add item to the list
    const id = new Date().getTime().toString();
    addTodo(id, input.value);
    addToLocalStorage(id, input.value);

    // localStorage.getItem("todos").filter((item) => {
    //   item > 10;
    // });
  } else {
    input.value = "Value cannot be empty!";

    setTimeout(() => {
      input.value = "";
    }, 1500);
  }
});

// add item
function addTodo(id, item) {
  const element = document.createElement("article");
  // add class to the div
  element.classList.add("items--list__item");
  // add id to the item
  const attribute = document.createAttribute("data-id");
  attribute.value = id;
  element.setAttributeNode(attribute);
  element.innerHTML = ` 
                <p>${item}</p>
                <button class="items--list__fa" >
                  <i class="fas fa-times fa-2x"></i>
                </button> 
                `;
  const deleteBtn = element.querySelector(".items--list__fa");
  deleteBtn.addEventListener("click", deleteItem);

  // append child
  container.appendChild(element);

  //   delete old value from input
}

//* delete item
function deleteItem(e) {
  const element = e.currentTarget.parentElement;
  container.removeChild(element);
  const articleId = e.currentTarget.parentElement.getAttribute("data-id");
  removeFromLocalStorage(articleId);
}

// get local storage
function getLocalStorage() {
  return localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
}

// add to local storage
function addToLocalStorage(id, value) {
  const list = { id, value };
  let items = getLocalStorage();

  items.push(list);
  localStorage.setItem("todos", JSON.stringify(items));
  input.value = "";
}

// remove from local storage
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  console.log();
  items = items.filter((item) => item.id !== id);
  // localStorage.removeItem('todos');
  localStorage.setItem("todos", JSON.stringify(items));
}

// insert date to footer
const year = document.querySelector(".year");
year.innerHTML = new Date().getFullYear();
