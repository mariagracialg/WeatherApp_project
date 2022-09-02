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

let currentDate = `${day}, ${month} ${now.getDate()} at ${now.getHours()}:${minutes}`;

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

  function currentTemperature(response) {
    let todayTemp = document.querySelector(`#today-degrees`);
    let temp = Math.round(response.data.main.temp);
    todayTemp.innerHTML = `${temp}°C`;

    let minTemp = document.querySelector(`#min-temp`);
    let min = Math.round(response.data.main.temp_min);
    minTemp.innerHTML = min;

    let maxTemp = document.querySelector(`#max-temp`);
    let max = Math.round(response.data.main.temp_max);
    maxTemp.innerHTML = max;

    let realFeel = document.querySelector(`#real-feel`);
    let feelsLike = Math.round(response.data.main.feels_like);
    realFeel.innerHTML = feelsLike;

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

    function currentLocationTemperature(response) {
      let currentCity = document.querySelector(`#current-city`);
      let city = response.data.name;
      currentCity.innerHTML = city;

      let todayTemp = document.querySelector(`#today-degrees`);
      let temp = Math.round(response.data.main.temp);
      todayTemp.innerHTML = `${temp}°C`;

      let minTemp = document.querySelector(`#min-temp`);
      let min = Math.round(response.data.main.temp_min);
      minTemp.innerHTML = min;

      let maxTemp = document.querySelector(`#max-temp`);
      let max = Math.round(response.data.main.temp_max);
      maxTemp.innerHTML = max;

      let realFeel = document.querySelector(`#real-feel`);
      let feelsLike = Math.round(response.data.main.feels_like);
      realFeel.innerHTML = feelsLike;

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

    axios.get(apiUrlCurrentLocation).then(currentLocationTemperature);
  }
}

let clickCurrentLocation = document.querySelector("#current-location-button");
clickCurrentLocation.addEventListener("click", getCurrentLocation);

let searchLocation = document.querySelector("#search-form");
searchLocation.addEventListener("submit", changeLocation);
