


const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];


runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", removeAllTodos);
    filterInput.addEventListener("keydown", filter);
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoSearchList = document.querySelectorAll(".list-group-item");

    todoSearchList.forEach(function(todo) {
        if(todo.textContent.toLowerCase().trim().includes(filterValue)) {
            todo.setAttribute("style", "display : block")
        } else {
            todo.setAttribute("style", "display : none !important");
            // "!important" is for block bootstrap's class
        }
    });
}

function removeAllTodos() {
    const allTodoList = document.querySelectorAll(".list-group-item");
    if (allTodoList.length > 0) {
        allTodoList.forEach(function (todo) {
            todo.remove();
        });

        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
    } else {
        showAlert("warning", "Dont have any todo to remove");
    }
}

function removeTodoToUI(e) {
    if (e.target.className == "fa fa-remove") {
        const todo = e.target.parentElement.parentElement;
        removeTodoToStorage(todo.textContent);
        todo.remove();
    }
}

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            //? let todoIndex = todos.findIndex(e => e.name === removeTodo);
            todos.splice(index, 1); 
            // if you give the start index and tell remove just 1 item, 
            // then it will remove just itself
            //! there is a something wrong when you delete one item it deletes the second item familiar it
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}

function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Fill up the blank");
    } else {
        addTodoToUI(inputText);
        addTodoStorage(inputText);
        showAlert("success", "Todo added");
    }

    e.preventDefault();
}

function addTodoToUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);

    todoList.appendChild(li);

    addInput.value = "";
}

function addTodoStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {

    //     <div class="alert alert-success" role="alert">
    //           A simple success alert—check it out!
    //     </div>
    const div = document.createElement("div");
    // div.className = "alert alert-" + type;
    div.className = `alert alert-${type}`; //literal template
    div.textContent = message;

    firstCardBody.appendChild(div);
    setTimeout(function () {
        div.remove();
    }, 2500);
}











