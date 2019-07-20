const clock = document.getElementById('clock');
const title = document.getElementById('title');
const user = document.getElementById('user');
const inputFocus = document.getElementById('input-focus');
const bgImg = document.getElementById('bg-full-image');
const settings = document.getElementById('settings');
const cog = document.getElementById('cog');
const todos = document.getElementById('todos');
const todoOpen = document.getElementById('todo-open');
const todoClear = document.getElementById('todo-clear');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const todoEmpty = document.querySelector('.empty');

const time = () => {
  const today = new Date();
  let hours = today.getHours();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const minutes = today.getMinutes();

  const displayZero = num => {
    return (parseInt(num, 10) < 10 ? '0' : '') + num;
  };

  clock.innerHTML = `
 ${hours}:${displayZero(minutes)}<span id="clockSpan">${amPm}</span>`;
};

setInterval(time);

const setDisplay = () => {
  let today = new Date();
  hours = today.getHours();

  if (hours < 12) {
    title.innerHTML = 'Good morning,';
    bgImg.style.background =
      'linear-gradient(0deg,  #555, transparent 20%, #555 90%), url("https://source.unsplash.com/daily?landscape?morning") no-repeat center';
    bgImg.style.backgroundSize = 'cover';
  } else if (hours < 18) {
    title.innerHTML = 'Good afternoon,';
    bgImg.style.background =
      'linear-gradient(0deg,  #555, transparent 20%, #555 90%), url("https://source.unsplash.com/daily?landscape?afternoon") no-repeat center';
    bgImg.style.backgroundSize = 'cover';
  } else if (hours >= 18) {
    title.innerHTML = 'Good evening,';
    bgImg.style.background =
      'linear-gradient(0deg,  #555, transparent 20%, #555 90%),url("https://source.unsplash.com/daily?nature?night") no-repeat center';
    bgImg.style.backgroundSize = 'cover';
  }
};

const getUser = () => {
  if (localStorage.getItem('user') === null) {
    user.textContent = '[Enter Name]';
  } else if (localStorage.getItem('user') === '') {
    localStorage.removeItem('user');
    location.reload(true);
    user.textContent = '[Enter Name]';
  } else {
    user.textContent = localStorage.getItem('user');
  }
};

const setUser = e => {
  if (e.type === 'keydown') {
    if (e.keyCode == 13) {
      localStorage.setItem('user', e.target.innerText);
      user.blur();
    }
  } else {
    localStorage.setItem('user', e.target.innerText);
    location.reload();
  }
};

const getInputFocus = () => {
  if (localStorage.getItem('input-focus') === null) {
    inputFocus.textContent = "[Enter Today's Focus]";
  } else if (localStorage.getItem('input-focus') === '') {
    localStorage.removeItem('input-focus');
    location.reload(true);
    inputFocus.textContent = "[Enter Today's Focus]";
  } else {
    inputFocus.textContent = localStorage.getItem('input-focus');
  }
};

const setInputFocus = e => {
  if (e.type === 'keydown') {
    if (e.keyCode == 13) {
      localStorage.setItem('input-focus', e.target.innerText);
      inputFocus.blur();
    }
  } else {
    localStorage.setItem('input-focus', e.target.innerText);
    location.reload();
  }
};

const openSettings = () => {
  settings.style.display === 'none'
    ? (settings.style.display = 'grid')
    : (settings.style.display = 'none');
  cog.classList.toggle('rotate');
};

const closeBtn = e => {
  if (!settings.contains(e.target) && !cog.contains(e.target)) {
    settings.style.display = 'none';
    cog.style.display = 'block';
  }
  settings.style.display === 'none'
    ? (cog.className = 'button close-rotate')
    : (cog.className = 'button rotate');
};

const openTodos = () => {
  todoOpen.style.display = 'none';
  todos.style.display = 'block';
  if (newTodos.length === 0) todoClear.style.display = 'none';
};

const closeTodos = e => {
  if (!todos.contains(e.target) && !todoOpen.contains(e.target)) {
    todos.style.display = 'none';
    todoOpen.style.display = 'inline-block';
  }
};

let newTodos = localStorage.getItem('new-todos')
  ? JSON.parse(localStorage.getItem('new-todos'))
  : [];

if (newTodos.length === 0) {
  todoList.innerHTML = '';
} else {
  todoClear.style.display = 'block';
}

localStorage.setItem('new-todos', JSON.stringify(newTodos));
const data = JSON.parse(localStorage.getItem('new-todos'));

const addTodos = text => {
  const item = {
    text,
    checked: false,
    id: Date.now()
  };

  newTodos.push(item);

  todoList.insertAdjacentHTML(
    'afterbegin',
    `<li id='todo-item' data-key='${item.id}'>
  <input id='${item.id}' type='checkbox' />
  <label for='${item.id}' class='checkmark'></label>
  <span>${item.text}</span>
  <button class='delete-todo'><i class='fas fa-trash danger'></i></button> 
  </li>`
  );
  todoClear.style.display = 'block';
};

todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = todoInput.value.trim();

  if (text !== '') {
    addTodos(text);
    localStorage.setItem('new-todos', JSON.stringify(newTodos));
    todoInput.value = '';
    todoInput.focus();
  }
});

data.forEach(item => {
  todoList.insertAdjacentHTML(
    'afterbegin',
    `<li id='todo-item' data-key='${item.id}'>
  <input id='${item.id}' type='checkbox' />
  <label for='${item.id}' class='checkmark'></label>
  <span>${item.text}</span>
  <button class='delete-todo'><i class='fas fa-trash danger'></i></button> 
  </li>`
  );
});

const toggleCheck = key => {
  const index = newTodos.findIndex(item => item.id === Number(key));
  newTodos[index].checked = !newTodos[index].checked;

  const item = document.querySelector(`[data-key='${key}']`);

  if (newTodos[index].checked) {
    item.classList.add('done');
  } else {
    item.classList.remove('done');
  }
  //  map through new array to save to local storage
};

const deleteTodoFunc = key => {
  newTodos = newTodos.filter(item => item.id !== Number(key));
  const item = document.querySelector(`[data-key='${key}']`);
  item.remove();
  localStorage.setItem('new-todos', JSON.stringify(newTodos));
};

const clearAll = e => {
  e.preventDefault();
  todoList.innerHTML = '';
  localStorage.removeItem('new-todos');
  newTodos = [];
  todoClear.style.display = 'none';
};

todoList.addEventListener('click', e => {
  if (e.target.classList.contains('checkmark')) {
    const itemKey = e.target.parentElement.dataset.key;
    toggleCheck(itemKey);
  }

  if (e.target.classList.contains('fa-trash')) {
    const itemKey = e.target.parentElement.parentElement.dataset.key;
    deleteTodoFunc(itemKey);
  }
});

user.addEventListener('keydown', setUser);
user.addEventListener('blur', setUser);
inputFocus.addEventListener('keydown', setInputFocus);
inputFocus.addEventListener('blur', setInputFocus);
cog.addEventListener('click', openSettings);
window.addEventListener('click', closeBtn);
todoOpen.addEventListener('click', openTodos);
window.addEventListener('click', closeTodos);
todoClear.addEventListener('click', clearAll);

setDisplay();
getUser();
getInputFocus();
