import { getLocation } from './weather.js'
import { showError } from './weather.js'

//  init service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(reg => console.log('service worker registered', reg))
    .catch(err => console.log('service worker not registered', err))
}

//  global constant variables
const prompt = document.querySelector('.prompt')
const user = document.getElementById('user')
const inputFocus = document.getElementById('input-focus')
const clock = document.getElementById('clock')
const altClock = document.getElementById('alt-clock')
const todoClear = document.getElementById('todo-clear')
const todoList = document.getElementById('todo-list')
const settings = document.getElementById('settings')
const weatherDis = document.getElementById('weather-dis')
const weatherDisAlt = document.getElementById('weather-dis-alt')

//    TIME/BACKGROUND IMAGE DISPLAY   //

//  set 12hour clock
const time = () => {
  const today = new Date()
  let hours = today.getHours()
  const amPm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  const minutes = today.getMinutes()

  const displayZero = num => {
    return (parseInt(num, 10) < 10 ? '0' : '') + num
  }

  clock.innerHTML = `
 ${hours}:${displayZero(minutes)}<span id="clockSpan">${amPm}</span>`

  //  set datetime attribute in time element
  const datetime = new Date().toISOString()
  clock.setAttribute('datetime', datetime)
}

//  set 24hour clock
const altTime = () => {
  const d = new Date().toLocaleTimeString('default', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })
  altClock.innerHTML = d

  //  set datetime attribute in time element
  const datetime = new Date().toISOString()
  altClock.setAttribute('datetime', datetime)
}

//  Start both time unit clocks with setInterval
const startClock = setInterval(time, 1000)
const startAltClock = setInterval(altTime, 1000)

//  dynamically display background images depending on time of day/night
const setDisplay = async () => {
  const bgImg = document.getElementById('bg-full-image')
  const title = document.getElementById('title')
  const attr = document.getElementById('attribute')
  let today = new Date()
  const hours = today.getHours()

  if (hours < 4) {
    try {
      const res = await fetch('/.netlify/functions/getnightpics', {
        method: 'get',
      })
      const resData = await res.json()
      const desc = resData.location.title
        ? resData.location.title
        : !resData.location.position.title === null
        ? resData.location.position.title
        : !resData.location.city === null && !resData.location.country === null
        ? resData.location.city + ', ' + resData.location.country
        : resData.alt_description
        ? resData.alt_description
        : 'Location Undefined'

      title.innerHTML = 'Good morning,'
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url('${resData.urls.regular}') center/cover no-repeat`

      attr.innerHTML = `
      <p>${desc}</p>
      <div class="slider-attr-div"><div class="slider">
      <span>Photo by <a href="${resData.user.links.html}?utm_source=Inertia&utm_medium=referral" target="_blank" rel="noopener noreferrer">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a></span></div></div>
      `
    } catch (err) {
      title.innerHTML = 'Good morning,'
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/default-early-am.webp) center/cover no-repeat`

      attr.innerHTML =
        '<p>Silverthorne, United States</p><div class="slider-attr-div"><div class="slider"><span>Photo by <a href="https://unsplash.com/@nathananderson?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Nathan Anderson</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a></span></div></div>'
    }
  } else if (hours < 12) {
    try {
      const res = await fetch('/.netlify/functions/getmorningpics', {
        method: 'get',
      })
      const resData = await res.json()
      const desc = resData.location.title
        ? resData.location.title
        : !resData.location.position.title === null
        ? resData.location.position.title
        : !resData.location.city === null && !resData.location.country === null
        ? resData.location.city + ', ' + resData.location.country
        : resData.alt_description
        ? resData.alt_description
        : 'Location Undefined'

      title.innerHTML = 'Good morning,'
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url('${resData.urls.regular}') center/cover no-repeat`

      attr.innerHTML = `
      <p>${desc}</p>
      <div class="slider-attr-div"><div class="slider">
      <span>Photo by <a href="${resData.user.links.html}?utm_source=Inertia&utm_medium=referral" target="_blank" rel="noopener noreferrer">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a></span></div></div>
      `
    } catch (err) {
      title.innerHTML = 'Good morning,'
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/default-morning.webp) center/cover no-repeat`

      attr.innerHTML =
        '<p>Hopeful horizons</p><div class="slider-attr-div"><div class="slider"><span>Photo by <a href="https://unsplash.com/@davealmine?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Dawid Zawila</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a></span></div></div>'
    }
  } else if (hours < 18) {
    try {
      const res = await fetch('/.netlify/functions/getnoonpics', {
        method: 'get',
      })
      const resData = await res.json()
      const desc = resData.location.title
        ? resData.location.title
        : !resData.location.position.title === null
        ? resData.location.position.title
        : !resData.location.city === null && !resData.location.country === null
        ? resData.location.city + ', ' + resData.location.country
        : resData.alt_description
        ? resData.alt_description
        : 'Location Undefined'

      title.innerHTML = 'Good afternoon,'
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url('${resData.urls.regular}') center/cover no-repeat`

      attr.innerHTML = `
      <p>${desc}</p>
      <div class="slider-attr-div"><div class="slider">
        <span>Photo by <a href="${resData.user.links.html}?utm_source=Inertia&utm_medium=referral" target="_blank" rel="noopener noreferrer">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a></span></div></div>
      `
    } catch (err) {
      title.innerHTML = 'Good afternoon,'
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/rox-park-noon.webp) center/cover no-repeat`

      attr.innerHTML =
        '<p>Roxborough Park, Colorado</p><div class="slider-attr-div"><div class="slider"><span>Photo by <a href="https://kylelynch.me/" target="_blank" rel="noopener noreferrer">Kyle Lynch</a></span></div></div>'
    }
  } else if (hours < 24) {
    try {
      const res = await fetch('/.netlify/functions/getnightpics', {
        method: 'get',
      })
      const resData = await res.json()
      const desc = resData.location.title
        ? resData.location.title
        : !resData.location.position.title === null
        ? resData.location.position.title
        : !resData.location.city === null && !resData.location.country === null
        ? resData.location.city + ', ' + resData.location.country
        : resData.alt_description
        ? resData.alt_description
        : 'Location Undefined'

      title.innerHTML = 'Good evening,'
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url('${resData.urls.regular}') center/cover no-repeat`

      attr.innerHTML = `
      <p>${desc}</p>
      <div class="slider-attr-div"><div class="slider">
      <span>Photo by <a href="${resData.user.links.html}?utm_source=Inertia&utm_medium=referral" target="_blank" rel="noopener noreferrer">${resData.user.first_name} ${resData.user.last_name}</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a></span></div></div>
      `
    } catch (err) {
      title.innerHTML = 'Good evening,'
      bgImg.style.background = `linear-gradient(0deg, #333, transparent 50%, 70%, #888 100%), url(./images/default-night.webp) center/cover no-repeat`

      attr.innerHTML =
        '<p>river beside mountain under full moon</p><div class="slider-attr-div"><div class="slider"><span>Photo by <a href="https://unsplash.com/@sayannath?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer">Sayan Nath</a> on <a href="https://unsplash.com/?utm_source=Inertia&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a></span></div></div>'
    }
  }
}

//    USER/FOCUS DISPLAY    //
//  regex for any non-whitespace character
const regex = /\S/

const clearUser = () => {
  if (user.textContent === '[Enter Name]') user.textContent = ''
}

const getUser = () => {
  if (
    localStorage.getItem('user') === null ||
    localStorage.getItem('user') === ''
  ) {
    localStorage.removeItem('user')
    user.textContent = '[Enter Name]'
  } else {
    user.textContent = localStorage.getItem('user')
  }
}

const setUser = e => {
  if (e.target.innerText === '') {
    user.textContent = '[Enter Name]'
  } else if (e.keyCode == 13 && !regex.test(e.target.innerText)) {
    user.textContent = '[Enter Name]'
    user.blur()
  } else if (e.keyCode == 13 && regex.test(e.target.innerText)) {
    localStorage.setItem('user', e.target.innerText)
    user.blur()
  } else {
    localStorage.setItem('user', e.target.innerText)
  }
}

const checkUser = e => {
  if (!regex.test(user.textContent)) {
    user.textContent = '[Enter Name]'
  } else {
    localStorage.setItem('user', e.target.innerText)
  }
}

const clearFocus = () => {
  if ((inputFocus.style.borderBottom = '2px solid #fff0f5'))
    inputFocus.style.borderBottom = 'none'
}

const getInputFocus = () => {
  if (
    localStorage.getItem('input-focus') === null ||
    localStorage.getItem('input-focus') === ''
  ) {
    localStorage.removeItem('input-focus')
    inputFocus.style.borderBottom = '2px solid #fff0f5'
  } else {
    inputFocus.textContent = localStorage.getItem('input-focus')
  }
}

const setInputFocus = e => {
  if (e.target.innerText === '') {
    inputFocus.style.borderBottom = '2px solid #fff0f5'
  } else if (e.keyCode == 13 && !regex.test(e.target.innerText)) {
    inputFocus.style.borderBottom = '2px solid #fff0f5'
    inputFocus.textContent = ''
    inputFocus.blur()
  } else if (e.keyCode == 13 && regex.test(e.target.innerText)) {
    localStorage.setItem('input-focus', e.target.innerText)
    inputFocus.style.borderBottom = 'none'
    inputFocus.blur()
  } else {
    localStorage.setItem('input-focus', e.target.innerText)
  }
}

const checkInputFocus = e => {
  if (!regex.test(inputFocus.textContent)) {
    inputFocus.style.borderBottom = '2px solid #fff0f5'
  } else {
    localStorage.setItem('input-focus', e.target.innerText)
  }
}

//    -TODOS- LIST   //
const openTodos = () => {
  const todos = document.getElementById('todos')
  if (todos.style.display === 'none') {
    todos.className = 'fadeIn'
    todos.style.display = 'block'
  } else {
    todos.className = 'fadeOut'
    setTimeout(() => (todos.style.display = 'none'), 300)
  }

  if (todoList.innerHTML === '') todoClear.style.display = 'none'
}

const closeTodos = e => {
  const todos = document.getElementById('todos')
  if (
    !todos.contains(e.target) &&
    !document.getElementById('todo-open').contains(e.target)
  ) {
    todos.className = 'fadeOut'
    setTimeout(() => (todos.style.display = 'none'), 300)
  }
}

let newTodos = localStorage.getItem('new-todos')
  ? JSON.parse(localStorage.getItem('new-todos'))
  : []

!newTodos.length
  ? (todoList.innerHTML = '')
  : (todoClear.style.display = 'flex')

if (newTodos) {
  newTodos.forEach(item => {
    todoList.insertAdjacentHTML(
      'afterbegin',
      `<li id='todo-item' data-key='${item.id}' class=${item.checked && 'done'}>
  <input id='${item.id}' type='checkbox' />
  <label for='${
    item.id
  }' class='checkmark p' role='checkbox' tabindex='0'></label>
  <span id='todo-span'>${item.text}</span>
  <button class='delete-todo button'> <i class="danger las la-minus-circle"></i></button> 
  </li>`
    )
  })
}

const addTodos = text => {
  const item = {
    text,
    checked: false,
    id: Date.now(),
  }

  newTodos.push(item)

  todoList.insertAdjacentHTML(
    'afterbegin',
    `<li id='todo-item' data-key='${item.id}'>
  <input id='${item.id}' type='checkbox' />
  <label for='${item.id}' class='checkmark p' role='checkbox' tabindex='0'></label>
  <span id='todo-span'>${item.text}</span>
  <button class='delete-todo button'><i class="danger las la-minus-circle"></i></button> 
  </li>`
  )
  todoClear.style.display = 'flex'
}

document.getElementById('todo-form').addEventListener('submit', e => {
  e.preventDefault()
  const todoInput = document.getElementById('todo-input')
  const text = todoInput.value.trim()

  if (text !== '') {
    addTodos(text)
    localStorage.setItem('new-todos', JSON.stringify(newTodos))
    todoInput.value = ''
    todoInput.focus()
  }
})

const toggleCheck = key => {
  const index = newTodos.findIndex(item => item.id === Number(key))
  const item = document.querySelector(`[data-key='${key}']`)
  newTodos[index].checked = !newTodos[index].checked

  if (newTodos[index].checked) {
    item.classList.add('done')
  } else {
    item.classList.remove('done')
  }

  localStorage.setItem('new-todos', JSON.stringify(newTodos))
}

const deleteTodoFunc = key => {
  newTodos = newTodos.filter(item => item.id !== Number(key))
  const item = document.querySelector(`[data-key='${key}']`)
  item.remove()
  localStorage.setItem('new-todos', JSON.stringify(newTodos))
}

const clearAll = e => {
  e.preventDefault()
  todoList.innerHTML = ''
  localStorage.removeItem('new-todos')
  newTodos = []
  todoClear.style.display = 'none'
}

todoList.addEventListener('click', e => {
  if (e.target.classList.contains('checkmark')) {
    const itemKey = e.target.parentElement.dataset.key
    toggleCheck(itemKey)
  }

  if (e.target.classList.contains('delete-todo')) {
    const itemKey = e.target.parentElement.dataset.key
    deleteTodoFunc(itemKey)
  }
})


//    SETTINGS    //
const openSettings = () => {
  if (settings.style.display === 'none') {
    settings.className = 'fadeIn'
    settings.style.display = 'grid'
  } else {
    settings.className = 'fadeOut'
    setTimeout(() => (settings.style.display = 'none'), 300)
  }
  document.getElementById('cog').classList.toggle('rotate')
}

const closeSettings = e => {
  const cog = document.getElementById('cog')
  if (
    !settings.contains(e.target) &&
    !cog.contains(e.target) &&
    settings.style.display === 'grid'
  ) {
    settings.className = 'fadeOut'
    setTimeout(() => (settings.style.display = 'none'), 300)
    cog.classList.toggle('rotate')
  }
  document.querySelectorAll('input[type=checkbox]').forEach(box => {
    localStorage.setItem(box.id, box.checked)
  })

  load()
}

const showClock = () => {
  time()
  altClock.style.display = 'none'
  clock.style.display = 'block'
}

const showAltClock = () => {
  altTime()
  clock.style.display = 'none'
  altClock.style.display = 'block'
}

const showTodoList = () => {
  const showTodo = document.getElementById('show-todo-list')
  const clone = Object.assign(todoList)
  todoList ? (showTodo.innerHTML = clone.innerHTML) : (showTodo.innerHTML = '')
}

const showCel = () => {
  if (weatherDis || weatherDisAlt) {
    weatherDis.style.display = 'none'
    weatherDisAlt.style.display = 'grid'
  }
}

const showFar = () => {
  if (weatherDisAlt || weatherDis) {
    weatherDisAlt.style.display = 'none'
    weatherDis.style.display = 'grid'
  }
}

const showWeekly = () => {
  document.getElementById('weather-div').style.display = 'none'
  document.getElementById('rad-temp-far').checked
    ? (document.getElementById('alt-five-day').style.display = 'grid')
    : (document.getElementById('five-day').style.display = 'grid')
}

const hideWeekly = e => {
  const weatherDiv = document.getElementById('weather-div')
  const fiveDay = document.getElementById('five-day')
  const altFiveDay = document.getElementById('alt-five-day')
  if (
    !weatherDiv.contains(e.target) &&
    !fiveDay.contains(e.target) &&
    !altFiveDay.contains(e.target)
  ) {
    fiveDay.style.display = 'none'
    altFiveDay.style.display = 'none'
    weatherDiv.style.display = 'block'
  }
}

//  check for settings values in local storage, if they exist/are different from default values, load them upon DOM load.
const load = () => {
  document.querySelectorAll('input[type=checkbox]').forEach(box => {
    if (localStorage.getItem(box.id)) {
      box.checked = localStorage.getItem(box.id) === 'true' ? true : false
      document.getElementById('rad-clock-alt').checked
        ? showAltClock()
        : showClock()
      document.getElementById('rad-temp-far').checked ? showCel() : showFar()
      document.getElementById('rad-focus-on').checked
        ? document.getElementById('focus').classList.remove('empty')
        : document.getElementById('focus').classList.add('empty')
      document.getElementById('rad-todo-show').checked
        ? showTodoList()
        : (document.getElementById('show-todo-list').innerHTML = '')
    }
  })
}

document.addEventListener('DOMContentLoaded', load)

//  show prompt on DOM load for user to accept or deny location request, if accepted weather is shown or prompt from browser to enable locations shown; if deny showError function runs and lets user know they denied location request and to enable locations if they so choose.
//
const handlePermission = () => {
  const denyLocation = () => {
    prompt.style.display = 'none'
    showError('PERMISSION_DENIED')
  }

  navigator.permissions.query({ name: 'geolocation' }).then(result => {
    if (result.state == 'granted') {
      // report(result.state)
      getLocation()
      prompt.style.display = 'none'
    } else if (result.state == 'prompt') {
      // report(result.state)
      document.querySelector('.accept-prompt').addEventListener('click', () => {
        getLocation()
        prompt.style.display = 'none'
      })

      document
        .querySelector('.deny-prompt')
        .addEventListener('click', denyLocation)

      document
        .querySelector('.prompt .la-times')
        .addEventListener('click', denyLocation)
    } else if (result.state == 'denied') {
      // report(result.state)
      denyLocation()
    }
    // result.onchange = () => {
    //   report(result.state)
    // }
  })
  // const report = state => {
  //   console.log('Permission ' + state)
  // }
}

//  if browser supports navigator permissions, run it, if no browser support, run navigator geolocation without pre-prompt check
if (navigator.permissions) {
  setTimeout(() => {
    prompt.style.display = 'flex'
    handlePermission()
  }, 2000)
} else {
  getLocation()
  prompt.style.display = 'none'
}

//    Event Listeners   //
user.addEventListener('click', clearUser)
user.addEventListener('keyup', setUser)
user.addEventListener('blur', checkUser)
inputFocus.addEventListener('click', clearFocus)
inputFocus.addEventListener('keyup', setInputFocus)
inputFocus.addEventListener('blur', checkInputFocus)
document.getElementById('cog').addEventListener('click', openSettings)
window.addEventListener('click', closeSettings)
document.getElementById('todo-open').addEventListener('click', openTodos)
window.addEventListener('click', closeTodos)
todoClear.addEventListener('click', clearAll)
document.getElementById('weather-div').addEventListener('click', showWeekly)
window.addEventListener('click', hideWeekly)

// !document.getElementById('rad-clock-alt').checked && showClock()

/* display 12 hour clock format once on initial page load before local storage settings take control loading clocks, therefore reducing 1 second lag to show clock */
time()

setDisplay()
getUser()
getInputFocus()

