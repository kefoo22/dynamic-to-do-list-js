// Wait for the entire DOM to finish loading before running any script
document.addEventListener('DOMContentLoaded', function() {

  // Select the "Add Task" button by its ID
  const addButton = document.getElementById('add-task-btn');

  // Select the input field for entering tasks
  const taskInput = document.getElementById('task-input');

  // Select the unordered list where tasks will be displayed
  const taskList = document.getElementById('task-list');

  // Function to load tasks from Local Storage and display them on the page
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false to prevent saving again while loading
  }

  // Function to add a new task (and optionally save to Local Storage)
  function addTask(taskText, save = true) {
    // If called without taskText (from UI interaction), get and trim value from input field
    if (!taskText) {
      taskText = taskInput.value.trim();
    }

    // If task is empty, alert the user
    if (taskText === "") {
      alert('Please enter a task.');
      return;
    }

    // Create a new list item (li) element for the task
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // Create a button for removing the task
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    // Add an event handler to remove the task when the button is clicked
    removeButton.onclick = function() {
      taskList.removeChild(listItem);
      removeTaskFromStorage(taskText);
    };

    // Append the remove button to the list item
    listItem.appendChild(removeButton);

    // Append the list item to the task list
    taskList.appendChild(listItem);

    // If save is true, add task to Local Storage
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Clear the task input field
    taskInput.value = '';
  }

  // Function to remove a task from Local Storage
  function removeTaskFromStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  // Add click event listener to the "Add Task" button to call addTask
  addButton.addEventListener('click', function() {
    addTask();
  });

  // Add keypress event listener to the input field to allow adding task by pressing Enter key
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load tasks from Local Storage when the page loads
  loadTasks();

});
