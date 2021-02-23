
function formatDate(timeStamp){

let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep", "Oct","Nov","Dec"];

let now=new Date(timeStamp);
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


  let formattedDate = `${weekDay} ${monthDay} ${month} ${year}`;
  

  return formattedDate;

}

function dateForecast (timeStamp){
  let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  let now=new Date(timeStamp);
  let weekDay = days[now.getDay()];
  return `${weekDay}`;
}


function showTemperature(response){
  let temperature=document.querySelector("#temp");
  temperature.innerHTML=Math.round(response.data.main.temp);
  let city=document.querySelector("#city");
  city.innerHTML=response.data.name;
  let description=document.querySelector("#description");
  description.innerHTML=response.data.weather[0].description;
  let currentDate = document.querySelector("#date");
  currentDate.innerHTML=formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#bigIcon");
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature=Math.round(response.data.main.temp);
  let wind=document.querySelector("#windSpeed");
  wind.innerHTML=`Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let precip=document.querySelector("#precipitation");
  precip.innerHTML=`Precipitation: ${response.data.main.humidity}%`;
  paragraph(celsiusTemperature);
  console.log(celsiusTemperature);
  
}

function paragraph(number){
let line= document.querySelector("#advices");
let background=document.querySelector("#appstructure");
let adviceA=document.querySelector("#adA");
let adviceB=document.querySelector("#adB");
let adviceC=document.querySelector("#adC");
let adviceD=document.querySelector("#adD");

if (number<5) {
  line.innerHTML="It is cold today. Grab a coat before you go!";
  adviceA.innerHTML="Organize your own film festival";
  adviceB.innerHTML="Take a power nap";
  adviceC.innerHTML="Host a pijama party";
  adviceD.innerHTML="Do your own bake off competition";
  background.className="winter";

} else if(number>5 && number<15){
  line.innerHTML="Not that Bad. Go for a walk!";
  adviceA.innerHTML="Play tourist in your own town";
  adviceB.innerHTML="Go miniature golfing";
  adviceC.innerHTML="Fly a drone";
  adviceD.innerHTML="Have a Scavenger Hunt";


  background.className="notThatBad";
       } else {
  line.innerHTML="Great Weather. Take your sunglasses and have fun";
  adviceA.innerHTML="Photo hunt challenge";
  adviceB.innerHTML="Sample Safari on a local market";
  adviceC.innerHTML="Go to the Beach";
  adviceD.innerHTML="Barbeque with friends";
 
  background.className="appWraper";
  }
}

function showForecast(response){
 let forecastElement=document.querySelector("#forecast");
  let forecastData=null;
  forecastElement.innerHTML=null;
 
  for (let index = 1; index < 40; index+=8){
   forecastData=response.data.list[index];
   forecastElement.innerHTML += `
       <div class="col-2">
            <div class="card" style="width: 4.5rem;">
                <img src="http://openweathermap.org/img/wn/${forecastData.weather[0].icon
        }@2x.png"/>
                <div class="card-body">
                    <h5 class="card-title">${Math.round(forecastData.main.temp)}º</h5>
                    <p class="card-text">${dateForecast(forecastData.dt*1000)}</p>
                </div>
            </div>
  </div>
  `
  }
}

function searchCityElements(city){

 let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
 let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}


function search (event){
 event.preventDefault();
 let cityName=document.querySelector("#cityInput");
 searchCityElements(cityName.value);
}

function convertFar (event){
  event.preventDefault();
  cel.classList.remove("active");
  far.classList.add("active");
  let temperature=document.querySelector("#temp");
  let farenheit=(celsiusTemperature*9)/5+32;
  temperature.innerHTML=Math.round(farenheit);
}

function convertCel (event){
  event.preventDefault();
  far.classList.remove("active");
  cel.classList.add("active");
  let temperature=document.querySelector("#temp");
  temperature.innerHTML=celsiusTemperature;
}

let celsiusTemperature=null;

 let form=document.querySelector("#form");
 form.addEventListener("submit",search);

 let far=document.querySelector("#f");
 far.addEventListener("click", convertFar);

 let cel=document.querySelector("#c");
 cel.addEventListener("click", convertCel);

 searchCityElements("lisbon");

 function findCity(response){
  let city=response.data.name;
   searchCityElements(city);

 }
 function showPosition(position) {
   
   let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
   
  apiUrlcord=`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
  console.log(apiUrlcord);
  axios.get(apiUrlcord).then(findCity);
}

navigator.geolocation.getCurrentPosition(showPosition);
