// Run the code after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Select the "Add Task" button
  const addButton = document.getElementById('add-task-btn');
  // Select the input field for task entry
  const taskInput = document.getElementById('task-input');
  // Select the unordered list where tasks will be displayed
  const taskList = document.getElementById('task-list');

  // Function to load tasks from Local Storage and display them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // Don't resave while loading
  }

  // Function to save the current list of tasks to Local Storage
  function saveTasks() {
    const tasks = [];
    // Get all task texts from the DOM and store them in an array
    const listItems = taskList.querySelectorAll('li');
    listItems.forEach(item => {
      // Remove button text is excluded
      const taskText = item.firstChild.textContent;
      tasks.push(taskText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to add a new task
  function addTask(taskText, save = true) {
    // If no text provided, get it from the input field
    if (!taskText) {
      taskText = taskInput.value.trim();
      // Check if input is empty
      if (taskText === "") {
        alert('Please enter a task.');
        return;
      }
    }

    // Create a new list item (li) element
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // Create a remove button for the task
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    // Add click event to remove button to delete the task
    removeButton.onclick = function() {
      taskList.removeChild(listItem);
      saveTasks(); // Update Local Storage after removal
    };

    // Append the remove button to the list item
    listItem.appendChild(removeButton);
    // Append the list item to the task list
    taskList.appendChild(listItem);

    // Clear the input field
    taskInput.value = '';

    // If save flag is true, update Local Storage
    if (save) {
      saveTasks();
    }
  }

  // Add click event listener to the "Add Task" button
  addButton.addEventListener('click', function() {
    addTask();
  });

  // Add keypress event listener to allow adding task on pressing Enter key
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load tasks from Local Storage when page loads
  loadTasks();
});
