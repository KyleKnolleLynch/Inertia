const clock = document.getElementById('clock');
altClock = document.getElementById('alt-clock');
weatherDiv = document.getElementById('weather-div');
weatherDis = document.getElementById('weather-dis');
weatherDisAlt = document.getElementById('weather-dis-alt');
bgImg = document.getElementById('bg-full-image');
title = document.getElementById('title');
user = document.getElementById('user');
focus = document.getElementById('focus');
inputFocus = document.getElementById('input-focus');
settings = document.getElementById('settings');
cog = document.getElementById('cog');
todos = document.getElementById('todos');
todoOpen = document.getElementById('todo-open');
todoClear = document.getElementById('todo-clear');
todoForm = document.getElementById('todo-form');
todoInput = document.getElementById('todo-input');
todoList = document.getElementById('todo-list');
todoEmpty = document.querySelector('.empty');
showTodo = document.getElementById('show-todo-list');
radFocusOn = document.getElementById('rad-focus-on');
radClockAlt = document.getElementById('rad-clock-alt');
radTodoShow = document.getElementById('rad-todo-show');
checkboxes = document.querySelectorAll('input[type=checkbox]');
fiveDay = document.getElementById('five-day');
altFiveDay = document.getElementById('alt-five-day');
attr = document.getElementById('attribute');

//             TIME/BACKGROUND IMAGE DISPLAY                //
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

const setDisplay = async () => {
  let today = new Date();
  hours = today.getHours();

  if (hours < 4) {
    try {
      const res = await fetch('/.netlify/functions/getnightpics', {
        method: 'get'
      });
      const resData = await res.json();
      const desc = !resData.location
        ? resData.alt_description
        : resData.location.title
        ? resData.location.title
        : resData.location.title === null || ''
        ? resData.location.position.title
        : resData.location.position.title === null
        ? resData.location.city + ', ' + resData.location.country
        : resData.location.city === null && resData.location.country === null
        ? resData.alt_description
        : resData.alt_description === null
        ? 'Location Undefined'
        : 'Location undefined';

      title.innerHTML = 'Good morning,';
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url('${resData.urls.regular}') center/cover no-repeat`;

      attr.innerHTML = `
      <p>${desc}</p>
      Photo by <a href="${resData.links.html}?utm_source=Inertia&utm_medium=referral">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a>
      `;
    } catch (err) {
      title.innerHTML = 'Good morning,';
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/default-early-am.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>Silverthorne, United States</p><span>Photo by</span> <a href="https://unsplash.com/@nathananderson?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Nathan Anderson</a> <span>on</span> <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a>';
      console.log(err);
    }
  } else if (hours < 12) {
    try {
      const res = await fetch('/.netlify/functions/getmorningpics', {
        method: 'get'
      });
      const resData = await res.json();
      const desc = !resData.location
        ? resData.alt_description
        : resData.location.title
        ? resData.location.title
        : resData.location.title === null || ''
        ? resData.location.position.title
        : resData.location.position.title === null
        ? resData.location.city + ', ' + resData.location.country
        : resData.location.city === null && resData.location.country === null
        ? resData.alt_description
        : resData.alt_description === null
        ? 'Location Undefined'
        : 'Location undefined';

      title.innerHTML = 'Good morning,';
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url('${resData.urls.regular}') center/cover no-repeat`;

      attr.innerHTML = `
      <p>${desc}</p>
      Photo by <a href="${resData.links.html}?utm_source=Inertia&utm_medium=referral">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a>
      `;
    } catch (err) {
      title.innerHTML = 'Good morning,';
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/default-morning.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>Hopeful horizons</p><span>Photo by</span> <a href="https://unsplash.com/@davealmine?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Dawid Zawila</a> <span>on</span> <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a>';
      console.log(err);
    }
  } else if (hours < 18) {
    try {
      const res = await fetch('/.netlify/functions/getnoonpics', {
        method: 'get'
      });
      const resData = await res.json();
      const desc = !resData.location
        ? resData.alt_description
        : resData.location.title
        ? resData.location.title
        : resData.location.title === null || ''
        ? resData.location.position.title
        : resData.location.position.title === null
        ? resData.location.city + ', ' + resData.location.country
        : resData.location.city === null && resData.location.country === null
        ? resData.alt_description
        : resData.alt_description === null
        ? 'Location Undefined'
        : 'Location undefined';

      title.innerHTML = 'Good afternoon,';
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url('${resData.urls.regular}') center/cover no-repeat`;

      attr.innerHTML = `
      <p>${desc}</p>
        Photo by <a href="${resData.links.html}?utm_source=Inertia&utm_medium=referral">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></p>
      `;
    } catch (err) {
      title.innerHTML = 'Good afternoon,';
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/rox-park-noon.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>Roxborough Park, Colorado</p><span>Photo by</span> <a href="https://kyleknollelynch.github.io/Portfolio">Kyle Lynch</a>';
      console.log(err);
    }
  } else if (hours < 24) {
    try {
      const res = await fetch('/.netlify/functions/getnightpics', {
        method: 'get'
      });
      const resData = await res.json();
      const desc = !resData.location
        ? resData.alt_description
        : resData.location.title
        ? resData.location.title
        : resData.location.title === null || ''
        ? resData.location.position.title
        : resData.location.position.title === null
        ? resData.location.city + ', ' + resData.location.country
        : resData.location.city === null && resData.location.country === null
        ? resData.alt_description
        : resData.alt_description === null
        ? 'Location Undefined'
        : 'Location undefined';

      title.innerHTML = 'Good evening,';
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url('${resData.urls.regular}') center/cover no-repeat`;

      attr.innerHTML = `
      <p>${desc}</p>
      Photo by <a href="${resData.links.html}?utm_source=Inertia&utm_medium=referral">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a>
      `;
    } catch (err) {
      title.innerHTML = 'Good evening,';
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/default-night.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>river beside mountain under full moon</p><span>Photo by</span> <a href="https://unsplash.com/@sayannath?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Sayan Nath</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a>';
      console.log(err);
    }
  }
};

//////////////////////////////////////////////////////////
//                USER/FOCUS DISPLAY                    //

const clearUser = () => {
  if (user.textContent === '[Enter Name]') user.textContent = '';
};

const getUser = () => {
  if (
    localStorage.getItem('user') === null ||
    localStorage.getItem('user') === ''
  ) {
    localStorage.removeItem('user');
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

const clearFocus = () => {
  if ((inputFocus.style.borderBottom = '2px solid #fff0f5'))
    inputFocus.style.borderBottom = 'none';
};

const getInputFocus = () => {
  if (
    localStorage.getItem('input-focus') === null ||
    localStorage.getItem('input-focus') === ''
  ) {
    localStorage.removeItem('input-focus');
    inputFocus.style.borderBottom = '2px solid #fff0f5';
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
///////////////////////////////////////////////////////////
//                        TODO LIST                     //
const openTodos = () => {
  if (todos.style.display === 'none') {
    todos.className = 'fadeIn';
    todos.style.display = 'block';
  } else {
    todos.className = 'fadeOut';
    setTimeout(() => (todos.style.display = 'none'), 300);
  }

  if (todoList.innerHTML === '') todoClear.style.display = 'none';
};

const closeTodos = e => {
  if (!todos.contains(e.target) && !todoOpen.contains(e.target)) {
    todos.className = 'fadeOut';
    setTimeout(() => (todos.style.display = 'none'), 300);
  }
};

let newTodos = localStorage.getItem('new-todos')
  ? JSON.parse(localStorage.getItem('new-todos'))
  : [];

newTodos.length === 0
  ? (todoList.innerHTML = '')
  : (todoClear.style.display = 'inline-block');

if (newTodos) {
  newTodos.forEach(item => {
    todoList.insertAdjacentHTML(
      'afterbegin',
      `<li id='todo-item' data-key='${item.id}' class=${item.checked && 'done'}>
  <input id='${item.id}' type='checkbox' />
  <label for='${item.id}' class='checkmark p'></label>
  <span id='todo-span'>${item.text}</span>
  <a class='delete-todo button'> <i class="danger fas fa-minus"></i></a> 
  </li>`
    );
  });
}

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
  <label for='${item.id}' class='checkmark p'></label>
  <span id='todo-span'>${item.text}</span>
  <a class='delete-todo button'><i class="danger fas fa-minus"></i></a> 
  </li>`
  );
  todoClear.style.display = 'inline-block';
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
  const item = document.querySelector(`[data-key='${key}']`);
  newTodos[index].checked = !newTodos[index].checked;

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

  if (e.target.classList.contains('fa-minus')) {
    const itemKey = e.target.parentElement.parentElement.dataset.key;
    deleteTodoFunc(itemKey);
  }
});
//////////////////////////////////////////////////////////////
//                       SETTINGS                           //
const openSettings = () => {
  if (settings.style.display === 'none') {
    settings.className = 'fadeIn';
    settings.style.display = 'grid';
  } else {
    settings.className = 'fadeOut';
    setTimeout(() => (settings.style.display = 'none'), 300);
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
    setTimeout(() => (settings.style.display = 'none'), 300);
    cog.classList.toggle('rotate');
  }
  checkboxes.forEach(box => {
    localStorage.setItem(box.id, box.checked);
  });

  load();
};

const hideFocus = () => {
  focus.style.display = 'none';
};

const showFocus = () => {
  focus.style.display = 'block';
};

const showClock = () => {
  altClock.style.display = 'none';
  clock.style.display = 'block';
  setInterval(time, 1000);
};

const showAltClock = () => {
  clock.style.display = 'none';
  const altTime = () => {
    const d = new Date().toLocaleTimeString('default', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });
    altClock.innerHTML = d;
  };
  altClock.style.display = 'block';
  setInterval(altTime, 1000);
};

const showTodoList = () => {
  const clone = Object.assign(todoList);
  todoList ? (showTodo.innerHTML = clone.innerHTML) : (showTodo.innerHTML = '');
  if (showTodo) return;
};

const hideTodoList = () => {
  showTodo.innerHTML = '';
};

const showCel = () => {
  weatherDis.style.display = 'none';
  weatherDisAlt.style.display = 'grid';
};

const showFar = () => {
  weatherDisAlt.style.display = 'none';
  weatherDis.style.display = 'grid';
};

const showWeekly = () => {
  weatherDiv.style.display = 'none';
  document.getElementById('rad-temp-far').checked
    ? (fiveDay.style.display = 'grid')
    : (altFiveDay.style.display = 'grid');
};

const hideWeekly = e => {
  if (
    !weatherDiv.contains(e.target) &&
    !fiveDay.contains(e.target) &&
    !altFiveDay.contains(e.target)
  ) {
    fiveDay.style.display = 'none';
    altFiveDay.style.display = 'none';
    weatherDiv.style.display = 'block';
  }
};

const load = () => {
  checkboxes.forEach(box => {
    box.checked = localStorage.getItem(box.id) === 'true' ? true : false;
    radClockAlt.checked ? showAltClock() : showClock();
    document.getElementById('rad-temp-far').checked ? showFar() : showCel();
    radFocusOn.checked ? showFocus() : hideFocus();
    radTodoShow.checked ? showTodoList() : hideTodoList();
  });
};

checkboxes.forEach(box => {
  if (localStorage.getItem(box.id)) {
    load();
  }
});

/////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', getLocation);
user.addEventListener('click', clearUser);
user.addEventListener('keydown', setUser);
user.addEventListener('blur', setUser);
inputFocus.addEventListener('click', clearFocus);
inputFocus.addEventListener('keydown', setInputFocus);
inputFocus.addEventListener('blur', setInputFocus);
cog.addEventListener('click', openSettings);
window.addEventListener('click', closeSettings);
todoOpen.addEventListener('click', openTodos);
window.addEventListener('click', closeTodos);
todoClear.addEventListener('click', clearAll);
weatherDiv.addEventListener('click', showWeekly);
window.addEventListener('click', hideWeekly);

setInterval(time, 1000);
setDisplay();
getUser();
getInputFocus();
