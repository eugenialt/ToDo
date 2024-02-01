// шапка приложения --1--
const root = document.getElementById('root');

const header = document.createElement('header');

const container = document.createElement('div');
container.className = 'container';

const headerInner = document.createElement('div')
headerInner.className ='header_inner';

const headerAll = document.createElement('div');
headerAll.className = 'header_all';

root.append(header)
header.append(container)
container.append(headerInner)


// создаём кнопки --headerInner--
import { createButtons } from './creatingElements/buttons.js';

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
  headerInner.appendChild(button); 
} );

const buttonDeleteLast = button[1];
button[1].className = 'btn delete_button';


// создаём input --headerInner--
import { insertLineInput } from './creatingElements/input.js';

export const inputToDo = insertLineInput('Enter ToDo...', button[1], button[2]);
inputToDo.setAttribute('type', 'text');

const inputForm = document.createElement('form');
inputForm.addEventListener('submit', function(event) {
  event.preventDefault(); 
  addTask();
  inputToDo.value = '';
});
inputForm.append(inputToDo);

headerInner.append(button[0],inputForm, button[1], button[2]);


// шапка приложения --2--
const headerUnder = document.createElement('div')
headerUnder.className = 'header_under';
container.append(headerUnder)

const allTask = document.createElement('div');
allTask.className = 'all_task';
allTask.textContent = 'All Task: 0';

const completedTask = document.createElement('div');
completedTask.className = 'completed_task';
completedTask.textContent = 'Completed Task: 0'
headerUnder.append(allTask,completedTask)


// Кнопки внутри шапки --headerUnder--
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
const buttonShowAll = buttonUnderHeader[0];


// создаём input --headerUnder--
const inputSearch = insertLineInput('Search...', buttonUnderHeader[1]);
inputSearch.setAttribute('type', 'search');
inputSearch.id = 'inputSearch';
const searchForm = document.createElement('form');
headerUnder.append(searchForm);
searchForm.append(inputSearch);

inputSearch.addEventListener('input', searchForInput);


// кнопки todo --3--
export const form = document.createElement('form');
form.className = 'form';
root.append(form)


// FunctionCreateInput
import { createInput } from './creatingElements/input.js';


// --3-- Блок с задачами и их свойствами
export const createTaskItem = (text, isCompleted, id, date) => {
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
      taskItem.style.boxShadow = '0 20px 28px rgba(0,0,0,0.25), 0 15px 10px rgba(0,0,0,0.22)';
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
  crossTask.addEventListener('click', deleteTask);

  // TaskItem elements
  taskItem.className = 'task_item';
  taskItem.id = id;
  taskItem.append(label, currenData, crossTask);
  return taskItem ;
}


// получаем данные из LocalStorage
import { getDataLocalStorage } from './localStorage.js';


// записываем данные в LocalStorage
import { setDataLocalStorage } from './localStorage.js';


// рендеринг задач
import { renderTasks } from './function/renderTasks.js';


// Add task -- добавляем задачи
button[2].addEventListener('click', addTask);

import { addTask } from './function/addTask.js';


// Delete all task -- удаляем все задачи
document.addEventListener('DOMContentLoaded', function() {

  button[0].addEventListener('click', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    if (prompt('Are you sure?') === 'yes') {
    localStorage.clear();
    }
    renderTasks();
  });
});


// удаляем определённую задачу
import { deleteTask } from './function/deleteTask.js';


// allTask -- счётчик всех задач
export function calculateAllTask () {
  const tasks = getDataLocalStorage('tasks');

  if (tasks.length > 0) {
    allTask.textContent = `All Task: ${tasks.length}`;

  } else {
    allTask.textContent = 'All Task: 0';
  }
}


// Delete last button -- Создаем обработчик событий на кнопку "Удалить последнюю задачу"
buttonDeleteLast.addEventListener('click', function() {
  const tasks = getDataLocalStorage('tasks', []);
  if (tasks.length > 0) {
    tasks.pop();
    setDataLocalStorage('tasks', tasks);
  }
  renderTasks();
});


// showallButton -- создаем обработчик событий на кнопку "Показать все задачи"
buttonShowAll.addEventListener('click', function() {
  const allTasks = JSON.parse(localStorage.getItem('tasks')) || []; 
  renderTasks(allTasks); 
});


// searchFunction  -- поиск элементов
function searchForInput(event) {
  const searchValue = event.target.value.toLowerCase();
  const tasks = getDataLocalStorage('tasks', []);
  
  const filteredTasks = tasks.filter(task => {
    const taskText = task.text.toLowerCase();
    return taskText.includes(searchValue);
  });

  renderTasks(filteredTasks); 
}
addEventListener('DOMContentLoaded', renderTasks)


// CompletedTask -- выводим колличество завершённых задач
// function completedTask (event, taskIndex) {
//   event.preventDefault();
//   let tasks = getDataLocalStorage('tasks', []);
//   tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
//   setDataLocalStorage('tasks', tasks);
//   renderTasks();
// }