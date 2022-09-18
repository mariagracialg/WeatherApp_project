function changeLocation(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#search-box");
  let location = locationInput.value;
  let city = document.querySelector("#current-city");
  city.innerHTML = location;
  let units = `metric`;
  let apiKey = `33ff0888d56d2589acf1d714577ae3c1`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(currentTemperature);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = `99b8f9330a1bfba3a85e523fd3c2e528`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function currentTemperature(response) {
  let localDate = new Date();
  let localOffset = localDate.getTimezoneOffset() * 60000;

  celsiusTemperature = response.data.main.temp;
  minCelsius = response.data.main.temp_min;
  maxCelsius = response.data.main.temp_max;
  realFeelCelsius = response.data.main.feels_like;

  let timeUnix = response.data.dt * 1000;
  let timeUTC = timeUnix + localOffset;
  let time = new Date(timeUTC + 1000 * response.data.timezone);

  let todayDate = document.querySelector("#today-date");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[time.getMonth()];

  let minutes = String(time.getMinutes()).padStart(2, `0`);

  let hours = String(time.getHours()).padStart(2, `0`);

  let currentDate = `${day}, ${month} ${time.getDate()} at ${hours}:${minutes}`;

  todayDate.innerHTML = currentDate;

  let currentCity = document.querySelector(`#current-city`);
  let city = response.data.name;
  currentCity.innerHTML = city;

  let todayTemp = document.querySelector(`#today-degrees`);
  let temp = Math.round(response.data.main.temp);
  todayTemp.innerHTML = `${temp}°C`;

  let weatherDescription = document.querySelector(`#today-temp-description`);
  let description = response.data.weather[0].description;
  weatherDescription.innerHTML = description;

  let todayIcon = document.querySelector(`#today-weather-icon`);
  todayIcon.setAttribute(`src`, `images/${response.data.weather[0].icon}.svg`);
  todayIcon.setAttribute(`alt`, response.data.weather[0].description);

  let minTemp = document.querySelector(`#min-temp`);
  let min = Math.round(response.data.main.temp_min);
  minTemp.innerHTML = `${min}°C`;

  let maxTemp = document.querySelector(`#max-temp`);
  let max = Math.round(response.data.main.temp_max);
  maxTemp.innerHTML = `${max}°C`;

  let realFeel = document.querySelector(`#real-feel`);
  let feelsLike = Math.round(response.data.main.feels_like);
  realFeel.innerHTML = `${feelsLike}°C`;

  let humidityCard = document.querySelector(`#humidity`);
  let humidity = Math.round(response.data.main.humidity);
  humidityCard.innerHTML = humidity;

  let windSpeedCard = document.querySelector(`#wind-speed`);
  let windSpeed = Math.round(response.data.wind.speed);
  windSpeedCard.innerHTML = windSpeed;

  let sunriseCard = document.querySelector(`#sunrise`);
  let sunriseUnix = response.data.sys.sunrise * 1000;
  let sunriseUTC = sunriseUnix + localOffset;
  let sunriseTime = new Date(sunriseUTC + 1000 * response.data.timezone);
  let sunriseHours = String(sunriseTime.getHours()).padStart(2, `0`);
  let sunriseMinutes = String(sunriseTime.getMinutes()).padStart(2, `0`);
  let sunrise = `${sunriseHours}:${sunriseMinutes}`;
  sunriseCard.innerHTML = sunrise;

  let sunsetCard = document.querySelector(`#sunset`);
  let sunsetUnix = response.data.sys.sunset * 1000;
  let sunsetUTC = sunsetUnix + localOffset;
  let sunsetTime = new Date(sunsetUTC + 1000 * response.data.timezone);
  let sunsetHours = String(sunsetTime.getHours()).padStart(2, `0`);
  let sunsetMinutes = String(sunsetTime.getMinutes()).padStart(2, `0`);
  let sunset = `${sunsetHours}:${sunsetMinutes}`;
  sunsetCard.innerHTML = sunset;

  getForecast(response.data.coord);
  console.log(response);
}

function search(location) {
  let units = `metric`;
  let apiKey = `33ff0888d56d2589acf1d714577ae3c1`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentTemperature);
}

function getCurrentLocation(events) {
  navigator.geolocation.getCurrentPosition(getPosition);
  function getPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = `metric`;
    let apiKey = `33ff0888d56d2589acf1d714577ae3c1`;
    let apiUrlCurrentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrlCurrentLocation).then(currentTemperature);
  }
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  console.log(response.data.daily);

  let forecast = response.data.daily;

  let forecastElement = document.querySelector(`#forecast`);

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm">
                  <div class="card-body">
                    <div class="card text-center">
                      <div class="card-body">
                        <img
                          src="images/${forecastDay.weather[0].icon}.svg"
                          alt="forecast-icon"
                          width="75%"
                          id = "forecast-icon"
                        />
                        <hr />
                        <p class="card-text weather-temp">
                          <span id="forecast-max-temp">${Math.round(
                            forecastDay.temp.max
                          )}°C</span> | <span id="forecast-min-temp">${Math.round(
          forecastDay.temp.min
        )}°C</span>
                        </p>
                      </div>
                    </div>
                    <p class="card-text weeks-day">
                      <small class="text-muted">${formatDate(
                        forecastDay.dt
                      )}</small>
                    </p>
                  </div>
                </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showFahrenheitTemp(event) {
  let temperatureElement = document.querySelector("#today-degrees");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemp)}°F`;

  let minElement = document.querySelector(`#min-temp`);
  let minFahrenheit = (minCelsius * 9) / 5 + 32;
  minElement.innerHTML = `${Math.round(minFahrenheit)}°F`;

  let maxElement = document.querySelector(`#max-temp`);
  let maxFahrenheit = (maxCelsius * 9) / 5 + 32;
  maxElement.innerHTML = `${Math.round(maxFahrenheit)}°F`;

  let realFeelElement = document.querySelector(`#real-feel`);
  let feelsLikeFahrenheit = (realFeelCelsius * 9) / 5 + 32;
  realFeelElement.innerHTML = `${Math.round(feelsLikeFahrenheit)}°F`;
}

function showCelsiusTemp(event) {
  let temperatureElement = document.querySelector("#today-degrees");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;

  let minElement = document.querySelector(`#min-temp`);
  minElement.innerHTML = `${Math.round(minCelsius)}°C`;

  let maxElement = document.querySelector(`#max-temp`);
  maxElement.innerHTML = `${Math.round(maxCelsius)}°C`;

  let realFeelElement = document.querySelector(`#real-feel`);
  realFeelElement.innerHTML = `${Math.round(realFeelCelsius)}°C`;
}

let clickCurrentLocation = document.querySelector("#current-location-button");
clickCurrentLocation.addEventListener("click", getCurrentLocation);

let searchLocation = document.querySelector("#search-form");
searchLocation.addEventListener("submit", changeLocation);

let celsiusTemperature = null;
let minCelsius = null;
let maxCelsius = null;
let realFeelCelsius = null;

let celsiusButton = document.querySelector(`#btnradio1`);
celsiusButton.addEventListener(`click`, showCelsiusTemp);

let fahrenheitButton = document.querySelector(`#btnradio2`);
fahrenheitButton.addEventListener(`click`, showFahrenheitTemp);

search(`Guayaquil`);
