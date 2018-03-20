// Define Variables (UI)
const form = document.getElementById('todo-form');
const todoList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-todos');
const filter = document.getElementById('filter-todo');
const todoInput = document.getElementById('todo');

// Load Event Listener
loadEventListeners();
// Load All Event Listener
function loadEventListeners() {
	// DOM  Load Event
	document.addEventListener('DOMContentLoaded', getTodos);
	// Add Todo Event
	form.addEventListener('submit', addTodo);

	// Delete Task Event
	todoList.addEventListener('click', deleteTodo);

	// Delete All Todo's Event
	clearButton.addEventListener('click', deleteAllTodos);

	// Filter Todo's Event
	filter.addEventListener('keyup', filterTodo);
}

//Get Todos from Local Storage
function getTodos() {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.forEach(function(todo) {
	// Create li Element
	const li = document.createElement('li');
	li.className = 'collection-item';
	
	// Create text node and append to li
	li.appendChild(document.createTextNode(todo));
	
	// Create New Link Element
	const link = document.createElement('a');
	link.className = 'delete-item secondary-content';
	link.innerHTML = '<i class="fa fa-remove"></li>';
	
	// Append the Link to the LI
	li.appendChild(link);
	
	// Append li to ul
	todoList.appendChild(li);		
	});

}

// Add Todo 
function addTodo(e) {
	if (todoInput.value === '')	 {
		alert('Add an Item');
	}

	// Create li Element
	const li = document.createElement('li');
	li.className = 'collection-item';
	
	// Create text node and append to li
	li.appendChild(document.createTextNode(todoInput.value));
	
	// Create New Link Element
	const link = document.createElement('a');
	link.className = 'delete-item secondary-content';
	link.innerHTML = '<i class="fa fa-remove"></li>';
	
	// Append the Link to the LI
	li.appendChild(link);
	
	// Append li to ul
	todoList.appendChild(li);

	// Store to Local Storage
	storeTaskInLocalStorage(todoInput.value);

	// Clear Input
	todoInput.value = '';

	e.preventDefault();
}

// Store Todo
	function storeTaskInLocalStorage(todo) {
		let todos;
		if (localStorage.getItem('todos') === null) {
			todos = [];
		} else {
			todos = JSON.parse(localStorage.getItem('todos'));
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));
	}

// Delete Todo
function deleteTodo(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if(confirm('Do You Want to Delete Item?')) {
			e.target.parentElement.parentElement.remove();

			// Remove from Local Storage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Delete from Local Storage
function removeTaskFromLocalStorage(todoItem) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.forEach(function(todo, index) {
		if(todoItem.textContent === todo)
			todos.splice(index, 1);
	});

	localStorage.setItem('todos', JSON.stringify(todos));
}

// Delete All Todo
function deleteAllTodos() {
	while(todoList.firstChild) {
		todoList.removeChild(todoList.firstChild);
	}

	// Delete All from Local Storage
	clearTaskFromLocalStorage();
}

	function clearTaskFromLocalStorage() {
		localStorage.clear();
	 }

// Filter Todo's
function filterTodo(e) {
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach(function(todo) {
		const item = todo.firstChild.textContent;
			if(item.toLowerCase().indexOf(text) != -1) {
				todo.style.display = 'block';
			} else {
				todo.style.display = 'none';
			}
	});
}