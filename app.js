const clock = document.getElementById('clock');
title = document.getElementById('title');
user = document.getElementById('user');
focus = document.getElementById('focus');
inputFocus = document.getElementById('input-focus');
bgImg = document.getElementById('bg-full-image');
altClock = document.getElementById('alt-clock');
settings = document.getElementById('settings');
cog = document.getElementById('cog');
todos = document.getElementById('todos');
todoOpen = document.getElementById('todo-open');
todoClear = document.getElementById('todo-clear');
todoForm = document.getElementById('todo-form');
todoInput = document.getElementById('todo-input');
todoList = document.getElementById('todo-list');
todoEmpty = document.querySelector('.empty');
// showTodo = document.getElementById('show-todo-div');
radTodoOn = document.getElementById('rad-todo-on');
radTodoOff = document.getElementById('rad-todo-off');
radClockOn = document.getElementById('rad-clock-on');
radClockOff = document.getElementById('rad-clock-off');
radios = document.querySelectorAll('input[type=radio]');
saveBtn = document.getElementById('save-btn');






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

setInterval(time, 500);

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
  } else if (hours < 24) {
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
  if (settings.style.display === 'none') {
    settings.className = 'fadeIn';
    settings.style.display = 'grid';
  } else {
    settings.className = 'fadeOut';
    setTimeout(() => (settings.style.display = 'none'), 400);
  }
  cog.classList.toggle('rotate');
};

const closeSettings = e => {
  if (
    !settings.contains(e.target) &&
    !cog.contains(e.target) &&
    settings.style.display === 'grid'
  ) {
    settings.className = 'fadeOut';
    setTimeout(() => (settings.style.display = 'none'), 400);
    cog.classList.toggle('rotate');
  }
};
//                            TODO LIST                           //
const openTodos = () => {
  if (todos.style.display === 'none') {
    todos.className = 'fadeIn';
    todos.style.display = 'block';
  } else {
    todos.style.display = 'none';
  }

  if (newTodos.length === 0) todoClear.style.display = 'none';
};

const closeTodos = e => {
  if (!todos.contains(e.target) && !todoOpen.contains(e.target)) {
    todos.className = 'fadeOut';
    setTimeout(() => (todos.style.display = 'none'), 400);
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

data.forEach(item => {
  todoList.insertAdjacentHTML(
    'afterbegin',
    `<li id='todo-item' data-key='${item.id}' class=${item.checked && 'done'}>
  <input id='${item.id}' type='checkbox' />
  <label for='${item.id}' class='checkmark'></label>
  <span id='todo-span'>${item.text}</span>
  <a class='delete-todo button'><i class='fas fa-trash danger'></i></a> 
  </li>`
  );
});

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
  <span id='todo-span'>${item.text}</span>
  <a class='delete-todo button'><i class='fas fa-trash danger'></i></a> 
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

const toggleCheck = key => {
  const index = newTodos.findIndex(item => item.id === Number(key));
  newTodos[index].checked = !newTodos[index].checked;

  const item = document.querySelector(`[data-key='${key}']`);

  if (newTodos[index].checked) {
    item.classList.add('done');
  } else {
    item.classList.remove('done');
  }

  localStorage.setItem('new-todos', JSON.stringify(newTodos));
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
//////////////////////////////////////////////////////////////////////////
const hideFocus = () => {
  focus.style.display = 'none';
};


const showFocus = () => {
  focus.style.display = 'block';
};

const showClock = () => {
  altClock.style.display = 'none';
  clock.style.display = 'block';
  setInterval(time, 500);
};

const showAltClock = () => {
  clock.style.display = 'none';
  const altTime = () => {
    const d = new Date();
    const t = d.toLocaleTimeString('default', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });
    const amPm = t > '12' ? 'PM' : 'AM';
    altClock.innerHTML = `${t}<span id="clockSpan">${amPm}</span>`;
  };
  altClock.style.display = 'block';
  setInterval(altTime, 500);
};



const save = e => {
e.preventDefault();
radios.forEach(radio => {
  localStorage.setItem(radio.value, radio.checked);
});

load();
}

const load = () => {
  radios.forEach(radio => {
      radio.checked = localStorage.getItem(radio.value) === 'true' ? true : false;
  });
}
 


//  const populateStorage = () => {
//   radios.forEach(radio => {
//     localStorage.setItem(radio.value, radio.checked);
//   })

 

  

//   setStyles();
// };

// focus.onchange = save;

//  const setStyles = () => {
//   radios.forEach(radio => {
//     radio.checked = localStorage.getItem(radio.value) === 'true' ? true : false;
//   })
  
  
  


//  };


// if (!localStorage.getItem(radio.value)) {
//   populateStorage();
// } else {
//   setStyles();
// }



// if (!localStorage.getItem('hide-focus')) {
//   populateStorage();
// } else {
//   setStyles();
// }




// radClockOn.onchange = populateStorage.
// radClockOff.onchange = populateStorage;




user.addEventListener('keydown', setUser);
user.addEventListener('blur', setUser);
inputFocus.addEventListener('keydown', setInputFocus);
inputFocus.addEventListener('blur', setInputFocus);
cog.addEventListener('click', openSettings);
window.addEventListener('click', closeSettings);
todoOpen.addEventListener('click', openTodos);
window.addEventListener('click', closeTodos);
todoClear.addEventListener('click', clearAll);
radTodoOn.addEventListener('click', hideFocus);
radTodoOff.addEventListener('click', showFocus);
radClockOn.addEventListener('click', showClock);
radClockOff.addEventListener('click', showAltClock);
saveBtn.addEventListener('click', save);


setDisplay();
setInterval(setDisplay, 21600000);
getUser();
getInputFocus();




