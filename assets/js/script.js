const buttonE1 = document.querySelector('#save-task');

const createTaskHandler = () => {
    var tasksToDoEl = document.querySelector('#tasks-to-do');
    var taskItemEl = document.createElement('li');
    taskItemEl.className = 'task-item';
    taskItemEl.textContent= 'New Task';
    tasksToDoEl.appendChild(taskItemEl);
}

buttonE1.addEventListener('click',createTaskHandler);