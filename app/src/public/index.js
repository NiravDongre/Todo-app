const RegisterContainer = document.getElementById("Register");
const RegisterForm = document.getElementById("register");

const LoginContainer = document.getElementById("Login");
const LoginForm = document.getElementById("login");

const TodoContainer = document.getElementById("Todo");

const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");



/* ---------------- REGISTER ---------------- */

RegisterForm.addEventListener("submit", async (e) => {

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

    console.log(data)
    if(response.ok){

        alert("Registration successful");

        RegisterContainer.style.display = "none";
        LoginContainer.style.display = "block";

    }else{

        alert(data.message);

    }

});



/* ---------------- LOGIN ---------------- */

LoginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("http://localhost:3000/api/v1/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if(response.ok){
        const token = extractToken(data);
        if (token) {
            localStorage.setItem("token", token);
        }

        LoginContainer.style.display = "none";
        TodoContainer.style.display = "block";

        loadTodos();

    } else {
        alert(data.message);
    }

});



/* ---------------- SWITCHERS ---------------- */

document.getElementById("switch-to-register").addEventListener("click", () => {
    LoginContainer.style.display = "none";
    RegisterContainer.style.display = "block";
});

document.getElementById("switch-to-login").addEventListener("click", () => {
    RegisterContainer.style.display = "none";
    LoginContainer.style.display = "block";
});



/* ---------------- ADD TODO ---------------- */

todoButton.addEventListener("click", async () => {

    const title = todoInput.value.trim();
    if (!title) {
        alert("Please enter a todo title.");
        return;
    }

    todoButton.disabled = true;
    todoButton.textContent = "Adding...";

    const token = getStoredToken();
    if (!token) {
        alert("Please login first.");
        LoginContainer.style.display = "block";
        TodoContainer.style.display = "none";
        todoButton.disabled = false;
        todoButton.textContent = "Add Todo";
        return;
    }

    const response = await fetch("http://localhost:3000/api/v1/user/todo", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ title })
    });

    const data = await response.json();

    if(response.ok){
        todoInput.value = "";
        loadTodos();
    } else {
        alert(data.message);
    }

    todoButton.disabled = false;
    todoButton.textContent = "Add Todo";
});





/* ---------------- LOAD TODOS ---------------- */

async function loadTodos(){

    const token = getStoredToken();
    if (!token) {
        LoginContainer.style.display = "block";
        TodoContainer.style.display = "none";
        return;
    }

    const response = await fetch("http://localhost:3000/api/v1/user/todo",{
        method: "GET",
        headers: getAuthHeaders()
    });

    const data = await response.json();

    if(!response.ok){
        alert(data.message || "Failed to load todos");
        return;
    }

    todoList.innerHTML = "";

    if(data.todos && Array.isArray(data.todos)){
        const todoElements = data.todos.map((todo) => {
            const div = document.createElement("div");

            div.innerHTML = `
                <p>${todo.title}</p>
                <button onclick="editTodo('${todo._id}', '${todo.title}', this)">Edit</button>
                <button onclick="deleteTodo('${todo._id}')">Delete</button>
            `;

            return div;
        });

        todoList.append(...todoElements);
    } else {
        console.error("Unexpected data structure:", data);
        alert("Error loading todos: Invalid response format");
    }

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

/* ---------------- EDIT TODO ---------------- */

function editTodo(id, currentTitle, editButton) {
    const div = editButton.parentElement;
    const originalHTML = div.innerHTML;

    div.innerHTML = `
        <input type="text" value="${currentTitle}" id="edit-input-${id}">
        <button onclick="saveTodo('${id}', this)">Save</button>
        <button onclick="cancelEdit('${id}', ${JSON.stringify(currentTitle)}, this)">Cancel</button>
    `;
}

async function saveTodo(id, saveButton) {
    const div = saveButton.parentElement;
    const input = div.querySelector(`#edit-input-${id}`);
    const newTitle = input.value.trim();

    if (!newTitle) {
        alert("Title cannot be empty");
        return;
    }

    const saveBtn = div.querySelector('button[onclick*="saveTodo"]');
    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";

    const token = getStoredToken();
    if (!token) {
        alert("Please login first.");
        saveBtn.disabled = false;
        saveBtn.textContent = "Save";
        return;
    }

    const response = await fetch(`http://localhost:3000/api/v1/user/todo/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ title: newTitle })
    });

    const data = await response.json();

    if (response.ok) {
        loadTodos();
    } else {
        alert(data.message || "Failed to update todo");
        saveBtn.disabled = false;
        saveBtn.textContent = "Save";
    }
}

function cancelEdit(id, originalTitle, cancelButton) {
    const div = cancelButton.parentElement;
    div.innerHTML = `
        <p>${originalTitle}</p>
        <button onclick="editTodo('${id}', '${originalTitle.replace(/'/g, "\\'")}', this)">Edit</button>
        <button onclick="deleteTodo('${id}')">Delete</button>
    `;
}

function getStoredToken() {
    return localStorage.getItem("token");
}

function getAuthHeaders() {
    const token = getStoredToken();
    if (!token) return { "Content-Type": "application/json" };

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "token": token, // fallback if backend expects this header
    };
}

function extractToken(data) {
    return data?.token || data?.accessToken || data?.data?.token;
}