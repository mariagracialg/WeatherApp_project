let now = new Date();

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
let day = days[now.getDay()];

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
let month = months[now.getMonth()];

let minutes = String(now.getMinutes()).padStart(2, `0`);

let hours = String(now.getHours()).padStart(2, `0`);

let currentDate = `${day}, ${month} ${now.getDate()} at ${hours}:${minutes}`;

todayDate.innerHTML = currentDate;

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

function currentTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  minCelsius = response.data.main.temp_min;
  maxCelsius = response.data.main.temp_max;
  realFeelCelsius = response.data.main.feels_like;

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

  if (response.data.weather[0].icon === `01d`) {
    todayIcon.setAttribute(`src`, `images/01d.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `01n`) {
    todayIcon.setAttribute(`src`, `images/01n.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `02d`) {
    todayIcon.setAttribute(`src`, `images/02d.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `02n`) {
    todayIcon.setAttribute(`src`, `images/02n.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `03d`) {
    todayIcon.setAttribute(`src`, `images/03d.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `03n`) {
    todayIcon.setAttribute(`src`, `images/03n.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `04d`) {
    todayIcon.setAttribute(`src`, `images/04d.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `04n`) {
    todayIcon.setAttribute(`src`, `images/04n.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `09d`) {
    todayIcon.setAttribute(`src`, `images/09d.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `09n`) {
    todayIcon.setAttribute(`src`, `images/09n.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `10d`) {
    todayIcon.setAttribute(`src`, `images/10d.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `10n`) {
    todayIcon.setAttribute(`src`, `images/10n.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `11d`) {
    todayIcon.setAttribute(`src`, `images/11d.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `11n`) {
    todayIcon.setAttribute(`src`, `images/11n.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `13d`) {
    todayIcon.setAttribute(`src`, `images/13d.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `13n`) {
    todayIcon.setAttribute(`src`, `images/13n.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

  if (response.data.weather[0].icon === `50d`) {
    todayIcon.setAttribute(`src`, `images/50d.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }
  if (response.data.weather[0].icon === `50n`) {
    todayIcon.setAttribute(`src`, `images/50n.svg`);
    todayIcon.setAttribute(`alt`, response.data.weather[0].description);
  }

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
  let sunriseUnix = response.data.sys.sunrise;
  let sunriseTime = new Date(sunriseUnix * 1000);
  let sunriseHours = String(sunriseTime.getHours()).padStart(2, `0`);
  let sunriseMinutes = String(sunriseTime.getMinutes()).padStart(2, `0`);
  let sunriseSeconds = String(sunriseTime.getSeconds()).padStart(2, `0`);
  let sunrise = `${sunriseHours}:${sunriseMinutes}:${sunriseSeconds}`;
  sunriseCard.innerHTML = sunrise;

  let sunsetCard = document.querySelector(`#sunset`);
  let sunsetUnix = response.data.sys.sunset;
  let sunsetTime = new Date(sunsetUnix * 1000);
  let sunsetHours = String(sunsetTime.getHours()).padStart(2, `0`);
  let sunsetMinutes = String(sunsetTime.getMinutes()).padStart(2, `0`);
  let sunsetSeconds = String(sunsetTime.getSeconds()).padStart(2, `0`);
  let sunset = `${sunsetHours}:${sunsetMinutes}:${sunsetSeconds}`;
  sunsetCard.innerHTML = sunset;

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

search(`Quito`);
