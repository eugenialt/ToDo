import {getDataLocalStorage, setDataLocalStorage} from '../localStorage.js';
import {renderTasks} from '../function/renderTasks.js';

export function deleteTask(event, taskIndex) {
    event.preventDefault();
    const tasks = getDataLocalStorage('tasks', []);
    tasks.splice(taskIndex, 1)
    setDataLocalStorage('tasks', tasks)
    renderTasks()
    }