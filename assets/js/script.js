const formE1 = document.querySelector('#task-form');

const createTaskHandler = () => {
    event.preventDefault();
    var tasksToDoEl = document.querySelector('#tasks-to-do');
    var taskItemEl = document.createElement('li');
    taskItemEl.className = 'task-item';
    taskItemEl.textContent= 'New Task';
    tasksToDoEl.appendChild(taskItemEl);
}

formE1.addEventListener('submit',createTaskHandler);