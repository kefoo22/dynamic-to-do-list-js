document.addEventListener('DOMContentLoaded', function() {

  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage and display them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  // Function to save all current tasks to Local Storage
  function saveTasks() {
    const tasks = [];
    const listItems = taskList.querySelectorAll('li');
    listItems.forEach(item => {
      // Get only the text content without the remove button text
      const textOnly = item.firstChild.textContent;
      tasks.push(textOnly);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to add a task
  function addTask(taskText, save = true) {
    if (taskText === undefined) {
      taskText = taskInput.value.trim();
    }

    if (taskText === "") {
      alert('Please enter a task.');
      return;
    }

    // Create a new li element and set its textContent
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // Create a new button element for removing the task
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    // Assign an onclick event to the remove button to remove the li element and update storage
    removeButton.onclick = function() {
      taskList.removeChild(listItem);
      saveTasks();  // Update storage after removal
    };

    // Append the remove button to the li element
    listItem.appendChild(removeButton);

    // Append the li element to the task list
    taskList.appendChild(listItem);

    // Clear the task input field if this was a user-added task
    if (save) {
      saveTasks();
      taskInput.value = '';
    }
  }

  // Event listener for 'Add Task' button click
  addButton.addEventListener('click', function() {
    addTask();
  });

  // Event listener for pressing 'Enter' in the input field
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load stored tasks when page loads
  loadTasks();

});
