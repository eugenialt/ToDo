import {getDataLocalStorage, setDataLocalStorage} from '../localStorage.js';
import {renderTasks} from '../function/renderTasks.js';
import {calculateAllTask} from '../index.js';
import {inputToDo} from '../index.js';

export function addTask (){
    const tasks = getDataLocalStorage('tasks', []);
    const inputText = inputToDo.value;
  
    const task = {
      text: inputText,
      date: new Date().toLocaleDateString(),
      isCompleted: false,
      id: self.crypto.randomUUID(),
    }
  
    tasks.push(task);
    setDataLocalStorage('tasks', tasks);
    renderTasks();
    calculateAllTask();
  }
