//    WEATHER DISPLAY   //
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather, showError, {
      enableHighAccuracy: true,
      timeout: 10000
    });
  } else {
    document.getElementById("weather-div").innerHTML =
      "<span>Geolocation not supported on this device</span>";
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
    document.getElementById("weather-dis").innerHTML = `
      <h4 class="weather-title">${resData.name}</h4>
      <p class="weather-icon"><img src='http://openweathermap.org/img/wn/${
        resData.weather[0].icon
      }.png' alt='current-icon'></img></p>
      <h4 class="weather-temp">${Math.round(
        resData.main.temp
      )}<span>&deg;</span><span class="deg">F</span></h4>
    `;

    document.getElementById("dayone").innerHTML = `
    <h4>${resData.name}</h4>
    <h5>${Math.round(
      resData.main.temp
    )}<span>&deg;</span><span style="font-size: 1rem">F</span></h5>
    <h5>${resData.weather[0].description}</h5>
    <img src='http://openweathermap.org/img/wn/${
      resData.weather[0].icon
    }.png' alt='current-icon'></img>
    <h6>humidity ${resData.main.humidity}%</h6>
    <h6>wind ${Math.round(resData.wind.speed)} mph</h6>`;

    const resAlt = await fetch(
      `/.netlify/functions/getweathercelc?lat=${lat}&lon=${lon}`
    );
    const resDataAlt = await resAlt.json();
    document.getElementById("weather-dis-alt").innerHTML = `
    <h4 class="weather-title">${resDataAlt.name}</h4>
    <p class="weather-icon"><img src='http://openweathermap.org/img/wn/${
      resDataAlt.weather[0].icon
    }.png' alt='alt-icon'></img></p>
    <h4 class="weather-temp">${Math.round(
      resDataAlt.main.temp
    )}<span>&deg;</span><span class="deg">C</span></h4>
  `;

    document.getElementById("alt-dayone").innerHTML = `
    <h4>${resDataAlt.name}</h4>
    <h5>${Math.round(
      resDataAlt.main.temp
    )}<span>&deg;</span><span style="font-size: 1rem">C</span></h5>
    <h5>${resDataAlt.weather[0].description}</h5>
    <img src='http://openweathermap.org/img/wn/${
      resDataAlt.weather[0].icon
    }.png' alt='alt-icon'></img>
    <h6>humidity ${resDataAlt.main.humidity}%</h6>
    <h6>wind ${Math.round((resDataAlt.wind.speed * 60 * 60) / 1000)} kph</h6>`;

    //    Weekly Forecast   //
    //    Farenheit
    const resWeeklyFar = await fetch(
      `/.netlify/functions/getweeklyfaren?lat=${lat}&lon=${lon}`
    );
    const resWkFa = await resWeeklyFar.json();

    let d = new Date(resWkFa.list[3].dt_txt).toDateString().slice(0, -11);
    let t = new Date(resWkFa.list[3].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });

    let altD = new Date(resWkFa.list[7].dt_txt).toDateString().slice(0, -11);
    let altT = new Date(resWkFa.list[7].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });

    document.getElementById("daytwo").innerHTML = `
      <h5 class="days">${d}</h5>
      <h5>${t} ${Math.round(resWkFa.list[5].main.temp)}<span>&deg;</span></h5>
      <h5>${resWkFa.list[5].weather[0].main}</h5>
      <h5 class="days">${altD}</h5>
      <h5>${altT} ${Math.round(
      resWkFa.list[8].main.temp
    )}<span>&deg;</span></h5>
      <h5>${resWkFa.list[8].weather[0].main}</h5>`;

    d = new Date(resWkFa.list[11].dt_txt).toDateString().slice(0, -11);
    t = new Date(resWkFa.list[11].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });

    altD = new Date(resWkFa.list[15].dt_txt).toDateString().slice(0, -11);
    altT = new Date(resWkFa.list[15].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });

    document.getElementById("daythree").innerHTML = `
      <h5 class="days">${d}</h5>
      <h5>${t} ${Math.round(resWkFa.list[13].main.temp)}<span>&deg;</span></h5>
      <h5>${resWkFa.list[13].weather[0].main}</h5>
      <h5 class="days">${altD}</h5>
      <h5>${altT} ${Math.round(
      resWkFa.list[16].main.temp
    )}<span>&deg;</span></h5>
      <h5>${resWkFa.list[16].weather[0].main}</h5>`;

    d = new Date(resWkFa.list[19].dt_txt).toDateString().slice(0, -11);
    t = new Date(resWkFa.list[19].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });

    altD = new Date(resWkFa.list[23].dt_txt).toDateString().slice(0, -11);
    altT = new Date(resWkFa.list[23].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });

    document.getElementById("dayfour").innerHTML = `
      <h5 class="days">${d}</h5>
      <h5>${t} ${Math.round(resWkFa.list[21].main.temp)}<span>&deg;</span></h5>
      <h5>${resWkFa.list[21].weather[0].main}</h5>
      <h5 class="days">${altD}</h5>
      <h5>${altT} ${Math.round(
      resWkFa.list[24].main.temp
    )}<span>&deg;</span></h5>
      <h5>${resWkFa.list[24].weather[0].main}</h5>`;

    d = new Date(resWkFa.list[27].dt_txt).toDateString().slice(0, -11);
    t = new Date(resWkFa.list[27].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });

    altD = new Date(resWkFa.list[31].dt_txt).toDateString().slice(0, -11);
    altT = new Date(resWkFa.list[31].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });

    document.getElementById("dayfive").innerHTML = `
      <h5 class="days">${d}</h5>
      <h5>${t} ${Math.round(resWkFa.list[29].main.temp)}<span>&deg;</span></h5>
      <h5>${resWkFa.list[29].weather[0].main}</h5>
      <h5 class="days">${altD}</h5>
      <h5>${altT} ${Math.round(
      resWkFa.list[32].main.temp
    )}<span>&deg;</span></h5>
      <h5>${resWkFa.list[32].weather[0].main}</h5>`;

    d = new Date(resWkFa.list[35].dt_txt).toDateString().slice(0, -11);
    t = new Date(resWkFa.list[35].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });

    altD = new Date(resWkFa.list[39].dt_txt).toDateString().slice(0, -11);
    altT = new Date(resWkFa.list[39].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });

    document.getElementById("daysix").innerHTML = `
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
    celT = new Date(resWkCe.list[3].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });
    altCelD = new Date(resWkCe.list[7].dt_txt).toDateString().slice(0, -11);
    altCelT = new Date(resWkCe.list[7].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });

    document.getElementById("alt-daytwo").innerHTML = `
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
    celT = new Date(resWkCe.list[11].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });
    altCelD = new Date(resWkCe.list[15].dt_txt).toDateString().slice(0, -11);
    altCelT = new Date(resWkCe.list[15].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });
    document.getElementById("alt-daythree").innerHTML = `
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
    celT = new Date(resWkCe.list[19].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });
    altCelD = new Date(resWkCe.list[23].dt_txt).toDateString().slice(0, -11);
    altCelT = new Date(resWkCe.list[23].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });
    document.getElementById("alt-dayfour").innerHTML = `
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
    celT = new Date(resWkCe.list[27].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });
    altCelD = new Date(resWkCe.list[31].dt_txt).toDateString().slice(0, -11);
    altCelT = new Date(resWkCe.list[31].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });
    document.getElementById("alt-dayfive").innerHTML = `
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
    celT = new Date(resWkCe.list[35].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });
    altCelD = new Date(resWkCe.list[39].dt_txt).toDateString().slice(0, -11);
    altCelT = new Date(resWkCe.list[39].dt_txt).toLocaleTimeString("default", {
      hour: "numeric"
    });
    document.getElementById("alt-daysix").innerHTML = `
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
  const weatherDiv = document.getElementById("weather-div");
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
      setTimeout(() => (weatherDiv.innerHTML = ""), 10000);
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
