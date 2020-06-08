const formE1 = document.querySelector('#task-form');


const createTaskEl = (taskDataObj) => {
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
 taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
 listItemEl.appendChild(taskInfoEl);
 tasksToDoEl.appendChild(listItemEl);
}

const taskFormHandler = () => {
    event.preventDefault();
    //object to hold input values
    var taskDataObj = {};
    //task name input
    taskDataObj.name = document.querySelector("input[name='task-name']").value;
    //task type input
    taskDataObj.type = document.querySelector("select[name='task-type']").value;

    //pass object to createTaskEl function
    createTaskEl(taskDataObj);
}

formE1.addEventListener('submit', taskFormHandler);