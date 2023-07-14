let button = document.querySelector('button');
let inputval = document.querySelector('.inputval');
let nameval = document.querySelector('.name');
let temp = document.querySelector('.temp');
let feelslike = document.querySelector('.feelslike');
let speed = document.querySelector('.speed');
let heading = document.querySelector('.heading');
let humidity = document.querySelector('.humidity');
let desc = document.querySelector('.desc');
const iconElement = document.querySelector('.weather-icon');
let head_deg = 0;

button.addEventListener('click', fetchWeather);
inputval.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});


function fetchWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputval.value}&units=metric&appid=720f196e23928d31ebe536c3fe7c4263`)
    .then(response => response.json())
    .then(displayData)
    .catch(error => alert('Enter a valid city name.'));
}

const displayData = (weather) => {
    console.log(weather);
    temp.innerText = `Temperature: ${weather.main.temp}°C`;
    feelslike.innerText = `Feels Like ${weather.main.feels_like}°C`;
    speed.innerText = `Wind Speed: ${weather.wind.speed} m/h`;
    // heading.innerText = `Wind direction: ${head_conv(weather.wind.deg)}`;
    if (weather.wind.speed !== 0) {
        heading.innerText = `Wind direction: ${head_conv(weather.wind.deg)}`;
    } else {
        heading.innerText = '';
    }
    humidity.innerText = `Humidity: ${weather.main.humidity}%`;
    desc.innerText = `Description: ${weather.weather[0].description}`;
    nameval.innerText = `${weather.name}`;
    const iconClass = `wi wi-owm-${weather.weather[0].id}`;
    iconElement.className = iconClass;
}

function head_conv(head_deg){
    // head_deg = weather.wind.deg;
    if(head_deg == 0 || head_deg == 360){
        return 'North';
    }
    else if(head_deg > 0 && head_deg < 90){
        return 'North-East';
    }
    else if(head_deg == 90){
        return 'East';
    }
    else if(head_deg > 90 && head_deg < 180){
        return 'South-East';
    }
    else if(head_deg == 180){
        return 'South';
    }
    else if(head_deg > 180 && head_deg < 270){
        return 'South-West';
    }
    else if(head_deg == 270){
        return 'West';
    }
    else if(head_deg > 270 && head_deg < 360){
        return 'North-West';
    }
    else{
        return 'Cosmic bit-flip?';
    }
}


const clockElement = document.querySelector('.clock');
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;
  
    clockElement.textContent = time;
}
updateClock();
setInterval(updateClock, 30000);