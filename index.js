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


// окно todo
const intro = document.createElement('div');
intro.className = 'intro';
header.append(intro);

const block = document.createElement('div');
block.className = 'block';
intro.append(block);

const block_message = document.createElement('div');
block_message.className = 'block_message';
block.append(block_message);


// кнопки todo --3--
const buttonBlock = createButton(2, 'btn'); 

buttonBlock.forEach(button => {
  block.appendChild(button);
});

if (buttonBlock.length >= 1) {
  buttonBlock[1].textContent = '✓';
} 
if (buttonBlock.length >= 2) {
  buttonBlock[0].textContent = '✗';
} 

function addInput(placeholderText, prevElement, nextElement) {
  const lineInput = document.createElement('input');
  lineInput.className = 'line_input input-text';
  lineInput.placeholder = placeholderText;
  prevElement.parentNode.insertBefore(lineInput, nextElement);
}
addInput('ToDo Text', buttonBlock[0], buttonBlock[1]);


// работа над временем
const dataDiv = document.createElement('div');
dataDiv.className = 'data_div'
block.append(dataDiv);

const date = new Date(2024, 1, 16, 18, 59, 59, 999);
const dateObj = document.createElement('time');
dateObj.className = 'date';
dateObj.textContent = date.toLocaleString();


dataDiv.append(dateObj)