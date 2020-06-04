const form = document.querySelector('.new-task-form')
const taskList = document.querySelector('.list')
const clearBtn = document.querySelector('.clear-tasks')
const filterInput = document.querySelector('#filter')
const taskValue = document.querySelector('#task')

fireEventListeners();

function fireEventListeners(){
    
    document.addEventListener('DOMContentLoaded', getTasks)
    form.addEventListener('submit', addNewTask)
    taskList.addEventListener('click', removeTask)
    clearBtn.addEventListener('click', removeAll)
    filterInput.addEventListener('keyup', filterItems)

}

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){

        const li = document.createElement('li');
        li.className = "list-item";
        li.appendChild(document.createTextNode(task));
        const deletebutton = document.createElement('input')
        deletebutton.setAttribute('value','Remove task')
        deletebutton.setAttribute('type', 'submit')
        deletebutton.setAttribute('class', 'delete-task')
        li.appendChild(deletebutton)
        taskList.appendChild(li)

    })
}

function addNewTask (e) {

    if(taskValue.value === ''){
        alert('Add a task');

    } else {

        const li = document.createElement('li');
        li.className = "list-item";
        li.appendChild(document.createTextNode(taskValue.value));
        const deletebutton = document.createElement('input')
        deletebutton.setAttribute('value','Remove task')
        deletebutton.setAttribute('type', 'submit')
        deletebutton.setAttribute('class', 'delete-task')
        li.appendChild(deletebutton)
        taskList.appendChild(li)

        storeInLocalStorage(taskValue.value)

        taskValue.value = '';

    }

    e.preventDefault();
}

function storeInLocalStorage (task) {
    let tasks 
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask (e) {

    if(e.target.classList.contains('delete-task')){
             e.target.parentElement.remove();

             removeFromLocalStorage(e.target.parentElement)
    } 
}

function removeFromLocalStorage (taskItem) {

    let tasks 
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeAll () {
    
    // taskList.innerHTML = '';

    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    clearAllTasksFromStorage();
};

function clearAllTasksFromStorage() {
    if(confirm('Are You Sure?'))
    localStorage.clear();
}

function filterItems (e) {
  const text = e.target.value.toLowerCase() 

  document.querySelectorAll('.list-item').forEach(function(task){
      if(task.firstChild.textContent.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
          task.style.display = 'none';
      };
    });
}