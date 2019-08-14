const clock = document.getElementById('clock');
altClock = document.getElementById('alt-clock');
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
radFocusOff = document.getElementById('rad-focus-off');
radClockAlt = document.getElementById('rad-clock-alt');
radTempCel = document.getElementById('rad-temp-cel');
radTodoShow = document.getElementById('rad-todo-show');
checkboxes = document.querySelectorAll('input[type=checkbox]');
weatherTitle = document.getElementById('weather-title');
weatherTemp = document.getElementById('weather-temp');
deg = document.getElementById('deg');
weatherIcon = document.getElementById('weather-icon');
weatherTitleAlt = document.getElementById('weather-title-alt');
weatherTempAlt = document.getElementById('weather-temp-alt');
altDeg = document.getElementById('alt-deg');
weatherIconAlt = document.getElementById('weather-icon-alt');
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

  const client_id =
    '';
  const urlU = `https://api.unsplash.com/photos/random?client_id=${client_id}`;

  if (hours < 4) {
    const res = await fetch(`${urlU}&query=night&query=nature`, {
      method: 'get'
    });
    const resData = await res.json();
    const desc =
      resData.location === undefined || null
        ? resData.alt_description
        : resData.location.title
        ? resData.location.title
        : resData.location.title === null || ''
        ? resData.location.position.title
        : resData.location.position.title === null
        ? resData.location.city + ', ' + resData.location.country
        : resData.alt_description === null
        ? 'Location Undefined'
        : 'Location undefined';

    title.innerHTML = 'Good morning,';
    bgImg.style.background = `linear-gradient(0deg,  #555, transparent 20%, #555 90%), url('${
      resData.urls.regular
    }') center/cover no-repeat`;

    attr.innerHTML = `
      <p>${desc}</p>
      Photo by <a href="${
        resData.links.html
      }?utm_source=your_app_name&utm_medium=referral">${
      resData.user.first_name
    } ${
      resData.user.last_name
    }</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>
      `;
  } else if (hours < 12) {
    const res = await fetch(`${urlU}&query=morning&query=nature`, {
      method: 'get'
    });
    const resData = await res.json();
    const desc =
      resData.location === undefined || null
        ? resData.alt_description
        : resData.location.title
        ? resData.location.title
        : resData.location.title === null || ''
        ? resData.location.position.title
        : resData.location.position.title === null
        ? resData.location.city + ', ' + resData.location.country
        : resData.alt_description === null
        ? 'Location Undefined'
        : 'Location Undefined';

    title.innerHTML = 'Good morning,';
    bgImg.style.background = `linear-gradient(0deg,  #555, transparent 20%, #555 90%), url('${
      resData.urls.regular
    }') center/cover no-repeat`;

    attr.innerHTML = `
      <p>${desc}</p>
      Photo by <a href="${
        resData.links.html
      }?utm_source=your_app_name&utm_medium=referral">${
      resData.user.first_name
    } ${
      resData.user.last_name
    }</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>
      `;
  } else if (hours < 18) {
    const res = await fetch(`${urlU}&query=afternoon&query=nature`, {
      method: 'get'
    });
    const resData = await res.json();
    console.log(resData);
    const desc =
      resData.location === undefined || null
        ? resData.alt_description
        : resData.location.title
        ? resData.location.title
        : resData.location.title === null || ''
        ? resData.location.position.title
        : resData.location.position.title === null
        ? resData.location.city + ', ' + resData.location.country
        : resData.alt_description === null
        ? 'Location Undefined'
        : 'Location undefined';

    title.innerHTML = 'Good afternoon,';
    bgImg.style.background = `linear-gradient(0deg,  #555, transparent 20%, #555 90%), url('${
      resData.urls.regular
    }') center/cover no-repeat`;

    attr.innerHTML = `
      <p id='desc'>${desc}</p>
      <p>Photo by <a href="${
        resData.links.html
      }?utm_source=Inertia&utm_medium=referral">${resData.user.first_name} ${
      resData.user.last_name
    }</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></p>
      `;
  } else if (hours < 24) {
    const res = await fetch(`${urlU}&query=night&query=nature`, {
      method: 'get'
    });
    const resData = await res.json();
    const desc =
      resData.location === undefined || null
        ? resData.alt_description
        : resData.location.title
        ? resData.location.title
        : resData.location.title === null || ''
        ? resData.location.position.title
        : resData.location.position.title === null
        ? resData.location.city + ', ' + resData.location.country
        : resData.alt_description === null
        ? 'Location Undefined'
        : 'Location undefined';

    title.innerHTML = 'Good evening,';
    bgImg.style.background = `linear-gradient(0deg,  #555, transparent 20%, #555 90%), url('${
      resData.urls.regular
    }') center/cover no-repeat`;

    attr.innerHTML = `
      <p>${desc}</p>
      Photo by <a href="${
        resData.links.html
      }?utm_source=your_app_name&utm_medium=referral">${
      resData.user.first_name
    } ${
      resData.user.last_name
    }</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>
      `;
  }
};

//////////////////////////////////////////////////////////
//                     WEATHER DISPLAY                  //

const weatherKey = '';
const urlW = `https://api.openweathermap.org/data/2.5/weather`;

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPos, showError, {
      enableHighAccuracy: true,
      timeout: 10000
    });
  } else {
    weatherDis.innerHTML = 'Geolocation not supported on this device';
  }
};

const showPos = async position => {
  try {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const res = await fetch(
      `${urlW}?lat=${lat}&lon=${lon}&units=imperial&APPID=${weatherKey}`
    );

    const resData = await res.json();

    weatherTitle.textContent = resData.name;
    weatherTemp.textContent = Math.round(resData.main.temp);
    weatherTemp.insertAdjacentHTML('afterend', '<span id="deg"> &deg;F</span>');
    weatherIcon.innerHTML = `<img src='http://openweathermap.org/img/wn/${
      resData.weather[0].icon
    }.png'></img>`;

    const resAlt = await fetch(
      `${urlW}?lat=${lat}&lon=${lon}&units=metric&APPID=${weatherKey}`
    );

    const resDataAlt = await resAlt.json();

    weatherTitleAlt.textContent = resDataAlt.name;
    weatherTempAlt.textContent = Math.round(resDataAlt.main.temp);
    weatherTempAlt.insertAdjacentHTML(
      'afterend',
      '<span id="alt-deg"> &deg;C</span>'
    );
    weatherIconAlt.innerHTML = `<img src='http://openweathermap.org/img/wn/${
      resDataAlt.weather[0].icon
    }.png'></img>`;
  } catch (err) {
    alert(`Error!: ${err}`);
  }
};

const showError = error => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      weatherDis.innerHTML = 'User denied geolocation request.';
      setTimeout(
        () => (weatherDis.innerHTML = 'Please enable location services.'),
        5000
      );
      setTimeout(() => (weatherDis.innerHTML = ''), 25000);
      return;
    case error.POSITION_UNAVAILABLE:
      weatherDis.innerHTML = 'Location info unavailable from current position.';
      return;
    case error.TIMEOUT:
      weatherDis.innerHTML = 'Location request timed out.';
      return;
    case error.UNKNOWN_ERROR:
      weatherDis.innerHTML = 'An unknown error occured.';
      return;
    default:
      weatherDis.innerHTML = 'Something went wrong.';
  }
};

document.addEventListener('DOMContentLoaded', getLocation);

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
  if (inputFocus.textContent === "[Enter Today's Focus]")
    inputFocus.textContent = '';
};

const getInputFocus = () => {
  if (
    localStorage.getItem('input-focus') === null ||
    localStorage.getItem('input-focus') === ''
  ) {
    localStorage.removeItem('input-focus');
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
///////////////////////////////////////////////////////////
//                        TODO LIST                     //
const openTodos = () => {
  if (todos.style.display === 'none') {
    todos.className = 'fadeIn';
    todos.style.display = 'block';
  } else {
    todos.className = 'fadeOut';
    setTimeout(() => (todos.style.display = 'none'), 400);
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
  todoClear.style.display = 'inline-block';
}

localStorage.setItem('new-todos', JSON.stringify(newTodos));
const data = JSON.parse(localStorage.getItem('new-todos'));

data.forEach(item => {
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

const showCel = () => {
  weatherDis.style.display = 'none';
  weatherDisAlt.style.display = 'grid';
};

const showFar = () => {
  weatherDisAlt.style.display = 'none';
  weatherDis.style.display = 'grid';
};

const showTodoList = () => {
  showTodo.classList.remove('empty');
  todoList
    ? (showTodo.innerHTML = todoList.innerHTML)
    : (showTodo.innerHTML = '');
};

const hideTodoList = () => {
  showTodo.innerHTML = '';
  showTodo.classList.add('empty');
};

const load = () => {
  checkboxes.forEach(box => {
    box.checked = localStorage.getItem(box.id) === 'true' ? true : false;
    radClockAlt.checked ? showAltClock() : showClock();
    radFocusOff.checked ? showFocus() : hideFocus();
    radTempCel.checked ? showCel() : showFar();
    radTodoShow.checked ? showTodoList() : hideTodoList();
  });
};

checkboxes.forEach(box => {
  if (!localStorage.getItem(box.id)) {
    radFocusOff.checked;
    radClockAlt;
    radTempCel;
    radTodoShow;
  } else {
    load();
  }
});

/////////////////////////////////////////////////////////////////

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

setInterval(time, 500);
setDisplay();
setInterval(setDisplay, 21600000);
getUser();
getInputFocus();
