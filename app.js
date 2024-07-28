// Clock
function updateClock() {
    const clockElement = document.getElementById("clock");
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
  setInterval(updateClock, 1000);
  updateClock();
  
  // Login
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const greeting = document.getElementById("greeting");
  const todoForm = document.getElementById("todo-form");
  
  function saveUsername(username) {
    localStorage.setItem("username", username);
  }
  
  function showGreeting(username) {
    greeting.textContent = `Hello, ${username}!`;
    greeting.classList.remove("hidden");
    loginForm.classList.add("hidden");
    todoForm.classList.remove("hidden");
  }
  
  function handleLoginSubmit(event) {
    event.preventDefault();
    const username = usernameInput.value;
    saveUsername(username);
    showGreeting(username);
  }
  
  function checkUsername() {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      showGreeting(savedUsername);
    } else {
      loginForm.classList.remove("hidden");
      greeting.classList.add("hidden");
      todoForm.classList.add("hidden");
    }
  }
  
  loginForm.addEventListener("submit", handleLoginSubmit);
  checkUsername();
  
  // Todo List
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const TODOS_KEY = "todos";
  let todos = [];
  
  function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }
  
  function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    saveTodos();
  }
  
  function paintTodo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    li.innerHTML = `${newTodo.text} <button onclick="deleteTodo()">❌</button>`;
    todoList.appendChild(li);
  }
  
  function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = {
      text: todoInput.value,
      id: Date.now()
    };
    todos.push(newTodo);
    paintTodo(newTodo);
    saveTodos();
    todoInput.value = "";
  }
  
  function loadTodos() {
    const savedTodos = localStorage.getItem(TODOS_KEY);
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      todos = parsedTodos;
      parsedTodos.forEach(paintTodo);
    }
  }
  
  todoForm.addEventListener("submit", handleTodoSubmit);
  loadTodos();
  