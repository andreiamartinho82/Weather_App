
function formatDate(date){

let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep", "Oct","Nov","Dec"];

let now=new Date();
let weekDay = days[now.getDay()];
let monthDay=now.getDate();
let month=months[now.getMonth()];
let year=now.getFullYear();
let hour=now.getHours();
if (hour<10){
  hour = `0${hour}`;
}
let min=now.getMinutes();
if (min < 10) {
    min = `0${min}`;
  }


  let formattedDate = `${weekDay} ${monthDay}/${month}/${year}`;
  

  return formattedDate;

}

let currentDate = document.querySelector("#date");
currentDate.innerHTML=formatDate();

function showForecast(response){
 
let daya=document.querySelector("#day1");
daya.innerHTML=Math.round(response.data.list[0].main.temp);
console.log(daya.innerHTML);
}


function showtemperature(response){
  let temp=document.querySelector("#temperature");
  let weather=document.querySelector("#description");
  let cityInput = document.querySelector("#city-input");
  let apiKey="282bdef694bcae4d1092be2c901364fb";
  temp.innerHTML=Math.round(response.data.main.temp);
  weather.innerHTML=` ${response.data.weather[0].description}`;
  forecastUrl=`https:api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  console.log(forecastUrl);
  axios.get(forecastUrl).then(showForecast);
  }

function city1(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searching.innerHTML=`${cityInput.value}`;
  let temp=document.querySelector("#temperature");
  let apiKey="282bdef694bcae4d1092be2c901364fb";
  apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);  
  axios.get(apiUrl).then(showtemperature);
}

let cities = document.querySelector("#citySearch");
cities.addEventListener("submit", city1);

function showFarenheit(response){
 let far=document.querySelector("#temperature");
  far.innerHTML=Math.round(response.data.main.temp);
}

function convertFar(event){
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searching.innerHTML=`${cityInput.value}`;
  let temp=document.querySelector("#temperature");
  let apiKey="282bdef694bcae4d1092be2c901364fb";
  apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);  
  axios.get(apiUrl).then(showFarenheit);
  
}

let far=document.querySelector("#farenheit");
far.addEventListener("click", convertFar);

let cel=document.querySelector("#celsius");
cel.addEventListener("click", city1);


function howCurrentLocationTemperature (position){

}

function showWeather(response) {
  let temp=document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML =  `${response.data.main.temp}`;
  let weather=document.querySelector("#description");
  weather.innerHTML=response.data.weather[0].description;
  searching.innerHTML=response.data.name;
}


function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(url);
  axios.get(url).then(showWeather);
  }

function showCurrentLocationTemperature(event){
navigator.geolocation.getCurrentPosition(retrievePosition);
}


let but=document.querySelector("#current");
but.addEventListener("click", showCurrentLocationTemperature);