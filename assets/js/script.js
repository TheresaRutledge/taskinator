const formE1 = document.querySelector('#task-form');

const createTaskHandler = () => {
    event.preventDefault();
    //task name input
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //task type input
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    //ul element
    var tasksToDoEl = document.querySelector('#tasks-to-do');
    //new li
    var listItemEl = document.createElement('li');
    //class for new li elements
    listItemEl.className = 'task-item';
    //new div 
    var taskInfoEl = document.createElement('div');
    //class of new div
    taskInfoEl.className='task-info';
    //new div's content
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" +taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
}

formE1.addEventListener('submit',createTaskHandler);