let weather = {
  "apiKey": "8e19eda878662b6b27e83d0a6f201a02",

  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="
      + city
      + "&units=metric&appid="
      + this.apiKey)
      .then(response => response.json())
      .then(data => this.displayWeather(data))
      .catch(err => alert("Invalid city!"));
  },

  displayWeather: function (data) {
    document.querySelector(".search-bar").value = "";
    const {name} = data;
    const {country} = data.sys;
    const {icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").textContent = "Weather in " + name + ", " + country;
    document.querySelector(".temp").textContent = temp + "°C";
    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector(".description").textContent = description.substring(0, 1).toUpperCase() + description.substring(1, description.length);
    document.querySelector(".humidity").textContent = "Humidity: " + humidity + "%";
    document.querySelector(".wind").textContent = "Wind speed: " + speed + " km/h";
    document.querySelector("body").style = `background-image: url(https://source.unsplash.com/1600x900/?${name},${country});`
    document.querySelector(".weather").style = "visibility: visible";
  }
}

document.querySelector(".button").addEventListener("click", () => {
  let city = document.querySelector(".search-bar").value;
  weather.fetchWeather(city);
});

document.querySelector(".search-bar").addEventListener("keyup", event => {
  if (event.key === "Enter"){
    let city = document.querySelector(".search-bar").value;
    weather.fetchWeather(city);
  }
});

weather.fetchWeather("London");
