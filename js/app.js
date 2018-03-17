// Define Variables (UI)
const form = document.getElementById('todo-form');
const todoList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-todos');
const filter = document.getElementById('filter-todo');
const todoInput = document.getElementById('todo');

// Load Event Listener
loadEventListeners();

function loadEventListeners() {
	// Add Todo Event
	form.addEventListener('submit', addTodo);
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

	// Clear Input
	todoInput.value = '';

	e.preventDefault();
}