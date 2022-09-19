const input = document.querySelector('.form-input');
const formSearch = document.querySelector('.form-search');
const weatherInfo = document.querySelector('.weather-info');
const temperature = document.querySelector('.temperature');
const cityName = document.querySelector('.city-name');
const searchBtn = document.querySelector('.button-search');

const UNSPLASH_API_KEY = 'o4b7vrnhejymQXt-grOvTl8XE7q9dScmY-xZIY-YV5M';
const OPENWEATHER_API_KEY = 'a04ba3774c2af4eb83edf5be6bb65ce5';
const usplashURL = 'https://api.unsplash.com';
const openWeatherURL = 'https://api.openweathermap.org';

const getRandomNumber = () => {
  return Math.floor(Math.random() * 10);
};
getRandomNumber();

const getData = async (city = 'Berlin') => {
  const URL =
    usplashURL +
    `/search/photos?page=2&query=${city}&client_id=` +
    UNSPLASH_API_KEY;
  const result = await fetch(URL);
  const response = await result.json();
  console.log(response.results[0].urls.full);
  const image = response.results[getRandomNumber()].urls.regular;
  document.body.style.background = `url("${image}")`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundAttachment = 'fixed';
};
getData();

const getWeather = async (city = 'Berlin') => {
  const URL =
    openWeatherURL +
    `/data/2.5/weather?q=${city}&units=metric&appid=` +
    OPENWEATHER_API_KEY;
  const result = await fetch(URL);
  const response = await result.json();
  // console.log(response);
  const { temp, humidity, pressure } = response.main;
  let { description, icon } = response.weather[0];
  let { speed } = response.wind;
  description = description.slice(0, 1).toUpperCase() + description.slice(1);

  cityName.innerHTML = `
    <h2 class="city-name">Weather in ${city}</h2>
    `;
  temperature.innerHTML = `
    <div class="temperature">${temp} °C</div>
    `;
  weatherInfo.innerHTML = `
    <div class="weather-info__weather">
      <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon" class="weather-info__icon">
      ${description}
    </div>
    <div class="weather-info__humidity">
      Humidity: ${humidity}%
    </div>
    <div class="weather-info__wind-speed">
      Wind Speed: ${speed} km/h
    </div>
    <div class="weather-info__atmospheric-pressure">
      Atmospheric pressure: ${pressure} hPa
    </div>
    `;
};
getWeather();

const displayData = (event) => {
  event.preventDefault(); // remove page refresh on form submit
  const city = input.value;
  getWeather(city);
  getData(city);
  input.select();
};

formSearch.addEventListener('submit', displayData);
searchBtn.addEventListener('click', displayData);

input.select();
