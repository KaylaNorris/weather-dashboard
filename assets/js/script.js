function init() {
var APIKey = "7558d4bb8bcf776bcebc20d7ff8a389d"
// var city;
var desiredCity = document.getElementById("desired-city");
var cityEl = document.getElementById("city-name");
var searchEl = document.getElementById("search-button");
var currentIcon = document.getElementById("current-icon");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var historyEl = document.getElementById("history-table");
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
var outlookEl = document.getElementsByClassName("outlook");


function getWeather(cityName) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var todaysDate = new Date(data.dt * 1000);
            var day = todaysDate.getDate();
            var month = todaysDate.getMonth();
            var year = todaysDate.getFullYear();

            cityEl.innerHTML = data.name + data.dt_txt;
            currentIcon.innerHTML = data.weather.icon

            tempEl.innerHTML = "Temperature: " + data.main.temp + " °F";
            windEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
            humidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";
        })

           
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
    fetch(forecastQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (i = 0; i < outlookEl.length; i++) {
                outlookEl[i].innerHTML = "";
                var outlookIndex = i * 8 + 4
                // var futureDates = new Date(data.list[outlookIndex].dt * 1000);
                // var day = futureDates.getDate();
                // var month = futureDates.getMonth();
                // var year = futureDates.getFullYear();
                var dateEl = document.createElement("h1");
                dateEl.innerHTML = "Date: " + data.list[outlookIndex].dt_txt;
                outlookEl[i].appendChild(dateEl);
                
                var iconEl = document.createElement("img");
                iconEl.innerHTML = "<img src=" + data.list[outlookIndex].weather.icon + ">";
                outlookEl[i].appendChild(iconEl);

                var tempEl = document.createElement("p");
                tempEl.innerHTML = "Temp: " + data.list[outlookIndex].main.temp + " °F";
                outlookEl[i].appendChild(tempEl);

                var windEl = document.createElement("p");
                windEl.innerHTML = "Wind Speed: " + data.list[outlookIndex].wind.speed + " MPH";
                outlookEl[i].appendChild(windEl);

                var humidityEl = document.createElement("p");
                humidityEl.innerHTML = "Humidity: " + data.list[outlookIndex].main.humidity + " %";
                outlookEl[i].appendChild(humidityEl);
        }
})
}




searchEl.addEventListener("click", function () {
    const searchTerm = desiredCity.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("desiredCity", JSON.stringify(searchHistory));
    getHistory();
});

function getHistory() {
    historyEl.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        var historyItem = document.createElement("li");
        historyItem.textContent = searchHistory[i];
        historyItem.addEventListener("click", function () {
            getWeather(this.text);
        });
        historyEl.appendChild(historyItem);
    }
}
}

init();