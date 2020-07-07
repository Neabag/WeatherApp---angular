import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-weather-details",
  templateUrl: "./weather-details.component.html",
  styleUrls: ["./weather-details.component.css"],
})
export class WeatherDetailsComponent implements OnInit {
  api = {
    key: "f7fd9ad508d3cc03e604f035578f6f53",
    base: "https://api.openweathermap.org/data/2.5/weather",
  };
  weatherData;
  cityName: "";
  constructor() {}
  ngOnInit() {
    this.getWeatherDAta("bangalore");
  }
  onChangeHandler() {
    console.log(this.cityName);
    this.getWeatherDAta(this.cityName);
  }
  getWeatherDAta(city) {
    fetch(`${this.api.base}?q=${city}&units=metric&APPID=${this.api.key}`)
      .then((res) => res.json())
      .then((result) => {
        this.setWeatherData(result);
      });
  }
  setWeatherData(data) {
    this.weatherData = data;
    console.log(this.weatherData);
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    let sunriseTime = new Date(this.weatherData.sys.sunrise * 1000);
    let currentDate = new Date();
    this.weatherData.sunset_time = sunsetTime.toLocaleTimeString();
    this.weatherData.sunrise_time = sunriseTime.toLocaleTimeString();
    this.weatherData.isDay =
      sunriseTime.getTime() < currentDate.getTime() &&
      currentDate.getTime() < sunsetTime.getTime();
    this.weatherData.temp = this.weatherData.main.temp.toFixed(0);
    this.weatherData.feelsLikeTemp = this.weatherData.main.feels_like.toFixed(
      0
    );
    this.cityName = "";
  }
}
