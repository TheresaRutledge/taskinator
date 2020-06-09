//Global Variables
const formEl = document.querySelector('#task-form'); //Form element
const pageContentEl = document.querySelector('#page-content'); //selects page content id which is main
var taskIdCounter = 0; //initializes data-task-id to zero
var tasksToDoEl = document.querySelector('#tasks-to-do');//to do tasks ul selector
var tasksInProgressEl = document.querySelector('#tasks-in-progress');//in progress tasks ul selector
var tasksCompletedEl = document.querySelector('#tasks-completed');// completed tasks ul selector


//Creates a new task li with name, type, edit button, delete button, and status. Adds unique ID
const createTaskEl = (taskDataObj) => {
    //new li
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.setAttribute('data-task-id', taskIdCounter);
    listItemEl.setAttribute('draggable', 'true');
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


//creates the task actions (edit, delete, status) to be appended to li
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
    statusSelectEl.setAttribute('name', 'status-change');
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

//takes in user input for task name & type and creates new li
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
    resetForm();

    var isEdit = formEl.hasAttribute('data-task-id');
    if (isEdit) {
        var taskId = formEl.getAttribute('data-task-id');
        completeEditTask(nameInput, typeInput, taskId)
    } else {
        //object to hold input values
        var taskDataObj = {
            name: nameInput,
            type: typeInput
        };
        //pass object to createTaskEl function
        createTaskEl(taskDataObj);
    }
}

const completeEditTask = (taskName, taskType, taskId) => {
    console.log(taskName, taskType, taskId);
    let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
    taskSelected.querySelector(`h3.task-name`).textContent = taskName;
    taskSelected.querySelector('span.task-type').textContent = taskType;

    resetForm();
    formEl.removeAttribute('data-task-id');

    alert('task updated');

}

//resets form
const resetForm = () => {
    //reset form
    formEl.reset();
    document.querySelector('select').selectedIndex = 0;

}

//deletes a task
const deleteTask = (taskId) => {
    let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
    taskSelected.remove();
    resetForm();
}

//edits a task
const editTask = (taskId) => {
    console.log(`editing task ${taskId}`);
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`); //selected li element
    var taskName = taskSelected.querySelector(`h3.task-name`).textContent;//name of selected li element
    var taskType = taskSelected.querySelector('span.task-type').textContent; //type of selected li element
    document.querySelector(`input[name = 'task-name']`).value = taskName;
    document.querySelector(`select[name='task-type']`).value = taskType;
    document.querySelector('#save-task').textContent = 'Save Task';
    formEl.setAttribute('data-task-id', taskId);


}

//listens for click on edit or delete buttons
const taskButtonHandler = (event) => {
    let targetEl = event.target;

    if (targetEl.matches(".delete-btn")) {
        let taskId = targetEl.getAttribute('data-task-id');
        deleteTask(taskId);
    }

    else if (targetEl.matches(".edit-btn")) {
        let taskId = targetEl.getAttribute('data-task-id');
        editTask(taskId);
    }
}

const taskStatusChangedHandler = (event) => {
    let taskId = event.target.getAttribute('data-task-id');
    let statusValue = event.target.value.toLowerCase();
    let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);

    if (statusValue === 'to do') {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === 'in progress') {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === 'completed') {
        tasksCompletedEl.appendChild(taskSelected);
    }
}

//onstart of drag
const dragTaskHandler = (event) => {
    let taskId = event.target.getAttribute('data-task-id');
    event.dataTransfer.setData('text/plain', taskId);
    var getId = event.dataTransfer.getData('text/plain');
}

//allows for dropping in droppable area
const dropZoneDragHandler = (event) => {
    var taskListEl = event.target.closest('.task-list');
    if (taskListEl) {
        event.preventDefault();
    }
}
//drops selected element in list hovered over
const dropTaskHandler = (event) => {
    let id = event.dataTransfer.getData('text/plain');
    let draggableElement = document.querySelector(`[data-task-id='${id}']`);
    let dropZoneEl = event.target.closest('.task-list');
    let statusType = dropZoneEl.id;
    let statusSelectEl = draggableElement.querySelector("select[name='status-change']");

    if (statusType === 'tasks-to-do') {
        statusSelectEl.selectedIndex = 0
    } else if (statusType === 'tasks-in-progress') {
        statusSelectEl.selectedIndex = 1;
    } else if (statusType === 'tasks-completed') {
        statusSelectEl.selectedIndex = 2;
    }

    dropZoneEl.appendChild(draggableElement);

}

//listener for task actions
formEl.addEventListener('submit', taskFormHandler);

//listener for new task submissions
pageContentEl.addEventListener('click', taskButtonHandler);

//listen for status updates
pageContentEl.addEventListener('change', taskStatusChangedHandler);
//listener for dragging
pageContentEl.addEventListener('dragstart', dragTaskHandler)
//listener for dragging over
pageContentEl.addEventListener('dragover', dropZoneDragHandler);
//listener for drop
pageContentEl.addEventListener('drop', dropTaskHandler);