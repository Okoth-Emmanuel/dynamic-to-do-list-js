// Wait until the HTML document is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a new task to the list
  function addTask() {
    // Get the trimmed task text from input field
    const taskText = taskInput.value.trim();

    // Check if the task text is empty
    if (taskText === '') {
      alert('Please enter a task');
      return; // Stop further execution
    }

    // Create a new list item and set its text content
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // When remove button is clicked, remove the corresponding task item
    removeBtn.onclick = () => {
      taskList.removeChild(li);
    };

    // Append the remove button to the list item
    li.appendChild(removeBtn);

    // Append the list item to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
  }

  // Add event listener for the "Add Task" button click
  addButton.addEventListener('click', addTask);

  // Add event listener for pressing "Enter" key in the input field
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  
});
