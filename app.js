// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/sw.js")
//     .then(reg => console.log("service worker registered", reg))
//     .catch(err => console.log("service worker not registered", err));
// }

const user = document.getElementById("user");
inputFocus = document.getElementById("input-focus");
todoClear = document.getElementById("todo-clear");
todoList = document.getElementById("todo-list");
settings = document.getElementById("settings");
weatherDis = document.getElementById("weather-dis");
weatherDisAlt = document.getElementById("weather-dis-alt");

//    TIME/BACKGROUND IMAGE DISPLAY   //
const time = () => {
  const today = new Date();
  let hours = today.getHours();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const minutes = today.getMinutes();

  const displayZero = num => {
    return (parseInt(num, 10) < 10 ? "0" : "") + num;
  };

  document.getElementById("clock").innerHTML = `
 ${hours}:${displayZero(minutes)}<span id="clockSpan">${amPm}</span>`;
};

const setDisplay = async () => {
  const bgImg = document.getElementById("bg-full-image");
  const title = document.getElementById("title");
  const attr = document.getElementById("attribute");
  let today = new Date();
  hours = today.getHours();

  if (hours < 4) {
    try {
      const res = await fetch("/.netlify/functions/getnightpics", {
        method: "get"
      });
      const resData = await res.json();
      const desc = resData.location.title
        ? resData.location.title
        : !resData.location.position.title === null
        ? resData.location.position.title
        : !resData.location.city === null && !resData.location.country === null
        ? resData.location.city + ", " + resData.location.country
        : resData.alt_description
        ? resData.alt_description
        : "Location Undefined";

      title.innerHTML = "Good morning,";
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url('${resData.urls.regular}') center/cover no-repeat`;

      attr.innerHTML = `
      <p>${desc}</p>
      <div class="slider-attr-div"><div class="slider">
      <span>Photo by <a href="${resData.user.links.html}?utm_source=Inertia&utm_medium=referral">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>
      `;
    } catch (err) {
      title.innerHTML = "Good morning,";
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/default-early-am.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>Silverthorne, United States</p><div class="slider-attr-div"><div class="slider"><span>Photo by <a href="https://unsplash.com/@nathananderson?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Nathan Anderson</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>';
    }
  } else if (hours < 12) {
    try {
      const res = await fetch("/.netlify/functions/getmorningpics", {
        method: "get"
      });
      const resData = await res.json();
      const desc = resData.location.title
        ? resData.location.title
        : !resData.location.position.title === null
        ? resData.location.position.title
        : !resData.location.city === null && !resData.location.country === null
        ? resData.location.city + ", " + resData.location.country
        : resData.alt_description
        ? resData.alt_description
        : "Location Undefined";

      title.innerHTML = "Good morning,";
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url('${resData.urls.regular}') center/cover no-repeat`;

      attr.innerHTML = `
      <p>${desc}</p>
      <div class="slider-attr-div"><div class="slider">
      <span>Photo by <a href="${resData.user.links.html}?utm_source=Inertia&utm_medium=referral">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>
      `;
    } catch (err) {
      title.innerHTML = "Good morning,";
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/default-morning.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>Hopeful horizons</p><div class="slider-attr-div"><div class="slider"><span>Photo by <a href="https://unsplash.com/@davealmine?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Dawid Zawila</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>';
    }
  } else if (hours < 18) {
    try {
      const res = await fetch("/.netlify/functions/getnoonpics", {
        method: "get"
      });
      const resData = await res.json();
      const desc = resData.location.title
        ? resData.location.title
        : !resData.location.position.title === null
        ? resData.location.position.title
        : !resData.location.city === null && !resData.location.country === null
        ? resData.location.city + ", " + resData.location.country
        : resData.alt_description
        ? resData.alt_description
        : "Location Undefined";

      title.innerHTML = "Good afternoon,";
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url('${resData.urls.regular}') center/cover no-repeat`;

      attr.innerHTML = `
      <p>${desc}</p>
      <div class="slider-attr-div"><div class="slider">
        <span>Photo by <a href="${resData.user.links.html}?utm_source=Inertia&utm_medium=referral">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>
      `;
    } catch (err) {
      title.innerHTML = "Good afternoon,";
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/rox-park-noon.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>Roxborough Park, Colorado</p><div class="slider-attr-div"><div class="slider"><span>Photo by <a href="#">Kyle Lynch</a></span></div></div>';
    }
  } else if (hours < 24) {
    try {
      const res = await fetch("/.netlify/functions/getnightpics", {
        method: "get"
      });
      const resData = await res.json();
      const desc = resData.location.title
        ? resData.location.title
        : !resData.location.position.title === null
        ? resData.location.position.title
        : !resData.location.city === null && !resData.location.country === null
        ? resData.location.city + ", " + resData.location.country
        : resData.alt_description
        ? resData.alt_description
        : "Location Undefined";

      title.innerHTML = "Good evening,";
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url('${resData.urls.regular}') center/cover no-repeat`;

      attr.innerHTML = `
      <p>${desc}</p>
      <div class="slider-attr-div"><div class="slider">
      <span>Photo by <a href="${resData.user.links.html}?utm_source=Inertia&utm_medium=referral">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>
      `;
    } catch (err) {
      title.innerHTML = "Good evening,";
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/default-night.jpg) center/cover no-repeat`;
      attr.innerHTML =
        '<p>river beside mountain under full moon</p><div class="slider-attr-div"><div class="slider"><span>Photo by <a href="https://unsplash.com/@sayannath?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Sayan Nath</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral">Unsplash</a></span></div></div>';
    }
  }
};

//    USER/FOCUS DISPLAY    //
const clearUser = () => {
  if (user.textContent === "[Enter Name]") user.textContent = "";
};

const getUser = () => {
  if (
    localStorage.getItem("user") === null ||
    localStorage.getItem("user") === ""
  ) {
    localStorage.removeItem("user");
    user.textContent = "[Enter Name]";
  } else {
    user.textContent = localStorage.getItem("user");
  }
};

const setUser = e => {
  if (e.type === "keydown") {
    if (e.keyCode == 13) {
      localStorage.setItem("user", e.target.innerText);
      user.blur();
    }
  } else {
    localStorage.setItem("user", e.target.innerText);
    location.reload();
  }
};

const clearFocus = () => {
  if ((inputFocus.style.borderBottom = "2px solid #fff0f5"))
    inputFocus.style.borderBottom = "none";
};

const getInputFocus = () => {
  if (
    localStorage.getItem("input-focus") === null ||
    localStorage.getItem("input-focus") === ""
  ) {
    localStorage.removeItem("input-focus");
    inputFocus.style.borderBottom = "2px solid #fff0f5";
  } else {
    inputFocus.textContent = localStorage.getItem("input-focus");
  }
};

const setInputFocus = e => {
  if (e.type === "keydown") {
    if (e.keyCode == 13) {
      localStorage.setItem("input-focus", e.target.innerText);
      inputFocus.blur();
    }
  } else {
    localStorage.setItem("input-focus", e.target.innerText);
    location.reload();
  }
};

//    TODO LIST   //
const openTodos = () => {
  const todos = document.getElementById("todos");
  if (todos.style.display === "none") {
    todos.className = "fadeIn";
    todos.style.display = "block";
  } else {
    todos.className = "fadeOut";
    setTimeout(() => (todos.style.display = "none"), 300);
  }

  if (todoList.innerHTML === "") todoClear.style.display = "none";
};

const closeTodos = e => {
  const todos = document.getElementById("todos");
  if (
    !todos.contains(e.target) &&
    !document.getElementById("todo-open").contains(e.target)
  ) {
    todos.className = "fadeOut";
    setTimeout(() => (todos.style.display = "none"), 300);
  }
};

let newTodos = localStorage.getItem("new-todos")
  ? JSON.parse(localStorage.getItem("new-todos"))
  : [];

newTodos.length === 0
  ? (todoList.innerHTML = "")
  : (todoClear.style.display = "inline-block");

if (newTodos) {
  newTodos.forEach(item => {
    todoList.insertAdjacentHTML(
      "afterbegin",
      `<li id='todo-item' data-key='${item.id}' class=${item.checked && "done"}>
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
    "afterbegin",
    `<li id='todo-item' data-key='${item.id}'>
  <input id='${item.id}' type='checkbox' />
  <label for='${item.id}' class='checkmark p'></label>
  <span id='todo-span'>${item.text}</span>
  <a class='delete-todo button'><i class="danger fas fa-minus"></i></a> 
  </li>`
  );
  todoClear.style.display = "inline-block";
};

document.getElementById("todo-form").addEventListener("submit", e => {
  e.preventDefault();
  const todoInput = document.getElementById("todo-input");
  const text = todoInput.value.trim();

  if (text !== "") {
    addTodos(text);
    localStorage.setItem("new-todos", JSON.stringify(newTodos));
    todoInput.value = "";
    todoInput.focus();
  }
});

const toggleCheck = key => {
  const index = newTodos.findIndex(item => item.id === Number(key));
  const item = document.querySelector(`[data-key='${key}']`);
  newTodos[index].checked = !newTodos[index].checked;

  if (newTodos[index].checked) {
    item.classList.add("done");
  } else {
    item.classList.remove("done");
  }

  localStorage.setItem("new-todos", JSON.stringify(newTodos));
};

const deleteTodoFunc = key => {
  newTodos = newTodos.filter(item => item.id !== Number(key));
  const item = document.querySelector(`[data-key='${key}']`);
  item.remove();
  localStorage.setItem("new-todos", JSON.stringify(newTodos));
};

const clearAll = e => {
  e.preventDefault();
  todoList.innerHTML = "";
  localStorage.removeItem("new-todos");
  newTodos = [];
  todoClear.style.display = "none";
};

todoList.addEventListener("click", e => {
  if (e.target.classList.contains("checkmark")) {
    const itemKey = e.target.parentElement.dataset.key;
    toggleCheck(itemKey);
  }

  if (e.target.classList.contains("fa-minus")) {
    const itemKey = e.target.parentElement.parentElement.dataset.key;
    deleteTodoFunc(itemKey);
  }
});

//    Daily Quote   //
const getQuote = async () => {
  try {
    const res = await fetch("https://favqs.com/api/qotd", {
      method: "get"
    });
    const resData = await res.json();
    document.getElementById("quote").insertAdjacentHTML(
      "afterbegin",
      `<h4>${resData.quote.body}</h4>
      <div class='slider-div'>
      <div class='slider'>
      <h5 class='p' id='quote-author'>- ${resData.quote.author}</h5>
      <span id="quote-span">Quote source:<a href="https://favqs.com/"> FavQs</a></span>
      </div></div>`
    );
  } catch (err) {
    document.getElementById("quote").insertAdjacentHTML(
      "afterbegin",
      `<h4>It does not require many words to speak the truth.</h4>
     <h5 class='p'>- Chief Joseph ~ Nez Perce </h5>`
    );
    document.querySelector("#quote span").style.display = "none";
  }
};

//    SETTINGS    //
const openSettings = () => {
  if (settings.style.display === "none") {
    settings.className = "fadeIn";
    settings.style.display = "grid";
  } else {
    settings.className = "fadeOut";
    setTimeout(() => (settings.style.display = "none"), 300);
  }
  document.getElementById("cog").classList.toggle("rotate");
};

const closeSettings = e => {
  const cog = document.getElementById("cog");
  if (
    !settings.contains(e.target) &&
    !cog.contains(e.target) &&
    settings.style.display === "grid"
  ) {
    settings.className = "fadeOut";
    setTimeout(() => (settings.style.display = "none"), 300);
    cog.classList.toggle("rotate");
  }
  document.querySelectorAll("input[type=checkbox]").forEach(box => {
    localStorage.setItem(box.id, box.checked);
  });

  load();
};

const showClock = () => {
  document.getElementById("alt-clock").style.display = "none";
  document.getElementById("clock").style.display = "block";
  setInterval(time, 1000);
};

const showAltClock = () => {
  const altClock = document.getElementById("alt-clock");
  document.getElementById("clock").style.display = "none";
  const altTime = () => {
    const d = new Date().toLocaleTimeString("default", {
      hour: "numeric",
      minute: "numeric",
      hour12: false
    });
    altClock.innerHTML = d;
  };
  altClock.style.display = "block";
  setInterval(altTime, 1000);
};

const showTodoList = () => {
  const showTodo = document.getElementById("show-todo-list");
  const clone = Object.assign(todoList);
  todoList ? (showTodo.innerHTML = clone.innerHTML) : (showTodo.innerHTML = "");
  if (showTodo) return;
};

const showCel = () => {
  if (weatherDis || weatherDisAlt) {
    weatherDis.style.display = "none";
    weatherDisAlt.style.display = "grid";
  }
};

const showFar = () => {
  if (weatherDisAlt || weatherDis) {
    weatherDisAlt.style.display = "none";
    weatherDis.style.display = "grid";
  }
};

const showWeekly = () => {
  document.getElementById("weather-div").style.display = "none";
  document.getElementById("rad-temp-far").checked
    ? (document.getElementById("alt-five-day").style.display = "grid")
    : (document.getElementById("five-day").style.display = "grid");
};

const hideWeekly = e => {
  const weatherDiv = document.getElementById("weather-div");
  const fiveDay = document.getElementById("five-day");
  const altFiveDay = document.getElementById("alt-five-day");
  if (
    !weatherDiv.contains(e.target) &&
    !fiveDay.contains(e.target) &&
    !altFiveDay.contains(e.target)
  ) {
    fiveDay.style.display = "none";
    altFiveDay.style.display = "none";
    weatherDiv.style.display = "block";
  }
};

const load = () => {
  document.querySelectorAll("input[type=checkbox]").forEach(box => {
    box.checked = localStorage.getItem(box.id) === "true" ? true : false;
    document.getElementById("rad-clock-alt").checked
      ? showAltClock()
      : showClock();
    document.getElementById("rad-temp-far").checked ? showCel() : showFar();
    document.getElementById("rad-focus-on").checked
      ? document.getElementById("focus").classList.remove("empty")
      : document.getElementById("focus").classList.add("empty");
    document.getElementById("rad-todo-show").checked
      ? showTodoList()
      : (document.getElementById("show-todo-list").innerHTML = "");
    document.getElementById("rad-quote-show").checked
      ? document.getElementById("quote").classList.remove("empty")
      : document.getElementById("quote").classList.add("empty");
  });
};

document.querySelectorAll("input[type=checkbox]").forEach(box => {
  if (localStorage.getItem(box.id)) {
    load();
  }
});

//    Event Listeners   //

user.addEventListener("click", clearUser);
user.addEventListener("keydown", setUser);
user.addEventListener("blur", setUser);
inputFocus.addEventListener("click", clearFocus);
inputFocus.addEventListener("keydown", setInputFocus);
inputFocus.addEventListener("blur", setInputFocus);
document.getElementById("cog").addEventListener("click", openSettings);
window.addEventListener("click", closeSettings);
document.getElementById("todo-open").addEventListener("click", openTodos);
window.addEventListener("click", closeTodos);
todoClear.addEventListener("click", clearAll);
document.getElementById("weather-div").addEventListener("click", showWeekly);
window.addEventListener("click", hideWeekly);

setInterval(time, 1000);
setDisplay();
getUser();
getInputFocus();
getQuote();
