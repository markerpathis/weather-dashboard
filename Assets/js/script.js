var cityInputVal = "";
var searchButtonEl = $("#search-button");
var forecastDay1 = "";
var forecastDay2 = "";
var forecastDay3 = "";
var forecastDay4 = "";
var forecastDay5 = "";
var forecastDay6 = "";

var forecastFull = [
  {
    name: "day-current",
    list: 0,
    date: "",
    temp: "",
    wind: "",
    humidity: "",
    icon: "",
  },
  {
    name: "day-one",
    list: 7,
    date: "",
    temp: "",
    wind: "",
    humidity: "",
    icon: "",
  },
  {
    name: "day-two",
    list: 15,
    date: "",
    temp: "",
    wind: "",
    humidity: "",
    icon: "",
  },
  {
    name: "day-three",
    list: 23,
    date: "",
    temp: "",
    wind: "",
    humidity: "",
    icon: "",
  },
  {
    name: "day-four",
    list: 31,
    date: "",
    temp: "",
    wind: "",
    humidity: "",
    icon: "",
  },
  {
    name: "day-five",
    list: 39,
    date: "",
    temp: "",
    wind: "",
    humidity: "",
    icon: "",
  },
];

searchButtonEl.on("click", function (event) {
  event.preventDefault();
  cityInputVal = $("#city-input").val();
  console.log(cityInputVal);

  (async function () {
    try {
      const coordSearch = await fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          cityInputVal +
          "&units=imperial&appid=7e84530e4048780b769d94acf3761dbf"
      );
      const coordSearchData = await coordSearch.json();
      forecastFull[0] = coordSearchData;
      const forecastSearch = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordSearchData.coord.lat}&lon=${coordSearchData.coord.lon}&units=imperial&appid=7e84530e4048780b769d94acf3761dbf`
      );
      const forecastSearchData = await forecastSearch.json();
      console.log(forecastSearchData);
      forecastFull[1] = forecastSearchData.list[0];
      forecastFull[2] = forecastSearchData.list[8];
      forecastFull[3] = forecastSearchData.list[16];
      forecastFull[4] = forecastSearchData.list[24];
      forecastFull[5] = forecastSearchData.list[32];
      console.log(forecastFull);
      // DATE
      $("#forecast-0-date").text(forecastFull[0].dt);
      $("#forecast-1-date").text(forecastFull[1].dt);
      $("#forecast-2-date").text(forecastFull[2].dt);
      $("#forecast-3-date").text(forecastFull[3].dt);
      $("#forecast-4-date").text(forecastFull[4].dt);
      $("#forecast-5-date").text(forecastFull[5].dt);
      // ICONS
      $("#forecast-0-icon").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          forecastFull[0].weather[0].icon +
          ".png"
      );
      $("#forecast-1-icon").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          forecastFull[1].weather[0].icon +
          ".png"
      );
      $("#forecast-2-icon").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          forecastFull[2].weather[0].icon +
          ".png"
      );
      $("#forecast-3-icon").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          forecastFull[3].weather[0].icon +
          ".png"
      );
      $("#forecast-4-icon").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          forecastFull[4].weather[0].icon +
          ".png"
      );
      $("#forecast-5-icon").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          forecastFull[5].weather[0].icon +
          ".png"
      );

      // TEMP
      $("#forecast-0-temp").text("Temp: " + forecastFull[0].main.temp + " ℉");
      $("#forecast-1-temp").text("Temp: " + forecastFull[1].main.temp + " ℉");
      $("#forecast-2-temp").text("Temp: " + forecastFull[2].main.temp + " ℉");
      $("#forecast-3-temp").text("Temp: " + forecastFull[3].main.temp + " ℉");
      $("#forecast-4-temp").text("Temp: " + forecastFull[4].main.temp + " ℉");
      $("#forecast-5-temp").text("Temp: " + forecastFull[5].main.temp + " ℉");
      // WIND
      $("#forecast-0-wind").text(
        "Wind: " + forecastFull[0].wind.speed + " MPH"
      );
      $("#forecast-1-wind").text(
        "Wind: " + forecastFull[1].wind.speed + " MPH"
      );
      $("#forecast-2-wind").text(
        "Wind: " + forecastFull[2].wind.speed + " MPH"
      );
      $("#forecast-3-wind").text(
        "Wind: " + forecastFull[3].wind.speed + " MPH"
      );
      $("#forecast-4-wind").text(
        "Wind: " + forecastFull[4].wind.speed + " MPH"
      );
      $("#forecast-5-wind").text(
        "Wind: " + forecastFull[5].wind.speed + " MPH"
      );
      // HUMIDITY
      $("#forecast-0-humid").text(
        "Humidity: " + forecastFull[0].main.humidity + " %"
      );
      $("#forecast-1-humid").text(
        "Humidity: " + forecastFull[1].main.humidity + " %"
      );
      $("#forecast-2-humid").text(
        "Humidity: " + forecastFull[2].main.humidity + " %"
      );
      $("#forecast-3-humid").text(
        "Humidity: " + forecastFull[3].main.humidity + " %"
      );
      $("#forecast-4-humid").text(
        "Humidity: " + forecastFull[4].main.humidity + " %"
      );
      $("#forecast-5-humid").text(
        "Humidity: " + forecastFull[5].main.humidity + " %"
      );
      // for (var i = 0; i < forecastFull.length; i++) {
      //   var unixFormat = moment.unix(forecastFull[i].dt).format("MM/DD/YYYY");
      //   console.log(unixFormat);
      // }
    } catch (error) {
      console.log("Error: " + error);
    }
  })();
});
