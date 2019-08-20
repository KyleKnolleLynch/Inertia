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

  const client_id = '';
  const urlU = `https://api.unsplash.com/photos/random?client_id=${client_id}`;

  if (hours < 4) {
    try {
      const res = await fetch(`${urlU}&query=night&query=nature`, {
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
      bgImg.style.background = `linear-gradient(0deg, #555, transparent 30%, 80%, #888 100%), url('${
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
    } catch (err) {
      title.innerHTML = 'Good morning,';
      bgImg.style.background = `linear-gradient(0deg, #555, transparent 30%, 80%, #888 100%), url(./images/default-early-am.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>Silverthorne, United States</p><span>Photo by</span> <a href="https://unsplash.com/@nathananderson?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Nathan Anderson</a> <span>on</span> <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>';
      console.log(err);
    }
  } else if (hours < 12) {
    try {
      const res = await fetch(`${urlU}&query=morning&query=nature`, {
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
      bgImg.style.background = `linear-gradient(0deg, #555, transparent 30%, 80%, #888 100%), url('${
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
    } catch (err) {
      title.innerHTML = 'Good morning,';
      bgImg.style.background = `linear-gradient(0deg, #555, transparent 30%, 80%, #888 100%), url(./images/default-morning.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>Hopeful horizons</p><span>Photo by</span> <a href="https://unsplash.com/@davealmine?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Dawid Zawila</a> <span>on</span> <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>';
      console.log(err);
    }
  } else if (hours < 18) {
    try {
      const res = await fetch(
        `http://localhost:9000/getunsplash&query=afternoon&query=nature`,
        {
          method: 'get'
        }
      );
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
      bgImg.style.background = `linear-gradient(0deg, #555, transparent 30%, 80%, #888 100%), url('${
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
      }</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a></p>
      `;
    } catch (err) {
      title.innerHTML = 'Good afternoon,';
      bgImg.style.background = `linear-gradient(0deg, #555, transparent 30%, 80%, #888 100%), url(./images/rox-park-noon.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>Roxborough Park, Colorado</p><span>Photo by</span> <a href="https://kyleknollelynch.github.io/Portfolio">Kyle Lynch</a>';
      console.log(err);
    }
  } else if (hours < 24) {
    try {
      const res = await fetch(`${urlU}&query=night&query=nature`, {
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
      bgImg.style.background = `linear-gradient(0deg, #555, transparent 30%, 80%, #888 100%), url('${
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
    } catch (err) {
      title.innerHTML = 'Good evening,';
      bgImg.style.background = `linear-gradient(0deg, #555, transparent 30%, 80%, #888 100%), url(./images/default-night.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>river beside mountain under full moon</p><span>Photo by</span> <a href="https://unsplash.com/@sayannath?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Sayan Nath</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>';
      console.log(err);
    }
  }
};

//////////////////////////////////////////////////////////
//                     WEATHER DISPLAY                  //

const weatherKey = '';
const urlW = `https://api.openweathermap.org/data/2.5/weather`;

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather, showError, {
      enableHighAccuracy: true,
      timeout: 10000
    });
  } else {
    weatherDis.innerHTML =
      '<span>Geolocation not supported on this device</span>';
  }
};

const showWeather = async position => {
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
    console.log(`Error!: ${err}`);
  }
};

const showError = error => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      weatherDis.innerHTML = '<span>User denied geolocation request.</span>';
      setTimeout(
        () =>
          (weatherDis.innerHTML =
            '<span>Please enable location services.</span>'),
        5000
      );
      setTimeout(() => (weatherDis.innerHTML = ''), 25000);
      return;
    case error.POSITION_UNAVAILABLE:
      weatherDis.innerHTML =
        '<span>Location info unavailable from current position.</span>';
      return;
    case error.TIMEOUT:
      weatherDis.innerHTML = '<span>Location request timed out.</span>';
      return;
    case error.UNKNOWN_ERROR:
      weatherDis.innerHTML = '<span>An unknown error occured.</span>';
      return;
    default:
      weatherDis.innerHTML = '<span>Something went wrong.</span>';
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
  if ((inputFocus.style.borderBottom = '2px solid #ccc'))
    inputFocus.style.borderBottom = 'none';
};

const getInputFocus = () => {
  if (
    localStorage.getItem('input-focus') === null ||
    localStorage.getItem('input-focus') === ''
  ) {
    localStorage.removeItem('input-focus');
    inputFocus.style.borderBottom = '2px solid #ccc';
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
    altClock.innerHTML = t;
  };
  altClock.style.display = 'block';
  setInterval(altTime, 1000);
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
  const clone = Object.assign(todoList);
  todoList ? (showTodo.innerHTML = clone.innerHTML) : (showTodo.innerHTML = '');
  if (showTodo) return;
};

const hideTodoList = () => {
  showTodo.innerHTML = '';
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

setInterval(time, 1000);
setDisplay();
setInterval(setDisplay, 21600000);
getUser();
getInputFocus();
