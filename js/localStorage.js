// получаем данные из LocalStorage
export function getDataLocalStorage(key) {
    const tasks = JSON.parse(localStorage.getItem(key)) || []
    return tasks
  }

// записываем данные в LocalStorage
export function setDataLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
    