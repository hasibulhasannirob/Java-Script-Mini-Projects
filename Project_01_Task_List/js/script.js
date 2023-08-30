// UI components
let taskInput = document.getElementById('taskInput');
let addTask = document.getElementById('add');
let taskList = document.getElementById('ul');
let clear = document.getElementById('clear');
let filter = document.getElementById('filter');

// Event Listeners
addTask.addEventListener('click', addedTask);
taskList.addEventListener('click', removeTask);
clear.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

// Functions

// add a task
function addedTask(e) {
    if (taskInput.value === '') {
        alert('Input a task');
    } else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + ' '));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        link.style.color = 'red';
        link.style.fontWeight = 'bold';
        li.appendChild(link);
        taskList.appendChild(li);

        storeTask(taskInput.value); // store all the task in local storage

        taskInput.value = '';
    }
    e.preventDefault();
}
// remove single task
function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm('You want to remove a task?')) {
            let rmel = e.target.parentElement;
            rmel.remove();
            removeFromLS(rmel);
        }
    }
}
// remove all the task
function clearTask(e) {
    taskList.innerHTML = '';
    localStorage.clear();
}
// filter from task
function filterTask(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

function storeTask(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// get all the task
function getTasks(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + ' '));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        link.style.color = 'red';
        link.style.fontWeight = 'bold';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}