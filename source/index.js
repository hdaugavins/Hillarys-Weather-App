// current date and time

let now = new Date();

let dateTime = document.querySelector(".todaysDate");

let hours = now.getHours();
let minutes = now.getMinutes();

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

dateTime.innerHTML = `${day}, ${hours}:${minutes}`;

// search engine

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".locationInput");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `📍 ${searchInput.value}`;
  let apiKey = "ee9d4f80559d5488a36c199121d07bef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector(".weatherSearch");
form.addEventListener("submit", search);

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let displayTemperature = document.querySelector(".displayCurrentTemp");

  displayTemperature.innerHTML = `${temperature}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `📍 ${response.data.name}`;
}

//current location button

function showButtonResults(response) {
  let currentTemperature = document.querySelector(".displayCurrentTemp");
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${response.data.name}`;
  currentTemperature.innerHTML = `${temperature}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ee9d4f80559d5488a36c199121d07bef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showButtonResults);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
