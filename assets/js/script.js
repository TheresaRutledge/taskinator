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
    taskInfoEl.className = 'task-info';
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
}

const taskFormHandler = () => {
    event.preventDefault();
    //task name input
    let nameInput = document.querySelector("input[name='task-name']").value;
    //task type input
    let typeInput = document.querySelector("select[name='task-type']").value;
    
    if (!nameInput || !typeInput) {
        alert('You need to fill out the task form!');
        return false;
    };
    //reset form
    document.querySelector('#task-form').reset();
    document.querySelector('select').selectedIndex = 0;

    //object to hold input values
    var taskDataObj = {
        name: nameInput,
        type: typeInput
    };

    //pass object to createTaskEl function
    createTaskEl(taskDataObj);
}

formE1.addEventListener('submit', taskFormHandler);