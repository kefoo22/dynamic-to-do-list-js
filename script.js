document.addEventListener('DOMContentLoaded', function() {

  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a task
  function addTask() {
    const taskText = taskInput.value.trim(); // Get and trim task text

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

    // Assign an onclick event to the remove button to remove the li element
    removeButton.onclick = function() {
      taskList.removeChild(listItem);
    };

    // Append the remove button to the li element
    listItem.appendChild(removeButton);

    // Append the li element to the task list
    taskList.appendChild(listItem);

    // Clear the task input field
    taskInput.value = '';
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

});
