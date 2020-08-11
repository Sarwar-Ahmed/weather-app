let appId = "c0ef18e3b4bf4dad7b24e689f99c3a68";
let units = "metric";
let searchMethod;

function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm){
        searchMethod = "zip";
    }
    else{
        searchMethod = "q";
    }
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
    .then(result => result.json())
    .then(result => {
        init(result);
    })
}

function init(resultFromServer){
    switch (resultFromServer.weather[0].main) {         
        case "Clear":
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
        case "Clouds":
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;
        case "Rain":
        case "Drizzle":
        case "Mist":
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;

        case "Thunderstorm":
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;
        case "Snow":
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;
    
        default:
            break;
    }

    let cityHeader = document.getElementById("cityHeader");
    let temperatureElement = document.getElementById("temperature");
    let weatherDescriptionHeader = document.getElementById("weatherDescriptionHeader");
    let weatherIcon = document.getElementById("documentIconImg");
    let windSpeedElement = document.getElementById("windSpeed");
    let humidityElement = document.getElementById("humidity");

    weatherIcon.src = "http://openweathermap.org/img/w/" + resultFromServer.weather[0].icon + ".png";

    let resultDescription = resultFromServer.weather[0].description;

    cityHeader.innerHTML = resultFromServer.name;
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + "&#176";
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    windSpeedElement.innerHTML = "Winds at " + Math.floor(resultFromServer.wind.speed) + " m/s";
    humidityElement.innerHTML = "Humidity levels at " + resultFromServer.main.humidity + "%";

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
    let weatherContainer = document.getElementById("weatherContainer");
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2.5}px)`;
    weatherContainer.style.visibility = "visible";
}

document.getElementById("searchBtn").addEventListener("click", () => {
    let searchTerm = document.getElementById("searchInput").value;
    if(searchTerm){
        searchWeather(searchTerm);
    }
})