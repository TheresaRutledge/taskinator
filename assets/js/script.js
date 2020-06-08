const formE1 = document.querySelector('#task-form');
var taskIdCounter = 0;


const createTaskEl = (taskDataObj) => {
    //ul element
    var tasksToDoEl = document.querySelector('#tasks-to-do');

    //new li
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.setAttribute('data-task-id', taskIdCounter);

    //new div 
    var taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
         //append new div to li
    listItemEl.appendChild(taskInfoEl);
//add action buttons
var taskActionsEl = createTaskActions(taskIdCounter);
//append task actions to li
listItemEl.appendChild(taskActionsEl);

//append new li to ul
    tasksToDoEl.appendChild(listItemEl);

    taskIdCounter++;
}

const createTaskActions = (taskId) => {
    //create new div
    let actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    // create new edit button
    var editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    editButtonEl.className = 'btn edit-btn';
    editButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create new delete button
    var deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.className = 'btn delete-btn';
    deleteButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //status drop down
    var statusSelectEl = document.createElement('select');
    statusSelectEl.className = 'select-status';
    statusSelectEl.setAttribute('data-task-id', taskId);
    statusSelectEl.setAttribute('name', 'status change');
    //add status selection options
    let statusChoices = ['To Do', 'In Progress', 'Completed'];
    for (i = 0; i < statusChoices.length; i++) {
        var statusOptionEl = document.createElement('option');
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute('value', statusChoices[i]);
        //append to select
        statusSelectEl.appendChild(statusOptionEl);

    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
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