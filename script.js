document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage and display them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false to avoid re-saving
  }

  // Add a new task to the DOM and optionally save to Local Storage
  function addTask(taskText, save = true) {
    // If adding from input, trim and validate input
    if (save) {
      taskText = taskText.trim();
      if (taskText === '') {
        alert('Please enter a task');
        return;
      }
    }

    // Create list item and remove button
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Remove task handler
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      updateLocalStorage();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
      updateLocalStorage();
      taskInput.value = '';
    }
  }

  // Update Local Storage to reflect current tasks in the DOM
  function updateLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
      // li.textContent includes "Remove", so get only the task text by excluding the button text
      // One way: clone node, remove button, get textContent
      const clonedLi = li.cloneNode(true);
      clonedLi.removeChild(clonedLi.querySelector('button'));
      tasks.push(clonedLi.textContent.trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Attach event listeners
  addButton.addEventListener('click', () => addTask(taskInput.value));

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });

  // Load tasks from Local Storage on page load
  loadTasks();
});
