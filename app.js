const user = document.getElementById('user');
inputFocus = document.getElementById('input-focus');
todoClear = document.getElementById('todo-clear');
todoList = document.getElementById('todo-list');
settings = document.getElementById('settings');

//    TIME/BACKGROUND IMAGE DISPLAY   //
const time = () => {
  const today = new Date();
  let hours = today.getHours();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const minutes = today.getMinutes();

  const displayZero = num => {
    return (parseInt(num, 10) < 10 ? '0' : '') + num;
  };

  document.getElementById('clock').innerHTML = `
 ${hours}:${displayZero(minutes)}<span id="clockSpan">${amPm}</span>`;
};

const setDisplay = async () => {
  const bgImg = document.getElementById('bg-full-image');
  const title = document.getElementById('title');
  const attr = document.getElementById('attribute');
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
      <div class="slider-attr-div"><div class="slider">
      <span>Photo by <a href="${resData.links.html}?utm_source=Inertia&utm_medium=referral">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>
      `;
    } catch (err) {
      title.innerHTML = 'Good morning,';
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/default-early-am.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>Silverthorne, United States</p><div class="slider-attr-div"><div class="slider"><span>Photo by <a href="https://unsplash.com/@nathananderson?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Nathan Anderson</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>';
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
      <div class="slider-attr-div"><div class="slider">
      <span>Photo by <a href="${resData.links.html}?utm_source=Inertia&utm_medium=referral">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>
      `;
    } catch (err) {
      title.innerHTML = 'Good morning,';
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/default-morning.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>Hopeful horizons</p><div class="slider-attr-div"><div class="slider"><span>Photo by <a href="https://unsplash.com/@davealmine?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Dawid Zawila</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>';
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
      <div class="slider-attr-div"><div class="slider">
        <span>Photo by <a href="${resData.links.html}?utm_source=Inertia&utm_medium=referral">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>
      `;
    } catch (err) {
      title.innerHTML = 'Good afternoon,';
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/rox-park-noon.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>Roxborough Park, Colorado</p><div class="slider-attr-div"><div class="slider"><span>Photo by <a href="https://kyleknollelynch.github.io/Portfolio">Kyle Lynch</a></span></div></div>';
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
      <div class="slider-attr-div"><div class="slider">
      <span>Photo by <a href="${resData.links.html}?utm_source=Inertia&utm_medium=referral">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>
      `;
    } catch (err) {
      title.innerHTML = 'Good evening,';
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/default-night.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>river beside mountain under full moon</p><div class="slider-attr-div"><div class="slider"><span>Photo by <a href="https://unsplash.com/@sayannath?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Sayan Nath</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>';
    }
  }
};

//    WEATHER DISPLAY   //
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather, showError, {
      enableHighAccuracy: true,
      timeout: 10000
    });
  } else {
    document.getElementById('weather-div').innerHTML =
      '<span>Geolocation not supported on this device</span>';
  }
};

const showWeather = async position => {
  try {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const res = await fetch(
      `/.netlify/functions/getweatherfaren?lat=${lat}&lon=${lon}`
    );
    const resData = await res.json();
    document.getElementById('weather-dis').innerHTML = `
      <h4 id="weather-title">${resData.name}</h4>
      <p id="weather-icon"><img src='http://openweathermap.org/img/wn/${
        resData.weather[0].icon
      }.png'></img></p>
      <h4 id="weather-temp">${Math.round(
        resData.main.temp
      )}<span>&deg;</span><span id="deg">F</span></h4>
    `;

    document.getElementById('dayone').innerHTML = `
    <h4>${resData.name}</h4>
    <h5>${Math.round(
      resData.main.temp
    )}<span>&deg;</span><span style="font-size: 1rem">F</span></h5>
    <h5>${resData.weather[0].description}</h5>
    <img src='http://openweathermap.org/img/wn/${
      resData.weather[0].icon
    }.png'></img> `;

    const resAlt = await fetch(
      `/.netlify/functions/getweathercelc?lat=${lat}&lon=${lon}`
    );
    const resDataAlt = await resAlt.json();

    document.getElementById('weather-dis-alt').innerHTML = `
    <h4 id="weather-title">${resDataAlt.name}</h4>
    <p id="weather-icon"><img src='http://openweathermap.org/img/wn/${
      resDataAlt.weather[0].icon
    }.png'></img></p>
    <h4 id="weather-temp">${Math.round(
      resDataAlt.main.temp
    )}<span>&deg;</span><span id="deg">C</span></h4>
  `;

    document.getElementById('alt-dayone').innerHTML = `
    <h4>${resDataAlt.name}</h4>
    <h5>${Math.round(
      resDataAlt.main.temp
    )}<span>&deg;</span><span style="font-size: 1rem">C</span></h5>
    <h5>${resDataAlt.weather[0].description}</h5>
    <img src='http://openweathermap.org/img/wn/${
      resDataAlt.weather[0].icon
    }.png'></img>`;

    //    Weekly Forecast   //
    //    Farenheit
    const resWeeklyFar = await fetch(
      `/.netlify/functions/getweeklyfaren?lat=${lat}&lon=${lon}`
    );
    const resWkFa = await resWeeklyFar.json();

    let d = new Date(resWkFa.list[3].dt_txt).toDateString().slice(0, -11);
    let t = new Date(resWkFa.list[3].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });

    let altD = new Date(resWkFa.list[7].dt_txt).toDateString().slice(0, -11);
    let altT = new Date(resWkFa.list[7].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });

    document.getElementById('daytwo').innerHTML = `
      <h5 class="days">${d}</h5>
      <h5>${t} ${Math.round(resWkFa.list[5].main.temp)}<span>&deg;</span></h5>
      <h5>${resWkFa.list[5].weather[0].main}</h5>
      <h5 class="days">${altD}</h5>
      <h5>${altT} ${Math.round(
      resWkFa.list[8].main.temp
    )}<span>&deg;</span></h5>
      <h5>${resWkFa.list[8].weather[0].main}</h5>`;

    d = new Date(resWkFa.list[11].dt_txt).toDateString().slice(0, -11);
    t = new Date(resWkFa.list[11].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });

    altD = new Date(resWkFa.list[15].dt_txt).toDateString().slice(0, -11);
    altT = new Date(resWkFa.list[15].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });

    document.getElementById('daythree').innerHTML = `
      <h5 class="days">${d}</h5>
      <h5>${t} ${Math.round(resWkFa.list[13].main.temp)}<span>&deg;</span></h5>
      <h5>${resWkFa.list[13].weather[0].main}</h5>
      <h5 class="days">${altD}</h5>
      <h5>${altT} ${Math.round(
      resWkFa.list[16].main.temp
    )}<span>&deg;</span></h5>
      <h5>${resWkFa.list[16].weather[0].main}</h5>`;

    d = new Date(resWkFa.list[19].dt_txt).toDateString().slice(0, -11);
    t = new Date(resWkFa.list[19].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });

    altD = new Date(resWkFa.list[23].dt_txt).toDateString().slice(0, -11);
    altT = new Date(resWkFa.list[23].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });

    document.getElementById('dayfour').innerHTML = `
      <h5 class="days">${d}</h5>
      <h5>${t} ${Math.round(resWkFa.list[21].main.temp)}<span>&deg;</span></h5>
      <h5>${resWkFa.list[21].weather[0].main}</h5>
      <h5 class="days">${altD}</h5>
      <h5>${altT} ${Math.round(
      resWkFa.list[24].main.temp
    )}<span>&deg;</span></h5>
      <h5>${resWkFa.list[24].weather[0].main}</h5>`;

    d = new Date(resWkFa.list[27].dt_txt).toDateString().slice(0, -11);
    t = new Date(resWkFa.list[27].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });

    altD = new Date(resWkFa.list[31].dt_txt).toDateString().slice(0, -11);
    altT = new Date(resWkFa.list[31].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });

    document.getElementById('dayfive').innerHTML = `
      <h5 class="days">${d}</h5>
      <h5>${t} ${Math.round(resWkFa.list[29].main.temp)}<span>&deg;</span></h5>
      <h5>${resWkFa.list[29].weather[0].main}</h5>
      <h5 class="days">${altD}</h5>
      <h5>${altT} ${Math.round(
      resWkFa.list[32].main.temp
    )}<span>&deg;</span></h5>
      <h5>${resWkFa.list[32].weather[0].main}</h5>`;

    d = new Date(resWkFa.list[35].dt_txt).toDateString().slice(0, -11);
    t = new Date(resWkFa.list[35].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });

    altD = new Date(resWkFa.list[39].dt_txt).toDateString().slice(0, -11);
    altT = new Date(resWkFa.list[39].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });

    document.getElementById('daysix').innerHTML = `
      <h5 class="days">${d}</h5>
      <h5>${t} ${Math.round(resWkFa.list[37].main.temp)}<span>&deg;</span></h5>
      <h5>${resWkFa.list[37].weather[0].main}</h5>
      <h5 class="days">${altD}</h5>
      <h5>${altT} ${Math.round(
      resWkFa.list[39].main.temp
    )}<span>&deg;</span></h5>
      <h5>${resWkFa.list[39].weather[0].main}</h5>`;

    //    Celcius
    const resWeeklyCel = await fetch(
      `/.netlify/functions/getweeklycelc?lat=${lat}&lon=${lon}`
    );
    const resWkCe = await resWeeklyCel.json();

    let celD;
    let celT;
    celD = new Date(resWkCe.list[3].dt_txt).toDateString().slice(0, -11);
    celT = new Date(resWkCe.list[3].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });
    altCelD = new Date(resWkCe.list[7].dt_txt).toDateString().slice(0, -11);
    altCelT = new Date(resWkCe.list[7].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });

    document.getElementById('alt-daytwo').innerHTML = `
        <h5 class="days">${celD}</h5>
        <h5>${celT} ${Math.round(
      resWkCe.list[5].main.temp
    )}<span>&deg;</span></h5>
        <h5>${resWkCe.list[5].weather[0].main}</h5>
        <h5 class="days">${altCelD}</h5>
        <h5>${altCelT} ${Math.round(
      resWkCe.list[8].main.temp
    )}<span>&deg;</span></h5>
        <h5>${resWkCe.list[8].weather[0].main}</h5>`;

    celD = new Date(resWkCe.list[11].dt_txt).toDateString().slice(0, -11);
    celT = new Date(resWkCe.list[11].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });
    altCelD = new Date(resWkCe.list[15].dt_txt).toDateString().slice(0, -11);
    altCelT = new Date(resWkCe.list[15].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });
    document.getElementById('alt-daythree').innerHTML = `
        <h5 class="days">${celD}</h5>
        <h5>${celT} ${Math.round(
      resWkCe.list[13].main.temp
    )}<span>&deg;</span></h5>
        <h5>${resWkCe.list[13].weather[0].main}</h5>
        <h5 class="days">${altCelD}</h5>
        <h5>${altCelT} ${Math.round(
      resWkCe.list[16].main.temp
    )}<span>&deg;</span></h5>
        <h5>${resWkCe.list[16].weather[0].main}</h5>`;

    celD = new Date(resWkCe.list[19].dt_txt).toDateString().slice(0, -11);
    celT = new Date(resWkCe.list[19].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });
    altCelD = new Date(resWkCe.list[23].dt_txt).toDateString().slice(0, -11);
    altCelT = new Date(resWkCe.list[23].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });
    document.getElementById('alt-dayfour').innerHTML = `
        <h5 class="days">${celD}</h5>
        <h5>${celT} ${Math.round(
      resWkCe.list[21].main.temp
    )}<span>&deg;</span></h5>
        <h5>${resWkCe.list[21].weather[0].main}</h5>
        <h5 class="days">${altCelD}</h5>
        <h5>${altCelT} ${Math.round(
      resWkCe.list[24].main.temp
    )}<span>&deg;</span></h5>
        <h5>${resWkCe.list[24].weather[0].main}</h5>`;

    celD = new Date(resWkCe.list[27].dt_txt).toDateString().slice(0, -11);
    celT = new Date(resWkCe.list[27].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });
    altCelD = new Date(resWkCe.list[31].dt_txt).toDateString().slice(0, -11);
    altCelT = new Date(resWkCe.list[31].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });
    document.getElementById('alt-dayfive').innerHTML = `
        <h5 class="days">${celD}</h5>
        <h5>${celT} ${Math.round(
      resWkCe.list[29].main.temp
    )}<span>&deg;</span></h5>
        <h5>${resWkCe.list[29].weather[0].main}</h5>
        <h5 class="days">${altCelD}</h5>
        <h5>${altCelT} ${Math.round(
      resWkCe.list[32].main.temp
    )}<span>&deg;</span></h5>
        <h5>${resWkCe.list[32].weather[0].main}</h5>`;

    celD = new Date(resWkCe.list[35].dt_txt).toDateString().slice(0, -11);
    celT = new Date(resWkCe.list[35].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });
    altCelD = new Date(resWkCe.list[39].dt_txt).toDateString().slice(0, -11);
    altCelT = new Date(resWkCe.list[39].dt_txt).toLocaleTimeString('default', {
      hour: 'numeric'
    });
    document.getElementById('alt-daysix').innerHTML = `
        <h5 class="days">${celD}</h5>
        <h5>${celT} ${Math.round(
      resWkCe.list[37].main.temp
    )}<span>&deg;</span></h5>
        <h5>${resWkCe.list[37].weather[0].main}</h5>
        <h5 class="days">${altCelD}</h5>
        <h5>${altCelT} ${Math.round(
      resWkCe.list[39].main.temp
    )}<span>&deg;</span></h5>
        <h5>${resWkCe.list[39].weather[0].main}</h5>`;
  } catch (err) {
    console.log(`Error!: ${err}`);
  }
};

const showError = error => {
  const weatherDiv = document.getElementById('weather-div');
  switch (error.code) {
    case error.PERMISSION_DENIED:
      weatherDiv.innerHTML =
        '<span class="weather-err">User denied geolocation request.</span>';
      setTimeout(
        () =>
          (weatherDiv.innerHTML =
            '<span class="weather-err">Please enable location services.</span>'),
        5000
      );
      setTimeout(() => (weatherDiv.innerHTML = ''), 10000);
      return;
    case error.POSITION_UNAVAILABLE:
      weatherDiv.innerHTML =
        '<span class="weather-err">Location info unavailable from current position.</span>';
      return;
    case error.TIMEOUT:
      weatherDiv.innerHTML =
        '<span class="weather-err">Location request timed out.</span>';
      return;
    case error.UNKNOWN_ERROR:
      weatherDiv.innerHTML =
        '<span class="weather-err">An unknown error occured.</span>';
      return;
    default:
      weatherDiv.innerHTML =
        '<span class="weather-err">Something went wrong.</span>';
  }
};

//    USER/FOCUS DISPLAY    //
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

//    TODO LIST   //
const openTodos = () => {
  const todos = document.getElementById('todos');
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
  const todos = document.getElementById('todos');
  if (
    !todos.contains(e.target) &&
    !document.getElementById('todo-open').contains(e.target)
  ) {
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

document.getElementById('todo-form').addEventListener('submit', e => {
  e.preventDefault();
  const todoInput = document.getElementById('todo-input');
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

//    Daily Quote   //
const getQuote = async () => {
  try {
    const res = await fetch('https://favqs.com/api/qotd', {
      method: 'get'
    });
    const resData = await res.json();
    document.getElementById('quote').insertAdjacentHTML(
      'afterbegin',
      `<h4>${resData.quote.body}</h4>
      <div class='slider-div'>
      <div class='slider'>
      <h5 class='p' id='quote-author'>- ${resData.quote.author}</h5>
      <span id="quote-span">Quote source:<a href="https://favqs.com/"> FavQs</a></span>
      </div></div>`
    );
  } catch (err) {
    document.getElementById('quote').insertAdjacentHTML(
      'afterbegin',
      `<h4>It does not require many words to speak the truth.</h4>
     <h5 class='p'>- Chief Joseph ~ Nez Perce </h5>`
    );
    document.querySelector('#quote span').style.display = 'none';
  }
};

//    SETTINGS    //
const openSettings = () => {
  if (settings.style.display === 'none') {
    settings.className = 'fadeIn';
    settings.style.display = 'grid';
  } else {
    settings.className = 'fadeOut';
    setTimeout(() => (settings.style.display = 'none'), 300);
  }
  document.getElementById('cog').classList.toggle('rotate');
};

const closeSettings = e => {
  const cog = document.getElementById('cog');
  if (
    !settings.contains(e.target) &&
    !cog.contains(e.target) &&
    settings.style.display === 'grid'
  ) {
    settings.className = 'fadeOut';
    setTimeout(() => (settings.style.display = 'none'), 300);
    cog.classList.toggle('rotate');
  }
  document.querySelectorAll('input[type=checkbox]').forEach(box => {
    localStorage.setItem(box.id, box.checked);
  });

  load();
};

const showClock = () => {
  document.getElementById('alt-clock').style.display = 'none';
  document.getElementById('clock').style.display = 'block';
  setInterval(time, 1000);
};

const showAltClock = () => {
  const altClock = document.getElementById('alt-clock');
  document.getElementById('clock').style.display = 'none';
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
  const showTodo = document.getElementById('show-todo-list');
  const clone = Object.assign(todoList);
  todoList ? (showTodo.innerHTML = clone.innerHTML) : (showTodo.innerHTML = '');
  if (showTodo) return;
};

const showCel = () => {
  document.getElementById('weather-dis').style.display = 'none';
  document.getElementById('weather-dis-alt').style.display = 'grid';
};

const showFar = () => {
  document.getElementById('weather-dis-alt').style.display = 'none';
  document.getElementById('weather-dis').style.display = 'grid';
};

const showWeekly = () => {
  document.getElementById('weather-div').style.display = 'none';
  document.getElementById('rad-temp-far').checked
    ? (document.getElementById('alt-five-day').style.display = 'grid')
    : (document.getElementById('five-day').style.display = 'grid');
};

const hideWeekly = e => {
  const weatherDiv = document.getElementById('weather-div');
  const fiveDay = document.getElementById('five-day');
  const altFiveDay = document.getElementById('alt-five-day');
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
  const focus = document.getElementById('focus');
  const quote = document.getElementById('quote');
  document.querySelectorAll('input[type=checkbox]').forEach(box => {
    box.checked = localStorage.getItem(box.id) === 'true' ? true : false;
    document.getElementById('rad-clock-alt').checked
      ? showAltClock()
      : showClock();
    document.getElementById('rad-temp-far').checked ? showCel() : showFar();
    document.getElementById('rad-focus-on').checked
      ? (focus.style.display = 'block')
      : (focus.style.display = 'none');
    document.getElementById('rad-todo-show').checked
      ? showTodoList()
      : (document.getElementById('show-todo-list').innerHTML = '');
    document.getElementById('rad-quote-show').checked
      ? (quote.style.display = 'block')
      : (quote.style.display = 'none');
  });
};

document.querySelectorAll('input[type=checkbox]').forEach(box => {
  if (localStorage.getItem(box.id)) {
    load();
  }
});

//    Event Listeners   //

document.addEventListener('DOMContentLoaded', getLocation);
user.addEventListener('click', clearUser);
user.addEventListener('keydown', setUser);
user.addEventListener('blur', setUser);
inputFocus.addEventListener('click', clearFocus);
inputFocus.addEventListener('keydown', setInputFocus);
inputFocus.addEventListener('blur', setInputFocus);
document.getElementById('cog').addEventListener('click', openSettings);
window.addEventListener('click', closeSettings);
document.getElementById('todo-open').addEventListener('click', openTodos);
window.addEventListener('click', closeTodos);
todoClear.addEventListener('click', clearAll);
document.getElementById('weather-div').addEventListener('click', showWeekly);
window.addEventListener('click', hideWeekly);

setInterval(time, 1000);
setDisplay();
getUser();
getInputFocus();
getQuote();
