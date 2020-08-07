// Global UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();
//DOM Load event
document.addEventListener('DOMContentLoaded', getTasks);
// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear tasks
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks
  filter.addEventListener('keyup', filterTasks);
}
//Get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    //use JSON to parse it to string
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  //LOOP  THROUGH TASKS 
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');
    // Add class MATERIALIZE CSS
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class MATERIALIZE CSS
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  })

}

// Add Task 
function addTask(e) {
  if (taskInput.value === '') {
    alert('HEY! Where´s Task?');

    //OR CREATE HTML 
    // taskInput.value ='PLEASE ADD A TASK';

  }

  // Create li element
  const li = document.createElement('li');
  // Add class MATERIALIZE CSS
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');


  console.log(link);
  // Add class MATERIALIZE CSS
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  //Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    //use JSON to parse it to string
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  //first get it and push in task, then set it and use json to make it string
  localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Remove Task USE PROPAGATION(on parent el.)to remove 

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You sure?')) {
      e.target.parentElement.parentElement.remove();

      // remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//REMOVE FROM LOCAL STORAGE FUNCTION
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    //use JSON to parse it to string
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }

  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//CLEAR TASKS
function clearTasks() {
  //One way
  taskList.innerHTML = '';

  //Other Way
  // while(taskList.firstChild) {
  //   taskList.removeChild(taskList.firstChild);
  // }

  //from LS
  clearTasksFromLocalStorage();
}

//CLEAR TASKS FROM LOCAL STROAGE
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();



  //loop through ul
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    console.log(item);
    //ako nije nepostojec, to je -1
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}