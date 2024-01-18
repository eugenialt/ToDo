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

function createButton(numberButton, className) {
    const button = [];
    for (let i = 0; i < numberButton; i++){
        const buttons = document.createElement('button');
        buttons.className = className;
        button[i] = buttons;
    }
    return button;
}

const button = createButton(3, 'btn'); 

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
  headerInner.appendChild(button); // Добававляем каждую кнопку внутрь элемента
} );

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
const buttonUnderHeader = createButton(2, 'btn'); 

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

const tasks = [
  {
  id: self.crypto.randomUUID(),
  task: 'Выучить JS',
  isCompleted: false,
  date: new Date().toLocaleDateString('ru-RU', { // либо так new Date().toLocaleDateString()
    year: '2-digit',
    month: 'short',
    day: '2-digit'
  })
 },
 {
  id: self.crypto.randomUUID(),
  task: 'Выучить JS',
  isCompleted: false,
  date: new Date().toLocaleDateString()
 },
]

 

const createInput = (type, placeholder, name) => {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.name = name;
  return input;
}

const blockTask = document.createElement('div');
blockTask.className = 'block_task';
form.append(blockTask);
const createTaskItem = (text,isCompleted, id, date) => {
  const taskItem = document.createElement('div');
  const checkbox = createInput('checkbox', '', 'checkbox');
  checkbox.checked = isCompleted;
  checkbox.classList.add('checkbox');
  const currenData = document.createElement('span');
  currenData.className = 'curren_data';
  currenData.textContent = date;
  taskItem.className = 'task_item';
  taskItem.id = id;
  taskItem.textContent = text;
  taskItem.append(checkbox, currenData);
  return taskItem;
}

tasks.forEach(task => {
  const taskItem = createTaskItem(task.task, task.isCompleted, task.id, task.date);
  blockTask.append(taskItem);
})