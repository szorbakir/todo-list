//* Select elements
const submit_form = document.getElementById("todo_form_submit");
const submit_form_input = document.getElementById("todo_add");
const todo_list = document.getElementById("list");
const no_todo = document.getElementById("no_todo");
const card = document.querySelector(".card");
const search_form_input = document.getElementById("todo_search");
const clear_todo_button = document.getElementById("clear_todo");

//* add eventListener to clear button:
clear_todo_button.addEventListener("click", clearTodo);

//* add eventListener to search form:
search_form_input.addEventListener("keyup", searchTodo);

//* add eventListener to submit form;
submit_form.addEventListener("submit", addTodo);

//* add eventListener when all DOM objects loaded:
document.addEventListener("DOMContentLoaded", fromStorageToUI);

//* add eventListener to card element:
card.addEventListener("click", deleteTodo);

//* addTodo: get input from form and add to the UI and local storage:
function addTodo(el) {
    if (submit_form_input.value === "") {
        showAlert("danger", "Oh snap! You should enter a TODO!");
    } else {
        const new_todo = submit_form_input.value.trim();

        addUI(new_todo);
        showAlert("success", "Great! You added a TODO!");
        addStorage(new_todo);
    }

    el.preventDefault();
}

//* showAlert: show alert message to the user whether input proccess is success or not:
function showAlert(type, message) {
    //* create alert element:
    const new_alert = document.createElement("div");
    new_alert.className = `alert alert-${type}`;
    new_alert.setAttribute("role", "alert");
    new_alert.style.marginTop = "10px";
    new_alert.appendChild(document.createTextNode(message));

    //* add alert element to the submit form
    submit_form.appendChild(new_alert);

    //* after 2.5s remove alert element:
    setTimeout(function() {
        new_alert.remove();
    }, 2500);
}

//* addUI: create a list element and add to the ul element:
function addUI(new_todo) {
    //* if user successfuly add item then hide "no todo" info:
    no_todo.setAttribute("style", "display: none");

    //* create a close button
    const new_button = document.createElement("button");
    new_button.type = "button";
    new_button.className = "close";
    new_button.id = "delete_todo";
    new_button.innerHTML = '<i class="fas fa-times"></i>';

    //* create li item:
    const list_item = document.createElement("li");
    list_item.className = "list-group-item";
    list_item.appendChild(document.createTextNode(new_todo));
    list_item.appendChild(new_button);

    //* add li item to ul:
    todo_list.appendChild(list_item);
}

//* addStorage: add todo to local storage:
function addStorage(new_todo) {
    let todos;

    //* first check if storage is empty or not, then push new one:
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(new_todo);

    //* add array to the local storage:
    localStorage.setItem("todos", JSON.stringify(todos));
}

//* fromStorageToUI: add items from local storage to IU:
function fromStorageToUI() {
    //* retrive items from local storage:
    let todos = JSON.parse(localStorage.getItem("todos"));

    //* check array, then add items to UI:
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(el => {
            addUI(el);
        });
    }
}

//* deleteTodo: delete element from UI:
function deleteTodo(el) {
    //* if target element corresponds close button remove parent list:
    if (el.target.className === "fas fa-times") {
        const removed_todo = el.target.parentElement.parentElement.textContent;
        el.target.parentElement.parentElement.remove();

        deleteFromstorage(removed_todo);
    }
}

//* deleteFromStorage: delete the removed item also from the storage:
function deleteFromstorage(removed_todo) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    for (let index = 0; index < todos.length; index++) {
        if (todos[index] === removed_todo) {
            todos.splice(index, 1);
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));

    //* check if there is any item on storage, then display "no todo" info!
    if (todos.length === 0) {
        no_todo.setAttribute("style", "display: block");
    }
}

//* searchTodo: search list items and show corresponding ones on IU:
function searchTodo(el) {
    const searchValue = el.target.value.toLowerCase().trim();
    const list_items = document.querySelectorAll(".list-group-item");

    list_items.forEach(el => {
        const text_content = el.textContent;
        if (text_content.indexOf(searchValue) === -1) {
            el.setAttribute("style", "display: none");
        } else {
            el.setAttribute("style", "display: block");
        }
    });
}

//* clearTodo: clear all TODOs:
function clearTodo(el) {
    //* remove all TODOs from the UI:
    const list_items = document.querySelectorAll(".list-group-item");

    list_items.forEach(el => {
        el.remove();
    });

    //* clear local storage:
    localStorage.clear();
}

document.addEventListener("click", showInfo);

function showInfo(el) {
    el.target;
}

// function showInfo() {
//     if (JSON.parse(localStorage.getItem("todos")) === null) {
//         no_todo.setAttribute("style", "display: block");
//     } else {
//         no_todo.setAttribute("style", "display: none");
//     }
// }
