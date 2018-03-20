// Define UI vars
const form = document.querySelector("#task-form")
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//Load Event Listeners
loadEventListeners()

// Load all event listeners
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks)

    form.addEventListener('submit', addTask)
    //remove task event
    taskList.addEventListener('click', removeTask)
    // Clear Task Event
    clearBtn.addEventListener('click', clearTask)
    //Filter Tasks Event
    filter.addEventListener('keyup', filterTasks)
}

function getTasks() {
    let tasks
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task) {
        // create li element
        const li = document.createElement('li')
        li.className = 'collection-item'
        li.appendChild(document.createTextNode(task))

        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove"></i>'

        li.appendChild(link)
        taskList.appendChild(li)
    })
}

function addTask(e) {
    e.preventDefault();
    if(taskInput.value === '') {
        alert('add a task')
    }

    // create li element
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(taskInput.value))

    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'

    li.appendChild(link)
    taskList.appendChild(li)

    storeTaskInLocalStorage(taskInput.value)

    taskInput.value = ''
    
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('are you sure')){
            e.target.parentElement.parentElement.remove()

            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTask() {
    // taskList.innerHTML = ''

    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    removeTasksFromLocalStorage()
}

function removeTasksFromLocalStorage() {
    localStorage.clear()
}

function filterTasks(e) {
    const text = e.target.value

    document.querySelectorAll('.collection-item').forEach(
        (task) => {
            const item = task.firstChild.textContent
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display='block'
            } else {
                task.style.display='none'
            }
        }
    )
}