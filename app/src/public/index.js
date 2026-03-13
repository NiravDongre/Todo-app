const RegistorContainer = document.getElementById("Registor");
const RegistorForm = document.getElementById("registor");

const LoginContainer = document.getElementById("Login");
const LoginForm = document.getElementById("login");

const TodoContainer = document.getElementById("Todo");

const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");



/* ---------------- REGISTER ---------------- */

RegistorForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    const response = await fetch("http://localhost:3000/api/v1/user/signup", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ username, email, password })

    });

    const data = await response.json();

    if(response.ok){

        alert("Registration successful");

        RegistorContainer.style.display = "none";
        LoginContainer.style.display = "block";

    }else{

        alert(data.message);

    }

});



/* ---------------- LOGIN ---------------- */

LoginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("http://localhost:3000/api/v1/user/signin", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ username, email, password })

    });

    const data = await response.json();

    if(response.ok){

        localStorage.setItem("token", data.token);

        LoginContainer.style.display = "none";
        TodoContainer.style.display = "block";

        loadTodos();

    }else{

        alert(data.message);

    }

});



/* ---------------- ADD TODO ---------------- */

todoButton.addEventListener("click", async () => {

    const title = todoInput.value;

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/v1/user/todo", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "token": token
        },

        body: JSON.stringify({ title })

    });

    const data = await response.json();

    if(response.ok){

        todoInput.value = "";

        loadTodos();

    }else{

        alert(data.message);

    }

});



/* ---------------- LOAD TODOS ---------------- */

async function loadTodos(){

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/v1/user/todo",{

        method: "GET",

        headers: {
            "Content-Type": "application/json",
            "token": token
        }

    });

    const data = await response.json();

    todoList.innerHTML = "";

    data.data.forEach((todo) => {

        const div = document.createElement("div");

        div.innerHTML = `
            <p>${todo.title}</p>
            <button onclick="deleteTodo('${todo._id}')">Delete</button>
        `;

        todoList.appendChild(div);

    });

}



/* ---------------- DELETE TODO ---------------- */

async function deleteTodo(id){

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:3000/api/v1/user/todo/${id}`,{

        method: "DELETE",

        headers:{
            "Content-Type": "application/json",
            "token": token
        }

    });

    loadTodos();

}