// шапка приложения --1--
const root = document.getElementById('root');

const header = document.createElement('header');

const container = document.createElement('div');
container.className = 'container';

const headerInner = document.createElement('div')
headerInner.className ='header_inner';

root.append(header)
header.append(container)
container.append(headerInner)

function createButtons(numberButton, className) {
    const button = [];
    for (let i = 0; i < numberButton; i++){
        const buttons = document.createElement('button');
        buttons.className = className;
        button[i] = buttons;
    }
    return button;
}

const button = createButtons(3, 'btn'); 

if (button.length >= 1) {
  button[0].textContent = 'Delete All';
} 
if (button.length >= 2) {
  button[1].textContent = 'Delete Last';
} 
if (button.length >= 3) {
  button[2].textContent = 'Add';
}

button.forEach(button => {
  headerInner.appendChild(button); // Добавляем каждую кнопку внутрь элемента
} );

button[1].className = 'btn delete_button';
headerInner.append(button[1])

function insertLineInput(placeholderText,prevElement,nextElement ) {
  const lineInput = document.createElement('input');
  lineInput.className = 'line_input';
  lineInput.placeholder = placeholderText;
  prevElement.parentNode.insertBefore(lineInput, nextElement);
}

insertLineInput('Enter ToDo...', button[1], button[2]);


// шапка приложения --2--
const headerUnder = document.createElement('div')
headerUnder.className = 'header_under';
container.append(headerUnder)

const allTask = document.createElement('div');
allTask.className = 'all_task';
allTask.textContent = 'All Task'

const completedTask = document.createElement('div');
completedTask.className = 'completed_task';
completedTask.textContent = 'Completed Task'
headerUnder.append(allTask,completedTask)


// Кнопки внутри шапки --2--
const buttonUnderHeader = createButtons(2, 'btn'); 

buttonUnderHeader.forEach(button => {
  headerUnder.appendChild(button);
});

if (buttonUnderHeader.length >= 1) {
  buttonUnderHeader[0].textContent = 'Show All';
} 
if (buttonUnderHeader.length >= 2) {
  buttonUnderHeader[1].textContent = 'Show Completed';
} 

insertLineInput('Search...', buttonUnderHeader[1]);


// кнопки todo --3--
const form = document.createElement('form');
form.className = 'form';
root.append(form)


// Input
const createInput = (type, placeholder, name) => {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.name = name;
  return input;
}

// --3-- Блок с задачами и их свойствами
const tasksContainer = document.createElement('div')

const blockTask = document.createElement('div');
blockTask.className = 'block_task';
tasksContainer.append(blockTask);
const createTaskItem = (text, isCompleted, id, date) => {
  const taskItem = document.createElement('div');
  // Checkbox
  const checkbox = createInput('checkbox', '', 'checkbox');
  checkbox.checked = isCompleted;
  checkbox.classList.add('check_input'); 
  // Label for text in Checkbox
  const label = document.createElement('label');
  label.classList.add('label');
  label.append(checkbox, text);
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      label.style.textDecoration = 'line-through';
      taskItem.style.backgroundColor = '#101229';
    } else {
      label.style.textDecoration = 'none';
      taskItem.style.backgroundColor = 'transparent';
    }
  });
//  Span for graphic in Checkbox
  const spanCheckbox = document.createElement('span');
  spanCheckbox.classList.add('check_box');
  label.append(spanCheckbox);
  // Img (check)
  const img = document.createElement('img');
  img.classList.add('span_img');
  img.src = 'img/icons8-галочка.svg'; 
  spanCheckbox.appendChild(img);
  img.style.display = 'none';
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      img.style.display = 'inline-block';
    } else {
      img.style.display = 'none';
    }
  });
  // Date
  const currenData = document.createElement('span');
  currenData.className = 'curren_data';
  currenData.textContent = date;
  // Button to delete task
  const crossTask = document.createElement('button');
  crossTask.className = 'btn cross_task';
  crossTask.textContent = 'X';
  // TaskItem elements
  taskItem.className = 'task_item';
  taskItem.id = id;
  taskItem.append(crossTask)
  taskItem.append(label, currenData, crossTask);
  return taskItem;
}

const task = {
  task: "New task",
  isCompleted: false,
  date: new Date().toLocaleDateString(),
  id: self.crypto.randomUUID(),
};

// LocalStorage
localStorage.setItem('todos', JSON.stringify({}));

// получаем данные из LocalStorage
function getDataLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];  // если data истенное значение, то выполняется код после ?, если нет, то выполняется код после :
}

// записываем данные в LocalStorage
function setDataLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

form.append(tasksContainer);
const renderTasks = () => {
  tasksContainer.innerHTML = '';
  const tasks = getDataLocalStorage('tasks');
  if (tasks && tasks.length > 0) {
    tasks.forEach(({ id, text, date, isCompleted }) => {
      const taskItem = createTaskItem(id, text, date, isCompleted);
      tasksContainer.append(taskItem);
    })
  } else {
    tasksContainer.innerText = 'No tasks';
  }
}


// Add task -- добавляем задачи
button[2].addEventListener('click', addTask);

function addTask (){
const taskItem = createTaskItem(task.task, task.isCompleted, task.id, task.date);
blockTask.append(taskItem);
}

// Delete all task -- удаляем все задачи
function deleteAllTask (){
  if (confirm('Are you sure you want to delete all tasks?')) {
    localStorage.removeItem('tasks'); // Удаляем все задачи из локального хранилища
    blockTask.innerHTML = ''; 
  } else {
    alert('Be careful!');
  }
};

button[0].addEventListener('click', deleteAllTask);


// Delete task -- удаляем определённую задачу
const deleteTask = (id) => {
  const tasks = getDataLocalStorage('tasks');
  if (tasks) {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setDataLocalStorage('tasks', updatedTasks);
    renderTasks();
  } else {
    console.error('No task');
  }
}

const handlerDeleteTask = (event) => {
  const { target } = event;
  
  if (target.classList.contains('cross_task') || target.classList.contains('checkbox')) {
    if (confirm('Delete task?')) {
      const taskCard = target.closest('.task_item'); // Получаем родительскую карточку
      const taskId = taskCard.id;
      deleteTask(taskId); 
      taskCard.remove(); // Удаляем карточку из DOM
    }
  }
}