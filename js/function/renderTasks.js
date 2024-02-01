// рендеринг задач
import {form} from '../index.js';
import {getDataLocalStorage, setDataLocalStorage} from '../localStorage.js';
import {createTaskItem} from '../index.js';
export const renderTasks = () => {
    form.innerHTML = '';
  
    const tasks = getDataLocalStorage('tasks');
    if (tasks && tasks.length > 0) {
      tasks.forEach(({text, isCompleted, id, date}) => {
        const taskItem = createTaskItem( text,' ', id, date);
        setDataLocalStorage('tasks', tasks);
       form.append(taskItem);
      })
    } else {
      form.innerText = 'No tasks';
    }
  }