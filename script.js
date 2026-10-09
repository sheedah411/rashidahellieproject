function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function refreshWeather(data) {
  document.querySelector("#city").innerHTML = data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    data.temperature.current,
  );
  document.querySelector("#humidity").innerHTML = data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(data.wind.speed);
  document.querySelector("#description").innerHTML = data.condition.description;
  document.querySelector("#icon").setAttribute("src", data.condition.icon_url);

  let date = new Date(data.time * 1000);
  document.querySelector("#date").innerHTML = formatDate(date);
  getForecast(data.city);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
        <div class="forecast-day">
          <div class="forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="forecast-icon" />
          <div class="forecast-temperatures">
            <strong>${Math.round(day.temperature.maximum)}°</strong>
            <span>${Math.round(day.temperature.minimum)}°</span>
          </div>
        </div>
      `;
    }
  });
  document.querySelector("#forecast").innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "te4o013a479eb762903da5e536e66f2a";

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then(displayForecast);
}

function searchCity(city) {
  let apiKey = "te4o013a479eb762903da5e536e66f2a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);
searchCity("Kampala");
