function refreshWeather(data) {
  document.querySelector("#city").innerHTML = data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    data.temperature.current,
  );
  document.querySelector("#humidity").innerHTML = data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(data.wind.speed);
  document.querySelector("#description").innerHTML = data.condition.description;
  document.querySelector("#icon").setAttribute("src", data.condition.icon_url);
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
