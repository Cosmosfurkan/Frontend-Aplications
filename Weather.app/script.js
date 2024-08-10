const API_KEY = "818e2dde6a280a9a9d4e79b014e60197";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
    const response = await fetch(BASE_URL + city + `&appid=${API_KEY}`);

    if(response.status === 404) {
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
    }else {
        var data = await response.json();
    

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if(data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/cloudy.png";
        } else if(data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rainy.png";
        } else if(data.weather[0].main === "Clear") {
            weatherIcon.src = "images/cloud.png";
        }else if(data.weather[0].main === "Snow") {
            weatherIcon.src = "images/snow.png";
        }else if(data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        }else if(data.weather[0].main === "windy") {
            weatherIcon.src = "images/windy.png";
        }else if(data.weather[0].main =="Sunny"){
            weatherIcon.src = "images/sunny.png";
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
    
}
searchBtn.addEventListener("click", ()=>{
    getWeather(searchBox.value);
});

