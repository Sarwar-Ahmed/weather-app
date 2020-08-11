let appId = "c0ef18e3b4bf4dad7b24e689f99c3a68";
let units = "imperial";
let searchMethod;

function searchWeather(searchTerm){
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
}